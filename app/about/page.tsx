import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  companyValues,
  companyMission,
  companyStrengths,
  corporateHeadline,
  productFullName
} from "../site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Eagle Eye Automation, the company building EEOS, AI software, GoHighLevel-ready websites, workflow automation, dashboards, and business intelligence systems."
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>{corporateHeadline}</h1>
        <p>
          Eagle Eye Automation was created to close the technology gap between
          large enterprises and small service businesses. {companyMission}
        </p>
      </section>

      <section className="section about-section">
        <div className="about-grid">
          <article className="story-panel">
            <p className="eyebrow">Company story</p>
            <h2>Intelligent software for service businesses that need more operational power.</h2>
            <p>
              We build intelligent software and connected automation systems
              that help organizations capture more opportunities, improve
              customer experiences, simplify operations, and make better
              decisions.
            </p>
          </article>
          <article className="company-panel">
            <div className="company-avatar" aria-hidden="true">
              AI
            </div>
            <div>
              <p className="eyebrow">Product philosophy</p>
              <h2>Connected systems over disconnected tools.</h2>
              <p>
                {productFullName} is the flagship software platform from Eagle
                Eye Automation. EEOS brings lead generation, CRM, automation,
                operational visibility, business intelligence, and executive
                recommendations into one connected ecosystem.
              </p>
            </div>
            <div className="experience-list">
              {companyStrengths.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Mission, vision, and values</p>
          <h2>Building AI today that helps businesses succeed tomorrow.</h2>
          <p>
            Our vision is a market where small and growing service businesses
            can access the technology advantage, operational discipline, and
            customer-management intelligence normally reserved for much larger
            companies.
          </p>
        </div>
        <div className="service-grid">
          {companyValues.map((value) => (
            <article className="service-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Industries served</p>
          <h2>Focused on service businesses where response, follow-up, and visibility matter.</h2>
          <p>
            Eagle Eye Automation supports organizations such as home care,
            healthcare services, churches and faith organizations, professional
            services, contractors, local service companies, and multi-location
            businesses.
          </p>
        </div>
        <div className="system-panel">
          <div className="system-panel-header">Eagle Eye Automation + EEOS</div>
          <p>
            Eagle Eye Automation is the company. EEOS is the flagship software
            platform. Together, they give service businesses a connected
            operating layer for leads, customers, workflows, reporting, and
            executive intelligence.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Work with us</p>
          <h2>Build the system your team actually needs.</h2>
          <p>
            Start with a demo request and we will map the fastest path from
            operational bottleneck to useful business software.
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
