import type { Metadata } from "next";
import Link from "next/link";
import { ResourceCardGrid } from "@/components/content/FrameworkBlocks";

export const metadata: Metadata = {
    title: "Resources – Regulatory Updates, FAQs, Templates & Compliance Guides | Estabizz",
    description: "Explore Estabizz resources for regulatory updates, compliance FAQs, circular explainers, email templates, compliance calendars and licensing guides across RBI, SEBI, IRDAI and IFSCA.",
    alternates: { canonical: "/resources" }
};

const cards = [
    { title: "Content Rebuild Command", description: "Internal Estabizz framework for rebuilding reference content into original SEO, GEO and AEO optimised regulatory pages.", href: "/resources/content-rebuild-command" },
    { title: "Regulatory Updates", description: "Practical RBI, SEBI, IRDAI and IFSCA circular updates with compliance impact, action checklist and risk rating.", href: "/resources/regulatory-updates" },
    { title: "Regulatory Email Templates", description: "Structured formats for converting circulars into client-ready compliance update emails.", href: "/resources/regulatory-update-email-template" },
    { title: "Service Page Content Framework", description: "Master content structure for premium licence pages covering eligibility, process, fees, compliance, FAQs and CTAs.", href: "/resources/service-page-content-framework" },
    { title: "FAQ Engine", description: "Search-friendly FAQs covering eligibility, documents, process, fees, post-registration compliance and regulatory risks.", href: "/resources/faqs" },
    { title: "Compliance Calendars", description: "Ongoing filing and reporting timelines for regulated entities.", href: "/resources/compliance-calendar" },
    { title: "Proposal Templates", description: "Browser-style client proposal structure for licensing scope, timelines, commercials and regulatory support.", href: "/proposal-template" },
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
