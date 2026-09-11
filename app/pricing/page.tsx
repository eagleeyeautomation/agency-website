import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader } from "../site-content";
import {
  ADDON_DISPLAY_DISCLOSURES,
  FOUNDING_CUSTOMER_PLANS,
  OPTIONAL_INTELLIGENCE_ADDONS,
  PUBLIC_CONTACT,
  SETUP_FEE,
} from "./pricing-data";

export const metadata: Metadata = {
  title: "Service Pricing",
  description:
    "Eagle Eye Automation service packages for automation, executive visibility, GoHighLevel integration, intelligence, onboarding, and operational support.",
};

const FAQS = [
  {
    question: "Who are these service packages for?",
    answer:
      "They are for small and growing service businesses that want Eagle Eye Automation to configure clearer operating visibility, GoHighLevel connections, intelligence, and automation support.",
  },
  {
    question: "Is the setup fee a deposit?",
    answer:
      "No. It is a one-time setup and onboarding fee due when onboarding begins and is separate from the monthly service package.",
  },
  {
    question: "What integration is supported first?",
    answer:
      "The current service packages focus on GoHighLevel. Additional integrations require readiness review and an approved connector scope.",
  },
  {
    question: "Will every dashboard section show data immediately?",
    answer:
      "No. Managed views show truthful empty states until connected systems have synchronized enough verified activity to populate each section.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <SiteHeader />

      <section className="page-hero pricing-page-hero">
        <p className="eyebrow">Eagle Eye Automation Services</p>
        <h1>Service packages built for clearer operations and practical growth.</h1>
        <p>
          Choose an Eagle Eye Automation service package for executive visibility,
          GoHighLevel connection, automation planning, and ongoing operating support.
          These are company service packages; SaaS product pricing is separate.
        </p>
        <div className="pricing-hero-actions">
          <a className="button" href="/contact">
            Request a Consultation <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href={PUBLIC_CONTACT.mailto}>
            Email Eagle Eye
          </a>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="section-heading pricing-heading">
          <p className="eyebrow">Eagle Eye Automation Services</p>
          <h2>Monthly service packages</h2>
          <p>
            Package capabilities are limited to services currently available or
            actively supported during onboarding.
          </p>
        </div>

        <div className="pricing-grid">
          {FOUNDING_CUSTOMER_PLANS.map((plan) => (
            <article className={`pricing-card${plan.featured ? " featured" : ""}`} key={plan.id}>
              {plan.featured ? <span className="package-badge">Popular starting point</span> : null}
              <p className="pricing-code">{plan.name} / {plan.planCode}</p>
              <h3>{plan.name}</h3>
              <p className="price-line">{plan.price}<span>{plan.cadence}</span></p>
              <p>{plan.customerType}</p>
              <p className="pricing-limit">{plan.locationLimit}</p>
              <ul className="clean-list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pricing-fee-note">
                <strong>{SETUP_FEE.label}: {SETUP_FEE.price}</strong>
                <span>{SETUP_FEE.disclosure}</span>
              </div>
              <a className="button package-button" href="/contact">
                {plan.cta} <ArrowRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing-addons-section">
        <div className="section-heading pricing-heading">
          <p className="eyebrow">Optional Intelligence and Growth Add-ons</p>
          <h2>Add services only when the business is ready.</h2>
          <p>
            Add-ons are approved service entitlements. No payment provider is
            connected and no organization is charged automatically.
          </p>
        </div>

        <div className="pricing-addon-grid">
          {OPTIONAL_INTELLIGENCE_ADDONS.map((addon) => (
            <article className="pricing-addon-card" key={addon.key}>
              <p className="pricing-code">{addon.key}</p>
              <h3>{addon.name}</h3>
              <p className="price-line">{addon.price}{addon.cadence ? <span>{addon.cadence}</span> : null}</p>
              <p className="pricing-billing-type">{addon.billingType}</p>
              <p>{addon.description}</p>

              <dl className="pricing-addon-details">
                <div><dt>What it does</dt><dd>{addon.whatItDoes}</dd></div>
                <div><dt>Who it helps</dt><dd>{addon.whoItHelps}</dd></div>
                <div><dt>Example use case</dt><dd>{addon.exampleUseCase}</dd></div>
              </dl>

              <h4>Included capabilities</h4>
              <ul className="clean-list">
                {addon.includedCapabilities.map((capability) => (
                  <li key={capability}>
                    <Check size={16} aria-hidden="true" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>

              <div className="pricing-exclusion">
                <strong>Not included</strong>
                <span>{addon.exclusions}</span>
              </div>
              <p className="pricing-requirement">{addon.basePlanRequirement}</p>
            </article>
          ))}
        </div>

        <div className="pricing-disclosures">
          <p className="eyebrow">Add-on terms</p>
          <ul className="clean-list">
            {ADDON_DISPLAY_DISCLOSURES.map((disclosure) => (
              <li key={disclosure}>
                <Check size={16} aria-hidden="true" />
                <span>{disclosure}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pricing-setup-section">
        <div className="setup-fee-card">
          <p className="eyebrow">{SETUP_FEE.label}</p>
          <h2>{SETUP_FEE.price}</h2>
          <p>{SETUP_FEE.disclosure}</p>
          <ul className="clean-list setup-fee-list">
            {SETUP_FEE.covers.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pricing-faq-section">
        <div className="section-heading pricing-heading">
          <p className="eyebrow">Common questions</p>
          <h2>Service package details</h2>
        </div>
        <div className="pricing-faq-grid">
          {FAQS.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
