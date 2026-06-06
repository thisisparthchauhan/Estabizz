"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "what-is", title: "2. What Is" },
    { id: "regulatory-framework", title: "3. Regulatory Framework" },
    { id: "who-needs", title: "4. Who Needs" },
    { id: "eligibility", title: "5. Eligibility Criteria" },
    { id: "documents", title: "6. Documents Required" },
    { id: "process", title: "7. Registration Process" },
    { id: "fees", title: "8. Fees Structure" },
    { id: "timeline", title: "9. Timeline" },
    { id: "compliance", title: "10. Compliance Requirements" },
    { id: "faq", title: "11. FAQs" }
    ];

    const quickFacts = [
        { label: "Regulator", value: "SEBI" },
        { label: "Service Type", value: "Alternative Asset Portfolio Valuation" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What are alternative assets?", a: "Alternative assets include: • Private equity • Venture capital • Real estate • Structured debt • Hedge funds" },
                    { q: "Why is valuation required for alternative assets?", a: "It is required to ensure accurate reporting, investor transparency, and regulatory compliance under applicable frameworks." },
                    { q: "Is valuation mandatory in India?", a: "Yes, for regulated entities like AIFs and NBFCs, valuation is mandatory as per applicable regulations." },
                    { q: "What is fair value in valuation?", a: "Fair value is the price at which an asset can be exchanged between willing parties under normal conditions." },
                    { q: "Who performs asset valuation?", a: "Valuation is done by: • Registered valuers • Independent professionals • SEBI-approved entities" },
                    { q: "How is valuation different from pricing?", a: "Valuation is estimated value, whereas pricing is the actual transaction value." },
                    { q: "What is illiquid asset valuation?", a: "It is valuation of assets without active market prices using financial models and assumptions." },
                    { q: "Why are alternative assets difficult to value?", a: "Due to lack of market data, high subjectivity, and dependence on projections." },
                    { q: "Is valuation required for startups?", a: "Yes, especially during fundraising, ESOP issuance, and compliance reporting." },
                    { q: "Is valuation needed for unlisted shares?", a: "Yes, for tax, compliance, and investment purposes." },
                    { q: "Can individuals require valuation?", a: "Yes, especially HNIs and family offices managing alternative assets." },
                    { q: "Is valuation required for ESOP?", a: "Yes, for pricing and accounting purposes under Companies Act and accounting standards." },
                    { q: "Do IFSC entities require valuation?", a: "Yes, under IFSCA regulations for fund management entities." },
                    { q: "Is valuation required during fundraising?", a: "Yes, it determines entry price and investor shareholding." },
                    { q: "Is valuation needed for mergers?", a: "Yes, under Companies Act provisions." },
                    { q: "What is the process of portfolio valuation?", a: "Key steps include: • Asset identification • Data collection • Method selection • Valuation calculation." },
                    { q: "Is appointment of valuer mandatory?", a: "Yes, in many cases independent valuation is required as per regulations." },
                    { q: "How to select valuation method?", a: "Based on asset type, data availability, and regulatory guidance." },
                    { q: "What documents are reviewed in valuation?", a: "Financials, agreements, projections, and market data." },
                    { q: "How is DCF method applied?", a: "Future cash flows are estimated and discounted to present value." },
                    { q: "What is comparable method?", a: "Valuation based on similar companies or transactions." },
                    { q: "Can multiple methods be used?", a: "Yes, triangulation is often used for accuracy." },
                    { q: "Is management involved in valuation?", a: "Yes, but independent validation is required." },
                    { q: "Is valuation report mandatory?", a: "Yes, documentation is required for audit and compliance." },
                    { q: "What documents are required for valuation?", a: "Key documents include: • Financial statements • Shareholding structure • Agreements" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Alternative Asset Portfolio Valuation" }]}
            title="Alternative Asset Portfolio Valuation: Essential Insights for Accurate Compliance"
            readTime="15 min read"
            focusKeyword="Alternative Asset Portfolio Valuation"
            sections={sections}
            ctaTitle="Need Expert Help with Alternative Asset Portfolio Valuation?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Alternative Asset Portfolio Valuation."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Alternative Asset Portfolio Valuation?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Alternative Asset Portfolio Valuation is the structured valuation support required for AIFs, private market portfolios, venture investments, debt instruments, unlisted securities and other alternative assets. Proper valuation helps fund managers maintain investor transparency, regulatory discipline and audit-ready records.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Alternative Asset Portfolio Valuation?</h2>
            <p>Alternative Asset Portfolio Valuation is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>SEBI and applicable fund documents</td></tr>
                        <tr><td>Applicable framework</td><td>SEBI AIF Regulations, valuation guidelines, fund documents, accounting standards and investor reporting requirements.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>AIF managers, investment managers, trustees, family offices, venture capital funds, private equity funds and fund administrators should use professional valuation support where portfolio assets are illiquid, unlisted or complex.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Portfolio type</td><td>Unlisted equity, preference shares, debt, convertibles, fund interests or structured assets</td><td>Valuation method depends on instrument</td></tr>
                        <tr><td>Data availability</td><td>Financials, cap table, transaction history and business assumptions</td><td>Weak data reduces valuation reliability</td></tr>
                        <tr><td>Governance</td><td>Valuation policy and approval process</td><td>Required for consistent investor reporting</td></tr>
                        <tr><td>Independence</td><td>Valuer independence should be assessed</td><td>Conflicts must be managed</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Investment documents and security terms</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Latest financial statements of investee companies</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Capitalisation table and shareholder agreements</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan, projections and management notes</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Previous valuation reports, if any</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Transaction documents and comparable data</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Fund valuation policy and reporting format</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Auditor / trustee comments, where applicable</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="process">Registration / Advisory Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Applicability and Scope Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Confirm whether the activity, transaction or business model falls under the relevant framework.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Document Gap Assessment</h4><p className="text-[13px] text-[#64748b] !mb-0">Review records, approvals, policies and supporting evidence before drafting.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Application / Note Preparation</h4><p className="text-[13px] text-[#64748b] !mb-0">Prepare forms, checklists, policies, explanations and supporting documents as applicable.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Filing, Review and Query Support</h4><p className="text-[13px] text-[#64748b] !mb-0">Submit through the prescribed process and respond to regulator, bank, auditor or authority queries.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 5</div><h4>Compliance Setup</h4><p className="text-[13px] text-[#64748b] !mb-0">Maintain records, calendars, policies and evidence for future review or inspection.</p></div></div>
            </div>

            <h2 id="fees">Fees and Cost Overview</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Amount / Position</th><th>Verification Note</th></tr></thead>
                    <tbody>
                        <tr><td>Valuation fee</td><td>Depends on number and complexity of assets</td><td>Quoted after portfolio review</td></tr>
                        <tr><td>Regulatory fee</td><td>Generally not a filing fee for valuation support</td><td>Specific filing costs may apply separately</td></tr>
                        <tr><td>Audit support cost</td><td>Scope-based</td><td>Depends on auditor queries</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Portfolio data review</td><td>3 to 7 working days</td><td>Depends on asset count</td></tr>
                        <tr><td>Valuation work</td><td>1 to 3 weeks</td><td>Complex assets take longer</td></tr>
                        <tr><td>Final report and query closure</td><td>3 to 7 working days</td><td>Subject to data and review comments</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain valuation policy and method rationale</li>
                <li>Keep supporting data and assumptions on record</li>
                <li>Review material valuation changes before investor reporting</li>
                <li>Coordinate with auditor, trustee and fund administrator</li>
                <li>Avoid inconsistent valuation methods without documented reason</li>
            </ul>
            <h3>Common Mistakes to Avoid</h3>
            <ul>
                <li>Using copied documents without matching the actual business model.</li>
                <li>Submitting inconsistent financial, legal or operational information.</li>
                <li>Ignoring post-registration or post-filing compliance requirements.</li>
                <li>Missing authority queries, renewal timelines or reporting deadlines.</li>
            </ul>
            <div className="info-box"><p>This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. Requirements may change from time to time and should be verified from the latest official framework before taking action.</p></div>

            <h2 id="faq">Frequently Asked Questions (FAQs)</h2>
            {faqs.length > 0 ? (
            <div className="space-y-3 my-6">
                {faqs.map((item, i) => (
                    <details key={i} className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                        <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                            <span>{item.q}</span>
                            <span className="text-[#0096D6] transition-transform group-open:rotate-180 shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
            ) : (
            <div className="info-box"><p>For additional questions, please contact Estabizz for a service-specific clarification.</p></div>
            )}
        </ServicePageLayout>
    );
}
