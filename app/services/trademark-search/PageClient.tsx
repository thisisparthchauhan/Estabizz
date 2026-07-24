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
        { label: "Regulator", value: "IP" },
        { label: "Service Type", value: "Trademark Search" },
        { label: "Updated", value: "2026" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const faqs: { q: string; a: string }[] = [
        { q: "What is a trademark search and why is it necessary?", a: "A trademark search is a systematic check of existing trademark registrations and pending applications in the Trade Marks Registry database to determine whether a proposed mark is available for use and registration. It is essential to avoid infringement of existing trademarks, rejection of your application on relative grounds, and costly rebranding after investment in brand building." },
        { q: "Where is the trademark search database in India?", a: "The official database is the IP India Trade Marks Public Search portal maintained by the Office of the Controller General of Patents, Designs and Trade Marks (CGPDTM), Ministry of Commerce & Industry. All registered and applied trademarks in India are searchable on this portal under their respective Nice Classification classes." },
        { q: "What is the Nice Classification system for trademarks?", a: "The Nice Classification (NCL) is an international classification system of goods and services for trademark registration purposes. It has 45 classes: Classes 1-34 cover goods and Classes 35-45 cover services. A trademark application must specify the class(es) under which the goods/services fall. A mark registered in Class 9 (electronics) does not automatically protect the same mark in Class 25 (clothing)." },
        { q: "What types of trademark searches should I conduct?", a: "A thorough trademark clearance involves: (1) Identical mark search — searching the exact proposed mark; (2) Phonetically similar search — marks that sound similar; (3) Visually similar search — marks that look alike; (4) Conceptually similar search — marks with the same meaning or idea; (5) Common law search — unregistered marks being used in commerce; (6) Domain name and social media handle check." },
        { q: "What happens if my trademark search reveals a conflict?", a: "If the search reveals a similar registered mark in the same or related class, the options are: (1) Modify the proposed mark to make it sufficiently distinct; (2) Apply for trademark registration in non-conflicting classes only; (3) Negotiate a coexistence agreement with the existing mark owner; (4) Apply to get the conflicting mark cancelled if it has been abandoned or not used for 5 years; (5) Consider rebranding entirely if the conflict is too close." },
        { q: "How long does a trademark search take in India?", a: "A basic identical mark search on the IP India portal can be done in minutes. A comprehensive clearance search covering similar marks, phonetic equivalents, and all relevant classes typically takes 2-5 business days when conducted by a trademark attorney. This includes review of conflicting marks and a legal opinion on the risk of registration." },
        { q: "Is a trademark search the same as trademark registration?", a: "No. A trademark search is a pre-registration due diligence activity — it tells you whether a mark is likely available. Trademark registration is the formal application process filed with the Trade Marks Registry. After search confirms availability, you file Form TM-A, pay the prescribed fee, and proceed through examination, publication, and registration. Registration takes approximately 18-24 months from filing." },
        { q: "What is the fee for trademark search in India?", a: "The IP India public search portal is free for basic searches. Professional trademark search and clearance reports from attorneys typically cost Rs. 3,000-15,000 depending on the depth of the search and number of classes. Trademark registration filing fees are Rs. 4,500 per class for individuals/MSMEs and Rs. 9,000 per class for companies." },
        { q: "Can I conduct a trademark search myself or do I need a professional?", a: "Basic searches on the IP India portal can be done independently. However, a professional search by a trademark attorney is strongly recommended before investing in branding, as it covers phonetic similarity, deceptive similarity, common law marks, and provides a legal opinion on registrability — not just identical matches. Self-searches often miss similar marks that could still lead to objections or opposition." },
        { q: "What is a relative ground for refusal in trademark registration?", a: "A relative ground for refusal arises when the applied trademark is similar or identical to an earlier mark for similar or identical goods/services, creating a likelihood of confusion. Similarity is assessed on visual, phonetic, and conceptual grounds. An examiner can raise this objection during examination, or an existing mark holder can oppose the application during the 4-month opposition window after publication." },
        { q: "How long is a registered trademark valid in India?", a: "A registered trademark in India is valid for 10 years from the date of application. It can be renewed indefinitely for further periods of 10 years each by filing Form TM-R with renewal fees within 6 months before expiry. Non-renewal results in removal of the trademark from the Register, after which others can apply for the same mark." },
        { q: "Does a trademark registered in India protect the mark internationally?", a: "No, Indian trademark registration protects the mark only within India. For international protection, you can file under the Madrid Protocol (WIPO) to seek registration in multiple countries through a single international application. India is a member of the Madrid Protocol. Alternatively, separate national trademark applications can be filed in each target country." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "™️", label: "IP" }, { emoji: "📋", label: "Complete Guide" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Trademark Search" }]}
            title="Trademark Search India: Essential Tips to Avoid Costly Trademark Mistakes"
            readTime="15 min read"
            focusKeyword="Trademark Search India"
            sections={sections}
            ctaTitle="Need Expert Help with Trademark Search?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Trademark Search India."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/ifsca/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Trademark Search?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            <h2 id="introduction">Introduction</h2>
            <p>rk Search India – Powerful & Complete Guide to Check Trademark Availability Before Registration Trademark Search India is the first and most critical step before filing any trademark application in In</p>

            <h2 id="what-is">What is Trademark Search</h2>
            <p>This page provides comprehensive information about Trademark Search India including regulatory framework, eligibility criteria, documentation requirements, and step-by-step process.</p>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <div className="info-box">
                <p>This service falls under the regulatory jurisdiction of IP. Compliance with all applicable regulations is mandatory.</p>
            </div>

            <h2 id="who-needs">Who Needs This Service</h2>
            <p>Businesses and individuals who require Trademark Search India include entities operating in the regulated financial services sector.</p>

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
                            <span className="text-[#1677f2] transition-transform group-open:rotate-180 shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
            ) : (
            <div className="info-box"><p>Detailed FAQs will be added shortly. Contact us for specific queries about Trademark Search India.</p></div>
            )}
        </ServicePageLayout>
    );
}
