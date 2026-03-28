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
        { label: "Service Type", value: "Sustainable Supply Chain" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is sustainable supply chain management?", a: "It means managing supply chains with environmental, social, and governance (ESG) considerations. • Focus on responsible sourcing • Reduces environmental impact" },
                    { q: "Why is sustainable supply chain important in India?", a: "It ensures compliance, efficiency, and global competitiveness. • Meets ESG expectations • Improves brand value" },
                    { q: "What are ESG factors in supply chain?", a: "ESG includes: • Environmental impact • Social responsibility • Governance practices" },
                    { q: "What is green supply chain management?", a: "Supply chain practices focused on environmental sustainability." },
                    { q: "What is ethical sourcing?", a: "Procuring goods responsibly without exploitation." },
                    { q: "What is sustainable procurement?", a: "Purchasing goods with ESG considerations." },
                    { q: "What is carbon footprint in supply chain?", a: "Total emissions generated across supply chain activities." },
                    { q: "What is circular supply chain?", a: "System focusing on reuse and recycling of materials." },
                    { q: "What is supply chain transparency?", a: "Visibility across sourcing, production, and distribution." },
                    { q: "What is sustainable logistics?", a: "Eco-friendly transportation and distribution practices." },
                    { q: "What is scope 3 emissions?", a: "Indirect emissions from supply chain activities." },
                    { q: "What is responsible sourcing policy?", a: "Guidelines ensuring ethical procurement." },
                    { q: "What is supply chain sustainability audit?", a: "Evaluation of ESG practices in supply chain." },
                    { q: "What is ESG compliance in supply chain?", a: "Meeting environmental and social standards." },
                    { q: "What is supplier code of conduct?", a: "Rules suppliers must follow for compliance. Section 2: Eligibility & Applicability" },
                    { q: "Who needs sustainable supply chain management?", a: "Companies across industries, especially large enterprises." },
                    { q: "Is sustainable supply chain mandatory in India?", a: "Partially mandatory through ESG and BRSR disclosures." },
                    { q: "Which industries require sustainable supply chains?", a: "Key sectors include: • Manufacturing • Retail • FMCG" },
                    { q: "Can startups implement sustainable supply chains?", a: "Yes, with scalable ESG practices." },
                    { q: "Can exporters benefit from sustainable supply chains?", a: "Yes, improves global market access." },
                    { q: "Is ESG compliance required for suppliers?", a: "Increasingly mandated by large companies." },
                    { q: "Can vendors be audited for sustainability?", a: "Yes, under ESG frameworks." },
                    { q: "Is there registration for sustainable supply chain?", a: "No specific registration; depends on compliance frameworks." },
                    { q: "How to implement sustainable supply chain in India?", a: "Key steps include: • Assess supply chain • Identify ESG risks • Implement policies" },
                    { q: "What certifications support sustainable supply chain?", a: "Common certifications include: • ISO 14001 • SA8000" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🌱", label: "ESG" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Sustainable Supply Chain" }]}
            title="Sustainable Supply Chain Management: Key Benefits & Essential Compliance Guide in India"
            readTime="15 min read"
            focusKeyword="Sustainable Supply Chain Management"
            sections={sections}
            ctaTitle="Need Expert Help with Sustainable Supply Chain?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Sustainable Supply Chain Management."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Sustainable Supply Chain?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>d regulatory framework. Complete professional guide for businesses. Sustainable Supply Chain Management in India – understand compliance requirements, ESG frameworks, process, benefits, and regulatory</p>

            <h2 id="what-is">What is Sustainable Supply Chain</h2>
            <p>This page provides comprehensive information about Sustainable Supply Chain Management including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of ESG. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Sustainable Supply Chain Management include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Sustainable Supply Chain Management.</p></div>
            )}
        </ServicePageLayout>
    );
}
