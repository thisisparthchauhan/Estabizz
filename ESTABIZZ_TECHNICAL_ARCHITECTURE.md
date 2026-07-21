# Estabizz — Technical Architecture

> Last verified: 2026-07-22 · Commit: f182723 · Branch: main

---

## 1. Stack Overview

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| Framework | Next.js (App Router, Turbopack) | ^16.2.4 | Core |
| UI library | React | ^18.3.1 | Core |
| Language | TypeScript | ^5.3.3 | Core |
| Styling | Tailwind CSS (standalone CLI) | ^3.4.19 | Core |
| Database | MongoDB via Mongoose | Mongoose ^9.4.1 | Core |
| Auth | JWT (jsonwebtoken) | ^9.0.3 | Core |
| Password hashing | bcryptjs | ^3.0.3 | Core |
| Rich text editor | TipTap 3.x (9 packages) | ^3.28.0 | Blog only |
| Word import | Mammoth.js | ^1.12.0 | Blog only |
| HTML sanitizer | sanitize-html | ^2.17.4 | Server-side |
| HTML parser | htmlparser2 + domutils | transitive dep | Server-side |
| Media hosting | Cloudinary (unsigned upload) | n/a | Core |
| AI SDK | @anthropic-ai/sdk | ^0.91.1 | Dormant |
| Runtime | Node.js | 22.x (engines) | Core |
| Deployment | Vercel (auto-deploy from GitHub) | — | Core |
| CSS pipeline | PostCSS + autoprefixer | — | Build |

---

## 2. Repository Layout

```
/Estabizz Legal
├── app/                    — Next.js App Router pages and API routes
│   ├── admin/              — Admin OS (all admin panel UI)
│   ├── api/                — All API route handlers
│   │   ├── admin/          — Admin-gated APIs
│   │   └── auth/           — Authentication APIs
│   ├── blogs/              — Public blog listing and detail
│   ├── [regulator]/        — RBI, SEBI, IRDAI, IFSCA, FEMA service pages
│   ├── services/           — Cross-regulator service pages
│   ├── resources/          — Regulatory updates, FAQs, circular explainers
│   ├── legal/              — Privacy policy, refund policy, T&C
│   ├── 19-5/               — Company registration landing pages
│   ├── regulatory/         — Legacy/alternate regulatory article pages
│   ├── layout.tsx          — Root layout (navbar, footer, global CSS)
│   ├── page.tsx            — Homepage
│   ├── sitemap.ts          — Dynamic sitemap (MongoDB + static)
│   └── robots.ts           — Robots.txt
├── components/             — Shared UI components
│   ├── home/               — Homepage section components (17 sections)
│   ├── layout/             — Navbar, Footer
│   ├── blog/               — BlogCard
│   ├── landing/            — LandingRenderer for 19-5 pages
│   ├── publicContent/      — PublicContentPageRenderer
│   ├── templates/          — ServicePageLayout
│   └── ui/                 — ChatWidget, LiveBackground, etc.
├── lib/                    — All server-side business logic
│   ├── admin/              — Auth guards, types, seed data, repository
│   ├── auth/               — Session utilities
│   ├── blog/               — Blog repository, types, categories, sanitizer
│   ├── content/            — CMS content repository, defaults, audit, backup
│   ├── models/             — Mongoose model definitions
│   ├── publicContent/      — CMS page repository, types, managed paths
│   ├── regulatory/         — Regulatory update repository + types
│   ├── seo/                — siteUrl, pageMetadata helpers
│   ├── landing/            — Static data for 19-5 landing pages
│   ├── db.ts               — MongoDB connection with global cache
│   └── anthropic.ts        — Anthropic SDK client (dormant)
├── scripts/                — Admin utility scripts (run manually)
├── public/                 — Static assets (logos, images, compiled CSS)
├── next.config.js          — Cache headers, image config
├── vercel.json             — Build command, framework declaration
├── tsconfig.json           — Strict mode, bundler resolution, @/* alias
└── package.json            — All dependencies and scripts
```

---

## 3. Key Architecture Patterns

### 3.1 App Router + Server Components
All pages use the Next.js App Router. Server Components fetch from MongoDB directly. Client Components (`"use client"`) handle interactivity. The pattern is:
```
page.tsx (Server Component — auth guard, data fetch)
  └── XxxClient.tsx ("use client" — interactive UI)
```

### 3.2 Public CMS Pattern (DB-first with tombstone protection)
```
Request for /rbi/nbfc-registration-in-india
  → Check MongoDB for PublicContentPage with fullPath = that path
  → If published record exists: render from DB fields
  → If record exists but NOT published: return notFound() [TOMBSTONE — no fallback]
  → If no record at all: render hardcoded page component (PageClient.tsx fallback)
```
**Critical rule**: once a path has ANY DB record (even deleted), the hardcoded fallback is permanently blocked. This prevents CMS-deleted content from reappearing publicly.

Implemented in: `lib/publicContent/repository.ts` + each `page.tsx` for the 46 managed paths.

### 3.3 Content Block CMS (Homepage)
```
Admin edits homepage section
  → POST /api/admin/content/save
  → ContentBlock saved in MongoDB (keyed by section e.g. "homepage.hero")
  → ContentVersion created for audit/restore
  → ContentAudit recorded
  → getContent('homepage.hero') on next page load returns DB value
  → Falls back to hardcoded defaults if DB unavailable
```

### 3.4 Authentication Flow
```
POST /api/auth/login
  → bcrypt verify against User model passwordHash
  → JWT signed (HS256, JWT_SECRET, 7d expiry)
  → Set auth_token cookie (httpOnly, sameSite: lax, secure in prod)

Admin API call
  → requireAdmin(req): verify JWT → check ADMIN_EMAIL_ALLOWLIST → fallback to admin_users MongoDB
  → requirePermission(req, 'manage_media'): requireAdmin → getAdminUserByEmail → seed fallback → permission check
```

### 3.5 Tailwind CSS Compilation
Tailwind uses the **standalone CLI** (not PostCSS plugin), pre-compiled to `public/tailwind.css`. The dev script runs `tailwindcss --watch & next dev` in parallel. Build runs `tailwindcss && next build` sequentially. **Critical**: never run `npm run build` while dev server is active — they both write to `public/tailwind.css` and `.next/`.

### 3.6 Media (Cloudinary Unsigned Upload)
```
Browser picks file
  → fetch POST to https://api.cloudinary.com/v1_1/{CLOUD}/image/upload
    with upload_preset (unsigned)
  → Cloudinary returns {secure_url, public_id, ...}
  → POST /api/admin/media with the metadata
  → MediaAsset saved to MongoDB (idempotent upsert on publicId)
  → secure_url inserted into editor / content
```
Cloudinary API secret is never exposed to the browser. Only `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` are public.

---

## 4. Environment Variables

| Variable | Used by | Exposure | Required |
|----------|---------|----------|----------|
| `MONGODB_URI` | `lib/db.ts` | Server only | Yes |
| `JWT_SECRET` | `requireAdmin.ts`, login | Server only | Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Browser upload | Public | Yes |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Browser upload | Public | Yes |
| `NEXT_PUBLIC_SITE_URL` | sitemap, robots | Public | No (defaults to estabizz.com) |
| `GITHUB_BACKUP_TOKEN` | Backup API | Server only | No |
| `GITHUB_BACKUP_OWNER` | Backup API | Server only | No |
| `GITHUB_BACKUP_REPO` | Backup API | Server only | No |
| `GITHUB_BACKUP_BRANCH` | Backup API | Server only | No |
| `GITHUB_BACKUP_PATH` | Backup API | Server only | No |
| `ANTHROPIC_API_KEY` | `lib/anthropic.ts` | Server only | No (feature dormant) |
| `RESEND_API_KEY` | Not yet wired | Server only | No (feature dormant) |

> Firebase and legacy Cloudinary API key/secret env vars may exist in `.env.local` as dead entries from a prior stack. They are not read by any current code.

---

## 5. Build and Deployment

- **Dev**: `npx tailwindcss --watch & next dev` (Turbopack)
- **Build**: `npx tailwindcss && next build` (Turbopack production)
- **Deploy**: Vercel auto-deploys on push to GitHub main branch
- **Generated files** that drift: `next-env.d.ts`, `public/tailwind.css` — restore with `git restore` after builds

---

## 6. Dependency Classification

| Package | Classification |
|---------|---------------|
| next, react, react-dom | Core — used everywhere |
| mongoose | Core — all DB access |
| jsonwebtoken | Core — auth |
| bcryptjs | Core — password hashing, security-sensitive |
| sanitize-html | Core — XSS defense, security-sensitive |
| tailwindcss, postcss, autoprefixer | Core — styling build |
| @tiptap/* (9 packages) | Single-module — blog editor only |
| mammoth | Single-module — blog Word import only |
| @anthropic-ai/sdk | Dormant — lib/anthropic.ts exists, no active route uses it |
| htmlparser2, domutils, domhandler | Transitive — pulled in by sanitize-html, used directly in blog save route |
| @types/bcryptjs, @types/jsonwebtoken, etc. | Dev — TypeScript types |
| eslint, eslint-config-next | Dev — linting |
