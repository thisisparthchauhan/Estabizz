"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, StringList, inputCls } from "../../_kit";

interface Feature { title: string; text: string }
interface Region { title: string; description: string; markets: string[]; accent: string }

const SCALARS: { name: string; label: string; multiline?: boolean }[] = [
  { name: "label", label: "Label" },
  { name: "headingMain", label: "Heading (main part)" },
  { name: "headingHighlight", label: "Heading (blue highlighted part)" },
  { name: "description", label: "Description", multiline: true },
  { name: "primaryBtnText", label: "Primary button text" },
  { name: "primaryBtnLink", label: "Primary button link" },
  { name: "whatsappText", label: "WhatsApp button text" },
  { name: "whatsappLink", label: "WhatsApp link" },
];

export default function GlobalMarketsEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.globalMarkets");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [features, setFeatures] = useState<Feature[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      const v: Record<string, string> = {};
      for (const f of SCALARS) v[f.name] = String(fields[f.name] ?? "");
      setVals(v);
      setFeatures(Array.isArray(fields.features) ? (fields.features as Feature[]) : []);
      setRegions(Array.isArray(fields.regions) ? (fields.regions as Region[]) : []);
    }
  }, [fields]);

  const setFeature = (i: number, patch: Partial<Feature>) => setFeatures((fs) => fs.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  const setRegion = (i: number, patch: Partial<Region>) => setRegions((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const addRegion = () => setRegions((rs) => [...rs, { title: "New region", description: "", markets: [], accent: "#1677f2" }]);
  const removeRegion = (i: number) => setRegions((rs) => rs.filter((_, j) => j !== i));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Global Market Desk" subtitle="The India → Global expansion section" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Heading & Buttons">
            <div className="grid gap-5 sm:grid-cols-2">
              {SCALARS.map((f) => (
                <div key={f.name} className={f.multiline ? "sm:col-span-2" : ""}>
                  <Field label={f.label}>
                    {f.multiline ? (
                      <textarea value={vals[f.name] ?? ""} onChange={(e) => setVals((p) => ({ ...p, [f.name]: e.target.value }))} rows={2} className={inputCls + " resize-y"} />
                    ) : (
                      <input value={vals[f.name] ?? ""} onChange={(e) => setVals((p) => ({ ...p, [f.name]: e.target.value }))} className={inputCls} />
                    )}
                  </Field>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Feature Boxes (3 small cards)">
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="grid gap-2 rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-3 sm:grid-cols-[1fr_1.6fr]">
                  <input value={f.title} onChange={(e) => setFeature(i, { title: e.target.value })} placeholder="Title" className={inputCls} />
                  <input value={f.text} onChange={(e) => setFeature(i, { text: e.target.value })} placeholder="Text" className={inputCls} />
                </div>
              ))}
            </div>
          </Card>

          <Card title={`Region Cards (${regions.length})`} action={<button onClick={addRegion} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add region</button>}>
            <div className="space-y-4">
              {regions.map((r, i) => (
                <div key={i} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#94a3b8]">Region {i + 1}</span>
                    <button onClick={() => removeRegion(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[1fr_90px]">
                    <Field label="Title"><input value={r.title} onChange={(e) => setRegion(i, { title: e.target.value })} className={inputCls} /></Field>
                    <Field label="Accent"><input type="color" value={r.accent} onChange={(e) => setRegion(i, { accent: e.target.value })} className="h-[38px] w-full rounded-lg border border-[#dbe7f3] bg-white" /></Field>
                  </div>
                  <div className="mt-3"><Field label="Description"><textarea value={r.description} onChange={(e) => setRegion(i, { description: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field></div>
                  <div className="mt-3"><Field label="Markets"><StringList items={r.markets ?? []} onChange={(markets) => setRegion(i, { markets })} placeholder="Country / market" /></Field></div>
                </div>
              ))}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ ...vals, features, regions }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
