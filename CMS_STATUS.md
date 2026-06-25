# Estabizz Admin OS — CMS Status

> Single source of truth for the admin/CMS build. **Update this file after every development batch.**
> Last updated: 2026-06-25 (IST) · Phase: **2I-A — Page SEO search filter** · Last batch: **2I-A (Page SEO search filter)**

---

## 1. Current project status

- **Stack:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS, MongoDB (Mongoose), Vercel.
- **Live content store:** MongoDB. **Firebase is NOT used** (legacy env vars are dead).
- **Media hosting:** Cloudinary (already wired).
- **Auth:** JWT in `auth_token` cookie; admin gated by email allowlist + role/permission lookup.
- **Content engine:** working and proven. 15 of 15 homepage content sections editable. Navbar + footer editable. Homepage SEO settings are editable and connected to live metadata.
- **Approval Queue UI:** built at `/admin/approval-queue` for pending website content, SEO changes and existing pending blog submissions.
- **Change History UI:** built at `/admin/change-history` with read-only activity filters, before/after details, reviewer comments and IST timestamps.
- **Restore UI:** built at `/admin/restore` for permission-gated restore of previous published CMS versions.
- **Media Library:** built at `/admin/media-library`. Cloudinary-backed. Upload JPG/PNG/WebP/SVG/PDF, search, filter, grid/list view, edit alt text/caption/tags, copy link, soft remove. Records stored in `media_assets` MongoDB collection. Permission-gated (upload: `manage_media`; remove: `delete_content`).
- **Users & Roles:** built at `/admin/users`. View, search, filter, create and edit admin users. Role and status change. Permission-gated (`manage_users` = super_admin only). MongoDB `admin_users` collection. Self-demotion warning. Last super_admin protection. Login access creation and password reset from the admin panel.
- **Login Access Flow:** Admin users created via the panel can now log in without running scripts. `requireAdmin` checks the static allowlist first (legacy), then falls back to an active `admin_users` MongoDB record. Creating a user with "Create Login Access" hashes the password (bcrypt-12) and upserts into the `User` collection. Password reset works from the Edit panel. Suspended/inactive users cannot log in.
- **Recycle Bin:** built at `/admin/recycle-bin`. Shows soft-deleted media (`status:'removed'`) and deleted content blocks (`status:'deleted'`). Restore reactivates the item (audit recorded). Permanent delete requires typing "DELETE" in the confirmation modal and purge_content permission; audit recorded before deletion. Business-friendly UI — no technical words visible. Media purge does NOT delete from Cloudinary (manual cleanup required). Content purge is safe: site falls back to hardcoded defaults for deleted block keys.
- **GitHub JSON Backup:** built at `/admin/backups`. Manual backup collects ContentBlock, ContentVersion, ContentAudit, MediaAsset metadata, and AdminUser safe metadata into a timestamped JSON file. Never includes: passwords, password hashes, JWT secrets, MongoDB URI, Cloudinary API secret, GitHub tokens, or the User credential collection. GitHub push is optional — configured via env vars (GITHUB_BACKUP_TOKEN, GITHUB_BACKUP_OWNER, GITHUB_BACKUP_REPO, GITHUB_BACKUP_BRANCH, GITHUB_BACKUP_PATH). If GitHub env vars are missing, backup is saved locally only with a friendly setup message. Backup records stored in MongoDB `backup_snapshots` collection. Permission-gated: `view_admin` → view list; `manage_backups` (super_admin + admin) → create and download. Every backup creates a `system:backup` audit record.
- **Page-wise SEO Editor:** built at `/admin/seo`. Central editor for 14 public pages — Main Pages, Regulatory Hubs, Business Services, and Legal & System. Search filter added for page name, path and current/default SEO title. All pages use `export async function generateMetadata()` drawing live values from MongoDB via `getContent('seo.*')`, with hardcoded `SeoContent` defaults as fallback. SEO fields: page title (60-char counter), meta description (160-char counter), focus keyword, canonical URL, robots index/follow toggles, OG title/description/image, Twitter title/description/image, secondary keywords, SEO notes. Non-blocking SEO quality warnings in the edit drawer. Status badges: Live / Pending / Draft / Default. All 13 new `seo.*` keys registered in `CONTENT_DEFAULTS`. Permission-gated: `view_admin` → view; `manage_seo` → save. Uses existing `/api/admin/content/save` (already routes `seo.*` to `manage_seo`). `twitterImage` is now preferred over `ogImage` for Twitter cards.
- **All work is LOCAL.** Nothing pushed to production yet (awaiting owner approval).

### How content works (do not change this design)
- Three collections: `ContentBlock` (live), `ContentVersion` (history of every save), `ContentAudit` (who/what/when).
- Each section = a content block with a stable **key** (e.g. `homepage.hero`).
- `getContent(key)` returns the live DB value, else the **hardcoded default**. The fallback means the site never breaks.
- Save workflow: Super Admin/Admin → publishes instantly; other roles → `pending_approval`.
- Each save writes a ContentVersion + ContentAudit. Timestamps shown in **IST**.

---

## 2. Completed homepage sections (17 of 17) — DO NOT DISTURB

| # | Section | Content key | Editor route |
|---|---|---|---|
| 1 | Header / Navbar | `global.navbar` | /admin/navigation |
| 2 | Hero | `homepage.hero` | /admin/website/homepage/hero |
| 3 | Statistics / Achievements | `homepage.stats` | …/stats |
| 4 | Client Logos / Trusted By | `homepage.trustedBy` | …/trusted-by |
| 5 | Global Market Desk | `homepage.globalMarkets` | …/global-markets |
| 6 | Business Stage Solutions | `homepage.solutions` | …/solutions |
| 7 | Why Estabizz | `homepage.whyChooseUs` | …/why-estabizz |
| 8 | Regulatory Services | `homepage.regulatoryServices` | …/regulatory-services |
| 9 | Execution Process | `homepage.process` | …/process |
| 10 | Compliance Portal | `homepage.compliancePortal` | …/compliance-portal |
| 11 | Final CTA | `homepage.finalCta` | …/final-cta |
| 12 | Footer | `global.footer` | /admin/navigation |
| 13 | Regulatory Experience / Case Highlights | `homepage.caseStudies` | …/case-highlights |
| 14 | Testimonials | `homepage.testimonials` | …/testimonials |
| 15 | Content, Compliance & Trust | `homepage.contentFramework` | …/content-framework |
| 16 | Resource Architecture | `homepage.resources` | …/resource-architecture |
| 17 | SEO Settings (homepage) | `seo.homepage` | …/seo |

All verified: TypeScript clean, renders from DB, save loop works, zero runtime errors, SEO-safe stats.

**Privacy note (testimonials):** non-public testimonials (consent ≠ "consent_received", or not visible) are filtered on the **server** in `app/page.tsx` before being passed to the client, so confidential/internal feedback is never serialized into the page sent to the browser. Hidden case cards are likewise filtered server-side. Do not remove this server-side filtering.

---

## 3. Pending homepage sections

No homepage sections remain pending. Batch 1B completed the final two homepage content sections and the first page-wise SEO block.

---

## 4. Roles & permissions

### Roles
| Role | Summary |
|---|---|
| `super_admin` | Full access; publishes directly |
| `website_editor` | Edit sections; submit for review; **no** publish/delete/users |
| `content_writer` | Create/edit drafts → approval |
| `compliance_reviewer` | Approve / reject / publish (regulatory wording review) |
| `seo_manager` | SEO fields only |
| `admin_viewer` | Read-only |
| `admin`, `editor`, `reviewer` | Legacy roles, kept for compatibility |

### Permission keys (granular — access is permission-based, not role-name-based)
`view_admin`, `manage_content`, `manage_navigation`, `publish_content`, `delete_content`, `purge_content`,
`manage_seo`, `manage_media`, `manage_users`,
`manage_blogs`, `create_blog`, `edit_blog`, `approve_blog`, `publish_blog`, `reject_blog`, `archive_blog`, `delete_blog`, `manage_categories`.

### Role → permission matrix (key permissions)
| Permission | super_admin | website_editor | content_writer | compliance_reviewer | seo_manager | admin_viewer |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| view_admin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| manage_content (edit) | ✓ | ✓ | ✓ | – | – | – |
| manage_navigation | ✓ | ✓ | – | – | – | – |
| publish_content | ✓ | – | – | ✓ | – | – |
| delete_content (→bin) | ✓ | – | – | – | – | – |
| purge_content (password) | ✓ | – | – | – | – | – |
| manage_seo | ✓ | – | – | – | ✓ | – |
| manage_media | ✓ | ✓ | ✓ | – | – | – |
| manage_users | ✓ | – | – | – | – | – |

> Instant publish (`canPublishInstantly`) = `super_admin` + legacy `admin` only. All others → approval queue.

---

## 5. Publishing workflow

```
Draft → Preview → Submit for Review → Compliance Review → Final Approval → Publish → Backup
```
- Super Admin publishes directly.
- Website Editor / Content Writer cannot publish — their saves become `pending_approval`.
- Compliance Reviewer approves/rejects (regulatory wording).
- Section status values surfaced in admin: **Published / Draft / Hidden** (Pending shown as a badge).

---

## 6. System screens

1. **Approval Queue UI — DONE** — review & approve/reject pending website content, SEO changes and existing pending blog submissions.
2. **Change History UI — DONE** — who changed what, old → new, date/time, reviewer comments and before/after details.
3. **Restore UI — DONE** — restore previous published content/SEO versions with confirmation, audit and history records.
4. **Media Library — DONE** — Cloudinary-backed upload (JPG/PNG/WebP/SVG/PDF), grid/list view, search, type filter, alt text/caption/tags editor, copy link, soft remove. MongoDB `media_assets` collection.
5. **Page-wise SEO editor — DONE** — `/admin/seo`. 14 pages across 4 groups. Search filter by page name, path and SEO title. Live metadata via `generateMetadata()`. Edit drawer with char counters, SEO warnings, OG + Twitter fields, robots toggles. Permission-gated (`manage_seo`).
6. **Preview modes** — desktop / tablet / mobile.
7. **Users & Roles screen + Login Access Flow — DONE** — assign the 6 roles in-app; create login credentials; reset passwords; Login Ready / Setup Needed badge per user.
8. **Recycle Bin — DONE** — `/admin/recycle-bin`. Removed media + deleted content blocks. Restore (audit) + Permanent Delete with "DELETE" typed confirmation (audit before purge). Permission-gated: view_admin→view, delete_content→restore, purge_content→purge.
9. **Backup system — DONE** — `/admin/backups`. Manual JSON snapshot: ContentBlock, ContentVersion, ContentAudit, MediaAsset metadata, AdminUser safe metadata. Optional GitHub push via env vars. Download as JSON. Permission-gated: view_admin→view, manage_backups→create/download. MongoDB `backup_snapshots` collection. Audit record `system:backup` on every backup.
10. **Design presets** per section — Default / Light / Dark / Premium / Minimal / Highlight + show/hide (controlled, not free-design).

---

## 7. Page-wise SEO (applies to ALL pages)

SEO blocks to add (key pattern `seo.<page>`): Homepage, RBI, SEBI, IRDAI, IFSCA, FIU, About, Contact, Login, Legal, Blogs, Regulatory Updates.

Each page's SEO fields: SEO title, Meta description, Focus keyword, URL slug, Canonical URL, OG title, OG description, OG image, Index/no-index. Service pages also: FAQ section, Disclaimer, Last updated date, Reviewed by, Author.

---

## 8. Regulatory safe-wording (content safety)

Public/regulatory content must avoid guarantee language. **Disallowed:** "Guaranteed approval", "Assured licence", "100% approval", "Regulator-approved consultant", "RBI/SEBI/IRDAI licensed/approved consultant".
**Use instead:** "Regulatory advisory support", "Application preparation support", "Documentation and compliance assistance", "Approval subject to regulator review", "Subject to eligibility, documentation and applicable law".

Apply especially to Case Highlights, Testimonials, and all service pages. (A wording-lint check is a planned enhancement.)

---

## 9. Admin OS module roadmap (long-term, phased)

| Phase | Module | Status |
|---|---|---|
| **1** | **Website CMS** | **In progress** |
| 2 | Regulatory Update Desk | Planned (after CMS stable) |
| 3 | Blog & Knowledge Centre | Planned (blog admin already partially exists) |
| 4 | SEO Management | Folded into Phase 1 (page-wise SEO) + ongoing |
| 5 | Sales CRM | Planned (do not start yet) |
| 6 | Client Work / Ticket Management | Planned (do not start yet) |
| — | Approval Queue, Media Library, Users & Roles, Change History, Restore & Backup, Reports & Analytics | Cross-cutting, built within Phase 1 |

Do not start Sales CRM or Client Ticket Management until the Website CMS foundation is stable.

---

## 10. Next development batch

**Batch 1A — DONE** (Case Highlights + Testimonials).
**Batch 1B — DONE** (`homepage.contentFramework` + `homepage.resources` + `seo.homepage`).
**Phase 2A — DONE:** Approval Queue UI.
**Phase 2B — DONE:** Change History UI.
**Phase 2C — DONE:** Restore UI.
**Phase 2D — DONE:** Media Library (Cloudinary-backed, MongoDB `media_assets` collection, grid/list UI, full permission gating).
**Phase 2E — DONE:** Users & Roles screen (MongoDB admin_users, role/status management, last-super-admin protection, self-demotion warning, permission view).
**Phase 2F — DONE:** User Login Access Flow (in-panel credential creation, bcrypt-12 password hashing, reset-password API, requireAdmin DB fallback for MongoDB-created admins, Login Ready badge, no script dependency for new users).
**Phase 2G — DONE:** Recycle Bin (`/admin/recycle-bin`). Removed media + deleted content blocks. Restore (audit recorded) + Permanent Delete with "DELETE" confirmation (audit before purge). Permission-gated. Business-friendly language throughout. Cloudinary files NOT purged (manual cleanup). Content purge safe — site uses hardcoded defaults for missing block keys.
**Phase 2H — DONE:** GitHub JSON Backup (`/admin/backups`). Manual JSON snapshot of all CMS data (ContentBlock, ContentVersion, ContentAudit, MediaAsset metadata, AdminUser safe fields). Optional GitHub push via env vars. Download as JSON. Permission-gated (manage_backups = super_admin + admin). Audit record on every backup. Secrets never included.
**Phase 2H-A — DONE:** Admin permission sync/backfill (`scripts/syncAdminRolePermissions.mjs`). Adds any missing default permissions for each user's role without removing existing/custom permissions. Uses MongoDB `$addToSet` (idempotent). Supports `--dry-run`. Existing super_admin and legacy admin users receive `manage_backups` if missing; non-admin roles do not. Error messages redact MongoDB URI.
**Phase 2I — DONE:** Page-wise SEO Editor (`/admin/seo`). 14 pages across 4 groups. All converted from static `export const metadata` to `export async function generateMetadata()` pulling live `seo.*` keys from MongoDB with hardcoded defaults as fallback. SEO fields: title, description, focus keyword, canonical, robots, OG, Twitter, secondary keywords, notes. Char counters + non-blocking SEO warnings. Permission-gated (`manage_seo`). `twitterImage` field added to `SeoContent` interface and used in `buildPageMetadata`.
**Phase 2I-A — DONE:** Page SEO search filter (`/admin/seo`). Added business-friendly search by page name, path, current SEO title and fallback/default SEO title. Empty searches show all grouped pages; searches with no matches show "No SEO pages found for this search." Existing edit drawer, SEO warnings, counters and metadata behavior unchanged.
**Next after owner approval:** Owner-selected module (Sales CRM, Regulatory Update Desk, or Client Ticketing).

Per-section checklist (the proven pattern):
1. Create `lib/content/<x>Defaults.ts` (single source of truth)
2. Register the block in `lib/content/defaults.ts`
3. Component reads `content` prop with `{...DEFAULTS, ...content}` fallback
4. Server page fetches `getContent(key)` and passes the prop
5. Build admin editor under `/admin/website/[pageId]/<slug>` using `app/admin/website/_kit.tsx`
6. Save → MongoDB + ContentVersion + ContentAudit
7. Show last-updated in IST; status Published/Draft/Hidden
8. Set `editorReady: true` in `lib/content/pageCatalog.ts` + add the route mapping
9. `npx tsc --noEmit` clean; verify renders from DB; zero runtime errors

---

## 11. Known risks

- Root layout + homepage fetch content on each request; mitigated by index lookups, fallback defaults, and `revalidatePath` on publish. Watch latency as more blocks are added (consider request-level caching).
- Stale dev-server error logs can appear after edits (HMR) — verify against freshly served HTML, not the log buffer.
- Mega-menus (~200 service items) remain code-managed; making them editable is a separate sub-project.
- Preview screenshots in tooling can glitch at wide widths — rely on DOM/HTML checks.

---

## 12. DO-NOT-BREAK instructions

- ❌ Do not remove the hardcoded defaults or the MongoDB fallback in `getContent()`.
- ❌ Do not use Firebase.
- ❌ Do not push to production without owner approval — keep work local.
- ❌ Do not disturb the 17 completed homepage sections unless needed for consistency.
- ❌ Do not build a free-form drag-and-drop designer; editing is controlled (text, image, link, order, show/hide, presets).
- ❌ Do not let non-approved content go live unless the role permits.
- ❌ Do not use technical words in the admin UI (schema, JSON, object, payload, component, database). Use: Page, Section, Heading, Description, Button, Image, Colour, Status, Preview, Save, Submit for Review, Approve, Publish, Hide, Restore.
- ✅ Every important action must be recorded in audit history.
- ✅ Every published version must be restorable.

---

## 13. Local admin access (for testing)

- Login: `/login` → Admin: `/admin` → Website Editor: `/admin/website`
- Test super-admin: `estabizz@gmail.com` (password reset via `scripts/createAdminLogin.mjs`)
