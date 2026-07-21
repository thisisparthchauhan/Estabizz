# Estabizz Fintech — Project Context (for AI agents & developers)

> Read this first. It explains what the project is, how it's built, the
> conventions you MUST follow, and how to deploy. Keeping to these rules avoids
> breaking a live production site.
> codex will review your output once you done

## Start here (agent discovery order)

1. Read `AGENTS.md` (this file)
2. Read `ESTABIZZ_PROJECT_MASTER_CONTEXT.md`
3. Read `CMS_STATUS.md`
4. Open only the relevant supporting document under `docs/`

Supporting documents are organized under `docs/`:
- `docs/architecture/` — tech stack, module inventory, API/DB map, structure maps
- `docs/security/` — permission map, security matrix, incident records
- `docs/operations/` — agent guide, completion status, disaster recovery, production readiness, SEO checklist, staging package, cleanup plan, technical debt
- `docs/roadmap/` — future product roadmap, next 20 tasks
- `docs/audits/` — duplicate/unused file report

## 1. What this is

Marketing + lead-generation website for **Estabizz Fintech Private Limited**, a
regulatory advisory firm (RBI, SEBI, IRDAI, IFSCA, FEMA, MCA / GIFT City
licensing & compliance). It has:

- ~130+ public marketing/service pages
- A blog system (public + admin authoring)
- An admin panel (auth-gated)
- Lead-capture forms that save to MongoDB
- AI helpers (service recommender + chat widget) via the Anthropic SDK

Live on Vercel. Production alias: **https://estabizz-site.vercel.app**
(Custom domain `www.estabizz.com` is configured in metadata but may not be
attached in Vercel yet — see §9.)

## 2. Tech stack

- **Next.js 16.2.4** (App Router, Turbopack) — `app/` directory
- **React 18.3.1**, **TypeScript**
- **Tailwind CSS 3.4.19** — NOTE: Tailwind is run as a **separate CLI step**, not
  via PostCSS/Next integration. `app/globals.css` → compiled to
  `public/tailwind.css`. See `scripts` below.
- **MongoDB + Mongoose 9.4.1** — `lib/db.ts` (cached global connection), models in `lib/models/`
- **Auth**: JWT (`jsonwebtoken`) in an `auth_token` httpOnly cookie + `bcryptjs`
- **AI**: `@anthropic-ai/sdk` (model `claude-haiku-4-5`)
- **Sanitization**: `sanitize-html` for user-submitted blog HTML

### Scripts (`package.json`)
```
dev        → npx tailwindcss -i ./app/globals.css -o ./public/tailwind.css --watch & next dev
build      → npx tailwindcss -i ./app/globals.css -o ./public/tailwind.css && next build
start      → next start
type-check → tsc --noEmit
```
`public/tailwind.css` is a build artifact — it changes on every build; don't
hand-edit it.

## 3. Routes (top level under `app/`)

`/` (home) · `/rbi` `/sebi` `/irdai` `/ifsca` `/fema` `/services` `/regulatory`
(regulator hub pages, each with detail subpages) · `/resources` (+ sub-pages) ·
`/19-5` (a section of 21 corporate-service landing pages — **"19/5" is a TEMPORARY
placeholder name, to be renamed**) · `/blogs` · `/contact` `/get-started`
`/pricing` `/proposal-template` (conversion pages) · `/legal/*` · `/login`
`/signup` `/my-blogs` `/submit-blog` · `/admin/*` (gated) · `/api/*`

## 4. Key architecture patterns

- **Service detail pages** (`/rbi/*`, `/sebi/*`, `/ifsca/*`, `/irdai/*`,
  `/services/*`, `/fema/*`, `/legal/*`): each route is `page.tsx` (server, exports
  metadata) + `PageClient.tsx` (client) that renders the **shared
  `components/templates/ServicePageLayout.tsx`**. **Editing that one component
  restyles ~69 detail pages at once.** Article body uses global CSS classes
  defined in an inline `<style>` block inside ServicePageLayout (`.data-table`,
  `.info-box`, `.step-timeline`, `.faq-accordion`, etc.).
- **`/19-5` landing system** is data-driven: content as TS objects in
  `lib/landing/pages/*.ts`, registered in `lib/landing/index.ts`, rendered by
  `components/landing/LandingRenderer.tsx` via `app/19-5/[slug]/page.tsx`.
  Block types in `lib/landing/types.ts` (p, bullets, checks, table, callout,
  faqs, etc.).
- **Homepage** = `app/page.tsx` composing `components/home/*` sections.
- **Global animated background**: `components/ui/LiveBackground.tsx` (canvas,
  pauses when tab hidden).
- **Module-isolation gotcha**: API routes and server components run in separate
  module instances. Shared in-memory state is stored on `global.*` (see
  `lib/db.ts` mongoose cache and the blog store) — follow that pattern.

## 5. Data layer (`lib/models/`)

- **Blog.ts** — `blogs` collection (status: draft/pending_review/approved/published/…)
- **Lead.ts** — `leads` collection (contact + get-started enquiries; status new/contacted/closed)
- **User.ts**, **AdminUser.ts** — auth
- DB access: `import { connectDB } from '@/lib/db'` then use the model. Always
  wrap in try/catch; some read paths have in-memory fallbacks.

## 6. Lead capture (important business flow)

- Contact form (`app/contact/ContactClient.tsx`) and Get Started form
  (`app/get-started/GetStartedForm.tsx`) → **POST `/api/leads`** → saved to Mongo.
- Has validation, length caps, and a hidden honeypot field (`website`).
- **Email alerts**: `/api/leads` calls `notifyNewLead()` (Resend REST API),
  **gated by `RESEND_API_KEY`** — no-op until that env var is set.
- Admin views/manages leads at **`/admin/leads`** (status dropdown via
  `PATCH /api/admin/leads/[id]`, live search, CSV export).

## 7. Auth / admin

- `proxy.ts` — Next.js 16 framework convention for route middleware. Contains an
  edge-runtime cookie presence check for `/admin/*`. Its behaviour, matcher, and
  ongoing necessity require a separate dedicated audit before any rename or removal.
  Do not rename or delete it during routine cleanup.
- `app/admin/layout.tsx` — server-side gate: verifies JWT + checks
  `ADMIN_EMAIL_ALLOWLIST` (`lib/admin/seedData.ts`) and the MongoDB `admin_users`
  collection, renders `AdminShell`. This is the authoritative authentication layer.
- API routes use `lib/admin/requireAdmin.ts` → `{ ok, email } | { ok, response }`.
- Admin nav items live in `NAV_ITEMS` + `PAGE_TITLES` in `app/admin/AdminShell.tsx`
  (keep both in sync, or breadcrumbs duplicate-key).

## 8. Design system / theme (STRICT — keep consistent)

The whole site uses ONE blue theme. Do not introduce gold/cyan/green/purple as
brand accents.

- Primary blue: **`#1677f2`** (hover `#0866d9`, lighter `#3b8ef5`, label `#4f9dfb`)
- Heading indigo: **`#120b45`** (use `tracking-[-0.03em]`)
- Body text: `#475569` / `#64748b`; muted `#94a3b8`
- Badge/secondary blue: **`#0077B6`** on `bg-[#f5fbff]` `border-blue-100`
- Cards: `border-blue-100 bg-white shadow-[0_8px_30px_rgba(0,80,140,0.06)]`
  hover `-translate-y-1 hover:border-[#1677f2]/40`
- Hero radial: `bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]` + bottom fade `to-[#eaf6ff]`
- Navy CTA / footer: `from-[#0a1628] to-[#0c2040]` with `#4f9dfb` accent labels
- Amber is reserved for warnings only (`#f59e0b`); green `#10b981` only for WhatsApp/success
- Logo: `public/estabizz-logo.png` (gold "E" + navy "stabizz"), light variant
  `public/estabizz-logo-light.png` for dark backgrounds. Favicon = `app/icon.png`
  (the gold "E" mark). Contact: **+91 98256 00907**, **info@estabizz.com**,
  address in the footer. WhatsApp: `https://wa.me/919825600907`.

## 9. Environment variables (Vercel)

Set (production): `MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`,
`NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

**NOT yet set (features dormant until added):**
- `ANTHROPIC_API_KEY` → AI recommender (`/api/recommend-services`) + chat widget
  (`/api/chat`) return 500 without it.
- `RESEND_API_KEY` (+ optional `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`) → lead email alerts.
- Custom domain `www.estabizz.com` — `metadataBase` points here; OG image/canonical
  URLs only fully resolve once the domain is attached in Vercel.

## 10. Deploy workflow (CRITICAL — read before deploying)

Git-push auto-deploys get **auto-cancelled** on this Vercel plan
("Canceled from the Dashboard"). **You MUST deploy via the Vercel CLI:**

```
git add <files> && git commit -m "..." \
 && git push origin <branch> \
 && git checkout main && git merge <branch> --no-edit && git push origin main \
 && npx vercel deploy --prod --yes
```

- The Vercel CLI is already authenticated; `npx vercel deploy --prod --yes`
  builds and aliases to `estabizz-site.vercel.app`.
- Work has historically been done on branch `fix/testimonials-merge-artifact` and
  merged to `main` (the branch name is legacy; `main` is the source of truth).
- Always run `npm run build` (or `next build`) locally first — it type-checks.

## 11. Known pending items (need the owner, not code)

1. Add `ANTHROPIC_API_KEY` in Vercel (AI features)
2. Attach `www.estabizz.com` domain in Vercel
3. Add `RESEND_API_KEY` (turns on lead emails — code is ready)
4. Rename "19/5" to its real section name (navbar label + `/19-5` route + links)
5. Content: publish blog posts via `/admin`; case studies are representative samples

## 12. Conventions recap

- Server components export `metadata`; client components (`"use client"`) get
  metadata via a sibling `layout.tsx` (see `app/login/layout.tsx`).
- Internal links use `next/link`; images use `next/image`.
- Keep the blue theme; no new accent colors.
- After any change: `npm run build`, then deploy via the CLI workflow in §10.
