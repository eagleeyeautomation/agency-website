import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Eye, HeartHandshake, Target } from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  companyMission,
  productFullName
} from "../site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Eagle Eye Automation, the company building EEOS, AI software, GoHighLevel-ready websites, workflow automation, dashboards, and business intelligence systems."
};

const companyPrinciples = [
  {
    title: "Mission",
    text: companyMission,
    icon: Target
  },
  {
    title: "Vision",
    text: "A future where small and growing service businesses can access powerful technology without enterprise complexity.",
    icon: Eye
  },
  {
    title: "Values",
    text: "Human-centered automation, connected systems, practical intelligence, integrity, and scalable foundations.",
    icon: HeartHandshake
  }
];

export default function AboutPage() {
  return (
    <main className="about-page-root">
      <SiteHeader />

      <section className="page-hero about-page-hero">
        <p className="eyebrow">About Eagle Eye Automation</p>
        <h1>Building AI today that helps businesses succeed tomorrow.</h1>
        <p>
          Eagle Eye Automation Group builds practical AI, automation, and
          executive intelligence for small and growing service businesses.
        </p>
      </section>

      <section className="section about-visual-section">
        <div className="about-hero-image">
          <Image
            src="/images/eea-about-hero.png"
            alt="Eagle Eye Automation Group overview showing the company mission, values, AI automation, and executive intelligence"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>
      </section>

      <section className="section about-principles-section">
        <div className="section-heading">
          <p className="eyebrow">Mission, Vision, and Values</p>
          <h2>Technology built around people, clarity, and real operations.</h2>
          <p>
            We exist to close the technology gap between large enterprises and
            the service businesses that power their communities.
          </p>
        </div>
        <div className="about-principles-grid">
          {companyPrinciples.map(({ title, text, icon: Icon }) => (
            <article className="about-principle-card" key={title}>
              <span className="about-principle-icon">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-relationship-section">
        <div>
          <p className="eyebrow">Eagle Eye Automation + EEOS</p>
          <h2>One company. One flagship operating system.</h2>
        </div>
        <article className="about-relationship-card">
          <h3>Eagle Eye Automation Group builds {productFullName}.</h3>
          <p>
            Eagle Eye Automation is the company. EEOS is its flagship software
            platform, bringing business visibility, connected intelligence,
            workflow automation, and executive recommendations into one
            environment for service-business owners.
          </p>
          <a href="/eeos">
            Explore EEOS
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </article>
      </section>

      <section className="cta-section about-final-cta">
        <div>
          <p className="eyebrow">Work with us</p>
          <h2>Build the system your team actually needs.</h2>
          <p>
            Tell us where your business is losing time, opportunities, or
            visibility. We will help identify the right next step.
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
