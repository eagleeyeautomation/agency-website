import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { GhlApiForwarder } from "../lib/eea-ghl-client";
import { AmbiguousForwardError, type NormalizedEvent } from "../lib/eea-stripe-bridge";

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

const event: NormalizedEvent = {
  eventId: "evt_fixture", paymentId: "cs_fixture", checkoutSessionId: "cs_fixture",
  customerId: "cus_fixture", subscriptionId: "sub_fixture", eventType: "checkout.session.completed",
  route: "payment_confirmed", offer: "Starter", email: "fixture@example.invalid", name: "Fixture",
  phone: null, priceId: "price_1UV9uZ1m05iwrAHSYQYkBVvk", productId: "prod_VWCJTFuUO3rBOQ",
  onboardingPriceId: "price_1UVBpl1m05iwrAHS3f1JGFDK", onboardingProductId: "prod_VWEI1eI2lqmWUX",
  paymentLinkId: "plink_1UVBqg1m05iwrAHSGf5jUXtP", amountCents: 34900, currency: "usd",
  paymentStatus: "paid", mode: "test",
};

test("GHL forwarding uses bearer auth, deterministic contact lookup, and creates one Payment Confirmed opportunity", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input); calls.push({ url, init });
    if (url.includes("/contacts/lookup")) return Response.json({ contacts: [{ id: "contact_1", email: event.email }] });
    if (url.includes("/opportunities/search")) return Response.json({ opportunities: [] });
    if (url.endsWith("/opportunities/")) return Response.json({ opportunity: { id: "opp_1" } });
    if (url.includes("/workflow/workflow_onboarding")) return Response.json({ succeeded: true });
    return Response.json({}, { status: 500 });
  }) as typeof fetch;
  await new GhlApiForwarder("private-token", "pipeline_1", "stage_payment_confirmed", "workflow_onboarding").send(event);
  assert.equal(calls.length, 4);
  assert.equal(new Headers(calls[0].init?.headers).get("authorization"), "Bearer private-token");
  assert.match(calls[0].url, /email=fixture%40example.invalid/);
  const body = JSON.parse(String(calls[2].init?.body));
  assert.equal(body.contactId, "contact_1");
  assert.equal(body.pipelineStageId, "stage_payment_confirmed");
  assert.equal(body.monetaryValue, 349);
  assert.equal(new URL(calls[3].url).pathname, "/contacts/contact_1/workflow/workflow_onboarding");
  assert.equal(calls[3].init?.method, "POST");
});

test("existing opportunity is updated instead of duplicated", async () => {
  const methods: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input); methods.push(`${init?.method ?? "GET"} ${new URL(url).pathname}`);
    if (url.includes("/contacts/lookup")) return Response.json({ contacts: [{ id: "contact_1", email: event.email }] });
    if (url.includes("/opportunities/search")) return Response.json({ opportunities: [{ id: "opp_existing" }] });
    if (url.endsWith("/opportunities/opp_existing")) return Response.json({ opportunity: { id: "opp_existing" } });
    if (url.includes("/workflow/workflow_onboarding")) return Response.json({ succeeded: true });
    return Response.json({}, { status: 500 });
  }) as typeof fetch;
  await new GhlApiForwarder("private-token", "pipeline_1", "stage_payment_confirmed", "workflow_onboarding").send(event);
  assert.deepEqual(methods, [
    "GET /contacts/lookup",
    "GET /opportunities/search",
    "PUT /opportunities/opp_existing",
    "POST /contacts/contact_1/workflow/workflow_onboarding",
  ]);
});

test("onboarding delivery failure fails closed after preserving the opportunity update", async () => {
  const methods: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input); methods.push(`${init?.method ?? "GET"} ${new URL(url).pathname}`);
    if (url.includes("/contacts/lookup")) return Response.json({ contacts: [{ id: "contact_1", email: event.email }] });
    if (url.includes("/opportunities/search")) return Response.json({ opportunities: [{ id: "opp_existing" }] });
    if (url.endsWith("/opportunities/opp_existing")) return Response.json({ opportunity: { id: "opp_existing" } });
    if (url.includes("/workflow/workflow_onboarding")) return Response.json({ message: "unavailable" }, { status: 503 });
    return Response.json({}, { status: 500 });
  }) as typeof fetch;
  await assert.rejects(
    () => new GhlApiForwarder("private-token", "pipeline_1", "stage_payment_confirmed", "workflow_onboarding").send(event),
    /ghl_http_503_POST__contacts_contact_1_workflow_workflow_onboarding/,
  );
  assert.equal(methods.filter((method) => method.includes("/opportunities/opp_existing")).length, 1);
});

test("lost onboarding response is classified as ambiguous and must not be replayed automatically", async () => {
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input);
    if (url.includes("/contacts/lookup")) return Response.json({ contacts: [{ id: "contact_1", email: event.email }] });
    if (url.includes("/opportunities/search")) return Response.json({ opportunities: [{ id: "opp_existing" }] });
    if (url.endsWith("/opportunities/opp_existing")) return Response.json({ opportunity: { id: "opp_existing" } });
    if (url.includes("/workflow/workflow_onboarding")) throw new TypeError("network response lost");
    return Response.json({}, { status: 500 });
  }) as typeof fetch;
  await assert.rejects(
    () => new GhlApiForwarder("private-token", "pipeline_1", "stage_payment_confirmed", "workflow_onboarding").send(event),
    (error: unknown) => error instanceof AmbiguousForwardError && error.message === "ghl_onboarding_delivery_uncertain",
  );
});

test("ambiguous contact and opportunity matches fail closed", async () => {
  globalThis.fetch = (async () => Response.json({ contacts: [
    { id: "contact_1", email: event.email }, { id: "contact_2", email: event.email },
  ] })) as typeof fetch;
  await assert.rejects(() => new GhlApiForwarder("private-token", "pipeline_1", "stage_1", "workflow_onboarding").send(event), /ambiguous_contact_match/);
});
