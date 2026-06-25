# Estabizz Admin OS — CMS Status

> Single source of truth for the admin/CMS build. **Update this file after every development batch.**
> Last updated: 2026-06-25 (IST) · Phase: **1 — Website CMS** · Last batch: **1B (Content Framework + Resources + Homepage SEO)**

---

## 1. Current project status

- **Stack:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS, MongoDB (Mongoose), Vercel.
- **Live content store:** MongoDB. **Firebase is NOT used** (legacy env vars are dead).
- **Media hosting:** Cloudinary (already wired).
- **Auth:** JWT in `auth_token` cookie; admin gated by email allowlist + role/permission lookup.
- **Content engine:** working and proven. 15 of 15 homepage content sections editable. Navbar + footer editable. Homepage SEO settings are editable and connected to live metadata.
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

## 6. Pending system screens (Phase 1, after sections)

1. **Approval Queue UI** — review & approve/reject pending changes (workflow backend exists).
2. **Change History UI** — who changed what, old → new, date/time (versions are recorded).
3. **Restore UI** — one-click roll back to a previous published version.
4. **Media Library** — Cloudinary uploads, alt text, "used where", upload date.
5. **Page-wise SEO editor** — all pages, not just blogs (see §7).
6. **Preview modes** — desktop / tablet / mobile.
7. **Users & Roles screen** — assign the 6 roles in-app.
8. **Recycle Bin** — soft delete → admin-only permanent delete (password) → audit.
9. **Backup system** — GitHub JSON snapshot on every publish.
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
**Then:** Approval Queue UI → Change History UI → Restore UI.

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
