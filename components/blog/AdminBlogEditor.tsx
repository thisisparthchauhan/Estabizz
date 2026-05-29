"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { BLOG_CATEGORIES, slugify, type BlogDTO } from "@/lib/blogUtils";

const emptyBlog: Partial<BlogDTO> = {
    title: "",
    slug: "",
    summary: "",
    content: "<h2>Introduction</h2><p></p>",
    category: "RBI",
    tags: [],
    authorName: "Estabizz Editorial Desk",
    status: "Draft",
    inlineImages: [],
    faqs: [],
    ctaTitle: "Need regulatory assistance?",
    ctaText: "Speak to Estabizz Team for structured licensing and compliance support.",
    disclaimer: "This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice.",
};

async function fileToDataUrl(file: File) {
    if (!/^image\/(png|jpe?g|webp|gif)$/i.test(file.type)) {
        throw new Error("Only JPG, PNG, WEBP or GIF images are allowed.");
    }
    if (file.size > 1_200_000) {
        throw new Error("Please upload compressed images below 1.2 MB each.");
    }
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function AdminBlogEditor({ blogId }: { blogId?: string }) {
    const router = useRouter();
    const [blog, setBlog] = useState<Partial<BlogDTO>>(emptyBlog);
    const [loading, setLoading] = useState(Boolean(blogId));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!blogId) return;
        async function loadBlog() {
            try {
                const response = await fetch(`/api/admin/blogs/${blogId}`);
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || "Unable to load blog");
                setBlog(result.blog);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to load blog");
            } finally {
                setLoading(false);
            }
        }
        loadBlog();
    }, [blogId]);

    function setField<K extends keyof BlogDTO>(key: K, value: BlogDTO[K]) {
        setBlog((current) => ({ ...current, [key]: value }));
    }

    function insertSnippet(snippet: string) {
        setField("content", `${blog.content || ""}\n${snippet}` as BlogDTO["content"]);
    }

    async function handleImageUpload(file: File, type: "featured" | "inline") {
        try {
            const url = await fileToDataUrl(file);
            if (type === "featured") {
                setField("featuredImage", { url, alt: blog.title || "Estabizz blog image", caption: "" });
                setField("ogImage", url as BlogDTO["ogImage"]);
            } else {
                setField("inlineImages", [...(blog.inlineImages || []), { url, alt: blog.title || "Estabizz inline image", caption: "" }]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to upload image.");
        }
    }

    function addFaq() {
        setField("faqs", [...(blog.faqs || []), { question: "", answer: "" }]);
    }

    async function save(nextStatus?: BlogDTO["status"]) {
        setSaving(true);
        setError(null);
        try {
            const payload = { ...blog, status: nextStatus || blog.status || "Draft" };
            const response = await fetch(blogId ? `/api/admin/blogs/${blogId}` : "/api/admin/blogs", {
                method: blogId ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to save blog");
            router.push("/admin/blogs");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to save blog");
        } finally {
            setSaving(false);
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        save();
    }

    if (loading) {
        return <div className="rounded-[26px] border border-[#dbe7f3] bg-white p-10 text-center font-bold text-[#64748b]">Loading blog editor...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-[14px] font-bold text-red-700">{error}</div>}

            <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                    <label>
                        <span className="text-[13px] font-black text-[#071426]">Blog title</span>
                        <input
                            value={blog.title || ""}
                            onChange={(event) => {
                                setField("title", event.target.value);
                                if (!blogId) setField("slug", slugify(event.target.value));
                            }}
                            required
                            className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6]"
                        />
                    </label>
                    <label>
                        <span className="text-[13px] font-black text-[#071426]">Status</span>
                        <select value={blog.status || "Draft"} onChange={(event) => setField("status", event.target.value as BlogDTO["status"])} className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold">
                            {["Draft", "Pending Review", "Approved", "Published", "Rejected", "Archived"].map((status) => <option key={status}>{status}</option>)}
                        </select>
                    </label>
                    <label>
                        <span className="text-[13px] font-black text-[#071426]">Slug</span>
                        <input value={blog.slug || ""} onChange={(event) => setField("slug", slugify(event.target.value))} required className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6]" />
                    </label>
                    <label>
                        <span className="text-[13px] font-black text-[#071426]">Category</span>
                        <select value={blog.category || "RBI"} onChange={(event) => setField("category", event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold">
                            {BLOG_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                        </select>
                    </label>
                </div>

                <label className="mt-5 block">
                    <span className="text-[13px] font-black text-[#071426]">Short summary</span>
                    <textarea value={blog.summary || ""} onChange={(event) => setField("summary", event.target.value)} required rows={3} className="mt-2 w-full rounded-2xl border border-[#dbe7f3] px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#0096D6]" />
                </label>
            </div>

            <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap gap-2">
                    {[
                        ["H2", "<h2>Section heading</h2>"],
                        ["H3", "<h3>Sub heading</h3>"],
                        ["Bullet", "<ul><li>Point one</li><li>Point two</li></ul>"],
                        ["Table", "<table><thead><tr><th>Particular</th><th>Details</th></tr></thead><tbody><tr><td></td><td></td></tr></tbody></table>"],
                        ["Callout", "<blockquote>Important compliance note.</blockquote>"],
                    ].map(([label, snippet]) => (
                        <button key={label} type="button" onClick={() => insertSnippet(snippet)} className="rounded-xl border border-[#dbe7f3] px-3 py-2 text-[12px] font-black text-[#0077B6]">
                            {label}
                        </button>
                    ))}
                </div>
                <label className="block">
                    <span className="text-[13px] font-black text-[#071426]">Main rich text content editor</span>
                    <textarea value={blog.content || ""} onChange={(event) => setField("content", event.target.value)} rows={18} className="mt-2 w-full rounded-2xl border border-[#dbe7f3] px-4 py-3 font-mono text-[13px] leading-relaxed outline-none focus:border-[#0096D6]" />
                </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                    <h2 className="text-[20px] font-black text-[#071426]">Images</h2>
                    <label className="mt-4 block">
                        <span className="text-[13px] font-black text-[#071426]">Featured image upload</span>
                        <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && handleImageUpload(event.target.files[0], "featured")} className="mt-2 block w-full rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] px-4 py-3 text-[13px] font-semibold" />
                    </label>
                    {blog.featuredImage?.url && <img src={blog.featuredImage.url} alt={blog.featuredImage.alt} className="mt-4 h-40 w-full rounded-2xl object-cover" />}
                    <label className="mt-4 block">
                        <span className="text-[13px] font-black text-[#071426]">Featured image alt text</span>
                        <input value={blog.featuredImage?.alt || ""} onChange={(event) => setField("featuredImage", { url: blog.featuredImage?.url || "", alt: event.target.value, caption: blog.featuredImage?.caption })} className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold" />
                    </label>
                    <label className="mt-4 block">
                        <span className="text-[13px] font-black text-[#071426]">Multiple inline image upload</span>
                        <input type="file" accept="image/*" multiple onChange={(event) => Array.from(event.target.files || []).slice(0, 5).forEach((file) => handleImageUpload(file, "inline"))} className="mt-2 block w-full rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] px-4 py-3 text-[13px] font-semibold" />
                    </label>
                </div>

                <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                    <h2 className="text-[20px] font-black text-[#071426]">SEO fields</h2>
                    {[
                        ["focusKeyword", "Focus keyword"],
                        ["seoTitle", "SEO title"],
                        ["metaDescription", "SEO meta description"],
                        ["canonicalUrl", "Canonical URL"],
                        ["authorName", "Author selection / name"],
                        ["tags", "Tags"],
                    ].map(([key, label]) => (
                        <label key={key} className="mt-4 block">
                            <span className="text-[13px] font-black text-[#071426]">{label}</span>
                            <input
                                value={key === "tags" ? (blog.tags || []).join(", ") : String(blog[key as keyof BlogDTO] || "")}
                                onChange={(event) => key === "tags" ? setField("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean)) : setField(key as keyof BlogDTO, event.target.value as never)}
                                className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold"
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-[20px] font-black text-[#071426]">FAQs</h2>
                    <button type="button" onClick={addFaq} className="rounded-xl bg-[#071426] px-4 py-2 text-[12px] font-black text-white">Add FAQ</button>
                </div>
                <div className="mt-4 space-y-4">
                    {(blog.faqs || []).map((faq, index) => (
                        <div key={index} className="grid gap-3 rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] p-4 md:grid-cols-2">
                            <input placeholder="Question" value={faq.question} onChange={(event) => {
                                const faqs = [...(blog.faqs || [])];
                                faqs[index] = { ...faqs[index], question: event.target.value };
                                setField("faqs", faqs);
                            }} className="h-11 rounded-xl border border-[#dbe7f3] px-3 text-[13px] font-semibold" />
                            <input placeholder="Answer" value={faq.answer} onChange={(event) => {
                                const faqs = [...(blog.faqs || [])];
                                faqs[index] = { ...faqs[index], answer: event.target.value };
                                setField("faqs", faqs);
                            }} className="h-11 rounded-xl border border-[#dbe7f3] px-3 text-[13px] font-semibold" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[28px] border border-[#dbe7f3] bg-white p-6 shadow-sm">
                <label className="block">
                    <span className="text-[13px] font-black text-[#071426]">CTA box content</span>
                    <input value={blog.ctaTitle || ""} onChange={(event) => setField("ctaTitle", event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold" />
                    <textarea value={blog.ctaText || ""} onChange={(event) => setField("ctaText", event.target.value)} rows={3} className="mt-3 w-full rounded-2xl border border-[#dbe7f3] px-4 py-3 text-[14px] font-semibold" />
                </label>
                <label className="mt-4 block">
                    <span className="text-[13px] font-black text-[#071426]">Disclaimer field</span>
                    <textarea value={blog.disclaimer || ""} onChange={(event) => setField("disclaimer", event.target.value)} rows={3} className="mt-2 w-full rounded-2xl border border-[#dbe7f3] px-4 py-3 text-[14px] font-semibold" />
                </label>
            </div>

            <div className="sticky bottom-4 z-20 flex flex-wrap justify-end gap-3 rounded-[22px] border border-[#dbe7f3] bg-white/95 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">
                <button type="button" onClick={() => save("Draft")} disabled={saving} className="rounded-xl border border-[#dbe7f3] px-5 py-3 text-[13px] font-black text-[#071426]">Save as Draft</button>
                {blogId && <a href={`/admin/blogs/preview/${blogId}`} target="_blank" className="rounded-xl border border-[#dbe7f3] px-5 py-3 text-[13px] font-black text-[#0077B6]">Preview</a>}
                <button type="button" onClick={() => save("Published")} disabled={saving} className="rounded-xl bg-[#0096D6] px-5 py-3 text-[13px] font-black text-white">Publish</button>
                <button type="submit" disabled={saving} className="rounded-xl bg-[#071426] px-5 py-3 text-[13px] font-black text-white">{saving ? "Saving..." : "Save Changes"}</button>
            </div>
        </form>
    );
}
