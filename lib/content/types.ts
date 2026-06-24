// ─────────────────────────────────────────────────────────────────────────────
// Content CMS — shared TypeScript types
//
// SERVER-SIDE types live here, but the plain data shapes (ContentStatus,
// ContentBlockData) are safe to import from client components too — they
// contain no server-only imports.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lifecycle of a content block.
 *   published        — live on the public site
 *   draft            — saved by an editor, not yet submitted
 *   pending_approval — editor submitted, waiting for admin approval
 *   deleted          — soft-deleted, sitting in the Recycle Bin
 */
export type ContentStatus = 'published' | 'draft' | 'pending_approval' | 'deleted';

/**
 * The editable payload of a content block.
 * Intentionally a free-form object — each block key (e.g. "global.footer")
 * defines its own field shape via the defaults registry in defaults.ts.
 */
export type ContentFields = Record<string, unknown>;

/**
 * A single editable unit of the website, addressed by a stable `key`
 * such as "global.footer", "homepage.hero", "page.rbi".
 */
export interface ContentBlock {
  key: string;
  fields: ContentFields;
  status: ContentStatus;

  /** email of the admin/editor who last touched it */
  updatedBy: string;
  /** ISO-8601 (UTC stored; rendered in IST in the UI) */
  updatedAt: string;
  createdAt: string;

  /** review metadata (approval workflow) */
  submittedBy?: string;
  reviewedBy?: string;
  reviewNote?: string;

  /** soft-delete metadata (Recycle Bin) */
  deletedBy?: string;
  deletedAt?: string;
}

/**
 * One historical snapshot of a content block — written on every save.
 * Restoring a version copies its `snapshot` back into the live block.
 */
export interface ContentVersion {
  blockKey: string;
  snapshot: ContentFields;
  status: ContentStatus;
  changedBy: string;
  changedAt: string;   // ISO-8601
  note?: string;       // e.g. "edited", "restored from v3", "approved"
}

/** Audit-log action types (who did what, for accountability). */
export type ContentAuditAction =
  | 'create'
  | 'edit'
  | 'submit'
  | 'approve'
  | 'reject'
  | 'publish'
  | 'restore'
  | 'soft_delete'
  | 'restore_from_bin'
  | 'purge';

export interface ContentAudit {
  action: ContentAuditAction;
  blockKey: string;
  actor: string;            // email
  passwordConfirmed?: boolean; // true for purge (permanent delete)
  detail?: string;
  at: string;               // ISO-8601
}

/** Definition of a default content block (the hardcoded fallback). */
export interface ContentDefault {
  key: string;
  /** Human label shown in the admin UI */
  label: string;
  /** Which admin section this belongs to, e.g. "Navigation", "Homepage" */
  group: string;
  /** The fallback field values — used until an admin edits the block */
  fields: ContentFields;
}
