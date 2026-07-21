# Estabizz — Folder Cleanup Plan

> Created: 2026-07-22 · Branch: **main** (confirmed) · Audit commit: **73f04af**
> Each action below is safe and reversible. No action here modifies routes, API behaviour, database data, or authentication. All code changes require a TypeScript check before committing.

---

## Constraints (Never Break These)

- Do not move files unless all imports referencing that file are also updated in the same commit.
- Do not delete redirect-only route files without first adding equivalent redirects to `next.config.js`.
- Do not rename `proxy.ts` without reading and verifying its contents — renaming to `middleware.ts` immediately activates the middleware on all requests.
- Do not modify `.env.local` or any environment variable.
- Do not push or deploy — only commit locally unless explicitly asked.

---

## Phase 1 — Gitignore Fixes (Zero Risk, Do First)

### Action 1.1 — Add `tsconfig.tsbuildinfo` to `.gitignore`

**Why**: The TypeScript incremental build cache is 300 KB, changes on every build, and has no value in version history.

**Steps**:
1. Open `.gitignore`
2. Add a new line: `tsconfig.tsbuildinfo`
3. Run `git rm --cached tsconfig.tsbuildinfo` to untrack it without deleting it locally
4. Commit: `Chore: gitignore tsconfig.tsbuildinfo`
5. Run `npx tsc --noEmit` — confirm it still exits 0 and regenerates the file

---

### Action 1.2 — Add generated/binary files to `.gitignore`

**Why**: `Estabizz_Project_Documentation.docx` is a generated Word file that should not be tracked in git.

**Steps**:
1. Open `.gitignore`
2. Add: `Estabizz_Project_Documentation.docx`
3. Also consider: `*.docx` as a blanket rule for future generated Word files
4. Commit: `Chore: gitignore generated Word documentation file`

---

## Phase 2 — Delete Empty and Legacy Files (Minimal Risk)

### Action 2.1 — Delete `lib/blog/sampleBlogs.ts`

**Why**: The file exports an empty array and is not imported anywhere in the active app.

**Verify first**:
```bash
grep -r "sampleBlogs" app lib components --include="*.ts" --include="*.tsx"
```
This must return zero results before deleting.

**Steps**:
1. Run the grep above to confirm no imports
2. Delete `lib/blog/sampleBlogs.ts`
3. Run `npx tsc --noEmit` — must pass
4. Commit: `Chore: remove empty sampleBlogs legacy file`

---

### Action 2.2 — Delete `lib/regulatoryUpdates.ts`

**Why**: Large static data file superseded by the MongoDB `RegulatoryUpdate` model. Not imported anywhere in the active app.

**Verify first**:
```bash
grep -r "regulatoryUpdates\b" app lib components scripts --include="*.ts" --include="*.tsx" --include="*.mjs"
```
This must return zero results (or only results pointing to this file itself) before deleting.

**Steps**:
1. Run the grep above
2. Delete `lib/regulatoryUpdates.ts`
3. Run `npx tsc --noEmit` — must pass
4. Commit: `Chore: remove legacy regulatoryUpdates static data file`

---

### Action 2.3 — Delete `scratch/` directory

**Why**: The directory is completely empty and serves no purpose.

**Steps**:
1. Confirm: `ls scratch/` should return empty
2. `git rm -r scratch/` OR simply delete the directory — git will handle the empty dir on commit
3. Commit: `Chore: remove empty scratch directory`

---

## Phase 3 — Resolve `proxy.ts` (Small Risk — Read Before Acting)

### Action 3.1 — Investigate `proxy.ts`

**Why**: The file is named `proxy.ts` but to function as Next.js edge middleware it must be named `middleware.ts`. It currently has no effect on any requests.

**Steps before any action**:
1. Read the contents of `proxy.ts` in full
2. Determine what it is trying to do:
   - If it is valid Next.js middleware code (exports `export function middleware(request: NextRequest)`) → proceed to 3.2
   - If it is unfinished, incorrect, or for a different purpose → delete it (3.3)

### Action 3.2 — Rename `proxy.ts` to `middleware.ts` (if content is valid middleware)

**WARNING**: Renaming to `middleware.ts` will immediately activate the middleware on ALL Next.js requests in production on the next deploy. Test locally first.

**Steps**:
1. Rename: `git mv proxy.ts middleware.ts`
2. Verify the file exports exactly: `export function middleware(request: NextRequest) { ... }` (or `export default`)
3. Start the dev server and verify no unexpected redirects or errors occur
4. Run `npx tsc --noEmit`
5. Commit: `Fix: rename proxy.ts to middleware.ts so Next.js picks it up`

### Action 3.3 — Delete `proxy.ts` (if content is not valid or not needed)

**Steps**:
1. Delete `proxy.ts`
2. Run `npx tsc --noEmit`
3. Commit: `Chore: remove dormant proxy.ts (was never invoked by Next.js)`

---

## Phase 4 — Fix Component Filename Typo (Small Risk — Update Imports Too)

### Action 4.1 — Fix `components/home/RegulatorySevices.tsx` typo

**Why**: The filename is missing an 'r' in "Services". This causes confusion for developers reading the repo.

**Find all imports**:
```bash
grep -r "RegulatorySevices" app components --include="*.ts" --include="*.tsx"
```

**Steps**:
1. Run the grep to find all import sites
2. Rename the file: `git mv components/home/RegulatorySevices.tsx components/home/RegulatoryServices.tsx`
3. Update every import found in step 1 to use the new filename
4. Run `npx tsc --noEmit`
5. Commit: `Fix: rename RegulatorySevices.tsx to correct spelling RegulatoryServices.tsx`

---

## Phase 5 — Move `FAQAccordion.tsx` into Subfolder (Low Priority, Cosmetic)

### Action 5.1 — Move `components/FAQAccordion.tsx` into `components/ui/`

**Why**: All other components are in subdirectories. This one file sitting at the root of `components/` is inconsistent.

**Find all imports**:
```bash
grep -r "FAQAccordion" app components --include="*.ts" --include="*.tsx"
```

**Steps**:
1. Run the grep
2. Move: `git mv components/FAQAccordion.tsx components/ui/FAQAccordion.tsx`
3. Update every import to `@/components/ui/FAQAccordion`
4. Run `npx tsc --noEmit`
5. Commit: `Refactor: move FAQAccordion into components/ui/`

---

## Phase 6 — Consolidate Redirect Routes into next.config.js (Medium Effort)

### Action 6.1 — Move 17 redirect-only page.tsx files to next.config.js

**Why**: 17 files each containing a single `redirect()` call inflate the route tree. Config-level redirects execute at the edge and are faster.

**Steps**:
1. Add a `redirects` function to `next.config.js` with all 17 entries (see `ESTABIZZ_RECOMMENDED_FOLDER_STRUCTURE.md` §5 for the exact config block)
2. Deploy to local dev server (`npm run dev`)
3. Test each of the 17 URLs manually to confirm they redirect correctly
4. Delete the 17 `page.tsx` files
5. Run `npx tsc --noEmit`
6. Commit: `Chore: consolidate 17 redirect-only routes into next.config.js`

**Files to delete after step 3**:
- `app/sebi/investment-adviser-registration/` (whole directory)
- `app/sebi/portfolio-manager-registration/`
- `app/sebi/research-analyst-registration/`
- `app/sebi/sebi-ria-registration/`
- `app/sebi/sebi-stock-broker-registration/`
- `app/sebi/social-stock-exchange-license/`
- `app/sebi/stock-broker-license-india/`
- `app/sebi/stock-broker-registration/`
- `app/ifsca/aircraft-leasing/`
- `app/ifsca/batf-services/`
- `app/ifsca/finance-company/`
- `app/ifsca/finance-company-registration-in-ifsc/`
- `app/ifsca/fintech-entity/`
- `app/ifsca/itfs-platform/`
- `app/ifsca/psp-license/`
- `app/regulatory/psp-license-ifsca/`
- `app/admin/media/`

---

## Phase 7 — Create `docs/` Directory and Move Markdown Files (Medium Effort)

### Action 7.1 — Move all .md files to `docs/`

**Why**: 19+ markdown files at the root make the project root cluttered and hard to navigate. A `docs/` directory is the standard convention.

**Steps**:
1. Create `docs/` directory
2. Use `git mv` to move all `.md` files (list below)
3. Update any cross-references in the docs that use relative paths to other `.md` files (e.g., `[CMS_STATUS.md](CMS_STATUS.md)` → `[CMS_STATUS.md](docs/CMS_STATUS.md)` if referenced from root, or keep relative if within `docs/`)
4. Update `ESTABIZZ_AGENT_OPERATING_GUIDE.md` §10 documentation index to reference `docs/` paths
5. Update `ESTABIZZ_PROJECT_MASTER_CONTEXT.md` document map
6. Run `npx tsc --noEmit`
7. Commit: `Docs: move all markdown documentation files into docs/ directory`

**Files to move**:
```
CMS_STATUS.md → docs/CMS_STATUS.md
AGENTS.md → docs/AGENTS.md
ESTABIZZ_PROJECT_MASTER_CONTEXT.md → docs/ESTABIZZ_PROJECT_MASTER_CONTEXT.md
ESTABIZZ_AGENT_OPERATING_GUIDE.md → docs/ESTABIZZ_AGENT_OPERATING_GUIDE.md
ESTABIZZ_TECHNICAL_ARCHITECTURE.md → docs/ESTABIZZ_TECHNICAL_ARCHITECTURE.md
ESTABIZZ_MODULE_INVENTORY.md → docs/ESTABIZZ_MODULE_INVENTORY.md
ESTABIZZ_API_DATABASE_MAP.md → docs/ESTABIZZ_API_DATABASE_MAP.md
ESTABIZZ_SECURITY_PERMISSION_MAP.md → docs/ESTABIZZ_SECURITY_PERMISSION_MAP.md
ESTABIZZ_CURRENT_COMPLETION_STATUS.md → docs/ESTABIZZ_CURRENT_COMPLETION_STATUS.md
ESTABIZZ_TECHNICAL_DEBT_REGISTER.md → docs/ESTABIZZ_TECHNICAL_DEBT_REGISTER.md
ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md → docs/ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md
ESTABIZZ_NEXT_20_TASKS.md → docs/ESTABIZZ_NEXT_20_TASKS.md
ESTABIZZ_REPOSITORY_STRUCTURE_MAP.md → docs/ESTABIZZ_REPOSITORY_STRUCTURE_MAP.md
ESTABIZZ_FILE_CLASSIFICATION_REGISTER.md → docs/ESTABIZZ_FILE_CLASSIFICATION_REGISTER.md
ESTABIZZ_DUPLICATE_UNUSED_FILE_REPORT.md → docs/ESTABIZZ_DUPLICATE_UNUSED_FILE_REPORT.md
ESTABIZZ_RECOMMENDED_FOLDER_STRUCTURE.md → docs/ESTABIZZ_RECOMMENDED_FOLDER_STRUCTURE.md
ESTABIZZ_FOLDER_CLEANUP_PLAN.md → docs/ESTABIZZ_FOLDER_CLEANUP_PLAN.md
ADMIN_OS_DISASTER_RECOVERY.md → docs/ADMIN_OS_DISASTER_RECOVERY.md
ADMIN_OS_PRODUCTION_READINESS.md → docs/ADMIN_OS_PRODUCTION_READINESS.md
ADMIN_OS_SECURITY_MATRIX.md → docs/ADMIN_OS_SECURITY_MATRIX.md
ADMIN_OS_SEO_DEPLOYMENT_CHECKLIST.md → docs/ADMIN_OS_SEO_DEPLOYMENT_CHECKLIST.md
ADMIN_OS_STAGING_RELEASE_PACKAGE.md → docs/ADMIN_OS_STAGING_RELEASE_PACKAGE.md
SECURITY_INCIDENT_S2.md → docs/SECURITY_INCIDENT_S2.md
```

**Note**: AGENTS.md may need to remain at the root if external agent systems expect it there. Check before moving.

---

## Summary Table

| Phase | Actions | Priority | Effort | Risk |
|-------|---------|----------|--------|------|
| 1 | `.gitignore` fixes (2 actions) | P0 | Trivial | None |
| 2 | Delete empty/legacy files (3 actions) | P0–P1 | Small | None (verify imports first) |
| 3 | Resolve `proxy.ts` | P1 | Small | Low (test locally before deploy) |
| 4 | Fix `RegulatorySevices.tsx` typo | P2 | Small | Low (update imports) |
| 5 | Move `FAQAccordion.tsx` | P3 | Small | Low (update imports) |
| 6 | Consolidate redirect routes | P3 | Medium | Low (test all redirects) |
| 7 | Create `docs/` + move .md files | P3 | Medium | Low (update cross-references) |

**Start with Phase 1 and Phase 2** — they are zero-risk and do not require import changes or testing.
