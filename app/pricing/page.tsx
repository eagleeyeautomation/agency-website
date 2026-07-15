import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader, pricingPackages } from "../site-content";

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
          Start with a focused foundation, expand into automation, or build a
          custom EEOS operating layer around GoHighLevel and executive visibility.
          Starter and Growth packages use starting-at pricing. Enterprise
          solutions are quoted after scoping.
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
      </section>
      <SiteFooter />
    </main>
  );
}
