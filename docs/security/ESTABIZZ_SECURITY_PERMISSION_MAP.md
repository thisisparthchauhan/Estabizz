# Estabizz — Security and Permission Map

> Last verified: 2026-07-22 · Branch: **main** (confirmed) · Functional baseline commit: **49f7c81** · Documentation commit: **a60d5a7** · Security hardening commits: 22eee40 (granular blog/leads permissions), pending (blog status transition validation)
> Contains: confirmed facts verified against the source tree on 2026-07-22.

---

## 1. Authentication Flow

```
User visits /admin/*
  → app/admin/layout.tsx server-side guard
      → reads auth_token cookie
      → verifies JWT (jsonwebtoken, HS256, JWT_SECRET)
      → checks email against ADMIN_EMAIL_ALLOWLIST (seed users)
      → fallback: checks admin_users MongoDB collection (status: active)
      → if neither: redirect to /login
  → admin page renders

Admin API call (e.g. POST /api/admin/media)
  → requireAdmin(req)
      → read auth_token cookie
      → verify JWT signature
      → extract email from JWT payload
      → check ADMIN_EMAIL_ALLOWLIST (fast path, no DB)
      → if not in allowlist: query admin_users MongoDB (status: active)
      → if neither: 401/403
  → requirePermission(req, 'manage_media')
      → call requireAdmin first
      → getAdminUserByEmail from MongoDB admin_users
      → if not found in DB: fallback to seedAdminUsers definition
      → check permissions array includes 'manage_media'
      → if not: 403
  → handler runs with { email, role, permissions }
```

---

## 2. JWT Configuration

| Property | Value |
|----------|-------|
| Algorithm | HS256 |
| Signing secret | `JWT_SECRET` environment variable |
| Expiry | 7 days (confirmed by session.ts) |
| Cookie name | `auth_token` |
| httpOnly | Yes |
| sameSite | lax |
| secure | Yes in production |
| Refresh | No automatic refresh — user must re-login after expiry |

---

## 3. Admin Roles and Permissions Matrix

### Role Definitions

| Role | Description | Legacy |
|------|-------------|--------|
| `super_admin` | Full access to everything | No |
| `admin` | Full except `manage_users` | Yes (legacy) |
| `website_editor` | Edit content + navigation, no publish | No |
| `content_writer` | Create/edit blogs and drafts, no publish | No |
| `compliance_reviewer` | Approve/publish/reject | No |
| `seo_manager` | SEO fields only | No |
| `admin_viewer` | Read-only | No |
| `editor` | Edit blogs + content (legacy) | Yes |
| `reviewer` | Approve/publish blogs (legacy) | Yes |

### Permission → Role Matrix

| Permission | super_admin | admin | website_editor | content_writer | compliance_reviewer | seo_manager | admin_viewer |
|------------|:-----------:|:-----:|:--------------:|:--------------:|:-------------------:|:-----------:|:------------:|
| `view_admin` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `manage_blogs` | ✓ | ✓ | — | ✓ | ✓ | — | — |
| `create_blog` | ✓ | ✓ | — | ✓ | — | — | — |
| `edit_blog` | ✓ | ✓ | — | ✓ | — | — | — |
| `approve_blog` | ✓ | ✓ | — | — | ✓ | — | — |
| `publish_blog` | ✓ | ✓ | — | — | ✓ | — | — |
| `reject_blog` | ✓ | ✓ | — | — | ✓ | — | — |
| `archive_blog` | ✓ | ✓ | — | — | ✓ | — | — |
| `delete_blog` | ✓ | ✓ | — | — | — | — | — |
| `manage_categories` | ✓ | ✓ | — | — | — | — | — |
| `manage_media` | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| `manage_users` | ✓ | — | — | — | — | — | — |
| `manage_content` | ✓ | ✓ | ✓ | ✓ | — | — | — |
| `publish_content` | ✓ | ✓ | — | — | ✓ | — | — |
| `manage_navigation` | ✓ | ✓ | ✓ | — | — | — | — |
| `delete_content` | ✓ | ✓ | — | — | — | — | — |
| `purge_content` | ✓ | ✓ | — | — | — | — | — |
| `manage_seo` | ✓ | ✓ | — | — | — | ✓ | — |
| `manage_backups` | ✓ | ✓ | — | — | — | — | — |
| `manage_leads` | ✓ | ✓ | — | — | — | — | — |

---

## 4. Seed User Fallback Behaviour

**File**: `lib/admin/requirePermission.ts`

The two seed accounts (`estabizz@gmail.com` as `super_admin`, `info@estabizz.com` as `admin`) may not have records in MongoDB's `admin_users` collection. After the Phase 5A fix, `requirePermission` falls back to `seedAdminUsers` for these accounts when the DB returns null.

**Security boundary**: The fallback only applies when `requireAdmin` has already passed — meaning a valid JWT with that email exists. An arbitrary user cannot claim seed permissions simply by knowing the email address; they must also possess a valid JWT signed with `JWT_SECRET`.

---

## 5. Route Protection Summary

| Route category | Protection layer | Notes |
|----------------|-----------------|-------|
| `/admin/*` (pages) | `app/admin/layout.tsx` JWT guard | Redirect to /login on failure |
| `/api/admin/*` | `requirePermission` (granular permission per route) | 401/403 JSON response. No `requireAdmin`-only routes remain. |
| `/api/auth/*` | None | Login/logout are public endpoints |
| `/api/leads` | None | Public contact form |
| `/api/submit-blog` | None | Public blog submission |
| `/api/regulatory-updates` | None | Public read-only list |
| `/api/recommend-services` | None | AI endpoint — no auth |
| `/api/chat` | None | AI endpoint — no auth |
| `/api/my-blogs/[id]` | Session cookie (user auth) | User-specific |
| All public `/`…pages | None | Publicly accessible |

---

## 6. Known Security Gaps

| ID | Issue | Risk | Fix approach |
|----|-------|------|-------------|
| S1 | No rate limiting on `/api/auth/login` | High — brute-force | Add `rate-limiter-flexible` or Vercel Edge Rate Limiting |
| S2 | No rate limiting on public AI endpoints (`/api/chat`, `/api/recommend-services`) | High — cost DoS when API key active | Auth gate or rate limit before enabling |
| S3 | Lead personal data (name, email, phone) not encrypted at rest | Medium | Field-level encryption or MongoDB Atlas encryption |
| S4 | No CSRF protection on state-changing forms | Medium | SameSite=Lax cookie mitigates most cases; explicit CSRF token recommended |
| S5 | No token refresh mechanism | Low | User must re-login after 7 days; acceptable for admin panel |
| S6 | Cloudinary unsigned upload preset is public | Accepted | Unsigned preset limits what can be uploaded; Cloudinary access controls apply |
| S7 | TipTap duplicate extension warning in dev | Dev only — undiagnosed | `immediatelyRender: false` was added to address Next.js SSR/hydration behaviour; whether it also removes the duplicate extension warning has not been confirmed. Inspect the final TipTap extension array before closing. |
| S8 | ~~Blog and leads API routes use `requireAdmin` not `requirePermission`~~ **RESOLVED 2026-07-22** | Medium → **Fixed** | `POST /api/admin/blogs/save` now requires `create_blog` (new) or `edit_blog` (existing) + `publish_blog` (if publishing). `DELETE /api/admin/blogs/[id]` requires `delete_blog`. `PATCH /api/admin/blogs/[id]/status` maps each target status to its specific permission (`edit_blog` / `approve_blog` / `publish_blog` / `reject_blog` / `archive_blog`). `PATCH /api/admin/leads/[id]` requires new `manage_leads` permission (added to `super_admin` and `admin` roles). No `requireAdmin` calls remain anywhere in `app/api/admin/**`. Full permission audit confirmed clean. |
| S9 | ~~`PATCH /api/admin/blogs/[id]/status` accepted any status → any status transition~~ **RESOLVED 2026-07-22** | Medium → **Fixed** | Route now enforces an explicit transition matrix. `requireAdmin` (auth) runs first so unauthenticated callers never see 404. Blog is loaded from MongoDB (status never trusted from client). Invalid transitions rejected `409`. Permitted transitions: `draft → pending_review`; `pending_review → approved \| published \| rejected \| archived \| draft`; `approved → published \| rejected`; `published → archived`; `rejected → draft`; `archived → draft`. Prohibited (step-skipping): `draft → published`, `rejected → published`, `published → approved / pending_review`, `archived → published / approved`. Granular permission (`requirePermission`) is enforced after the transition check, before mutation. |

---

## 7. Content Security

- **Blog HTML**: sanitized server-side via `sanitize-html` before storage. Only `https:` URIs allowed for images. XSS event handlers, `<script>`, `<iframe>`, `javascript:` URLs all stripped.
- **Public Content Page sections**: sanitized at save time using the same or equivalent sanitizer.
- **Regulatory update content**: sanitized at save time.
- **Alt text**: validated server-side on publish (htmlparser2, handles all quoting styles).
- **Media URLs**: validated as `https://res.cloudinary.com/` at ingestion point.
- **No raw base64 images** stored in MongoDB — enforced by `allowBase64: false` in TipTap Image extension and `allowedSchemesByTag.img: ['https']` in sanitize-html.

---

## 8. Headers (next.config.js)

| Path | Headers set |
|------|------------|
| All `/:path*` | `Cache-Control: public, max-age=0, must-revalidate, s-maxage=60, stale-while-revalidate=300` |
| `/admin/:path*` | `X-Robots-Tag: noindex, nofollow`, `Cache-Control: no-store` |
| `/api/:path*` | `X-Robots-Tag: noindex, nofollow`, `Cache-Control: no-store` |

> **Note**: There is no `Content-Security-Policy` header configured. Adding CSP would be a high-value security improvement.
