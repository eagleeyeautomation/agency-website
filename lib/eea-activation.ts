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

export interface ActivationStore {
  claim(requestId: string, opportunityId: string, fingerprint: string): Promise<"claimed" | "duplicate">;
  complete(requestId: string): Promise<void>;
  fail(requestId: string, reason: string): Promise<void>;
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
): Promise<{ status: "activated" | "duplicate"; grant?: ActivationGrant }> {
  const record = await gateway.read(request.opportunityId);
  const { fingerprint } = validateActivation(request, record, policy, now);
  if (await store.claim(request.requestId, request.opportunityId, fingerprint) === "duplicate") return { status: "duplicate" };
  const grant: ActivationGrant = { requestId: request.requestId, opportunityId: request.opportunityId, fingerprint, token: randomUUID() };
  try {
    await gateway.setGuardToken(request.opportunityId, grant.token);
    await gateway.moveToServicesActive(request.opportunityId);
    if (await gateway.readStage(request.opportunityId) !== policy.servicesActiveStageId) {
      throw new ActivationError("activation_not_retained", 409);
    }
    await gateway.clearGuardToken(request.opportunityId);
    await store.complete(request.requestId);
    return { status: "activated", grant };
  } catch (error) {
    await gateway.clearGuardToken(request.opportunityId).catch(() => undefined);
    await store.fail(request.requestId, error instanceof Error ? error.message : "activation_failed");
    throw error;
  }
}
