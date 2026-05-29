import type { Metadata } from "next";
import AdminBlogDashboard from "@/components/blog/AdminBlogDashboard";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import { requireAdminPage } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Admin Blogs | Estabizz Fintech",
    robots: { index: false, follow: false },
};

export default async function AdminBlogsPage() {
    await requireAdminPage();
    return (
        <AdminBlogShell title="Blog Management Dashboard" subtitle="Create, review, approve, publish, archive and manage Estabizz regulatory insights.">
            <AdminBlogDashboard />
        </AdminBlogShell>
    );
}
