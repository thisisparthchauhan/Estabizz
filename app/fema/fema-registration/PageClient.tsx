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
        { label: "Regulator", value: "FEMA" },
        { label: "Service Type", value: "Fema Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
        { q: "What is FEMA registration in India?", a: "FEMA (Foreign Exchange Management Act) registration refers to the various compliance obligations and RBI approvals required for entities involved in cross-border transactions, foreign investments, overseas remittances, and external commercial borrowings. It is not a single registration but a framework of filings and approvals administered by the Reserve Bank of India." },
        { q: "Who is required to comply with FEMA?", a: "FEMA compliance is mandatory for: persons resident in India dealing with foreign exchange, companies receiving FDI, Indian companies with overseas investments, entities taking or giving External Commercial Borrowings (ECBs), and foreign companies establishing presence in India through branch, liaison, or project offices." },
        { q: "What is the difference between FERA and FEMA?", a: "FERA (Foreign Exchange Regulation Act) was replaced by FEMA in 2000. FERA treated all foreign exchange violations as criminal offences. FEMA is civil in nature — violations attract monetary penalties rather than imprisonment, except in cases involving wilful evasion or misrepresentation. FEMA promotes orderly foreign exchange management rather than restriction." },
        { q: "What is Form FC-GPR under FEMA?", a: "Form FC-GPR (Foreign Currency - Gross Provisional Return) is a mandatory reporting form that an Indian company must file with the RBI within 30 days of issuing shares to a foreign investor (allotment of shares against FDI inflows). It is filed online through the RBI's FIRMS (Foreign Investment Reporting and Management System) portal." },
        { q: "What is the FLA Return under FEMA?", a: "The Annual Return on Foreign Liabilities and Assets (FLA Return) must be filed by all Indian companies that have received FDI or made overseas direct investment in any previous year, including the current year. It must be filed by July 15 each year on the RBI's FLAIR portal. Filing is mandatory even if there are no new transactions during the year." },
        { q: "What is the penalty for FEMA violations?", a: "FEMA violations attract a penalty of up to three times the amount involved in the contravention, or up to Rs. 2 lakh if the amount is not quantifiable. Continuing violations attract an additional penalty of Rs. 5,000 per day. Serious violations involving wilful evasion can be referred to the Enforcement Directorate (ED)." },
        { q: "What are External Commercial Borrowings (ECBs)?", a: "ECBs are borrowings by Indian entities from overseas lenders (including foreign banks, foreign subsidiaries, foreign equity holders, and international capital markets). ECBs require compliance with RBI's ECB framework including minimum average maturity, end-use restrictions, and reporting through Form ECB and ECB-2 returns to RBI." },
        { q: "Can an Indian company invest overseas under FEMA?", a: "Yes, under the Overseas Direct Investment (ODI) regulations. Indian companies can make investments in foreign companies through automatic route or approval route depending on the amount and nature of investment. All ODI transactions must be reported to RBI in Form ODI. Investment limits, end-use, and reporting requirements apply." },
        { q: "What is the Liberalised Remittance Scheme (LRS)?", a: "LRS allows resident individuals (not companies) to remit up to USD 2,50,000 per financial year for permitted purposes including education, medical treatment, travel, maintenance of close relatives abroad, and investment in foreign securities or property. All LRS remittances must be reported by Authorised Dealers (banks) to RBI." },
        { q: "What documents are required for FEMA compliance?", a: "Key documents include: KYC documents for all parties, share valuation certificate from SEBI-registered valuer for FDI, CA-certified net worth certificate, board resolution authorising the transaction, shareholder agreement / investment agreement, bank SWIFT details and remittance confirmation, and Form FC-GPR / Form ODI as applicable." },
        { q: "What is compounding of FEMA contraventions?", a: "Compounding is the process through which FEMA violations are settled by payment of a compounding amount to RBI without undergoing further prosecution. An entity that has violated FEMA can apply to RBI for compounding and pay the penalty assessed by RBI. Compounding provides a clean slate and is commonly used by companies that discover prior unreported transactions." },
        { q: "Is RBI approval required for all FDI?", a: "No. Most FDI in India comes under the Automatic Route — no prior RBI or government approval is required, only post-transaction reporting via FC-GPR. Government Route (prior approval required) applies to specific sectors like print media, satellite broadcasting, civil aviation, defence, banking, and multi-brand retail. The sector's applicable route must be verified before accepting FDI." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "⚖️", label: "FEMA" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "FEMA Services", href: "/fema" }, { label: "Fema Registration" }]}
            title="FEMA Registration in India: Guide to Compliance Requirements"
            readTime="15 min read"
            focusKeyword="FEMA Registration in India"
            sections={sections}
            ctaTitle="Need Expert Help with Fema Registration?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for FEMA Registration in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Fema Registration?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>is a critical compliance requirement for businesses and individuals dealing with foreign investments, cross-border transactions, or overseas remittances. From a regulatory standpoint, FEMA ensures tha</p>

            <h2 id="what-is">What is Fema Registration</h2>
            <p>This page provides comprehensive information about FEMA Registration in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of FEMA. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require FEMA Registration in India include entities operating in the regulated financial services sector.</p>

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
                            <span className="text-[#1677f2] transition-transform group-open:rotate-180 shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
            ) : (
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about FEMA Registration in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
