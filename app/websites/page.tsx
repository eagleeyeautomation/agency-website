import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, MonitorSmartphone } from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  eeosApplicationUrl,
  websiteSamples,
  websiteTopics
} from "../site-content";

const pageUrl = "https://www.eagleeyeautomation.com/websites";

export const metadata: Metadata = {
  title: "AI-Powered Business Websites",
  description:
    "Modern business websites with lead capture, AI chat, CRM integration, automation, mobile optimization, and SEO foundations.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "AI-Powered Business Websites | Eagle Eye Automation",
    description:
      "Modern business websites with lead capture, AI chat, CRM integration, automation, mobile optimization, and SEO foundations.",
    url: pageUrl,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Business Websites | Eagle Eye Automation",
    description:
      "Business websites that connect design, lead capture, AI communication, CRM, analytics, and automation."
  }
};

const processSteps = [
  "Strategy",
  "Design",
  "Content",
  "Development",
  "CRM Connection",
  "Automation",
  "Testing",
  "Launch",
  "Optimization"
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eagleeyeautomation.com/" },
      { "@type": "ListItem", position: 2, name: "Websites", item: pageUrl }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-Powered Business Websites",
    provider: { "@type": "Organization", name: "Eagle Eye Automation" },
    areaServed: "United States",
    serviceType: "Business website design and automation-ready website development",
    url: pageUrl,
    description:
      "Eagle Eye Automation builds modern business websites with lead capture, AI chat, CRM integration, automation, mobile optimization, and SEO foundations."
  }
];

export default function WebsitesPage() {
  return (
    <main>
      <SiteHeader active="Websites" />
      <section className="page-hero product-hero">
        <p className="eyebrow">Websites</p>
        <h1>Websites Built to Generate Opportunities</h1>
        <p>
          We create modern, responsive websites that connect design, lead
          capture, AI communication, CRM, analytics, and automation into one
          business-growth system.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#website-capabilities">
            Explore Website Solutions
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href={eeosApplicationUrl}>
            Explore EEOS
          </a>
        </div>
      </section>

      <section className="section video-story-section">
        <div className="video-story-copy">
          <p className="eyebrow">Website motion sequence</p>
          <h2>From website visit to CRM-ready opportunity.</h2>
          <p>
            This sanitized motion sequence shows the business-growth pattern:
            a visitor enters, AI responds, lead details move into CRM, follow-up
            begins, and reporting becomes visible.
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
            poster="/images/websites-growth-video-poster.webp"
            aria-describedby="website-video-transcript"
          >
            <source
              src="/videos/websites-growth-video.webm"
              type="video/webm"
              media="(min-width: 681px) and (prefers-reduced-motion: no-preference)"
            />
          </video>
          <picture className="video-fallback" aria-hidden="true">
            <source media="(max-width: 680px)" srcSet="/images/websites-growth-video-mobile.webp" />
            <img src="/images/websites-growth-video-poster.webp" alt="" loading="lazy" />
          </picture>
          <p id="website-video-transcript" className="sr-only">
            Silent sanitized website demo showing a premium website loading on
            desktop, adapting to tablet and mobile, AI chat, lead form capture,
            CRM handoff, follow-up automation, and analytics reporting. No real
            customer data is displayed.
          </p>
        </div>
      </section>

      <section id="website-capabilities" className="section solutions-overview">
        <div className="section-heading">
          <p className="eyebrow">Website capabilities</p>
          <h2>Business websites that do more than look good.</h2>
        </div>
        <div className="topic-grid">
          {websiteTopics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <section className="section product-visual-section">
        <div className="section-heading">
          <p className="eyebrow">Website samples</p>
          <h2>Sanitized device mockups and concept previews.</h2>
          <p>
            These are clearly labeled concept designs and sample previews. They
            do not display private dashboards, credentials, consumer
            information, or unapproved client branding.
          </p>
        </div>
        <div className="visual-frame">
          <Image
            src="/images/website-samples-sanitized.webp"
            alt="Sanitized website samples showing desktop, tablet, and mobile concept previews for business websites"
            width={1280}
            height={760}
            sizes="(max-width: 900px) 100vw, 88vw"
            className="wide-visual"
          />
        </div>
        <div className="sample-grid">
          {websiteSamples.map((sample) => (
            <article className="sample-card" key={sample.type}>
              <MonitorSmartphone size={24} aria-hidden="true" />
              <span>{sample.label}</span>
              <h3>{sample.type}</h3>
              <p>{sample.industry}</p>
              <ul className="clean-list">
                {sample.capabilities.map((capability) => (
                  <li key={capability}>
                    <Check size={16} aria-hidden="true" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
              <a className="button package-button" href="#website-capabilities">
                See Capabilities
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="section-heading">
          <p className="eyebrow">Website process</p>
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
          <h2>Websites become more valuable when they connect to intelligence.</h2>
          <p>
            A website becomes more valuable when it connects to EEOS, CRM,
            automation, business intelligence, and executive visibility.
          </p>
          <a className="button primary" href={eeosApplicationUrl}>
            Connect Your Website to EEOS
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
