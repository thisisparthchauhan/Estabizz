import type { Metadata } from "next";
import Link from "next/link";
import { PAGES } from "@/lib/content/pageCatalog";

export const metadata: Metadata = {
  title: "Website Editor — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function WebsiteEditorPage() {
  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[21px] font-black text-[#0a1628]">Website Editor</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">
          Choose a page to edit its sections — from the navbar to the footer.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((page) => {
          const ready = page.sections.filter((s) => s.editorReady).length;
          return (
            <Link
              key={page.id}
              href={`/admin/website/${page.id}`}
              className="group rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_12px_rgba(10,22,40,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#1677f2]/40 hover:shadow-[0_8px_24px_rgba(22,119,242,0.12)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-black text-[#0a1628] group-hover:text-[#1677f2]">{page.name}</h2>
                <span className="text-[11px] font-mono text-[#94a3b8]">{page.path}</span>
              </div>
              <p className="mt-2 text-[12px] text-[#64748b]">
                {page.sections.length} sections · {ready} editable now
              </p>
            </Link>
          );
        })}

        {/* Future pages placeholder */}
        <div className="rounded-2xl border border-dashed border-[#d8e2ee] bg-[#fbfdff] p-5 text-[12px] text-[#94a3b8]">
          More pages (RBI, SEBI, IRDAI, About, Contact…) will appear here as they are added.
        </div>
      </div>
    </div>
  );
}
