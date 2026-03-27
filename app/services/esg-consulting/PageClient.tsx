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
        { label: "Regulator", value: "ESG" },
        { label: "Service Type", value: "Esg Consulting" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What are Sustainability and ESG Solutions?", a: "Sustainability and ESG Solutions refer to frameworks that measure a company’s environmental, social, and governance performance. They help businesses align with responsible practices, regulatory expectations, and investor requirements." },
                    { q: "What does ESG stand for?", a: "ESG stands for: • Environmental • Social • Governance These three pillars evaluate a company’s long-term sustainability and ethical impact." },
                    { q: "Why is ESG important for businesses in India?", a: "ESG is important as it improves credibility, attracts investors, and ensures regulatory compliance. As per regulatory guidelines, ESG disclosures are increasingly becoming mandatory." },
                    { q: "What is sustainability reporting?", a: "Sustainability reporting is the disclosure of a company’s ESG performance. It includes environmental impact, social responsibility, and governance practices." },
                    { q: "What is BRSR in India?", a: "BRSR (Business Responsibility and Sustainability Reporting) is a SEBI-mandated reporting framework for listed companies to disclose ESG-related information." },
                    { q: "Who regulates ESG reporting in India?", a: "ESG reporting is primarily regulated by: • SEBI (for listed entities) • MCA (for governance aspects) • RBI (for financial institutions)" },
                    { q: "Is ESG mandatory in India?", a: "Yes, ESG reporting is mandatory for the top listed companies under SEBI’s BRSR framework. For others, it is voluntary but strongly recommended." },
                    { q: "What are ESG ratings?", a: "ESG ratings assess a company’s sustainability performance. These ratings are used by investors to evaluate risk and ethical standards." },
                    { q: "What is the difference between ESG and CSR?", a: "ESG focuses on overall sustainability and governance, while CSR is a specific statutory requirement for social spending under the Companies Act." },
                    { q: "What are the three pillars of ESG?", a: "The three pillars include: • Environmental (climate, energy, pollution) • Social (employees, customers, society) • Governance (board, ethics, compliance)" },
                    { q: "What is ESG compliance?", a: "ESG compliance means adhering to applicable sustainability disclosures and governance standards as per regulatory guidelines." },
                    { q: "What is ESG framework?", a: "ESG framework is a structured system used to track, measure, and report sustainability performance." },
                    { q: "What industries require ESG implementation?", a: "ESG applies across all sectors including manufacturing, finance, IT, and startups." },
                    { q: "What is ESG due diligence?", a: "ESG due diligence is the assessment of sustainability risks before investment or acquisition." },
                    { q: "What is net zero commitment?", a: "Net zero commitment means reducing carbon emissions to near zero, with balance through offsets. Section 2: Eligibility & Applicability" },
                    { q: "Who needs ESG reporting in India?", a: "As per SEBI guidelines, the top 1000 listed companies must comply with BRSR reporting." },
                    { q: "Do private companies need ESG compliance?", a: "Not mandatory, but advisable for funding, valuation, and international business." },
                    { q: "Is ESG applicable to NBFCs and banks?", a: "Yes, RBI encourages ESG frameworks for financial institutions." },
                    { q: "Can SMEs adopt ESG voluntarily?", a: "Yes, SMEs can adopt ESG to improve credibility and access global markets." },
                    { q: "Is ESG required for IPO companies?", a: "Yes, ESG disclosures are increasingly required during IPO due diligence." },
                    { q: "Is ESG mandatory for foreign companies operating in India?", a: "It depends on listing and regulatory exposure, but global ESG norms often apply." },
                    { q: "Which companies fall under BRSR Core?", a: "Top 150 listed entities are currently covered under BRSR Core requirements." },
                    { q: "Do LLPs require ESG reporting?", a: "No, LLPs are not mandatorily required but can adopt ESG practices voluntarily." },
                    { q: "Is ESG required for export businesses?", a: "Yes, many international buyers require ESG compliance as a condition. Section 3: Registration Process" },
                    { q: "Is there any ESG registration in India?", a: "No formal registration is required; ESG is implemented through reporting frameworks." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🌱", label: "ESG" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Esg Consulting" }]}
            title="ESG Consulting Services in India: 7 Powerful Compliance Benefits Every Business Must Know"
            readTime="15 min read"
            focusKeyword="Regulatory Compliance"
            sections={sections}
            ctaTitle="Need Expert Help with Esg Consulting?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Regulatory Compliance."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Esg Consulting?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ng Services in India are rapidly becoming a critical requirement for businesses aiming to align with global sustainability standards, regulatory expectations, and investor confidence. In today’s evolv</p>

            <h2 id="what-is">What is Esg Consulting</h2>
            <p>This page provides comprehensive information about Regulatory Compliance including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of ESG. Compliance with all applicable regulations is mandatory.</p>
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
