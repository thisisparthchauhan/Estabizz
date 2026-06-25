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
        <main className="min-h-screen bg-white pt-[64px]">
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link><span className="opacity-40">/</span><Link href="/resources" className="hover:text-[#374151] transition-colors">Resources</Link><span className="opacity-40">/</span><span className="text-[#374151]">Regulatory Updates</span>
                    </nav>
                    <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">Regulatory Updates</span>
                    <h1 className="mb-5 max-w-4xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">Regulatory Updates for <span className="text-[#1677f2]">Financial &amp; Compliance-Driven Businesses</span></h1>
                    <p className="max-w-3xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        Regulatory updates are not only circulars — they are action points for regulated businesses. Estabizz simplifies RBI, SEBI, IRDAI, IFSCA and allied regulatory developments into practical compliance insights, impact analysis, timelines and implementation checklists.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#latest-updates" className="rounded-xl bg-[#1677f2] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">View Latest Updates</a>
                        <Link href="/contact" className="rounded-xl border border-blue-100 bg-white px-6 py-3 text-sm font-bold text-[#1677f2] transition-colors hover:border-[#1677f2]">Subscribe for Regulatory Alerts</Link>
                        <Link href="/contact" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#0a2b58] transition-colors hover:border-[#1677f2] hover:text-[#1677f2]">Speak to Compliance Expert</Link>
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
                                <span key={regulator} className="rounded-full border border-blue-100 bg-white px-4 py-2 text-[12px] font-bold text-[#0a1628] shadow-sm">{regulator}</span>
                            ))}
                        </div>

                        <div id="latest-updates" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {regulatoryUpdates.map((update) => (
                                <article key={update.slug} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-[#1677f2]">{update.regulator}</span>
                                        <span className={`rounded-full px-3 py-1 text-[11px] font-black ${update.riskRating === "High" ? "bg-red-50 text-red-600" : update.riskRating === "Moderate" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{update.riskRating} Risk</span>
                                    </div>
                                    <h2 className="mb-3 text-[19px] font-black leading-snug text-[#0a1628]">{update.title}</h2>
                                    <p className="mb-3 text-[12px] font-semibold text-[#64748b]">{new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                                    <p className="mb-4 text-[13px] leading-7 text-gray-600"><strong>Affected:</strong> {update.affectedEntities.join(", ")}</p>
                                    <p className="mb-6 text-[14px] leading-7 text-gray-600">{update.summary}</p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link href={`/resources/regulatory-updates/${update.slug}`} className="rounded-xl bg-[#0a1628] px-4 py-2 text-[13px] font-bold text-white">Read Compliance Impact</Link>
                                        <Link href="/resources/regulatory-update-email-template" className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-[13px] font-bold text-[#1677f2]">Email Format</Link>
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
