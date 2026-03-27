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
        { label: "Regulator", value: "Compliance" },
        { label: "Service Type", value: "Data Storage Policy" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is Data Storage Policy in India?", a: "It is a framework that defines how data is collected, stored, processed, and retained. As per regulatory guidelines, it ensures security, localisation , and compliance. a" },
                    { q: "Why is Data Storage Policy important?", a: "It is important to ensure legal compliance and data security. It helps prevent data breaches and regulatory penalties." },
                    { q: "Is Data Storage Policy mandatory in India?", a: "Yes, it is mandatory for regulated entities handling financial or personal data under RBI, IT Act, and DPDP provisions." },
                    { q: "Who regulates data storage in India?", a: "Multiple regulators including: • RBI • MeitY (IT Act) • SEBI • IRDAI" },
                    { q: "What type of data is covered?", a: "It includes: • Personal data • Financial data • Sensitive personal data" },
                    { q: "What is data localisation ?", a: "It means storing certain types of data within India as per regulatory guidelines." },
                    { q: "What is sensitive personal data?", a: "It includes financial information, passwords, biometrics, and confidential user data." },
                    { q: "Does every company need a data storage policy?", a: "Yes, if it handles user data, especially financial or personal data." },
                    { q: "What is data governance?", a: "It is the overall system of managing data lifecycle, security, and compliance." },
                    { q: "What is data retention?", a: "It refers to how long data must be stored before deletion." },
                    { q: "Is cloud storage allowed in India?", a: "Yes, if compliant with localisation and regulatory requirements." },
                    { q: "What is data classification?", a: "It is categorising data into types like personal, financial, and sensitive." },
                    { q: "What is audit trail in data storage?", a: "It is a record of who accessed or modified data." },
                    { q: "What is encryption in data storage?", a: "It is securing data using coding techniques to prevent unauthorised access." },
                    { q: "What is the purpose of data storage compliance?", a: "To ensure security, accountability, and regulatory adherence. ### Section 2: Eligibility & Applicability" },
                    { q: "Which businesses must follow Data Storage Policy?", a: "Entities handling user data such as: • Fintechs • NBFCs • Banks • Insurance companies" },
                    { q: "Do startups need to comply with data storage rules?", a: "Yes, if they collect or process personal or financial data." },
                    { q: "Is it applicable to foreign companies?", a: "Yes, if they operate in India or handle Indian data." },
                    { q: "Do payment aggregators require compliance?", a: "Yes, as per RBI guidelines, strict compliance is required." },
                    { q: "Is compliance required for small businesses?", a: "Yes, if they handle sensitive or personal data." },
                    { q: "Do e-commerce platforms need this policy?", a: "Yes, as they process customer data." },
                    { q: "Is data storage policy required for brokers?", a: "Yes, SEBI mandates investor data protection." },
                    { q: "Is it applicable to mobile apps?", a: "Yes, if they collect user data." },
                    { q: "Do IT companies need compliance?", a: "Yes, especially those handling client data." },
                    { q: "Is it required for KYC data handling?", a: "Yes, strict retention and storage rules apply." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🔒", label: "Compliance" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Data Storage Policy" }]}
            title="Data Storage Policy in India: Complete Legal Guide with Key Compliance Rules & Benefits (2026)"
            readTime="15 min read"
            focusKeyword="Regulatory Compliance"
            sections={sections}
            ctaTitle="Need Expert Help with Data Storage Policy?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Regulatory Compliance."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Data Storage Policy?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>or businesses handling financial, personal, or sensitive data. With increasing regulatory oversight from authorities such as RBI, SEBI, IRDAI, and MeitY , organisations are now expected to maintain st</p>

            <h2 id="what-is">What is Data Storage Policy</h2>
            <p>This page provides comprehensive information about Regulatory Compliance including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Compliance. Compliance with all applicable regulations is mandatory.</p>
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
