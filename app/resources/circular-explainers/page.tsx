import type { Metadata } from "next";
import Link from "next/link";
import { regulatoryUpdates } from "@/lib/regulatoryUpdates";

export const metadata: Metadata = {
    title: "Circular Explainers – Plain-English Regulatory Circular Notes | Estabizz",
    description: "Plain-English explanations of complex RBI, SEBI, IRDAI, IFSCA and allied regulatory circulars — affected entities, what changed, action checklists and risk ratings.",
    alternates: { canonical: "/resources/circular-explainers" }
};

const coverage = [
    { icon: "📖", title: "Plain-English Summary", text: "What the circular actually means for your business — without the legalese." },
    { icon: "🏛️", title: "Reference Table", text: "Regulator, circular number, date, governing regulation and effective-from, in one place." },
    { icon: "🔁", title: "What Changed", text: "The earlier position vs the revised position — and the practical compliance effect." },
    { icon: "🎯", title: "Who Is Affected", text: "The exact intermediary categories and entity types the circular applies to." },
    { icon: "✅", title: "Action Checklist", text: "A step-by-step list of what to do, who owns it and a suggested timeline." },
    { icon: "⚠️", title: "Risk Rating", text: "A Low / Moderate / High rating so you can prioritise the right circulars first." },
];

const riskCls = (r: string) =>
    r === "High" ? "bg-red-50 text-red-600" : r === "Moderate" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700";

export default function CircularExplainersPage() {
    const latest = regulatoryUpdates.slice(0, 6);

    return (
        <main className="min-h-screen bg-white pt-[64px]">
            {/* Hero */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link><span className="opacity-40">/</span><Link href="/resources" className="hover:text-[#374151] transition-colors">Resources</Link><span className="opacity-40">/</span><span className="text-[#374151]">Circular Explainers</span>
                    </nav>
                    <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">Circular Interpretation</span>
                    <h1 className="mb-5 max-w-4xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">Circular Explainers <span className="text-[#1677f2]">in Plain English</span></h1>
                    <p className="max-w-3xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        Regulatory circulars are not just notifications — they are action points. Estabizz breaks down complex RBI, SEBI, IRDAI, IFSCA and allied circulars into clear, practical notes so your team knows exactly what changed, who it affects and what to do next.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link href="/resources/regulatory-updates" className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">Browse Latest Updates →</Link>
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-white px-7 py-3.5 text-[15px] font-black text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]">Request a Circular Review</Link>
                    </div>
                </div>
            </header>

            {/* What each explainer covers */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-8">
                    <h2 className="text-[26px] font-black tracking-[-0.02em] text-[#120b45]">What Every Explainer Covers</h2>
                    <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                    <p className="mt-3 text-[14px] text-[#64748b]">A consistent structure so you can read any circular note in under two minutes.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {coverage.map((c) => (
                        <div key={c.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]">
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5fbff] text-xl">{c.icon}</div>
                            <h3 className="mb-2 text-[16px] font-bold text-[#120b45]">{c.title}</h3>
                            <p className="text-[13.5px] leading-relaxed text-[#64748b]">{c.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Latest explainers */}
            <section className="mx-auto max-w-7xl px-6 pb-14">
                <div className="mb-8">
                    <h2 className="text-[26px] font-black tracking-[-0.02em] text-[#120b45]">Latest Circular Explainers</h2>
                    <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                    <p className="mt-3 text-[14px] text-[#64748b]">Recent regulatory developments, decoded into action points.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {latest.map((u) => (
                        <Link key={u.slug} href={`/resources/regulatory-updates/${u.slug}`} className="group block">
                            <article className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]">
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <span className="rounded-full bg-[#f5fbff] px-2.5 py-0.5 text-[11px] font-black text-[#0077B6]">{u.regulator}</span>
                                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-black ${riskCls(u.riskRating)}`}>{u.riskRating} Risk</span>
                                </div>
                                <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#0a1628] transition-colors group-hover:text-[#1677f2]">{u.title}</h3>
                                <p className="text-[13px] leading-relaxed text-[#64748b] line-clamp-3">{u.summary}</p>
                                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-black text-[#1677f2]">Read explainer <span className="transition-transform group-hover:translate-x-1">→</span></div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-6 mb-16 overflow-hidden rounded-2xl border border-[#1677f2]/25 bg-gradient-to-br from-[#0a1628] to-[#0c2040] px-6 py-14 text-center sm:px-10">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#4f9dfb]">Estabizz Fintech Private Limited</p>
                    <h2 className="mb-4 text-[26px] font-black text-white sm:text-[30px]">A circular landed and you’re not sure if it applies to you?</h2>
                    <p className="mb-8 text-[14.5px] leading-[1.7] text-white/60">Send it to our team. We’ll tell you whether it applies, what changes, the action checklist and the risk rating — in plain English.</p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/contact" className="rounded-xl bg-[#1677f2] px-8 py-3.5 text-[14px] font-black text-white hover:bg-[#3b8ef5] transition-colors">Request a Circular Review →</Link>
                        <a href="https://wa.me/919825600907" className="rounded-xl border border-white/20 px-8 py-3.5 text-[14px] font-bold text-white/85 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white">WhatsApp Estabizz Team</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
