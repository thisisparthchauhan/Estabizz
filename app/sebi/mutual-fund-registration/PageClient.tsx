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
        { label: "Service Type", value: "Mutual Fund Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is SEBI Mutual Fund Registration India?", a: "It is the approval required from SEBI to establish and operate a mutual fund structure in India. It involves sponsor, trustee, and AMC setup." },
                    { q: "Who regulates mutual funds in India?", a: "Mutual funds are regulated by SEBI under the SEBI (Mutual Funds) Regulations, 1996." },
                    { q: "Is SEBI registration mandatory for mutual funds?", a: "Yes, it is compulsory. No entity can operate mutual funds without SEBI approval." },
                    { q: "What is a mutual fund in simple terms?", a: "It is a pooled investment vehicle where funds from multiple investors are professionally managed." },
                    { q: "What is the role of a sponsor?", a: "Sponsor acts as the promoter and initiates the mutual fund structure." },
                    { q: "What is the role of trustees?", a: "Trustees protect investor interests and oversee AMC operations." },
                    { q: "Can individuals start a mutual fund?", a: "No, individuals cannot. Only structured entities meeting SEBI criteria can apply." },
                    { q: "What is the objective of SEBI regulation?", a: "To ensure investor protection, transparency, and fair practices." },
                    { q: "Is mutual fund business regulated strictly?", a: "Yes, it is highly regulated due to involvement of public money." },
                    { q: "What is a mutual fund trust?", a: "It is the legal structure under which mutual funds are established." },
                    { q: "What is a custodian?", a: "Custodian holds securities of the mutual fund independently." },
                    { q: "Can a company operate multiple schemes?", a: "Yes, after approval, multiple schemes can be launched." },
                    { q: "Is mutual fund business profitable?", a: "Yes, but it requires long-term commitment and scale. Section 2: Eligibility & Applicability" },
                    { q: "Who is eligible for SEBI Mutual Fund Registration India?", a: "Entities with financial strength, experience, and governance capability are eligible." },
                    { q: "What is minimum experience required for sponsor?", a: "Minimum 5 years in financial services sector." },
                    { q: "Is profitability mandatory for sponsor?", a: "Yes, consistent profitability and strong financials are expected." },
                    { q: "Can NBFCs apply for mutual fund registration?", a: "Yes, subject to meeting SEBI eligibility conditions." },
                    { q: "Can banks sponsor mutual funds?", a: "Yes, many banks operate mutual funds." },
                    { q: "Can foreign companies apply?", a: "Yes, subject to FEMA and SEBI compliance." },
                    { q: "Is net worth requirement applicable?", a: "Yes, AMC must maintain minimum ₹50 crore net worth." },
                    { q: "Can startups apply for mutual fund license?", a: "Only if they meet strict financial and governance requirements." },
                    { q: "What is fit and proper criteria?", a: "It evaluates integrity, financial soundness, and track record." },
                    { q: "Is prior asset management experience required?", a: "It is not mandatory but highly preferred by SEBI." },
                    { q: "Can LLP apply for mutual fund registration?", a: "No, AMC must be a company under Companies Act." },
                    { q: "Can fintech companies apply?", a: "Yes, if they meet regulatory and financial criteria." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Mutual Fund Registration" }]}
            title="SEBI Mutual Fund Registration India: Complete Guide with Eligibility, Process & Compliance"
            readTime="15 min read"
            focusKeyword="Regulatory Compliance"
            sections={sections}
            ctaTitle="Need Expert Help with Mutual Fund Registration?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Regulatory Compliance."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Mutual Fund Registration?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>tual-fund-registration- india SEBI Mutual Fund Registration India – Complete Regulatory Guide SEBI Mutual Fund Registration India is a highly structured and regulated process that enables entities to </p>

            <h2 id="what-is">What is Mutual Fund Registration</h2>
            <p>This page provides comprehensive information about Regulatory Compliance including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of SEBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Regulatory Compliance include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Regulatory Compliance.</p></div>
            )}
        </ServicePageLayout>
    );
}
