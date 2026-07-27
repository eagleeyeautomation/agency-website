import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CalendarCheck,
  Check,
  Eye,
  Globe2,
  Link2,
  MessageSquareWarning,
  Network,
  PhoneCall,
  PhoneMissed,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Unplug,
  UserRoundX,
  UsersRound,
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

const problems = [
  { text: "Important leads get lost", icon: UserRoundX },
  { text: "Missed calls create missed opportunities", icon: PhoneMissed },
  { text: "Follow-up falls through", icon: MessageSquareWarning },
  { text: "Data is scattered", icon: Unplug },
  { text: "Owners lack clear visibility", icon: Eye },
  { text: "Teams react instead of planning", icon: UsersRound }
];

const solutions = [
  "Leads are organized and prioritized",
  "Calls are visible",
  "Follow-up is measured",
  "Connected systems reduce fragmentation",
  "Owners gain operational visibility",
  "AI recommendations support next actions"
];

const advantages = [
  {
    title: "See More",
    text: "Gain a clear view of the signals that matter most.",
    icon: Eye
  },
  {
    title: "Manage Smarter",
    text: "Use focused recommendations to make better decisions.",
    icon: Target
  },
  {
    title: "Grow Faster",
    text: "Find opportunities to improve performance and conversion.",
    icon: TrendingUp
  },
  {
    title: "Operate Securely",
    text: "Protect business access, data, and connected workflows.",
    icon: ShieldCheck
  },
  {
    title: "Stay Connected",
    text: "Bring approved tools and activity into one clear view.",
    icon: Link2
  },
  {
    title: "Empower Your Team",
    text: "Give teams the clarity and context to act confidently.",
    icon: UsersRound
  }
];

const intelligenceFlow = [
  { label: "Business Signals", icon: BarChart3 },
  { label: "Intelligence Engine", icon: BrainCircuit },
  { label: "Executive Recommendations", icon: Sparkles },
  { label: "Next Best Action", icon: Target }
];

const connectedSystems = [
  { label: "Website", icon: Globe2 },
  { label: "CRM", icon: UsersRound },
  { label: "Calls", icon: PhoneCall },
  { label: "Calendar", icon: CalendarCheck },
  { label: "Automation", icon: Workflow },
  { label: "Reporting", icon: BarChart3 },
  { label: "Executive Dashboard", icon: Network }
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
          <p className="eeos-hero-subheadline">
            Because business owners deserve clarity, control, and confidence.
          </p>
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
          <Image
            src="/media/eeos/eeos-eagle-brain-closeup.jpg"
            alt=""
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 900px) 88vw, 42vw"
          />
        </div>
      </section>

      <section className="eeos-approved-visual" aria-labelledby="approved-why-eeos">
        <div className="eeos-section-heading">
          <p className="eyebrow">The Executive Operating Advantage</p>
          <h2 id="approved-why-eeos">You work hard. EEOS works smarter.</h2>
        </div>
        <Image
          src="/images/why-eeos.png"
          alt="Why EEOS overview showing business problems, EEOS solutions, executive advantages, and the connected operating system"
          width={1536}
          height={1024}
          sizes="(max-width: 1600px) 100vw, 1536px"
          priority
          unoptimized
        />
      </section>

      <section className="eeos-product-section eeos-problem-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">Business Problems and EEOS Solutions</p>
          <h2>Turn operational noise into a clear path forward.</h2>
        </div>
        <div className="eeos-problem-solution-grid">
          <article className="eeos-compare-panel eeos-challenge-panel">
            <div className="eeos-panel-heading">
              <MessageSquareWarning size={22} aria-hidden="true" />
              <h3>The Problem</h3>
            </div>
            <div className="eeos-compare-list">
              {problems.map(({ text, icon: Icon }) => (
                <div key={text}>
                  <Icon size={19} aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="eeos-compare-panel eeos-solution-panel">
            <div className="eeos-panel-heading">
              <Sparkles size={22} aria-hidden="true" />
              <h3>The EEOS Solution</h3>
            </div>
            <div className="eeos-compare-list">
              {solutions.map((solution) => (
                <div key={solution}>
                  <Check size={19} aria-hidden="true" />
                  <span>{solution}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="eeos-product-section eeos-advantage-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">Executive Advantage</p>
          <h2>Lead with clarity at every stage.</h2>
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
          <h2>Meet the Intelligence Engine</h2>
          <p>
            The Intelligence Engine analyzes approved business signals,
            identifies patterns, and supports executive recommendations.
          </p>
        </div>
        <figure className="eeos-brain-artwork">
          <Image
            src="/images/eeos-brain-intelligence.png"
            alt="EEOS Intelligence Engine with a stationary eagle and holographic brain dashboard"
            width={1448}
            height={1086}
            sizes="(max-width: 1500px) 100vw, 1448px"
            unoptimized
          />
          <div className="eeos-brain-motion" aria-hidden="true">
            <span className="eeos-neural-orbit orbit-a" />
            <span className="eeos-neural-orbit orbit-b" />
            <span className="eeos-neural-shimmer" />
            <span className="eeos-neural-node node-a" />
            <span className="eeos-neural-node node-b" />
            <span className="eeos-neural-node node-c" />
            <span className="eeos-neural-node node-d" />
            <span className="eeos-neural-node node-e" />
            <span className="eeos-dashboard-scan scan-left" />
            <span className="eeos-dashboard-scan scan-right" />
            <span className="eeos-data-line line-a" />
            <span className="eeos-data-line line-b" />
          </div>
        </figure>
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

      <section className="eeos-product-section eeos-connected-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">Connected Systems</p>
          <h2>One connected business.</h2>
          <p>
            Business activity flows through connected systems and becomes
            useful executive context.
          </p>
        </div>
        <div className="eeos-ecosystem eeos-ecosystem-seven" aria-label="Connected EEOS business ecosystem">
          {connectedSystems.map(({ label, icon: Icon }, index) => (
            <div className="eeos-ecosystem-node" key={label}>
              <Icon size={24} aria-hidden="true" />
              <strong>{label}</strong>
              {index < connectedSystems.length - 1 ? <i aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="eeos-access-section">
        <div>
          <p className="eyebrow">Application Access</p>
          <h2>Access the EEOS Application</h2>
          <p>
            Existing customers and authorized administrators can access EEOS
            through the branded application.
          </p>
        </div>
        <a className="button primary" href={eeosApplicationUrl}>
          Open EEOS
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>

      <section className="eeos-flagship-cta eeos-concise-cta">
        <div>
          <p className="eyebrow">The Next Operating Standard</p>
          <h2>Lead With Intelligence.</h2>
          <p>
            See how EEOS helps business owners gain clarity, improve
            operations, and make better decisions.
          </p>
        </div>
        <div className="eeos-flagship-cta-actions">
          <a className="button primary" href="/contact">
            Request a Demo
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href={eeosApplicationUrl}>
            Open EEOS
          </a>
        </div>
      </section>

      <SiteFooter showEeosTransition={false} />
    </main>
  );
}
