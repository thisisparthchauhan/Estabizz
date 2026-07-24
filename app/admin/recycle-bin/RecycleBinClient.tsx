"use client";

import { useState, useCallback } from "react";
import type { RecycleBinItem, RecycleBinResult } from "@/lib/content/recycleBinTypes";
import { EstabizzSelect } from "@/components/ui/EstabizzSelect";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Viewer {
  email: string;
  role: string;
  permissions: string[];
}

interface Props {
  viewer: Viewer | null;
  initialResult: RecycleBinResult;
}

interface Toast { message: string; ok: boolean }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIST(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function typeLabel(type: string): string {
  if (type === "media")               return "Media";
  if (type === "content")             return "Website Content";
  if (type === "regulatory")          return "Regulatory Update";
  if (type === "public_content_page") return "Content Page";
  return type;
}

function statusBeforeLabel(originalStatus: string): string {
  const map: Record<string, string> = {
    active: "Active", published: "Published", draft: "Draft",
    pending_approval: "Pending Review", rejected: "Rejected", archived: "Archived",
  };
  return map[originalStatus] ?? (originalStatus || "—");
}

// ─── Sub-type badge ────────────────────────────────────────────────────────────

function SubTypeBadge({ subType }: { subType: string }) {
  const map: Record<string, string> = {
    "Image":          "bg-blue-50 text-blue-700 border-blue-200",
    "Icon / SVG":     "bg-purple-50 text-purple-700 border-purple-200",
    "PDF":            "bg-red-50 text-red-600 border-red-200",
    "Media File":     "bg-gray-50 text-gray-600 border-gray-200",
    "Website Section":"bg-amber-50 text-amber-700 border-amber-200",
    "SEO Block":      "bg-green-50 text-green-700 border-green-200",
    "Global Block":   "bg-cyan-50 text-cyan-700 border-cyan-200",
    "Regulatory Update":"bg-indigo-50 text-indigo-700 border-indigo-200",
    "Content Page":     "bg-teal-50 text-teal-700 border-teal-200",
  };
  const cls = map[subType] ?? "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${cls}`}>
      {subType}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RecycleBinClient({ viewer, initialResult }: Props) {
  const canView    = !!viewer?.permissions.includes("view_admin");
  const canRestore = !!viewer?.permissions.includes("delete_content");
  const canPurge   = !!viewer?.permissions.includes("purge_content");

  // List state
  const [result,     setResult]     = useState<RecycleBinResult>(initialResult);
  const [loading,    setLoading]    = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search,     setSearch]     = useState("");
  const [removedBy,  setRemovedBy]  = useState("");
  const [from,       setFrom]       = useState("");
  const [to,         setTo]         = useState("");

  // Detail drawer
  const [selected,   setSelected]   = useState<RecycleBinItem | null>(null);

  // Purge confirmation modal
  const [purgeTarget,  setPurgeTarget]  = useState<RecycleBinItem | null>(null);
  const [purgeText,    setPurgeText]    = useState("");
  const [purging,      setPurging]      = useState(false);
  const [purgeError,   setPurgeError]   = useState("");

  // Restore loading per-id
  const [restoringId, setRestoringId] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);
  function showToast(message: string, ok = true) {
    setToast({ message, ok });
    setTimeout(() => setToast(null), 3500);
  }

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchItems = useCallback(async (overrides: Record<string, string | number> = {}) => {
    setLoading(true);
    try {
      const p = new URLSearchParams({
        type:      typeFilter,
        search,
        removedBy,
        from,
        to,
        page:      "1",
        limit:     "25",
        ...Object.fromEntries(Object.entries(overrides).map(([k, v]) => [k, String(v)])),
      });
      const res  = await fetch(`/api/admin/recycle-bin?${p}`);
      const data = await res.json() as RecycleBinResult & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to load Recycle Bin.");
      setResult(data);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to load Recycle Bin.", false);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, search, removedBy, from, to]);

  function applyFilters() { fetchItems(); }

  function clearFilters() {
    setTypeFilter("all"); setSearch(""); setRemovedBy(""); setFrom(""); setTo("");
    fetchItems({ type: "all", search: "", removedBy: "", from: "", to: "" });
  }

  // ── Restore ───────────────────────────────────────────────────────────────

  async function handleRestore(item: RecycleBinItem) {
    setRestoringId(item.id);
    try {
      const res  = await fetch("/api/admin/recycle-bin/restore", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: item.id, type: item.type }),
      });
      const data = await res.json() as { success?: boolean; name?: string; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to restore item.");

      setResult(prev => ({ ...prev, items: prev.items.filter(i => i.id !== item.id), total: prev.total - 1 }));
      if (selected?.id === item.id) setSelected(null);
      showToast(`"${data.name ?? item.name}" restored successfully.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to restore item.", false);
    } finally {
      setRestoringId(null);
    }
  }

  // ── Purge ─────────────────────────────────────────────────────────────────

  function openPurge(item: RecycleBinItem) {
    setPurgeTarget(item);
    setPurgeText("");
    setPurgeError("");
  }

  function closePurge() {
    setPurgeTarget(null);
    setPurgeText("");
    setPurgeError("");
  }

  async function confirmPurge() {
    if (!purgeTarget) return;
    if (purgeText.trim().toUpperCase() !== "DELETE") {
      setPurgeError('Type DELETE (in capitals) to confirm permanent deletion.');
      return;
    }
    setPurging(true);
    setPurgeError("");
    try {
      const res  = await fetch("/api/admin/recycle-bin/purge", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: purgeTarget.id, type: purgeTarget.type, confirmText: "DELETE" }),
      });
      const data = await res.json() as { success?: boolean; name?: string; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to permanently delete item.");

      setResult(prev => ({ ...prev, items: prev.items.filter(i => i.id !== purgeTarget.id), total: prev.total - 1 }));
      if (selected?.id === purgeTarget.id) setSelected(null);
      showToast(`"${data.name ?? purgeTarget.name}" permanently deleted.`);
      closePurge();
    } catch (err) {
      setPurgeError(err instanceof Error ? err.message : "Unable to permanently delete item.");
    } finally {
      setPurging(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-full bg-[#f4f7fb]">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[9999] max-w-sm rounded-2xl border px-4 py-3 text-[13px] font-semibold shadow-xl ${
          toast.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"
        }`}>
          {toast.message}
        </div>
      )}

      {/* ── Purge confirmation modal ─────────────────────────────────────── */}
      {purgeTarget && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
             onClick={closePurge}>
          <div className="rounded-2xl border border-red-200 bg-white p-7 shadow-2xl max-w-sm w-full mx-4"
               onClick={e => e.stopPropagation()}>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
              </div>
              <div>
                <div className="text-[14px] font-black text-[#0a1628]">Permanent Delete</div>
                <div className="text-[11px] text-[#94a3b8]">This cannot be undone</div>
              </div>
            </div>

            <p className="text-[12px] text-[#475569] leading-5 mb-1">
              You are about to permanently delete:
            </p>
            <div className="mb-4 rounded-xl border border-[#e2eaf2] bg-[#f8fafc] px-3 py-2.5 text-[12px] font-bold text-[#0a1628]">
              {purgeTarget.name}
            </div>

            {purgeTarget.type === "public_content_page" ? (
              <>
                <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5 text-[11px] text-blue-800 leading-5">
                  Content Pages are protected from permanent deletion. This safeguard ensures the page does not revert to an older cached version of the site. Use <strong>Restore</strong> to bring the page back online.
                </div>
                <div className="mt-4 flex gap-3">
                  <button onClick={closePurge}
                    className="flex-1 rounded-xl bg-[#1677f2] px-4 py-2.5 text-[12px] font-black text-white hover:bg-[#1265d8] transition-colors">
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                {purgeTarget.type === "media" && (
                  <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11px] text-amber-800 leading-5">
                    The record will be removed from the library. The file on Cloudinary will not be deleted automatically — manual cleanup may be required.
                  </div>
                )}
                {purgeTarget.type === "content" && (
                  <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11px] text-amber-800 leading-5">
                    The content block will be deleted. The website will show the built-in default content for this section.
                  </div>
                )}
                {purgeTarget.type === "regulatory" && (
                  <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11px] text-amber-800 leading-5">
                    This regulatory update will be permanently removed. Its accountability record is kept for audit.
                  </div>
                )}

                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">
                  Type DELETE to confirm
                </label>
                <input
                  type="text"
                  value={purgeText}
                  onChange={e => setPurgeText(e.target.value)}
                  placeholder="DELETE"
                  className="mt-1 w-full rounded-xl border border-red-200 bg-white px-3 py-2.5 text-[13px] font-mono text-[#0a1628] uppercase placeholder:text-[#94a3b8] placeholder:normal-case placeholder:font-sans focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
                />

                {purgeError && (
                  <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-700">
                    {purgeError}
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={confirmPurge}
                    disabled={purging || purgeText.trim().toUpperCase() !== "DELETE"}
                    className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-[12px] font-black text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    {purging ? "Deleting…" : "Permanently Delete"}
                  </button>
                  <button onClick={closePurge} className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[12px] font-bold text-[#475569] hover:text-[#0a1628]">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Detail drawer ────────────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-[7000] flex items-start justify-end bg-black/30 backdrop-blur-sm"
             onClick={() => setSelected(null)}>
          <div className="h-full w-full max-w-[400px] overflow-y-auto bg-white shadow-2xl flex flex-col"
               onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e2eaf2] px-6 py-4">
              <div className="text-[14px] font-black text-[#0a1628]">Item Details</div>
              <button onClick={() => setSelected(null)} className="rounded-xl p-2 text-[#94a3b8] hover:bg-[#f4f7fb] hover:text-[#0a1628]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Preview (media only) */}
            {selected.previewUrl && (
              <div className="border-b border-[#f0f4f8] bg-[#f8fafc] p-4">
                {selected.subType === "PDF" ? (
                  <div className="flex items-center justify-center h-24 rounded-xl border border-[#e2eaf2] bg-white">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                ) : (
                  <img
                    src={selected.previewUrl}
                    alt={selected.name}
                    className="h-40 w-full object-contain rounded-xl border border-[#e2eaf2] bg-white"
                  />
                )}
              </div>
            )}

            {/* Details */}
            <div className="flex-1 px-6 py-5 space-y-4">
              <DetailRow label="Name"          value={selected.name} />
              <DetailRow label="Item Type"     value={selected.subType} />
              <DetailRow label="Category"      value={typeLabel(selected.type)} />
              {selected.location && <DetailRow label="Original Location" value={selected.location} />}
              {selected.contentKey && <DetailRow label="Content Key"    value={selected.contentKey} />}
              <DetailRow label="Deleted By"   value={selected.removedBy} />
              <DetailRow label="Deleted On"   value={formatIST(selected.removedAt)} />
              <DetailRow label="Status Before" value={statusBeforeLabel(selected.originalStatus)} />
            </div>

            {/* Actions */}
            <div className="border-t border-[#e2eaf2] px-6 py-4 space-y-3">
              {canRestore && (
                <button
                  onClick={() => handleRestore(selected)}
                  disabled={restoringId === selected.id}
                  className="w-full rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-black text-white hover:bg-[#1265d8] disabled:opacity-60 transition-colors"
                >
                  {restoringId === selected.id ? "Restoring…" : "Restore Item"}
                </button>
              )}
              {canPurge && (
                <button
                  onClick={() => { setSelected(null); openPurge(selected); }}
                  className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[12px] font-black text-red-700 hover:bg-red-100 transition-colors"
                >
                  Permanent Delete
                </button>
              )}
              {!canRestore && !canPurge && (
                <div className="rounded-xl border border-[#e2eaf2] bg-[#f8fafc] px-4 py-3 text-[11px] text-[#94a3b8] text-center">
                  You do not have permission to restore or delete items.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Page body ─────────────────────────────────────────────────────── */}
      <div className="p-6 lg:p-8 space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[21px] font-black text-[#0a1628]">Recycle Bin</h1>
            <p className="mt-0.5 text-[13px] text-[#64748b]">
              Removed items. Restore them or permanently delete.
              {result.total > 0 && (
                <span className="ml-1 font-semibold text-[#0a1628]">{result.total} item{result.total !== 1 ? "s" : ""}</span>
              )}
            </p>
          </div>
        </div>

        {/* No permission */}
        {!canView && (
          <div className="rounded-2xl border border-[#e2eaf2] bg-white p-8 text-center shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
            <div className="text-[15px] font-black text-[#0a1628] mb-1">Access Restricted</div>
            <p className="text-[13px] text-[#64748b] max-w-xs mx-auto leading-5">
              You do not have permission to view the Recycle Bin.
            </p>
          </div>
        )}

        {canView && (
          <>
            {/* ── Filter bar ──────────────────────────────────────────────── */}
            <div className="rounded-2xl border border-[#e2eaf2] bg-white p-4 shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
              <div className="flex flex-wrap gap-3 items-end">

                {/* Search */}
                <div className="flex-1 min-w-[180px]">
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-1 block">Search Removed Items</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                      type="text" value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Name or key…"
                      className="w-full rounded-xl border border-[#dbe7f3] bg-white py-2 pl-8 pr-3 text-[12px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                    />
                  </div>
                </div>

                {/* Type filter */}
                <div className="min-w-[140px]">
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-1 block">Item Type</label>
                  <EstabizzSelect
                    variant="admin"
                    value={typeFilter}
                    onValueChange={(v) => setTypeFilter(v)}
                    options={[
                      { value: "all", label: "All Types" },
                      { value: "media", label: "Media" },
                      { value: "content", label: "Website Content" },
                      { value: "regulatory", label: "Regulatory Updates" },
                      { value: "public_content_page", label: "Content Pages" },
                    ]}
                  />
                </div>

                {/* Deleted by */}
                <div className="min-w-[150px]">
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-1 block">Deleted By</label>
                  <input
                    type="text" value={removedBy} onChange={e => setRemovedBy(e.target.value)}
                    placeholder="Email…"
                    className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2 text-[12px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  />
                </div>

                {/* Date from */}
                <div className="min-w-[130px]">
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-1 block">From Date</label>
                  <input type="date" value={from} onChange={e => setFrom(e.target.value)}
                    className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2 text-[12px] text-[#475569] focus:border-[#1677f2] focus:outline-none" />
                </div>

                {/* Date to */}
                <div className="min-w-[130px]">
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-1 block">To Date</label>
                  <input type="date" value={to} onChange={e => setTo(e.target.value)}
                    className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2 text-[12px] text-[#475569] focus:border-[#1677f2] focus:outline-none" />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 self-end pb-0.5">
                  <button onClick={applyFilters} disabled={loading}
                    className="rounded-xl bg-[#1677f2] px-4 py-2 text-[12px] font-black text-white hover:bg-[#1265d8] disabled:opacity-60 transition-colors">
                    {loading ? "Loading…" : "Apply"}
                  </button>
                  <button onClick={clearFilters}
                    className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#475569] hover:text-[#0a1628] transition-colors">
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* ── Items table ──────────────────────────────────────────────── */}
            {result.items.length === 0 ? (
              <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-[#dbe7f3] bg-white text-center">
                <svg className="mb-3 text-[#cbd5e1]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
                </svg>
                <div className="text-[14px] font-black text-[#0a1628] mb-1">Recycle Bin is Empty</div>
                <div className="text-[12px] text-[#94a3b8]">
                  {typeFilter !== "all" || search || removedBy || from || to
                    ? "No items match your current filters."
                    : "Removed media and deleted content sections will appear here."}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#f0f4f8] bg-[#f8fafc]">
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Name</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden md:table-cell">Type</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Original Location</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Deleted By</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Deleted On</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f7fb]">
                    {result.items.map(item => (
                      <tr key={item.id} className="hover:bg-[#fafcff] transition-colors">

                        {/* Name + subtype */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            {item.previewUrl && item.subType !== "PDF" ? (
                              <img src={item.previewUrl} alt={item.name}
                                className="h-8 w-8 rounded-lg object-cover border border-[#e2eaf2] shrink-0" />
                            ) : (
                              <div className="h-8 w-8 rounded-lg border border-[#e2eaf2] bg-[#f8fafc] flex items-center justify-center shrink-0">
                                {item.type === "content" || item.type === "regulatory" || item.type === "public_content_page" ? (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
                                  </svg>
                                ) : (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                                  </svg>
                                )}
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-[#0a1628] leading-tight truncate max-w-[180px]">{item.name}</div>
                              <div className="mt-0.5 md:hidden"><SubTypeBadge subType={item.subType} /></div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 hidden md:table-cell"><SubTypeBadge subType={item.subType} /></td>
                        <td className="px-4 py-3.5 text-[#64748b] hidden lg:table-cell truncate max-w-[180px]">{item.location ?? "—"}</td>
                        <td className="px-4 py-3.5 text-[#64748b] hidden lg:table-cell">{item.removedBy}</td>
                        <td className="px-4 py-3.5 text-[#64748b]">{formatIST(item.removedAt)}</td>

                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            <button
                              onClick={() => setSelected(item)}
                              className="rounded-xl border border-[#e2eaf2] bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
                            >
                              Details
                            </button>
                            {canRestore && (
                              <button
                                onClick={() => handleRestore(item)}
                                disabled={restoringId === item.id}
                                className="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 disabled:opacity-60 transition-colors"
                              >
                                {restoringId === item.id ? "…" : "Restore"}
                              </button>
                            )}
                            {canPurge && (
                              <button
                                onClick={() => openPurge(item)}
                                className="rounded-xl border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] font-bold text-red-600 hover:bg-red-100 transition-colors"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer */}
                <div className="border-t border-[#f0f4f8] bg-[#f8fafc] px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] text-[#94a3b8]">
                    Showing {result.items.length} of {result.total} removed item{result.total !== 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center gap-3 text-[11px] text-[#94a3b8]">
                    {canRestore && <span>Restore returns item to active use.</span>}
                    {canPurge   && <span className="text-red-400">Permanent Delete cannot be undone.</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Info panel */}
            <div className="rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
              <div className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8] mb-3">About the Recycle Bin</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-[11px] text-[#64748b]">
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Media items</div>
                  Files removed from the Media Library. Restore to make them active again. Permanent delete removes the library record but does not delete the file from Cloudinary.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Website content</div>
                  Deleted content sections. Restore sets the section to Draft — it needs to be reviewed and published before going live again.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Regulatory updates</div>
                  Deleted regulatory updates. Restore returns the update to the status it had before deletion (a published update goes back live).
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Permissions</div>
                  Restore: requires delete_content permission. Permanent Delete: requires purge_content permission (Super Admin only).
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Small helper component ────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">{label}</div>
      <div className="mt-0.5 text-[12px] text-[#0a1628] font-medium break-words">{value || "—"}</div>
    </div>
  );
}
