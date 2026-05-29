import Link from "next/link";
import type { BlogDTO } from "@/lib/blogUtils";

function formatDate(date?: string) {
    if (!date) return "Recently updated";
    return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));
}

export default function BlogCard({ blog }: { blog: BlogDTO }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#dbe7f3] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)]">
            <Link href={`/blogs/${blog.slug}`} className="relative block h-56 overflow-hidden bg-[#071426]">
                {blog.featuredImage?.url ? (
                    <img
                        src={blog.featuredImage.url}
                        alt={blog.featuredImage.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_left,#0096D6,#071426_58%)] text-white">
                        <span className="text-4xl font-black">E</span>
                    </div>
                )}
                <div className="absolute left-4 top-4 rounded-full bg-[#d9a938] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[#071426]">
                    {blog.category}
                </div>
            </Link>
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px] font-bold text-[#64748b]">
                    <span>{blog.authorName}</span>
                    <span className="text-[#cbd5e1]">•</span>
                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    <span className="text-[#cbd5e1]">•</span>
                    <span>{blog.readingTime} min read</span>
                </div>
                <h2 className="text-[21px] font-black leading-tight tracking-tight text-[#071426] transition-colors group-hover:text-[#0077B6]">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h2>
                <p className="mt-4 line-clamp-3 text-[14px] font-medium leading-relaxed text-[#475569]">{blog.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-[#dbe7f3] bg-[#f8fbff] px-3 py-1 text-[11px] font-bold text-[#0077B6]">
                            {tag}
                        </span>
                    ))}
                </div>
                <Link href={`/blogs/${blog.slug}`} className="mt-6 inline-flex w-fit items-center gap-2 text-[14px] font-black text-[#0096D6]">
                    Read More <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}
