# Estabizz — Duplicate and Unused File Report

> Created: 2026-07-22 · Branch: **main** (confirmed) · Audit commit: **73f04af**
> Factual corrections applied: 2026-07-22 — proxy.ts classification, redirect route classification, scratch/ status, word document recommendation.
> Discovery-only audit. No files were removed or modified during this audit.
> See [ESTABIZZ_FOLDER_CLEANUP_PLAN.md](../operations/ESTABIZZ_FOLDER_CLEANUP_PLAN.md) for actionable remediation steps.

---

## Summary

| Category | Count | Impact |
|----------|-------|--------|
| Redirect-only route files (URL aliases) | 17 | Active compatibility routes — safe to delete only after adding equivalent `next.config.js` redirects |
| Legacy static data files (superseded) | 2 | `lib/regulatoryUpdates.ts`, `lib/blog/sampleBlogs.ts` |
| Generated files tracked in git | 1 | `tsconfig.tsbuildinfo` |
| Framework convention file requiring dedicated audit | 1 | `proxy.ts` — valid Next.js 16 convention; do not rename or delete without a dedicated audit |
| Empty untracked directories | 1 | `scratch/` — not tracked by Git; no cleanup commit required |
| Word documents in word-docs/ | 2 | `Estabizz_Project_Documentation.docx`, `Estabizz_Audit_Documentation.docx` — intentionally tracked; see `word-docs/README.md` |
| Placeholder UI files (no implementation) | 4 | `admin/authors`, `admin/categories`, `admin/settings`, generic content-page edit shell |
| Legacy article content (not in CMS) | 3 | `app/regulatory/` article pages |
| Internal pages publicly accessible without auth | 4+ | `resources/content-rebuild-command`, `resources/regulatory-update-email-template`, `resources/service-page-content-framework`, `proposal-template` |

---

## Category 1: Redirect-Only Route Files

These 17 files each contain only a single `redirect()` call. They are **active compatibility routes** that serve valid 301 redirects for SEO and link preservation.

**Classification**: Active — safe to delete: No. Optional consolidation: Low priority.

They could optionally be consolidated into `next.config.js` `redirects` config to reduce file count and simplify the route tree, but this is not urgent and carries no functional benefit beyond housekeeping.

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

## Category 4: Framework Convention File Requiring Dedicated Audit

### `proxy.ts`

**Status**: Valid Next.js 16 framework convention. Do not rename or delete during routine cleanup.

**What it contains**: Edge-runtime route middleware that checks for the `auth_token` cookie on `/admin/*` paths and redirects unauthenticated requests to `/login`. Exports a `proxy` function with a `config.matcher` targeting `/admin/:path*`.

**Classification**: `proxy.ts` is a valid Next.js 16 framework convention. Its behaviour, matcher configuration, and ongoing necessity require a separate dedicated audit before any action is taken.

**Do not**:
- Rename it to `middleware.ts` without a full behavioural audit
- Delete it without confirming that all `/admin/*` route protection is handled elsewhere
- Modify it as part of folder cleanup

**Deferred**: A dedicated proxy.ts audit is required to determine whether the edge cookie check is redundant with `app/admin/layout.tsx` (which performs full JWT verification), whether it should be kept, and whether it should be updated to use the standard `middleware` export name for Next.js 16.

---

## Category 5: Empty Untracked Directories

### `scratch/`

**Status**: Untracked empty directory — Git does not track it.

**Verification**: `git ls-files scratch` returns no results. `find scratch -maxdepth 2 -type f` returns no results.

**Current state**: The directory has no files and is not committed to git. Git does not track empty directories; there is no `.gitkeep` or contained file.

**Action required**: None. Git does not track it, so no cleanup commit is required. The directory can be removed locally at any time without a git commit.

---

## Category 6: Word Documents in word-docs/

### `word-docs/Estabizz_Project_Documentation.docx` and `word-docs/Estabizz_Audit_Documentation.docx`

**Status**: Intentionally version-controlled in `word-docs/`.

**What they are**: Compiled Word document snapshots generated from canonical Markdown source files, kept in version control for sharing with external stakeholders and AI agents (ChatGPT, etc.) that cannot read Markdown.

**Decision**: These files are intentionally tracked. Do not add a blanket `*.docx` rule to `.gitignore`, because legitimate Word templates may later be version-controlled. If specific generated files should be excluded in future, add targeted ignore rules (e.g., `word-docs/Estabizz_*_generated.docx`) rather than a blanket rule.

See `word-docs/README.md` for the canonical description of these files and their regeneration process.

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
