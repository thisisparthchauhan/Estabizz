import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getAdminUserByEmail, getAllAdminUsers, getLoginReadyEmails } from "@/lib/admin/repository";
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

  const rawUsers = canManage ? await getAllAdminUsers() : [];

  const loginReadySet = canManage
    ? await getLoginReadyEmails(rawUsers.map(u => u.email))
    : new Set<string>();

  const initialUsers = rawUsers.map(u => ({
    ...u,
    loginReady: loginReadySet.has(u.email.toLowerCase()) ||
                ADMIN_EMAIL_ALLOWLIST.has(u.email.toLowerCase()),
  }));

  return (
    <UsersClient
      viewer={viewer}
      initialUsers={initialUsers}
    />
  );
}
