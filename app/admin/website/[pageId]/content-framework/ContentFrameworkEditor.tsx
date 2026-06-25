"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, inputCls } from "../../_kit";

interface TrustCard { number: string; icon: string; title: string; text: string; buttonText: string; buttonLink: string; visible: boolean }

export default function ContentFrameworkEditor() {
  const { fields, updatedAt, loading, saving, error, notice, save } = useSection("homepage.contentFramework");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [cards, setCards] = useState<TrustCard[]>([]);

  const SCALARS = ["label", "heading", "description", "buttonText", "buttonLink"];

  useEffect(() => {
    if (fields) {
      const v: Record<string, string> = {};
      for (const k of SCALARS) v[k] = String(fields[k] ?? "");
      setVals(v);
      setCards(Array.isArray(fields.cards) ? (fields.cards as TrustCard[]) : []);
    }
  }, [fields]);

  const setCard = (i: number, patch: Partial<TrustCard>) => setCards((cs) => cs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const addCard = () => setCards((cs) => [...cs, { number: String(cs.length + 1), icon: "", title: "New card", text: "", buttonText: "", buttonLink: "", visible: true }]);
  const removeCard = (i: number) => setCards((cs) => cs.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => setCards((cs) => { const j = i + dir; if (j < 0 || j >= cs.length) return cs; const n = [...cs]; [n[i], n[j]] = [n[j], n[i]]; return n; });

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Content, Compliance & Trust" subtitle="The three trust cards + section button" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Section Heading & Button">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Field label="Section label"><input value={vals.label ?? ""} onChange={(e) => setVals((p) => ({ ...p, label: e.target.value }))} className={inputCls} /></Field></div>
              <div className="sm:col-span-2"><Field label="Heading"><input value={vals.heading ?? ""} onChange={(e) => setVals((p) => ({ ...p, heading: e.target.value }))} className={inputCls} /></Field></div>
              <div className="sm:col-span-2"><Field label="Description"><textarea value={vals.description ?? ""} onChange={(e) => setVals((p) => ({ ...p, description: e.target.value }))} rows={2} className={inputCls + " resize-y"} /></Field></div>
              <Field label="Section button text"><input value={vals.buttonText ?? ""} onChange={(e) => setVals((p) => ({ ...p, buttonText: e.target.value }))} className={inputCls} /></Field>
              <Field label="Section button link"><input value={vals.buttonLink ?? ""} onChange={(e) => setVals((p) => ({ ...p, buttonLink: e.target.value }))} className={inputCls + " font-mono text-[11px]"} /></Field>
            </div>
          </Card>

          <Card title={`Cards (${cards.length})`} action={<button onClick={addCard} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add card</button>}>
            <div className="space-y-4">
              {cards.map((card, i) => (
                <div key={i} className={`rounded-xl border p-4 ${card.visible ? "border-[#e8eef5] bg-[#fbfdff]" : "border-[#e8eef5] bg-[#f3f4f6] opacity-75"}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#94a3b8]">Card {i + 1}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => move(i, -1)} className="rounded-md border border-[#dbe7f3] px-2 py-1 text-[11px] text-[#64748b] hover:bg-white">↑</button>
                      <button onClick={() => move(i, 1)} className="rounded-md border border-[#dbe7f3] px-2 py-1 text-[11px] text-[#64748b] hover:bg-white">↓</button>
                      <label className="flex items-center gap-1 text-[11px] text-[#64748b]"><input type="checkbox" checked={card.visible} onChange={(e) => setCard(i, { visible: e.target.checked })} /> Show on website</label>
                      <button onClick={() => removeCard(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[70px_70px_1fr]">
                    <Field label="Number"><input value={card.number} onChange={(e) => setCard(i, { number: e.target.value })} className={inputCls + " text-center"} /></Field>
                    <Field label="Icon"><input value={card.icon} onChange={(e) => setCard(i, { icon: e.target.value })} placeholder="(opt)" className={inputCls + " text-center"} /></Field>
                    <Field label="Title"><input value={card.title} onChange={(e) => setCard(i, { title: e.target.value })} className={inputCls} /></Field>
                  </div>
                  <div className="mt-3"><Field label="Description"><textarea value={card.text} onChange={(e) => setCard(i, { text: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field></div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Button text (optional)"><input value={card.buttonText} onChange={(e) => setCard(i, { buttonText: e.target.value })} className={inputCls} /></Field>
                    <Field label="Button link (optional)"><input value={card.buttonLink} onChange={(e) => setCard(i, { buttonLink: e.target.value })} className={inputCls + " font-mono text-[11px]"} /></Field>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => save({ ...vals, cards })} />
        </div>
      )}
    </div>
  );
}
