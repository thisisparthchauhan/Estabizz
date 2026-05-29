import type { Metadata } from "next";
import AdminBlogEditor from "@/components/blog/AdminBlogEditor";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import { requireAdminPage } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Edit Blog | Estabizz Admin",
    robots: { index: false, follow: false },
};

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    await requireAdminPage();
    const { id } = await params;
    return (
        <AdminBlogShell title="Edit Blog" subtitle="Modify blog content, SEO fields, status, images, FAQs, CTA and disclaimer before publishing.">
            <AdminBlogEditor blogId={id} />
        </AdminBlogShell>
    );
}
