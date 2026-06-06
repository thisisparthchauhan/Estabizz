"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is", title: "What NBFC Legal Support Covers" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs Support" },
        { id: "documents", title: "Document Checklist" },
        { id: "process", title: "Support Process" },
        { id: "fees", title: "Fees and Scope" },
        { id: "timeline", title: "Indicative Timeline" },
        { id: "compliance", title: "Ongoing Compliance" },
        { id: "faq", title: "FAQs" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "Reserve Bank of India" },
        { label: "Service Type", value: "NBFC legal and compliance support" },
        { label: "Core Focus", value: "RBI readiness, policies, reporting and advisory" },
        { label: "Review", value: "Expert reviewed" },
    ];

    const faqs = [
        { q: "What are NBFC Legal Support Services in India?", a: "NBFC Legal Support Services help RBI-regulated NBFCs manage documentation, regulatory filings, policy drafting, board governance, customer protection and inspection readiness." },
        { q: "Is NBFC legal support mandatory?", a: "Outsourcing legal support is not mandatory, but RBI compliance is mandatory. Professional support may reduce documentation gaps and delayed responses." },
        { q: "Who needs NBFC legal support?", a: "RBI-registered NBFCs, digital lending NBFCs, NBFC-MFIs, NBFC-ICCs, fintech lending partners and applicants preparing for RBI scrutiny need structured legal support." },
        { q: "Can an NBFC outsource compliance?", a: "Yes, support functions may be outsourced, but the NBFC and its board remain responsible for regulatory compliance." },
        { q: "Does Estabizz guarantee RBI approval or clean inspection?", a: "No. Regulatory outcomes are subject to RBI review, documentation quality and actual compliance readiness." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Compliance Support" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "NBFC Legal Support" }]}
            title="NBFC Legal Support Services in India: Complete RBI Compliance Support Guide"
            readTime="12 min read"
            focusKeyword="NBFC Legal Support Services in India"
            sections={sections}
            ctaTitle="Need NBFC Legal and Compliance Support?"
            ctaDescription="Get structured support for RBI policies, compliance filings, board documents, legal notices, digital lending review and inspection readiness."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-registration-in-india", category: "RBI", title: "NBFC Registration in India", description: "Complete RBI registration guide for new NBFC applicants." },
                { href: "/rbi/rbi-services", category: "RBI", title: "RBI Services", description: "Ongoing licensing and compliance support for RBI-regulated entities." },
                { href: "/rbi/payment-aggregator-license-in-india", category: "RBI", title: "Payment Aggregator Licence", description: "RBI authorisation guide for payment businesses." },
            ]}
            finalCtaTitle="Strengthen Your NBFC Compliance Framework"
            finalCtaDescription="Speak with Estabizz for RBI documentation, policy drafting, query response, compliance calendar and legal advisory support."
        >
            <h2 id="introduction">Introduction</h2>
            <p>NBFC Legal Support Services in India help Non-Banking Financial Companies manage RBI compliance, legal documentation, policy implementation, customer communication, board-level governance and inspection readiness. For an NBFC, legal support is not limited to drafting contracts; it is a continuous compliance discipline linked with RBI Master Directions, KYC, fair practices, digital lending, outsourcing, grievance redressal and regulatory reporting.</p>

            <h2 id="what-is">What NBFC Legal Support Covers</h2>
            <p>NBFC legal support covers RBI-facing documentation, internal policy drafting, loan documentation review, fair practices code implementation, customer grievance documentation, vendor and lending service provider agreements, board notes, regulatory query responses and support during audit or inspection. The exact scope depends on the NBFC category, business model and compliance maturity.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>NBFCs are primarily regulated by the Reserve Bank of India under the RBI Act, 1934, applicable NBFC Master Directions, KYC Master Direction, digital lending guidelines, outsourcing directions, fair practices requirements and other RBI circulars as amended from time to time.</p>
            </div>

            <h2 id="who-needs">Who Needs Support</h2>
            <ul>
                <li>RBI-registered NBFCs requiring ongoing compliance support</li>
                <li>NBFCs preparing for RBI inspection, audit or regulatory queries</li>
                <li>Fintech lending platforms working with NBFC partners</li>
                <li>NBFCs implementing digital lending, LSP or DSA arrangements</li>
                <li>Companies applying for NBFC registration and building policy readiness</li>
            </ul>

            <h2 id="documents">Document Checklist</h2>
            <ul>
                <li>Certificate of Registration and RBI correspondence</li>
                <li>Board-approved policies, including KYC, FPC, outsourcing and grievance redressal</li>
                <li>Loan agreements, sanction letters, key fact statements and customer communication formats</li>
                <li>Statutory records, board minutes, audit reports and compliance certificates</li>
                <li>Digital lending, LSP, DSA and vendor agreements, where applicable</li>
                <li>RBI return filing records and evidence of compliance implementation</li>
            </ul>

            <h2 id="process">Support Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Compliance Gap Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Review business model, RBI category, policies, filings and documentation gaps.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Policy and Document Cleanup</h4><p className="text-[13px] text-[#64748b] !mb-0">Update policies, agreements, board notes and customer-facing formats.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Regulatory Response Support</h4><p className="text-[13px] text-[#64748b] !mb-0">Prepare structured replies to RBI, auditor or internal compliance queries.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Ongoing Compliance Calendar</h4><p className="text-[13px] text-[#64748b] !mb-0">Track filings, policy reviews, board approvals, audit observations and evidence files.</p></div></div>
            </div>

            <h2 id="fees">Fees and Scope</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Scope</th><th>Practical Position</th><th>Note</th></tr></thead>
                    <tbody>
                        <tr><td>One-time document review</td><td>Quoted after scope review</td><td>Depends on number of policies and agreements</td></tr>
                        <tr><td>Monthly compliance support</td><td>Retainer-based</td><td>Depends on NBFC category and transaction complexity</td></tr>
                        <tr><td>RBI query or inspection support</td><td>Case-specific</td><td>Depends on facts, documents and urgency</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Indicative Timeline</h2>
            <p>Initial compliance review may take 1 to 2 weeks. Policy cleanup and documentation support may take 2 to 4 weeks depending on document quality, internal approvals and management inputs. Regulatory query support timelines are case-specific and subject to the query deadline.</p>

            <h2 id="compliance">Ongoing Compliance</h2>
            <ul>
                <li>RBI returns and compliance calendar tracking</li>
                <li>Board and committee documentation</li>
                <li>KYC, AML, FPC and grievance redressal records</li>
                <li>Digital lending and outsourcing controls</li>
                <li>Audit closure evidence and inspection readiness files</li>
            </ul>

            <div className="disclaimer-box">
                <strong>Disclaimer:</strong> This page is for general informational purposes only. RBI requirements may change from time to time. Professional support does not guarantee any regulatory outcome and all matters remain subject to regulatory scrutiny and application facts.
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
