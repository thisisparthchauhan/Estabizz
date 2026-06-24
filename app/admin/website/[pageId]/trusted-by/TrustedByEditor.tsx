"use client";

import { useEffect, useState } from "react";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, StringList, inputCls } from "../../_kit";

export default function TrustedByEditor() {
  const { fields, loading, saving, error, notice, save } = useSection("homepage.trustedBy");
  const [heading, setHeading] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    if (fields) {
      setHeading(String(fields.heading ?? ""));
      setDisclaimer(String(fields.disclaimer ?? ""));
      setCompanies(Array.isArray(fields.companies) ? (fields.companies as string[]) : []);
    }
  }, [fields]);

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="Client Logos / Trusted By" subtitle="The scrolling client names strip" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-3xl space-y-6">
          <Card title="Heading & Disclaimer">
            <div className="space-y-5">
              <Field label="Heading"><input value={heading} onChange={(e) => setHeading(e.target.value)} className={inputCls} /></Field>
              <Field label="Disclaimer" hint="Shown small under the heading — keep the non-endorsement wording."><textarea value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} rows={2} className={inputCls + " resize-y"} /></Field>
            </div>
          </Card>
          <Card title={`Client Names (${companies.length})`}>
            <StringList items={companies} onChange={setCompanies} placeholder="Company name" />
          </Card>
          <SaveBar saving={saving} error={error} notice={notice} onSave={() => { save({ heading, disclaimer, companies }); setUpdatedAt(new Date().toISOString()); }} />
        </div>
      )}
    </div>
  );
}
