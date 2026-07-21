# Estabizz Admin OS — SEO & Sitemap Deployment Checklist

> Created: Phase 6A (2026-07-02 IST) · Do not include credentials in this file.
> No push or deployment was performed in Phase 6A. This is a readiness document only.

---

## 1. Purpose

This document records the SEO readiness strategy, sitemap behaviour, robots configuration, and canonical URL approach for the Estabizz website. It is the authoritative pre-deployment SEO checklist for Phase 6A+.

---

## 2. Current Phase / Status

- **Phase 6A** — Sitemap / Robots / Deployment SEO Readiness
- **Local only** — not pushed to GitHub, not deployed to Vercel
- Public Content CMS: **46 managed pages** (Phase 4R baseline)
- Production readiness: **Phase 5C approved** — see `ADMIN_OS_PRODUCTION_READINESS.md`

---

## 3. Sitemap Behaviour

**Implementation:** `app/sitemap.ts` (Next.js App Router dynamic sitemap)
**Served at:** `/sitemap.xml`
**Generated:** At build time (static prerender) — regenerated with each Vercel deployment

### Sitemap structure (69 URLs in Phase 6A baseline)

| Group | Count | Source |
|---|---|---|
| Homepage | 1 | Hardcoded |
| Static hub / business pages | 19 | Hardcoded list |
| CMS-managed public content pages | 46 | MongoDB `public_content_pages` (published only) |
| Published regulatory update detail pages | Varies | MongoDB `regulatory_updates` (published only, up to 200) |
| Published blog articles | Varies | MongoDB `blogs` (published only) |

**Total at Phase 6A baseline:** 69 URLs (46 CMS + 3 regulatory + 0 blogs in dev DB + 1 homepage + 19 hub pages)

### Static hub pages included

```
/ (homepage, priority 1.0)
/rbi, /sebi, /irdai, /ifsca, /fema, /services  (hub, priority 0.8)
/resources/regulatory-updates                  (listing, priority 0.8)
/blogs                                         (listing, priority 0.9)
/resources, /resources/faqs,
/resources/circular-explainers,
/resources/compliance-calendar                 (priority 0.6–0.7)
/contact, /pricing, /get-started              (priority 0.6–0.7)
/19-5                                          (hub, priority 0.6)
/legal/privacy-policy,
/legal/refund-policy,
/legal/terms-conditions                        (priority 0.3)
```

### CMS-managed page entries

Each of the 46 managed public content pages is included with:
- `url` = `${SITE_URL}${fullPath}` (absolute URL)
- `lastModified` = `updatedAt` → `publishedAt` → `createdAt` (best available date)
- `changeFrequency` = `weekly`
- `priority` = `0.8`

Fetched via: `PublicContentPage.find({ fullPath: { $in: PUBLIC_CONTENT_MANAGED_PATHS }, status: 'published' })`

---

## 4. Robots Behaviour

**Implementation:** `app/robots.ts` (Next.js App Router)
**Served at:** `/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /login
Disallow: /signup
Disallow: /my-blogs
Disallow: /proposal-template
Disallow: /resources/content-rebuild-command
Disallow: /resources/regulatory-update-email-template
Disallow: /resources/service-page-content-framework
Sitemap: https://www.estabizz.com/sitemap.xml
Host: https://www.estabizz.com
```

Admin panel (`/admin/**`) and all API routes (`/api/**`) are permanently blocked from all crawlers.

---

## 5. Canonical URL Strategy

### Site URL source

**Helper:** `lib/seo/siteUrl.ts` → `getSiteUrl()`

Priority order:
1. `NEXT_PUBLIC_SITE_URL` env var (allows staging/preview override without code change)
2. Fallback: `https://www.estabizz.com` (production default, already used throughout project)

The fallback matches the existing `metadataBase` in `app/layout.tsx`, the `BASE` constant in `app/blogs/[slug]/page.tsx`, and the pre-existing `sitemap.ts` / `robots.ts` hardcoded URLs — so the convention is consistent.

### How canonical URLs are resolved

| Page type | Canonical source |
|---|---|
| Homepage | `metadataBase` in `app/layout.tsx` |
| CMS-managed page (published) | DB `canonicalUrl` field if set, else `${SITE_URL}${fullPath}` |
| CMS-managed page (fallback) | `FULL_PATH` constant in each `page.tsx` → `alternates.canonical` |
| CMS-managed page (blocked) | `robots: { index: false, follow: false }` — not indexed |
| Admin pages | `robots: { index: false, follow: false }` — not indexed |
| Blog articles | `metadataBase` + `/blogs/${slug}` |
| Regulatory updates | `metadataBase` + `/resources/regulatory-updates/${slug}` |
| Static public pages | `metadataBase` + page path |

### Pending changes and canonical safety

- Pending `seoTitle`, `seoDescription`, `canonicalUrl` are stored in `pendingRevision` only
- Public rendering query explicitly excludes `pendingRevision`: `.select('-pendingRevision ...')`
- Pending canonical URLs **never appear in public metadata** until approved by a `publish_content` reviewer

---

## 6. Required Environment Variable Names

> Variable names only — no values.

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Override canonical site URL for staging/preview environments | Optional (falls back to `https://www.estabizz.com`) |

All other env vars required for production are documented in `ADMIN_OS_PRODUCTION_READINESS.md` §5.

---

## 7. Included URL Groups

The sitemap includes:
- [x] Homepage (`/`)
- [x] Regulatory/service hub pages (`/rbi`, `/sebi`, `/irdai`, `/ifsca`, `/fema`, `/services`)
- [x] Resources hub and sub-pages (`/resources`, `/resources/regulatory-updates`, `/resources/faqs`, etc.)
- [x] Business pages (`/contact`, `/pricing`, `/get-started`)
- [x] 19-5 hub (`/19-5`)
- [x] Legal pages (`/legal/privacy-policy`, `/legal/refund-policy`, `/legal/terms-conditions`)
- [x] Blogs listing (`/blogs`)
- [x] All 46 CMS-managed published public content pages
- [x] Published regulatory update detail pages (`/resources/regulatory-updates/[slug]`)
- [x] Published blog articles (`/blogs/[slug]`)

---

## 8. Excluded URL Groups

The sitemap never includes:
- [x] `/admin/**` — admin panel routes
- [x] `/api/**` — API endpoints
- [x] `/login`, `/signup` — auth routes
- [x] `/my-blogs` — user-auth-required
- [x] `/proposal-template` — internal tool
- [x] `/resources/content-rebuild-command` — internal tool
- [x] `/resources/regulatory-update-email-template` — internal template
- [x] `/resources/service-page-content-framework` — internal tool
- [x] Draft, pending, or deleted CMS records
- [x] Non-managed CMS paths (not in `PUBLIC_CONTENT_MANAGED_PATHS`)
- [x] `pendingRevision` fields
- [x] Localhost or internal URLs

---

## 9. CMS-Managed Page Rules

| Rule | Implementation |
|---|---|
| Only published pages in sitemap | `status: 'published'` filter in DB query |
| Only managed paths in sitemap | `fullPath: { $in: PUBLIC_CONTENT_MANAGED_PATHS }` |
| Deleted pages excluded | `status: 'deleted'` records are excluded by `status: 'published'` filter |
| Pending-only records excluded | Draft/pending records have non-published status |
| Pending changes don't affect sitemap | `lastModified` reads `updatedAt`, not `pendingRevision` |
| Absolute URLs | `${getSiteUrl()}${fullPath}` |
| lastModified from DB | `updatedAt → publishedAt → createdAt` fallback chain |

---

## 10. Deleted / Pending Page Exclusion

| Scenario | Sitemap | Public route | Notes |
|---|---|---|---|
| Published record | Included | Renders from DB | Normal state |
| Draft record | Excluded | `notFound()` | Not in sitemap, not publicly indexed |
| Pending approval record | Excluded | `notFound()` | Not in sitemap, not publicly indexed |
| Deleted record (Recycle Bin) | Excluded | `notFound()` | Tombstone in DB, route returns 404 |
| No DB record (fallback) | Not in sitemap | Renders from hardcoded `<PageClient />` | Unmanaged pages — still crawlable if they have hardcoded content |
| Pending SEO changes | Not reflected | Pending canonical/title not applied | Pending SEO in `pendingRevision`, excluded from rendering query |

---

## 11. Admin / API / Private Route Exclusion

| Route class | Sitemap | robots.txt | Layout meta |
|---|---|---|---|
| `/admin/**` | Never included | `Disallow: /admin/` | `robots: { index: false, follow: false }` |
| `/api/**` | Never included | `Disallow: /api/` | N/A |
| `/login`, `/signup` | Never included | `Disallow: /login`, `/signup` | — |
| `/my-blogs` | Never included | `Disallow: /my-blogs` | — |
| Internal tool routes | Never included | Disallowed explicitly | — |

---

## 12. Pre-Deployment SEO Checklist

Complete all items before production deployment:

- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel to `https://www.estabizz.com` (or omit to use default)
- [ ] Run `npm run build` locally — confirm `/sitemap.xml` compiles as `○ (Static)`
- [ ] Verify sitemap URL count: at least 46 CMS-managed pages + hub pages + blogs + regulatory
- [ ] Confirm no `localhost` in sitemap URLs after build
- [ ] Confirm no `/admin` or `/api` in sitemap URLs
- [ ] Confirm `robots.txt` disallows `/admin/` and `/api/`
- [ ] Confirm `robots.txt` sitemap pointer uses production URL
- [ ] Confirm admin layout has `robots: { index: false, follow: false }`
- [ ] Confirm CMS-managed blocked/deleted pages return 404 (not indexed)
- [ ] Confirm `metadataBase` in `app/layout.tsx` matches production domain
- [ ] Confirm `getSiteUrl()` returns production domain (not localhost) in production build
- [ ] All 46 CMS-managed pages have `export const dynamic = 'force-dynamic'`
- [ ] All 46 CMS-managed pages have correct `FALLBACK_METADATA` canonical paths
- [ ] No internal/admin paths in any public page `<link rel="canonical">`

---

## 13. Post-Deployment SEO Smoke Test

Run these checks within 60 minutes of any production deployment:

| # | Check | Expected |
|---|---|---|
| 1 | `GET https://www.estabizz.com/sitemap.xml` | 200 OK, XML with 60+ URLs |
| 2 | Sitemap contains `/rbi/nbfc-registration-in-india` | Yes — absolute URL |
| 3 | Sitemap contains `/sebi/aif-registration-in-india` | Yes |
| 4 | Sitemap contains `/services/enterprise-services` | Yes |
| 5 | Sitemap contains `/resources/regulatory-updates` | Yes |
| 6 | Sitemap does NOT contain `/admin` | Confirmed absent |
| 7 | Sitemap does NOT contain `/api` | Confirmed absent |
| 8 | Sitemap does NOT contain `localhost` | Confirmed absent |
| 9 | `GET https://www.estabizz.com/robots.txt` | 200, `Disallow: /admin/` present |
| 10 | robots.txt sitemap line | `Sitemap: https://www.estabizz.com/sitemap.xml` |
| 11 | `GET https://www.estabizz.com/rbi/nbfc-registration-in-india` | 200, `<link rel="canonical">` = production URL |
| 12 | Admin URL: `https://www.estabizz.com/admin` (no cookie) | Redirect to `/login` |
| 13 | Check page source for any `localhost` in canonical/OG tags | None |

---

## 14. Google Search Console Submission Steps

After the production domain is attached and first deployment is live:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.estabizz.com`
3. Verify ownership via HTML tag (add to `app/layout.tsx` `metadata.verification.google`) or DNS TXT record
4. Navigate to **Sitemaps** section
5. Submit: `https://www.estabizz.com/sitemap.xml`
6. Monitor indexing coverage — expect ~60–70 pages initially, growing as crawl completes
7. After first crawl, check **Coverage** tab for any errors on the 46 CMS-managed pages

---

## 15. Known Limitations

1. **Sitemap generated at build time** — The sitemap is prerendered (static) at each deployment, not live per-request. If new CMS pages are added or published between deployments, they won't appear in the sitemap until the next deployment. This is acceptable for the current deployment cadence (deploy to publish CMS changes). Mark `export const dynamic = 'force-dynamic'` in `app/sitemap.ts` if live sitemap refresh is needed.

2. **Non-managed static pages not in sitemap** — Many static pages (e.g. `/ifsca/aircraft-leasing`, `/sebi/rta-registration-in-india`) are hardcoded and discoverable via link traversal but not individually listed in `sitemap.ts`. These will be crawled through link discovery from hub pages. Adding them all would require a large hardcoded list; Phase 6B can address this if needed.

3. **Blog article count depends on published blogs in DB** — If no blogs are published, the blog section of the sitemap is empty (0 entries). The code is correct; the count reflects live data.

4. **Regulatory update count varies** — Capped at 200 by `listPublishedUpdates()`. If more than 200 regulatory updates are published, only the 200 most recent appear. Phase 6B can add pagination if needed.

5. **No sitemap index** — A single `sitemap.xml` is generated for all pages. If the total URL count exceeds 50,000, a sitemap index would be required. Current count (~69) is well within limits.

6. **`NEXT_PUBLIC_SITE_URL` not required** — The fallback `https://www.estabizz.com` is correct for production. The env var exists to support staging environments but does not need to be set in Vercel production unless the domain changes.

---

## 16. Phase 6B Recommendations

1. **Add static non-managed pages to sitemap** — enumerate hardcoded static service/regulatory pages (e.g. all IFSCA, SEBI, IRDAI sub-pages) in the sitemap for better crawl coverage.

2. **Live sitemap refresh** — add `export const dynamic = 'force-dynamic'` to `app/sitemap.ts` if CMS content is updated frequently between deployments and fresh sitemap data is needed on each request.

3. **Google Search Console verification** — add verification tag to `app/layout.tsx` `metadata.verification.google` once the domain is attached.

4. **OG image strategy** — ensure all 46 CMS-managed pages have a production-safe OG image URL set via the CMS editor before launch.

5. **Canonical URL audit per managed page** — verify that the `canonicalUrl` DB field for all 46 pages is either empty (falls back to `fullPath`) or correctly set to the production URL.

6. **Sitemap ping on deployment** — add a post-deploy hook to ping `https://www.google.com/ping?sitemap=https://www.estabizz.com/sitemap.xml` after each production deployment to notify Google of updates.

7. **Schema.org / JSON-LD for service pages** — the blog article pages already have JSON-LD; service pages could benefit from `Service` or `WebPage` schema for rich results.
