"use client";

import { useState, type ReactNode } from "react";
import type { SeoContent } from "@/lib/content/seoDefaults";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SeoPageItem {
  key: string;
  label: string;
  path: string;
  group: string;
  defaults: SeoContent;
  current: SeoContent;
  status: "published" | "draft" | "pending_approval" | "rejected" | "default";
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
}

interface Viewer { email: string; role: string; permissions: string[] }
interface Props {
  viewer: Viewer | null;
  pages: SeoPageItem[];
}
interface Toast { msg: string; ok: boolean }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIST(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SeoPageItem["status"] }) {
  const map: Record<string, { cls: string; label: string }> = {
    published:        { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Live" },
    draft:            { cls: "bg-[#f8fafc] text-[#64748b] border-[#e2eaf2]",     label: "Draft" },
    pending_approval: { cls: "bg-amber-50 text-amber-700 border-amber-200",       label: "Pending" },
    rejected:         { cls: "bg-red-50 text-red-600 border-red-200",             label: "Rejected" },
    default:          { cls: "bg-[#f0f4f8] text-[#94a3b8] border-[#dbe7f3]",     label: "Default" },
  };
  const { cls, label } = map[status] ?? map.default;
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${cls}`}>
      {label}
    </span>
  );
}

// ─── Char counter ─────────────────────────────────────────────────────────────

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const over = len > max;
  const near = len > max * 0.9;
  return (
    <span className={`text-[10px] font-semibold tabular-nums ${over ? "text-red-500" : near ? "text-amber-500" : "text-[#94a3b8]"}`}>
      {len}/{max}
    </span>
  );
}

// ─── Toggle ──────────────────────────────────────────────────────────────────

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex items-center gap-2 group"
      aria-label={label}
    >
      <span className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 transition-colors ${on ? "border-[#1677f2] bg-[#1677f2]" : "border-[#cbd5e1] bg-[#e2eaf2]"}`}>
        <span className={`inline-block h-3.5 w-3.5 translate-y-[-1px] rounded-full bg-white shadow transition-transform ${on ? "translate-x-[14px]" : "translate-x-[1px]"}`} />
      </span>
      <span className={`text-[12px] font-semibold ${on ? "text-[#0a1628]" : "text-[#94a3b8]"}`}>{label}</span>
    </button>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[11px] font-black uppercase tracking-wide text-[#64748b]">{label}</label>
        {hint && <span className="text-[10px] text-[#94a3b8]">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, maxLength }: {
  value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full rounded-xl border border-[#e2eaf2] dark:border-[#223550] bg-[#f8fafc] dark:bg-[#12223a] px-3 py-2 text-[12px] text-[#0a1628] dark:text-[#f7f9fc] placeholder:text-[#cbd5e1] dark:placeholder:text-[#64748b] focus:border-[#1677f2] focus:bg-white dark:focus:bg-[#0d1a2d] focus:outline-none transition-colors"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl border border-[#e2eaf2] bg-[#f8fafc] px-3 py-2 text-[12px] text-[#0a1628] placeholder:text-[#cbd5e1] focus:border-[#1677f2] focus:bg-white focus:outline-none transition-colors leading-5"
    />
  );
}

// ─── SEO warnings ─────────────────────────────────────────────────────────────

function SeoWarnings({ draft }: { draft: Partial<SeoContent> }) {
  const warnings: string[] = [];
  const titleLen = (draft.seoTitle ?? "").length;
  const descLen  = (draft.metaDescription ?? "").length;
  if (titleLen > 0 && titleLen < 30)    warnings.push("Title is short — aim for 30–60 characters.");
  if (titleLen > 60)                     warnings.push("Title exceeds 60 characters and may be cut off in search results.");
  if (descLen  > 0 && descLen  < 100)   warnings.push("Description is short — aim for 100–160 characters.");
  if (descLen  > 160)                    warnings.push("Description exceeds 160 characters and may be truncated.");
  if (!draft.focusKeyword?.trim())       warnings.push("No focus keyword set — consider adding one.");
  if (warnings.length === 0) return null;
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 space-y-1.5">
      <div className="text-[10px] font-black uppercase tracking-wide text-amber-600">SEO Notes</div>
      {warnings.map(w => (
        <div key={w} className="flex items-start gap-1.5 text-[11px] text-amber-800 leading-4">
          <span className="mt-0.5 shrink-0 text-amber-500">•</span>{w}
        </div>
      ))}
    </div>
  );
}

// ─── OG image preview ─────────────────────────────────────────────────────────

function ImagePreview({ url }: { url: string }) {
  if (!url.trim()) return null;
  return (
    <div className="mt-1.5 overflow-hidden rounded-xl border border-[#e2eaf2] dark:border-[#223550] bg-[#f8fafc] dark:bg-[#12223a]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Social image preview" className="h-24 w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
    </div>
  );
}

// ─── Drawer section header ────────────────────────────────────────────────────

function DrawerSection({ title }: { title: string }) {
  return (
    <div className="border-b border-[#f0f4f8] pb-1 mb-3 mt-2">
      <span className="text-[10px] font-black uppercase tracking-wider text-[#94a3b8]">{title}</span>
    </div>
  );
}

// ─── GROUP ORDER ──────────────────────────────────────────────────────────────

const GROUP_ORDER = ["Main Pages", "Regulatory Hubs", "Business Services", "Legal & System"];

// ─── Main component ───────────────────────────────────────────────────────────

export default function PageSeoClient({ viewer, pages: initialPages }: Props) {
  const canView  = !!viewer?.permissions.includes("view_admin");
  const canEdit  = !!viewer?.permissions.includes("manage_seo");

  const [pages,   setPages]   = useState<SeoPageItem[]>(initialPages);
  const [editing, setEditing] = useState<SeoPageItem | null>(null);
  const [draft,   setDraft]   = useState<Partial<SeoContent>>({});
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState<Toast | null>(null);
  const [search,  setSearch]  = useState("");

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4500);
  }

  function openEdit(page: SeoPageItem) {
    setEditing(page);
    setDraft({ ...page.current });
  }

  function closeDrawer() {
    if (saving) return;
    setEditing(null);
    setDraft({});
  }

  function set<K extends keyof SeoContent>(field: K, value: SeoContent[K]) {
    setDraft(prev => ({ ...prev, [field]: value }));
  }

  // ── Save ─────────────────────────────────────────────────────────────────

  async function handleSave() {
    if (!editing || saving) return;
    setSaving(true);
    try {
      const res  = await fetch("/api/admin/content/save", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ key: editing.key, fields: draft }),
      });
      const data = await res.json() as { success?: boolean; message?: string; error?: string; wentLive?: boolean };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to save.");

      const nextStatus: SeoPageItem["status"] = data.wentLive ? "published" : "pending_approval";
      setPages(prev => prev.map(p =>
        p.key === editing.key
          ? { ...p, current: { ...p.current, ...(draft as SeoContent) }, status: nextStatus, lastUpdatedAt: new Date().toISOString(), lastUpdatedBy: viewer?.email ?? "" }
          : p
      ));
      setEditing(null);
      setDraft({});
      showToast(data.message ?? "Saved.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to save.", false);
    } finally {
      setSaving(false);
    }
  }

  // ── Group pages ───────────────────────────────────────────────────────────

  const normalizedSearch = search.trim().toLowerCase();
  const visiblePages = normalizedSearch
    ? pages.filter(page => {
        const searchable = [
          page.label,
          page.path,
          page.current.seoTitle,
          page.current.seoTitle?.trim() ? "" : page.defaults.seoTitle,
        ].join(" ").toLowerCase();
        return searchable.includes(normalizedSearch);
      })
    : pages;

  const grouped: Record<string, SeoPageItem[]> = {};
  for (const p of visiblePages) {
    (grouped[p.group] ??= []).push(p);
  }
  const hasVisiblePages = visiblePages.length > 0;

  const titleLen = (draft.seoTitle ?? "").length;
  const descLen  = (draft.metaDescription ?? "").length;
  const ogImage  = draft.ogImage ?? "";
  const twImage  = draft.twitterImage ?? "";

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-full bg-[#f4f7fb] dark:bg-[#06101f]">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[9999] max-w-sm rounded-2xl border px-4 py-3 text-[13px] font-semibold shadow-xl ${
          toast.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* ── Edit drawer ────────────────────────────────────────────────────── */}
      {editing && (
        <div className="fixed inset-0 z-[7000] flex items-start justify-end bg-black/30 backdrop-blur-sm"
             onClick={closeDrawer}>
          <div className="h-full w-full max-w-[460px] overflow-y-auto bg-white dark:bg-[#0d1a2d] shadow-2xl dark:shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col"
               onClick={e => e.stopPropagation()}>

            {/* Drawer header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] px-6 py-4">
              <div>
                <div className="text-[14px] font-black text-[#0a1628]">{editing.label}</div>
                <div className="text-[11px] text-[#94a3b8] mt-0.5">{editing.path}</div>
              </div>
              <button onClick={closeDrawer}
                      className="rounded-xl p-2 text-[#94a3b8] hover:bg-[#f4f7fb] hover:text-[#0a1628] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Form body */}
            <div className="flex-1 space-y-4 px-6 py-5 text-[12px]">

              {/* SEO warnings */}
              <SeoWarnings draft={draft} />

              {/* ── Search Snippet ── */}
              <DrawerSection title="Search Snippet" />

              <Field label="Page Title" hint={<CharCount value={draft.seoTitle ?? ""} max={60} />}>
                <Input
                  value={draft.seoTitle ?? ""}
                  onChange={v => set("seoTitle", v)}
                  placeholder="E.g. RBI Services – NBFC Registration | Estabizz Fintech"
                  maxLength={120}
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#94a3b8]">
                  <span>Shown in search results and browser tabs</span>
                  <span className={titleLen > 60 ? "text-red-500 font-bold" : titleLen > 45 ? "text-green-600" : ""}>
                    {titleLen > 60 ? "Over limit" : titleLen >= 30 ? "Good" : titleLen > 0 ? "Short" : ""}
                  </span>
                </div>
              </Field>

              <Field label="Meta Description" hint={<CharCount value={draft.metaDescription ?? ""} max={160} />}>
                <Textarea
                  value={draft.metaDescription ?? ""}
                  onChange={v => set("metaDescription", v)}
                  placeholder="Brief description shown under the page title in search results."
                  rows={3}
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#94a3b8]">
                  <span>Aim for 100–160 characters</span>
                  <span className={descLen > 160 ? "text-red-500 font-bold" : descLen >= 100 ? "text-green-600" : ""}>
                    {descLen > 160 ? "Over limit" : descLen >= 100 ? "Good" : descLen > 0 ? "Short" : ""}
                  </span>
                </div>
              </Field>

              <Field label="Focus Keyword" hint="Primary">
                <Input
                  value={draft.focusKeyword ?? ""}
                  onChange={v => set("focusKeyword", v)}
                  placeholder="E.g. NBFC registration India"
                />
              </Field>

              {/* ── Page Visibility ── */}
              <DrawerSection title="Page Visibility" />

              <Field label="Canonical URL">
                <Input
                  value={draft.canonicalUrl ?? ""}
                  onChange={v => set("canonicalUrl", v)}
                  placeholder="/rbi"
                />
                <p className="mt-1 text-[10px] text-[#94a3b8]">
                  Prevents duplicate content issues. Leave blank to use the page's default path.
                </p>
              </Field>

              <div className="flex gap-6">
                <Toggle
                  on={draft.robotsIndex !== false}
                  onChange={v => set("robotsIndex", v)}
                  label="Allow search engines to index this page"
                />
              </div>
              <div className="flex gap-6">
                <Toggle
                  on={draft.robotsFollow !== false}
                  onChange={v => set("robotsFollow", v)}
                  label="Allow search engines to follow links on this page"
                />
              </div>

              {/* ── Social Sharing (OG) ── */}
              <DrawerSection title="Social Sharing" />

              <Field label="Social Title">
                <Input
                  value={draft.ogTitle ?? ""}
                  onChange={v => set("ogTitle", v)}
                  placeholder="Title shown when sharing on LinkedIn, Facebook, WhatsApp"
                />
              </Field>

              <Field label="Social Description">
                <Textarea
                  value={draft.ogDescription ?? ""}
                  onChange={v => set("ogDescription", v)}
                  placeholder="Description shown when sharing on social platforms."
                  rows={2}
                />
              </Field>

              <Field label="Social Image URL">
                <Input
                  value={ogImage}
                  onChange={v => set("ogImage", v)}
                  placeholder="https://... or /images/og-page.png (1200×630 recommended)"
                />
                <ImagePreview url={ogImage} />
              </Field>

              {/* ── Twitter / X ── */}
              <DrawerSection title="Twitter / X Card" />

              <Field label="Twitter Title">
                <Input
                  value={draft.twitterTitle ?? ""}
                  onChange={v => set("twitterTitle", v)}
                  placeholder="Leave blank to use Social Title"
                />
              </Field>

              <Field label="Twitter Description">
                <Textarea
                  value={draft.twitterDescription ?? ""}
                  onChange={v => set("twitterDescription", v)}
                  placeholder="Leave blank to use Social Description."
                  rows={2}
                />
              </Field>

              <Field label="Twitter Image URL">
                <Input
                  value={twImage}
                  onChange={v => set("twitterImage", v)}
                  placeholder="Leave blank to use Social Image"
                />
                <ImagePreview url={twImage} />
              </Field>

              {/* ── Notes ── */}
              <DrawerSection title="Internal Notes" />

              <Field label="Secondary Keywords" hint="Optional">
                <Input
                  value={draft.secondaryKeywords ?? ""}
                  onChange={v => set("secondaryKeywords", v)}
                  placeholder="Comma-separated, e.g. NBFC compliance, RBI registration, fintech India"
                />
                <p className="mt-1 text-[10px] text-[#94a3b8]">
                  For team reference only — not shown publicly.
                </p>
              </Field>

              <Field label="SEO Notes" hint="Optional">
                <Textarea
                  value={draft.seoNotes ?? ""}
                  onChange={v => set("seoNotes", v)}
                  placeholder="Internal notes for the SEO or content team."
                  rows={2}
                />
              </Field>

              {/* Last updated info */}
              {(editing.lastUpdatedAt || editing.lastUpdatedBy) && (
                <div className="rounded-xl border border-[#f0f4f8] dark:border-[#223550] bg-[#f8fafc] dark:bg-[#12223a] px-3 py-2.5 text-[10px] text-[#94a3b8] dark:text-[#a9b6c9]">
                  Last saved {editing.lastUpdatedBy ? `by ${editing.lastUpdatedBy}` : ""} on {formatIST(editing.lastUpdatedAt)}
                </div>
              )}

            </div>

            {/* Drawer footer */}
            <div className="sticky bottom-0 border-t border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] px-6 py-4">
              {!canEdit ? (
                <div className="rounded-xl border border-[#e2eaf2] dark:border-[#223550] bg-[#f8fafc] dark:bg-[#12223a] px-4 py-2.5 text-center text-[12px] text-[#94a3b8] dark:text-[#a9b6c9]">
                  Your role cannot edit SEO settings.
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={closeDrawer}
                    disabled={saving}
                    className="flex-1 rounded-xl border border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] px-4 py-2.5 text-[13px] font-black text-[#475569] dark:text-[#a9b6c9] hover:bg-[#f4f7fb] dark:hover:bg-[#12223a] disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-black text-white hover:bg-[#1265d8] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        Saving…
                      </>
                    ) : "Save SEO Settings"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Page body ──────────────────────────────────────────────────────── */}
      <div className="p-6 lg:p-8 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628] dark:text-[#f7f9fc]">Page SEO</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b] dark:text-[#a9b6c9]">
            Manage page titles, descriptions and social sharing settings for all public pages.
          </p>
        </div>

        {/* Access restricted */}
        {!canView && (
          <div className="rounded-2xl border border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] p-8 text-center shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
            <div className="text-[15px] font-black text-[#0a1628] mb-1">Access Restricted</div>
            <p className="text-[13px] text-[#64748b] max-w-xs mx-auto leading-5">
              You do not have permission to view SEO settings.
            </p>
          </div>
        )}

        {canView && (
          <>
            {/* Info bar */}
            {!canEdit && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3.5">
                <p className="text-[12px] text-amber-800 font-medium leading-5">
                  You have read-only access to SEO settings. Contact a Super Admin or SEO Manager to make changes.
                </p>
              </div>
            )}

            {/* Search */}
            <div className="rounded-2xl border border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] px-5 py-4 shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search pages by name, path or SEO title"
                className="w-full rounded-xl border border-[#e2eaf2] dark:border-[#223550] bg-[#f8fafc] dark:bg-[#12223a] px-4 py-2.5 text-[13px] font-medium text-[#0a1628] dark:text-[#f7f9fc] placeholder:text-[#94a3b8] dark:placeholder:text-[#64748b] focus:border-[#1677f2] focus:bg-white dark:focus:bg-[#0d1a2d] focus:outline-none transition-colors"
              />
            </div>

            {/* Page groups */}
            {GROUP_ORDER.map(group => {
              const groupPages = grouped[group];
              if (!groupPages?.length) return null;
              return (
                <div key={group} className="rounded-2xl border border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
                  <div className="border-b border-[#f0f4f8] dark:border-[#223550] bg-[#f8fafc] dark:bg-[#0a1628] px-5 py-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8] dark:text-[#a9b6c9]">{group}</span>
                  </div>
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b border-[#f0f4f8]">
                        <th className="px-5 py-2.5 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Page</th>
                        <th className="px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden sm:table-cell">Path</th>
                        <th className="px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Status</th>
                        <th className="px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Last Updated</th>
                        <th className="px-4 py-2.5 text-right text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f4f7fb]">
                      {groupPages.map(page => (
                        <tr key={page.key} className="hover:bg-[#fafcff] transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-[#0a1628]">{page.label}</div>
                            <div className="text-[10.5px] text-[#94a3b8] mt-0.5 truncate max-w-[220px]">
                              {page.current.seoTitle || <span className="italic text-[#cbd5e1]">No title set</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-[#64748b] hidden sm:table-cell font-mono text-[11px]">
                            {page.path}
                          </td>
                          <td className="px-4 py-3.5">
                            <StatusBadge status={page.status} />
                          </td>
                          <td className="px-4 py-3.5 text-[#94a3b8] text-[11px] hidden lg:table-cell">
                            {page.lastUpdatedAt ? formatIST(page.lastUpdatedAt) : "—"}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <button
                              onClick={() => openEdit(page)}
                              className="rounded-xl border border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] px-3 py-1.5 text-[11px] font-bold text-[#475569] dark:text-[#a9b6c9] hover:border-[#1677f2]/40 hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors"
                            >
                              {canEdit ? "Edit" : "View"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}

            {!hasVisiblePages && (
              <div className="rounded-2xl border border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] px-5 py-10 text-center shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
                <div className="text-[15px] font-black text-[#0a1628] dark:text-[#f7f9fc]">No SEO pages found for this search.</div>
                <p className="mt-1 text-[12px] text-[#64748b]">Try a different page name, path or title.</p>
              </div>
            )}

            {/* Quick-reference guide */}
            <div className="rounded-2xl border border-[#e2eaf2] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] p-5 shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
              <div className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8] mb-3">Quick Reference</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-[11px] text-[#64748b]">
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Page Title</div>
                  30–60 characters. Shown in browser tabs and Google search results. Include the primary keyword near the start.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Meta Description</div>
                  100–160 characters. Shown under the title in search results. Should summarise the page and include the focus keyword.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Social Image</div>
                  1200×630 pixels recommended. Shown when someone shares the page on LinkedIn, WhatsApp or Twitter. Upload the image to the Media Library first, then paste the link here.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Status: Default</div>
                  The page is using built-in SEO settings. Click Edit to customise them. Default settings are already good — only update them if you need to improve for a specific keyword or campaign.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Status: Live</div>
                  Your custom SEO settings are active and visible to search engines.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Status: Pending</div>
                  Changes have been submitted and are waiting for admin approval before going live.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
