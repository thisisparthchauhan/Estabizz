import Link from "next/link";
import type { BlogDTO } from "@/lib/blogUtils";
import BlogCard from "@/components/blog/BlogCard";
import { sanitizeBlogHtml } from "@/lib/blogSecurity";

function formatDate(date?: string) {
    if (!date) return "Recently updated";
    return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

function getToc(content: string) {
    const headings = Array.from(content.matchAll(/<h([2-4])[^>]*>(.*?)<\/h\1>/gi));
    return headings.map((match, index) => ({
        level: Number(match[1]),
        label: match[2].replace(/<[^>]+>/g, "").trim(),
        id: `section-${index + 1}`,
    }));
}

function withHeadingIds(content: string) {
    let index = 0;
    return sanitizeBlogHtml(content).replace(/<h([2-4])[^>]*>(.*?)<\/h\1>/gi, (_match, level, text) => {
        index += 1;
        return `<h${level} id="section-${index}">${text}</h${level}>`;
    });
}

export default function BlogArticle({ blog, relatedBlogs }: { blog: BlogDTO; relatedBlogs: BlogDTO[] }) {
    const sanitizedContent = sanitizeBlogHtml(blog.content);
    const toc = getToc(sanitizedContent);
    const safeContent = withHeadingIds(sanitizedContent);

    const faqSchema = blog.faqs.length
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: blog.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
        }
        : null;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.seoTitle || blog.title,
        description: blog.metaDescription || blog.summary,
        image: blog.ogImage || blog.featuredImage?.url,
        author: { "@type": "Person", name: blog.authorName },
        publisher: { "@type": "Organization", name: "Estabizz Fintech Private Limited" },
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt || blog.publishedAt,
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Blogs", item: "https://estabizz-site.vercel.app/blogs" },
            { "@type": "ListItem", position: 3, name: blog.title, item: `https://estabizz-site.vercel.app/blogs/${blog.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-[#f7fbff] pt-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            <section className="border-b border-[#dbe7f3] bg-white px-6 py-14">
                <div className="mx-auto max-w-5xl">
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-[13px] font-bold text-[#64748b]">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link>
                        <span>&gt;</span>
                        <Link href="/blogs" className="hover:text-[#0096D6]">Blogs</Link>
                        <span>&gt;</span>
                        <Link href={`/blogs/category/${blog.categorySlug}`} className="text-[#0096D6]">{blog.category}</Link>
                    </nav>
                    <span className="rounded-full bg-[#d9a938] px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] text-[#071426]">
                        {blog.category}
                    </span>
                    <h1 className="mt-5 text-[clamp(34px,5vw,62px)] font-black leading-[1.02] tracking-tight text-[#071426]">
                        {blog.title}
                    </h1>
                    <p className="mt-6 max-w-4xl text-[18px] font-medium leading-relaxed text-[#475569]">{blog.summary}</p>
                    <div className="mt-7 flex flex-wrap gap-3 text-[13px] font-bold text-[#64748b]">
                        <span>{blog.authorName}</span>
                        <span>•</span>
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        <span>•</span>
                        <span>{blog.readingTime} min read</span>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[280px_1fr]">
                <aside className="lg:sticky lg:top-24 lg:h-fit">
                    <div className="rounded-[24px] border border-[#dbe7f3] bg-white p-5 shadow-sm">
                        <h2 className="text-[12px] font-black uppercase tracking-[0.18em] text-[#94a3b8]">Table of Contents</h2>
                        {toc.length ? (
                            <div className="mt-4 space-y-2">
                                {toc.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className={`block rounded-xl px-3 py-2 text-[13px] font-bold leading-snug text-[#475569] hover:bg-[#f0f9ff] hover:text-[#0096D6] ${item.level > 2 ? "ml-3" : ""}`}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-4 text-[13px] font-medium text-[#64748b]">This article is a short regulatory note.</p>
                        )}
                    </div>
                </aside>

                <article className="overflow-hidden rounded-[30px] border border-[#dbe7f3] bg-white shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
                    {blog.featuredImage?.url && (
                        <figure>
                            <img src={blog.featuredImage.url} alt={blog.featuredImage.alt} className="h-[260px] w-full object-cover md:h-[420px]" />
                            {blog.featuredImage.caption && <figcaption className="px-8 py-3 text-[12px] font-medium text-[#64748b]">{blog.featuredImage.caption}</figcaption>}
                        </figure>
                    )}

                    <div className="blog-prose px-6 py-8 md:px-10" dangerouslySetInnerHTML={{ __html: safeContent }} />

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

                    {blog.faqs.length > 0 && (
                        <section className="border-t border-[#eef4fb] px-6 py-8 md:px-10">
                            <h2 className="text-[28px] font-black text-[#071426]">FAQs</h2>
                            <div className="mt-5 space-y-3">
                                {blog.faqs.map((faq) => (
                                    <details key={faq.question} className="rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] p-5">
                                        <summary className="cursor-pointer text-[15px] font-black text-[#071426]">{faq.question}</summary>
                                        <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#475569]">{faq.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="grid gap-5 border-t border-[#eef4fb] px-6 py-8 md:grid-cols-2 md:px-10">
                        <div className="rounded-2xl bg-[#071426] p-6 text-white">
                            <h2 className="text-[22px] font-black">{blog.ctaTitle || "Need regulatory assistance?"}</h2>
                            <p className="mt-3 text-[14px] font-medium leading-relaxed text-white/72">{blog.ctaText || "Speak to Estabizz Team for structured compliance support."}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link href="/contact" className="rounded-xl bg-[#d9a938] px-4 py-3 text-[13px] font-black text-[#071426]">Speak to Estabizz</Link>
                                <a href="https://wa.me/919825600907" className="rounded-xl border border-white/20 px-4 py-3 text-[13px] font-black text-white">WhatsApp</a>
                            </div>
                            <p className="mt-4 text-[13px] font-bold text-white/70">Call: +91 98256 00907</p>
                        </div>
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                            <h2 className="text-[18px] font-black text-[#7a5200]">Disclaimer</h2>
                            <p className="mt-3 text-[13px] font-semibold leading-relaxed text-[#7a5200]/80">{blog.disclaimer}</p>
                        </div>
                    </section>
                </article>
            </section>

            {relatedBlogs.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-16">
                    <h2 className="text-[30px] font-black text-[#071426]">Related blogs</h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                        {relatedBlogs.map((item) => (
                            <BlogCard key={item.slug} blog={item} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
