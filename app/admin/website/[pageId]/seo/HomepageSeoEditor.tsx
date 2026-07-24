"use client";

import { useEffect, useMemo, useState } from "react";
import { SEO_HOMEPAGE_DEFAULTS, type SeoContent } from "@/lib/content/seoDefaults";
import { useSection, EditorHeader, Card, Field, LoadingCard, SaveBar, inputCls } from "../../_kit";
import { EstabizzSelect } from "@/components/ui/EstabizzSelect";

const SCHEMA_TYPES = ["WebSite", "Organization", "ProfessionalService", "LocalBusiness"];

function readText(fields: Record<string, unknown>, key: keyof SeoContent): string {
  const value = fields[key];
  return typeof value === "string" ? value : String(SEO_HOMEPAGE_DEFAULTS[key] ?? "");
}

function readBool(fields: Record<string, unknown>, key: keyof SeoContent): boolean {
  const value = fields[key];
  const fallback = SEO_HOMEPAGE_DEFAULTS[key];
  return typeof value === "boolean" ? value : Boolean(fallback);
}

function normalizedSeo(fields: Record<string, unknown>): SeoContent {
  return {
    seoTitle: readText(fields, "seoTitle"),
    metaDescription: readText(fields, "metaDescription"),
    focusKeyword: readText(fields, "focusKeyword"),
    slug: "/",
    canonicalUrl: readText(fields, "canonicalUrl") || "/",
    ogTitle: readText(fields, "ogTitle"),
    ogDescription: readText(fields, "ogDescription"),
    ogImage: readText(fields, "ogImage"),
    twitterTitle: readText(fields, "twitterTitle"),
    twitterDescription: readText(fields, "twitterDescription"),
    robotsIndex: readBool(fields, "robotsIndex"),
    robotsFollow: readBool(fields, "robotsFollow"),
    schemaType: SCHEMA_TYPES.includes(readText(fields, "schemaType")) ? readText(fields, "schemaType") : SEO_HOMEPAGE_DEFAULTS.schemaType,
  };
}

export default function HomepageSeoEditor() {
  const { fields, updatedAt, loading, saving, error, notice, save } = useSection("seo.homepage");
  const [seo, setSeo] = useState<SeoContent>(SEO_HOMEPAGE_DEFAULTS);

  useEffect(() => {
    if (fields) setSeo(normalizedSeo(fields));
  }, [fields]);

  const preview = useMemo(() => {
    const title = seo.seoTitle.trim() || SEO_HOMEPAGE_DEFAULTS.seoTitle;
    const description = seo.metaDescription.trim() || SEO_HOMEPAGE_DEFAULTS.metaDescription;
    return {
      title,
      description,
      url: "https://www.estabizz.com/",
    };
  }, [seo.metaDescription, seo.seoTitle]);

  const setField = <K extends keyof SeoContent>(key: K, value: SeoContent[K]) => {
    setSeo((current) => ({ ...current, [key]: value }));
  };

  const saveSeo = () => {
    save({
      ...seo,
      slug: "/",
      canonicalUrl: seo.canonicalUrl.trim() || "/",
      seoTitle: seo.seoTitle,
      metaDescription: seo.metaDescription,
      ogTitle: seo.ogTitle,
      ogDescription: seo.ogDescription,
      twitterTitle: seo.twitterTitle,
      twitterDescription: seo.twitterDescription,
      schemaType: SCHEMA_TYPES.includes(seo.schemaType) ? seo.schemaType : SEO_HOMEPAGE_DEFAULTS.schemaType,
    });
  };

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <EditorHeader title="SEO Settings" subtitle="Homepage search and social preview" updatedAt={updatedAt} />
      {loading ? <LoadingCard /> : (
        <div className="max-w-4xl space-y-6">
          <Card title="Search Preview">
            <div className="rounded-xl border border-[#e2eaf2] bg-white p-5">
              <p className="truncate text-[13px] text-[#202124]">{preview.url}</p>
              <p className="mt-1 text-[20px] leading-6 text-[#1a0dab]">{preview.title}</p>
              <p className="mt-1 text-[14px] leading-5 text-[#4d5156]">{preview.description}</p>
            </div>
          </Card>

          <Card title="Page Details">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="SEO Title">
                  <input value={seo.seoTitle} onChange={(e) => setField("seoTitle", e.target.value)} className={inputCls} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Meta Description">
                  <textarea value={seo.metaDescription} onChange={(e) => setField("metaDescription", e.target.value)} rows={3} className={inputCls + " resize-y"} />
                </Field>
              </div>
              <Field label="Focus Keyword">
                <input value={seo.focusKeyword} onChange={(e) => setField("focusKeyword", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Page URL" hint="The homepage always opens at / and this field cannot change that route.">
                <input value="/" readOnly className={inputCls + " bg-[#f8fafc] font-mono text-[11px]"} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Canonical URL">
                  <input value={seo.canonicalUrl} onChange={(e) => setField("canonicalUrl", e.target.value)} placeholder="/" className={inputCls} />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Social Sharing">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Social Title">
                <input value={seo.ogTitle} onChange={(e) => setField("ogTitle", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Twitter Title">
                <input value={seo.twitterTitle} onChange={(e) => setField("twitterTitle", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Social Description">
                <textarea value={seo.ogDescription} onChange={(e) => setField("ogDescription", e.target.value)} rows={3} className={inputCls + " resize-y"} />
              </Field>
              <Field label="Twitter Description">
                <textarea value={seo.twitterDescription} onChange={(e) => setField("twitterDescription", e.target.value)} rows={3} className={inputCls + " resize-y"} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Social Image">
                  <input value={seo.ogImage} onChange={(e) => setField("ogImage", e.target.value)} placeholder="https://..." className={inputCls} />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Search Controls">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-xl border border-[#e2eaf2] bg-[#fbfdff] px-4 py-3 text-[13px] font-semibold text-[#334155]">
                <input type="checkbox" checked={seo.robotsIndex} onChange={(e) => setField("robotsIndex", e.target.checked)} />
                Allow Search Engines
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-[#e2eaf2] bg-[#fbfdff] px-4 py-3 text-[13px] font-semibold text-[#334155]">
                <input type="checkbox" checked={seo.robotsFollow} onChange={(e) => setField("robotsFollow", e.target.checked)} />
                Allow Links To Be Followed
              </label>
              <Field label="Schema Type">
                <EstabizzSelect
                  variant="admin"
                  value={seo.schemaType}
                  onValueChange={(v) => setField("schemaType", v)}
                  options={SCHEMA_TYPES.map((t) => ({ value: t, label: t }))}
                />
              </Field>
            </div>
          </Card>

          <SaveBar saving={saving} error={error} notice={notice} onSave={saveSeo} />
        </div>
      )}
    </div>
  );
}
