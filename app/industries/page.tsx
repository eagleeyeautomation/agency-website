import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader, industries } from "../site-content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industries served by Eagle Eye Automation including home care, healthcare, real estate, small business, and professional services."
};

export default function IndustriesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Industries</p>
        <h1>Built for businesses where response and operations matter.</h1>
        <p>
          Eagle Eye Automation is strongest in companies that need better lead
          capture, faster follow-up, reliable handoffs, and executive visibility.
        </p>
      </section>

      <section className="section">
        <div className="industry-grid industry-grid-large">
          {industries.map((industry) => (
            <article className="industry-card" key={industry.title}>
              <h2>{industry.title}</h2>
              <p>{industry.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Industry fit</p>
          <h2>Start with your operating bottleneck.</h2>
          <p>
            If your business depends on leads, calls, appointments, follow-up,
            and reporting, there is likely a strong automation opportunity.
          </p>
        </div>
        <a className="button primary light" href="/contact">
          Talk through fit
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
