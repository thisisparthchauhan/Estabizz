"use client";

import Link from "next/link";
import type { Blog } from "@/lib/blog/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardStats {
  total: number;
  published: number;
  draft: number;
  pending: number;
  rejected: number;
  archived: number;
}

interface Props {
  stats: DashboardStats;
  recentBlogs: Blog[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(s: string) {
  const MAP: Record<string, { label: string; cls: string }> = {
    published:      { label: "Published",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    draft:          { label: "Draft",         cls: "bg-slate-100 text-slate-600 border-slate-200" },
    pending_review: { label: "Pending",       cls: "bg-[#d9a938]/10 text-[#b8860b] border-[#d9a938]/30" },
    approved:       { label: "Approved",      cls: "bg-blue-50 text-blue-700 border-blue-200" },
    rejected:       { label: "Rejected",      cls: "bg-red-50 text-red-700 border-red-200" },
    archived:       { label: "Archived",      cls: "bg-purple-50 text-purple-700 border-purple-200" },
  };
  const m = MAP[s] ?? { label: s, cls: "bg-slate-100 text-slate-500 border-slate-200" };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${m.cls}`}>
      {m.label}
    </span>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  accent: string;      // Tailwind bg class for icon bg
  iconColor: string;   // Tailwind text class for icon
  href: string;
  note?: string;
}

function StatCard({ label, value, icon, accent, iconColor, href, note }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_10px_rgba(10,22,40,0.05)] hover:shadow-[0_8px_30px_rgba(10,22,40,0.10)] hover:-translate-y-0.5 hover:border-[#d9a938]/40 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${accent} ${iconColor}`}>
          {icon}
        </div>
        <svg
          className="h-4 w-4 text-[#cbd5e1] group-hover:text-[#d9a938] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      <div>
        <div className="text-[28px] font-black text-[#0a1628] leading-none tabular-nums">
          {value}
        </div>
        <div className="mt-1 text-[12px] font-semibold text-[#64748b]">{label}</div>
        {note && (
          <div className="mt-0.5 text-[10.5px] text-[#94a3b8]">{note}</div>
        )}
      </div>
    </Link>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboardClient({ stats, recentBlogs }: Props) {
  const CARDS: StatCardProps[] = [
    {
      label:     "Total Blogs",
      value:     stats.total,
      icon:      "☰",
      accent:    "bg-[#0a1628]/8",
      iconColor: "text-[#0a1628]",
      href:      "/admin/blogs",
      note:      "All statuses combined",
    },
    {
      label:     "Published",
      value:     stats.published,
      icon:      "✓",
      accent:    "bg-emerald-50",
      iconColor: "text-emerald-600",
      href:      "/admin/blogs",
      note:      "Live on website",
    },
    {
      label:     "Draft",
      value:     stats.draft,
      icon:      "✎",
      accent:    "bg-slate-100",
      iconColor: "text-slate-500",
      href:      "/admin/blogs",
      note:      "Work in progress",
    },
    {
      label:     "Pending Review",
      value:     stats.pending,
      icon:      "◷",
      accent:    "bg-[#d9a938]/10",
      iconColor: "text-[#b8860b]",
      href:      "/admin/blogs/pending",
      note:      "Awaiting editorial review",
    },
    {
      label:     "Rejected",
      value:     stats.rejected,
      icon:      "✕",
      accent:    "bg-red-50",
      iconColor: "text-red-500",
      href:      "/admin/blogs",
      note:      "Did not pass review",
    },
    {
      label:     "Archived",
      value:     stats.archived,
      icon:      "⊡",
      accent:    "bg-purple-50",
      iconColor: "text-purple-500",
      href:      "/admin/blogs",
      note:      "Hidden from public",
    },
  ];

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">

      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9a938]/30 bg-[#d9a938]/8 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#b8860b] mb-2">
            <span className="text-[#d9a938]">★</span>
            Estabizz Admin
          </div>
          <h1 className="text-[22px] font-black text-[#0a1628] leading-tight">
            Content Dashboard
          </h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">
            Overview of all blogs and editorial activity
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/blogs/pending"
            className="inline-flex items-center gap-2 rounded-xl border border-[#d9a938]/40 bg-[#d9a938]/10 px-4 py-2 text-[12px] font-bold text-[#b8860b] hover:bg-[#d9a938]/20 transition-colors"
          >
            <span>◷</span> Review Queue
            {stats.pending > 0 && (
              <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#d9a938] text-[9px] font-black text-[#071224]">
                {stats.pending}
              </span>
            )}
          </Link>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#0a1628]/90 shadow-sm transition-all"
          >
            <span className="text-[#d9a938]">✚</span> New Blog
          </Link>
        </div>
      </div>

      {/* ── 6 stat cards ─────────────────────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── Recent blogs ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_10px_rgba(10,22,40,0.04)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0f4f8] px-6 py-4">
          <div>
            <h2 className="text-[14px] font-black text-[#0a1628]">Recent Blogs</h2>
            <p className="text-[11px] text-[#94a3b8] mt-0.5">Latest entries across all statuses</p>
          </div>
          <Link
            href="/admin/blogs"
            className="text-[12px] font-bold text-[#0096D6] hover:text-[#0077B6] transition-colors"
          >
            View all →
          </Link>
        </div>

        {recentBlogs.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-3xl mb-3 opacity-20">☰</div>
            <p className="text-[13px] font-semibold text-[#94a3b8]">No blogs yet</p>
            <p className="text-[12px] text-[#cbd5e1] mt-1">Create your first blog to see it here.</p>
            <Link
              href="/admin/blogs/new"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0a1628] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#0a1628]/90 transition-colors"
            >
              ✚ Create Blog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#f0f4f8] bg-[#f8fafc]">
                  <th className="px-6 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Title</th>
                  <th className="hidden md:table-cell px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Category</th>
                  <th className="hidden sm:table-cell px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Status</th>
                  <th className="hidden lg:table-cell px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Date</th>
                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f8]">
                {recentBlogs.map((blog) => (
                  <tr key={blog.id} className="group hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-3.5 max-w-[240px]">
                      <div className="text-[13px] font-bold text-[#0a1628] truncate group-hover:text-[#0096D6] transition-colors">
                        {blog.title}
                      </div>
                      <div className="text-[11px] text-[#94a3b8] truncate mt-0.5">
                        by {blog.author.firstName} {blog.author.lastName}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3.5">
                      <span className="text-[12px] text-[#475569]">
                        {blog.category.icon} {blog.category.name}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3.5">
                      {statusLabel(blog.status)}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3.5 text-[12px] text-[#94a3b8] whitespace-nowrap">
                      {fmt(blog.publishedAt ?? blog.createdAt)}
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/blogs/edit/${blog.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#dbe7f3] bg-[#f4f9ff] px-2.5 py-1 text-[11px] font-bold text-[#0096D6] hover:bg-[#e0f0fa] transition-colors"
                      >
                        ✎ Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Quick-action cards ───────────────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Write New Blog",
            desc: "Draft an article for the Regulatory Insights section.",
            icon: "✚",
            href: "/admin/blogs/new",
            cta: "Open Editor",
            accent: "bg-[#0a1628]",
            ctaCls: "bg-[#d9a938] text-[#071224]",
          },
          {
            title: "Review Submissions",
            desc: `${stats.pending} article${stats.pending !== 1 ? "s" : ""} in the review queue awaiting approval.`,
            icon: "◷",
            href: "/admin/blogs/pending",
            cta: "Open Queue",
            accent: "bg-[#d9a938]/10",
            ctaCls: "bg-[#d9a938] text-[#071224]",
          },
          {
            title: "Manage All Blogs",
            desc: `${stats.total} total articles — filter, search and bulk-update status.`,
            icon: "☰",
            href: "/admin/blogs",
            cta: "Open Library",
            accent: "bg-[#f0f9ff]",
            ctaCls: "bg-[#0096D6] text-white",
          },
        ].map((q) => (
          <Link
            key={q.title}
            href={q.href}
            className="group flex flex-col justify-between rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_8px_rgba(10,22,40,0.04)] hover:shadow-[0_8px_24px_rgba(10,22,40,0.09)] hover:-translate-y-0.5 hover:border-[#d9a938]/30 transition-all duration-200"
          >
            <div>
              <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl text-[17px] ${q.accent}`}>
                {q.icon}
              </div>
              <h3 className="text-[13px] font-black text-[#0a1628] mb-1">{q.title}</h3>
              <p className="text-[12px] text-[#64748b] leading-5">{q.desc}</p>
            </div>
            <div className="mt-4">
              <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold shadow-sm transition-all ${q.ctaCls}`}>
                {q.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
