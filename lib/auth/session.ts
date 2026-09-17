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

export interface AuthSession {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

function verifySession(token: string | undefined): AuthSession | null {
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  try {
    const decoded = jwt.verify(token, secret) as {
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
    };
    const userId = (decoded.id ?? '').trim();
    const email = (decoded.email ?? '').toLowerCase().trim();
    if (!userId || !email) return null;
    return {
      userId,
      email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };
  } catch {
    return null;
  }
}

function verifyEmail(token: string | undefined): string | null {
  return verifySession(token)?.email ?? null;
}

/** For API route handlers — reads the cookie off the request. */
export function getAuthSessionFromRequest(req: NextRequest): AuthSession | null {
  return verifySession(req.cookies.get('auth_token')?.value);
}

/** For Server Components — reads the cookie via next/headers. */
export async function getAuthSession(): Promise<AuthSession | null> {
  const token = (await cookies()).get('auth_token')?.value;
  return verifySession(token);
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
