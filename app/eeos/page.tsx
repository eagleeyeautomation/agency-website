import type { Metadata } from "next";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  CommandCenterPreview,
  SiteFooter,
  SiteHeader,
  eeosApplicationUrl,
  eeosApplicationLoginUrl,
  productFullName,
  productTagline
} from "../site-content";

export const metadata: Metadata = {
  title: "EEOS",
  description:
    "EEOS — Eagle Eye Operating System is the AI Operating System for Service Businesses and the executive AI layer for leads, calls, missed opportunities, follow-ups, appointments, pipeline activity, and daily performance."
};

const monitorItems = [
  {
    title: "Leads and new inquiries",
    text: "See new demand and where opportunities are entering the business."
  },
  {
    title: "Answered and missed calls",
    text: "Understand call activity and identify response gaps."
  },
  {
    title: "Follow-up status and aging",
    text: "Track open follow-up and opportunities that need attention."
  },
  {
    title: "Appointments and missed appointments",
    text: "Review scheduled activity, attendance, and missed visits."
  },
  {
    title: "Pipeline movement and value",
    text: "See how opportunities progress and where value is concentrated."
  },
  {
    title: "Daily performance patterns",
    text: "Recognize recurring activity, changes, and operational trends."
  }
];

const signalMap = [
  "Connected activity",
  "Operational context",
  "Business patterns",
  "Executive recommendations"
];

export default function EeosPage() {
  return (
    <main className="eeos-page-root">
      <SiteHeader />

      <section className="page-hero product-hero eeos-page-hero">
        <p className="eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          {productTagline}
        </p>
        <h1>{productFullName}</h1>
        <p>
          EEOS gives service-business owners clearer operational visibility
          across leads, calls, follow-up, appointments, pipeline activity, and
          daily performance.
        </p>
      </section>

      <CommandCenterPreview
        eyebrow="EEOS executive intelligence"
        title="See the business signals that deserve leadership attention."
        text="EEOS brings approved business activity into a clearer operating view so owners can understand performance, identify patterns, and act on better information."
        signals={["Business activity", "Operational context", "Executive visibility", "Recommended next steps"]}
        image="/media/eeos/eeos-executive-intelligence.jpg"
        priority
      />

      <section className="section eeos-how-section">
        <div className="eeos-how-copy">
          <p className="eyebrow">Executive AI Layer</p>
          <h2>One operating view for the work that usually gets scattered.</h2>
          <p>
            EEOS is designed to connect approved operational systems, organize
            business activity, identify meaningful patterns, and provide
            executive recommendations based on the information available.
          </p>
          <a className="button eeos-dark-button" href={eeosApplicationLoginUrl}>
            Login to EEOS
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="eeos-signal-panel">
          <div className="eeos-signal-heading">
            <Sparkles size={20} aria-hidden="true" />
            EEOS signal map
          </div>
          <div className="eeos-signal-grid">
            {signalMap.map((signal, index) => (
              <div key={signal}>
                <span>{index + 1}</span>
                <strong>{signal}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section eeos-monitors-section">
        <div className="section-heading">
          <p className="eyebrow">What EEOS Monitors</p>
          <h2>Daily business activity, organized for clearer decisions.</h2>
          <p>
            Visibility is available based on onboarding, approved integrations,
            and the systems connected for each organization.
          </p>
        </div>
        <div className="eeos-monitor-grid">
          {monitorItems.map((item) => (
            <article className="eeos-monitor-card" key={item.title}>
              <Check size={20} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section eeos-access-section">
        <div>
          <p className="eyebrow">Application Access</p>
          <h2>Customers access EEOS through the branded application.</h2>
          <p>
            Eagle Eye Automation Group is the company. EEOS is its flagship
            software platform. Approved customers and administrators access
            EEOS through app.geteeos.com after their organization has been
            created and onboarding is complete.
          </p>
        </div>
        <a className="button eeos-dark-button" href={eeosApplicationUrl}>
          Login to EEOS
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>

      <section className="cta-section eeos-final-cta">
        <div>
          <p className="eyebrow">Explore EEOS</p>
          <h2>See how executive intelligence can support your business.</h2>
          <p>
            Request a demonstration to explore the visibility, workflows, and
            recommendations available for your organization.
          </p>
        </div>
        <a className="button primary light" href="/contact">
          Request a Demo
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>

      <SiteFooter showEeosTransition={false} />
    </main>
  );
}
