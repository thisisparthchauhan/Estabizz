import Link from "next/link";
import { ExpertQuote, FrameworkTable, QuickAnswerBox } from "@/components/content/FrameworkBlocks";

const frameworkSections = [
    "SEO elements",
    "Hero section",
    "Introduction",
    "Quick answer section",
    "Overview",
    "Regulatory framework",
    "Who can apply",
    "Why the licence is required",
    "Eligibility criteria table",
    "Capital, net worth and fees table",
    "Document checklist",
    "Registration process",
    "Timeline table",
    "Common mistakes",
    "Post-registration compliance",
    "How Estabizz helps",
    "Client story or case insight",
    "Why choose Estabizz Fintech",
    "What people ask FAQs",
    "Expert quote",
    "Final CTA",
    "Conclusion",
    "UI and UX suggestions",
    "Final self-QC checklist",
];

const seoRows = [
    { "SEO Element": "SEO title", "Content Rule": "Focus keyword must appear at the beginning of the title.", "Practical Note": "Keep it clear, premium and regulator-specific." },
    { "SEO Element": "Meta description", "Content Rule": "Focus keyword must appear naturally in the first sentence.", "Practical Note": "Mention eligibility, process, fees, documents and compliance where relevant." },
    { "SEO Element": "URL slug", "Content Rule": "Slug must include the focus keyword in clean lowercase form.", "Practical Note": "Avoid vague slugs and duplicate service URLs." },
    { "SEO Element": "First paragraph", "Content Rule": "Start with the focus keyword.", "Practical Note": "Make the opening useful for both users and AI answer engines." },
    { "SEO Element": "Headings", "Content Rule": "Use the keyword naturally in selected H2 / H3 headings.", "Practical Note": "Avoid keyword stuffing." },
    { "SEO Element": "Schema", "Content Rule": "Add FAQPage, Service, Article or Breadcrumb schema where supported.", "Practical Note": "Schema must match visible content." },
];

const faqRows = [
    { Category: "General Overview", Purpose: "Define the licence, regulator and business relevance.", "Question Style": "What is [Licence Name]?" },
    { Category: "Eligibility & Applicability", Purpose: "Clarify who can apply and who needs the licence.", "Question Style": "Who can apply for [Licence Name]?" },
    { Category: "Legal & Regulatory Framework", Purpose: "Explain applicable Act, regulations, master directions and circulars.", "Question Style": "Which law governs [Licence Name]?" },
    { Category: "Process & Application", Purpose: "Show how to apply and what the regulator checks.", "Question Style": "How do I apply for [Licence Name]?" },
    { Category: "Documents & Declarations", Purpose: "List practical documents and declarations.", "Question Style": "What documents are required for [Licence Name]?" },
    { Category: "Capital, Net Worth & Fees", Purpose: "Explain monetary requirements without hardcoding unverified numbers.", "Question Style": "What is the minimum net worth for [Licence Name]?" },
    { Category: "Post-Registration Compliance", Purpose: "Explain ongoing reporting, audit and governance obligations.", "Question Style": "What compliance is required after registration?" },
    { Category: "Practical / Scenario-Based Questions", Purpose: "Answer founder-style questions that appear in AI and voice search.", "Question Style": "Can I do this business without registration?" },
];

const qcItems = [
    "Content is original and not copied from any source.",
    "No guaranteed approval or assured licence language appears.",
    "Regulatory references are included with safe wording.",
    "CTA appears in the hero, middle section and final CTA.",
    "Tables are responsive and easy to scan on mobile.",
    "FAQ schema is added where supported and matches visible FAQs.",
    "The first paragraph starts with the focus keyword.",
    "Practical compliance risks and common mistakes are included.",
    "WhatsApp CTA uses https://wa.me/919825600907.",
    "The page uses professional Indian English and regulator-respectful wording.",
];

export default function ServicePageContentFrameworkPage() {
    return (
        <main className="min-h-screen bg-white">
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/admin" className="hover:text-[#374151] transition-colors">Admin</Link><span className="opacity-40">/</span><Link href="/admin/tools" className="hover:text-[#374151] transition-colors">Internal Tools</Link><span className="opacity-40">/</span><span className="text-[#374151]">Service Page Framework</span>
                    </nav>
                    <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">SEO + GEO + AEO Content Engine</span>
                    <h1 className="max-w-5xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">Service Page Content Framework <span className="text-[#1677f2]">for Regulatory Licence Pages</span></h1>
                    <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#64748b]">
                        A reusable Estabizz standard for premium RBI, SEBI, IRDAI, IFSCA and government licence pages. Each page should explain eligibility, documents, process, fees, timeline, compliance risks, FAQs and Estabizz support in a legally safe, client-ready format.
                    </p>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-[280px_1fr]">
                <aside className="hidden lg:block">
                    <div className="sticky top-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                        <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-[#1677f2]">Framework Flow</p>
                        {frameworkSections.slice(0, 14).map((section) => (
                            <a key={section} href={`#${section.replaceAll(" ", "-").replaceAll("/", "").toLowerCase()}`} className="block rounded-lg px-3 py-2 text-[13px] font-bold text-[#475569] hover:bg-blue-50 hover:text-[#1677f2]">{section}</a>
                        ))}
                    </div>
                </aside>

                <div className="space-y-10">
                    <QuickAnswerBox
                        title="Quick Answer: What This Framework Does"
                        answers={[
                            { question: "What is this framework?", answer: "It is a master content structure for every licence, registration and regulatory service page on the Estabizz website." },
                            { question: "Who should use it?", answer: "Website editors, developers and compliance writers preparing RBI, SEBI, IRDAI, IFSCA or government licence content." },
                            { question: "What does it improve?", answer: "It improves SEO, AI-search readability, featured snippet readiness, trust building and client conversion." },
                            { question: "What must it avoid?", answer: "It must avoid copied content, guaranteed approval language, broken links, unverified fee amounts and generic service copy." },
                        ]}
                    />

                    <section id="seo-elements">
                        <FrameworkTable title="SEO Elements and Rules" columns={["SEO Element", "Content Rule", "Practical Note"]} rows={seoRows} />
                    </section>

                    <section id="hero-section" className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-4 text-[28px] font-black text-[#0a1628]">Hero Section Standard</h2>
                        <p className="text-[15.5px] leading-8 text-[#475569]">
                            Every service page should open with a strong headline, short problem-solving subtext, regulatory trust badges, primary CTA, secondary CTA and WhatsApp CTA. Add this urgency line where suitable: One wrong step can delay approval. Speak with our experts before applying.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {["Speak with Compliance Expert", "Check Eligibility", "WhatsApp Estabizz Team"].map((cta) => (
                                <span key={cta} className="rounded-full border border-blue-100 bg-[#f8fbff] px-4 py-2 text-[13px] font-bold text-[#0a1628]">{cta}</span>
                            ))}
                        </div>
                    </section>

                    <section id="introduction" className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-4 text-[28px] font-black text-[#0a1628]">Introduction, Overview and Regulatory Framework</h2>
                        <p className="text-[15.5px] leading-8 text-[#475569]">
                            The first line must start with the focus keyword. The introduction should explain what the licence is, why it matters, who should care and why regulatory clarity is important. Use practical phrases such as "In simple terms", "From a compliance perspective" and "Legally speaking" where they improve clarity.
                        </p>
                        <p className="mt-4 text-[15.5px] leading-8 text-[#475569]">
                            The regulatory framework section should mention the applicable Act, regulation, master direction, circular, guideline or official FAQ. If a latest fee, threshold or capital requirement is unclear, use: "To be verified from the latest official regulatory schedule."
                        </p>
                    </section>

                    <section id="eligibility-criteria-table">
                        <FrameworkTable
                            title="Eligibility Criteria Table Format"
                            columns={["Criteria", "Requirement", "Practical Note"]}
                            rows={[
                                { Criteria: "Legal structure", Requirement: "Eligible company, LLP, trust, society or other permitted applicant, depending on the licence.", "Practical Note": "Confirm structure before filing." },
                                { Criteria: "Net worth / capital", Requirement: "Minimum amount as prescribed by regulator.", "Practical Note": "To be verified from the latest official regulatory schedule." },
                                { Criteria: "KMP / Principal Officer", Requirement: "Qualified and experienced responsible person where required.", "Practical Note": "Weak KMP documentation often leads to queries." },
                            ]}
                        />
                    </section>

                    <section id="document-checklist">
                        <FrameworkTable
                            title="Document Checklist Table Format"
                            columns={["Document", "Purpose", "Practical Note"]}
                            rows={[
                                { Document: "Incorporation documents", Purpose: "Establish legal existence and object clause.", "Practical Note": "MOA / AOA should support the proposed regulated activity." },
                                { Document: "Board resolution", Purpose: "Authorise application and regulatory filing.", "Practical Note": "Use licence-specific wording." },
                                { Document: "Net worth certificate", Purpose: "Confirm financial eligibility.", "Practical Note": "Must be CA-certified and based on accepted calculation." },
                                { Document: "Business plan", Purpose: "Explain model, revenue, compliance cost and operational readiness.", "Practical Note": "Avoid generic projections." },
                                { Document: "Policies and SOPs", Purpose: "Show compliance readiness.", "Practical Note": "Copy-paste policies weaken regulatory confidence." },
                            ]}
                        />
                    </section>

                    <section id="registration-process" className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-5 text-[28px] font-black text-[#0a1628]">Registration Process Standard</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[
                                "Eligibility and business model review",
                                "Documentation and structuring",
                                "Application preparation",
                                "Regulatory filing",
                                "Regulatory review and clarifications",
                                "Approval / registration fee payment",
                                "Certificate issuance",
                                "Post-registration compliance setup",
                            ].map((step, index) => (
                                <div key={step} className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-5">
                                    <span className="text-xs font-black text-[#1677f2]">Step {index + 1}</span>
                                    <h3 className="mt-2 text-[16px] font-black text-[#0a1628]">{step}</h3>
                                    <p className="mt-2 text-[13.5px] leading-6 text-[#64748b]">Add what the regulator checks and where clients commonly make mistakes.</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="what-people-ask-faqs">
                        <FrameworkTable title="FAQ Standard for Service Pages" columns={["Category", "Purpose", "Question Style"]} rows={faqRows} />
                    </section>

                    <section className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-4 text-[28px] font-black text-[#0a1628]">SEO + GEO + AEO Support</h2>
                        <p className="text-[15.5px] leading-8 text-[#475569]">
                            Every service page should include short answer boxes, definition lines, tables, step-by-step sections, query-based headings and scenario-led FAQs. This makes the page easier for Google, featured snippets and AI answer engines to understand without weakening legal accuracy.
                        </p>
                    </section>

                    <ExpertQuote quote="A strong regulatory page should not merely describe a licence. It should help the client understand eligibility, risk, documentation discipline and the cost of getting the first step wrong." />

                    <section id="final-self-qc-checklist" className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-6 text-[28px] font-black text-[#0a1628]">Final Self-QC Checklist</h2>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {qcItems.map((item) => (
                                <div key={item} className="rounded-xl bg-[#f8fbff] px-4 py-3 text-[14px] font-semibold leading-6 text-[#475569]">{item}</div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
