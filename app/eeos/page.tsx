import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CalendarCheck,
  Check,
  CircleDollarSign,
  KeyRound,
  Lightbulb,
  Link2,
  LockKeyhole,
  MessageSquareWarning,
  Network,
  PhoneMissed,
  Radar,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Unplug,
  UserRoundX,
  Workflow
} from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  eeosApplicationUrl
} from "../site-content";

export const metadata: Metadata = {
  title: "Why EEOS? | The AI Operating System for Service Businesses",
  description:
    "Discover how EEOS connects business systems, analyzes operational signals, and delivers executive intelligence for growing service businesses."
};

const businessChallenges = [
  { label: "Missed calls", icon: PhoneMissed },
  { label: "Lost leads", icon: UserRoundX },
  { label: "Poor follow-up", icon: MessageSquareWarning },
  { label: "Disconnected systems", icon: Unplug },
  { label: "Scattered reporting", icon: BarChart3 },
  { label: "Manual processes", icon: Workflow },
  { label: "No executive visibility", icon: AlertTriangle }
];

const eeosSolutions = [
  "Every lead tracked",
  "Every call monitored",
  "Every follow-up measured",
  "Real-time dashboards",
  "Executive recommendations",
  "Connected systems",
  "Predictive intelligence"
];

const executiveFeatures = [
  {
    title: "Executive Intelligence",
    text: "Translate daily activity into a leadership-level view of performance, risk, and opportunity.",
    icon: Radar
  },
  {
    title: "AI Recommendations",
    text: "Surface focused next actions grounded in the operational signals available to your business.",
    icon: Lightbulb
  },
  {
    title: "Business Automation",
    text: "Coordinate repetitive workflows so teams respond consistently and leaders regain time.",
    icon: Workflow
  },
  {
    title: "Connected Integrations",
    text: "Bring approved systems into one operating environment built for clearer decisions.",
    icon: Link2
  },
  {
    title: "Secure Operations",
    text: "Protect access, data, and business workflows with enterprise-minded controls.",
    icon: ShieldCheck
  },
  {
    title: "Built for Growth",
    text: "Scale visibility and operating discipline from one office to a national organization.",
    icon: TrendingUp
  }
];

const intelligenceSignals = [
  "Performance",
  "Risk",
  "Growth",
  "Missed opportunities",
  "Operational bottlenecks",
  "Next best actions"
];

const connectedSystems = [
  "Website",
  "CRM",
  "Calls",
  "Calendar",
  "Automation",
  "Reporting",
  "Executive Dashboard",
  "Recommendations"
];

const dashboardMetrics = [
  { label: "Leads", value: "248", trend: "+18%", icon: Target },
  { label: "Revenue", value: "$184K", trend: "+12%", icon: CircleDollarSign },
  { label: "Appointments", value: "96", trend: "+9%", icon: CalendarCheck },
  { label: "Missed Calls", value: "7", trend: "Needs review", icon: PhoneMissed }
];

const securityFeatures = [
  { title: "Role Based Access", icon: KeyRound },
  { title: "Encrypted Data", icon: LockKeyhole },
  { title: "Audit Logs", icon: ScrollText },
  { title: "Protected Integrations", icon: Link2 },
  { title: "Compliance Ready", icon: ShieldCheck }
];

export default function EeosPage() {
  return (
    <main className="eeos-flagship">
      <SiteHeader active="EEOS" />

      <section className="eeos-flagship-hero">
        <div className="eeos-hero-grid" aria-hidden="true" />
        <div className="eeos-particles" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="eeos-hero-content">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            The AI Operating System for Service Businesses
          </p>
          <h1>Why EEOS?</h1>
          <p className="eeos-hero-subheadline">
            Because business owners deserve complete visibility, executive
            intelligence, and AI-powered decision making.
          </p>
          <p className="eeos-hero-support">
            EEOS connects your business systems, organizes operational data,
            analyzes business performance, and delivers executive
            recommendations that help you lead with confidence instead of
            reacting to problems.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#why-eeos">
              Explore EEOS
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="/contact">
              Request Demo
            </a>
          </div>
        </div>
        <div className="eeos-hero-orbit" aria-hidden="true">
          <div className="eeos-hero-orbit-ring" />
          <Image
            src="/media/eeos/eeos-eagle-brain-closeup.jpg"
            alt=""
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 900px) 90vw, 48vw"
          />
          <span className="eeos-orbit-label label-one">Executive signal</span>
          <span className="eeos-orbit-label label-two">AI recommendation</span>
        </div>
      </section>

      <section id="why-eeos" className="eeos-product-section eeos-problem-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">Why Business Owners Need EEOS</p>
          <h2>Stop operating through blind spots.</h2>
          <p>
            The difference between reacting and leading is having the right
            signal at the right time.
          </p>
        </div>
        <div className="eeos-problem-solution-grid">
          <article className="eeos-compare-panel eeos-challenge-panel">
            <div className="eeos-panel-heading">
              <AlertTriangle size={22} aria-hidden="true" />
              <h3>Business Challenges</h3>
            </div>
            <div className="eeos-compare-list">
              {businessChallenges.map(({ label, icon: Icon }) => (
                <div key={label}>
                  <Icon size={19} aria-hidden="true" />
                  <span>{label}</span>
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
              {eeosSolutions.map((solution) => (
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
          <p className="eyebrow">The EEOS Difference</p>
          <h2>The executive advantage.</h2>
          <p>
            One premium operating layer for intelligence, automation, and
            connected business performance.
          </p>
        </div>
        <div className="eeos-feature-grid">
          {executiveFeatures.map(({ title, text, icon: Icon }) => (
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

      <section className="eeos-product-section eeos-intelligence-section">
        <div className="eeos-intelligence-copy">
          <p className="eyebrow">Executive Intelligence</p>
          <h2>Meet the Intelligence Engine</h2>
          <p>
            EEOS continuously analyzes your operational signals and turns
            business activity into focused executive context.
          </p>
          <div className="eeos-signal-chips">
            {intelligenceSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
        <div className="eeos-brain-visual">
          <div className="eeos-neural-ring ring-one" aria-hidden="true" />
          <div className="eeos-neural-ring ring-two" aria-hidden="true" />
          <Image
            src="/media/eeos/eeos-executive-intelligence.jpg"
            alt="EEOS intelligence engine represented by an eagle with an illuminated neural brain"
            width={1536}
            height={1024}
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <div className="eeos-brain-status">
            <BrainCircuit size={21} aria-hidden="true" />
            <span>Intelligence Engine</span>
            <strong>Analyzing signals</strong>
          </div>
        </div>
      </section>

      <section className="eeos-product-section eeos-connected-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">Connected Systems</p>
          <h2>One connected business.</h2>
          <p>
            Operational activity flows through EEOS and becomes executive
            intelligence.
          </p>
        </div>
        <div className="eeos-ecosystem" aria-label="Connected EEOS business ecosystem">
          {connectedSystems.map((system, index) => (
            <div className="eeos-ecosystem-node" key={system}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{system}</strong>
              {index < connectedSystems.length - 1 ? (
                <i aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="eeos-product-section eeos-dashboard-section">
        <div className="eeos-section-heading">
          <p className="eyebrow">Executive Dashboard</p>
          <h2>Business health, brought into focus.</h2>
          <p>
            See the metrics, risks, and recommendations that deserve leadership
            attention.
          </p>
        </div>
        <div className="eeos-dashboard-shell">
          <div className="eeos-dashboard-topbar">
            <div>
              <span>EEOS</span>
              <strong>Executive Command Center</strong>
            </div>
            <em>
              <span aria-hidden="true" />
              Live operating view
            </em>
          </div>
          <div className="eeos-dashboard-metrics">
            {dashboardMetrics.map(({ label, value, trend, icon: Icon }) => (
              <article
                className={label === "Missed Calls" ? "is-alert" : undefined}
                key={label}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
                <strong>{value}</strong>
                <em>{trend}</em>
              </article>
            ))}
          </div>
          <div className="eeos-dashboard-lower">
            <div className="eeos-chart-panel">
              <div>
                <span>Pipeline performance</span>
                <strong>$428,600</strong>
              </div>
              <div className="eeos-chart-bars" aria-label="Pipeline growth chart">
                {[38, 54, 48, 72, 64, 88, 96].map((height, index) => (
                  <span
                    key={index}
                    style={{ "--bar-height": `${height}%` } as CSSProperties}
                  />
                ))}
              </div>
            </div>
            <aside className="eeos-recommendation-panel">
              <div>
                <Sparkles size={18} aria-hidden="true" />
                <span>AI recommendation</span>
              </div>
              <strong>Prioritize follow-up on seven high-value opportunities.</strong>
              <p>
                Response timing and pipeline value indicate the strongest
                near-term conversion opportunity.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="eeos-product-section eeos-security-section">
        <div className="eeos-security-intro">
          <span className="eeos-security-shield">
            <ShieldCheck size={42} aria-hidden="true" />
          </span>
          <p className="eyebrow">Enterprise Security</p>
          <h2>Built for trusted operations.</h2>
          <p>
            Security, access, and integration discipline are part of the
            operating system—not an afterthought.
          </p>
        </div>
        <div className="eeos-security-grid">
          {securityFeatures.map(({ title, icon: Icon }) => (
            <article key={title}>
              <Icon size={22} aria-hidden="true" />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="eeos-product-section eeos-growth-section">
        <div>
          <p className="eyebrow">Future Ready</p>
          <h2>Built for growth at every stage.</h2>
          <p>
            Whether your business has one office, five offices, 25 offices, or
            nationwide operations, EEOS scales with you.
          </p>
        </div>
        <div className="eeos-scale-visual" aria-label="EEOS business scale">
          {[1, 5, 25].map((offices, index) => (
            <div key={offices}>
              <Building2 size={22 + index * 5} aria-hidden="true" />
              <strong>{offices}</strong>
              <span>{offices === 1 ? "Office" : "Offices"}</span>
            </div>
          ))}
          <div>
            <Network size={37} aria-hidden="true" />
            <strong>∞</strong>
            <span>Nationwide</span>
          </div>
        </div>
      </section>

      <section className="eeos-flagship-cta">
        <div>
          <p className="eyebrow">The Next Operating Standard</p>
          <h2>Lead With Intelligence.</h2>
          <p>
            See how EEOS helps business owners stop reacting and start leading.
          </p>
        </div>
        <div className="eeos-flagship-cta-actions">
          <a className="button primary" href="/contact">
            Request Demo
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
