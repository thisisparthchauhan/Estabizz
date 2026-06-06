import type { Metadata } from "next";
import Link from "next/link";
import { ResourceCardGrid } from "@/components/content/FrameworkBlocks";

export const metadata: Metadata = {
    title: "Resources – Regulatory Updates, FAQs, Blogs & Compliance Guides | Estabizz",
    description: "Explore Estabizz resources for regulatory updates, compliance guides, FAQs, regulatory insights, circular explainers and client education notes across RBI, SEBI, IRDAI and IFSCA.",
    alternates: { canonical: "/resources" }
};

const cards = [
    { title: "Regulatory Updates", description: "Practical RBI, SEBI, IRDAI and IFSCA circular updates with compliance impact, action checklist and risk rating.", href: "/resources/regulatory-updates" },
    { title: "Compliance Guides", description: "Practical licensing and compliance guides for founders, CFOs and regulated businesses.", href: "/resources" },
    { title: "FAQs", description: "Search-friendly FAQs covering eligibility, documents, process, fees, post-registration compliance and regulatory risks.", href: "/resources/faqs" },
    { title: "Blog / Regulatory Insights", description: "Professional regulatory insights and education notes for Indian finance and compliance teams.", href: "/blogs" },
    { title: "Circular Explainers", description: "Plain-English explanations of complex regulatory circulars and their practical business impact.", href: "/resources/circular-explainers" },
    { title: "Client Education Notes", description: "Decision-oriented notes to help clients understand licensing, documentation and compliance readiness.", href: "/blogs" },
    { title: "Compliance Calendars", description: "Ongoing filing and reporting timelines for regulated entities.", href: "/resources/compliance-calendar" },
];

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-20">
            <section className="border-b border-blue-100 px-6 py-16" style={{ background: "linear-gradient(135deg,#f0f9ff,#e0f2fe,#eff6ff)" }}>
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-6 flex gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link><span>&gt;</span><span className="text-[#0096D6]">Resources</span>
                    </nav>
                    <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0096D6]">Regulatory Knowledge System</span>
                    <h1 className="mb-5 max-w-4xl text-[40px] font-black leading-tight text-[#0a1628] md:text-[52px]">Resources for Regulatory Compliance Teams</h1>
                    <p className="max-w-3xl text-[17px] leading-8 text-gray-600">
                        Practical regulatory updates, compliance FAQs, circular templates and implementation resources for founders, CFOs, compliance officers and regulated financial entities.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <ResourceCardGrid cards={cards} />
            </section>
        </main>
    );
}
