import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader, productPlatforms } from "../site-content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Eagle Eye Automation products including Eagle Eye Command Center, AI Voice Receptionist, AI Chat Assistant, GoHighLevel implementation, workflow automation, executive dashboards, business intelligence, and website development."
};

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Products</p>
        <h1>Eagle Eye Command Center is the flagship software platform.</h1>
        <p>
          Our product suite helps GoHighLevel-powered businesses answer faster,
          follow up cleaner, automate repeatable work, and give leadership a
          daily command view.
        </p>
      </section>

      <section className="section services-section">
        <div className="service-detail-grid">
          {productPlatforms.map(({ icon: Icon, eyebrow, title, text, items }) => (
            <article className="service-detail-card" key={title}>
              <div className="icon-box">
                <Icon size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="eyebrow">{eyebrow}</p>
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

      <section className="cta-section">
        <div>
          <p className="eyebrow">Build the operating layer</p>
          <h2>Turn GoHighLevel into executive software.</h2>
          <p>
            Start with CRM structure, AI communication, and the dashboard layer
            leadership needs to run the business every morning.
          </p>
        </div>
        <a className="button primary light" href="/contact">
          Request a Demo
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
