import { NextResponse } from "next/server";
import { ActivationError, activateServices, authenticateActivation, type ActivationPolicy, type ActivationRequest } from "../../../../lib/eea-activation";
import { GhlActivationGateway, type ActivationFieldIds } from "../../../../lib/eea-activation-ghl";
import { PostgresActivationStore } from "../../../../lib/eea-activation-postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new ActivationError(`missing_configuration:${name}`, 503);
  return value;
}

function listEnv(name: string) {
  return new Set(requiredEnv(name).split(",").map((value) => value.trim().toLowerCase()).filter(Boolean));
}

export async function POST(request: Request) {
  try {
    authenticateActivation(request.headers.get("authorization") ?? "", requiredEnv("EEA_ACTIVATION_API_SECRET"));
    const body = await request.json() as Partial<ActivationRequest>;
    const activationRequest: ActivationRequest = {
      requestId: typeof body.requestId === "string" ? body.requestId : "",
      tenantId: typeof body.tenantId === "string" ? body.tenantId : "",
      locationId: typeof body.locationId === "string" ? body.locationId : "",
      opportunityId: typeof body.opportunityId === "string" ? body.opportunityId : "",
    };
    const tenantId = requiredEnv("EEA_ACTIVATION_TENANT_ID");
    const locationId = requiredEnv("EEA_ACTIVATION_LOCATION_ID");
    const pipelineId = requiredEnv("EEA_ACTIVATION_PIPELINE_ID");
    const fields: ActivationFieldIds = {
      qualityReview: requiredEnv("EEA_ACTIVATION_FIELD_QUALITY_REVIEW"),
      customerAcceptance: requiredEnv("EEA_ACTIVATION_FIELD_CUSTOMER_ACCEPTANCE"),
      activationAuthorization: requiredEnv("EEA_ACTIVATION_FIELD_EAGLE_AUTHORIZATION"),
      qualityReviewEvidence: requiredEnv("EEA_ACTIVATION_FIELD_QUALITY_EVIDENCE"),
      customerAcceptanceEvidence: requiredEnv("EEA_ACTIVATION_FIELD_CUSTOMER_EVIDENCE"),
      activationAuthorizationEvidence: requiredEnv("EEA_ACTIVATION_FIELD_EAGLE_EVIDENCE"),
      guardToken: requiredEnv("EEA_ACTIVATION_FIELD_GUARD_TOKEN"),
    };
    const gateway = new GhlActivationGateway(
      requiredEnv("GHL_PAYMENT_PRODUCTION_PRIVATE_INTEGRATION_TOKEN"),
      tenantId,
      locationId,
      pipelineId,
      requiredEnv("EEA_ACTIVATION_SERVICES_ACTIVE_STAGE_ID"),
      fields,
    );
    const store = new PostgresActivationStore(requiredEnv("EEA_PAYMENT_PRODUCTION_DATABASE_DATABASE_URL"));
    await store.initialize();
    const policy: ActivationPolicy = {
      tenantId,
      locationId,
      pipelineId,
      qualityReviewStageId: requiredEnv("EEA_ACTIVATION_QUALITY_REVIEW_STAGE_ID"),
      servicesActiveStageId: requiredEnv("EEA_ACTIVATION_SERVICES_ACTIVE_STAGE_ID"),
      qualityReviewApprovers: listEnv("EEA_ACTIVATION_QUALITY_REVIEW_APPROVERS"),
      activationApprovers: listEnv("EEA_ACTIVATION_EAGLE_APPROVERS"),
      maxAgeMs: Number(requiredEnv("EEA_ACTIVATION_MAX_AGE_MINUTES")) * 60_000,
    };
    if (!Number.isFinite(policy.maxAgeMs) || policy.maxAgeMs <= 0) throw new ActivationError("invalid_configuration:max_age", 503);
    const result = await activateServices(activationRequest, gateway, store, policy);
    return NextResponse.json({ activated: result.status === "activated", status: result.status });
  } catch (error) {
    const known = error instanceof ActivationError ? error : new ActivationError("internal_error", 500);
    console.error("eea_service_activation", { code: known.code, status: known.status });
    return NextResponse.json({ activated: false, error: known.code }, { status: known.status });
  }
}
