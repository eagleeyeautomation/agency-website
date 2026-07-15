import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eagleeyeautomation.com/";
const canonicalSiteUrl = siteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(`${canonicalSiteUrl}/`),
  title: {
    default: "Eagle Eye Automation | AI Software and Automation for Service Businesses",
    template: "%s | Eagle Eye Automation"
  },
  description:
    "Eagle Eye Automation helps small service businesses access Fortune 500-level CRM, automation, AI-powered websites, customer engagement, and business intelligence.",
  keywords: [
    "Eagle Eye Automation",
    "EEOS",
    "Eagle Eye Operating System",
    "AI Operating System for Service Businesses",
    "GoHighLevel",
    "service business automation",
    "AI software"
  ],
  applicationName: "Eagle Eye Automation",
  authors: [{ name: "Eagle Eye Automation" }],
  category: "AI software",
  icons: {
    icon: "/images/eagle-eye-automation-icon.png",
    apple: "/images/eagle-eye-automation-icon.png"
  },
  openGraph: {
    title: "Eagle Eye Automation | AI Software and Automation for Service Businesses",
    description:
      "Eagle Eye Automation gives service businesses access to intelligent automation, advanced customer management, AI-powered websites, business intelligence, and operational tools traditionally available only to large enterprises.",
    url: `${canonicalSiteUrl}/`,
    siteName: "Eagle Eye Automation",
    images: [
      {
        url: "/images/eagle-eye-automation-logo.png",
        width: 1748,
        height: 899,
        alt: "Eagle Eye Automation logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Eagle Eye Automation | AI Software and Automation",
    description:
      "AI software, CRM automation, AI-powered websites, customer engagement, and business intelligence for growing service businesses.",
    images: ["/images/eagle-eye-automation-logo.png"]
  }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eagle Eye Automation",
    url: canonicalSiteUrl,
    slogan: "Building AI Today That Helps Businesses Succeed Tomorrow.",
    description:
      "Eagle Eye Automation helps small service businesses access Fortune 500-level CRM, automation, AI-powered websites, customer engagement, and business intelligence.",
    sameAs: [
      "https://www.linkedin.com/company/eagle-eye-automation",
      "https://www.instagram.com/eagleeyeautomation",
      "https://www.facebook.com/eagleeyeautomation"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eagle Eye Automation",
    url: canonicalSiteUrl,
    description:
      "AI software and automation for small and growing service businesses."
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EEOS — Eagle Eye Operating System",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://eeos-platform-production.up.railway.app/",
    description:
      "EEOS is the AI Operating System for Service Businesses. It connects lead generation, customer engagement, automation, operational visibility, business intelligence, and executive recommendations in one connected platform."
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-company="Eagle Eye Automation"
        data-product="EEOS"
        data-product-full-name="EEOS — Eagle Eye Operating System"
        data-ghl-ready="true"
      >
        {children}
        <script
          id="eagle-eye-automation-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </body>
    </html>
  );
}
