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
        { label: "Regulator", value: "IRDAI" },
        { label: "Service Type", value: "Pap License" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "Do directors need specific qualifications?", a: "Yes, they must meet “Fit & Proper” criteria." },
                    { q: "What is Fit & Proper criteria?", a: "It includes: • Integrity • Financial soundness • Clean regulatory record" },
                    { q: "Is prior insurance experience mandatory?", a: "Not mandatory, but highly preferred." },
                    { q: "Is office setup mandatory?", a: "Yes, physical infrastructure is required." },
                    { q: "Is IT infrastructure required at application stage?", a: "Yes, IRDAI expects operational readiness." },
                    { q: "Can a foreign company directly apply?", a: "No, it must incorporate an Indian company." },
                    { q: "Is hospital network required before application?", a: "It is preferred to demonstrate readiness." },
                    { q: "Is financial track record mandatory?", a: "Yes, IRDAI reviews financial strength. Section 3: Registration Process" },
                    { q: "Where is application submitted?", a: "Application is submitted to IRDAI." },
                    { q: "Is online application available?", a: "Partially, but documentation is detailed." },
                    { q: "What happens after submission?", a: "IRDAI reviews and raises queries if needed." },
                    { q: "Is personal meeting required?", a: "Sometimes, depending on IRDAI requirements." },
                    { q: "How many stages are there in approval?", a: "Typically 3–4 stages including scrutiny and evaluation." },
                    { q: "Can application be rejected?", a: "Yes, if requirements are not met." },
                    { q: "Can I reapply after rejection?", a: "Yes, after addressing deficiencies." },
                    { q: "Is business plan mandatory?", a: "Yes, it is a critical requirement. Section 4: Documents & Requirements" },
                    { q: "Is net worth certificate required?", a: "Yes, it proves capital compliance." },
                    { q: "Is business plan compulsory?", a: "Yes, IRDAI evaluates viability." },
                    { q: "Is Principal Officer qualification proof needed?", a: "Yes, mandatory." },
                    { q: "Is audited financial required?", a: "Yes, for financial evaluation." },
                    { q: "Is board resolution required?", a: "Yes, authorising application." },
                    { q: "Is hospital tie-up document required?", a: "Not mandatory but beneficial. Section 5: Fees & Cost" },
                    { q: "Is capital separate from fees?", a: "Yes, ₹4 Crore capital is separate." },
                    { q: "Is renewal fee applicable?", a: "Yes, periodically." },
                    { q: "Can approval be fast-tracked?", a: "Only if documentation is strong." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Pap License" }]}
            title="TPA License India: Complete 2026 Powerful Guide to IRDAI Registration, Eligibility & Compliance 🔗 Permalink"
            readTime="15 min read"
            focusKeyword="TPA License India"
            sections={sections}
            ctaTitle="Need Expert Help with Pap License?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for TPA License India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Pap License?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>val. TPA License India: Complete Powerful Guide for IRDAI Registration, Eligibility & Compliance Introduction TPA License India is a mandatory regulatory approval issued by the Insurance Regulatory an</p>

            <h2 id="what-is">What is Pap License</h2>
            <p>This page provides comprehensive information about TPA License India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of IRDAI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require TPA License India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about TPA License India.</p></div>
            )}
        </ServicePageLayout>
    );
}
