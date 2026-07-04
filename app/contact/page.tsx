import type { Metadata } from "next";
import { MailCheck, PhoneCall } from "lucide-react";
import {
  ContactForm,
  SiteFooter,
  SiteHeader,
  businessHours,
  contactOptions,
  getContactDetails
} from "../site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a demo with Eagle Eye Automation for AI automation, GoHighLevel CRM, websites, dashboards, or custom business software."
};

export default function ContactPage() {
  const { bookingHref, contactEmail, contactPhone, contactPhoneHref } =
    getContactDetails();

  return (
    <main>
      <SiteHeader />

      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Request a demo.</h1>
        <p>
          Bring the process, system, or bottleneck that is slowing the business
          down. Eagle Eye Automation will help map the opportunity and recommend
          the right build path.
        </p>
      </section>

      <section className="contact-section contact-page-section">
        <div className="contact-copy">
          <p className="eyebrow">Get in touch</p>
          <h2>Tell us what needs to work better.</h2>
          <p>
            Use the form, send an email, or book directly through the calendar
            link. Business inquiries are reviewed during business hours, and AI
            phone and chat support can help capture opportunities 24/7.
          </p>
          <div className="hours-grid" aria-label="Business hours">
            {businessHours.map((item) => (
              <div key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="contact-options">
            {contactOptions.map((option) => (
              <span key={option}>{option}</span>
            ))}
          </div>
          <div className="cta-actions">
            <a className="button primary light" href={bookingHref}>
              <PhoneCall size={18} aria-hidden="true" />
              Request a Demo
            </a>
            <a className="button secondary light" href={`mailto:${contactEmail}`}>
              <MailCheck size={18} aria-hidden="true" />
              {contactEmail}
            </a>
            {contactPhone && contactPhoneHref ? (
              <a className="button secondary light" href={contactPhoneHref}>
                <PhoneCall size={18} aria-hidden="true" />
                {contactPhone}
              </a>
            ) : null}
          </div>
        </div>
        <ContactForm />
      </section>

      <SiteFooter />
    </main>
  );
}
