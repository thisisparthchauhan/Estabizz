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
        { label: "Service Type", value: "Pap License" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "Do directors need specific qualifications?", a: "Yes, they must meet “Fit & Proper” criteria." },
                    { q: "What is Fit & Proper criteria?", a: "It includes: • Integrity • Financial soundness • Clean regulatory record" },
                    { q: "Is prior insurance experience mandatory?", a: "Not mandatory, but highly preferred." },
                    { q: "Is office setup mandatory?", a: "Yes, physical infrastructure is required." },
                    { q: "Is IT infrastructure required at application stage?", a: "Yes, IRDAI expects operational readiness." },
                    { q: "Can a foreign company directly apply?", a: "No, it must incorporate an Indian company." },
                    { q: "Is hospital network required before application?", a: "It is preferred to demonstrate readiness." },
                    { q: "Is financial track record mandatory?", a: "Yes, IRDAI reviews financial strength." },
                    { q: "Where is application submitted?", a: "Application is submitted to IRDAI." },
                    { q: "Is online application available?", a: "Partially, but documentation is detailed." },
                    { q: "What happens after submission?", a: "IRDAI reviews and raises queries if needed." },
                    { q: "Is personal meeting required?", a: "Sometimes, depending on IRDAI requirements." },
                    { q: "How many stages are there in approval?", a: "Typically 3–4 stages including scrutiny and evaluation." },
                    { q: "Can application be rejected?", a: "Yes, if requirements are not met." },
                    { q: "Can I reapply after rejection?", a: "Yes, after addressing deficiencies." },
                    { q: "Is business plan mandatory?", a: "Yes, it is a critical requirement." },
                    { q: "Is net worth certificate required?", a: "Yes, it proves capital compliance." },
                    { q: "Is business plan compulsory?", a: "Yes, IRDAI evaluates viability." },
                    { q: "Is Principal Officer qualification proof needed?", a: "Yes, mandatory." },
                    { q: "Is audited financial required?", a: "Yes, for financial evaluation." },
                    { q: "Is board resolution required?", a: "Yes, authorising application." },
                    { q: "Is hospital tie-up document required?", a: "Not mandatory but beneficial." },
                    { q: "Is capital separate from fees?", a: "Yes, ₹4 Crore capital is separate." },
                    { q: "Is renewal fee applicable?", a: "Yes, periodically." },
                    { q: "Can approval be fast-tracked?", a: "Only if documentation is strong." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Pap License" }]}
            title="TPA License India: Complete Guide to IRDAI Registration, Eligibility & Compliance"
            readTime="15 min read"
            focusKeyword="TPA License India"
            sections={sections}
            ctaTitle="Need Expert Help with Pap License?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for TPA License India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Pap License?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>TPA License India is required for eligible entities intending to provide third-party administrator services for health insurance claims and policyholder servicing. The applicant must demonstrate capital readiness, medical and operational capability, technology systems, insurer servicing process and IRDAI compliance readiness.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is TPA License India?</h2>
            <p>TPA License India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Insurance Regulatory and Development Authority of India</td></tr>
                        <tr><td>Applicable framework</td><td>IRDAI Third Party Administrator framework, Insurance Act and applicable health insurance servicing norms.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Health claims administration companies, insurance servicing businesses, hospital network managers and professional groups intending to support insurers in health claim processing should evaluate TPA registration before operations.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Legal structure</td><td>Company or eligible entity as permitted by IRDAI</td><td>Object clause must support TPA activity</td></tr>
                        <tr><td>Capital / net worth</td><td>As prescribed by IRDAI</td><td>Verify latest official schedule</td></tr>
                        <tr><td>Professional capability</td><td>Medical, claims and operational team readiness</td><td>Qualified manpower is important</td></tr>
                        <tr><td>Technology</td><td>Claims platform, data security and audit trail</td><td>IRDAI scrutiny includes systems</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Incorporation documents and object clause</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Capital proof and net worth certificate</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Promoter / director KYC and declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Medical officer and key personnel documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Claims processing SOP and insurer servicing model</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Technology, data security and BCP documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan and financial projections</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>IRDAI application and prescribed declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>IRDAI fee</td><td>As prescribed</td><td>To be verified from latest IRDAI schedule</td></tr>
                        <tr><td>Technology / setup cost</td><td>Commercial cost</td><td>Depends on claims platform readiness</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on application and policies</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Eligibility review</td><td>1 to 2 weeks</td><td>Team and capital readiness matter</td></tr>
                        <tr><td>Documentation</td><td>3 to 6 weeks</td><td>SOPs and system notes required</td></tr>
                        <tr><td>IRDAI review</td><td>3 to 6 months or more</td><td>Subject to scrutiny and queries</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain claim records and insurer agreements</li>
                <li>Follow policyholder servicing and grievance timelines</li>
                <li>Protect health and personal data</li>
                <li>Submit regulatory returns and reports</li>
                <li>Prepare for IRDAI inspection and audit</li>
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
