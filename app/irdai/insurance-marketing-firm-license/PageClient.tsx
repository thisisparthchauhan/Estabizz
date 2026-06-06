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
        { label: "Regulator", value: "IRDAI" },
        { label: "Service Type", value: "Insurance Marketing Firm License" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is an Insurance Marketing Firm (IMF) License in India?", a: "An IMF License is an authorisation issued by Insurance Regulatory and Development Authority of India allowing entities to distribute insurance products along with financial services. It permits selling life, general, and health insurance of multiple insurers." },
                    { q: "Who regulates Insurance Marketing Firms in India?", a: "IMFs are regulated by Insurance Regulatory and Development Authority of India under the IMF Regulations, 2015 and subsequent amendments." },
                    { q: "What activities can an IMF perform?", a: "An IMF can undertake: • Insurance distribution (life, general, health) • Mutual fund distribution • Pension products • Other permitted financial services" },
                    { q: "Is IMF different from an Insurance Broker?", a: "Yes, IMFs have limited scope compared to brokers. Key differences: • IMF: Works with limited insurers • Broker: Works with multiple insurers without restriction • IMF has lower compliance requirements" },
                    { q: "What is the objective of introducing IMF License?", a: "The objective is to increase insurance penetration by enabling small businesses to distribute insurance in semi-urban and rural areas." },
                    { q: "Can IMF sell policies from multiple insurers?", a: "Yes, but within limits prescribed by IRDAI: • Up to 2 life insurers • Up to 2 general insurers • Up to 2 health insurers" },
                    { q: "Is IMF License mandatory for selling insurance?", a: "Yes, if operating as a firm/entity. Individuals may act as agents, but firms must obtain IMF registration." },
                    { q: "What is the legal framework governing IMFs?", a: "IMFs are governed by IRDAI (Registration of Insurance Marketing Firm) Regulations, 2015." },
                    { q: "Can IMF provide advisory services?", a: "No, IMFs cannot provide independent advisory like RIAs. They are primarily distributors." },
                    { q: "Who is a Principal Officer in IMF?", a: "A Principal Officer is a key managerial person responsible for compliance and operations of the IMF." },
                    { q: "Can IMF operate across India?", a: "Yes, subject to approval and branch expansion permissions under IRDAI guidelines." },
                    { q: "Is IMF suitable for startups?", a: "Yes, IMFs are designed for: • Small businesses • Financial consultants • Entrepreneurs entering insurance distribution" },
                    { q: "What is IMF registration validity?", a: "Typically valid for 3 years, subject to renewal as per IRDAI guidelines." },
                    { q: "Can IMF sell loans or banking products?", a: "Yes, IMFs can distribute certain financial products like loans under permitted activities." },
                    { q: "Is IMF allowed to earn commission?", a: "Yes, commissions are regulated by IRDAI and paid by insurers." },
                    { q: "Can IMF act as POS (Point of Sales)?", a: "Yes, IMF can appoint POS persons to sell simplified insurance products." },
                    { q: "What is IMF registration category?", a: "It is a corporate insurance intermediary under IRDAI." },
                    { q: "Can IMF operate digitally?", a: "Yes, digital platforms are allowed subject to compliance with IRDAI norms." },
                    { q: "Who can apply for IMF License?", a: "Eligible applicants include: • Companies • LLPs • Partnership firms" },
                    { q: "What is the minimum net worth required for IMF?", a: "Minimum net worth is Rs. 10 lakh as per IRDAI regulations." },
                    { q: "Can an individual apply for IMF License?", a: "No, individuals cannot apply directly; they can work as Insurance Sales Persons." },
                    { q: "Is prior insurance experience required?", a: "Yes, the Principal Officer must have relevant experience or qualifications." },
                    { q: "What qualifications are required for Principal Officer?", a: "Typically: • Graduate degree • IRDAI training certification • Relevant experience" },
                    { q: "Can foreign entities apply for IMF?", a: "No, IMF must be an Indian entity as per regulatory guidelines." },
                    { q: "Is GST registration required for IMF?", a: "Yes, GST registration is mandatory for commission-based income." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Insurance Marketing Firm License" }]}
            title="Insurance Marketing Firm License in India: 2026 Complete Guide with Eligibility, Process & Compliance"
            readTime="15 min read"
            focusKeyword="Insurance Marketing Firm License in India"
            sections={sections}
            ctaTitle="Need Expert Help with Insurance Marketing Firm License?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Insurance Marketing Firm License in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Insurance Marketing Firm License?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Insurance Marketing Firm License in India is an IRDAI permission for eligible entities intending to distribute permitted insurance products and specified financial products through an approved insurance marketing model. The applicant must demonstrate principal officer readiness, qualified insurance sales persons, infrastructure, capital and compliance systems.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Insurance Marketing Firm License in India?</h2>
            <p>Insurance Marketing Firm License in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Insurance Regulatory and Development Authority of India</td></tr>
                        <tr><td>Applicable framework</td><td>IRDAI framework for Insurance Marketing Firms, Insurance Act and applicable IRDAI circulars.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Insurance distribution entrepreneurs, fintech insurance platforms, regional financial service firms, NBFC-linked distribution models and corporate groups planning regulated insurance distribution should evaluate IMF licensing before solicitation activity.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Legal structure</td><td>Eligible company, LLP or other permitted structure</td><td>Confirm latest IRDAI eligibility</td></tr>
                        <tr><td>Principal Officer</td><td>Qualified and trained principal officer</td><td>Certification and experience matter</td></tr>
                        <tr><td>Insurance Sales Persons</td><td>Trained / certified sales persons as required</td><td>Staff records must be maintained</td></tr>
                        <tr><td>Net worth / capital</td><td>As prescribed by IRDAI</td><td>Verify latest official schedule</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Incorporation documents / LLP agreement</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Principal officer KYC, qualification and training records</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Insurance sales person details</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Net worth certificate and financial records</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Office and infrastructure proof</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan and product distribution strategy</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Fit and proper declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>IRDAI application forms and policies</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>IRDAI fee</td><td>As prescribed</td><td>To be verified from latest IRDAI schedule</td></tr>
                        <tr><td>Training / certification cost</td><td>As applicable</td><td>Depends on personnel</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on application readiness</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Eligibility review</td><td>1 to 2 weeks</td><td>Principal officer readiness is key</td></tr>
                        <tr><td>Documentation</td><td>2 to 4 weeks</td><td>Training records may affect timing</td></tr>
                        <tr><td>IRDAI review</td><td>2 to 4 months or more</td><td>Subject to queries and scrutiny</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain solicitation and sales records</li>
                <li>Track principal officer and ISP validity</li>
                <li>Submit periodic IRDAI reports and returns</li>
                <li>Maintain grievance redressal and policyholder service records</li>
                <li>Avoid mis-selling and unauthorised product solicitation</li>
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
