"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, inputCls } from "../../_kit";

interface CaseHighlight { category: string; title: string; description: string; support: string; outcome: string; disclaimer: string; visible: boolean }

export default function CaseHighlightsEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.caseStudies");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [cases, setCases] = useState<CaseHighlight[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const SCALARS = ["label", "heading", "subheading", "intro", "disclaimer", "closingLine"];

  useEffect(() => {
    if (fields) {
      const v: Record<string, string> = {};
      for (const k of SCALARS) v[k] = String(fields[k] ?? "");
      setVals(v);
      setCases(Array.isArray(fields.cases) ? (fields.cases as CaseHighlight[]) : []);
    }
  }, [fields]);

  const setCase = (i: number, patch: Partial<CaseHighlight>) => setCases((cs) => cs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const addCase = () => setCases((cs) => [...cs, { category: "🏛️ Regulator", title: "New case", description: "", support: "", outcome: "", disclaimer: "Indicative experience only. Approval subject to regulator review, eligibility, documentation and applicable law.", visible: true }]);
  const removeCase = (i: number) => setCases((cs) => cs.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => setCases((cs) => {
    const j = i + dir; if (j < 0 || j >= cs.length) return cs;
    const next = [...cs]; [next[i], next[j]] = [next[j], next[i]]; return next;
  });

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Regulatory Experience / Case Highlights" subtitle="Compliance-sensitive — avoid any approval guarantees" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800">
            <strong>Compliance reminder:</strong> Do not use wording that guarantees any registration, licence or approval
            (e.g. &ldquo;guaranteed approval&rdquo;, &ldquo;assured licence&rdquo;, &ldquo;RBI/SEBI/IRDAI approved consultant&rdquo;).
            Use advisory/support wording and keep &ldquo;subject to regulator review&rdquo; framing.
          </div>

          <Card title="Section Heading">
            <div className="space-y-5">
              <Field label="Section label"><input value={vals.label ?? ""} onChange={(e) => setVals((p) => ({ ...p, label: e.target.value }))} className={inputCls} /></Field>
              <Field label="Main heading"><input value={vals.heading ?? ""} onChange={(e) => setVals((p) => ({ ...p, heading: e.target.value }))} className={inputCls} /></Field>
              <Field label="Subheading"><input value={vals.subheading ?? ""} onChange={(e) => setVals((p) => ({ ...p, subheading: e.target.value }))} className={inputCls} /></Field>
              <Field label="Intro paragraph"><textarea value={vals.intro ?? ""} onChange={(e) => setVals((p) => ({ ...p, intro: e.target.value }))} rows={2} className={inputCls + " resize-y"} /></Field>
            </div>
          </Card>

          <Card title={`Case Cards (${cases.length})`} action={<button onClick={addCase} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add case</button>}>
            <div className="space-y-4">
              {cases.map((cs, i) => (
                <div key={i} className={`rounded-xl border p-4 ${cs.visible ? "border-[#e8eef5] bg-[#fbfdff]" : "border-[#e8eef5] bg-[#f3f4f6] opacity-75"}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#94a3b8]">Case {i + 1}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => move(i, -1)} title="Move up" className="rounded-md border border-[#dbe7f3] px-2 py-1 text-[11px] text-[#64748b] hover:bg-white">↑</button>
                      <button onClick={() => move(i, 1)} title="Move down" className="rounded-md border border-[#dbe7f3] px-2 py-1 text-[11px] text-[#64748b] hover:bg-white">↓</button>
                      <label className="flex items-center gap-1 text-[11px] text-[#64748b]"><input type="checkbox" checked={cs.visible} onChange={(e) => setCase(i, { visible: e.target.checked })} /> Show on website</label>
                      <button onClick={() => removeCase(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
                    <Field label="Case category"><input value={cs.category} onChange={(e) => setCase(i, { category: e.target.value })} className={inputCls} /></Field>
                    <Field label="Case title"><input value={cs.title} onChange={(e) => setCase(i, { title: e.target.value })} className={inputCls} /></Field>
                  </div>
                  <div className="mt-3"><Field label="Case description"><textarea value={cs.description} onChange={(e) => setCase(i, { description: e.target.value })} rows={3} className={inputCls + " resize-y"} /></Field></div>
                  <div className="mt-3"><Field label="Indicative support provided"><textarea value={cs.support} onChange={(e) => setCase(i, { support: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field></div>
                  <div className="mt-3"><Field label="Outcome wording" hint="Keep non-guaranteeing — e.g. 'subject to regulator review'."><input value={cs.outcome} onChange={(e) => setCase(i, { outcome: e.target.value })} className={inputCls} /></Field></div>
                  <div className="mt-3"><Field label="Disclaimer note (this card)"><input value={cs.disclaimer} onChange={(e) => setCase(i, { disclaimer: e.target.value })} className={inputCls} /></Field></div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Disclaimer & Closing">
            <div className="space-y-5">
              <Field label="Section disclaimer" hint="The final disclaimer wording shown under all cases. You control this.">
                <textarea value={vals.disclaimer ?? ""} onChange={(e) => setVals((p) => ({ ...p, disclaimer: e.target.value }))} rows={3} className={inputCls + " resize-y"} />
              </Field>
              <Field label="Closing line"><input value={vals.closingLine ?? ""} onChange={(e) => setVals((p) => ({ ...p, closingLine: e.target.value }))} className={inputCls} /></Field>
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ ...vals, cases }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
