/**
 * app/sitemap.ts — Next.js App Router dynamic sitemap
 *
 * Served at /sitemap.xml
 *
 * Includes:
 *   - Homepage and key static public pages
 *   - Regulatory/service hub pages (rbi, sebi, irdai, ifsca, fema, services)
 *   - All 46 CMS-managed public content pages (published only, from MongoDB)
 *   - Published regulatory update detail pages
 *   - Published blog article pages
 *   - Global Markets directory (/global)
 *   - Active-tier country pages only (/global/{slug} where indexable === true)
 *
 * Excludes (never included):
 *   - /admin/** — admin panel routes
 *   - /api/**  — API routes
 *   - /login, /signup — auth routes
 *   - /my-blogs — user-auth-required
 *   - Draft / pending / deleted CMS records
 *   - Non-managed CMS paths
 *   - Internal tooling routes (/proposal-template, /resources/content-rebuild-command, etc.)
 *   - Developing and planned country pages (noindex — thin content without verified local data)
 */

import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/siteUrl";
import { getPublishedBlogSummaries } from "@/lib/blog/repository";
import { listPublishedUpdates } from "@/lib/regulatory/repository";
import { connectDB } from "@/lib/db";
import PublicContentPage from "@/lib/models/PublicContentPage";
import { PUBLIC_CONTENT_MANAGED_PATHS } from "@/lib/publicContent/managedPaths";
import { getSitemapCountries } from "@/lib/globalMarkets/countries";

// ── CMS-managed page DB query ─────────────────────────────────────────────────

interface SitemapPageDoc {
  fullPath: string;
  updatedAt?: Date;
  publishedAt?: Date;
  createdAt?: Date;
}

async function getPublishedCmsPages(): Promise<SitemapPageDoc[]> {
  try {
    await connectDB();
    const docs = await PublicContentPage.find({
      fullPath: { $in: [...PUBLIC_CONTENT_MANAGED_PATHS] },
      status: "published",
    })
      .select("fullPath updatedAt publishedAt createdAt")
      .lean<SitemapPageDoc[]>();
    return docs;
  } catch {
    return [];
  }
}

function bestDate(doc: SitemapPageDoc): Date {
  const d = doc.updatedAt ?? doc.publishedAt ?? doc.createdAt;
  return d ? new Date(d) : new Date();
}

// ── Sitemap ───────────────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = getSiteUrl();

  const [cmsPages, regulatoryUpdates, blogs] = await Promise.all([
    getPublishedCmsPages(),
    listPublishedUpdates(),
    getPublishedBlogSummaries(),
  ]);

  // ── Homepage ─────────────────────────────────────────────────────────────
  const homePage: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // ── Key static hub and business pages ────────────────────────────────────
  const staticHubPages: MetadataRoute.Sitemap = [
    // Regulatory service hub pages
    { url: `${BASE}/rbi`,      changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/sebi`,     changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/irdai`,    changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/ifsca`,    changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/fema`,     changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: "weekly",  priority: 0.8 },
    // Resources
    { url: `${BASE}/resources/regulatory-updates`, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/resources`,                    changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/resources/faqs`,               changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resources/circular-explainers`,changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/resources/compliance-calendar`,changeFrequency: "weekly",  priority: 0.6 },
    // Business pages
    { url: `${BASE}/contact`,     changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/pricing`,     changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/get-started`, changeFrequency: "monthly", priority: 0.6 },
    // Blogs
    { url: `${BASE}/blogs`, changeFrequency: "daily", priority: 0.9 },
    // Global Markets directory (indexable — premium market intelligence hub)
    { url: `${BASE}/global`, changeFrequency: "weekly", priority: 0.7 },
    // 19-5 hub
    { url: `${BASE}/19-5`, changeFrequency: "weekly", priority: 0.6 },
    // Legal
    { url: `${BASE}/legal/privacy-policy`,   changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/legal/refund-policy`,    changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/legal/terms-conditions`, changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ── 46 CMS-managed public content pages ──────────────────────────────────
  const cmsPageEntries: MetadataRoute.Sitemap = cmsPages.map((doc) => ({
    url: `${BASE}${doc.fullPath}`,
    lastModified: bestDate(doc),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Published regulatory update detail pages ──────────────────────────────
  const regulatoryPages: MetadataRoute.Sitemap = regulatoryUpdates.map((u) => ({
    url: `${BASE}/resources/regulatory-updates/${u.slug}`,
    lastModified: u.publishedDate ? new Date(u.publishedDate) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Published blog articles ───────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt ?? blog.publishedAt ?? blog.createdAt),
    changeFrequency: "monthly" as const,
    priority: blog.featured ? 0.9 : 0.7,
  }));

  // ── Active-tier Global Market country pages ───────────────────────────────
  // Only countries where includeInSitemap === true (active tier only).
  // Developing and planned markets are noindex and excluded from sitemap
  // to prevent thin-content indexing.
  const activeCountryPages: MetadataRoute.Sitemap = getSitemapCountries()
    .filter(c => c.slug !== "india") // India is the homepage
    .map(c => ({
      url: `${BASE}/global/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    ...homePage,
    ...staticHubPages,
    ...cmsPageEntries,
    ...regulatoryPages,
    ...blogPages,
    ...activeCountryPages,
  ];
}
