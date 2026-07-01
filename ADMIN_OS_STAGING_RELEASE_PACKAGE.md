# Estabizz Admin OS — Staging Release Package

> Created: Phase 6B (2026-07-02 IST) · Do not include credentials in this file.
> This is a readiness and planning document only. No push or deployment was performed in Phase 6B.

---

## 1. Purpose

This document is the authoritative release package for the Estabizz Admin OS and Website CMS. It records the exact state of the codebase approved for staging and production deployment, all pre-deployment verification results, and the complete checklist for staging deployment, smoke testing, and rollback.

No deployment is authorised until the owner completes the Go / No-Go matrix (§18) and explicitly approves each step.

---

## 2. Current Approved Phase / Status

| Item | Value |
|---|---|
| Phase | 6B — Final Staging Deployment Preparation |
| Status | Completed locally — QA passed |
| Latest approved commit | `1a473d8 CMS Phase 6A: sitemap robots SEO readiness` |
| Public Content CMS | 46 managed pages (Phase 4R baseline) |
| Sitemap | 69 total URLs — 46 CMS + 19 hub/legal + regulatory + blogs |
| Production build | PASS — 137 pages |
| TypeScript | CLEAN |
| Push to GitHub | Not performed |
| Deployment | Not performed |
| Phase 6C | Not started |

---

## 3. Latest Approved Commit

```
1a473d8 CMS Phase 6A: sitemap robots SEO readiness
```

Confirmed clean at Phase 6B audit:
- `git status --short` → empty (clean working tree)
- `git log --oneline -1` → `1a473d8 CMS Phase 6A: sitemap robots SEO readiness`
- `npx tsc --noEmit` → CLEAN (no errors)
- `npm run build` → PASS (137 pages, `/sitemap.xml ○ Static`)

---

## 4. Release Scope

This release delivers the full Estabizz Admin OS (content management, approval, SEO, media, backup, users) and connects 46 public service/regulatory pages to the CMS for live admin-controlled editing.

**What is included:**
- All Admin OS modules listed in §5
- 46 CMS-managed public content pages
- DB-first rendering for all 46 managed paths
- Pending Changes → Approval Queue → Publish workflow
- Sitemap (69 URLs, 46 CMS pages, dynamic from DB)
- Robots (extended disallow list)
- Canonical URL management via `lib/seo/siteUrl.ts`

**What is NOT included:**
- New pages beyond the 46 managed paths
- Any 19-5 routes (excluded by policy)
- Any `/legal/*` pages (excluded by policy)
- Any `/resources/*` pages beyond `regulatory-updates` listing
- Real-time sitemap refresh (sitemap is pre-rendered at build time)
- Rate limiting on `/api/auth/login`
- Custom `not-found.tsx` or `error.tsx`
- Email sending (RESEND_API_KEY not configured)
- AI features (ANTHROPIC_API_KEY not configured)
- Google Search Console verification tag (deferred to Phase 6C+)
- Schema.org / JSON-LD for service pages (deferred)

---

## 5. Modules Included in Release

### 5.1 Homepage CMS
- 17 sections editable from admin: hero, stats, trusted-by, global markets, solutions, why choose us, regulatory services, process, compliance portal, final CTA, footer, navbar, case highlights, testimonials, content framework, resource architecture, and SEO settings
- Each section = a `ContentBlock` key; save through `getContent()` / `saveContent()` pattern
- Super Admin → publishes instantly; other roles → approval queue

### 5.2 Public Content CMS — 46 CMS-managed public pages

| Regulator | Count | Paths |
|---|---|---|
| RBI | 15 | `/rbi/nbfc-registration-in-india`, `/rbi/payment-aggregator-license-in-india`, `/rbi/ppi-registration-in-india`, `/rbi/arc-registration-in-india`, `/rbi/nbfc-sro-registration`, `/rbi/lendtech-services`, `/rbi/nbfc-aa-license-guide`, `/rbi/nbfc-account-aggregator-license`, `/rbi/full-fledged-money-changers`, `/rbi/nbfc-financial-modeling`, `/rbi/nbfc-for-sale`, `/rbi/nbfc-legal-support`, `/rbi/nbfc-marketing-strategy`, `/rbi/nbfc-takeover`, `/rbi/rbi-services` |
| SEBI | 10 | `/sebi/aif-registration-in-india`, `/sebi/pms-registration-in-india`, `/sebi/mutual-fund-registration`, `/sebi/ria-registration-in-india`, `/sebi/stock-broker-registration-in-india`, `/sebi/amfi-registration`, `/sebi/research-analyst-registration-in-india`, `/sebi/reit-registration`, `/sebi/credit-rating-agency`, `/sebi/depository-participant-sebi-registration` |
| IRDAI | 4 | `/irdai/insurance-broker-registration-in-india`, `/irdai/reinsurance-broker-registration-in-india`, `/irdai/corporate-agent-registration-in-india`, `/irdai/composite-insurance-broker-registration-in-india` |
| IFSCA | 2 | `/ifsca/aircraft-leasing-registration-in-ifsc`, `/ifsca/psp-license-ifsca` |
| FEMA | 2 | `/fema/compliance-under-fema`, `/fema/fema-registration` |
| Services | 13 | `/services/transfer-pricing`, `/services/india-entry-strategy`, `/services/finance-accounting-outsourcing`, `/services/gst-appeal-services`, `/services/esg-consulting`, `/services/data-storage-policy`, `/services/enterprise-services`, `/services/legal-due-diligence`, `/services/legal-process-outsourcing`, `/services/pap-license`, `/services/sustainable-finance`, `/services/sustainable-supply-chain`, `/services/trademark-search` |

Each managed page:
- `export const dynamic = 'force-dynamic'`
- DB-first rendering via `getPublicContentPageRenderState()`
- Pending Changes → Approval Queue workflow
- Controlled design/media presets
- Recycle Bin soft-delete/restore (hard purge permanently blocked)
- Included in GitHub JSON Backup

### 5.3 SEO Editor
- 14 public pages editable at `/admin/seo`
- Fields: title (60-char), description (160-char), focus keyword, canonical URL, robots flags, OG/Twitter tags
- Permission-gated: `view_admin` → view; `manage_seo` → save

### 5.4 Media Library
- `/admin/media-library` — Cloudinary-backed, unsigned upload preset
- Upload JPG/PNG/WebP/SVG/PDF; search/filter; grid/list view; edit alt text/caption/tags; copy link; soft remove
- Permission-gated: `manage_media` → upload; `delete_content` → remove

### 5.5 Approval Queue
- `/admin/approval-queue` — unified queue for: Content Blocks, Public Content Pages, Regulatory Updates, Blog submissions
- Permission-gated: `view_admin` → view; `publish_content` → approve/reject
- Self-review blocked; last super_admin protected

### 5.6 Recycle Bin
- `/admin/recycle-bin` — soft-deleted media and content blocks; regulatory update and public content page deletes
- Restore reactivates; permanent purge requires typing "DELETE" + `purge_content` permission
- Public Content Page purge hard-blocked at every layer — tombstone safety

### 5.7 Backup / Restore
- `/admin/backups` — manual backup to JSON; optional push to GitHub repo
- Covers: ContentBlock, ContentVersion, ContentAudit, MediaAsset, AdminUser (safe fields), PublicContentPage (46 managed), RegulatoryUpdate
- Never includes: passwordHash, JWT secret, MongoDB URI, Cloudinary secret, GitHub token, User credential collection
- Permission-gated: `view_admin` → list; `manage_backups` → create/download
- Restore at `/admin/restore` — permission-gated (`publish_content`)

### 5.8 Regulatory Updates
- `/admin/regulatory-updates` — full lifecycle (Draft → Pending → Published / Rejected / Archived)
- Regulators: RBI, SEBI, IRDAI, IFSCA, FIU-IND, MCA, FEMA, Income Tax, GST, Other
- Public listing at `/resources/regulatory-updates` (published only)
- Pending Changes workflow for published updates
- Recycle Bin integration; Backup included

### 5.9 Users / Roles
- `/admin/users` — view, search, filter, create and edit admin users; role and status change; login access
- Permission-gated: `manage_users` → super_admin only
- Last super_admin protection; self-demotion warning

### 5.10 Sitemap / Robots
- `/sitemap.xml` — dynamic (DB query at build time), 69 URLs, 46 CMS pages
- `/robots.txt` — disallows admin/api/auth/internal-tool routes
- Canonical URL via `lib/seo/siteUrl.ts` → `getSiteUrl()`

---

## 6. Modules Excluded from This Release

| Module | Status | Reason |
|---|---|---|
| 19-5 pages CMS | Excluded | Policy: 19-5 routes excluded from managed paths |
| `/legal/*` CMS | Excluded | Policy: legal pages excluded from managed paths |
| `/resources/*` CMS (non-regulatory) | Excluded | Policy: resource pages excluded from managed paths |
| AI content features | Excluded | `ANTHROPIC_API_KEY` not configured |
| Email notifications | Excluded | `RESEND_API_KEY` not configured |
| Rate limiting on login | Excluded | Known gap — documented in `ADMIN_OS_PRODUCTION_READINESS.md` §14 |
| Custom error pages (`not-found.tsx`, `error.tsx`) | Excluded | Next.js defaults apply |
| Google Search Console verification | Excluded | Deferred to Phase 6C+ |
| Schema.org / JSON-LD for service pages | Excluded | Deferred to Phase 6C+ |
| Live sitemap refresh (on-demand) | Excluded | Sitemap is pre-rendered at build time |
| Sales CRM | Excluded | Not built |
| Client ticketing | Excluded | Not built |
| Blog redesign | Excluded | Not built |

---

## 7. Environment Variable Checklist (Names Only)

> Values must be set in Vercel / staging environment. Never commit values.

### Required (will fail without these)

| Variable | Purpose | Notes |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | Must allow connections from Vercel IP range |
| `JWT_SECRET` | Signs admin session tokens | Min 32 random bytes recommended |

### Required for Media Library (will fail without these)

| Variable | Purpose | Notes |
|---|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (public-safe) | From Cloudinary dashboard |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset name (public-safe) | Create as "Unsigned" preset in Cloudinary |

### Required for GitHub JSON Backup (only if backup-to-GitHub is desired)

| Variable | Purpose | Notes |
|---|---|---|
| `GITHUB_BACKUP_TOKEN` | PAT with `contents:write` scope | Never log or expose |
| `GITHUB_BACKUP_OWNER` | GitHub org or user owning backup repo | e.g. `estabizz` |
| `GITHUB_BACKUP_REPO` | Backup repository name | e.g. `cms-backups` |
| `GITHUB_BACKUP_BRANCH` | Branch to commit backups to | e.g. `main` |
| `GITHUB_BACKUP_PATH` | Path prefix inside repo | e.g. `backups/` |

If GitHub backup env vars are missing, backup saves locally only with a friendly message. No build error.

### Optional (features remain dormant if not set)

| Variable | Purpose | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | AI content features | Not used in current release |
| `RESEND_API_KEY` | Email notifications | Not used in current release |
| `LEAD_NOTIFY_EMAIL` | Lead notification destination | Not used in current release |
| `LEAD_FROM_EMAIL` | Lead notification sender | Not used in current release |
| `NEXT_PUBLIC_SITE_URL` | Override canonical site URL | Falls back to `https://www.estabizz.com`; only needed for staging override |
| `ADMIN_SEED_PASSWORD` | Used by seed script only | Not needed at runtime |

### NOT used by the application (legacy / Cloudinary server-side)

| Variable | Status |
|---|---|
| `CLOUDINARY_API_KEY` | Not in application code — Cloudinary uses unsigned upload preset only |
| `CLOUDINARY_API_SECRET` | Not in application code — no server-side Cloudinary API calls |

---

## 8. MongoDB Readiness Checklist

- [ ] MongoDB Atlas cluster is running and accessible
- [ ] `MONGODB_URI` includes the correct cluster URL, database name, and credentials
- [ ] MongoDB Atlas IP Access List includes Vercel's IP ranges (or `0.0.0.0/0` for initial staging)
- [ ] `public_content_pages` collection: exactly **46 published** records, 0 pending, 0 deleted, 0 draft
- [ ] `admin_users` collection: contains `info@estabizz.com` (admin) and `estabizz@gmail.com` (super_admin) — no `.test` domain emails
- [ ] `content_blocks` collection: populated with baseline content
- [ ] `regulatory_updates` collection: contains any pre-seeded regulatory updates
- [ ] `media_assets` collection: present (may be empty for fresh staging deploy)
- [ ] `backup_snapshots` collection: present (may be empty)
- [ ] No QA/test records remain in any collection
- [ ] Indexes are present (auto-created by Mongoose on first connect)
- [ ] Read/write access confirmed for the connection user

---

## 9. Cloudinary Readiness Checklist

- [ ] Cloudinary account created and active
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` value retrieved from Cloudinary dashboard
- [ ] Unsigned upload preset created with name matching `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- [ ] Upload preset configured: allowed formats (jpg, png, webp, svg, pdf), max file size as desired
- [ ] Cloudinary **does not** require API key/secret at runtime — unsigned uploads only
- [ ] Test upload via admin Media Library after staging deployment

---

## 10. GitHub Backup Readiness Checklist

If GitHub JSON backup is desired (optional):

- [ ] Dedicated backup repository created (e.g. `estabizz/cms-backups`)
- [ ] Personal Access Token (classic) created with `contents:write` scope for that repo
- [ ] `GITHUB_BACKUP_TOKEN`, `GITHUB_BACKUP_OWNER`, `GITHUB_BACKUP_REPO`, `GITHUB_BACKUP_BRANCH`, `GITHUB_BACKUP_PATH` all set in Vercel
- [ ] Test backup creation from Admin → Backups after staging deployment
- [ ] Confirm backup file appears in the GitHub repo

If GitHub backup env vars are missing — backup saves locally only. No error shown to user; friendly message displayed.

---

## 11. Vercel / Staging Configuration Checklist

- [ ] Vercel project created and linked to the correct GitHub repository
- [ ] All required env vars set in Vercel project settings (§7) for staging environment
- [ ] `NEXT_PUBLIC_SITE_URL` set to the staging URL if deploying to a non-production domain
- [ ] Build command: `npm run build` (Next.js default)
- [ ] Output directory: `.next` (Next.js default)
- [ ] Node.js version: match project's `.nvmrc` / `engines` if specified
- [ ] Auto-deploy on push is DISABLED (per `AGENTS.md §10` — deploy via Vercel CLI only)
- [ ] Vercel CLI installed locally: `npm i -g vercel`
- [ ] Vercel CLI authenticated: `vercel login`
- [ ] Project linked: `vercel link`

---

## 12. Domain / DNS Checklist

For production (`https://www.estabizz.com`):
- [ ] Domain registered and DNS managed
- [ ] `www` CNAME pointing to Vercel (or Vercel nameservers)
- [ ] SSL certificate auto-provisioned by Vercel (Let's Encrypt)
- [ ] Domain attached in Vercel project → Settings → Domains
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://www.estabizz.com` (or omitted — same effect)
- [ ] Redirect `estabizz.com` → `www.estabizz.com` configured if needed

For staging (non-production):
- [ ] Use Vercel preview URL (e.g. `https://estabizz-legal-xyz.vercel.app`) or attach a staging subdomain
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the staging URL for correct sitemap/robots output

---

## 13. Admin Access Checklist

- [ ] Super admin account `estabizz@gmail.com` can log in at `/login`
- [ ] Admin account `info@estabizz.com` can log in at `/login`
- [ ] Both accounts redirect to `/admin` after login
- [ ] Admin panel renders all expected sections
- [ ] No `.test` domain users exist in `admin_users` collection
- [ ] Creating a new admin user from `/admin/users` works
- [ ] New user can log in with the generated password
- [ ] Role change takes effect on next login
- [ ] Suspended user cannot log in
- [ ] Last super_admin cannot be demoted/suspended

---

## 14. Pre-Deployment Checklist

Complete all items before pushing to any remote or deploying to any environment:

- [ ] `git status --short` → empty (working tree clean)
- [ ] `git log --oneline -1` → `1a473d8 CMS Phase 6A: sitemap robots SEO readiness`
- [ ] `npx tsc --noEmit` → CLEAN
- [ ] `npm run build` → PASS (137 pages, no errors)
- [ ] `git restore public/tailwind.css` if build modified it
- [ ] `git restore next-env.d.ts` if build modified it
- [ ] `git ls-files | grep -E '\.env'` → empty (no env files tracked)
- [ ] No QA scripts, backup JSON, token/session files, or `.claude/worktrees` in project
- [ ] `public_content_pages` DB collection: 46 published, 0 pending, 0 deleted
- [ ] `admin_users` DB collection: no `.test` email addresses
- [ ] Owner has reviewed and approved deployment
- [ ] Rollback plan (§17) reviewed and understood

---

## 15. Deployment Command Checklist

> **NOT EXECUTED — document only. Execute only after owner approval.**

### Staging deployment

```bash
# Step 1 — Ensure CLI is ready
vercel login           # authenticate if needed
vercel link            # link to Vercel project if needed

# Step 2 — Deploy to staging (preview, not production)
npx vercel deploy      # deploys to a preview URL, NOT production

# Step 3 — Note the staging URL from output and run smoke tests
```

### Production deployment

```bash
# Only after staging smoke tests pass and owner approves production

# Step 1 — Deploy to production
npx vercel deploy --prod --yes

# Step 2 — Confirm the production URL is live
# Step 3 — Run post-deployment smoke tests (§16)
# Step 4 — Create first backup from Admin → Backups
```

> Per `AGENTS.md §10`: **Git-push auto-deploys are cancelled on this Vercel plan. Deploy via Vercel CLI only.** Do not use `git push` as a deployment mechanism.

---

## 16. Post-Deployment Smoke Test Checklist

Run all checks within 60 minutes of any deployment.

### Public routes

| # | Route | Expected result |
|---|---|---|
| 1 | `GET /` | HTTP 200, homepage renders with correct content |
| 2 | `GET /sitemap.xml` | HTTP 200, XML with 60+ URLs, `Content-Type: text/xml` |
| 3 | `GET /robots.txt` | HTTP 200, `Disallow: /admin/` present |
| 4 | `GET /resources/regulatory-updates` | HTTP 200, published updates listing |
| 5 | `GET /rbi/nbfc-registration-in-india` | HTTP 200, renders from DB |
| 6 | `GET /rbi/payment-aggregator-license-in-india` | HTTP 200 |
| 7 | `GET /sebi/aif-registration-in-india` | HTTP 200, renders from DB |
| 8 | `GET /sebi/mutual-fund-registration` | HTTP 200 |
| 9 | `GET /irdai/insurance-broker-registration-in-india` | HTTP 200 |
| 10 | `GET /ifsca/aircraft-leasing-registration-in-ifsc` | HTTP 200 |
| 11 | `GET /fema/compliance-under-fema` | HTTP 200 |
| 12 | `GET /services/enterprise-services` | HTTP 200 |
| 13 | `GET /services/legal-due-diligence` | HTTP 200 |
| 14 | `GET /services/trademark-search` | HTTP 200 |
| 15 | `GET /sebi/credit-rating-agency` | HTTP 200 |
| 16 | `GET /rbi` | HTTP 200, RBI hub page (non-managed) |
| 17 | `GET /sebi` | HTTP 200, SEBI hub page (non-managed) |
| 18 | `GET /irdai` | HTTP 200, IRDAI hub page (non-managed) |
| 19 | `GET /ifsca` | HTTP 200, IFSCA hub page (non-managed) |
| 20 | `GET /fema` | HTTP 200, FEMA hub page (non-managed) |
| 21 | `GET /services` | HTTP 200 |
| 22 | `GET /blogs` | HTTP 200, blog listing |
| 23 | `GET /contact` | HTTP 200 |
| 24 | `GET /pricing` | HTTP 200 |
| 25 | `GET /legal/privacy-policy` | HTTP 200 |
| 26 | `GET /this-path-does-not-exist-9999` | HTTP 404, Next.js not-found page |

### Admin routes (no cookie)

| # | Route | Expected result |
|---|---|---|
| 27 | `GET /admin` | Redirect to `/login?redirect=/admin` |
| 28 | `GET /admin/content-pages` | Redirect to login |
| 29 | `GET /admin/approval-queue` | Redirect to login |
| 30 | `GET /admin/recycle-bin` | Redirect to login |
| 31 | `GET /admin/backups` | Redirect to login |
| 32 | `GET /admin/seo` | Redirect to login |
| 33 | `GET /admin/media-library` | Redirect to login |
| 34 | `GET /admin/users` | Redirect to login |
| 35 | `GET /admin/change-history` | Redirect to login |
| 36 | `GET /admin/restore` | Redirect to login |
| 37 | `GET /admin/regulatory-updates` | Redirect to login |

### Admin routes (with valid super_admin cookie)

| # | Route | Expected result |
|---|---|---|
| 38 | `GET /admin` | HTTP 200, admin dashboard |
| 39 | `GET /admin/content-pages` | HTTP 200, 46 managed pages listed |
| 40 | `GET /admin/approval-queue` | HTTP 200, queue renders |
| 41 | `GET /admin/recycle-bin` | HTTP 200, bin renders |
| 42 | `GET /admin/backups` | HTTP 200, backup list |
| 43 | `GET /admin/seo` | HTTP 200, SEO editor |
| 44 | `GET /admin/media-library` | HTTP 200, media grid |
| 45 | `GET /admin/users` | HTTP 200, user list |
| 46 | `GET /admin/change-history` | HTTP 200, history log |
| 47 | `GET /admin/restore` | HTTP 200, restore panel |
| 48 | `GET /admin/regulatory-updates` | HTTP 200, updates desk |

### API routes (no cookie)

| # | Endpoint | Expected result |
|---|---|---|
| 49 | `GET /api/auth/me` | HTTP 200, `{ user: null }` — never 401 |
| 50 | `GET /api/admin/content-pages/by-path?path=/rbi/nbfc-registration-in-india` | HTTP 401 |
| 51 | `GET /api/admin/approval-queue` | HTTP 401 |
| 52 | `GET /api/admin/recycle-bin` | HTTP 401 |
| 53 | `GET /api/admin/backups` | HTTP 401 |
| 54 | `POST /api/admin/restore/action` | HTTP 401 |
| 55 | `GET /api/admin/change-history` | HTTP 401 |

### SEO verification

| # | Check | Expected result |
|---|---|---|
| 56 | Sitemap contains `/rbi/nbfc-registration-in-india` | Absolute URL present |
| 57 | Sitemap contains `/sebi/aif-registration-in-india` | Absolute URL present |
| 58 | Sitemap contains `/services/enterprise-services` | Absolute URL present |
| 59 | Sitemap does NOT contain `/admin` | Confirmed absent |
| 60 | Sitemap does NOT contain `localhost` | Confirmed absent |
| 61 | robots.txt sitemap line | `Sitemap: https://www.estabizz.com/sitemap.xml` |
| 62 | Page source of any CMS-managed page | `<link rel="canonical">` uses production URL, not localhost |

### Security verification

| # | Check | Expected result |
|---|---|---|
| 63 | `auth_token` cookie properties | `httpOnly: true`, `Secure: true` (production HTTPS), `SameSite=Lax` |
| 64 | Page source of any page | No MongoDB URI, JWT secret, Cloudinary secret visible |
| 65 | `/api/admin/users` response | No `passwordHash` field in any user record |
| 66 | `/api/admin/backups` list response | No `payload` field in response body |

---

## 17. Rollback Plan

### Path 1 — Vercel instant rollback (preferred)

Fastest, zero-downtime if Vercel deployment is the issue:
1. Log in to Vercel dashboard
2. Go to project → Deployments
3. Find the last known-good deployment
4. Click "Promote to Production" to instantly swap

### Path 2 — Git code rollback

If a code change caused the issue (and it has not yet been pushed):
1. Identify the last good commit: `git log --oneline`
2. Revert cleanly: `git revert HEAD~n` (creates a new commit — safe)
3. Deploy the revert commit: `npx vercel deploy --prod --yes`
4. Do NOT use `git reset --hard` on a pushed commit — risk of lost work

### Path 3 — CMS content restore from backup

If content data is corrupted or lost:
1. Download the latest backup from Admin → Backups (before deployment)
2. Follow the Scenario C runbook in `ADMIN_OS_DISASTER_RECOVERY.md`
3. Restore specific content blocks or public content pages from the backup JSON
4. Re-approve any pending changes lost during restore

### Path 4 — Recycle Bin content restore

If a content record was accidentally soft-deleted during deployment:
1. Go to Admin → Recycle Bin
2. Locate the deleted item
3. Click Restore — item returns to its prior status
4. For PublicContentPage: restore returns to published if it was published before deletion

### Path 5 — Admin user lockout

If admin access is lost:
1. Use the MongoDB Atlas console to directly query and update `admin_users`
2. Reset password hash using the seed script: `node scripts/seedAdmin.mjs`
3. Do NOT delete the last super_admin record — the last super_admin protection in code will not apply to direct DB edits

### Path 6 — Secret rotation

If a secret is suspected to be exposed:
1. `JWT_SECRET` — rotate in Vercel env vars, redeploy; all active sessions are immediately invalidated (users must log in again)
2. `MONGODB_URI` — rotate Atlas password, update in Vercel env vars, redeploy
3. `GITHUB_BACKUP_TOKEN` — revoke PAT in GitHub, generate new one, update in Vercel
4. `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` — these are public-safe; no rotation needed unless the preset is misconfigured
5. After any secret rotation — run smoke tests to confirm the application reconnects correctly

### Path 7 — Re-run smoke tests after rollback

After any rollback action, re-run all checks in §16 to confirm the rolled-back state is healthy.

---

## 18. Go / No-Go Decision Matrix

> Owner must review and sign off on each item. Do NOT deploy until all Go criteria are met.

### Go — all must be true

| # | Criterion | Status |
|---|---|---|
| 1 | `git status --short` is empty (clean working tree) | Verified at Phase 6B |
| 2 | Latest commit is `1a473d8` | Verified at Phase 6B |
| 3 | `npm run build` passes (137 pages, no errors) | Verified at Phase 6B |
| 4 | `npx tsc --noEmit` is CLEAN | Verified at Phase 6B |
| 5 | `public_content_pages`: exactly 46 published, 0 pending, 0 deleted | Verified at Phase 5C |
| 6 | `admin_users`: no `.test` email addresses | Verified at Phase 5C |
| 7 | Sitemap: 69 total URLs, 46 CMS-managed pages | Verified at Phase 6A |
| 8 | robots.txt: disallows `/admin/`, `/api/`, auth, internal tools | Verified at Phase 6A |
| 9 | All required env vars set in Vercel staging | **Must verify before deploy** |
| 10 | MongoDB Atlas IP Access List includes hosting IPs | **Must verify before deploy** |
| 11 | Cloudinary upload preset configured and active | **Must verify before deploy** |
| 12 | Admin login tested on staging deployment | **Must verify after staging deploy** |
| 13 | At least one backup creation tested on staging | **Must verify after staging deploy** |
| 14 | No secrets visible in any page source or API response | **Must verify after staging deploy** |
| 15 | Rollback path confirmed viable | Documented in §17 |

### No-Go — any of these blocks deployment

| # | Condition | Action |
|---|---|---|
| A | `npm run build` fails | Fix build errors before deploying |
| B | `npx tsc --noEmit` reports errors | Fix TypeScript errors before deploying |
| C | MongoDB Atlas unreachable from Vercel | Fix IP Access List or network config |
| D | Sitemap missing CMS-managed URLs | Diagnose DB connectivity or managed path mismatch |
| E | Admin login fails on staging | Check `MONGODB_URI`, `JWT_SECRET` env vars |
| F | Any required env var missing from Vercel | Add before deploying |
| G | Any secret visible in page source or API response | Fix immediately; do not proceed |
| H | `git status` is dirty (uncommitted changes) | Commit or stash before deploying |
| I | `public_content_pages` count ≠ 46 | Diagnose DB state before deploying |
| J | PublicContentPage records are pending/deleted (not 0) | Resolve before deploying |
| K | `.test` email addresses in `admin_users` | Delete test users before deploying |
| L | Backup creation fails on staging | Diagnose before production deployment |
| M | Vercel deployment target misconfigured | Fix Vercel project settings |
| N | Domain not attached or DNS not propagated | Resolve before production go-live |

---

## 19. Known Limitations

1. **Sitemap generated at build time** — CMS page publishes between deployments don't update the sitemap until the next deployment. Acceptable for current release cadence. (Phase 6C: add `dynamic = 'force-dynamic'` to `app/sitemap.ts` if needed.)

2. **No rate limiting on `/api/auth/login`** — Brute-force protection is not implemented. (Phase 6C recommendation.)

3. **No custom `not-found.tsx` or `error.tsx`** — Next.js default error/not-found pages are used. (Phase 6C recommendation.)

4. **Cloudinary media purge does not delete from Cloudinary** — Removing a media record from Admin OS soft-deletes the DB record but leaves the Cloudinary asset intact. Manual Cloudinary cleanup required.

5. **Blog soft-delete is permanent** — No Recycle Bin for blogs (pre-existing behavior).

6. **No Google Search Console verification** — Not added. Google ownership verification tag deferred to Phase 6C+.

7. **`RESEND_API_KEY` / `ANTHROPIC_API_KEY` features are dormant** — Email and AI features are not active in this release.

8. **Non-managed static pages not individually in sitemap** — Static sub-pages (e.g. `/ifsca/aircraft-leasing`, `/sebi/rta-registration-in-india` — the non-managed ones) are crawlable via link discovery from hub pages but are not individually listed. (Phase 6C.)

---

## 20. Final Note: Phase 6B Does Not Push or Deploy

This document is a preparation and readiness artifact only.

- **No push to GitHub was performed in Phase 6B.**
- **No deployment to Vercel was performed in Phase 6B.**
- **No deployment to any hosting provider was performed in Phase 6B.**
- **No new content pages were migrated in Phase 6B.**
- **No public page expansion was performed in Phase 6B.**
- **Phase 6C has not been started.**

Deployment is authorised only when the owner completes the Go / No-Go matrix (§18) and explicitly issues the deployment command from §15.
