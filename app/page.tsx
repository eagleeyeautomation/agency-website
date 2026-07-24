import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Check,
  Globe2,
  MessageCircle,
  PhoneCall,
  BrainCircuit,
  Sparkles,
  Workflow
} from "lucide-react";
import {
  ContactForm,
  SiteFooter,
  SiteHeader,
  businessHours,
  companyMission,
  companyStrengths,
  contactOptions,
  corporateHeroSupportingMessage,
  corporateHeadline,
  eagleEyeBrainUrl,
  eagleEyeBrainQuestions,
  eeosCapabilities,
  eeosDescription,
  eeosApplicationUrl,
  eeosApplicationLoginUrl,
  getContactDetails,
  industries,
  productTagline,
  eeosRoadmap,
  solutionGroups,
  tagline,
  whatWeBuild
} from "./site-content";

const platformHighlights = [
  "AI executive intelligence",
  "Business health monitoring",
  "Connected integrations",
  "Secure operations"
];

const capabilitySections = [
  {
    id: "automation",
    eyebrow: "Automation",
    title: "Operational workflows that keep the business moving.",
    text: "Eagle Eye Automation designs workflow automation, scheduling support, lead routing, notifications, task management, and follow-up systems around the way service businesses actually operate.",
    icon: Workflow,
    items: ["Workflow automation", "Scheduling", "Task management", "Lead routing"]
  },
  {
    id: "crm",
    eyebrow: "CRM",
    title: "Customer-management systems with executive visibility.",
    text: "CRM architecture, sales pipelines, appointment booking, reputation workflows, and reporting structures help teams organize opportunities and keep the next action clear.",
    icon: BarChart3,
    items: ["CRM visibility", "Sales pipelines", "Appointment booking", "Reporting"]
  },
  {
    id: "websites",
    eyebrow: "AI-powered websites",
    title: "Web experiences built to capture and route demand.",
    text: "Modern websites, landing pages, lead capture, chat automation, and conversion paths connect public interest to the systems that help staff respond quickly.",
    icon: Globe2,
    items: ["Websites", "Lead capture", "Chat automation", "CRM handoff"]
  },
  {
    id: "brain",
    eyebrow: "Eagle Eye Brain",
    title: "A public AI intelligence experience for business growth.",
    text: "Eagle Eye Brain gives visitors and prospects a smarter way to explore needs, ask questions, and move into the right next step without replacing human oversight.",
    icon: MessageCircle,
    items: ["AI guidance", "Service discovery", "Lead qualification", "Executive context"],
    href: eagleEyeBrainUrl
  }
];

export default function Home() {
  const { bookingHref, contactEmail, contactPhone, contactPhoneHref } =
    getContactDetails();

  return (
    <main>
      <SiteHeader active="Home" />

      <section id="top" className="hero corporate-hero">
        <Image
          src="/images/automation-command-center.png"
          alt="Modern enterprise technology command center with connected automation dashboards"
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
          <h1>{corporateHeadline}</h1>
          <p className="hero-kicker">{corporateHeroSupportingMessage}</p>
          <p className="hero-copy">
            Eagle Eye Automation builds AI, automation, and executive
            intelligence for small businesses. Our flagship product, EEOS,
            gives owners enterprise-level visibility, decision support,
            workflow automation, secure operations, and connected business
            intelligence without requiring an enterprise-size team.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={eeosApplicationUrl}>
              Explore EEOS
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href={bookingHref}>
              Book Strategy Call
            </a>
            <a className="button secondary" href={eeosApplicationLoginUrl}>
              Login
            </a>
          </div>
        </div>
      </section>

      <section className="proof-band premium-proof" aria-label="Platform highlights">
        {platformHighlights.map((highlight) => (
          <div key={highlight} className="proof-item">
            <Check size={18} aria-hidden="true" />
            <span>{highlight}</span>
          </div>
        ))}
      </section>

      <section className="section video-story-section" aria-labelledby="video-story-title">
        <div className="video-story-copy">
          <p className="eyebrow">Automation visual story</p>
          <h2 id="video-story-title">From first inquiry to executive visibility.</h2>
          <p>
            See how a service-business lead can move through AI communication,
            CRM activity, staff notification, appointment scheduling,
            follow-up, and EEOS intelligence in one controlled operating flow.
          </p>
        </div>
        <div className="video-frame">
          <video
            className="story-video"
            autoPlay
            muted
            loop
            playsInline
            controls
            controlsList="nodownload"
            preload="metadata"
            poster="/images/automation-story-poster.webp"
            aria-describedby="automation-video-transcript"
          >
            <source
              src="/videos/eagle-eye-automation-story.webm"
              type="video/webm"
              media="(min-width: 681px) and (prefers-reduced-motion: no-preference)"
            />
          </video>
          <picture className="video-fallback" aria-hidden="true">
            <source
              media="(max-width: 680px)"
              srcSet="/images/automation-story-mobile.webp"
            />
            <img
              src="/images/automation-story-poster.webp"
              alt=""
              loading="lazy"
            />
          </picture>
          <p id="automation-video-transcript" className="sr-only">
            Silent animation showing a service-business team, website lead,
            AI response, CRM update, staff notification, appointment scheduling,
            follow-up, and EEOS executive intelligence. No real customer,
            staff, credential, token, or production data is displayed.
          </p>
        </div>
      </section>

      <section className="section what-we-build-section" aria-labelledby="what-we-build-title">
        <div className="section-heading">
          <p className="eyebrow">What We Build</p>
          <h2 id="what-we-build-title">AI software and operational platforms for service businesses.</h2>
          <p>
            Eagle Eye Automation develops premium AI operating systems,
            automation layers, and executive intelligence experiences for
            owners who need enterprise-level capability without enterprise
            overhead.
          </p>
        </div>
        <div className="build-grid">
          {whatWeBuild.map(({ icon: Icon, title, text }) => (
            <article className="build-card" key={title}>
              <div className="tech-icon">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section enterprise-section">
        <div className="section-heading">
          <p className="eyebrow">Enterprise power for growing businesses</p>
          <h2>Modern software discipline without enterprise complexity.</h2>
          <p>
            {companyMission} Eagle Eye Automation closes the gap between
            disconnected tools and the connected systems larger companies use to
            manage demand, serve customers, automate work, and lead with better
            information.
          </p>
        </div>
        <div className="enterprise-grid">
          {companyStrengths.map((strength) => (
            <article className="premium-card" key={strength}>
              <span>{strength}</span>
              <p>
                Built for service businesses that need dependable systems,
                cleaner handoffs, and clearer operational visibility.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="eeos" className="section eeos-showcase">
        <div className="eeos-showcase-copy">
          <p className="eyebrow">Flagship product</p>
          <h2>EEOS is the AI Operating System for Service Businesses.</h2>
          <p className="eeos-subheading">{productTagline}</p>
          <p>{eeosDescription}</p>
          <div className="eeos-role-grid" aria-label="EEOS product roles">
            <span>Eagle Eye Automation is the company.</span>
            <span>EEOS is the flagship software platform.</span>
            <span>Eagle Eye Brain is the public AI intelligence experience.</span>
            <span>Executive Recommendations are the actionable output.</span>
          </div>
          <ul className="eeos-capability-list">
            {eeosCapabilities.map((capability) => (
              <li key={capability}>
                <Check size={16} aria-hidden="true" />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
          <a className="button primary" href={eeosApplicationUrl}>
            Explore EEOS
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="eeos-visual-card">
          <Image
            src="/images/eeos-sanitized-dashboard.svg"
            alt="Sanitized EEOS dashboard visual showing generic executive recommendations, lead generation, automation, and business intelligence panels"
            width={1040}
            height={760}
            sizes="(max-width: 900px) 100vw, 48vw"
            className="eeos-visual"
          />
          <div className="eeos-visual-caption">
            Sanitized product visual. No consumer data, staff information,
            credentials, identifiers, or real contact records.
          </div>
        </div>
      </section>

      <section className="section roadmap-section" aria-labelledby="roadmap-title">
        <div className="section-heading">
          <p className="eyebrow">The EEOS Platform Roadmap</p>
          <h2 id="roadmap-title">A clear product vision, labeled honestly.</h2>
          <p>
            EEOS Core is the flagship platform. Additional modules are shown as
            in development or planned so visitors can understand the long-term
            direction without mistaking future roadmap work for current
            shipping capability.
          </p>
        </div>
        <div className="roadmap-grid">
          {eeosRoadmap.map((item) => (
            <article className="roadmap-card" key={item.title}>
              <div className="roadmap-card-header">
                <h3>{item.title}</h3>
                <span className={`status-pill status-${item.status.toLowerCase().replace(" ", "-")}`}>
                  {item.status}
                </span>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="section solutions-overview">
        <div className="section-heading">
          <p className="eyebrow">Solutions overview</p>
          <h2>One operating layer for acquisition, engagement, automation, and intelligence.</h2>
          <p>
            Eagle Eye Automation organizes the core systems small and growing
            service businesses need into clear capability groups.
          </p>
        </div>
        <div className="solution-group-grid">
          {solutionGroups.map((group) => (
            <article className="solution-group-card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.text}</p>
              <ul className="clean-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a className="button package-button" href={group.href}>
                Explore {group.title}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section automation-flow-section" aria-labelledby="automation-flow-title">
        <div className="section-heading">
          <p className="eyebrow">Automation flow</p>
          <h2 id="automation-flow-title">Lead Enters → AI Responds → CRM Updates → Staff Is Notified → Appointment Is Scheduled → Follow-Up Continues</h2>
          <p>
            This visual shows the operating pattern Eagle Eye Automation can
            design when the approved systems, permissions, and workflows are in
            place. It does not imply every automation is active for every
            client.
          </p>
        </div>
        <div className="visual-frame">
          <Image
            src="/images/automation-flow-visual.webp"
            alt="Premium automation flow diagram showing lead entry, AI response, CRM update, staff notification, appointment scheduling, and continued follow-up"
            width={1280}
            height={520}
            sizes="(max-width: 900px) 100vw, 88vw"
            className="wide-visual"
          />
        </div>
      </section>

      <section className="section capability-stack">
        {capabilitySections.map(({ icon: Icon, id, eyebrow, title, text, items, href }) => (
          <article className="capability-panel" id={id} key={id}>
            <div className="capability-icon">
              <Icon size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
              <p>{text}</p>
              {href ? (
                <a className="button package-button" href={href}>
                  Talk to the Eagle Eye Brain
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <ul className="capability-list">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="section product-visual-section" aria-labelledby="product-visual-title">
        <div className="section-heading">
          <p className="eyebrow">Product visuals</p>
          <h2 id="product-visual-title">Sanitized visual support for the full Eagle Eye Automation platform.</h2>
          <p>
            CRM, websites, Voice AI, SMS, workflow automation, dashboards,
            Eagle Eye Brain, and EEOS are represented with generic product
            interface visuals only.
          </p>
        </div>
        <div className="visual-frame">
          <Image
            src="/images/product-visuals-sanitized.webp"
            alt="Sanitized product visual grid for CRM, websites, Voice AI, SMS, workflow automation, dashboards, Eagle Eye Brain, and EEOS"
            width={1280}
            height={720}
            sizes="(max-width: 900px) 100vw, 88vw"
            className="wide-visual"
          />
        </div>
      </section>

      <section id="industries" className="section industry-section">
        <div className="section-heading">
          <p className="eyebrow">Built for Service Businesses</p>
          <h2>Designed for target industries where response and follow-up matter.</h2>
          <p>
            These are the types of businesses Eagle Eye Automation is built to
            support as EEOS grows: service teams with communication volume,
            repeatable workflows, scheduling needs, and reporting pressure.
          </p>
        </div>
        <div className="industry-grid industry-grid-large">
          {industries.map((industry) => (
            <article className="industry-card" key={industry.title}>
              <h3>{industry.title}</h3>
              <p>{industry.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="speak-to-eeos-brain" className="section brain-showcase-section" aria-labelledby="brain-title">
        <div className="brain-visual-card">
          <Image
            src="/images/eeos-eagle-brain.svg"
            alt="Futuristic eagle with a clearly visible illuminated AI brain, circuitry, and executive intelligence signals"
            width={960}
            height={720}
            sizes="(max-width: 900px) 100vw, 48vw"
            className="brain-visual"
          />
        </div>
        <div className="brain-copy">
          <p className="eyebrow">
            <BrainCircuit size={16} aria-hidden="true" />
            Speak to EEOS Brain
          </p>
          <h2 id="brain-title">Speak to EEOS Brain</h2>
          <p>
            Speak to EEOS Brain and discover how executive intelligence,
            automation, and connected business data can help you lead smarter.
          </p>
          <p>
            A real live EEOS Brain conversation is not connected yet, so this
            public experience is currently contact-driven and handled by Eagle
            Eye Automation.
          </p>
          <div className="brain-question-grid" aria-label="Suggested EEOS Brain questions">
            {eagleEyeBrainQuestions.map((question) => (
              <span key={question}>{question}</span>
            ))}
          </div>
          <div className="cta-actions">
            <a className="button primary" href="/contact#speak-to-eeos-brain">
              Speak to EEOS Brain
            </a>
            <a className="button secondary" href={bookingHref}>
              Book a Strategy Call
            </a>
            <a className="button secondary" href={`mailto:${contactEmail}`}>
              Email Eagle Eye Automation
            </a>
            {contactPhoneHref ? (
              <a className="button secondary" href={contactPhoneHref}>
                Call Eagle Eye Automation
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="section-heading">
          <p className="eyebrow">Why Eagle Eye Automation</p>
          <h2>A practical technology partner for companies ready to operate sharper.</h2>
          <p>
            Eagle Eye Automation builds connected systems around real business
            workflows, not isolated tools. The result is cleaner intake, faster
            response, better visibility, and smarter executive decision support.
          </p>
        </div>
        <div className="why-grid">
          {[
            "Corporate software thinking",
            "Service-business operating focus",
            "AI with human oversight",
            "Systems built for scale"
          ].map((item) => (
            <article className="premium-card" key={item}>
              <span>{item}</span>
              <p>
                A focused approach to intelligent automation, customer
                engagement, and business visibility.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section corporate-cta">
        <div className="contact-copy">
          <p className="eyebrow">Corporate CTA</p>
          <h2>Build the operating system your business should have had already.</h2>
          <p>
            Tell us what is slowing the business down. We will review your
            current process and recommend the right solution path.
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
              {contactEmail}
            </a>
            {contactPhone && contactPhoneHref ? (
              <a className="button secondary light" href={contactPhoneHref}>
                {contactPhone}
              </a>
            ) : null}
            <a className="button secondary light" href={eeosApplicationUrl}>
              Launch EEOS
            </a>
          </div>
        </div>
        <ContactForm />
      </section>

      <SiteFooter />
    </main>
  );
}
