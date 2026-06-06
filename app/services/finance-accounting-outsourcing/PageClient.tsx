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
        { label: "Regulator", value: "Services" },
        { label: "Service Type", value: "Finance Accounting Outsourcing" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is finance and accounting outsourcing?", a: "Finance and accounting outsourcing means delegating accounting, bookkeeping, and financial management functions to an external professional firm. It helps businesses focus on core operations while ensuring compliance and accuracy." },
                    { q: "Why do companies outsource finance and accounting functions?", a: "Companies outsource to reduce cost , improve efficiency, and ensure compliance. Key benefits include: • Access to expert professionals • Reduced operational burden • Better financial reporting" },
                    { q: "Is finance and accounting outsourcing legal in India?", a: "Yes, it is completely legal. As per applicable regulations, businesses can outsource accounting functions while retaining ultimate responsibility for compliance." },
                    { q: "What services are included in finance and accounting outsourcing?", a: "It includes: • Bookkeeping • GST and tax compliance • Payroll processing • Financial reporting" },
                    { q: "Who typically uses accounting outsourcing services?", a: "Startups, SMEs, and large corporates use these services. It is especially useful for companies lacking in-house finance teams." },
                    { q: "How is outsourcing different from hiring an accountant?", a: "Outsourcing provides a team of experts instead of one individual. It offers scalability and broader expertise." },
                    { q: "What is the scope of outsourced accounting?", a: "It covers end- to -end financial management including compliance, reporting, taxation, and audit support." },
                    { q: "Can startups benefit from outsourcing finance functions?", a: "Yes, startups benefit significantly. It reduces initial cost and ensures regulatory compliance from day one." },
                    { q: "Is outsourcing suitable for small businesses?", a: "Yes, it is ideal. It helps small businesses avoid hiring full-time staff while maintaining compliance." },
                    { q: "What is the difference between bookkeeping and accounting outsourcing?", a: "Bookkeeping is recording transactions, while outsourcing includes analysis, compliance, and reporting." },
                    { q: "Does outsourcing include tax filing?", a: "Yes, most outsourcing providers handle GST, TDS, and income tax filings." },
                    { q: "Can outsourced firms handle audits?", a: "Yes, they assist in audit preparation and documentation." },
                    { q: "Is data confidentiality maintained in outsourcing?", a: "Yes, professional firms follow strict confidentiality and data protection policies." },
                    { q: "What industries use accounting outsourcing?", a: "Almost all industries including fintech, manufacturing, IT, and e-commerce." },
                    { q: "Is outsourcing only for large companies?", a: "No, it is widely used by startups and SMEs as well." },
                    { q: "Who can opt for finance and accounting outsourcing?", a: "Any business entity including Pvt Ltd, LLP, OPC, and proprietorship can opt for outsourcing." },
                    { q: "Is outsourcing mandatory for any company?", a: "No, it is optional. However, it is recommended for compliance efficiency." },
                    { q: "Can NBFCs outsource accounting functions?", a: "Yes, but as per RBI guidelines, core decision-making cannot be outsourced." },
                    { q: "Can foreign companies outsource accounting to India?", a: "Yes, many global companies outsource to India for cost and expertise benefits." },
                    { q: "Can a company outsource GST compliance?", a: "Yes, GST compliance is commonly outsourced to professionals." },
                    { q: "Can regulated entities outsource finance functions?", a: "Yes, subject to regulatory guidelines from RBI, SEBI, IRDAI." },
                    { q: "Can LLPs use outsourced accounting services?", a: "Yes, LLPs widely use outsourcing for compliance." },
                    { q: "Is outsourcing applicable to startups registered under DPIIT?", a: "Yes, startups can outsource all non-core functions including finance." },
                    { q: "Can NGOs outsource accounting?", a: "Yes, NGOs and Section 8 companies can outsource accounting and compliance." },
                    { q: "Is there any registration required for outsourcing services?", a: "No specific registration is required to outsource accounting functions." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📊", label: "Services" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Finance Accounting Outsourcing" }]}
            title="Finance and Accounting Outsourcing Services: Key Benefits Every Business Must Know"
            readTime="15 min read"
            focusKeyword="Finance and Accounting Outsourcing Services"
            sections={sections}
            ctaTitle="Need Expert Help with Finance Accounting Outsourcing?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Finance and Accounting Outsourcing Services."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Finance Accounting Outsourcing?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Finance and Accounting Outsourcing Services help businesses maintain accurate books, statutory records, tax filings, management reports and compliance evidence through a structured professional support model. For regulated and growth-stage businesses, disciplined finance operations are essential for audits, funding, regulatory filings and decision-making.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Finance and Accounting Outsourcing Services?</h2>
            <p>Finance and Accounting Outsourcing Services is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>MCA, Income Tax Department, GST authorities and applicable sector regulators</td></tr>
                        <tr><td>Applicable framework</td><td>Companies Act, Income-tax Act, GST law, accounting standards and entity-specific compliance requirements.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Startups, SMEs, NBFCs, fintech companies, professional firms, foreign subsidiaries, regulated entities and growing enterprises that need reliable bookkeeping, MIS, tax coordination and compliance support can use outsourced finance operations.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Business records</td><td>Bank statements, invoices, payroll and expense data</td><td>Data discipline improves reporting</td></tr>
                        <tr><td>Compliance profile</td><td>GST, TDS, ROC, tax and sector filings</td><td>Calendar must be mapped</td></tr>
                        <tr><td>Accounting system</td><td>Cloud accounting or ERP access</td><td>Access controls should be defined</td></tr>
                        <tr><td>Review cadence</td><td>Monthly, quarterly or annual reporting</td><td>Scope should match business complexity</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Incorporation and tax registration documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Bank statements and ledgers</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Sales, purchase and expense invoices</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Payroll and contractor records</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>GST, TDS and income-tax filings</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Loan, investment and funding documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Prior financial statements and audit reports</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Management reporting requirements</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>Government fee</td><td>As per filing or statutory requirement</td><td>Paid separately where applicable</td></tr>
                        <tr><td>Accounting support fee</td><td>Monthly or scope-based</td><td>Depends on volume and complexity</td></tr>
                        <tr><td>Audit / tax support</td><td>As applicable</td><td>Quoted separately if outside scope</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Onboarding and data access</td><td>3 to 7 working days</td><td>Depends on document readiness</td></tr>
                        <tr><td>Books cleanup</td><td>1 to 4 weeks</td><td>Depends on backlog</td></tr>
                        <tr><td>Monthly reporting cycle</td><td>Recurring</td><td>Based on agreed calendar</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain books and reconciliations regularly</li>
                <li>Track GST, TDS, income-tax and ROC due dates</li>
                <li>Prepare MIS and audit support files</li>
                <li>Preserve invoices, vouchers and statutory records</li>
                <li>Escalate unusual transactions and compliance gaps</li>
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
