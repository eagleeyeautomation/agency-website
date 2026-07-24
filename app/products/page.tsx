import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import {
  CommandCenterPreview,
  EagleGuide,
  SiteFooter,
  SiteHeader,
  productPlatforms
} from "../site-content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Eagle Eye Automation products including EEOS — Eagle Eye Operating System, AI Voice Receptionist, AI Chat Assistant, GoHighLevel implementation, workflow automation, executive dashboards, business intelligence, and website development."
};

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Products</p>
        <h1>EEOS is the flagship AI operating system.</h1>
        <p>
          The product experience is built like a command center: intelligence,
          automation, visibility, and secure operating control in one premium
          software ecosystem.
        </p>
        <EagleGuide message="The Eagle points each owner toward the next layer of visibility: signals, priorities, recommendations, and action." />
      </section>

      <CommandCenterPreview
        eyebrow="Flagship platform"
        title="EEOS brings enterprise operating power into one guided cockpit."
        text="The product suite is organized as business command modules rather than disconnected tools."
        signals={["Executive dashboard", "AI recommendations", "Integration health", "Secure command access"]}
        image="/images/eeos-sanitized-dashboard.svg"
      />

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
