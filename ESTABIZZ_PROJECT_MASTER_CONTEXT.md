# Estabizz — Project Master Context

> Created: 2026-07-22 · Branch: **main** (confirmed) · Functional baseline commit: **49f7c81** · Documentation commit: **a60d5a7**
> **Start here.** This file is the single entry point for any agent or developer who is new to this project.
> Corrections applied: 2026-07-22 — commit references, pending changes status, CSS pipeline, permission gaps, TipTap warning, completion percentages.
> Documentation structure correction: 2026-07-22 — root entry points restored; supporting docs organized under docs/ subdirectories.

---

## What Is Estabizz?

Estabizz is an Indian fintech/regtech company that helps businesses navigate regulatory compliance: RBI (NBFC, payment, microfinance), SEBI (brokerage, merchant banking, PMS), IRDAI (insurance), IFSCA (GIFT City), FEMA, and MCA registrations.

The platform is a **Next.js 16 website** with a full custom Admin OS for content management, deployed on Vercel, connected to MongoDB Atlas and Cloudinary.

**Status as of 2026-07-22**: ~72% complete. Admin OS is largely functional. Public website has full service page coverage. Client portal, CRM, and AI features are not yet built.

---

## Quick Orientation

| Question | Answer |
|----------|--------|
| Framework | Next.js App Router (TypeScript) |
| Styling | Tailwind CSS standalone CLI (not PostCSS) |
| Database | MongoDB via Mongoose |
| Auth | JWT (HS256, httpOnly cookie, 7-day expiry) |
| Rich text | TipTap 3.28.0 |
| Media | Cloudinary (unsigned upload) |
| Deploy | Vercel, auto on push to `main` |
| Admin URL | `/admin` (requires JWT cookie) |
| Current branch | `main` (confirmed by git on 2026-07-22) |
| Owner email | `estabizz@gmail.com` |

---

## Instructions for Future AI Agents

**Read this section in full before making any changes.**

### 1. Check state first
Before starting any task, run `git status` and check `CMS_STATUS.md` to understand what has been done. Do not repeat work that was already committed.

### 2. Do not push. Do not deploy.
Never push to remote or trigger a Vercel deploy unless the owner explicitly asks in the current conversation. Deployments are automatic on push — so pushing is deploying.

### 3. Stop dev server before building
The `dev` script and `npm run build` both write to `.next/`. Running them simultaneously corrupts the Turbopack dev cache. Always stop the dev server before running `npm run build`.

### 4. TypeScript must be clean
Run `npx tsc --noEmit` before every commit. Fix all type errors before committing.

### 5. Do not touch secrets
Do not read, print, or echo `.env.local`. Do not expose non-`NEXT_PUBLIC_` env vars to client code. See the Security rules in `docs/operations/ESTABIZZ_AGENT_OPERATING_GUIDE.md`.

### 6. Use the permission system correctly
Every admin API that modifies data must call `requirePermission(request, 'permission_name')` — not just `requireAdmin`. The two-step pattern is: requirePermission calls requireAdmin internally. Only use `requireAdmin` for read-only admin routes.

### 7. Media upsert is idempotent
Use `MediaAsset.findOneAndUpdate({ publicId }, { $setOnInsert: doc }, { upsert: true, new: true })` for media creation. Catch E11000 errors gracefully. Do not use `MediaAsset.create()`.

### 8. HTML must be sanitized server-side
All HTML from TipTap or the CMS editor must pass through `sanitize-html` before being stored in MongoDB. Do not store raw HTML from user input.

### 9. Blog alt text is validated with htmlparser2
Do not use regex to parse HTML attributes. Use `parseDocument(html, { lowerCaseAttributeNames: true })` + `findAll` + `getAttributeValue` from `htmlparser2`/`domutils`.

### 10. Scope discipline
Work only on what was explicitly asked. Do not refactor adjacent code, add features not requested, or start the next CMS phase without explicit instructions. If you notice a bug unrelated to the current task, flag it in `CMS_STATUS.md` or spawn a task — do not fix it silently.

---

## Document Map

Three entry-point files live at the repository root:

| File | Purpose |
|------|---------|
| [AGENTS.md](AGENTS.md) | Agent discovery — read this first |
| [ESTABIZZ_PROJECT_MASTER_CONTEXT.md](ESTABIZZ_PROJECT_MASTER_CONTEXT.md) | This file — single entry point |
| [CMS_STATUS.md](CMS_STATUS.md) | Living log of completed work |

Supporting documents are organized under `docs/`:

### docs/operations/ — read before any work

| Document | When to read |
|----------|-------------|
| [ESTABIZZ_AGENT_OPERATING_GUIDE.md](docs/operations/ESTABIZZ_AGENT_OPERATING_GUIDE.md) | Always — before any work |
| [ESTABIZZ_CURRENT_COMPLETION_STATUS.md](docs/operations/ESTABIZZ_CURRENT_COMPLETION_STATUS.md) | To understand what is built vs. placeholder |
| [ESTABIZZ_TECHNICAL_DEBT_REGISTER.md](docs/operations/ESTABIZZ_TECHNICAL_DEBT_REGISTER.md) | Before starting any bug fix — check if it is a known issue |
| [ESTABIZZ_FOLDER_CLEANUP_PLAN.md](docs/operations/ESTABIZZ_FOLDER_CLEANUP_PLAN.md) | Phased, safe cleanup steps — start here for housekeeping tasks |
| [ADMIN_OS_PRODUCTION_READINESS.md](docs/operations/ADMIN_OS_PRODUCTION_READINESS.md) | Pre-deployment checklist and smoke test plan |
| [ADMIN_OS_DISASTER_RECOVERY.md](docs/operations/ADMIN_OS_DISASTER_RECOVERY.md) | Backup scope, restore procedures, recovery runbook |
| [ADMIN_OS_SEO_DEPLOYMENT_CHECKLIST.md](docs/operations/ADMIN_OS_SEO_DEPLOYMENT_CHECKLIST.md) | SEO readiness for deployment |
| [ADMIN_OS_STAGING_RELEASE_PACKAGE.md](docs/operations/ADMIN_OS_STAGING_RELEASE_PACKAGE.md) | Staging release scope and deployment checklist |

### docs/architecture/ — read when navigating the codebase

| Document | When to read |
|----------|-------------|
| [ESTABIZZ_TECHNICAL_ARCHITECTURE.md](docs/architecture/ESTABIZZ_TECHNICAL_ARCHITECTURE.md) | When working on infra, build, or auth |
| [ESTABIZZ_MODULE_INVENTORY.md](docs/architecture/ESTABIZZ_MODULE_INVENTORY.md) | When navigating the codebase |
| [ESTABIZZ_API_DATABASE_MAP.md](docs/architecture/ESTABIZZ_API_DATABASE_MAP.md) | When adding or modifying API routes or DB models |
| [ESTABIZZ_REPOSITORY_STRUCTURE_MAP.md](docs/architecture/ESTABIZZ_REPOSITORY_STRUCTURE_MAP.md) | Full annotated directory tree, redirect routes, structural observations |
| [ESTABIZZ_FILE_CLASSIFICATION_REGISTER.md](docs/architecture/ESTABIZZ_FILE_CLASSIFICATION_REGISTER.md) | Classification of every notable file (active/legacy/generated/redirect-only/etc.) |
| [ESTABIZZ_RECOMMENDED_FOLDER_STRUCTURE.md](docs/architecture/ESTABIZZ_RECOMMENDED_FOLDER_STRUCTURE.md) | Target folder structure after cleanup |

### docs/security/ — read when touching auth or permissions

| Document | When to read |
|----------|-------------|
| [ESTABIZZ_SECURITY_PERMISSION_MAP.md](docs/security/ESTABIZZ_SECURITY_PERMISSION_MAP.md) | When touching auth, permissions, or any security-sensitive code |
| [ADMIN_OS_SECURITY_MATRIX.md](docs/security/ADMIN_OS_SECURITY_MATRIX.md) | Full permission matrix and protected API summary |
| [SECURITY_INCIDENT_S2.md](docs/security/SECURITY_INCIDENT_S2.md) | Security incident record S2 |

### docs/roadmap/ — read before designing new features

| Document | When to read |
|----------|-------------|
| [ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md](docs/roadmap/ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md) | Before designing any new feature — check alignment with roadmap |
| [ESTABIZZ_NEXT_20_TASKS.md](docs/roadmap/ESTABIZZ_NEXT_20_TASKS.md) | When deciding what to work on next |

### docs/audits/ — repository audit findings

| Document | When to read |
|----------|-------------|
| [ESTABIZZ_DUPLICATE_UNUSED_FILE_REPORT.md](docs/audits/ESTABIZZ_DUPLICATE_UNUSED_FILE_REPORT.md) | Unused, legacy, generated, and redirect-only files — audit findings |

---

## Current Phase Summary

**Phase completed**: CMS Blog Editor — Word Image Import and hardening (commit `f182723`)

**What was built**:
- Full blog editor with TipTap, sticky toolbar, alt text editor, word paste cleaning
- Word `.docx` import with Cloudinary upload, media records, retry, idempotent upsert
- Alt text validation: client-side (always-on, all images) + server-side (htmlparser2)
- Admin permission system with seed user fallback
- Media upsert idempotency (`findOneAndUpdate` + `$setOnInsert` + E11000 catch)
- URL validation via `new URL()` parsing

**Commit history (two separate commits)**:
- `f182723` — functional hardening: media idempotency, URL validation, htmlparser2 server parser
- `49f7c81` — post-screenshot fixes: requirePermission seed fallback, RichContentEditor always-on alt scan, immediatelyRender: false

**Pending code changes on `main` as of 2026-07-22**: None. Both requirePermission.ts and RichContentEditor.tsx have zero uncommitted changes — confirmed by `git diff` returning empty for both files. All fixes from the current session are committed.

**Next recommended task**: See [Task 1 in ESTABIZZ_NEXT_20_TASKS.md](docs/roadmap/ESTABIZZ_NEXT_20_TASKS.md) — fix blog and leads API permission gap (TD-016).

---

## Architecture Summary

```
Public Website
  app/[service-pages]/*         ← 46 DB-first pages with hardcoded fallbacks
  app/blog/[slug]/page.tsx       ← SSG blog detail
  app/admin/                     ← Admin OS (all require auth)

Admin OS Key Modules
  /admin/website-editor          ← Homepage CMS (17 sections)
  /admin/blogs                   ← Blog CRUD + Word import
  /admin/media                   ← Media library
  /admin/content-pages           ← Content pages (46 managed, 1 with full edit lifecycle)
  /admin/regulatory-updates      ← Regulatory content desk
  /admin/users                   ← User management
  /admin/backups                 ← MongoDB backup + GitHub push

API Layer
  /api/admin/*                   ← Protected by requirePermission
  /api/auth/*                    ← Public (login/logout)
  /api/leads                     ← Public lead capture
  /api/chat                      ← AI endpoint (NO AUTH — dormant)
  /api/recommend-services        ← AI endpoint (NO AUTH — dormant)

Data Layer
  MongoDB Atlas
    admin_users     BlogPost      MediaAsset     ContentPage
    ContentBlock    ContentAudit  RegulatoryUpdate  Lead
    UserAccount     Navigation

Media
  Cloudinary (unsigned upload from browser)
  public/tailwind.css (Tailwind CLI output — not in git if generated)
```

---

## Security Summary (Key Points)

- Login endpoint (`/api/auth/login`) has **no rate limiting** — highest priority security gap
- Two public AI endpoints have no auth — **do not enable `ANTHROPIC_API_KEY`** in production until rate-limited
- Internal resource pages (`/resources/content-rebuild-command`, etc.) are publicly accessible — no auth guard
- Full security map: [ESTABIZZ_SECURITY_PERMISSION_MAP.md](docs/security/ESTABIZZ_SECURITY_PERMISSION_MAP.md)

---

## Environment Variables (Keys — not values)

| Variable | Where used |
|----------|-----------|
| `MONGODB_URI` | Server — DB connection |
| `JWT_SECRET` | Server — token signing |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Client + Server |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Client only |
| `CLOUDINARY_API_KEY` | Server only |
| `CLOUDINARY_API_SECRET` | Server only — never in browser |
| `RESEND_API_KEY` | Server — not yet wired |
| `ANTHROPIC_API_KEY` | Server — set but dormant |
| `NEXT_PUBLIC_SITE_URL` | Client + Server — canonical URL base |
| `GITHUB_TOKEN` | Server — backup push |
| `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME` | Server — backup |

Never read, print, or log the values of these variables in any tool output or file.
