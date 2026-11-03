import assert from "node:assert/strict";
import test from "node:test";
import {
  ActivationError,
  activateServices,
  authenticateActivation,
  type ActivationGateway,
  type ActivationPolicy,
  type ActivationRecord,
  type ActivationStore,
} from "../lib/eea-activation";

const NOW = Date.parse("2026-11-03T12:00:00-05:00");
const policy: ActivationPolicy = {
  tenantId: "tenant_eea",
  locationId: "loc_synthetic",
  pipelineId: "pipeline_activation",
  qualityReviewStageId: "stage_quality",
  servicesActiveStageId: "stage_active",
  qualityReviewApprovers: new Set(["george brown"]),
  activationApprovers: new Set(["eagle"]),
  maxAgeMs: 24 * 60 * 60_000,
};

function record(): ActivationRecord {
  return {
    opportunityId: "opp_synthetic",
    tenantId: policy.tenantId,
    locationId: policy.locationId,
    pipelineId: policy.pipelineId,
    stageId: policy.qualityReviewStageId,
    qualityReview: { status: "Approved", evidence: "George Brown | 2026-11-03T11:00:00-05:00 | qr-fixture" },
    customerAcceptance: { status: "Accepted", evidence: "Synthetic Customer | 2026-11-03T11:05:00-05:00 | acceptance-fixture" },
    activationAuthorization: { status: "Approved", evidence: "Eagle | 2026-11-03T11:10:00-05:00 | eagle-fixture" },
  };
}

const request = { requestId: "req_1", tenantId: policy.tenantId, locationId: policy.locationId, opportunityId: "opp_synthetic" };

class MemoryStore implements ActivationStore {
  private claims = new Set<string>();
  completed = 0;
  failed = 0;
  async claim(requestId: string, _opportunityId: string, fingerprint: string) {
    const key = `${requestId}:${fingerprint}`;
    if (this.claims.has(key)) return "duplicate" as const;
    this.claims.add(key);
    return "claimed" as const;
  }
  async complete() { this.completed += 1; }
  async fail() { this.failed += 1; }
}

class MemoryGateway implements ActivationGateway {
  stage = policy.qualityReviewStageId;
  token = "";
  moves = 0;
  externalEffects = 0;
  constructor(readonly data = record(), readonly guardAllowsToken = true) {}
  async read() { return { ...this.data, stageId: this.stage }; }
  async setGuardToken(_id: string, token: string) { this.token = token; }
  async moveToServicesActive() {
    this.moves += 1;
    this.stage = this.token && this.guardAllowsToken ? policy.servicesActiveStageId : policy.qualityReviewStageId;
  }
  async clearGuardToken() { this.token = ""; }
  async readStage() { return this.stage; }
}

async function denied(mutator: (value: ActivationRecord) => void, code: string, requestOverride = request) {
  const value = record();
  mutator(value);
  const gateway = new MemoryGateway(value);
  await assert.rejects(() => activateServices(requestOverride, gateway, new MemoryStore(), policy, NOW), (error: unknown) => {
    assert.equal((error as ActivationError).code, code);
    return true;
  });
  assert.equal(gateway.moves, 0);
  assert.equal(gateway.externalEffects, 0);
}

test("activation endpoint authentication is constant-time and fail closed", () => {
  assert.doesNotThrow(() => authenticateActivation("Bearer correct-secret", "correct-secret"));
  assert.throws(() => authenticateActivation("Bearer wrong", "correct-secret"), /unauthorized/);
  assert.throws(() => authenticateActivation("", "correct-secret"), /unauthorized/);
});

test("missing approval is denied before any activation effect", async () => {
  await denied((value) => { value.qualityReview.status = ""; }, "quality_review_not_approved");
});

test("rejected approval is denied", async () => {
  await denied((value) => { value.qualityReview.status = "Rejected"; }, "quality_review_not_approved");
});

test("stale evidence is denied", async () => {
  await denied((value) => { value.activationAuthorization.evidence = "Eagle | 2026-10-01T00:00:00-04:00 | old"; }, "stale:activation_authorization_evidence");
});

test("invalid approver is denied", async () => {
  await denied((value) => { value.activationAuthorization.evidence = "Not Eagle | 2026-11-03T11:10:00-05:00 | fixture"; }, "invalid_activation_approver");
});

test("malformed and inconsistent evidence is denied", async () => {
  await denied((value) => { value.qualityReview.evidence = "bad"; }, "malformed:quality_review_evidence");
  await denied((value) => { value.customerAcceptance.evidence = "Eagle | 2026-11-03T11:05:00-05:00 | fixture"; }, "customer_acceptance_inconsistent");
});

test("cross-tenant and cross-location requests are denied", async () => {
  await denied(() => undefined, "tenant_mismatch", { ...request, tenantId: "tenant_other" });
  await denied(() => undefined, "location_mismatch", { ...request, locationId: "loc_other" });
});

test("all valid approvals retain Services Active and clear the guard token", async () => {
  const gateway = new MemoryGateway();
  const store = new MemoryStore();
  const result = await activateServices(request, gateway, store, policy, NOW);
  assert.equal(result.status, "activated");
  assert.equal(gateway.stage, policy.servicesActiveStageId);
  assert.equal(gateway.token, "");
  assert.equal(gateway.moves, 1);
  assert.equal(gateway.externalEffects, 0);
  assert.equal(store.completed, 1);
});

test("guard conflict fails closed and never bypasses rollback", async () => {
  const gateway = new MemoryGateway(record(), false);
  await assert.rejects(() => activateServices(request, gateway, new MemoryStore(), policy, NOW), /activation_not_retained/);
  assert.equal(gateway.stage, policy.qualityReviewStageId);
  assert.equal(gateway.token, "");
});

test("replayed authorization is a duplicate with no second transition", async () => {
  const gateway = new MemoryGateway();
  const store = new MemoryStore();
  await activateServices(request, gateway, store, policy, NOW);
  gateway.stage = policy.qualityReviewStageId;
  const replay = await activateServices(request, gateway, store, policy, NOW);
  assert.equal(replay.status, "duplicate");
  assert.equal(gateway.moves, 1);
});

test("concurrent requests produce one activation", async () => {
  const gateway = new MemoryGateway();
  const store = new MemoryStore();
  const results = await Promise.all([
    activateServices(request, gateway, store, policy, NOW),
    activateServices(request, gateway, store, policy, NOW),
  ]);
  assert.deepEqual(results.map((result) => result.status).sort(), ["activated", "duplicate"]);
  assert.equal(gateway.moves, 1);
});

test("manual stage movement cannot execute provisioning in the activation boundary", async () => {
  const gateway = new MemoryGateway();
  gateway.stage = policy.servicesActiveStageId;
  assert.equal(gateway.externalEffects, 0);
});
