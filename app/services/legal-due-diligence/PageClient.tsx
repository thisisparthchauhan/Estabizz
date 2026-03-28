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
        { label: "Service Type", value: "Legal Due Diligence" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What are Legal Due Diligence Services in India?", a: "Legal Due Diligence Services in India involve reviewing a company’s legal, regulatory, and contractual records to identify risks before a transaction." },
                    { q: "Why is legal due diligence important?", a: "It helps identify hidden liabilities, compliance gaps, and legal risks before investment or acquisition decisions." },
                    { q: "Is legal due diligence mandatory in India?", a: "No, it is not legally mandatory, but it is strongly recommended as per governance best practices." },
                    { q: "Who performs legal due diligence?", a: "Company Secretaries, lawyers, and compliance professionals typically conduct legal due diligence." },
                    { q: "What is the objective of legal due diligence?", a: "The objective is to assess legal risks, ensure compliance, and support informed decision-making." },
                    { q: "What does legal due diligence cover?", a: "It covers: • Corporate records • Compliance filings • Contracts • Litigation • IP rights" },
                    { q: "What is a due diligence report?", a: "It is a structured report highlighting risks, compliance gaps, and recommendations." },
                    { q: "Is due diligence required for startups?", a: "Yes, especially during funding rounds and investor onboarding." },
                    { q: "What is a data room in due diligence?", a: "A secure digital space where company documents are shared for review." },
                    { q: "What is the difference between audit and due diligence?", a: "Audit is periodic; due diligence is transaction-specific ." },
                    { q: "Can due diligence prevent business risk?", a: "It reduces risk significantly but cannot eliminate all uncertainties." },
                    { q: "What is vendor due diligence?", a: "It is conducted by the seller to present compliance status to buyers." },
                    { q: "What is investor due diligence?", a: "It is conducted by investors before funding or acquisition." },
                    { q: "What are red flags in due diligence?", a: "Common red flags include: • Non-compliance • Litigation • Hidden liabilities" },
                    { q: "What industries require due diligence?", a: "All industries, especially regulated sectors like finance, insurance, and fintech." },
                    { q: "What is legal risk in due diligence?", a: "Legal risk refers to exposure arising from non-compliance or contractual issues." },
                    { q: "What is materiality in due diligence?", a: "It refers to the significance of a risk impacting a transaction." },
                    { q: "What is legal due diligence checklist?", a: "A structured list of documents and compliance areas reviewed during the process. Section 2: Eligibility & Applicability (19–36)" },
                    { q: "Who needs Legal Due Diligence Services in India?", a: "Investors, startups, companies undergoing M&A, and financial institutions require it." },
                    { q: "Is due diligence required for NBFC transactions?", a: "Yes, as per RBI expectations, due diligence is critical." },
                    { q: "Do foreign investors require due diligence?", a: "Yes, especially for FEMA and FDI compliance." },
                    { q: "Is due diligence required for LLPs?", a: "Yes, particularly during investment or restructuring." },
                    { q: "Can small businesses opt for due diligence?", a: "Yes, it helps identify compliance gaps and risks early." },
                    { q: "Is due diligence required before share transfer?", a: "Recommended for large or strategic transactions." },
                    { q: "Can individuals conduct due diligence?", a: "No, it should be conducted by qualified professionals." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "⚖️", label: "Legal" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Legal Due Diligence" }]}
            title="Legal Due Diligence Services in India: Critical Checks for Smart & Secure Business Deals"
            readTime="15 min read"
            focusKeyword="Legal Due Diligence Services in India"
            sections={sections}
            ctaTitle="Need Expert Help with Legal Due Diligence?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Legal Due Diligence Services in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Legal Due Diligence?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>vices in India play a critical role in evaluating the legal health, compliance status, and risk exposure of a business before any investment, acquisition, or strategic transaction. From a regulatory a</p>

            <h2 id="what-is">What is Legal Due Diligence</h2>
            <p>This page provides comprehensive information about Legal Due Diligence Services in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Legal. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Legal Due Diligence Services in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Legal Due Diligence Services in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
