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
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for REIT Registration India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Reit Registration?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>egulated Real Estate Investment Trusts REIT Registration India is the regulatory approval required from SEBI to establish and operate a Real Estate Investment Trust that pools investor funds for incom</p>

            <h2 id="what-is">What is Reit Registration</h2>
            <p>This page provides comprehensive information about REIT Registration India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of SEBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require REIT Registration India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about REIT Registration India.</p></div>
            )}
        </ServicePageLayout>
    );
}
