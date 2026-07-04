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

export const tagline = "Sharper systems. Faster growth.";

export const outcomes = [
  "AI-powered front office coverage",
  "CRM pipelines that match real operations",
  "Custom dashboards for faster decisions",
  "Software built around the business"
];

export const primaryNav = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQ", href: "/faq" }
];

export const footerNav = [
  { label: "Home", href: "/" },
  ...primaryNav,
  { label: "PRN Staffers Case Study", href: "/success-stories/prn-staffers" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const founderExperience = [
  "Home care expertise",
  "Real estate experience",
  "AI automation",
  "Business consulting"
];

export const serviceGroups = [
  {
    title: "AI & Automation",
    icon: Sparkles,
    items: ["AI Receptionists", "AI Chatbots", "Workflow Automation"],
    text: "AI systems that handle first response, answer common questions, qualify leads, and trigger the next step."
  },
  {
    title: "CRM",
    icon: Workflow,
    items: ["GoHighLevel Setup", "Pipeline Design", "Lead Automation"],
    text: "GoHighLevel and CRM builds that organize leads, appointments, follow-up, and client movement."
  },
  {
    title: "Web",
    icon: Globe2,
    items: ["Business Websites", "Landing Pages", "Client Portals"],
    text: "Professional web experiences built to convert attention into action and support client workflows."
  },
  {
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
    title: "Eagle Eye Command Center",
    eyebrow: "Flagship platform",
    icon: BarChart3,
    text: "A CEO-ready operating system for GoHighLevel that turns live CRM, pipeline, appointment, conversation, task, and AI activity into executive visibility.",
    items: [
      "Executive dashboards",
      "Business intelligence",
      "GoHighLevel data layer",
      "Leadership alerts"
    ],
    href: "/products"
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
  }
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
    "PRN Staffers became the first major implementation of Eagle Eye Automation, combining multi-state websites, AI communication tools, GoHighLevel automation, and an executive command center.",
  challenge:
    "PRN Staffers needed better visibility, faster lead response, AI call handling, multi-state website support, GoHighLevel automation, and a centralized executive dashboard.",
  solution: [
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
    question: "What is Eagle Eye Command Center?",
    answer:
      "Eagle Eye Command Center is the flagship software platform from Eagle Eye Automation. Version 1 focuses on turning GoHighLevel activity into executive dashboards, alerts, insights, and business intelligence."
  },
  {
    question: "Do you replace GoHighLevel?",
    answer:
      "No. Eagle Eye Command Center is designed to sit on top of GoHighLevel and make its data easier for executives to understand and act on."
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
    text: "A focused launch package for businesses that need a stronger digital foundation.",
    items: ["Website", "CRM", "AI Chat"]
  },
  {
    title: "Growth",
    text: "A practical automation package for teams ready to speed up response and reporting.",
    items: ["AI Voice", "Automations", "Dashboards"],
    featured: true
  },
  {
    title: "Enterprise",
    text: "A custom build path for advanced operations, integrations, and leadership visibility.",
    items: ["Custom Software", "Integrations", "Executive Reporting"]
  }
];

export const contactOptions = [
  "Discovery Call",
  "Contact Form",
  "Calendly or GoHighLevel Calendar",
  "Phone",
  "Email"
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
          Discovery call
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

export function ContactForm() {
  const { formAction } = getContactDetails();

  return (
    <form className="contact-form" action={formAction} method="post">
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
        <select name="service" defaultValue="AI & Automation">
          <option>AI & Automation</option>
          <option>CRM</option>
          <option>Web</option>
          <option>Dashboards</option>
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
        Send inquiry
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
