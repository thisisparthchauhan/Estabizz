import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminBlogShell from "@/components/blog/AdminBlogShell";
import { requireAdminPage } from "@/lib/adminAuth";
import { getAdminBlogById } from "@/lib/blogService";
import { sanitizeBlogHtml } from "@/lib/blogSecurity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Preview Blog | Estabizz Admin",
    robots: { index: false, follow: false },
};

function formatDate(date?: string) {
    if (!date) return "Not published";
    return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

export default async function BlogPreviewPage({ params }: { params: Promise<{ id: string }> }) {
    await requireAdminPage();
    const { id } = await params;
    const blog = await getAdminBlogById(id);

    if (!blog) notFound();

    return (
        <AdminBlogShell title="Blog Preview" subtitle="Protected preview for draft, pending, approved and published blog content.">
            <article className="overflow-hidden rounded-[30px] border border-[#dbe7f3] bg-white shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
                <div className="border-b border-[#eef4fb] p-6 md:p-10">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#d9a938] px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] text-[#071426]">{blog.category}</span>
                        <span className="rounded-full border border-[#dbe7f3] bg-[#f8fbff] px-4 py-2 text-[12px] font-black text-[#334155]">{blog.status}</span>
                    </div>
                    <h1 className="mt-5 text-[clamp(34px,5vw,62px)] font-black leading-tight tracking-tight text-[#071426]">{blog.title}</h1>
                    <p className="mt-4 max-w-4xl text-[17px] font-medium leading-relaxed text-[#475569]">{blog.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-[13px] font-bold text-[#64748b]">
                        <span>{blog.authorName}</span>
                        <span>•</span>
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        <span>•</span>
                        <span>{blog.readingTime} min read</span>
                    </div>
                </div>

                {blog.featuredImage?.url && (
                    <figure>
                        <img src={blog.featuredImage.url} alt={blog.featuredImage.alt} className="h-[260px] w-full object-cover md:h-[420px]" />
                        {blog.featuredImage.caption && <figcaption className="px-8 py-3 text-[12px] font-medium text-[#64748b]">{blog.featuredImage.caption}</figcaption>}
                    </figure>
                )}

                <div className="blog-prose px-6 py-8 md:px-10" dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(blog.content) }} />

                {blog.inlineImages.length > 0 && (
                    <div className="grid gap-5 px-6 pb-8 md:grid-cols-2 md:px-10">
                        {blog.inlineImages.map((image) => (
                            <figure key={image.url} className="overflow-hidden rounded-2xl border border-[#dbe7f3] bg-[#f8fbff]">
                                <img src={image.url} alt={image.alt} className="h-56 w-full object-cover" />
                                {image.caption && <figcaption className="p-4 text-[12px] font-semibold text-[#64748b]">{image.caption}</figcaption>}
                            </figure>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap gap-3 border-t border-[#eef4fb] p-6 md:p-10">
                    <Link href={`/admin/blogs/edit/${blog._id}`} className="rounded-xl bg-[#071426] px-5 py-3 text-[13px] font-black text-white">Edit Blog</Link>
                    {blog.status === "Published" && <Link href={`/blogs/${blog.slug}`} className="rounded-xl border border-[#dbe7f3] px-5 py-3 text-[13px] font-black text-[#0077B6]">View Public Page</Link>}
                </div>
            </article>
        </AdminBlogShell>
    );
}
