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
} from "@/lib/publicContent/types";

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
  error?: string;
}

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

function statusLabel(status: PublicContentPageStatus): string {
  if (status === "published") return "Published";
  if (status === "pending_approval") return "Pending Review";
  return status.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatDate(value: string | null): string {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
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

function BlockShell({
  blockKey,
  activeBlock,
  onSelect,
  label,
  children,
}: {
  blockKey: BlockKey;
  activeBlock: BlockKey;
  onSelect: (block: BlockKey) => void;
  label: string;
  children: React.ReactNode;
}) {
  const active = activeBlock === blockKey;
  return (
    <button
      type="button"
      onClick={() => onSelect(blockKey)}
      className={`block w-full rounded-2xl border bg-white p-5 text-left transition ${blockClass(active)}`}
    >
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

function Inspector({ page, activeBlock }: { page: EditorPage; activeBlock: BlockKey }) {
  const block = BLOCKS.find((item) => item.key === activeBlock) ?? BLOCKS[0];

  const details: Array<{ label: string; value: React.ReactNode }> = (() => {
    if (activeBlock === "hero") {
      return [
        { label: "Heading", value: page.hero?.title || page.title },
        { label: "Badges", value: `${page.badges.length} badges` },
        { label: "Trust Line", value: page.hero?.trustLine || "Not set" },
      ];
    }
    if (activeBlock === "summary") {
      return [
        { label: "Summary", value: previewText(page.summary, 220) },
        { label: "Service Type", value: page.serviceType || "Not set" },
      ];
    }
    if (activeBlock === "quick-facts") {
      return [
        { label: "Quick Facts", value: `${page.quickFacts.length} items` },
        { label: "First Fact", value: page.quickFacts[0] ? `${page.quickFacts[0].label}: ${page.quickFacts[0].value}` : "Not set" },
      ];
    }
    if (activeBlock === "article-sections") {
      return [
        { label: "Sections", value: `${page.sections.length} sections` },
        { label: "First Section", value: page.sections[0]?.title || "Not set" },
      ];
    }
    if (activeBlock === "cta-cards") {
      return [
        { label: "CTA Cards", value: `${page.ctaCards.length} cards` },
        { label: "Primary CTA", value: page.ctaCards[0]?.title || "Not set" },
      ];
    }
    if (activeBlock === "related-pages") {
      return [
        { label: "Related Pages", value: `${page.relatedPages.length} links` },
        { label: "First Related Page", value: page.relatedPages[0]?.title || "Not set" },
      ];
    }
    if (activeBlock === "source-references") {
      return [
        { label: "Source References", value: `${page.sourceReferences.length} links` },
        { label: "First Source", value: page.sourceReferences[0]?.title || "Not set" },
      ];
    }
    return [
      { label: "SEO Title", value: page.seoTitle || "Not set" },
      { label: "SEO Description", value: previewText(page.seoDescription, 180) },
      { label: "Canonical URL", value: page.canonicalUrl || page.fullPath },
    ];
  })();

  return (
    <aside className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.07)]">
      <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1677f2]">Section Details</div>
      <h2 className="mt-2 text-xl font-black tracking-tight text-[#120b45]">{block.label}</h2>
      <p className="mt-1 text-sm font-medium leading-6 text-[#64748b]">{block.description}</p>
      <div className="mt-5 grid gap-3">
        {details.map((detail) => (
          <DetailRow key={detail.label} label={detail.label} value={detail.value} />
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs font-bold leading-5 text-[#1677f2]">
        Ready for Editing Setup. Changes are not saved in this phase.
      </div>
    </aside>
  );
}

function VisualPreview({
  page,
  activeBlock,
  onSelect,
}: {
  page: EditorPage;
  activeBlock: BlockKey;
  onSelect: (block: BlockKey) => void;
}) {
  const firstSections = page.sections.slice(0, 5);

  return (
    <div className="rounded-[28px] border border-blue-100 bg-[#f6f9ff] p-4 md:p-6">
      <div className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_20px_60px_rgba(0,80,140,0.08)]">
        <div className="bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)] p-5 md:p-7">
          <BlockShell blockKey="hero" activeBlock={activeBlock} onSelect={onSelect} label="Hero Section">
            <div className="flex flex-wrap gap-2">
              {page.badges.slice(0, 6).map((badge) => (
                <span key={badge.label} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-black text-[#1677f2]">
                  {badge.label}
                </span>
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

            <BlockShell blockKey="cta-cards" activeBlock={activeBlock} onSelect={onSelect} label="CTA Card">
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
                {page.sourceReferences.length ? (
                  page.sourceReferences.map((source) => (
                    <div key={`${source.title}-${source.url}`} className="rounded-xl border border-blue-100 bg-[#f8fbff] p-3 text-sm font-bold text-[#0a1628]">
                      {source.title}
                    </div>
                  ))
                ) : (
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

function StructureTab({ page }: { page: EditorPage }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <DetailRow label="Title" value={page.title} />
      <DetailRow label="Summary" value={previewText(page.summary, 240)} />
      <DetailRow label="Sections Count" value={`${page.sections.length} sections`} />
      <DetailRow label="Quick Facts" value={`${page.quickFacts.length} items`} />
      <DetailRow label="CTA Cards" value={`${page.ctaCards.length} cards`} />
      <DetailRow label="Related Pages" value={`${page.relatedPages.length} links`} />
      <DetailRow label="Source References" value={`${page.sourceReferences.length} links`} />
      <DetailRow label="Status" value={statusLabel(page.status)} />
      <div className="rounded-2xl border border-blue-100 bg-white p-5 lg:col-span-2">
        <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">Article Sections</div>
        <div className="mt-4 grid gap-3">
          {page.sections.map((section, index) => (
            <div key={`${section.id || section.title}-${index}`} className="rounded-xl border border-blue-100 bg-[#f8fbff] p-4">
              <div className="text-xs font-black text-[#1677f2]">Section {index + 1}</div>
              <div className="mt-1 text-sm font-black text-[#0a1628]">{section.title || `Section ${index + 1}`}</div>
              <p className="mt-2 text-xs font-medium leading-5 text-[#64748b]">{previewText(section.body || "", 180)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SeoTab({ page }: { page: EditorPage }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <DetailRow label="SEO Title" value={page.seoTitle || "Not set"} />
      <DetailRow label="SEO Description" value={page.seoDescription || "Not set"} />
      <DetailRow label="Canonical URL" value={page.canonicalUrl || page.fullPath} />
      <DetailRow label="Reviewed By" value={page.reviewedBy || "Not set"} />
      <DetailRow label="Last Reviewed Date" value={formatDate(page.lastReviewedAt)} />
      <DetailRow label="Reading Time" value={page.readingTime || "Not set"} />
      <DetailRow label="Status" value={statusLabel(page.status)} />
      <DetailRow label="Path" value={page.fullPath} />
    </div>
  );
}

export default function PublicContentVisualEditorClient({ viewer }: { viewer: AdminContext | null }) {
  const canView = viewer?.permissions.includes("view_admin") ?? false;
  const [page, setPage] = useState<EditorPage | null>(null);
  const [loading, setLoading] = useState(canView);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("visual");
  const [activeBlock, setActiveBlock] = useState<BlockKey>("hero");

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
        if (!cancelled) setPage(data.page);
      } catch {
        if (!cancelled) setError("Unable to load the visual editor. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPage();
    return () => {
      cancelled = true;
    };
  }, [canView]);

  const sectionNav = useMemo(() => {
    if (!page) return BLOCKS;
    return BLOCKS.map((block) => {
      if (block.key === "article-sections") return { ...block, description: `${page.sections.length} article sections` };
      if (block.key === "quick-facts") return { ...block, description: `${page.quickFacts.length} quick facts` };
      if (block.key === "cta-cards") return { ...block, description: `${page.ctaCards.length} CTA cards` };
      if (block.key === "related-pages") return { ...block, description: `${page.relatedPages.length} related pages` };
      if (block.key === "source-references") return { ...block, description: `${page.sourceReferences.length} public references` };
      return block;
    });
  }, [page]);

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

  return (
    <div className="min-h-screen bg-[#f6f9ff] p-5 md:p-6">
      <div className="mx-auto max-w-[1540px]">
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.06)] xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.14em] text-[#1677f2]">Public Content Pages &gt; NBFC Registration in India</div>
            <h1 className="mt-2 text-[28px] font-black tracking-tight text-[#120b45]">Visual Editor</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-[#1677f2]">Published</span>
              <span className="rounded-full border border-blue-100 bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#334155]">{SAMPLE_FULL_PATH}</span>
              <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-[#64748b]">Ready for Editing Setup</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/content-pages" className="rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-black text-[#1677f2] transition hover:border-[#1677f2]">
              Back to Content Pages
            </Link>
            <a href={SAMPLE_FULL_PATH} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#1677f2] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#0866d9]">
              Open Live Page
            </a>
            <button
              type="button"
              onClick={() => setActiveTab("visual")}
              className="rounded-xl border border-blue-100 bg-[#f8fbff] px-4 py-2.5 text-sm font-black text-[#0a1628] transition hover:border-[#1677f2]"
            >
              Preview
            </button>
            <span className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-black text-slate-500">
              Coming Soon
            </span>
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl border border-blue-100 bg-white p-8 text-sm font-bold text-[#64748b]">Loading visual editor...</div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-sm font-bold text-red-700">{error}</div>
        )}

        {page && !loading && (
          <>
            <div className="mb-5 flex flex-wrap gap-2">
              {TAB_LABELS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-black transition ${chipClass(activeTab === tab.key)}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "visual" && (
              <div className="grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_320px]">
                <aside className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_14px_36px_rgba(0,80,140,0.06)]">
                  <div className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">Page Sections</div>
                  <div className="grid gap-2">
                    {sectionNav.map((block) => (
                      <button
                        key={block.key}
                        type="button"
                        onClick={() => setActiveBlock(block.key)}
                        className={`rounded-xl border px-3 py-3 text-left transition ${chipClass(activeBlock === block.key)}`}
                      >
                        <div className="text-sm font-black">{block.label}</div>
                        <div className={`mt-1 text-xs font-semibold leading-4 ${activeBlock === block.key ? "text-white/80" : "text-[#64748b]"}`}>
                          {block.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </aside>

                <VisualPreview page={page} activeBlock={activeBlock} onSelect={setActiveBlock} />
                <Inspector page={page} activeBlock={activeBlock} />
              </div>
            )}

            {activeTab === "structure" && (
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.06)]">
                <StructureTab page={page} />
              </div>
            )}

            {activeTab === "seo" && (
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_36px_rgba(0,80,140,0.06)]">
                <SeoTab page={page} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
