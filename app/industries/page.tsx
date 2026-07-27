import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "../site-content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industries served by Eagle Eye Automation including home care, healthcare, real estate, small business, and professional services."
};

const industryDetails = [
  {
    title: "Home Care",
    text: "Support intake, scheduling, communication, and operational visibility."
  },
  {
    title: "Healthcare",
    text: "Streamline approved patient communication, handoffs, and administrative workflows."
  },
  {
    title: "Real Estate",
    text: "Connect inquiries, follow-up, scheduling, and customer communication."
  },
  {
    title: "Contractors",
    text: "Coordinate lead response, job scheduling, follow-up, and customer updates."
  },
  {
    title: "Restaurants",
    text: "Support reservations, guest communication, feedback, and repeat engagement."
  },
  {
    title: "Professional Services",
    text: "Improve client intake, onboarding, communication, and service delivery."
  },
  {
    title: "E-Commerce",
    text: "Connect customer questions, order communication, and follow-up workflows."
  }
];

export default function IndustriesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero industries-page-hero">
        <p className="eyebrow">Industries</p>
        <h1>Intelligent systems built for the way your industry works.</h1>
        <p>
          Eagle Eye Automation Group helps service businesses automate
          repetitive work, respond faster, and gain clearer operational
          visibility.
        </p>
      </section>

      <section className="section industries-visual-section">
        <div className="industries-hero-image">
          <Image
            src="/images/eea-industries-hero.png"
            alt="Eagle Eye Automation Group industries graphic showing AI and automation solutions for home care, healthcare, real estate, contractors, restaurants, professional services, and e-commerce."
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>
      </section>

      <section className="section industries-details-section">
        <div className="section-heading">
          <p className="eyebrow">Designed for Service Businesses</p>
          <h2>Configurable solutions for real operating workflows.</h2>
          <p>
            Each solution is built around approved systems and the way your
            team works. Automation availability depends on client setup and
            connected systems.
          </p>
        </div>
        <div className="industries-live-list">
          {industryDetails.map((industry) => (
            <article className="industries-live-item" key={industry.title}>
              <h2>{industry.title}</h2>
              <p>{industry.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Industry fit</p>
          <h2>Build smarter systems around the way your business works.</h2>
          <p>
            Tell us where work slows down, communication breaks, or visibility
            is limited. We will help identify the right next step.
          </p>
        </div>
        <a className="button primary light" href="/contact">
          Discuss Your Industry
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
