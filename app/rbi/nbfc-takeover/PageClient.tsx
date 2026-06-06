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
        { label: "Service Type", value: "Nbfc Takeover" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is takeover of an NBFC?", a: "Takeover of an NBFC means acquisition of control or ownership in a Non-Banking Financial Company through share transfer or change in management, subject to RBI approval." },
                    { q: "Is RBI approval required for NBFC takeover?", a: "Yes, prior approval of RBI is mandatory. Key cases include: • Change in control • Change in shareholding beyond 26% • Change in management" },
                    { q: "What is considered “control” in NBFC takeover?", a: "Control means the right to appoint majority directors or influence management decisions, as per regulatory guidelines." },
                    { q: "Can an NBFC be purchased like a normal company?", a: "No, NBFCs are regulated entities. Transfer requires RBI approval and compliance with fit and proper criteria." },
                    { q: "What is the minimum share transfer triggering RBI approval?", a: "Transfer exceeding 26% of paid-up capital requires prior RBI approval." },
                    { q: "What is a change in management in NBFC context?", a: "Appointment of new directors leading to more than 30% board change requires RBI approval." },
                    { q: "Is NBFC takeover legal in India?", a: "Yes, it is permitted, provided all RBI regulations and Companies Act provisions are followed." },
                    { q: "Why do investors prefer NBFC takeover?", a: "Because it saves time compared to fresh registration and provides immediate operational readiness." },
                    { q: "What is the difference between NBFC acquisition and merger?", a: "Acquisition involves share purchase, while merger involves combining entities through legal restructuring." },
                    { q: "Can foreign investors take over NBFC?", a: "Yes, subject to FDI norms and RBI approval." },
                    { q: "What is NBFC due diligence?", a: "It is a detailed financial, legal, and regulatory review before takeover." },
                    { q: "Is takeover faster than NBFC registration?", a: "Yes, takeover is generally faster but depends on RBI approval timeline." },
                    { q: "Can dormant NBFC be taken over?", a: "Yes, but it must meet compliance requirements and RBI scrutiny." },
                    { q: "What is NBFC license continuity after takeover?", a: "License continues, subject to RBI approval of new management." },
                    { q: "Who regulates NBFC takeover?", a: "The Reserve Bank of India regulates NBFC takeovers." },
                    { q: "Who can acquire an NBFC?", a: "Any individual or entity meeting RBI’s fit and proper criteria can acquire an NBFC." },
                    { q: "What is fit and proper criteria?", a: "It includes: • Financial soundness • Clean track record • No criminal background" },
                    { q: "Can a startup acquire an NBFC?", a: "Yes, if promoters meet RBI eligibility norms." },
                    { q: "Can an existing company acquire NBFC?", a: "Yes, subject to compliance and RBI approval." },
                    { q: "Is minimum net worth required for takeover?", a: "Yes, the acquirer must demonstrate financial capability as per regulatory expectations." },
                    { q: "Can directors of another NBFC acquire a new NBFC?", a: "Yes, provided there is no regulatory restriction." },
                    { q: "Can an NRI acquire NBFC?", a: "Yes, subject to FEMA and RBI guidelines." },
                    { q: "Can a loss-making NBFC be acquired?", a: "Yes, but risk assessment is critical." },
                    { q: "Can shell companies acquire NBFC?", a: "No, RBI discourages non-substantive entities." },
                    { q: "Is prior experience required?", a: "Preferred but not mandatory; financial and governance capability is key." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Nbfc Takeover" }]}
            title="NBFC Takeover in India: Ultimate Guide to RBI Approval, Process & Compliance Risks"
            readTime="15 min read"
            focusKeyword="NBFC Takeover in India"
            sections={sections}
            ctaTitle="Need Expert Help with Nbfc Takeover?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for NBFC Takeover in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Nbfc Takeover?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>NBFC Takeover in India requires careful RBI and corporate law review when shares, control, management or ownership of an existing NBFC are proposed to be transferred. The transaction must be structured with proper due diligence, fit and proper checks, public notice requirements, RBI approval where applicable and post-closing compliance readiness.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is NBFC Takeover in India?</h2>
            <p>NBFC Takeover in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Reserve Bank of India</td></tr>
                        <tr><td>Applicable framework</td><td>RBI Act, 1934, RBI NBFC directions and prior approval framework for change in control / management.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Investors acquiring an NBFC, promoters exiting an NBFC, fintech groups buying an NBFC platform, financial services groups restructuring ownership and entities planning change in control should review RBI approval requirements before signing definitive documents.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Target status</td><td>Existing RBI-registered NBFC</td><td>Licence category, compliance history and net worth must be checked</td></tr>
                        <tr><td>Buyer profile</td><td>Fit and proper acquirer with clean regulatory background</td><td>RBI may examine source of funds and control structure</td></tr>
                        <tr><td>Prior approval</td><td>Required where change in control / management thresholds are triggered</td><td>Do not close transaction before required approval</td></tr>
                        <tr><td>Public notice</td><td>May be required before transfer completion</td><td>Timeline must be built into transaction plan</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>RBI certificate of registration of target NBFC</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Shareholding pattern before and after takeover</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Buyer KYC, net worth and source of funds documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Board approvals and draft transaction documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Due diligence report and compliance status note</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Public notice draft, where applicable</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan after acquisition</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>RBI application and declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>RBI fee</td><td>As applicable, if prescribed</td><td>To be verified from current RBI process</td></tr>
                        <tr><td>Transaction costs</td><td>Due diligence, valuation, stamp duty and filings</td><td>Depends on transaction structure</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on due diligence and RBI approval support</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Due diligence</td><td>2 to 4 weeks</td><td>Depends on target records</td></tr>
                        <tr><td>RBI application preparation</td><td>2 to 3 weeks</td><td>Requires buyer and target documents</td></tr>
                        <tr><td>RBI approval process</td><td>2 to 4 months or more</td><td>Subject to scrutiny and queries</td></tr>
                        <tr><td>Closing and filings</td><td>2 to 4 weeks</td><td>After approval and public notice requirements</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Do not implement control change before required approval</li>
                <li>Maintain fit and proper declarations and source of funds records</li>
                <li>Update statutory registers and corporate filings after closing</li>
                <li>Review post-takeover policies, board composition and RBI returns</li>
                <li>Prepare for RBI inspection or query on historical compliance</li>
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
