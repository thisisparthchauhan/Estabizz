import type { Metadata } from "next";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import AdminMediaManager from "@/components/blog/AdminMediaManager";
import { requireAdminPage } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Media Library | Estabizz Admin",
    robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
    await requireAdminPage();
    return (
        <AdminBlogShell title="Blog Media Library" subtitle="Upload and manage blog images with alt text and captions for SEO and accessibility.">
            <AdminMediaManager />
        </AdminBlogShell>
    );
}
