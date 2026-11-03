import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (process.env.EEA_BRIDGE_MODE !== "staging") return NextResponse.json({ accepted: false }, { status: 404 });
  const expected = process.env.GHL_PAYMENT_STAGING_SHARED_SECRET;
  if (!expected || request.headers.get("x-eea-bridge-secret") !== expected) {
    return NextResponse.json({ accepted: false, error: "unauthorized" }, { status: 401 });
  }
  const payload = await request.json().catch(() => null) as { email?: unknown; queryParams?: Record<string, unknown> } | null;
  if (!payload || typeof payload.email !== "string" || !payload.queryParams || payload.queryParams.synthetic !== "true") {
    return NextResponse.json({ accepted: false, error: "invalid_fixture" }, { status: 422 });
  }
  const eventId = String(payload.queryParams.event_id ?? "");
  if (eventId.startsWith("evt_retry_")) {
    const databaseUrl = process.env.EEA_PAYMENT_STAGING_DATABASE_URL;
    if (!databaseUrl) return NextResponse.json({ accepted: false, error: "missing_fixture_database" }, { status: 503 });
    const sql = neon(databaseUrl);
    await sql`CREATE TABLE IF NOT EXISTS eea_fixture_failures (
      event_id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    const firstAttempt = await sql`
      INSERT INTO eea_fixture_failures (event_id) VALUES (${eventId})
      ON CONFLICT DO NOTHING RETURNING event_id`;
    if (firstAttempt.length === 1) {
      return NextResponse.json({ accepted: false, error: "fixture_failure_once" }, { status: 503 });
    }
  }
  console.info("eea_ghl_fixture_sink", {
    event_id: eventId,
    payment_id: payload.queryParams.payment_intent_id,
    accepted: true,
  });
  return NextResponse.json({ accepted: true });
}
