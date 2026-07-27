import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  corporateHeroSupportingMessage,
  corporateHeadline,
  eeosApplicationLoginUrl,
  getContactDetails,
  tagline
} from "./site-content";

const coreBenefits = [
  {
    title: "Service-business focus",
    text: "Built around the real needs of service businesses, including lead response, customer communication, scheduling, handoffs, and daily operations."
  },
  {
    title: "Connected automation systems",
    text: "Connect websites, CRM, calls, texts, email, scheduling, workflows, and reporting so information moves through one coordinated system."
  },
  {
    title: "Practical AI software",
    text: "Use AI to answer questions, support decisions, automate repetitive work, and help teams operate faster without unnecessary complexity."
  },
  {
    title: "Executive visibility",
    text: "Give owners a clearer view of business health, opportunities, risks, workflows, and priorities so they can lead with better information."
  }
];

const solutionCapabilities = [
  "Customer acquisition and engagement",
  "Business automation",
  "Executive intelligence"
];

const eeosBenefits = [
  "Executive visibility",
  "Connected business intelligence",
  "Workflow automation",
  "Evidence-based recommendations"
];

export default function Home() {
  const { bookingHref } = getContactDetails();

  return (
    <main>
      <SiteHeader active="Home" />

      <section id="top" className="hero corporate-hero">
        <Image
          src="/media/eeos/eeos-eagle-brain-closeup.jpg"
          alt="Close-up EEOS eagle with a visible illuminated AI brain and electric blue intelligence signals"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            {tagline}
          </p>
          <h1>{corporateHeadline}</h1>
          <p className="hero-kicker">{corporateHeroSupportingMessage}</p>
          <p className="hero-copy">
            Eagle Eye Automation builds AI, automation, and executive
            intelligence for small businesses. Our flagship product, EEOS,
            gives owners enterprise-level visibility, decision support,
            workflow automation, secure operations, and connected business
            intelligence without requiring an enterprise-size team.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/eeos">
              Explore EEOS
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href={bookingHref}>
              Book Strategy Call
            </a>
            <a className="button secondary" href={eeosApplicationLoginUrl}>
              Login
            </a>
          </div>
        </div>
      </section>

      <section className="section benefits-section" aria-labelledby="benefits-title">
        <div className="section-heading">
          <p className="eyebrow">Built for growing service businesses</p>
          <h2 id="benefits-title">Connected systems. Clearer decisions.</h2>
        </div>
        <div className="enterprise-grid">
          {coreBenefits.map((benefit) => (
            <article className="premium-card benefit-card" key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section homepage-intro" aria-labelledby="solutions-intro-title">
        <div>
          <p className="eyebrow">Eagle Eye Automation solutions</p>
          <h2 id="solutions-intro-title">
            AI software and automation built for service businesses.
          </h2>
          <p>
            Eagle Eye Automation helps small and growing service businesses
            connect customer acquisition, communication, automation,
            operations, and business intelligence. We build practical systems
            that reduce missed opportunities, improve follow-up, and give
            owners better visibility into how the business is performing.
          </p>
          <a className="button package-button" href="/solutions">
            Explore Solutions
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <ul className="homepage-point-list" aria-label="Solution capabilities">
          {solutionCapabilities.map((capability) => (
            <li key={capability}>
              <Check size={18} aria-hidden="true" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="eeos" className="section eeos-showcase homepage-eeos">
        <div className="eeos-showcase-copy">
          <p className="eyebrow">Flagship product</p>
          <h2>EEOS is the AI Operating System for Service Businesses.</h2>
          <p>
            EEOS is Eagle Eye Automation&apos;s flagship platform. It brings
            operational data, automation, business health visibility, and
            executive recommendations into one connected environment so owners
            can see more, manage smarter, and grow faster.
          </p>
          <ul className="eeos-capability-list">
            {eeosBenefits.map((benefit) => (
              <li key={benefit}>
                <Check size={16} aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="cta-actions">
            <a className="button primary" href="/eeos">
              Explore EEOS
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href={eeosApplicationLoginUrl}>
              Login to EEOS
            </a>
          </div>
        </div>
        <div className="eeos-visual-card">
          <Image
            src="/media/eeos/eeos-executive-intelligence.jpg"
            alt="EEOS executive intelligence eagle with an illuminated AI brain"
            width={1536}
            height={1024}
            sizes="(max-width: 900px) 100vw, 48vw"
            className="eeos-visual"
          />
        </div>
      </section>

      <section className="section enterprise-section homepage-mission">
        <div className="section-heading">
          <p className="eyebrow">Enterprise Power for Growing Businesses</p>
          <h2>Modern software discipline without enterprise complexity.</h2>
          <p>
            Our mission is to give small businesses the power of Fortune 500
            companies through AI, automation, and executive intelligence. Eagle
            Eye Automation closes the gap between disconnected tools and the
            connected systems larger companies use to manage demand, serve
            customers, automate work, and lead with better information.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
