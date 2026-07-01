import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getAdminUserByEmail } from "@/lib/admin/repository";
import { listBackups, isGitHubConfigured } from "@/lib/content/backup";
import type { AdminContext } from "@/lib/admin/requirePermission";
import BackupsClient from "./BackupsClient";

export const metadata: Metadata = {
  title: "Backups — Estabizz Admin",
  robots: { index: false, follow: false },
};

async function getViewer(): Promise<AdminContext | null> {
  const token  = (await cookies()).get("auth_token")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;
  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    const email   = decoded.email?.toLowerCase().trim();
    if (!email) return null;
    const admin = await getAdminUserByEmail(email);
    if (!admin || admin.status !== "active") return null;
    return { email: admin.email, role: admin.role, permissions: admin.permissions };
  } catch {
    return null;
  }
}

export default async function BackupsPage() {
  const viewer = await getViewer();
  const canView = viewer?.permissions.includes("view_admin") ?? false;

  const initialResult = canView
    ? await listBackups(1, 25)
    : { records: [], total: 0 };

  // isGitHubConfigured() checks env vars — safe to call server-side.
  // We only pass the boolean to the client; the token is never exposed.
  const githubReady = isGitHubConfigured();

  return (
    <BackupsClient
      viewer={viewer}
      initialResult={initialResult}
      githubReady={githubReady}
    />
  );
}
