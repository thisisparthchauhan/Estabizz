// ─────────────────────────────────────────────────────────────────────────────
// Admin module — shared TypeScript types
//
// SERVER-SIDE ONLY. Do not import this file in any "use client" component.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Enumerations ─────────────────────────────────────────────────────────────

/** Hierarchical roles — widest access first */
export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'reviewer';

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
  | 'manage_users';     // manage other admin accounts

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
    // manage_users intentionally excluded — only super_admin
  ],
  editor: [
    'manage_blogs',
    'create_blog',
    'edit_blog',
    'manage_categories',
    'manage_media',
  ],
  reviewer: [
    'manage_blogs',
    'approve_blog',
    'publish_blog',
    'reject_blog',
    'archive_blog',
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
