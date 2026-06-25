"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, inputCls } from "../../_kit";

interface Pillar { title: string; body: string }

export default function WhyEstabizzEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.whyChooseUs");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const SCALARS = ["label", "heading", "quote", "description", "highlightBox"];

  useEffect(() => {
    if (fields) {
      const v: Record<string, string> = {};
      for (const k of SCALARS) v[k] = String(fields[k] ?? "");
      setVals(v);
      setPillars(Array.isArray(fields.pillars) ? (fields.pillars as Pillar[]) : []);
    }
  }, [fields]);

  const setPillar = (i: number, patch: Partial<Pillar>) => setPillars((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  const addPillar = () => setPillars((ps) => [...ps, { title: "New reason", body: "" }]);
  const removePillar = (i: number) => setPillars((ps) => ps.filter((_, j) => j !== i));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Why Estabizz" subtitle="Trust pillars section" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Heading & Intro">
            <div className="space-y-5">
              <Field label="Label"><input value={vals.label ?? ""} onChange={(e) => setVals((p) => ({ ...p, label: e.target.value }))} className={inputCls} /></Field>
              <Field label="Heading"><input value={vals.heading ?? ""} onChange={(e) => setVals((p) => ({ ...p, heading: e.target.value }))} className={inputCls} /></Field>
              <Field label="Quote (blue italic line)"><input value={vals.quote ?? ""} onChange={(e) => setVals((p) => ({ ...p, quote: e.target.value }))} className={inputCls} /></Field>
              <Field label="Description"><textarea value={vals.description ?? ""} onChange={(e) => setVals((p) => ({ ...p, description: e.target.value }))} rows={2} className={inputCls + " resize-y"} /></Field>
              <Field label="Highlight box"><textarea value={vals.highlightBox ?? ""} onChange={(e) => setVals((p) => ({ ...p, highlightBox: e.target.value }))} rows={2} className={inputCls + " resize-y"} /></Field>
            </div>
          </Card>

          <Card title={`Reason Cards (${pillars.length})`} action={<button onClick={addPillar} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add</button>}>
            <div className="space-y-4">
              {pillars.map((p, i) => (
                <div key={i} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#94a3b8]">Reason {i + 1}</span>
                    <button onClick={() => removePillar(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete</button>
                  </div>
                  <Field label="Title"><input value={p.title} onChange={(e) => setPillar(i, { title: e.target.value })} className={inputCls} /></Field>
                  <div className="mt-3"><Field label="Description"><textarea value={p.body} onChange={(e) => setPillar(i, { body: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field></div>
                </div>
              ))}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ ...vals, pillars }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
