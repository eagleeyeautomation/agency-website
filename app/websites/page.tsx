import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Blocks,
  Gauge,
  LayoutTemplate,
  MessageSquareMore,
  MonitorSmartphone,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow
} from "lucide-react";
import { SiteFooter, SiteHeader, getContactDetails } from "../site-content";

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

const websiteCapabilities = [
  {
    title: "Custom Website Design",
    description: "A professional website designed around your brand, audience, and business goals.",
    icon: LayoutTemplate
  },
  {
    title: "Mobile-Responsive Development",
    description: "A seamless experience across desktop, tablet, and mobile devices.",
    icon: MonitorSmartphone
  },
  {
    title: "Lead-Capture Foundations",
    description: "Clear calls to action, forms, chat, and pathways that help visitors take the next step.",
    icon: MessageSquareMore
  },
  {
    title: "SEO Foundations",
    description: "Clean structure, page metadata, and technical foundations that support search visibility.",
    icon: Search
  },
  {
    title: "Fast and Secure Performance",
    description: "Modern development practices focused on speed, stability, and responsible security.",
    icon: Gauge
  },
  {
    title: "Connected Business Systems",
    description: "Connect website inquiries to approved CRM, communication, scheduling, and follow-up systems.",
    icon: Blocks
  }
];

const websiteBenefits = [
  {
    title: "Build Credibility",
    description: "Present your business with a professional and trustworthy digital presence.",
    icon: ShieldCheck
  },
  {
    title: "Capture More Opportunities",
    description: "Give visitors clear ways to call, request information, schedule, or begin a conversation.",
    icon: TrendingUp
  },
  {
    title: "Respond Faster",
    description: "Route inquiries into connected systems so the right team can follow up quickly.",
    icon: Route
  },
  {
    title: "Support Growth",
    description: "Create a scalable digital foundation that can expand with your services, locations, and customer needs.",
    icon: Sparkles
  }
];

const websiteProcess = [
  { title: "Discover", description: "Understand the business, audience, goals, and required functionality." },
  { title: "Plan", description: "Define the site structure, messaging, conversion paths, and integrations." },
  { title: "Design", description: "Create a responsive visual experience aligned with the approved brand." },
  { title: "Build", description: "Develop, test, optimize, and connect the approved systems." },
  { title: "Launch", description: "Deploy the site and verify performance across desktop and mobile." }
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
  const { bookingHref } = getContactDetails();

  return (
    <main>
      <SiteHeader active="Websites" />

      <section className="page-hero product-hero websites-page-hero">
        <div className="websites-hero-copy">
          <p className="eyebrow">Websites</p>
          <h1>Websites built to attract, engage, and convert.</h1>
          <p>
            Eagle Eye Automation Group builds modern websites that strengthen
            your brand, capture customer interest, and connect visitors to the
            right next step.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/contact">
              Start Your Website
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="/contact">
              Request a Demo
            </a>
          </div>
        </div>
        <div className="websites-hero-art">
          <Image
            src="/media/eagle-eye/eea-website-builder-hero.png"
            alt="Eagle Eye Automation Group website design services displayed across desktop, laptop, tablet, and mobile devices"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1020px) 100vw, 58vw"
          />
        </div>
      </section>

      <section className="section websites-capability-section">
        <div className="section-heading">
          <p className="eyebrow">What We Build</p>
          <h2>Professional websites built for growing businesses.</h2>
        </div>
        <div className="websites-capability-grid">
          {websiteCapabilities.map(({ title, description, icon: Icon }) => (
            <article className="websites-capability-card" key={title}>
              <span className="tech-icon">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section websites-benefit-section">
        <div className="section-heading">
          <p className="eyebrow">Business Benefits</p>
          <h2>A website should do more than look good.</h2>
        </div>
        <div className="websites-benefit-grid">
          {websiteBenefits.map(({ title, description, icon: Icon }) => (
            <article className="websites-benefit-card" key={title}>
              <Icon size={28} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section websites-process-section">
        <div className="section-heading">
          <p className="eyebrow">Our Website Process</p>
          <h2>A clear path from idea to launch.</h2>
        </div>
        <div className="websites-process-grid">
          {websiteProcess.map((step, index) => (
            <article className="websites-process-card" key={step.title}>
              <span className="websites-process-number">{index + 1}</span>
              <Workflow size={24} aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section websites-final-cta">
        <div>
          <p className="eyebrow">Start Your Website</p>
          <h2>Build a website designed to move your business forward.</h2>
          <p>
            Tell us what your current website is missing. We will help you
            identify the right structure, functionality, and next step.
          </p>
        </div>
        <div className="cta-actions">
          <a className="button primary" href="/contact">
            Start Your Website
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href={bookingHref}>
            Book Strategy Call
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
