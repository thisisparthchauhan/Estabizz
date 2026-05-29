/**
 * requireAdmin — server-side admin auth guard for API route handlers.
 *
 * Usage (inside a route handler, Node.js runtime):
 *
 *   const auth = requireAdmin(req);
 *   if (!auth.ok) return auth.response;
 *   // ...auth.email is a verified admin
 *
 * What it checks:
 *   1. `auth_token` cookie is present.
 *   2. The JWT signature verifies against process.env.JWT_SECRET.
 *   3. The email in the payload is in the admin allowlist (active admins).
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

export function requireAdmin(req: NextRequest): AdminAuthResult {
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

  if (!email || !ADMIN_EMAIL_ALLOWLIST.has(email)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Admin access required.' },
        { status: 403 }
      ),
    };
  }

  return { ok: true, email };
}
