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
        { label: "Regulator", value: "RBI" },
        { label: "Service Type", value: "Full Fledged Money Changers" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is an FFMC License in India?", a: "An FFMC License is an authorisation issued by the Reserve Bank of India allowing entities to deal in foreign exchange for specified purposes. • Permits money changing activities • Governed under FEMA regulations" },
                    { q: "Who issues the FFMC License?", a: "The FFMC License is issued by the Reserve Bank of India. • Acts as the regulatory authority • Ensures compliance with FEMA guidelines" },
                    { q: "What activities are allowed under FFMC License?", a: "FFMCs can undertake authorised money changing activities. • Purchase foreign currency • Sell foreign exchange for permitted purposes" },
                    { q: "Is FFMC License mandatory in India?", a: "Yes, it is mandatory to obtain FFMC License to deal in foreign exchange legally. • Required under FEMA • Unauthorised dealing is prohibited" },
                    { q: "What is the full form of FFMC?", a: "FFMC stands for Full Fledged Money Changer. • RBI authorised entity • Deals in forex transactions" },
                    { q: "Can individuals apply for FFMC License?", a: "No, individuals cannot apply. • Only companies registered under Companies Act are eligible" },
                    { q: "What is the objective of FFMC License?", a: "The objective is to regulate forex transactions. • Ensure transparency • Prevent illegal currency dealings" },
                    { q: "What law governs FFMC License in India?", a: "FFMC License is governed under FEMA, 1999. • Regulated by RBI • Supported by master directions" },
                    { q: "Can FFMC deal in all types of forex transactions?", a: "No, only permitted transactions are allowed. • Travel-related forex • Specified current account transactions" },
                    { q: "Can FFMC open branches?", a: "Yes, subject to RBI approval. • Branch expansion requires compliance" },
                    { q: "Is FFMC License valid across India?", a: "Yes, it is valid pan-India. • Subject to branch approvals" },
                    { q: "What is the role of RBI in FFMC regulation?", a: "RBI regulates, supervises, and monitors FFMCs. • Issues guidelines • Conducts inspections" },
                    { q: "Can FFMC issue forex cards?", a: "No, generally not allowed. • Limited to currency exchange" },
                    { q: "Is FFMC part of banking system?", a: "No, FFMCs are non-banking entities. • Operate under RBI authorisation Section 2: Eligibility & Applicability" },
                    { q: "Who can apply for FFMC License?", a: "Only companies registered under Companies Act can apply. • LLPs and individuals not eligible" },
                    { q: "What is the minimum net owned fund requirement?", a: "Minimum ₹25 lakh for single branch FFMC. • ₹50 lakh for multiple branches" },
                    { q: "Is prior experience required?", a: "Not mandatory, but preferred. • Helps in RBI evaluation" },
                    { q: "Can NBFC apply for FFMC License?", a: "Yes, NBFCs can apply if they meet conditions. • Must comply with RBI norms" },
                    { q: "Can foreign companies apply for FFMC License?", a: "No, only Indian incorporated companies are eligible." },
                    { q: "Is physical office mandatory?", a: "Yes, a proper place of business is required." },
                    { q: "Can startup companies apply?", a: "Yes, if they meet capital requirements." },
                    { q: "Can partnership firms apply?", a: "No, only companies are allowed." },
                    { q: "Is GST registration required?", a: "Yes, GST compliance is expected post registration. Section 3: Registration Process" },
                    { q: "What is the process to apply for FFMC License?", a: "The process involves RBI application and approval. • Prepare documents • Submit to RBI • Undergo verification" },
                    { q: "Where to apply for FFMC License?", a: "Application is submitted to RBI regional office." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Full Fledged Money Changers" }]}
            title="Full Fledged Money Changer License: Complete Guide to FFMC Registration in India"
            readTime="15 min read"
            focusKeyword="Full Fledged Money Changer License"
            sections={sections}
            ctaTitle="Need Expert Help with Full Fledged Money Changers?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Full Fledged Money Changer License."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Full Fledged Money Changers?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Bank of India (RBI) to entities authorised to deal in foreign exchange for permitted transactions such as currency exchange, travel forex, and remittances. What is Full Fledged Money Changer License I</p>

            <h2 id="what-is">What is Full Fledged Money Changers</h2>
            <p>This page provides comprehensive information about Full Fledged Money Changer License including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of RBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Full Fledged Money Changer License include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Full Fledged Money Changer License.</p></div>
            )}
        </ServicePageLayout>
    );
}
