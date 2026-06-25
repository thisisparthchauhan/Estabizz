"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, StringList, inputCls } from "../../_kit";

interface Feature { icon: string; title: string; desc: string; color: string }

const SCALARS: { name: string; label: string; multiline?: boolean }[] = [
  { name: "label", label: "Top label" },
  { name: "heading", label: "Heading" },
  { name: "subtitle", label: "Subtitle" },
  { name: "description", label: "Description", multiline: true },
  { name: "checklistTitle", label: "Checklist title" },
  { name: "primaryBtnText", label: "Primary button text" },
  { name: "primaryBtnLink", label: "Primary button link" },
  { name: "secondaryBtnText", label: "Secondary button text" },
  { name: "secondaryBtnLink", label: "Secondary button link" },
  { name: "footnote", label: "Footnote", multiline: true },
];

export default function CompliancePortalEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.compliancePortal");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [checklist, setChecklist] = useState<string[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      const v: Record<string, string> = {};
      for (const f of SCALARS) v[f.name] = String(fields[f.name] ?? "");
      setVals(v);
      setChecklist(Array.isArray(fields.checklistItems) ? (fields.checklistItems as string[]) : []);
      setFeatures(Array.isArray(fields.features) ? (fields.features as Feature[]) : []);
    }
  }, [fields]);

  const setFeature = (i: number, patch: Partial<Feature>) => setFeatures((fs) => fs.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  const addFeature = () => setFeatures((fs) => [...fs, { icon: "⭐", title: "New feature", desc: "", color: "#1677f2" }]);
  const removeFeature = (i: number) => setFeatures((fs) => fs.filter((_, j) => j !== i));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Compliance Portal" subtitle="The two-column portal section" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Text & Buttons">
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

          <Card title={`Checklist Items (${checklist.length})`}>
            <StringList items={checklist} onChange={setChecklist} placeholder="Checklist item" />
          </Card>

          <Card title={`Feature Cards (${features.length})`} action={<button onClick={addFeature} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add</button>}>
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-3.5">
                  <div className="flex items-center gap-1.5">
                    <input value={f.icon} onChange={(e) => setFeature(i, { icon: e.target.value })} className={inputCls + " w-14 text-center"} title="Icon" />
                    <input value={f.title} onChange={(e) => setFeature(i, { title: e.target.value })} placeholder="Title" className={inputCls} />
                    <input type="color" value={f.color} onChange={(e) => setFeature(i, { color: e.target.value })} className="h-[38px] w-12 shrink-0 rounded-lg border border-[#dbe7f3] bg-white" title="Colour" />
                    <button onClick={() => removeFeature(i)} title="Remove" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
                  </div>
                  <textarea value={f.desc} onChange={(e) => setFeature(i, { desc: e.target.value })} rows={2} placeholder="Description" className={inputCls + " mt-2 resize-y"} />
                </div>
              ))}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ ...vals, checklistItems: checklist, features }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
