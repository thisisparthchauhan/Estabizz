import type { Metadata } from "next";
import { getContent } from '@/lib/content/getContent';
import { buildPageMetadata } from '@/lib/seo/pageMetadata';
import { SEO_REGULATORY_UPDATES_DEFAULTS, type SeoContent } from '@/lib/content/seoDefaults';
import Link from "next/link";
import { regulators, regulatoryUpdates } from "@/lib/regulatoryUpdates";
import { listPublishedUpdates } from "@/lib/regulatory/repository";
import RegulatoryUpdatesListClient from "./RegulatoryUpdatesListClient";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getContent('seo.regulatory-updates') as Partial<SeoContent>;
    return buildPageMetadata(seo, SEO_REGULATORY_UPDATES_DEFAULTS, '/resources/regulatory-updates');
}

export default async function RegulatoryUpdatesPage() {
    // Only published updates from the Regulatory Update Desk are ever shown.
    const published = await listPublishedUpdates();

    return (
        <main className="min-h-screen bg-white pt-[64px] dark:bg-[#141417]">
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white dark:bg-[#141417] dark:border-[#27272b]">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff] dark:to-[#09090b]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8] dark:text-[#71717a]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors dark:text-[#a1a1aa]">Home</Link><span className="opacity-40">/</span><Link href="/resources" className="hover:text-[#374151] transition-colors dark:text-[#a1a1aa]">Resources</Link><span className="opacity-40">/</span><span className="text-[#374151] dark:text-[#a1a1aa]">Regulatory Updates</span>
                    </nav>
                    <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">Regulatory Updates</span>
                    <h1 className="mb-5 max-w-4xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px] dark:text-[#fafafa]">Regulatory Updates for <span className="text-[#1677f2] dark:text-[#4f9dfb]">Financial &amp; Compliance-Driven Businesses</span></h1>
                    <p className="max-w-3xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px] dark:text-[#a1a1aa]">
                        Regulatory updates are not only circulars — they are action points for regulated businesses. Estabizz simplifies RBI, SEBI, IRDAI, IFSCA and allied regulatory developments into practical compliance insights, impact analysis, timelines and implementation checklists.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#latest-updates" className="rounded-xl bg-[#1677f2] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">View Latest Updates</a>
                        <Link href="/contact" className="rounded-xl border border-blue-100 bg-white px-6 py-3 text-sm font-bold text-[#1677f2] transition-colors hover:border-[#1677f2] dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">Subscribe for Regulatory Alerts</Link>
                        <Link href="/contact" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#0a2b58] transition-colors hover:border-[#1677f2] hover:text-[#1677f2] dark:bg-[#141417] dark:border-[#27272b] dark:text-[#fafafa]">Speak to Compliance Expert</Link>
                        <a href="https://wa.me/919825600907" className="rounded-xl bg-[#10b981] px-6 py-3 text-sm font-bold text-white">WhatsApp Estabizz Team</a>
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-12">
                {published.length > 0 ? (
                    // Live updates from the Regulatory Update Desk (published only).
                    <RegulatoryUpdatesListClient updates={published} />
                ) : (
                    // Fallback: illustrative compliance examples until live updates are published.
                    <>
                        <div className="mb-8 flex flex-wrap gap-2">
                            {regulators.map((regulator) => (
                                <span key={regulator} className="rounded-full border border-blue-100 bg-white px-4 py-2 text-[12px] font-bold text-[#0a1628] shadow-sm dark:bg-[#141417] dark:border-[#27272b] dark:text-[#fafafa]">{regulator}</span>
                            ))}
                        </div>

                        <div id="latest-updates" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {regulatoryUpdates.map((update) => (
                                <article key={update.slug} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-[#141417] dark:border-[#27272b]">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-[#1677f2] dark:bg-[#1c1c20] dark:text-[#4f9dfb]">{update.regulator}</span>
                                        <span className={`rounded-full px-3 py-1 text-[11px] font-black ${update.riskRating === "High" ? "bg-red-50 text-red-600 dark:bg-[#2a1618] dark:text-[#fca5a5]" : update.riskRating === "Moderate" ? "bg-amber-50 text-amber-700 dark:bg-[#2a2113] dark:text-[#fcd34d]" : "bg-green-50 text-green-700 dark:bg-[#132a20] dark:text-[#6ee7b7]"}`}>{update.riskRating} Risk</span>
                                    </div>
                                    <h2 className="mb-3 text-[19px] font-black leading-snug text-[#0a1628] dark:text-[#fafafa]">{update.title}</h2>
                                    <p className="mb-3 text-[12px] font-semibold text-[#64748b] dark:text-[#a1a1aa]">{new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                                    <p className="mb-4 text-[13px] leading-7 text-gray-600 dark:text-[#a1a1aa]"><strong>Affected:</strong> {update.affectedEntities.join(", ")}</p>
                                    <p className="mb-6 text-[14px] leading-7 text-gray-600 dark:text-[#a1a1aa]">{update.summary}</p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link href={`/resources/regulatory-updates/${update.slug}`} className="rounded-xl bg-[#0a1628] dark:bg-[#1c1c20] px-4 py-2 text-[13px] font-bold text-white">Read Compliance Impact</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
