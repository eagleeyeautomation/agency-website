import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader, productPlatforms, solutions } from "../site-content";

export const metadata: Metadata = { title: "Solutions", description: "Solutions for AI voice, AI chat, GoHighLevel CRM implementation, workflow automation, executive dashboards, and business intelligence." };

const destinations: Record<string, string> = {
  "AI Voice Receptionist": "/automation", "AI Chat Assistant": "/automation",
  "GoHighLevel CRM Implementation": "/solutions", "Workflow Automation": "/automation",
  "Business Intelligence": "/eeos", "Executive Dashboards": "/eeos",
  "Website Development": "/websites"
};

export default function SolutionsPage() {
  return <main className="compressed-page solutions-compressed">
    <SiteHeader active="Solutions" />
    <section className="page-hero"><p className="eyebrow">Solutions</p><h1>Systems built around the way your business works.</h1><p>From first customer contact to executive decisions, Eagle Eye Automation connects the tools, workflows, and intelligence that service businesses need.</p></section>
    <section className="section compact-solutions" aria-labelledby="solutions-title">
      <div className="section-heading"><p className="eyebrow">What we build</p><h2 id="solutions-title">One connected set of capabilities.</h2></div>
      <div className="compact-solution-grid">
        {solutions.map((item) => <article className="compact-solution-card" key={item.title}><h3>{item.title}</h3><p>{item.text}</p><ul>{item.items.map((point) => <li key={point}><Check size={14} aria-hidden="true" />{point}</li>)}</ul></article>)}
        {productPlatforms.filter((item) => !item.title.startsWith("EEOS")).map((item) => <article className="compact-solution-card" key={item.title}><h3>{item.title}</h3><p>{item.text}</p><a href={destinations[item.title] || item.href}>Learn more <ArrowRight size={15} aria-hidden="true" /></a></article>)}
      </div>
    </section>
    <section className="compact-eeos-link"><p><strong>Eagle Eye Automation builds the systems.</strong> EEOS connects their data and provides executive intelligence.</p><a href="/eeos">Explore EEOS <ArrowRight size={16} aria-hidden="true" /></a></section>
    <SiteFooter showEeosTransition={false} />
  </main>;
}
