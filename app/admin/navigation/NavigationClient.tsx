"use client";

import { useEffect, useState } from "react";

// Field definitions for the Footer content block (key: global.footer).
// Order + labels here drive the form UI.
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

type Fields = Record<string, string>;

function formatIST(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export default function NavigationClient() {
  const [fields, setFields] = useState<Fields>({});
  const [meta, setMeta] = useState<{ status: string; isLive: boolean; updatedBy: string; updatedAt: string | null }>({
    status: "published", isLive: false, updatedBy: "", updatedAt: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Load current footer content
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/content/global.footer", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load.");
        if (cancelled) return;
        const f = data.block.fields as Record<string, unknown>;
        const asStrings: Fields = {};
        for (const def of FOOTER_FIELDS) asStrings[def.name] = String(f[def.name] ?? "");
        setFields(asStrings);
        setMeta({
          status: data.block.status,
          isLive: data.block.isLive,
          updatedBy: data.block.updatedBy,
          updatedAt: data.block.updatedAt,
        });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function update(name: string, value: string) {
    setFields((prev) => ({ ...prev, [name]: value }));
    setNotice("");
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key: "global.footer", fields }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      setNotice(data.message || "Saved.");
      setMeta((m) => ({ ...m, status: data.status, isLive: data.wentLive || m.isLive, updatedAt: new Date().toISOString() }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628]">Navigation</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">
            Edit the site footer. Changes you save go live across the whole site.
          </p>
        </div>
      </div>

      <div className="max-w-2xl rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
            Footer — Contact Details
          </span>
          <span className="text-[11px] text-[#94a3b8]">
            Last updated: {formatIST(meta.updatedAt)} {meta.updatedBy && `· ${meta.updatedBy}`}
          </span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-[13px] text-[#94a3b8]">Loading…</div>
        ) : (
          <div className="space-y-5 px-6 py-6">
            {FOOTER_FIELDS.map((def) => (
              <div key={def.name}>
                <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">
                  {def.label}
                </label>
                {def.multiline ? (
                  <textarea
                    value={fields[def.name] ?? ""}
                    onChange={(e) => update(def.name, e.target.value)}
                    rows={2}
                    className="w-full resize-y rounded-xl border border-[#dbe7f3] bg-white px-3.5 py-2.5 text-[13px] text-[#0a1628] outline-none transition-colors focus:border-[#1677f2]"
                  />
                ) : (
                  <input
                    type="text"
                    value={fields[def.name] ?? ""}
                    onChange={(e) => update(def.name, e.target.value)}
                    className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3.5 py-2.5 text-[13px] text-[#0a1628] outline-none transition-colors focus:border-[#1677f2]"
                  />
                )}
                {def.hint && <p className="mt-1 text-[11px] text-[#94a3b8]">{def.hint}</p>}
              </div>
            ))}
          </div>
        )}

        {(error || notice) && (
          <div className="px-6 pb-2">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[12px] font-medium text-red-700">
                {error}
              </div>
            )}
            {notice && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-[12px] font-medium text-green-700">
                {notice}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 border-t border-[#f0f4f8] bg-[#f8fafc] px-6 py-4">
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="rounded-xl bg-[#1677f2] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0f63d6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save & Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
