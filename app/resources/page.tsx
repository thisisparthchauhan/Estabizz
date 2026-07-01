import type { Metadata } from "next";
import { getContent } from '@/lib/content/getContent';
import { buildPageMetadata } from '@/lib/seo/pageMetadata';
import { SEO_RESOURCES_DEFAULTS, type SeoContent } from '@/lib/content/seoDefaults';
import Link from "next/link";
import { ResourceCardGrid } from "@/components/content/FrameworkBlocks";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getContent('seo.resources') as Partial<SeoContent>;
    return buildPageMetadata(seo, SEO_RESOURCES_DEFAULTS, '/resources');
}

const cards = [
    { title: "Content Rebuild Command", description: "Internal Estabizz framework for rebuilding reference content into original SEO, GEO and AEO optimised regulatory pages.", href: "/resources/content-rebuild-command" },
    { title: "Regulatory Updates", description: "Practical RBI, SEBI, IRDAI and IFSCA circular updates with compliance impact, action checklist and risk rating.", href: "/resources/regulatory-updates" },
    { title: "Circular Explainers", description: "Complex RBI, SEBI, IRDAI and IFSCA circulars decoded into plain English — what changed, who's affected, action checklist and risk rating.", href: "/resources/circular-explainers" },
    { title: "Regulatory Email Templates", description: "Structured formats for converting circulars into client-ready compliance update emails.", href: "/resources/regulatory-update-email-template" },
    { title: "Service Page Content Framework", description: "Master content structure for premium licence pages covering eligibility, process, fees, compliance, FAQs and CTAs.", href: "/resources/service-page-content-framework" },
    { title: "FAQ Engine", description: "Search-friendly FAQs covering eligibility, documents, process, fees, post-registration compliance and regulatory risks.", href: "/resources/faqs" },
    { title: "Compliance Calendars", description: "Ongoing filing and reporting timelines for regulated entities.", href: "/resources/compliance-calendar" },
    { title: "Proposal Templates", description: "Browser-style client proposal structure for licensing scope, timelines, commercials and regulatory support.", href: "/proposal-template" },
];

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-white pt-[64px]">
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link><span className="opacity-40">/</span><span className="text-[#374151]">Resources</span>
                    </nav>
                    <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">Regulatory Knowledge System</span>
                    <h1 className="mb-5 max-w-4xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">Resources for <span className="text-[#1677f2]">Regulatory Compliance Teams</span></h1>
                    <p className="max-w-3xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        Practical regulatory updates, compliance FAQs, circular templates and implementation resources for founders, CFOs, compliance officers and regulated financial entities.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <ResourceCardGrid cards={cards} />
            </section>
        </main>
    );
}
