"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogSummary, BlogStatus } from "@/lib/blog/types";

interface Props {
  initialBlogs: BlogSummary[];
  email: string;
}

function fmt(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const STATUS_META: Record<BlogStatus, { label: string; cls: string }> = {
  published:      { label: "Published",      cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  draft:          { label: "Draft",          cls: "bg-slate-100 text-slate-600 border-slate-200" },
  pending_review: { label: "Pending Review", cls: "bg-[#1677f2]/10 text-[#0866d9] border-[#1677f2]/40" },
  approved:       { label: "Approved",       cls: "bg-blue-50 text-blue-700 border-blue-200" },
  rejected:       { label: "Rejected",       cls: "bg-red-50 text-red-700 border-red-200" },
  archived:       { label: "Archived",       cls: "bg-purple-50 text-purple-700 border-purple-200" },
};

export default function MyBlogsClient({ initialBlogs, email }: Props) {
  const [blogs, setBlogs]             = useState<BlogSummary[]>(initialBlogs);
  const [deleteTarget, setDeleteTarget] = useState<BlogSummary | null>(null);
  const [deleting, setDeleting]       = useState(false);
  const [toast, setToast]             = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/my-blogs/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ msg: data.error || "Delete failed.", type: "err" });
      } else {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
        setToast({ msg: "Submission deleted.", type: "ok" });
      }
    } catch {
      setToast({ msg: "Network error. Please try again.", type: "err" });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] pt-[64px]">
      <div className="mx-auto max-w-4xl px-4 py-10">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[26px] font-black text-[#0a1628]">My Submissions</h1>
            <p className="mt-1 text-[13.5px] text-[#64748b]">
              Articles submitted with <span className="font-semibold text-[#374151]">{email}</span>
            </p>
          </div>
          <Link
            href="/submit-blog"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-[#0a1628] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#0a1628]/90 transition-colors"
          >
            ✚ Submit New Article
          </Link>
        </div>

        {/* Empty state */}
        {blogs.length === 0 ? (
          <div className="rounded-2xl border border-[#e8e8e8] bg-white px-8 py-16 text-center">
            <div className="mb-4 text-4xl opacity-30">📝</div>
            <h2 className="mb-1.5 text-[18px] font-black text-[#0a1628]">No submissions yet</h2>
            <p className="mb-6 text-[13.5px] text-[#64748b]">
              You haven&apos;t submitted any articles. Share your regulatory insight with Estabizz.
            </p>
            <Link
              href="/submit-blog"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1677f2] px-5 py-2.5 text-[13px] font-black text-white hover:bg-[#3b8ef5] transition-colors"
            >
              Submit Your First Article
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white">
            {blogs.map((blog) => {
              const m = STATUS_META[blog.status] ?? { label: blog.status, cls: "bg-slate-100 text-slate-500 border-slate-200" };
              return (
                <div
                  key={blog.id}
                  className="flex flex-col gap-3 border-b border-[#f0f0f0] p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${m.cls}`}>
                        {m.label}
                      </span>
                      <span className="text-[11px] text-[#9ca3af]">
                        {blog.category.icon} {blog.category.name} · {fmt(blog.createdAt)}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-[#0a1628]">
                      {blog.title}
                    </h3>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {blog.status === "published" && (
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                      >
                        ↗ View
                      </Link>
                    )}
                    <button
                      onClick={() => setDeleteTarget(blog)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] font-bold text-red-600 hover:bg-red-100 transition-colors"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pending note */}
        {blogs.some((b) => b.status === "pending_review") && (
          <p className="mt-4 text-[12.5px] leading-6 text-[#94a3b8]">
            Submissions marked <strong className="text-[#0866d9]">Pending Review</strong> are awaiting
            admin approval and are not yet publicly visible.
          </p>
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
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-[20px]">🗑</div>
            <h3 className="text-[16px] font-black text-[#0a1628]">Delete this submission?</h3>
            <p className="mt-1.5 text-[13px] leading-6 text-[#64748b]">
              You are about to permanently delete{" "}
              <span className="font-bold text-[#0a1628]">“{deleteTarget.title}”</span>. This cannot be undone.
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
        >
          {toast.msg}
          <button onClick={() => setToast(null)} className="ml-3 text-white/60 hover:text-white">✕</button>
        </div>
      )}
    </main>
  );
}
