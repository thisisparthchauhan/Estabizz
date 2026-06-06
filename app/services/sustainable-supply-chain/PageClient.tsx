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
                    { q: "What is supplier code of conduct?", a: "Rules suppliers must follow for compliance." },
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
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Sustainable Supply Chain Management."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Sustainable Supply Chain?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Sustainable Supply Chain Management helps businesses assess vendor, procurement and operational practices against environmental, social and governance expectations. It supports supplier due diligence, responsible sourcing, ESG questionnaires, customer audits and compliance readiness for large enterprise or listed-company supply chains.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Sustainable Supply Chain Management?</h2>
            <p>Sustainable Supply Chain Management is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>MCA, SEBI, customer ESG frameworks and sector-specific requirements as applicable</td></tr>
                        <tr><td>Applicable framework</td><td>BRSR, ESG due diligence, supplier code of conduct, responsible sourcing and sustainability reporting expectations.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Manufacturers, exporters, suppliers to listed companies, procurement-heavy businesses, ESG-reporting entities and vendors facing customer sustainability audits should build a structured supply-chain ESG framework.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Supplier mapping</td><td>Identify critical vendors, geographies and risk categories</td><td>Risk-based approach works best</td></tr>
                        <tr><td>Policy framework</td><td>Supplier code, ESG checklist and escalation process</td><td>Documentation must be practical</td></tr>
                        <tr><td>Data collection</td><td>Environmental, labour, safety and governance data</td><td>Evidence quality matters</td></tr>
                        <tr><td>Monitoring</td><td>Periodic vendor review and corrective actions</td><td>One-time declarations are not enough</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Supplier list and procurement data</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Supplier code of conduct</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Vendor ESG questionnaire</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Factory / workplace compliance records</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Environmental and safety records</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Audit reports and corrective action trackers</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Customer ESG requirements</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Board / management ESG policy</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="process">Registration / Advisory Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Applicability and Scope Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Confirm whether the activity, transaction or business model falls under the relevant framework.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Document Gap Assessment</h4><p className="text-[13px] text-[#64748b] !mb-0">Review records, approvals, policies and supporting evidence before drafting.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Application / Note Preparation</h4><p className="text-[13px] text-[#64748b] !mb-0">Prepare forms, checklists, policies, explanations and supporting documents as applicable.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Filing, Review and Query Support</h4><p className="text-[13px] text-[#64748b] !mb-0">Submit through the prescribed process and respond to regulator, bank, auditor or authority queries.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 5</div><h4>Compliance Setup</h4><p className="text-[13px] text-[#64748b] !mb-0">Maintain records, calendars, policies and evidence for future review or inspection.</p></div></div>
            </div>

            <h2 id="fees">Fees and Cost Overview</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Amount / Position</th><th>Verification Note</th></tr></thead>
                    <tbody>
                        <tr><td>Regulatory fee</td><td>Generally not applicable as a licence fee</td><td>Specific audits may have separate cost</td></tr>
                        <tr><td>Audit / assessment cost</td><td>Depends on number of suppliers</td><td>Scope and locations matter</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on framework and review depth</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Supply chain mapping</td><td>1 to 2 weeks</td><td>Depends on vendor data</td></tr>
                        <tr><td>Policy and questionnaire setup</td><td>2 to 3 weeks</td><td>Can be phased</td></tr>
                        <tr><td>Vendor assessment</td><td>Case-specific</td><td>Depends on supplier count and response quality</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain supplier declarations and audit evidence</li>
                <li>Track corrective actions and high-risk vendors</li>
                <li>Update customer ESG responses with evidence</li>
                <li>Review labour, environment and safety risks</li>
                <li>Avoid unverified sustainability claims</li>
            </ul>
            <h3>Common Mistakes to Avoid</h3>
            <ul>
                <li>Using copied documents without matching the actual business model.</li>
                <li>Submitting inconsistent financial, legal or operational information.</li>
                <li>Ignoring post-registration or post-filing compliance requirements.</li>
                <li>Missing authority queries, renewal timelines or reporting deadlines.</li>
            </ul>
            <div className="info-box"><p>This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. Requirements may change from time to time and should be verified from the latest official framework before taking action.</p></div>

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
            <div className="info-box"><p>For additional questions, please contact Estabizz for a service-specific clarification.</p></div>
            )}
        </ServicePageLayout>
    );
}
