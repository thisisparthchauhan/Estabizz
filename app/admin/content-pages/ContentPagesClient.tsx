"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AdminContext } from "@/lib/admin/requirePermission";

type ImportStatus =
  | "importable"
  | "needs_manual_mapping"
  | "redirect/alias"
  | "excluded_for_now"
  | "skipped_existing";

interface InventorySummary {
  total: number;
  importable: number;
  needsManualMapping: number;
  redirectsAliases: number;
  skipped: number;
  existingDbMatches: number;
  dbChecked: boolean;
}

interface InventoryItem {
  fullPath: string;
  title: string;
  pageType: string;
  menuGroup: string;
  regulator: string;
  sourceFile: string;
  importStatus: ImportStatus;
  reason: string;
  slug: string;
  existingDbMatch: boolean;
}

interface InventoryResponse {
  summary: InventorySummary;
  items: InventoryItem[];
}

const EMPTY_SUMMARY: InventorySummary = {
  total: 0,
  importable: 0,
  needsManualMapping: 0,
  redirectsAliases: 0,
  skipped: 0,
  existingDbMatches: 0,
  dbChecked: false,
};

const STATUS_LABELS: Record<ImportStatus, string> = {
  importable: "Ready for Import",
  needs_manual_mapping: "Needs Mapping",
  "redirect/alias": "Redirect / Alias",
  excluded_for_now: "Skipped",
  skipped_existing: "Already in CMS",
};

const STATUS_STYLES: Record<ImportStatus, string> = {
  importable: "border-green-200 bg-green-50 text-green-700",
  needs_manual_mapping: "border-amber-200 bg-amber-50 text-amber-700",
  "redirect/alias": "border-slate-200 bg-slate-50 text-slate-600",
  excluded_for_now: "border-zinc-200 bg-zinc-50 text-zinc-600",
  skipped_existing: "border-blue-200 bg-blue-50 text-blue-700",
};

const SAMPLE_EDITOR_PATH = "/rbi/nbfc-registration-in-india";
const SAMPLE_EDITOR_ROUTE = "/admin/content-pages/nbfc-registration-in-india/edit";

function labelise(value: string): string {
  if (!value) return "All";
  if (value === "19_5") return "19/5";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function unique(items: InventoryItem[], key: keyof InventoryItem): string[] {
  return Array.from(new Set(items.map((item) => String(item[key] || "")).filter(Boolean))).sort();
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-[0_8px_24px_rgba(0,80,140,0.05)]">
      <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">{label}</div>
      <div className="mt-2 text-[28px] font-black tracking-tight text-[#120b45]">{value}</div>
    </div>
  );
}

export default function ContentPagesClient({ viewer }: { viewer: AdminContext | null }) {
  const canView = viewer?.permissions.includes("view_admin") ?? false;
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [summary, setSummary] = useState<InventorySummary>(EMPTY_SUMMARY);
  const [loading, setLoading] = useState(canView);
  const [error, setError] = useState("");
  const [copiedPath, setCopiedPath] = useState("");

  const [search, setSearch] = useState("");
  const [menuGroup, setMenuGroup] = useState("all");
  const [pageType, setPageType] = useState("all");
  const [regulator, setRegulator] = useState("all");
  const [importStatus, setImportStatus] = useState("all");

  useEffect(() => {
    if (!canView) return;

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/content-pages/inventory");
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as InventoryResponse;
        if (!cancelled) {
          setItems(data.items ?? []);
          setSummary(data.summary ?? EMPTY_SUMMARY);
        }
      } catch {
        if (!cancelled) setError("Unable to load content pages. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [canView]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const haystack = `${item.title} ${item.fullPath} ${item.slug} ${item.sourceFile}`.toLowerCase();
      if (query && !haystack.includes(query)) return false;
      if (menuGroup !== "all" && item.menuGroup !== menuGroup) return false;
      if (pageType !== "all" && item.pageType !== pageType) return false;
      if (regulator !== "all" && item.regulator !== regulator) return false;
      if (importStatus !== "all" && item.importStatus !== importStatus) return false;
      return true;
    });
  }, [items, search, menuGroup, pageType, regulator, importStatus]);

  const menuGroupOptions = useMemo(() => unique(items, "menuGroup"), [items]);
  const pageTypeOptions = useMemo(() => unique(items, "pageType"), [items]);
  const regulatorOptions = useMemo(() => unique(items, "regulator"), [items]);
  const statusOptions = useMemo(() => unique(items, "importStatus"), [items]);

  async function copyPath(path: string) {
    try {
      await navigator.clipboard.writeText(path);
      setCopiedPath(path);
      setTimeout(() => setCopiedPath(""), 1800);
    } catch {
      setCopiedPath("");
    }
  }

  if (!canView) {
    return (
      <div className="min-h-[60vh] bg-[#f6f9ff] p-6">
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-[#120b45]">Content Pages</h1>
          <p className="mt-2 text-sm font-medium text-[#64748b]">You do not have access to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] p-5 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-[28px] font-black tracking-tight text-[#120b45]">Public Content Pages</h1>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#64748b]">
              Review existing public service, regulatory, resource, legal and 19/5 pages before CMS setup.
            </p>
          </div>
          <div className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold text-[#1677f2] shadow-sm">
            Read-only inventory
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <SummaryCard label="Total" value={summary.total} />
          <SummaryCard label="Importable" value={summary.importable} />
          <SummaryCard label="Needs Mapping" value={summary.needsManualMapping} />
          <SummaryCard label="Redirects / Aliases" value={summary.redirectsAliases} />
          <SummaryCard label="Skipped" value={summary.skipped} />
          <SummaryCard label="Existing in CMS" value={summary.existingDbMatches} />
        </div>

        <div className="mb-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,80,140,0.05)]">
          <div className="grid gap-3 lg:grid-cols-[minmax(260px,1.4fr)_repeat(4,minmax(150px,1fr))]">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">Search</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, path, slug or source file"
                className="h-11 w-full rounded-xl border border-blue-100 bg-[#f8fbff] px-3 text-sm font-medium text-[#0a1628] outline-none transition focus:border-[#1677f2] focus:ring-4 focus:ring-[#1677f2]/10"
              />
            </label>

            {[
              ["Menu Group", menuGroup, setMenuGroup, menuGroupOptions],
              ["Page Type", pageType, setPageType, pageTypeOptions],
              ["Regulator", regulator, setRegulator, regulatorOptions],
              ["Import Status", importStatus, setImportStatus, statusOptions],
            ].map(([label, value, setter, options]) => (
              <label key={label as string} className="block">
                <span className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">{label as string}</span>
                <select
                  value={value as string}
                  onChange={(event) => (setter as React.Dispatch<React.SetStateAction<string>>)(event.target.value)}
                  className="h-11 w-full rounded-xl border border-blue-100 bg-[#f8fbff] px-3 text-sm font-bold text-[#0a1628] outline-none transition focus:border-[#1677f2] focus:ring-4 focus:ring-[#1677f2]/10"
                >
                  <option value="all">All</option>
                  {(options as string[]).map((option) => (
                    <option key={option} value={option}>
                      {option in STATUS_LABELS ? STATUS_LABELS[option as ImportStatus] : labelise(option)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_14px_42px_rgba(0,80,140,0.07)]">
          <div className="flex items-center justify-between border-b border-blue-50 px-4 py-3">
            <div className="text-sm font-black text-[#0a1628]">{filtered.length} pages shown</div>
            {loading && <div className="text-xs font-bold text-[#64748b]">Loading pages...</div>}
            {error && <div className="text-xs font-bold text-red-600">{error}</div>}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1280px] w-full text-left">
              <thead className="bg-[#f8fbff] text-[11px] font-black uppercase tracking-[0.12em] text-[#64748b]">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Path</th>
                  <th className="px-4 py-3">Menu Group</th>
                  <th className="px-4 py-3">Page Type</th>
                  <th className="px-4 py-3">Regulator</th>
                  <th className="px-4 py-3">Import Status</th>
                  <th className="px-4 py-3">Source File</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Visual Editor</th>
                  <th className="px-4 py-3">Open Page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {filtered.map((item) => {
                  const canOpen = item.fullPath.startsWith("/") && !item.fullPath.includes("[");
                  return (
                    <tr key={`${item.fullPath}-${item.sourceFile}`} className="align-top hover:bg-[#f8fbff]">
                      <td className="max-w-[260px] px-4 py-3">
                        <div className="text-sm font-black leading-snug text-[#0a1628]">{item.title}</div>
                        <div className="mt-1 text-[11px] font-semibold text-[#94a3b8]">{item.slug}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <code className="rounded-lg bg-blue-50 px-2 py-1 text-[12px] font-bold text-[#0a2b58]">{item.fullPath}</code>
                          <button
                            type="button"
                            onClick={() => copyPath(item.fullPath)}
                            className="rounded-lg border border-blue-100 px-2 py-1 text-[11px] font-black text-[#1677f2] transition hover:border-[#1677f2]"
                          >
                            {copiedPath === item.fullPath ? "Copied" : "Copy Path"}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#334155]">{labelise(item.menuGroup)}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#334155]">{labelise(item.pageType)}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#334155]">{item.regulator}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black ${STATUS_STYLES[item.importStatus]}`}>
                          {STATUS_LABELS[item.importStatus]}
                        </span>
                      </td>
                      <td className="max-w-[260px] px-4 py-3 text-[12px] font-semibold leading-5 text-[#64748b]">{item.sourceFile}</td>
                      <td className="max-w-[320px] px-4 py-3 text-[12px] font-medium leading-5 text-[#64748b]">{item.reason}</td>
                      <td className="px-4 py-3">
                        {item.fullPath === SAMPLE_EDITOR_PATH && item.existingDbMatch ? (
                          <a
                            href={SAMPLE_EDITOR_ROUTE}
                            className="inline-flex rounded-lg bg-[#0a1628] px-3 py-2 text-[12px] font-black text-white transition hover:bg-[#1677f2]"
                          >
                            Open Editor
                          </a>
                        ) : (
                          <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-black text-slate-500">
                            Coming Soon
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {canOpen ? (
                          <a
                            href={item.fullPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-lg bg-[#1677f2] px-3 py-2 text-[12px] font-black text-white transition hover:bg-[#0866d9]"
                          >
                            Open Page
                          </a>
                        ) : (
                          <span className="text-[12px] font-semibold text-[#94a3b8]">Not available</span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-sm font-semibold text-[#64748b]">
                      No content pages found for this view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
