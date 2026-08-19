# Estabizz Jobs — Current System Audit

> **Branch:** `jobs-platform-phase-0`  
> **Audit date:** 2026-08-08  
> **Purpose:** Complete read-only technical audit of the existing Estabizz repository before any Jobs platform development begins. No code was modified during this audit.

---

## A. Current Architecture

### A1. Framework & Language

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router (Turbopack) | ^16.2.4 |
| UI | React | ^18.3.1 |
| Language | TypeScript | ^5.3.3 |
| Styling | Tailwind CSS (standalone CLI + PostCSS) | ^3.4.19 |
| Node.js runtime | Node.js | 22.x |
| Database | MongoDB via Mongoose | Mongoose ^9.4.1 |
| Auth | JWT (jsonwebtoken) + bcryptjs | ^9.0.3 / ^3.0.3 |
| Rich text editor | TipTap v3 (blog editor only) | ^3.28.0 |
| Word importer | Mammoth.js | ^1.12.0 |
| HTML sanitiser | sanitize-html | ^2.17.4 |
| Image CDN | Cloudinary (unsigned browser upload) | – |
| AI client | @anthropic-ai/sdk | ^0.91.1 |
| Rate limiting | Upstash Redis (@upstash/ratelimit) | ^2.0.8 |
| Deployment | Vercel (auto-deploy from GitHub main) | – |

**IMPORTANT — Next.js 16 breaking change:**  
Next.js 16 renamed `middleware.ts` to `proxy.ts`. The project uses `proxy.ts` at the repo root with an exported `proxy()` function. **This is not compatible with Next.js 14/15 middleware semantics.** Any external tooling or documentation that references `middleware.ts` does not apply here.

### A2. App Router Structure

```
app/
├── layout.tsx                — Root layout: Navbar, Footer, ThemeProvider, ChatWidget, GA4
├── page.tsx                  — Homepage (Server Component, reads CMS content from MongoDB)
├── globals.css               — Global styles (imported at layout level)
├── sitemap.ts                — Dynamic XML sitemap (MongoDB + static)
├── robots.ts                 — Robots.txt
│
├── admin/                    — Admin OS (all admin panel UI)
│   ├── layout.tsx            — Server-side JWT + admin auth guard → AdminShell
│   ├── AdminShell.tsx        — Client sidebar layout with role-filtered nav
│   ├── AdminContext.tsx      — React context: adminRole
│   ├── AdminDashboardClient.tsx
│   ├── approval-queue/       — Content approval workflow
│   ├── backups/              — CMS data backup management
│   ├── blogs/                — Blog management (list, new, edit, pending)
│   ├── categories/           — Blog category management
│   ├── change-history/       — Full change audit log
│   ├── content-pages/        — Public content page CMS
│   ├── leads/                — Lead/enquiry CRM
│   ├── media-library/        — Media asset browser
│   ├── navigation/           — Navbar and footer editor
│   ├── recycle-bin/          — Soft-deleted content recovery
│   ├── regulatory-updates/   — Regulatory update desk
│   ├── restore/              — Snapshot restore
│   ├── seo/                  — Per-page SEO editor
│   ├── settings/             — (stub)
│   ├── tools/                — Internal admin tools
│   ├── users/                — Admin user management
│   └── website/              — Homepage section editor (15+ section editors)
│
├── api/
│   ├── auth/login, logout, me, signup
│   ├── chat/                 — Anthropic AI chat widget
│   ├── leads/                — Public lead submission
│   ├── my-blogs/             — User's own blog submissions
│   ├── recommend-services/   — AI service recommendation
│   ├── regulatory-updates/   — Public regulatory updates list
│   ├── submit-blog/          — Public blog submission
│   └── admin/                — ~25 admin-gated API routes
│
├── blogs/                    — Public blog listing + [slug] detail
├── contact/                  — Contact form
├── get-started/              — Lead capture form
├── global/                   — Global markets directory + [countrySlug]
├── jobs/                     — PLACEHOLDER ONLY (see Section A5)
├── login/ + signup/          — Auth pages
├── my-blogs/                 — User's submission history (auth required)
├── submit-blog/              — User blog submission (auth required)
├── resources/                — Regulatory updates, FAQs, circular explainers, compliance calendar
├── rbi/, sebi/, irdai/, ifsca/, fema/, mca-roc/, fiu-ind-aml/, gov-lic/
│                             — Regulatory service pages (100+ individual pages)
├── services/                 — Cross-regulator service pages
├── regulatory/               — Legacy regulatory article pages
├── legal/                    — Privacy, refund, T&C
└── pricing/, proposal-template/, 19-5/
                              — Other public pages
```

---

## B. Authentication & Permissions

### B1. Two Independent User Types

The system has **two completely separate user populations** sharing a single `auth_token` JWT cookie and a single `JWT_SECRET`:

| | Public User | Admin User |
|---|---|---|
| **Model** | `lib/models/User.ts` | `lib/models/AdminUser.ts` |
| **Collection** | `users` | `admin_users` |
| **Fields** | firstName, lastName, email, mobile, password | fullName, email, role, status, permissions, passwordHash, authProviderId, emailVerified, lastLoginAt |
| **Auth check** | JWT email → User collection | JWT email → static allowlist OR `admin_users` DB lookup |
| **Roles** | None (flat) | 9 roles (see below) |
| **Permissions** | None | 20 granular permissions |

### B2. JWT Authentication Flow

1. `POST /api/auth/login` — validates credentials against `User` collection; issues `auth_token` JWT (7-day expiry, httpOnly cookie, sameSite: lax, secure in prod).
2. `GET /api/auth/me` — decodes JWT, checks if email is admin, returns `{ user: { id, email, firstName, lastName, isAdmin } }`.
3. `proxy.ts` (Edge layer) — checks for the presence of `auth_token` cookie on `/admin/*` paths; redirects to `/login` if absent (cookie presence only — no JWT verification at this layer).
4. `app/admin/layout.tsx` (Node.js Server Component) — verifies JWT signature + checks `ADMIN_EMAIL_ALLOWLIST` or active `admin_users` DB record; redirects to `/login` if any check fails.
5. API routes — call `requireAdmin(req)` or `requirePermission(req, 'permission_name')` guards.

**Critical gap:** The same `JWT_SECRET` is used for both public user tokens and admin tokens. Compromising one public user's JWT session does not grant admin access (admin check is by email allowlist/DB), but rotating the JWT secret forces all sessions to expire.

### B3. Admin Roles

```typescript
type AdminRole =
  | 'super_admin'         // full access — publish, users, delete, purge, backups
  | 'website_editor'      // edit website sections → approval required to publish
  | 'content_writer'      // create/edit blogs & content drafts → approval required
  | 'compliance_reviewer' // approve / reject / publish content and blogs
  | 'seo_manager'         // SEO fields only
  | 'admin_viewer'        // read-only access to admin panel
  // Legacy (preserved for backward compatibility):
  | 'admin'               // near super_admin except cannot manage_users
  | 'editor'              // blog/content edit + submit, no publish/delete
  | 'reviewer'            // approve/publish/reject blogs and content
```

### B4. Permissions (20 granular)

`manage_blogs`, `create_blog`, `edit_blog`, `approve_blog`, `publish_blog`, `reject_blog`, `archive_blog`, `delete_blog`, `manage_categories`, `manage_media`, `manage_users`, `manage_content`, `publish_content`, `manage_navigation`, `delete_content`, `purge_content`, `manage_seo`, `manage_backups`, `manage_leads`, `view_admin`.

Permissions are stored explicitly on each `AdminUser` record. They default to `ROLE_DEFAULT_PERMISSIONS[role]` at creation time but can be widened or narrowed per-account.

### B5. Static Admin Allowlist (Seed Data)

Three hard-coded `super_admin` emails exist in `lib/admin/seedData.ts`:
- `estabizz@gmail.com`
- `info@estabizz.com`
- `universetcenter@gmail.com`

These bypass the DB lookup entirely and are treated as always-active super admins. This is a **security risk** — if any of these email accounts are compromised, the attacker bypasses MongoDB `status: 'active'` checks.

### B6. Route Protection Summary

| Layer | Mechanism | Runtime |
|---|---|---|
| `proxy.ts` | Cookie presence check on `/admin/*` | Edge |
| `app/admin/layout.tsx` | JWT verify + email allowlist + DB lookup | Node.js Server Component |
| Admin API routes | `requireAdmin()` or `requirePermission()` | Node.js API Route |
| Public API routes | JWT session via `getSessionEmail()` | Node.js API Route |
| Public pages | No protection (open to all) | – |

**No global middleware for public routes.** There is no centralized rate limiting at the proxy layer for public routes — only for specific API endpoints (`/api/auth/login`, `/api/chat`) via Upstash Redis.

---

## C. Database

### C1. Connection

Single MongoDB Atlas cluster. Connection managed via `lib/db.ts` — global Mongoose connection cache (`global.mongoose`) prevents connection exhaustion across serverless warm starts.

**Environment:** `MONGODB_URI=mongodb+srv://...estabizzapp.f6ajilb.mongodb.net/estabizz`

**Database name:** `estabizz`

### C2. Mongoose Models

| Model | Collection | Purpose |
|---|---|---|
| `User` | `users` | Public registered users (blog submission, my-blogs) |
| `AdminUser` | `admin_users` | Admin panel users with roles and permissions |
| `Blog` | `blogs` | All blog posts (draft → pending → published) |
| `ContentBlock` | `content_blocks` | Live CMS content (navbar, hero, footer, sections, etc.) |
| `ContentVersion` | `content_versions` | Immutable history snapshots of every content save |
| `ContentAudit` | `content_audit` | Accountability trail (who did what, password-confirmed purges) |
| `MediaAsset` | `media_assets` | Cloudinary image metadata + MongoDB text search index |
| `Lead` | `leads` | Sales leads from contact / get-started / global market pages |
| `PublicContentPage` | `public_content_pages` | CMS-managed public service/regulatory pages |
| `RegulatoryUpdate` | `regulatory_updates` | Regulatory update desk content (draft → published) |
| `BackupSnapshot` | `backup_snapshots` | Backup run metadata; `payload` field excluded from list queries |
| `RegulatoryUpdateAudit` | *(model exists)* | Audit trail for regulatory updates |

### C3. Key Data Relationships

```
User ──────────────── submits ──────────────► Blog (isUserSubmitted=true)
AdminUser ─────────── authors / reviews ────► Blog (reviewedBy field)
AdminUser ─────────── edits ────────────────► ContentBlock → ContentVersion
                                              ↓ logs ↓
                                              ContentAudit
AdminUser ─────────── uploads ──────────────► MediaAsset (Cloudinary)
Lead ───────────────── from ─────────────────► contact / get-started / global market pages
PublicContentPage ──── pending revision ─────► hasPendingChanges / pendingRevision
RegulatoryUpdate ──── same pattern ─────────► hasPendingChanges / pendingRevision
BackupSnapshot ─────── payload ─────────────► all CMS collections serialised at backup time
```

**Jobs-critical gap:** There is **no Candidate model**, **no Job model**, **no Application model**, and **no Recruiter model** in the current system. The public `User` model has no roles, no profile fields, no CV/resume reference, and no job-specific fields.

### C4. MongoDB Text Search Indexes

| Collection | Indexed Fields |
|---|---|
| `media_assets` | title, fileName, altText, caption, tags |
| `public_content_pages` | title, fullPath, summary, category, serviceType |
| `regulatory_updates` | title, summary, sourceTitle, tags |

No full-text search for blogs (blog search is client-side in the navbar).

---

## D. Admin Panel

### D1. Structure

The admin panel is a fixed-layout client shell (`AdminShell.tsx`) rendered inside `app/admin/layout.tsx`. It uses a dark sidebar with 19 nav items and role-based visibility filtering.

**Navigation items (full access):**
Dashboard · Approval Queue · Change History · Restore · Users & Roles · Website Editor · Content Pages · Page SEO · Regulatory Updates · Leads · All Blogs · New Blog · Pending Review · Categories · Media Library · Recycle Bin · Backups · Navigation · Internal Tools

**Content Writer view (restricted):**
All Blogs · New Blog · Pending Review · Categories · Media Library

### D2. CMS Workflow

```
Edit → Save Draft → Submit for Approval → Reviewer Approves/Rejects → Published
```

- **`super_admin` / `admin`:** Changes publish instantly (bypass approval).
- **All other roles:** Changes go to `pending_approval` status; a reviewer must approve before publishing.
- **Recycle Bin:** Soft-delete (`status: 'deleted'`). Permanent purge requires admin password confirmation + writes to `ContentAudit`.
- **Backups:** Manual or auto CMS snapshots (JSON payload). Can target GitHub or local storage.
- **Restore:** Restores a named snapshot back to live ContentBlock. Versioned.

### D3. Jobs Integration with Admin

The admin panel can be extended for Jobs by:
- Adding a "Jobs" section to the sidebar in `AdminShell.tsx` — a new group of nav items.
- Creating new admin pages under `app/admin/jobs/` following the existing page/client component pattern.
- Using `requirePermission(req, 'manage_jobs')` (new permission key to be added to `AdminPermission` type).
- New jobs roles (`recruiter`, `hiring_manager`, `jobs_admin`) should extend the existing `AdminRole` type.

**Do not** merge jobs admin into the existing CMS workflow. Jobs content (postings, candidates, applications) must be separate from content CMS because the lifecycle, data model, and access patterns are fundamentally different.

---

## E. Frontend

### E1. Root Layout

`app/layout.tsx` wraps every public and admin page with:
- `ThemeProvider` (dark/light via next-themes, class strategy)
- `LiveBackground` — animated CSS background (client component)
- `ReadingProgress` — scroll progress bar
- `Navbar` + `Footer` (CMS-driven content)
- `ScrollToTop` + `ChatWidget` + `ContentProtection` (right-click disable)
- Google Analytics GA4 (`G-HHLKJM5Q87`) via script tags

**Admin routes** replace this layout entirely — `app/admin/layout.tsx` renders `AdminShell` which covers the full viewport (z-index: 2000, fixed inset-0). The public Navbar and Footer are NOT rendered in admin.

### E2. Reusable Components

| Component | Location | Reusable for Jobs? |
|---|---|---|
| `Navbar` | `components/layout/Navbar.tsx` | Yes — Jobs entry point already injected |
| `Footer` | `components/layout/Footer.tsx` | Yes |
| `ThemeProvider` / `ThemeToggle` | `components/theme/` | Yes |
| `BlogCard` | `components/blog/BlogCard.tsx` | Partial — adapt for JobCard |
| `FAQAccordion` | `components/FAQAccordion.tsx` | Yes |
| `ServicePageLayout` | `components/templates/ServicePageLayout.tsx` | Yes — for Jobs marketing pages |
| `EstabizzSelect` | `components/ui/EstabizzSelect.tsx` | Yes — for form selects |
| `ChatWidget` | `components/ui/ChatWidget.tsx` | Yes — could extend for Jobs queries |
| `ContentProtection` | `components/ui/ContentProtection.tsx` | Yes |
| `AdminShell` | `app/admin/AdminShell.tsx` | Yes — extend for Jobs admin sidebar |
| `CloudinaryUploader` | `app/admin/blogs/_components/CloudinaryUploader.tsx` | Not for CVs — needs private storage |
| `RichContentEditor` (TipTap) | `app/admin/blogs/_components/RichContentEditor.tsx` | Yes — for job description editing |

### E3. Design System

- **Colours:** Estabizz brand colours are inline Tailwind values: primary blue `#1677f2`, dark navy `#0a1628`, secondary teal `#0077B6`, success green `#10b981`. No Tailwind config tokens defined — colours are hard-coded in JSX.
- **Typography:** System font stack (antialiased). No custom font loaded via next/font. Font sizes are explicit pixel values (`text-[13px]`, `text-[36px]` etc.) not Tailwind semantic scales.
- **Border radius:** Consistently `rounded-xl` (12px) for cards/buttons, `rounded-full` for badges.
- **Dark mode:** Class-based (`dark:*` Tailwind variants). ThemeToggle writes `class="dark"` on `<html>`.
- **No component library:** No shadcn/ui, no Radix, no Headless UI. All components are custom.

### E4. Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: { extend: { keyframes: { shimmer: ... }, animation: { shimmer: ... } } },
  plugins: [],
};
```

Very minimal — no custom colour tokens, no extended spacing, no custom breakpoints. The `shimmer` animation is the only extension.

**Note:** Tailwind CSS runs as a standalone CLI process (`npx tailwindcss ... --watch`), not via PostCSS in the webpack/turbopack pipeline. Output is written to `public/tailwind.css` and served as a static file via `<link rel="stylesheet" href="/tailwind.css" />` in `app/layout.tsx`.

---

## F. Infrastructure

### F1. Deployment

| Aspect | Details |
|---|---|
| Platform | Vercel |
| Build command | `npx tailwindcss -i ./app/globals.css -o ./public/tailwind.css && next build` |
| Framework | Next.js |
| Branch | `main` → auto-deploy |
| Domain | `www.estabizz.com` |
| Non-www redirect | `vercel.json` + `next.config.js` (308 permanent) |

No staging environment configuration found. Deployments go directly from `main` to production.

### F2. Environment Variables

**Confirmed in `.env.local`:**

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT signing secret (shared by all auth) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |
| `NEXT_PUBLIC_BASE_URL` | Base URL (localhost:3000 in dev) |
| `NODE_ENV` | `development` |

**Required in production (from code analysis — not in .env.local):**

| Variable | Required By |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Rate limiting (`lib/security/rateLimit.ts`) |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting |
| `ANTHROPIC_API_KEY` | AI chat widget + `lib/anthropic.ts` |

**Legacy variables referenced in docs/code but not in current .env.local:** Firebase (`NEXT_PUBLIC_FIREBASE_*`), Cloudinary API secret (not used — unsigned upload only).

### F3. Image / File Storage

- **Mechanism:** Browser-to-Cloudinary direct upload (unsigned preset `estabizz_blog`).
- **Client:** `CloudinaryUploader.tsx` — NEXT_PUBLIC env vars only, no API secret.
- **Server-side:** No server-side Cloudinary SDK usage. No signed uploads.
- **Scope:** Currently images only (blogs, media library). 10 MB max.
- **Security:** The upload preset is unsigned and public-facing. Anyone with the cloud name + preset name can upload images to the Cloudinary account. There is no server-side validation that the file was uploaded by an authenticated user.
- **Images config:** `next.config.js` sets `images.unoptimized: true` — Next.js image optimisation is disabled. Images are served directly from Cloudinary's CDN with Cloudinary's own transformations.

### F4. Rate Limiting

Upstash Redis sliding-window rate limiting on:
- `POST /api/auth/login`: 5/IP/15min + 10/identifier(hashed)/30min
- `POST /api/chat`: 10/IP/10min (fail-closed)

No rate limiting on: `/api/leads`, `/api/submit-blog`, `/api/signup`, or any admin routes.

### F5. Email / Notifications

**There is no email system.** No SMTP, no Resend, no SendGrid, no Nodemailer, no SES integration anywhere in the codebase. Lead submissions save to MongoDB only. No confirmation emails are sent to enquirers.

**Critical gap for Jobs:** Candidate registration, application updates, interview scheduling, and recruiter notifications all require email. This must be built from scratch.

### F6. Analytics

Google Analytics 4 (`G-HHLKJM5Q87`) is loaded via `<script>` tags in `app/layout.tsx`. No server-side analytics, no custom events beyond the default GA4 page view tracking.

### F7. Search

- **Frontend (Navbar):** Client-side keyword search over a hard-coded `linkMap` (200+ service labels → URLs) + `staticSearchLinks`. Purely in-memory; no API call.
- **Backend (MongoDB):** Text indexes on `media_assets`, `public_content_pages`, `regulatory_updates`. No full-text blog search endpoint exposed publicly.
- **No dedicated search service** (no Elasticsearch, no Algolia, no Typesense).

---

## G. Jobs Integration Points

### G1. Existing /jobs Route

`app/jobs/page.tsx` — exists as a static "Coming Soon" placeholder page. It is:
- A pure Server Component with no dynamic data fetching.
- Marked `robots: { index: false, follow: true }` — deliberately not indexed.
- Contains only a mailto CTA and a "Back to Home" link.
- **Zero shared infrastructure with the rest of the app** — it is a dead-end stub.

### G2. Navbar Integration

The Navbar (`components/layout/Navbar.tsx`) already injects a `Jobs` link programmatically:

```typescript
// Always inject Jobs before Blogs (Blogs stays last), regardless of CMS state
const quickLinks = (() => {
    if (baseLinks.some(l => l.href === '/jobs')) return baseLinks;
    const idx = baseLinks.findIndex(l => l.href === '/blogs');
    const result = [...baseLinks];
    result.splice(idx >= 0 ? idx : result.length, 0, { label: 'Jobs', href: '/jobs', icon: '💼', newTab: false });
    return result;
})();
```

The `/jobs` link is already in the Navbar. No Navbar changes are needed to surface Jobs — the stub page just needs to be replaced with the real platform.

### G3. Authentication Integration

The existing `User` model and `auth_token` JWT can be reused as the base identity layer for candidates. Key considerations:
- The `User` model has no `role` field. Candidates, recruiters, and employers will need role discrimination.
- Options: (a) add a `role` field to `User`, or (b) create a separate `Candidate` model that references `User._id`.
- **Recommendation:** Create a separate `Candidate` Prisma model in PostgreSQL that stores a `mongoUserId` reference to the existing `User` record in MongoDB. This avoids modifying the existing `User` model and keeps the two systems loosely coupled.

### G4. Admin Panel Integration

New admin sections for Jobs should be added under `app/admin/jobs/` following the existing `page.tsx` + `*Client.tsx` pattern. The `AdminShell.tsx` sidebar nav list must be extended with a Jobs section. New `AdminPermission` values (`manage_jobs`, `view_candidates`, `manage_applications`, etc.) must be added to `lib/admin/types.ts`.

**Approval workflow:** The existing `pending_approval → approved/rejected` pattern from the CMS can be reused for job posting approval. Job listings should require `compliance_reviewer` or `jobs_admin` approval before going live.

### G5. Lead System

The existing `Lead` model tracks enquiries from contact forms. Job applications are a superset of a lead. The two should **not** be merged — the `Lead` collection is for sales enquiries; applications are a structured recruitment workflow object. Maintain the separation.

### G6. SEO Integration

`buildPageMetadata()` in `lib/seo/pageMetadata.ts` is a generic helper that accepts any `SeoContent` object. Job listing pages, candidate pages, and the Jobs hub can use this helper. The dynamic `sitemap.ts` will need to include job listing URLs once the Jobs platform is live.

### G7. Cloudinary / Media

Cloudinary is fine for Jobs marketing images (banners, team photos). For **resumes and candidate documents**, Cloudinary is not appropriate:
- Cloudinary unsigned upload is public — anyone with the preset can upload files.
- PDFs served from Cloudinary are publicly accessible by URL with no auth.
- Candidate CVs are personally identifiable data (PII) requiring access controls.

**Recommendation:** Use a separate private object storage (AWS S3 with presigned URLs, or Cloudflare R2) for all Jobs document storage. Do not extend the existing Cloudinary setup.

### G8. AI / Anthropic Integration

`lib/anthropic.ts` provides a singleton Anthropic SDK client. The existing chat widget uses `claude-haiku-4-5-20251001` with a hardcoded system prompt. For Jobs AI features (resume parsing, candidate scoring), a separate AI service layer is needed — do not extend the chat endpoint.

---

## H. Risks

### H1. Security Risks

| Risk | Severity | Details |
|---|---|---|
| Shared JWT secret | High | `JWT_SECRET` is shared between public user sessions and admin sessions. A brute-forced or leaked public user token cannot grant admin access (email allowlist check), but rotating the secret invalidates all sessions simultaneously. |
| Static admin allowlist | High | 3 email addresses are permanently super_admin via hard-coded allowlist in `seedData.ts`. These bypass the `status: 'active'` check in MongoDB. If these email accounts are compromised (e.g., via Google account takeover), the attacker has full admin access with no DB-level way to revoke. |
| Unsigned Cloudinary upload | Medium | The upload preset `estabizz_blog` is unsigned and publicly known (exposed in `NEXT_PUBLIC_*` env vars). Anyone can upload files to the Estabizz Cloudinary account. For blog images this is an acceptable risk; for candidate CVs it is not. |
| No email system | High | Candidate registration will require email verification to prevent spam registrations. Without an email system this cannot be implemented. |
| No rate limiting on lead/signup APIs | Medium | `/api/leads`, `/api/submit-blog`, `/api/signup` have no rate limiting. Can be abused for spam. Jobs must add rate limiting to all candidate-facing endpoints. |
| No test suite | High | Zero automated tests. Any change to shared auth/permission code can silently break the admin panel or public auth. |
| No staging environment | Medium | All merges to `main` auto-deploy to production. There is no safety net for testing Jobs features before they are live. |
| Candidate PII with no data handling | Critical | Jobs will process CVs, contact details, work history — all legally classified as sensitive personal data. There is no existing data handling or privacy framework in place for this type of data. |

### H2. Architectural Risks for Jobs

| Risk | Details |
|---|---|
| MongoDB for Jobs | MongoDB is flexible but wrong for Jobs transactional data. Candidate applications, interview stages, pipeline states, and scoring require relational integrity (foreign keys, transactions). Attempting to use MongoDB for Jobs will create data consistency problems. |
| Single `JWT_SECRET` | If Jobs introduces a new user type (employers in v2), the single-secret JWT system becomes harder to manage. Consider namespace prefixing tokens (e.g., `type: 'candidate'`) in the JWT payload. |
| No background job infrastructure | AI resume parsing, email sending, and matching computations cannot run synchronously in Next.js API routes (Vercel has a 60-second function timeout). A queue (Redis Bull, AWS SQS, or Cloudflare Queues) is mandatory. |
| Upstash Redis already in use | The existing Upstash Redis instance is used for rate limiting only. If Jobs also uses Redis for queues and caching, all consumers must share one instance (Upstash serverless model). This is fine architecturally but must be budgeted. |
| Python FastAPI microservice | Introduces a separate service that must be deployed, monitored, and version-controlled independently from the Next.js app. Adds operational complexity. The Vercel deployment will not host the FastAPI service — it needs its own infrastructure (Railway, Fly.io, or a container service). |
| No GitHub Actions / CI | No automated testing or deployment gates. Adding Jobs without CI means any breaking change goes straight to production. Setting up CI is Phase 0 work. |
| `images.unoptimized: true` | Disables Next.js `<Image>` optimisation. Fine for Cloudinary-hosted images (Cloudinary handles transforms), but if Jobs uses a different image host (e.g., S3 presigned URLs), images will not be optimised. |
| Navbar `linkMap` is hard-coded | The Navbar search `linkMap` is a 200+ entry static object in `Navbar.tsx`. Jobs search (job listings, candidate portal, apply pages) must be added here manually. Consider extracting to a config file. |
| No `/careers` route exists | The brief mentions Estabizz Careers as a V1 component. There is no `/careers` route, no careers-related component, and no data model. Everything is greenfield. |

### H3. Data Leakage Risks

- The `/api/auth/me` endpoint returns `isAdmin: true/false` in the response body. If Jobs adds new user types, the `isAdmin` flag alone is insufficient for frontend role-gating.
- The `User` model stores password hashes with no `select: false`. Queries that accidentally include `password` in results would leak bcrypt hashes. (Admin model correctly uses `select: false` on `passwordHash`.)
- Candidate CVs containing PII must never be stored in MongoDB or served via unsigned Cloudinary URLs.

### H4. Scalability Risks

- MongoDB Atlas free/M0 tier has strict connection limits. Adding Jobs database queries on top of existing CMS/blog queries during peak traffic will require upgrading the Atlas cluster.
- The AI matching engine (Python FastAPI + pgvector) will likely be the highest-resource component. It must be sized independently from the Next.js/Vercel deployment.
- Vercel serverless functions have a cold start penalty and memory limits. Heavy AI or database operations should be offloaded to the FastAPI service.

---

## I. Recommended Architecture

### I1. Assessment of Proposed Stack

The proposed Jobs architecture fits well given the existing codebase. Full assessment:

| Proposed Component | Fit Assessment | Notes |
|---|---|---|
| Next.js + React + TypeScript + Tailwind | ✅ Native fit | Already the app stack. Jobs frontend integrates seamlessly. |
| MongoDB/Mongoose unchanged | ✅ Correct | CMS, blogs, leads remain on MongoDB. No migration needed. |
| PostgreSQL + Prisma | ✅ Strong fit | Correct choice for relational Jobs data (candidates, applications, pipeline). Prisma provides type-safe queries. |
| Python + FastAPI | ✅ Viable | Resume parsing and AI scoring are compute-heavy; keeping them in Python avoids pulling heavy ML libraries into the Node.js bundle. Needs its own hosting separate from Vercel. |
| pgvector | ✅ Correct | Vector search on resume embeddings co-located with the relational data. Native PostgreSQL extension — no separate vector DB needed. |
| Redis (cache + queues) | ⚠️ Extend existing | Upstash Redis is already used for rate limiting. Confirm the Upstash plan supports additional use cases (Bull queues, cache). Alternatively, provision a separate Redis instance for Jobs to isolate concerns. |
| Secure object storage for documents | ✅ Mandatory | AWS S3 + presigned URLs or Cloudflare R2. Do NOT use Cloudinary unsigned upload for CVs. |
| RBAC with granular permissions | ✅ Extend existing | The existing `AdminPermission` + `ROLE_DEFAULT_PERMISSIONS` pattern is solid. Add Jobs-specific permissions. |
| Audit logging | ✅ Pattern exists | `ContentAudit` + `ContentVersion` pattern is already proven. Replicate it for Jobs actions (application status changes, recruiter notes, AI score history). |
| Background queues | ✅ Needed | No queue infrastructure exists. Must be provisioned. Redis + BullMQ or Upstash QStash. |
| AI Gateway | ✅ Feasible | Anthropic SDK exists. For Jobs, build a dedicated AI service layer in FastAPI, not an extension of the existing chat endpoint. |
| Explainable AI scoring | ✅ Required | Legal and ethical requirement when AI scores influence hiring decisions. Must store scoring rationale per candidate-job pair. |
| API-first modular architecture | ✅ Fits | Next.js API routes + FastAPI service = two API layers. Ensure consistent auth token passing between layers. |

### I2. Confirmed Final Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js App (Vercel)                          │
│                                                                  │
│  /jobs/*          — Jobs portal (candidate-facing)              │
│  /admin/jobs/*    — Jobs admin panel (recruiter-facing)          │
│  /api/jobs/*      — Next.js API routes (auth, thin CRUD)         │
│                                                                  │
│  Existing: /admin/*, /api/admin/*, /blogs/*, public pages       │
└───────────┬──────────────────────────┬──────────────────────────┘
            │                          │
            ▼                          ▼
  ┌──────────────────┐       ┌─────────────────────┐
  │   MongoDB Atlas  │       │   PostgreSQL         │
  │   (unchanged)    │       │   + Prisma ORM       │
  │                  │       │   + pgvector         │
  │  CMS, Blogs,     │       │                      │
  │  Leads, Media,   │       │  Jobs, Candidates,   │
  │  AdminUsers,     │       │  Applications,       │
  │  RegUpdates      │       │  Pipeline, Scoring   │
  └──────────────────┘       └─────────────────────┘
                                        │
                             ┌──────────▼──────────┐
                             │  Python + FastAPI    │
                             │  (separate service)  │
                             │                      │
                             │  Resume parsing      │
                             │  AI scoring          │
                             │  Vector embedding    │
                             │  Matching engine     │
                             └─────────────────────┘
                                        │
                       ┌────────────────┼────────────────┐
                       ▼                ▼                 ▼
              ┌──────────────┐  ┌────────────┐  ┌────────────────┐
              │ Upstash Redis │  │  Object    │  │  Email Service │
              │ (existing +  │  │  Storage   │  │  (new — must   │
              │  extend for  │  │  S3 / R2   │  │  provision)    │
              │  Jobs cache  │  │  (private  │  │                │
              │  + queues)   │  │  CV store) │  │                │
              └──────────────┘  └────────────┘  └────────────────┘
```

---

## J. Phase 0 Recommendations (Pre-Development)

The following must be established before any feature development begins. Ordered by priority:

### J1. Critical (Block all other work)

1. **Set up a staging environment** on Vercel (a `staging` branch that auto-deploys to a separate Vercel project with its own environment variables). No Jobs development should go to production without a staging review.

2. **Configure GitHub Actions CI** — at minimum: TypeScript type-check (`tsc --noEmit`) and ESLint on every pull request. This provides the safety net missing from the codebase.

3. **Provision a private document storage bucket** (AWS S3 or Cloudflare R2) with server-side presigned URL generation. This is mandatory before any CV upload feature can be built. Define and document the access control policy.

4. **Provision an email service** (Resend or AWS SES recommended). The Jobs platform cannot function without transactional email. Define the email address schema (`jobs@estabizz.com`, `noreply@estabizz.com`) and set up SPF/DKIM/DMARC.

5. **Provision a PostgreSQL database** (Neon, Railway, Supabase, or AWS RDS). Install the `pgvector` extension. Confirm region proximity to the FastAPI service host and Vercel deployment region.

6. **Initialize Prisma** in the repository (`prisma/schema.prisma`). This does not require any schema to be defined yet — just the connection and migration tooling in place.

### J2. High Priority (Before schema design)

7. **Design the Jobs RBAC extension** — define new `AdminPermission` values for Jobs (`manage_jobs`, `view_candidates`, `manage_applications`, `view_pipeline`, `manage_recruiter_notes`, `run_ai_scoring`, `manage_job_postings`) and new roles (`recruiter`, `hiring_manager`, `jobs_super_admin`). These must be reviewed and approved before any API route is built.

8. **Resolve the JWT token typing gap** — before adding candidate-facing auth, add a `type` field to the JWT payload (`'user' | 'candidate'`) and enforce it in `requireAdmin` and `getSessionEmail` guards. This prevents a public user JWT from being used in Jobs API routes that expect a candidate context.

9. **Provision a Python + FastAPI service host** (Railway or Fly.io recommended). Define the API contract between Next.js and FastAPI (auth mechanism — service-to-service JWT or API key, request/response schema, error handling).

10. **Define PII data handling policy** — which data is collected from candidates, where it is stored, how long it is retained, who can access it, and how it is deleted on candidate request. This is required before building any candidate registration form.

### J3. Design (Inform architecture decisions)

11. **Map out the full Jobs data model** — Job, Candidate, Application, Pipeline Stage, Recruiter Note, AI Score, Skill, Resume File — as an entity-relationship diagram before writing any Prisma schema. This should be done after the architecture review with ChatGPT and Codex as described in the handover brief.

12. **Design the candidate-facing URL structure** — `/jobs`, `/jobs/[slug]`, `/jobs/apply/[slug]`, `/candidates/register`, `/candidates/dashboard`, `/candidates/applications`. Confirm there are no conflicts with existing routes.

13. **Define the AI scoring transparency model** — what fields from the resume are extracted, what weights are applied, and what human-readable explanation is stored per score. Legal review is recommended before any AI-influenced hiring decision is made.

14. **Document queue job types** — resume parse, AI score, email send, match compute — with payload schema, retry policy, and failure alerting. Define which queue backend is used (BullMQ + Upstash vs Cloudflare Queues).

### J4. Hygiene (Can be done in parallel)

15. **Secure the static admin allowlist** — move `seedAdminUsers` entries to MongoDB and remove the hard-coded email bypass in `seedData.ts`. Replace with a database-only lookup so account suspension actually works for all admin accounts.

16. **Add `select: false` to `User.password`** — the public User model does not protect the password hash from accidental projection. This should be fixed before the User model is extended for Jobs.

17. **Add rate limiting to `/api/leads` and `/api/signup`** — these endpoints have no protection. Jobs will add high-volume candidate-facing endpoints; establishing rate limiting discipline now prevents abuse.

18. **Upgrade Cloudinary upload preset to signed** — or at minimum add server-side upload validation. This is a medium-term security hardening item, not a blocker for Jobs Phase 0.

---

## Appendix: Files Inspected

| File | Purpose |
|---|---|
| `package.json` | Dependencies, scripts, Node.js engine |
| `next.config.js` | Image config, redirects, cache headers |
| `vercel.json` | Vercel deployment config |
| `tailwind.config.js` | Tailwind config |
| `tsconfig.json` | TypeScript config |
| `.env.local` | Environment variables |
| `.gitignore` | Git ignore rules |
| `proxy.ts` | Edge proxy (Next.js 16 routing + admin guard) |
| `app/layout.tsx` | Root layout |
| `app/jobs/page.tsx` | Jobs placeholder page |
| `app/sitemap.ts` | Dynamic sitemap |
| `app/admin/layout.tsx` | Admin auth guard (Server Component) |
| `app/admin/AdminShell.tsx` | Admin sidebar layout |
| `app/admin/AdminContext.tsx` | Admin role context |
| `app/api/auth/login/route.ts` | Login API |
| `app/api/auth/me/route.ts` | Session check API |
| `app/api/chat/route.ts` | Anthropic chat API |
| `app/admin/blogs/_components/CloudinaryUploader.tsx` | Cloudinary upload component |
| `components/layout/Navbar.tsx` | Full Navbar with Jobs injection |
| `lib/db.ts` | MongoDB connection |
| `lib/auth/session.ts` | Session helpers |
| `lib/admin/types.ts` | Roles, permissions, AdminUser interface |
| `lib/admin/seedData.ts` | Static admin allowlist |
| `lib/admin/requireAdmin.ts` | Admin API auth guard |
| `lib/admin/requirePermission.ts` | Permission-gated API guard |
| `lib/admin/repository.ts` | Admin user DB queries |
| `lib/anthropic.ts` | Anthropic SDK client |
| `lib/security/rateLimit.ts` | Upstash rate limiting |
| `lib/seo/pageMetadata.ts` | SEO metadata builder |
| `lib/content/getContent.ts` | CMS content reader |
| `lib/content/changeHistory.ts` | Change audit log reader |
| `lib/models/User.ts` | Public user model |
| `lib/models/AdminUser.ts` | Admin user model |
| `lib/models/Blog.ts` | Blog model |
| `lib/models/ContentBlock.ts` | CMS live content model |
| `lib/models/ContentVersion.ts` | CMS version history model |
| `lib/models/ContentAudit.ts` | CMS audit trail model |
| `lib/models/MediaAsset.ts` | Media asset model |
| `lib/models/Lead.ts` | Sales lead model |
| `lib/models/PublicContentPage.ts` | Public content page model |
| `lib/models/RegulatoryUpdate.ts` | Regulatory update model |
| `lib/models/BackupSnapshot.ts` | Backup snapshot model |
| `docs/architecture/ESTABIZZ_TECHNICAL_ARCHITECTURE.md` | Existing architecture doc |
| `scripts/` (9 files) | Admin utility scripts |

> **Total files inspected:** 47 source files, 9 scripts, 1 existing architecture document.  
> **No application code was modified during this audit.**
