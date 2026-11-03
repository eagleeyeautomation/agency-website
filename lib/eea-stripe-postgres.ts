import { neon } from "@neondatabase/serverless";
import type { DedupStore } from "./eea-stripe-bridge";

export class PostgresDedupStore implements DedupStore {
  private readonly sql;
  constructor(databaseUrl: string) {
    this.sql = neon(databaseUrl);
  }

  async initialize() {
    await this.sql`CREATE TABLE IF NOT EXISTS eea_stripe_events (
      event_id TEXT PRIMARY KEY,
      payment_id TEXT UNIQUE NOT NULL,
      state TEXT NOT NULL CHECK (state IN ('processing','forwarded','failed')),
      attempts INTEGER NOT NULL DEFAULT 1,
      last_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  }

  async claim(eventId: string, paymentId: string): Promise<"claimed" | "duplicate"> {
    const inserted = await this.sql`
      INSERT INTO eea_stripe_events (event_id, payment_id, state)
      VALUES (${eventId}, ${paymentId}, 'processing')
      ON CONFLICT DO NOTHING
      RETURNING event_id`;
    if (inserted.length === 1) return "claimed";
    const retried = await this.sql`
      UPDATE eea_stripe_events
      SET state='processing', attempts=attempts+1, last_error=NULL, updated_at=now()
      WHERE event_id=${eventId} AND payment_id=${paymentId}
        AND ((state='failed' AND COALESCE(last_error, '') NOT LIKE 'blocked:%')
          OR (state='processing' AND updated_at < now() - interval '5 minutes'))
      RETURNING event_id`;
    return retried.length === 1 ? "claimed" : "duplicate";
  }

  async markForwarded(eventId: string) {
    await this.sql`UPDATE eea_stripe_events SET state='forwarded', updated_at=now() WHERE event_id=${eventId}`;
  }

  async markFailed(eventId: string, reason: string) {
    await this.sql`UPDATE eea_stripe_events SET state='failed', last_error=${reason.slice(0, 200)}, updated_at=now() WHERE event_id=${eventId}`;
  }

  async markBlocked(eventId: string, reason: string) {
    await this.sql`UPDATE eea_stripe_events SET state='failed', last_error=${`blocked:${reason}`.slice(0, 200)}, updated_at=now() WHERE event_id=${eventId}`;
  }
}
