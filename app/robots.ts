/**
 * app/robots.ts — Next.js App Router robots.txt
 *
 * Served at /robots.txt
 *
 * Rules:
 *   - All bots: crawl public pages, disallow admin panel and API routes
 *   - Sitemap pointer built from canonical site URL (NEXT_PUBLIC_SITE_URL or production default)
 */

import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
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
