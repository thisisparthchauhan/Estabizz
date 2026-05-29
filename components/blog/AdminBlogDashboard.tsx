"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BLOG_CATEGORIES, type BlogDTO } from "@/lib/blogUtils";

const statuses = ["All", "Draft", "Pending Review", "Approved", "Published", "Rejected", "Archived"];

export default function AdminBlogDashboard({ defaultStatus = "All" }: { defaultStatus?: string }) {
    const [blogs, setBlogs] = useState<BlogDTO[]>([]);
    const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, pending: 0, rejected: 0, archived: 0 });
    const [status, setStatus] = useState(defaultStatus);
    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const queryString = useMemo(() => new URLSearchParams({ status, category, q: query }).toString(), [category, query, status]);

    async function loadBlogs() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/admin/blogs?${queryString}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to load blogs");
            setBlogs(result.blogs || []);
            setStats(result.stats || stats);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load blogs");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBlogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);

    async function updateStatus(blog: BlogDTO, nextStatus: BlogDTO["status"]) {
        const confirmed = ["Published", "Rejected", "Archived"].includes(nextStatus)
            ? window.confirm(`Are you sure you want to mark this blog as ${nextStatus}?`)
            : true;
        if (!confirmed || !blog._id) return;

        await fetch(`/api/admin/blogs/${blog._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...blog, status: nextStatus }),
        });
        await loadBlogs();
    }

    async function deleteBlog(blog: BlogDTO) {
        if (!blog._id || !window.confirm("Delete this blog permanently? This action cannot be undone.")) return;
        await fetch(`/api/admin/blogs/${blog._id}`, { method: "DELETE" });
        await loadBlogs();
    }

    const statCards = [
        ["Total blogs", stats.total],
        ["Published blogs", stats.published],
        ["Draft blogs", stats.draft],
        ["Pending review", stats.pending],
        ["Rejected blogs", stats.rejected],
        ["Archived blogs", stats.archived],
    ];

    function statusClass(blogStatus: BlogDTO["status"]) {
        if (blogStatus === "Published") return "bg-emerald-50 text-emerald-700 border-emerald-200";
        if (blogStatus === "Approved") return "bg-sky-50 text-sky-700 border-sky-200";
        if (blogStatus === "Pending Review") return "bg-amber-50 text-amber-700 border-amber-200";
        if (blogStatus === "Rejected") return "bg-red-50 text-red-700 border-red-200";
        if (blogStatus === "Archived") return "bg-slate-100 text-slate-700 border-slate-200";
        return "bg-[#f8fbff] text-[#334155] border-[#dbe7f3]";
    }

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                {statCards.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-[#dbe7f3] bg-white p-5 shadow-sm">
                        <div className="text-[12px] font-black uppercase tracking-[0.12em] text-[#94a3b8]">{label}</div>
                        <div className="mt-2 text-[30px] font-black text-[#071426]">{value}</div>
                    </div>
                ))}
            </div>

            <div className="rounded-[26px] border border-[#dbe7f3] bg-white p-5 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px_auto]">
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by title, author or keyword"
                        className="h-12 rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold outline-none focus:border-[#0096D6]"
                    />
                    <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold">
                        <option>All</option>
                        {BLOG_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 rounded-2xl border border-[#dbe7f3] px-4 text-[14px] font-semibold">
                        {statuses.map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <Link href="/admin/blogs/new" className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#071426] px-5 text-[14px] font-black text-white">
                        New Blog
                    </Link>
                </div>
            </div>

            {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-[14px] font-bold text-red-700">{error}</div>}

            <div className="overflow-hidden rounded-[26px] border border-[#dbe7f3] bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-[1100px] w-full text-left">
                        <thead className="bg-[#f8fbff] text-[12px] font-black uppercase tracking-[0.12em] text-[#64748b]">
                            <tr>
                                {["Title", "Author", "Category", "Status", "SEO Score", "Date", "Views", "Actions"].map((head) => (
                                    <th key={head} className="px-5 py-4">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eef4fb]">
                            {loading ? (
                                <tr><td colSpan={8} className="px-5 py-10 text-center text-[14px] font-bold text-[#64748b]">Loading blogs...</td></tr>
                            ) : blogs.length === 0 ? (
                                <tr><td colSpan={8} className="px-5 py-10 text-center text-[14px] font-bold text-[#64748b]">No blogs found.</td></tr>
                            ) : blogs.map((blog) => (
                                <tr key={blog._id || blog.slug} className="align-top">
                                    <td className="max-w-[340px] px-5 py-4">
                                        <div className="font-black text-[#071426]">{blog.title}</div>
                                        <div className="mt-1 text-[12px] font-medium text-[#64748b]">/{blog.slug}</div>
                                    </td>
                                    <td className="px-5 py-4 text-[13px] font-bold text-[#475569]">{blog.authorName}</td>
                                    <td className="px-5 py-4"><span className="rounded-full bg-[#f0f9ff] px-3 py-1 text-[12px] font-black text-[#0077B6]">{blog.category}</span></td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex rounded-full border px-3 py-1 text-[12px] font-black ${statusClass(blog.status)}`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-[13px] font-black text-[#071426]">{blog.seoScore}/100</td>
                                    <td className="px-5 py-4 text-[12px] font-semibold text-[#64748b]">{blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString("en-IN") : "-"}</td>
                                    <td className="px-5 py-4 text-[13px] font-black text-[#071426]">{blog.views}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {blog.status === "Published" && <Link href={`/blogs/${blog.slug}`} className="rounded-lg border px-3 py-1.5 text-[12px] font-bold">View</Link>}
                                            {blog._id && <Link href={`/admin/blogs/preview/${blog._id}`} className="rounded-lg border px-3 py-1.5 text-[12px] font-bold">Preview</Link>}
                                            <Link href={`/admin/blogs/edit/${blog._id}`} className="rounded-lg border px-3 py-1.5 text-[12px] font-bold">Edit</Link>
                                            <button onClick={() => updateStatus(blog, "Published")} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-[12px] font-bold text-white">Approve & Publish</button>
                                            <button onClick={() => updateStatus(blog, "Approved")} className="rounded-lg bg-[#0096D6] px-3 py-1.5 text-[12px] font-bold text-white">Approve</button>
                                            <button onClick={() => updateStatus(blog, "Rejected")} className="rounded-lg bg-amber-600 px-3 py-1.5 text-[12px] font-bold text-white">Reject</button>
                                            <button onClick={() => updateStatus(blog, "Archived")} className="rounded-lg bg-slate-600 px-3 py-1.5 text-[12px] font-bold text-white">Archive</button>
                                            <button onClick={() => deleteBlog(blog)} className="rounded-lg bg-red-600 px-3 py-1.5 text-[12px] font-bold text-white">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
