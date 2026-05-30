/**
 * Session helpers — verify the auth_token JWT and return the user's email.
 *
 * Unlike requireAdmin, these accept ANY valid logged-in user (no admin
 * allowlist). Used for user-owned resources like "My Submissions".
 *
 * Node.js runtime only (uses jsonwebtoken).
 */

import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

function verifyEmail(token: string | undefined): string | null {
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    const email = (decoded.email ?? '').toLowerCase().trim();
    return email || null;
  } catch {
    return null;
  }
}

/** For API route handlers — reads the cookie off the request. */
export function getSessionEmailFromRequest(req: NextRequest): string | null {
  return verifyEmail(req.cookies.get('auth_token')?.value);
}

/** For Server Components — reads the cookie via next/headers. */
export async function getSessionEmail(): Promise<string | null> {
  const token = (await cookies()).get('auth_token')?.value;
  return verifyEmail(token);
}
