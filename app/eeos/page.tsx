import type { Metadata } from "next";
import { ArrowRight, Eye, Link2, ShieldCheck, Target, TrendingUp, Workflow } from "lucide-react";
import { SiteFooter, SiteHeader, eeosApplicationLoginUrl, eeosApplicationUrl } from "../site-content";
import { EeosBrainButton } from "./eeos-brain-button";

export const metadata: Metadata = { title: "Why EEOS? | The AI Operating System for Service Businesses", description: "Discover how EEOS connects business systems, analyzes operational signals, and delivers executive intelligence for growing service businesses." };

const advantages = [
  { title: "Executive Visibility", text: "See the business signals and priorities that matter most.", icon: Eye },
  { title: "Intelligent Recommendations", text: "Use focused recommendations to support better decisions.", icon: Target },
  { title: "Connected Systems", text: "Bring approved tools and business activity into one clear view.", icon: Link2 },
  { title: "Business Automation", text: "Coordinate repetitive work across connected workflows.", icon: Workflow },
  { title: "Secure Operations", text: "Protect business access, data, and connected workflows.", icon: ShieldCheck },
  { title: "Scalable Growth", text: "Build the operational clarity needed to grow with confidence.", icon: TrendingUp }
];

export default function EeosPage() {
  return <main className="eeos-flagship eeos-concise compressed-page eeos-gateway">
    <SiteHeader active="EEOS" />
    <section className="eeos-flagship-hero eeos-concise-hero">
      <div className="eeos-hero-grid" aria-hidden="true" />
      <div className="eeos-hero-content">
        <p className="eyebrow">Flagship product of Eagle Eye Automation</p>
        <h1>EEOS</h1>
        <p className="eeos-hero-support"><strong>The AI Operating System for Service Businesses.</strong> EEOS connects business signals, automation, operational visibility, and executive recommendations in one intelligent operating experience.</p>
        <div className="hero-actions"><a className="button primary" href={eeosApplicationUrl}>Explore EEOS <ArrowRight size={18} aria-hidden="true" /></a><a className="button secondary" href={eeosApplicationLoginUrl}>Login to EEOS</a></div>
      </div>
      <div className="eeos-hero-mark" aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" poster="/media/eeos/eeos-executive-intelligence.jpg"><source src="/videos/eeos-hero.mp4" type="video/mp4" /></video></div>
    </section>
    <section className="section eeos-gateway-advantages" aria-labelledby="eeos-advantages-title">
      <div className="section-heading"><p className="eyebrow">The EEOS advantage</p><h2 id="eeos-advantages-title">Clarity for every decision.</h2></div>
      <div className="eeos-gateway-grid">{advantages.map(({title,text,icon:Icon}) => <article key={title}><Icon size={22} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="eeos-gateway-brain"><div><p className="eyebrow">Executive intelligence</p><h2>Business signals → intelligence → recommendations → next best action.</h2><p>Speak to EEOS Brain about connected systems and the operating decisions they support.</p></div><EeosBrainButton /></section>
    <SiteFooter />
  </main>;
}
