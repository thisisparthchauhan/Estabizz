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
        { label: "Service Type", value: "Full Fledged Money Changers" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is an FFMC License in India?", a: "An FFMC License is an authorisation issued by the Reserve Bank of India allowing entities to deal in foreign exchange for specified purposes. • Permits money changing activities • Governed under FEMA regulations" },
                    { q: "Who issues the FFMC License?", a: "The FFMC License is issued by the Reserve Bank of India. • Acts as the regulatory authority • Ensures compliance with FEMA guidelines" },
                    { q: "What activities are allowed under FFMC License?", a: "FFMCs can undertake authorised money changing activities. • Purchase foreign currency • Sell foreign exchange for permitted purposes" },
                    { q: "Is FFMC License mandatory in India?", a: "Yes, it is mandatory to obtain FFMC License to deal in foreign exchange legally. • Required under FEMA • Unauthorised dealing is prohibited" },
                    { q: "What is the full form of FFMC?", a: "FFMC stands for Full Fledged Money Changer. • RBI authorised entity • Deals in forex transactions" },
                    { q: "Can individuals apply for FFMC License?", a: "No, individuals cannot apply. • Only companies registered under Companies Act are eligible" },
                    { q: "What is the objective of FFMC License?", a: "The objective is to regulate forex transactions. • Ensure transparency • Prevent illegal currency dealings" },
                    { q: "What law governs FFMC License in India?", a: "FFMC License is governed under FEMA, 1999. • Regulated by RBI • Supported by master directions" },
                    { q: "Can FFMC deal in all types of forex transactions?", a: "No, only permitted transactions are allowed. • Travel-related forex • Specified current account transactions" },
                    { q: "Can FFMC open branches?", a: "Yes, subject to RBI approval. • Branch expansion requires compliance" },
                    { q: "Is FFMC License valid across India?", a: "Yes, it is valid pan-India. • Subject to branch approvals" },
                    { q: "What is the role of RBI in FFMC regulation?", a: "RBI regulates, supervises, and monitors FFMCs. • Issues guidelines • Conducts inspections" },
                    { q: "Can FFMC issue forex cards?", a: "No, generally not allowed. • Limited to currency exchange" },
                    { q: "Is FFMC part of banking system?", a: "No, FFMCs are non-banking entities. • Operate under RBI authorisation" },
                    { q: "Who can apply for FFMC License?", a: "Only companies registered under Companies Act can apply. • LLPs and individuals not eligible" },
                    { q: "What is the minimum net owned fund requirement?", a: "Minimum ₹25 lakh for single branch FFMC. • ₹50 lakh for multiple branches" },
                    { q: "Is prior experience required?", a: "Not mandatory, but preferred. • Helps in RBI evaluation" },
                    { q: "Can NBFC apply for FFMC License?", a: "Yes, NBFCs can apply if they meet conditions. • Must comply with RBI norms" },
                    { q: "Can foreign companies apply for FFMC License?", a: "No, only Indian incorporated companies are eligible." },
                    { q: "Is physical office mandatory?", a: "Yes, a proper place of business is required." },
                    { q: "Can startup companies apply?", a: "Yes, if they meet capital requirements." },
                    { q: "Can partnership firms apply?", a: "No, only companies are allowed." },
                    { q: "Is GST registration required?", a: "Yes, GST compliance is expected post registration." },
                    { q: "What is the process to apply for FFMC License?", a: "The process involves RBI application and approval. • Prepare documents • Submit to RBI • Undergo verification" },
                    { q: "Where to apply for FFMC License?", a: "Application is submitted to RBI regional office." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Full Fledged Money Changers" }]}
            title="Full Fledged Money Changer License: Complete Guide to FFMC Registration in India"
            readTime="15 min read"
            focusKeyword="Full Fledged Money Changer License"
            sections={sections}
            ctaTitle="Need Expert Help with Full Fledged Money Changers?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Full Fledged Money Changer License."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Full Fledged Money Changers?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Full Fledged Money Changer License is an RBI authorisation for eligible companies intending to undertake permitted money changing activities such as purchase and sale of foreign currency for approved purposes. The applicant must demonstrate capital readiness, fit and proper promoters, proper place of business, AML controls and operational discipline before commencing foreign exchange activity.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Full Fledged Money Changer License?</h2>
            <p>Full Fledged Money Changer License is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Reserve Bank of India</td></tr>
                        <tr><td>Applicable framework</td><td>FEMA, 1999, RBI directions for authorised money changers and applicable KYC / AML requirements.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Companies planning to operate currency exchange counters, travel forex businesses, branch-based money changing services or forex support operations should evaluate FFMC authorisation before undertaking any foreign exchange dealing activity.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Legal structure</td><td>Company incorporated in India</td><td>Individuals and partnership firms are generally not eligible</td></tr>
                        <tr><td>Net owned funds</td><td>Single / multiple branch requirement as prescribed by RBI</td><td>Verify latest RBI schedule before filing</td></tr>
                        <tr><td>Fit and proper</td><td>Directors and promoters must satisfy integrity and financial soundness expectations</td><td>Adverse records may trigger scrutiny</td></tr>
                        <tr><td>Infrastructure</td><td>Office, cash handling controls, registers and AML process</td><td>RBI may examine operational readiness</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Certificate of incorporation, MOA and AOA</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Board resolution approving FFMC application</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Audited financial statements and net owned fund certificate</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>KYC and fit and proper declarations of directors</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Office proof and branch details</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>AML / KYC policy and internal control note</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan for money changing activity</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Application form and prescribed RBI declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>Application / regulatory fee</td><td>As prescribed by RBI</td><td>To be verified from the latest official schedule</td></tr>
                        <tr><td>Capital / NOF</td><td>As prescribed for branch category</td><td>Must be owned funds, not borrowed support</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on branches and documentation readiness</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Eligibility and NOF review</td><td>1 to 2 weeks</td><td>Capital proof is critical</td></tr>
                        <tr><td>Documentation and filing</td><td>2 to 4 weeks</td><td>Depends on completeness</td></tr>
                        <tr><td>RBI review</td><td>2 to 4 months or more</td><td>Subject to RBI scrutiny and queries</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain currency transaction records and statutory registers</li>
                <li>Follow RBI KYC / AML and suspicious transaction reporting expectations</li>
                <li>Display licence and authorised rates as applicable</li>
                <li>Submit periodic statements and reports</li>
                <li>Maintain cash security, audit trail and branch controls</li>
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
