import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, LayoutDashboard } from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  CommandCenterPreview,
  EagleGuide,
  crmSamples,
  crmTopics
} from "../site-content";

const pageUrl = "https://www.eagleeyeautomation.com/crm";

export const metadata: Metadata = {
  title: "CRM and Lead Management Solutions",
  description:
    "Manage leads, contacts, pipelines, scheduling, follow-up, reporting, and automation with connected CRM solutions from Eagle Eye Automation.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CRM and Lead Management Solutions | Eagle Eye Automation",
    description:
      "Manage leads, contacts, pipelines, scheduling, follow-up, reporting, and automation with connected CRM solutions from Eagle Eye Automation.",
    url: pageUrl,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM and Lead Management Solutions | Eagle Eye Automation",
    description:
      "Connected CRM solutions for leads, contacts, pipelines, scheduling, follow-up, reporting, and automation."
  }
};

const processSteps = [
  "Capture",
  "Organize",
  "Assign",
  "Follow Up",
  "Schedule",
  "Track",
  "Report",
  "Improve"
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eagleeyeautomation.com/" },
      { "@type": "ListItem", position: 2, name: "CRM", item: pageUrl }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CRM and Lead Management Solutions",
    provider: { "@type": "Organization", name: "Eagle Eye Automation" },
    areaServed: "United States",
    serviceType: "CRM and lead management implementation",
    url: pageUrl,
    description:
      "Eagle Eye Automation helps growing businesses organize leads, customers, pipelines, follow-up, scheduling, and reporting using connected CRM systems."
  }
];

export default function CrmPage() {
  return (
    <main>
      <SiteHeader active="CRM" />
      <section className="page-hero product-hero">
        <p className="eyebrow">CRM</p>
        <h1>CRM data becomes command-center intelligence.</h1>
        <p>
          Eagle Eye Automation gives growing businesses the CRM structure,
          pipeline visibility, follow-up tools, and automation needed to operate
          with greater consistency and control.
        </p>
        <EagleGuide message="The Eagle connects contacts, conversations, pipelines, and tasks into a leadership view the owner can act on." />
        <div className="hero-actions">
          <a className="button primary" href="#crm-capabilities">
            Explore CRM Solutions
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href="/eeos">
            Explore EEOS
          </a>
        </div>
      </section>

      <CommandCenterPreview
        eyebrow="CRM command module"
        title="Pipeline activity turns into executive visibility."
        text="The page combines technology artwork with structured HTML signal rows that show how CRM activity becomes operating intelligence."
        signals={["Contact captured", "Opportunity opened", "Task assigned", "Pipeline reviewed"]}
        image="/images/crm-samples-sanitized.webp"
      />

      <section className="section video-story-section">
        <div className="video-story-copy">
          <p className="eyebrow">CRM motion demo</p>
          <h2>From new lead to dashboard visibility.</h2>
          <p>
            This sanitized demonstration shows a lead entering the system, a
            contact and opportunity being managed, a task being assigned,
            follow-up continuing, appointment tracking, and reporting updating.
          </p>
        </div>
        <div className="video-frame">
          <video
            className="story-video"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            poster="/images/automation-story-poster.webp"
            aria-describedby="crm-video-transcript"
          >
            <source
              src="/videos/eagle-eye-automation-story.webm"
              type="video/webm"
              media="(min-width: 681px) and (prefers-reduced-motion: no-preference)"
            />
          </video>
          <picture className="video-fallback" aria-hidden="true">
            <source media="(max-width: 680px)" srcSet="/images/automation-story-mobile.webp" />
            <img src="/images/automation-story-poster.webp" alt="" loading="lazy" />
          </picture>
          <p id="crm-video-transcript" className="sr-only">
            Silent sanitized CRM demo showing new lead arrival, contact and
            opportunity management, task assignment, follow-up, appointment
            tracking, and dashboard updates.
          </p>
        </div>
      </section>

      <section id="crm-capabilities" className="section solutions-overview">
        <div className="section-heading">
          <p className="eyebrow">CRM capabilities</p>
          <h2>Structure for leads, customers, pipelines, follow-up, and reporting.</h2>
          <p>
            GoHighLevel can serve as an available operational CRM and automation
            layer where appropriate. It is not presented as an Eagle Eye
            Automation proprietary product.
          </p>
        </div>
        <div className="topic-grid">
          {crmTopics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <section className="section product-visual-section">
        <div className="section-heading">
          <p className="eyebrow">CRM samples</p>
          <h2>Sanitized CRM examples with synthetic data only.</h2>
          <p>
            These sample views are illustrative. They do not show real phone
            numbers, email addresses, consumer health information, internal
            credentials, production IDs, or live customer accounts.
          </p>
        </div>
        <div className="visual-frame">
          <Image
            src="/images/crm-samples-sanitized.webp"
            alt="Sanitized CRM sample showing synthetic lead pipeline, opportunity stages, task views, and reporting"
            width={1280}
            height={760}
            sizes="(max-width: 900px) 100vw, 88vw"
            className="wide-visual"
          />
        </div>
        <div className="sample-grid">
          {crmSamples.map((sample) => (
            <article className="sample-card" key={sample.title}>
              <LayoutDashboard size={24} aria-hidden="true" />
              <span>{sample.label}</span>
              <h3>{sample.title}</h3>
              <ul className="clean-list">
                {sample.details.map((detail) => (
                  <li key={detail}>
                    <Check size={16} aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="section-heading">
          <p className="eyebrow">CRM process</p>
          <h2>{processSteps.join(" → ")}</h2>
        </div>
        <div className="process-strip">
          {processSteps.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      </section>

      <section className="section eeos-connection-section">
        <div>
          <p className="eyebrow">EEOS connection</p>
          <h2>CRM manages customer activity. EEOS connects the intelligence.</h2>
          <p>
            EEOS connects CRM information with automation, operational
            intelligence, business memory, and executive recommendations so
            leaders can understand customer activity in context.
          </p>
          <a className="button primary" href="/eeos">
            See CRM Inside the EEOS Ecosystem
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
