/**
 * Next.js 16 Edge Proxy — routing logic.
 *
 * Next.js 16 supports proxy.ts as the Edge-layer routing file (equivalent
 * to middleware.ts in earlier versions). The exported function must be named
 * `proxy`. Do NOT create a middleware.ts alongside this file — Next.js will
 * error if both are present.
 *
 * ROUTING ORDER (highest priority first):
 *   1. Country short-URL redirect  — /jordan → /global/jordan  (308)
 *   2. Admin route protection      — /admin/* cookie check
 *
 * LAYER 1 (this file — Edge Runtime):
 *   a. Short country URL redirect: a single-segment path that exactly
 *      matches a configured country slug is permanently redirected to
 *      /global/{slug}. Query parameters are preserved. Unknown slugs
 *      are not redirected (they 404 normally).
 *   b. Admin cookie check: if the auth_token cookie is absent, the
 *      visitor is redirected to /login.
 *
 * LAYER 2 (app/admin/layout.tsx — Node.js Server Component):
 *   After the cookie check passes here, the admin layout will:
 *     1. Decode and verify the JWT signature using jsonwebtoken.
 *     2. Extract the email from the payload.
 *     3. Call isActiveAdmin(email) from lib/admin/helpers.ts.
 *     4. Verify the admin has the required permission for the route.
 *     5. Redirect to /login (or a 403 page) if the check fails.
 *
 * WHY TWO LAYERS?
 *   The Edge Runtime cannot execute Node.js-only modules (jsonwebtoken,
 *   mongoose, bcryptjs, etc.). Full JWT verification and MongoDB admin
 *   lookups therefore happen in the Server Component layout.
 *
 * IMPORTANT: Do not import any Node.js modules in this file — they will
 * cause a build error. lib/globalMarkets/countries.ts is safe: it is pure
 * computation with no Node.js APIs, fully compatible with the Edge Runtime.
 */

import { NextRequest, NextResponse } from 'next/server';
import { COUNTRY_BY_SLUG } from '@/lib/globalMarkets/countries';

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // ── Country short-URL redirect ───────────────────────────────────────────
  // A single-segment path whose slug matches a configured country is
  // permanently redirected (308) to /global/{slug}.
  // Query parameters (UTM tags, etc.) are preserved via nextUrl.clone().
  // Multi-segment paths, unknown slugs, and reserved routes are not matched.
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1) {
    const slug = segments[0];
    if (COUNTRY_BY_SLUG.has(slug)) {
      const destination = request.nextUrl.clone();
      destination.pathname = `/global/${slug}`;
      return NextResponse.redirect(destination, 308);
    }
  }

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
     * Match all /admin/* paths for cookie-based route protection.
     */
    '/admin/:path*',

    /*
     * Match single-segment paths for country short-URL redirect.
     *
     * Pattern breakdown:
     *   /           — literal leading slash
     *   (           — start capture group (required by Next.js path matching)
     *   (?!         — negative lookahead: do NOT match if the segment starts with:
     *     _next       — Next.js internal runtime paths (_next/static, _next/image)
     *     |api        — API routes
     *     |favicon\\.ico
     *     |robots\\.txt
     *     |sitemap\\.xml
     *   )
     *   [^/]+       — one or more non-slash characters (ensures single segment only)
     *   )           — end capture group
     *
     * Examples that match:  /jordan  /about  /singapore  /rbi
     * Examples excluded:    /_next/static/…  /api/…  /global/jordan  /favicon.ico
     *
     * Unknown slugs (/about, /narnia, /rbi, etc.) pass through the middleware
     * function untouched because COUNTRY_BY_SLUG.has() returns false for them.
     */
    '/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml)[^/]+)',
  ],
};
