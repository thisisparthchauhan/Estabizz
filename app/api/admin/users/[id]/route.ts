import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import {
  updateAdminUserById,
  getAdminUserByEmail,
  countActiveSuperAdmins,
} from '@/lib/admin/repository';
import type { AdminRole, AdminStatus } from '@/lib/admin/types';

const VALID_ROLES: AdminRole[] = [
  'super_admin', 'website_editor', 'content_writer',
  'compliance_reviewer', 'seo_manager', 'admin_viewer',
  'admin', 'editor', 'reviewer',
];

const VALID_STATUSES: AdminStatus[] = ['active', 'inactive', 'suspended'];

// ── PATCH /api/admin/users/[id] — update fullName, role or status ──────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'manage_users');
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    const body = await req.json() as Record<string, unknown>;

    const updates: { fullName?: string; role?: AdminRole; status?: AdminStatus } = {};

    if (body.fullName !== undefined) {
      const name = String(body.fullName).trim();
      if (!name) return NextResponse.json({ error: 'Full Name cannot be empty.' }, { status: 400 });
      updates.fullName = name;
    }

    if (body.role !== undefined) {
      const role = body.role as AdminRole;
      if (!VALID_ROLES.includes(role)) {
        return NextResponse.json({ error: 'Invalid role.' }, { status: 400 });
      }
      updates.role = role;
    }

    if (body.status !== undefined) {
      const status = body.status as AdminStatus;
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
      }
      updates.status = status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No changes provided.' }, { status: 400 });
    }

    // ── Last super_admin protection ────────────────────────────────────────
    // Find the target user by _id to check their current role
    const { connectDB } = await import('@/lib/db');
    const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
    await connectDB();

    const target = await AdminUserModel.findById(id).lean();
    if (!target) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const wouldLeaveNoSuperAdmin =
      target.role === 'super_admin' &&
      target.status === 'active' &&
      (
        (updates.role !== undefined && updates.role !== 'super_admin') ||
        (updates.status !== undefined && updates.status !== 'active')
      );

    if (wouldLeaveNoSuperAdmin) {
      const remaining = await countActiveSuperAdmins();
      if (remaining <= 1) {
        return NextResponse.json(
          { error: 'Cannot remove or suspend the last Super Admin account. Add another Super Admin first.' },
          { status: 422 }
        );
      }
    }

    const updated = await updateAdminUserById(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error('[admin/users/:id] PATCH error:', err);
    return NextResponse.json({ error: 'Unable to save changes.' }, { status: 500 });
  }
}
