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
        { label: "Regulator", value: "IFSCA" },
        { label: "Service Type", value: "Ifsca Insurance Intermediary" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
        { q: "What is an IFSCA Insurance Intermediary?", a: "An IFSCA Insurance Intermediary is an entity registered under the IFSCA (Insurance Intermediary) Regulations 2021 to carry on insurance intermediation business within the International Financial Services Centre (IFSC) at GIFT City, Gujarat. Categories include Broker, Reinsurance Broker, Composite Broker, Corporate Agent, and Insurance Marketing Firm operating under the IFSCA framework." },
        { q: "What is the legal basis for IFSCA insurance intermediary registration?", a: "The IFSCA (Insurance Intermediary) Regulations 2021 issued under the International Financial Services Centres Authority Act 2019 govern insurance intermediary registration at GIFT IFSC. These regulations are separate from and in addition to the IRDAI framework — entities in GIFT IFSC operate under IFSCA's jurisdiction for their IFSC operations." },
        { q: "What categories of insurance intermediaries can register with IFSCA?", a: "IFSCA permits the following categories: (1) Insurance Broker — direct and reinsurance; (2) Reinsurance Broker — exclusively reinsurance business; (3) Composite Broker — both direct and reinsurance; (4) Corporate Agent; (5) Insurance Marketing Firm; (6) Third Party Administrator (TPA) for health insurance. Each category has distinct eligibility and capital requirements." },
        { q: "What is the minimum capital requirement for IFSCA insurance intermediaries?", a: "Capital requirements under IFSCA regulations depend on the category: Composite Broker requires minimum USD 5,00,000; Direct Broker USD 75,000; Reinsurance Broker USD 2,00,000. These are in USD as IFSC entities transact in foreign currency. Capital must be maintained throughout the period of registration." },
        { q: "Can an existing Indian insurance broker also register as an IFSCA intermediary?", a: "Yes. An IRDAI-registered insurance broker or intermediary can also establish a presence in GIFT IFSC and obtain IFSCA registration to conduct business there. The IFSC entity is treated as a separate legal entity from the Indian entity. Businesses routed through IFSC are governed by IFSCA regulations rather than IRDAI regulations." },
        { q: "What types of insurance business can be conducted through IFSCA registration?", a: "IFSCA insurance intermediaries can facilitate: reinsurance placement with global reinsurers, cross-border insurance for risks located outside India, direct insurance for risks of IFSC units, marine and aviation insurance, specialty risk placement, and captive insurance structures. Risks within India (outside IFSC) generally remain under IRDAI jurisdiction." },
        { q: "What is the fit and proper requirement for IFSCA insurance intermediaries?", a: "All directors, key management persons, and principal officers must meet IFSCA's fit and proper criteria, which include: no criminal record, no prior regulatory action, financial soundness, adequate professional experience in insurance or financial services, and relevant qualifications. A declaration of fit and proper status is required at registration and on an ongoing basis." },
        { q: "How long is IFSCA insurance intermediary registration valid?", a: "IFSCA insurance intermediary registration is typically valid for 3 years from the date of grant, subject to annual compliance and renewal. The intermediary must file annual compliance reports, maintain minimum capital, and notify IFSCA of any material changes in ownership, management, or business model." },
        { q: "What are the ongoing compliance obligations for IFSCA insurance intermediaries?", a: "Post-registration obligations include: annual compliance report to IFSCA, maintenance of minimum capital and net worth, appointment of a Compliance Officer, maintenance of proper records and accounts in USD, KYC/AML compliance under IFSCA norms, periodic reporting of business data, and adherence to IFSCA circulars and guidelines as issued from time to time." },
        { q: "What are the key benefits of being an insurance intermediary in GIFT IFSC?", a: "Key benefits include: access to global reinsurance and insurance markets, ability to transact in foreign currency, favourable tax regime (100% tax exemption for the first 10 years out of 15 years, with a minimum of 50% thereafter under Section 80LA of Income Tax Act), access to a globally connected financial hub, single window regulatory framework under IFSCA, and no minimum lock-in period for profits." },
        { q: "Is IFSCA insurance intermediary registration separate from IRDAI registration?", a: "Yes, they are entirely separate regulatory approvals. IRDAI regulates insurance intermediaries operating within India (outside IFSC). IFSCA regulates entities operating within GIFT IFSC. An entity wishing to conduct both domestic Indian and IFSC business needs both approvals — each for its respective jurisdiction. There is no cross-recognition between the two frameworks." },
        { q: "What is the application process for IFSCA insurance intermediary registration?", a: "The process involves: (1) Incorporation of a company in GIFT IFSC SEZ; (2) Preparation of business plan, KYC, capital proofs; (3) Filing application with IFSCA through the IFSCA online portal with prescribed fee; (4) Regulatory review and possible queries; (5) In-principle approval; (6) Compliance with pre-operational conditions; (7) Final certificate of registration. End-to-end timelines range from 60-120 days." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🌐", label: "IFSCA" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Ifsca Insurance Intermediary" }]}
            title="IFSCA Insurance Intermediary Regulations 2021 – Powerful Foundation for IFSC Insurance Businesses 🔹 SEO"
            readTime="15 min read"
            focusKeyword="IFSCA Insurance Intermediary Regulations 2021 🔹"
            sections={sections}
            ctaTitle="Need Expert Help with Ifsca Insurance Intermediary?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for IFSCA Insurance Intermediary Regulations 2021 🔹."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Ifsca Insurance Intermediary?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>L Slug / ifsca -insurance-intermediary-regulations-2021 IFSCA Insurance Intermediary Regulations 2021 IFSCA Insurance Intermediary Regulations 2021 form the legal backbone for registration and operati</p>

            <h2 id="what-is">What is Ifsca Insurance Intermediary</h2>
            <p>This page provides comprehensive information about IFSCA Insurance Intermediary Regulations 2021 🔹 including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of IFSCA. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require IFSCA Insurance Intermediary Regulations 2021 🔹 include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about IFSCA Insurance Intermediary Regulations 2021 🔹.</p></div>
            )}
        </ServicePageLayout>
    );
}
