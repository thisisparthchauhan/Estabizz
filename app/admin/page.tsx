import { getAllBlogsForAdmin } from "@/lib/blog/repository";
import AdminDashboardClient from "./AdminDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Dashboard — Estabizz Admin",
};

export default async function AdminDashboardPage() {
  // getAllBlogsForAdmin returns ALL blogs regardless of status — no filter
  const all = await getAllBlogsForAdmin();

  const stats = {
    total:     all.length,
    published: all.filter((b) => b.status === "published").length,
    draft:     all.filter((b) => b.status === "draft").length,
    pending:   all.filter((b) => b.status === "pending_review").length,
    rejected:  all.filter((b) => b.status === "rejected").length,
    archived:  all.filter((b) => b.status === "archived").length,
  };

  // Five most recent blogs for the "Recent Blogs" table
  const recentBlogs = all.slice(0, 5);

  return <AdminDashboardClient stats={stats} recentBlogs={recentBlogs} />;
}
