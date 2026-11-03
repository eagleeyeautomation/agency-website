import { AmbiguousForwardError, BridgeError, EEA_LOCATION_ID, type Forwarder, type NormalizedEvent } from "./eea-stripe-bridge";

const BASE_URL = "https://services.leadconnectorhq.com";

type Contact = { id?: string; email?: string };
type Opportunity = { id?: string; contact?: { id?: string }; contactId?: string };

export class GhlApiForwarder implements Forwarder {
  constructor(
    private readonly token: string,
    private readonly pipelineId: string,
    private readonly stageId: string,
    private readonly onboardingWorkflowId: string,
  ) {}

  private async request(path: string, init: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.token}`,
        version: "v3",
        ...(init.body ? { "content-type": "application/json" } : {}),
        ...init.headers,
      },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      const operation = `${init.method ?? "GET"}_${path.split("?")[0]}`
        .replaceAll("/", "_")
        .replace(/^_+|_+$/g, "");
      throw new Error(`ghl_http_${response.status}_${operation}`);
    }
    return response.json() as Promise<Record<string, unknown>>;
  }

  private async resolveContact(event: NormalizedEvent): Promise<string> {
    const query = new URLSearchParams({ locationId: EEA_LOCATION_ID, email: event.email, limit: "20" });
    const result = await this.request(`/contacts/lookup?${query}`);
    const matches = (result.contacts as Contact[] | undefined) ?? [];
    const exact = matches.filter((contact) => contact.email?.trim().toLowerCase() === event.email);
    if (exact.length > 1) throw new BridgeError("ambiguous_contact_match", 409);
    if (exact.length === 1 && exact[0].id) return exact[0].id;
    const upsert = await this.request("/contacts/upsert", {
      method: "POST",
      body: JSON.stringify({
        locationId: EEA_LOCATION_ID,
        email: event.email,
        name: event.name ?? undefined,
        phone: event.phone ?? undefined,
        source: "EEA Stripe Payment Bridge",
        createNewIfDuplicateAllowed: false,
      }),
    });
    const id = (upsert.contact as Contact | undefined)?.id;
    if (!id) throw new Error("ghl_contact_id_missing");
    return id;
  }

  async send(event: NormalizedEvent) {
    const contactId = await this.resolveContact(event);
    const query = new URLSearchParams({
      locationId: EEA_LOCATION_ID,
      pipelineId: this.pipelineId,
      contactId,
      status: "all",
      limit: "100",
    });
    const result = await this.request(`/opportunities/search?${query}`);
    const opportunities = (result.opportunities as Opportunity[] | undefined) ?? [];
    if (opportunities.length > 1) throw new BridgeError("ambiguous_opportunity_match", 409);
    const body = {
      pipelineId: this.pipelineId,
      pipelineStageId: this.stageId,
      status: "open",
      monetaryValue: event.amountCents / 100,
      name: `EEA ${event.offer} — ${event.email}`,
    };
    if (opportunities.length === 1 && opportunities[0].id) {
      await this.request(`/opportunities/${opportunities[0].id}`, { method: "PUT", body: JSON.stringify(body) });
    } else {
      await this.request("/opportunities/", {
        method: "POST",
        body: JSON.stringify({ ...body, locationId: EEA_LOCATION_ID, contactId }),
      });
    }

    // The Stripe event/payment pair is claimed durably before this call. Enroll
    // explicitly so an existing opportunity that is already Payment Confirmed
    // does not depend on a pipeline-stage transition to start onboarding.
    try {
      await this.request(`/contacts/${contactId}/workflow/${this.onboardingWorkflowId}`, {
        method: "POST",
        body: JSON.stringify({ eventStartTime: new Date().toISOString() }),
      });
    } catch (error) {
      // An HTTP response proves GHL rejected the request and is safe to retry.
      // A timeout/network failure may have enrolled the contact before the
      // response was lost, so block automatic replay pending reconciliation.
      if (error instanceof Error && error.message.startsWith("ghl_http_")) throw error;
      throw new AmbiguousForwardError("ghl_onboarding_delivery_uncertain", error);
    }
  }
}
