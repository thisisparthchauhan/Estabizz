import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Circular Explainers – Plain-English Regulatory Circular Notes | Estabizz",
    description: "Plain-English explanations of complex RBI, SEBI, IRDAI, IFSCA and allied regulatory circulars with compliance implications.",
    alternates: { canonical: "/resources/circular-explainers" }
};

export default function CircularExplainersPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-20">
            <section className="mx-auto max-w-5xl px-6 py-20">
                <Link href="/resources" className="text-sm font-bold text-[#0096D6]">← Resources</Link>
                <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
                    <h1 className="mb-4 text-[42px] font-black text-[#0a1628]">Circular Explainers</h1>
                    <p className="text-[17px] leading-8 text-[#475569]">Plain-English explanations of complex regulatory circulars will be curated here with affected entities, action points and risk ratings.</p>
                    <Link href="/resources/regulatory-updates" className="mt-8 inline-flex rounded-xl bg-[#0a1628] px-6 py-3 text-sm font-bold text-white">View Regulatory Updates</Link>
                </div>
            </section>
        </main>
    );
}
