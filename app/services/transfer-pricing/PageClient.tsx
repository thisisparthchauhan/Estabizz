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
        { label: "Regulator", value: "Tax" },
        { label: "Service Type", value: "Transfer Pricing" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is transfer pricing in India?", a: "Transfer pricing refers to pricing of transactions between related entities. • Applies to group companies • Must follow arm’s length principle • Governed under Income Tax Act" },
                    { q: "What is the arm’s length principle?", a: "It means pricing must match what independent parties would agree. • Based on market conditions • Ensures fairness • Prevents tax avoidance" },
                    { q: "Why is transfer pricing regulated in India?", a: "To prevent profit shifting and protect tax revenue. • Ensures correct tax base • Maintains transparency" },
                    { q: "What are international transactions under transfer pricing?", a: "Transactions between associated enterprises across borders. • Goods, services, loans • Intangible transfers" },
                    { q: "Who enforces transfer pricing regulations?", a: "The Income Tax Department of India. • CBDT issues rules • TPO conducts assessments" },
                    { q: "What is the role of Transfer Pricing Officer (TPO)?", a: "The TPO evaluates whether pricing is at arm’s length. • Reviews documentation • Suggests adjustments" },
                    { q: "Is transfer pricing applicable only to large companies?", a: "No, it applies to any entity with qualifying transactions." },
                    { q: "What is benchmarking in transfer pricing?", a: "It compares transaction prices with market data." },
                    { q: "What is comparability analysis?", a: "It identifies similar companies for comparison." },
                    { q: "Is transfer pricing applicable to services?", a: "Yes, including technical, management, and consultancy services." },
                    { q: "What is Form 3CEB?", a: "A mandatory report certified by a Chartered Accountant." },
                    { q: "What is transfer pricing documentation?", a: "A detailed record justifying transaction pricing." },
                    { q: "What is profit shifting in transfer pricing?", a: "Shifting profits to low-tax jurisdictions." },
                    { q: "When does transfer pricing apply in India?", a: "When international or specified domestic transactions exist." },
                    { q: "Is there any threshold for international transactions?", a: "No minimum threshold applies." },
                    { q: "What is the threshold for specified domestic transactions?", a: "₹20 crore as per applicable provisions." },
                    { q: "Does transfer pricing apply to startups?", a: "Yes, if they have cross-border related-party transactions." },
                    { q: "Does TP apply to share capital transactions?", a: "Yes, valuation must be justified." },
                    { q: "Is TP applicable to loans between group entities?", a: "Yes, interest must be at arm’s length." },
                    { q: "Does TP apply to royalty payments?", a: "Yes, royalty must reflect market rates." },
                    { q: "Is TP applicable to branch offices?", a: "Yes, if cross-border dealings exist." },
                    { q: "Is there any separate registration for transfer pricing?", a: "No, compliance is part of income tax framework." },
                    { q: "What is the first step in TP compliance?", a: "Identify international transactions and AEs." },
                    { q: "How to determine associated enterprises?", a: "Based on control, shareholding, or dependency." },
                    { q: "What is CUP method?", a: "Compares identical uncontrolled transactions." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "💰", label: "Tax" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Transfer Pricing" }]}
            title="Transfer Pricing in India: Complete Compliance Guide with Practical Insights"
            readTime="15 min read"
            focusKeyword="Transfer Pricing in India"
            sections={sections}
            ctaTitle="Need Expert Help with Transfer Pricing?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Transfer Pricing in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Transfer Pricing?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Transfer Pricing in India applies to international transactions and specified domestic transactions between associated enterprises. Proper documentation, benchmarking and Form 3CEB compliance help reduce tax dispute risk and support arm’s length pricing during assessment or audit.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Transfer Pricing in India?</h2>
            <p>Transfer Pricing in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Income Tax Department</td></tr>
                        <tr><td>Applicable framework</td><td>Income-tax Act, 1961, transfer pricing rules, Form 3CEB, OECD-aligned principles and Indian tax documentation requirements.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Indian companies with foreign group entities, cross-border service arrangements, royalty, loans, guarantees, imports, exports, cost sharing, management fees or specified domestic transactions should evaluate transfer pricing compliance annually.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Associated enterprise relationship</td><td>Common control, ownership, management or influence</td><td>Must be analysed transaction-wise</td></tr>
                        <tr><td>Covered transactions</td><td>International or specified domestic transactions</td><td>Documentation depends on transaction type</td></tr>
                        <tr><td>Benchmarking</td><td>Arm’s length method and comparable analysis</td><td>Weak benchmarking increases dispute risk</td></tr>
                        <tr><td>Annual compliance</td><td>Form 3CEB and TP documentation where applicable</td><td>Deadlines must be tracked</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Group structure and related-party details</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Inter-company agreements and invoices</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Transaction-wise financial data</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Comparable company / market data</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Functional, asset and risk analysis</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Management fee / royalty support documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Loan, guarantee or service documentation</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Form 3CEB and accountant report inputs</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>Government fee</td><td>No single licence fee</td><td>Statutory filing and tax audit costs may apply</td></tr>
                        <tr><td>Benchmarking database / analysis</td><td>As applicable</td><td>Depends on complexity</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on transactions and documentation</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Transaction data review</td><td>1 to 2 weeks</td><td>Depends on accounting records</td></tr>
                        <tr><td>Benchmarking and documentation</td><td>2 to 5 weeks</td><td>Complex transactions take longer</td></tr>
                        <tr><td>Form 3CEB support</td><td>As per tax deadline</td><td>Needs auditor coordination</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain contemporaneous TP documentation</li>
                <li>Ensure inter-company agreements match actual conduct</li>
                <li>Track Form 3CEB and tax return deadlines</li>
                <li>Prepare support for assessment queries</li>
                <li>Review pricing policy when business model changes</li>
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
