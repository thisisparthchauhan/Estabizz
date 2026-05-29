/**
 * Admin Layout — SERVER-SIDE auth guard.
 *
 * Runs in the Node.js runtime, so it can verify the JWT signature and check
 * the admin allowlist before any admin page renders. This is the real Layer-2
 * protection referenced by middleware.ts.
 *
 * Flow:
 *   1. Read the `auth_token` cookie.
 *   2. Verify the JWT signature with JWT_SECRET.
 *   3. Confirm the email is an active admin (ADMIN_EMAIL_ALLOWLIST).
 *   4. If any check fails → redirect to /login (preserving destination).
 *   5. Otherwise render the client admin shell.
 *
 * Edge middleware (middleware.ts) only checks cookie *presence* as a fast
 * first gate; this layout performs the authoritative verification.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import type { Metadata } from "next";
import { ADMIN_EMAIL_ALLOWLIST } from "@/lib/admin/seedData";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Admin pages are user-specific and must never be cached/prerendered.
export const dynamic = "force-dynamic";

async function getVerifiedAdminEmail(): Promise<string | null> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    const email = (decoded.email ?? "").toLowerCase().trim();
    if (email && ADMIN_EMAIL_ALLOWLIST.has(email)) return email;
    return null;
  } catch {
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await getVerifiedAdminEmail();

  // Not a verified admin → bounce to login. A logged-in non-admin user
  // also lands here (their token verifies but the email isn't allowlisted).
  if (!email) {
    redirect("/login?redirect=/admin");
  }

  return <AdminShell adminEmail={email}>{children}</AdminShell>;
}
