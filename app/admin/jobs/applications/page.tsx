import "server-only";

import type { Metadata } from "next";
import { listApplicationsForAdmin } from "@/lib/jobs/applicationManagement/repository";
import AdminApplicationsClient from "./AdminApplicationsClient";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const metadata: Metadata = {
  title: "Applications — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await listApplicationsForAdmin();
  return (
    <AdminPageContainer>
      <AdminApplicationsClient applications={applications} />
    </AdminPageContainer>
  );
}
