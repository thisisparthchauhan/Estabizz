import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getAdminUserByEmail } from "@/lib/admin/repository";
import { listRecycleBinItems } from "@/lib/content/recycleBin";
import type { AdminContext } from "@/lib/admin/requirePermission";
import RecycleBinClient from "./RecycleBinClient";

export const metadata: Metadata = {
  title: "Recycle Bin — Estabizz Admin",
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

export default async function RecycleBinPage() {
  const viewer = await getViewer();

  const canView = viewer?.permissions.includes("view_admin") ?? false;

  const initialResult = canView
    ? await listRecycleBinItems({ type: "all", page: 1, limit: 25 })
    : { items: [], page: 1, limit: 25, total: 0, totalPages: 1 };

  return (
    <RecycleBinClient
      viewer={viewer}
      initialResult={initialResult}
    />
  );
}
