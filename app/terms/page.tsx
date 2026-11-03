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
        <p>Eagle Eye Technology Group LLC ("EETG") is the legal and contracting entity. Eagle Eye Automation is its registered Virginia DBA and operating brand, not a separate legal entity.</p>

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
        <p>Stripe-powered checkout is available for eligible Virginia customers. Consultation options remain available without purchase.</p>

        <h2>Subscription billing and renewal</h2>
        <p>Starter is $99 per month, Growth is $299 per month, and Scale is $499 per month. Each subscription includes a separate $250 one-time setup and onboarding fee charged with the first payment. Monthly subscriptions begin upon successful checkout and automatically renew each month on the original billing date until canceled. The $250 onboarding fee does not recur. Any price change requires at least 30 days&apos; advance written notice and applies only to a future renewal.</p>

        <h2>Cancellation</h2>
        <p>You may cancel by emailing <a href="mailto:eagle@eagleeyeautomation.com">eagle@eagleeyeautomation.com</a>. Cancellation becomes effective at the end of the current paid billing period, and no later renewal will be charged. There is no minimum commitment. Partial-month credits or prorated refunds are not provided except where required by law or expressly approved in writing.</p>

        <h2>Refunds</h2>
        <p>Monthly subscription payments are non-refundable once processed, except for duplicate or unauthorized charges, where required by law, or when EETG approves a written exception. The $250 onboarding fee is refundable only if EETG cancels before onboarding work begins. The onboarding fee becomes earned and non-refundable when the kickoff meeting occurs or configuration work begins, whichever happens first, except where required by law. Approved refunds are returned to the original payment method.</p>

        <h2>Onboarding</h2>
        <p>The $250 one-time onboarding fee covers account setup, organization and location configuration, GoHighLevel connection, initial data synchronization, dashboard configuration, basic customer training, and launch support within the purchased plan. Onboarding begins at the earlier of the scheduled kickoff meeting or the first documented configuration action. Customer delays, missing access or information, and third-party outages may extend delivery dates. Out-of-scope work requires separate written approval.</p>

        <h2>Taxes</h2>
        <p>Published prices exclude applicable taxes. Taxes will be calculated and collected only where EETG is required to do so. Tax-exempt treatment requires acceptable documentation before the applicable charge. Tax collection remains disabled unless and until a jurisdiction-specific obligation is documented and Eagle authorizes the applicable registration and Stripe configuration.</p>

        <h2>Customer acceptance</h2>
        <p>Checkout activation requires an unchecked customer-acceptance control linking to the approved subscription terms, refund and cancellation policy, Privacy Policy, and these Terms of Use. Custom scope, enterprise terms, or exceptions require a signed service agreement before payment.</p>

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
