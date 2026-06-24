"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, StringList, inputCls } from "../../_kit";

interface SolutionCard { num: string; icon: string; title: string; subtitle: string; body: string; tags: string[]; href: string }

export default function SolutionsEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.solutions");
  const [label, setLabel] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<SolutionCard[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      setLabel(String(fields.label ?? ""));
      setHeading(String(fields.heading ?? ""));
      setDescription(String(fields.description ?? ""));
      setCards(Array.isArray(fields.cards) ? (fields.cards as SolutionCard[]) : []);
    }
  }, [fields]);

  const setCard = (i: number, patch: Partial<SolutionCard>) => setCards((cs) => cs.map((c, j) => (j === i ? { ...c, ...patch } : c)));
  const addCard = () => setCards((cs) => [...cs, { num: String(cs.length + 1).padStart(2, "0"), icon: "⭐", title: "New card", subtitle: "", body: "", tags: [], href: "/services" }]);
  const removeCard = (i: number) => setCards((cs) => cs.filter((_, j) => j !== i));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Business Stage Solutions" subtitle="The audience cards section" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Section Heading">
            <div className="space-y-5">
              <Field label="Label"><input value={label} onChange={(e) => setLabel(e.target.value)} className={inputCls} /></Field>
              <Field label="Heading"><textarea value={heading} onChange={(e) => setHeading(e.target.value)} rows={2} className={inputCls + " resize-y"} /></Field>
              <Field label="Description"><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputCls + " resize-y"} /></Field>
            </div>
          </Card>

          <Card title={`Cards (${cards.length})`} action={<button onClick={addCard} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add card</button>}>
            <div className="space-y-4">
              {cards.map((card, i) => (
                <div key={i} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#94a3b8]">Card {i + 1}</span>
                    <button onClick={() => removeCard(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete card</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[60px_60px_1fr]">
                    <Field label="No."><input value={card.num} onChange={(e) => setCard(i, { num: e.target.value })} className={inputCls + " text-center"} /></Field>
                    <Field label="Icon"><input value={card.icon} onChange={(e) => setCard(i, { icon: e.target.value })} className={inputCls + " text-center"} /></Field>
                    <Field label="Title"><input value={card.title} onChange={(e) => setCard(i, { title: e.target.value })} className={inputCls} /></Field>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Subtitle"><input value={card.subtitle} onChange={(e) => setCard(i, { subtitle: e.target.value })} className={inputCls} /></Field>
                    <Field label="Button link"><input value={card.href} onChange={(e) => setCard(i, { href: e.target.value })} className={inputCls + " font-mono text-[11px]"} /></Field>
                  </div>
                  <div className="mt-3">
                    <Field label="Description"><textarea value={card.body} onChange={(e) => setCard(i, { body: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field>
                  </div>
                  <div className="mt-3">
                    <Field label="Tags"><StringList items={card.tags ?? []} onChange={(tags) => setCard(i, { tags })} placeholder="Tag" /></Field>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ label, heading, description, cards }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
