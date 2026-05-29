import type { Metadata } from "next";
import Link from "next/link";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogCard from "@/components/blog/BlogCard";
import { getPublishedBlogs } from "@/lib/blogService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Estabizz Regulatory Insights | RBI, SEBI, IRDAI, IFSCA & Fintech Blogs",
    description: "Practical regulatory updates, licensing guides and compliance explainers for founders, CFOs, fintechs and regulated businesses by Estabizz Fintech.",
    alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
    const blogs = await getPublishedBlogs({ limit: 60 });
    const latest = blogs.slice(0, 3);

    return (
        <main className="min-h-screen bg-[#f7fbff] pt-24">
            <section className="relative overflow-hidden border-b border-[#dbe7f3] bg-white px-6 py-16">
                <div className="absolute right-[-10%] top-[-40%] h-[420px] w-[420px] rounded-full bg-[#0096D6]/10 blur-[90px]" />
                <div className="relative mx-auto max-w-7xl">
                    <nav className="mb-8 flex items-center gap-2 text-[13px] font-bold text-[#64748b]">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Blogs</span>
                    </nav>
                    <span className="rounded-full border border-[#dbe7f3] bg-[#f8fbff] px-4 py-2 text-[12px] font-black uppercase tracking-[0.18em] text-[#0096D6]">
                        Regulatory Knowledge Platform
                    </span>
                    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
                        <div>
                            <h1 className="text-[clamp(40px,6vw,76px)] font-black leading-[0.98] tracking-tight text-[#071426]">
                                Estabizz Regulatory Insights
                            </h1>
                            <p className="mt-6 max-w-4xl text-[18px] font-medium leading-relaxed text-[#475569]">
                                Practical updates, licensing guides and compliance explainers for founders, CFOs, fintechs and regulated businesses.
                            </p>
                        </div>
                        <div className="rounded-[26px] border border-[#dbe7f3] bg-[#071426] p-6 text-white shadow-[0_28px_80px_rgba(7,20,38,0.18)]">
                            <h2 className="text-[20px] font-black">Latest posts</h2>
                            <div className="mt-4 space-y-4">
                                {latest.map((blog) => (
                                    <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="block border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                                        <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#d9a938]">{blog.category}</span>
                                        <span className="mt-1 block text-[14px] font-bold leading-snug text-white/90">{blog.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {blogs.length > 0 ? (
                <BlogFilters blogs={blogs} />
            ) : (
                <section className="mx-auto max-w-7xl px-6 py-16">
                    <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-10 text-center shadow-sm">
                        <h2 className="text-[26px] font-black text-[#071426]">Insights are being curated</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-[15px] font-medium leading-relaxed text-[#64748b]">
                            Admin-created and approved user-submitted blogs will appear here once published.
                        </p>
                    </div>
                </section>
            )}

            {blogs.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-16">
                    <h2 className="mb-6 text-[30px] font-black text-[#071426]">Featured compliance reads</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {blogs.slice(0, 3).map((blog) => (
                            <BlogCard key={blog.slug} blog={blog} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
