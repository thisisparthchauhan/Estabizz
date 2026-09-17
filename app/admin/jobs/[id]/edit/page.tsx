import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobForAdmin } from "@/lib/jobs/jobManagement/repository";
import JobEditorClient from "../../_components/JobEditorClient";

export const metadata: Metadata = {
  title: "Edit Job — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditJobPage({ params }: Props) {
  const { id } = await params;
  const job = await getJobForAdmin(id);
  if (!job) notFound();
  return <JobEditorClient job={job} />;
}
