import type { Metadata } from "next";
import { BrainCircuit, Check } from "lucide-react";
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
    "Eagle Eye Automation products: EEOS — Eagle Eye Operating System and EEA Scout market and opportunity intelligence."
};

export default function ProductsPage() {
  const eeos = productPlatforms[0];

  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Products</p>
        <h1>EEOS is the flagship AI operating system.</h1>
        <p>
          EEOS is Eagle Eye Automation&apos;s flagship product. Customer access
          remains controlled while production-readiness work continues.
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
          {[eeos].map(({ icon: Icon, eyebrow, title, text, items }) => (
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
          <article className="service-detail-card">
            <div className="icon-box">
              <BrainCircuit size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">In development</p>
              <h2>EEA Scout</h2>
              <p>
                EEA Scout is Eagle Eye Automation&apos;s market and opportunity
                intelligence product. It is not currently commercially available.
              </p>
              <ul className="clean-list">
                <li><Check size={16} aria-hidden="true" /><span>Market intelligence</span></li>
                <li><Check size={16} aria-hidden="true" /><span>Opportunity research</span></li>
                <li><Check size={16} aria-hidden="true" /><span>Human-controlled next steps</span></li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
