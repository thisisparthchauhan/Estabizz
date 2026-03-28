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
        { label: "Service Type", value: "Privacy Policy" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is a Privacy Policy?", a: "A Privacy Policy is a legal document explaining how a business collects, uses, stores, and protects personal data of users." },
                    { q: "Is a Privacy Policy mandatory in India?", a: "Yes, it is mandatory for businesses handling personal data under applicable IT laws and data protection principles." },
                    { q: "Who needs a Privacy Policy?", a: "Any business collecting user data must have one, including: • Websites • Mobile apps • Fintech platforms" },
                    { q: "What type of data is covered under a Privacy Policy?", a: "It includes personal and sensitive data such as: • Name, email, phone • Financial information • IP address" },
                    { q: "What is personal data in a Privacy Policy?", a: "Personal data refers to any information that can identify an individual directly or indirectly." },
                    { q: "What is sensitive personal data?", a: "It includes: • Financial details • Passwords • Health data" },
                    { q: "Why is a Privacy Policy important?", a: "It builds trust and ensures compliance with legal requirements." },
                    { q: "Can I run a website without a Privacy Policy?", a: "No, operating without it may lead to legal risks and penalties." },
                    { q: "Does a small business need a Privacy Policy?", a: "Yes, if it collects any user data, even basic contact details." },
                    { q: "Is Privacy Policy same as Terms & Conditions?", a: "No, Privacy Policy deals with data handling, while Terms govern usage rules." },
                    { q: "Where should Privacy Policy be displayed?", a: "It should be clearly visible on: • Website footer • App interface" },
                    { q: "Is user consent required in Privacy Policy?", a: "Yes, consent is essential before collecting personal data." },
                    { q: "Can Privacy Policy be copied from another website?", a: "No, it must be customized as per your business practices." },
                    { q: "What is data collection disclosure?", a: "It explains what data is collected and why." },
                    { q: "What is data usage clause?", a: "It specifies how collected data will be used. Section 2: Eligibility & Applicability" },
                    { q: "Which businesses must comply with Privacy Policy requirements?", a: "All businesses collecting user data digitally must comply." },
                    { q: "Does an e-commerce website need a Privacy Policy?", a: "Yes, it is mandatory due to user data handling." },
                    { q: "Do fintech companies require a Privacy Policy?", a: "Yes, especially due to financial data handling." },
                    { q: "Is Privacy Policy required for mobile apps?", a: "Yes, it is compulsory for app-based services." },
                    { q: "Do startups need a Privacy Policy?", a: "Yes, even early-stage startups must comply." },
                    { q: "Is Privacy Policy required for blogs?", a: "Yes, if user data like emails or cookies are collected." },
                    { q: "Do offline businesses need Privacy Policy?", a: "Only if they collect data digitally." },
                    { q: "Is Privacy Policy required for SaaS platforms?", a: "Yes, due to continuous user data processing." },
                    { q: "Is Privacy Policy applicable to foreign companies operating in India?", a: "Yes, if they process Indian user data." },
                    { q: "Do freelancers need Privacy Policy?", a: "Yes, if they collect client information online. Section 3: Registration Process" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🔒", label: "Legal" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Legal", href: "/legal" }, { label: "Privacy Policy" }]}
            title="Privacy Policy for Businesses: Legal Rules You Must Follow in India"
            readTime="15 min read"
            focusKeyword="Privacy Policy for Businesses"
            sections={sections}
            ctaTitle="Need Expert Help with Privacy Policy?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Privacy Policy for Businesses."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Privacy Policy?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>icy. Privacy Policy for Businesses – Complete Legal & Compliance Guide You Must Know 📌 INTRODUCTION Privacy Policy for Businesses is a critical legal document that defines how an organisation collects</p>

            <h2 id="what-is">What is Privacy Policy</h2>
            <p>This page provides comprehensive information about Privacy Policy for Businesses including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Legal. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Privacy Policy for Businesses include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Privacy Policy for Businesses.</p></div>
            )}
        </ServicePageLayout>
    );
}
