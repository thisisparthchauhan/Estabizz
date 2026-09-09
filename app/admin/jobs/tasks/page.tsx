import "server-only";
import type { Metadata } from "next";
import { listAllTasks } from "@/lib/jobs/recruitmentOps/tasksRepository";
import AdminTasksClient from "./AdminTasksClient";

export const metadata: Metadata = {
  title: "Tasks — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminTasksPage() {
  const tasks = await listAllTasks();
  return <AdminTasksClient tasks={tasks} />;
}
