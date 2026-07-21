# Estabizz — Module Inventory

> Last verified: 2026-07-22 · Branch: **main** (confirmed) · Functional baseline commit: **49f7c81** · Documentation commit: **a60d5a7**

---

## Admin OS Modules

| # | Module | Route | Key Files | Permission | Status |
|---|--------|-------|-----------|------------|--------|
| 1 | Dashboard | `/admin` | `app/admin/page.tsx`, `AdminDashboardClient.tsx` | `view_admin` | Complete |
| 2 | Website Editor Hub | `/admin/website` | `app/admin/website/page.tsx`, `_kit.tsx` | `manage_content` | Complete |
| 3 | Homepage Section Editors | `/admin/website/[pageId]/[section]` | 14 editor files in `app/admin/website/[pageId]/` | `manage_content` | Complete (17/17 sections) |
| 4 | Content Pages Inventory | `/admin/content-pages` | `ContentPagesClient.tsx` | `view_admin` | Complete (read-only) |
| 5 | Content Page Visual Editor | `/admin/content-pages/[slug]/edit` | `PublicContentVisualEditorClient.tsx` | `manage_content` | Partially implemented (only nbfc-registration-in-india has full editor; others have shell) |
| 6 | Page SEO Editor | `/admin/seo` | `app/admin/seo/page.tsx`, `PageSeoClient.tsx` | `manage_seo` | Complete |
| 7 | Blog List | `/admin/blogs` | `AdminBlogsClient.tsx` | `manage_blogs` | Complete |
| 8 | New Blog | `/admin/blogs/new` | `app/admin/blogs/new/page.tsx`, `BlogEditorClient.tsx`, `RichContentEditor.tsx` | `create_blog` | Complete |
| 9 | Edit Blog | `/admin/blogs/edit/[id]` | `app/admin/blogs/edit/[id]/page.tsx` | `edit_blog` | Complete |
| 10 | Pending Review | `/admin/blogs/pending` | `PendingBlogsClient.tsx` | `approve_blog` | Complete |
| 11 | Blog Categories | `/admin/categories` | `app/admin/categories/page.tsx` | `manage_categories` | UI only — categories are hardcoded in `lib/blog/categories.ts`; admin UI is a placeholder |
| 12 | Regulatory Updates Desk | `/admin/regulatory-updates` | `RegulatoryUpdatesClient.tsx` | `manage_content` | Complete |
| 13 | Media Library | `/admin/media-library` | `MediaLibraryClient.tsx` | `manage_media` | Complete |
| 14 | Approval Queue | `/admin/approval-queue` | `ApprovalQueueClient.tsx` | `view_admin` / `publish_content` | Complete |
| 15 | Change History | `/admin/change-history` | `ChangeHistoryClient.tsx` | `view_admin` | Complete |
| 16 | Restore | `/admin/restore` | `RestoreClient.tsx` | `publish_content` | Complete |
| 17 | Recycle Bin | `/admin/recycle-bin` | `RecycleBinClient.tsx` | `delete_content` / `purge_content` | Complete |
| 18 | Users & Roles | `/admin/users` | `UsersClient.tsx` | `manage_users` | Complete |
| 19 | Backups | `/admin/backups` | `BackupsClient.tsx` | `manage_backups` | Complete |
| 20 | Navigation Editor | `/admin/navigation` | `NavbarEditor.tsx`, `FooterEditor.tsx` | `manage_navigation` | Complete |
| 21 | Leads | `/admin/leads` | `LeadsClient.tsx` | `view_admin` | Complete |
| 22 | Admin Settings | `/admin/settings` | `app/admin/settings/page.tsx` | — | UI placeholder only |
| 23 | Authors | `/admin/authors` | `app/admin/authors/page.tsx` | — | UI placeholder only |
| 24 | Media (alias) | `/admin/media` | `app/admin/media/page.tsx` | — | Redirect alias to `/admin/media-library` |

---

## Public Website Modules

| # | Module | Routes | Data Source | CMS-managed | Status |
|---|--------|--------|-------------|-------------|--------|
| 1 | Homepage | `/` | MongoDB ContentBlocks + defaults | Yes (17 sections) | Complete |
| 2 | RBI hub + service pages | `/rbi`, `/rbi/*` | MongoDB PublicContentPage (15) + hardcoded fallbacks | 15 of 17 paths managed | Complete |
| 3 | SEBI hub + service pages | `/sebi`, `/sebi/*` | MongoDB PublicContentPage (10) + hardcoded | 10 of ~20 paths managed | Complete |
| 4 | IRDAI hub + service pages | `/irdai`, `/irdai/*` | MongoDB PublicContentPage (4) + hardcoded | 4 of ~10 paths managed | Complete |
| 5 | IFSCA hub + service pages | `/ifsca`, `/ifsca/*` | MongoDB PublicContentPage (2) + hardcoded | 2 of ~9 paths managed | Complete |
| 6 | FEMA pages | `/fema`, `/fema/*` | MongoDB PublicContentPage (2) + hardcoded | 2 of 2 paths managed | Complete |
| 7 | Services pages | `/services/*` | MongoDB PublicContentPage (13) + hardcoded | 13 of ~15 paths managed | Complete |
| 8 | Public Blogs | `/blogs`, `/blogs/[slug]`, `/blogs/category/[slug]` | MongoDB Blog model | No | Complete |
| 9 | Resources hub | `/resources/*` | Hardcoded | No | Partial (mostly placeholder pages) |
| 10 | Regulatory Updates (public) | `/resources/regulatory-updates`, `/resources/regulatory-updates/[slug]` | MongoDB RegulatoryUpdate | No | Complete |
| 11 | Legal pages | `/legal/privacy-policy`, `/legal/refund-policy`, `/legal/terms-conditions` | Hardcoded | No | Content review needed |
| 12 | 19-5 landing pages | `/19-5`, `/19-5/[slug]` | `lib/landing/` static data | No | Complete (static) |
| 13 | Regulatory article pages | `/regulatory/*` | Hardcoded | No | Legacy — 3 pages, partially maintained |
| 14 | Contact / Get Started | `/contact`, `/get-started` | Lead capture → MongoDB | No | Complete |
| 15 | Pricing | `/pricing` | Hardcoded | No | Content placeholder |
| 16 | Submit Blog | `/submit-blog` | MongoDB Blog (user submissions) | No | Complete |
| 17 | My Blogs | `/my-blogs` | MongoDB Blog (user-specific) | No | Complete (user auth required) |
| 18 | Login / Signup | `/login`, `/signup` | Auth → User model | No | Complete |

---

## Blog Editor Component Inventory

| Component / File | Purpose |
|-----------------|---------|
| `app/admin/blogs/_components/BlogEditorClient.tsx` | Outer shell: metadata form, publish blocking, save/publish |
| `app/admin/blogs/_components/RichContentEditor.tsx` | TipTap editor: toolbar, Word import, alt-text panel, media sync |
| `app/admin/blogs/_components/wordCleanup.ts` | Client-side Word HTML sanitizer (DOM-based) |
| `app/admin/blogs/_components/CloudinaryUploader.tsx` | Standalone Cloudinary upload helper (used in media library) |

---

## Library Module Inventory

| Directory | Purpose | Key files |
|-----------|---------|-----------|
| `lib/admin/` | Auth guards, role/permission types, seed users, repository | `requireAdmin.ts`, `requirePermission.ts`, `types.ts`, `seedData.ts`, `repository.ts` |
| `lib/auth/` | Session utilities | `session.ts` |
| `lib/blog/` | Blog business logic | `repository.ts`, `types.ts`, `categories.ts`, `sanitize.ts`, `submissionStore.ts`, `sampleBlogs.ts` |
| `lib/content/` | Homepage CMS: defaults, repository, approval queue, backup, recycle bin, restore, change history | 30+ files |
| `lib/models/` | All Mongoose model definitions | 12 model files |
| `lib/publicContent/` | CMS public page repository, types, managed path list | `repository.ts`, `types.ts`, `managedPaths.ts`, `rendering.ts` |
| `lib/regulatory/` | Regulatory updates repository | `repository.ts`, `types.ts` |
| `lib/seo/` | Site URL helper, page metadata | `siteUrl.ts`, `pageMetadata.ts` |
| `lib/landing/` | Static data for 19-5 company registration pages | `index.ts` + 20 page data files |
| `lib/db.ts` | MongoDB connection (singleton with global cache) | — |
| `lib/anthropic.ts` | Anthropic SDK client initialization | Dormant |
| `lib/faqEngine.ts` | FAQ data/logic | — |
| `lib/servicePageTemplate.ts` | Template for service page hardcoded content | — |
| `lib/regulatoryUpdates.ts` | Utility for regulatory update data | — |

---

## Script Inventory

| Script | Purpose | When to run |
|--------|---------|-------------|
| `scripts/seedAdminUsers.ts` | Seeds initial admin user records into MongoDB | Once on first deploy |
| `scripts/createAdminLogin.mjs` | Creates admin login credentials | When adding new admin |
| `scripts/importExistingPublicContentPages.mjs` | Dry-run discovery and controlled import of pages | When adding new CMS-managed pages |
| `scripts/importExistingRegulatoryUpdates.mjs` | Imports existing regulatory updates into MongoDB | Once on initial import |
| `scripts/syncAdminRolePermissions.mjs` | Syncs role default permissions to existing users | After permission schema changes |

---

## Shared Component Inventory

| Component | Purpose | Used by |
|-----------|---------|---------|
| `components/layout/Navbar.tsx` | Site navigation bar | Root layout |
| `components/layout/Footer.tsx` | Site footer | Root layout |
| `components/home/*.tsx` | Homepage section components (17) | Homepage |
| `components/blog/BlogCard.tsx` | Blog listing card | Blog list, homepage |
| `components/templates/ServicePageLayout.tsx` | Standard service page template | All 46 CMS-managed pages |
| `components/publicContent/PublicContentPageRenderer.tsx` | Renders CMS PublicContentPage records | 46 CMS-managed pages |
| `components/landing/LandingRenderer.tsx` | Renders 19-5 landing pages | 19-5 section |
| `components/ui/ChatWidget.tsx` | Chat/consultation widget | Layout |
| `components/ui/LiveBackground.tsx` | Animated background effect | Homepage |
| `components/ui/ReadingProgress.tsx` | Reading progress bar | Blog detail |
| `components/ui/ScrollToTop.tsx` | Scroll-to-top button | Layout |
| `components/FAQAccordion.tsx` | FAQ accordion component | Resources, service pages |
| `components/content/FrameworkBlocks.tsx` | Content framework display | Resources |
