import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader, productPlatforms, solutions } from "../site-content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Solutions for AI voice, AI chat, GoHighLevel CRM implementation, workflow automation, executive dashboards, and business intelligence."
};

export default function SolutionsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Solutions</p>
        <h1>Practical systems for response, follow-up, visibility, and growth.</h1>
        <p>
          Eagle Eye Automation combines AI, GoHighLevel, workflow automation,
          dashboards, and business intelligence into systems that operators can
          actually use.
        </p>
      </section>

      <section className="section">
        <div className="portfolio-detail-grid">
          {solutions.map((solution) => (
            <article className="portfolio-detail-card" key={solution.title}>
              <span>Solution</span>
              <h2>{solution.title}</h2>
              <p>{solution.text}</p>
              <ul className="clean-list">
                {solution.items.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section services-section">
        <div className="section-heading">
          <p className="eyebrow">Core capabilities</p>
          <h2>Everything connects back to the operating system.</h2>
        </div>
        <div className="service-grid service-grid-wide">
          {productPlatforms.map(({ icon: Icon, title, text }) => (
            <article className="service-card" key={title}>
              <div className="icon-box">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Map the workflow before building the automation.</h2>
          <p>
            We start with your current lead, intake, CRM, and reporting process,
            then design the right implementation path.
          </p>
        </div>
        <a className="button primary light" href="/contact">
          Request a consultation
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
