/**
 * app/sitemap.ts — Next.js App Router dynamic sitemap
 *
 * Served at /sitemap.xml
 *
 * Includes:
 *   - Homepage and key static public pages
 *   - Regulatory/service hub pages (rbi, sebi, irdai, ifsca, fema, services)
 *   - MCA/ROC, FIU-IND/AML and Government Licences hub + dynamic-slug pages
 *     (app/{mca-roc,fiu-ind-aml,gov-lic}/[slug] — added Phase 7B; these three
 *     hubs had zero sitemap coverage despite being live, indexable and linked
 *     from the Regulatory mega-menu)
 *   - Static (non-CMS) regulator pages never migrated into
 *     PUBLIC_CONTENT_MANAGED_PATHS (added Phase 7B — see that list's own
 *     comment; these predate it and were never backfilled)
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
 *   - /19-5 and its children (Phase 7B) — next.config.js permanently redirects
 *     the entire prefix to /mca-roc, so listing it would only add a crawl hop
 *     to a URL already listed under its real name
 *   - The 17 one-line legacy-alias redirect pages under /sebi, /ifsca and
 *     /regulatory (Phase 7B) — same reasoning, one per alias
 */

import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/siteUrl";
import { listPublicJobs, type PublicJobListing } from "@/lib/jobs/jobManagement/repository";
import { SOLUTION_CATEGORIES, allServicePages } from "@/lib/content/services/registry";
import { getPublishedBlogSummaries } from "@/lib/blog/repository";
import { listPublishedUpdates } from "@/lib/regulatory/repository";
import { connectDB } from "@/lib/db";
import PublicContentPage from "@/lib/models/PublicContentPage";
import { PUBLIC_CONTENT_MANAGED_PATHS } from "@/lib/publicContent/managedPaths";
import { getSitemapCountries } from "@/lib/globalMarkets/countries";
import { getAllLandingSlugs } from "@/lib/landing";
import { getAllFiuIndSlugs } from "@/lib/fiu-ind-aml";
import { getAllGovLicSlugs } from "@/lib/gov-lic";

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

/**
 * Published job listings for the sitemap.
 *
 * Fail-soft on purpose: jobs live in PostgreSQL while the rest of the sitemap
 * comes from MongoDB, and a Jobs database hiccup must not take down the whole
 * sitemap for the marketing site.
 */
async function getPublishedJobs(): Promise<PublicJobListing[]> {
  try {
    return await listPublicJobs();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = getSiteUrl();

  const [cmsPages, regulatoryUpdates, blogs, jobs] = await Promise.all([
    getPublishedCmsPages(),
    listPublishedUpdates(),
    getPublishedBlogSummaries(),
    getPublishedJobs(),
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
    { url: `${BASE}/regulatory`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/regulatory/insurance`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/regulatory/compliance`, changeFrequency: "weekly", priority: 0.8 },
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
    // NOTE: /19-5 is deliberately absent. It is a legacy URL prefix that
    // next.config.js permanently (308) redirects to /mca-roc -- verified live
    // on 2026-09-12. Listing a redirecting URL in the sitemap only sends
    // crawlers through an extra hop to the canonical page already listed
    // below; the /mca-roc/[slug] source files under app/19-5/ are unreachable
    // dead code (see docs/30-WHOLE-SITE-NAVIGATION-AUDIT.md §16).
    // Legal
    { url: `${BASE}/legal/privacy-policy`,   changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/legal/refund-policy`,    changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/legal/terms-conditions`, changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ── MCA/ROC corporate-service pages (the /19-5 redirect's real destination) ─
  // Rendered by the shared lib/landing registry; the hub + all of its
  // generateStaticParams() slugs are indexable and link-reachable from the
  // Regulatory mega-menu, so they belong in the sitemap under their own
  // canonical URL.
  const mcaRocPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/mca-roc`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...getAllLandingSlugs().map((slug) => ({
      url: `${BASE}/mca-roc/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // ── FIU-IND/AML and Government Licences hub pages ────────────────────────
  // Same dynamic-slug pattern as MCA/ROC (app/fiu-ind-aml/[slug],
  // app/gov-lic/[slug]); previously absent from the sitemap entirely.
  const fiuIndAmlPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/fiu-ind-aml`, changeFrequency: "weekly" as const, priority: 0.7 },
    ...getAllFiuIndSlugs().map((slug) => ({
      url: `${BASE}/fiu-ind-aml/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
  const govLicPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/gov-lic`, changeFrequency: "weekly" as const, priority: 0.7 },
    ...getAllGovLicSlugs().map((slug) => ({
      url: `${BASE}/gov-lic/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // ── Static regulator service pages never migrated to the CMS ─────────────
  // Real, live, `index:true` pages under app/rbi|sebi|irdai|ifsca -- linked
  // from the Regulatory mega-menu and/or global search -- that predate
  // PUBLIC_CONTENT_MANAGED_PATHS and were never added to it, so the CMS-page
  // sitemap query above never picks them up. Confirmed each is not noindex
  // before listing (see docs/31-SITE-LINK-INVENTORY.md). Excludes the 17
  // one-line legacy-alias redirect pages (app/sebi/stock-broker-registration
  // etc.), which correctly stay out of the sitemap since they 308 elsewhere.
  const unmigratedStaticRegulatorPages: MetadataRoute.Sitemap = [
    "/rbi/nbfc-business-plan",
    "/sebi/aif-compliance-test-report",
    "/sebi/alternative-asset-portfolio-valuation",
    "/sebi/collective-investment-schemes",
    "/sebi/rta-registration-in-india",
    "/sebi/social-stock-exchange-license-india",
    "/sebi/underwriter-registration",
    "/irdai/ifsca-insurance-intermediary",
    "/irdai/insurance-marketing-firm-license",
    "/irdai/insurance-marketing-firm-registration-in-india",
    "/irdai/insurance-repository-registration",
    "/irdai/irda-insurance-broker-license",
    "/irdai/irdai-regulatory-sandbox",
    "/irdai/isnp-registration",
    "/ifsca/batf-services-registration-in-gift-ifsc",
    "/ifsca/finance-company-in-gift-ifsc",
    "/ifsca/ifsca-fintech-startup-incentives",
    "/ifsca/itfs-registration-in-gift-ifsc",
    "/ifsca/techfin",
    // Insurance guides under /regulatory/insurance (added 2026-09-18) -- new
    // static pages, not CMS-managed, so the CMS query above never sees them.
    "/regulatory/insurance/insurance-marketing-firm-license-in-india",
    "/regulatory/insurance/insurance-repository-registration-in-india",
    "/regulatory/insurance/tpa-license-india",
    "/regulatory/insurance/isnp-certification-in-india",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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

  // ── Public jobs board ─────────────────────────────────────────────────────
  // The hub plus each open, public listing, plus the two Phase 7A entry points
  // (Join Estabizz, Hire Talent) -- both public and indexable. Candidate
  // account pages are deliberately absent: they are noindex and behind
  // authentication.
  const jobPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/jobs`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/jobs/join`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/jobs/hire-talent`, changeFrequency: "monthly" as const, priority: 0.6 },
    ...jobs.map((job) => ({
      url: `${BASE}/jobs/${job.slug}`,
      lastModified: job.published_at ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // ── Solutions practice areas ──────────────────────────────────────────────
  // The hub, each category index, and each long-form service page. Built from
  // the same registry the routes and the navbar read, so a new service page
  // cannot be published and then quietly left out of the sitemap.
  const solutionPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/solutions`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...SOLUTION_CATEGORIES.map((category) => ({
      url: `${BASE}/solutions/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...allServicePages().map(({ category, page }) => ({
      url: `${BASE}/solutions/${category}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    ...homePage,
    ...staticHubPages,
    ...solutionPages,
    ...mcaRocPages,
    ...fiuIndAmlPages,
    ...govLicPages,
    ...unmigratedStaticRegulatorPages,
    ...cmsPageEntries,
    ...regulatoryPages,
    ...blogPages,
    ...activeCountryPages,
    ...jobPages,
  ];
}
