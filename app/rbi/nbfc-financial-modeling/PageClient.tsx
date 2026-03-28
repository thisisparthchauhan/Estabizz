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
        { label: "Service Type", value: "Nbfc Financial Modeling" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is NBFC Financial Modeling?", a: "NBFC Financial Modeling is a structured financial projection framework used to estimate lending, profitability, capital adequacy, and risk exposure of an NBFC." },
                    { q: "Why is financial modeling important for NBFCs?", a: "It is essential to assess sustainability and compliance. It helps in: • RBI licensing approval • Investor evaluation • Risk forecasting" },
                    { q: "Is financial modeling mandatory for NBFC registration?", a: "While not explicitly mandated, it is practically required. RBI expects a robust business plan supported by realistic financial projections." },
                    { q: "What does an NBFC financial model typically include?", a: "It includes: • Loan book projections • Income & expense forecasts • NPA assumptions • Capital adequacy" },
                    { q: "Who prepares NBFC financial models?", a: "Typically prepared by: • Chartered Accountants • Financial consultants • Compliance professionals" },
                    { q: "What is the purpose of projections in NBFC models?", a: "To demonstrate future viability, scalability, and compliance with prudential norms." },
                    { q: "How many years should NBFC projections cover?", a: "Generally 5 years, as per industry practice and RBI expectations." },
                    { q: "What is a loan book in financial modeling?", a: "It represents the total outstanding loans disbursed by the NBFC." },
                    { q: "What is the role of assumptions in financial modeling?", a: "Assumptions drive projections such as interest rate, growth rate, and default rate." },
                    { q: "Is NBFC financial modeling different from normal business modeling?", a: "Yes, it is specialised and includes regulatory ratios like CRAR and provisioning norms." },
                    { q: "What is provisioning in NBFC models?", a: "Provisioning is setting aside funds to cover expected loan losses." },
                    { q: "Can startups create NBFC financial models?", a: "Yes, but it must be realistic and backed by data-driven assumptions." },
                    { q: "Is Excel used for NBFC financial modeling?", a: "Yes, Excel is the most commonly used tool. ### Section 2: Eligibility & Applicability" },
                    { q: "Who requires NBFC financial modeling?", a: "Required by: • NBFC applicants • Existing NBFCs • Investors and lenders" },
                    { q: "Is it required for all types of NBFCs?", a: "Yes, applicable across: • Investment NBFC • Lending NBFC • NBFC-MFI" },
                    { q: "Do RBI guidelines require financial projections?", a: "Yes, indirectly through business plan requirements under RBI regulations." },
                    { q: "Is financial modeling required for NBFC takeover?", a: "Yes, it is essential for valuation and due diligence." },
                    { q: "Is it needed for NBFC funding rounds?", a: "Yes, investors rely heavily on financial models." },
                    { q: "Do fintech NBFCs require different models?", a: "Yes, they include: • Digital acquisition costs • Technology expenses" },
                    { q: "Can small NBFCs skip modeling?", a: "No, even small NBFCs must demonstrate financial viability." },
                    { q: "Is it applicable for NBFC-P2P platforms?", a: "Yes, though the model structure differs." },
                    { q: "Does RBI verify financial projections?", a: "Yes, RBI evaluates feasibility and assumptions." },
                    { q: "Is modeling required for co-lending NBFCs?", a: "Yes, especially to assess partnership impact. ### Section 3: Registration Process" },
                    { q: "Is it part of the RBI COSMOS application?", a: "Yes, projections are included in application documents." },
                    { q: "What financial statements are required in modeling?", a: "• Balance Sheet • Profit & Loss • Cash Flow" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Nbfc Financial Modeling" }]}
            title="NBFC Financial Modelling: Insights for Smart & Compliant Growth"
            readTime="15 min read"
            focusKeyword="NBFC Financial Modelling"
            sections={sections}
            ctaTitle="Need Expert Help with Nbfc Financial Modeling?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for NBFC Financial Modelling."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Nbfc Financial Modeling?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>e, process, and key insights. NBFC Financial Modelling: Complete Guide to Structure, Compliance & Risk Planning in India 🔷 Introduction NBFC Financial Modelling is a critical foundation for any Non-Ba</p>

            <h2 id="what-is">What is Nbfc Financial Modeling</h2>
            <p>This page provides comprehensive information about NBFC Financial Modelling including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of RBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require NBFC Financial Modelling include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about NBFC Financial Modelling.</p></div>
            )}
        </ServicePageLayout>
    );
}
