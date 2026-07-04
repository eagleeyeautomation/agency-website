import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader, prnStaffersCaseStudy } from "../site-content";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Eagle Eye Automation success stories including the PRN Staffers Digital Transformation flagship implementation."
};

export default function SuccessStoriesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Success Stories</p>
        <h1>Proof from real implementation work.</h1>
        <p>
          PRN Staffers is the flagship Eagle Eye Automation implementation,
          showing how websites, AI, GoHighLevel, workflows, and dashboards work
          together.
        </p>
      </section>

      <section className="section">
        <article className="case-card">
          <div>
            <p className="eyebrow">Flagship implementation</p>
            <h2>{prnStaffersCaseStudy.title}</h2>
            <p>{prnStaffersCaseStudy.subtitle}</p>
            <a className="button package-button" href="/success-stories/prn-staffers">
              Read the case study
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ul className="clean-list">
            {prnStaffersCaseStudy.results.map((result) => (
              <li key={result}>
                <Check size={16} aria-hidden="true" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
