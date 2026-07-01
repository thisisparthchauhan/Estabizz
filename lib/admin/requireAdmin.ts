/**
 * requireAdmin — server-side admin auth guard for API route handlers.
 *
 * Usage (inside a route handler, Node.js runtime):
 *
 *   const auth = await requireAdmin(req);
 *   if (!auth.ok) return auth.response;
 *   // ...auth.email is a verified admin
 *
 * What it checks:
 *   1. `auth_token` cookie is present.
 *   2. The JWT signature verifies against process.env.JWT_SECRET.
 *   3. The email is either in the static admin allowlist (legacy/seed users)
 *      OR exists as an active record in the `admin_users` MongoDB collection
 *      (users created via the admin panel).
 *
 * Runs in the Node.js runtime only (uses jsonwebtoken) — do NOT call from
 * Edge middleware. API route handlers are Node.js by default, so this is safe.
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ADMIN_EMAIL_ALLOWLIST } from '@/lib/admin/seedData';

export type AdminAuthResult =
  | { ok: true; email: string }
  | { ok: false; response: NextResponse };

export async function requireAdmin(req: NextRequest): Promise<AdminAuthResult> {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Authentication required.' },
        { status: 401 }
      ),
    };
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Server authentication is not configured.' },
        { status: 500 }
      ),
    };
  }

  let email = '';
  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    email = (decoded.email ?? '').toLowerCase().trim();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Invalid or expired session.' },
        { status: 401 }
      ),
    };
  }

  if (!email) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Admin access required.' }, { status: 403 }),
    };
  }

  // Fast path: static allowlist covers legacy/seed admin accounts
  if (ADMIN_EMAIL_ALLOWLIST.has(email)) {
    return { ok: true, email };
  }

  // DB fallback: accept any active admin_users record created via the panel
  try {
    const { connectDB } = await import('@/lib/db');
    const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
    await connectDB();
    const doc = await AdminUserModel.findOne({ email, status: 'active' }).lean();
    if (doc) return { ok: true, email };
  } catch {
    // DB unavailable — fall through to deny
  }

  return {
    ok: false,
    response: NextResponse.json(
      { error: 'Admin access required.' },
      { status: 403 }
    ),
  };
}
