# Estabizz Admin OS — Disaster Recovery & Backup Reference

> Created: Phase 5B (2026-07-02 IST) · Do not include credentials in this file.

---

## 1. Purpose

This document records the backup strategy, restore procedures, recycle bin safety rules, and recovery runbook for the Estabizz Admin OS CMS. It is the authoritative reference for any recovery event.

---

## 2. Current Phase

- **Phase 5B** — Backup / Restore / Disaster Recovery Hardening
- All work is **local**. Not pushed to production.
- Public Content CMS: **46 managed pages** (c0188b2 → Phase 4R baseline)
- Security hardening: **Phase 5A approved** — permission matrix in `ADMIN_OS_SECURITY_MATRIX.md`

---

## 3. Backup System

### 3.1 Backup Creation

**Route:** `POST /api/admin/backups/create`
**Permission:** `manage_backups` (super_admin, admin only)
**Library:** `lib/content/backup.ts` → `createBackup(actor, role)`

**How it works:**
1. A `BackupSnapshot` record with `status: 'pending'` is written immediately so the UI can show "in progress".
2. `collectPayload()` runs `Promise.all` to fetch all 7 collections in parallel.
3. If GitHub env vars are configured, the JSON payload is base64-encoded and pushed to the GitHub backup repo via the GitHub Contents API.
4. The `BackupSnapshot` record is updated to `status: 'success'` (or `'failed'`) with item counts.
5. A `ContentAudit` record with `action: 'backup'` and `blockKey: 'system:backup'` is written for traceability.

**Error handling:** If GitHub push fails, the record is still saved locally (`destination: 'local'`) and the error is recorded in `errorMessage`. The backup is never silently lost.

### 3.2 Backup Scope

The backup includes exactly these collections:

| Collection | Notes |
|---|---|
| `ContentBlock` | All records — no sensitive fields in this collection |
| `ContentVersion` | Full version history for restorability |
| `ContentAudit` | Accountability trail |
| `MediaAsset` | Metadata only — safe fields selected; no file binaries |
| `AdminUser` | Safe metadata only — `passwordHash` is schema `select:false` AND explicitly excluded via projection |
| `RegulatoryUpdate` | Full content — no credentials or secrets in this collection |
| `PublicContentPage` | Scoped to exactly `PUBLIC_CONTENT_MANAGED_PATHS` (46 paths) |

**Not included:**
- `User` (credential collection) — never queried
- `passwordHash` — double-excluded (schema + projection)
- `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_API_SECRET`, `GITHUB_BACKUP_TOKEN` — never serialised
- The backup GitHub token itself — read from env only, never logged or returned in API responses

### 3.3 Backup Listing

**Route:** `GET /api/admin/backups`
**Permission:** `view_admin`

The listing query uses `.select('-payload')` — the `payload` field (which contains all collected data) is explicitly excluded from list responses. The `BackupSnapshot` schema also sets `payload` to `select: false`, so it is never accidentally included.

### 3.4 Backup Download / Export

**Route:** `GET /api/admin/backups/[id]/download`
**Permission:** `manage_backups`

The download route explicitly requests `+payload` via `BackupSnapshot.findById(id).select('+payload')`. Only users with `manage_backups` can trigger a download. The downloaded JSON is returned directly in the HTTP response body — it is never written to the project filesystem or committed to the main git repo.

**GitHub backup destination:** The payload is pushed to a separate GitHub backup repository (configured via `GITHUB_BACKUP_REPO` env var). It is NOT pushed to the Estabizz website repository.

### 3.5 Backup Record Count Verification

After a backup, the `itemCounts` field on the `BackupSnapshot` record reports:
- `contentBlocks` — total ContentBlock records
- `contentVersions` — total ContentVersion records
- `contentAudit` — total ContentAudit records
- `mediaAssets` — total MediaAsset records (safe metadata fields)
- `adminUsers` — total AdminUser records
- `regulatoryUpdates` — total RegulatoryUpdate records
- `publicContentPages` — total PublicContentPage records matching `PUBLIC_CONTENT_MANAGED_PATHS` (should equal 46 at Phase 4R baseline, but may be lower if some pages are deleted/soft-deleted)

The `summary` field on the snapshot record shows a human-readable count string visible in the admin UI.

---

## 4. Version Restore (Content Blocks)

### 4.1 Restore List

**Route:** `GET /api/admin/restore`
**Permission:** `view_admin` (list is read-only)
**Library:** `lib/content/restore.ts` → `listRestoreVersions(admin, filters)`

The restore list is scoped by the caller's role and permissions:
- Elevated admins (`super_admin`, `admin`) and `admin_viewer` see all content types
- `seo_manager` sees only SEO keys
- `website_editor` and `content_writer` see only content keys
- All others: `manage_content` or `publish_content` required to see content; `manage_seo` for SEO keys

Only `ContentVersion` records with `status: 'published'` are shown (no draft or pending snapshots).

Scan limit: `MAX_RESTORE_SCAN = 500` versions to prevent runaway queries.

### 4.2 Restore Action

**Route:** `POST /api/admin/restore/action`
**Permission:** `publish_content` (fixed in Phase 5B — was incorrectly `view_admin`)
**Library:** `lib/content/restore.ts` → `restoreContentVersion(admin, versionId)`

**Fix applied (Phase 5B):** The route previously required only `view_admin` at the API layer. Since restoring a content version directly publishes content (sets `status: 'published'` on the live `ContentBlock`), the correct API-layer permission is `publish_content`. The library's `canRestoreKey()` was already enforcing this as a second layer but was returning a 500 (not 403) on failure. The API fix removes that ambiguity.

**Restore flow:**
1. Version is fetched by ID, verified to exist and have `status: 'published'`.
2. `canRestoreKey(admin, key)` is checked: `publish_content` required for content keys; `manage_seo` for SEO keys; elevated admins bypass.
3. The `ContentBlock` is updated via `findOneAndUpdate` with `{ upsert: true }` — creates the record if it was previously purged.
4. A new `ContentVersion` record is written with `note: 'restored from version <id>'`.
5. A `ContentAudit` record with `action: 'restore'` is written.
6. `revalidatePath(pagePath)` is called to purge Next.js cache for the affected page.

**Important:** This restore flow is for ContentBlock (website section) data only — NOT for PublicContentPage records. PublicContentPage restore goes through the Recycle Bin (see Section 5).

### 4.3 Content Restore Does Not Apply to PublicContentPage

PublicContentPage records do not appear in the Version Restore interface. The restore system (`lib/content/restore.ts`) works exclusively on `ContentVersion` records tied to content block keys (e.g. `homepage.hero`). PublicContentPage records have their own soft-delete / restore flow via the Recycle Bin.

---

## 5. Recycle Bin

### 5.1 Recycle Bin Listing

**Route:** `GET /api/admin/recycle-bin`
**Permission:** `view_admin`
**Library:** `lib/content/recycleBin.ts` → `listRecycleBinItems(filters)`

Items shown:
- `media` — `MediaAsset` records with `status: 'removed'`
- `content` — `ContentBlock` records with `status: 'deleted'`
- `public_content_page` — `PublicContentPage` records with `status: 'deleted'` AND `fullPath` in `PUBLIC_CONTENT_MANAGED_PATHS`
- `regulatory` — `RegulatoryUpdate` records with `status: 'deleted'`

All four item types are shown in a unified list sorted by `removedAt` descending.

### 5.2 Recycle Bin Restore

**Route:** `POST /api/admin/recycle-bin/restore`
**Permission:** `delete_content`
**Library:** `lib/content/recycleBin.ts` → `restoreRecycleBinItem(actor, id, type, actorRole)`

Restore behaviour by type:
| Type | Restored to | Notes |
|---|---|---|
| `media` | `status: 'active'` | Immediate — no approval needed |
| `content` | `status: 'draft'` | Requires re-approval/re-publish before going live |
| `public_content_page` | Pre-deletion status | Delegates to `restorePublicContentPageFromRecycleBin` |
| `regulatory` | Pre-deletion status | Delegates to `restoreDeletedUpdate`; audit record written |

Content block restore returns to `draft` (not `published`) to require a fresh review before the restored content goes live — this is intentional.

A `ContentAudit` record is written for media and content block restores. Regulatory updates write their own audit via `RegulatoryUpdateAudit`.

### 5.3 Recycle Bin Purge

**Route:** `POST /api/admin/recycle-bin/purge`
**Permission:** `purge_content` (super_admin, admin only)
**Library:** `lib/content/recycleBin.ts` → `purgeRecycleBinItem(actor, id, type, actorRole)`

**PublicContentPage purge is hard-blocked at two layers:**
1. **API route** (Phase 5A): returns `400` with tombstone safety message if `type === 'public_content_page'`.
2. **Library** (`purgeRecycleBinItem`): throws `Error('Content Pages are protected and cannot be permanently deleted...')` if `type === 'public_content_page'`.

Both guards are independent — neither can be bypassed alone.

**Why:** PublicContentPage records are tombstones that protect the live Next.js route. If the DB record is permanently deleted, the `getPublicContentPageRenderState()` rendering function would fall back to the hardcoded `PageClient` instead of returning 404 — potentially serving stale hardcoded content at a path that should be offline.

Purge behaviour for other types:
| Type | Action | Notes |
|---|---|---|
| `media` | `MediaAsset.findByIdAndDelete(id)` | Cloudinary asset NOT purged — manual cleanup required |
| `content` | `ContentBlock.findByIdAndDelete(id)` | Site falls back to built-in defaults for that section |
| `regulatory` | Via `purgeDeletedUpdate` | Writes `RegulatoryUpdateAudit` record before deleting |

**Known limitation:** Media and content purge do not verify the item is in `status: 'removed'`/`'deleted'` before hard-deleting. A `purge_content` user (elevated admin) could purge any media/content record by ID. Given that `purge_content` is restricted to `super_admin` and `admin`, the blast radius is limited to the most-trusted roles. Recommended fix: add `status` filter to the `findById` lookup before deleting.

---

## 6. Change History / Audit Trail

### 6.1 Change History Route

**Route:** `GET /api/admin/change-history`
**Permission:** `view_admin` (list is read-only)
**Library:** `lib/content/changeHistory.ts` → `listChangeHistory(admin, filters)`

The history includes:
- `ContentVersion` records for website content and SEO blocks
- Blog records via `getAllBlogsForAdmin`

Results are scoped by `canSeeType(admin, type)`:
| Role | Sees |
|---|---|
| `super_admin`, `admin`, `admin_viewer` | All types |
| `seo_manager` | SEO only |
| `website_editor` | Content only |
| `content_writer` | Content + Blog |
| `compliance_reviewer` | Content + Blog |
| Others | Based on `manage_content`, `publish_content`, `manage_seo`, `manage_blogs`, `approve_blog` permissions |

Scan limits: `MAX_HISTORY_SCAN = 500` ContentVersion records; `MAX_BLOG_SCAN = 200` blog records.

Change history is **read-only** — there are no write or delete operations exposed through this route.

### 6.2 ContentAudit Records

The `ContentAudit` collection records all significant admin actions:
- `backup` — backup created (`blockKey: 'system:backup'`)
- `restore` — version restored to live
- `restore_from_bin` — item restored from Recycle Bin
- `purge` — item permanently deleted from Recycle Bin
- `edit`, `create`, `submit`, `approve`, `reject`, `publish`, `delete` — content lifecycle events

ContentAudit records are included in every backup and are never deleted or soft-deleted.

---

## 7. Disaster Recovery Runbook

### Scenario A: Content block data corruption / bad publish

1. Go to **Admin → Restore** in the admin panel.
2. Find the content block (by page/section name or keyword search).
3. Select the version you want to roll back to — the diff shows exactly which fields changed.
4. Click **Restore** (requires `publish_content`).
5. The live `ContentBlock` is updated immediately; the page cache is revalidated via `revalidatePath`.
6. Verify the page on the live site.

Requires: `publish_content` permission.

### Scenario B: Content page accidentally soft-deleted

1. Go to **Admin → Recycle Bin** in the admin panel.
2. Filter by `Content Pages` type.
3. Find the page (by title or path).
4. Click **Restore** (requires `delete_content`).
5. The `PublicContentPage` record is restored to its pre-deletion status.
6. Verify the page renders correctly at its public URL.

Requires: `delete_content` permission.
No purge path exists for `public_content_page` — tombstone protection is permanent.

### Scenario C: Backup restore after data loss

Use this when the MongoDB database needs to be rebuilt from a backup snapshot.

**DO NOT** restore from a backup JSON in the normal admin panel — there is no automated DB import path in the current phase. Manual restore procedure:

1. Locate the backup file. If using GitHub backup destination, it is in the configured `GITHUB_BACKUP_REPO` under `cms-backups/<year>/<month>/<day>/backup-*.json`. If local-only, download from `GET /api/admin/backups/[id]/download`.
2. Open the JSON file. Confirm the `metadata.notice` field reads: *"CMS content and metadata only. No credentials, secrets, or sensitive authentication data."*
3. Verify `metadata.itemCounts.publicContentPages` equals the expected number of managed pages (46 at Phase 4R baseline).
4. Use `mongoimport` or a MongoDB shell script to restore individual collections as needed. Only restore collections where data loss has occurred.
5. After restoring `adminUsers`, verify that no `passwordHash` field is present in the backup (it should never be present — see Section 3.2). If it is present in a legacy backup, do not import that field.
6. After restore, create a fresh backup via the admin panel to confirm the DB state is correct.

### Scenario D: GitHub backup push failing

The `BackupSnapshot` record will show `destination: 'local'` and `errorMessage` containing the GitHub error.

1. Verify `GITHUB_BACKUP_TOKEN`, `GITHUB_BACKUP_OWNER`, `GITHUB_BACKUP_REPO` env vars are set correctly.
2. Confirm the token has `contents: write` permission on the backup repo.
3. Download the local backup via `GET /api/admin/backups/[id]/download` and manually push to a safe location.
4. Create a new backup once the env vars are corrected.

### Scenario E: Admin user locked out

If the last super_admin cannot log in:

1. Use a direct MongoDB connection to query the `admin_users` collection.
2. Confirm the account exists and `status === 'active'`.
3. If the password is unknown, use the password reset endpoint `POST /api/admin/users/[id]/reset-password` from a secondary super_admin account (requires `manage_users`).
4. If there is no secondary super_admin, reset the password hash directly in MongoDB using bcrypt (bcrypt.hashSync with 10 rounds).
5. The `ADMIN_EMAIL_ALLOWLIST` in `lib/admin/seedData.ts` provides a static bypass for seed accounts even if the `admin_users` DB record is missing.

---

## 8. Security Invariants (Phase 5B Confirmed)

| Invariant | Status |
|---|---|
| Backup never includes `passwordHash` | Confirmed — double-excluded (schema + projection) |
| Backup never includes JWT_SECRET / MONGODB_URI / Cloudinary secret | Confirmed — no env var serialisation in backup |
| Backup `payload` field excluded from list responses | Confirmed — schema `select:false` + explicit `-payload` in list query |
| Backup download requires `manage_backups` | Confirmed |
| PublicContentPage purge blocked at API layer | Confirmed — `400` if `type === 'public_content_page'` |
| PublicContentPage purge blocked at library layer | Confirmed — `throw Error` in `purgeRecycleBinItem` |
| PublicContentPage backup scoped to `PUBLIC_CONTENT_MANAGED_PATHS` | Confirmed — 46 paths |
| Version restore requires `publish_content` at API layer | Fixed in Phase 5B (was `view_admin`) |
| Version restore enforces `canRestoreKey()` in library | Confirmed — independent second layer |
| Change history is read-only | Confirmed — no write operations |
| ContentAudit records are never deleted | Confirmed — no delete path exists |
| Recycle Bin restore of content block returns to `draft` (not `published`) | Confirmed |

---

## 9. Known Limitations (Phase 5B)

1. **Purge does not verify item status before deleting.** `purgeRecycleBinItem` for media and content does not confirm `status: 'removed'`/`'deleted'` before calling `findByIdAndDelete`. A `purge_content` admin (super_admin or admin) could hard-delete any media/content record by ID via a crafted API call. Blast radius is limited to the two highest-trust roles.

2. **Recycle Bin restore does not verify item status.** `restoreRecycleBinItem` for media and content does not confirm the item is currently in the Recycle Bin before restoring. A `delete_content` user could change the status of any content block to `draft` or any media to `active` by ID. A content block being moved to `draft` is a downgrade (not a privilege escalation), so harm is limited.

3. **No automated DB import path.** There is no admin UI or API endpoint to import a backup JSON file back into MongoDB. Manual `mongoimport` is required (see Scenario C).

4. **Backup includes all ContentVersion records** (no time-bound limit). A very large version history could produce a large backup payload. The `MAX_RESTORE_SCAN = 500` limit only applies to the Restore UI list, not the backup.

5. **Cloudinary assets not purged on media record delete.** When a media record is purged from the Recycle Bin, the MongoDB record is deleted but the asset in Cloudinary is not removed. Manual Cloudinary cleanup is required.

---

## 10. Recommended Next Steps (Phase 5C+)

1. **Add status guard to purge/restore** — verify `status === 'removed'`/`'deleted'` before acting in `purgeRecycleBinItem` and `restoreRecycleBinItem`.
2. **Automated backup import endpoint** — allow restoring a specific collection from a selected backup snapshot via the admin UI.
3. **Backup payload size limit** — paginate or cap `ContentVersion` records in the backup (or prune old versions periodically) to keep backup size manageable.
4. **Cloudinary asset cleanup on media purge** — call the Cloudinary delete API when purging a media record.
5. **Backup integrity check** — verify `metadata.itemCounts.publicContentPages === PUBLIC_CONTENT_MANAGED_PATHS.length` on download and alert if mismatch.
6. **Scheduled auto-backup** — add a cron-triggered auto-backup (e.g. nightly) using `type: 'auto'` on the `BackupSnapshot` record.
