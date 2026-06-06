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
                    { q: "What is responsible investing?", a: "Investing with ethical and sustainability considerations." },
                    { q: "Who can participate in sustainable finance?", a: "Companies, investors, banks, and financial institutions." },
                    { q: "Can NBFCs engage in sustainable finance?", a: "Yes, under applicable regulatory frameworks." },
                    { q: "Is sustainable finance mandatory in India?", a: "Partially mandatory through ESG disclosures for listed entities." },
                    { q: "Which sectors benefit from sustainable finance?", a: "Key sectors include: • Renewable energy • Infrastructure • Agriculture" },
                    { q: "Can SMEs access sustainable finance?", a: "Yes, through green funding schemes." },
                    { q: "Is ESG applicable to unlisted companies?", a: "Not mandatory but increasingly expected." },
                    { q: "Can banks issue green loans?", a: "Yes, under sustainable lending frameworks." },
                    { q: "Is sustainable finance applicable to insurance companies?", a: "Yes, through ESG-based investments." },
                    { q: "Is there registration for sustainable finance activities?", a: "No single registration; depends on activity type." },
                    { q: "How to issue green bonds in India?", a: "Through SEBI guidelines and disclosures." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🌱", label: "ESG" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Sustainable Finance" }]}
            title="Sustainable Finance in India: Ultimate Guide to ESG Compliance & Growth Opportunities"
            readTime="15 min read"
            focusKeyword="Sustainable Finance in India"
            sections={sections}
            ctaTitle="Need Expert Help with Sustainable Finance?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Sustainable Finance in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Sustainable Finance?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Sustainable Finance in India covers advisory, documentation and compliance support for businesses raising, deploying or reporting capital linked to environmental, social or governance outcomes. It is relevant for green debt, impact finance, sustainability-linked lending, ESG disclosures and responsible investment documentation.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Sustainable Finance in India?</h2>
            <p>Sustainable Finance in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>SEBI, RBI, MCA and sector-specific frameworks as applicable</td></tr>
                        <tr><td>Applicable framework</td><td>ESG, green finance, BRSR, sustainable lending, climate-risk and disclosure frameworks depending on entity type.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Listed entities, lenders, fund managers, startups, manufacturers, infrastructure companies, financial institutions and impact businesses planning sustainability-linked financing or ESG reporting should evaluate sustainable finance readiness.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Use of proceeds</td><td>Funds should be linked to credible green, social or sustainability objectives</td><td>Avoid vague impact claims</td></tr>
                        <tr><td>Governance</td><td>Board and management oversight of ESG commitments</td><td>Documentation supports investor confidence</td></tr>
                        <tr><td>Measurement</td><td>Defined KPIs, targets and reporting method</td><td>Impact must be measurable</td></tr>
                        <tr><td>Disclosure</td><td>Clear risk, use-of-funds and progress reporting</td><td>Greenwashing risk must be controlled</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Sustainability or ESG policy</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Use-of-proceeds framework</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Project details and impact assumptions</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Financial documents and funding plan</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>KPI and target measurement note</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Board / management approvals</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>External review or assurance inputs, where applicable</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Investor / lender disclosure documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>Regulatory fee</td><td>Usually not a single licence fee</td><td>Depends on instrument or filing</td></tr>
                        <tr><td>Assurance / review cost</td><td>As applicable</td><td>External review may be needed</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on documentation and reporting depth</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Readiness assessment</td><td>1 to 2 weeks</td><td>Data availability is key</td></tr>
                        <tr><td>Framework documentation</td><td>2 to 4 weeks</td><td>Depends on project complexity</td></tr>
                        <tr><td>Review / reporting support</td><td>Case-specific</td><td>May align with funding or reporting cycle</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Track use of proceeds and impact indicators</li>
                <li>Maintain evidence for ESG claims</li>
                <li>Update disclosures and lender / investor reports</li>
                <li>Avoid unsupported green or social claims</li>
                <li>Review regulatory developments in ESG and sustainable finance</li>
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
