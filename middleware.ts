/**
 * Next.js Edge Middleware — route protection.
 *
 * LAYER 1 (this file — Edge Runtime):
 *   Checks whether an auth_token cookie is present.
 *   If the cookie is missing, the request is redirected to /login.
 *   This is a fast, low-cost check that runs before the page renders.
 *
 * LAYER 2 (app/admin/layout.tsx — Node.js Server Component, to be built):
 *   After the cookie check passes here, the admin layout will:
 *     1. Decode and verify the JWT signature using jsonwebtoken.
 *     2. Extract the email from the payload.
 *     3. Call isActiveAdmin(email) from lib/admin/helpers.ts.
 *     4. Verify the admin has the required permission for the route.
 *     5. Redirect to /login (or a 403 page) if the check fails.
 *
 * WHY TWO LAYERS?
 *   Next.js middleware runs on the Edge Runtime, which cannot execute
 *   Node.js-only modules such as `jsonwebtoken` or the Mongoose driver.
 *   Full JWT verification and MongoDB admin lookups therefore happen in the
 *   Server Component layout, which runs in the full Node.js runtime.
 *
 * IMPORTANT: Do not import any Node.js modules (jsonwebtoken, mongoose,
 * bcryptjs, etc.) in this file — they will cause a build error.
 */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // ── Protect all /admin/* routes ──────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      // Redirect unauthenticated visitors to login,
      // preserving the original destination for post-login redirect.
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token is present — Layer 2 (admin layout) will perform full
    // JWT verification + admin allowlist check.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all /admin/* paths.
     * Exclude Next.js internal paths and static assets so they are
     * never intercepted by this middleware.
     */
    '/admin/:path*',
  ],
};
