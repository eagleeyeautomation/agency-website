import { ActivationError, type ActivationGateway, type ActivationRecord, type Decision } from "./eea-activation";

const BASE_URL = "https://services.leadconnectorhq.com";

type CustomField = { id?: string; key?: string; fieldValue?: unknown; fieldValueString?: string; value?: unknown };
type OpportunityResponse = {
  opportunity?: {
    id?: string;
    locationId?: string;
    pipelineId?: string;
    pipelineStageId?: string;
    customFields?: CustomField[];
  };
};

export type ActivationFieldIds = {
  qualityReview: string;
  customerAcceptance: string;
  activationAuthorization: string;
  qualityReviewEvidence: string;
  customerAcceptanceEvidence: string;
  activationAuthorizationEvidence: string;
  guardToken: string;
};

function fieldValue(fields: CustomField[], id: string) {
  const field = fields.find((candidate) => candidate.id === id || candidate.key === id);
  const value = field?.fieldValue ?? field?.fieldValueString ?? field?.value;
  return typeof value === "string" ? value.trim() : "";
}

export class GhlActivationGateway implements ActivationGateway {
  constructor(
    private readonly token: string,
    private readonly tenantId: string,
    private readonly locationId: string,
    private readonly pipelineId: string,
    private readonly servicesActiveStageId: string,
    private readonly fields: ActivationFieldIds,
  ) {}

  private async request(path: string, init: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.token}`,
        version: "2021-07-28",
        ...(init.body ? { "content-type": "application/json" } : {}),
        ...init.headers,
      },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new ActivationError(`ghl_http_${response.status}`, 502);
    return response.json() as Promise<Record<string, unknown>>;
  }

  async read(opportunityId: string): Promise<ActivationRecord> {
    const result = await this.request(`/opportunities/${encodeURIComponent(opportunityId)}`) as OpportunityResponse;
    const opportunity = result.opportunity;
    if (!opportunity?.id) throw new ActivationError("opportunity_not_found", 404);
    const fields = opportunity.customFields ?? [];
    const decision = (statusId: string, evidenceId: string): Decision => ({
      status: fieldValue(fields, statusId),
      evidence: fieldValue(fields, evidenceId),
    });
    return {
      opportunityId: opportunity.id,
      tenantId: this.tenantId,
      locationId: opportunity.locationId ?? "",
      pipelineId: opportunity.pipelineId ?? "",
      stageId: opportunity.pipelineStageId ?? "",
      qualityReview: decision(this.fields.qualityReview, this.fields.qualityReviewEvidence),
      customerAcceptance: decision(this.fields.customerAcceptance, this.fields.customerAcceptanceEvidence),
      activationAuthorization: decision(this.fields.activationAuthorization, this.fields.activationAuthorizationEvidence),
    };
  }

  private async update(opportunityId: string, body: Record<string, unknown>) {
    await this.request(`/opportunities/${encodeURIComponent(opportunityId)}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async setGuardToken(opportunityId: string, token: string) {
    await this.update(opportunityId, { customFields: [{ id: this.fields.guardToken, field_value: token }] });
  }

  async moveToServicesActive(opportunityId: string) {
    await this.update(opportunityId, { pipelineId: this.pipelineId, pipelineStageId: this.servicesActiveStageId });
  }

  async clearGuardToken(opportunityId: string) {
    await this.update(opportunityId, { customFields: [{ id: this.fields.guardToken, field_value: "" }] });
  }

  async readStage(opportunityId: string) {
    return (await this.read(opportunityId)).stageId;
  }
}
