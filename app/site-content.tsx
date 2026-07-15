import {
  ArrowRight,
  Check,
  BarChart3,
  Bot,
  BrainCircuit,
  Globe2,
  MailCheck,
  MessageCircle,
  PhoneCall,
  Sparkles,
  Target,
  Workflow,
  Settings2
} from "lucide-react";
import Image from "next/image";

export const companyName = "Eagle Eye Automation";
export const companyMission =
  "We build AI software that helps service businesses grow.";
export const productName = "EEOS";
export const productFullName = "EEOS — Eagle Eye Operating System";
export const productTagline = "The AI Operating System for Service Businesses";
export const tagline = "Building AI Today That Helps Businesses Succeed Tomorrow.";
export const corporateHeadline = "Small Businesses Deserve Fortune 500-Level Technology";
export const corporateSupportingMessage =
  "Eagle Eye Automation gives service businesses access to intelligent automation, advanced customer management, AI-powered websites, business intelligence, and operational tools traditionally available only to large enterprises.";
export const eeosProductSiteUrl = "https://eeos-platform-production.up.railway.app/";
export const eagleEyeBrainUrl = `${eeosProductSiteUrl}talk-to-selling-brain`;
export const eeosDescription =
  "EEOS is the AI Operating System for Service Businesses. It brings lead generation, customer engagement, automation, operational visibility, business intelligence, and executive recommendations into one connected platform.";

export const outcomes = [
  "Enterprise technology built for growing businesses",
  "Connected CRM, websites, automation, and intelligence",
  "Operational clarity without enterprise-level complexity",
  "Practical AI systems for service-business growth"
];

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Automation", href: "/services#automation" },
  { label: "Websites", href: "/services#websites" },
  { label: "CRM", href: "/services#crm" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "EEOS", href: eeosProductSiteUrl }
];

export const footerNav = [
  ...primaryNav,
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQ", href: "/faq" },
  { label: "PRN Staffers Digital Transformation", href: "/success-stories/prn-staffers" },
  { label: "Blog", href: "/blog" }
];

export const companyStrengths = [
  "Service-business focus",
  "Connected automation systems",
  "Practical AI software",
  "Executive visibility"
];

export const companyValues = [
  {
    title: "Human-centered automation",
    text: "Automation should reduce repetitive work while keeping people in control of important customer and operational decisions."
  },
  {
    title: "Connected systems",
    text: "Websites, CRM, customer engagement, reporting, and executive visibility work better when they are designed as one ecosystem."
  },
  {
    title: "Practical intelligence",
    text: "AI should help teams see priorities, respond faster, and make better decisions without adding unnecessary complexity."
  },
  {
    title: "Scalable foundations",
    text: "Growing businesses deserve technology that can support better processes today and stronger operating discipline tomorrow."
  }
];

export const serviceGroups = [
  {
    id: "automation",
    title: "AI & Automation",
    icon: Sparkles,
    items: ["AI Receptionists", "AI Chatbots", "Workflow Automation"],
    text: "AI systems that handle first response, answer common questions, qualify leads, and trigger the next step."
  },
  {
    id: "crm",
    title: "CRM",
    icon: Workflow,
    items: ["GoHighLevel Setup", "Pipeline Design", "Lead Automation"],
    text: "GoHighLevel and CRM builds that organize leads, appointments, follow-up, and client movement."
  },
  {
    id: "websites",
    title: "Web",
    icon: Globe2,
    items: ["Business Websites", "Landing Pages", "Client Portals"],
    text: "Professional web experiences built to convert attention into action and support client workflows."
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: Target,
    items: [
      "Executive Dashboards",
      "KPI Reporting",
      "Custom Business Software"
    ],
    text: "Reporting and software tools that make performance, operations, and priorities easier to see."
  }
];

export const productPlatforms = [
  {
    title: productFullName,
    eyebrow: "Flagship platform",
    icon: BarChart3,
    text: "The executive AI layer for service businesses. EEOS helps owners understand leads, calls, missed opportunities, follow-ups, appointments, pipeline activity, and daily performance.",
    items: [
      "Executive AI dashboard",
      "GoHighLevel-ready data layer",
      "Missed opportunity intelligence",
      "Daily performance visibility"
    ],
    href: "/eeos"
  },
  {
    title: "AI Voice Receptionist",
    eyebrow: "24/7 call coverage",
    icon: PhoneCall,
    text: "AI call handling that answers, qualifies, captures details, and routes follow-up so opportunities are not missed when the team is busy.",
    items: ["Call answering", "Lead qualification", "Missed-call recovery"],
    href: "/solutions"
  },
  {
    title: "AI Chat Assistant",
    eyebrow: "Website conversion",
    icon: MessageCircle,
    text: "Website chat support that helps visitors ask questions, request help, and move into the right CRM workflow.",
    items: ["Website chat", "Lead capture", "CRM handoff"],
    href: "/solutions"
  },
  {
    title: "GoHighLevel CRM Implementation",
    eyebrow: "CRM foundation",
    icon: Workflow,
    text: "GoHighLevel setup, pipelines, workflows, calendars, automation, and reporting structure built around real business operations.",
    items: ["Pipelines", "Workflows", "Calendars", "Tasks"],
    href: "/solutions"
  },
  {
    title: "Workflow Automation",
    eyebrow: "Operational leverage",
    icon: Settings2,
    text: "Repeatable automations for intake, reminders, handoffs, missed calls, follow-up, internal alerts, and reporting routines.",
    items: ["Intake automation", "Follow-up workflows", "Team alerts"],
    href: "/solutions"
  },
  {
    title: "Business Intelligence",
    eyebrow: "Decision support",
    icon: BrainCircuit,
    text: "Executive summaries, KPI interpretation, state comparisons, trends, risk signals, and recommended actions from centralized business data.",
    items: ["KPI interpretation", "Trend analysis", "Executive recommendations"],
    href: "/products"
  },
  {
    title: "Executive Dashboards",
    eyebrow: "Leadership visibility",
    icon: Target,
    text: "Premium dashboard experiences that help owners and executives understand company health, activity, trends, and priorities quickly.",
    items: ["KPI dashboards", "State reporting", "Executive summaries"],
    href: "/products"
  },
  {
    title: "Website Development",
    eyebrow: "Digital presence",
    icon: Globe2,
    text: "Modern business websites and landing pages built to support trust, conversion, lead capture, AI chat, and CRM handoff.",
    items: ["Business websites", "Landing pages", "Lead capture"],
    href: "/solutions"
  }
];

export const eeosCapabilities = [
  "Lead generation",
  "CRM visibility",
  "Workflow automation",
  "Operational intelligence",
  "Executive recommendations",
  "Eagle Eye Brain",
  "Multi-location visibility"
];

export const portfolioProjects = [
  {
    title: "PRN Staffers Command Center",
    type: "Operations software",
    text: "A command center concept for staffing visibility, scheduling activity, team coordination, and executive oversight.",
    details: ["Staffing visibility", "Operational dashboards", "Team coordination"]
  },
  {
    title: "AI Voice Receptionist",
    type: "AI automation",
    text: "A front-office voice workflow designed to answer calls, qualify leads, capture details, and route follow-up.",
    details: ["Call handling", "Lead qualification", "Follow-up routing"]
  },
  {
    title: "Eagle Eye Automation Website",
    type: "Business website",
    text: "The public brand platform for presenting services, portfolio work, pricing, and consultation options.",
    details: ["Brand system", "Conversion structure", "Responsive pages"]
  },
  {
    title: "GoHighLevel Automation",
    type: "CRM workflow",
    text: "Pipeline automation for lead capture, follow-up, appointment reminders, and client journey management.",
    details: ["Pipeline design", "Lead automation", "Appointment reminders"]
  },
  {
    title: "Executive Dashboard",
    type: "Reporting",
    text: "A decision-ready dashboard model for KPIs, operational trends, and business performance reporting.",
    details: ["KPI reporting", "Executive visibility", "Trend monitoring"]
  }
];

export const prnStaffersCaseStudy = {
  title: "PRN Staffers Digital Transformation",
  subtitle:
    "PRN Staffers became the first major implementation of Eagle Eye Automation, combining a four-state operation, multi-state websites, AI communication tools, GoHighLevel automation, and an executive command center.",
  challenge:
    "PRN Staffers needed better visibility, faster lead response, AI call handling, multi-state website support, GoHighLevel automation, and a centralized executive dashboard.",
  solution: [
    "Four-state operation support",
    "Four live PRN Staffers websites",
    "AI Voice Receptionist",
    "AI Chat",
    "GoHighLevel CRM setup",
    "Pipelines and workflows",
    "Missed-call follow-up",
    "Intake automation",
    "Executive Command Center",
    "Multi-state reporting"
  ],
  results: [
    "Improved online presence across four states",
    "Better lead capture",
    "24/7 AI phone and chat support",
    "More consistent follow-up",
    "Centralized business visibility",
    "Stronger foundation for future growth"
  ],
  testimonials: [
    {
      quote:
        "Eagle Eye Automation helped us organize our digital systems and improve how we respond to opportunities.",
      role: "PRN Staffers team member"
    },
    {
      quote:
        "The AI tools help our team stay focused while making sure inquiries are not missed.",
      role: "PRN Staffers team member"
    },
    {
      quote:
        "The Command Center gives leadership a clearer view of what is happening across the business.",
      role: "PRN Staffers leadership"
    }
  ]
};

export const solutions = [
  {
    title: "Lead response systems",
    text: "Capture website, phone, chat, and CRM activity in one operational flow so new opportunities move quickly.",
    items: ["Speed-to-lead", "Missed-call follow-up", "Conversation routing"]
  },
  {
    title: "GoHighLevel operating systems",
    text: "Set up pipelines, calendars, tasks, tags, workflows, and reporting around how the business actually runs.",
    items: ["CRM architecture", "Pipeline visibility", "Workflow governance"]
  },
  {
    title: "Executive visibility",
    text: "Turn daily operational activity into the metrics, alerts, and summaries leadership needs to make decisions.",
    items: ["Command Center", "KPI reporting", "Business intelligence"]
  }
];

export const eeosSignals = [
  "Leads",
  "Calls",
  "Missed opportunities",
  "Follow-ups",
  "Appointments",
  "Pipeline activity",
  "Daily performance",
  "Owner alerts"
];

export const ghlReadinessAreas = [
  {
    title: "Forms",
    text: "Dedicated sections are prepared for GoHighLevel lead, demo, contact, and funnel forms."
  },
  {
    title: "Calendars",
    text: "Demo and consultation CTAs are structured so GHL calendars can replace temporary booking links."
  },
  {
    title: "Chat widget",
    text: "The layout leaves a clean global chat zone for a future GoHighLevel chat widget."
  },
  {
    title: "Tracking scripts",
    text: "The site is ready for future GHL tracking, funnel attribution, and automation code snippets."
  },
  {
    title: "Funnels",
    text: "EEOS, services, pricing, and contact pages can route visitors into GHL funnel steps."
  },
  {
    title: "Automation",
    text: "Contact intent, demo requests, service interests, and EEOS inquiries are labeled for future workflows."
  }
];

export const industries = [
  {
    title: "Home Care",
    text: "Intake, staffing, caregiver communication, client follow-up, and operational reporting."
  },
  {
    title: "Healthcare",
    text: "Patient-facing workflows, appointment communication, internal handoffs, and admin reduction."
  },
  {
    title: "Real Estate",
    text: "Lead routing, pipeline management, listing workflows, follow-up, and client communication."
  },
  {
    title: "Small Business",
    text: "Simple systems that replace scattered spreadsheets, missed messages, and manual admin."
  },
  {
    title: "Professional Services",
    text: "Client onboarding, proposals, delivery tracking, reporting, and repeatable service operations."
  }
];

export const blogPosts = [
  {
    title: "Why GoHighLevel needs an executive layer",
    text: "CRM data becomes more valuable when leadership can see health, risk, and next actions without digging through every pipeline.",
    href: "/blog"
  },
  {
    title: "How AI receptionists protect speed-to-lead",
    text: "A practical look at using AI voice and chat to capture more opportunities while keeping the human team focused.",
    href: "/blog"
  },
  {
    title: "The PRN Staffers implementation playbook",
    text: "Lessons from combining websites, AI communication, GoHighLevel workflows, and executive reporting into one operating system.",
    href: "/success-stories/prn-staffers"
  }
];

export const faqs = [
  {
    question: "What is EEOS?",
    answer:
      "EEOS — Eagle Eye Operating System is the flagship software platform from Eagle Eye Automation. It is the executive AI layer for service businesses that need clearer visibility across leads, calls, missed opportunities, follow-ups, appointments, pipeline activity, and daily performance."
  },
  {
    question: "Do you replace GoHighLevel?",
    answer:
      "No. EEOS is designed to sit on top of GoHighLevel and make CRM, communication, appointment, and pipeline data easier for owners to understand and act on."
  },
  {
    question: "Can you build the CRM setup too?",
    answer:
      "Yes. Eagle Eye Automation can help with GoHighLevel setup, pipelines, workflows, calendars, missed-call follow-up, intake automation, and reporting structure."
  },
  {
    question: "Do you offer AI phone and chat tools?",
    answer:
      "Yes. The site highlights AI Voice Receptionist and AI Chat Assistant services for businesses that need faster response and better lead capture."
  },
  {
    question: "Is PRN Staffers a real implementation?",
    answer:
      "Yes. PRN Staffers is presented as the flagship implementation using factual project elements: multi-state websites, AI voice and chat support, GoHighLevel automation, intake workflows, and an executive command center."
  }
];

export const pricingPackages = [
  {
    title: "Starter",
    price: "Starting at $1,500",
    text: "A focused launch package for businesses that need a stronger digital foundation.",
    items: ["Website development", "CRM foundation", "AI Chat setup"],
    cta: "Request a Demo"
  },
  {
    title: "Growth",
    price: "Starting at $3,500",
    text: "A practical automation package for teams ready to speed up response and reporting.",
    items: ["AI Voice Receptionist", "Workflow automation", "Executive dashboards"],
    cta: "Request a Demo",
    featured: true
  },
  {
    title: "Enterprise",
    price: "Request a Quote",
    text: "A custom build path for advanced operations, integrations, and leadership visibility.",
    items: ["EEOS implementation", "GoHighLevel implementation", "Business intelligence"],
    cta: "Request a Quote"
  }
];

export const contactOptions = [
  "Request a Demo",
  "GoHighLevel-ready Contact Form",
  "GoHighLevel Calendar Slot",
  "Business Hours: Monday-Friday, 9 AM-5 PM ET",
  "AI Support: 24/7"
];

export const businessHours = [
  { label: "Business Hours", value: "Monday-Friday, 9 AM-5 PM ET" },
  { label: "AI Phone & Chat Support", value: "Available 24/7" },
  { label: "Demo Requests", value: "Reviewed during business hours" }
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/eagle-eye-automation",
    mark: "in"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/eagleeyeautomation",
    mark: "ig"
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/eagleeyeautomation",
    mark: "fb"
  }
];

export function getContactDetails() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@eagleeyeautomation.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const contactPhoneHref = contactPhone
    ? `tel:${contactPhone.replace(/\D/g, "")}`
    : undefined;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eagleeyeautomation.com/";
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  const bookingHref =
    bookingUrl && bookingUrl.length > 0
      ? bookingUrl
      : `mailto:${contactEmail}?subject=Discovery%20call%20request`;

  return {
    bookingHref,
    contactEmail,
    contactPhone,
    contactPhoneHref,
    formAction: `mailto:${contactEmail}`,
    siteUrl
  };
}

export function LogoMark() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <Image
        src="/images/eagle-eye-automation-logo.png"
        alt=""
        width={448}
        height={256}
        priority
      />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand" href="/" aria-label="Eagle Eye Automation home">
        <LogoMark />
      </a>
      <nav aria-label="Primary">
        <div className="nav-links">
          {primaryNav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="/contact">
          Request a Demo
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { contactEmail, contactPhone, contactPhoneHref, siteUrl } =
    getContactDetails();

  return (
    <footer>
      <div className="brand footer-brand">
        <LogoMark />
      </div>
      <div className="footer-contact" aria-label="Contact information">
        <a className="footer-note" href={`mailto:${contactEmail}`}>
          <MailCheck size={16} aria-hidden="true" />
          <span>{contactEmail}</span>
        </a>
        {contactPhone && contactPhoneHref ? (
          <a className="footer-note" href={contactPhoneHref}>
            <PhoneCall size={16} aria-hidden="true" />
            <span>{contactPhone}</span>
          </a>
        ) : null}
        <a className="footer-note" href={siteUrl}>
          <Globe2 size={16} aria-hidden="true" />
          <span>www.eagleeyeautomation.com</span>
        </a>
        <span className="footer-note">
          <Sparkles size={16} aria-hidden="true" />
          <span>AI support available 24/7</span>
        </span>
      </div>
      <div className="social-links" aria-label="Social media links">
        {socialLinks.map(({ href, label, mark }) => (
          <a key={label} href={href} aria-label={label}>
            <span aria-hidden="true">{mark}</span>
          </a>
        ))}
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        {footerNav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}

export function GhlEmbedSlot({
  label,
  kind,
  detail
}: {
  label: string;
  kind: "form" | "calendar" | "chat" | "tracking" | "funnel" | "automation";
  detail: string;
}) {
  return (
    <div
      className="ghl-embed-slot"
      data-ghl-ready="true"
      data-ghl-embed-kind={kind}
      data-ghl-company={companyName}
      data-ghl-product={productName}
    >
      <span>{label}</span>
      <strong>{kind}</strong>
      <p>{detail}</p>
    </div>
  );
}

export function ContactForm() {
  const { formAction } = getContactDetails();

  return (
    <form
      className="contact-form"
      action={formAction}
      method="post"
      data-ghl-ready="true"
      data-ghl-form-purpose="demo-request"
      data-ghl-product={productName}
      data-ghl-company={companyName}
    >
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        What do you need help with?
        <select name="service" defaultValue={productFullName}>
          <option>{productFullName}</option>
          <option>AI & Automation</option>
          <option>CRM</option>
          <option>Web</option>
          <option>Dashboards</option>
          <option>Request a Demo</option>
          <option>Custom Business Software</option>
        </select>
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={5}
          placeholder="Share the workflow, system, or bottleneck you want to improve."
          required
        />
      </label>
      <button className="button primary" type="submit">
        Request a Demo
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
