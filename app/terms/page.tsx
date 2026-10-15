import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Website terms for Eagle Eye Automation."
};

export default function TermsPage() {
  return (
    <main>
      <SiteHeader />
      <style>{`
        .legal-page-shell { width: min(920px, calc(100% - 48px)); margin: 0 auto; padding: 150px 0 96px; }
        .legal-page-shell h1 { max-width: none; margin: 12px 0 0; font-size: clamp(2.8rem, 7vw, 5.6rem); line-height: .98; }
        .legal-page-shell h2 { margin: 44px 0 12px; font-size: clamp(1.35rem, 2.4vw, 1.85rem); }
        .legal-page-shell > p:not(.eyebrow), .legal-page-shell li { color: rgba(255,255,255,.78); font-size: 1rem; line-height: 1.75; }
        .legal-page-shell ul { padding-left: 1.4rem; }
        .legal-page-shell a { color: #e1c85a; font-weight: 700; }
        .legal-meta { margin: 24px 0 34px; }
        .legal-page-links { margin-top: 48px; display: flex; flex-wrap: wrap; gap: 18px; }
        @media (max-width: 700px) { .legal-page-shell { width: min(100% - 32px, 920px); padding: 112px 0 72px; } .legal-page-shell h2 { margin-top: 36px; } }
      `}</style>
      <article className="legal-page-shell">
        <p className="eyebrow">Website terms</p>
        <h1>Terms of Use</h1>
        <p className="legal-meta"><strong>Future effective date:</strong> November 2, 2026 · <strong>Website:</strong> eagleeyeautomation.com</p>
        <p>These terms govern use of the public Eagle Eye Automation website. They do not create a client relationship, authorize product access, or replace a separately executed service, subscription, data-processing, or other agreement.</p>

        <h2>Website purpose</h2>
        <p>The website provides general information about Eagle Eye Automation services, capabilities, planned products, pricing concepts, and ways to request information. Submitting a form, email, chat, or scheduling request does not obligate either party to enter an engagement.</p>

        <h2>Brand and company relationship</h2>
        <p>Eagle Eye Technology Group LLC ("EETG") is the legal entity, and Eagle Eye Automation is its registered DBA. Eagle Eye Automation is not a separate legal entity. Any final customer agreement must identify Eagle Eye Technology Group LLC as the contracting entity and may identify its Eagle Eye Automation DBA where applicable.</p>

        <h2>EEOS and EEA Scout</h2>
        <p>EEOS remains under controlled access. EEA Scout remains in development and is not represented as commercially available. Website descriptions do not promise a release date, feature, performance level, or access right. Any authorized product use requires separate written terms.</p>

        <h2>Services and results</h2>
        <p>Website descriptions and pricing information are general planning information. Scope, deliverables, responsibilities, fees, billing, acceptance, support, security, ownership, cancellation, and other binding terms require an authorized written agreement. No business, revenue, marketing, automation, AI, or operational outcome is guaranteed.</p>

        <h2>Permitted use</h2>
        <p>You may use the website for lawful evaluation and communication. You may not interfere with the website, attempt unauthorized access, introduce malicious code, submit unlawful or sensitive data, impersonate another person, scrape the site in a manner that impairs service, or violate applicable rights.</p>

        <h2>Intellectual property</h2>
        <p>Website names, logos, text, graphics, design, software, demonstrations, and other content are owned by or licensed to their respective rights holders. These terms grant only a limited right to view and use the public website for lawful evaluation.</p>

        <h2>AI and automated features</h2>
        <p>AI, chat, automation, or generated output may be incomplete or inaccurate and requires appropriate human review. Do not rely on website or automated output as legal, financial, medical, cybersecurity, or other professional advice.</p>

        <h2>Third-party services</h2>
        <p>The active website uses Vercel for hosting, GoHighLevel and LeadConnector for the public contact form, CRM, conversations, and chat, and Microsoft Outlook for business email. The website also links to social networks and other external destinations. Their availability, content, and processing are governed by their own terms and notices.</p>

        <h2>Payments</h2>
        <p>The public website does not provide online payments at launch. Any future payment process and applicable billing, refund, cancellation, and tax terms must be presented and authorized separately before use.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the Commonwealth of Virginia, subject to applicable consumer protections and other rights that cannot lawfully be waived.</p>

        <h2>Disclaimers and responsibility</h2>
        <p>The website is provided on an “as available” basis to the extent permitted by applicable law. EEA and EETG do not warrant uninterrupted or error-free operation. Responsibility for use of the website will be determined under applicable law and any controlling written agreement.</p>

        <h2>Changes and contact</h2>
        <p>Updates will be posted with a revised effective date. Questions may be sent to <a href="mailto:eagle@eagleeyeautomation.com">eagle@eagleeyeautomation.com</a> or raised by phone at <a href="tel:+15714622407">(571) 462-2407</a>. The public street address remains withheld.</p>
        <nav className="legal-page-links" aria-label="Legal pages"><a href="/privacy">Privacy Policy</a><a aria-current="page" href="/terms">Terms of Use</a></nav>
      </article>
      <SiteFooter showEeosTransition={false} />
    </main>
  );
}
