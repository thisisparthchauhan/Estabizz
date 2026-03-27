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
        { label: "Service Type", value: "Underwriter Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is SEBI Underwriter Registration in India?", a: "It is a licence issued by SEBI allowing an entity to act as an underwriter for securities issues. It ensures the underwriter can guarantee subscription in case of undersubscription." },
                    { q: "What does an underwriter do in an IPO?", a: "An underwriter guarantees subscription of shares. If the public does not subscribe fully, the underwriter purchases the remaining portion." },
                    { q: "Is SEBI registration mandatory for underwriting?", a: "Yes, it is mandatory. As per applicable regulations, no entity can act as an underwriter without SEBI registration." },
                    { q: "What is underwriting in simple terms?", a: "It is a commitment to buy unsubscribed shares in a securities issue, ensuring full subscription." },
                    { q: "Who regulates underwriters in India?", a: "Underwriters are regulated by the Securities and Exchange Board of India (SEBI)." },
                    { q: "What is an underwriting agreement?", a: "It is a contract between issuer and underwriter defining obligations, commission, and risk terms." },
                    { q: "Is underwriting compulsory for all IPOs?", a: "No, but it is commonly used to ensure issue success and investor confidence." },
                    { q: "What is firm underwriting?", a: "It is a commitment where the underwriter agrees to subscribe regardless of public response." },
                    { q: "What is soft underwriting?", a: "It is a non-binding commitment where the underwriter may not be obligated to subscribe." },
                    { q: "What is underwriting commission?", a: "It is the fee paid to underwriters for taking underwriting risk." },
                    { q: "Can individuals become underwriters?", a: "No, only entities such as companies, banks, or institutions can register." },
                    { q: "What is the role of underwriters in capital markets?", a: "They reduce risk for issuers and ensure smooth capital raising." },
                    { q: "Is underwriting risky?", a: "Yes, it involves financial exposure if the issue is undersubscribed." },
                    { q: "What is syndicate underwriting?", a: "Multiple underwriters share the risk of underwriting an issue." },
                    { q: "What is underwriting obligation?", a: "It is the commitment to subscribe to unsubscribed securities." },
                    { q: "Can underwriting be partial?", a: "Yes, underwriters can take responsibility for a portion of the issue." },
                    { q: "What is the purpose of underwriting?", a: "To ensure successful subscription of securities and protect issuers." },
                    { q: "Is underwriting a financial service?", a: "Yes, it is a regulated capital market activity. ### Section 2: Eligibility & Applicability (19–36)" },
                    { q: "Who can apply for SEBI Underwriter Registration?", a: "Entities such as: • Companies • Banks • Financial institutions • NBFCs" },
                    { q: "What is the minimum net worth required?", a: "Minimum ₹20 lakhs, as per regulatory guidelines." },
                    { q: "Can an NBFC become an underwriter?", a: "Yes, if it meets eligibility and obtains SEBI approval." },
                    { q: "Can a startup apply for underwriting licence ?", a: "Yes, but only if it meets financial and compliance criteria." },
                    { q: "Is experience required for registration?", a: "Yes, experienced personnel in capital markets are expected." },
                    { q: "What is “fit and proper” criteria?", a: "It includes integrity, financial soundness, and clean track record." },
                    { q: "Can LLP apply for underwriting registration?", a: "Practically, companies are preferred due to regulatory expectations." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Underwriter Registration" }]}
            title="SEBI Underwriter Registration in India: Complete Guide, Eligibility, Process & Compliance (2026)"
            readTime="15 min read"
            focusKeyword="Regulatory Compliance"
            sections={sections}
            ctaTitle="Need Expert Help with Underwriter Registration?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Regulatory Compliance."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Underwriter Registration?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ation in India SEBI Underwriter Registration in India is a regulatory approval required for entities that intend to undertake underwriting activities in the Indian securities market, particularly in p</p>

            <h2 id="what-is">What is Underwriter Registration</h2>
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
