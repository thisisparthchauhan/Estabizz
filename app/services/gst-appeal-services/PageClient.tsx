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
        { label: "Regulator", value: "GST" },
        { label: "Service Type", value: "Gst Appeal Services" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is GST appeal service in India?", a: "GST appeal service refers to professional assistance in challenging GST orders before appellate authorities. It ensures proper legal representation and compliance with GST provisions." },
                    { q: "When should I file a GST appeal?", a: "You should file a GST appeal when you disagree with a GST order. This includes tax demand, penalty, or refund rejection." },
                    { q: "What are GST disputes commonly related to?", a: "GST disputes generally arise due to: • Tax demand notices • ITC disallowance • Refund rejection • Classification issues" },
                    { q: "Is GST appeal a legal process?", a: "Yes, it is a quasi-judicial legal process governed under GST laws and appellate procedures." },
                    { q: "What is the first level of GST appeal?", a: "The first level is the Appellate Authority, usually the Commissioner (Appeals)." },
                    { q: "What is GST litigation?", a: "GST litigation refers to legal proceedings arising from GST disputes at different appellate levels." },
                    { q: "Can GST appeal correct wrong tax demand?", a: "Yes, GST appeal is the proper legal route to challenge incorrect tax demands." },
                    { q: "Is GST appeal mandatory for dispute resolution?", a: "Yes, appeals are the prescribed mechanism under GST to resolve disputes." },
                    { q: "Can GST appeal be filed online?", a: "Yes, appeals are filed online through the GST portal." },
                    { q: "What types of orders can be appealed under GST?", a: "Orders related to: • Tax demand • Penalty • Registration cancellation • Refund rejection" },
                    { q: "What is the role of GST consultant in appeal?", a: "A consultant helps in drafting grounds, preparing documents, and representing before authorities." },
                    { q: "Is GST appeal different from GST reply?", a: "Yes, reply is filed before order, while appeal is filed after order is passed." },
                    { q: "What is adjudication under GST?", a: "Adjudication is the process where authorities decide on tax disputes before appeal stage." },
                    { q: "Who can file GST appeal in India?", a: "Any person aggrieved by a GST order can file an appeal." },
                    { q: "Can a business owner file GST appeal?", a: "Yes, any registered taxpayer can file appeal." },
                    { q: "Can unregistered persons file GST appeal?", a: "Yes, if they are impacted by the GST order." },
                    { q: "Can GST appeal be filed for ITC mismatch?", a: "Yes, ITC-related disputes can be appealed." },
                    { q: "Is GST appeal applicable for refund rejection?", a: "Yes, refund rejections are commonly appealed." },
                    { q: "Can appeal be filed against GST cancellation?", a: "Yes, cancellation of registration can be challenged." },
                    { q: "Can composition dealers file appeal?", a: "Yes, composition taxpayers are eligible." },
                    { q: "Is appeal allowed for interest disputes?", a: "Yes, disputes relating to interest can be appealed." },
                    { q: "Can GST appeal be filed for classification issues?", a: "Yes, classification disputes are a common reason for appeal." },
                    { q: "Can GST officer also file appeal?", a: "Yes, departmental appeals can be filed under governing provisions." },
                    { q: "Can appeal be filed without GST registration?", a: "Yes, if the person is affected by the order." },
                    { q: "Is appeal applicable for audit findings?", a: "Only if a formal order is issued." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📋", label: "GST" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Gst Appeal Services" }]}
            title="GST Appeal Services India: Complete Guide to Avoid Costly Tax Errors"
            readTime="15 min read"
            focusKeyword="GST Appeal Services India"
            sections={sections}
            ctaTitle="Need Expert Help with Gst Appeal Services?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for GST Appeal Services India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Gst Appeal Services?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>or Businesses Facing Tax Disputes GST Appeal Services play a critical role for businesses that wish to challenge an order passed under GST laws. Whether it is a demand notice, penalty, or rejection of</p>

            <h2 id="what-is">What is Gst Appeal Services</h2>
            <p>This page provides comprehensive information about GST Appeal Services India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of GST. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require GST Appeal Services India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about GST Appeal Services India.</p></div>
            )}
        </ServicePageLayout>
    );
}
