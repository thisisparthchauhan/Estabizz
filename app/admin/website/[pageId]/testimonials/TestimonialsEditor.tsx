"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, StringList, inputCls } from "../../_kit";
import { EstabizzSelect } from "@/components/ui/EstabizzSelect";

type ConsentStatus = "consent_received" | "internal_only" | "do_not_publish";
interface Testimonial { name: string; designation: string; company: string; feedback: string; category: string; rating: number; consent: ConsentStatus; visible: boolean }

const CONSENT_OPTIONS: { value: ConsentStatus; label: string }[] = [
  { value: "consent_received", label: "Consent received" },
  { value: "internal_only", label: "Internal only" },
  { value: "do_not_publish", label: "Do not publish" },
];

export default function TestimonialsEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.testimonials");
  const [heading, setHeading] = useState("");
  const [intro, setIntro] = useState("");
  const [footnote, setFootnote] = useState("");
  const [emptyBehavior, setEmptyBehavior] = useState<"coming_soon" | "hidden">("coming_soon");
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [items, setItems] = useState<Testimonial[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      setHeading(String(fields.heading ?? ""));
      setIntro(String(fields.intro ?? ""));
      setFootnote(String(fields.footnote ?? ""));
      setEmptyBehavior(fields.emptyBehavior === "hidden" ? "hidden" : "coming_soon");
      setPlaceholders(Array.isArray(fields.placeholders) ? (fields.placeholders as string[]) : []);
      setItems(Array.isArray(fields.testimonials) ? (fields.testimonials as Testimonial[]) : []);
    }
  }, [fields]);

  const setItem = (i: number, patch: Partial<Testimonial>) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const addItem = () => setItems((xs) => [...xs, { name: "", designation: "", company: "", feedback: "", category: "", rating: 0, consent: "internal_only", visible: false }]);
  const removeItem = (i: number) => setItems((xs) => xs.filter((_, j) => j !== i));

  const publicCount = items.filter((t) => t.consent === "consent_received" && t.visible).length;

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Testimonials" subtitle="Only 'Consent received' + shown items appear publicly" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-[12px] text-blue-800">
            A testimonial appears on the website only when its consent status is <strong>Consent received</strong> and <strong>Show on website</strong> is on.
            Right now <strong>{publicCount}</strong> testimonial(s) will show publicly.
          </div>

          <Card title="Section Heading">
            <div className="space-y-5">
              <Field label="Heading"><input value={heading} onChange={(e) => setHeading(e.target.value)} className={inputCls} /></Field>
              <Field label="Description"><textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={2} className={inputCls + " resize-y"} /></Field>
              <Field label="Footnote"><textarea value={footnote} onChange={(e) => setFootnote(e.target.value)} rows={2} className={inputCls + " resize-y"} /></Field>
            </div>
          </Card>

          <Card title="When there are no public testimonials">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[13px] text-[#334155]">
                <input type="radio" checked={emptyBehavior === "coming_soon"} onChange={() => setEmptyBehavior("coming_soon")} />
                Show &ldquo;Client feedback coming soon&rdquo; placeholders
              </label>
              <label className="flex items-center gap-2 text-[13px] text-[#334155]">
                <input type="radio" checked={emptyBehavior === "hidden"} onChange={() => setEmptyBehavior("hidden")} />
                Hide the whole section
              </label>
              {emptyBehavior === "coming_soon" && (
                <div className="pt-2">
                  <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">Placeholder category labels</label>
                  <StringList items={placeholders} onChange={setPlaceholders} placeholder="Category label" />
                </div>
              )}
            </div>
          </Card>

          <Card title={`Testimonials (${items.length})`} action={<button onClick={addItem} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add</button>}>
            <div className="space-y-4">
              {items.map((t, i) => {
                const isPublic = t.consent === "consent_received" && t.visible;
                return (
                  <div key={i} className={`rounded-xl border p-4 ${isPublic ? "border-green-200 bg-green-50/40" : "border-[#e8eef5] bg-[#fbfdff]"}`}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-black text-[#94a3b8]">
                        {i + 1} · {isPublic ? <span className="text-green-600">Public</span> : <span className="text-[#94a3b8]">Not public</span>}
                      </span>
                      <button onClick={() => removeItem(i)} className="rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 hover:bg-red-50">Delete</button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field label="Client name"><input value={t.name} onChange={(e) => setItem(i, { name: e.target.value })} className={inputCls} /></Field>
                      <Field label="Designation"><input value={t.designation} onChange={(e) => setItem(i, { designation: e.target.value })} className={inputCls} /></Field>
                      <Field label="Company"><input value={t.company} onChange={(e) => setItem(i, { company: e.target.value })} className={inputCls} /></Field>
                    </div>
                    <div className="mt-3"><Field label="Feedback"><textarea value={t.feedback} onChange={(e) => setItem(i, { feedback: e.target.value })} rows={2} className={inputCls + " resize-y"} /></Field></div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_120px]">
                      <Field label="Service category"><input value={t.category} onChange={(e) => setItem(i, { category: e.target.value })} className={inputCls} /></Field>
                      <Field label="Rating (0–5)"><input type="number" min={0} max={5} value={t.rating} onChange={(e) => setItem(i, { rating: Number(e.target.value) })} className={inputCls} /></Field>
                    </div>
                    <div className="mt-3 flex flex-wrap items-end gap-4">
                      <div>
                        <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">Consent status</label>
                        <EstabizzSelect
                          variant="admin"
                          value={t.consent}
                          onValueChange={(v) => setItem(i, { consent: v as ConsentStatus })}
                          options={CONSENT_OPTIONS}
                        />
                      </div>
                      <label className="flex items-center gap-2 pb-2 text-[13px] text-[#334155]">
                        <input type="checkbox" checked={t.visible} onChange={(e) => setItem(i, { visible: e.target.checked })} /> Show on website
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ heading, intro, footnote, emptyBehavior, placeholders, testimonials: items }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
