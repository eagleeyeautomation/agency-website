import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eagleeyeautomation.com/";
const canonicalSiteUrl = siteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(`${canonicalSiteUrl}/`),
  title: {
    default: "Eagle Eye Automation | Fortune 500 Power for Small Business",
    template: "%s | Eagle Eye Automation"
  },
  description:
    "Eagle Eye Automation builds EEOS, the AI Operating System that gives small businesses Fortune 500-level visibility, automation, secure operations, and executive intelligence.",
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
    icon: "/images/eea-group-icon-official.png",
    apple: "/images/eea-group-icon-official.png"
  },
  openGraph: {
    title: "Eagle Eye Automation | Fortune 500 Power for Small Business",
    description:
      "EEOS is the AI Operating System that helps small business owners lead with executive intelligence, automation, and connected business data.",
    url: `${canonicalSiteUrl}/`,
    siteName: "Eagle Eye Automation",
    images: [
      {
        url: "/images/eea-group-logo-official.png",
        width: 1536,
        height: 1024,
        alt: "Eagle Eye Automation Group official logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Eagle Eye Automation | Fortune 500 Power for Small Business",
    description:
      "AI software, intelligent automation, executive dashboards, decision support, and business health monitoring for growing service businesses.",
    images: ["/images/eea-group-logo-official.png"]
  }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eagle Eye Automation Group",
    url: canonicalSiteUrl,
    slogan: "See More. Manage Smarter. Grow Faster.",
    email: "eagle@eagleeyeautomation.com",
    telephone: "+1-571-462-2407",
    description:
      "Eagle Eye Automation gives small businesses the power of Fortune 500 companies through AI, automation, and executive intelligence.",
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
    url: "https://app.geteeos.com",
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
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a452da652b633f8610a7e14"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
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
