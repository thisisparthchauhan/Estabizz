"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { BLOG_CATEGORIES, slugify, type BlogDTO } from "@/lib/blogUtils";

export default function BlogFilters({ blogs }: { blogs: BlogDTO[] }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");

    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const categoryMatch = activeCategory === "All" || blog.category === activeCategory;
            const searchMatch =
                !query.trim() ||
                `${blog.title} ${blog.summary} ${blog.tags.join(" ")} ${blog.category}`.toLowerCase().includes(query.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [activeCategory, blogs, query]);

    return (
        <section id="latest-updates" className="mx-auto max-w-7xl px-6 py-14">
            <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_360px] lg:items-end">
                <div>
                    <h2 className="text-[30px] font-black tracking-tight text-[#071426]">Latest regulatory insights</h2>
                    <p className="mt-2 max-w-2xl text-[15px] font-medium leading-relaxed text-[#64748b]">
                        Search across licensing guides, compliance explainers and circular interpretation notes.
                    </p>
                </div>
                <label className="block">
                    <span className="sr-only">Search blogs</span>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search RBI, SEBI, NBFC..."
                        className="h-[52px] w-full rounded-2xl border border-[#dbe7f3] bg-white px-5 text-[14px] font-semibold text-[#071426] outline-none transition focus:border-[#0096D6] focus:ring-4 focus:ring-[#0096D6]/10"
                    />
                </label>
            </div>

            <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                {["All", ...BLOG_CATEGORIES].map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-black transition ${activeCategory === category
                            ? "border-[#071426] bg-[#071426] text-white"
                            : "border-[#dbe7f3] bg-white text-[#334155] hover:border-[#0096D6] hover:text-[#0096D6]"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredBlogs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="rounded-[26px] border border-dashed border-[#bfd7ef] bg-white p-10 text-center">
                    <h3 className="text-[22px] font-black text-[#071426]">No blog matched this search</h3>
                    <p className="mt-2 text-[14px] font-medium text-[#64748b]">Try a regulator, licence name or compliance keyword.</p>
                </div>
            )}

            <div className="mt-12 rounded-[30px] bg-[#071426] p-8 text-white shadow-[0_30px_90px_rgba(7,20,38,0.22)] md:p-10">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 className="text-[28px] font-black tracking-tight">Need regulatory assistance? Speak to Estabizz Team.</h2>
                        <p className="mt-3 max-w-3xl text-[15px] font-medium leading-relaxed text-white/70">
                            Get practical support for licensing, documentation, compliance calendars, regulator queries and post-registration readiness.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link href="/contact" className="rounded-2xl bg-[#d9a938] px-6 py-4 text-center text-[14px] font-black text-[#071426]">
                            Speak to Estabizz Team
                        </Link>
                        <a href="https://wa.me/919825600907" className="rounded-2xl border border-white/20 px-6 py-4 text-center text-[14px] font-black text-white">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
                {BLOG_CATEGORIES.map((category) => (
                    <Link key={category} href={`/blogs/category/${slugify(category)}`} className="text-[13px] font-bold text-[#0077B6] underline-offset-4 hover:underline">
                        View {category} blogs
                    </Link>
                ))}
            </div>
        </section>
    );
}
