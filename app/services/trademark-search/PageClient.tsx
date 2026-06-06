"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is", title: "What is Trademark Search" },
        { id: "regulatory-framework", title: "Legal Framework" },
        { id: "who-needs", title: "Who Should Search" },
        { id: "documents", title: "Trademark Search Documents" },
        { id: "process", title: "Search Process" },
        { id: "fees", title: "Fees and Scope" },
        { id: "timeline", title: "Timeline" },
        { id: "compliance", title: "Common Mistakes" },
        { id: "faq", title: "FAQs" },
    ];

    const quickFacts = [
        { label: "Authority", value: "Trademark Registry, India" },
        { label: "Law", value: "Trade Marks Act, 1999" },
        { label: "Service Type", value: "Trademark availability and conflict search" },
        { label: "Review", value: "Expert reviewed" },
    ];

    const faqs = [
        { q: "What is Trademark Search India?", a: "Trademark Search India is a pre-filing review to check whether a proposed brand name, logo or mark conflicts with existing or pending trademarks." },
        { q: "Is trademark search mandatory before filing?", a: "It is not a separate statutory filing, but it is strongly recommended before applying to reduce objection and opposition risk." },
        { q: "Which authority handles trademark registration in India?", a: "Trademark applications are handled by the Indian Trademark Registry under the Controller General of Patents, Designs and Trade Marks." },
        { q: "Can a similar trademark be rejected?", a: "Yes. A mark may face objection or opposition if it is identical or deceptively similar to an earlier mark in the same or related class." },
        { q: "Does search guarantee registration?", a: "No. Search reduces risk, but registration remains subject to examination, objections, opposition and legal review." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "™️", label: "Trademark" }, { emoji: "🔎", label: "Brand Search" }, { emoji: "✅", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Trademark Search" }]}
            title="Trademark Search India: Complete Guide to Check Brand Availability Before Filing"
            readTime="10 min read"
            focusKeyword="Trademark Search India"
            sections={sections}
            ctaTitle="Need Help Checking Your Trademark?"
            ctaDescription="Get a structured trademark availability review before filing your brand name, logo or device mark application."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/services/enterprise-services", category: "Corporate", title: "Company Incorporation", description: "Start your business with proper legal and governance documentation." },
                { href: "/services/legal-due-diligence", category: "Legal", title: "Legal Due Diligence", description: "Review legal risks before transactions, investment or expansion." },
                { href: "/contact", category: "Support", title: "Speak to Estabizz", description: "Discuss your trademark and brand protection requirement." },
            ]}
            finalCtaTitle="Protect Your Brand Before You File"
            finalCtaDescription="Speak with Estabizz for trademark search, class identification, filing support, objection response and brand documentation."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Trademark Search India is the first practical step before filing a trademark application for a brand name, logo, tagline or device mark. A proper search helps identify identical or similar marks, class conflicts, phonetic similarity and possible objection risk before the applicant spends time and money on filing.</p>

            <h2 id="what-is">What is Trademark Search</h2>
            <p>A trademark search compares a proposed mark against existing and pending marks on the Trademark Registry database. It should also consider spelling variations, phonetic similarity, class relevance, business activity and market usage. The purpose is not only to find exact matches but to assess whether the proposed mark is likely to face objection or opposition.</p>

            <h2 id="regulatory-framework">Legal Framework</h2>
            <div className="info-box">
                <p>Trademark matters in India are governed by the Trade Marks Act, 1999, Trade Marks Rules, 2017 and practice followed by the Indian Trademark Registry. Classification is generally based on the Nice Classification system.</p>
            </div>

            <h2 id="who-needs">Who Should Search</h2>
            <ul>
                <li>Startups finalising a new brand name</li>
                <li>Companies launching a product, app, platform or service line</li>
                <li>Founders checking name availability before incorporation or fundraising</li>
                <li>Businesses expanding into new trademark classes</li>
                <li>Applicants who received an objection and want risk review</li>
            </ul>

            <h2 id="documents">Trademark Search Documents</h2>
            <ul>
                <li>Proposed brand name</li>
                <li>Applicant name</li>
                <li>Business activity</li>
                <li>Trademark class</li>
                <li>Logo, if applicable</li>
                <li>Existing brand usage details</li>
                <li>Similar competitor marks, if known</li>
            </ul>

            <h2 id="process">Search Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Brand and Class Mapping</h4><p className="text-[13px] text-[#64748b] !mb-0">Understand the mark, business activity and relevant trademark class.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Registry Search</h4><p className="text-[13px] text-[#64748b] !mb-0">Check exact, similar, phonetic and class-wise conflicts on the public database.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Risk Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Assess objection, opposition and brand confusion risk.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Filing Recommendation</h4><p className="text-[13px] text-[#64748b] !mb-0">Recommend filing, modification or alternate brand strategy.</p></div></div>
            </div>

            <h2 id="fees">Fees and Scope</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Service</th><th>Position</th><th>Note</th></tr></thead>
                    <tbody>
                        <tr><td>Trademark search</td><td>Professional fee depends on scope</td><td>Class-wise and conflict-depth based</td></tr>
                        <tr><td>Government fee</td><td>No government fee for search</td><td>Government fee applies at filing stage</td></tr>
                        <tr><td>Trademark filing</td><td>As per latest official fee schedule</td><td>Applicant category affects fee</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Timeline</h2>
            <p>A basic trademark availability search may be completed within 1 to 2 working days. A detailed risk note with class mapping and filing recommendation may take 2 to 4 working days depending on brand complexity and number of classes.</p>

            <h2 id="compliance">Common Mistakes</h2>
            <ul>
                <li>Checking only exact spelling and ignoring phonetic similarity</li>
                <li>Choosing the wrong trademark class</li>
                <li>Copying a competitor's brand style or logo pattern</li>
                <li>Filing without assessing existing pending applications</li>
                <li>Assuming company name approval means trademark availability</li>
            </ul>

            <div className="disclaimer-box">
                <strong>Disclaimer:</strong> Trademark search is a risk assessment exercise and does not guarantee registration. Final acceptance depends on registry examination, third-party opposition, document quality and applicable law.
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
