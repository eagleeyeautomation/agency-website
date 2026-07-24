import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader, pricingPackages, setupFee } from "../site-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Eagle Eye Automation pricing paths for EEOS, starter, growth, and enterprise AI automation, GoHighLevel-ready websites, dashboard, and software builds."
};

export default function PricingPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Packages that match your stage of growth.</h1>
        <p>
          Start with the founding customer pricing path for EEOS, the AI
          Operating System that gives small businesses the power of Fortune 500
          companies through AI, automation, and executive intelligence.
        </p>
      </section>

      <section className="section pricing-section">
        <div className="pricing-grid">
          {pricingPackages.map((tier) => (
            <article className={`pricing-card${tier.featured ? " featured" : ""}`} key={tier.title}>
              {tier.featured ? <span className="package-badge">Popular</span> : null}
              <h2>{tier.title}</h2>
              <p className="price-line">{tier.price}</p>
              <p>{tier.text}</p>
              <ul className="clean-list">
                {tier.items.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a className="button package-button" href="/contact">
                {tier.cta}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <div className="setup-fee-card">
          <p className="eyebrow">{setupFee.title}</p>
          <h2>{setupFee.price}</h2>
          <p>{setupFee.statement}</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
