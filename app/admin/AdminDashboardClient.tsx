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

function statusBadge(s: string) {
  const MAP: Record<string, { label: string; cls: string }> = {
    published:      { label: "Published",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    draft:          { label: "Draft",      cls: "bg-slate-100 text-slate-600 border-slate-200" },
    pending_review: { label: "Pending",    cls: "bg-amber-50 text-amber-700 border-amber-200" },
    approved:       { label: "Approved",   cls: "bg-blue-50 text-blue-700 border-blue-200" },
    rejected:       { label: "Rejected",   cls: "bg-red-50 text-red-700 border-red-200" },
    archived:       { label: "Archived",   cls: "bg-purple-50 text-purple-700 border-purple-200" },
  };
  const m = MAP[s] ?? { label: s, cls: "bg-slate-100 text-slate-500 border-slate-200" };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${m.cls}`}>
      {m.label}
    </span>
  );
}

// ─── SVG icons for stat cards ─────────────────────────────────────────────────

function IconTotal() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconPublished() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconPending() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconDraft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  href: string;
}

function StatCard({ label, value, icon, iconBg, iconColor, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_8px_rgba(10,22,40,0.04)] hover:shadow-[0_6px_24px_rgba(10,22,40,0.09)] hover:-translate-y-0.5 hover:border-[#d9a938]/35 transition-all duration-200"
    >
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor} mb-4`}>
        {icon}
      </div>
      <div>
        <div className="text-[30px] font-black text-[#0a1628] leading-none tabular-nums">
          {value}
        </div>
        <div className="mt-1.5 text-[12px] font-semibold text-[#64748b]">{label}</div>
      </div>
    </Link>
  );
}

// ─── Quick Action Card ────────────────────────────────────────────────────────

function QuickCard({
  title,
  desc,
  href,
  cta,
  ctaCls,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  ctaCls: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_8px_rgba(10,22,40,0.04)] hover:shadow-[0_6px_20px_rgba(10,22,40,0.08)] hover:-translate-y-0.5 hover:border-[#d9a938]/25 transition-all duration-200"
    >
      <div>
        <h3 className="text-[13.5px] font-black text-[#0a1628] mb-1.5">{title}</h3>
        <p className="text-[12px] text-[#64748b] leading-5">{desc}</p>
      </div>
      <div className="mt-4">
        <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-bold transition-all ${ctaCls}`}>
          {cta} →
        </span>
      </div>
    </Link>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboardClient({ stats, recentBlogs }: Props) {
  const STAT_CARDS: StatCardProps[] = [
    {
      label:     "Total Blogs",
      value:     stats.total,
      icon:      <IconTotal />,
      iconBg:    "bg-[#0a1628]/8",
      iconColor: "text-[#0a1628]",
      href:      "/admin/blogs",
    },
    {
      label:     "Published",
      value:     stats.published,
      icon:      <IconPublished />,
      iconBg:    "bg-emerald-50",
      iconColor: "text-emerald-600",
      href:      "/admin/blogs",
    },
    {
      label:     "Pending Review",
      value:     stats.pending,
      icon:      <IconPending />,
      iconBg:    "bg-amber-50",
      iconColor: "text-amber-600",
      href:      "/admin/blogs/pending",
    },
    {
      label:     "Drafts",
      value:     stats.draft,
      icon:      <IconDraft />,
      iconBg:    "bg-slate-100",
      iconColor: "text-slate-500",
      href:      "/admin/blogs",
    },
  ];

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">

      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-black text-[#0a1628] leading-tight">Dashboard</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">Content overview</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#0a1628]/90 shadow-sm transition-all self-start sm:self-auto"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Blog
        </Link>
      </div>

      {/* ── 4 stat cards ─────────────────────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── Recent blogs table ────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_8px_rgba(10,22,40,0.04)] overflow-hidden mb-6">
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
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#f0f4f8] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-[#94a3b8]">No blogs yet</p>
            <p className="text-[12px] text-[#cbd5e1] mt-1">Create your first blog to see it here.</p>
            <Link
              href="/admin/blogs/new"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0a1628] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#0a1628]/90 transition-colors"
            >
              Create your first blog
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
                        {blog.author.firstName} {blog.author.lastName}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3.5">
                      <span className="text-[12px] text-[#475569]">
                        {blog.category.icon} {blog.category.name}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3.5">
                      {statusBadge(blog.status)}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3.5 text-[12px] text-[#94a3b8] whitespace-nowrap">
                      {fmt(blog.publishedAt ?? blog.createdAt)}
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/blogs/edit/${blog.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#dbe7f3] bg-[#f4f9ff] px-2.5 py-1 text-[11px] font-bold text-[#0096D6] hover:bg-[#e0f0fa] transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <QuickCard
          title="Write New Blog"
          desc="Draft an article for the Regulatory Insights section."
          href="/admin/blogs/new"
          cta="Open Editor"
          ctaCls="bg-[#d9a938] text-[#071224] hover:bg-[#c8921a]"
        />
        <QuickCard
          title="Review Pending"
          desc={`${stats.pending} article${stats.pending !== 1 ? "s" : ""} in the queue awaiting approval.`}
          href="/admin/blogs/pending"
          cta="Open Queue"
          ctaCls="bg-[#0a1628] text-white hover:bg-[#0a1628]/90"
        />
      </div>
    </div>
  );
}
