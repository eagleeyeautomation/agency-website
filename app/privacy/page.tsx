import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Eagle Eye Automation website."
};

export default function PrivacyPage() {
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
        <p className="eyebrow">Website privacy</p>
        <h1>Privacy Policy</h1>
        <p className="legal-meta"><strong>Future effective date:</strong> November 2, 2026 · <strong>Website:</strong> eagleeyeautomation.com</p>
        <p>This policy describes the information practices presently identified for the public Eagle Eye Automation website. Eagle Eye Technology Group LLC ("EETG") is the legal entity, and Eagle Eye Automation is its registered Virginia DBA and operating brand, not a separate legal entity.</p>

        <h2>Information you provide</h2>
        <p>When you submit an inquiry, request information, use an enabled chat experience, call, or email, we may receive information such as your name, email address, telephone number, company, service interest, message, and the content of your communication. Please do not submit passwords, payment-card information, protected health information, or other sensitive information through general inquiry or chat fields.</p>

        <h2>Information collected automatically</h2>
        <p>The website, hosting provider, security tools, and enabled communications services may receive technical information such as IP address, browser and device details, requested pages, referring page, timestamps, approximate location derived from an IP address, widget interactions, and diagnostic or security events.</p>

        <h2>How information is used</h2>
        <ul>
          <li>Respond to inquiries and evaluate requested services.</li>
          <li>Create and manage contact, conversation, and opportunity records when the connected CRM is used.</li>
          <li>Operate, secure, diagnose, and improve website and communications functionality.</li>
          <li>Maintain business records and comply with applicable obligations.</li>
          <li>Protect users, systems, and the rights of EETG, EEA, and others.</li>
        </ul>

        <h2>CRM, forms, and chat providers</h2>
        <p>The active website uses Vercel for hosting and uses GoHighLevel and LeadConnector for the public contact form, CRM records, conversations, and chat functionality. Microsoft Outlook provides the business email used for inquiries. Stripe processes subscription and onboarding payments under its applicable notices; payment-card details must not be submitted through general inquiry or chat fields. These providers may process submitted and technical information to operate the configured services. No other website service is identified here unless its active use has been verified.</p>

        <h2>Cookies and similar technologies</h2>
        <p>The website loads LeadConnector chat resources, and the active LeadConnector loader reads a <code>cookie-config</code> consent cookie and may use browser storage needed to provide the configured chat and communications functions. Vercel and LeadConnector may also receive standard request, device, security, and interaction data needed to deliver their services. The reviewed website does not include Google Analytics, Google Tag Manager, Meta Pixel, or another identified advertising or cross-site behavioral-analytics integration.</p>

        <h2>Browser privacy signals and third-party tracking</h2>
        <p>The website does not read or act on browser Do Not Track or Global Privacy Control signals. EETG has not configured the website to sell personal information or use it for cross-context behavioral advertising. No active website script was identified that demonstrates collection of personally identifiable information about visitors over time and across third-party websites. Service providers may process data across their own services under their applicable notices and agreements; EETG does not independently determine whether a provider combines website data with data obtained outside EETG's websites.</p>

        <h2>Sharing and sale</h2>
        <p>Information may be disclosed to service providers that support hosting, security, communications, CRM, forms, and business operations; to professional advisers; when required by law; or in connection with a business transaction. The reviewed website configuration does not sell personal information or use it for cross-context behavioral advertising.</p>

        <h2>Retention and security</h2>
        <p>Information is retained only as reasonably necessary for business and legal purposes. Retention may differ across email, CRM, form, chat, backup, and security systems. Reasonable safeguards are used, but no transmission or storage method can guarantee absolute security.</p>

        <h2>Your choices</h2>
        <p>Depending on applicable law, you may request access to, correction of, or deletion of personal information by emailing <a href="mailto:eagle@eagleeyeautomation.com">eagle@eagleeyeautomation.com</a>. We may need to verify your identity and the scope of the request before responding.</p>

        <h2>Children</h2>
        <p>The EEA business-services website is not directed to children under 13 and should not be used to submit children's personal information.</p>

        <h2>External services and changes</h2>
        <p>Links to EETG, EEOS, social networks, or other services are governed by their own notices. Material updates will be posted with a revised effective date.</p>

        <h2>Contact</h2>
        <p>Questions and privacy requests may be sent to <a href="mailto:eagle@eagleeyeautomation.com">eagle@eagleeyeautomation.com</a> or raised by phone at <a href="tel:+15714622407">(571) 462-2407</a>. The public street address remains withheld.</p>
        <nav className="legal-page-links" aria-label="Legal pages"><a aria-current="page" href="/privacy">Privacy Policy</a><a href="/terms">Terms of Use</a></nav>
      </article>
      <SiteFooter showEeosTransition={false} />
    </main>
  );
}
