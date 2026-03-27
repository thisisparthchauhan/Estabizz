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
        { label: "Service Type", value: "Irdai Regulatory Sandbox" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "Who regulates the Regulatory Sandbox in insurance?", a: "It is regulated by IRDAI. All sandbox approvals and monitoring are done under IRDAI guidelines." },
                    { q: "What is the main benefit of the Regulatory Sandbox?", a: "It enables real-time testing with limited risk. Companies can validate products before full compliance burden applies." },
                    { q: "Is Regulatory Sandbox mandatory for insurance innovation?", a: "No, it is not mandatory. However, it is advisable for testing new or experimental insurance products safely." },
                    { q: "What type of innovations are allowed under sandbox?", a: "Innovations can include: • New insurance products • Distribution models • Technology-driven solutions" },
                    { q: "What is the validity period of sandbox approval?", a: "Typically, approval is granted for a limited period. It may be extended based on IRDAI approval." },
                    { q: "Can sandbox products be sold to the public?", a: "Yes, but with restrictions. There are limits on customer exposure and risk." },
                    { q: "Does sandbox approval mean full license approval?", a: "No, it is only for testing. Full approval requires separate regulatory compliance." },
                    { q: "What is InsurTech in context of sandbox?", a: "InsurTech refers to technology-driven insurance solutions. Sandbox promotes such innovations." },
                    { q: "Can traditional insurers apply for sandbox?", a: "Yes, both insurers and startups can apply, subject to eligibility conditions." },
                    { q: "Is sandbox only for startups?", a: "No, it is open to: • Insurance companies • Intermediaries • Technology firms" },
                    { q: "What is the risk limitation in sandbox?", a: "Risk exposure is capped. IRDAI ensures consumer protection during testing." },
                    { q: "Can rejected applications be re-applied?", a: "Yes, applicants can reapply after addressing deficiencies." },
                    { q: "What is the legal basis of sandbox?", a: "It is governed under IRDAI Regulatory Sandbox Regulations, as per applicable guidelines. Section 2: Eligibility & Applicability" },
                    { q: "Can a fintech company apply for sandbox?", a: "Yes, if it has an insurance-linked innovation and meets IRDAI conditions." },
                    { q: "Can foreign companies apply for sandbox?", a: "Generally, applications must be routed through Indian entities." },
                    { q: "Is there any minimum capital requirement?", a: "It depends on the nature of the proposal. Financial capability must be demonstrated." },
                    { q: "Can individual entrepreneurs apply?", a: "No, typically applications are accepted from registered entities." },
                    { q: "Can brokers participate in sandbox?", a: "Yes, insurance intermediaries like brokers can apply." },
                    { q: "Is sandbox applicable to reinsurance?", a: "Yes, if innovation relates to reinsurance products or processes." },
                    { q: "Can multiple entities apply jointly?", a: "Yes, joint applications are allowed with clear roles defined." },
                    { q: "Is prior experience mandatory?", a: "Not mandatory, but domain knowledge is expected." },
                    { q: "Can NBFCs apply under sandbox?", a: "Yes, if the product involves insurance distribution or integration." },
                    { q: "Can digital-only insurance models apply?", a: "Yes, digital innovation is one of the key focus areas." },
                    { q: "Is sandbox open for health insurance innovations?", a: "Yes, all segments including life, general, and health are covered." },
                    { q: "Can rejected applicants appeal?", a: "There is no formal appeal, but reapplication is allowed. Section 3: Registration Process" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Irdai Regulatory Sandbox" }]}
            title="IRDAI Regulatory Sandbox in India: Ultimate Guide to Insurance Innovation Framework in India"
            readTime="15 min read"
            focusKeyword="IRDAI Regulatory Sandbox in India"
            sections={sections}
            ctaTitle="Need Expert Help with Irdai Regulatory Sandbox?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for IRDAI Regulatory Sandbox in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Irdai Regulatory Sandbox?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>intermediaries, and InsurTech entities to test innovative insurance products, technologies, and business models in a controlled environment under the supervision of the Insurance Regulatory and Develo</p>

            <h2 id="what-is">What is Irdai Regulatory Sandbox</h2>
            <p>This page provides comprehensive information about IRDAI Regulatory Sandbox in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of IRDAI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require IRDAI Regulatory Sandbox in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about IRDAI Regulatory Sandbox in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
