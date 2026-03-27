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
        { label: "Service Type", value: "Social Stock Exchange License" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is Social Stock Exchange License in India?", a: "It is a SEBI-regulated framework allowing social enterprises and NGOs to raise funds through stock exchanges. It ensures transparency, governance, and impact reporting." },
                    { q: "Who regulates the Social Stock Exchange in India?", a: "It is regulated by SEBI. Stock exchanges like NSE and BSE operate SSE segments under SEBI supervision." },
                    { q: "What is the main purpose of SSE?", a: "The purpose is to enable structured fundraising for social impact organisations with high transparency and accountability." },
                    { q: "Is SSE a separate stock exchange?", a: "No, it is a segment within existing exchanges like NSE and BSE." },
                    { q: "What type of entities can register under SSE?", a: "Eligible entities include: • Non-Profit Organisations (NPOs) • For-Profit Social Enterprises" },
                    { q: "Is Social Stock Exchange License mandatory in India?", a: "No, it is optional. However, it is mandatory if you want to raise funds via SSE." },
                    { q: "What is Zero Coupon Zero Principal instrument?", a: "It is a donation-based instrument where no interest or principal repayment is required." },
                    { q: "Can individuals invest in SSE?", a: "Yes, investors including individuals and institutions can participate in SSE instruments." },
                    { q: "What is social impact in SSE context?", a: "It refers to measurable positive outcomes created for society, such as education, health, or environment." },
                    { q: "Is SSE similar to IPO?", a: "No, SSE focuses on social impact, whereas IPO focuses on profit-driven capital raising." },
                    { q: "Can startups apply for SSE?", a: "Yes, if they qualify as social enterprises with measurable impact." },
                    { q: "What sectors are eligible under SSE?", a: "Key sectors include: • Education • Healthcare • Environment • Rural development" },
                    { q: "Can trusts apply for SSE?", a: "Yes, trusts are eligible if they meet compliance requirements." },
                    { q: "What is SSE listing?", a: "It is registration of an entity on SSE platform for fundraising." },
                    { q: "What is impact reporting?", a: "It is reporting measurable outcomes of social activities conducted. ### Section 2: Eligibility & Applicability" },
                    { q: "Who is eligible for Social Stock Exchange License?", a: "Entities eligible include: • Trusts • Societies • Section 8 companies • Social enterprises" },
                    { q: "Do we need 80G registration for SSE?", a: "Yes, it enhances credibility and enables tax benefits for donors." },
                    { q: "Can private limited companies apply?", a: "Yes, if they qualify as for-profit social enterprises." },
                    { q: "What is primary condition for eligibility?", a: "The entity must have social intent as its primary objective." },
                    { q: "Is track record required for SSE?", a: "While not mandatory, 1–3 years of track record is recommended." },
                    { q: "Can foreign NGOs apply for SSE?", a: "No, unless registered under Indian laws." },
                    { q: "Can NGOs without audit apply?", a: "No, audited financial statements are mandatory." },
                    { q: "Is CSR registration required?", a: "Not mandatory, but beneficial for funding opportunities." },
                    { q: "Can loss-making companies apply?", a: "Yes, if social impact is primary objective." },
                    { q: "What is meant by social enterprise?", a: "An entity focused on solving social problems with measurable impact." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Social Stock Exchange License" }]}
            title="Social Stock Exchange License in India – Complete 2026 Guide for NGOs & Social Enterprises"
            readTime="15 min read"
            focusKeyword="Regulatory Compliance"
            sections={sections}
            ctaTitle="Need Expert Help with Social Stock Exchange License?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Regulatory Compliance."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Social Stock Exchange License?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>ck Exchange License in India Social Stock Exchange License is a regulatory framework introduced by SEBI to enable non-profit organisations (NPOs) and social enterprises to raise funds through capital </p>

            <h2 id="what-is">What is Social Stock Exchange License</h2>
            <p>This page provides comprehensive information about Regulatory Compliance including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of SEBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Regulatory Compliance include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Regulatory Compliance.</p></div>
            )}
        </ServicePageLayout>
    );
}
