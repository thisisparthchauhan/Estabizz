"use client";

import { useEffect, useState } from "react";

interface NavQuickLink { label: string; href: string; icon: string; newTab: boolean }

const inputCls =
  "w-full rounded-lg border border-[#dbe7f3] bg-white px-3 py-2 text-[13px] text-[#0a1628] outline-none transition-colors focus:border-[#1677f2]";

function formatIST(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export default function NavbarEditor() {
  const [links, setLinks] = useState<NavQuickLink[]>([]);
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaHref, setCtaHref] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/content/global.navbar", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load.");
        if (cancelled) return;
        const f = data.block.fields as Record<string, unknown>;
        setLinks(Array.isArray(f.quickLinks) ? (f.quickLinks as NavQuickLink[]) : []);
        setCtaLabel(String(f.ctaLabel ?? ""));
        setCtaHref(String(f.ctaHref ?? ""));
        setUpdatedAt(data.block.updatedAt);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function setLink(i: number, patch: Partial<NavQuickLink>) {
    setLinks((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l))); setNotice("");
  }
  function addLink() { setLinks((ls) => [...ls, { label: "", href: "", icon: "🔗", newTab: false }]); setNotice(""); }
  function removeLink(i: number) { setLinks((ls) => ls.filter((_, j) => j !== i)); setNotice(""); }

  async function handleSave() {
    setSaving(true); setError(""); setNotice("");
    try {
      const fields = { quickLinks: links, ctaLabel, ctaHref };
      const res = await fetch("/api/admin/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key: "global.navbar", fields }),
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
    <section className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">Navbar — Quick Links & Button</span>
        <span className="text-[11px] text-[#94a3b8]">Last updated: {formatIST(updatedAt)}</span>
      </div>

      {loading ? (
        <div className="px-6 py-10 text-center text-[13px] text-[#94a3b8]">Loading…</div>
      ) : (
        <div className="px-6 py-6">
          <p className="mb-3 text-[12px] font-bold text-[#334155]">Quick links (the standalone links beside the menus)</p>
          <div className="space-y-2">
            {links.map((link, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <input value={link.icon} onChange={(e) => setLink(i, { icon: e.target.value })} placeholder="🔗" className={inputCls + " w-14 text-center"} title="Emoji (mobile)" />
                <input value={link.label} onChange={(e) => setLink(i, { label: e.target.value })} placeholder="Label" className={inputCls} />
                <input value={link.href} onChange={(e) => setLink(i, { href: e.target.value })} placeholder="/path or https://…" className={inputCls + " font-mono text-[11px]"} />
                <label className="flex shrink-0 items-center gap-1 text-[11px] text-[#64748b]" title="Open in new tab">
                  <input type="checkbox" checked={link.newTab} onChange={(e) => setLink(i, { newTab: e.target.checked })} /> new tab
                </label>
                <button onClick={() => removeLink(i)} title="Remove" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
              </div>
            ))}
          </div>
          <button onClick={addLink} className="mt-2 text-[11px] font-bold text-[#1677f2] hover:underline">+ Add quick link</button>

          <div className="mt-6 grid gap-4 border-t border-[#f0f4f8] pt-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">Button label</label>
              <input value={ctaLabel} onChange={(e) => { setCtaLabel(e.target.value); setNotice(""); }} className={inputCls} />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">Button link</label>
              <input value={ctaHref} onChange={(e) => { setCtaHref(e.target.value); setNotice(""); }} className={inputCls + " font-mono text-[11px]"} />
            </div>
          </div>

          {(error || notice) && (
            <div className="mt-4">
              {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[12px] font-medium text-red-700">{error}</div>}
              {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-[12px] font-medium text-green-700">{notice}</div>}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button onClick={handleSave} disabled={saving} className="rounded-xl bg-[#1677f2] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? "Saving…" : "Save & Publish Navbar"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
