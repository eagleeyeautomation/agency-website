import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { EeosTransition, SiteFooter, SiteHeader, corporateHeroSupportingMessage, corporateHeadline, eeosApplicationLoginUrl, getContactDetails, tagline } from "./site-content";

const areas = [
  { title: "AI Automation", text: "Voice, chat, lead response, scheduling, and follow-up that keep work moving.", href: "/automation" },
  { title: "Business Technology", text: "Websites, CRM, and connected systems built around daily operations.", href: "/solutions" },
  { title: "Marketing / Growth", text: "Digital presence and customer pathways that turn interest into opportunity.", href: "/websites" },
  { title: "Executive Intelligence", text: "Clearer reporting, business health, priorities, and decisions.", href: "/eeos" }
];

export default function Home() {
  const { bookingHref } = getContactDetails();
  return (
    <main className="compressed-page home-compressed">
      <SiteHeader active="Home" />
      <section id="top" className="hero corporate-hero">
        <Image src="/media/eeos/eeos-eagle-brain-closeup.jpg" alt="Close-up EEOS eagle with a visible illuminated AI brain and electric blue intelligence signals" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow"><Sparkles size={16} aria-hidden="true" />{tagline}</p>
          <h1>{corporateHeadline}</h1>
          <p className="hero-kicker">{corporateHeroSupportingMessage}</p>
          <p className="hero-copy">Eagle Eye Automation builds AI, automation, and executive intelligence for small businesses. Our flagship product, EEOS, gives owners enterprise-level visibility, decision support, workflow automation, secure operations, and connected business intelligence without requiring an enterprise-size team.</p>
          <div className="hero-actions">
            <a className="button primary" href="/eeos">Explore EEOS <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button secondary" href={bookingHref}>Book Strategy Call</a>
            <a className="button secondary" href={eeosApplicationLoginUrl}>Login</a>
          </div>
        </div>
      </section>
      <section className="section home-areas" aria-labelledby="what-eea-does">
        <div className="section-heading"><p className="eyebrow">What EEA does</p><h2 id="what-eea-does">Connected systems. Clearer decisions.</h2></div>
        <div className="compact-area-grid">
          {areas.map((area) => <a className="compact-area-card" href={area.href} key={area.title}><h3>{area.title}</h3><p>{area.text}</p><span>Learn more <ArrowRight size={16} aria-hidden="true" /></span></a>)}
        </div>
      </section>
      <section className="section home-eeos" aria-labelledby="home-eeos-title">
        <Image src="/media/eeos/eeos-executive-intelligence.jpg" alt="EEOS executive intelligence eagle with an illuminated AI brain" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 34vw" />
        <div><p className="eyebrow">Flagship product</p><h2 id="home-eeos-title">EEOS connects the business.</h2><p>Eagle Eye Automation builds the systems. EEOS connects the data, analyzes activity, and provides executive intelligence so owners can see what matters and decide what comes next.</p><a className="button primary" href="/eeos">Explore EEOS <ArrowRight size={18} aria-hidden="true" /></a></div>
      </section>
      <EeosTransition />
      <SiteFooter showEeosTransition={false} />
    </main>
  );
}
