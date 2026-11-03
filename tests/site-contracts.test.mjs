import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("approved legal routes remain present and cross-linked", async () => {
  const [privacy, terms] = await Promise.all([
    read("app/privacy/page.tsx"),
    read("app/terms/page.tsx"),
  ]);

  assert.match(privacy, /Privacy Policy/);
  assert.match(privacy, /href="\/terms"/);
  assert.match(terms, /Terms of Use/);
  assert.match(terms, /href="\/privacy"/);
});

test("Stripe destinations are configuration-driven, not hardcoded", async () => {
  const pricingData = await read("app/pricing/pricing-data.ts");

  assert.match(pricingData, /STRIPE_STARTER_PAYMENT_LINK/);
  assert.match(pricingData, /STRIPE_GROWTH_PAYMENT_LINK/);
  assert.match(pricingData, /STRIPE_SCALE_PAYMENT_LINK/);
  assert.doesNotMatch(pricingData, /https:\/\/buy\.stripe\.com/);
});
