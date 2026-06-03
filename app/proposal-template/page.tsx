import type { Metadata } from "next";
import Link from "next/link";
import { FrameworkTable, ProcessTimeline, ProposalCommercialsTable } from "@/components/content/FrameworkBlocks";

export const metadata: Metadata = {
    title: "Proposal Template – Regulatory Registration & Compliance Proposal | Estabizz",
    description: "Browser-style regulatory proposal template by Estabizz for licence registration, compliance scope, timelines, commercials, regulatory fees and post-registration support.",
    alternates: { canonical: "/proposal-template" },
};

const scopeRows = [
    { "Service Component": "Eligibility assessment", Description: "Review applicant structure, business model, ownership, regulatory exposure and applicable licence route." },
    { "Service Component": "Documentation review and structuring", Description: "Check incorporation documents, net worth evidence, KYC records, declarations, policies and supporting attachments." },
    { "Service Component": "Application preparation and submission", Description: "Prepare application forms, business plan, declarations, policy documents and filing support as may be applicable." },
    { "Service Component": "Regulatory coordination", Description: "Coordinate for filing status, clarification tracking and structured response preparation during regulator review." },
    { "Service Component": "Clarification handling", Description: "Prepare practical responses to regulator queries based on documentation quality and application facts." },
    { "Service Component": "Approval support", Description: "Support registration fee payment coordination and certificate issuance process, subject to regulator review." },
    { "Service Component": "Post-registration compliance guidance", Description: "Provide initial compliance orientation, reporting calendar and policy implementation guidance where agreed." },
];

const requirementRows = [
    { "Requirement Category": "Legal structure", "Regulatory Expectation": "Applicant must be structured in a form permitted under the relevant regulator and licence framework." },
    { "Requirement Category": "Net worth / capital", "Regulatory Expectation": "Owned funds, minimum capital and net worth must be verified from the latest official regulatory schedule." },
    { "Requirement Category": "Infrastructure", "Regulatory Expectation": "Adequate office, technology, manpower, systems and record-keeping capability may be reviewed." },
    { "Requirement Category": "Key documents", "Regulatory Expectation": "Constitutional documents, KYC, financial records, declarations, business plan and policies are usually required." },
    { "Requirement Category": "Fit and proper", "Regulatory Expectation": "Promoters, directors, KMPs and key persons may be reviewed for integrity, solvency and regulatory background." },
    { "Requirement Category": "Compliance officer", "Regulatory Expectation": "A suitable compliance officer or responsible person may be required depending on the licence." },
    { "Requirement Category": "Ongoing compliance", "Regulatory Expectation": "Returns, audits, reporting, record retention and policy review continue after registration." },
    { "Requirement Category": "Change in control", "Regulatory Expectation": "Prior approval or intimation may be required for ownership, control or management changes." },
];

const timelineSteps = [
    { title: "Stage 1", subtitle: "Initial Assessment", description: "Corporate structure review, net worth validation and eligibility confirmation before any filing commitment." },
    { title: "Stage 2", subtitle: "Documentation & Structuring", description: "Preparation of application forms, declarations, compliance framework and internal policies." },
    { title: "Stage 3", subtitle: "Application Filing", description: "Submission of completed application along with statutory fees, as may be applicable." },
    { title: "Stage 4", subtitle: "Regulatory Review & Clarifications", description: "Regulator examination, query resolution and additional submissions, if required." },
    { title: "Stage 5", subtitle: "Approval & Post-Registration Support", description: "Registration fee payment, certificate issuance and compliance orientation, subject to regulator review." },
];

const processSteps = [
    "Incorporation / Structure Review",
    "Net Worth / Capital Confirmation",
    "Governance & Compliance Structuring",
    "Application Preparation",
    "Filing with Regulator",
    "Regulatory Scrutiny & Clarifications",
    "Registration Fee Payment",
    "Certificate Issuance",
    "Ongoing Compliance & Reporting Support",
];

export default function ProposalTemplatePage() {
    return (
        <main className="min-h-screen bg-white pt-[64px]">
            {/* Hero — homepage-themed */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link><span className="opacity-40">/</span><Link href="/resources" className="hover:text-[#374151] transition-colors">Resources</Link><span className="opacity-40">/</span><span className="text-[#374151]">Proposal Template</span>
                    </nav>
                    <div className="mb-5 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">Browser-Style Proposal System</div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a1628] text-2xl font-black text-white">E</div>
                    <h1 className="max-w-4xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">[Licence / Registration Name] - Regulatory Registration &amp; Compliance Proposal</h1>
                    <p className="mt-5 max-w-3xl text-[18px] font-semibold text-[#475569]">Prepared by Estabizz Fintech Private Limited</p>
                    <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#64748b]">
                        A reusable client-facing proposal format for regulatory licences, registrations and compliance engagements across RBI, SEBI, IRDAI, IFSCA and allied government frameworks.
                    </p>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-[280px_1fr]">
                <aside className="hidden lg:block">
                    <div className="sticky top-24 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                        <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">Proposal Sections</p>
                        {["Introduction", "Regulatory Overview", "Scope", "Requirements", "Timeline", "Commercials", "Closing Note"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="block rounded-lg px-3 py-2 text-[13px] font-bold text-[#475569] hover:bg-[#f5fbff] hover:text-[#1677f2]">{item}</a>
                        ))}
                    </div>
                </aside>

                <div className="space-y-10">
                    <section id="introduction" className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-4 text-[28px] font-black text-[#0a1628]">Introduction - Estabizz Fintech Private Limited</h2>
                        <p className="text-[15.5px] leading-8 text-[#475569]">
                            Estabizz Fintech Private Limited is a regulatory advisory and compliance-focused consultancy supporting businesses across licensing, registration, documentation and post-registration compliance. Our approach is advisory-first, execution-led and designed for clients who need clarity before entering a regulated business.
                        </p>
                        <p className="mt-4 text-[15.5px] leading-8 text-[#475569]">
                            We work with founders, CFOs, compliance teams and regulated entities to structure applications with regulatory discipline, realistic timelines and long-term compliance readiness. We do not promise approvals; we help reduce avoidable documentation gaps and support the client through regulator review.
                        </p>
                    </section>

                    <section id="regulatory-overview" className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-4 text-[28px] font-black text-[#0a1628]">Regulatory Overview</h2>
                        <p className="text-[15.5px] leading-8 text-[#475569]">
                            This section explains what the proposed licence is, who needs it, why the regulator mandates it and where it fits in the wider regulatory ecosystem. The final proposal should describe the applicant&apos;s intended activity, applicable regulator, eligibility requirements, documentation expectations and post-registration obligations in clear professional language.
                        </p>
                    </section>

                    <section id="scope">
                        <FrameworkTable title="Scope of Services" columns={["Service Component", "Description"]} rows={scopeRows} />
                    </section>

                    <section id="requirements">
                        <FrameworkTable title="Key Requirements" columns={["Requirement Category", "Regulatory Expectation"]} rows={requirementRows} />
                    </section>

                    <section id="timeline" className="space-y-6">
                        <h2 className="text-[30px] font-black text-[#0a1628]">Timeline</h2>
                        <ProcessTimeline steps={timelineSteps} />
                        <p className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-[14px] font-semibold leading-7 text-[#7a5a12]">
                            Actual timelines are subject to regulator review process, documentation quality, query rounds and application facts.
                        </p>
                    </section>

                    <section className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
                        <h2 className="mb-6 text-[28px] font-black text-[#0a1628]">Process Flow</h2>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {processSteps.map((step, index) => (
                                <div key={step} className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-4 text-center">
                                    <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1628] text-xs font-black text-white">{index + 1}</div>
                                    <p className="text-[13.5px] font-bold leading-6 text-[#0a1628]">{step}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="commercials" className="space-y-6">
                        <h2 className="text-[30px] font-black text-[#0a1628]">Commercials - Fees & Payments</h2>
                        <ProposalCommercialsTable />
                        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-[18px] font-black text-[#0a1628]">Government / Regulatory Fees</h3>
                            <p className="text-[15px] font-semibold leading-7 text-[#475569]">
                                All statutory / regulatory fees shall be paid directly by the client on the respective government or regulator portal through UPI / Debit Card / Net Banking, as applicable.
                            </p>
                        </div>
                        <FrameworkTable
                            title="Important Commercial Notes"
                            columns={["Note", "Position"]}
                            rows={[
                                { Note: "Professional fees", Position: "Professional fees are exclusive of statutory and regulatory fees." },
                                { Note: "Additional scope", Position: "Any additional advisory, restructuring or revised filing beyond agreed scope shall be quoted separately." },
                                { Note: "Timelines", Position: "Timelines are subject to regulator review, query rounds and regulatory processing." },
                                { Note: "Client delays", Position: "Delays due to incomplete documentation or structural non-compliance may extend timelines." },
                                { Note: "Retainer", Position: "Post-registration compliance retainer services are not included unless specifically agreed." },
                            ]}
                        />
                    </section>

                    <section id="closing-note" className="rounded-3xl bg-[#0a1628] p-8 text-white md:p-10">
                        <h2 className="mb-4 text-[30px] font-black">Closing Note</h2>
                        <p className="max-w-4xl text-[16px] leading-8 text-blue-100">
                            At Estabizz Fintech Private Limited, our commitment is to guide clients with regulatory accuracy, transparent execution and structured compliance planning. We look forward to supporting not only the registration journey but also long-term regulatory alignment.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
