import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getAdminUserByEmail } from "@/lib/admin/repository";
import { connectDB } from "@/lib/db";
import ContentBlock from "@/lib/models/ContentBlock";
import { SEO_PAGE_CATALOG } from "@/lib/content/seoPageCatalog";
import type { SeoContent } from "@/lib/content/seoDefaults";
import type { AdminContext } from "@/lib/admin/requirePermission";
import PageSeoClient, { type SeoPageItem } from "./PageSeoClient";

export const metadata: Metadata = {
  title: "Page SEO — Estabizz Admin",
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

export default async function PageSeoPage() {
  const viewer = await getViewer();
  const canView = viewer?.permissions.includes("view_admin") ?? false;

  let pages: SeoPageItem[] = [];

  if (canView) {
    await connectDB();

    // One query for all SEO keys — status, timestamps, updatedBy, and live fields
    const seoKeys = SEO_PAGE_CATALOG.map(p => p.key);
    const blocks = await ContentBlock.find({ key: { $in: seoKeys } })
      .select("key fields status updatedBy updatedAt")
      .lean<{ key: string; fields: Record<string, unknown>; status: string; updatedBy: string; updatedAt: Date }[]>();

    const blockMap = Object.fromEntries(blocks.map(b => [b.key, b]));

    pages = SEO_PAGE_CATALOG.map(entry => {
      const block = blockMap[entry.key];
      return {
        key:     entry.key,
        label:   entry.label,
        path:    entry.path,
        group:   entry.group,
        defaults: entry.defaults,
        current: block?.fields
          ? { ...entry.defaults, ...(block.fields as Partial<SeoContent>) } as SeoContent
          : { ...entry.defaults },
        status: (block?.status ?? "default") as SeoPageItem["status"],
        lastUpdatedBy: block?.updatedBy || undefined,
        lastUpdatedAt: block?.updatedAt ? block.updatedAt.toISOString() : undefined,
      };
    });
  }

  return <PageSeoClient viewer={viewer} pages={pages} />;
}
