import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("production bridge accepts canonical and Vercel integration database variables", async () => {
  const source = await readFile(new URL("../app/api/eea/stripe-webhook/route.ts", import.meta.url), "utf8");
  assert.match(source, /"EEA_PAYMENT_PRODUCTION_DATABASE_URL"/);
  assert.match(source, /"EEA_PAYMENT_PRODUCTION_DATABASE_DATABASE_URL"/);
  assert.match(source, /process\.env\[primary\] \|\| process\.env\[fallback\]/);
});
