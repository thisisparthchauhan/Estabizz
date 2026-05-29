/**
 * Admin access helpers — business-logic layer.
 *
 * All functions are async so they can call the repository, which may hit a
 * database.  Import only in server components, API routes, or middleware.
 *
 * SERVER-SIDE ONLY — never import from a "use client" component.
 */

import type { AdminPermission, AdminUser } from './types';
import {
  getAdminUserByEmail,
  isAdminEmailSync,
} from './repository';

// ─────────────────────────────────────────────────────────────────────────────
// Core access checks
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Return the full AdminUser record for an email, or null if not found.
 * Email comparison is case-insensitive.
 */
export async function getAdminUserByEmailHelper(
  email: string
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  if (!email) return null;
  return getAdminUserByEmail(email);
}

/**
 * Fast synchronous check: is this email in the admin allowlist?
 *
 * Use this only for read-only gate checks where you do NOT need the full
 * AdminUser record (e.g. inside Next.js middleware which must stay
 * synchronous and cannot call async DB operations).
 *
 * For any action that also needs the role or permissions, use
 * `isActiveAdmin(email)` instead.
 */
export function isAdminEmail(email: string): boolean {
  if (!email) return false;
  return isAdminEmailSync(email);
}

/**
 * Async check: is this email an admin with status = 'active'?
 *
 * Returns false for inactive, suspended, or unknown emails.
 * Prefer this over `isAdminEmail` whenever you have an async context.
 */
export async function isActiveAdmin(email: string): Promise<boolean> {
  if (!email) return false;
  const user = await getAdminUserByEmail(email);
  return user !== null && user.status === 'active';
}

// ─────────────────────────────────────────────────────────────────────────────
// Permission checks
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check whether an admin email holds a specific permission.
 *
 * Returns false when:
 *  - The email is not in the admin allowlist.
 *  - The admin account is not active.
 *  - The permission is not in the admin's permission array.
 */
export async function hasAdminPermission(
  email: string,
  permission: AdminPermission
): Promise<boolean> {
  if (!email) return false;
  const user = await getAdminUserByEmail(email);
  if (!user || user.status !== 'active') return false;
  return user.permissions.includes(permission);
}

/**
 * Check multiple permissions at once — returns true only if ALL are granted.
 */
export async function hasAllAdminPermissions(
  email: string,
  permissions: AdminPermission[]
): Promise<boolean> {
  if (!email || permissions.length === 0) return false;
  const user = await getAdminUserByEmail(email);
  if (!user || user.status !== 'active') return false;
  return permissions.every((p) => user.permissions.includes(p));
}

/**
 * Check multiple permissions at once — returns true if ANY is granted.
 */
export async function hasAnyAdminPermission(
  email: string,
  permissions: AdminPermission[]
): Promise<boolean> {
  if (!email || permissions.length === 0) return false;
  const user = await getAdminUserByEmail(email);
  if (!user || user.status !== 'active') return false;
  return permissions.some((p) => user.permissions.includes(p));
}

// ─────────────────────────────────────────────────────────────────────────────
// Domain-specific convenience helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Can this admin access the blog management section?
 * Required for /admin/blogs listing.
 */
export async function canManageBlogs(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'manage_blogs');
}

/**
 * Can this admin approve pending blog submissions?
 * Required for the approval workflow.
 */
export async function canApproveBlogs(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'approve_blog');
}

/**
 * Can this admin publish approved blogs to the public site?
 */
export async function canPublishBlogs(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'publish_blog');
}

/**
 * Can this admin create new blog posts?
 */
export async function canCreateBlog(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'create_blog');
}

/**
 * Can this admin edit existing blog posts?
 */
export async function canEditBlog(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'edit_blog');
}

/**
 * Can this admin reject pending blog submissions?
 */
export async function canRejectBlogs(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'reject_blog');
}

/**
 * Can this admin delete blog posts permanently?
 */
export async function canDeleteBlog(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'delete_blog');
}

/**
 * Can this admin manage other admin user accounts?
 * Only super_admin by default.
 */
export async function canManageUsers(email: string): Promise<boolean> {
  return hasAdminPermission(email, 'manage_users');
}

// ─────────────────────────────────────────────────────────────────────────────
// JWT payload helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the admin-specific JWT payload from an AdminUser record.
 * Call this when issuing a token after successful admin authentication.
 *
 * TODO: Wire this into the /api/admin/auth/login route when it is built.
 */
export function buildAdminJWTPayload(
  user: Omit<AdminUser, 'passwordHash'>
): { adminId: string; email: string; role: string; permissions: AdminPermission[] } {
  return {
    adminId: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────────────────

/** Normalise an email address for storage and comparison */
export function normaliseEmail(email: string): string {
  return email.toLowerCase().trim();
}
