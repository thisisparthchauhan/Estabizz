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
        { label: "Service Type", value: "Credit Rating Agency" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What does a credit rating agency do?", a: "It evaluates the creditworthiness of issuers and instruments. Key roles include: • Risk assessment • Rating assignment • Ongoing surveillance" },
                    { q: "Is SEBI registration compulsory for credit rating agencies?", a: "Yes, it is mandatory. No entity can legally provide credit rating services without SEBI registration." },
                    { q: "Who regulates credit rating agencies in India?", a: "SEBI regulates CRAs under the SEBI (Credit Rating Agencies) Regulations." },
                    { q: "What is rating independence?", a: "It means ratings must be unbiased and free from external influence." },
                    { q: "What is surveillance rating?", a: "It is periodic review of an existing rating to reflect updated risk conditions." },
                    { q: "Why are credit ratings important?", a: "They help investors assess risk before investing in financial instruments." },
                    { q: "What is rating methodology?", a: "It is a structured framework used to assess credit risk." },
                    { q: "What is the minimum net worth required?", a: "₹5 crore is required as per SEBI regulations." },
                    { q: "Is prior experience mandatory?", a: "Yes, SEBI expects experienced management in finance and risk analysis." },
                    { q: "What type of company structure is required?", a: "A company incorporated under the Companies Act." },
                    { q: "Is foreign shareholding allowed?", a: "Yes, subject to regulatory norms." },
                    { q: "Is infrastructure required before applying?", a: "Yes, systems and processes must be in place." },
                    { q: "Is independence mandatory for eligibility?", a: "Yes, independence is a core requirement." },
                    { q: "What qualifications should KMP have?", a: "Relevant experience in finance, risk, and credit analysis." },
                    { q: "Can group companies be rated?", a: "Restricted due to conflict of interest." },
                    { q: "Is business plan submission required?", a: "Yes, it is mandatory." },
                    { q: "What is the importance of governance structure?", a: "Strong governance increases approval chances." },
                    { q: "Is financial stability checked?", a: "Yes, net worth and sustainability are evaluated." },
                    { q: "Can a fintech company apply?", a: "Yes, if it meets regulatory conditions." },
                    { q: "Is independence from issuers required?", a: "Yes, to avoid biased ratings." },
                    { q: "Can a loss-making company apply?", a: "Generally discouraged unless strong backing exists. ### Section 3: Registration Process (41–60)" },
                    { q: "Is there a prescribed application format?", a: "Yes, SEBI provides a specific format." },
                    { q: "What happens after application submission?", a: "SEBI reviews and may raise queries." },
                    { q: "Can application be rejected?", a: "Yes, if eligibility or compliance is inadequate." },
                    { q: "Is professional assistance required?", a: "Not mandatory but highly recommended." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Credit Rating Agency" }]}
            title="SEBI Credit Rating Agency Registration – Complete 2026 Guide with Key Requirements & Process"
            readTime="15 min read"
            focusKeyword="SEBI Credit Rating Agency Registration"
            sections={sections}
            ctaTitle="Need Expert Help with Credit Rating Agency?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for SEBI Credit Rating Agency Registration."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Credit Rating Agency?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ng Agency Registration is a critical regulatory approval required for entities intending to provide credit rating services in India. In a market where investor confidence and financial transparency ar</p>

            <h2 id="what-is">What is Credit Rating Agency</h2>
            <p>This page provides comprehensive information about SEBI Credit Rating Agency Registration including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of SEBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require SEBI Credit Rating Agency Registration include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about SEBI Credit Rating Agency Registration.</p></div>
            )}
        </ServicePageLayout>
    );
}
