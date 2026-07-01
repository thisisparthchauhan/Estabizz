/**
 * Admin Layout — SERVER-SIDE auth guard.
 *
 * Runs in the Node.js runtime, so it can verify the JWT signature and check
 * admin access before any admin page renders.
 *
 * Flow:
 *   1. Read the `auth_token` cookie.
 *   2. Verify the JWT signature with JWT_SECRET.
 *   3. Confirm the email is an active admin:
 *      a. Fast path — static ADMIN_EMAIL_ALLOWLIST (seed / legacy accounts), or
 *      b. DB fallback — active record in the `admin_users` MongoDB collection
 *         (accounts created via the Users admin panel).
 *   4. If any check fails → redirect to /login.
 *   5. Otherwise render the client admin shell.
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

  let email = "";
  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    email = (decoded.email ?? "").toLowerCase().trim();
  } catch {
    return null;
  }

  if (!email) return null;

  // Fast path: static allowlist covers seed / legacy admin accounts.
  if (ADMIN_EMAIL_ALLOWLIST.has(email)) return email;

  // DB fallback: accept any active admin_users record created via the panel.
  // This mirrors the requireAdmin API guard so page access and API access
  // stay in sync for panel-created admin users.
  try {
    const { connectDB } = await import("@/lib/db");
    const AdminUserModel = (await import("@/lib/models/AdminUser")).default;
    await connectDB();
    const doc = await AdminUserModel.findOne({ email, status: "active" }).lean();
    if (doc) return email;
  } catch {
    // DB unavailable — deny rather than fall through
  }

  return null;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await getVerifiedAdminEmail();

  // Not a verified admin → bounce to login.
  if (!email) {
    redirect("/login?redirect=/admin");
  }

  return <AdminShell adminEmail={email}>{children}</AdminShell>;
}
