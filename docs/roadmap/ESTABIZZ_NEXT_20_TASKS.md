# Estabizz — Next 20 Development Tasks

> Last updated: 2026-07-24 · Branch: **feat/global-markets-v2** (local) · Functional baseline commit: **49f7c81** · Dark mode: **completed locally — Phase 31, 4 commits**
> All tasks are locally scoped. Do not push/deploy without owner approval.
> Roadmap sequence corrected 2026-07-22 — tasks reordered to prioritise security and content integrity before new features.

---

## Priority 0 — Stabilisation (Tasks 1–6)

### ~~Task 1 — Fix blog and leads API permission gap (TD-016)~~ ✅ COMPLETED 2026-07-22

| Field | Value |
|-------|-------|
| Objective | Replace `requireAdmin` with `requirePermission` on four routes — completed. |
| Resolution | `POST /api/admin/blogs/save`: `create_blog` (new) / `edit_blog` (existing) + `publish_blog` (publish). `DELETE /api/admin/blogs/[id]`: `delete_blog`. `PATCH /api/admin/blogs/[id]/status`: per-status mapping. `PATCH /api/admin/leads/[id]`: new `manage_leads` permission. `manage_leads` added to `super_admin`/`admin` role defaults and Users UI label map. All `requireAdmin`-only handlers eliminated from `app/api/admin/**`. TypeScript clean. Build clean (134 pages). |
| Files changed | `lib/admin/types.ts`, `app/api/admin/blogs/save/route.ts`, `app/api/admin/blogs/[id]/route.ts`, `app/api/admin/blogs/[id]/status/route.ts`, `app/api/admin/leads/[id]/route.ts`, `app/admin/users/UsersClient.tsx` |
| Commit | pending (Admin Security: enforce granular blog and lead permissions) |
| QA | Antigravity pending |
| Deploy required | Yes — after QA pass |

---

### ~~Task 2 — Protect internal resource pages (TD-009)~~ ✅ COMPLETED 2026-07-22

| Field | Value |
|-------|-------|
| Objective | Move four internal tooling pages to Admin OS and remove all public access — completed. |
| Resolution | Pages moved to `/admin/tools/**` — protected by `app/admin/layout.tsx` JWT guard via layout inheritance. Old public routes (`/resources/content-rebuild-command`, `/resources/regulatory-update-email-template`, `/resources/service-page-content-framework`, `/proposal-template`) replaced with `notFound()`. All public navigation references removed (Navbar redirect map, Navbar search overlay, resources page cards, footer defaults, resourcesDefaults, regulatory-updates link). "Internal Tools" entry added to Admin OS sidebar (`AdminShell.tsx`). `app/admin/tools/page.tsx` index created with 4 tool cards. TypeScript clean. Build clean. |
| Commits | `02d77f6` (interim auth-redirect guard), current commit (final architecture migration) |
| QA | Manual |
| Deploy required | Yes |

---

### ~~Task 3 — Add login and public AI endpoint rate limiting~~ — COMPLETED 2026-07-22

| Field | Value |
|-------|-------|
| Objective | ~~Protect `POST /api/auth/login` from brute-force and credential stuffing. Limit to 5 attempts per IP per 15 minutes. Also rate-limit `/api/chat` and `/api/recommend-services` before enabling `ANTHROPIC_API_KEY`.~~ |
| Outcome | Login: 5/IP/15 min + 10/hashedId/30 min, fail-open. Chat: 10/IP/10 min, fail-closed. Recommend: 5/IP/10 min, fail-closed. Upstash Redis in prod, in-memory fallback in dev. 503 gate on AI routes when API key absent. `lib/security/rateLimit.ts` added. |
| Files changed | `app/api/auth/login/route.ts`, `app/api/chat/route.ts`, `app/api/recommend-services/route.ts`, `lib/security/rateLimit.ts`, `package.json` |
| Resolved TDs | TD-001, TD-002 |
| Commit | Security: add login and public AI rate limiting |
| Agent | Claude Code |
| Status | ✅ Complete — local only, not deployed |

---

### ~~Task 3C — Dark mode system~~ ✅ COMPLETED 2026-07-24

| Field | Value |
|-------|-------|
| Outcome | Site-wide dark mode using `next-themes` v0.4.6. `ThemeProvider` + `ThemeToggle` (Light/Dark/System). CSS custom-property token system (17 semantic roles). Full coverage: Navbar, Footer, HeroSection, ServicePageLayout, Contact, Blog detail, EstabizzSelect, AdminShell, AdminDashboard, BlogEditor. Tailwind `darkMode: "class"`. SSR-safe (suppressHydrationWarning, mounted guard, disableTransitionOnChange). Browser integration (color-scheme, theme-color meta). Blog/article content overrides via globals.css for inline-styled elements. |
| Files changed | `tailwind.config.js`, `app/globals.css`, `app/layout.tsx`, `components/theme/ThemeProvider.tsx` (new), `components/theme/ThemeToggle.tsx` (new), `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/ui/EstabizzSelect.tsx`, `components/home/HeroSection.tsx`, `components/templates/ServicePageLayout.tsx`, `app/contact/ContactClient.tsx`, `app/blogs/[slug]/BlogDetailClient.tsx`, `app/admin/AdminShell.tsx`, `app/admin/AdminDashboardClient.tsx`, `app/admin/blogs/_components/BlogEditorClient.tsx` |
| Build | 232 routes, `tsc --noEmit` clean, build clean |
| Commits | 4 local commits (UI: theme system, UI: public dark mode, UI: Admin OS dark mode, Docs: dark mode) |
| Status | ✅ Complete — local only, not pushed or deployed |

---

### ~~Task 3B — Rate-limit remaining public mutation endpoints~~ ✅ COMPLETED 2026-07-23

| Field | Value |
|-------|-------|
| Outcome | `POST /api/auth/signup`: 8 KB body, signup 5/IP/15 min + 3/email/hr (hashed). `POST /api/leads`: 16 KB body, 5/IP/hr + 3/email/24 hr (hashed). `POST /api/submit-blog`: 128 KB body, 3/IP/hr + 2/email/12 hr (hashed). All fail-open. isRateLimitConfigured() gate (503 if unconfigured in prod). req.arrayBuffer() byte enforcement. Cache-Control: no-store on all error responses. |
| Files changed | `app/api/auth/signup/route.ts`, `app/api/leads/route.ts`, `app/api/submit-blog/route.ts` |
| Commit | pending (SEO: enforce canonical domain and remove old public indexing) |
| Status | ✅ Complete — local only, not deployed |

---

### Task 4 — Correct legal pages and public content placeholders

| Field | Value |
|-------|-------|
| Objective | Review and update Privacy Policy, Refund Policy, and Terms & Conditions to reflect Estabizz's actual services and legal obligations. Also replace placeholder testimonials in homepage defaults. |
| Why now | Legal pages are required for production operation. Generic content creates legal and credibility risk. |
| Files | `app/legal/*/PageClient.tsx`, `lib/content/testimonialsDefaults.ts` |
| Complexity | Content task (not code) |
| Agent | Content team + legal review |
| QA | Manual |
| Approval gate | Legal review |
| Deploy required | Yes |

---

### Task 5 — Blog categories: move from hardcoded to MongoDB

| Field | Value |
|-------|-------|
| Objective | Create a `BlogCategory` MongoDB model, seed the 9 current categories, build CRUD in admin UI at `/admin/categories`. Update blog create/edit forms to fetch categories dynamically. |
| Why now | Admin has a Categories link in the sidebar that goes to a non-functional placeholder. Categories cannot be updated without a code change. |
| Files | New: `lib/models/BlogCategory.ts`, `app/api/admin/blog-categories/route.ts`. Update: `app/admin/categories/page.tsx`, `BlogEditorClient.tsx` |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 6 — Extend CMS visual editor to all 46 managed pages

| Field | Value |
|-------|-------|
| Objective | The full pending-changes / approve / publish lifecycle is only implemented for one page. Extend the existing `[slug]/edit` page to work for all 46 managed paths via the existing `by-path` API. |
| Why now | Content editors cannot update 45 of 46 CMS pages without developer intervention. This is the biggest content ops gap. |
| Files | `app/admin/content-pages/[slug]/edit/page.tsx`, `PublicContentVisualEditorClient.tsx` (make it generic) |
| Complexity | Large |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 7 — Add public website search

| Field | Value |
|-------|-------|
| Objective | Add a search page at `/search` (or search widget in navbar). Search across blog articles, service pages, and regulatory updates using MongoDB Atlas full-text search or a simple client-side filter. |
| Why now | Users cannot find content without navigation. Search is a top conversion driver. |
| Files | New: `app/search/page.tsx`, `app/api/search/route.ts` |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

## Priority 1 — Growth (Tasks 8–14)

### Task 8 — Service eligibility wizard

| Field | Value |
|-------|-------|
| Objective | Build a multi-step questionnaire at `/get-started` (or new `/eligibility-check`) that helps visitors identify which regulatory registration they need based on their business type and activities. Result shows recommended service and links to detailed service page. |
| Why now | Most visitors don't know which RBI/SEBI/IRDAI service applies to them. The wizard converts confused visitors into qualified leads. |
| Files | New: `app/eligibility-check/`, UI components |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 9 — Add Sentry (or equivalent) error monitoring

| Field | Value |
|-------|-------|
| Objective | Install and configure Sentry for client-side and server-side error capture. Set up alerts for 5xx API errors and JS exceptions. |
| Why now | No visibility into production errors currently. |
| Files | `app/layout.tsx`, `next.config.js`, `package.json` |
| Complexity | Small |
| Agent | Claude Code |
| QA | Verify errors appear in Sentry dashboard |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 10 — Live consultation booking

| Field | Value |
|-------|-------|
| Objective | Add a "Book a Free Consultation" button/modal that opens a Calendly embed (or custom booking form). Capture lead + appointment in MongoDB. Trigger WhatsApp/email confirmation. |
| Why now | Currently no structured consultation booking flow. Leads drop off. |
| Files | New: `components/ui/ConsultationBooking.tsx`, update contact/get-started pages |
| Complexity | Small–Medium (Calendly embed is small; custom form is medium) |
| Agent | Claude Code |
| QA | Manual |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 11 — WhatsApp Chat integration

| Field | Value |
|-------|-------|
| Objective | Replace or supplement the current ChatWidget with a WhatsApp click-to-chat button. On mobile: opens WhatsApp directly. On desktop: shows WhatsApp QR or web link. |
| Why now | Indian clients overwhelmingly prefer WhatsApp. Conversion rates are higher than email. |
| Files | `components/ui/ChatWidget.tsx` (update or replace) |
| Complexity | Small |
| Agent | Codex |
| QA | Manual |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 12 — Transactional email (Resend integration)

| Field | Value |
|-------|-------|
| Objective | Wire up `RESEND_API_KEY` for: lead acknowledgement email, blog submission confirmation, admin notification on new lead. Use Resend SDK with React Email templates. |
| Why now | Currently no emails are sent after form submissions. |
| Files | New: `lib/email/`, `lib/email/templates/`. Update: `app/api/leads/route.ts`, `app/api/submit-blog/route.ts` |
| Complexity | Small–Medium |
| Agent | Claude Code |
| QA | Manual |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 13 — Extend CMS visual editor to all 46 managed pages

| Field | Value |
|-------|-------|
| Objective | The full pending-changes / approve / publish lifecycle is only implemented for one page. Extend the existing `[slug]/edit` page to work for all 46 managed paths via the existing `by-path` API. |
| Why now | Content editors cannot update 45 of 46 CMS pages without developer intervention. This is the biggest content ops gap. |
| Files | `app/admin/content-pages/[slug]/edit/page.tsx`, `PublicContentVisualEditorClient.tsx` (make it generic) |
| Dependencies | None — pending fixes already committed in 49f7c81 |
| Complexity | Large |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

## Priority 2 — Productisation (Tasks 14–18)

### Task 14 — Client Portal foundation

| Field | Value |
|-------|-------|
| Objective | Build the initial client portal: `/client` login, dashboard, and application status view. Client model, auth, and basic data display. No payments or documents in phase 1. |
| Why now | Clients currently receive status updates only via WhatsApp. A portal reduces manual overhead. |
| Files | New: `app/client/`, `lib/models/Client.ts`, `lib/models/Application.ts`, `app/api/client/` |
| Complexity | Large |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 15 — Document vault (client document upload)

| Field | Value |
|-------|-------|
| Objective | Allow clients to upload required documents (KYC, incorporation docs, etc.) to their application in the Client Portal. Admin receives notification. Documents stored on Cloudinary or S3 with access control. |
| Why now | Document collection is a manual WhatsApp-heavy process. |
| Files | New: `lib/models/Document.ts`, upload flow in client portal |
| Dependencies | Task 14 |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 16 — CRM integration (n8n + Zoho)

| Field | Value |
|-------|-------|
| Objective | Connect new leads from `/api/leads` to Zoho CRM via n8n webhook. Send WhatsApp + email acknowledgement automatically. Set up assignment rules. |
| Why now | Leads captured on website are currently managed manually. |
| Files | `app/api/leads/route.ts` (add n8n webhook call), n8n workflow setup |
| Complexity | Medium |
| Agent | Claude Code + n8n configuration |
| QA | Manual |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 17 — Compliance calendar (client-facing)

| Field | Value |
|-------|-------|
| Objective | Build an admin-managed compliance calendar showing upcoming filing deadlines relevant to each client's registered entities. Visible in Client Portal. |
| Why now | Compliance deadline reminders are a high-value service differentiator. |
| Files | New: `lib/models/ComplianceEvent.ts`, admin calendar editor, client portal view |
| Dependencies | Task 14 |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 18 — Management dashboard

| Field | Value |
|-------|-------|
| Objective | Build an internal `/admin/dashboard-v2` with charts showing: active clients, applications by regulator, lead pipeline, query ageing, pending documents, content performance. |
| Why now | Leadership has no structured visibility into platform operations. |
| Files | New: `app/admin/dashboard-v2/`, chart components |
| Dependencies | Tasks 14, 16 for real data |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Manual |
| Approval gate | Owner |
| Deploy required | Yes |

---

## Priority 3 — AI and Scale (Tasks 19–21)

### Task 19 — AI blog and SEO draft assistant

| Field | Value |
|-------|-------|
| Objective | Add an AI draft button in the Blog Editor that generates a blog draft outline from a topic + keywords using Claude API. Output is a draft only — admin must review and publish via normal workflow. |
| Why now | Blog content production is a bottleneck. AI drafts reduce time per article by ~60%. |
| Files | `app/admin/blogs/_components/BlogEditorClient.tsx`, `app/api/admin/ai/draft-blog/route.ts` |
| Dependencies | `ANTHROPIC_API_KEY` active, rate limiting on AI endpoint (see Task 3) |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 20 — Regulatory knowledge base (Phase 1)

| Field | Value |
|-------|-------|
| Objective | Build a searchable database of key regulations and circulars. Admin can add/edit regulatory documents. Public can search and read. No AI extraction in Phase 1 — manual entry only. |
| Why now | High SEO value. Positions Estabizz as an authority in regulatory compliance. |
| Files | New: `lib/models/Regulation.ts`, `lib/models/Circular.ts`, admin editor, public `/resources/regulations/` |
| Complexity | Large |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |

---

### Task 21 — Error monitoring, analytics, and deployment hardening

| Field | Value |
|-------|-------|
| Objective | Complete production hardening: (1) Sentry error monitoring with alerting (see Task 6), (2) Google Analytics 4 properly configured with conversion goals, (3) Vercel preview deployments on all PRs, (4) automated E2E tests (Playwright) on critical paths (homepage, blog, lead capture, admin login). |
| Why now | Platform cannot scale to paying clients without production observability and automated regression testing. |
| Files | `next.config.js`, `app/layout.tsx`, new `e2e/` test directory |
| Complexity | Medium |
| Agent | Claude Code |
| QA | Antigravity |
| Approval gate | Owner |
| Deploy required | Yes |
