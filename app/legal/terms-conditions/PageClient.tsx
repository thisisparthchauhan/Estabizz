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
        { label: "Service Type", value: "Terms Conditions" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What are Terms and Conditions for a website?", a: "Terms and Conditions are a legally binding agreement defining how users can access and use a website. They outline rights, responsibilities, and limitations of liability." },
                    { q: "Why are Terms and Conditions important?", a: "They protect the business from disputes and misuse. They also define legal boundaries for users." },
                    { q: "What is the difference between Terms and Conditions and Privacy Policy?", a: "Terms govern usage, while Privacy Policy governs data handling. Both serve different compliance purposes." },
                    { q: "Can a small business operate without Terms and Conditions?", a: "Yes, but it is risky. Lack of terms increases exposure to disputes and legal liability." },
                    { q: "Who drafts Terms and Conditions?", a: "Typically, legal professionals or compliance experts draft them to ensure regulatory alignment." },
                    { q: "Do free websites need Terms and Conditions?", a: "Yes, even free platforms need them to limit liability and control user behaviour ." },
                    { q: "What is a click-wrap agreement?", a: "It is a system where users must click “I Agree” before using services, making it legally enforceable." },
                    { q: "Can Terms and Conditions be verbal?", a: "No, they must be documented and accepted digitally or in writing." },
                    { q: "What is browse-wrap agreement?", a: "It assumes user acceptance by browsing the site, but it is weak legally." },
                    { q: "Can I use a template for Terms and Conditions?", a: "Templates can be used as a base but must be customised for your business." },
                    { q: "Do Terms and Conditions apply to mobile apps?", a: "Yes, they are required for both websites and mobile applications." },
                    { q: "What is the main purpose of Terms and Conditions?", a: "To define user rights, restrict misuse, and limit legal liability. ### Section 2: Eligibility & Applicability (16–30)" },
                    { q: "Who must have Terms and Conditions?", a: "Any business operating a website or app, including fintech, NBFCs, and service providers." },
                    { q: "Do startups need Terms and Conditions?", a: "Yes, especially for investor confidence and legal protection." },
                    { q: "Do consultants need Terms and Conditions?", a: "Yes, to clarify advisory scope and avoid liability claims." },
                    { q: "Do insurance brokers need special Terms?", a: "Yes, including claim disclaimers and insurer dependency clauses." },
                    { q: "Can individuals have Terms and Conditions?", a: "Yes, freelancers and professionals can use them." },
                    { q: "Do SaaS companies need Terms?", a: "Yes, to define service usage and subscription policies." },
                    { q: "Can NGOs require Terms and Conditions?", a: "Yes, especially for online donations and engagement." },
                    { q: "Do marketplaces need different Terms?", a: "Yes, including third-party liability clauses." },
                    { q: "Is Terms required for blogs?", a: "Recommended, especially for disclaimers and content usage." },
                    { q: "Do mobile apps require separate Terms?", a: "Yes, tailored for app usage and platform policies." },
                    { q: "Is there any registration required for Terms and Conditions?", a: "No formal registration is required. It must be drafted and published." },
                    { q: "How do I create Terms and Conditions?", a: "Define services, risks, and obligations, then draft legally compliant clauses." },
                    { q: "Who should approve Terms and Conditions?", a: "Business owners and legal advisors should approve them." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📜", label: "Legal" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Legal", href: "/legal" }, { label: "Terms Conditions" }]}
            title="( Optimised ) Terms and Conditions for Website: 10 Powerful Legal Clauses Every Business Must Know 🔗 Permalink ("
            readTime="15 min read"
            focusKeyword="Terms and Conditions for Website"
            sections={sections}
            ctaTitle="Need Expert Help with Terms Conditions?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Terms and Conditions for Website."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Terms Conditions?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Terms and Conditions for Website – Complete Legal Guide to User Rights & Obligations 📘 INTRODUCTION Terms and Conditions for Website form the legal foundation governing the relationship between a serv</p>

            <h2 id="what-is">What is Terms Conditions</h2>
            <p>This page provides comprehensive information about Terms and Conditions for Website including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Legal. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Terms and Conditions for Website include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Terms and Conditions for Website.</p></div>
            )}
        </ServicePageLayout>
    );
}
