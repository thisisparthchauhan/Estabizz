/**
 * requirePermission — server-side guard that verifies the caller is an active
 * admin AND holds a specific permission.
 *
 * Builds on requireAdmin (JWT + allowlist) but additionally loads the admin's
 * role & permission set from the admin repository, so route handlers can:
 *   • gate by a granular permission (e.g. 'manage_content'), and
 *   • branch on role (e.g. admins publish instantly, editors go to approval).
 *
 * Usage:
 *   const auth = await requirePermission(req, 'manage_content');
 *   if (!auth.ok) return auth.response;
 *   // auth.admin = { email, role, permissions }
 *
 * Node.js runtime only (uses jsonwebtoken). API route handlers are Node by
 * default, so this is safe there.
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { seedAdminUsers } from '@/lib/admin/seedData';
import { getAdminUserByEmail } from '@/lib/admin/repository';
import type { AdminPermission, AdminRole } from '@/lib/admin/types';

export interface AdminContext {
  email: string;
  role: AdminRole;
  permissions: AdminPermission[];
}

export type PermissionResult =
  | { ok: true; admin: AdminContext }
  | { ok: false; response: NextResponse };

export async function requirePermission(
  req: NextRequest,
  permission: AdminPermission
): Promise<PermissionResult> {
  // 1. JWT + admin allowlist / active DB user
  const base = await requireAdmin(req);
  if (!base.ok) return { ok: false, response: base.response };

  // 2. Load role & permissions from MongoDB
  const admin = await getAdminUserByEmail(base.email);

  // Seed/allowlist users may not have a MongoDB record — fall back to seedAdminUsers
  // so that legacy accounts (estabizz@gmail.com, info@estabizz.com) can use all
  // permission-gated routes without requiring a manual DB insert.
  const resolved = (admin?.status === 'active')
    ? admin
    : seedAdminUsers.find((u) => u.email === base.email && u.status === 'active') ?? null;

  if (!resolved) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Admin account not found or inactive.' },
        { status: 403 }
      ),
    };
  }

  // 3. Permission check
  if (!resolved.permissions.includes(permission)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: `You do not have permission to ${permission.replace(/_/g, ' ')}.` },
        { status: 403 }
      ),
    };
  }

  return {
    ok: true,
    admin: { email: resolved.email, role: resolved.role, permissions: resolved.permissions },
  };
}

/** True when this role's edits publish instantly (admins) vs go to approval (staff). */
export function canPublishInstantly(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'admin';
}
