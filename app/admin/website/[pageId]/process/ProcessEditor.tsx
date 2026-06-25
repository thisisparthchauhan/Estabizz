"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, inputCls } from "../../_kit";

interface Step { num: string; title: string; badge: string; body: string }

export default function ProcessEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.process");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [steps, setSteps] = useState<Step[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      setVals({ label: String(fields.label ?? ""), heading: String(fields.heading ?? ""), description: String(fields.description ?? "") });
      setSteps(Array.isArray(fields.steps) ? (fields.steps as Step[]) : []);
    }
  }, [fields]);

  const setStep = (i: number, patch: Partial<Step>) => setSteps((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const addStep = () => setSteps((s) => [...s, { num: String(s.length + 1).padStart(2, "0"), title: "New step", badge: "", body: "" }]);
  const removeStep = (i: number) => setSteps((s) => s.filter((_, j) => j !== i));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Execution Process" subtitle="The numbered steps section" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Section Heading">
            <div className="space-y-5">
              <Field label="Label"><input value={vals.label ?? ""} onChange={(e) => setVals((p) => ({ ...p, label: e.target.value }))} className={inputCls} /></Field>
              <Field label="Heading"><input value={vals.heading ?? ""} onChange={(e) => setVals((p) => ({ ...p, heading: e.target.value }))} className={inputCls} /></Field>
              <Field label="Description"><textarea value={vals.description ?? ""} onChange={(e) => setVals((p) => ({ ...p, description: e.target.value }))} rows={2} className={inputCls + " resize-y"} /></Field>
            </div>
          </Card>

          <Card title={`Steps (${steps.length})`} action={<button onClick={addStep} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add step</button>}>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={i} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#94a3b8]">Step {i + 1}</span>
                    <button onClick={() => removeStep(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[70px_1fr]">
                    <Field label="No."><input value={s.num} onChange={(e) => setStep(i, { num: e.target.value })} className={inputCls + " text-center"} /></Field>
                    <Field label="Title"><input value={s.title} onChange={(e) => setStep(i, { title: e.target.value })} className={inputCls} /></Field>
                  </div>
                  <div className="mt-3"><Field label="Badge"><input value={s.badge} onChange={(e) => setStep(i, { badge: e.target.value })} className={inputCls} /></Field></div>
                  <div className="mt-3"><Field label="Description"><textarea value={s.body} onChange={(e) => setStep(i, { body: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field></div>
                </div>
              ))}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ ...vals, steps }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
