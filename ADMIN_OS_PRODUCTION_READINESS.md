# Estabizz Admin OS — Production Readiness Reference

> Created: Phase 5C (2026-07-02 IST) · Do not include credentials in this file.
> No push or deployment was performed in Phase 5C. This document is a readiness gate only.

---

## 1. Purpose

This document records the results of the Phase 5C production readiness audit. It is the authoritative pre-deployment checklist for the Estabizz Admin OS and website. No code is deployed until the owner explicitly approves a deployment phase (Phase 6A+).

---

## 2. Current Approved Phase / Status

- **Phase 5C** — Production Readiness / Final Local Release Hardening
- **Local only** — not pushed to GitHub, not deployed to Vercel, not deployed to any hosting provider
- Public Content CMS: **46 managed pages** (Phase 4R baseline)
- Security hardening: **Phase 5A approved** — see `ADMIN_OS_SECURITY_MATRIX.md`
- Backup/DR hardening: **Phase 5B approved** — see `ADMIN_OS_DISASTER_RECOVERY.md`

---

## 3. Production Readiness Summary

| Area | Status | Notes |
|---|---|---|
| Production build | PASS | 137 pages, no TypeScript errors, no fatal errors |
| TypeScript | PASS | `npx tsc --noEmit` — clean |
| Environment variable checklist | READY | Names documented below; values confirmed in `.env.local` |
| Secret handling | PASS | No secrets in tracked files; `.env.local` untracked |
| Database readiness | PASS | 46 published pages, no duplicates, no QA users |
| Public route rendering | PASS | All 46 managed routes have `force-dynamic` and correct render logic |
| Admin route protection | PASS | JWT + allowlist + DB fallback; no bypass |
| API protection | PASS | `requirePermission` on all write/delete/publish APIs |
| Backup/restore readiness | PASS | Phase 5B confirmed; restore fix applied |
| Cookie/session security | PASS | `httpOnly`, `secure` (in prod), `sameSite: lax`, 7-day expiry |
| SEO / robots / sitemap | PARTIAL | robots.txt correct; sitemap missing 46 service pages — Phase 6A task |
| Error handling | PARTIAL | No custom `not-found.tsx` or `error.tsx` — Next.js defaults apply |
| Media / Cloudinary | PASS | Permission-gated; no API secret in frontend |
| Artifact scan | PASS | No QA scripts, backup JSON, token/session files, DS_Store |

---

## 4. Build Readiness

**Command:** `npm run build`
**Result:** PASS

```
Next.js 16.2.4 (Turbopack)
✓ Compiled successfully in 6.9s
✓ TypeScript clean (12.4s)
✓ Generating static pages using 7 workers (137/137)
```

- 137 pages generated (static, SSG, and dynamic)
- All 46 CMS-managed public content routes built as `ƒ (Dynamic)` — correct for `force-dynamic`
- All admin routes built as `ƒ (Dynamic)` — correct; no admin page is prerendered
- No TypeScript errors in build
- No fatal lint/build errors
- No secret values printed in build output
- `public/tailwind.css` restored after build (not committed — generated artifact)

Post-build TypeScript check: `npx tsc --noEmit` — **CLEAN**

---

## 5. Required Environment Variables

> Variable names only — no values. Values must be set in Vercel (production) or `.env.local` (local).

### Required for core operation

| Variable | Purpose | Required |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Signs and verifies `auth_token` JWTs | Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud for media upload widget | Yes (if media upload used) |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset | Yes (if media upload used) |

### Required for optional features

| Variable | Purpose | Feature gated |
|---|---|---|
| `GITHUB_BACKUP_TOKEN` | GitHub token for CMS backup push | Backup to GitHub; falls back to local-only |
| `GITHUB_BACKUP_OWNER` | GitHub org/user owning backup repo | Same |
| `GITHUB_BACKUP_REPO` | GitHub backup repository name | Same |
| `GITHUB_BACKUP_BRANCH` | GitHub backup branch (default: `main`) | Same |
| `GITHUB_BACKUP_PATH` | Path prefix in backup repo (default: `cms-backups`) | Same |
| `ANTHROPIC_API_KEY` | AI service recommender + chat widget | `/api/recommend-services`, `/api/chat` — return 500 without it |
| `RESEND_API_KEY` | Lead notification emails | Lead email alerts silently disabled without it |
| `LEAD_NOTIFY_EMAIL` | Recipient for lead alert emails | Used by Resend lead notifier |
| `LEAD_FROM_EMAIL` | Sender address for lead alert emails | Used by Resend lead notifier |
| `ADMIN_SEED_PASSWORD` | Seed admin user creation password | Only needed when running seed scripts |

### NEXT_PUBLIC safety note

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` are intentionally public-facing — they are required by the Cloudinary upload widget in the browser. They are **not** secrets.
- The Cloudinary API key and API secret are **not referenced** in frontend code.

---

## 6. Secret Handling Checklist

| Check | Status |
|---|---|
| `.env.local` exists locally | Yes (not tracked) |
| `.env.local` is in `.gitignore` | Yes (`/.env.local` and `/.env*.local`) |
| No `.env` files tracked | Confirmed — `git ls-files` returns no env files |
| `MONGODB_URI` not in any tracked file | Confirmed |
| `JWT_SECRET` not in any tracked file | Confirmed |
| Cloudinary API secret not in any tracked file | Confirmed |
| `GITHUB_BACKUP_TOKEN` not in any tracked file | Confirmed |
| No password hashes in committed docs | Confirmed |
| No generated backup JSON committed | Confirmed |
| No build output committed | Confirmed |
| `ADMIN_OS_*` docs contain variable names only — no values | Confirmed |
| `AGENTS.md` references variable names only | Confirmed |

---

## 7. Database Readiness Checklist

| Check | Status | Value |
|---|---|---|
| MongoDB connection works | Yes | Via `.env.local` `MONGODB_URI` |
| `public_content_pages` total records | 46 | Exact |
| All 46 have `status: published` | Yes | 46/46 |
| Deleted records | 0 | None |
| Records with pending changes | 0 | None |
| Duplicate `fullPath` values | 0 | None |
| Duplicate `slug` values | 0 | None |
| `admin_users` collection exists | Yes | 2 real users |
| `admin_users` real users | 2 | `info@estabizz.com` (admin), `estabizz@gmail.com` (super_admin) |
| `passwordHash` field in `admin_users` | 0 | Field is schema `select:false` and excluded by projection |
| QA/test users removed | Yes | 4 `.test` domain users deleted in Phase 5C |
| No QA changes remain | Yes | All 46 records at published baseline |

---

## 8. Media / Cloudinary Readiness Checklist

| Check | Status |
|---|---|
| Media listing requires `view_admin` | Confirmed |
| Media upload requires `manage_media` | Confirmed |
| Media soft-delete requires `delete_content` | Confirmed |
| Cloudinary API secret not in frontend code | Confirmed |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is public-safe | Confirmed |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` is public-safe | Confirmed |
| Image saves validate HTTPS URL | Confirmed — returns 400 on non-HTTPS |
| Image saves require alt text | Confirmed — returns 400 on missing alt text |
| Blocked image URL patterns enforced | Confirmed — `BLOCKED_IMAGE_URL` regex array |
| Media purge does NOT delete Cloudinary assets | Confirmed — documented gap, manual cleanup required |

---

## 9. Public Route Readiness Checklist

### 46 CMS-managed routes
| Check | Status |
|---|---|
| All 46 routes have `export const dynamic = 'force-dynamic'` | Confirmed — 46/46 |
| All 46 routes have `page.tsx` file | Confirmed — 0 missing |
| `getPublicContentPageRenderState()` used in all 46 | Confirmed — DB-first rendering pattern |
| Published record → `PublicContentPageRenderer` | Confirmed |
| Non-published/deleted record → `notFound()` | Confirmed — `blocked` mode calls `notFound()` |
| No DB record → `<PageClient />` (hardcoded fallback) | Confirmed — `fallback` mode |
| `pendingRevision` excluded from public rendering query | Confirmed — `.select('-pendingRevision ...')` |
| `BLOCKED_SOURCE_TERMS` prevents internal labels in public output | Confirmed — 10+ blocked terms |

### Key non-managed routes
| Route | Type | Status |
|---|---|---|
| `/` | Static | Builds as `○` (static) |
| `/resources/regulatory-updates` | Static | Confirmed in build |
| `/resources/regulatory-updates/[slug]` | SSG | Builds as `●` with pre-generated slugs |
| `/blogs/[slug]` | SSG | Builds as `●` |
| `/19-5/[slug]` | SSG | Builds as `●` |
| `/sitemap.xml` | Static | Confirmed in build |
| `/robots.txt` | Static | Confirmed in build |
| `/login` | Static | Confirmed |
| `/signup` | Static | Confirmed |

### robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://www.estabizz.com/sitemap.xml
```
Admin panel and API routes are correctly blocked from crawlers.

---

## 10. Admin Route Readiness Checklist

| Admin Route | Protection | Notes |
|---|---|---|
| `/admin` | JWT + allowlist/DB fallback via layout | Dashboard |
| `/admin/content-pages` | Layout guard | Read-only inventory; requires `view_admin` API |
| `/admin/content-pages/[slug]/edit` | Layout guard | Editor; requires `manage_content` to save |
| `/admin/approval-queue` | Layout guard | Requires `publish_content` to approve |
| `/admin/recycle-bin` | Layout guard | Requires `delete_content` to restore; `purge_content` to purge |
| `/admin/backups` | Layout guard | Requires `manage_backups` to create/download |
| `/admin/seo` | Layout guard | Requires `manage_seo` to save |
| `/admin/media-library` | Layout guard | Requires `manage_media` to upload |
| `/admin/users` | Layout guard | Requires `manage_users` (super_admin only) |
| `/admin/change-history` | Layout guard | Read-only; view scoped by role |
| `/admin/restore` | Layout guard | Requires `publish_content` to restore (fixed Phase 5B) |
| `/admin/regulatory-updates` | Layout guard | Requires `manage_content` to create/edit |

All `/admin/**` routes are protected by `app/admin/layout.tsx`:
- JWT signature verification
- `ADMIN_EMAIL_ALLOWLIST` fast path (seed/legacy)
- MongoDB `admin_users` DB fallback (panel-created users, fixed Phase 5A)
- Failure → redirect to `/login?redirect=/admin`

`export const metadata = { robots: { index: false, follow: false } }` is set on the admin layout — admin pages are never indexed.

---

## 11. API Protection Checklist

| API Route | Method | Permission | Unauth → |
|---|---|---|---|
| `POST /api/auth/login` | POST | Public | — |
| `GET /api/auth/me` | GET | Public | Returns `user: null` |
| `POST /api/auth/logout` | POST | Public | Clears cookie |
| `GET /api/admin/content-pages/by-path` | GET | `view_admin` | 401/403 |
| `PATCH /api/admin/content-pages/by-path` | PATCH | `manage_content` | 401/403 |
| `POST /api/admin/content-pages/by-path/approve` | POST | `publish_content` | 401/403 |
| `POST /api/admin/content-pages/by-path/reject` | POST | `publish_content` | 401/403 |
| `POST /api/admin/content-pages/by-path/delete` | POST | `delete_content` | 401/403 |
| `POST /api/admin/approval-queue/action` | POST | `view_admin` + `canReviewQueueItem()` | 401/403 |
| `GET /api/admin/recycle-bin` | GET | `view_admin` | 401/403 |
| `POST /api/admin/recycle-bin/restore` | POST | `delete_content` | 401/403 |
| `POST /api/admin/recycle-bin/purge` | POST | `purge_content` | 401/403 |
| `GET /api/admin/backups` | GET | `view_admin` | 401/403 |
| `POST /api/admin/backups/create` | POST | `manage_backups` | 401/403 |
| `GET /api/admin/backups/[id]/download` | GET | `manage_backups` | 401/403 |
| `GET /api/admin/users` | GET | `manage_users` | 401/403 |
| `POST /api/admin/users` | POST | `manage_users` | 401/403 |
| `PATCH /api/admin/users/[id]` | PATCH | `manage_users` | 401/403 |
| `GET /api/admin/media` | GET | `view_admin` | 401/403 |
| `POST /api/admin/media` | POST | `manage_media` | 401/403 |
| `GET /api/admin/restore` | GET | `view_admin` | 401/403 |
| `POST /api/admin/restore/action` | POST | `publish_content` | 401/403 |
| `GET /api/admin/change-history` | GET | `view_admin` | 401/403 |

Additional invariants:
- Non-managed `fullPath` values → `400` on all content-page write routes
- Self-review blocked in approval queue (`submittedBy === reviewer.email → 403`)
- Last `super_admin` cannot be demoted or suspended (`422`)
- Role change resets to `ROLE_DEFAULT_PERMISSIONS` — no privilege escalation

---

## 12. Backup / Restore Readiness Checklist

| Check | Status |
|---|---|
| Backup creates snapshot with correct item counts | Confirmed |
| Backup excludes all secrets | Confirmed — Phase 5B |
| Backup payload `select:false` in schema | Confirmed |
| Backup payload excluded from list responses | Confirmed — `-payload` projection |
| PublicContentPage backup scoped to 46 `PUBLIC_CONTENT_MANAGED_PATHS` | Confirmed |
| GitHub backup optional (env var gated) | Confirmed |
| Backup download requires `manage_backups` | Confirmed |
| Version restore requires `publish_content` at API layer | Confirmed — fixed Phase 5B |
| Version restore `canRestoreKey()` as second layer | Confirmed |
| Recycle Bin restore requires `delete_content` | Confirmed |
| PublicContentPage purge blocked at API layer | Confirmed |
| PublicContentPage purge blocked at library layer | Confirmed |
| ContentAudit records created for all backup/restore/purge actions | Confirmed |

---

## 13. SEO Readiness Checklist

| Check | Status | Notes |
|---|---|---|
| robots.txt disallows `/admin/` and `/api/` | Confirmed | Correct |
| Admin layout sets `robots: { index: false, follow: false }` | Confirmed | Admin never indexed |
| Blocked mode returns `robots: { index: false, follow: false }` | Confirmed | In `generateMetadata()` |
| Pending content not included in public metadata | Confirmed | `pendingRevision` excluded from select |
| CMS-managed page metadata uses published DB values | Confirmed | `generateMetadata()` uses `getPublicContentPageRenderState()` |
| Fallback metadata used when no DB record | Confirmed | `FALLBACK_METADATA` constant in each `page.tsx` |
| Internal admin URLs not appearing in public metadata | Confirmed | Canonical URLs from DB or `FULL_PATH` constant |
| sitemap.xml present | Yes | `/sitemap.xml` — but see gap below |
| **Sitemap includes 46 CMS-managed service/regulatory pages** | **GAP** | **Not implemented — Phase 6A/6B task** |
| `metadataBase` configured | Yes | Points to `https://www.estabizz.com` |
| OG / Twitter image metadata | Yes | Supported in CMS editor for managed pages |

**Sitemap gap (Phase 6A task):** `app/sitemap.ts` currently includes only the homepage, `/blogs`, `/submit-blog`, and published blog articles. The 46 CMS-managed public content pages and other static service/regulatory pages are not included. These pages have hardcoded or DB-driven canonical URLs but are not discoverable via `sitemap.xml`. This should be addressed before production as a Phase 6A task.

---

## 14. Security / Session / Cookie Notes

| Property | Value | Notes |
|---|---|---|
| Cookie name | `auth_token` | |
| `httpOnly` | `true` | Not accessible from JavaScript |
| `secure` | `process.env.NODE_ENV === 'production'` | HTTPS-only in production |
| `sameSite` | `'lax'` | Prevents cross-site request sending |
| `maxAge` | 7 days (604800 seconds) | |
| `path` | `/` | |
| JWT expiry | 7 days | Matches cookie maxAge |
| JWT signing algorithm | HS256 (jsonwebtoken default) | Signed with `JWT_SECRET` |

**No middleware.ts / edge pre-check:** There is no Next.js edge middleware for `/admin/**`. The `app/admin/layout.tsx` is the authoritative gate. AGENTS.md §7 references a non-existent `proxy.ts` edge gate — this comment is stale. The actual protection is the server-side layout guard (documented in `ADMIN_OS_SECURITY_MATRIX.md`).

**Session invalidation gap:** Active sessions are not invalidated when an admin's role or status changes. This is a known limitation documented in `ADMIN_OS_SECURITY_MATRIX.md` §10.

**CSRF:** State-mutating API routes rely on `httpOnly` cookie + `sameSite: lax`. No explicit CSRF token is implemented. Cross-site form submission is mitigated by `sameSite: lax` (blocks cross-origin POST).

---

## 15. Known Limitations (Pre-Production)

1. **Sitemap missing 46 service/regulatory pages** — `app/sitemap.ts` doesn't include CMS-managed or static service pages. Phase 6A task.

2. **No custom `not-found.tsx` or `error.tsx`** — Next.js built-in 404 and 500 pages are used. Acceptable for current phase; custom error pages would improve brand consistency.

3. **No edge middleware pre-check** — `/admin/**` routes are protected only by the layout server-side check (no Vercel edge function pre-check). CDN may serve a loading frame before redirect fires. No admin data is exposed before the check completes.

4. **No rate limiting on `POST /api/auth/login`** — Brute-force attacks are not rate-limited in code. Recommend Vercel rate limiting or a middleware-layer solution before production.

5. **`ANTHROPIC_API_KEY` not set → 500 on AI routes** — `/api/recommend-services` and `/api/chat` return 500 without this key. These features are silently dormant until the key is set.

6. **`RESEND_API_KEY` not set → lead emails disabled** — Lead email alerts are silently disabled until this key is set. The lead capture form still works.

7. **Custom domain not attached** — `metadataBase` points to `https://www.estabizz.com`. OG images and canonical URLs only fully resolve once the domain is attached in Vercel.

8. **Session invalidation on role change** — If an admin's role or status changes, their active session retains old permissions until the JWT expires (7 days).

9. **Purge doesn't verify item status** — As documented in `ADMIN_OS_DISASTER_RECOVERY.md` §9 — limited to super_admin/admin blast radius.

10. **AGENTS.md §7 is stale** — References a non-existent `proxy.ts` edge gate. Actual admin protection is documented in `ADMIN_OS_SECURITY_MATRIX.md`.

11. **Blog `delete_blog` is permanent** — No soft-delete for blogs (pre-existing behavior).

---

## 16. Pre-Deployment Checklist (Before Any Push)

Complete all items before pushing to any remote:

- [ ] Run `npm run build` locally and confirm clean
- [ ] Run `npx tsc --noEmit` and confirm clean
- [ ] Run `git status --short` and confirm no unintended tracked files
- [ ] Restore `public/tailwind.css` if modified by build: `git restore public/tailwind.css`
- [ ] Restore `next-env.d.ts` if modified: `git restore next-env.d.ts`
- [ ] Confirm no `.env` files are tracked: `git ls-files | grep env`
- [ ] Confirm no backup JSON files are committed
- [ ] Confirm no QA scripts or session/token files in project root
- [ ] Confirm MongoDB has 46 published PublicContentPage records (no pending, no deleted)
- [ ] Confirm all QA/test users are deleted from `admin_users`
- [ ] Review all commit messages for accidental secret exposure
- [ ] Owner approves the push and deployment phase

---

## 17. Staging Deployment Checklist

Complete all items before staging deployment:

- [ ] Set environment variables in staging: `MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- [ ] Optionally set GitHub backup env vars for staging backup testing
- [ ] Verify staging MongoDB has correct data (46 published pages, no QA users)
- [ ] Deploy to staging via Vercel CLI: `npx vercel deploy` (without `--prod`)
- [ ] Run smoke tests (see §20) against staging URL
- [ ] Verify admin login works in staging
- [ ] Verify 46 CMS-managed public routes return 200 in staging
- [ ] Verify admin API routes return 401/403 when unauthenticated in staging
- [ ] Verify backup creation works in staging
- [ ] Verify `secure` cookie flag is set (HTTPS staging URL)

---

## 18. Production Deployment Checklist

Complete all items before production deployment:

- [ ] Staging deployment successful (§17)
- [ ] All smoke tests pass on staging
- [ ] Owner approves production deployment
- [ ] Set all required env vars in Vercel production: `MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- [ ] Optionally set optional env vars: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`, GitHub backup vars
- [ ] Attach `www.estabizz.com` domain in Vercel
- [ ] Deploy via Vercel CLI: `npx vercel deploy --prod --yes`
- [ ] Run post-deployment smoke tests (§20)
- [ ] Verify `auth_token` cookie is `Secure` in production (HTTPS)
- [ ] Verify robots.txt serves correctly at production URL
- [ ] Create first production backup via Admin → Backups after deployment
- [ ] Verify backup includes 46 PublicContentPage records

Per `AGENTS.md` §10: **Git-push auto-deploys are cancelled on this Vercel plan. Deploy via Vercel CLI only.**

---

## 19. Rollback Plan

If a production deployment causes issues:

### Immediate rollback (within minutes)
1. Go to Vercel dashboard → Deployments
2. Select the previous successful deployment
3. Click "Promote to Production" to instantly swap the deployment

### Code rollback (if data-safe)
1. Identify the last good commit: `git log --oneline`
2. Revert to that commit: `git revert HEAD~n` (creates a new commit, safe to push)
3. Deploy the revert: `npx vercel deploy --prod --yes`

### Database rollback
1. Download the latest backup from Admin → Backups before deployment
2. If data corruption occurs, follow the Scenario C runbook in `ADMIN_OS_DISASTER_RECOVERY.md`

### Do not use `git reset --hard` on a pushed commit — this risks data loss. Use `git revert` for safe rollback.

---

## 20. Post-Deployment Smoke Test Plan

Run these tests within 30 minutes of any production deployment:

| # | Test | Expected |
|---|---|---|
| 1 | `GET /` | HTTP 200, homepage renders |
| 2 | `GET /robots.txt` | Disallows `/admin/` and `/api/` |
| 3 | `GET /sitemap.xml` | Returns XML with homepage and blog entries |
| 4 | `GET /rbi/nbfc-registration-in-india` | HTTP 200, content renders from DB |
| 5 | `GET /sebi/aif-registration-in-india` | HTTP 200, content renders from DB |
| 6 | `GET /services/enterprise-services` | HTTP 200, content renders from DB |
| 7 | `GET /admin` (no cookie) | Redirect to `/login?redirect=/admin` |
| 8 | `GET /api/admin/backups` (no cookie) | HTTP 401 |
| 9 | `GET /api/admin/users` (no cookie) | HTTP 401 |
| 10 | `POST /api/auth/login` with valid credentials | HTTP 200, `auth_token` cookie set (httpOnly, Secure) |
| 11 | `GET /admin` (with valid cookie) | HTTP 200, admin dashboard renders |
| 12 | `GET /api/admin/content-pages/by-path?path=/rbi/nbfc-registration-in-india` (admin cookie) | HTTP 200, page data |
| 13 | Admin → Backups → Create backup | Backup created, item counts visible |
| 14 | `GET /resources/regulatory-updates` | HTTP 200, published updates visible |
| 15 | `GET /api/auth/me` (no cookie) | `{ user: null }` — never 401 |
| 16 | Check `auth_token` cookie properties | `httpOnly: true`, `Secure: true` (HTTPS) |

---

## 21. Phase 5C Strict Confirmation

- **No push to GitHub was performed in Phase 5C.** All work is local.
- **No deployment to Vercel was performed in Phase 5C.**
- **No deployment to any hosting provider was performed in Phase 5C.**
- **Phase 6A has not been started.**
- **No new public content pages were migrated in Phase 5C.**
- **No public page expansion was performed in Phase 5C.**
