import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Circular Explainers – Plain-English Regulatory Circular Notes | Estabizz",
    description: "Plain-English explanations of complex RBI, SEBI, IRDAI, IFSCA and allied regulatory circulars with compliance implications.",
    alternates: { canonical: "/resources/circular-explainers" }
};

export default function CircularExplainersPage() {
    return (
        <main className="min-h-screen bg-white pt-[64px]">
            <section className="mx-auto max-w-5xl px-6 py-20">
                <Link href="/resources" className="text-sm font-bold text-[#1677f2] hover:text-[#0866d9]">← Resources</Link>
                <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-10 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                    <h1 className="mb-4 text-[42px] font-black tracking-[-0.02em] text-[#120b45]">Circular Explainers</h1>
                    <p className="text-[17px] leading-8 text-[#475569]">Plain-English explanations of complex regulatory circulars will be curated here with affected entities, action points and risk ratings.</p>
                    <Link href="/resources/regulatory-updates" className="mt-8 inline-flex rounded-xl bg-[#1677f2] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">View Regulatory Updates →</Link>
                </div>
            </section>
        </main>
    );
}
