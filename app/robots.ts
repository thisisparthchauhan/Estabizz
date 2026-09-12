/**
 * app/robots.ts — Next.js App Router robots.txt
 *
 * Served at /robots.txt
 *
 * Rules:
 *   - Preview / staging deployments: disallow everything (see lib/seo/crawlPolicy)
 *   - All bots: crawl public pages, disallow admin panel and API routes
 *   - Sitemap pointer built from canonical site URL (NEXT_PUBLIC_SITE_URL or production default)
 */

import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/siteUrl";
import { isIndexableDeployment } from "@/lib/seo/crawlPolicy";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  // A preview/staging deployment must never be crawled: it serves the same
  // pages as production and emits production canonicals, so indexing it would
  // create a duplicate of the live site competing for the same URLs. Protection
  // being switched on today is not a control -- it is one toggle away.
  if (!isIndexableDeployment()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",  // Admin panel — never crawled
          "/api/",    // API endpoints — no public value for crawlers
          "/login",
          "/signup",
          "/my-blogs",
          "/proposal-template",
          "/resources/content-rebuild-command",
          "/resources/regulatory-update-email-template",
          "/resources/service-page-content-framework",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
