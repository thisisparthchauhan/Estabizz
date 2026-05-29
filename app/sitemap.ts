/**
 * app/sitemap.ts — Next.js App Router dynamic sitemap
 *
 * Served at /sitemap.xml
 * Includes:
 *   - Static public pages (home, blogs index, submit-blog)
 *   - All published blog article pages (dynamically fetched)
 *
 * Admin, API and non-public routes are deliberately excluded.
 *
 * TODO: When a real database is wired, extend this to include
 *       service pages, category pages, and author pages.
 */

import type { MetadataRoute } from "next";
import { getPublishedBlogSummaries } from "@/lib/blog/repository";

const BASE = "https://www.estabizz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getPublishedBlogSummaries();

  // ── Static public pages ──────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/submit-blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // ── Published blog articles ──────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt ?? blog.publishedAt ?? blog.createdAt),
    changeFrequency: "monthly" as const,
    // Featured articles get a slight priority boost
    priority: blog.featured ? 0.9 : 0.8,
  }));

  return [...staticPages, ...blogPages];
}
