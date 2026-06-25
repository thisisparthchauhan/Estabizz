import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { getAllAdminUsers, createAdminUser } from '@/lib/admin/repository';
import type { AdminRole } from '@/lib/admin/types';
import { ROLE_DEFAULT_PERMISSIONS } from '@/lib/admin/types';

const VALID_ROLES: AdminRole[] = [
  'super_admin', 'website_editor', 'content_writer',
  'compliance_reviewer', 'seo_manager', 'admin_viewer',
  'admin', 'editor', 'reviewer',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── GET /api/admin/users — list all admin users ────────────────────────────

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'manage_users');
  if (!auth.ok) return auth.response;

  try {
    const users = await getAllAdminUsers();
    return NextResponse.json({ users });
  } catch (err) {
    console.error('[admin/users] GET error:', err);
    return NextResponse.json({ error: 'Unable to load users.' }, { status: 500 });
  }
}

// ── POST /api/admin/users — create a new admin user ───────────────────────

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'manage_users');
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json() as Record<string, unknown>;
    const fullName = String(body.fullName ?? '').trim();
    const email    = String(body.email    ?? '').toLowerCase().trim();
    const role     = body.role as AdminRole;

    if (!fullName) {
      return NextResponse.json({ error: 'Full Name is required.' }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'A valid Email Address is required.' }, { status: 400 });
    }
    if (!role || !VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: 'A valid Role is required.' }, { status: 400 });
    }

    const user = await createAdminUser({ fullName, email, role });
    return NextResponse.json({ success: true, user });
  } catch (err: unknown) {
    console.error('[admin/users] POST error:', err);
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('duplicate key') || msg.includes('E11000')) {
      return NextResponse.json({ error: 'An admin user with this email address already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Unable to create user.' }, { status: 500 });
  }
}

