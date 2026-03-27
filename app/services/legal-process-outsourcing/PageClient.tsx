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
        { label: "Regulator", value: "Legal" },
        { label: "Service Type", value: "Legal Process Outsourcing" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
                    { q: "What is Legal Process Outsourcing (LPO)?", a: "Legal Process Outsourcing (LPO) refers to outsourcing legal services to specialised firms. These services include: • Legal research • Contract drafting • Compliance support" },
                    { q: "Is LPO legal in India?", a: "Yes, LPO is legal in India. However: • It must not involve practising Indian law without qualification • Must comply with Bar Council of India norms" },
                    { q: "What services are covered under LPO?", a: "LPO services include: • Document review • Legal drafting • Due diligence • Compliance management" },
                    { q: "Who typically uses LPO services?", a: "LPO services are used by: • Law firms • Corporates • Startups • International legal entities" },
                    { q: "What is the objective of LPO?", a: "The primary objective is cost efficiency and scalability by: • Reducing legal costs • Improving turnaround time • Accessing specialised talent" },
                    { q: "Is LPO same as legal consultancy?", a: "No, LPO focuses on backend legal support, whereas consultancy involves advisory and representation." },
                    { q: "Can Indian companies provide LPO services globally?", a: "Yes, Indian LPO firms can serve global clients subject to: • Data protection laws • Cross-border regulations" },
                    { q: "Is LPO regulated by any specific authority?", a: "No dedicated regulator exists, but it is governed indirectly by: • Bar Council of India • IT laws • Contract laws" },
                    { q: "What is the difference between LPO and BPO?", a: "LPO handles legal services, while BPO handles general business processes." },
                    { q: "Why is India a preferred LPO destination?", a: "India offers: • Skilled legal professionals • Cost advantage • English proficiency" },
                    { q: "What type of legal work is outsourced?", a: "Common outsourced work includes: • Contract lifecycle management • Litigation support • IP services" },
                    { q: "Is LPO considered part of the legal profession?", a: "Partially. Backend support is allowed, but direct legal practice is restricted." },
                    { q: "Can non-lawyers work in LPO firms?", a: "Yes, for roles like: • Process management • Data analysis • Legal support functions" },
                    { q: "What industries rely heavily on LPO?", a: "Industries include: • Banking & Finance • IT & Software • Insurance • Healthcare" },
                    { q: "Is LPO suitable for startups?", a: "Yes, startups benefit through: • Reduced legal costs • Access to expert support" },
                    { q: "What is offshore LPO?", a: "Offshore LPO refers to outsourcing legal work to another country, commonly India." },
                    { q: "What is onshore LPO?", a: "Onshore LPO refers to outsourcing within the same country." },
                    { q: "Is confidentiality important in LPO?", a: "Yes, it is critical. As per regulatory guidelines: • Data protection agreements are mandatory" },
                    { q: "Can LPO firms represent clients in court?", a: "No, only licensed advocates can represent clients in court." },
                    { q: "Is LPO growing in India?", a: "Yes, due to: • Increasing global demand • Digital legal transformation Section 2: Eligibility & Applicability" },
                    { q: "Who can start an LPO business in India?", a: "Any individual or entity can start LPO subject to: • Business registration • Compliance with applicable laws" },
                    { q: "Is a law degree mandatory to start an LPO?", a: "No, but having legal professionals is essential for service delivery ." },
                    { q: "Can a foreign company start LPO in India?", a: "Yes, under applicable FDI norms and company law provisions." },
                    { q: "What business structures are allowed for LPO?", a: "Common structures include: • Private Limited Company • LLP • Partnership" },
                    { q: "Is GST registration required for LPO?", a: "Yes, if turnover exceeds the threshold or for export services." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "⚖️", label: "Legal" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Legal Process Outsourcing" }]}
            title="Legal Process Outsourcing Services in India: Complete 2026 Guide for Businesses & Law Firms"
            readTime="15 min read"
            focusKeyword="Legal Process Outsourcing"
            sections={sections}
            ctaTitle="Need Expert Help with Legal Process Outsourcing?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Legal Process Outsourcing."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Legal Process Outsourcing?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>s a strategic solution for law firms, corporates, and global businesses seeking cost-efficient, scalable, and compliance-driven legal support. In today’s highly regulated environment, organisations ar</p>

            <h2 id="what-is">What is Legal Process Outsourcing</h2>
            <p>This page provides comprehensive information about Legal Process Outsourcing including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of Legal. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Legal Process Outsourcing include entities operating in the regulated financial services sector.</p>

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
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Legal Process Outsourcing.</p></div>
            )}
        </ServicePageLayout>
    );
}
