"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeHistoryItem, ChangeHistoryResult } from "@/lib/content/changeHistoryTypes";

interface Props {
  initialHistory: ChangeHistoryResult;
  viewerEmail: string;
}

type StatusFilter = "all" | "published" | "draft" | "pending" | "approved" | "restored" | "rejected" | "requested_changes";
type TypeFilter = "all" | "website" | "seo" | "blogs";

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All activity" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending approval" },
  { value: "approved", label: "Approved" },
  { value: "restored", label: "Restored" },
  { value: "rejected", label: "Rejected" },
  { value: "requested_changes", label: "Requested changes" },
];

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All areas" },
  { value: "website", label: "Website content" },
  { value: "seo", label: "SEO changes" },
  { value: "blogs", label: "Blogs" },
];

const statusMeta: Record<string, { label: string; cls: string }> = {
  published: { label: "Published", cls: "border-green-200 bg-green-50 text-green-700" },
  approved: { label: "Approved", cls: "border-blue-200 bg-blue-50 text-blue-700" },
  restored: { label: "Restored", cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  draft: { label: "Draft", cls: "border-slate-200 bg-slate-50 text-slate-600" },
  pending_approval: { label: "Pending approval", cls: "border-amber-200 bg-amber-50 text-amber-700" },
  pending_review: { label: "Pending approval", cls: "border-amber-200 bg-amber-50 text-amber-700" },
  rejected: { label: "Rejected", cls: "border-red-200 bg-red-50 text-red-700" },
  requested_changes: { label: "Requested changes", cls: "border-orange-200 bg-orange-50 text-orange-700" },
  deleted: { label: "Deleted", cls: "border-zinc-200 bg-zinc-50 text-zinc-700" },
  archived: { label: "Archived", cls: "border-zinc-200 bg-zinc-50 text-zinc-700" },
};

function formatIST(iso?: string): string {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function areaLabel(item: ChangeHistoryItem): string {
  if (item.type === "seo") return "SEO changes";
  if (item.type === "blog") return "Blogs";
  return "Website content";
}

function PillButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3.5 py-2 text-[12px] font-bold transition-colors ${
        active
          ? "border-[#1677f2] bg-[#1677f2] text-white"
          : "border-[#dbe7f3] bg-white text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
      }`}
    >
      {children}
    </button>
  );
}

function DetailDrawer({
  item,
  onClose,
}: {
  item: ChangeHistoryItem;
  onClose: () => void;
}) {
  const meta = statusMeta[item.status] ?? statusMeta.draft;
  const changedFields = item.changedFields.slice(0, 80);

  return (
    <div className="fixed inset-0 z-[3100] flex items-stretch">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="flex w-full max-w-[960px] flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.30)]">
        <div className="shrink-0 border-b border-[#e2eaf2] bg-[#fbfdff] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${meta.cls}`}>{meta.label}</span>
                <span className="rounded-full border border-[#dbe7f3] bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#64748b]">
                  {areaLabel(item)}
                </span>
              </div>
              <h2 className="text-[20px] font-black leading-tight text-[#0a1628]">{item.sectionName}</h2>
              <p className="mt-1 break-words text-[12px] text-[#64748b]">{item.pageName} · {item.contentKey}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-[18px] text-[#94a3b8] hover:bg-[#f0f4f8] hover:text-[#0a1628]"
              aria-label="Close"
            >
              x
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Page", item.pageName],
              ["Section", item.sectionName],
              ["Change", item.action],
              ["Status", meta.label],
              ["Updated By", item.changedBy || "Unknown"],
              ["Role", item.changedByRole || "Unknown"],
              ["Changed On", formatIST(item.changedAt)],
              ["Published On", formatIST(item.publishedAt)],
              ["Reviewed By", item.reviewedBy || "-"],
              ["Reviewed On", formatIST(item.reviewedAt)],
              ["Comment", item.reviewerComment || "-"],
              ["Content Key", item.contentKey],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[#e2eaf2] bg-[#fbfdff] px-4 py-3">
                <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">{label}</div>
                <div className="mt-1 break-words text-[12px] font-bold text-[#334155]">{value}</div>
              </div>
            ))}
          </div>

          <div className="mb-5 overflow-hidden rounded-2xl border border-[#e2eaf2] bg-white">
            <div className="grid grid-cols-[160px_1fr_1fr] gap-3 border-b border-[#f0f4f8] bg-[#f8fafc] px-5 py-3 text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">
              <span>Field</span>
              <span>Before</span>
              <span>After</span>
            </div>
            <div className="divide-y divide-[#f0f4f8]">
              {changedFields.length ? changedFields.map((change, index) => (
                <div key={`${change.field}-${index}`} className="grid gap-3 px-5 py-4 lg:grid-cols-[160px_1fr_1fr]">
                  <div className="text-[12px] font-black text-[#0a1628]">{change.field}</div>
                  <div className="whitespace-pre-wrap rounded-xl border border-[#e2eaf2] bg-[#fbfdff] px-3 py-2 text-[12px] leading-5 text-[#475569]">
                    {change.oldValue}
                  </div>
                  <div className="whitespace-pre-wrap rounded-xl border border-[#cfe3ff] bg-[#f5faff] px-3 py-2 text-[12px] leading-5 text-[#0a1628]">
                    {change.newValue}
                  </div>
                </div>
              )) : (
                <div className="px-5 py-8 text-center text-[13px] text-[#94a3b8]">No changed fields were detected.</div>
              )}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {[
              ["Published Snapshot", item.publishedSnapshot],
              ["Draft Snapshot", item.draftSnapshot],
            ].map(([label, fields]) => (
              <div key={label as string} className="rounded-2xl border border-[#e2eaf2] bg-white">
                <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-5 py-3">
                  <h3 className="text-[12px] font-black uppercase tracking-wide text-[#94a3b8]">{label as string}</h3>
                </div>
                <div className="divide-y divide-[#f4f7fb]">
                  {(fields as ChangeHistoryItem["draftSnapshot"]).length ? (fields as ChangeHistoryItem["draftSnapshot"]).map((field) => (
                    <div key={`${label}-${field.field}`} className="grid gap-2 px-5 py-3 sm:grid-cols-[140px_1fr]">
                      <div className="text-[11px] font-black text-[#0a1628]">{field.field}</div>
                      <div className="break-words text-[12px] leading-5 text-[#475569]">{field.value}</div>
                    </div>
                  )) : (
                    <div className="px-5 py-6 text-[12px] text-[#94a3b8]">No saved snapshot is available.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function ChangeHistoryClient({ initialHistory, viewerEmail }: Props) {
  const [history, setHistory] = useState(initialHistory);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");
  const [changedBy, setChangedBy] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ChangeHistoryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: "25",
      status,
      type,
    });
    if (search.trim()) params.set("search", search.trim());
    if (changedBy.trim()) params.set("changedBy", changedBy.trim());
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    return params.toString();
  }, [changedBy, fromDate, page, search, status, toDate, type]);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/change-history?${query}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to load change history.");
      setHistory(data as ChangeHistoryResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load change history.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadHistory();
    }, 200);
    return () => window.clearTimeout(timer);
  }, [loadHistory]);

  function resetPageAnd(setter: () => void) {
    setPage(1);
    setter();
  }

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[22px] font-black text-[#0a1628]">Change History</h1>
          <p className="mt-1 text-[13px] text-[#64748b]">View saved website changes, approvals, comments and before-after details.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e2eaf2] bg-white px-5 py-3 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
            <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Total Changes</div>
            <div className="mt-1 text-[24px] font-black text-[#1677f2]">{history.total}</div>
          </div>
          <div className="rounded-2xl border border-[#e2eaf2] bg-white px-5 py-3 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
            <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Viewing As</div>
            <div className="mt-1 max-w-[220px] truncate text-[13px] font-black text-[#0a1628]">{viewerEmail || "Admin"}</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="mb-5 rounded-2xl border border-[#e2eaf2] bg-white p-4 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
        <div className="mb-3 flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <PillButton
              key={option.value}
              active={status === option.value}
              onClick={() => resetPageAnd(() => setStatus(option.value))}
            >
              {option.label}
            </PillButton>
          ))}
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <PillButton
              key={option.value}
              active={type === option.value}
              onClick={() => resetPageAnd(() => setType(option.value))}
            >
              {option.label}
            </PillButton>
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_160px_160px]">
          <input
            value={search}
            onChange={(e) => resetPageAnd(() => setSearch(e.target.value))}
            placeholder="Search page or section"
            className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]"
          />
          <input
            value={changedBy}
            onChange={(e) => resetPageAnd(() => setChangedBy(e.target.value))}
            placeholder="Changed by"
            className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]"
          />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => resetPageAnd(() => setFromDate(e.target.value))}
            className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]"
            aria-label="From date"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => resetPageAnd(() => setToDate(e.target.value))}
            className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]"
            aria-label="To date"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
        <div className="hidden grid-cols-[1fr_1fr_0.8fr_1fr_1fr_110px] gap-4 border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] lg:grid">
          <span>Page</span>
          <span>Section</span>
          <span>Status</span>
          <span>Updated By</span>
          <span>Changed On</span>
          <span className="text-right">View Details</span>
        </div>

        {loading && (
          <div className="border-b border-[#f4f7fb] px-6 py-3 text-[12px] font-bold text-[#64748b]">Loading latest activity...</div>
        )}

        {history.items.length ? (
          <div className="divide-y divide-[#f4f7fb]">
            {history.items.map((item) => {
              const meta = statusMeta[item.status] ?? statusMeta.draft;
              return (
                <div key={item.id} className="grid gap-4 px-6 py-4 hover:bg-[#fbfdff] lg:grid-cols-[1fr_1fr_0.8fr_1fr_1fr_110px] lg:items-center">
                  <div className="min-w-0">
                    <div className="text-[13px] font-black text-[#0a1628]">{item.pageName}</div>
                    <div className="mt-1 text-[11px] font-bold text-[#94a3b8]">{areaLabel(item)}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#334155]">{item.sectionName}</div>
                    <div className="mt-1 truncate text-[11px] text-[#94a3b8]">{item.contentKey}</div>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${meta.cls}`}>{meta.label}</span>
                    <div className="mt-1 text-[11px] text-[#94a3b8]">{item.action}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[12px] font-bold text-[#334155]">{item.changedBy || "Unknown"}</div>
                    <div className="mt-1 text-[11px] text-[#94a3b8]">{item.changedByRole || "Unknown"}</div>
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#334155]">{formatIST(item.changedAt)}</div>
                    <div className="mt-1 text-[11px] text-[#94a3b8]">{item.summary}</div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="rounded-lg border border-[#dbe7f3] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4fc] text-[20px] font-black text-[#1677f2]">0</div>
            <p className="text-[14px] font-black text-[#0a1628]">No changes found</p>
            <p className="mt-1 text-[12px] text-[#94a3b8]">Try another filter or date range.</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[12px] font-bold text-[#64748b]">
          Page {history.page} of {history.totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={history.page <= 1 || loading}
            className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(history.totalPages, current + 1))}
            disabled={history.page >= history.totalPages || loading}
            className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {selected && <DetailDrawer item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
