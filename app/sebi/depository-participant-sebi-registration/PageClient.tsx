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
        { label: "Service Type", value: "Depository Participant Sebi Registration" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is a Depository Participant (DP) in India?", a: "A Depository Participant is an intermediary registered with SEBI that enables investors to hold and transact securities in demat form through depositories like NSDL or CDSL." },
                    { q: "Is SEBI registration mandatory to become a Depository Participant?", a: "Yes, it is mandatory. No entity can act as a DP without obtaining registration from SEBI under applicable regulations." },
                    { q: "What is the role of a Depository Participant?", a: "A DP acts as an agent of the depository. Key roles include: • Opening demat accounts • Facilitating securities transfers • Maintaining investor records" },
                    { q: "What is a demat account and how is it linked to a DP?", a: "A demat account holds securities electronically and is opened through a DP, who acts as the interface between investor and depository." },
                    { q: "Which depositories operate in India?", a: "India has two main depositories: • NSDL (National Securities Depository Limited) • CDSL (Central Depository Services Limited)" },
                    { q: "Who regulates Depository Participants in India?", a: "Depository Participants are regulated by SEBI under Depositories and Participants Regulations." },
                    { q: "Can an individual become a Depository Participant?", a: "No, only eligible entities such as banks, NBFCs, brokers, and financial institutions can apply." },
                    { q: "What is the primary objective of the DP system?", a: "The objective is to facilitate safe, efficient, and paperless securities transactions." },
                    { q: "Is DP registration required for stock brokers ?", a: "Yes, stock brokers must obtain separate DP registration if they wish to offer depository services." },
                    { q: "What services does a DP provide to investors?", a: "Services include: • Demat account opening • Transfer of securities • Pledge/hypothecation services" },
                    { q: "What is the difference between a depository and a DP?", a: "A depository holds securities, while a DP acts as an intermediary providing access to investors." },
                    { q: "Can a DP operate without being linked to a depository?", a: "No, a DP must be associated with either NSDL or CDSL." },
                    { q: "Is DP registration valid across India?", a: "Yes, once registered, a DP can operate across India subject to compliance." },
                    { q: "What is BO (Beneficial Owner) account?", a: "A BO account is a demat account held by investors with a DP." },
                    { q: "Is DP registration required for fintech platforms?", a: "Yes, if fintechs offer demat-related services, DP registration is required. Section 2: Eligibility & Applicability" },
                    { q: "Who is eligible to apply for DP registration?", a: "Eligible entities include: • Banks • NBFCs • Stock brokers • Financial institutions" },
                    { q: "Is net worth requirement applicable for DP registration?", a: "Yes, SEBI prescribes minimum net worth criteria depending on category." },
                    { q: "Can an NBFC apply for DP registration?", a: "Yes, NBFCs can apply subject to meeting SEBI eligibility norms." },
                    { q: "Can a company apply without prior financial experience?", a: "No, relevant financial experience is generally expected by SEBI." },
                    { q: "Is prior SEBI registration required?", a: "Not mandatory, but entities like brokers may already be registered." },
                    { q: "Can a startup become a DP?", a: "Yes, provided it meets capital, infrastructure, and compliance requirements." },
                    { q: "Is there any restriction on foreign entities?", a: "Yes, foreign entities must comply with FDI and SEBI guidelines." },
                    { q: "What qualifications are required for directors?", a: "Directors must be fit and proper persons as per SEBI norms." },
                    { q: "Is infrastructure mandatory for DP registration?", a: "Yes, adequate IT systems and operational infrastructure are required." },
                    { q: "Can a partnership firm apply?", a: "Generally, corporate entities are preferred under SEBI regulations." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📈", label: "SEBI" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Depository Participant Sebi Registration" }]}
            title="Depository Participant SEBI Registration in India – Complete Powerful Guide for 2026"
            readTime="15 min read"
            focusKeyword="Depository Participant SEBI Registration in India"
            sections={sections}
            ctaTitle="Need Expert Help with Depository Participant Sebi Registration?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Depository Participant SEBI Registration in India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Depository Participant Sebi Registration?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>s a critical regulatory requirement for entities intending to act as an intermediary between investors and depositories such as NSDL or CDSL. In today’s digital securities ecosystem, where demateriali</p>

            <h2 id="what-is">What is Depository Participant Sebi Registration</h2>
            <p>This page provides comprehensive information about Depository Participant SEBI Registration in India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of SEBI. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Depository Participant SEBI Registration in India include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Depository Participant SEBI Registration in India.</p></div>
            )}
        </ServicePageLayout>
    );
}
