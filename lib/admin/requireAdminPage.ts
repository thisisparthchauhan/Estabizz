/**
 * requireAdminPage — server-side auth guard for page components.
 *
 * Mirrors the JWT verification logic in app/admin/layout.tsx so that internal
 * pages outside the /admin/* tree can be protected without rendering AdminShell.
 *
 * Usage (in a server page component):
 *
 *   export default async function MyPage() {
 *     await requireAdminPage('/resources/my-page');
 *     return <main>…</main>;
 *   }
 *
 * Unauthenticated visitors are redirected to /login?redirect=<path>.
 * Authenticated admins receive the page normally.
 * Returns the verified admin email (available to the page if needed).
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { ADMIN_EMAIL_ALLOWLIST } from '@/lib/admin/seedData';

export async function requireAdminPage(path: string): Promise<string> {
  const token = (await cookies()).get('auth_token')?.value;
  const secret = process.env.JWT_SECRET;

  let email = '';
  if (token && secret) {
    try {
      const decoded = jwt.verify(token, secret) as { email?: string };
      email = (decoded.email ?? '').toLowerCase().trim();
    } catch {
      // invalid or expired token — fall through to redirect
    }
  }

  if (email) {
    // Fast path: static allowlist covers seed / legacy admin accounts.
    if (ADMIN_EMAIL_ALLOWLIST.has(email)) return email;

    // DB fallback: accept any active admin_users record created via the panel.
    // Mirrors requireAdmin.ts so page access and API access stay in sync.
    try {
      const { connectDB } = await import('@/lib/db');
      const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
      await connectDB();
      const doc = await AdminUserModel.findOne({ email, status: 'active' }).lean();
      if (doc) return email;
    } catch {
      // DB unavailable — deny rather than fall through
    }
  }

  redirect(`/login?redirect=${path}`);
}
