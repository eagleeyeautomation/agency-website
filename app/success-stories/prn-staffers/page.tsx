import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SiteFooter, SiteHeader, prnStaffersCaseStudy } from "../../site-content";

export const metadata: Metadata = {
  title: "PRN Staffers Case Study",
  description:
    "PRN Staffers Digital Transformation case study: websites, AI voice, AI chat, GoHighLevel CRM, workflow automation, intake automation, and executive command center."
};

export default function PrnStaffersCaseStudyPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">PRN Staffers Case Study</p>
        <h1>{prnStaffersCaseStudy.title}</h1>
        <p>{prnStaffersCaseStudy.subtitle}</p>
      </section>

      <section className="section case-study-layout">
        <article className="story-panel">
          <p className="eyebrow">Challenge</p>
          <h2>Better visibility, faster response, and stronger systems.</h2>
          <p>{prnStaffersCaseStudy.challenge}</p>
        </article>
        <article className="case-card">
          <div>
            <p className="eyebrow">Solution</p>
            <h2>Eagle Eye Automation helped build the operating foundation.</h2>
            <p>
              The work connected digital presence, AI communication, GoHighLevel
              CRM, follow-up automation, intake workflows, reporting, and
              executive visibility.
            </p>
          </div>
          <ul className="clean-list">
            {prnStaffersCaseStudy.solution.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Results</p>
          <h2>Honest improvements and a stronger foundation.</h2>
        </div>
        <div className="service-grid">
          {prnStaffersCaseStudy.results.map((result) => (
            <article className="service-card" key={result}>
              <div className="icon-box">
                <Check size={24} aria-hidden="true" />
              </div>
              <h3>{result}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2>Placeholder quotes from the PRN Staffers team.</h2>
        </div>
        <div className="portfolio-grid testimonials-grid">
          {prnStaffersCaseStudy.testimonials.map((testimonial) => (
            <blockquote className="portfolio-card testimonial-card" key={testimonial.quote}>
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <cite>{testimonial.role}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
