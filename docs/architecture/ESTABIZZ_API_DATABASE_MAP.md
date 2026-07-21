# Estabizz — API and Database Map

> Last verified: 2026-07-22 · Branch: **main** (confirmed) · Functional baseline commit: **49f7c81** · Documentation commit: **a60d5a7**
> Contains: confirmed facts verified against the source tree on 2026-07-22.

---

## Part A — API Catalogue

### Authentication APIs

| Method | Route | Auth | Permission | Purpose | Notes |
|--------|-------|------|------------|---------|-------|
| POST | `/api/auth/login` | None | — | Validate credentials, issue JWT cookie | No rate limiting |
| POST | `/api/auth/logout` | None | — | Clear auth_token cookie | — |
| GET | `/api/auth/me` | JWT | — | Return current user info | Used by admin layout |
| POST | `/api/auth/signup` | None | — | Public user registration | Not admin-specific |

### Blog APIs

| Method | Route | Auth | Permission | Purpose | Notes |
|--------|-------|------|------------|---------|-------|
| POST | `/api/admin/blogs/save` | Admin | `create_blog` (new) / `edit_blog` (existing) + `publish_blog` (if publishing) | Create/update blog, sanitize HTML, publish validation | htmlparser2 alt validation on publish. TD-016 resolved 2026-07-22. |
| DELETE | `/api/admin/blogs/[id]` | Admin | `delete_blog` | Delete blog | TD-016 resolved 2026-07-22. Route has DELETE handler only (no GET/PATCH). |
| PATCH | `/api/admin/blogs/[id]/status` | Admin | Status-mapped: `edit_blog` (draft/pending_review), `approve_blog`, `publish_blog`, `reject_blog`, `archive_blog` | Change blog status | TD-016 resolved 2026-07-22. |
| GET/PATCH | `/api/admin/blogs/featured` | Admin | `manage_blogs` | Get/set featured blogs | — |
| POST | `/api/submit-blog` | None | — | Public blog submission | User-submitted blogs |
| GET | `/api/my-blogs/[id]` | Session | — | Get user's own blog | — |

### Media APIs

| Method | Route | Auth | Permission | Purpose | Notes |
|--------|-------|------|------------|---------|-------|
| GET | `/api/admin/media` | Admin | `view_admin` | List media assets with search/filter/pagination | — |
| POST | `/api/admin/media` | Admin | `manage_media` | Record Cloudinary upload (idempotent upsert on publicId) | Validates Cloudinary URL; seed-user fallback now working |
| GET | `/api/admin/media/[id]` | Admin | `view_admin` | Get single media asset | — |
| PATCH | `/api/admin/media/[id]` | Admin | `manage_media` | Update alt text/caption/tags | — |
| DELETE | `/api/admin/media/[id]` | Admin | `delete_content` | Soft-delete media | — |

### Homepage CMS APIs

| Method | Route | Auth | Permission | Purpose |
|--------|-------|------|------------|---------|
| GET | `/api/admin/content` | Admin | `view_admin` | List content blocks |
| GET | `/api/admin/content/[key]` | Admin | `view_admin` | Get single content block |
| POST | `/api/admin/content/save` | Admin | `manage_content`/`manage_seo`/`manage_navigation` | Save content block (routes by key prefix) |

### Public Content Page APIs

| Method | Route | Auth | Permission | Purpose |
|--------|-------|------|------------|---------|
| GET | `/api/admin/content-pages/inventory` | Admin | `view_admin` | Discovery scan of public routes |
| GET | `/api/admin/content-pages/by-path` | Admin | `view_admin` | Get CMS page by path (includes pendingRevision) |
| PATCH | `/api/admin/content-pages/by-path` | Admin | `manage_content` | Save pending changes |
| DELETE | `/api/admin/content-pages/by-path` | Admin | `manage_content` | Discard pending changes |
| POST | `/api/admin/content-pages/by-path/approve` | Admin | `publish_content` | Approve pending changes |
| POST | `/api/admin/content-pages/by-path/reject` | Admin | `publish_content` | Reject pending changes |
| POST | `/api/admin/content-pages/by-path/delete` | Admin | `delete_content` | Soft-delete page |

### Regulatory Updates APIs

| Method | Route | Auth | Permission | Purpose |
|--------|-------|------|------------|---------|
| GET/POST | `/api/admin/regulatory-updates` | Admin | `manage_content` | List/create regulatory updates |
| GET/PATCH | `/api/admin/regulatory-updates/[id]` | Admin | `manage_content` | Get/update single update |
| POST | `/api/admin/regulatory-updates/[id]/publish` | Admin | `publish_content` | Publish update |
| POST | `/api/admin/regulatory-updates/[id]/reject` | Admin | `publish_content` | Reject update |
| POST | `/api/admin/regulatory-updates/[id]/archive` | Admin | `publish_content` | Archive update |
| POST | `/api/admin/regulatory-updates/[id]/delete` | Admin | `delete_content` | Soft-delete update |
| POST | `/api/admin/regulatory-updates/[id]/move-to-draft` | Admin | `manage_content` | Unpublish to draft |
| POST | `/api/admin/regulatory-updates/[id]/submit` | Admin | `manage_content` | Submit for review |
| POST | `/api/admin/regulatory-updates/[id]/approve-changes` | Admin | `publish_content` | Approve pending changes |
| POST | `/api/admin/regulatory-updates/[id]/reject-changes` | Admin | `publish_content` | Reject pending changes |
| GET | `/api/regulatory-updates` | None | — | Public: list published regulatory updates |

### Users & Roles APIs

| Method | Route | Auth | Permission | Purpose |
|--------|-------|------|------------|---------|
| GET/POST | `/api/admin/users` | Admin | `manage_users` | List/create admin users |
| GET/PATCH/DELETE | `/api/admin/users/[id]` | Admin | `manage_users` | Get/update/delete admin user |
| POST | `/api/admin/users/[id]/reset-password` | Admin | `manage_users` | Reset user password |

### Approval Queue APIs

| Method | Route | Auth | Permission | Purpose |
|--------|-------|------|------------|---------|
| GET | `/api/admin/approval-queue/count` | Admin | `view_admin` | Count of pending items (badge) |
| POST | `/api/admin/approval-queue/action` | Admin | `publish_content` | Approve/reject queued items |

### Lifecycle APIs

| Method | Route | Auth | Permission | Purpose |
|--------|-------|------|------------|---------|
| GET | `/api/admin/change-history` | Admin | `view_admin` | Audit log |
| GET | `/api/admin/restore` | Admin | `view_admin` | List restorable versions |
| POST | `/api/admin/restore/action` | Admin | `publish_content` | Restore a previous version |
| GET | `/api/admin/recycle-bin` | Admin | `delete_content` | List soft-deleted items |
| POST | `/api/admin/recycle-bin/restore` | Admin | `delete_content` | Restore from recycle bin |
| POST | `/api/admin/recycle-bin/purge` | Admin | `purge_content` | Permanently delete |

### Backup APIs

| Method | Route | Auth | Permission | Purpose |
|--------|-------|------|------------|---------|
| GET | `/api/admin/backups` | Admin | `view_admin` | List backup snapshots |
| POST | `/api/admin/backups/create` | Admin | `manage_backups` | Create new backup |
| GET | `/api/admin/backups/[id]/download` | Admin | `manage_backups` | Download backup JSON |

### Other APIs

| Method | Route | Auth | Permission | Purpose | Notes |
|--------|-------|------|------------|---------|-------|
| POST | `/api/leads` | None | — | Capture lead from contact/get-started forms | — |
| PATCH | `/api/admin/leads/[id]` | Admin | `manage_leads` | Update lead status | TD-016 resolved 2026-07-22. Route has PATCH handler only (no GET/DELETE). `manage_leads` added to `super_admin` and `admin` roles. |
| POST | `/api/recommend-services` | None | — | AI service recommendation | Uses Anthropic SDK — currently functional only if API key set |
| POST | `/api/chat` | None | — | AI chat widget | Uses Anthropic SDK — dormant without API key |

---

## Part B — Database Model Catalogue

### AdminUser (`admin_users`)
- **Purpose**: Admin panel user accounts
- **Key fields**: `email` (unique), `role`, `status`, `permissions[]`, `passwordHash`
- **Unique indexes**: `email`
- **Security**: `passwordHash` is bcrypt-12; never returned in API responses
- **Soft-delete**: No (status: suspended/inactive)
- **Notes**: Seed accounts (`estabizz@gmail.com`, `info@estabizz.com`) may not have DB records; `requirePermission` now falls back to `seedAdminUsers`

### User (`users`)
- **Purpose**: Public user accounts and admin credential store
- **Key fields**: `email`, `passwordHash`, `name`, `role`
- **Security**: passwordHash excluded from queries
- **Notes**: Shares email with AdminUser for admin login; separate collection

### Blog (`blogs`)
- **Purpose**: Blog articles (admin-created and user-submitted)
- **Key fields**: `blogId` (unique), `slug` (unique), `title`, `content`, `status`, `category`, `tags`, `author`, `featuredImage`, `publishedAt`
- **Unique indexes**: `blogId`, `slug`
- **Status enum**: `draft` | `pending` | `approved` | `published` | `rejected` | `archived`
- **Soft-delete**: No
- **Notes**: Content is server-sanitized before storage (sanitize-html); alt text validated on publish

### MediaAsset (`media_assets`)
- **Purpose**: Tracks Cloudinary uploads in the Media Library
- **Key fields**: `publicId` (unique), `secureUrl`, `resourceType`, `altText`, `tags[]`, `status`, `uploadedBy`
- **Unique indexes**: `publicId`
- **Soft-delete**: Yes (`status: 'removed'`)
- **Idempotency**: `findOneAndUpdate` with `$setOnInsert` on `publicId` — safe to retry

### PublicContentPage (`public_content_pages`)
- **Purpose**: CMS-managed public service/guide pages (46 paths)
- **Key fields**: `fullPath` (unique), `slug`, `status`, `pageType`, `sections[]`, `heroImage`, `pendingRevision`, `hasPendingChanges`, `designSettings`
- **Unique indexes**: `fullPath`, `slug`
- **Status enum**: `draft` | `published` | `deleted`
- **Soft-delete**: Yes (`status: 'deleted'`) — tombstone protection prevents hardcoded fallback
- **Approval workflow**: `pendingRevision` field holds unapproved changes
- **No purge**: permanently blocked at API + library level

### ContentBlock (`content_blocks`)
- **Purpose**: Homepage CMS section content
- **Key fields**: `key` (unique, e.g. `homepage.hero`), `payload`, `updatedBy`, `version`
- **Unique indexes**: `key`
- **Notes**: Payload is Mixed schema — flexible JSON for each section's structure

### ContentVersion (`content_versions`)
- **Purpose**: Immutable history of every ContentBlock save
- **Key fields**: `key`, `payload`, `savedBy`, `version`, `savedAt`
- **Notes**: Append-only; used by Restore module

### ContentAudit (`content_audits`)
- **Purpose**: Action audit log for homepage CMS
- **Key fields**: `key`, `action`, `actor`, `before`, `after`, `timestamp`
- **Notes**: Append-only; used by Change History module

### RegulatoryUpdate (`regulatory_updates`)
- **Purpose**: Regulatory update articles (RBI, SEBI, IRDAI, IFSCA, etc.)
- **Key fields**: `updateId` (unique), `slug` (unique), `title`, `regulator`, `category`, `status`, `publishedDate`, `hasPendingChanges`, `pendingRevision`
- **Status enum**: `draft` | `pending_approval` | `published` | `rejected` | `archived` | `deleted`
- **Soft-delete**: Yes (`status: 'deleted'`)
- **Approval workflow**: Same pending revision pattern as PublicContentPage

### RegulatoryUpdateAudit (`regulatory_update_audits`)
- **Purpose**: Audit log for regulatory update lifecycle actions
- **Key fields**: `updateId`, `action`, `actor`, `timestamp`, `comment`

### Lead (`leads`)
- **Purpose**: Contact form and get-started form submissions
- **Key fields**: `name`, `email`, `phone`, `service`, `message`, `source`, `status`
- **Status enum**: `new` | `contacted` | `qualified` | `closed`
- **Notes**: No personal data encryption at rest currently

### BackupSnapshot (`backup_snapshots`)
- **Purpose**: Records of CMS data backups
- **Key fields**: `backupId`, `createdBy`, `itemCounts`, `githubPath`, `downloadUrl`
- **Notes**: Payload field is `select: false` — never returned in API list responses

---

## Part C — API Gaps and Risks

| Risk | Route(s) | Severity | Notes |
|------|---------|---------|-------|
| No rate limiting | `/api/auth/login`, all public POST routes | High | Brute-force risk on login |
| No input length validation | Most POST bodies | Medium | MongoDB documents have size limits but no enforced field-level max |
| Missing audit logging | Blog create/edit/delete, media operations | Medium | ContentAudit exists for homepage CMS; blogs and media have no equivalent |
| No transaction protection | Multi-step operations (e.g. blog + media) | Medium | MongoDB transactions not used |
| Public AI endpoints | `/api/chat`, `/api/recommend-services` | Medium | No auth, no rate limit — cost risk when API key is active |
| Blog slug uniqueness | `/api/admin/blogs/save` | Low | Race condition possible on concurrent create |
| ~~Blog/leads permission gap~~ **RESOLVED** | `/api/admin/blogs/*`, `/api/admin/leads/[id]` | Resolved 2026-07-22 | All four routes now use `requirePermission` with granular permissions. `manage_leads` permission added. Zero `requireAdmin`-only routes remain in `app/api/admin/**`. **Future audit required**: verify all `/api/admin/**` routes added after 2026-07-22 use `requirePermission`. |
