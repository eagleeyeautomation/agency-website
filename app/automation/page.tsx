import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  automationTopics,
  automationUseCases,
  eeosProductSiteUrl
} from "../site-content";

const pageUrl = "https://www.eagleeyeautomation.com/automation";

export const metadata: Metadata = {
  title: "Automation Solutions for Small Businesses",
  description:
    "Automate lead response, customer follow-up, scheduling, CRM updates, staff notifications, and business workflows with Eagle Eye Automation.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Automation Solutions for Small Businesses | Eagle Eye Automation",
    description:
      "Automate lead response, customer follow-up, scheduling, CRM updates, staff notifications, and business workflows with Eagle Eye Automation.",
    url: pageUrl,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation Solutions for Small Businesses | Eagle Eye Automation",
    description:
      "Automate lead response, follow-up, scheduling, CRM updates, staff notifications, and business workflows."
  }
};

const processSteps = [
  "Lead Enters",
  "AI Responds",
  "CRM Updates",
  "Staff Is Notified",
  "Appointment Is Scheduled",
  "Follow-Up Continues",
  "Performance Is Measured"
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eagleeyeautomation.com/" },
      { "@type": "ListItem", position: 2, name: "Automation", item: pageUrl }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automation Solutions for Small Businesses",
    provider: { "@type": "Organization", name: "Eagle Eye Automation" },
    areaServed: "United States",
    serviceType: "Business automation and workflow automation",
    url: pageUrl,
    description:
      "Eagle Eye Automation helps service businesses automate lead response, customer follow-up, scheduling, CRM updates, staff notifications, and reporting workflows."
  }
];

export default function AutomationPage() {
  return (
    <main>
      <SiteHeader active="Automation" />
      <section className="page-hero product-hero">
        <p className="eyebrow">Automation</p>
        <h1>Automate the Work That Slows Your Business Down</h1>
        <p>
          Eagle Eye Automation helps service businesses respond faster, reduce
          repetitive work, improve follow-up, and keep every opportunity moving
          through intelligent connected automation.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#automation-capabilities">
            Explore Automation Solutions
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href={eeosProductSiteUrl}>
            Explore EEOS
          </a>
        </div>
      </section>

      <section className="section video-story-section">
        <div className="video-story-copy">
          <p className="eyebrow">Automation demo</p>
          <h2>From new lead to measured performance.</h2>
          <p>
            This muted demonstration shows a sanitized workflow: a lead enters,
            AI responds, CRM activity updates, staff receives a notification,
            the next action is scheduled, and reporting becomes visible.
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
            aria-describedby="automation-transcript"
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
          <p id="automation-transcript" className="sr-only">
            Silent sanitized automation demo showing lead entry, AI response,
            CRM update, staff notification, appointment scheduling, follow-up,
            and reporting. No real records are displayed.
          </p>
        </div>
      </section>

      <section className="section automation-flow-section">
        <div className="section-heading">
          <p className="eyebrow">Workflow visual</p>
          <h2>{processSteps.join(" → ")}</h2>
          <p>
            Automation availability depends on each client setup, approvals, and
            connected systems. This visual shows a controlled operating pattern,
            not a claim that every automation is active for every client.
          </p>
        </div>
        <div className="visual-frame">
          <Image
            src="/images/automation-flow-visual.webp"
            alt="Automation workflow diagram from lead entry to AI response, CRM update, staff notification, appointment scheduling, follow-up, and measurement"
            width={1280}
            height={520}
            sizes="(max-width: 900px) 100vw, 88vw"
            className="wide-visual"
          />
        </div>
      </section>

      <section id="automation-capabilities" className="section solutions-overview">
        <div className="section-heading">
          <p className="eyebrow">Key capabilities</p>
          <h2>Automation that supports response, follow-up, routing, and reporting.</h2>
        </div>
        <div className="topic-grid">
          {automationTopics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <section className="section industry-section">
        <div className="section-heading">
          <p className="eyebrow">Use cases</p>
          <h2>Corporate examples without exposing customer information.</h2>
        </div>
        <div className="solution-group-grid">
          {automationUseCases.map((useCase) => (
            <article className="solution-group-card compact-solution-card" key={useCase}>
              <Sparkles size={24} aria-hidden="true" />
              <h3>{useCase}</h3>
              <p>
                A configurable automation pattern using approved systems,
                permissions, and human oversight where required.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section eeos-connection-section">
        <div>
          <p className="eyebrow">EEOS connection</p>
          <h2>Automation handles the actions. EEOS adds intelligence.</h2>
          <p>
            EEOS adds operational visibility and executive recommendations
            across the connected business system so leaders can understand what
            happened, what needs attention, and where follow-up should improve.
          </p>
          <a className="button primary" href={eeosProductSiteUrl}>
            See How EEOS Connects It All
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
