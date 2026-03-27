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
        { label: "Service Type", value: "Aif Compliance Test Report" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "Is Compliance Test Report mandatory in India?", a: "Yes, as per applicable SEBI regulations, it is a mandatory annual requirement." },
                    { q: "What is the main purpose of CTR?", a: "To verify compliance with investment limits, disclosures, and governance norms." },
                    { q: "Is CTR same as audit report?", a: "No, CTR focuses on regulatory compliance, while audit report focuses on financials." },
                    { q: "Who prepares the Compliance Test Report?", a: "It is prepared and certified by a CA, CS, or qualified compliance professional." },
                    { q: "What is checked in CTR?", a: "Investment limits, leverage, diversification, and adherence to PPM." },
                    { q: "Is CTR required for each scheme?", a: "Yes, compliance is generally reviewed at scheme level as well." },
                    { q: "Can CTR be skipped for small funds?", a: "No, size does not exempt regulatory compliance." },
                    { q: "Is CTR filed online?", a: "It may be submitted digitally or maintained for regulatory inspection." },
                    { q: "Does CTR impact investor confidence?", a: "Yes, it reflects governance and compliance strength." },
                    { q: "What is CTR certification?", a: "It is a professional confirmation that the fund complies with regulations. Section 2: Eligibility & Applicability" },
                    { q: "Who is required to obtain CTR?", a: "All SEBI-registered AIFs, including Category I, II, and III." },
                    { q: "Does angel fund require CTR?", a: "Yes, if registered under Category I AIF." },
                    { q: "Who is responsible for CTR compliance?", a: "Fund manager and trustee jointly ensure compliance." },
                    { q: "Does sponsor have responsibility in CTR?", a: "Yes, sponsors are accountable for governance oversight." },
                    { q: "Is CTR applicable for closed-ended funds?", a: "Yes, until the fund lifecycle is completed." },
                    { q: "Does CTR apply to each investment?", a: "Yes, all investments are assessed for compliance." },
                    { q: "Can a fund avoid CTR if no investments are made?", a: "No, compliance still needs to be confirmed." },
                    { q: "Is CTR required for co-investment structures?", a: "Yes, if they fall under AIF framework." },
                    { q: "Does CTR apply to debt funds?", a: "Yes, Category II debt funds must comply." },
                    { q: "Is CTR needed for fund of funds?", a: "Yes, compliance applies to all AIF structures." },
                    { q: "Who verifies CTR accuracy?", a: "Independent professionals like CA or CS verify it. Section 3: Registration Process" },
                    { q: "What is the first step in CTR preparation?", a: "Compile financial and investment data." },
                    { q: "Is SEBI approval required before CTR preparation?", a: "No, CTR is prepared post-operations." },
                    { q: "How is compliance verified?", a: "Through review of PPM, regulations, and investment records." },
                    { q: "What is the role of compliance officer?", a: "To coordinate data and ensure regulatory adherence." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Aif Compliance Test Report" }]}
            title="Compliance Test Report for AIF: Complete Guide with Key Requirements, Process & Expert Insights"
            readTime="15 min read"
            focusKeyword="Compliance Test Report for AIF"
            sections={sections}
            ctaTitle="Need Expert Help with Aif Compliance Test Report?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Compliance Test Report for AIF."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Aif Compliance Test Report?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>latory requirement under SEBI that ensures Alternative Investment Funds operate strictly within prescribed guidelines, investment limits, and governance standards. For fund managers, trustees, and com</p>

            <h2 id="what-is">What is Aif Compliance Test Report</h2>
            <p>This page provides comprehensive information about Compliance Test Report for AIF including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of SEBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Compliance Test Report for AIF include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Compliance Test Report for AIF.</p></div>
            )}
        </ServicePageLayout>
    );
}
