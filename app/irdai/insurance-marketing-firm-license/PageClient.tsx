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
                    { q: "Can IMF operate digitally?", a: "Yes, digital platforms are allowed subject to compliance with IRDAI norms. Section 2: Eligibility & Applicability" },
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
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Insurance Marketing Firm License in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Insurance Marketing Firm License?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>val issued by the Insurance Regulatory and Development Authority of India (IRDAI) that allows entities to distribute insurance products, offer financial services, and act as a bridge between insurers </p>

            <h2 id="what-is">What is Insurance Marketing Firm License</h2>
            <p>This page provides comprehensive information about Insurance Marketing Firm License in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of IRDAI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Insurance Marketing Firm License in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Insurance Marketing Firm License in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
