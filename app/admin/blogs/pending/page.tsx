import type { Metadata } from "next";
import AdminBlogDashboard from "@/components/blog/AdminBlogDashboard";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import { requireAdminPage } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Pending Blogs | Estabizz Admin",
    robots: { index: false, follow: false },
};

export default async function PendingBlogsPage() {
    await requireAdminPage();
    return (
        <AdminBlogShell title="Pending User-Submitted Blogs" subtitle="Review user submissions before editing, approving, rejecting or publishing them.">
            <AdminBlogDashboard defaultStatus="Pending Review" />
        </AdminBlogShell>
    );
}
