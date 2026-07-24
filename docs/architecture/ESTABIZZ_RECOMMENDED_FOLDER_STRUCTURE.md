# Estabizz — Recommended Folder Structure

> Created: 2026-07-22 · Branch: **main** (confirmed) · Audit commit: **73f04af**
> This document describes the target folder structure after cleanup. It does NOT prescribe moving files in one session — see ESTABIZZ_FOLDER_CLEANUP_PLAN.md for the phased, safe sequence of changes.

---

## Current vs. Recommended: Top-Level

### Current (as of audit)

```
/ (project root)
├── app/
├── components/
├── lib/
├── scripts/
├── public/
├── scratch/                      ← empty; no purpose
├── proxy.ts                      ← misnamed; never invoked by Next.js
├── tsconfig.tsbuildinfo          ← generated; should be gitignored
├── Estabizz_Project_Documentation.docx  ← untracked binary; should be gitignored
├── [19 .md documentation files]  ← mixed at root with config files
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── vercel.json
└── .eslintrc.json
```

### Recommended (target state)

```
/ (project root)
├── app/                          ← unchanged
├── components/                   ← unchanged
├── lib/                          ← unchanged (with minor internal cleanup)
├── scripts/                      ← unchanged
├── public/                       ← unchanged
├── docs/                         ← NEW: all .md documentation files
│   ├── CMS_STATUS.md
│   ├── AGENTS.md
│   ├── ESTABIZZ_PROJECT_MASTER_CONTEXT.md
│   ├── ESTABIZZ_AGENT_OPERATING_GUIDE.md
│   ├── ESTABIZZ_TECHNICAL_ARCHITECTURE.md
│   ├── ESTABIZZ_MODULE_INVENTORY.md
│   ├── ESTABIZZ_API_DATABASE_MAP.md
│   ├── ESTABIZZ_SECURITY_PERMISSION_MAP.md
│   ├── ESTABIZZ_CURRENT_COMPLETION_STATUS.md
│   ├── ESTABIZZ_TECHNICAL_DEBT_REGISTER.md
│   ├── ESTABIZZ_FUTURE_PRODUCT_ROADMAP.md
│   ├── ESTABIZZ_NEXT_20_TASKS.md
│   ├── ESTABIZZ_REPOSITORY_STRUCTURE_MAP.md
│   ├── ESTABIZZ_FILE_CLASSIFICATION_REGISTER.md
│   ├── ESTABIZZ_DUPLICATE_UNUSED_FILE_REPORT.md
│   ├── ESTABIZZ_RECOMMENDED_FOLDER_STRUCTURE.md
│   ├── ESTABIZZ_FOLDER_CLEANUP_PLAN.md
│   ├── ADMIN_OS_DISASTER_RECOVERY.md
│   ├── ADMIN_OS_PRODUCTION_READINESS.md
│   ├── ADMIN_OS_SECURITY_MATRIX.md
│   ├── ADMIN_OS_SEO_DEPLOYMENT_CHECKLIST.md
│   ├── ADMIN_OS_STAGING_RELEASE_PACKAGE.md
│   └── SECURITY_INCIDENT_S2.md
├── middleware.ts                 ← RENAMED from proxy.ts (after content verification)
├── next.config.js                ← unchanged
├── postcss.config.js             ← unchanged
├── tailwind.config.js            ← unchanged
├── tsconfig.json                 ← unchanged
├── package.json                  ← unchanged
├── vercel.json                   ← unchanged
└── .eslintrc.json                ← unchanged
```

**Files removed from root**:
- `scratch/` (empty directory — deleted)
- `tsconfig.tsbuildinfo` (added to `.gitignore`)
- `Estabizz_Project_Documentation.docx` (added to `.gitignore`)
- `proxy.ts` (renamed to `middleware.ts` or deleted)

---

## Recommended: lib/ Internal Cleanup

### Current lib/ notable files to address

```
lib/
├── regulatoryUpdates.ts          ← REMOVE (legacy static data, superseded)
├── blog/
│   └── sampleBlogs.ts            ← REMOVE (empty array, unused)
└── (all other files — keep as-is)
```

### Recommended lib/ (after cleanup)

```
lib/
├── db.ts                         ← unchanged
├── anthropic.ts                  ← unchanged (dormant; keep for future enablement)
├── faqEngine.ts                  ← unchanged
├── servicePageTemplate.ts        ← unchanged (documentation-as-code; intentional)
├── admin/                        ← unchanged
├── auth/                         ← unchanged
├── blog/                         ← remove sampleBlogs.ts; keep all others
├── content/                      ← unchanged
├── models/                       ← unchanged
├── publicContent/                ← unchanged
├── regulatory/                   ← unchanged
├── seo/                          ← unchanged
└── landing/                      ← unchanged
```

---

## Recommended: components/ Internal Cleanup

### Current state

```
components/
├── FAQAccordion.tsx              ← lone file at root (not in subfolder)
└── home/
    └── RegulatorySevices.tsx     ← typo in filename ("Sevices")
```

### Recommended target

```
components/
├── ui/
│   └── FAQAccordion.tsx          ← MOVED into ui/ subfolder (or keep at root — low priority)
└── home/
    └── RegulatoryServices.tsx    ← RENAMED to fix typo (requires import update)
```

**Note on `FAQAccordion.tsx`**: Moving it to `components/ui/` is a minor cosmetic improvement. The more important fix is the `RegulatorySevices.tsx` typo, which is confusing for developers. Both require updating imports in files that reference them.

---

## Recommended: Redirect Routes → next.config.js

### Current state
17 redirect-only `page.tsx` files spread across `app/sebi/`, `app/ifsca/`, `app/regulatory/`, `app/admin/media/`.

### Recommended (optional, lower priority)

Move all redirect logic into `next.config.js` using the built-in `redirects` function:

```js
// next.config.js (partial — existing config preserved)
async redirects() {
  return [
    // SEBI aliases
    { source: '/sebi/investment-adviser-registration', destination: '/sebi/ria-registration-in-india', permanent: true },
    { source: '/sebi/portfolio-manager-registration', destination: '/sebi/pms-registration-in-india', permanent: true },
    { source: '/sebi/research-analyst-registration', destination: '/sebi/research-analyst-registration-in-india', permanent: true },
    { source: '/sebi/sebi-ria-registration', destination: '/sebi/ria-registration-in-india', permanent: true },
    { source: '/sebi/sebi-stock-broker-registration', destination: '/sebi/stock-broker-registration-in-india', permanent: true },
    { source: '/sebi/social-stock-exchange-license', destination: '/sebi/social-stock-exchange-license-india', permanent: true },
    { source: '/sebi/stock-broker-license-india', destination: '/sebi/stock-broker-registration-in-india', permanent: true },
    { source: '/sebi/stock-broker-registration', destination: '/sebi/stock-broker-registration-in-india', permanent: true },
    // IFSCA aliases
    { source: '/ifsca/aircraft-leasing', destination: '/ifsca/aircraft-leasing-registration-in-ifsc', permanent: true },
    { source: '/ifsca/batf-services', destination: '/ifsca/batf-services-registration-in-gift-ifsc', permanent: true },
    { source: '/ifsca/finance-company', destination: '/ifsca/finance-company-in-gift-ifsc', permanent: true },
    { source: '/ifsca/finance-company-registration-in-ifsc', destination: '/ifsca/finance-company-in-gift-ifsc', permanent: true },
    { source: '/ifsca/fintech-entity', destination: '/ifsca/ifsca-fintech-startup-incentives', permanent: true },
    { source: '/ifsca/itfs-platform', destination: '/ifsca/itfs-registration-in-gift-ifsc', permanent: true },
    { source: '/ifsca/psp-license', destination: '/ifsca/psp-license-ifsca', permanent: true },
    // Other
    { source: '/regulatory/psp-license-ifsca', destination: '/ifsca/psp-license-ifsca', permanent: true },
    { source: '/admin/media', destination: '/admin/media-library', permanent: true },
  ]
}
```

After consolidating into `next.config.js`, the 17 individual `page.tsx` redirect files can be deleted.

**Benefit**: Reduces the app route tree by 17 files; redirects execute at the edge (faster than page-level redirects).

**Risk**: If any of these redirect URLs are used in internal links, they will still work (they just now redirect via config rather than page).

---

## Recommended: .gitignore Additions

Add these patterns to `.gitignore`:

```gitignore
# TypeScript incremental build cache
tsconfig.tsbuildinfo

# Generated documentation
*.docx
Estabizz_Project_Documentation.docx
```

`public/tailwind.css` is acceptable to keep in git (it is the CSS file loaded by `layout.tsx` and must be present for the site to render). No change needed there.

---

## Priority Order for Structural Changes

| Priority | Change | Effort | Risk |
|----------|--------|--------|------|
| P0 | Add `tsconfig.tsbuildinfo` to `.gitignore` | Trivial | None |
| P0 | Add `*.docx` to `.gitignore` | Trivial | None |
| P0 | Delete `lib/blog/sampleBlogs.ts` | Trivial | None |
| P1 | Delete `lib/regulatoryUpdates.ts` | Small | Verify no imports first |
| P1 | Delete `scratch/` directory | Trivial | None |
| P1 | Resolve `proxy.ts` (rename or delete) | Small | Review contents; rename activates middleware immediately |
| P2 | Fix typo `RegulatorySevices.tsx` → `RegulatoryServices.tsx` | Small | Update all imports |
| P2 | Move `FAQAccordion.tsx` into `components/ui/` | Small | Update all imports |
| P3 | Create `docs/` and move all `.md` files | Medium | Update any cross-references to file paths |
| P3 | Consolidate redirects into `next.config.js` | Medium | Test all 17 redirects after migration |

---

## Changes NOT Recommended

| Change | Reason not recommended |
|--------|----------------------|
| Splitting `lib/` into `lib/` + `models/` at root | Models are already well-organized in `lib/models/`; a second `models/` folder at root would create confusion |
| Introducing `src/` directory | Would require updating every import path; no functional benefit |
| Moving `scripts/` into `lib/` | Scripts are not part of the Next.js app; keeping them separate is correct |
| Removing `AGENTS.md` | Some older agent workflows may reference it; supersede gradually |
| Moving `vercel.json` into a config subfolder | Vercel requires it at the root |
| Moving `next.config.js` into a config subfolder | Next.js requires it at the root |
