"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ApprovalQueueItem, QueueAction } from "@/lib/content/approvalQueue";
import type { AdminPermission, AdminRole } from "@/lib/admin/types";

interface Viewer {
  email: string;
  role: AdminRole;
  permissions: AdminPermission[];
}

interface Props {
  initialItems: ApprovalQueueItem[];
  viewer: Viewer | null;
}

type FilterMode = "pending" | "website" | "seo" | "regulatory" | "blogs" | "content-pages" | "rejected";

const statusMeta: Record<string, { label: string; cls: string }> = {
  pending_approval: { label: "Pending", cls: "border-amber-200 bg-amber-50 text-amber-700" },
  pending_review: { label: "Pending", cls: "border-amber-200 bg-amber-50 text-amber-700" },
  rejected: { label: "Rejected", cls: "border-red-200 bg-red-50 text-red-700" },
  published: { label: "Published", cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
};

function formatIST(iso: string): string {
  if (!iso) return "—";
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

function hasPermission(viewer: Viewer | null, permission: AdminPermission): boolean {
  return !!viewer?.permissions.includes(permission);
}

function isElevated(viewer: Viewer | null): boolean {
  return viewer?.role === "super_admin" || viewer?.role === "admin";
}

function canReview(viewer: Viewer | null, item: ApprovalQueueItem): boolean {
  if (!viewer) return false;
  if (item.submittedBy && item.submittedBy.toLowerCase() === viewer.email.toLowerCase()) return false;
  if (isElevated(viewer)) return true;
  if (item.type === "blog") {
    return hasPermission(viewer, "approve_blog") || hasPermission(viewer, "reject_blog") || hasPermission(viewer, "publish_blog");
  }
  if (item.type === "regulatory_update") {
    return hasPermission(viewer, "publish_content");
  }
  if (item.key.startsWith("seo.")) {
    return hasPermission(viewer, "manage_seo") || hasPermission(viewer, "publish_content");
  }
  return hasPermission(viewer, "publish_content");
}

function filterItem(item: ApprovalQueueItem, mode: FilterMode): boolean {
  if (mode === "pending") return item.status === "pending_approval" || item.status === "pending_review" || !!item.hasPendingChanges;
  if (mode === "website") return item.type === "content" && !item.key.startsWith("seo.") && item.status === "pending_approval";
  if (mode === "seo") return item.type === "content" && item.key.startsWith("seo.") && item.status === "pending_approval";
  if (mode === "regulatory") return item.type === "regulatory_update";
  if (mode === "blogs") return item.type === "blog" && item.status === "pending_review";
  if (mode === "content-pages") return item.type === "public_content_page";
  return item.status === "rejected";
}

function matchesText(item: ApprovalQueueItem, text: string): boolean {
  const q = text.toLowerCase().trim();
  if (!q) return true;
  return [
    item.pageName,
    item.sectionName,
    item.key,
    item.submittedBy,
    item.submittedByRole,
    item.title,
    item.regulator,
    item.category,
    item.impactLevel,
    item.summary,
  ].some((value) => String(value ?? "").toLowerCase().includes(q));
}

function typeLabel(item: ApprovalQueueItem): string {
  if (item.type === "blog") return "Blog";
  if (item.type === "regulatory_update") return "Regulatory Update";
  if (item.type === "public_content_page") return "Content Page";
  return item.key.startsWith("seo.") ? "SEO" : "Website Content";
}

function regulatoryStateLabel(item: ApprovalQueueItem): string {
  return item.regulatoryKind === "pending_changes" ? "Pending Changes" : "Pending Publication";
}

function isWithinRange(item: ApprovalQueueItem, from: string, to: string): boolean {
  const date = new Date(item.submittedAt).getTime();
  if (from && date < new Date(`${from}T00:00:00`).getTime()) return false;
  if (to && date > new Date(`${to}T23:59:59`).getTime()) return false;
  return true;
}

function FilterButton({
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
  viewer,
  comment,
  setComment,
  actionLoading,
  onClose,
  onAction,
}: {
  item: ApprovalQueueItem;
  viewer: Viewer | null;
  comment: string;
  setComment: (value: string) => void;
  actionLoading: QueueAction | "";
  onClose: () => void;
  onAction: (action: QueueAction) => void;
}) {
  const allowed = canReview(viewer, item) && item.status !== "rejected";

  return (
    <div className="fixed inset-0 z-[3100] flex items-stretch">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="flex w-full max-w-[920px] flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.30)]">
        <div className="shrink-0 border-b border-[#e2eaf2] bg-[#fbfdff] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${statusMeta[item.status]?.cls ?? statusMeta.pending_approval.cls}`}>
                  {statusMeta[item.status]?.label ?? item.status}
                </span>
                <span className="rounded-full border border-[#dbe7f3] bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#64748b]">
                  {typeLabel(item)}
                </span>
                {item.type === "regulatory_update" && (
                  <span className="rounded-full border border-[#cfe3ff] bg-[#f5faff] px-2.5 py-0.5 text-[10px] font-bold text-[#1677f2]">
                    {regulatoryStateLabel(item)}
                  </span>
                )}
              </div>
              <h2 className="text-[20px] font-black leading-tight text-[#0a1628]">{item.sectionName}</h2>
              <p className="mt-1 text-[12px] text-[#64748b]">
                {item.type === "regulatory_update"
                  ? [item.regulator, item.category, item.impactLevel].filter(Boolean).join(" · ")
                  : `${item.pageName} · ${item.key}`}
              </p>
            </div>
            <button type="button" onClick={onClose} className="rounded-xl px-3 py-2 text-[18px] text-[#94a3b8] hover:bg-[#f0f4f8] hover:text-[#0a1628]">x</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Submitted By", item.submittedBy || "Unknown"],
              ["Role", item.submittedByRole || "Unknown"],
              ["Submitted On", formatIST(item.submittedAt)],
              ["Last Updated", formatIST(item.updatedAt)],
              ...(item.type === "regulatory_update" ? [
                ["Regulator", item.regulator || "Unknown"],
                ["Category", item.category || "Unknown"],
                ["Impact Level", item.impactLevel || "Unknown"],
                ["Review Type", regulatoryStateLabel(item)],
              ] : []),
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[#e2eaf2] bg-[#fbfdff] px-4 py-3">
                <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">{label}</div>
                <div className="mt-1 break-words text-[12px] font-bold text-[#334155]">{value}</div>
              </div>
            ))}
          </div>

          {item.type === "regulatory_update" && (
            <div className="mb-5 rounded-2xl border border-[#e2eaf2] bg-white p-5">
              <div className="mb-2 text-[12px] font-black uppercase tracking-wide text-[#94a3b8]">Regulatory Update</div>
              <p className="text-[13px] leading-6 text-[#475569]">{item.summary || "No summary provided."}</p>
              {item.sourceUrl && (
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-[12px] font-bold text-[#1677f2] hover:border-[#1677f2]/40">
                  Source Link
                </a>
              )}
            </div>
          )}

          <div className="mb-5 rounded-2xl border border-[#e2eaf2] bg-white">
            <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-5 py-3">
              <h3 className="text-[12px] font-black uppercase tracking-wide text-[#94a3b8]">Changed Fields</h3>
            </div>
            <div className="divide-y divide-[#f0f4f8]">
              {item.changedFields.length ? item.changedFields.map((change, index) => (
                <div key={`${change.field}-${index}`} className="grid gap-3 px-5 py-4 lg:grid-cols-[180px_1fr_1fr]">
                  <div className="text-[12px] font-black text-[#0a1628]">{change.field}</div>
                  <div>
                    <div className="mb-1 text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Published</div>
                    <div className="whitespace-pre-wrap rounded-xl border border-[#e2eaf2] bg-[#fbfdff] px-3 py-2 text-[12px] leading-5 text-[#475569]">{change.oldValue}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Draft</div>
                    <div className="whitespace-pre-wrap rounded-xl border border-[#cfe3ff] bg-[#f5faff] px-3 py-2 text-[12px] leading-5 text-[#0a1628]">{change.newValue}</div>
                  </div>
                </div>
              )) : (
                <div className="px-5 py-8 text-center text-[13px] text-[#94a3b8]">No changed fields were detected.</div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e2eaf2] bg-white p-5">
            <label className="mb-2 block text-[12px] font-black uppercase tracking-wide text-[#94a3b8]">Reviewer Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Add a note for the person who submitted this change."
              className="w-full resize-y rounded-xl border border-[#dbe7f3] px-3.5 py-3 text-[13px] text-[#0a1628] outline-none focus:border-[#1677f2]"
            />
            {!allowed && item.status !== "rejected" && (
              <p className="mt-2 text-[12px] text-amber-700">You can view this item, but you cannot review it.</p>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-[#e2eaf2] bg-[#fbfdff] px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={item.previewPath} target="_blank" className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2]">
              {item.type === "regulatory_update" ? "Review Regulatory Update" : "Preview"}
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              {item.type !== "regulatory_update" && (
                <button type="button" onClick={() => onAction("request_changes")} disabled={!allowed || !!actionLoading} className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-[12px] font-bold text-amber-700 disabled:cursor-not-allowed disabled:opacity-50">
                  {actionLoading === "request_changes" ? "Saving..." : "Request Changes"}
                </button>
              )}
              <button type="button" onClick={() => onAction("reject")} disabled={!allowed || !!actionLoading} className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[12px] font-bold text-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                {actionLoading === "reject" ? "Saving..." : "Reject"}
              </button>
              <button type="button" onClick={() => onAction("approve")} disabled={!allowed || !!actionLoading} className="rounded-xl bg-[#1677f2] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50">
                {actionLoading === "approve" ? "Publishing..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function ApprovalQueueClient({ initialItems, viewer }: Props) {
  const [items, setItems] = useState(initialItems);
  const [mode, setMode] = useState<FilterMode>("pending");
  const [submittedBy, setSubmittedBy] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selected, setSelected] = useState<ApprovalQueueItem | null>(null);
  const [comment, setComment] = useState("");
  const [actionLoading, setActionLoading] = useState<QueueAction | "">("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) =>
      filterItem(item, mode) &&
      matchesText(item, search) &&
      (!submittedBy.trim() || item.submittedBy.toLowerCase().includes(submittedBy.toLowerCase().trim())) &&
      isWithinRange(item, fromDate, toDate)
    );
  }, [fromDate, items, mode, search, submittedBy, toDate]);

  const counts = useMemo(() => ({
    pending: items.filter((item) => item.status === "pending_approval" || item.status === "pending_review" || !!item.hasPendingChanges).length,
    website: items.filter((item) => item.type === "content" && !item.key.startsWith("seo.") && item.status === "pending_approval").length,
    seo: items.filter((item) => item.type === "content" && item.key.startsWith("seo.") && item.status === "pending_approval").length,
    regulatory: items.filter((item) => item.type === "regulatory_update").length,
    blogs: items.filter((item) => item.type === "blog" && item.status === "pending_review").length,
    contentPages: items.filter((item) => item.type === "public_content_page").length,
    rejected: items.filter((item) => item.status === "rejected").length,
  }), [items]);

  function openItem(item: ApprovalQueueItem) {
    setSelected(item);
    setComment(item.reviewerComment ?? "");
    setError("");
    setNotice("");
  }

  async function handleAction(action: QueueAction) {
    if (!selected) return;
    setActionLoading(action);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/approval-queue/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          itemType: selected.type,
          key: selected.key,
          submittedBy: selected.submittedBy,
          action,
          comment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Review action failed.");
      setItems((current) => current.filter((item) => item.id !== selected.id));
      setSelected(null);
      setNotice(action === "approve" ? "Change approved." : action === "reject" ? "Change rejected." : "Changes requested.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Review action failed.");
    } finally {
      setActionLoading("");
    }
  }

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[22px] font-black text-[#0a1628]">Approval Queue</h1>
          <p className="mt-1 text-[13px] text-[#64748b]">Review pending website, SEO, blog and regulatory updates before they go live.</p>
        </div>
        <div className="rounded-2xl border border-[#e2eaf2] bg-white px-5 py-3 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
          <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Pending Changes</div>
          <div className="mt-1 text-[24px] font-black text-[#1677f2]">{counts.pending}</div>
        </div>
      </div>

      {(notice || error) && (
        <div className="mb-5">
          {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[13px] font-semibold text-green-700">{notice}</div>}
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">{error}</div>}
        </div>
      )}

      <div className="mb-5 rounded-2xl border border-[#e2eaf2] bg-white p-4 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
        <div className="mb-4 flex flex-wrap gap-2">
          <FilterButton active={mode === "pending"} onClick={() => setMode("pending")}>All Pending ({counts.pending})</FilterButton>
          <FilterButton active={mode === "website"} onClick={() => setMode("website")}>Website Content ({counts.website})</FilterButton>
          <FilterButton active={mode === "seo"} onClick={() => setMode("seo")}>SEO Changes ({counts.seo})</FilterButton>
          <FilterButton active={mode === "regulatory"} onClick={() => setMode("regulatory")}>Regulatory Updates ({counts.regulatory})</FilterButton>
          <FilterButton active={mode === "blogs"} onClick={() => setMode("blogs")}>Blogs ({counts.blogs})</FilterButton>
          <FilterButton active={mode === "content-pages"} onClick={() => setMode("content-pages")}>Content Pages ({counts.contentPages})</FilterButton>
          <FilterButton active={mode === "rejected"} onClick={() => setMode("rejected")}>Rejected ({counts.rejected})</FilterButton>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_160px_160px]">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search page or section" className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]" />
          <input value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} placeholder="Submitted by" className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]" />
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]" />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1677f2]" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8]">
          <span>Pending Changes</span>
          <span className="hidden lg:block">Submitted On</span>
          <span className="text-right">Actions</span>
        </div>

        {filtered.length ? (
          <div className="divide-y divide-[#f4f7fb]">
            {filtered.map((item) => {
              const allowed = canReview(viewer, item) && item.status !== "rejected";
              return (
                <div key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 hover:bg-[#fbfdff] lg:grid-cols-[1fr_auto_auto]">
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${statusMeta[item.status]?.cls ?? statusMeta.pending_approval.cls}`}>
                        {statusMeta[item.status]?.label ?? item.status}
                      </span>
                      <span className="text-[11px] font-bold text-[#94a3b8]">{item.pageName}</span>
                      {item.type === "regulatory_update" && (
                        <span className="rounded-full border border-[#cfe3ff] bg-[#f5faff] px-2.5 py-0.5 text-[10px] font-bold text-[#1677f2]">
                          {regulatoryStateLabel(item)}
                        </span>
                      )}
                    </div>
                    <div className="text-[14px] font-black text-[#0a1628]">{item.sectionName}</div>
                    <div className="mt-1 text-[12px] text-[#64748b]">
                      {item.type === "regulatory_update"
                        ? `${[item.regulator, item.category, item.impactLevel].filter(Boolean).join(" · ")} · Submitted By ${item.submittedBy || "Unknown"} · ${item.submittedByRole}`
                        : `${item.key} · Submitted By ${item.submittedBy || "Unknown"} · ${item.submittedByRole}`}
                    </div>
                  </div>
                  <div className="hidden text-right lg:block">
                    <div className="text-[12px] font-bold text-[#334155]">{formatIST(item.submittedAt)}</div>
                    <div className="mt-1 text-[11px] text-[#94a3b8]">Last updated {formatIST(item.updatedAt)}</div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={() => openItem(item)} className="rounded-lg border border-[#dbe7f3] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2]">
                      {item.type === "regulatory_update" ? "Details" : "Preview"}
                    </button>
                    <button type="button" onClick={() => openItem(item)} disabled={!allowed} className="rounded-lg bg-[#1677f2] px-3.5 py-1.5 text-[12px] font-bold text-white hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-45">Review</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4fc] text-[20px] font-black text-[#1677f2]">0</div>
            <p className="text-[14px] font-black text-[#0a1628]">No pending changes found</p>
            <p className="mt-1 text-[12px] text-[#94a3b8]">Try another filter or date range.</p>
          </div>
        )}
      </div>

      {selected && (
        <DetailDrawer
          item={selected}
          viewer={viewer}
          comment={comment}
          setComment={setComment}
          actionLoading={actionLoading}
          onClose={() => setSelected(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}
