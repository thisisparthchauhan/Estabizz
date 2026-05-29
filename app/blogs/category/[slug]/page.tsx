import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { getPublishedBlogs } from "@/lib/blogService";

export const dynamic = "force-dynamic";

function titleFromSlug(slug: string) {
    return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const title = titleFromSlug(slug);
    return {
        title: `${title} Blogs | Estabizz Regulatory Insights`,
        description: `${title} regulatory blogs, licensing guides and compliance explainers by Estabizz Fintech.`,
        alternates: { canonical: `/blogs/category/${slug}` },
    };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const title = titleFromSlug(slug);
    const blogs = await getPublishedBlogs({ categorySlug: slug, limit: 60 });

    return (
        <main className="min-h-screen bg-[#f7fbff] pt-24">
            <section className="border-b border-[#dbe7f3] bg-white px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-8 flex items-center gap-2 text-[13px] font-bold text-[#64748b]">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link>
                        <span>&gt;</span>
                        <Link href="/blogs" className="hover:text-[#0096D6]">Blogs</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">{title}</span>
                    </nav>
                    <span className="rounded-full bg-[#d9a938] px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] text-[#071426]">{title}</span>
                    <h1 className="mt-5 text-[clamp(36px,5vw,64px)] font-black tracking-tight text-[#071426]">{title} Regulatory Blogs</h1>
                    <p className="mt-4 max-w-3xl text-[17px] font-medium leading-relaxed text-[#475569]">
                        Finance and compliance-focused articles related to {title}, licensing, documentation, regulatory risk and post-registration obligations.
                    </p>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-6 py-14">
                {blogs.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.slug} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-10 text-center">
                        <h2 className="text-[24px] font-black text-[#071426]">No published blogs in this category yet</h2>
                        <Link href="/blogs" className="mt-5 inline-flex rounded-xl bg-[#071426] px-5 py-3 text-[13px] font-black text-white">
                            View all blogs
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}
