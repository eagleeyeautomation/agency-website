import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Eye,
  Link2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Workflow
} from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  eeosApplicationUrl
} from "../site-content";
import { EeosBrainButton } from "./eeos-brain-button";

export const metadata: Metadata = {
  title: "Why EEOS? | The AI Operating System for Service Businesses",
  description:
    "Discover how EEOS connects business systems, analyzes operational signals, and delivers executive intelligence for growing service businesses."
};

const advantages = [
  {
    title: "Executive Visibility",
    text: "See the business signals and priorities that matter most.",
    icon: Eye
  },
  {
    title: "Intelligent Recommendations",
    text: "Use focused recommendations to support better decisions.",
    icon: Target
  },
  {
    title: "Connected Systems",
    text: "Bring approved tools and business activity into one clear view.",
    icon: Link2
  },
  {
    title: "Business Automation",
    text: "Coordinate repetitive work across connected workflows.",
    icon: Workflow
  },
  {
    title: "Secure Operations",
    text: "Protect business access, data, and connected workflows.",
    icon: ShieldCheck
  },
  {
    title: "Scalable Growth",
    text: "Build the operational clarity needed to grow with confidence.",
    icon: TrendingUp
  }
];

const intelligenceFlow = [
  { label: "Business Signals", icon: BarChart3 },
  { label: "Intelligence Engine", icon: BrainCircuit },
  { label: "Executive Recommendations", icon: Sparkles },
  { label: "Next Best Action", icon: Target }
];

export default function EeosPage() {
  return (
    <main className="eeos-flagship eeos-concise">
      <SiteHeader active="EEOS" />

      <section className="eeos-flagship-hero eeos-concise-hero">
        <div className="eeos-hero-grid" aria-hidden="true" />
        <div className="eeos-hero-content">
          <p className="eyebrow">The AI Operating System for Service Businesses</p>
          <h1>Why EEOS?</h1>
          <p className="eeos-hero-support">
            EEOS brings business signals, connected systems, operational
            visibility, and executive recommendations into one intelligent
            operating experience.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={eeosApplicationUrl}>
              Open EEOS
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="/contact">
              Request a Demo
            </a>
          </div>
        </div>
        <div className="eeos-hero-mark" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/videos/eeos-hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="eeos-approved-visual" aria-labelledby="approved-why-eeos">
        <div className="eeos-section-heading">
          <p className="eyebrow">The Executive Operating Advantage</p>
          <h2 id="approved-why-eeos">Why EEOS?</h2>
          <p>
            Because business owners deserve clarity, control, and confidence.
          </p>
        </div>
      </section>

      <section className="eeos-product-section eeos-advantage-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">The EEOS Advantage</p>
          <h2>One operating system. Six clear advantages.</h2>
        </div>
        <div className="eeos-feature-grid">
          {advantages.map(({ title, text, icon: Icon }) => (
            <article className="eeos-feature-card" key={title}>
              <span>
                <Icon size={25} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="eeos-product-section eeos-engine-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">Executive Intelligence</p>
          <h2>How EEOS Works</h2>
        </div>
        <div className="eeos-flow" aria-label="EEOS Intelligence Engine flow">
          {intelligenceFlow.map(({ label, icon: Icon }, index) => (
            <div className="eeos-flow-step" key={label}>
              <Icon size={26} aria-hidden="true" />
              <strong>{label}</strong>
              {index < intelligenceFlow.length - 1 ? (
                <ArrowRight className="eeos-flow-arrow" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="eeos-brain-panel-section">
        <div className="eeos-brain-panel">
          <span className="eeos-brain-icon" aria-hidden="true">
            <BrainCircuit size={54} />
          </span>
          <div>
            <p className="eyebrow">Customer-Facing Intelligence</p>
            <h2>Speak to EEOS Brain</h2>
            <p>
              Ask EEOS Brain how AI, executive intelligence, automation, and
              connected business systems can help your organization operate
              with greater clarity and confidence.
            </p>
          </div>
          <EeosBrainButton />
        </div>
      </section>

      <section className="eeos-flagship-cta eeos-concise-cta">
        <div>
          <p className="eyebrow">The Next Operating Standard</p>
          <h2>Lead With Intelligence</h2>
          <p>
            Access EEOS or speak with our team to discover how executive
            intelligence can help your business operate with greater clarity
            and confidence.
          </p>
        </div>
        <div className="eeos-flagship-cta-actions">
          <a className="button primary" href={eeosApplicationUrl}>
            Open EEOS
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href="/contact">
            Request a Demo
          </a>
        </div>
      </section>

      <SiteFooter showEeosTransition={false} />
    </main>
  );
}
