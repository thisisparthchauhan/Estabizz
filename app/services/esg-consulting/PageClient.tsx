"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is", title: "What ESG Consulting Covers" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs ESG Support" },
        { id: "documents", title: "Information Required" },
        { id: "process", title: "Implementation Process" },
        { id: "fees", title: "Fees and Scope" },
        { id: "timeline", title: "Timeline" },
        { id: "compliance", title: "Common Risks" },
        { id: "faq", title: "FAQs" },
    ];

    const quickFacts = [
        { label: "Framework", value: "ESG, BRSR and sustainability disclosures" },
        { label: "Primary Regulator", value: "SEBI for listed entities" },
        { label: "Service Type", value: "ESG advisory and reporting support" },
        { label: "Review", value: "Expert reviewed" },
    ];

    const faqs = [
        { q: "What are ESG Consulting Services in India?", a: "ESG consulting helps businesses identify, measure, document and report environmental, social and governance performance." },
        { q: "Is ESG reporting mandatory in India?", a: "BRSR reporting is mandatory for specified listed entities. Other businesses may adopt ESG voluntarily for investors, lenders, customers or global supply chains." },
        { q: "Who regulates ESG disclosures for listed companies?", a: "SEBI regulates BRSR and BRSR Core requirements for specified listed entities." },
        { q: "Is ESG the same as CSR?", a: "No. CSR is statutory social spending under company law, while ESG is a wider sustainability, governance and disclosure framework." },
        { q: "Can private companies adopt ESG?", a: "Yes. Private companies often adopt ESG for funding, supply-chain acceptance, lender due diligence and governance improvement." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🌱", label: "ESG" }, { emoji: "📊", label: "Sustainability Reporting" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "ESG Consulting" }]}
            title="ESG Consulting Services in India: Sustainability, BRSR and Governance Support"
            readTime="12 min read"
            focusKeyword="ESG Consulting Services in India"
            sections={sections}
            ctaTitle="Need ESG and Sustainability Reporting Support?"
            ctaDescription="Get structured assistance for ESG gap review, BRSR mapping, sustainability disclosures, governance policies and investor-ready reporting."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/services/sustainable-finance", category: "ESG", title: "Sustainable Finance", description: "Support for green finance and sustainability-linked documentation." },
                { href: "/services/sustainable-supply-chain", category: "ESG", title: "Sustainable Supply Chain", description: "ESG support for vendor and supply-chain readiness." },
                { href: "/services/legal-due-diligence", category: "Legal", title: "Legal Due Diligence", description: "Review legal, governance and compliance risks." },
            ]}
            finalCtaTitle="Build ESG Readiness with Practical Documentation"
            finalCtaDescription="Speak with Estabizz for ESG gap assessment, BRSR support, sustainability reports and governance documentation."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ESG Consulting Services in India help businesses measure, document and improve their environmental, social and governance performance. For listed companies, lenders, investors, exporters and growth-stage businesses, ESG is increasingly connected with disclosure readiness, board oversight, risk management, supply-chain acceptance and long-term credibility.</p>

            <h2 id="what-is">What ESG Consulting Covers</h2>
            <p>ESG consulting covers sustainability gap assessment, BRSR and BRSR Core mapping, carbon and resource data review, social responsibility indicators, governance policy review, board-level reporting, supplier ESG questionnaires, investor documentation and sustainability report preparation.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>For listed entities, ESG disclosures are shaped by SEBI's Business Responsibility and Sustainability Reporting framework and related circulars. Companies may also need to consider Companies Act governance requirements, CSR provisions, lender ESG expectations, supply-chain standards and international reporting frameworks based on their business model.</p>
            </div>

            <h2 id="who-needs">Who Needs ESG Support</h2>
            <ul>
                <li>Listed companies and IPO-bound businesses</li>
                <li>Exporters and suppliers working with global customers</li>
                <li>NBFCs, fintechs and financial institutions facing lender or investor diligence</li>
                <li>Manufacturing, infrastructure and energy businesses with environmental exposure</li>
                <li>Private companies building governance and sustainability credibility</li>
            </ul>

            <h2 id="documents">Information Required</h2>
            <ul>
                <li>Company profile, business activities and locations</li>
                <li>Energy, water, waste, emissions and resource consumption data</li>
                <li>Employee, diversity, health and safety information</li>
                <li>CSR, grievance, vendor and human rights policies, if applicable</li>
                <li>Board governance, risk management and compliance documents</li>
                <li>Prior sustainability reports, BRSR filings or investor questionnaires</li>
            </ul>

            <h2 id="process">Implementation Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>ESG Gap Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Map current disclosures, data availability, policies and stakeholder expectations.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Data and Policy Mapping</h4><p className="text-[13px] text-[#64748b] !mb-0">Collect ESG metrics and align policies with reporting expectations.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Report Drafting</h4><p className="text-[13px] text-[#64748b] !mb-0">Prepare BRSR, sustainability report or investor-ready ESG note.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Implementation Calendar</h4><p className="text-[13px] text-[#64748b] !mb-0">Create action points, ownership and evidence tracking for future reporting.</p></div></div>
            </div>

            <h2 id="fees">Fees and Scope</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Scope</th><th>Practical Position</th><th>Note</th></tr></thead>
                    <tbody>
                        <tr><td>ESG gap assessment</td><td>Quoted after review</td><td>Depends on size, sites and data depth</td></tr>
                        <tr><td>BRSR / report drafting</td><td>Scope-based fee</td><td>Depends on reporting framework</td></tr>
                        <tr><td>Ongoing ESG support</td><td>Retainer-based</td><td>Useful for listed and investor-facing entities</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Timeline</h2>
            <p>An ESG gap review may take 2 to 3 weeks. A full ESG report or BRSR support assignment may take 4 to 8 weeks or more depending on data availability, number of locations, internal reviews and assurance requirements.</p>

            <h2 id="compliance">Common Risks</h2>
            <ul>
                <li>Using unsupported ESG claims without evidence</li>
                <li>Publishing sustainability data without internal verification</li>
                <li>Ignoring supply-chain, labour or governance indicators</li>
                <li>Treating CSR spending as complete ESG compliance</li>
                <li>No ownership for periodic ESG data collection</li>
            </ul>

            <div className="disclaimer-box">
                <strong>Disclaimer:</strong> ESG requirements and disclosure formats may change from time to time. This page is for general information and should not be treated as legal, audit or assurance advice.
            </div>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-3 my-6">
                {faqs.map((item, i) => (
                    <details key={i} className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                        <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                            <span>{item.q}</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">{item.a}</div>
                    </details>
                ))}
            </div>
        </ServicePageLayout>
    );
}
