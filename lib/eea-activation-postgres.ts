import { neon } from "@neondatabase/serverless";
import type { ActivationStore } from "./eea-activation";

export class PostgresActivationStore implements ActivationStore {
  private readonly sql;
  constructor(databaseUrl: string) { this.sql = neon(databaseUrl); }

  async initialize() {
    await this.sql`CREATE TABLE IF NOT EXISTS eea_service_activations (
      request_id TEXT PRIMARY KEY,
      opportunity_id TEXT NOT NULL,
      authorization_fingerprint TEXT UNIQUE NOT NULL,
      state TEXT NOT NULL CHECK (state IN ('processing','completed','failed')),
      last_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  }

  async claim(requestId: string, opportunityId: string, fingerprint: string) {
    const rows = await this.sql`
      INSERT INTO eea_service_activations (request_id, opportunity_id, authorization_fingerprint, state)
      VALUES (${requestId}, ${opportunityId}, ${fingerprint}, 'processing')
      ON CONFLICT DO NOTHING RETURNING request_id`;
    return rows.length === 1 ? "claimed" as const : "duplicate" as const;
  }

  async complete(requestId: string) {
    await this.sql`UPDATE eea_service_activations SET state='completed', updated_at=now() WHERE request_id=${requestId}`;
  }

  async fail(requestId: string, reason: string) {
    await this.sql`UPDATE eea_service_activations SET state='failed', last_error=${reason.slice(0, 200)}, updated_at=now() WHERE request_id=${requestId}`;
  }
}
