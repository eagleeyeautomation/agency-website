import type { Metadata } from "next";
import { SiteFooter, SiteHeader, faqs } from "../site-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Eagle Eye Automation, EEOS, GoHighLevel implementation, AI voice, AI chat, and automation."
};

export default function FaqPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">FAQ</p>
        <h1>Answers before the discovery call.</h1>
        <p>
          A quick guide to EEOS, GoHighLevel implementation, AI voice, AI chat,
          automation, and how the work fits together.
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

      <SiteFooter />
    </main>
  );
}
