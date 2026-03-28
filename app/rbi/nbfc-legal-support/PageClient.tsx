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
        { label: "Service Type", value: "Nbfc Legal Support" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What are NBFC Legal Support Services in India?", a: "NBFC Legal Support Services help NBFCs comply with RBI regulations and manage legal risks. It includes: • Compliance filings • Policy drafting • Audit and advisory" },
                    { q: "Why do NBFCs need legal support services?", a: "NBFCs need legal support to ensure continuous RBI compliance and avoid penalties. It helps in: • Regulatory reporting • Risk management • Governance" },
                    { q: "Is NBFC legal support mandatory in India?", a: "While outsourcing is not mandatory, compliance itself is compulsory under RBI regulations, making legal support practically essential." },
                    { q: "What is the role of RBI in NBFC compliance?", a: "RBI regulates NBFCs and ensures financial stability. It monitors: • Reporting • Governance • Customer protection" },
                    { q: "What services are included in NBFC legal support?", a: "It includes: • RBI filings • Audit support • Legal documentation • Compliance advisory" },
                    { q: "What is NBFC compliance?", a: "NBFC compliance means adhering to RBI regulations, reporting norms, and governance standards applicable to financial companies." },
                    { q: "Can startups use NBFC legal support services?", a: "Yes, startups entering lending or fintech space require legal support for compliance and structuring." },
                    { q: "What is the difference between NBFC compliance and legal support?", a: "Compliance is mandatory adherence, while legal support ensures proper execution and advisory." },
                    { q: "What is RBI Master Direction for NBFCs?", a: "It is a comprehensive guideline issued by RBI covering NBFC operations, compliance, and reporting requirements." },
                    { q: "Do small NBFCs also need legal support?", a: "Yes, all NBFCs irrespective of size must comply with RBI norms and require support." },
                    { q: "What is Fair Practices Code (FPC)?", a: "It ensures transparency in lending practices and customer dealings." },
                    { q: "What is KYC compliance in NBFC?", a: "KYC ensures identity verification of customers as per PMLA guidelines." },
                    { q: "What is NBFC governance?", a: "It refers to internal controls, board oversight, and regulatory adherence." },
                    { q: "What is NBFC audit requirement?", a: "NBFCs must conduct statutory and internal audits as per regulations." },
                    { q: "What is digital lending compliance?", a: "It ensures adherence to RBI digital lending guidelines for fintech models." },
                    { q: "What is NBFC legal advisory?", a: "It includes guidance on regulatory compliance, structuring, and legal risks." },
                    { q: "What is compliance risk in NBFC?", a: "Risk arising from non-adherence to RBI regulations. ### Section 2: Eligibility & Applicability (19–36)" },
                    { q: "Who needs NBFC Legal Support Services?", a: "Entities such as: • Loan NBFCs • Fintech companies • Microfinance institutions" },
                    { q: "Can fintech companies operate without NBFC legal support?", a: "No, fintechs partnering with NBFCs must ensure compliance support." },
                    { q: "Is NBFC legal support required for digital lending?", a: "Yes, due to strict RBI digital lending guidelines." },
                    { q: "Can NBFC operate without compliance officer?", a: "Not advisable; regulatory oversight is essential." },
                    { q: "Is NBFC compliance applicable to all lending companies?", a: "Yes, any company operating as NBFC must comply with RBI norms." },
                    { q: "Can a private limited company take NBFC support?", a: "Yes, especially if applying for NBFC license." },
                    { q: "Is legal support required after NBFC registration?", a: "Yes, ongoing compliance is mandatory." },
                    { q: "Can NBFC outsource compliance?", a: "Yes, but responsibility remains with NBFC." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Nbfc Legal Support" }]}
            title="NBFC Legal Support Services in India: Complete Compliance Guide"
            readTime="15 min read"
            focusKeyword="NBFC Legal Support Services in India"
            sections={sections}
            ctaTitle="Need Expert Help with Nbfc Legal Support?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for NBFC Legal Support Services in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Nbfc Legal Support?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>egulatory advisory. Ensure smooth operations with expert guidance. NBFC Legal Support Services in India NBFC Legal Support Services in India are essential for ensuring that Non-Banking Financial Compa</p>

            <h2 id="what-is">What is Nbfc Legal Support</h2>
            <p>This page provides comprehensive information about NBFC Legal Support Services in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of RBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require NBFC Legal Support Services in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about NBFC Legal Support Services in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
