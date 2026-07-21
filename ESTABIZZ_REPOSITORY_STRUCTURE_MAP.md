# Estabizz — Repository Structure Map

> Created: 2026-07-22 · Branch: **main** (confirmed) · Audit commit: **73f04af**
> Discovery-only document. No files were moved, renamed, or deleted during this audit.

---

## 1. Top-Level Layout

```
/ (project root)
├── app/                          ← Next.js App Router (all pages + API routes)
├── components/                   ← Shared React components
├── lib/                          ← Business logic, models, utilities
├── scripts/                      ← One-off admin/import scripts (not part of Next.js app)
├── public/                       ← Static assets served at /
├── scratch/                      ← EMPTY directory (unused)
│
├── proxy.ts                      ← MISNAMED — exports `proxy` fn, not Next.js `middleware`
├── next.config.js                ← Next.js configuration
├── postcss.config.js             ← PostCSS (includes tailwindcss + autoprefixer)
├── tailwind.config.js            ← Tailwind configuration
├── tsconfig.json                 ← TypeScript compiler config
├── tsconfig.tsbuildinfo          ← GENERATED — TypeScript incremental build cache
├── package.json                  ← npm scripts and dependencies
├── package-lock.json             ← npm lockfile
├── vercel.json                   ← Vercel deploy configuration
├── .eslintrc.json                ← ESLint configuration
├── .gitignore                    ← Git ignore rules
├── .env.local                    ← Local secrets (never committed; never read by agents)
│
├── Estabizz_Project_Documentation.docx  ← UNTRACKED — generated Word file for sharing
│
└── [Documentation — 19 .md files at root]
    ├── CMS_STATUS.md             ← Living log of completed work (owner source of truth)
    ├── AGENTS.md                 ← Agent rules (pre-dates canonical docs)
    ├── ESTABIZZ_PROJECT_MASTER_CONTEXT.md
    ├── ESTABIZZ_AGENT_OPERATING_GUIDE.md
    ├── ESTABIZZ_TECHNICAL_ARCHITECTURE.md
    ├── ESTABIZZ_MODULE_INVENTORY.md
    ├── ESTABIZZ_API_DATABASE_MAP.md
    ├── ESTABIZZ_SECURITY_PERMISSION_MAP.md
    ├── ESTABIZZ_CURRENT_COMPLETION_STATUS.md
    ├── ESTABIZZ_TECHNICAL_DEBT_REGISTER.md
    ├── ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md
    ├── ESTABIZZ_NEXT_20_TASKS.md
    ├── ADMIN_OS_DISASTER_RECOVERY.md
    ├── ADMIN_OS_PRODUCTION_READINESS.md
    ├── ADMIN_OS_SECURITY_MATRIX.md
    ├── ADMIN_OS_SEO_DEPLOYMENT_CHECKLIST.md
    ├── ADMIN_OS_STAGING_RELEASE_PACKAGE.md
    ├── SECURITY_INCIDENT_S2.md
    └── [5 new audit docs including this file]
```

---

## 2. app/ — Next.js App Router

```
app/
├── layout.tsx                    ← Root layout (Navbar, Footer, CSS imports, Analytics)
├── page.tsx                      ← Homepage
├── globals.css                   ← Tailwind source CSS
├── robots.ts                     ← robots.txt generator
├── sitemap.ts                    ← sitemap.xml generator
├── apple-icon.png                ← PWA icon
├── icon.png                      ← Favicon fallback
├── opengraph-image.png           ← OG image
├── twitter-image.png             ← Twitter card image
│
├── admin/                        ← Admin OS (all routes require auth JWT cookie)
│   ├── layout.tsx                ← Admin shell layout (auth gate)
│   ├── page.tsx                  ← Dashboard
│   ├── AdminDashboardClient.tsx
│   ├── AdminShell.tsx
│   ├── approval-queue/           ← Review + approve/reject content changes
│   ├── authors/                  ← Placeholder UI (not implemented)
│   ├── backups/                  ← MongoDB backup + GitHub push
│   ├── blogs/                    ← Blog CRUD + Word import
│   │   ├── _components/          ← Editor components (TipTap, Word import, uploader)
│   │   ├── edit/[id]/            ← Edit existing blog
│   │   ├── new/                  ← Create new blog
│   │   └── pending/              ← Pending approval queue
│   ├── categories/               ← Placeholder UI (categories are hardcoded)
│   ├── change-history/           ← Content change history log
│   ├── content-pages/            ← CMS content page inventory + editor
│   │   ├── [slug]/edit/          ← Generic edit shell (most are stub)
│   │   └── nbfc-registration-in-india/edit/  ← Only fully-implemented editor
│   ├── leads/                    ← Lead management
│   ├── media/                    ← REDIRECT ALIAS → /admin/media-library
│   ├── media-library/            ← Canonical media library
│   ├── navigation/               ← Navbar + Footer editor
│   ├── recycle-bin/              ← Deleted content management
│   ├── regulatory-updates/       ← Regulatory updates desk
│   ├── restore/                  ← Restore from backup
│   ├── seo/                      ← Page SEO editor
│   ├── settings/                 ← Placeholder UI (not implemented)
│   ├── users/                    ← User + role management
│   └── website/                  ← Homepage section CMS (17 sections)
│       └── [pageId]/             ← Per-section editors
│
├── api/                          ← API routes
│   ├── admin/                    ← Admin-protected endpoints
│   │   ├── approval-queue/       ← Content approval flow
│   │   ├── backups/              ← Backup CRUD + download
│   │   ├── blogs/                ← Blog CRUD + status transitions
│   │   │   ├── save/             ← ⚠️ requireAdmin (should be requirePermission)
│   │   │   ├── [id]/             ← ⚠️ requireAdmin (should be requirePermission)
│   │   │   ├── [id]/status/      ← ⚠️ requireAdmin (should be requirePermission)
│   │   │   └── featured/         ← Blog featured flag
│   │   ├── change-history/       ← History log
│   │   ├── content/              ← Homepage CMS content blocks
│   │   ├── content-pages/        ← CMS public page CRUD
│   │   ├── leads/[id]/           ← ⚠️ requireAdmin (should be requirePermission)
│   │   ├── media/                ← Idempotent media upsert + delete
│   │   ├── recycle-bin/          ← Recycle bin management
│   │   ├── regulatory-updates/   ← Regulatory update lifecycle
│   │   ├── restore/              ← Restore actions
│   │   └── users/                ← Admin user CRUD
│   ├── auth/                     ← Public auth endpoints
│   │   ├── login/                ← ⚠️ No rate limiting (TD-001)
│   │   ├── logout/
│   │   ├── me/
│   │   └── signup/
│   ├── chat/                     ← ⚠️ NO AUTH — AI endpoint (dormant)
│   ├── leads/                    ← Public lead capture
│   ├── my-blogs/[id]/            ← User's own blog management
│   ├── recommend-services/       ← ⚠️ NO AUTH — AI endpoint (dormant)
│   ├── regulatory-updates/       ← Public regulatory updates feed
│   └── submit-blog/              ← Public blog submission
│
├── 19-5/                         ← 19-5 company registration landing pages (static)
│   ├── page.tsx                  ← Hub
│   └── [slug]/page.tsx           ← Individual landing pages (20 types)
│
├── blogs/                        ← Public blog section
│   ├── page.tsx
│   ├── BlogsClient.tsx
│   ├── [slug]/                   ← Blog detail
│   └── category/[slug]/          ← Blog category listing
│
├── contact/                      ← Contact form
├── fema/                         ← FEMA hub + 2 service pages
├── get-started/                  ← Lead capture form
│
├── ifsca/                        ← IFSCA hub (15 routes total)
│   ├── page.tsx                  ← IFSCA hub
│   ├── [7 canonical content routes with PageClient.tsx]
│   └── [7 redirect-only aliases — see §3]
│
├── irdai/                        ← IRDAI hub (12 content routes)
├── legal/                        ← Privacy, refund, terms pages
├── login/                        ← Admin login
├── my-blogs/                     ← User's submitted blogs
│
├── rbi/                          ← RBI hub (17 content routes)
│
├── regulatory/                   ← Legacy article-style pages
│   ├── page.tsx                  ← Legacy regulatory hub (partially maintained)
│   ├── finance-company-gift-ifsc/← Legacy article
│   ├── ifsca-factoring-license-gift-city/ ← Legacy article
│   └── psp-license-ifsca/        ← REDIRECT → /ifsca/psp-license-ifsca
│
├── resources/                    ← Resources hub
│   ├── page.tsx                  ← Resources listing
│   ├── circular-explainers/      ← Placeholder
│   ├── compliance-calendar/      ← Placeholder
│   ├── content-rebuild-command/  ← ⚠️ Internal tool page — publicly accessible (TD-006)
│   ├── faqs/                     ← FAQ page
│   ├── regulatory-update-email-template/ ← Internal template — publicly accessible
│   ├── regulatory-updates/       ← CMS-driven regulatory updates (public)
│   └── service-page-content-framework/  ← Internal reference — publicly accessible
│
├── sebi/                         ← SEBI hub (22 routes total)
│   ├── page.tsx                  ← SEBI hub
│   ├── [14 canonical content routes with PageClient.tsx]
│   └── [8 redirect-only aliases — see §3]
│
├── services/                     ← Services hub (15 content routes)
│
├── signup/                       ← Public user signup
├── submit-blog/                  ← Public blog submission form
│
└── proposal-template/            ← Internal proposal template page (publicly accessible)
```

---

## 3. Redirect-Only Routes (No Content — Pure Redirect)

These routes exist only to forward old/alias URLs to canonical long-slug URLs. They contain no UI or data.

### SEBI (8 redirect aliases)

| Route file | Redirects to |
|-----------|-------------|
| `app/sebi/investment-adviser-registration/page.tsx` | `/sebi/ria-registration-in-india` |
| `app/sebi/portfolio-manager-registration/page.tsx` | `/sebi/pms-registration-in-india` |
| `app/sebi/research-analyst-registration/page.tsx` | `/sebi/research-analyst-registration-in-india` |
| `app/sebi/sebi-ria-registration/page.tsx` | `/sebi/ria-registration-in-india` |
| `app/sebi/sebi-stock-broker-registration/page.tsx` | `/sebi/stock-broker-registration-in-india` |
| `app/sebi/social-stock-exchange-license/page.tsx` | `/sebi/social-stock-exchange-license-india` |
| `app/sebi/stock-broker-license-india/page.tsx` | `/sebi/stock-broker-registration-in-india` |
| `app/sebi/stock-broker-registration/page.tsx` | `/sebi/stock-broker-registration-in-india` |

### IFSCA (7 redirect aliases)

| Route file | Redirects to |
|-----------|-------------|
| `app/ifsca/aircraft-leasing/page.tsx` | `/ifsca/aircraft-leasing-registration-in-ifsc` |
| `app/ifsca/batf-services/page.tsx` | `/ifsca/batf-services-registration-in-gift-ifsc` |
| `app/ifsca/finance-company/page.tsx` | `/ifsca/finance-company-in-gift-ifsc` |
| `app/ifsca/finance-company-registration-in-ifsc/page.tsx` | `/ifsca/finance-company-in-gift-ifsc` |
| `app/ifsca/fintech-entity/page.tsx` | `/ifsca/ifsca-fintech-startup-incentives` |
| `app/ifsca/itfs-platform/page.tsx` | `/ifsca/itfs-registration-in-gift-ifsc` |
| `app/ifsca/psp-license/page.tsx` | `/ifsca/psp-license-ifsca` |

### Other redirects (2)

| Route file | Redirects to |
|-----------|-------------|
| `app/regulatory/psp-license-ifsca/page.tsx` | `/ifsca/psp-license-ifsca` |
| `app/admin/media/page.tsx` | `/admin/media-library` |

**Total redirect-only routes: 17** (out of ~260 app route files)

---

## 4. lib/ — Library Modules

```
lib/
├── db.ts                         ← MongoDB connection singleton (global cache)
├── anthropic.ts                  ← Anthropic SDK client — DORMANT (API key not yet enabled)
├── faqEngine.ts                  ← FAQ data and logic
├── regulatoryUpdates.ts          ← LEGACY — static RegulatoryUpdate array, superseded by MongoDB model
├── servicePageTemplate.ts        ← DOCUMENTATION-AS-CODE — lists required sections for service pages
│
├── admin/                        ← Admin auth and permission system
│   ├── requireAdmin.ts           ← JWT verify + seed user allowlist check
│   ├── requirePermission.ts      ← requireAdmin + DB permission check + seed fallback
│   ├── repository.ts             ← Admin user DB operations
│   ├── seedData.ts               ← Seed admin user definitions
│   ├── types.ts                  ← Admin role/permission TypeScript types
│   └── helpers.ts                ← Admin utility helpers
│
├── auth/
│   └── session.ts                ← JWT sign/verify helpers for public user auth
│
├── blog/
│   ├── repository.ts             ← Blog DB operations
│   ├── types.ts                  ← Blog TypeScript types
│   ├── categories.ts             ← HARDCODED blog categories (TD-003)
│   ├── sanitize.ts               ← HTML sanitization (sanitize-html wrapper)
│   ├── submissionStore.ts        ← User blog submission logic
│   └── sampleBlogs.ts            ← LEGACY — empty array export (unused)
│
├── content/                      ← Homepage CMS (ContentBlock model)
│   ├── repository.ts             ← Content CRUD
│   ├── types.ts                  ← TypeScript types
│   ├── getContent.ts             ← Fetch content with fallback
│   ├── defaults.ts               ← Root defaults index
│   ├── approvalQueue.ts          ← Approval workflow
│   ├── backup.ts / backupTypes.ts ← Backup logic + types
│   ├── changeHistory.ts / changeHistoryTypes.ts ← History log + types
│   ├── recycleBin.ts / recycleBinTypes.ts ← Recycle bin + types
│   ├── restore.ts / restoreTypes.ts ← Restore logic + types
│   ├── pageCatalog.ts            ← CMS page catalogue
│   ├── seoPageCatalog.ts         ← SEO page catalogue
│   └── [17 *Defaults.ts files]   ← Per-section homepage defaults
│
├── models/                       ← All Mongoose model definitions (12 models)
│   ├── AdminUser.ts
│   ├── BackupSnapshot.ts
│   ├── Blog.ts
│   ├── ContentAudit.ts
│   ├── ContentBlock.ts
│   ├── ContentVersion.ts
│   ├── Lead.ts
│   ├── MediaAsset.ts
│   ├── PublicContentPage.ts
│   ├── RegulatoryUpdate.ts
│   ├── RegulatoryUpdateAudit.ts
│   └── User.ts
│
├── publicContent/                ← CMS public page system (46 managed pages)
│   ├── repository.ts             ← PublicContentPage CRUD
│   ├── types.ts                  ← TypeScript types
│   ├── managedPaths.ts           ← List of all 46 CMS-managed URL paths
│   ├── rendering.ts              ← Content rendering helpers
│   └── discovery.mjs             ← ESM SCRIPT ONLY — scans app/ routes for import scripts
│
├── regulatory/                   ← Regulatory updates (MongoDB-driven)
│   ├── repository.ts             ← RegulatoryUpdate CRUD
│   └── types.ts                  ← TypeScript types
│
├── seo/
│   ├── pageMetadata.ts           ← Per-page metadata generator
│   └── siteUrl.ts                ← Canonical URL helper
│
└── landing/                      ← Static data for 19-5 landing pages
    ├── index.ts                  ← Landing page registry
    ├── types.ts                  ← TypeScript types
    └── pages/                    ← 20 landing page data files
        ├── companyRegistration.ts
        ├── llpRegistration.ts
        └── [18 more page data files]
```

---

## 5. components/ — Shared React Components

```
components/
├── FAQAccordion.tsx              ← FAQ accordion (lone file at root — not in subfolder)
│
├── blog/
│   └── BlogCard.tsx              ← Blog listing card
│
├── content/
│   └── FrameworkBlocks.tsx       ← Content framework display
│
├── home/                         ← Homepage section components (17)
│   ├── HeroSection.tsx
│   ├── TrustedBy.tsx
│   ├── StatsSection.tsx
│   ├── RegulatorySevices.tsx     ← Note: typo in filename ("Sevices" not "Services")
│   ├── SolutionsSection.tsx
│   ├── ProcessSection.tsx
│   ├── CaseStudies.tsx
│   ├── CompliancePortal.tsx
│   ├── ContentFrameworkSection.tsx
│   ├── WhyChooseUs.tsx
│   ├── GlobalMarketsSection.tsx
│   ├── Testimonials.tsx
│   ├── ResourcesSection.tsx
│   ├── FeaturedBlogs.tsx
│   └── FinalCTA.tsx
│
├── landing/
│   └── LandingRenderer.tsx       ← Renders 19-5 landing pages
│
├── layout/
│   ├── Navbar.tsx                ← Site navigation bar
│   └── Footer.tsx                ← Site footer
│
├── publicContent/
│   └── PublicContentPageRenderer.tsx ← Renders CMS PublicContentPage records
│
├── templates/
│   └── ServicePageLayout.tsx     ← Standard service page template
│
└── ui/
    ├── ChatWidget.tsx            ← Consultation chat widget
    ├── LiveBackground.tsx        ← Animated background (homepage)
    ├── ReadingProgress.tsx       ← Reading progress bar (blog)
    └── ScrollToTop.tsx           ← Scroll-to-top button
```

---

## 6. scripts/ — Admin and Import Scripts

```
scripts/
├── seedAdminUsers.ts             ← Seeds initial admin users into MongoDB
├── createAdminLogin.mjs          ← Creates admin login credentials
├── importExistingPublicContentPages.mjs  ← Imports existing pages into CMS
├── importExistingRegulatoryUpdates.mjs   ← Imports regulatory updates
└── syncAdminRolePermissions.mjs  ← Syncs role default permissions to users
```

All scripts are run manually by the developer; none are imported by the Next.js app.

---

## 7. public/ — Static Assets

```
public/
├── estabizz-logo.png             ← Dark-background logo
├── estabizz-logo-light.png       ← Light-background logo
├── estabizz-mark.png             ← Logo mark only
├── favicon.ico                   ← Browser favicon
├── tailwind.css                  ← GENERATED — Tailwind CLI output (do not edit)
└── images/
    └── sebi/
        └── rta/
            ├── process-flowchart.png
            └── process-timeline.jpg
```

---

## 8. Root Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `next.config.js` | Next.js config (headers, webpack, etc.) | Active |
| `postcss.config.js` | PostCSS pipeline (tailwindcss + autoprefixer) | Active — both CSS paths active simultaneously |
| `tailwind.config.js` | Tailwind content paths and theme | Active |
| `tsconfig.json` | TypeScript strict config, path alias `@/*` | Active |
| `tsconfig.tsbuildinfo` | TypeScript incremental build cache | Generated — should be gitignored |
| `package.json` | npm deps + dev script (Tailwind CLI + next dev --turbopack) | Active |
| `package-lock.json` | npm lockfile | Active |
| `vercel.json` | Vercel deploy config | Active |
| `.eslintrc.json` | ESLint rules | Active |
| `.gitignore` | Git ignore patterns | Needs update (see cleanup plan) |
| `proxy.ts` | Exports `proxy` function — NOT a Next.js middleware | Misnamed / dormant |

---

## 9. Notable Structural Observations

1. **No `docs/` directory** — All 19+ markdown documentation files live at the project root.
2. **No `types/` directory** — TypeScript types are colocated with their modules.
3. **No `styles/` directory** — `app/globals.css` is the single stylesheet source.
4. **No `data/` directory** — Static data lives in `lib/landing/` (landing pages) and `lib/content/*Defaults.ts` (homepage defaults).
5. **All models in `lib/models/`** — No split `models/` folder at the project root.
6. **`proxy.ts` at root** — Misnamed; Next.js edge middleware must be named `middleware.ts` to be picked up.
7. **`scratch/` is empty** — The directory exists but contains no files.
8. **`components/FAQAccordion.tsx` not in a subdirectory** — All other component files are in a subfolder.
9. **`components/home/RegulatorySevices.tsx`** — Typo in filename (missing 'r' in Services); this is the live file in use.
10. **17 redirect routes** — Spread across `app/sebi/`, `app/ifsca/`, `app/regulatory/`, `app/admin/media/`.
