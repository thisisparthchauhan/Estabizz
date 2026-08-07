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
import type { AdminRole } from "@/lib/admin/types";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Admin pages are user-specific and must never be cached/prerendered.
export const dynamic = "force-dynamic";

interface AdminInfo {
  email: string;
  role: AdminRole;
}

async function getVerifiedAdmin(): Promise<AdminInfo | null> {
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

  // Fast path: seed users (covers allowlist accounts + their roles).
  const { seedAdminUsers, ADMIN_EMAIL_ALLOWLIST } = await import("@/lib/admin/seedData");
  const seedUser = seedAdminUsers.find((u) => u.email === email && u.status === "active");
  if (seedUser) return { email, role: seedUser.role };

  // Allowlist but no seed record → treat as super_admin.
  if (ADMIN_EMAIL_ALLOWLIST.has(email)) return { email, role: "super_admin" };

  // DB fallback: accept any active admin_users record created via the panel.
  try {
    const { connectDB } = await import("@/lib/db");
    const AdminUserModel = (await import("@/lib/models/AdminUser")).default;
    await connectDB();
    const doc = await AdminUserModel.findOne({ email, status: "active" }).lean() as { role?: AdminRole } | null;
    if (doc) return { email, role: doc.role ?? "admin_viewer" };
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
  const admin = await getVerifiedAdmin();

  // Not a verified admin → bounce to login.
  if (!admin) {
    redirect("/login?redirect=/admin");
  }

  return <AdminShell adminEmail={admin.email} adminRole={admin.role}>{children}</AdminShell>;
}
