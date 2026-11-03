import assert from "node:assert/strict";
import test from "node:test";
import { GhlActivationGateway } from "../lib/eea-activation-ghl";

test("GHL opportunity fieldValue responses populate activation decisions", async (context) => {
  const originalFetch = globalThis.fetch;
  context.after(() => { globalThis.fetch = originalFetch; });
  globalThis.fetch = async () => new Response(JSON.stringify({
    opportunity: {
      id: "opportunity_test",
      locationId: "location_test",
      pipelineId: "pipeline_test",
      pipelineStageId: "quality_review",
      customFields: [
        { id: "quality", fieldValue: "Approved" },
        { id: "customer", fieldValue: "Accepted" },
        { id: "activation", fieldValue: "Approved" },
        { id: "quality_evidence", fieldValue: "Reviewer | 2026-11-03T18:22:16.772Z | qr-01" },
        { id: "customer_evidence", fieldValue: "Customer | 2026-11-03T18:22:16.772Z | acceptance-01" },
        { id: "activation_evidence", fieldValue: "Eagle | 2026-11-03T18:22:16.772Z | activation-01" },
      ],
    },
  }), { status: 200, headers: { "content-type": "application/json" } });

  const gateway = new GhlActivationGateway("token", "tenant_test", "location_test", "pipeline_test", "services_active", {
    qualityReview: "quality",
    customerAcceptance: "customer",
    activationAuthorization: "activation",
    qualityReviewEvidence: "quality_evidence",
    customerAcceptanceEvidence: "customer_evidence",
    activationAuthorizationEvidence: "activation_evidence",
    guardToken: "guard",
  });

  const record = await gateway.read("opportunity_test");
  assert.equal(record.qualityReview.status, "Approved");
  assert.equal(record.customerAcceptance.status, "Accepted");
  assert.equal(record.activationAuthorization.status, "Approved");
  assert.match(record.qualityReview.evidence, /qr-01$/);
  assert.match(record.customerAcceptance.evidence, /acceptance-01$/);
  assert.match(record.activationAuthorization.evidence, /activation-01$/);
});
