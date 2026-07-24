# Estabizz Admin OS — Security & Permission Matrix

> Created: Phase 5A (2026-07-02 IST) · Do not include credentials in this file.

---

## 1. Purpose

This document records the permission model, protected routes, and security invariants for the Estabizz Admin OS. It is the authoritative reference for onboarding reviewers and for future hardening phases.

---

## 2. Current Phase

- **Phase 5A** — Admin OS Security, Permission, and Route Protection Hardening
- **Phase 6C Security Hardening (2026-07-22)** — Blog and leads API granular permission enforcement (TD-016 resolved). `manage_leads` permission added.
- **Phase 6C QA Correction (2026-07-22)** — Blog status route: server-side transition matrix added; two-step auth pattern (requireAdmin → load blog → validate transition → requirePermission) enforced; stale comment in DELETE route corrected.
- All work is **local**. Not pushed to production.
- Public Content CMS: **46 managed pages** (c0188b2 → Phase 4R baseline)

---

## 3. Admin Authentication Flow

### Login
1. User submits credentials to `POST /api/auth/login` (uses the `User` MongoDB collection + bcrypt).
2. Server verifies password, signs a JWT (`{ id, email, firstName, lastName }`, 7-day expiry), sets `auth_token` httpOnly cookie.

### Admin page access
1. `app/admin/layout.tsx` reads the `auth_token` cookie, verifies JWT signature.
2. Checks email against `ADMIN_EMAIL_ALLOWLIST` (fast path — seed/legacy accounts).
3. **DB fallback**: if not in static list, queries `admin_users` MongoDB collection for an active record.
4. On failure → `redirect('/login?redirect=/admin')`.

### Admin API access (`requireAdmin`)
- Same two-step check: static allowlist → MongoDB `admin_users` active record.
- Returns `401` if no token, `401` if expired/invalid token, `403` if not admin.

### Permission check (`requirePermission`)
- Wraps `requireAdmin`, then loads the user's role + permission set from `admin_users`.
- Returns `403` if the user lacks the required permission.
- Used by **all** write, delete, approve, publish, and management API routes.

---

## 4. Roles

| Role | Label | Description |
|---|---|---|
| `super_admin` | Super Admin | Full access to everything including user management and purge |
| `admin` | Administrator | Same as super_admin except no `manage_users` |
| `website_editor` | Website Editor | Edit website content and navigation; sends for approval |
| `content_writer` | Content Writer | Create/edit drafts → approval queue |
| `compliance_reviewer` | Compliance Reviewer | Approve/reject/publish content and blog changes |
| `seo_manager` | SEO Manager | SEO fields only |
| `admin_viewer` | Admin Viewer | Read-only access to the admin panel |
| `editor` | Editor (legacy) | Blog editing + content drafts |
| `reviewer` | Reviewer (legacy) | Blog and content approval |

---

## 5. Permissions

| Permission | Purpose | Write | Delete | Publish | Risk |
|---|---|---|---|---|---|
| `view_admin` | Read-only access to admin panel, list APIs | — | — | — | Low |
| `manage_content` | Edit website content blocks, public content pages (pending only) | ✓ (pending) | — | — | Medium |
| `publish_content` | Approve/reject pending content, regulatory, public content page changes | — | — | ✓ | High |
| `manage_navigation` | Edit navbar and footer | ✓ | — | — | Medium |
| `delete_content` | Soft-delete content blocks, public content pages, regulatory updates to Recycle Bin | — | ✓ (soft) | — | Medium |
| `purge_content` | Permanently delete from Recycle Bin (requires typed "DELETE" confirmation) | — | ✓ (hard) | — | High |
| `manage_seo` | Edit SEO fields on content save | ✓ (pending) | — | — | Low |
| `manage_media` | Upload and edit media assets | ✓ | ✓ (soft) | — | Medium |
| `manage_users` | Create, edit, suspend admin users; reset passwords | ✓ | — | — | Critical |
| `manage_backups` | Create and download CMS data backups | — | — | — | High |
| `manage_leads` | View and update lead enquiries (CRM status) | — | — | — | Medium |
| `manage_blogs` | View blog admin section | — | — | — | Low |
| `create_blog` | Author new blog posts | ✓ | — | — | Low |
| `edit_blog` | Edit any blog post | ✓ | — | — | Low |
| `approve_blog` | Move blog: pending → approved | — | — | — | Medium |
| `publish_blog` | Move blog: approved → published | — | — | ✓ | Medium |
| `reject_blog` | Reject a blog submission | — | — | — | Low |
| `archive_blog` | Archive a published blog | — | — | — | Low |
| `delete_blog` | Permanently delete a blog post | — | ✓ | — | High |
| `manage_categories` | Create/edit/delete blog categories | ✓ | ✓ | — | Low |

> **Note:** `manage_roles` is not a separate permission — role management is covered by `manage_users` (super_admin only).

### Role → default permissions

| Permission | super_admin | admin | website_editor | content_writer | compliance_reviewer | seo_manager | admin_viewer | editor (legacy) | reviewer (legacy) |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `view_admin` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| `manage_content` | ✓ | ✓ | ✓ | ✓ | — | — | — | ✓ | — |
| `publish_content` | ✓ | ✓ | — | — | ✓ | — | — | — | ✓ |
| `manage_navigation` | ✓ | ✓ | ✓ | — | — | — | — | ✓ | — |
| `delete_content` | ✓ | ✓ | — | — | — | — | — | — | — |
| `purge_content` | ✓ | ✓ | — | — | — | — | — | — | — |
| `manage_seo` | ✓ | ✓ | — | — | — | ✓ | — | — | — |
| `manage_media` | ✓ | ✓ | ✓ | ✓ | — | ✓ | — | ✓ | — |
| `manage_users` | ✓ | — | — | — | — | — | — | — | — |
| `manage_backups` | ✓ | ✓ | — | — | — | — | — | — | — |
| `manage_leads` | ✓ | ✓ | — | — | — | — | — | — | — |
| `manage_blogs` | ✓ | ✓ | — | ✓ | ✓ | — | — | ✓ | ✓ |
| `create_blog` | ✓ | ✓ | — | ✓ | — | — | — | ✓ | — |
| `edit_blog` | ✓ | ✓ | — | ✓ | — | — | — | ✓ | — |
| `approve_blog` | ✓ | ✓ | — | — | ✓ | — | — | — | ✓ |
| `publish_blog` | ✓ | ✓ | — | — | ✓ | — | — | — | ✓ |
| `reject_blog` | ✓ | ✓ | — | — | ✓ | — | — | — | ✓ |
| `archive_blog` | ✓ | ✓ | — | — | ✓ | — | — | — | ✓ |
| `delete_blog` | ✓ | ✓ | — | — | — | — | — | — | — |
| `manage_categories` | ✓ | ✓ | — | — | — | — | — | ✓ | — |

---

## 6. Protected API Summary

### Auth
| Route | Method | Auth required | Permission |
|---|---|---|---|
| `POST /api/auth/login` | POST | None (public) | — |
| `POST /api/auth/signup` | POST | None (public) | — |
| `GET /api/auth/me` | GET | None (public — returns `null` if unauthenticated) | — |
| `POST /api/auth/logout` | POST | None (clears cookie) | — |

### Public Content Pages
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/content-pages/by-path` | GET | `requirePermission` | `view_admin` |
| `PATCH /api/admin/content-pages/by-path` | PATCH | `requirePermission` | `manage_content` |
| `POST /api/admin/content-pages/by-path/approve` | POST | `requirePermission` | `publish_content` |
| `POST /api/admin/content-pages/by-path/reject` | POST | `requirePermission` | `publish_content` |
| `POST /api/admin/content-pages/by-path/delete` | POST | `requirePermission` | `delete_content` |
| `GET /api/admin/content-pages/inventory` | GET | `requirePermission` | `view_admin` |

All content-page routes additionally enforce `isManagedPublicContentPath()` — non-managed paths receive `400` regardless of permission.

### Approval Queue
| Route | Method | Auth | Permission |
|---|---|---|---|
| `POST /api/admin/approval-queue/action` | POST | `requirePermission` | `view_admin` + internal `canReviewQueueItem()` |
| `GET /api/admin/approval-queue/count` | GET | `requirePermission` | `view_admin` |

`canReviewQueueItem()` enforces: `publish_content` for content/regulatory/public_content_page; `approve_blog`/`publish_blog`/`reject_blog` for blogs; `manage_seo` or `publish_content` for SEO keys. Self-review is blocked: `submittedBy === reviewer.email` → `403`.

### Recycle Bin
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/recycle-bin` | GET | `requirePermission` | `view_admin` |
| `POST /api/admin/recycle-bin/restore` | POST | `requirePermission` | `delete_content` |
| `POST /api/admin/recycle-bin/purge` | POST | `requirePermission` | `purge_content` |

Purge route hard-blocks `type === 'public_content_page'` before any DB operation: returns `400` with tombstone safety message.
`purgeRecycleBinItem()` in the library also throws as a second independent guard for `public_content_page`.

### Version Restore (Content Blocks)
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/restore` | GET | `requirePermission` | `view_admin` |
| `POST /api/admin/restore/action` | POST | `requirePermission` | `publish_content` *(fixed Phase 5B)* |

`POST /api/admin/restore/action` previously required only `view_admin`. Fixed in Phase 5B to require `publish_content`, matching the library-level `canRestoreKey()` check. Restore publishes content directly to the live ContentBlock — it is a write/publish operation. The library enforces a secondary `canRestoreKey()` check independent of the route guard.

### Change History
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/change-history` | GET | `requirePermission` | `view_admin` |

Read-only. `listChangeHistory()` further scopes returned items by the caller's role and permissions — users only see history for content types they are permitted to manage.

### Backups
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/backups` | GET | `requirePermission` | `view_admin` |
| `POST /api/admin/backups/create` | POST | `requirePermission` | `manage_backups` |
| `GET /api/admin/backups/[id]/download` | GET | `requirePermission` | `manage_backups` |

Backup content includes: ContentBlock, ContentVersion, ContentAudit, MediaAsset metadata, AdminUser safe metadata, and PublicContentPage records (46 paths via `PUBLIC_CONTENT_MANAGED_PATHS`). Never includes: passwords, password hashes, JWT secret, MongoDB URI, Cloudinary secret, GitHub token, or the User credential collection.

### Users & Roles
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/users` | GET | `requirePermission` | `manage_users` |
| `POST /api/admin/users` | POST | `requirePermission` | `manage_users` |
| `PATCH /api/admin/users/[id]` | PATCH | `requirePermission` | `manage_users` |
| `POST /api/admin/users/[id]/reset-password` | POST | `requirePermission` | `manage_users` |

Protection invariants:
- Role change resets permissions to `ROLE_DEFAULT_PERMISSIONS[newRole]` (no privilege escalation through role change).
- PATCH only accepts `fullName`, `role`, `status` — direct permission array editing is not exposed by the API.
- Last super_admin guard: cannot demote or suspend the last active `super_admin`.
- Password reset requires `manage_users` (only `super_admin` has this).

### Media Library
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/media` | GET | `requirePermission` | `view_admin` |
| `POST /api/admin/media` | POST | `requirePermission` | `manage_media` |
| `PATCH /api/admin/media/[id]` | PATCH | `requirePermission` | `manage_media` |

### Content / SEO Save
| Route | Method | Auth | Permission |
|---|---|---|---|
| `POST /api/admin/content/save` | POST | `requirePermission` | `manage_content` (or `manage_seo` for `seo.*` keys) |
| `GET /api/admin/content/[key]` | GET | `requirePermission` | `view_admin` |

### Regulatory Updates
| Route | Method | Auth | Permission |
|---|---|---|---|
| `GET /api/admin/regulatory-updates` | GET | `requirePermission` | `view_admin` |
| `POST /api/admin/regulatory-updates` | POST | `requirePermission` | `manage_content` |
| `GET/PATCH /api/admin/regulatory-updates/[id]` | GET/PATCH | `requirePermission` | `view_admin` / `manage_content` |
| `POST .../[id]/publish` | POST | `requirePermission` | `publish_content` |
| `POST .../[id]/approve-changes` | POST | `requirePermission` | `publish_content` |
| `POST .../[id]/reject-changes` | POST | `requirePermission` | `publish_content` |
| `POST .../[id]/reject` | POST | `requirePermission` | `publish_content` |
| `POST .../[id]/archive` | POST | `requirePermission` | `publish_content` |
| `POST .../[id]/submit` | POST | `requirePermission` | `manage_content` |
| `POST .../[id]/move-to-draft` | POST | `requirePermission` | `manage_content` |
| `POST .../[id]/delete` | POST | `requirePermission` | `delete_content` |

### Blog Routes *(fixed Phase 6C security hardening 2026-07-22; transition matrix added Phase 6C QA correction 2026-07-22)*
| Route | Method | Auth | Permission | Notes |
|---|---|---|---|---|
| `POST /api/admin/blogs/save` (new blog) | POST | `requirePermission` | `create_blog` | |
| `POST /api/admin/blogs/save` (existing blog) | POST | `requirePermission` | `edit_blog` + `publish_blog` if publishing | |
| `DELETE /api/admin/blogs/[id]` | DELETE | `requirePermission` | `delete_blog` | |
| `PATCH /api/admin/blogs/[id]/status` → `draft`/`pending_review` | PATCH | `requireAdmin` + `requirePermission` | `edit_blog` | Transition validated server-side; invalid transitions → 409 |
| `PATCH /api/admin/blogs/[id]/status` → `approved` | PATCH | `requireAdmin` + `requirePermission` | `approve_blog` | Only from `pending_review` or `approved` self |
| `PATCH /api/admin/blogs/[id]/status` → `published` | PATCH | `requireAdmin` + `requirePermission` | `publish_blog` | Only from `pending_review` or `approved` |
| `PATCH /api/admin/blogs/[id]/status` → `rejected` | PATCH | `requireAdmin` + `requirePermission` | `reject_blog` | Only from `pending_review` or `approved` |
| `PATCH /api/admin/blogs/[id]/status` → `archived` | PATCH | `requireAdmin` + `requirePermission` | `archive_blog` | Only from `pending_review` or `published` |
| `GET/PATCH /api/admin/blogs/featured` | GET/PATCH | `requirePermission` | `manage_blogs` | |

**Blog status transition matrix** (enforced server-side, current status loaded from MongoDB):

| From ↓ \ To → | draft | pending_review | approved | published | rejected | archived |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `draft` | — | ✓ | — | — | — | — |
| `pending_review` | ✓ | — | ✓ | ✓ | ✓ | ✓ |
| `approved` | — | — | — | ✓ | ✓ | — |
| `published` | — | — | — | — | — | ✓ |
| `rejected` | ✓ | — | — | — | — | — |
| `archived` | ✓ | — | — | — | — | — |

Invalid transitions return `409 Conflict` with `{ error, currentStatus, requestedStatus }`. Auth check (`requireAdmin`) runs before the blog record is loaded — unauthenticated callers never see 404.

### Leads *(fixed Phase 6C security hardening, 2026-07-22)*
| Route | Method | Auth | Permission |
|---|---|---|---|
| `PATCH /api/admin/leads/[id]` | PATCH | `requirePermission` | `manage_leads` (super_admin, admin) |

---

## 7. Protected Admin UI Summary

All admin pages (`/admin/**`) are protected by `app/admin/layout.tsx`, which:
- Verifies JWT signature
- Checks email against static `ADMIN_EMAIL_ALLOWLIST` (seed/legacy accounts)
- **Falls back to MongoDB `admin_users` collection** (panel-created accounts) — fixed in Phase 5A

No admin page bypasses the layout guard. Individual pages may add further permission checks via server-side `requirePermission` calls for module-specific data fetching.

---

## 8. Critical Hard-Blocks (must never be removed)

1. **PublicContentPage purge is permanently blocked.** The `POST /api/admin/recycle-bin/purge` route returns `400` if `type === 'public_content_page'`. The Recycle Bin UI shows an info panel (no purge button) for content pages. This tombstone safety rule prevents the DB record from disappearing while Next.js route files still exist — which would cause the route to fall back to old hardcoded content silently.

2. **Managed path whitelist is required for all content-page writes.** Every PATCH, approve, reject, delete operation calls `isManagedPublicContentPath(fullPath)` and returns `400` for unrecognised paths. Adding a path to the whitelist requires a deliberate code change to `lib/publicContent/managedPaths.ts`.

3. **Pending changes do not publish automatically.** `PATCH /api/admin/content-pages/by-path` only writes to `pendingRevision`. Live fields are unchanged until `POST .../approve` is called by a `publish_content` user. Public routes read only live fields.

4. **Backup excludes secrets.** The backup function (`lib/content/backup.ts`) selects only safe content fields. It never includes: `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_API_SECRET`, `GITHUB_BACKUP_TOKEN`, password hashes, or the `User` credential collection. This is enforced in code, not in config.

5. **Self-review is blocked in the Approval Queue.** `canReviewQueueItem()` returns `false` if `submittedBy` matches the reviewer's email. Elevated admins (super_admin, admin) bypass the permission check but NOT the self-review guard — it is applied first unconditionally.

6. **Last super_admin protection.** `PATCH /api/admin/users/[id]` prevents demotion or suspension of the last active `super_admin`, returning `422`.

---

## 9. Known Limitations

1. **No middleware.ts edge guard.** There is no Next.js middleware pre-route check for cookie presence. The `app/admin/layout.tsx` performs the authoritative server-side check. This means the edge CDN may serve a Next.js loading frame before the layout redirect fires, but no admin data is exposed before the layout check completes.

2. **Static allowlist is manually maintained.** `ADMIN_EMAIL_ALLOWLIST` in `lib/admin/seedData.ts` must be kept in sync with seed users. Panel-created users are now properly handled by the MongoDB DB-fallback path in both the layout and `requireAdmin` (fixed in Phase 5A).

3. **`purge_content` password verification is deferred.** The Phase 3B notes documented that real password re-verification on purge was deferred. Currently, `purge_content` permission alone gates the purge route. PublicContentPage purge remains hard-blocked regardless.

4. **`manage_roles` is not a separate permission.** Role management is covered by `manage_users`. This is intentional; a dedicated `manage_roles` permission was not introduced.

5. **Blog `delete_blog` is permanent (not soft-delete).** Unlike content pages and regulatory updates, blog deletion goes directly to hard delete. This is pre-existing behavior.

6. **Purge does not verify item status before hard-deleting.** `purgeRecycleBinItem` for media and content does not check `status === 'removed'`/`'deleted'` before calling `findByIdAndDelete`. Limited to `purge_content` users (super_admin, admin) — see `ADMIN_OS_DISASTER_RECOVERY.md` §9.

7. **Recycle Bin restore does not verify item status.** `restoreRecycleBinItem` for media and content does not confirm the item is currently soft-deleted before restoring. Restoring a non-deleted content block to `draft` is a downgrade, so harm is limited — see `ADMIN_OS_DISASTER_RECOVERY.md` §9.

---

## 10. Recommended Next Hardening Steps (Phase 5B+)

1. ~~**Rate-limit `/api/auth/login`** to mitigate brute-force attacks.~~ **DONE 2026-07-22 (hardened 2026-07-22)** — Upstash sliding window: 5/IP/15 min (IP) + 10/hashedId/30 min. Production config gate: 503 when Upstash absent. Fail-open for runtime failures only. Unknown IP → 503 in production. Body via `arrayBuffer()` not `Content-Length`. AI endpoints: 10/IP/10 min (chat), 5/IP/10 min (recommend), fail-closed + same production gate. `lib/security/rateLimit.ts`. **Open: RL-002 — Upstash must be provisioned before AI endpoints can be enabled.**
2. **Add edge middleware** for fast cookie-presence pre-check on `/admin/**` and `/api/admin/**`, reducing server-side layout redirect latency.
3. **Implement purge password re-verification** for `purge_content` actions (the gap documented in Phase 3B).
4. **Audit log for admin login attempts** (success and failure) — currently `recordAdminLogin` only logs successful logins.
5. **Content Security Policy headers** for admin routes to mitigate XSS.
6. **CSRF protection** review for state-mutating API routes (currently rely on `httpOnly` cookie + same-site lax).
7. **Session invalidation on role/status change** — if an admin's role or status changes, active sessions with old permissions should be invalidated or re-verified.
