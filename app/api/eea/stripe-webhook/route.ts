import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { BridgeError, processEvent, toGhlPayload, type Forwarder } from "../../../../lib/eea-stripe-bridge";
import { PostgresDedupStore } from "../../../../lib/eea-stripe-postgres";
import { GhlApiForwarder } from "../../../../lib/eea-ghl-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new BridgeError(`missing_configuration:${name}`, 503);
  return value;
}

function requiredAnyEnv(primary: string, fallback: string): string {
  return process.env[primary] || process.env[fallback] || requiredEnv(primary);
}

async function enrichCheckoutLineItems(raw: Uint8Array): Promise<Uint8Array> {
  const event = JSON.parse(Buffer.from(raw).toString("utf8")) as { data?: { object?: { id?: string; line_items?: unknown } } };
  const object = event.data?.object;
  if (!object?.id || object.line_items) return raw;
  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(object.id)}/line_items?limit=10&expand[]=data.price.product`, {
    headers: { authorization: `Bearer ${requiredEnv("STRIPE_PRODUCTION_RESTRICTED_KEY")}` },
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new BridgeError(`stripe_line_items_http_${response.status}`, 502);
  const lineItems = await response.json();
  object.line_items = lineItems;
  return Buffer.from(JSON.stringify(event));
}

class GhlForwarder implements Forwarder {
  constructor(private readonly url: string, private readonly sharedSecret: string) {}
  async send(event: Parameters<Forwarder["send"]>[0]) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-eea-bridge-secret": this.sharedSecret,
      },
      body: JSON.stringify(toGhlPayload(event)),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`ghl_http_${response.status}`);
  }
}

class DatabaseFixtureForwarder implements Forwarder {
  private readonly sql;
  constructor(databaseUrl: string) { this.sql = neon(databaseUrl); }
  async send(event: Parameters<Forwarder["send"]>[0]) {
    await this.sql`CREATE TABLE IF NOT EXISTS eea_ghl_fixture_forwards (
      event_id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      payload JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await this.sql`CREATE TABLE IF NOT EXISTS eea_fixture_failures (
      event_id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    if (event.eventId.startsWith("evt_retry_")) {
      const first = await this.sql`
        INSERT INTO eea_fixture_failures (event_id) VALUES (${event.eventId})
        ON CONFLICT DO NOTHING RETURNING event_id`;
      if (first.length === 1) throw new Error("fixture_failure_once");
    }
    const payload = toGhlPayload(event);
    await this.sql`
      INSERT INTO eea_ghl_fixture_forwards (event_id, email, payload)
      VALUES (${event.eventId}, ${event.email}, ${JSON.stringify(payload)}::jsonb)
      ON CONFLICT (event_id) DO NOTHING`;
  }
}

export async function POST(request: Request) {
  try {
    const mode = requiredEnv("EEA_BRIDGE_MODE");
    if (mode !== "staging" && mode !== "production") throw new BridgeError("invalid_bridge_mode", 503);
    const raw = new Uint8Array(await request.arrayBuffer());
    const signature = request.headers.get("stripe-signature") ?? "";
    const prefix = mode === "production" ? "PRODUCTION" : "STAGING";
    const databaseUrl = mode === "production"
      ? requiredAnyEnv(
          "EEA_PAYMENT_PRODUCTION_DATABASE_URL",
          "EEA_PAYMENT_PRODUCTION_DATABASE_DATABASE_URL",
        )
      : requiredEnv("EEA_PAYMENT_STAGING_DATABASE_URL");
    const store = new PostgresDedupStore(databaseUrl);
    await store.initialize();
    const forwarder = mode === "production"
      ? new GhlApiForwarder(
          requiredEnv("GHL_PAYMENT_PRODUCTION_PRIVATE_INTEGRATION_TOKEN"),
          requiredEnv("GHL_PAYMENT_PRODUCTION_PIPELINE_ID"),
          requiredEnv("GHL_PAYMENT_PRODUCTION_STAGE_ID"),
          requiredEnv("GHL_PAYMENT_PRODUCTION_ONBOARDING_WORKFLOW_ID"),
        )
      : requiredEnv("GHL_PAYMENT_STAGING_INBOUND_WEBHOOK_URL") === "self"
        ? new DatabaseFixtureForwarder(databaseUrl)
        : new GhlForwarder(requiredEnv("GHL_PAYMENT_STAGING_INBOUND_WEBHOOK_URL"), requiredEnv("GHL_PAYMENT_STAGING_SHARED_SECRET"));
    const result = await processEvent(raw, signature, {
      signingSecret: requiredEnv(`STRIPE_${prefix}_WEBHOOK_SECRET`),
      allowLive: mode === "production",
      requireLive: mode === "production",
      store,
      forwarder,
      enrich: mode === "production" ? enrichCheckoutLineItems : undefined,
    });
    return NextResponse.json({ received: true, status: result.status });
  } catch (error) {
    const known = error instanceof BridgeError ? error : new BridgeError("internal_error", 500);
    console.error("eea_stripe_bridge", { code: known.code, status: known.status });
    return NextResponse.json({ received: false, error: known.code }, { status: known.status });
  }
}
