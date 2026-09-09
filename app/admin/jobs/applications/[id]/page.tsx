import "server-only";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApplicationForAdmin } from "@/lib/jobs/applicationManagement/repository";
import AdminApplicationDetailClient from "./AdminApplicationDetailClient";

export const metadata: Metadata = {
  title: "Application Detail — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const application = await getApplicationForAdmin(id);
  if (!application) notFound();

  return <AdminApplicationDetailClient application={application} />;
}
