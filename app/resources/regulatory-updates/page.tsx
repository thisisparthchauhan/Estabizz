import type { Metadata } from "next";
import Link from "next/link";
import { regulators, regulatoryUpdates } from "@/lib/regulatoryUpdates";

export const metadata: Metadata = {
    title: "Regulatory Updates India – RBI, SEBI, IRDAI, IFSCA Circulars & Compliance Insights",
    description: "Stay updated with RBI, SEBI, IRDAI, IFSCA and compliance circulars explained in professional Indian English with impact analysis, affected entities, action checklist, implementation timeline and regulatory risk rating by Estabizz.",
    alternates: { canonical: "/resources/regulatory-updates" }
};

export default function RegulatoryUpdatesPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-20">
            <section className="border-b border-blue-100 px-6 py-16" style={{ background: "linear-gradient(135deg,#f0f9ff,#e0f2fe,#eff6ff)" }}>
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-6 flex gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link><span>&gt;</span><Link href="/resources" className="hover:text-[#0096D6]">Resources</Link><span>&gt;</span><span className="text-[#0096D6]">Regulatory Updates</span>
                    </nav>
                    <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0096D6]">Regulatory Updates</span>
                    <h1 className="mb-5 max-w-4xl text-[40px] font-black leading-tight text-[#0a1628] md:text-[52px]">Regulatory Updates for Financial & Compliance-Driven Businesses</h1>
                    <p className="max-w-3xl text-[17px] leading-8 text-gray-600">
                        Regulatory updates are not only circulars — they are action points for regulated businesses. Estabizz simplifies RBI, SEBI, IRDAI, IFSCA and allied regulatory developments into practical compliance insights, impact analysis, timelines and implementation checklists.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#latest-updates" className="rounded-xl bg-[#0a1628] px-6 py-3 text-sm font-bold text-white">View Latest Updates</a>
                        <Link href="/contact" className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-bold text-[#0096D6]">Subscribe for Regulatory Alerts</Link>
                        <Link href="/contact" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#0a1628]">Speak to Compliance Expert</Link>
                        <a href="https://wa.me/919825600907" className="rounded-xl bg-[#10b981] px-6 py-3 text-sm font-bold text-white">WhatsApp Estabizz Team</a>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-8 flex flex-wrap gap-2">
                    {regulators.map((regulator) => (
                        <span key={regulator} className="rounded-full border border-blue-100 bg-white px-4 py-2 text-[12px] font-bold text-[#0a1628] shadow-sm">{regulator}</span>
                    ))}
                </div>

                <div id="latest-updates" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {regulatoryUpdates.map((update) => (
                        <article key={update.slug} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-[#0096D6]">{update.regulator}</span>
                                <span className={`rounded-full px-3 py-1 text-[11px] font-black ${update.riskRating === "High" ? "bg-red-50 text-red-600" : update.riskRating === "Moderate" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{update.riskRating} Risk</span>
                            </div>
                            <h2 className="mb-3 text-[19px] font-black leading-snug text-[#0a1628]">{update.title}</h2>
                            <p className="mb-3 text-[12px] font-semibold text-[#64748b]">{new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                            <p className="mb-4 text-[13px] leading-7 text-gray-600"><strong>Affected:</strong> {update.affectedEntities.join(", ")}</p>
                            <p className="mb-6 text-[14px] leading-7 text-gray-600">{update.summary}</p>
                            <div className="flex flex-wrap gap-3">
                                <Link href={`/resources/regulatory-updates/${update.slug}`} className="rounded-xl bg-[#0a1628] px-4 py-2 text-[13px] font-bold text-white">Read Compliance Impact</Link>
                                <Link href="/resources/regulatory-update-email-template" className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-[13px] font-bold text-[#0096D6]">Email Format</Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
