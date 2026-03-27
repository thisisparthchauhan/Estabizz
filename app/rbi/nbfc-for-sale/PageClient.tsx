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
        { label: "Service Type", value: "Nbfc For Sale" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What does “NBFC for sale” mean in India?", a: "It means purchasing an existing RBI-registered NBFC instead of applying for a new licence . This is typically done through share acquisition or takeover." },
                    { q: "Why do businesses prefer buying an NBFC instead of registering a new one?", a: "Buying an NBFC saves time and regulatory effort. Key benefits include: • Immediate operational readiness • Avoiding long RBI approval timelines • Existing compliance structure" },
                    { q: "Is purchasing an NBFC legal in India?", a: "Yes, it is legal, provided RBI approval is obtained for change in control and shareholding, as per regulatory guidelines." },
                    { q: "What is a “ready-made NBFC”?", a: "A ready-made NBFC is an already incorporated and RBI-registered entity available for takeover with no or minimal operations." },
                    { q: "Who regulates NBFC sales in India?", a: "The Reserve Bank of India (RBI) regulates all NBFC ownership changes under its Master Directions and approval framework." },
                    { q: "Can a startup buy an NBFC?", a: "Yes, startups can acquire NBFCs if they meet fit and proper criteria and obtain RBI approval." },
                    { q: "What types of NBFCs are available for sale?", a: "Common types include: • NBFC-ICC (Investment & Credit Company) • NBFC-MFI • NBFC-Factor • Core Investment Company" },
                    { q: "Does buying an NBFC mean automatic RBI approval?", a: "No, RBI approval is mandatory before completing the transaction." },
                    { q: "What is the minimum capital requirement for an NBFC?", a: "As per current regulations, the minimum Net Owned Fund (NOF) is ₹10 crore." },
                    { q: "Can I operate immediately after buying an NBFC?", a: "Only after RBI approval and completion of share transfer and compliance formalities." },
                    { q: "What is change in control in NBFC acquisition?", a: "It refers to transfer of ownership or management requiring prior RBI approval." },
                    { q: "Is NBFC acquisition faster than new registration?", a: "Yes, acquisition is significantly faster compared to fresh licensing." },
                    { q: "Can foreign investors buy an NBFC in India?", a: "Yes, subject to FEMA and RBI regulations." },
                    { q: "Is due diligence required before buying an NBFC?", a: "Absolutely. Financial, legal, and regulatory due diligence is critical." },
                    { q: "What is the main advantage of buying a dormant NBFC?", a: "Lower compliance risk and clean track record. Section 2: Eligibility & Applicability" },
                    { q: "Who can buy an NBFC in India?", a: "Individuals, companies, or investors meeting RBI fit and proper criteria." },
                    { q: "What is the “fit and proper” criteria?", a: "It includes: • Clean financial track record • No criminal background • Relevant experience" },
                    { q: "Can a foreign company acquire an NBFC?", a: "Yes, subject to FDI norms and RBI approval." },
                    { q: "Is prior experience in finance required?", a: "Not mandatory but preferred for RBI approval." },
                    { q: "Can a partnership firm acquire an NBFC?", a: "No, NBFC must be held by a company structure." },
                    { q: "Can directors be changed after acquisition?", a: "Yes, but RBI approval is required." },
                    { q: "Can a fintech startup acquire an NBFC?", a: "Yes, many fintechs use this route for lending operations." },
                    { q: "Is there any net worth requirement for buyers?", a: "Yes, buyers must demonstrate financial strength." },
                    { q: "Can multiple investors jointly acquire an NBFC?", a: "Yes, subject to approval and shareholding structure." },
                    { q: "Can I buy an NBFC without RBI approval?", a: "No, it is strictly prohibited." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "Nbfc For Sale" }]}
            title="( Optimised with Power Word + Number + Sentiment) NBFC for Sale in India: 2026 Ultimate Guide to Buy NBFC Safely & Legally 🔗 Permalink ("
            readTime="15 min read"
            focusKeyword="NBFC for Sale in India"
            sections={sections}
            ctaTitle="Need Expert Help with Nbfc For Sale?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for NBFC for Sale in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Nbfc For Sale?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>inesses looking to enter the financial services sector quickly without going through the lengthy RBI registration process. In today’s regulatory environment, acquiring an existing NBFC can significant</p>

            <h2 id="what-is">What is Nbfc For Sale</h2>
            <p>This page provides comprehensive information about NBFC for Sale in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of RBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require NBFC for Sale in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about NBFC for Sale in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
