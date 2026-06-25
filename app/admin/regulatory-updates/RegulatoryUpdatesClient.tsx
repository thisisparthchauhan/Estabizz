"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminContext } from "@/lib/admin/requirePermission";
import {
  REGULATOR_OPTIONS, CATEGORY_OPTIONS, IMPACT_LEVEL_OPTIONS,
  STATUS_OPTIONS, STATUS_LABELS,
} from "@/lib/regulatory/types";
import type {
  RegulatoryUpdateRecord, RegulatoryUpdateStatus, RegulatorOption,
  CategoryOption, ImpactLevel,
} from "@/lib/regulatory/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtIST(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", day: "numeric", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    }) + " IST";
  } catch {
    return "—";
  }
}

function fmtDateIST(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric",
    });
  } catch {
    return "—";
  }
}

function isoToDateInput(iso: string | null): string {
  if (!iso) return "";
  try { return new Date(iso).toISOString().slice(0, 10); } catch { return ""; }
}

const STATUS_STYLES: Record<RegulatoryUpdateStatus, string> = {
  published:        "bg-green-50 text-green-700 border-green-200",
  pending_approval: "bg-amber-50 text-amber-700 border-amber-200",
  draft:            "bg-slate-100 text-slate-600 border-slate-200",
  rejected:         "bg-red-50 text-red-600 border-red-200",
  archived:         "bg-zinc-100 text-zinc-500 border-zinc-200",
};

const IMPACT_STYLES: Record<ImpactLevel, string> = {
  Low:      "bg-green-50 text-green-700",
  Medium:   "bg-blue-50 text-blue-700",
  High:     "bg-amber-50 text-amber-700",
  Critical: "bg-red-50 text-red-600",
};

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  regulator: RegulatorOption;
  category: CategoryOption;
  summary: string;
  detailedContent: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceDate: string;
  publishedDate: string;
  effectiveDate: string;
  impactLevel: ImpactLevel;
  applicableTo: string;   // comma-separated in the form
  tags: string;           // comma-separated in the form
  featuredImageUrl: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
}

const EMPTY_FORM: FormState = {
  title: "", regulator: "RBI", category: "Circular", summary: "",
  detailedContent: "", sourceTitle: "", sourceUrl: "", sourceDate: "",
  publishedDate: "", effectiveDate: "", impactLevel: "Medium",
  applicableTo: "", tags: "", featuredImageUrl: "",
  seoTitle: "", seoDescription: "", canonicalUrl: "",
};

function recordToForm(r: RegulatoryUpdateRecord): FormState {
  return {
    title: r.title, regulator: r.regulator, category: r.category, summary: r.summary,
    detailedContent: r.detailedContent, sourceTitle: r.sourceTitle, sourceUrl: r.sourceUrl,
    sourceDate: isoToDateInput(r.sourceDate),
    publishedDate: isoToDateInput(r.publishedDate),
    effectiveDate: isoToDateInput(r.effectiveDate),
    impactLevel: r.impactLevel,
    applicableTo: r.applicableTo.join(", "),
    tags: r.tags.join(", "),
    featuredImageUrl: r.featuredImageUrl,
    seoTitle: r.seoTitle, seoDescription: r.seoDescription, canonicalUrl: r.canonicalUrl,
  };
}

function formToPayload(f: FormState) {
  return {
    title: f.title, regulator: f.regulator, category: f.category, summary: f.summary,
    detailedContent: f.detailedContent, sourceTitle: f.sourceTitle, sourceUrl: f.sourceUrl,
    sourceDate: f.sourceDate || null,
    publishedDate: f.publishedDate || null,
    effectiveDate: f.effectiveDate || null,
    impactLevel: f.impactLevel,
    applicableTo: f.applicableTo.split(",").map((s) => s.trim()).filter(Boolean),
    tags: f.tags.split(",").map((s) => s.trim()).filter(Boolean),
    featuredImageUrl: f.featuredImageUrl,
    seoTitle: f.seoTitle, seoDescription: f.seoDescription, canonicalUrl: f.canonicalUrl,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RegulatoryUpdatesClient({ viewer }: { viewer: AdminContext | null }) {
  const perms = viewer?.permissions ?? [];
  const canManage = perms.includes("manage_content");
  const canPublish = perms.includes("publish_content");

  const [items, setItems] = useState<RegulatoryUpdateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // filters
  const [search, setSearch] = useState("");
  const [fRegulator, setFRegulator] = useState("all");
  const [fCategory, setFCategory] = useState("all");
  const [fStatus, setFStatus] = useState("all");
  const [fImpact, setFImpact] = useState("all");

  // drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<RegulatoryUpdateRecord | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [busyAction, setBusyAction] = useState("");

  // reject modal
  const [rejectComment, setRejectComment] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);

  const [toast, setToast] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const q = new URLSearchParams({
        search, regulator: fRegulator, category: fCategory,
        status: fStatus, impactLevel: fImpact,
      });
      const res = await fetch(`/api/admin/regulatory-updates?${q.toString()}`);
      if (!res.ok) throw new Error("load failed");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setLoadError("Unable to load regulatory updates. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, fRegulator, fCategory, fStatus, fImpact]);

  // Debounced reload on filter/search change
  useEffect(() => {
    const t = setTimeout(fetchItems, 250);
    return () => clearTimeout(t);
  }, [fetchItems]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  }

  function openCreate() {
    setMode("create");
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowPreview(false);
    setDrawerOpen(true);
  }

  function openEdit(rec: RegulatoryUpdateRecord) {
    setMode("edit");
    setEditing(rec);
    setForm(recordToForm(rec));
    setFormError("");
    setShowPreview(false);
    setRejectOpen(false);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditing(null);
  }

  async function handleSave() {
    setFormError("");
    if (!form.title.trim())   { setFormError("Title is required."); return; }
    if (!form.summary.trim()) { setFormError("Summary is required."); return; }
    setSaving(true);
    try {
      const payload = formToPayload(form);
      const url = mode === "create"
        ? "/api/admin/regulatory-updates"
        : `/api/admin/regulatory-updates/${editing!.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error ?? "Unable to save."); return; }
      flash(mode === "create" ? "Draft created." : "Changes saved.");
      if (mode === "create") {
        setMode("edit");
        setEditing(data.item);
        setForm(recordToForm(data.item));
      } else {
        setEditing(data.item);
      }
      await fetchItems();
    } catch {
      setFormError("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  }

  async function runAction(
    rec: RegulatoryUpdateRecord,
    action: "submit" | "publish" | "archive",
  ) {
    setBusyAction(`${action}:${rec.id}`);
    try {
      const res = await fetch(`/api/admin/regulatory-updates/${rec.id}/${action}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) { flash(data.error ?? "Action failed."); return; }
      const labels: Record<string, string> = {
        submit: "Submitted for review.", publish: "Published.", archive: "Archived.",
      };
      flash(labels[action]);
      if (editing?.id === rec.id) setEditing(data.item);
      await fetchItems();
    } catch {
      flash("Something went wrong.");
    } finally {
      setBusyAction("");
    }
  }

  async function confirmReject() {
    if (!editing) return;
    setBusyAction(`reject:${editing.id}`);
    try {
      const res = await fetch(`/api/admin/regulatory-updates/${editing.id}/reject`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: rejectComment }),
      });
      const data = await res.json();
      if (!res.ok) { flash(data.error ?? "Unable to reject."); return; }
      flash("Update rejected.");
      setEditing(data.item);
      setRejectOpen(false);
      setRejectComment("");
      await fetchItems();
    } catch {
      flash("Something went wrong.");
    } finally {
      setBusyAction("");
    }
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const it of items) c[it.status] = (c[it.status] ?? 0) + 1;
    return c;
  }, [items]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <h1 className="text-[22px] font-black text-[#0a1628]">Regulatory Update Desk</h1>
          <p className="text-[13px] text-[#64748b] mt-1 max-w-2xl">
            Create, review and publish regulatory updates from RBI, SEBI, IRDAI, IFSCA, FIU-IND,
            MCA, FEMA and other regulators. Only published updates appear on the website.
          </p>
        </div>
        {canManage && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
          >
            <span className="text-[16px] leading-none">＋</span> Add Update
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, regulator, category, tag or source…"
            className="min-w-[260px] flex-1 rounded-lg border border-[#e2e8f0] px-3 py-2 text-[13px] text-[#0a1628] outline-none focus:border-[#1677f2]"
          />
          <Select value={fRegulator} onChange={setFRegulator} label="Regulator"
            options={["all", ...REGULATOR_OPTIONS]} />
          <Select value={fCategory} onChange={setFCategory} label="Category"
            options={["all", ...CATEGORY_OPTIONS]} />
          <Select value={fStatus} onChange={setFStatus} label="Status"
            options={["all", ...STATUS_OPTIONS]}
            render={(o) => (o === "all" ? "All Status" : STATUS_LABELS[o as RegulatoryUpdateStatus] ?? o)} />
          <Select value={fImpact} onChange={setFImpact} label="Impact"
            options={["all", ...IMPACT_LEVEL_OPTIONS]} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-[#64748b]">
          <Chip>All {counts.all ?? 0}</Chip>
          <Chip>Published {counts.published ?? 0}</Chip>
          <Chip>Pending {counts.pending_approval ?? 0}</Chip>
          <Chip>Draft {counts.draft ?? 0}</Chip>
          <Chip>Rejected {counts.rejected ?? 0}</Chip>
          <Chip>Archived {counts.archived ?? 0}</Chip>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-[13px] text-[#64748b]">Loading updates…</div>
        ) : loadError ? (
          <div className="p-10 text-center text-[13px] text-red-600">{loadError}</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[14px] font-bold text-[#0a1628]">No regulatory updates yet</p>
            <p className="text-[13px] text-[#64748b] mt-1">
              {canManage ? "Use “Add Update” to create your first one." : "Nothing to show for this search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f8fafc] text-[#64748b] text-[11px] uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 font-bold">Title</th>
                  <th className="px-4 py-3 font-bold">Regulator</th>
                  <th className="px-4 py-3 font-bold">Category</th>
                  <th className="px-4 py-3 font-bold">Impact</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Last Updated</th>
                  <th className="px-4 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-t border-[#eef2f7] hover:bg-[#f8fbff]">
                    <td className="px-4 py-3 max-w-[340px]">
                      <button onClick={() => openEdit(it)} className="text-left font-bold text-[#0a1628] hover:text-[#1677f2] line-clamp-2">
                        {it.title || "(untitled)"}
                      </button>
                      <div className="text-[11px] text-[#94a3b8] mt-0.5 truncate">/{it.slug}</div>
                    </td>
                    <td className="px-4 py-3"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#1677f2]">{it.regulator}</span></td>
                    <td className="px-4 py-3 text-[#475569]">{it.category}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${IMPACT_STYLES[it.impactLevel]}`}>{it.impactLevel}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLES[it.status]}`}>
                        {STATUS_LABELS[it.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[#64748b] whitespace-nowrap">
                      {fmtIST(it.updatedAt)}
                      {it.updatedBy && <div className="text-[11px] text-[#94a3b8] truncate max-w-[160px]">{it.updatedBy}</div>}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(it)} className="rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-[12px] font-bold text-[#0a1628] hover:border-[#1677f2] hover:text-[#1677f2]">
                        {canManage ? "Open" : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[3000] flex">
          <div className="flex-1 bg-black/40" onClick={closeDrawer} />
          <div className="w-full max-w-[640px] bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="sticky top-0 z-10 bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-black text-[#0a1628]">
                  {mode === "create" ? "Add Update" : "Edit Update"}
                </h2>
                {editing && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[editing.status]}`}>
                      {STATUS_LABELS[editing.status]}
                    </span>
                    <span className="text-[11px] text-[#94a3b8]">Last updated {fmtIST(editing.updatedAt)}</span>
                  </div>
                )}
              </div>
              <button onClick={closeDrawer} className="text-[#94a3b8] hover:text-[#0a1628] text-[20px] leading-none">×</button>
            </div>

            {/* Tabs: Edit / Preview */}
            <div className="px-6 pt-3 flex gap-2 border-b border-[#eef2f7]">
              <TabBtn active={!showPreview} onClick={() => setShowPreview(false)}>Edit</TabBtn>
              <TabBtn active={showPreview} onClick={() => setShowPreview(true)}>Preview</TabBtn>
            </div>

            <div className="flex-1 px-6 py-5">
              {showPreview ? (
                <PreviewPanel form={form} editing={editing} />
              ) : (
                <div className="space-y-4">
                  {editing?.status === "rejected" && editing.reviewComment && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                      <b>Reviewer comment:</b> {editing.reviewComment}
                    </div>
                  )}

                  <Field label="Title" required>
                    <input value={form.title} disabled={!canManage}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className={inputCls} placeholder="e.g. SEBI Master Circular Update for RTAs" />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Regulator" required>
                      <select value={form.regulator} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, regulator: e.target.value as RegulatorOption })}
                        className={inputCls}>
                        {REGULATOR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Category" required>
                      <select value={form.category} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, category: e.target.value as CategoryOption })}
                        className={inputCls}>
                        {CATEGORY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Summary" required hint="Short, plain-language overview shown on the website card.">
                    <textarea value={form.summary} disabled={!canManage} rows={3}
                      onChange={(e) => setForm({ ...form, summary: e.target.value })}
                      className={inputCls} placeholder="What changed and who it affects, in 1–3 sentences." />
                  </Field>

                  <Field label="Detailed Update" hint="Plain text or simple formatting. Unsafe code is removed automatically.">
                    <textarea value={form.detailedContent} disabled={!canManage} rows={7}
                      onChange={(e) => setForm({ ...form, detailedContent: e.target.value })}
                      className={inputCls} placeholder="Full explanation, impact analysis, action points…" />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Impact Level">
                      <select value={form.impactLevel} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, impactLevel: e.target.value as ImpactLevel })}
                        className={inputCls}>
                        {IMPACT_LEVEL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Applicable To" hint="Comma-separated">
                      <input value={form.applicableTo} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, applicableTo: e.target.value })}
                        className={inputCls} placeholder="NBFCs, Banks, RTAs" />
                    </Field>
                  </div>

                  <Field label="Tags" hint="Comma-separated">
                    <input value={form.tags} disabled={!canManage}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      className={inputCls} placeholder="digital lending, KYC, compliance" />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Source Title">
                      <input value={form.sourceTitle} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, sourceTitle: e.target.value })}
                        className={inputCls} placeholder="Circular / notification name" />
                    </Field>
                    <Field label="Source Link" hint="Optional — must be a valid http(s) link">
                      <input value={form.sourceUrl} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
                        className={inputCls} placeholder="https://rbi.org.in/…" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Source Date">
                      <input type="date" value={form.sourceDate} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, sourceDate: e.target.value })} className={inputCls} />
                    </Field>
                    <Field label="Effective Date">
                      <input type="date" value={form.effectiveDate} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })} className={inputCls} />
                    </Field>
                    <Field label="Publication Date">
                      <input type="date" value={form.publishedDate} disabled={!canManage}
                        onChange={(e) => setForm({ ...form, publishedDate: e.target.value })} className={inputCls} />
                    </Field>
                  </div>

                  {/* SEO (optional) */}
                  <details className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3">
                    <summary className="cursor-pointer text-[12px] font-bold text-[#475569]">Search Engine Details (optional)</summary>
                    <div className="space-y-3 mt-3">
                      <Field label="SEO Title" hint="Falls back to the title if left blank">
                        <input value={form.seoTitle} disabled={!canManage}
                          onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className={inputCls} />
                      </Field>
                      <Field label="SEO Description" hint="Falls back to the summary if left blank">
                        <textarea value={form.seoDescription} disabled={!canManage} rows={2}
                          onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} className={inputCls} />
                      </Field>
                      <Field label="Canonical Link" hint="Optional">
                        <input value={form.canonicalUrl} disabled={!canManage}
                          onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })} className={inputCls} />
                      </Field>
                      <Field label="Featured Image Link" hint="Optional">
                        <input value={form.featuredImageUrl} disabled={!canManage}
                          onChange={(e) => setForm({ ...form, featuredImageUrl: e.target.value })} className={inputCls} />
                      </Field>
                    </div>
                  </details>

                  {editing && (
                    <p className="text-[11px] text-[#94a3b8]">
                      Web address: <span className="font-mono text-[#64748b]">/resources/regulatory-updates/{editing.slug}</span>
                    </p>
                  )}

                  {formError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">{formError}</div>
                  )}
                </div>
              )}
            </div>

            {/* Drawer footer — workflow actions */}
            <div className="sticky bottom-0 bg-white border-t border-[#e2e8f0] px-6 py-3 flex flex-wrap items-center gap-2">
              {canManage && !showPreview && (
                <button onClick={handleSave} disabled={saving}
                  className="rounded-xl bg-[#1677f2] px-4 py-2 text-[13px] font-bold text-white hover:bg-[#0866d9] disabled:opacity-60">
                  {saving ? "Saving…" : mode === "create" ? "Save Draft" : "Save Changes"}
                </button>
              )}

              {editing && canManage && (editing.status === "draft" || editing.status === "rejected") && (
                <button onClick={() => runAction(editing, "submit")} disabled={!!busyAction}
                  className="rounded-xl border border-[#1677f2] px-4 py-2 text-[13px] font-bold text-[#1677f2] hover:bg-blue-50 disabled:opacity-60">
                  Submit for Review
                </button>
              )}

              {editing && canPublish && editing.status !== "published" && editing.status !== "archived" && (
                <button onClick={() => runAction(editing, "publish")} disabled={!!busyAction}
                  className="rounded-xl bg-green-600 px-4 py-2 text-[13px] font-bold text-white hover:bg-green-700 disabled:opacity-60">
                  Publish
                </button>
              )}

              {editing && canPublish && editing.status === "pending_approval" && (
                <button onClick={() => setRejectOpen(true)} disabled={!!busyAction}
                  className="rounded-xl border border-red-300 px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 disabled:opacity-60">
                  Reject
                </button>
              )}

              {editing && canPublish && editing.status !== "archived" && (
                <button onClick={() => runAction(editing, "archive")} disabled={!!busyAction}
                  className="ml-auto rounded-xl border border-[#e2e8f0] px-4 py-2 text-[13px] font-bold text-[#64748b] hover:border-zinc-400 disabled:opacity-60">
                  Archive
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {rejectOpen && editing && (
        <div className="fixed inset-0 z-[3500] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-[16px] font-black text-[#0a1628] mb-1">Reject this update?</h3>
            <p className="text-[12px] text-[#64748b] mb-3">Add a short comment for the author (optional).</p>
            <textarea value={rejectComment} rows={3}
              onChange={(e) => setRejectComment(e.target.value)}
              className={inputCls} placeholder="What needs to change before publishing…" />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setRejectOpen(false)} className="rounded-lg border border-[#e2e8f0] px-4 py-2 text-[13px] font-bold text-[#64748b]">Cancel</button>
              <button onClick={confirmReject} disabled={!!busyAction}
                className="rounded-lg bg-red-600 px-4 py-2 text-[13px] font-bold text-white hover:bg-red-700 disabled:opacity-60">
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[4000] rounded-xl bg-[#0a1628] px-4 py-2.5 text-[13px] font-bold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Small UI helpers ─────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-[#e2e8f0] px-3 py-2 text-[13px] text-[#0a1628] outline-none focus:border-[#1677f2] disabled:bg-[#f8fafc] disabled:text-[#94a3b8]";

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1.5 text-[12px] font-bold text-[#334155]">
        {label}{required && <span className="text-red-500">*</span>}
        {hint && <span className="font-normal text-[#94a3b8]">— {hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Select({ value, onChange, label, options, render }: {
  value: string; onChange: (v: string) => void; label: string;
  options: string[]; render?: (o: string) => string;
}) {
  return (
    <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-[13px] text-[#0a1628] outline-none focus:border-[#1677f2]">
      {options.map((o) => (
        <option key={o} value={o}>{render ? render(o) : (o === "all" ? `All ${label}` : o)}</option>
      ))}
    </select>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1">{children}</span>;
}

function TabBtn({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button onClick={onClick}
      className={`px-3 py-2 text-[13px] font-bold border-b-2 -mb-px ${active ? "border-[#1677f2] text-[#1677f2]" : "border-transparent text-[#94a3b8] hover:text-[#475569]"}`}>
      {children}
    </button>
  );
}

function PreviewPanel({ form, editing }: { form: FormState; editing: RegulatoryUpdateRecord | null }) {
  const impact = form.impactLevel;
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-[#1677f2]">{form.regulator}</span>
        <span className={`rounded-full px-3 py-1 text-[11px] font-black ${IMPACT_STYLES[impact]}`}>{impact} Impact</span>
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">{form.category}</p>
      <h2 className="mb-2 mt-1 text-[20px] font-black leading-snug text-[#0a1628]">{form.title || "Update title"}</h2>
      {(form.sourceDate || form.effectiveDate) && (
        <p className="mb-2 text-[12px] font-semibold text-[#64748b]">
          {form.sourceDate && <>Source date: {fmtDateIST(form.sourceDate)} </>}
          {form.effectiveDate && <> • Effective: {fmtDateIST(form.effectiveDate)}</>}
        </p>
      )}
      {form.applicableTo && (
        <p className="mb-3 text-[13px] text-gray-600"><strong>Applicable to:</strong> {form.applicableTo}</p>
      )}
      <p className="mb-3 text-[14px] leading-7 text-gray-600">{form.summary || "Summary preview…"}</p>
      {form.detailedContent && (
        <div className="mb-3 whitespace-pre-wrap rounded-lg bg-[#f8fafc] p-3 text-[13px] leading-6 text-[#475569]">
          {form.detailedContent.replace(/<[^>]+>/g, " ").trim().slice(0, 600)}
          {form.detailedContent.length > 600 ? "…" : ""}
        </div>
      )}
      {form.tags && (
        <div className="flex flex-wrap gap-1.5">
          {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
            <span key={t} className="rounded-full border border-blue-100 bg-[#f5fbff] px-2.5 py-0.5 text-[11px] font-semibold text-[#0077B6]">{t}</span>
          ))}
        </div>
      )}
      {form.sourceUrl && (
        <a href={form.sourceUrl} target="_blank" rel="noopener noreferrer"
          className="mt-3 inline-block text-[12px] font-bold text-[#1677f2] hover:underline">
          View source ↗
        </a>
      )}
      {editing && (
        <p className="mt-4 text-[11px] text-[#94a3b8]">
          This preview reflects unsaved edits. Only <b>Published</b> updates appear on the public website.
        </p>
      )}
    </div>
  );
}
