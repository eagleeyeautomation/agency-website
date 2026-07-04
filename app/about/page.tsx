import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader, founderExperience } from "../site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Eagle Eye Automation, the company building AI, GoHighLevel, workflow automation, dashboards, and business intelligence systems."
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>Business systems built from real operational experience.</h1>
        <p>
          Eagle Eye Automation helps service businesses move from scattered
          tools and manual admin to connected AI, CRM, automation, dashboard,
          and software systems.
        </p>
      </section>

      <section className="section about-section">
        <div className="about-grid">
          <article className="story-panel">
            <p className="eyebrow">Our point of view</p>
            <h2>Technology works best when it matches the business.</h2>
            <p>
              We start with the operating reality: how leads arrive, how calls
              are answered, how follow-up happens, how teams use GoHighLevel,
              and what leadership needs to see every day.
            </p>
          </article>
          <article className="founder-panel">
            <div className="founder-avatar" aria-hidden="true">
              GB
            </div>
            <div>
              <p className="eyebrow">Founder</p>
              <h2>George &quot;Eagle&quot; Brown</h2>
              <p>
                George brings operator experience across home care, real estate,
                AI automation, and business consulting. Eagle Eye Automation
                exists to make that practical knowledge visible in software.
              </p>
            </div>
            <div className="experience-list">
              {founderExperience.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Work with us</p>
          <h2>Build the system your team actually needs.</h2>
          <p>
            Start with a demo request and we will map the fastest path from
            operational bottleneck to useful business software.
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
