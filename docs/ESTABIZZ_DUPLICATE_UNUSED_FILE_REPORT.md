# Estabizz — Duplicate and Unused File Report

> Created: 2026-07-22 · Branch: **main** (confirmed) · Audit commit: **73f04af**
> Discovery-only audit. No files were removed or modified during this audit.
> See ESTABIZZ_FOLDER_CLEANUP_PLAN.md for actionable remediation steps.

---

## Summary

| Category | Count | Impact |
|----------|-------|--------|
| Redirect-only route files (URL aliases) | 17 | Low risk — serve a purpose (301 redirects for SEO), but could be consolidated into `next.config.js` |
| Legacy static data files (superseded) | 2 | `lib/regulatoryUpdates.ts`, `lib/blog/sampleBlogs.ts` |
| Generated files tracked in git | 1 | `tsconfig.tsbuildinfo` |
| Misnamed files (prevent purpose) | 1 | `proxy.ts` |
| Empty directories | 1 | `scratch/` |
| Untracked binary files | 1 | `Estabizz_Project_Documentation.docx` |
| Placeholder UI files (no implementation) | 4 | `admin/authors`, `admin/categories`, `admin/settings`, generic content-page edit shell |
| Legacy article content (not in CMS) | 3 | `app/regulatory/` article pages |
| Internal pages publicly accessible without auth | 4+ | `resources/content-rebuild-command`, `resources/regulatory-update-email-template`, `resources/service-page-content-framework`, `proposal-template` |

---

## Category 1: Redirect-Only Route Files

These 17 files each contain only a single `redirect()` call. They are functional (they serve valid 301 redirects for SEO and link preservation), but they could optionally be consolidated into `next.config.js` `redirects` config to reduce file count and simplify the route tree.

**SEBI aliases (8 files):**

| File | Redirects to | Reason for alias |
|------|-------------|-----------------|
| `app/sebi/investment-adviser-registration/page.tsx` | `/sebi/ria-registration-in-india` | Old URL |
| `app/sebi/portfolio-manager-registration/page.tsx` | `/sebi/pms-registration-in-india` | Old URL |
| `app/sebi/research-analyst-registration/page.tsx` | `/sebi/research-analyst-registration-in-india` | Old URL |
| `app/sebi/sebi-ria-registration/page.tsx` | `/sebi/ria-registration-in-india` | Alternative slug |
| `app/sebi/sebi-stock-broker-registration/page.tsx` | `/sebi/stock-broker-registration-in-india` | Alternative slug |
| `app/sebi/social-stock-exchange-license/page.tsx` | `/sebi/social-stock-exchange-license-india` | Old URL |
| `app/sebi/stock-broker-license-india/page.tsx` | `/sebi/stock-broker-registration-in-india` | Alternative slug |
| `app/sebi/stock-broker-registration/page.tsx` | `/sebi/stock-broker-registration-in-india` | Old URL |

**IFSCA aliases (7 files):**

| File | Redirects to | Reason for alias |
|------|-------------|-----------------|
| `app/ifsca/aircraft-leasing/page.tsx` | `/ifsca/aircraft-leasing-registration-in-ifsc` | Old URL |
| `app/ifsca/batf-services/page.tsx` | `/ifsca/batf-services-registration-in-gift-ifsc` | Old URL |
| `app/ifsca/finance-company/page.tsx` | `/ifsca/finance-company-in-gift-ifsc` | Old URL |
| `app/ifsca/finance-company-registration-in-ifsc/page.tsx` | `/ifsca/finance-company-in-gift-ifsc` | Duplicate slug variant |
| `app/ifsca/fintech-entity/page.tsx` | `/ifsca/ifsca-fintech-startup-incentives` | Old URL |
| `app/ifsca/itfs-platform/page.tsx` | `/ifsca/itfs-registration-in-gift-ifsc` | Old URL |
| `app/ifsca/psp-license/page.tsx` | `/ifsca/psp-license-ifsca` | Old URL |

**Other redirects (2 files):**

| File | Redirects to | Reason for alias |
|------|-------------|-----------------|
| `app/regulatory/psp-license-ifsca/page.tsx` | `/ifsca/psp-license-ifsca` | Legacy route in `regulatory/` section |
| `app/admin/media/page.tsx` | `/admin/media-library` | Admin URL naming inconsistency |

**Risk assessment**: Low. Removing redirect files without replacing them with `next.config.js` redirects would break existing URLs indexed by Google. Do not delete these without adding equivalent config-level redirects first.

---

## Category 2: Legacy Static Data Files

### `lib/regulatoryUpdates.ts`

**Status**: Legacy — superseded.

**What it contains**: A large static TypeScript array of `RegulatoryUpdate` objects (type definitions + sample data). This was the original implementation for regulatory update data, before MongoDB was introduced.

**Why it is unused**: The application now uses the `RegulatoryUpdate` Mongoose model (`lib/models/RegulatoryUpdate.ts`) and the `lib/regulatory/` repository for all regulatory update operations. The static file in `lib/regulatoryUpdates.ts` is not imported anywhere in the active Next.js app.

**Risk of deletion**: Low. Verify with `grep -r "regulatoryUpdates" app lib components --include="*.ts" --include="*.tsx"` returning no results before deleting.

---

### `lib/blog/sampleBlogs.ts`

**Status**: Legacy — empty array.

**What it contains**:
```typescript
import type { Blog } from './types';
export const sampleBlogs: Blog[] = [];
```

**Why it is unused**: The array is empty and not imported anywhere in the active Next.js app. It was scaffolded during early prototyping and never populated or used.

**Risk of deletion**: None. The file contains no data and is not imported anywhere.

---

## Category 3: Generated Files Tracked in Git

### `tsconfig.tsbuildinfo`

**Status**: Generated — should be gitignored.

**What it is**: TypeScript's incremental compilation cache. Generated automatically by `tsc`. It stores the state of the previous TypeScript build to speed up subsequent checks.

**Why it should not be in git**: The file is 300 KB, changes on every TypeScript run, and has no value in version history. It can cause conflicts between developers and CI environments. The standard practice is to gitignore it.

**Current `.gitignore` state**: `tsconfig.tsbuildinfo` is NOT currently listed in `.gitignore`.

**Risk of removal**: None. It regenerates automatically on the next TypeScript run.

---

## Category 4: Misnamed Files

### `proxy.ts`

**Status**: Misnamed — dormant.

**What it contains**: Exports a `proxy` function (and possibly middleware-style logic) written in TypeScript.

**Why it does not work as intended**: Next.js edge middleware must be in a file named exactly `middleware.ts` (or `middleware.js`) at the project root to be automatically picked up by the framework. A file named `proxy.ts` is never invoked by Next.js automatically. The code inside it currently has no effect on any requests.

**Options**:
1. Rename to `middleware.ts` and verify the exported function matches the Next.js `middleware` export signature (`export function middleware(request: NextRequest) { ... }`).
2. Delete the file if the middleware functionality is not needed or has been replaced.

**Risk**: Do not rename without reviewing the file's contents first to confirm it is correct Next.js middleware code. The rename itself will immediately activate the middleware on all requests.

---

## Category 5: Empty Directories

### `scratch/`

**Status**: Empty directory.

**What it was**: A scratch directory for temporary working files.

**Current state**: No files. The directory itself is committed to git (git tracks directories via a `.gitkeep` or indirectly via contained files, but this directory appears empty).

**Risk of removal**: None. It can be deleted or gitignored.

---

## Category 6: Untracked Binary Files

### `Estabizz_Project_Documentation.docx`

**Status**: Untracked — not committed to git.

**What it is**: A compiled Word document containing all 10 canonical documentation files, generated via python-docx for sharing with external AI agents (ChatGPT, etc.).

**Recommendation**: Add `*.docx` or specifically `Estabizz_Project_Documentation.docx` to `.gitignore`. The file can always be regenerated from the markdown source files.

---

## Category 7: Placeholder Admin UI Pages

These pages have a UI shell but no backend implementation. They are part of the Admin OS and show a placeholder screen to logged-in admins.

| File | Status | What is missing |
|------|--------|----------------|
| `app/admin/authors/page.tsx` | Placeholder | No Author model, no API routes, no CRUD |
| `app/admin/categories/page.tsx` | Placeholder | Categories are hardcoded in `lib/blog/categories.ts` — no admin CRUD (TD-003) |
| `app/admin/settings/page.tsx` | Placeholder | No settings model, no API routes |
| `app/admin/content-pages/[slug]/edit/page.tsx` | Placeholder (generic) | Only `nbfc-registration-in-india` has a full editor; all other slugs hit this stub |

These are not candidates for deletion — they are intentional stubs for features planned in the roadmap.

---

## Category 8: Legacy Hardcoded Article Pages

The `app/regulatory/` section contains 3 article-style pages with hardcoded content. These predate the CMS and have not been migrated into the MongoDB-backed CMS system.

| Route | Status | Notes |
|-------|--------|-------|
| `/regulatory/finance-company-gift-ifsc` | Legacy article | Live; hardcoded content |
| `/regulatory/ifsca-factoring-license-gift-city` | Legacy article | Live; hardcoded content |
| `/regulatory/page.tsx` | Legacy hub | Lists the above two articles |

These are not unused — they are live pages indexed by search engines. They need to be migrated into the CMS (or replaced with CMS-managed IFSCA pages) before they can be removed.

---

## Category 9: Internal Pages Without Auth Guards

These pages are active and publicly accessible but appear intended for internal use only. They are not security vulnerabilities in themselves, but they expose internal workflows to the public internet.

| Route | Purpose | Security concern |
|-------|---------|----------------|
| `/resources/content-rebuild-command` | Content rebuild trigger UI | Internal tool — should be behind admin auth |
| `/resources/regulatory-update-email-template` | Email template reference | Internal — should be behind admin auth or removed |
| `/resources/service-page-content-framework` | Content writing guide | Low concern — useful reference; no sensitive data |
| `/proposal-template` | Proposal template | Internal — should be behind admin auth |

TD-006 in `ESTABIZZ_TECHNICAL_DEBT_REGISTER.md` documents the most critical of these.

---

## Files Verified as NOT Duplicate / NOT Unused

The following were investigated and confirmed to have an active purpose:

| File | Why it is active |
|------|----------------|
| `lib/servicePageTemplate.ts` | Used as a content reference by developers; intentionally kept as code |
| `lib/publicContent/discovery.mjs` | Used by `scripts/importExistingPublicContentPages.mjs` |
| `lib/faqEngine.ts` | FAQ data and logic used by FAQ page |
| `lib/anthropic.ts` | SDK client initialization — dormant but intentionally kept for future enablement |
| `public/tailwind.css` | Generated CSS loaded via `<link>` in `app/layout.tsx` |
| `app/sebi/aif-compliance-test-report/page.tsx` | Live content page despite "test-report" in name — serves real content |
| `AGENTS.md` | Still referenced by some agent workflows; not yet superseded |
