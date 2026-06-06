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
        { label: "Regulator", value: "IRDAI" },
        { label: "Service Type", value: "Irda Insurance Broker License" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "Who issues the insurance broker license in India?", a: "The license is issued by the Insurance Regulatory and Development Authority of India (IRDAI). It is the governing body for insurance intermediaries." },
                    { q: "What is the role of an insurance broker?", a: "A broker advises clients and arranges insurance policies. Key roles include: • Policy comparison • Risk advisory • Claims assistance" },
                    { q: "What are the types of insurance broker licenses?", a: "There are three types: • Direct Broker • Reinsurance Broker • Composite Broker" },
                    { q: "Can a broker sell policies from multiple insurers?", a: "Yes, brokers can work with multiple insurers. This ensures unbiased advice to clients." },
                    { q: "Is insurance broker business profitable in India?", a: "Yes, it can be profitable due to recurring commissions and renewals. However, compliance costs must be considered." },
                    { q: "What is the validity of broker license?", a: "The license is valid for 3 years. Renewal is mandatory before expiry." },
                    { q: "Can an individual apply for broker license?", a: "No, only a Company or LLP can apply. Individuals are not eligible." },
                    { q: "Is insurance broker different from insurance agent?", a: "Yes, brokers are independent, while agents represent specific insurers." },
                    { q: "Can brokers operate online?", a: "Yes, but physical infrastructure is also required. Digital-only presence is not sufficient." },
                    { q: "What is composite broker license?", a: "It allows both direct and reinsurance activities. It requires higher capital." },
                    { q: "What is the scope of insurance broker business?", a: "Scope includes retail, corporate, and advisory services across insurance segments." },
                    { q: "What is minimum capital requirement?", a: "Capital starts from Rs. 75 Lakhs for direct brokers and increases for other types." },
                    { q: "Is net worth requirement mandatory?", a: "Yes, it must be maintained at all times as per regulatory guidelines." },
                    { q: "Can startups apply for broker license?", a: "Yes, provided they meet capital and compliance requirements." },
                    { q: "Is Principal Officer mandatory?", a: "Yes, it is a compulsory regulatory requirement." },
                    { q: "What qualification is required for Principal Officer?", a: "Must clear IRDAI-approved exam and training." },
                    { q: "Can NBFC apply for broker license?", a: "Yes, subject to RBI and IRDAI compliance." },
                    { q: "Is foreign investment allowed?", a: "Yes, as per FEMA and insurance sector FDI norms." },
                    { q: "Can partnership firm apply?", a: "No, only Company or LLP structure is allowed." },
                    { q: "What is fit and proper criteria?", a: "It includes: • Financial integrity • No criminal record • Good reputation" },
                    { q: "Is experience required?", a: "Yes, especially for Principal Officer and key management." },
                    { q: "Can existing agent upgrade to broker?", a: "Yes, by fulfilling eligibility criteria." },
                    { q: "Is office space required?", a: "Yes, physical office is mandatory." },
                    { q: "Can foreign company apply directly?", a: "No, it must incorporate Indian entity." },
                    { q: "Is compliance team required?", a: "Yes, especially for larger operations." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Irda Insurance Broker License" }]}
            title="IRDAI Insurance Broker License: Complete Guide with Compliance Insights"
            readTime="15 min read"
            focusKeyword="IRDAI Insurance Broker License"
            sections={sections}
            ctaTitle="Need Expert Help with Irda Insurance Broker License?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for IRDAI Insurance Broker Licence."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Irda Insurance Broker License?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>IRDAI Insurance Broker Licence is required for entities intending to act as direct, reinsurance or composite insurance brokers in India. The registration process requires proper entity structuring, capital, principal officer eligibility, broker qualified persons, infrastructure, professional indemnity planning and IRDAI scrutiny.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is IRDAI Insurance Broker Licence?</h2>
            <p>IRDAI Insurance Broker Licence is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Insurance Regulatory and Development Authority of India</td></tr>
                        <tr><td>Applicable framework</td><td>IRDAI Insurance Brokers Regulations, Insurance Act and applicable IRDAI circulars.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Insurance broking promoters, risk advisory firms, corporate groups, reinsurance intermediaries and financial service businesses planning to advise and arrange insurance products for clients should evaluate IRDAI broker registration before operations.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Legal structure</td><td>Company or eligible entity as permitted by IRDAI</td><td>Object clause must support broking activity</td></tr>
                        <tr><td>Capital / net worth</td><td>Category-specific requirement</td><td>Direct, reinsurance and composite categories differ</td></tr>
                        <tr><td>Principal Officer</td><td>Qualified, trained and fit and proper</td><td>Mandatory for application</td></tr>
                        <tr><td>Infrastructure</td><td>Office, systems, records and grievance process</td><td>IRDAI may inspect readiness</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Certificate of incorporation, MOA and AOA</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Capital proof and net worth certificate</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Principal officer and qualified person documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Promoter / director KYC and fit and proper declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan and financial projections</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Infrastructure proof and organisation chart</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Policies for solicitation, grievance and compliance</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>IRDAI application and fee proof</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>IRDAI application / registration fee</td><td>As prescribed for broker category</td><td>Verify latest IRDAI schedule</td></tr>
                        <tr><td>Capital requirement</td><td>Category-specific</td><td>Must be maintained continuously</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on category and documentation</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Eligibility and category review</td><td>1 to 2 weeks</td><td>Wrong category causes delay</td></tr>
                        <tr><td>Documentation</td><td>3 to 6 weeks</td><td>Principal officer documents are critical</td></tr>
                        <tr><td>IRDAI review</td><td>3 to 6 months or more</td><td>Subject to scrutiny and queries</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain professional indemnity insurance where applicable</li>
                <li>Submit returns and compliance reports</li>
                <li>Maintain client records and mandate documents</li>
                <li>Follow remuneration and solicitation norms</li>
                <li>Keep grievance redressal and inspection files ready</li>
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
