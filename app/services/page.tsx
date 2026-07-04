import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  serviceGroups,
  pricingPackages
} from "../site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation, GoHighLevel CRM setup, business websites, landing pages, dashboards, and custom business software from Eagle Eye Automation."
};

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />

      <section className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>AI, CRM, web, dashboards, and software built for operators.</h1>
        <p>
          Eagle Eye Automation designs practical systems that help businesses
          answer faster, follow up cleaner, report better, and reduce manual
          admin across the work that matters.
        </p>
      </section>

      <section className="section services-section">
        <div className="service-detail-grid">
          {serviceGroups.map(({ icon: Icon, title, text, items }) => (
            <article className="service-detail-card" key={title}>
              <div className="icon-box">
                <Icon size={24} aria-hidden="true" />
              </div>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
                <ul className="clean-list">
                  {items.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing-section">
        <div className="section-heading">
          <p className="eyebrow">Engagement paths</p>
          <h2>Start focused, then expand the system as value becomes clear.</h2>
        </div>
        <div className="pricing-grid">
          {pricingPackages.map((tier) => (
            <article
              className={`pricing-card${tier.featured ? " featured" : ""}`}
              key={tier.title}
            >
              {tier.featured ? <span className="package-badge">Popular</span> : null}
              <h3>{tier.title}</h3>
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
