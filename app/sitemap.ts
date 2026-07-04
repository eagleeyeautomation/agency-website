import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eagleeyeautomation.com/";
const canonicalSiteUrl = siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.95 },
    { path: "/solutions", priority: 0.92 },
    { path: "/industries", priority: 0.82 },
    { path: "/pricing", priority: 0.9 },
    { path: "/success-stories", priority: 0.9 },
    { path: "/success-stories/prn-staffers", priority: 0.95 },
    { path: "/blog", priority: 0.72 },
    { path: "/faq", priority: 0.78 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/contact", priority: 0.9 }
  ];

  return routes.map(({ path, priority }) => ({
    url: `${canonicalSiteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority
  }));
}
