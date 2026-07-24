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
    "Eagle Eye Automation gives small businesses the power of Fortune 500 companies through AI, automation, executive intelligence, business health monitoring, and secure operations.",
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
      "Eagle Eye Automation gives small businesses the power of Fortune 500 companies through AI, automation, executive intelligence, business health monitoring, and secure operations.",
    url: `${canonicalSiteUrl}/`,
    siteName: "Eagle Eye Automation",
    images: [
      {
        url: "/images/eeos-logo-official.png",
        width: 1792,
        height: 1024,
        alt: "EEOS Eagle Eye Operating System logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Eagle Eye Automation | AI Software and Automation",
    description:
      "AI software, intelligent automation, executive dashboards, decision support, and business health monitoring for growing service businesses.",
    images: ["/images/eeos-logo-official.png"]
  }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eagle Eye Automation",
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
    url: "https://app.geteeos.com/login",
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
