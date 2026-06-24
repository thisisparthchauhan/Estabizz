"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SCALARS: { name: string; label: string; multiline?: boolean; hint?: string }[] = [
  { name: "welcomeLabel", label: "Welcome label", hint: "Small tag above the heading." },
  { name: "headingPrefix", label: "Main heading", hint: "Fixed part before the rotating words." },
  { name: "subheading", label: "Subheading paragraph", multiline: true },
  { name: "supportLine", label: "Supporting line", hint: "Beside the country flags." },
  { name: "primaryBtnText", label: "Primary button text" },
  { name: "primaryBtnLink", label: "Primary button link" },
  { name: "secondaryBtnText", label: "Secondary button text" },
  { name: "secondaryBtnLink", label: "Secondary button link" },
];

const LISTS: { name: string; label: string; hint: string }[] = [
  { name: "rotatingWords", label: "Rotating words", hint: "Animated phrases after the heading. The full text stays readable to search engines." },
  { name: "trustStats", label: "Trust stats", hint: "e.g. 500+ Licences Obtained" },
  { name: "servicePills", label: "Service pills", hint: "Scrolling tags strip." },
];

const inputCls =
  "w-full rounded-lg border border-[#dbe7f3] bg-white px-3 py-2 text-[13px] text-[#0a1628] outline-none transition-colors focus:border-[#1677f2]";

function formatIST(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export default function HeroEditor() {
  const [scalars, setScalars] = useState<Record<string, string>>({});
  const [lists, setLists] = useState<Record<string, string[]>>({});
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/content/homepage.hero", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load.");
        if (cancelled) return;
        const f = data.block.fields as Record<string, unknown>;
        const s: Record<string, string> = {};
        for (const def of SCALARS) s[def.name] = String(f[def.name] ?? "");
        setScalars(s);
        const l: Record<string, string[]> = {};
        for (const def of LISTS) l[def.name] = Array.isArray(f[def.name]) ? (f[def.name] as string[]) : [];
        setLists(l);
        setUpdatedAt(data.block.updatedAt);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const touched = () => setNotice("");
  const setListItem = (name: string, i: number, val: string) => { setLists((p) => ({ ...p, [name]: p[name].map((x, j) => (j === i ? val : x)) })); touched(); };
  const addListItem = (name: string) => { setLists((p) => ({ ...p, [name]: [...(p[name] ?? []), ""] })); touched(); };
  const removeListItem = (name: string, i: number) => { setLists((p) => ({ ...p, [name]: p[name].filter((_, j) => j !== i) })); touched(); };

  async function handleSave() {
    setSaving(true); setError(""); setNotice("");
    try {
      const fields = { ...scalars, ...lists };
      const res = await fetch("/api/admin/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key: "homepage.hero", fields }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      setNotice(data.message || "Saved.");
      setUpdatedAt(new Date().toISOString());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-5 flex items-center gap-2 text-[13px]">
        <Link href="/admin/website" className="font-semibold text-[#1677f2] hover:underline">Website Editor</Link>
        <span className="text-[#94a3b8]">/</span>
        <Link href="/admin/website/homepage" className="font-semibold text-[#1677f2] hover:underline">Homepage</Link>
        <span className="text-[#94a3b8]">/</span>
        <span className="font-bold text-[#0a1628]">Hero Section</span>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628]">Hero Section</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">The main banner at the top of the homepage. Last updated: {formatIST(updatedAt)}</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2]">Preview ↗</a>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#e2eaf2] bg-white px-6 py-12 text-center text-[13px] text-[#94a3b8]">Loading…</div>
      ) : (
        <div className="max-w-3xl space-y-6">
          <section className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
            <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Text Content</span>
            </div>
            <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
              {SCALARS.map((def) => (
                <div key={def.name} className={def.multiline ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">{def.label}</label>
                  {def.multiline ? (
                    <textarea value={scalars[def.name] ?? ""} onChange={(e) => { setScalars((p) => ({ ...p, [def.name]: e.target.value })); touched(); }} rows={3} className={inputCls + " resize-y"} />
                  ) : (
                    <input value={scalars[def.name] ?? ""} onChange={(e) => { setScalars((p) => ({ ...p, [def.name]: e.target.value })); touched(); }} className={inputCls} />
                  )}
                  {def.hint && <p className="mt-1 text-[11px] text-[#94a3b8]">{def.hint}</p>}
                </div>
              ))}
            </div>
          </section>

          {LISTS.map((def) => (
            <section key={def.name} className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">{def.label}</span>
                <button onClick={() => addListItem(def.name)} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add</button>
              </div>
              <div className="space-y-2 px-6 py-5">
                <p className="text-[11px] text-[#94a3b8]">{def.hint}</p>
                {(lists[def.name] ?? []).map((val, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <input value={val} onChange={(e) => setListItem(def.name, i, e.target.value)} className={inputCls} />
                    <button onClick={() => removeListItem(def.name, i)} title="Remove" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {(error || notice) && (
            <div>
              {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[12px] font-medium text-red-700">{error}</div>}
              {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-[12px] font-medium text-green-700">{notice}</div>}
            </div>
          )}

          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving} className="rounded-xl bg-[#1677f2] px-6 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? "Saving…" : "Save & Publish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
