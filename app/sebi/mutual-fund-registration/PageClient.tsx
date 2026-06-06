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
        { label: "Regulator", value: "SEBI" },
        { label: "Service Type", value: "Mutual Fund Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is SEBI Mutual Fund Registration India?", a: "It is the approval required from SEBI to establish and operate a mutual fund structure in India. It involves sponsor, trustee, and AMC setup." },
                    { q: "Who regulates mutual funds in India?", a: "Mutual funds are regulated by SEBI under the SEBI (Mutual Funds) Regulations, 1996." },
                    { q: "Is SEBI registration mandatory for mutual funds?", a: "Yes, it is compulsory. No entity can operate mutual funds without SEBI approval." },
                    { q: "What is a mutual fund in simple terms?", a: "It is a pooled investment vehicle where funds from multiple investors are professionally managed." },
                    { q: "What is the role of a sponsor?", a: "Sponsor acts as the promoter and initiates the mutual fund structure." },
                    { q: "What is the role of trustees?", a: "Trustees protect investor interests and oversee AMC operations." },
                    { q: "Can individuals start a mutual fund?", a: "No, individuals cannot. Only structured entities meeting SEBI criteria can apply." },
                    { q: "What is the objective of SEBI regulation?", a: "To ensure investor protection, transparency, and fair practices." },
                    { q: "Is mutual fund business regulated strictly?", a: "Yes, it is highly regulated due to involvement of public money." },
                    { q: "What is a mutual fund trust?", a: "It is the legal structure under which mutual funds are established." },
                    { q: "What is a custodian?", a: "Custodian holds securities of the mutual fund independently." },
                    { q: "Can a company operate multiple schemes?", a: "Yes, after approval, multiple schemes can be launched." },
                    { q: "Is mutual fund business profitable?", a: "Yes, but it requires long-term commitment and scale." },
                    { q: "Who is eligible for SEBI Mutual Fund Registration India?", a: "Entities with financial strength, experience, and governance capability are eligible." },
                    { q: "What is minimum experience required for sponsor?", a: "Minimum 5 years in financial services sector." },
                    { q: "Is profitability mandatory for sponsor?", a: "Yes, consistent profitability and strong financials are expected." },
                    { q: "Can NBFCs apply for mutual fund registration?", a: "Yes, subject to meeting SEBI eligibility conditions." },
                    { q: "Can banks sponsor mutual funds?", a: "Yes, many banks operate mutual funds." },
                    { q: "Can foreign companies apply?", a: "Yes, subject to FEMA and SEBI compliance." },
                    { q: "Is net worth requirement applicable?", a: "Yes, AMC must maintain minimum ₹50 crore net worth." },
                    { q: "Can startups apply for mutual fund license?", a: "Only if they meet strict financial and governance requirements." },
                    { q: "What is fit and proper criteria?", a: "It evaluates integrity, financial soundness, and track record." },
                    { q: "Is prior asset management experience required?", a: "It is not mandatory but highly preferred by SEBI." },
                    { q: "Can LLP apply for mutual fund registration?", a: "No, AMC must be a company under Companies Act." },
                    { q: "Can fintech companies apply?", a: "Yes, if they meet regulatory and financial criteria." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Mutual Fund Registration" }]}
            title="SEBI Mutual Fund Registration India: Complete Guide with Eligibility, Process & Compliance"
            readTime="15 min read"
            focusKeyword="Regulatory Compliance"
            sections={sections}
            ctaTitle="Need Expert Help with Mutual Fund Registration?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for SEBI Mutual Fund Registration in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Mutual Fund Registration?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>SEBI Mutual Fund Registration in India is required for sponsors intending to establish a mutual fund structure for pooling investor money and launching schemes under SEBI supervision. The framework requires sponsor eligibility, trustee structure, asset management company setup, capital readiness, governance controls and detailed SEBI scrutiny.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is SEBI Mutual Fund Registration in India?</h2>
            <p>SEBI Mutual Fund Registration in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Securities and Exchange Board of India</td></tr>
                        <tr><td>Applicable framework</td><td>SEBI Mutual Fund Regulations, SEBI Act, trust structure requirements and applicable SEBI circulars.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Financial services groups, asset management promoters, institutional sponsors and eligible entities planning to launch mutual fund schemes in India must evaluate SEBI mutual fund registration before public fundraising or scheme launch.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Sponsor eligibility</td><td>Track record, fit and proper status and financial soundness</td><td>SEBI scrutiny is detailed</td></tr>
                        <tr><td>Trust structure</td><td>Mutual fund trust and trustee company / board framework</td><td>Governance independence is important</td></tr>
                        <tr><td>AMC setup</td><td>Asset management company with required capital and personnel</td><td>Investment and compliance team readiness matters</td></tr>
                        <tr><td>Scheme readiness</td><td>Schemes require separate filing and approval process</td><td>Registration alone does not launch every scheme</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Sponsor corporate documents and financial statements</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Trust deed and trustee details</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>AMC incorporation documents and capital proof</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Promoter / director KYC and fit and proper declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan and scheme strategy</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Compliance manual and risk management framework</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Investment, valuation and disclosure policies</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>SEBI application and prescribed declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>SEBI application / registration fee</td><td>As prescribed under SEBI schedule</td><td>To be verified from latest official schedule</td></tr>
                        <tr><td>AMC capital</td><td>As prescribed by SEBI</td><td>Must be checked before filing</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on structure and documentation</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Structuring and eligibility review</td><td>2 to 4 weeks</td><td>Sponsor readiness is critical</td></tr>
                        <tr><td>Documentation and filing</td><td>4 to 8 weeks</td><td>Trust and AMC documents take time</td></tr>
                        <tr><td>SEBI review</td><td>Several months</td><td>Subject to SEBI scrutiny and query rounds</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain trustee oversight and AMC governance</li>
                <li>File scheme documents and disclosures as prescribed</li>
                <li>Follow investment restrictions, valuation and risk norms</li>
                <li>Maintain investor grievance and disclosure systems</li>
                <li>Submit periodic SEBI and AMFI-related reports where applicable</li>
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
