"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, inputCls } from "../../_kit";

const FIELDS: { name: string; label: string; multiline?: boolean }[] = [
  { name: "heading", label: "CTA heading", multiline: true },
  { name: "paragraph", label: "Paragraph", multiline: true },
  { name: "primaryBtnText", label: "Primary button text" },
  { name: "primaryBtnLink", label: "Primary button link" },
  { name: "phone", label: "Phone number" },
  { name: "whatsappText", label: "WhatsApp button text" },
  { name: "whatsappLink", label: "WhatsApp link" },
  { name: "closingLine", label: "Closing line" },
];

export default function FinalCtaEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.finalCta");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      const v: Record<string, string> = {};
      for (const f of FIELDS) v[f.name] = String(fields[f.name] ?? "");
      setVals(v);
    }
  }, [fields]);

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Final CTA" subtitle="The dark call-to-action band near the footer" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Call To Action">
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
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
          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save(vals); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
