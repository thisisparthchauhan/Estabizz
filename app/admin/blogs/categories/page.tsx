import type { Metadata } from "next";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import { BLOG_CATEGORIES, slugify } from "@/lib/blogUtils";
import { requireAdminPage } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Blog Categories | Estabizz Admin",
    robots: { index: false, follow: false },
};

export default async function BlogCategoriesPage() {
    await requireAdminPage();
    return (
        <AdminBlogShell title="Blog Categories" subtitle="Default regulator-wise blog categories used across public filters, admin editor and SEO category pages.">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {["All", ...BLOG_CATEGORIES].map((category) => (
                    <div key={category} className="rounded-[24px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                        <div className="text-[22px] font-black text-[#071426]">{category}</div>
                        <div className="mt-2 text-[13px] font-semibold text-[#64748b]">Slug: {category === "All" ? "all" : slugify(category)}</div>
                        <p className="mt-4 text-[14px] font-medium leading-relaxed text-[#475569]">
                            Used for filtering, category routes, Article schema grouping and related blog recommendations.
                        </p>
                    </div>
                ))}
            </div>
        </AdminBlogShell>
    );
}
