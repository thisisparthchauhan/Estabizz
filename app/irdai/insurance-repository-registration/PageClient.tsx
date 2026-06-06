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
        { label: "Service Type", value: "Insurance Repository Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is Insurance Repository Registration in India?", a: "It is an IRDAI approval to operate as an entity that maintains insurance policies in electronic form through e-Insurance Accounts (eIA)." },
                    { q: "What is an Insurance Repository?", a: "An Insurance Repository is a regulated entity that stores and manages insurance policies digitally in a secure and centralised system." },
                    { q: "Who regulates Insurance Repositories in India?", a: "Insurance Regulatory and Development Authority of India (IRDAI) governs and regulates repositories." },
                    { q: "Is Insurance Repository Registration mandatory?", a: "Yes, operating a repository without IRDAI approval is not permitted." },
                    { q: "What is the purpose of Insurance Repositories?", a: "To digitise insurance policies and provide secure, centralised access to policyholders." },
                    { q: "What services do repositories provide?", a: "Key services include: • Policy storage • Policy updates • Account management" },
                    { q: "Do repositories sell insurance policies?", a: "No, they only store and manage policies; they do not sell or advise." },
                    { q: "Is Insurance Repository similar to NSDL/CDSL?", a: "Conceptually yes, but repositories deal with insurance policies instead of securities." },
                    { q: "Can repositories handle insurance claims?", a: "No, claim settlement remains the responsibility of insurers." },
                    { q: "What type of entity can become a repository?", a: "Only companies incorporated in India can apply." },
                    { q: "Is this license suitable for startups?", a: "Yes, if they meet IRDAI eligibility and technical requirements." },
                    { q: "What is policy dematerialisation?", a: "It is the process of converting physical insurance policies into digital form." },
                    { q: "Is repository data legally valid?", a: "Yes, electronic records maintained are legally recognised." },
                    { q: "What is the core function of repository?", a: "Secure storage and servicing of insurance policy data. ###" },
                    { q: "Who can apply for Insurance Repository Registration?", a: "Companies meeting IRDAI eligibility criteria including capital, governance, and infrastructure." },
                    { q: "What is the minimum net worth required?", a: "As per IRDAI guidelines, applicants must maintain prescribed net worth at all times." },
                    { q: "Can LLP apply for repository license?", a: "No, only companies incorporated under Companies Act are eligible." },
                    { q: "Is foreign ownership allowed?", a: "Yes, subject to FDI norms and IRDAI approval." },
                    { q: "What is fit and proper criteria?", a: "Promoters and directors must have: • Clean record • Financial integrity • No regulatory violations" },
                    { q: "Can existing fintech companies apply?", a: "Yes, if they align their structure and meet regulatory conditions." },
                    { q: "Is prior insurance experience required?", a: "Not mandatory but beneficial for approval." },
                    { q: "Can insurers apply for repository license?", a: "Only if permitted under IRDAI regulations." },
                    { q: "Is there a restriction on business activities?", a: "Yes, repository must focus only on permitted activities." },
                    { q: "Can a company hold multiple licenses?", a: "Yes, subject to regulatory approval and compliance separation." },
                    { q: "Is IT infrastructure mandatory?", a: "Yes, strong and secure IT systems are essential." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🛡️", label: "IRDAI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IRDAI Services", href: "/irdai" }, { label: "Insurance Repository Registration" }]}
            title="Insurance Repository Registration in India – Complete 2026 Guide with Critical Compliance Insights"
            readTime="15 min read"
            focusKeyword="Insurance Repository Registration in India"
            sections={sections}
            ctaTitle="Need Expert Help with Insurance Repository Registration?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for Insurance Repository Registration in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Insurance Repository Registration?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Insurance Repository Registration in India is an IRDAI-regulated framework for entities intending to maintain electronic insurance policy records and electronic insurance accounts. The applicant must show technology capability, data security, governance, service standards and insurer integration readiness.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is Insurance Repository Registration in India?</h2>
            <p>Insurance Repository Registration in India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Insurance Regulatory and Development Authority of India</td></tr>
                        <tr><td>Applicable framework</td><td>IRDAI insurance repository framework, Insurance Act and applicable electronic insurance account guidelines.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Technology-backed insurance infrastructure companies, financial service groups and entities planning to operate electronic insurance account and policy record systems should evaluate IRDAI repository registration before launch.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Legal structure</td><td>Eligible company or entity as permitted by IRDAI</td><td>Corporate governance must be strong</td></tr>
                        <tr><td>Technology capability</td><td>Secure repository platform, audit trails and data controls</td><td>Cyber and privacy readiness is critical</td></tr>
                        <tr><td>Capital / net worth</td><td>As prescribed by IRDAI</td><td>Verify latest official schedule</td></tr>
                        <tr><td>Service infrastructure</td><td>Policyholder servicing, insurer connectivity and grievance process</td><td>Operational readiness is examined</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Incorporation documents and constitutional papers</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Technology architecture and security documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Net worth certificate and audited financials</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Promoter / director KYC and fit and proper declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business continuity and disaster recovery plan</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Data privacy, cyber security and access control policies</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Insurer integration and service process note</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>IRDAI application and declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>IRDAI fee</td><td>As prescribed</td><td>To be verified from latest schedule</td></tr>
                        <tr><td>Technology and audit cost</td><td>Commercial / professional cost</td><td>Depends on platform readiness</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on documentation and review</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Technology and eligibility review</td><td>2 to 4 weeks</td><td>System readiness must be assessed</td></tr>
                        <tr><td>Documentation</td><td>4 to 8 weeks</td><td>Policy and architecture notes required</td></tr>
                        <tr><td>IRDAI review</td><td>Several months</td><td>Subject to technical and regulatory scrutiny</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain secure electronic policy records</li>
                <li>Conduct system, cyber and access reviews</li>
                <li>Submit regulatory reports and incident updates</li>
                <li>Maintain grievance and service-level records</li>
                <li>Ensure data retention and insurer coordination controls</li>
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
