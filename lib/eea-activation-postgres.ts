import { neon } from "@neondatabase/serverless";
import type { ActivationStore, AuthoritativeActivation } from "./eea-activation";

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
    await this.sql`CREATE TABLE IF NOT EXISTS eea_service_authorizations (
      opportunity_id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      location_id TEXT NOT NULL,
      authorization_fingerprint TEXT UNIQUE NOT NULL,
      state TEXT NOT NULL CHECK (state IN ('active','revoked')),
      revocation_reason TEXT,
      authorized_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  }

  async claim(requestId: string, opportunityId: string, fingerprint: string) {
    const rows = await this.sql`
      INSERT INTO eea_service_activations (request_id, opportunity_id, authorization_fingerprint, state)
      VALUES (${requestId}, ${opportunityId}, ${fingerprint}, 'processing')
      ON CONFLICT (request_id) DO UPDATE SET
        state='processing', last_error=NULL, updated_at=now()
      WHERE eea_service_activations.state='failed'
        AND eea_service_activations.opportunity_id=EXCLUDED.opportunity_id
        AND eea_service_activations.authorization_fingerprint=EXCLUDED.authorization_fingerprint
      RETURNING request_id`;
    return rows.length === 1 ? "claimed" as const : "duplicate" as const;
  }

  async complete(requestId: string) {
    await this.sql`UPDATE eea_service_activations SET state='completed', updated_at=now() WHERE request_id=${requestId}`;
  }

  async fail(requestId: string, reason: string) {
    await this.sql`UPDATE eea_service_activations SET state='failed', last_error=${reason.slice(0, 200)}, updated_at=now() WHERE request_id=${requestId}`;
  }

  async authorize(grant: AuthoritativeActivation) {
    await this.sql`
      INSERT INTO eea_service_authorizations
        (opportunity_id, tenant_id, location_id, authorization_fingerprint, state, revocation_reason)
      VALUES (${grant.opportunityId}, ${grant.tenantId}, ${grant.locationId}, ${grant.fingerprint}, 'active', NULL)
      ON CONFLICT (opportunity_id) DO UPDATE SET
        tenant_id=EXCLUDED.tenant_id,
        location_id=EXCLUDED.location_id,
        authorization_fingerprint=EXCLUDED.authorization_fingerprint,
        state='active', revocation_reason=NULL, updated_at=now()`;
  }

  async revoke(opportunityId: string, reason: string) {
    await this.sql`UPDATE eea_service_authorizations
      SET state='revoked', revocation_reason=${reason.slice(0, 200)}, updated_at=now()
      WHERE opportunity_id=${opportunityId}`;
  }

  async readAuthorization(opportunityId: string) {
    const rows = await this.sql`SELECT opportunity_id, tenant_id, location_id, authorization_fingerprint, state
      FROM eea_service_authorizations WHERE opportunity_id=${opportunityId} LIMIT 1`;
    if (!rows.length) return null;
    const row = rows[0];
    return {
      opportunityId: String(row.opportunity_id), tenantId: String(row.tenant_id), locationId: String(row.location_id),
      fingerprint: String(row.authorization_fingerprint), state: row.state === "active" ? "active" as const : "revoked" as const,
    };
  }
}
