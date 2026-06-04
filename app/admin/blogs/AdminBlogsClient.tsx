"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Blog, BlogStatus } from "@/lib/blog/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  initialBlogs: Blog[];
}

type SortKey = "title" | "category" | "status" | "date";
type SortDir = "asc" | "desc";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STATUS_META: Record<
  BlogStatus,
  { label: string; cls: string; dotCls: string }
> = {
  published:      { label: "Published",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200",     dotCls: "bg-emerald-500" },
  draft:          { label: "Draft",         cls: "bg-slate-100  text-slate-600  border-slate-200",        dotCls: "bg-slate-400" },
  pending_review: { label: "Pending",       cls: "bg-[#1677f2]/10 text-[#b8860b] border-[#1677f2]/30",   dotCls: "bg-[#1677f2]" },
  approved:       { label: "Approved",      cls: "bg-blue-50    text-blue-700   border-blue-200",         dotCls: "bg-blue-500" },
  rejected:       { label: "Rejected",      cls: "bg-red-50     text-red-700    border-red-200",          dotCls: "bg-red-500" },
  archived:       { label: "Archived",      cls: "bg-purple-50  text-purple-700 border-purple-200",       dotCls: "bg-purple-500" },
};

function StatusBadge({ status }: { status: BlogStatus }) {
  const m = STATUS_META[status] ?? { label: status, cls: "bg-slate-100 text-slate-500 border-slate-200", dotCls: "bg-slate-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${m.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dotCls}`} />
      {m.label}
    </span>
  );
}

// ─── Status tabs config ───────────────────────────────────────────────────────

const STATUS_TABS: Array<{ key: BlogStatus | "all"; label: string }> = [
  { key: "all",           label: "All" },
  { key: "published",     label: "Published" },
  { key: "draft",         label: "Draft" },
  { key: "pending_review",label: "Pending" },
  { key: "approved",      label: "Approved" },
  { key: "rejected",      label: "Rejected" },
  { key: "archived",      label: "Archived" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminBlogsClient({ initialBlogs }: Props) {
  const [blogs,     setBlogs]         = useState<Blog[]>(initialBlogs);
  const [activeTab, setActiveTab]     = useState<BlogStatus | "all">("all");
  const [search,    setSearch]        = useState("");
  const [sortKey,   setSortKey]       = useState<SortKey>("date");
  const [sortDir,   setSortDir]       = useState<SortDir>("desc");

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleting,     setDeleting]     = useState(false);
  const [toast,        setToast]        = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ msg: data.error || "Delete failed.", type: "err" });
      } else {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
        setToast({ msg: "Blog deleted.", type: "ok" });
      }
    } catch {
      setToast({ msg: "Network error. Please try again.", type: "err" });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  // ── Derived list ───────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...blogs];

    // Status filter
    if (activeTab !== "all") {
      list = list.filter((b) => b.status === activeTab);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.firstName.toLowerCase().includes(q) ||
          b.author.lastName.toLowerCase().includes(q) ||
          b.category.name.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "title":    cmp = a.title.localeCompare(b.title); break;
        case "category": cmp = a.category.name.localeCompare(b.category.name); break;
        case "status":   cmp = a.status.localeCompare(b.status); break;
        case "date":
          cmp = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [blogs, activeTab, search, sortKey, sortDir]);

  // ── Tab counts ─────────────────────────────────────────────────────────────
  function countFor(key: BlogStatus | "all") {
    if (key === "all") return blogs.length;
    return blogs.filter((b) => b.status === key).length;
  }

  // ── Sort toggle ────────────────────────────────────────────────────────────
  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="ml-1 text-[#cbd5e1]">⇅</span>;
    return (
      <span className="ml-1 text-[#1677f2]">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  }

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628] leading-tight">All Blogs</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">
            {blogs.length} article{blogs.length !== 1 ? "s" : ""} — search, filter and manage
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/blogs/pending"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#1677f2]/40 bg-[#1677f2]/10 px-3.5 py-2 text-[12px] font-bold text-[#b8860b] hover:bg-[#1677f2]/20 transition-colors"
          >
            ◷ Pending
          </Link>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#0a1628]/90 shadow-sm transition-all"
          >
            <span className="text-[#1677f2]">✚</span> New Blog
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">

        {/* ── Toolbar ─────────────────────────────────────────────────────── */}
        <div className="border-b border-[#f0f4f8] px-5 pt-4">
          {/* Status tabs */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {STATUS_TABS.map((tab) => {
              const count = countFor(tab.key);
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold transition-all ${
                    isActive
                      ? tab.key === "all"
                        ? "bg-[#0a1628] text-[#1677f2]"
                        : "bg-[#1677f2] text-[#071224]"
                      : "border border-[#e2eaf2] text-[#475569] hover:border-[#1677f2]/40 hover:text-[#0a1628]"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9.5px] font-black ${
                      isActive
                        ? tab.key === "all"
                          ? "bg-white/15 text-[#1677f2]"
                          : "bg-[#071224]/20 text-[#071224]"
                        : "bg-slate-100 text-[#94a3b8]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search row */}
          <div className="mb-3 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[13px]">⌕</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, author, category, tag…"
                className="w-full rounded-xl border border-[#e2eaf2] bg-[#f8fafc] pl-8 pr-3 py-2 text-[13px] text-[#0a1628] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#1677f2]/60 focus:ring-2 focus:ring-[#1677f2]/15 transition-colors"
              />
            </div>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-[11px] font-bold text-[#94a3b8] hover:text-[#0a1628] transition-colors"
              >
                Clear ✕
              </button>
            )}
            <span className="text-[12px] text-[#94a3b8] ml-auto">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-3xl mb-3 opacity-20">☰</div>
            <p className="text-[13px] font-semibold text-[#94a3b8]">No blogs found</p>
            {search && (
              <p className="text-[12px] text-[#cbd5e1] mt-1">
                Try adjusting your search or clearing the filters.
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#f0f4f8] bg-[#f8fafc]">
                  <th className="px-6 py-3">
                    <button
                      onClick={() => handleSort("title")}
                      className="flex items-center text-[11px] font-black uppercase tracking-wider text-[#94a3b8] hover:text-[#0a1628] transition-colors"
                    >
                      Title <SortIcon col="title" />
                    </button>
                  </th>
                  <th className="hidden md:table-cell px-4 py-3">
                    <button
                      onClick={() => handleSort("category")}
                      className="flex items-center text-[11px] font-black uppercase tracking-wider text-[#94a3b8] hover:text-[#0a1628] transition-colors"
                    >
                      Category <SortIcon col="category" />
                    </button>
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center text-[11px] font-black uppercase tracking-wider text-[#94a3b8] hover:text-[#0a1628] transition-colors"
                    >
                      Status <SortIcon col="status" />
                    </button>
                  </th>
                  <th className="hidden lg:table-cell px-4 py-3">
                    <button
                      onClick={() => handleSort("date")}
                      className="flex items-center text-[11px] font-black uppercase tracking-wider text-[#94a3b8] hover:text-[#0a1628] transition-colors"
                    >
                      Date <SortIcon col="date" />
                    </button>
                  </th>
                  <th className="hidden lg:table-cell px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
                    Author
                  </th>
                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8fafc]">
                {filtered.map((blog) => (
                  <tr
                    key={blog.id}
                    className="group hover:bg-[#f8fafc] transition-colors"
                  >
                    {/* Title */}
                    <td className="px-6 py-3.5 max-w-[260px]">
                      <div className="text-[13px] font-bold text-[#0a1628] truncate group-hover:text-[#1677f2] transition-colors leading-snug">
                        {blog.featured && (
                          <span className="mr-1 text-[10px] text-[#1677f2]">★</span>
                        )}
                        {blog.title}
                      </div>
                      {blog.isUserSubmitted && (
                        <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-1.5 py-0 text-[9.5px] font-bold text-blue-600">
                          User submission
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="hidden md:table-cell px-4 py-3.5 whitespace-nowrap">
                      <span className="text-[12px] text-[#475569]">
                        {blog.category.icon} {blog.category.name}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="hidden sm:table-cell px-4 py-3.5">
                      <StatusBadge status={blog.status} />
                    </td>

                    {/* Date */}
                    <td className="hidden lg:table-cell px-4 py-3.5 text-[12px] text-[#94a3b8] whitespace-nowrap">
                      {fmt(blog.publishedAt ?? blog.createdAt)}
                    </td>

                    {/* Author */}
                    <td className="hidden lg:table-cell px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1677f2] to-[#0a1628] text-[9px] font-black text-white">
                          {blog.author.firstName[0]}
                        </div>
                        <span className="text-[12px] text-[#475569] whitespace-nowrap">
                          {blog.author.firstName} {blog.author.lastName}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#dbe7f3] bg-[#f4f9ff] px-2.5 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#e0f0fa] transition-colors whitespace-nowrap"
                        >
                          ✎ Edit
                        </Link>
                        {blog.status === "pending_review" && (
                          <Link
                            href="/admin/blogs/pending"
                            className="inline-flex items-center gap-1 rounded-lg border border-[#1677f2]/40 bg-[#1677f2]/10 px-2.5 py-1 text-[11px] font-bold text-[#b8860b] hover:bg-[#1677f2]/20 transition-colors whitespace-nowrap"
                          >
                            Review
                          </Link>
                        )}
                        {blog.status === "published" && (
                          <Link
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors whitespace-nowrap"
                          >
                            ↗ View
                          </Link>
                        )}
                        <button
                          onClick={() => setDeleteTarget(blog)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap"
                          title="Delete blog"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer count */}
        {filtered.length > 0 && (
          <div className="border-t border-[#f0f4f8] bg-[#f8fafc] px-6 py-3 text-[12px] text-[#94a3b8]">
            Showing {filtered.length} of {blogs.length} articles
          </div>
        )}
      </div>

      {/* ── Delete confirmation modal ─────────────────────────────────────────── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4"
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-[20px]">
              🗑
            </div>
            <h3 className="text-[16px] font-black text-[#0a1628]">Delete this blog?</h3>
            <p className="mt-1.5 text-[13px] leading-6 text-[#64748b]">
              You are about to permanently delete{" "}
              <span className="font-bold text-[#0a1628]">“{deleteTarget.title}”</span>.
              This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="rounded-lg border border-[#e2eaf2] bg-white px-4 py-2 text-[13px] font-bold text-[#475569] hover:bg-[#f8fafc] transition-colors disabled:opacity-50"
              >
                No, keep it
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-[13px] font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ─────────────────────────────────────────────────────────────── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[3000] rounded-xl px-4 py-3 text-[13px] font-bold text-white shadow-lg ${
            toast.type === "ok" ? "bg-[#0a1628]" : "bg-red-600"
          }`}
          onAnimationEnd={() => {}}
        >
          {toast.msg}
          <button
            onClick={() => setToast(null)}
            className="ml-3 text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
