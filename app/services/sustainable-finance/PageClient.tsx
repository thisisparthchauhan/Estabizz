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
        { label: "Service Type", value: "Sustainable Finance" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is sustainable finance?", a: "Sustainable finance refers to financial activities that consider environmental, social, and governance (ESG) factors. • Focus on long-term sustainability • Aligns with climate and social goals" },
                    { q: "Why is sustainable finance important in India?", a: "It supports climate goals and responsible economic growth. • Encourages green investments • Reduces environmental impact" },
                    { q: "What are ESG factors in sustainable finance?", a: "ESG stands for Environmental, Social, and Governance criteria. • Environment – climate impact • Social – labour and society • Governance – management practices" },
                    { q: "What is green finance?", a: "Finance specifically for environmentally beneficial projects." },
                    { q: "What is climate finance?", a: "Funding for climate mitigation and adaptation projects." },
                    { q: "What are sustainable investments?", a: "Investments considering ESG risks and impact." },
                    { q: "Who regulates sustainable finance in India?", a: "Multiple regulators including: • SEBI • RBI • Ministry of Finance" },
                    { q: "What is ESG reporting?", a: "Disclosure of environmental and social impact by companies." },
                    { q: "What is BRSR in India?", a: "Business Responsibility and Sustainability Reporting mandated by SEBI." },
                    { q: "What are green bonds?", a: "Bonds used to fund eco-friendly projects." },
                    { q: "What is social finance?", a: "Funding for social impact projects." },
                    { q: "What is impact investing?", a: "Investments generating measurable social impact." },
                    { q: "What is sustainable banking?", a: "Banking aligned with ESG principles." },
                    { q: "What is net-zero financing?", a: "Financing aligned with carbon neutrality goals." },
                    { q: "What is responsible investing?", a: "Investing with ethical and sustainability considerations. Section 2: Eligibility & Applicability" },
                    { q: "Who can participate in sustainable finance?", a: "Companies, investors, banks, and financial institutions." },
                    { q: "Can NBFCs engage in sustainable finance?", a: "Yes, under applicable regulatory frameworks." },
                    { q: "Is sustainable finance mandatory in India?", a: "Partially mandatory through ESG disclosures for listed entities." },
                    { q: "Which sectors benefit from sustainable finance?", a: "Key sectors include: • Renewable energy • Infrastructure • Agriculture" },
                    { q: "Can SMEs access sustainable finance?", a: "Yes, through green funding schemes." },
                    { q: "Is ESG applicable to unlisted companies?", a: "Not mandatory but increasingly expected." },
                    { q: "Can banks issue green loans?", a: "Yes, under sustainable lending frameworks." },
                    { q: "Is sustainable finance applicable to insurance companies?", a: "Yes, through ESG-based investments. Section 3: Registration Process" },
                    { q: "Is there registration for sustainable finance activities?", a: "No single registration; depends on activity type." },
                    { q: "How to issue green bonds in India?", a: "Through SEBI guidelines and disclosures." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🌱", label: "ESG" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Sustainable Finance" }]}
            title="Sustainable Finance in India: 2026 Ultimate Guide to ESG Compliance & Growth Opportunities 🔗 Permalink"
            readTime="15 min read"
            focusKeyword="Sustainable Finance in India"
            sections={sections}
            ctaTitle="Need Expert Help with Sustainable Finance?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Sustainable Finance in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Sustainable Finance?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ry insights for businesses and investors. Sustainable Finance – Complete & Essential Guide for 2026 (Expert Compliance Insight) Introduction Sustainable Finance is emerging as a critical pillar in Ind</p>

            <h2 id="what-is">What is Sustainable Finance</h2>
            <p>This page provides comprehensive information about Sustainable Finance in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of ESG. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Sustainable Finance in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Sustainable Finance in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
