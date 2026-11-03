# EEA Stripe-to-GHL bridge — staging only

Endpoint: `/api/eea/stripe-webhook`

Required Preview-only environment variables:

- `EEA_BRIDGE_MODE=staging`
- `STRIPE_STAGING_WEBHOOK_SECRET`
- `EEA_PAYMENT_STAGING_DATABASE_URL`
- `GHL_PAYMENT_STAGING_INBOUND_WEBHOOK_URL`
- `GHL_PAYMENT_STAGING_SHARED_SECRET`

For isolated Phase 1A verification, set `GHL_PAYMENT_STAGING_INBOUND_WEBHOOK_URL=self`. The bridge resolves this sentinel to a database-backed fixture sink in the Preview-only Neon database. This avoids preview-protection bypasses, records the normalized contact payload durably, and does not contact or modify GHL. A later authorized integration test must replace it with an approved nonproduction GHL destination.

The route rejects live-mode Stripe events and verifies the raw request signature before parsing. Starter Checkout normalization is fail-closed and uses the verified Checkout Session shape rather than Session metadata: subscription mode; the allowlisted live payment-link ID; a Stripe customer and subscription ID; exactly one $99 monthly Starter line item; exactly one $250 one-time onboarding line item; and the $349 USD paid total. Missing, extra, ambiguous, or mismatched fields are rejected. The Checkout Session ID is the durable payment correlation key. The route requires a deterministic normalized customer email, atomically claims event/payment IDs in Postgres, and forwards the normalized GHL query-field model. Failed forwarding is marked for a safe Stripe retry; concurrent duplicates receive a successful duplicate acknowledgement without a second GHL call.

Production prerequisite: Stripe must deliver `checkout.session.completed` with `line_items.data` expanded, or the authenticated production handler must retrieve the Session line items before calling this normalizer. An unexpanded production event is intentionally rejected as `missing:line_items`.

Rollback: remove the preview deployment or revert these files, disable any test-mode Stripe endpoint, revoke staging secrets, and retain/delete `eea_stripe_events` only under the approved test-data retention decision. No production routing or live asset is changed by staging.
