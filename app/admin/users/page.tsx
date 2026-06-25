import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getAdminUserByEmail, getAllAdminUsers } from "@/lib/admin/repository";
import { ADMIN_EMAIL_ALLOWLIST } from "@/lib/admin/seedData";
import type { AdminContext } from "@/lib/admin/requirePermission";
import UsersClient from "./UsersClient";

export const metadata: Metadata = {
  title: "Users & Roles — Estabizz Admin",
  robots: { index: false, follow: false },
};

async function getViewer(): Promise<AdminContext | null> {
  const token = (await cookies()).get("auth_token")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;
  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    const email = decoded.email?.toLowerCase().trim();
    if (!email) return null;
    const admin = await getAdminUserByEmail(email);
    if (!admin || admin.status !== "active") return null;
    return { email: admin.email, role: admin.role, permissions: admin.permissions };
  } catch {
    return null;
  }
}

export default async function UsersPage() {
  const viewer = await getViewer();

  const canManage = viewer?.permissions.includes("manage_users") ?? false;

  // Only load users list if viewer has permission (avoids unnecessary DB call).
  const initialUsers = canManage ? await getAllAdminUsers() : [];

  // Pass the allowlist so the client can flag users who have login access.
  const allowlistEmails = Array.from(ADMIN_EMAIL_ALLOWLIST);

  return (
    <UsersClient
      viewer={viewer}
      initialUsers={initialUsers}
      allowlistEmails={allowlistEmails}
    />
  );
}
