"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { RestoreListResult, RestoreVersionItem } from "@/lib/content/restoreTypes";

interface Props {
  initialVersions: RestoreListResult;
  viewerEmail: string;
}

type TypeFilter = "all" | "website" | "seo" | "blogs";

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All versions" },
  { value: "website", label: "Website content" },
  { value: "seo", label: "SEO changes" },
  { value: "blogs", label: "Blogs" },
];

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

function areaLabel(item: RestoreVersionItem): string {
  if (item.type === "seo") return "SEO changes";
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

function SnapshotBox({
  title,
  fields,
}: {
  title: string;
  fields: RestoreVersionItem["currentSnapshot"];
}) {
  return (
    <div className="rounded-2xl border border-[#e2eaf2] bg-white">
      <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-5 py-3">
        <h3 className="text-[12px] font-black uppercase tracking-wide text-[#94a3b8]">{title}</h3>
      </div>
      <div className="divide-y divide-[#f4f7fb]">
        {fields.length ? fields.map((field) => (
          <div key={`${title}-${field.field}`} className="grid gap-2 px-5 py-3 sm:grid-cols-[150px_1fr]">
            <div className="text-[11px] font-black text-[#0a1628]">{field.field}</div>
            <div className="break-words text-[12px] leading-5 text-[#475569]">{field.value}</div>
          </div>
        )) : (
          <div className="px-5 py-6 text-[12px] text-[#94a3b8]">No saved fields are available.</div>
        )}
      </div>
    </div>
  );
}

function DetailDrawer({
  item,
  confirmText,
  setConfirmText,
  restoreLoading,
  onClose,
  onRestore,
}: {
  item: RestoreVersionItem;
  confirmText: string;
  setConfirmText: (value: string) => void;
  restoreLoading: boolean;
  onClose: () => void;
  onRestore: () => void;
}) {
  const canConfirm = confirmText.trim().toUpperCase() === "RESTORE";
  const changedFields = item.changedFields.slice(0, 100);

  return (
    <div className="fixed inset-0 z-[3100] flex items-stretch">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="flex w-full max-w-[980px] flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.30)]">
        <div className="shrink-0 border-b border-[#e2eaf2] bg-[#fbfdff] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                  {item.versionStatus}
                </span>
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
              ["Content Key", item.contentKey],
              ["Selected Version", formatIST(item.createdAt)],
              ["Created By", item.createdBy || "Unknown"],
              ["Role", item.createdByRole || "Unknown"],
              ["Last Published", formatIST(item.lastPublishedAt)],
              ["Summary", item.summary],
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
              <span>Current</span>
              <span>Selected Version</span>
            </div>
            <div className="divide-y divide-[#f0f4f8]">
              {changedFields.length ? changedFields.map((change, index) => (
                <div key={`${change.field}-${index}`} className="grid gap-3 px-5 py-4 lg:grid-cols-[160px_1fr_1fr]">
                  <div className="text-[12px] font-black text-[#0a1628]">{change.field}</div>
                  <div className="whitespace-pre-wrap rounded-xl border border-[#e2eaf2] bg-[#fbfdff] px-3 py-2 text-[12px] leading-5 text-[#475569]">
                    {change.currentValue}
                  </div>
                  <div className="whitespace-pre-wrap rounded-xl border border-[#cfe3ff] bg-[#f5faff] px-3 py-2 text-[12px] leading-5 text-[#0a1628]">
                    {change.selectedValue}
                  </div>
                </div>
              )) : (
                <div className="px-5 py-8 text-center text-[13px] text-[#94a3b8]">This version already matches the current live content.</div>
              )}
            </div>
          </div>

          <div className="mb-5 grid gap-5 lg:grid-cols-2">
            <SnapshotBox title="Current Live Version" fields={item.currentSnapshot} />
            <SnapshotBox title="Selected Version" fields={item.selectedSnapshot} />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="text-[13px] font-black text-amber-800">Confirm Restore</h3>
            <p className="mt-2 text-[13px] leading-6 text-amber-800">
              You are about to restore this section to a previous version. This will replace the current live content. A new history record will be created.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type RESTORE to confirm"
                className="rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-[13px] font-bold text-[#0a1628] outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={onRestore}
                disabled={!item.canRestore || !canConfirm || restoreLoading}
                className="rounded-xl bg-[#1677f2] px-5 py-2.5 text-[12px] font-black text-white hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {restoreLoading ? "Restoring..." : "Restore This Version"}
              </button>
            </div>
            {!item.canRestore && (
              <p className="mt-3 text-[12px] font-semibold text-amber-800">
                You can view this version, but it cannot be restored from this account or it already matches the live content.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function RestoreClient({ initialVersions, viewerEmail }: Props) {
  const [versions, setVersions] = useState(initialVersions);
  const [type, setType] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");
  const [changedBy, setChangedBy] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<RestoreVersionItem | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: "25",
      type,
    });
    if (search.trim()) params.set("search", search.trim());
    if (changedBy.trim()) params.set("changedBy", changedBy.trim());
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    return params.toString();
  }, [changedBy, fromDate, page, search, toDate, type]);

  const loadVersions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/restore?${query}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to load previous versions.");
      setVersions(data as RestoreListResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load previous versions.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadVersions();
    }, 200);
    return () => window.clearTimeout(timer);
  }, [loadVersions]);

  function resetPageAnd(setter: () => void) {
    setPage(1);
    setter();
  }

  function openItem(item: RestoreVersionItem) {
    setSelected(item);
    setConfirmText("");
    setNotice("");
    setError("");
  }

  async function handleRestore() {
    if (!selected) return;
    setRestoreLoading(true);
    setNotice("");
    setError("");
    try {
      const res = await fetch("/api/admin/restore/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ versionId: selected.versionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to restore this version.");
      setSelected(null);
      setConfirmText("");
      setNotice("Version restored. A new history record was created.");
      await loadVersions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to restore this version.");
    } finally {
      setRestoreLoading(false);
    }
  }

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[22px] font-black text-[#0a1628]">Restore</h1>
          <p className="mt-1 text-[13px] text-[#64748b]">Review previous published versions and restore live content when needed.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e2eaf2] bg-white px-5 py-3 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
            <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Previous Versions</div>
            <div className="mt-1 text-[24px] font-black text-[#1677f2]">{versions.total}</div>
          </div>
          <div className="rounded-2xl border border-[#e2eaf2] bg-white px-5 py-3 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
            <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Viewing As</div>
            <div className="mt-1 max-w-[220px] truncate text-[13px] font-black text-[#0a1628]">{viewerEmail || "Admin"}</div>
          </div>
        </div>
      </div>

      {(notice || error) && (
        <div className="mb-5 space-y-2">
          {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[13px] font-semibold text-green-700">{notice}</div>}
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">{error}</div>}
        </div>
      )}

      <div className="mb-5 rounded-2xl border border-[#e2eaf2] bg-white p-4 shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
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
            placeholder="Created by"
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
        <div className="hidden grid-cols-[1fr_1fr_0.75fr_1fr_1fr_150px] gap-4 border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] lg:grid">
          <span>Page</span>
          <span>Section</span>
          <span>Status</span>
          <span>Created By</span>
          <span>Created On</span>
          <span className="text-right">Actions</span>
        </div>

        {loading && (
          <div className="border-b border-[#f4f7fb] px-6 py-3 text-[12px] font-bold text-[#64748b]">Loading previous versions...</div>
        )}

        {versions.items.length ? (
          <div className="divide-y divide-[#f4f7fb]">
            {versions.items.map((item) => (
              <div key={item.id} className="grid gap-4 px-6 py-4 hover:bg-[#fbfdff] lg:grid-cols-[1fr_1fr_0.75fr_1fr_1fr_150px] lg:items-center">
                <div className="min-w-0">
                  <div className="text-[13px] font-black text-[#0a1628]">{item.pageName}</div>
                  <div className="mt-1 text-[11px] font-bold text-[#94a3b8]">{areaLabel(item)}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-[#334155]">{item.sectionName}</div>
                  <div className="mt-1 truncate text-[11px] text-[#94a3b8]">{item.contentKey}</div>
                </div>
                <div>
                  <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">{item.versionStatus}</span>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">{item.summary}</div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-bold text-[#334155]">{item.createdBy || "Unknown"}</div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">{item.createdByRole || "Unknown"}</div>
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#334155]">{formatIST(item.createdAt)}</div>
                  <div className="mt-1 text-[11px] text-[#94a3b8]">Last published {formatIST(item.lastPublishedAt)}</div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    className="rounded-lg border border-[#dbe7f3] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    disabled={!item.canRestore}
                    className="rounded-lg bg-[#1677f2] px-3.5 py-1.5 text-[12px] font-bold text-white hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4fc] text-[20px] font-black text-[#1677f2]">0</div>
            <p className="text-[14px] font-black text-[#0a1628]">No previous versions found</p>
            <p className="mt-1 text-[12px] text-[#94a3b8]">Try another filter or date range.</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[12px] font-bold text-[#64748b]">
          Page {versions.page} of {versions.totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={versions.page <= 1 || loading}
            className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(versions.totalPages, current + 1))}
            disabled={versions.page >= versions.totalPages || loading}
            className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {selected && (
        <DetailDrawer
          item={selected}
          confirmText={confirmText}
          setConfirmText={setConfirmText}
          restoreLoading={restoreLoading}
          onClose={() => setSelected(null)}
          onRestore={handleRestore}
        />
      )}
    </div>
  );
}
