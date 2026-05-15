import type { Metadata } from "next";
import Link from "next/link";
import { ExpertQuote, FrameworkTable } from "@/components/content/FrameworkBlocks";

export const metadata: Metadata = {
    title: "Content Rebuild Command – SEO, GEO & AEO Reference Content System | Estabizz",
    description: "Internal Estabizz command page for rebuilding reference or competitor regulatory content into original SEO, GEO and AEO optimised compliance pages.",
    alternates: { canonical: "/resources/content-rebuild-command" },
};

const rebuildRules = [
    "Read and understand the full reference page before writing.",
    "Extract only regulatory meaning, practical intent and user questions.",
    "Do not copy wording, sentence structure or paragraph flow.",
    "Do not paraphrase line by line.",
    "Do not follow the same heading sequence blindly.",
    "Rebuild the page from scratch in Estabizz's advisory voice.",
    "Add missing compliance insights, practical risks and regulator expectations.",
    "Add tables, FAQs, quick answers, expert quote and strong CTA blocks.",
    "Make the rebuilt content more useful, clearer and more decision-oriented than the reference page.",
];

const flowRows = [
    { Step: "1", Section: "SEO Title", Purpose: "Create a focus-keyword-first title with regulatory and conversion intent." },
    { Step: "2", Section: "Meta Description", Purpose: "Summarise eligibility, process, fees, documents and compliance in search-ready language." },
    { Step: "3", Section: "URL Slug", Purpose: "Use a clean lowercase slug containing the focus keyword." },
    { Step: "4", Section: "Introduction", Purpose: "Start with the focus keyword and explain client relevance." },
    { Step: "5", Section: "Quick Answer Section", Purpose: "Provide featured-snippet style answers for users and answer engines." },
    { Step: "6", Section: "What is [Keyword]", Purpose: "Define the licence or service in plain compliance language." },
    { Step: "7", Section: "Regulatory Framework", Purpose: "Mention Act, regulation, circular, guideline and official source where available." },
    { Step: "8", Section: "Who Needs It", Purpose: "Explain business use cases and applicability." },
    { Step: "9", Section: "Eligibility Table", Purpose: "Convert eligibility into a scannable table with practical notes." },
    { Step: "10", Section: "Documents Table", Purpose: "Explain document purpose and common quality issues." },
    { Step: "11", Section: "Step-by-Step Process", Purpose: "Show filing sequence and regulator review points." },
    { Step: "12", Section: "Fees Table", Purpose: "List professional, statutory and regulatory fee positions safely." },
    { Step: "13", Section: "Timeline Table", Purpose: "Provide indicative stage-wise timelines with disclaimer." },
    { Step: "14", Section: "Post-Registration Compliance", Purpose: "Explain reporting, audit, policies, books and inspection readiness." },
    { Step: "15", Section: "Common Mistakes", Purpose: "Build trust through practical risk education." },
    { Step: "16", Section: "What People Ask", Purpose: "Add 25 to 35 short FAQs for SEO, GEO and AEO." },
    { Step: "17", Section: "Why Professional Support Matters", Purpose: "Explain execution value without exaggerated claims." },
    { Step: "18", Section: "Expert Quote", Purpose: "Add original governance-focused quote by CS Devyani Khambhati." },
    { Step: "19", Section: "Conclusion", Purpose: "Close with authority, legal safety and CTA." },
];

const complianceRows = [
    { Area: "SEO", Standard: "Title, meta description, URL slug, H1, first paragraph, internal links, image alt text and FAQ schema where supported." },
    { Area: "AEO", Standard: "Quick answer boxes, definition lines, short FAQ answers, tables and step-by-step process sections." },
    { Area: "GEO", Standard: "Natural query headings, zero-click complete answers, scenario questions, compliance warnings and expert quote." },
    { Area: "Legal safety", Standard: "No guaranteed approval, no assured licence, no unsupported timelines and no hardcoded unverified thresholds." },
    { Area: "Tone", Standard: "Professional Indian English, practical, humanised, slightly formal and regulator-respectful." },
];

export default function ContentRebuildCommandPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-20">
            <section className="border-b border-blue-100 px-6 py-16" style={{ background: "linear-gradient(135deg,#eff6ff,#f8fbff,#fffaf0)" }}>
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-6 flex gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link><span>&gt;</span><Link href="/resources" className="hover:text-[#0096D6]">Resources</Link><span>&gt;</span><span className="text-[#0096D6]">Content Rebuild Command</span>
                    </nav>
                    <span className="mb-4 inline-block rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0096D6]">Reference Content Rebuild System</span>
                    <h1 className="max-w-5xl text-[38px] font-black leading-tight text-[#0a1628] md:text-[52px]">Content Rebuild Command for SEO, GEO and AEO Regulatory Pages</h1>
                    <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#64748b]">
                        Use this Estabizz framework whenever a competitor or reference URL is provided. The objective is not to copy the page, but to understand the regulatory concept and rebuild it into original, practical, legally safe and conversion-focused Estabizz content.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-10">
                        <section className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                            <h2 className="mb-5 text-[28px] font-black text-[#0a1628]">Core Rebuild Rules</h2>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {rebuildRules.map((rule, index) => (
                                    <div key={rule} className="rounded-2xl bg-[#f8fbff] p-4">
                                        <span className="text-xs font-black text-[#0096D6]">Rule {index + 1}</span>
                                        <p className="mt-2 text-[14px] font-semibold leading-7 text-[#475569]">{rule}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <FrameworkTable title="Mandatory Content Flow for Rebuilt Content" columns={["Step", "Section", "Purpose"]} rows={flowRows} />

                        <FrameworkTable title="SEO + GEO + AEO Compliance Standard" columns={["Area", "Standard"]} rows={complianceRows} />

                        <section className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                            <h2 className="mb-4 text-[28px] font-black text-[#0a1628]">Safe Regulatory Wording</h2>
                            <p className="mb-5 text-[15.5px] leading-8 text-[#475569]">
                                Every rebuilt page must be regulator-respectful and legally safe. Use practical caution where thresholds, fee schedules, circulars or timelines may change from time to time.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "subject to regulatory scrutiny",
                                    "subject to regulator review",
                                    "subject to documentation quality",
                                    "subject to applicable eligibility",
                                    "indicative timeline",
                                    "regulatory requirements may change from time to time",
                                    "professional assistance may help reduce documentation gaps",
                                ].map((phrase) => (
                                    <span key={phrase} className="rounded-full border border-blue-100 bg-[#f8fbff] px-4 py-2 text-[13px] font-bold text-[#0a1628]">{phrase}</span>
                                ))}
                            </div>
                        </section>

                        <ExpertQuote quote="Reference content can tell us what people are searching for. A strong Estabizz page must go further and explain what the client should do before the regulator asks the question." />
                    </div>

                    <aside className="space-y-6">
                        <div className="sticky top-24 rounded-3xl bg-[#0a1628] p-7 text-white shadow-[0_24px_70px_rgba(10,22,40,0.22)]">
                            <h2 className="mb-4 text-[24px] font-black">Rebuild Checklist</h2>
                            <p className="mb-6 text-[14px] leading-7 text-blue-100">
                                Before publishing, verify originality, regulatory safety, CTA strength, FAQ quality and internal link validity.
                            </p>
                            <Link href="/resources/service-page-content-framework" className="block rounded-xl bg-[#0096D6] px-5 py-3 text-center text-sm font-black text-white">Open Service Page Framework</Link>
                            <Link href="/proposal-template" className="mt-3 block rounded-xl border border-white/25 px-5 py-3 text-center text-sm font-black text-white">Open Proposal Template</Link>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
