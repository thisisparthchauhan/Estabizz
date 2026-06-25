import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import {
  getAllAdminUsers,
  createAdminUser,
  createAdminLoginCredential,
  getLoginReadyEmails,
} from '@/lib/admin/repository';
import { ADMIN_EMAIL_ALLOWLIST } from '@/lib/admin/seedData';
import type { AdminRole } from '@/lib/admin/types';

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
    const loginReadySet = await getLoginReadyEmails(users.map(u => u.email));

    const enriched = users.map(u => ({
      ...u,
      loginReady: loginReadySet.has(u.email.toLowerCase()) ||
                  ADMIN_EMAIL_ALLOWLIST.has(u.email.toLowerCase()),
    }));

    return NextResponse.json({ users: enriched });
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
    const fullName          = String(body.fullName          ?? '').trim();
    const email             = String(body.email             ?? '').toLowerCase().trim();
    const role              = body.role as AdminRole;
    const createLoginAccess = body.createLoginAccess === true;
    const password          = String(body.password          ?? '').trim();
    const confirmPassword   = String(body.confirmPassword   ?? '').trim();

    if (!fullName) {
      return NextResponse.json({ error: 'Full Name is required.' }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'A valid Email Address is required.' }, { status: 400 });
    }
    if (!role || !VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: 'A valid Role is required.' }, { status: 400 });
    }

    if (createLoginAccess) {
      if (!password) {
        return NextResponse.json({ error: 'A password is required to create login access.' }, { status: 400 });
      }
      if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
      }
      if (password !== confirmPassword) {
        return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
      }
    }

    const user = await createAdminUser({ fullName, email, role });

    if (createLoginAccess) {
      await createAdminLoginCredential(user.id, password);
    }

    const loginReady = createLoginAccess ||
      ADMIN_EMAIL_ALLOWLIST.has(email.toLowerCase());

    return NextResponse.json({ success: true, user: { ...user, loginReady } });
  } catch (err: unknown) {
    console.error('[admin/users] POST error:', err);
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('duplicate key') || msg.includes('E11000')) {
      return NextResponse.json({ error: 'An admin user with this email address already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Unable to create user.' }, { status: 500 });
  }
}
