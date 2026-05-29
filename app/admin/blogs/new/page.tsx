import type { Metadata } from "next";
import AdminBlogEditor from "@/components/blog/AdminBlogEditor";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import { requireAdminPage } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "New Blog | Estabizz Admin",
    robots: { index: false, follow: false },
};

export default async function NewBlogPage() {
    await requireAdminPage();
    return (
        <AdminBlogShell title="Create New Blog" subtitle="Draft a finance-style regulatory insight with SEO fields, FAQs, image uploads, CTA and disclaimer.">
            <AdminBlogEditor />
        </AdminBlogShell>
    );
}
