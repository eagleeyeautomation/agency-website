import { createHmac } from "node:crypto";
import { spawn } from "node:child_process";

const deployment = process.argv[2];
const secret = process.env.STAGING_WEBHOOK_SECRET ?? process.env.STRIPE_STAGING_WEBHOOK_SECRET;
if (!deployment || !secret) throw new Error("usage: STAGING_WEBHOOK_SECRET=... node tests/run-deployed-bridge-fixtures.mjs <deployment>");

function fixture(eventId, paymentId, overrides = {}) {
  return {
    id: eventId,
    type: "checkout.session.completed",
    livemode: false,
    data: { object: {
      id: `cs_${paymentId}`,
      payment_intent: paymentId,
      customer: `cus_${paymentId}`,
      subscription: `sub_${paymentId}`,
      mode: "subscription",
      payment_link: "plink_1UVBqg1m05iwrAHSGf5jUXtP",
      amount_total: 34900,
      currency: "usd",
      payment_status: "paid",
      customer_details: { email: "phase1a.fixture@example.invalid", name: "Phase 1A Fixture" },
      metadata: {},
      line_items: { data: [
        { amount_total: 9900, quantity: 1, price: { id: "price_1UV9uZ1m05iwrAHSYQYkBVvk", product: "prod_VWCJTFuUO3rBOQ", type: "recurring", recurring: { interval: "month", interval_count: 1 } } },
        { amount_total: 25000, quantity: 1, price: { id: "price_1UVBpl1m05iwrAHS3f1JGFDK", product: "prod_VWEI1eI2lqmWUX", type: "one_time", recurring: null } },
      ] },
      ...overrides,
    } },
  };
}

function request(event, signatureOverride) {
  const raw = JSON.stringify(event);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signatureOverride ?? createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("hex");
  return new Promise((resolve, reject) => {
    const child = spawn("pnpm", ["dlx", "vercel@50.6.1", "curl", "/api/eea/stripe-webhook", "--deployment", deployment, "--scope", "eagleeyeautomations-projects", "--", "--silent", "--show-error", "--request", "POST", "--header", "content-type: application/json", "--header", `stripe-signature: t=${timestamp},v1=${signature}`, "--data-binary", raw], { env: process.env });
    let stdout = "", stderr = "";
    child.stdout.on("data", (chunk) => stdout += chunk);
    child.stderr.on("data", (chunk) => stderr += chunk);
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) return reject(new Error(`vercel_curl_${code}:${stderr}`));
      try { resolve(JSON.parse(stdout.trim().split("\n").at(-1))); }
      catch { reject(new Error(`invalid_response:${stdout}:${stderr}`)); }
    });
  });
}

function expect(label, condition, detail) {
  if (!condition) throw new Error(`${label}:FAIL:${JSON.stringify(detail)}`);
  console.log(`${label}:PASS`);
}

const suffix = Date.now();
const valid = fixture(`evt_valid_${suffix}`, `pi_valid_${suffix}`);
const first = await request(valid);
expect("valid_signed_forward", first.received === true && first.status === "forwarded", first);
const duplicate = await request(valid);
expect("durable_duplicate_suppression", duplicate.received === true && duplicate.status === "duplicate", duplicate);

const bad = await request(fixture(`evt_bad_${suffix}`, `pi_bad_${suffix}`), "bad");
expect("invalid_signature_rejection", bad.received === false && bad.error === "invalid_signature", bad);

const unmatched = fixture(`evt_unmatched_${suffix}`, `pi_unmatched_${suffix}`, { customer_details: {} });
const noContact = await request(unmatched);
expect("unmatched_contact_rejection", noContact.received === false && noContact.error === "missing:customer_email", noContact);

const concurrentEvent = fixture(`evt_concurrent_${suffix}`, `pi_concurrent_${suffix}`);
const concurrent = await Promise.all([request(concurrentEvent), request(concurrentEvent)]);
expect("concurrent_duplicate_suppression", concurrent.filter((r) => r.status === "forwarded").length === 1 && concurrent.filter((r) => r.status === "duplicate").length === 1, concurrent);

const retryEvent = fixture(`evt_retry_${suffix}`, `pi_retry_${suffix}`);
const failed = await request(retryEvent);
expect("forward_failure_recorded", failed.received === false && failed.error === "forward_failed", failed);
const recovered = await request(retryEvent);
expect("retry_recovery", recovered.received === true && recovered.status === "forwarded", recovered);

console.log("DEPLOYED_FIXTURES:7_PASS_0_FAIL");
