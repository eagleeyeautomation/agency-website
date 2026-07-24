import type { Metadata } from "next";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  CommandCenterPreview,
  EagleGuide,
  SiteFooter,
  SiteHeader,
  eeosApplicationUrl,
  eeosApplicationLoginUrl,
  eeosSignals,
  productFullName,
  productTagline
} from "../site-content";

export const metadata: Metadata = {
  title: "EEOS",
  description:
    "EEOS — Eagle Eye Operating System is the AI Operating System for Service Businesses and the executive AI layer for leads, calls, missed opportunities, follow-ups, appointments, pipeline activity, and daily performance."
};

export default function EeosPage() {
  return (
    <main>
      <SiteHeader />

      <section className="page-hero product-hero">
        <p className="eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          {productTagline}
        </p>
        <h1>{productFullName}</h1>
        <p>
          EEOS helps service business owners understand the activity that drives
          growth: leads, calls, missed opportunities, follow-ups, appointments,
          pipeline movement, and daily business performance.
        </p>
        <EagleGuide message="The EEOS Eagle guides owners through business signals, AI reasoning, and the decisions that shape tomorrow's performance." />
      </section>

      <CommandCenterPreview
        eyebrow="EEOS command center"
        title="Step inside tomorrow's owner operating system."
        text="EEOS is presented as a guided command experience where cinematic intelligence artwork and live HTML signal layers work together."
        signals={["Business signals", "AI reasoning", "Executive briefing", "Next best action"]}
        image="/media/eeos/eeos-executive-intelligence.jpg"
      />

      <section className="section split-section">
        <div>
          <p className="eyebrow">Executive AI layer</p>
          <h2>One operating view for the work that usually gets scattered.</h2>
          <p>
            EEOS is designed to sit above tools like GoHighLevel and turn daily
            CRM, communication, appointment, and pipeline activity into owner
            clarity. The frontend is ready for future GHL forms, calendars,
            chat, tracking, funnels, and automation codes.
          </p>
          <a className="button package-button" href={eeosApplicationLoginUrl}>
            Login to EEOS
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="system-panel">
          <div className="system-panel-header">
            <Sparkles size={20} aria-hidden="true" />
            EEOS signal map
          </div>
          <div className="tool-grid">
            {eeosSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
          <div className="metric-row">
            <div>
              <strong>AI</strong>
              <span>Owner layer</span>
            </div>
            <div>
              <strong>GHL</strong>
              <span>Ready to connect</span>
            </div>
            <div>
              <strong>Daily</strong>
              <span>Performance view</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="section-heading">
          <p className="eyebrow">What EEOS monitors</p>
          <h2>Built for service businesses that need faster decisions.</h2>
          <p>
            EEOS is prepared to organize the signals owners ask about every
            morning and turn them into practical visibility.
          </p>
        </div>
        <div className="service-grid">
          {[
            "Lead sources and new inquiries",
            "Answered and missed calls",
            "Follow-up status and aging",
            "Booked and missed appointments",
            "Pipeline stages and value",
            "Daily performance patterns",
            "Owner alerts and priorities",
            "Automation opportunities"
          ].map((item) => (
            <article className="service-card eeos-card" key={item}>
              <Check size={20} aria-hidden="true" />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section ghl-section">
        <div className="section-heading">
          <p className="eyebrow">EEOS application access</p>
          <h2>Customers access EEOS through the branded application URL.</h2>
          <p>
            Eagle Eye Automation is the company. EEOS is the flagship software
            platform. GoHighLevel is an integrated operational system, not the
            EEOS brand. Customers sign in through app.geteeos.com after their
            organization has been created and onboarding is ready.
          </p>
        </div>
        <a className="button package-button" href={eeosApplicationLoginUrl}>
          Login to EEOS
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Launch EEOS</p>
          <h2>Owners launch EEOS from app.geteeos.com.</h2>
          <p>
            Public visitors can request a demonstration or speak to EEOS Brain
            from the Eagle Eye Automation website. Authenticated owners and
            platform administrators use the EEOS application.
          </p>
        </div>
        <a className="button primary light" href={eeosApplicationUrl}>
          Launch EEOS
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
