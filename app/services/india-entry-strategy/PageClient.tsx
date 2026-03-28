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
        { label: "Service Type", value: "India Entry Strategy" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is India entry strategy for foreign companies?", a: "It refers to legal and regulatory methods to establish business presence in India. • Includes company setup • Regulatory approvals • Market entry planning" },
                    { q: "What are the common modes of entry into India?", a: "Key entry options include: • Private Limited Company • LLP • Liaison Office • Branch Office" },
                    { q: "Is India a good market for foreign businesses?", a: "Yes, India offers large consumer base and growth potential." },
                    { q: "Can a foreign company directly operate in India?", a: "No, it must establish a legal presence or obtain approvals." },
                    { q: "What is FDI in India?", a: "Foreign Direct Investment refers to investment by foreign entities." },
                    { q: "Who regulates foreign investment in India?", a: "RBI and Government of India regulate FDI." },
                    { q: "What is automatic route under FDI?", a: "Investment without prior government approval." },
                    { q: "What is approval route under FDI?", a: "Investment requiring government permission." },
                    { q: "What is a wholly owned subsidiary in India?", a: "A company fully owned by a foreign entity." },
                    { q: "What is a joint venture in India?", a: "Partnership between foreign and Indian entity." },
                    { q: "What is a liaison office?", a: "Office for communication, not commercial activity." },
                    { q: "What is a branch office?", a: "Office allowed to carry business operations." },
                    { q: "What is project office in India?", a: "Office for executing specific project." },
                    { q: "Can foreign companies own 100% in India?", a: "Yes, in many sectors under automatic route." },
                    { q: "Is India entry regulated?", a: "Yes, under FEMA and sectoral regulations. Section 2: Eligibility & Applicability" },
                    { q: "Who can enter India for business purposes?", a: "Any foreign entity subject to regulations." },
                    { q: "Can individuals invest in India?", a: "Yes, subject to FEMA provisions." },
                    { q: "Can foreign companies operate in financial sector?", a: "Yes, with regulatory approvals." },
                    { q: "Is India entry allowed in defense sector?", a: "Yes, but under approval route." },
                    { q: "Can foreign companies invest in real estate?", a: "Limited restrictions apply." },
                    { q: "Is India entry allowed for IT companies?", a: "Yes, under automatic route." },
                    { q: "Can foreign NGOs enter India?", a: "Yes, subject to FCRA compliance. Section 3: Registration Process" },
                    { q: "What is the process for entering India market?", a: "Key steps include: • Choose entry mode • Incorporate entity • Obtain approvals" },
                    { q: "How to set up a company in India?", a: "Through MCA registration process." },
                    { q: "What approvals are required for FDI?", a: "Depends on sector and route." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🇮🇳", label: "Services" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "India Entry Strategy" }]}
            title="India Entry Strategy: Steps for Smooth & Successful Business Setup in India"
            readTime="15 min read"
            focusKeyword="India Entry Strategy"
            sections={sections}
            ctaTitle="Need Expert Help with India Entry Strategy?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for India Entry Strategy."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with India Entry Strategy?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ia India Entry Strategy is the structured legal, regulatory, and business approach adopted by foreign entities to establish operations in India while complying with RBI, FEMA, Companies Act, and other</p>

            <h2 id="what-is">What is India Entry Strategy</h2>
            <p>This page provides comprehensive information about India Entry Strategy including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Services. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require India Entry Strategy include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about India Entry Strategy.</p></div>
            )}
        </ServicePageLayout>
    );
}
