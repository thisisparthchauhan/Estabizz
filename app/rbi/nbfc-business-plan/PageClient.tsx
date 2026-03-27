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
        { label: "Service Type", value: "Nbfc Business Plan" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is an NBFC Business Plan?", a: "An NBFC Business Plan is a detailed document explaining how a company will operate as a Non-Banking Financial Company. It covers business model , financials, risk, and compliance readiness." },
                    { q: "Why is an NBFC Business Plan required?", a: "It is required for RBI evaluation. It helps the regulator assess viability, governance, and financial discipline before granting registration." },
                    { q: "Is an NBFC Business Plan mandatory in India?", a: "Yes, it is a critical part of the RBI registration process under applicable regulatory guidelines." },
                    { q: "Who prepares the NBFC Business Plan?", a: "It is usually prepared by compliance professionals, consultants, or internal finance teams with regulatory expertise." },
                    { q: "What is the main objective of an NBFC Business Plan?", a: "The objective is to demonstrate business viability, regulatory compliance, and risk management capability." },
                    { q: "Is NBFC Business Plan a legal document?", a: "It is not a statutory form but is treated as a regulatory submission under RBI scrutiny." },
                    { q: "What does RBI check in the business plan?", a: "RBI evaluates: • Business model • Financial projections • Risk framework • Promoter credibility" },
                    { q: "Can I apply for NBFC without a business plan?", a: "No, practically RBI will not process your application without a structured business plan." },
                    { q: "What is included in an NBFC Business Plan?", a: "It includes: • Business model • Financial projections • Governance • Risk management" },
                    { q: "How detailed should the NBFC Business Plan be?", a: "It should be highly detailed, practical, and customised —not generic." },
                    { q: "Is NBFC Business Plan same as financial model?", a: "No. Business plan explains strategy, while financial model supports it with numbers." },
                    { q: "Can startups create NBFC Business Plan?", a: "Yes, provided they meet RBI capital and compliance requirements." },
                    { q: "Is NBFC Business Plan used for funding also?", a: "Yes, it helps in investor discussions and funding proposals." },
                    { q: "Does RBI reject weak business plans?", a: "Yes, weak or unrealistic plans are a common reason for rejection." },
                    { q: "Can NBFC Business Plan be generic?", a: "No, it must be tailored to your specific business model." },
                    { q: "What is the ideal length of a business plan?", a: "Typically 50–100 pages depending on complexity." },
                    { q: "Is digital NBFC plan different?", a: "Yes, it must include technology and data security framework." },
                    { q: "What is the most critical section?", a: "Risk management and financial projections are most critical. Section 2: Eligibility & Applicability" },
                    { q: "Who needs an NBFC Business Plan?", a: "Any company applying for RBI NBFC registration or expanding financial operations." },
                    { q: "Is NBFC Business Plan required for all NBFC types?", a: "Yes, it applies to all NBFC categories under RBI." },
                    { q: "What is minimum capital requirement?", a: "Minimum Rs. 10 crore Net Owned Fund as per RBI norms." },
                    { q: "Can individuals apply for NBFC?", a: "No, only companies registered under Companies Act can apply." },
                    { q: "Do directors need finance background?", a: "Not mandatory, but preferred under Fit & Proper criteria." },
                    { q: "Can foreign promoters apply?", a: "Yes, subject to FEMA and RBI guidelines." },
                    { q: "Is prior lending experience required?", a: "Not mandatory, but strengthens application." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Nbfc Business Plan" }]}
            title="NBFC Business Plan: Steps for Successful RBI Approval in India"
            readTime="15 min read"
            focusKeyword="NBFC Business Plan"
            sections={sections}
            ctaTitle="Need Expert Help with Nbfc Business Plan?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for NBFC Business Plan."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Nbfc Business Plan?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>and demonstrating the operational, financial, and governance readiness of a Non-Banking Financial Company. In today’s regulatory environment, RBI does not merely evaluate capital—it evaluates intent, </p>

            <h2 id="what-is">What is Nbfc Business Plan</h2>
            <p>This page provides comprehensive information about NBFC Business Plan including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of RBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require NBFC Business Plan include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about NBFC Business Plan.</p></div>
            )}
        </ServicePageLayout>
    );
}
