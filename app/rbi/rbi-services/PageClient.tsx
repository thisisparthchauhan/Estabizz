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
        { label: "Regulator", value: "RBI" },
        { label: "Service Type", value: "Rbi Services" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What are RBI services in India?", a: "RBI services refer to regulatory approvals and licensing required to undertake financial activities such as lending, payments, forex dealings, and financial intermediation under RBI supervision." },
                    { q: "What is RBI licensing in India?", a: "RBI licensing is the formal approval granted by the Reserve Bank of India to eligible entities to carry out regulated financial activities." },
                    { q: "Why is RBI registration required?", a: "RBI registration is required to ensure financial stability, consumer protection, and regulatory oversight in financial services." },
                    { q: "Is RBI approval mandatory for financial businesses?", a: "Yes, it is mandatory for businesses engaged in regulated financial activities such as lending, payments, and forex." },
                    { q: "What happens if a company operates without RBI approval?", a: "It may lead to: • Regulatory penalties • Business shutdown • Legal action under applicable provisions" },
                    { q: "What types of entities require RBI services?", a: "Entities include: • NBFCs • Fintech companies • Payment aggregators • Forex dealers" },
                    { q: "What is an NBFC license under RBI?", a: "It is approval to operate as a non-banking financial company engaged in lending, asset finance, or investment." },
                    { q: "What is the difference between RBI registration and RBI approval?", a: "Registration refers to licensing, while approval may include ongoing permissions and regulatory clearances." },
                    { q: "Can a startup apply for RBI services?", a: "Yes, startups can apply subject to eligibility and capital requirements." },
                    { q: "What activities are regulated by RBI?", a: "Activities include: • Lending • Payment processing • Foreign exchange • Financial intermediation" },
                    { q: "Is RBI registration required for fintech companies?", a: "Yes, if they deal with regulated financial services." },
                    { q: "Can individuals apply for RBI license?", a: "No, only companies or registered entities can apply." },
                    { q: "What is RBI master direction?", a: "It is a regulatory framework issued by RBI governing specific financial activities." },
                    { q: "What is the role of RBI in India?", a: "RBI regulates financial institutions, ensures monetary stability, and supervises financial systems." },
                    { q: "Can RBI license be transferred?", a: "No, licenses are entity-specific and non-transferable. Section 2: Eligibility & Applicability" },
                    { q: "What is the minimum capital requirement for RBI license?", a: "Typically starts from ₹2 crore for NBFCs and varies for other categories." },
                    { q: "Who can apply for RBI registration?", a: "Companies registered under Companies Act meeting net worth and compliance criteria." },
                    { q: "Is Indian company mandatory for RBI license?", a: "Yes, applicants must be incorporated in India." },
                    { q: "What is “fit and proper” criteria?", a: "Promoters and directors must: • Have clean financial records • No criminal background • Relevant experience" },
                    { q: "Can LLP apply for RBI license?", a: "No, RBI generally requires a company structure." },
                    { q: "Can foreign investors apply for RBI license?", a: "Yes, through an Indian entity or subsidiary." },
                    { q: "Is experience required for RBI license?", a: "Yes, financial sector experience strengthens the application." },
                    { q: "Does RBI check promoter background?", a: "Yes, detailed due diligence is conducted." },
                    { q: "Can a newly incorporated company apply?", a: "Yes, subject to capital infusion and eligibility." },
                    { q: "Is CIBIL score checked for promoters?", a: "Yes, financial discipline is evaluated." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Rbi Services" }]}
            title="RBI Services in India: Complete Guide with 7 Powerful Compliance Solutions for Businesses"
            readTime="15 min read"
            focusKeyword="Regulatory Compliance"
            sections={sections}
            ctaTitle="Need Expert Help with Rbi Services?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Regulatory Compliance."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Rbi Services?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>for businesses operating in lending, payments, foreign exchange, and fintech sectors. Any entity dealing with financial transactions, cross-border dealings, or regulated financial activities must alig</p>

            <h2 id="what-is">What is Rbi Services</h2>
            <p>This page provides comprehensive information about Regulatory Compliance including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of RBI. Compliance with all applicable regulations is mandatory.</p>
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
