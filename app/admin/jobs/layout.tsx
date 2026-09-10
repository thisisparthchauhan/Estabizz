import "server-only";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { seedAdminUsers } from "@/lib/admin/seedData";

export const dynamic = "force-dynamic";

async function hasManageJobsPermission(): Promise<boolean> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return false;
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  let email = "";
  try {
    const decoded = jwt.verify(token, secret) as { email?: string };
    email = (decoded.email ?? "").toLowerCase().trim();
  } catch {
    return false;
  }
  if (!email) return false;

  // Fast path: seed users carry explicit permission arrays
  const seedUser = seedAdminUsers.find((u) => u.email === email && u.status === "active");
  if (seedUser) return seedUser.permissions.includes("manage_jobs");

  // DB fallback: check the live admin record
  try {
    const { getAdminUserByEmail } = await import("@/lib/admin/repository");
    const admin = await getAdminUserByEmail(email);
    if (admin?.status === "active") return admin.permissions.includes("manage_jobs");
  } catch {
    // DB unavailable — deny
  }

  return false;
}

export default async function AdminJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const permitted = await hasManageJobsPermission();
  if (!permitted) redirect("/admin");
  return <>{children}</>;
}
