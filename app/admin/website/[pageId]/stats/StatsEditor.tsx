"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, LoadingCard, SaveBar, inputCls } from "../../_kit";

interface StatItem { icon: string; value: string; suffix: string; label: string; animate: boolean }

export default function StatsEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.stats");
  const [items, setItems] = useState<StatItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      setItems(Array.isArray(fields.items) ? (fields.items as StatItem[]) : []);
    }
  }, [fields]);

  const set = (i: number, patch: Partial<StatItem>) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const add = () => setItems((xs) => [...xs, { icon: "⭐", value: "0", suffix: "+", label: "New stat", animate: true }]);
  const remove = (i: number) => setItems((xs) => xs.filter((_, j) => j !== i));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Statistics / Achievements" subtitle="The counter cards below the hero" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Stat Cards" action={<button onClick={add} className="rounded-lg border border-[#1677f2]/30 bg-[#1677f2]/8 px-3 py-1 text-[11px] font-bold text-[#1677f2] hover:bg-[#1677f2]/15">+ Add</button>}>
            <div className="space-y-3">
              {items.map((it, i) => (
                <div key={i} className="rounded-xl border border-[#e8eef5] bg-[#fbfdff] p-3.5">
                  <div className="flex items-center gap-1.5">
                    <input value={it.icon} onChange={(e) => set(i, { icon: e.target.value })} className={inputCls + " w-14 text-center"} title="Icon" />
                    <input value={it.value} onChange={(e) => set(i, { value: e.target.value })} placeholder="500" className={inputCls + " w-24"} title="Value" />
                    <input value={it.suffix} onChange={(e) => set(i, { suffix: e.target.value })} placeholder="+" className={inputCls + " w-16"} title="Suffix" />
                    <input value={it.label} onChange={(e) => set(i, { label: e.target.value })} placeholder="Label" className={inputCls} title="Label" />
                    <button onClick={() => remove(i)} title="Remove" className="shrink-0 rounded-md px-1.5 py-1.5 text-[12px] text-[#94a3b8] hover:bg-red-50 hover:text-red-500">✕</button>
                  </div>
                  <label className="mt-2 flex items-center gap-1.5 text-[11px] text-[#64748b]">
                    <input type="checkbox" checked={it.animate} onChange={(e) => set(i, { animate: e.target.checked })} /> count-up animation (numbers only; the real number stays visible to search engines)
                  </label>
                </div>
              ))}
            </div>
          </Card>
          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ items }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
