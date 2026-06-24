"use client";

// Shared building blocks for Website Editor section forms.
// Keeps each section editor small and consistent.

import { useEffect, useState } from "react";
import Link from "next/link";

export const inputCls =
  "w-full rounded-lg border border-[#dbe7f3] bg-white px-3 py-2 text-[13px] text-[#0a1628] outline-none transition-colors focus:border-[#1677f2]";

export function formatIST(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

/** Loads a content block's fields and provides a save() that persists them. */
export function useSection(key: string) {
  const [fields, setFields] = useState<Record<string, unknown> | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/content/${key}`, { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load.");
        if (cancelled) return;
        setFields(data.block.fields);
        setUpdatedAt(data.block.updatedAt);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [key]);

  async function save(toSave: Record<string, unknown>) {
    setSaving(true); setError(""); setNotice("");
    try {
      const res = await fetch("/api/admin/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key, fields: toSave }),
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

  return { fields, setFields, updatedAt, loading, saving, error, notice, setNotice, save };
}

/** Breadcrumb + title + preview link header for a section editor. */
export function EditorHeader({ title, subtitle, updatedAt }: { title: string; subtitle: string; updatedAt: string | null }) {
  return (
    <>
      <div className="mb-5 flex items-center gap-2 text-[13px]">
        <Link href="/admin/website" className="font-semibold text-[#1677f2] hover:underline">Website Editor</Link>
        <span className="text-[#94a3b8]">/</span>
        <Link href="/admin/website/homepage" className="font-semibold text-[#1677f2] hover:underline">Homepage</Link>
        <span className="text-[#94a3b8]">/</span>
        <span className="font-bold text-[#0a1628]">{title}</span>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628]">{title}</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">{subtitle} · Last updated: {formatIST(updatedAt)}</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2]">Preview ↗</a>
      </div>
    </>
  );
}

export function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">{title}</span>
        {action}
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-[#94a3b8]">{hint}</p>}
    </div>
  );
}

export function SaveBar({ saving, error, notice, onSave }: { saving: boolean; error: string; notice: string; onSave: () => void }) {
  return (
    <>
      {(error || notice) && (
        <div>
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[12px] font-medium text-red-700">{error}</div>}
          {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-[12px] font-medium text-green-700">{notice}</div>}
        </div>
      )}
      <div className="flex justify-end">
        <button onClick={onSave} disabled={saving} className="rounded-xl bg-[#1677f2] px-6 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50">
          {saving ? "Saving…" : "Save & Publish"}
        </button>
      </div>
    </>
  );
}

/** Editor for a simple string[] field. */
export function StringList({ items, onChange, placeholder }: { items: string[]; onChange: (next: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      {items.map((val, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <input value={val} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} placeholder={placeholder} className={inputCls} />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} title="Remove" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} className="text-[11px] font-bold text-[#1677f2] hover:underline">+ Add</button>
    </div>
  );
}

export function LoadingCard() {
  return <div className="rounded-2xl border border-[#e2eaf2] bg-white px-6 py-12 text-center text-[13px] text-[#94a3b8]">Loading…</div>;
}
