import Image from "next/image";
import { ArrowRight, Check, PhoneCall, Sparkles } from "lucide-react";
import {
  ContactForm,
  SiteFooter,
  SiteHeader,
  contactOptions,
  founderExperience,
  getContactDetails,
  industries,
  outcomes,
  productPlatforms,
  portfolioProjects,
  prnStaffersCaseStudy,
  pricingPackages,
  tagline
} from "./site-content";

export default function Home() {
  const { bookingHref, contactEmail, contactPhone, contactPhoneHref } =
    getContactDetails();

  return (
    <main>
      <SiteHeader />

      <section id="top" className="hero">
        <Image
          src="/images/automation-command-center.png"
          alt="Modern automation command center showing connected workflows and dashboards"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            {tagline}
          </p>
          <h1>AI, automation, CRM, and software for sharper operations.</h1>
          <p className="hero-copy">
            Eagle Eye Automation helps service businesses streamline operations
            through AI receptionists, workflow automation, GoHighLevel systems,
            dashboards, and custom software. Eagle Eye Command Center is our
            flagship software platform for turning GoHighLevel into an
            executive operating system.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/contact">
              Book a discovery call
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="/services">
              Explore services
            </a>
          </div>
        </div>
      </section>

      <section className="proof-band" aria-label="Automation outcomes">
        {outcomes.map((outcome) => (
          <div key={outcome} className="proof-item">
            <Check size={18} aria-hidden="true" />
            <span>{outcome}</span>
          </div>
        ))}
      </section>

      <section id="about" className="section about-section">
        <div className="section-heading">
          <p className="eyebrow">Who we are</p>
          <h2>Built from real business operations, not theory.</h2>
          <p>
            Eagle Eye Automation helps businesses streamline operations through
            AI, automation, CRM integrations, and custom software solutions. The
            work is practical: answer faster, follow up cleaner, see the numbers,
            and give teams systems they can actually use.
          </p>
        </div>
        <div className="about-grid">
          <article className="story-panel">
            <p className="eyebrow">Our story</p>
            <h3>Systems for business owners who need clarity.</h3>
            <p>
              Eagle Eye Automation was created to help operators replace
              scattered tools and manual admin with connected systems. We focus
              on the places where growth usually gets messy: leads, client
              intake, handoffs, follow-up, reporting, and custom internal tools.
            </p>
          </article>
          <article className="founder-panel">
            <div className="founder-avatar" aria-hidden="true">
              GB
            </div>
            <div>
              <p className="eyebrow">Meet the founder</p>
              <h3>George &quot;Eagle&quot; Brown</h3>
              <p>
                George brings operator experience across home care, real estate,
                AI automation, and business consulting. That mix shapes Eagle
                Eye Automation&apos;s approach: understand the business first,
                then build technology that removes friction.
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

      <section id="services" className="section services-section">
        <div className="section-heading">
          <p className="eyebrow">Products</p>
          <h2>Software and automation systems for the next stage of growth.</h2>
          <p>
            From Eagle Eye Command Center to AI front-office coverage, each
            system is designed to reduce manual work and give your team a
            cleaner path from lead to delivery.
          </p>
        </div>
        <div className="service-grid service-grid-wide">
          {productPlatforms.slice(0, 4).map(({ icon: Icon, title, items, text }) => (
            <article className="service-card" key={title}>
              <div className="icon-box">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="clean-list">
                {items.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Flagship platform</p>
          <h2>Eagle Eye Command Center turns GoHighLevel into executive intelligence.</h2>
          <p>
            The Command Center is built for leaders who need one place to see
            leads, calls, chats, appointments, tasks, pipeline value, alerts,
            and recommended actions.
          </p>
          <a className="button package-button" href="/products">
            View products
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="system-panel">
          <div className="system-panel-header">
            <Sparkles size={20} aria-hidden="true" />
            Executive operating system for GoHighLevel
          </div>
          <div className="tool-grid">
            {["Leads", "AI Calls", "AI Chats", "Pipeline", "Tasks", "Appointments", "Reviews", "Alerts"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="metric-row">
            <div>
              <strong>1</strong>
              <span>Executive view</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>AI coverage</span>
            </div>
            <div>
              <strong>GHL</strong>
              <span>Version 1 focus</span>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section portfolio-section">
        <div className="section-heading">
          <p className="eyebrow">Success story</p>
          <h2>PRN Staffers is the flagship implementation.</h2>
          <p>
            The PRN Staffers Digital Transformation brought together websites,
            AI voice, AI chat, GoHighLevel automation, intake workflows, and a
            centralized executive command center.
          </p>
        </div>
        <div className="case-study-preview">
          <article className="story-panel">
            <p className="eyebrow">PRN Staffers Digital Transformation</p>
            <h3>{prnStaffersCaseStudy.subtitle}</h3>
            <a className="button secondary" href="/success-stories/prn-staffers">
              Read the case study
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </article>
          <div className="portfolio-grid compact-grid">
            {portfolioProjects.slice(0, 4).map((project) => (
              <article className="portfolio-card" key={project.title}>
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="section split-section">
        <div>
          <p className="eyebrow">Industries</p>
          <h2>Focused on industries where operations matter every day.</h2>
          <p>
            Eagle Eye Automation works especially well for businesses with
            high-volume communication, follow-up, scheduling, reporting, and
            repeatable client workflows.
          </p>
        </div>
        <div className="industry-grid">
          {industries.map((industry) => (
            <article className="industry-card" key={industry.title}>
              <h3>{industry.title}</h3>
              <p>{industry.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="section pricing-section">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Packages that match your stage of growth.</h2>
          <p>
            Start with the foundation, add automation as the business grows, or
            build a custom operating system around advanced reporting and
            integrations.
          </p>
        </div>
        <div className="pricing-grid">
          {pricingPackages.map((tier) => (
            <article
              className={`pricing-card${tier.featured ? " featured" : ""}`}
              key={tier.title}
            >
              {tier.featured ? <span className="package-badge">Popular</span> : null}
              <h3>{tier.title}</h3>
              <p>{tier.text}</p>
              <ul className="clean-list">
                {tier.items.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a className="button package-button" href="/contact">
                Discuss fit
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>Start with a discovery call.</h2>
          <p>
            Tell us what is slowing the business down. We will review your
            current process, identify the fastest automation opportunities, and
            recommend the right package or custom build path.
          </p>
          <div className="contact-options">
            {contactOptions.map((option) => (
              <span key={option}>{option}</span>
            ))}
          </div>
          <div className="cta-actions">
            <a className="button primary light" href={bookingHref}>
              <PhoneCall size={18} aria-hidden="true" />
              Book discovery call
            </a>
            <a className="button secondary light" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            {contactPhone && contactPhoneHref ? (
              <a className="button secondary light" href={contactPhoneHref}>
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
