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
        { label: "Regulator", value: "Legal" },
        { label: "Service Type", value: "Refund Policy" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is a refund policy for professional services?", a: "A refund policy defines when service fees can be refunded and when they cannot. It clarifies scope, eligibility, timelines, and exclusions." },
                    { q: "Why is a refund policy important before making payment?", a: "It prevents disputes by setting clear expectations. It explains service limitations, non-refundable components, and client responsibilities." },
                    { q: "Is refund policy legally binding?", a: "Yes, it is binding once accepted. As per contractual principles, payment implies agreement to terms." },
                    { q: "Does refund policy apply to all services?", a: "Yes, it applies to all paid services. However, refund eligibility varies based on service type and stage." },
                    { q: "Is refund guaranteed if service is not completed?", a: "No, refund is not automatic. It depends on work done, scope, and reason for non-completion." },
                    { q: "Does refund policy apply to compliance services?", a: "Yes, especially for compliance services. These involve effort-based work and regulatory dependency." },
                    { q: "What is the main purpose of a refund policy?", a: "To ensure transparency and avoid misunderstandings. It defines rights and obligations of both parties." },
                    { q: "Can refund policy override verbal commitments?", a: "Yes, written policy prevails. As per standard practice, documented terms hold legal value." },
                    { q: "Does refund policy cover consultation services?", a: "Yes, but consultation fees are usually non-refundable once delivered." },
                    { q: "Is refund policy same as cancellation policy?", a: "No, they are different. Cancellation stops service, refund relates to payment return." },
                    { q: "Can refund policy change over time?", a: "Yes, it may be updated. However, the version accepted at payment time applies." },
                    { q: "Does refund policy apply to regulatory approvals?", a: "Yes, but approval outcome does not affect refund eligibility." },
                    { q: "Is refund policy mandatory for service providers?", a: "It is not always mandatory but strongly recommended for transparency." },
                    { q: "Can clients negotiate refund terms?", a: "In some cases, yes. However, standard policy usually applies. ### Section 2: Eligibility & Applicability" },
                    { q: "Who is eligible for a refund?", a: "Only clients meeting policy conditions. Key factors include scope, work status, and reason." },
                    { q: "Can I get a refund if work has not started?", a: "Yes, in many cases. Eligibility depends on internal review." },
                    { q: "Is refund allowed after professional allocation?", a: "Generally no. Allocation indicates work commencement." },
                    { q: "Can I claim refund for duplicate payment?", a: "Yes, duplicate payments are usually refundable after verification." },
                    { q: "Is refund available if service provider cannot perform?", a: "Yes, in genuine cases. It is subject to internal assessment." },
                    { q: "Can refund be claimed for incorrect service selection?", a: "It depends on stage. Adjustment may be offered instead of refund." },
                    { q: "Is refund applicable for incomplete client documents?", a: "No, client default usually voids refund eligibility." },
                    { q: "Can refund be claimed if I cancel midway?", a: "Generally not. It depends on work already completed." },
                    { q: "Is refund applicable for delayed services?", a: "Only if delay is due to provider fault. External delays are excluded." },
                    { q: "Can refund be claimed for misunderstanding of scope?", a: "Usually no. Clients are expected to review scope before payment. ### Section 3: Registration Process (Refund Handling Process)" },
                    { q: "How to apply for a refund?", a: "Submit a formal request with details. Include payment proof and reason." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "💰", label: "Legal" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Legal", href: "/legal" }, { label: "Refund Policy" }]}
            title="Refund Policy for Professional Services: Rules You Must Know"
            readTime="15 min read"
            focusKeyword="Refund Policy for Professional Services"
            sections={sections}
            ctaTitle="Need Expert Help with Refund Policy?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Refund Policy for Professional Services."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Refund Policy?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ransparent manner. Refund Policy – Clear, Fair and Transparent Terms for Professional Services Refund Policy Refund Policy is an important part of any professional service engagement because it explai</p>

            <h2 id="what-is">What is Refund Policy</h2>
            <p>This page provides comprehensive information about Refund Policy for Professional Services including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Legal. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Refund Policy for Professional Services include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Refund Policy for Professional Services.</p></div>
            )}
        </ServicePageLayout>
    );
}
