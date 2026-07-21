# Estabizz — Current Completion Status

> Last verified: 2026-07-22 · Branch: **main** (confirmed) · Functional baseline commit: **49f7c81** · Documentation commit: **a60d5a7**
> Status key: ✅ Complete | 🟡 Implemented — QA pending | 🟠 Partially implemented | 🔴 Not started | ⚪ Not applicable / deferred
> Contains: confirmed facts verified against the source tree on 2026-07-22.

---

## Public Website

| Feature | Status | % | Notes |
|---------|--------|---|-------|
| Homepage — all 17 CMS sections | ✅ Complete | 100% | All sections editable from admin; hardcoded defaults |
| Homepage SEO | ✅ Complete | 100% | Editable via Page SEO editor |
| RBI service pages (15 paths) | ✅ Complete | 100% | DB-first, hardcoded fallback |
| SEBI service pages (10 paths) | ✅ Complete | 100% | DB-first, hardcoded fallback |
| IRDAI service pages (4 paths) | ✅ Complete | 100% | DB-first, hardcoded fallback |
| IFSCA service pages (2 paths) | ✅ Complete | 100% | DB-first, hardcoded fallback |
| FEMA service pages (2 paths) | ✅ Complete | 100% | DB-first, hardcoded fallback |
| Services pages (13 paths) | ✅ Complete | 100% | DB-first, hardcoded fallback |
| Hardcoded-only SEBI pages (~10) | 🟠 Partially | 50% | Have PageClient.tsx but not yet CMS-managed |
| Hardcoded-only IRDAI pages (~6) | 🟠 Partially | 50% | Have PageClient.tsx but not yet CMS-managed |
| Hardcoded-only IFSCA pages (~7) | 🟠 Partially | 50% | Have PageClient.tsx but not yet CMS-managed |
| Legal pages (3) | 🟡 QA pending | 70% | Pages exist; content may be generic/placeholder |
| Pricing page | 🟠 Partially | 30% | Page exists; content is placeholder |
| Resources hub | 🟠 Partially | 40% | Hub page exists; sub-pages mostly placeholder |
| Blog listing | ✅ Complete | 100% | Dynamic, category filter, SSG for slugs |
| Blog detail | ✅ Complete | 100% | Full article render, reading progress, SEO |
| Blog categories | ✅ Complete | 100% | 9 categories hardcoded, category listing works |
| Public regulatory updates | ✅ Complete | 100% | List + detail, published-only |
| 19-5 landing pages | ✅ Complete | 100% | 19 static company registration pages |
| Contact / Get Started | ✅ Complete | 100% | Lead capture to MongoDB |
| Login / Signup | ✅ Complete | 100% | JWT auth, user accounts |
| Submit Blog | ✅ Complete | 100% | Public user blog submission |
| My Blogs | ✅ Complete | 100% | User's own blog management |
| Sitemap | ✅ Complete | 100% | Dynamic, includes CMS pages, blogs, regulatory updates |
| Robots.txt | ✅ Complete | 100% | Correct disallow rules |
| Canonical URLs | ✅ Complete | 100% | NEXT_PUBLIC_SITE_URL fallback to estabizz.com |
| Search (public) | 🔴 Not started | 0% | No search feature implemented |
| Multilingual | 🔴 Not started | 0% | English only |
| Client portal | 🔴 Not started | 0% | Major future feature |

---

## Admin OS Modules

| Module | Status | % | Notes |
|--------|--------|---|-------|
| Dashboard | ✅ Complete | 100% | Stats, quick links |
| Website Editor (homepage CMS) | ✅ Complete | 100% | 17/17 sections |
| Content Pages inventory | ✅ Complete | 100% | Read-only list of 46 + unmanaged |
| Content Pages visual editor | 🟠 Partially | 40% | Only nbfc-registration-in-india has full edit lifecycle; others have shell only |
| Page SEO editor | ✅ Complete | 100% | 14 public pages |
| Blog list view | ✅ Complete | 100% | Search, filter, status badges |
| New Blog editor | ✅ Complete | 100% | TipTap editor, full workflow |
| Edit existing blog | ✅ Complete | 100% | Loads existing content into TipTap |
| Blog word paste | ✅ Complete | 100% | Auto-detected, cleaned on paste |
| Blog Word .docx import | ✅ Complete | 100% | Mammoth, Cloudinary, media record |
| Word image import | ✅ Complete | 100% | Upload to Cloudinary, record in media, retry, idempotent |
| Sticky toolbar | ✅ Complete | 100% | Sticky below ActionBar |
| Alt text inline editor | ✅ Complete | 100% | Click image → edit alt → save |
| Alt text validation (client) | ✅ Complete | 100% | Always-on, scans all images including existing blogs |
| Alt text validation (server) | ✅ Complete | 100% | htmlparser2, handles all quoting styles |
| Blog pending review | ✅ Complete | 100% | Approve/reject pending submissions |
| Blog categories admin | 🟠 Partially | 20% | UI placeholder; categories are hardcoded in lib/blog/categories.ts |
| Regulatory Updates desk | ✅ Complete | 100% | Full lifecycle (draft→publish→archive) |
| Media Library | ✅ Complete | 100% | Upload, search, filter, edit, soft-delete |
| Approval Queue | ✅ Complete | 100% | Blogs, content pages, regulatory updates |
| Change History | ✅ Complete | 100% | Read-only audit log with filters |
| Restore | ✅ Complete | 100% | Restore previous ContentBlock versions |
| Recycle Bin | ✅ Complete | 100% | Media + content, restore + permanent purge |
| Users & Roles | ✅ Complete | 100% | Create, edit, role change, password reset |
| Backups | ✅ Complete | 100% | Manual backup + optional GitHub push |
| Navigation editor | ✅ Complete | 100% | Navbar + footer |
| Leads | ✅ Complete | 100% | View, filter, status update |
| Admin settings | 🟠 Partially | 10% | Page exists; no functionality wired |
| Authors | 🟠 Partially | 10% | Page exists; no functionality wired |

---

## Security and Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| JWT auth (httpOnly cookie) | ✅ Complete | 7-day expiry |
| Admin permission system | ✅ Complete | 20 granular permissions |
| Seed-user DB fallback | ✅ Complete | Fixed in requirePermission.ts |
| Role-based access control | ✅ Complete | 9 roles |
| Server-side HTML sanitization | ✅ Complete | sanitize-html, all saves |
| Media URL validation | ✅ Complete | Cloudinary HTTPS only |
| Admin route protection (pages) | ✅ Complete | layout.tsx guard |
| Admin API protection | ✅ Complete | requirePermission on all routes |
| No base64 image storage | ✅ Complete | allowBase64:false + sanitize-html |
| Rate limiting | 🔴 Not started | Login and AI endpoints unprotected |
| CSP headers | 🔴 Not started | Not configured |
| CSRF protection | 🟡 Partial | SameSite:lax only |
| Audit logging (blogs/media) | 🔴 Not started | ContentAudit only covers homepage CMS |
| Error monitoring | 🔴 Not started | No Sentry or equivalent |

---

## Overall Completion Estimates

> Estimates are based on code review, not feature testing. QA has not been performed on every module.

### Current website and Admin OS — what is actually built

| Area | Estimate | Notes |
|------|---------|-------|
| Admin OS modules (all built phases) | ~88% | Users, media, blogs, regulatory updates, homepage CMS, approval queue, recycle bin, backups all functional |
| Public website — service/guide pages | ~92% | 46 managed CMS paths + hardcoded fallbacks for remaining |
| CMS visual editor (pending-changes lifecycle) | ~40% | Full lifecycle implemented only for `/rbi/nbfc-registration-in-india`; others have shell only |
| Security hardening of current build | ~55% | Rate limiting, CSP, permission gaps on blog routes all outstanding |
| SEO completeness | ~75% | Sitemap and robots complete; CSP and canonical URL gaps remain |
| **Current website + Admin OS scope** | **~85–88%** | Measures only what is in scope for Phase 6C and earlier |

### Full future Estabizz technology platform

| Future area | Status |
|------------|--------|
| Client portal | 🔴 Not started |
| CRM / n8n integration | 🔴 Not started |
| AI compliance assistant | 🔴 Not started |
| Transactional email | 🔴 Not started |
| WhatsApp integration | 🔴 Not started |
| Management dashboard | 🔴 Not started |
| Public search | 🔴 Not started |
| Regulatory knowledge engine | 🔴 Not started |
| **Full future platform roadmap** | **~25–30%** complete (current build covers the public website + Admin OS layer only) |
