import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/content/pageCatalog";
import { listContentBlocks } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Page Sections — Estabizz Admin",
  robots: { index: false, follow: false },
};

type Params = { params: Promise<{ pageId: string }> };

// Map a section key to the admin route that edits it.
const SECTION_ROUTES: Record<string, string> = {
  "homepage.hero": "hero",
  "homepage.stats": "stats",
  "homepage.trustedBy": "trusted-by",
  "homepage.solutions": "solutions",
  "homepage.globalMarkets": "global-markets",
  "homepage.whyChooseUs": "why-estabizz",
  "homepage.finalCta": "final-cta",
  "homepage.regulatoryServices": "regulatory-services",
  "homepage.process": "process",
  "homepage.compliancePortal": "compliance-portal",
  "homepage.caseStudies": "case-highlights",
  "homepage.testimonials": "testimonials",
  "homepage.contentFramework": "content-framework",
  "homepage.resources": "resource-architecture",
  "seo.homepage": "seo",
};

function editorHref(key: string, pageId: string): string | null {
  if (key === "global.navbar" || key === "global.footer") return "/admin/navigation";
  const slug = SECTION_ROUTES[key];
  return slug ? `/admin/website/${pageId}/${slug}` : null;
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    published: "bg-green-50 text-green-700 border-green-200 dark:bg-[#132a20] dark:text-[#6ee7b7] dark:border-[#1d4a37]",
    draft: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-[#2a2113] dark:text-[#fcd34d] dark:border-[#4a3a1a]",
    pending_approval: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-[#1c1c20] dark:border-[#27272b] dark:text-[#60a5fa]",
    deleted: "bg-gray-100 text-gray-500 border-gray-200 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#71717a]",
  };
  const label: Record<string, string> = {
    published: "Published",
    draft: "Draft",
    pending_approval: "Pending Approval",
    deleted: "Hidden",
  };
  return { cls: map[status] ?? map.published, text: label[status] ?? "Published" };
}

function formatIST(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export default async function PageSectionsPage({ params }: Params) {
  const { pageId } = await params;
  const page = getPage(pageId);
  if (!page) notFound();

  const blocks = await listContentBlocks();
  const byKey = Object.fromEntries(blocks.map((b) => [b.key, b]));

  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8 dark:bg-[#141417]">
      <div className="mb-6 flex items-center gap-2 text-[13px]">
        <Link href="/admin/website" className="font-semibold text-[#1677f2] hover:underline dark:text-[#4f9dfb]">Website Editor</Link>
        <span className="text-[#94a3b8] dark:text-[#71717a]">/</span>
        <span className="font-bold text-[#0a1628] dark:text-[#fafafa]">{page.name}</span>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[21px] font-black text-[#0a1628] dark:text-[#fafafa]">{page.name}</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b] dark:text-[#a1a1aa]">All sections in the order they appear on the live page.</p>
        </div>
        <a href={page.path} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2] dark:bg-[#141417] dark:border-[#27272b] dark:text-[#a1a1aa]">
          Open live page ↗
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] dark:bg-[#141417] dark:border-[#27272b]">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] dark:bg-[#141417] dark:border-[#27272b] dark:text-[#71717a]">
          <span>Section</span>
          <span className="hidden sm:block">Status · Last updated</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-[#f4f7fb]">
          {page.sections.map((section, i) => {
            const block = byKey[section.key];
            const badge = statusBadge(block?.status ?? "published");
            const href = editorHref(section.key, page.id);
            return (
              <div key={section.key} className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-3.5 hover:bg-[#fbfdff] sm:grid-cols-[1fr_auto_auto] dark:bg-[#141417]">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eef4fc] text-[11px] font-black text-[#1677f2] dark:bg-[#1c1c20] dark:text-[#4f9dfb]">{i + 1}</span>
                  <div>
                    <div className="text-[13.5px] font-bold text-[#0a1628] dark:text-[#fafafa]">{section.name}</div>
                    {section.note && <div className="text-[11px] text-[#94a3b8] dark:text-[#71717a]">{section.note}</div>}
                  </div>
                </div>

                <div className="hidden text-right sm:block">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${badge.cls}`}>{badge.text}</span>
                  <div className="mt-1 text-[11px] text-[#94a3b8] dark:text-[#71717a]">
                    {block?.isLive ? `${formatIST(block.updatedAt)}${block.updatedBy ? ` · ${block.updatedBy}` : ""}` : "Default content"}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  {href ? (
                    <Link href={href} className="rounded-lg bg-[#1677f2] px-3.5 py-1.5 text-[12px] font-bold text-white hover:bg-[#0f63d6]">Edit</Link>
                  ) : (
                    <span className="rounded-lg border border-[#e2eaf2] px-3.5 py-1.5 text-[12px] font-semibold text-[#b6c2d2] dark:border-[#27272b]" title="Editor coming soon">Coming soon</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
