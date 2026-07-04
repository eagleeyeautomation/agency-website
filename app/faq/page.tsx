import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader, faqs } from "../site-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Eagle Eye Automation, Eagle Eye Command Center, GoHighLevel implementation, AI voice, AI chat, and automation."
};

export default function FaqPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">FAQ</p>
        <h1>Answers before the discovery call.</h1>
        <p>
          A quick guide to Eagle Eye Command Center, GoHighLevel implementation,
          AI voice, AI chat, automation, and how the work fits together.
        </p>
      </section>

      <section className="section faq-section">
        <div className="faq-list">
          {faqs.map((faq) => (
            <article className="faq-card" key={faq.question}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Still deciding?</p>
          <h2>Bring the messy workflow to the call.</h2>
          <p>
            We will help identify whether you need CRM structure, AI
            communication, automation, dashboards, or all of the above.
          </p>
        </div>
        <a className="button primary light" href="/contact">
          Ask a question
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
