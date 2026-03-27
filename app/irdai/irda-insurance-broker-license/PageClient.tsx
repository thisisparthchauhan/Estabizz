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
        { label: "Service Type", value: "Irda Insurance Broker License" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "Who issues the insurance broker license in India?", a: "The license is issued by the Insurance Regulatory and Development Authority of India (IRDAI). It is the governing body for insurance intermediaries." },
                    { q: "What is the role of an insurance broker?", a: "A broker advises clients and arranges insurance policies. Key roles include: • Policy comparison • Risk advisory • Claims assistance" },
                    { q: "What are the types of insurance broker licenses?", a: "There are three types: • Direct Broker • Reinsurance Broker • Composite Broker" },
                    { q: "Can a broker sell policies from multiple insurers?", a: "Yes, brokers can work with multiple insurers. This ensures unbiased advice to clients." },
                    { q: "Is insurance broker business profitable in India?", a: "Yes, it can be profitable due to recurring commissions and renewals. However, compliance costs must be considered." },
                    { q: "What is the validity of broker license?", a: "The license is valid for 3 years. Renewal is mandatory before expiry." },
                    { q: "Can an individual apply for broker license?", a: "No, only a Company or LLP can apply. Individuals are not eligible." },
                    { q: "Is insurance broker different from insurance agent?", a: "Yes, brokers are independent, while agents represent specific insurers." },
                    { q: "Can brokers operate online?", a: "Yes, but physical infrastructure is also required. Digital-only presence is not sufficient." },
                    { q: "What is composite broker license?", a: "It allows both direct and reinsurance activities. It requires higher capital." },
                    { q: "What is the scope of insurance broker business?", a: "Scope includes retail, corporate, and advisory services across insurance segments. Section 2: Eligibility & Applicability" },
                    { q: "What is minimum capital requirement?", a: "Capital starts from Rs. 75 Lakhs for direct brokers and increases for other types." },
                    { q: "Is net worth requirement mandatory?", a: "Yes, it must be maintained at all times as per regulatory guidelines." },
                    { q: "Can startups apply for broker license?", a: "Yes, provided they meet capital and compliance requirements." },
                    { q: "Is Principal Officer mandatory?", a: "Yes, it is a compulsory regulatory requirement." },
                    { q: "What qualification is required for Principal Officer?", a: "Must clear IRDAI-approved exam and training." },
                    { q: "Can NBFC apply for broker license?", a: "Yes, subject to RBI and IRDAI compliance." },
                    { q: "Is foreign investment allowed?", a: "Yes, as per FEMA and insurance sector FDI norms." },
                    { q: "Can partnership firm apply?", a: "No, only Company or LLP structure is allowed." },
                    { q: "What is fit and proper criteria?", a: "It includes: • Financial integrity • No criminal record • Good reputation" },
                    { q: "Is experience required?", a: "Yes, especially for Principal Officer and key management." },
                    { q: "Can existing agent upgrade to broker?", a: "Yes, by fulfilling eligibility criteria." },
                    { q: "Is office space required?", a: "Yes, physical office is mandatory." },
                    { q: "Can foreign company apply directly?", a: "No, it must incorporate Indian entity." },
                    { q: "Is compliance team required?", a: "Yes, especially for larger operations. Section 3: Registration Process" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Irda Insurance Broker License" }]}
            title="IRDAI Insurance Broker License: Complete Guide with Compliance Insights"
            readTime="15 min read"
            focusKeyword="IRDAI Insurance Broker License"
            sections={sections}
            ctaTitle="Need Expert Help with Irda Insurance Broker License?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for IRDAI Insurance Broker License."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Irda Insurance Broker License?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ntermediaries between insurers and customers in India. From a compliance perspective, this license ensures transparency, fair advisory, and protection of policyholder interests under the supervision o</p>

            <h2 id="what-is">What is Irda Insurance Broker License</h2>
            <p>This page provides comprehensive information about IRDAI Insurance Broker License including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of IRDAI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require IRDAI Insurance Broker License include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about IRDAI Insurance Broker License.</p></div>
            )}
        </ServicePageLayout>
    );
}
