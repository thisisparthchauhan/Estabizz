import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ChangeHistoryClient from "./ChangeHistoryClient";
import { getAdminUserByEmail } from "@/lib/admin/repository";
import { listChangeHistory } from "@/lib/content/changeHistory";
import type { AdminContext } from "@/lib/admin/requirePermission";

export const metadata: Metadata = {
  title: "Change History - Estabizz Admin",
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

export default async function ChangeHistoryPage() {
  const viewer = await getViewer();
  const initialHistory = viewer
    ? await listChangeHistory(viewer, { page: 1, limit: 25, status: "all", type: "all" })
    : { items: [], page: 1, limit: 25, total: 0, totalPages: 1 };

  return <ChangeHistoryClient initialHistory={initialHistory} viewerEmail={viewer?.email ?? ""} />;
}
