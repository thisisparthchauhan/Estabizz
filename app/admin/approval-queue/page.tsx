import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ApprovalQueueClient from "./ApprovalQueueClient";
import { listApprovalQueueItems } from "@/lib/content/approvalQueue";
import { getAdminUserByEmail } from "@/lib/admin/repository";
import type { AdminPermission, AdminRole } from "@/lib/admin/types";

export const metadata: Metadata = {
  title: "Approval Queue — Estabizz Admin",
  robots: { index: false, follow: false },
};

interface Viewer {
  email: string;
  role: AdminRole;
  permissions: AdminPermission[];
}

async function getViewer(): Promise<Viewer | null> {
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

export default async function ApprovalQueuePage() {
  const [items, viewer] = await Promise.all([
    listApprovalQueueItems(),
    getViewer(),
  ]);

  return <ApprovalQueueClient initialItems={items} viewer={viewer} />;
}
