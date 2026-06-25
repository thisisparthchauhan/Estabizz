// ─────────────────────────────────────────────────────────────────────────────
// Admin module — shared TypeScript types
//
// SERVER-SIDE ONLY. Do not import this file in any "use client" component.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Enumerations ─────────────────────────────────────────────────────────────

/**
 * Roles. The six business roles are listed first; the original four
 * (admin/editor/reviewer) are retained for backward compatibility with
 * existing accounts and the blog workflow.
 */
export type AdminRole =
  | 'super_admin'         // full access to everything
  | 'website_editor'      // edit website sections (no publish, no delete-page, no users)
  | 'content_writer'      // create/edit drafts → approval
  | 'compliance_reviewer' // approve / reject / comment on drafts
  | 'seo_manager'         // SEO fields only
  | 'admin_viewer'        // read-only
  // legacy roles (kept for compatibility)
  | 'admin'
  | 'editor'
  | 'reviewer';

/** Human-friendly role labels for the admin UI. */
export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  website_editor: 'Website Editor',
  content_writer: 'Content Writer',
  compliance_reviewer: 'Compliance Reviewer',
  seo_manager: 'SEO Manager',
  admin_viewer: 'Admin Viewer',
  admin: 'Administrator',
  editor: 'Editor',
  reviewer: 'Reviewer',
};

/** Account lifecycle states */
export type AdminStatus = 'active' | 'inactive' | 'suspended';

/**
 * Granular permission keys.
 * A role ships with a default permission set (see ROLE_DEFAULT_PERMISSIONS),
 * but individual records may be narrowed or widened from that default.
 */
export type AdminPermission =
  | 'manage_blogs'      // view the blog admin section
  | 'create_blog'       // author new blog posts
  | 'edit_blog'         // edit any blog post
  | 'approve_blog'      // move pending → approved
  | 'publish_blog'      // move approved → published (makes it live)
  | 'reject_blog'       // reject user submissions
  | 'archive_blog'      // move published → archived
  | 'delete_blog'       // permanently delete a blog post
  | 'manage_categories' // create / edit / delete blog categories
  | 'manage_media'      // upload and manage images
  | 'manage_users'      // manage other admin accounts
  // ── Site content CMS ────────────────────────────────────────────────────────
  | 'manage_content'    // edit website content (homepage, pages)
  | 'publish_content'   // approve & make content changes live
  | 'manage_navigation' // edit navbar & footer
  | 'delete_content'    // soft-delete content → Recycle Bin
  | 'purge_content'     // permanently delete from Recycle Bin (admin only, needs password)
  | 'manage_seo'        // edit SEO fields (title, meta, slug, OG, canonical, index)
  | 'view_admin';       // read-only access to the admin panel

// ─── Role → default permission mapping ────────────────────────────────────────

export const ROLE_DEFAULT_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  super_admin: [
    'manage_blogs',
    'create_blog',
    'edit_blog',
    'approve_blog',
    'publish_blog',
    'reject_blog',
    'archive_blog',
    'delete_blog',
    'manage_categories',
    'manage_media',
    'manage_users',
    'manage_content',
    'publish_content',
    'manage_navigation',
    'delete_content',
    'purge_content',
    'manage_seo',
    'view_admin',
  ],

  // ── The six business roles ──────────────────────────────────────────────────
  website_editor: [
    'manage_content',     // edit website sections
    'manage_navigation',  // navbar + footer
    'manage_media',
    'view_admin',
    // NOT publish_content (sends for approval), NOT delete/purge, NOT users
  ],
  content_writer: [
    'manage_blogs',
    'create_blog',
    'edit_blog',
    'manage_media',
    'manage_content',     // drafts → approval
    'view_admin',
    // changes go for approval; cannot publish
  ],
  compliance_reviewer: [
    'manage_blogs',
    'approve_blog',
    'reject_blog',
    'publish_blog',
    'archive_blog',
    'publish_content',    // approve/reject/publish content changes
    'view_admin',
  ],
  seo_manager: [
    'manage_seo',
    'manage_media',
    'view_admin',
  ],
  admin_viewer: [
    'view_admin',         // read-only
  ],

  admin: [
    'manage_blogs',
    'create_blog',
    'edit_blog',
    'approve_blog',
    'publish_blog',
    'reject_blog',
    'archive_blog',
    'delete_blog',
    'manage_categories',
    'manage_media',
    'manage_content',
    'publish_content',
    'manage_navigation',
    'delete_content',
    'purge_content',
    'manage_seo',
    'view_admin',
    // manage_users intentionally excluded — only super_admin
  ],
  editor: [
    'manage_blogs',
    'create_blog',
    'edit_blog',
    'manage_categories',
    'manage_media',
    // content editors can edit & submit, but NOT publish or delete
    'manage_content',
    'manage_navigation',
  ],
  reviewer: [
    'manage_blogs',
    'approve_blog',
    'publish_blog',
    'reject_blog',
    'archive_blog',
    // reviewers can approve/publish content changes
    'publish_content',
  ],
};

// ─── Core AdminUser interface ──────────────────────────────────────────────────

export interface AdminUser {
  id: string;

  fullName: string;

  /**
   * Always stored and compared in lowercase.
   * Must be unique across all AdminUser records.
   */
  email: string;

  role: AdminRole;
  status: AdminStatus;

  /**
   * Explicit per-record permission list.
   * Defaults to ROLE_DEFAULT_PERMISSIONS[role] at creation time.
   * Stored explicitly so individual records can be widened / narrowed
   * without changing the role.
   */
  permissions: AdminPermission[];

  /**
   * bcrypt hash of the admin's password.
   * May be undefined when the admin authenticates through the existing
   * User model (same email + password) rather than a separate admin credential.
   *
   * TODO: Populate this field when the dedicated /admin/login flow is built.
   */
  passwordHash?: string;

  /**
   * OAuth provider subject identifier (e.g. Google sub, GitHub id).
   * Reserved for future SSO / OAuth integration.
   */
  authProviderId?: string;

  emailVerified: boolean;

  /** ISO-8601 string — set on each successful admin login */
  lastLoginAt?: string;

  /** ISO-8601 strings — managed by the data layer */
  createdAt: string;
  updatedAt: string;
}

// ─── Lightweight shape for JWT payload ────────────────────────────────────────

/**
 * Subset included inside the admin JWT payload.
 * Keep this minimal — it lives inside every authenticated request.
 */
export interface AdminJWTPayload {
  adminId: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermission[];
}

// ─── Input types for create / update operations ───────────────────────────────

export type CreateAdminUserInput = Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateAdminUserInput = Partial<
  Omit<AdminUser, 'id' | 'email' | 'createdAt' | 'updatedAt'>
>;
