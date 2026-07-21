# Estabizz — Technical Debt and Known Issues Register

> Last verified: 2026-07-22 · Branch: **main** (confirmed) · Functional baseline commit: **49f7c81** · Documentation commit: **a60d5a7**
> Severity: 🔴 High | 🟠 Medium | 🟡 Low
> Contains: confirmed facts verified against the source tree on 2026-07-22.

---

## TD-001 — No rate limiting on login endpoint

| Field | Value |
|-------|-------|
| Module | Authentication |
| File | `app/api/auth/login/route.ts` |
| Severity | 🔴 High |
| Description | `POST /api/auth/login` has no rate limiting. An attacker can make unlimited login attempts. |
| User impact | Admin accounts can be brute-forced |
| Security impact | Critical — credential stuffing / brute-force |
| Recommended fix | Add `rate-limiter-flexible` with Redis, or use Vercel Edge middleware rate limiting |
| Effort | Small–Medium |
| Agent | Claude Code |

---

## TD-002 — Public AI endpoints have no auth or rate limit

| Field | Value |
|-------|-------|
| Module | API — Chat, Recommend Services |
| Files | `app/api/chat/route.ts`, `app/api/recommend-services/route.ts` |
| Severity | 🔴 High (when API key is active) |
| Description | Both endpoints are publicly accessible with no authentication and no rate limiting. When `ANTHROPIC_API_KEY` is set, any visitor can make unlimited AI calls, creating unbounded cost exposure. |
| Current state | Dormant (API key not set in production) |
| Recommended fix | Add per-IP rate limiting before enabling the API key, or require user authentication |
| Effort | Small |
| Agent | Claude Code |

---

## TD-003 — Blog categories are hardcoded — admin UI is a placeholder

| Field | Value |
|-------|-------|
| Module | Blog CMS — Categories |
| File | `lib/blog/categories.ts`, `app/admin/categories/page.tsx` |
| Severity | 🟠 Medium |
| Description | The 9 blog categories are defined as a static array in `lib/blog/categories.ts`. The admin categories page at `/admin/categories` exists as a UI placeholder with no MongoDB model and no CRUD capability. Changes to categories require code edits. |
| Recommended fix | Create a `BlogCategory` MongoDB model, seed the 9 current categories, wire CRUD to the admin UI, update blog creation form to fetch live categories |
| Effort | Medium |
| Agent | Claude Code |

---

## TD-004 — Turbopack dev/build cache conflict

| Field | Value |
|-------|-------|
| Module | Build / Infrastructure |
| File | `package.json` scripts, `next.config.js` |
| Severity | 🟠 Medium |
| Description | Running `npm run build` while the dev server is active overwrites `.next/` (shared output directory), corrupting the Turbopack dev cache. The dev server then fails with `ENOENT` / `MODULE_NOT_FOUND` errors and requires `rm -rf .next node_modules/.cache` to recover. |
| Evidence | Happened in session on 2026-07-22; fixed by stopping dev server first |
| Recommended fix | Separate dev and build output dirs, or enforce that build only runs when dev is stopped. Document rule prominently in CLAUDE.md. |
| Effort | Small (documentation + process) |
| Agent | Documentation |

---

## TD-005 — TipTap duplicate extension warning in dev — UNRESOLVED

| Field | Value |
|-------|-------|
| Module | Blog Editor |
| File | `app/admin/blogs/_components/RichContentEditor.tsx` |
| Severity | 🟡 Low |
| Description | Console shows `[tiptap warn]: Duplicate extension names found: ['link', 'underline']` in development. The root cause has not been fully diagnosed. `immediatelyRender: false` was added to `useEditor` to address a Next.js SSR/hydration behaviour; it does not itself remove duplicated TipTap extension registration. Whether the duplicate-extension warning is produced by React Strict Mode double-mounting, by StarterKit including Link/Underline in addition to explicit extension registrations, or by another cause has not been confirmed. The final extension array passed to `useEditor` should be inspected before this issue is closed. |
| Production impact | None confirmed — warning observed in dev mode only |
| Recommended fix | (1) Log `editor.extensionManager.extensions.map(e => e.name)` to identify the actual duplicate. (2) If StarterKit registers Link/Underline, remove the separate imports. (3) If the cause is React Strict Mode re-mount, consider a stable `extensions` array defined outside the component. |
| Effort | Small |
| Agent | Claude Code |

---

## TD-006 — Content Pages visual editor only fully built for one page

| Field | Value |
|-------|-------|
| Module | Content Pages CMS |
| Files | `app/admin/content-pages/[slug]/edit/page.tsx`, `app/admin/content-pages/nbfc-registration-in-india/edit/` |
| Severity | 🟠 Medium |
| Description | The visual editor lifecycle (edit → pending changes → approve → publish) is only fully implemented for `/rbi/nbfc-registration-in-india`. All 46 managed pages share the `[slug]/edit` shell route, but only the sample page has the full edit flow via the dedicated `nbfc-registration-in-india/edit/` directory. |
| Recommended fix | Extend the visual editor to work generically for all 46 managed paths via a single `[slug]/edit` page, driven by the existing `by-path` API |
| Effort | Large |
| Agent | Claude Code |

---

## TD-007 — Legal pages contain generic/unreviewed content

| Field | Value |
|-------|-------|
| Module | Legal pages |
| Files | `app/legal/privacy-policy/PageClient.tsx`, `app/legal/refund-policy/PageClient.tsx`, `app/legal/terms-conditions/PageClient.tsx` |
| Severity | 🟠 Medium |
| Description | Legal pages exist and render, but the content may be template/generic rather than Estabizz-specific. Content has not been reviewed by legal counsel. Privacy Policy, Refund Policy, and T&C must accurately reflect Estabizz's actual services, data handling, and refund procedures. |
| Recommended fix | Legal review + content update. Consider adding these pages to the CMS for easier future updates. |
| Effort | Content (not code) |
| Agent | Content team |

---

## TD-008 — Resources sub-pages are mostly placeholder content

| Field | Value |
|-------|-------|
| Module | Resources section |
| Files | `app/resources/faqs/`, `app/resources/circular-explainers/`, `app/resources/compliance-calendar/` |
| Severity | 🟡 Low |
| Description | Most Resources sub-pages render placeholder or minimal content. `/resources/compliance-calendar` and `/resources/circular-explainers` are likely empty shells. |
| Recommended fix | Add real content or redirect to regulatory updates; remove internal placeholder pages from sitemap |
| Effort | Content |
| Agent | Content team |

---

## TD-009 — Internal resource pages publicly accessible — STATUS: PARTIAL (NOT YET ON MAIN)

| Field | Value |
|-------|-------|
| Module | Resources section |
| Files | `app/resources/content-rebuild-command/`, `app/resources/regulatory-update-email-template/`, `app/resources/service-page-content-framework/` |
| Severity | 🟠 Medium |
| Description | Three internal tooling/template pages are publicly accessible. They are excluded from `robots.txt` and sitemap, but they can still be accessed by anyone with the URL. |
| Branch status | A fix was committed as `a59f095 CMS Resources: protect internal resource pages` on branch `cms-admin-os-phase-1` but this commit is **not present on `main`**. Verify the fix and merge before closing this item. |
| Recommended fix | Merge or cherry-pick `a59f095` into `main` after confirming the changes are correct |
| Effort | Small |
| Agent | Claude Code |

---

## TD-010 — No audit logging for blogs and media operations

| Field | Value |
|-------|-------|
| Module | Blog CMS, Media Library |
| Severity | 🟠 Medium |
| Description | `ContentAudit` records every homepage CMS change. However, blog create/edit/publish/delete and media upload/delete operations have no equivalent audit trail. There is no way to know who changed or deleted a blog without checking git history. |
| Recommended fix | Add `BlogAudit` and `MediaAudit` models (or extend `ContentAudit` with type field) and record key lifecycle events |
| Effort | Medium |
| Agent | Claude Code |

---

## TD-011 — Placeholder testimonials in homepage

| Field | Value |
|-------|-------|
| Module | Homepage CMS — Testimonials |
| File | `lib/content/testimonialsDefaults.ts` |
| Severity | 🟠 Medium |
| Description | Default testimonials likely contain placeholder/sample client names and quotes. Publishing with unverified testimonials creates legal risk and credibility risk. |
| Recommended fix | Replace with real client testimonials (with permission) before production launch |
| Effort | Content |
| Agent | Content team |

---

## TD-012 — No CSP (Content Security Policy) headers

| Field | Value |
|-------|-------|
| Module | Infrastructure / Security |
| File | `next.config.js` |
| Severity | 🟠 Medium |
| Description | No Content-Security-Policy header is configured. This increases XSS risk if any unsanitized HTML reaches the browser. The existing `sanitize-html` server-side sanitization mitigates this significantly, but defence-in-depth requires CSP. |
| Recommended fix | Add CSP headers in `next.config.js`. Must allow: `https://res.cloudinary.com` for images, `https://api.cloudinary.com` for uploads, `'self'` for scripts/styles. |
| Effort | Medium (testing required) |
| Agent | Claude Code |

---

## TD-013 — Blog slug collision on concurrent create

| Field | Value |
|-------|-------|
| Module | Blog CMS |
| File | `app/api/admin/blogs/save/route.ts` |
| Severity | 🟡 Low |
| Description | Blog slug is generated as `slugify(title)-${Date.now()}`. If two admins create blogs with the same title simultaneously, MongoDB unique index on `slug` would throw an E11000. The save route does not catch this case. |
| Recommended fix | Catch E11000 on slug, append a random suffix, retry |
| Effort | Small |
| Agent | Claude Code |

---

## TD-014 — Unsigned Cloudinary upload preset risks

| Field | Value |
|-------|-------|
| Module | Media Library, Blog Editor |
| Severity | 🟡 Low |
| Description | The upload preset is unsigned and its name is public (in `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`). Anyone who discovers the cloud name and preset name can upload files to the Cloudinary account. Cloudinary's unsigned preset settings should restrict allowed formats and file sizes. |
| Current mitigation | Cloudinary preset should be configured to allow only image formats and limit size |
| Recommended fix | Confirm Cloudinary preset restrictions are configured. For higher security: switch to signed uploads via a server-side signing endpoint. |
| Effort | Small |
| Agent | Infrastructure |

---

## TD-015 — `npm run dev` command structure is fragile

| Field | Value |
|-------|-------|
| Module | Build / Infrastructure |
| File | `package.json` |
| Severity | 🟡 Low |
| Description | `dev` script uses `&` to background the Tailwind watcher: `npx tailwindcss --watch & next dev`. The `&` starts Tailwind asynchronously and the shell script does not wait for it. If Tailwind crashes, there is no automatic restart. If the dev server is started via Claude Code's preview_start, the Tailwind child process may not be properly terminated when the preview stops. |
| Recommended fix | Use `concurrently` package for parallel processes, or verify that preview_stop correctly terminates all child processes. |
| Effort | Small |
| Agent | Claude Code |

---

## TD-016 — Blog and leads API routes use `requireAdmin` instead of `requirePermission`

| Field | Value |
|-------|-------|
| Module | Blog CMS, Leads |
| Files | `app/api/admin/blogs/save/route.ts`, `app/api/admin/blogs/[id]/route.ts`, `app/api/admin/blogs/[id]/status/route.ts`, `app/api/admin/leads/[id]/route.ts` |
| Severity | 🟠 Medium |
| Description | These four state-changing routes are protected by `requireAdmin` (JWT verify + allowlist/DB check) rather than `requirePermission` (which additionally enforces granular role permissions). Any authenticated admin user — regardless of role — can save/delete/publish a blog or update a lead status. The blog role system (`create_blog`, `edit_blog`, `publish_blog`, etc.) is not enforced at the API level for these routes. |
| Evidence | Verified by grepping `app/api/admin/**` on 2026-07-22. All other admin API categories (content pages, media, regulatory updates, users, backups, approval queue, recycle bin) use `requirePermission`. |
| Recommended fix | Replace `requireAdmin` with `requirePermission(req, 'edit_blog')` (or the appropriate permission) in each of the four routes. Add a future audit task to verify all new `/api/admin/**` routes added after this correction. |
| Effort | Small |
| Agent | Claude Code |
