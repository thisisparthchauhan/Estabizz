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
                    { q: "Who regulates NBFC takeover?", a: "The Reserve Bank of India regulates NBFC takeovers. Section 2: Eligibility & Applicability" },
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
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for NBFC Takeover in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Nbfc Takeover?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>te 2026 guide for promoters. NBFC Takeover in India: Complete Expert Guide with Process, RBI Rules & Critical Compliance Insights (2026) 🟢 Introduction NBFC Takeover in India is a highly regulated tra</p>

            <h2 id="what-is">What is Nbfc Takeover</h2>
            <p>This page provides comprehensive information about NBFC Takeover in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of RBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require NBFC Takeover in India include entities operating in the regulated financial services sector.</p>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <p>Eligibility requirements are defined by the relevant regulatory authority. Key criteria include entity type, capital requirements, and fit & proper standards for directors/promoters.</p>

            <h2 id="documents">Documents Required</h2>
            <ul>
                <li>Certificate of Incorporation</li>
                <li>Memorandum and Articles of Association</li>
                <li>Net Worth Certificate (CA certified)</li>
                <li>Business Plan</li>
                <li>KYC documents for Directors</li>
                <li>Board Resolution</li>
            </ul>

            <h2 id="process">Registration Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Preparation & Documentation</h4><p className="text-[13px] text-[#64748b] !mb-0">Gather all required documents and ensure eligibility criteria are met.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Application Filing</h4><p className="text-[13px] text-[#64748b] !mb-0">Submit the complete application to the regulatory authority with supporting documents.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Regulatory Review</h4><p className="text-[13px] text-[#64748b] !mb-0">The regulatory authority reviews the application and may seek clarifications.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Approval & Compliance Setup</h4><p className="text-[13px] text-[#64748b] !mb-0">Upon approval, set up compliance framework and begin operations.</p></div></div>
            </div>

            <h2 id="fees">Fees Structure</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Particulars</th><th>Amount</th><th>Remarks</th></tr></thead>
                    <tbody>
                        <tr><td>Regulatory Application Fee</td><td>As prescribed</td><td>Non-refundable</td></tr>
                        <tr><td>Professional/Advisory Fees</td><td>Variable</td><td>Depends on scope</td></tr>
                        <tr><td>Compliance Setup Cost</td><td>Variable</td><td>One-time</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Estimated Time</th><th>Notes</th></tr></thead>
                    <tbody>
                        <tr><td>Document Preparation</td><td>2–4 weeks</td><td>Depends on complexity</td></tr>
                        <tr><td>Regulatory Review</td><td>3–6 months</td><td>Case-by-case</td></tr>
                        <tr><td>Approval</td><td>1–2 months</td><td>After compliance confirmation</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="compliance">Compliance Requirements</h2>
            <p>Post-registration compliance is critical to maintain the license/registration in good standing.</p>
            <ul>
                <li>Regular filings and returns</li>
                <li>Governance and board oversight</li>
                <li>Annual audit and reporting</li>
                <li>KYC/AML compliance</li>
                <li>Customer grievance redressal</li>
            </ul>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about NBFC Takeover in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
