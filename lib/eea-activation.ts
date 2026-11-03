import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

export class ActivationError extends Error {
  constructor(public readonly code: string, public readonly status = 400) {
    super(code);
  }
}

export type Decision = {
  status: string;
  evidence: string;
};

export type ActivationRecord = {
  opportunityId: string;
  tenantId: string;
  locationId: string;
  pipelineId: string;
  stageId: string;
  qualityReview: Decision;
  customerAcceptance: Decision;
  activationAuthorization: Decision;
};

export type ActivationRequest = {
  requestId: string;
  tenantId: string;
  locationId: string;
  opportunityId: string;
};

export type ActivationGrant = {
  requestId: string;
  opportunityId: string;
  fingerprint: string;
  token: string;
};

export type AuthoritativeActivation = {
  opportunityId: string;
  tenantId: string;
  locationId: string;
  fingerprint: string;
  state: "active" | "revoked";
};

export interface ActivationStore {
  claim(requestId: string, opportunityId: string, fingerprint: string): Promise<"claimed" | "duplicate">;
  complete(requestId: string): Promise<void>;
  fail(requestId: string, reason: string): Promise<void>;
  authorize(grant: AuthoritativeActivation): Promise<void>;
  revoke(opportunityId: string, reason: string): Promise<void>;
  readAuthorization(opportunityId: string): Promise<AuthoritativeActivation | null>;
}

export interface ActivationGateway {
  read(opportunityId: string): Promise<ActivationRecord>;
  setGuardToken(opportunityId: string, token: string): Promise<void>;
  moveToServicesActive(opportunityId: string): Promise<void>;
  clearGuardToken(opportunityId: string): Promise<void>;
  readStage(opportunityId: string): Promise<string>;
}

export type ActivationPolicy = {
  tenantId: string;
  locationId: string;
  pipelineId: string;
  qualityReviewStageId: string;
  servicesActiveStageId: string;
  qualityReviewApprovers: Set<string>;
  activationApprovers: Set<string>;
  maxAgeMs: number;
  futureSkewMs?: number;
};

type ParsedEvidence = { approver: string; timestamp: number; reference: string };

function required(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) throw new ActivationError(`missing:${field}`);
  return value.trim();
}

export function authenticateActivation(header: string, secret: string) {
  const prefix = "Bearer ";
  if (!header.startsWith(prefix)) throw new ActivationError("unauthorized", 401);
  const actual = Buffer.from(header.slice(prefix.length));
  const expected = Buffer.from(secret);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new ActivationError("unauthorized", 401);
  }
}

export function parseEvidence(value: string, field: string): ParsedEvidence {
  const parts = value.split("|").map((part) => part.trim());
  if (parts.length !== 3 || parts.some((part) => !part)) throw new ActivationError(`malformed:${field}`);
  const timestamp = Date.parse(parts[1]);
  if (!Number.isFinite(timestamp)) throw new ActivationError(`malformed:${field}_timestamp`);
  return { approver: parts[0], timestamp, reference: parts[2] };
}

function validateFreshness(evidence: ParsedEvidence, field: string, now: number, policy: ActivationPolicy) {
  const futureSkew = policy.futureSkewMs ?? 5 * 60_000;
  if (evidence.timestamp > now + futureSkew) throw new ActivationError(`future:${field}`);
  if (now - evidence.timestamp > policy.maxAgeMs) throw new ActivationError(`stale:${field}`);
}

function normalizeIdentity(value: string) {
  return value.trim().toLowerCase();
}

export function validateActivation(
  request: ActivationRequest,
  record: ActivationRecord,
  policy: ActivationPolicy,
  now = Date.now(),
): { fingerprint: string } {
  required(request.requestId, "request_id");
  if (request.tenantId !== policy.tenantId || record.tenantId !== policy.tenantId) throw new ActivationError("tenant_mismatch", 403);
  if (request.locationId !== policy.locationId || record.locationId !== policy.locationId) throw new ActivationError("location_mismatch", 403);
  if (request.opportunityId !== record.opportunityId) throw new ActivationError("opportunity_mismatch", 409);
  if (record.pipelineId !== policy.pipelineId) throw new ActivationError("pipeline_mismatch", 409);
  if (record.stageId !== policy.qualityReviewStageId) throw new ActivationError("invalid_source_stage", 409);

  if (record.qualityReview.status !== "Approved") throw new ActivationError("quality_review_not_approved");
  if (record.customerAcceptance.status !== "Accepted") throw new ActivationError("customer_acceptance_missing");
  if (record.activationAuthorization.status !== "Approved") throw new ActivationError("activation_not_approved");

  const quality = parseEvidence(record.qualityReview.evidence, "quality_review_evidence");
  const customer = parseEvidence(record.customerAcceptance.evidence, "customer_acceptance_evidence");
  const activation = parseEvidence(record.activationAuthorization.evidence, "activation_authorization_evidence");
  validateFreshness(quality, "quality_review_evidence", now, policy);
  validateFreshness(customer, "customer_acceptance_evidence", now, policy);
  validateFreshness(activation, "activation_authorization_evidence", now, policy);

  if (!policy.qualityReviewApprovers.has(normalizeIdentity(quality.approver))) throw new ActivationError("invalid_quality_reviewer", 403);
  if (!policy.activationApprovers.has(normalizeIdentity(activation.approver))) throw new ActivationError("invalid_activation_approver", 403);
  if (normalizeIdentity(customer.approver) === normalizeIdentity(activation.approver)) throw new ActivationError("customer_acceptance_inconsistent", 409);

  const fingerprint = createHash("sha256").update(JSON.stringify({
    opportunityId: record.opportunityId,
    quality: record.qualityReview,
    customer: record.customerAcceptance,
    activation: record.activationAuthorization,
  })).digest("hex");
  return { fingerprint };
}

export async function activateServices(
  request: ActivationRequest,
  gateway: ActivationGateway,
  store: ActivationStore,
  policy: ActivationPolicy,
  now = Date.now(),
): Promise<{ status: "activated" | "duplicate"; displaySync: "synced" | "pending"; grant?: ActivationGrant }> {
  const record = await gateway.read(request.opportunityId);
  const { fingerprint } = validateActivation(request, record, policy, now);
  if (await store.claim(request.requestId, request.opportunityId, fingerprint) === "duplicate") {
    const existing = await store.readAuthorization(request.opportunityId);
    if (!existing || existing.state !== "active" || existing.fingerprint !== fingerprint) {
      throw new ActivationError("duplicate_without_active_authorization", 409);
    }
    return { status: "duplicate", displaySync: "pending" };
  }
  const grant: ActivationGrant = { requestId: request.requestId, opportunityId: request.opportunityId, fingerprint, token: randomUUID() };
  try {
    await store.authorize({
      opportunityId: request.opportunityId,
      tenantId: request.tenantId,
      locationId: request.locationId,
      fingerprint,
      state: "active",
    });
    await store.complete(request.requestId);
  } catch (error) {
    await store.fail(request.requestId, error instanceof Error ? error.message : "activation_failed");
    throw error;
  }

  const displaySync = await syncActivationDisplay(request.opportunityId, gateway, policy, grant.token);
  return { status: "activated", displaySync, grant };
}

async function syncActivationDisplay(
  opportunityId: string,
  gateway: ActivationGateway,
  policy: ActivationPolicy,
  token: string = randomUUID(),
): Promise<"synced" | "pending"> {
  try {
    await gateway.setGuardToken(opportunityId, token);
    await gateway.moveToServicesActive(opportunityId);
    const synced = await gateway.readStage(opportunityId) === policy.servicesActiveStageId;
    await gateway.clearGuardToken(opportunityId);
    return synced ? "synced" : "pending";
  } catch {
    await gateway.clearGuardToken(opportunityId).catch(() => undefined);
    return "pending";
  }
}

export async function synchronizeActivationDisplay(
  store: ActivationStore,
  opportunityId: string,
  tenantId: string,
  locationId: string,
  gateway: ActivationGateway,
  policy: ActivationPolicy,
) {
  await requireAuthoritativeActivation(store, opportunityId, tenantId, locationId);
  return syncActivationDisplay(opportunityId, gateway, policy);
}

export async function requireAuthoritativeActivation(
  store: ActivationStore,
  opportunityId: string,
  tenantId: string,
  locationId: string,
) {
  const activation = await store.readAuthorization(opportunityId);
  if (!activation || activation.state !== "active") throw new ActivationError("services_not_authorized", 403);
  if (activation.tenantId !== tenantId || activation.locationId !== locationId) throw new ActivationError("authorization_scope_mismatch", 403);
  return activation;
}

export async function reconcileActivation(
  opportunityId: string,
  gateway: ActivationGateway,
  store: ActivationStore,
  policy: ActivationPolicy,
  now = Date.now(),
) {
  const activation = await store.readAuthorization(opportunityId);
  if (!activation || activation.state !== "active") return "inactive" as const;
  try {
    const record = await gateway.read(opportunityId);
    const { fingerprint } = validateActivation({
      requestId: `reconcile:${opportunityId}`,
      tenantId: activation.tenantId,
      locationId: activation.locationId,
      opportunityId,
    }, { ...record, stageId: policy.qualityReviewStageId }, policy, now);
    if (fingerprint !== activation.fingerprint) throw new ActivationError("authorization_changed", 409);
    return "active" as const;
  } catch (error) {
    await store.revoke(opportunityId, error instanceof Error ? error.message : "reconciliation_failed");
    return "revoked" as const;
  }
}
