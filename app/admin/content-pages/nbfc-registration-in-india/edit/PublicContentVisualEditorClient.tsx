"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import type { AdminContext } from "@/lib/admin/requirePermission";
import type {
  PublicContentBadge,
  PublicContentBreadcrumb,
  PublicContentCtaCard,
  PublicContentExpertProfile,
  PublicContentMenuGroup,
  PublicContentPageStatus,
  PublicContentPageType,
  PublicContentQuickFact,
  PublicContentRegulator,
  PublicContentRelatedPage,
  PublicContentSection,
  PublicContentSourceReference,
  PublicContentHero,
  PublicContentWorkingCopy,
} from "@/lib/publicContent/types";

// ─── Constants ─────────────────────────────────────────────────────────────────

const SAMPLE_FULL_PATH = "/rbi/nbfc-registration-in-india";

type TabKey = "visual" | "structure" | "seo";

type BlockKey =
  | "hero"
  | "summary"
  | "quick-facts"
  | "article-sections"
  | "cta-cards"
  | "related-pages"
  | "source-references"
  | "seo";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface EditorPage {
  id: string;
  title: string;
  slug: string;
  fullPath: string;
  pageType: PublicContentPageType;
  menuGroup: PublicContentMenuGroup;
  category: string;
  regulator: PublicContentRegulator;
  serviceType: string;
  summary: string;
  hero: PublicContentHero | null;
  badges: PublicContentBadge[];
  breadcrumbs: PublicContentBreadcrumb[];
  sections: PublicContentSection[];
  snapshotCards: PublicContentQuickFact[];
  quickFacts: PublicContentQuickFact[];
  ctaCards: PublicContentCtaCard[];
  expertProfile: PublicContentExpertProfile | null;
  relatedPages: PublicContentRelatedPage[];
  sourceReferences: PublicContentSourceReference[];
  reviewedBy: string;
  lastReviewedAt: string | null;
  readingTime: string;
  status: PublicContentPageStatus;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  hasPendingChanges: boolean;
  updatedAt: string;
}

interface ApiResponse {
  page?: EditorPage;
  workingCopy?: PublicContentWorkingCopy;
  hasPendingChanges?: boolean;
  canEdit?: boolean;
  canPublish?: boolean;
  error?: string;
}

interface SaveResponse {
  ok?: boolean;
  hasPendingChanges?: boolean;
  message?: string;
  error?: string;
}

// ─── Block / Tab Definitions ──────────────────────────────────────────────────

const BLOCKS: Array<{ key: BlockKey; label: string; description: string }> = [
  { key: "hero", label: "Hero Section", description: "Top page headline, badges and trust line" },
  { key: "summary", label: "Summary", description: "Main opening explanation" },
  { key: "quick-facts", label: "Quick Facts", description: "Key regulatory facts shown beside the page" },
  { key: "article-sections", label: "Article Sections", description: "Main guide sections and page flow" },
  { key: "cta-cards", label: "CTA Cards", description: "Consultation prompts and closing message" },
  { key: "related-pages", label: "Related Pages", description: "Helpful next pages for readers" },
  { key: "source-references", label: "Source References", description: "Public source links shown on the page" },
  { key: "seo", label: "SEO", description: "Search title, description and canonical URL" },
];

const TAB_LABELS: Array<{ key: TabKey; label: string }> = [
  { key: "visual", label: "Visual Editor" },
  { key: "structure", label: "Content Structure" },
  { key: "seo", label: "SEO & Settings" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function pageToWorkingCopy(page: EditorPage): PublicContentWorkingCopy {
  return {
    title: page.title,
    summary: page.summary,
    hero: page.hero,
    sections: page.sections,
    quickFacts: page.quickFacts,
    ctaCards: page.ctaCards,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    canonicalUrl: page.canonicalUrl,
  };
}

function statusLabel(status: PublicContentPageStatus): string {
  if (status === "published") return "Published";
  if (status === "pending_approval") return "Pending Review";
  return status.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatDate(value: string | null): string {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function previewText(value: string, length = 180): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= length) return text || "Not set";
  return `${text.slice(0, length).trim()}...`;
}

function chipClass(active: boolean): string {
  return active
    ? "border-[#1677f2] bg-[#1677f2] text-white shadow-[0_10px_24px_rgba(22,119,242,0.20)]"
    : "border-blue-100 bg-white text-[#334155] hover:border-[#1677f2]/50 hover:bg-blue-50";
}

function blockClass(active: boolean): string {
  return active
    ? "border-[#1677f2] ring-4 ring-[#1677f2]/10 shadow-[0_18px_44px_rgba(22,119,242,0.13)]"
    : "border-blue-100 hover:border-[#1677f2]/45 hover:shadow-[0_14px_34px_rgba(0,80,140,0.08)]";
}

// ─── Primitive UI ─────────────────────────────────────────────────────────────

function BlockShell({
  blockKey, activeBlock, onSelect, label, children,
}: {
  blockKey: BlockKey; activeBlock: BlockKey; onSelect: (b: BlockKey) => void; label: string; children: React.ReactNode;
}) {
  const active = activeBlock === blockKey;
  return (
    <button type="button" onClick={() => onSelect(blockKey)}
      className={`block w-full rounded-2xl border bg-white p-5 text-left transition ${blockClass(active)}`}>
      <div className="mb-3 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#1677f2]">
        {label}
      </div>
      {children}
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-[#f8fbff] p-3">
      <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#64748b]">{label}</div>
      <div className="mt-1 text-sm font-bold leading-5 text-[#0a1628]">{value || "Not set"}</div>
    </div>
  );
}

function EditField({
  label, value, onChange, multiline = false, rows = 4, maxLength, placeholder, hint, disabled = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number; maxLength?: number; placeholder?: string; hint?: string; disabled?: boolean;
}) {
  const base = "w-full rounded-xl border border-blue-100 bg-[#f8fbff] px-3 text-sm font-medium text-[#0a1628] outline-none transition focus:border-[#1677f2] focus:ring-4 focus:ring-[#1677f2]/10 disabled:opacity-50 disabled:cursor-not-allowed";
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-black uppercase tracking-[0.12em] text-[#64748b]">{label}</label>
        {maxLength !== undefined && (
          <span className={`text-[11px] font-bold ${value.length > maxLength * 0.88 ? "text-amber-500" : "text-[#94a3b8]"}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
          maxLength={maxLength} placeholder={placeholder} disabled={disabled}
          className={`${base} resize-y py-2.5`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength} placeholder={placeholder} disabled={disabled}
          className={`${base} h-10 py-0`} />
      )}
      {hint && <p className="text-[11px] font-medium text-[#94a3b8]">{hint}</p>}
    </div>
  );
}

// ─── Edit Panel ───────────────────────────────────────────────────────────────

function EditPanel({
  workingCopy, activeBlock,
  onUpdateTitle, onUpdateSummary, onUpdateSection, onUpdateQuickFact, onUpdateCtaCard, onSwitchToSeo,
}: {
  workingCopy: PublicContentWorkingCopy; activeBlock: BlockKey;
  onUpdateTitle: (v: string) => void; onUpdateSummary: (v: string) => void;
  onUpdateSection: (i: number, f: "title" | "body", v: string) => void;
  onUpdateQuickFact: (i: number, f: "label" | "value", v: string) => void;
  onUpdateCtaCard: (i: number, f: "title" | "description" | "href" | "label", v: string) => void;
  onSwitchToSeo: () => void;
}) {
  const panelClass = "rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.06)]";
  const sectionHead = "mb-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#1677f2]";

  if (activeBlock === "hero" || activeBlock === "summary") {
    return (
      <div className={panelClass}>
        <div className={sectionHead}>{activeBlock === "hero" ? "Hero Section" : "Summary"}</div>
        <p className="mb-5 text-xs font-medium text-[#64748b]">
          {activeBlock === "hero" ? "Edit the page title and opening summary." : "Edit the main opening explanation shown on the page."}
        </p>
        <div className="grid gap-5">
          {activeBlock === "hero" && (
            <EditField label="Page Title" value={workingCopy.title} onChange={onUpdateTitle}
              maxLength={200} placeholder="Enter the page title" />
          )}
          <EditField label="Opening Summary" value={workingCopy.summary} onChange={onUpdateSummary}
            multiline rows={7} maxLength={5000} placeholder="Enter the opening summary shown on the page" />
        </div>
      </div>
    );
  }

  if (activeBlock === "quick-facts") {
    return (
      <div className={panelClass}>
        <div className={sectionHead}>Quick Facts</div>
        <p className="mb-4 text-xs font-medium text-[#64748b]">{workingCopy.quickFacts.length} facts shown beside the page</p>
        <div className="grid gap-4 max-h-[580px] overflow-y-auto pr-1">
          {workingCopy.quickFacts.map((fact, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-blue-100 bg-[#f8fbff] p-4">
              <div className="text-[11px] font-black text-[#1677f2]">Fact {index + 1}</div>
              <EditField label="Label" value={fact.label}
                onChange={(v) => onUpdateQuickFact(index, "label", v)} maxLength={100} />
              <EditField label="Value" value={fact.value}
                onChange={(v) => onUpdateQuickFact(index, "value", v)} maxLength={200} />
            </div>
          ))}
          {workingCopy.quickFacts.length === 0 && (
            <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 p-6 text-center text-sm font-semibold text-[#64748b]">
              No quick facts found.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeBlock === "article-sections") {
    return (
      <div className={panelClass}>
        <div className={sectionHead}>Article Sections</div>
        <p className="mb-4 text-xs font-medium text-[#64748b]">
          {workingCopy.sections.length} sections — scroll to find and edit each section
        </p>
        <div className="grid gap-5 max-h-[580px] overflow-y-auto pr-1">
          {workingCopy.sections.map((section, index) => (
            <div key={section.id || index} className="grid gap-3 rounded-xl border border-blue-100 bg-[#f8fbff] p-4">
              <div className="text-[11px] font-black text-[#1677f2]">Section {index + 1}</div>
              <EditField label="Section Title" value={section.title || ""}
                onChange={(v) => onUpdateSection(index, "title", v)} maxLength={200} />
              <EditField label="Section Content" value={section.body || ""}
                onChange={(v) => onUpdateSection(index, "body", v)} multiline rows={5} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeBlock === "cta-cards") {
    return (
      <div className={panelClass}>
        <div className={sectionHead}>CTA Cards</div>
        <p className="mb-4 text-xs font-medium text-[#64748b]">{workingCopy.ctaCards.length} cards</p>
        <div className="grid gap-5">
          {workingCopy.ctaCards.map((card, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-blue-100 bg-[#f8fbff] p-4">
              <div className="text-[11px] font-black text-[#1677f2]">Card {index + 1}</div>
              <EditField label="Title" value={card.title}
                onChange={(v) => onUpdateCtaCard(index, "title", v)} maxLength={100} />
              <EditField label="Description" value={card.description || ""}
                onChange={(v) => onUpdateCtaCard(index, "description", v)} multiline rows={3} />
              <EditField label="Button Label" value={card.label || ""}
                onChange={(v) => onUpdateCtaCard(index, "label", v)} maxLength={60}
                placeholder="e.g. Book a Call" />
              <EditField label="Button Link" value={card.href || ""}
                onChange={(v) => onUpdateCtaCard(index, "href", v)}
                placeholder="/contact" hint="Leave blank to keep existing link" />
            </div>
          ))}
          {workingCopy.ctaCards.length === 0 && (
            <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 p-6 text-center text-sm font-semibold text-[#64748b]">
              No CTA cards found.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeBlock === "seo") {
    return (
      <div className={panelClass}>
        <div className={sectionHead}>SEO & Settings</div>
        <p className="mb-5 text-sm font-medium text-[#64748b]">
          SEO fields are available in the SEO & Settings tab.
        </p>
        <button type="button" onClick={onSwitchToSeo}
          className="rounded-xl bg-[#1677f2] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#0866d9]">
          Go to SEO & Settings
        </button>
      </div>
    );
  }

  // related-pages and source-references — read-only this phase
  const block = BLOCKS.find((b) => b.key === activeBlock);
  return (
    <div className={panelClass}>
      <div className={sectionHead}>{block?.label}</div>
      <div className="mt-4 rounded-xl border border-dashed border-blue-200 bg-blue-50 p-8 text-center">
        <div className="text-sm font-black text-[#1677f2]">Coming Soon</div>
        <p className="mt-2 text-xs font-medium text-[#64748b]">
          Editing this section will be available in a future update.
        </p>
      </div>
    </div>
  );
}

// ─── Inspector ────────────────────────────────────────────────────────────────

function Inspector({
  workingCopy, activeBlock,
}: {
  workingCopy: PublicContentWorkingCopy; activeBlock: BlockKey;
}) {
  const block = BLOCKS.find((b) => b.key === activeBlock) ?? BLOCKS[0];

  const details: Array<{ label: string; value: React.ReactNode }> = (() => {
    if (activeBlock === "hero") return [
      { label: "Title", value: workingCopy.title },
      { label: "Trust Line", value: workingCopy.hero?.trustLine || "Not set" },
    ];
    if (activeBlock === "summary") return [
      { label: "Summary", value: previewText(workingCopy.summary, 220) },
    ];
    if (activeBlock === "quick-facts") return [
      { label: "Quick Facts", value: `${workingCopy.quickFacts.length} items` },
      { label: "First Fact", value: workingCopy.quickFacts[0] ? `${workingCopy.quickFacts[0].label}: ${workingCopy.quickFacts[0].value}` : "Not set" },
    ];
    if (activeBlock === "article-sections") return [
      { label: "Sections", value: `${workingCopy.sections.length} sections` },
      { label: "First Section", value: workingCopy.sections[0]?.title || "Not set" },
    ];
    if (activeBlock === "cta-cards") return [
      { label: "CTA Cards", value: `${workingCopy.ctaCards.length} cards` },
      { label: "Primary CTA", value: workingCopy.ctaCards[0]?.title || "Not set" },
    ];
    if (activeBlock === "seo") return [
      { label: "SEO Title", value: workingCopy.seoTitle || "Not set" },
      { label: "SEO Description", value: previewText(workingCopy.seoDescription, 180) },
      { label: "Canonical URL", value: workingCopy.canonicalUrl || SAMPLE_FULL_PATH },
    ];
    return [{ label: block.label, value: block.description }];
  })();

  return (
    <aside className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.07)]">
      <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1677f2]">Section Details</div>
      <h2 className="mt-2 text-xl font-black tracking-tight text-[#120b45]">{block.label}</h2>
      <p className="mt-1 text-sm font-medium leading-6 text-[#64748b]">{block.description}</p>
      <div className="mt-5 grid gap-3">
        {details.map((d) => <DetailRow key={d.label} label={d.label} value={d.value} />)}
      </div>
      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs font-bold leading-5 text-[#1677f2]">
        Working Copy — changes here save to pending only. The live page is unchanged.
      </div>
    </aside>
  );
}

// ─── Visual Preview (view-only) ───────────────────────────────────────────────

function VisualPreview({
  page, activeBlock, onSelect,
}: {
  page: EditorPage; activeBlock: BlockKey; onSelect: (b: BlockKey) => void;
}) {
  const firstSections = page.sections.slice(0, 5);
  return (
    <div className="rounded-[28px] border border-blue-100 bg-[#f6f9ff] p-4 md:p-6">
      <div className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_20px_60px_rgba(0,80,140,0.08)]">
        <div className="bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)] p-5 md:p-7">
          <BlockShell blockKey="hero" activeBlock={activeBlock} onSelect={onSelect} label="Hero Section">
            <div className="flex flex-wrap gap-2">
              {page.badges.slice(0, 6).map((badge) => (
                <span key={badge.label} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-black text-[#1677f2]">{badge.label}</span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#120b45]">{page.hero?.title || page.title}</h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-[#475569]">{page.hero?.description || page.summary}</p>
            {page.hero?.trustLine && (
              <div className="mt-4 rounded-xl border border-blue-100 bg-white/80 p-3 text-sm font-bold text-[#0a1628]">{page.hero.trustLine}</div>
            )}
          </BlockShell>
        </div>
        <div className="grid gap-4 p-5 md:p-7 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-4">
            <BlockShell blockKey="summary" activeBlock={activeBlock} onSelect={onSelect} label="Summary">
              <p className="text-sm font-medium leading-7 text-[#334155]">{previewText(page.summary, 360)}</p>
            </BlockShell>
            <BlockShell blockKey="article-sections" activeBlock={activeBlock} onSelect={onSelect} label="Article Sections">
              <div className="grid gap-3">
                {firstSections.map((section, index) => (
                  <div key={`${section.id || section.title}-${index}`} className="rounded-xl border border-blue-100 bg-[#f8fbff] p-4">
                    <div className="text-[11px] font-black uppercase tracking-[0.12em] text-[#64748b]">Section {index + 1}</div>
                    <div className="mt-1 text-base font-black text-[#0a1628]">{section.title || `Section ${index + 1}`}</div>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#64748b]">{previewText(section.body || "", 160)}</p>
                  </div>
                ))}
                {page.sections.length > firstSections.length && (
                  <div className="rounded-xl border border-dashed border-blue-200 bg-white p-4 text-sm font-bold text-[#1677f2]">
                    {page.sections.length - firstSections.length} more sections in this guide
                  </div>
                )}
              </div>
            </BlockShell>
            <BlockShell blockKey="cta-cards" activeBlock={activeBlock} onSelect={onSelect} label="CTA Cards">
              <div className="grid gap-3 md:grid-cols-2">
                {page.ctaCards.map((card) => (
                  <div key={card.title} className="rounded-xl border border-blue-100 bg-[#0a1628] p-4 text-white">
                    <div className="text-sm font-black">{card.title}</div>
                    <p className="mt-2 text-xs font-medium leading-5 text-blue-100">{card.description}</p>
                  </div>
                ))}
              </div>
            </BlockShell>
          </div>
          <div className="space-y-4">
            <BlockShell blockKey="quick-facts" activeBlock={activeBlock} onSelect={onSelect} label="Quick Facts">
              <div className="grid gap-2">
                {page.quickFacts.slice(0, 6).map((fact) => (
                  <div key={fact.label} className="rounded-xl border border-blue-100 bg-[#f8fbff] p-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#64748b]">{fact.label}</div>
                    <div className="mt-1 text-sm font-black text-[#0a1628]">{fact.value}</div>
                  </div>
                ))}
              </div>
            </BlockShell>
            <BlockShell blockKey="related-pages" activeBlock={activeBlock} onSelect={onSelect} label="Related Pages">
              <div className="space-y-2">
                {page.relatedPages.slice(0, 4).map((related) => (
                  <div key={related.href} className="rounded-xl border border-blue-100 bg-white p-3">
                    <div className="text-sm font-black text-[#0a1628]">{related.title}</div>
                    <div className="mt-1 text-xs font-bold text-[#1677f2]">{related.category || "Related"}</div>
                  </div>
                ))}
              </div>
            </BlockShell>
            <BlockShell blockKey="source-references" activeBlock={activeBlock} onSelect={onSelect} label="Source References">
              <div className="space-y-2">
                {page.sourceReferences.length ? page.sourceReferences.map((source) => (
                  <div key={`${source.title}-${source.url}`} className="rounded-xl border border-blue-100 bg-[#f8fbff] p-3 text-sm font-bold text-[#0a1628]">
                    {source.title}
                  </div>
                )) : (
                  <div className="text-sm font-semibold text-[#64748b]">No source references shown.</div>
                )}
              </div>
            </BlockShell>
            <BlockShell blockKey="seo" activeBlock={activeBlock} onSelect={onSelect} label="SEO">
              <div className="text-sm font-black text-[#0a1628]">{page.seoTitle || page.title}</div>
              <p className="mt-2 text-xs font-medium leading-5 text-[#64748b]">{previewText(page.seoDescription, 160)}</p>
            </BlockShell>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Content Structure Tab ────────────────────────────────────────────────────

function StructureTab({
  workingCopy, onUpdateSection, onUpdateQuickFact, onReset, isDirty,
}: {
  workingCopy: PublicContentWorkingCopy;
  onUpdateSection: (i: number, f: "title" | "body", v: string) => void;
  onUpdateQuickFact: (i: number, f: "label" | "value", v: string) => void;
  onReset: () => void;
  isDirty: boolean;
}) {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">Content Structure</div>
          <p className="mt-1 text-sm font-medium text-[#64748b]">
            Edit all sections and quick facts. Save Pending Changes when ready.
          </p>
        </div>
        {isDirty && (
          <button type="button" onClick={onReset}
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-700 transition hover:bg-amber-100">
            Reset Unsaved Changes
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-blue-100 bg-white p-5">
        <div className="mb-4 text-xs font-black uppercase tracking-[0.12em] text-[#1677f2]">Page Summary</div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {[
            ["Sections", `${workingCopy.sections.length}`],
            ["Quick Facts", `${workingCopy.quickFacts.length}`],
            ["CTA Cards", `${workingCopy.ctaCards.length}`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-blue-100 bg-[#f8fbff] p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#64748b]">{label}</div>
              <div className="mt-1 text-xl font-black text-[#0a1628]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Sections */}
      <div className="rounded-2xl border border-blue-100 bg-white p-5">
        <div className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">
          Article Sections ({workingCopy.sections.length})
        </div>
        <div className="grid gap-5 max-h-[700px] overflow-y-auto pr-1">
          {workingCopy.sections.map((section, index) => (
            <div key={section.id || index} className="grid gap-3 rounded-xl border border-blue-100 bg-[#f8fbff] p-4">
              <div className="text-xs font-black text-[#1677f2]">Section {index + 1}</div>
              <EditField label="Section Title" value={section.title || ""}
                onChange={(v) => onUpdateSection(index, "title", v)} maxLength={200} />
              <EditField label="Section Content" value={section.body || ""}
                onChange={(v) => onUpdateSection(index, "body", v)} multiline rows={4} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Facts */}
      <div className="rounded-2xl border border-blue-100 bg-white p-5">
        <div className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">
          Quick Facts ({workingCopy.quickFacts.length})
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {workingCopy.quickFacts.map((fact, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-blue-100 bg-[#f8fbff] p-4">
              <div className="text-[10px] font-black text-[#1677f2]">Fact {index + 1}</div>
              <EditField label="Label" value={fact.label}
                onChange={(v) => onUpdateQuickFact(index, "label", v)} maxLength={100} />
              <EditField label="Value" value={fact.value}
                onChange={(v) => onUpdateQuickFact(index, "value", v)} maxLength={200} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SEO Tab ──────────────────────────────────────────────────────────────────

function SeoTab({
  workingCopy, page, onUpdateSeo, canEdit,
}: {
  workingCopy: PublicContentWorkingCopy;
  page: EditorPage;
  onUpdateSeo: (f: "seoTitle" | "seoDescription" | "canonicalUrl", v: string) => void;
  canEdit: boolean;
}) {
  return (
    <div className="grid gap-5">
      <div className="rounded-2xl border border-blue-100 bg-white p-5">
        <div className="mb-5 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">Search Engine Settings</div>
        <div className="grid gap-5">
          <EditField label="SEO Title" value={workingCopy.seoTitle}
            onChange={(v) => onUpdateSeo("seoTitle", v)} maxLength={100}
            hint="60 characters recommended for search results"
            disabled={!canEdit} />
          <EditField label="SEO Description" value={workingCopy.seoDescription}
            onChange={(v) => onUpdateSeo("seoDescription", v)} multiline rows={3} maxLength={320}
            hint="160 characters recommended for search results"
            disabled={!canEdit} />
          <EditField label="Canonical URL" value={workingCopy.canonicalUrl}
            onChange={(v) => onUpdateSeo("canonicalUrl", v)}
            hint="Leave blank to use the default page path"
            disabled={!canEdit} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailRow label="Status" value={statusLabel(page.status)} />
        <DetailRow label="Path" value={page.fullPath} />
        <DetailRow label="Reviewed By" value={page.reviewedBy || "Not set"} />
        <DetailRow label="Last Reviewed" value={formatDate(page.lastReviewedAt)} />
        <DetailRow label="Reading Time" value={page.readingTime || "Not set"} />
        <DetailRow label="Last Updated" value={formatDate(page.updatedAt)} />
      </div>
      {!canEdit && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold text-[#1677f2]">
          You can view this page, but you do not have permission to save changes.
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PublicContentVisualEditorClient({ viewer }: { viewer: AdminContext | null }) {
  const canView = viewer?.permissions.includes("view_admin") ?? false;

  const [page, setPage] = useState<EditorPage | null>(null);
  const [workingCopy, setWorkingCopy] = useState<PublicContentWorkingCopy | null>(null);
  const [savedWorkingCopy, setSavedWorkingCopy] = useState<PublicContentWorkingCopy | null>(null);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [loading, setLoading] = useState(canView);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<TabKey>("visual");
  const [activeBlock, setActiveBlock] = useState<BlockKey>("hero");

  const [saving, setSaving] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load page from API
  useEffect(() => {
    if (!canView) return;
    let cancelled = false;

    async function loadPage() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/content-pages/by-path?fullPath=${encodeURIComponent(SAMPLE_FULL_PATH)}`);
        const data = (await res.json()) as ApiResponse;
        if (!res.ok || !data.page) throw new Error(data.error || "Unable to load page.");
        if (!cancelled) {
          setPage(data.page);
          const wc = data.workingCopy ?? pageToWorkingCopy(data.page);
          setWorkingCopy(wc);
          setSavedWorkingCopy(wc);
          setHasPendingChanges(data.hasPendingChanges ?? false);
          setCanEdit(data.canEdit ?? false);
        }
      } catch {
        if (!cancelled) setError("Unable to load the visual editor. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPage();
    return () => { cancelled = true; };
  }, [canView]);

  // Working copy update helpers
  function updateField<K extends keyof PublicContentWorkingCopy>(key: K, value: PublicContentWorkingCopy[K]) {
    setWorkingCopy((prev) => prev ? { ...prev, [key]: value } : prev);
    setIsDirty(true);
    setSaveMessage(null);
  }

  function updateSection(index: number, field: "title" | "body", value: string) {
    setWorkingCopy((prev) => {
      if (!prev) return prev;
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
    setIsDirty(true);
    setSaveMessage(null);
  }

  function updateQuickFact(index: number, field: "label" | "value", value: string) {
    setWorkingCopy((prev) => {
      if (!prev) return prev;
      const quickFacts = [...prev.quickFacts];
      quickFacts[index] = { ...quickFacts[index], [field]: value };
      return { ...prev, quickFacts };
    });
    setIsDirty(true);
    setSaveMessage(null);
  }

  function updateCtaCard(index: number, field: "title" | "description" | "href" | "label", value: string) {
    setWorkingCopy((prev) => {
      if (!prev) return prev;
      const ctaCards = [...prev.ctaCards];
      ctaCards[index] = { ...ctaCards[index], [field]: value };
      return { ...prev, ctaCards };
    });
    setIsDirty(true);
    setSaveMessage(null);
  }

  function updateSeo(field: "seoTitle" | "seoDescription" | "canonicalUrl", value: string) {
    updateField(field, value);
  }

  function handleReset() {
    if (!savedWorkingCopy) return;
    setWorkingCopy(savedWorkingCopy);
    setIsDirty(false);
    setSaveMessage({ type: "success", text: "Unsaved changes reset to last saved state." });
  }

  async function handleSave() {
    if (!workingCopy || !canEdit) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/content-pages/by-path", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullPath: SAMPLE_FULL_PATH, workingCopy }),
      });
      const data = (await res.json()) as SaveResponse;
      if (!res.ok) throw new Error(data.error || "Save failed.");
      setSavedWorkingCopy(workingCopy);
      setHasPendingChanges(true);
      setIsDirty(false);
      setSaveMessage({ type: "success", text: "Pending changes saved. The live page has not changed." });
    } catch (err) {
      setSaveMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Unable to save changes. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDiscard() {
    if (!canEdit || !hasPendingChanges) return;
    if (!window.confirm("Discard all pending changes? The working copy will reset to the live published version.")) return;
    setDiscarding(true);
    setSaveMessage(null);
    try {
      const res = await fetch(`/api/admin/content-pages/by-path?fullPath=${encodeURIComponent(SAMPLE_FULL_PATH)}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as SaveResponse;
      if (!res.ok) throw new Error(data.error || "Discard failed.");
      if (page) {
        const liveWc = pageToWorkingCopy(page);
        setWorkingCopy(liveWc);
        setSavedWorkingCopy(liveWc);
      }
      setHasPendingChanges(false);
      setIsDirty(false);
      setSaveMessage({ type: "success", text: "Pending changes discarded. Working copy reset to published version." });
    } catch (err) {
      setSaveMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Unable to discard changes.",
      });
    } finally {
      setDiscarding(false);
    }
  }

  const sectionNav = useMemo(() => {
    if (!workingCopy) return BLOCKS;
    return BLOCKS.map((block) => {
      if (block.key === "article-sections") return { ...block, description: `${workingCopy.sections.length} article sections` };
      if (block.key === "quick-facts") return { ...block, description: `${workingCopy.quickFacts.length} quick facts` };
      if (block.key === "cta-cards") return { ...block, description: `${workingCopy.ctaCards.length} CTA cards` };
      if (block.key === "related-pages") return { ...block, description: page ? `${page.relatedPages.length} related pages` : block.description };
      if (block.key === "source-references") return { ...block, description: page ? `${page.sourceReferences.length} public references` : block.description };
      return block;
    });
  }, [workingCopy, page]);

  // ─── Access gate ────────────────────────────────────────────────────────────
  if (!canView) {
    return (
      <div className="min-h-[60vh] bg-[#f6f9ff] p-6">
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-[#120b45]">Visual Editor</h1>
          <p className="mt-2 text-sm font-medium text-[#64748b]">You do not have access to view this page.</p>
        </div>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f6f9ff] p-5 md:p-6">
      <div className="mx-auto max-w-[1540px]">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.06)] xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.14em] text-[#1677f2]">
              Public Content Pages › NBFC Registration in India
            </div>
            <h1 className="mt-2 text-[28px] font-black tracking-tight text-[#120b45]">Visual Editor</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-[#1677f2]">
                Published
              </span>
              {hasPendingChanges && (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                  Pending Changes
                </span>
              )}
              {isDirty && (
                <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">
                  Unsaved Changes
                </span>
              )}
              <span className="rounded-full border border-blue-100 bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#334155]">
                {SAMPLE_FULL_PATH}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/content-pages"
              className="rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-black text-[#1677f2] transition hover:border-[#1677f2]">
              Back to Content Pages
            </Link>
            <a href={SAMPLE_FULL_PATH} target="_blank" rel="noopener noreferrer"
              className="rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-black text-[#0a1628] transition hover:border-[#1677f2]">
              Open Live Page
            </a>
            <button type="button" onClick={() => setActiveTab("visual")}
              className="rounded-xl border border-blue-100 bg-[#f8fbff] px-4 py-2.5 text-sm font-black text-[#0a1628] transition hover:border-[#1677f2]">
              Preview Working Copy
            </button>
            {canEdit ? (
              <>
                <button type="button" onClick={handleSave} disabled={saving || !workingCopy}
                  className="rounded-xl bg-[#1677f2] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#0866d9] disabled:opacity-60 disabled:cursor-not-allowed">
                  {saving ? "Saving…" : "Save Pending Changes"}
                </button>
                {hasPendingChanges && (
                  <button type="button" onClick={handleDiscard} disabled={discarding}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-100 disabled:opacity-60">
                    {discarding ? "Discarding…" : "Discard Pending Changes"}
                  </button>
                )}
              </>
            ) : (
              <span className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-black text-slate-500">
                Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* ── Save message banner ─────────────────────────────────────────────── */}
        {saveMessage && (
          <div className={`mb-5 rounded-2xl border p-4 text-sm font-bold ${
            saveMessage.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}>
            {saveMessage.text}
          </div>
        )}

        {/* ── View-only notice ────────────────────────────────────────────────── */}
        {!canEdit && !loading && page && (
          <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold text-[#1677f2]">
            You can view this page, but you do not have permission to save changes.
          </div>
        )}

        {/* ── Loading / Error ─────────────────────────────────────────────────── */}
        {loading && (
          <div className="rounded-2xl border border-blue-100 bg-white p-8 text-sm font-bold text-[#64748b]">
            Loading visual editor…
          </div>
        )}
        {error && !loading && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-sm font-bold text-red-700">{error}</div>
        )}

        {/* ── Main editor content ─────────────────────────────────────────────── */}
        {page && workingCopy && !loading && (
          <>
            {/* Tab bar */}
            <div className="mb-5 flex flex-wrap gap-2">
              {TAB_LABELS.map((tab) => (
                <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-black transition ${chipClass(activeTab === tab.key)}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Visual Editor tab */}
            {activeTab === "visual" && (
              <div className="grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_320px]">
                {/* Section nav */}
                <aside className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_14px_36px_rgba(0,80,140,0.06)]">
                  <div className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">Page Sections</div>
                  <div className="grid gap-2">
                    {sectionNav.map((block) => (
                      <button key={block.key} type="button" onClick={() => setActiveBlock(block.key)}
                        className={`rounded-xl border px-3 py-3 text-left transition ${chipClass(activeBlock === block.key)}`}>
                        <div className="text-sm font-black">{block.label}</div>
                        <div className={`mt-1 text-xs font-semibold leading-4 ${activeBlock === block.key ? "text-white/80" : "text-[#64748b]"}`}>
                          {block.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </aside>

                {/* Center: Edit Panel (canEdit) or Preview (view-only) */}
                {canEdit ? (
                  <EditPanel
                    workingCopy={workingCopy}
                    activeBlock={activeBlock}
                    onUpdateTitle={(v) => updateField("title", v)}
                    onUpdateSummary={(v) => updateField("summary", v)}
                    onUpdateSection={updateSection}
                    onUpdateQuickFact={updateQuickFact}
                    onUpdateCtaCard={updateCtaCard}
                    onSwitchToSeo={() => setActiveTab("seo")}
                  />
                ) : (
                  <VisualPreview page={page} activeBlock={activeBlock} onSelect={setActiveBlock} />
                )}

                <Inspector workingCopy={workingCopy} activeBlock={activeBlock} />
              </div>
            )}

            {/* Content Structure tab */}
            {activeTab === "structure" && (
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.06)]">
                {canEdit ? (
                  <StructureTab
                    workingCopy={workingCopy}
                    onUpdateSection={updateSection}
                    onUpdateQuickFact={updateQuickFact}
                    onReset={handleReset}
                    isDirty={isDirty}
                  />
                ) : (
                  <div className="grid gap-4 lg:grid-cols-2">
                    <DetailRow label="Title" value={page.title} />
                    <DetailRow label="Summary" value={previewText(page.summary, 240)} />
                    <DetailRow label="Sections" value={`${page.sections.length} sections`} />
                    <DetailRow label="Quick Facts" value={`${page.quickFacts.length} items`} />
                    <DetailRow label="CTA Cards" value={`${page.ctaCards.length} cards`} />
                    <DetailRow label="Related Pages" value={`${page.relatedPages.length} links`} />
                    <DetailRow label="Source References" value={`${page.sourceReferences.length} links`} />
                    <DetailRow label="Status" value={statusLabel(page.status)} />
                  </div>
                )}
              </div>
            )}

            {/* SEO & Settings tab */}
            {activeTab === "seo" && (
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.06)]">
                <SeoTab
                  workingCopy={workingCopy}
                  page={page}
                  onUpdateSeo={updateSeo}
                  canEdit={canEdit}
                />
              </div>
            )}

            {/* Pending Changes status bar */}
            {hasPendingChanges && (
              <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <div className="text-sm font-black text-amber-700">Pending Changes Saved</div>
                <p className="mt-1 text-xs font-medium text-amber-600">
                  The live page is showing the published version. Pending changes are saved and ready for review in the next phase.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
