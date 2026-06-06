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
                    { q: "Can RBI license be transferred?", a: "No, licenses are entity-specific and non-transferable." },
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
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for RBI Services in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Rbi Services?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>RBI Services in India cover licensing, registration, reporting, policy drafting and ongoing compliance support for businesses regulated by the Reserve Bank of India. These services are relevant for NBFCs, payment companies, fintech platforms, money changers, account aggregators, lending platforms and entities handling regulated financial activity.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is RBI Services in India?</h2>
            <p>RBI Services in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Reserve Bank of India</td></tr>
                        <tr><td>Applicable framework</td><td>RBI Act, FEMA, Payment and Settlement Systems Act, master directions, circulars and sector-specific RBI frameworks.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Founders, CFOs, compliance teams, fintech companies, NBFC groups, payment businesses, foreign exchange businesses and investors entering regulated financial services should seek RBI advisory before building or launching the activity.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Business model</td><td>Must be mapped to the correct RBI framework</td><td>Wrong licence selection causes delays</td></tr>
                        <tr><td>Capital / net worth</td><td>Depends on licence category</td><td>Verify latest RBI circular and master direction</td></tr>
                        <tr><td>Governance</td><td>Fit and proper directors, policies and compliance officer readiness</td><td>RBI reviews governance quality</td></tr>
                        <tr><td>Technology / operations</td><td>Relevant for fintech, payments and digital lending models</td><td>Cyber, data and outsourcing controls matter</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Incorporation documents and object clause</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Promoter / director KYC and fit and proper declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Net worth certificate and source of funds documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan and financial projections</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Policy framework and SOPs</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Technology, outsourcing and grievance documents, where applicable</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>RBI application forms and declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Board resolutions and compliance undertakings</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>Regulatory fee</td><td>Depends on RBI service / licence</td><td>To be verified from latest schedule</td></tr>
                        <tr><td>Capital requirement</td><td>Licence-specific</td><td>NBFC, PA, PPI and other frameworks differ</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on complexity and filings</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Applicability review</td><td>3 to 7 working days</td><td>Business model clarity is important</td></tr>
                        <tr><td>Documentation</td><td>2 to 6 weeks</td><td>Depends on documents and policies</td></tr>
                        <tr><td>Regulatory review</td><td>Case-specific</td><td>RBI timelines vary by licence and query rounds</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Track RBI returns, reports and portal submissions</li>
                <li>Maintain board-approved policies and registers</li>
                <li>Prepare for audit, inspection and supervisory queries</li>
                <li>Monitor net worth, capital and governance changes</li>
                <li>Update compliance calendar whenever RBI circulars change</li>
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
