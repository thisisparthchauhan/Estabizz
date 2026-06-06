"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is", title: "What is Underwriter Registration" },
        { id: "regulatory-framework", title: "SEBI Framework" },
        { id: "who-needs", title: "Who Needs Registration" },
        { id: "eligibility", title: "Eligibility Criteria" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Registration Process" },
        { id: "fees", title: "Fees and Net Worth" },
        { id: "timeline", title: "Timeline" },
        { id: "compliance", title: "Post-Registration Compliance" },
        { id: "faq", title: "FAQs" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "SEBI" },
        { label: "Framework", value: "SEBI Underwriters Regulations" },
        { label: "Applicant", value: "Eligible body corporate / institution" },
        { label: "Review", value: "Expert reviewed" },
    ];

    const faqs = [
        { q: "What is SEBI Underwriter Registration in India?", a: "It is SEBI registration for eligible entities that undertake underwriting obligations in securities issuances." },
        { q: "Is SEBI registration mandatory for underwriting?", a: "Yes. A person cannot act as an underwriter in India without SEBI registration, unless specifically exempt under applicable law." },
        { q: "Who regulates underwriters in India?", a: "Underwriters are regulated by the Securities and Exchange Board of India." },
        { q: "What does an underwriter do?", a: "An underwriter commits to subscribe to securities if an issue is not fully subscribed, subject to the underwriting agreement." },
        { q: "Does registration guarantee business from issuers?", a: "No. Registration permits the regulated activity, but business depends on issuer relationships, capability and market conditions." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Capital Market Intermediary" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Underwriter Registration" }]}
            title="SEBI Underwriter Registration in India: Eligibility, Process and Compliance Guide"
            readTime="12 min read"
            focusKeyword="SEBI Underwriter Registration in India"
            sections={sections}
            ctaTitle="Need SEBI Underwriter Registration Support?"
            ctaDescription="Get structured assistance for eligibility review, net worth documentation, SEBI application preparation, policy drafting and query response."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/sebi/rta-registration-in-india", category: "SEBI", title: "RTA Registration", description: "Related SEBI intermediary framework for issue and investor records." },
                { href: "/sebi/stock-broker-registration-in-india", category: "SEBI", title: "Stock Broker Registration", description: "SEBI and exchange-level registration for broking entities." },
                { href: "/sebi/aif-registration-in-india", category: "SEBI", title: "AIF Registration", description: "SEBI registration guide for alternative investment funds." },
            ]}
            finalCtaTitle="Prepare Your SEBI Underwriter Application with Discipline"
            finalCtaDescription="Speak with Estabizz for eligibility assessment, documents, application support and post-registration compliance planning."
        >
            <h2 id="introduction">Introduction</h2>
            <p>SEBI Underwriter Registration in India is required for eligible entities intending to undertake underwriting activities in securities issuances. Underwriting involves a financial commitment to subscribe to unsubscribed securities under an underwriting agreement, making it a regulated capital market activity requiring net worth strength, fit and proper status, documentation discipline and SEBI scrutiny.</p>

            <h2 id="what-is">What is Underwriter Registration</h2>
            <p>Underwriter registration authorises an eligible applicant to act as an underwriter for public issues, rights issues or other securities issuances where underwriting is permitted. The underwriter assumes subscription risk and must maintain records, agreements, books of account and compliance controls as prescribed.</p>

            <h2 id="regulatory-framework">SEBI Framework</h2>
            <div className="info-box">
                <p>The framework is governed by SEBI regulations for underwriters, the SEBI Act, 1992, SEBI Intermediaries Regulations, 2008 and applicable circulars or schedules as amended from time to time. Fee amounts and net worth requirements should be verified from the latest official SEBI schedule before filing.</p>
            </div>

            <h2 id="who-needs">Who Needs Registration</h2>
            <ul>
                <li>Entities planning to underwrite securities issues</li>
                <li>Financial institutions entering capital market underwriting activity</li>
                <li>Merchant banking or securities market groups adding underwriting capability</li>
                <li>Companies intending to participate in issue subscription risk arrangements</li>
            </ul>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <ul>
                <li>Applicant should be an eligible legal entity permitted under the SEBI framework</li>
                <li>Promoters, directors and key persons should satisfy fit and proper criteria</li>
                <li>Prescribed net worth and financial soundness must be maintained</li>
                <li>Adequate infrastructure, experienced personnel and internal controls are expected</li>
                <li>The applicant should have proper books, records and compliance systems</li>
            </ul>

            <h2 id="documents">Documents Required</h2>
            <ul>
                <li>Incorporation documents, MOA, AOA and PAN</li>
                <li>Board resolution approving SEBI underwriter application</li>
                <li>Net worth certificate and audited financial statements</li>
                <li>Promoter, director and key person KYC with fit and proper declarations</li>
                <li>Business plan, underwriting risk policy and internal control framework</li>
                <li>Infrastructure details, compliance officer details and prescribed declarations</li>
            </ul>

            <h2 id="process">Registration Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Eligibility Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Review legal structure, net worth, fit and proper status and business plan.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Documentation</h4><p className="text-[13px] text-[#64748b] !mb-0">Prepare forms, declarations, policies, financial records and supporting documents.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>SEBI Filing and Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Submit application and respond to SEBI observations or clarifications.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Certificate and Compliance Setup</h4><p className="text-[13px] text-[#64748b] !mb-0">Complete fee payment, registration formalities and ongoing compliance setup.</p></div></div>
            </div>

            <h2 id="fees">Fees and Net Worth</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particular</th><th>Position</th><th>Verification Note</th></tr></thead>
                    <tbody>
                        <tr><td>Application fee</td><td>As prescribed by SEBI</td><td>Verify latest SEBI fee schedule</td></tr>
                        <tr><td>Registration fee</td><td>As prescribed by SEBI</td><td>Payable subject to approval stage</td></tr>
                        <tr><td>Net worth</td><td>Prescribed under applicable framework</td><td>Verify latest official regulation before filing</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Timeline</h2>
            <p>The registration timeline is indicative and may range from a few months depending on documentation quality, SEBI scrutiny, query rounds, net worth readiness and application facts. No approval timeline should be treated as guaranteed.</p>

            <h2 id="compliance">Post-Registration Compliance</h2>
            <ul>
                <li>Maintain prescribed net worth and fit and proper status</li>
                <li>Execute proper underwriting agreements</li>
                <li>Maintain books, records and issue-wise underwriting documents</li>
                <li>Submit reports and information as required by SEBI</li>
                <li>Cooperate with inspection, inquiry or regulatory review</li>
            </ul>

            <div className="disclaimer-box">
                <strong>Disclaimer:</strong> This content is for general information only and should not be treated as legal or regulatory advice. SEBI requirements, forms, fees and eligibility norms may change from time to time.
            </div>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-3 my-6">
                {faqs.map((item, i) => (
                    <details key={i} className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                        <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                            <span>{item.q}</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">{item.a}</div>
                    </details>
                ))}
            </div>
        </ServicePageLayout>
    );
}
