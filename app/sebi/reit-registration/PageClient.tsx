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
        { label: "Service Type", value: "Reit Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is a REIT in India?", a: "A REIT (Real Estate Investment Trust) is a SEBI-regulated investment vehicle that allows investors to invest in income-generating real estate assets such as commercial properties." },
                    { q: "Who regulates REITs in India?", a: "REITs are regulated by the Securities and Exchange Board of India under SEBI (REIT) Regulations." },
                    { q: "What is REIT registration?", a: "REIT registration is the process of obtaining approval from SEBI to set up and operate a Real Estate Investment Trust in India." },
                    { q: "What is the objective of REITs?", a: "The primary objective is to pool investor funds and generate regular income through rental or lease income from real estate assets." },
                    { q: "What type of properties can REITs invest in?", a: "REITs typically invest in: • Commercial properties • Office spaces • Shopping malls • Warehousing assets" },
                    { q: "Is REIT registration mandatory to operate in India?", a: "Yes, it is mandatory. As per applicable regulations, no entity can operate as a REIT without SEBI registration." },
                    { q: "How do REITs generate returns?", a: "REITs generate returns through: • Rental income • Lease agreements • Capital appreciation" },
                    { q: "What is the structure of a REIT?", a: "A REIT typically includes: • Sponsor • Trustee • Manager • Special Purpose Vehicles (SPVs)" },
                    { q: "What is the minimum asset requirement for REIT?", a: "As per regulatory guidelines, the minimum asset value is generally ₹500 crore." },
                    { q: "What is the role of a REIT manager?", a: "The manager is responsible for: • Investment decisions • Asset management • Regulatory compliance" },
                    { q: "What is a sponsor in REIT?", a: "The sponsor sets up the REIT and contributes initial assets and capital." },
                    { q: "What is a trustee in REIT?", a: "The trustee holds REIT assets in trust and ensures compliance with regulations." },
                    { q: "What is the minimum public holding in REIT?", a: "At least 25% of units must be held by the public as per SEBI norms." },
                    { q: "Who can apply for REIT registration?", a: "Entities meeting SEBI criteria such as sponsors, managers, and trustees can apply for REIT registration." },
                    { q: "What is the eligibility of a REIT sponsor?", a: "The sponsor must: • Have net worth requirements • Possess real estate experience • Hold minimum unit contribution" },
                    { q: "What is the eligibility for REIT manager?", a: "The manager must: • Have professional experience • Meet net worth criteria • Have qualified personnel" },
                    { q: "Can foreign entities invest in REITs?", a: "Yes, foreign investors can invest subject to FEMA and SEBI regulations." },
                    { q: "Is prior real estate experience mandatory?", a: "Yes, sponsors must have relevant experience in real estate development or management." },
                    { q: "What is the minimum net worth for REIT manager?", a: "As per guidelines, the manager must have a minimum net worth of ₹10 crore." },
                    { q: "Can an individual apply for REIT registration?", a: "No, REITs are institutional structures and cannot be registered by individuals alone." },
                    { q: "What type of assets are eligible for REIT?", a: "Only completed and income-generating assets are eligible." },
                    { q: "Can residential properties be included in REIT?", a: "Generally, REITs focus on commercial properties; residential assets are limited." },
                    { q: "Is leverage allowed in REITs?", a: "Yes, but within limits prescribed by SEBI regulations." },
                    { q: "Can startups apply for REIT registration?", a: "No, REIT requires substantial asset base and experience, making it unsuitable for early-stage startups." },
                    { q: "What is the minimum number of investors required?", a: "At least 200 investors are required for listing." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Reit Registration" }]}
            title="REIT Registration India: Complete 2026 Guide with Powerful Insights, Eligibility & SEBI Compliance"
            readTime="15 min read"
            focusKeyword="REIT Registration India"
            sections={sections}
            ctaTitle="Need Expert Help with Reit Registration?"
            ctaDescription="Estabizz provides structured advisory, documentation and compliance support for REIT Registration India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Reit Registration?"
            finalCtaDescription="Speak with Estabizz to evaluate applicability, documentation gaps, timeline and compliance readiness before proceeding."
        >
            <h2 id="introduction">Introduction</h2>
            <p>REIT Registration India is the SEBI registration required to establish and operate a Real Estate Investment Trust that pools investor funds for income-generating real estate assets. The applicant must structure sponsor, trustee, manager, asset ownership, valuation, disclosures and listing readiness in line with SEBI requirements.</p>
            <p>Estabizz assists clients with practical regulatory interpretation, documentation, filing readiness and post-approval compliance planning. Approval, registration or acceptance always remains subject to the applicable regulator, exchange, authority or reviewing institution.</p>

            <h2 id="what-is">What is REIT Registration India?</h2>
            <p>REIT Registration India is a specialised compliance and advisory area that must be evaluated according to the applicant's legal structure, business model, documentation quality and applicable regulatory framework. In simple terms, it helps the applicant operate, report or structure the activity with clearer regulatory evidence.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Details</th></tr></thead>
                    <tbody>
                        <tr><td>Regulator / Authority</td><td>Securities and Exchange Board of India</td></tr>
                        <tr><td>Applicable framework</td><td>SEBI REIT Regulations, SEBI Act, listing framework and applicable SEBI circulars.</td></tr>
                        <tr><td>Regulatory approach</td><td>Requirements must be verified from latest law, circulars, directions, portal process and regulator guidance before filing.</td></tr>
                        <tr><td>Approval position</td><td>Subject to regulatory scrutiny, documentation quality and applicable eligibility.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="who-needs">Who Needs This Service?</h2>
            <p>Real estate groups, institutional sponsors, asset managers, commercial property owners and investment platforms planning a listed REIT structure should evaluate SEBI registration and listing readiness before investor mobilisation.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Sponsor</td><td>Experience, net worth and unit holding requirements</td><td>Sponsor track record is material</td></tr>
                        <tr><td>Manager</td><td>Professional team, net worth and asset management capability</td><td>Manager governance is reviewed</td></tr>
                        <tr><td>Trustee</td><td>Independent trustee arrangement</td><td>Investor protection role is important</td></tr>
                        <tr><td>Assets</td><td>Completed, income-generating real estate assets as prescribed</td><td>Asset quality and valuation matter</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="documents">Documents Required</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Purpose</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Sponsor and manager incorporation documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Trust deed and trustee documents</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Asset title, lease and valuation records</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Financial statements and net worth certificates</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Sponsor / manager fit and proper declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Business plan and asset management strategy</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>Draft offer / listing documents, where applicable</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
                        <tr><td>SEBI application and supporting declarations</td><td>Supports application, review or compliance evidence</td><td>Final checklist depends on facts, regulator process and latest requirements</td></tr>
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
                        <tr><td>SEBI fees</td><td>As prescribed under SEBI REIT framework</td><td>Verify latest official schedule</td></tr>
                        <tr><td>Valuation and listing costs</td><td>Depends on asset and exchange process</td><td>External professional cost applies</td></tr>
                        <tr><td>Professional fees</td><td>Scope-based</td><td>Depends on transaction structure</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Indicative Timeline</th><th>Practical Note</th></tr></thead>
                    <tbody>
                        <tr><td>Structuring and due diligence</td><td>4 to 8 weeks</td><td>Asset data drives timeline</td></tr>
                        <tr><td>SEBI application preparation</td><td>4 to 6 weeks</td><td>Trust and manager documents required</td></tr>
                        <tr><td>SEBI review and listing process</td><td>Several months</td><td>Subject to SEBI and exchange scrutiny</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box"><p>Timelines are indicative and depend on documentation quality, authority review, portal availability, query rounds and business-specific facts.</p></div>

            <h2 id="compliance">Compliance Requirements</h2>
            <ul>
                <li>Maintain asset valuation and disclosure records</li>
                <li>Follow distribution and leverage norms</li>
                <li>Submit periodic reports and investor disclosures</li>
                <li>Maintain trustee and manager governance records</li>
                <li>Track material changes and related-party transactions</li>
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
