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
                    { q: "What is profit shifting in transfer pricing?", a: "Shifting profits to low-tax jurisdictions. Section 2: Eligibility & Applicability" },
                    { q: "When does transfer pricing apply in India?", a: "When international or specified domestic transactions exist." },
                    { q: "Is there any threshold for international transactions?", a: "No minimum threshold applies." },
                    { q: "What is the threshold for specified domestic transactions?", a: "₹20 crore as per applicable provisions." },
                    { q: "Does transfer pricing apply to startups?", a: "Yes, if they have cross-border related-party transactions." },
                    { q: "Does TP apply to share capital transactions?", a: "Yes, valuation must be justified." },
                    { q: "Is TP applicable to loans between group entities?", a: "Yes, interest must be at arm’s length." },
                    { q: "Does TP apply to royalty payments?", a: "Yes, royalty must reflect market rates." },
                    { q: "Is TP applicable to branch offices?", a: "Yes, if cross-border dealings exist. Section 3: Registration Process" },
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
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Transfer Pricing in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Transfer Pricing?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>nt for businesses engaged in international or specified domestic transactions with related parties. It ensures that transactions between associated enterprises are conducted at arm’s length, preventin</p>

            <h2 id="what-is">What is Transfer Pricing</h2>
            <p>This page provides comprehensive information about Transfer Pricing in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Tax. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Transfer Pricing in India include entities operating in the regulated financial services sector.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <p>Eligibility requirements are defined by the relevant regulatory authority. Key criteria include entity type, capital requirements, and fit & proper standards for directors/promoters.</p>

            <h2 id="documents">Documents Required</h2>
            <ul>
                <li>Certificate of Incorporation</li>
                <li>Memorandum and Articles of Association</li>
                <li>Net Worth Certificate (CA certified)</li>
                <li>Business Plan</li>
                <li>KYC documents for Directors</li>
                <li>Board Resolution</li>
            </ul>

            <h2 id="process">Registration Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Preparation & Documentation</h4><p className="text-[13px] text-[#64748b] !mb-0">Gather all required documents and ensure eligibility criteria are met.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Application Filing</h4><p className="text-[13px] text-[#64748b] !mb-0">Submit the complete application to the regulatory authority with supporting documents.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Regulatory Review</h4><p className="text-[13px] text-[#64748b] !mb-0">The regulatory authority reviews the application and may seek clarifications.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Approval & Compliance Setup</h4><p className="text-[13px] text-[#64748b] !mb-0">Upon approval, set up compliance framework and begin operations.</p></div></div>
            </div>

            <h2 id="fees">Fees Structure</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particulars</th><th>Amount</th><th>Remarks</th></tr></thead>
                    <tbody>
                        <tr><td>Regulatory Application Fee</td><td>As prescribed</td><td>Non-refundable</td></tr>
                        <tr><td>Professional/Advisory Fees</td><td>Variable</td><td>Depends on scope</td></tr>
                        <tr><td>Compliance Setup Cost</td><td>Variable</td><td>One-time</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Estimated Time</th><th>Notes</th></tr></thead>
                    <tbody>
                        <tr><td>Document Preparation</td><td>2–4 weeks</td><td>Depends on complexity</td></tr>
                        <tr><td>Regulatory Review</td><td>3–6 months</td><td>Case-by-case</td></tr>
                        <tr><td>Approval</td><td>1–2 months</td><td>After compliance confirmation</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="compliance">Compliance Requirements</h2>
            <p>Post-registration compliance is critical to maintain the license/registration in good standing.</p>
            <ul>
                <li>Regular filings and returns</li>
                <li>Governance and board oversight</li>
                <li>Annual audit and reporting</li>
                <li>KYC/AML compliance</li>
                <li>Customer grievance redressal</li>
            </ul>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Transfer Pricing in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
