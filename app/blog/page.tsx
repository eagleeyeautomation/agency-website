import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader, blogPosts } from "../site-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Eagle Eye Automation insights on AI receptionists, GoHighLevel, workflow automation, executive dashboards, and business intelligence."
};

export default function BlogPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Blog</p>
        <h1>Ideas for building sharper business systems.</h1>
        <p>
          Notes on AI, GoHighLevel, automation, executive dashboards, and the
          operating systems modern service businesses need.
        </p>
      </section>

      <section className="section portfolio-section">
        <div className="portfolio-detail-grid">
          {blogPosts.map((post) => (
            <article className="portfolio-detail-card" key={post.title}>
              <span>Insight</span>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
              <a className="button package-button" href={post.href}>
                Read more
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
