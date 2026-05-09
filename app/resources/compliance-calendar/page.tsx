import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Compliance Calendar – Regulatory Filing Timelines | Estabizz",
    description: "Compliance calendar resource for regulated entities to track RBI, SEBI, IRDAI, IFSCA, ROC and tax filing responsibilities.",
    alternates: { canonical: "/resources/compliance-calendar" }
};

export default function ComplianceCalendarPage() {
    return <ResourcePlaceholder title="Compliance Calendars" subtitle="Ongoing filing and reporting timelines for regulated entities." />;
}

function ResourcePlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
    return <main className="min-h-screen bg-[#f8faff] pt-20"><section className="mx-auto max-w-5xl px-6 py-20"><Link href="/resources" className="text-sm font-bold text-[#0096D6]">← Resources</Link><div className="mt-8 rounded-3xl border border-blue-100 bg-white p-10 shadow-sm"><h1 className="mb-4 text-[42px] font-black text-[#0a1628]">{title}</h1><p className="text-[17px] leading-8 text-[#475569]">{subtitle} Detailed regulator-wise calendars will be expanded here. For immediate filing support, speak to Estabizz.</p><Link href="/contact" className="mt-8 inline-flex rounded-xl bg-[#0a1628] px-6 py-3 text-sm font-bold text-white">Speak to Compliance Expert</Link></div></section></main>;
}
