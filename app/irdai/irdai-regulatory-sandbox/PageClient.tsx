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
        { label: "Service Type", value: "Irdai Regulatory Sandbox" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "Who regulates the Regulatory Sandbox in insurance?", a: "It is regulated by IRDAI. All sandbox approvals and monitoring are done under IRDAI guidelines." },
                    { q: "What is the main benefit of the Regulatory Sandbox?", a: "It enables real-time testing with limited risk. Companies can validate products before full compliance burden applies." },
                    { q: "Is Regulatory Sandbox mandatory for insurance innovation?", a: "No, it is not mandatory. However, it is advisable for testing new or experimental insurance products safely." },
                    { q: "What type of innovations are allowed under sandbox?", a: "Innovations can include: • New insurance products • Distribution models • Technology-driven solutions" },
                    { q: "What is the validity period of sandbox approval?", a: "Typically, approval is granted for a limited period. It may be extended based on IRDAI approval." },
                    { q: "Can sandbox products be sold to the public?", a: "Yes, but with restrictions. There are limits on customer exposure and risk." },
                    { q: "Does sandbox approval mean full license approval?", a: "No, it is only for testing. Full approval requires separate regulatory compliance." },
                    { q: "What is InsurTech in context of sandbox?", a: "InsurTech refers to technology-driven insurance solutions. Sandbox promotes such innovations." },
                    { q: "Can traditional insurers apply for sandbox?", a: "Yes, both insurers and startups can apply, subject to eligibility conditions." },
                    { q: "Is sandbox only for startups?", a: "No, it is open to: • Insurance companies • Intermediaries • Technology firms" },
                    { q: "What is the risk limitation in sandbox?", a: "Risk exposure is capped. IRDAI ensures consumer protection during testing." },
                    { q: "Can rejected applications be re-applied?", a: "Yes, applicants can reapply after addressing deficiencies." },
                    { q: "What is the legal basis of sandbox?", a: "It is governed under IRDAI Regulatory Sandbox Regulations, as per applicable guidelines." },
                    { q: "Can a fintech company apply for sandbox?", a: "Yes, if it has an insurance-linked innovation and meets IRDAI conditions." },
                    { q: "Can foreign companies apply for sandbox?", a: "Generally, applications must be routed through Indian entities." },
                    { q: "Is there any minimum capital requirement?", a: "It depends on the nature of the proposal. Financial capability must be demonstrated." },
                    { q: "Can individual entrepreneurs apply?", a: "No, typically applications are accepted from registered entities." },
                    { q: "Can brokers participate in sandbox?", a: "Yes, insurance intermediaries like brokers can apply." },
                    { q: "Is sandbox applicable to reinsurance?", a: "Yes, if innovation relates to reinsurance products or processes." },
                    { q: "Can multiple entities apply jointly?", a: "Yes, joint applications are allowed with clear roles defined." },
                    { q: "Is prior experience mandatory?", a: "Not mandatory, but domain knowledge is expected." },
                    { q: "Can NBFCs apply under sandbox?", a: "Yes, if the product involves insurance distribution or integration." },
                    { q: "Can digital-only insurance models apply?", a: "Yes, digital innovation is one of the key focus areas." },
                    { q: "Is sandbox open for health insurance innovations?", a: "Yes, all segments including life, general, and health are covered." },
                    { q: "Can rejected applicants appeal?", a: "There is no formal appeal, but reapplication is allowed." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Irdai Regulatory Sandbox" }]}
            title="IRDAI Regulatory Sandbox in India: Ultimate Guide to Insurance Innovation Framework in India"
            readTime="15 min read"
            focusKeyword="IRDAI Regulatory Sandbox in India"
            sections={sections}
            ctaTitle="Need Expert Help with Irdai Regulatory Sandbox?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for IRDAI Regulatory Sandbox in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Irdai Regulatory Sandbox?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>IRDAI Regulatory Sandbox in India allows eligible insurance sector innovations to be tested in a controlled environment subject to IRDAI review. It is meant for genuine product, process, distribution, technology or service innovations that need limited regulatory relaxation or supervised testing before wider rollout.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is IRDAI Regulatory Sandbox in India?</h2>
            <p>IRDAI Regulatory Sandbox in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Insurance Regulatory and Development Authority of India</td></tr>
                        <tr><td>Applicable framework</td><td>IRDAI regulatory sandbox framework and applicable innovation testing circulars.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Insurers, insurance intermediaries, insurtech startups, technology providers and insurance ecosystem participants with a clear innovation use case may evaluate sandbox participation, subject to IRDAI criteria and testing safeguards.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Innovation fit</td><td>Proposal must show genuine insurance-sector innovation</td><td>Routine business models may not qualify</td></tr>
                        <tr><td>Consumer protection</td><td>Testing safeguards and grievance process required</td><td>Policyholder risk must be controlled</td></tr>
                        <tr><td>Testing plan</td><td>Defined cohort, duration, metrics and exit plan</td><td>IRDAI reviews practicality</td></tr>
                        <tr><td>Regulatory relaxation</td><td>Specific relaxation must be justified</td><td>Blanket exemption is not available</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Sandbox application and innovation note</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Applicant incorporation / registration documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Testing plan, cohort details and risk controls</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Consumer consent and disclosure framework</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Technology and data security note</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Grievance redressal and exit plan</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Board / management approval</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Declarations and supporting documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>Application fee</td><td>As prescribed, if applicable</td><td>Verify latest IRDAI sandbox process</td></tr>
                        <tr><td>Testing cost</td><td>Project-specific</td><td>Technology and operational cost may apply</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on proposal depth</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Innovation assessment</td><td>1 to 2 weeks</td><td>Use case clarity is important</td></tr>
                        <tr><td>Application preparation</td><td>2 to 4 weeks</td><td>Testing safeguards needed</td></tr>
                        <tr><td>IRDAI review</td><td>Case-specific</td><td>Subject to sandbox window and queries</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Operate only within approved sandbox scope</li>
                <li>Maintain consumer consent and test records</li>
                <li>Report incidents and outcomes to IRDAI</li>
                <li>Do not commercially scale until permitted</li>
                <li>Prepare exit or transition plan after testing</li>
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
