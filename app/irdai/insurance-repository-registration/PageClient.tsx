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
        { label: "Service Type", value: "Insurance Repository Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is Insurance Repository Registration in India?", a: "It is an IRDAI approval to operate as an entity that maintains insurance policies in electronic form through e-Insurance Accounts (eIA)." },
                    { q: "What is an Insurance Repository?", a: "An Insurance Repository is a regulated entity that stores and manages insurance policies digitally in a secure and centralised system." },
                    { q: "Who regulates Insurance Repositories in India?", a: "Insurance Regulatory and Development Authority of India (IRDAI) governs and regulates repositories." },
                    { q: "Is Insurance Repository Registration mandatory?", a: "Yes, operating a repository without IRDAI approval is not permitted." },
                    { q: "What is the purpose of Insurance Repositories?", a: "To digitise insurance policies and provide secure, centralised access to policyholders." },
                    { q: "What services do repositories provide?", a: "Key services include: • Policy storage • Policy updates • Account management" },
                    { q: "Do repositories sell insurance policies?", a: "No, they only store and manage policies; they do not sell or advise." },
                    { q: "Is Insurance Repository similar to NSDL/CDSL?", a: "Conceptually yes, but repositories deal with insurance policies instead of securities." },
                    { q: "Can repositories handle insurance claims?", a: "No, claim settlement remains the responsibility of insurers." },
                    { q: "What type of entity can become a repository?", a: "Only companies incorporated in India can apply." },
                    { q: "Is this license suitable for startups?", a: "Yes, if they meet IRDAI eligibility and technical requirements." },
                    { q: "What is policy dematerialisation?", a: "It is the process of converting physical insurance policies into digital form." },
                    { q: "Is repository data legally valid?", a: "Yes, electronic records maintained are legally recognised." },
                    { q: "What is the core function of repository?", a: "Secure storage and servicing of insurance policy data. ### Section 2: Eligibility & Applicability (19–36)" },
                    { q: "Who can apply for Insurance Repository Registration?", a: "Companies meeting IRDAI eligibility criteria including capital, governance, and infrastructure." },
                    { q: "What is the minimum net worth required?", a: "As per IRDAI guidelines, applicants must maintain prescribed net worth at all times." },
                    { q: "Can LLP apply for repository license?", a: "No, only companies incorporated under Companies Act are eligible." },
                    { q: "Is foreign ownership allowed?", a: "Yes, subject to FDI norms and IRDAI approval." },
                    { q: "What is fit and proper criteria?", a: "Promoters and directors must have: • Clean record • Financial integrity • No regulatory violations" },
                    { q: "Can existing fintech companies apply?", a: "Yes, if they align their structure and meet regulatory conditions." },
                    { q: "Is prior insurance experience required?", a: "Not mandatory but beneficial for approval." },
                    { q: "Can insurers apply for repository license?", a: "Only if permitted under IRDAI regulations." },
                    { q: "Is there a restriction on business activities?", a: "Yes, repository must focus only on permitted activities." },
                    { q: "Can a company hold multiple licenses?", a: "Yes, subject to regulatory approval and compliance separation." },
                    { q: "Is IT infrastructure mandatory?", a: "Yes, strong and secure IT systems are essential." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Insurance Repository Registration" }]}
            title="Insurance Repository Registration in India – Complete 2026 Guide with Critical Compliance Insights"
            readTime="15 min read"
            focusKeyword="Insurance Repository Registration in India"
            sections={sections}
            ctaTitle="Need Expert Help with Insurance Repository Registration?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Insurance Repository Registration in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Insurance Repository Registration?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Registration in India is a highly specialised regulatory approval governed by IRDAI, enabling entities to maintain insurance policies in electronic (dematerialised) form. With increasing digitisation </p>

            <h2 id="what-is">What is Insurance Repository Registration</h2>
            <p>This page provides comprehensive information about Insurance Repository Registration in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of IRDAI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Insurance Repository Registration in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Insurance Repository Registration in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
