"use client";

import { useEffect, useState } from "react";

// ─── Types (mirror lib/content/footerDefaults.ts) ─────────────────────────────
interface FooterLink { label: string; href: string }
interface FooterColumn { title: string; links: FooterLink[] }

// Scalar fields of the Footer content block.
const FOOTER_FIELDS: { name: string; label: string; hint?: string; multiline?: boolean }[] = [
  { name: "description", label: "Short description", multiline: true, hint: "The paragraph under the logo." },
  { name: "address", label: "Office address", multiline: true },
  { name: "phone", label: "Phone number", hint: "Shown as a tap-to-call link." },
  { name: "email", label: "Email address", hint: "Shown as a mailto link." },
  { name: "cin", label: "CIN", hint: "Company Identification Number." },
  { name: "instagramUrl", label: "Instagram URL" },
  { name: "linkedinUrl", label: "LinkedIn URL" },
  { name: "copyright", label: "Copyright line" },
];

type Scalars = Record<string, string>;

function formatIST(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

const inputCls =
  "w-full rounded-lg border border-[#dbe7f3] bg-white px-3 py-2 text-[13px] text-[#0a1628] outline-none transition-colors focus:border-[#1677f2]";

export default function NavigationClient() {
  const [scalars, setScalars] = useState<Scalars>({});
  const [columns, setColumns] = useState<FooterColumn[]>([]);
  const [regulators, setRegulators] = useState<FooterLink[]>([]);
  const [meta, setMeta] = useState<{ updatedBy: string; updatedAt: string | null }>({ updatedBy: "", updatedAt: null });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/content/global.footer", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load.");
        if (cancelled) return;
        const f = data.block.fields as Record<string, unknown>;
        const s: Scalars = {};
        for (const def of FOOTER_FIELDS) s[def.name] = String(f[def.name] ?? "");
        setScalars(s);
        setColumns(Array.isArray(f.columns) ? (f.columns as FooterColumn[]) : []);
        setRegulators(Array.isArray(f.regulators) ? (f.regulators as FooterLink[]) : []);
        setMeta({ updatedBy: data.block.updatedBy, updatedAt: data.block.updatedAt });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function touched() { setNotice(""); }

  async function handleSave() {
    setSaving(true); setError(""); setNotice("");
    try {
      const fields = { ...scalars, columns, regulators };
      const res = await fetch("/api/admin/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key: "global.footer", fields }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      setNotice(data.message || "Saved.");
      setMeta((m) => ({ ...m, updatedAt: new Date().toISOString() }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  // ── Column editing helpers ──────────────────────────────────────────────────
  function setColumn(ci: number, patch: Partial<FooterColumn>) {
    setColumns((cols) => cols.map((c, i) => (i === ci ? { ...c, ...patch } : c))); touched();
  }
  function setColLink(ci: number, li: number, patch: Partial<FooterLink>) {
    setColumns((cols) => cols.map((c, i) => i === ci
      ? { ...c, links: c.links.map((l, j) => (j === li ? { ...l, ...patch } : l)) }
      : c)); touched();
  }
  function addColLink(ci: number) {
    setColumns((cols) => cols.map((c, i) => i === ci ? { ...c, links: [...c.links, { label: "", href: "" }] } : c)); touched();
  }
  function removeColLink(ci: number, li: number) {
    setColumns((cols) => cols.map((c, i) => i === ci ? { ...c, links: c.links.filter((_, j) => j !== li) } : c)); touched();
  }
  function addColumn() {
    setColumns((cols) => [...cols, { title: "New Column", links: [{ label: "", href: "" }] }]); touched();
  }
  function removeColumn(ci: number) {
    setColumns((cols) => cols.filter((_, i) => i !== ci)); touched();
  }

  // ── Regulator helpers ───────────────────────────────────────────────────────
  function setReg(ri: number, patch: Partial<FooterLink>) {
    setRegulators((rs) => rs.map((r, i) => (i === ri ? { ...r, ...patch } : r))); touched();
  }
  function addReg() { setRegulators((rs) => [...rs, { label: "", href: "" }]); touched(); }
  function removeReg(ri: number) { setRegulators((rs) => rs.filter((_, i) => i !== ri)); touched(); }

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628]">Navigation</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">
            Edit the site footer. Saved changes go live across the whole site. Last updated: {formatIST(meta.updatedAt)}{meta.updatedBy && ` · ${meta.updatedBy}`}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="shrink-0 rounded-xl bg-[#1677f2] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save & Publish"}
        </button>
      </div>

      {(error || notice) && (
        <div className="mb-4 max-w-3xl">
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[12px] font-medium text-red-700">{error}</div>}
          {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-[12px] font-medium text-green-700">{notice}</div>}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-[#e2eaf2] bg-white px-6 py-12 text-center text-[13px] text-[#94a3b8]">Loading…</div>
      ) : (
        <div className="space-y-6">
          {/* ── Contact details ──────────────────────────────────────────────── */}
          <section className="max-w-3xl rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
            <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Footer — Contact Details</span>
            </div>
            <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
              {FOOTER_FIELDS.map((def) => (
                <div key={def.name} className={def.multiline ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">{def.label}</label>
                  {def.multiline ? (
                    <textarea value={scalars[def.name] ?? ""} onChange={(e) => { setScalars((p) => ({ ...p, [def.name]: e.target.value })); touched(); }} rows={2} className={inputCls + " resize-y"} />
                  ) : (
                    <input type="text" value={scalars[def.name] ?? ""} onChange={(e) => { setScalars((p) => ({ ...p, [def.name]: e.target.value })); touched(); }} className={inputCls} />
                  )}
                  {def.hint && <p className="mt-1 text-[11px] text-[#94a3b8]">{def.hint}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* ── Link columns ─────────────────────────────────────────────────── */}
          <section className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Footer — Link Columns</span>
              <button onClick={addColumn} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add column</button>
            </div>
            <div className="grid gap-5 px-6 py-6 lg:grid-cols-2 xl:grid-cols-3">
              {columns.map((col, ci) => (
                <div key={ci} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-3.5">
                  <div className="mb-2 flex items-center gap-2">
                    <input value={col.title} onChange={(e) => setColumn(ci, { title: e.target.value })} placeholder="Column title" className={inputCls + " font-bold"} />
                    <button onClick={() => removeColumn(ci)} title="Delete column" className="shrink-0 rounded-lg border border-red-200 px-2 py-2 text-[12px] text-red-500 hover:bg-red-50">✕</button>
                  </div>
                  <div className="space-y-2">
                    {col.links.map((link, li) => (
                      <div key={li} className="flex items-center gap-1.5">
                        <input value={link.label} onChange={(e) => setColLink(ci, li, { label: e.target.value })} placeholder="Label" className={inputCls} />
                        <input value={link.href} onChange={(e) => setColLink(ci, li, { href: e.target.value })} placeholder="/path" className={inputCls + " font-mono text-[11px]"} />
                        <button onClick={() => removeColLink(ci, li)} title="Remove link" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addColLink(ci)} className="mt-2 text-[11px] font-bold text-[#1677f2] hover:underline">+ Add link</button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Regulators ───────────────────────────────────────────────────── */}
          <section className="max-w-3xl rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Footer — Regulator Chips</span>
              <button onClick={addReg} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add</button>
            </div>
            <div className="grid gap-2 px-6 py-6 sm:grid-cols-2">
              {regulators.map((r, ri) => (
                <div key={ri} className="flex items-center gap-1.5">
                  <input value={r.label} onChange={(e) => setReg(ri, { label: e.target.value })} placeholder="RBI" className={inputCls} />
                  <input value={r.href} onChange={(e) => setReg(ri, { href: e.target.value })} placeholder="/rbi" className={inputCls + " font-mono text-[11px]"} />
                  <button onClick={() => removeReg(ri)} title="Remove" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-[#1677f2] px-6 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save & Publish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
