"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, inputCls } from "../../_kit";

interface Tag { name: string; href: string }
interface Service { id: string; icon: string; title: string; href: string; forText: string; desc: string; tags: Tag[] }

export default function RegulatoryServicesEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.regulatoryServices");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [services, setServices] = useState<Service[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      setVals({ headingMain: String(fields.headingMain ?? ""), headingHighlight: String(fields.headingHighlight ?? ""), description: String(fields.description ?? "") });
      setServices(Array.isArray(fields.services) ? (fields.services as Service[]) : []);
    }
  }, [fields]);

  const setSvc = (i: number, patch: Partial<Service>) => setServices((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const addSvc = () => setServices((s) => [...s, { id: `svc${s.length + 1}`, icon: "⭐", title: "New service", href: "/services", forText: "", desc: "", tags: [] }]);
  const removeSvc = (i: number) => setServices((s) => s.filter((_, j) => j !== i));
  const setTag = (si: number, ti: number, patch: Partial<Tag>) => setServices((s) => s.map((x, j) => j === si ? { ...x, tags: x.tags.map((t, k) => (k === ti ? { ...t, ...patch } : t)) } : x));
  const addTag = (si: number) => setServices((s) => s.map((x, j) => j === si ? { ...x, tags: [...x.tags, { name: "", href: "" }] } : x));
  const removeTag = (si: number, ti: number) => setServices((s) => s.map((x, j) => j === si ? { ...x, tags: x.tags.filter((_, k) => k !== ti) } : x));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Regulatory Services" subtitle="The 8 service category cards" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Section Heading">
            <div className="space-y-5">
              <Field label="Heading (main part)"><input value={vals.headingMain ?? ""} onChange={(e) => setVals((p) => ({ ...p, headingMain: e.target.value }))} className={inputCls} /></Field>
              <Field label="Heading (blue highlighted part)"><input value={vals.headingHighlight ?? ""} onChange={(e) => setVals((p) => ({ ...p, headingHighlight: e.target.value }))} className={inputCls} /></Field>
              <Field label="Description"><textarea value={vals.description ?? ""} onChange={(e) => setVals((p) => ({ ...p, description: e.target.value }))} rows={2} className={inputCls + " resize-y"} /></Field>
            </div>
          </Card>

          <Card title={`Service Cards (${services.length})`} action={<button onClick={addSvc} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add service</button>}>
            <div className="space-y-4">
              {services.map((svc, i) => (
                <div key={i} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#94a3b8]">Service {i + 1}</span>
                    <button onClick={() => removeSvc(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[60px_1fr_1fr]">
                    <Field label="Icon"><input value={svc.icon} onChange={(e) => setSvc(i, { icon: e.target.value })} className={inputCls + " text-center"} /></Field>
                    <Field label="Title"><input value={svc.title} onChange={(e) => setSvc(i, { title: e.target.value })} className={inputCls} /></Field>
                    <Field label="Card link"><input value={svc.href} onChange={(e) => setSvc(i, { href: e.target.value })} className={inputCls + " font-mono text-[11px]"} /></Field>
                  </div>
                  <div className="mt-3"><Field label="For (audience line)"><input value={svc.forText} onChange={(e) => setSvc(i, { forText: e.target.value })} className={inputCls} /></Field></div>
                  <div className="mt-3"><Field label="Description"><textarea value={svc.desc} onChange={(e) => setSvc(i, { desc: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field></div>
                  <div className="mt-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-[12px] font-bold text-[#334155]">Service tags (name + link)</label>
                      <button onClick={() => addTag(i)} className="text-[11px] font-bold text-[#1677f2] hover:underline">+ Add tag</button>
                    </div>
                    <div className="space-y-1.5">
                      {svc.tags.map((t, ti) => (
                        <div key={ti} className="flex items-center gap-1.5">
                          <input value={t.name} onChange={(e) => setTag(i, ti, { name: e.target.value })} placeholder="Tag name" className={inputCls} />
                          <input value={t.href} onChange={(e) => setTag(i, ti, { href: e.target.value })} placeholder="/path" className={inputCls + " font-mono text-[11px]"} />
                          <button onClick={() => removeTag(i, ti)} title="Remove" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ ...vals, services }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
