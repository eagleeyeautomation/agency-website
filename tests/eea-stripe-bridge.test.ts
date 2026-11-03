import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, test } from "node:test";
import { GhlApiForwarder } from "../lib/eea-ghl-client";
import { BridgeError, processEvent, toGhlPayload, type DedupStore, type Forwarder } from "../lib/eea-stripe-bridge";

const secret = "whsec_nonfinancial_fixture";
const now = 1_793_210_400_000;
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

function fixture(overrides: Record<string, unknown> = {}) {
  const event = {
    id: "evt_test_001",
    type: "checkout.session.completed",
    livemode: false,
    data: { object: {
      id: "cs_test_001",
      payment_intent: "pi_test_001",
      customer: "cus_test_001",
      subscription: "sub_test_001",
      mode: "subscription",
      payment_link: "plink_1UVBqg1m05iwrAHSGf5jUXtP",
      amount_total: 34900,
      currency: "usd",
      payment_status: "paid",
      customer_details: { email: " EAGLE+TEST@EXAMPLE.COM ", name: "Eagle Test" },
      metadata: {},
      line_items: { data: [
        { amount_total: 9900, quantity: 1, price: { id: "price_1UV9uZ1m05iwrAHSYQYkBVvk", product: "prod_VWCJTFuUO3rBOQ", type: "recurring", recurring: { interval: "month", interval_count: 1 } } },
        { amount_total: 25000, quantity: 1, price: { id: "price_1UVBpl1m05iwrAHS3f1JGFDK", product: "prod_VWEI1eI2lqmWUX", type: "one_time", recurring: null } },
      ] },
    } },
    ...overrides,
  };
  const raw = Buffer.from(JSON.stringify(event));
  const timestamp = Math.floor(now / 1000);
  const signature = createHmac("sha256", secret).update(`${timestamp}.`).update(raw).digest("hex");
  return { raw, signature: `t=${timestamp},v1=${signature}` };
}

class MemoryStore implements DedupStore {
  private events = new Map<string, string>();
  private payments = new Set<string>();
  failures = new Set<string>();
  blocked = new Set<string>();
  async claim(eventId: string, paymentId: string) {
    if ((this.events.has(eventId) || this.payments.has(paymentId)) && !this.failures.has(eventId)) return "duplicate" as const;
    this.events.set(eventId, paymentId); this.payments.add(paymentId); this.failures.delete(eventId);
    return "claimed" as const;
  }
  async markForwarded() {}
  async markFailed(eventId: string) { this.failures.add(eventId); }
  async markBlocked(eventId: string) { this.blocked.add(eventId); }
}

class CaptureForwarder implements Forwarder {
  calls = 0;
  payload: ReturnType<typeof toGhlPayload> | undefined;
  fail = false;
  async send(event: Parameters<Forwarder["send"]>[0]) {
    this.calls += 1;
    if (this.fail) throw new Error("synthetic_failure");
    this.payload = toGhlPayload(event);
  }
}

async function run(store = new MemoryStore(), forwarder: Forwarder = new CaptureForwarder(), input = fixture()) {
  return processEvent(input.raw, input.signature, { signingSecret: secret, allowLive: false, store, forwarder, now });
}

test("valid signature normalizes contact and forwards GHL field model", async () => {
  const forwarder = new CaptureForwarder();
  const result = await run(new MemoryStore(), forwarder);
  assert.equal(result.status, "forwarded");
  assert.equal(result.event.email, "eagle+test@example.com");
  assert.equal(forwarder.payload?.email, "eagle+test@example.com");
  assert.equal(forwarder.payload?.queryParams.payment_status, "paid");
  assert.equal(forwarder.payload?.queryParams.stripe_subscription_id, "sub_test_001");
  assert.equal(forwarder.payload?.queryParams.onboarding_price_id, "price_1UVBpl1m05iwrAHS3f1JGFDK");
  assert.equal(forwarder.payload?.queryParams.synthetic, "true");
});

test("invalid signature is rejected before claim or forwarding", async () => {
  const input = fixture();
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), { ...input, signature: `t=${Math.floor(now / 1000)},v1=bad` }), (e: unknown) => e instanceof BridgeError && e.code === "invalid_signature");
});

test("missing contact is rejected", async () => {
  const input = fixture({ data: { object: { ...JSON.parse(fixture().raw.toString()).data.object, customer_details: {} } } });
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), input), (e: unknown) => e instanceof BridgeError && e.code === "missing:customer_email");
});

test("duplicate event is acknowledged without second forward", async () => {
  const store = new MemoryStore(); const forwarder = new CaptureForwarder(); const input = fixture();
  await run(store, forwarder, input);
  const second = await run(store, forwarder, input);
  assert.equal(second.status, "duplicate");
  assert.equal(forwarder.calls, 1);
});

test("signed fixture explicitly enrolls once when the existing opportunity is already Payment Confirmed", async () => {
  const calls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    calls.push(`${init?.method ?? "GET"} ${new URL(url).pathname}`);
    if (url.includes("/contacts/lookup")) return Response.json({ contacts: [{ id: "contact_synthetic", email: "eagle+test@example.com" }] });
    if (url.includes("/opportunities/search")) return Response.json({ opportunities: [{ id: "opp_existing_payment_confirmed" }] });
    if (url.endsWith("/opportunities/opp_existing_payment_confirmed")) return Response.json({ opportunity: { id: "opp_existing_payment_confirmed" } });
    if (url.endsWith("/contacts/contact_synthetic/workflow/workflow_onboarding")) return Response.json({ succeeded: true });
    return Response.json({}, { status: 500 });
  }) as typeof fetch;

  const store = new MemoryStore();
  const forwarder = new GhlApiForwarder("private-token", "pipeline_1", "stage_payment_confirmed", "workflow_onboarding");
  const input = fixture();
  const first = await run(store, forwarder, input);
  const duplicate = await run(store, forwarder, input);

  assert.equal(first.status, "forwarded");
  assert.equal(duplicate.status, "duplicate");
  assert.equal(calls.filter((call) => call === "PUT /opportunities/opp_existing_payment_confirmed").length, 1);
  assert.equal(calls.filter((call) => call === "POST /contacts/contact_synthetic/workflow/workflow_onboarding").length, 1);
  assert.equal(calls.some((call) => /message|conversation|email|sms/i.test(call)), false);
});

test("concurrent duplicate processing forwards once", async () => {
  const store = new MemoryStore(); const forwarder = new CaptureForwarder(); const input = fixture();
  const results = await Promise.all([run(store, forwarder, input), run(store, forwarder, input)]);
  assert.deepEqual(results.map((r) => r.status).sort(), ["duplicate", "forwarded"]);
  assert.equal(forwarder.calls, 1);
});

test("forwarding failure records failure and retry recovers", async () => {
  const store = new MemoryStore(); const forwarder = new CaptureForwarder(); const input = fixture();
  forwarder.fail = true;
  await assert.rejects(() => run(store, forwarder, input), (e: unknown) => e instanceof BridgeError && e.code === "forward_failed");
  forwarder.fail = false;
  const retried = await run(store, forwarder, input);
  assert.equal(retried.status, "forwarded");
  assert.equal(forwarder.calls, 2);
});

test("ambiguous enrollment delivery is blocked and never automatically replayed", async () => {
  const store = new MemoryStore();
  const input = fixture();
  let calls = 0;
  const forwarder: Forwarder = {
    async send() {
      calls += 1;
      const { AmbiguousForwardError } = await import("../lib/eea-stripe-bridge");
      throw new AmbiguousForwardError("ghl_onboarding_delivery_uncertain");
    },
  };
  await assert.rejects(() => run(store, forwarder, input), (error: unknown) => error instanceof BridgeError && error.code === "forward_uncertain");
  const second = await run(store, forwarder, input);
  assert.equal(second.status, "duplicate");
  assert.equal(calls, 1);
  assert.equal(store.blocked.has("evt_test_001"), true);
});

test("live event is rejected in staging", async () => {
  const input = fixture({ livemode: true });
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), input), (e: unknown) => e instanceof BridgeError && e.code === "live_mode_rejected");
});

test("test event is rejected in production before claiming or forwarding", async () => {
  const store = new MemoryStore();
  const forwarder = new CaptureForwarder();
  const input = fixture();
  await assert.rejects(
    () => processEvent(input.raw, input.signature, {
      signingSecret: secret,
      allowLive: true,
      requireLive: true,
      store,
      forwarder,
      now,
    }),
    (e: unknown) => e instanceof BridgeError && e.code === "test_mode_rejected",
  );
  assert.equal(forwarder.calls, 0);
});

test("missing line items are rejected instead of trusting metadata", async () => {
  const object = JSON.parse(fixture().raw.toString()).data.object;
  delete object.line_items;
  const input = fixture({ data: { object } });
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), input), (e: unknown) => e instanceof BridgeError && e.code === "missing:line_items");
});

test("incorrect recurring plan is rejected", async () => {
  const object = JSON.parse(fixture().raw.toString()).data.object;
  object.line_items.data[0].price.id = "price_wrong";
  const input = fixture({ data: { object } });
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), input), (e: unknown) => e instanceof BridgeError && e.code === "price_not_allowlisted");
});

test("expanded Stripe product objects normalize to their product IDs", async () => {
  const object = JSON.parse(fixture().raw.toString()).data.object;
  object.line_items.data[0].price.product = { id: object.line_items.data[0].price.product, object: "product" };
  object.line_items.data[1].price.product = { id: object.line_items.data[1].price.product, object: "product" };
  const input = fixture({ data: { object } });
  const result = await run(new MemoryStore(), new CaptureForwarder(), input);
  assert.equal(result.status, "forwarded");
});

test("incorrect onboarding fee is rejected", async () => {
  const object = JSON.parse(fixture().raw.toString()).data.object;
  object.line_items.data[1].amount_total = 24900;
  const input = fixture({ data: { object } });
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), input), (e: unknown) => e instanceof BridgeError && e.code === "onboarding_mismatch");
});

test("missing subscription is rejected", async () => {
  const object = JSON.parse(fixture().raw.toString()).data.object;
  delete object.subscription;
  const input = fixture({ data: { object } });
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), input), (e: unknown) => e instanceof BridgeError && e.code === "missing:subscription_id");
});

test("extra line item is rejected as ambiguous", async () => {
  const object = JSON.parse(fixture().raw.toString()).data.object;
  object.line_items.data.push({ amount_total: 1, quantity: 1, price: { id: "price_extra", product: "prod_extra", type: "one_time", recurring: null } });
  const input = fixture({ data: { object } });
  await assert.rejects(() => run(new MemoryStore(), new CaptureForwarder(), input), (e: unknown) => e instanceof BridgeError && e.code === "line_item_count_mismatch");
});

for (const plan of [
  { name: "Growth", price: "price_1UV9wT1m05iwrAHS5DE49T4F", product: "prod_VWCLuP2Djqb23S", link: "plink_1UVBrP1m05iwrAHSoY4elxs7", recurring: 29900, total: 54900 },
  { name: "Scale", price: "price_1UV9wd1m05iwrAHSPo51tkJG", product: "prod_VWCLDw3XFcUPZz", link: "plink_1UVBs11m05iwrAHSpFvtFBf5", recurring: 49900, total: 74900 },
]) {
  test(`${plan.name} line items normalize against the approved price, product, link, and total`, async () => {
    const object = JSON.parse(fixture().raw.toString()).data.object;
    object.payment_link = plan.link;
    object.amount_total = plan.total;
    object.line_items.data[0].amount_total = plan.recurring;
    object.line_items.data[0].price.id = plan.price;
    object.line_items.data[0].price.product = plan.product;
    const result = await run(new MemoryStore(), new CaptureForwarder(), fixture({ data: { object } }));
    assert.equal(result.event.offer, plan.name);
    assert.equal(result.event.amountCents, plan.total);
  });
}
