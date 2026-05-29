/**
 * app/robots.ts — Next.js App Router robots.txt
 *
 * Served at /robots.txt
 *
 * Rules:
 *   - All bots: crawl public pages, disallow admin panel and API routes
 *   - Sitemap pointer for crawl discovery
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",   // Admin panel — never crawled
          "/api/",     // API endpoints — no public value for crawlers
        ],
      },
    ],
    sitemap: "https://www.estabizz.com/sitemap.xml",
    host: "https://www.estabizz.com",
  };
}
