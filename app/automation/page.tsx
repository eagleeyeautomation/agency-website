import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Clock3,
  HeartHandshake,
  Magnet,
  MessageSquareText,
  MoonStar,
  PhoneCall,
  TrendingUp,
  Workflow
} from "lucide-react";
import { SiteFooter, SiteHeader } from "../site-content";

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

const automationFeatures = [
  {
    title: "AI Voice",
    text: "Answer calls, qualify opportunities, and route next steps without making customers wait.",
    icon: PhoneCall
  },
  {
    title: "SMS & Email",
    text: "Send timely confirmations, reminders, and follow-up across the channels customers use.",
    icon: MessageSquareText
  },
  {
    title: "Lead Capture",
    text: "Capture new inquiries and move every opportunity into the right response workflow.",
    icon: Magnet
  },
  {
    title: "Scheduling",
    text: "Make booking easier while automating confirmations, reminders, and appointment updates.",
    icon: CalendarCheck
  },
  {
    title: "CRM Automation",
    text: "Keep records, pipelines, tasks, and team handoffs current as customer activity changes.",
    icon: Workflow
  },
  {
    title: "Reporting",
    text: "Turn automation activity into clear performance signals owners can understand.",
    icon: BarChart3
  }
];

const automationBenefits = [
  {
    title: "Save Time",
    text: "Automate repetitive work.",
    icon: Clock3
  },
  {
    title: "Increase Revenue",
    text: "Respond faster and convert more leads.",
    icon: TrendingUp
  },
  {
    title: "Improve Customer Experience",
    text: "Every lead receives timely communication.",
    icon: HeartHandshake
  },
  {
    title: "Operate 24/7",
    text: "Automation never sleeps.",
    icon: MoonStar
  }
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

      <section className="page-hero product-hero automation-page-hero">
        <div className="automation-hero-copy">
          <p className="eyebrow">Automation</p>
          <h1>Automation that moves like an intelligent command system.</h1>
          <p>
            Eagle Eye Automation helps service businesses respond faster,
            reduce repetitive work, improve follow-up, and keep every
            opportunity moving through intelligent connected automation.
          </p>
        </div>
        <div className="automation-hero-art">
          <Image
            src="/media/eagle-eye/eea-automation-hero.png"
            alt="Eagle Eye Automation Group intelligent automation and executive intelligence overview"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 900px) 100vw, 54vw"
          />
        </div>
      </section>

      <section id="automation-capabilities" className="section automation-feature-section">
        <div className="section-heading">
          <p className="eyebrow">What We Automate</p>
          <h2>Automation Built for Service Businesses</h2>
        </div>
        <div className="automation-feature-grid">
          {automationFeatures.map(({ icon: Icon, title, text }) => (
            <article className="automation-feature-card" key={title}>
              <div className="tech-icon">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section automation-why-section">
        <div className="section-heading">
          <p className="eyebrow">Why EEA</p>
          <h2>Why Businesses Choose Eagle Eye Automation</h2>
        </div>
        <div className="automation-benefit-grid">
          {automationBenefits.map(({ icon: Icon, title, text }) => (
            <article className="automation-benefit-card" key={title}>
              <Icon size={26} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section eeos-connection-section automation-eeos-section">
        <div>
          <p className="eyebrow">EEOS Connection</p>
          <h2>
            Automation Executes.
            <br />
            EEOS Thinks.
          </h2>
          <p>
            Automation performs the work. EEOS analyzes the results, identifies
            trends, and provides executive recommendations so business owners
            can make better decisions.
          </p>
          <a className="button primary" href="/eeos">
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
