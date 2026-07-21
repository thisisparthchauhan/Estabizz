# Estabizz — File Classification Register

> Created: 2026-07-22 · Branch: **main** (confirmed) · Audit commit: **73f04af**
> This register classifies every notable non-standard file. Standard active files (route pages, API handlers, standard lib modules) are not listed unless they have a special status. See ESTABIZZ_REPOSITORY_STRUCTURE_MAP.md for the complete directory tree.

---

## Classification Key

| Class | Meaning |
|-------|---------|
| **Active** | In production use; part of the Next.js app; do not remove |
| **Redirect-only** | Contains only a Next.js `redirect()` call; no UI or data |
| **Legacy** | Superseded by a newer implementation; no longer imported |
| **Dormant** | Exists but not activated; depends on an env var or config not yet enabled |
| **Generated** | Output of a build or compile step; should not be edited manually |
| **Script** | Run-once or import-time script; not part of the Next.js runtime app |
| **Placeholder** | UI shell that exists but has no implemented functionality |
| **Misnamed** | File exists and has code, but filename prevents it from fulfilling its purpose |
| **Doc** | Markdown documentation file — not code |
| **Untracked** | Not committed to git |

---

## Root-Level Files

| File | Class | Notes |
|------|-------|-------|
| `proxy.ts` | **Misnamed** | Exports a `proxy` function; Next.js edge middleware must be named `middleware.ts` to be picked up by the framework. Currently dormant — has no effect on routing. |
| `tsconfig.tsbuildinfo` | **Generated** | TypeScript incremental build cache. Should be in `.gitignore`; currently tracked in git. |
| `postcss.config.js` | **Active** | Part of the dual CSS pipeline alongside Tailwind CLI. |
| `vercel.json` | **Active** | Vercel deploy configuration. |
| `Estabizz_Project_Documentation.docx` | **Untracked** | Generated Word document for sharing with other AI agents. Not committed to git. Can be regenerated from the markdown docs. |
| `scratch/` | *(empty directory)* | No files; can be removed or gitignored. |

---

## lib/ Notable Files

| File | Class | Notes |
|------|-------|-------|
| `lib/regulatoryUpdates.ts` | **Legacy** | Static TypeScript array of `RegulatoryUpdate` objects. Superseded by the `RegulatoryUpdate` Mongoose model in `lib/models/RegulatoryUpdate.ts` and the `lib/regulatory/` module. Not imported anywhere in the active Next.js app. |
| `lib/blog/sampleBlogs.ts` | **Legacy** | Exports `export const sampleBlogs: Blog[] = []` — an empty array. Vestige of a prototype stage; not imported anywhere in the active app. Safe to delete. |
| `lib/servicePageTemplate.ts` | **Active (doc-as-code)** | Exports `mandatoryLicencePageSections` — an array listing the required sections for a service page. Used as a content reference guide by developers/agents writing page content; not imported by runtime code. Intentionally kept as code rather than markdown for type-checking purposes. |
| `lib/publicContent/discovery.mjs` | **Script** | ESM module that scans the `app/` directory to discover public content page routes. Used by `scripts/importExistingPublicContentPages.mjs` only. Not imported by the Next.js app. The `.mjs` extension is intentional (ESM required for the import scripts). |
| `lib/anthropic.ts` | **Dormant** | Initialises the Anthropic SDK client. `ANTHROPIC_API_KEY` is set in `.env.local` but the two API routes that would use this (`/api/chat` and `/api/recommend-services`) have no auth guard — they must not be activated until rate limiting is in place. |

---

## app/admin/ Notable Files

| File | Class | Notes |
|------|-------|-------|
| `app/admin/media/page.tsx` | **Redirect-only** | Redirects `/admin/media` → `/admin/media-library`. The canonical route is `/admin/media-library`. |
| `app/admin/authors/page.tsx` | **Placeholder** | UI stub for an Authors management screen. No backend implemented. |
| `app/admin/categories/page.tsx` | **Placeholder** | UI stub for a Blog Categories editor. The actual categories are hardcoded in `lib/blog/categories.ts` (TD-003). |
| `app/admin/settings/page.tsx` | **Placeholder** | UI stub for Admin Settings. No backend implemented. |
| `app/admin/content-pages/[slug]/edit/page.tsx` | **Placeholder** | Generic edit shell for CMS content pages. Only `nbfc-registration-in-india` has a full editor (`PublicContentVisualEditorClient.tsx`); all other slugs hit this stub. |

---

## app/sebi/ Redirect-Only Routes (8 files)

| File | Class | Canonical target |
|------|-------|-----------------|
| `app/sebi/investment-adviser-registration/page.tsx` | **Redirect-only** | `/sebi/ria-registration-in-india` |
| `app/sebi/portfolio-manager-registration/page.tsx` | **Redirect-only** | `/sebi/pms-registration-in-india` |
| `app/sebi/research-analyst-registration/page.tsx` | **Redirect-only** | `/sebi/research-analyst-registration-in-india` |
| `app/sebi/sebi-ria-registration/page.tsx` | **Redirect-only** | `/sebi/ria-registration-in-india` |
| `app/sebi/sebi-stock-broker-registration/page.tsx` | **Redirect-only** | `/sebi/stock-broker-registration-in-india` |
| `app/sebi/social-stock-exchange-license/page.tsx` | **Redirect-only** | `/sebi/social-stock-exchange-license-india` |
| `app/sebi/stock-broker-license-india/page.tsx` | **Redirect-only** | `/sebi/stock-broker-registration-in-india` |
| `app/sebi/stock-broker-registration/page.tsx` | **Redirect-only** | `/sebi/stock-broker-registration-in-india` |

---

## app/ifsca/ Redirect-Only Routes (7 files)

| File | Class | Canonical target |
|------|-------|-----------------|
| `app/ifsca/aircraft-leasing/page.tsx` | **Redirect-only** | `/ifsca/aircraft-leasing-registration-in-ifsc` |
| `app/ifsca/batf-services/page.tsx` | **Redirect-only** | `/ifsca/batf-services-registration-in-gift-ifsc` |
| `app/ifsca/finance-company/page.tsx` | **Redirect-only** | `/ifsca/finance-company-in-gift-ifsc` |
| `app/ifsca/finance-company-registration-in-ifsc/page.tsx` | **Redirect-only** | `/ifsca/finance-company-in-gift-ifsc` |
| `app/ifsca/fintech-entity/page.tsx` | **Redirect-only** | `/ifsca/ifsca-fintech-startup-incentives` |
| `app/ifsca/itfs-platform/page.tsx` | **Redirect-only** | `/ifsca/itfs-registration-in-gift-ifsc` |
| `app/ifsca/psp-license/page.tsx` | **Redirect-only** | `/ifsca/psp-license-ifsca` |

---

## app/regulatory/ Routes

| File | Class | Notes |
|------|-------|-------|
| `app/regulatory/psp-license-ifsca/page.tsx` | **Redirect-only** | Redirects `/regulatory/psp-license-ifsca` → `/ifsca/psp-license-ifsca` |
| `app/regulatory/finance-company-gift-ifsc/` | **Active (legacy content)** | Live article-style page; content is hardcoded, not CMS-driven. Not merged into the main CMS yet. |
| `app/regulatory/ifsca-factoring-license-gift-city/` | **Active (legacy content)** | Same as above — live article page, hardcoded content. |
| `app/regulatory/page.tsx` | **Active (legacy content)** | Regulatory hub page listing these legacy article pages. |

---

## app/resources/ Notable Routes

| File | Class | Notes |
|------|-------|-------|
| `app/resources/content-rebuild-command/page.tsx` | **Active** | Internal tool for triggering content rebuilds. **Publicly accessible with no auth guard** — see TD-006. |
| `app/resources/regulatory-update-email-template/page.tsx` | **Active** | Internal email template reference. Publicly accessible with no auth guard. |
| `app/resources/service-page-content-framework/page.tsx` | **Active** | Internal content framework reference for writing service pages. Publicly accessible with no auth guard. |
| `app/resources/circular-explainers/page.tsx` | **Placeholder** | Planned feature — not implemented. |
| `app/resources/compliance-calendar/page.tsx` | **Placeholder** | Planned feature — not implemented. |

---

## app/api/ Notable Routes

| File | Class | Notes |
|------|-------|-------|
| `app/api/chat/route.ts` | **Dormant** | AI chat endpoint. **No auth guard.** Not to be enabled until rate limiting is in place. |
| `app/api/recommend-services/route.ts` | **Dormant** | AI service recommendation endpoint. **No auth guard.** Same constraint as `/api/chat`. |
| `app/api/admin/blogs/save/route.ts` | **Active ⚠️** | Uses `requireAdmin` instead of `requirePermission` — permission gap TD-016. |
| `app/api/admin/blogs/[id]/route.ts` | **Active ⚠️** | Uses `requireAdmin` instead of `requirePermission` — permission gap TD-016. |
| `app/api/admin/blogs/[id]/status/route.ts` | **Active ⚠️** | Uses `requireAdmin` instead of `requirePermission` — permission gap TD-016. |
| `app/api/admin/leads/[id]/route.ts` | **Active ⚠️** | Uses `requireAdmin` instead of `requirePermission` — permission gap TD-016. |
| `app/api/auth/login/route.ts` | **Active ⚠️** | No rate limiting — highest-priority security gap (TD-001). |

---

## public/ Generated Files

| File | Class | Notes |
|------|-------|-------|
| `public/tailwind.css` | **Generated** | Output of `npx tailwindcss ... -o public/tailwind.css`. Do not edit manually. Currently committed to git (acceptable — serves as the CSS file loaded by `app/layout.tsx` link tag). |

---

## components/ Notable Files

| File | Class | Notes |
|------|-------|-------|
| `components/FAQAccordion.tsx` | **Active** | Single file in the root of `components/`; all other components are in subdirectories. |
| `components/home/RegulatorySevices.tsx` | **Active** | Typo in filename — "Sevices" should be "Services". The file is active and imported; renaming would require updating all imports. |

---

## Documentation Files (19 .md + 1 .docx at root)

| File | Class | Notes |
|------|-------|-------|
| `CMS_STATUS.md` | **Doc** | Owner source of truth — living log of all completed work. |
| `AGENTS.md` | **Doc** | Agent rules from an earlier phase; partially superseded by `ESTABIZZ_AGENT_OPERATING_GUIDE.md`. |
| `ESTABIZZ_PROJECT_MASTER_CONTEXT.md` | **Doc** | Master context entry point for new agents. Canonical. |
| `ESTABIZZ_AGENT_OPERATING_GUIDE.md` | **Doc** | Comprehensive agent operating rules. Canonical. |
| `ESTABIZZ_TECHNICAL_ARCHITECTURE.md` | **Doc** | Full stack and architecture documentation. Canonical. |
| `ESTABIZZ_MODULE_INVENTORY.md` | **Doc** | All modules, routes, components inventory. Canonical. |
| `ESTABIZZ_API_DATABASE_MAP.md` | **Doc** | Full API route and database model catalogue. Canonical. |
| `ESTABIZZ_SECURITY_PERMISSION_MAP.md` | **Doc** | Auth flow, roles, permissions matrix. Canonical. |
| `ESTABIZZ_CURRENT_COMPLETION_STATUS.md` | **Doc** | Current build completion status. Canonical. |
| `ESTABIZZ_TECHNICAL_DEBT_REGISTER.md` | **Doc** | Known issues register. Canonical. |
| `ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md` | **Doc** | Future product vision. Canonical. |
| `ESTABIZZ_NEXT_20_TASKS.md` | **Doc** | Ordered task list. Canonical. |
| `ADMIN_OS_DISASTER_RECOVERY.md` | **Doc** | Disaster recovery runbook. Pre-canonical. |
| `ADMIN_OS_PRODUCTION_READINESS.md` | **Doc** | Production readiness checklist. Pre-canonical. |
| `ADMIN_OS_SECURITY_MATRIX.md` | **Doc** | Security matrix. Pre-canonical. |
| `ADMIN_OS_SEO_DEPLOYMENT_CHECKLIST.md` | **Doc** | SEO deployment checklist. Pre-canonical. |
| `ADMIN_OS_STAGING_RELEASE_PACKAGE.md` | **Doc** | Staging release documentation. Pre-canonical. |
| `SECURITY_INCIDENT_S2.md` | **Doc** | Record of a specific security incident. Historical. |
| `Estabizz_Project_Documentation.docx` | **Untracked** | Compiled Word version of all docs. Generated; not committed. |
