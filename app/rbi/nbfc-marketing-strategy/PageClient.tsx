"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is", title: "What It Covers" },
        { id: "regulatory-framework", title: "RBI Compliance Framework" },
        { id: "who-needs", title: "Who Needs It" },
        { id: "documents", title: "Documents and Inputs" },
        { id: "process", title: "Strategy Process" },
        { id: "fees", title: "Fees and Scope" },
        { id: "timeline", title: "Timeline" },
        { id: "compliance", title: "Compliance Risks" },
        { id: "faq", title: "FAQs" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "Reserve Bank of India" },
        { label: "Service Type", value: "Compliant NBFC growth strategy" },
        { label: "Focus", value: "Marketing, disclosures and customer acquisition" },
        { label: "Review", value: "Expert reviewed" },
    ];

    const faqs = [
        { q: "What is NBFC Marketing Strategy in India?", a: "It is a compliant customer acquisition and brand growth plan for RBI-regulated lending and finance businesses." },
        { q: "Can NBFCs advertise loan products?", a: "Yes, but advertisements must be clear, non-misleading and consistent with RBI fair practices and digital lending expectations." },
        { q: "Can an NBFC promise instant approval?", a: "It should not make misleading approval claims. Credit decisions must remain subject to underwriting, KYC and internal policy." },
        { q: "Do fintech partners need marketing controls?", a: "Yes. NBFCs remain responsible for customer-facing communication by lending service providers, DSAs and digital partners." },
        { q: "Does RBI approve marketing campaigns?", a: "RBI does not usually pre-approve campaigns, but non-compliant marketing may create inspection, complaint and enforcement risk." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "📣", label: "Growth Strategy" }, { emoji: "✅", label: "Compliance Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "NBFC Marketing Strategy" }]}
            title="NBFC Marketing Strategy in India: Compliant Growth Planning for Lending Businesses"
            readTime="12 min read"
            focusKeyword="NBFC Marketing Strategy in India"
            sections={sections}
            ctaTitle="Need a Compliant NBFC Growth Strategy?"
            ctaDescription="Plan customer acquisition, digital campaigns, partner communication and disclosure controls without creating avoidable RBI compliance risk."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-registration-in-india", category: "RBI", title: "NBFC Registration in India", description: "RBI registration guide for NBFC applicants." },
                { href: "/rbi/nbfc-business-plan", category: "RBI", title: "NBFC Business Plan", description: "Business planning support for NBFC applicants and registered entities." },
                { href: "/rbi/lendtech-services", category: "RBI", title: "LendTech Services", description: "Compliance support for fintech lending models." },
            ]}
            finalCtaTitle="Build Growth Without Compliance Blind Spots"
            finalCtaDescription="Speak with Estabizz to align NBFC marketing, sales, LSP communication and customer disclosures with RBI expectations."
        >
            <h2 id="introduction">Introduction</h2>
            <p>NBFC Marketing Strategy in India is not only about lead generation. For a regulated lending business, every campaign, partner pitch, website claim, call script and digital journey must be aligned with RBI expectations, fair practices, customer protection and transparent disclosure. A strong strategy helps an NBFC grow without creating avoidable regulatory, complaint or reputation risk.</p>

            <h2 id="what-is">What It Covers</h2>
            <p>A compliant NBFC marketing strategy covers product positioning, customer segment selection, disclosure design, website and app messaging, DSA or LSP communication, campaign approval controls, complaint escalation and evidence of internal review. It should support growth while respecting underwriting discipline and regulatory boundaries.</p>

            <h2 id="regulatory-framework">RBI Compliance Framework</h2>
            <div className="info-box">
                <p>NBFC marketing must be reviewed in light of RBI Master Directions, Fair Practices Code, KYC requirements, digital lending guidelines, outsourcing directions, customer grievance norms and data protection obligations as may be applicable.</p>
            </div>

            <h2 id="who-needs">Who Needs It</h2>
            <ul>
                <li>New NBFCs planning market entry and customer acquisition</li>
                <li>Digital lending NBFCs using websites, apps or LSP partners</li>
                <li>NBFCs appointing DSAs, referral partners or field teams</li>
                <li>Fintech platforms co-lending or sourcing loans for NBFCs</li>
                <li>NBFCs facing customer complaints due to unclear product communication</li>
            </ul>

            <h2 id="documents">Documents and Inputs</h2>
            <ul>
                <li>Product note and borrower segment details</li>
                <li>Website, app, advertisement and social media content</li>
                <li>Loan journey, sanction letter, KFS and disclosure formats</li>
                <li>DSA, LSP, referral and call-centre scripts</li>
                <li>Grievance redressal process and complaint records</li>
                <li>Board-approved marketing, outsourcing and customer communication policies, where available</li>
            </ul>

            <h2 id="process">Strategy Process</h2>
            <div className="step-timeline">
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 1</div><h4>Model Review</h4><p className="text-[13px] text-[#64748b] !mb-0">Review product, customer segment, sourcing channel and partner dependency.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 2</div><h4>Message and Disclosure Audit</h4><p className="text-[13px] text-[#64748b] !mb-0">Check public claims, fee disclosure, risk warnings and customer promises.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 3</div><h4>Control Framework</h4><p className="text-[13px] text-[#64748b] !mb-0">Create review workflow for campaigns, scripts and partner communication.</p></div></div>
                <div className="step-item"><div className="step-dot"></div><div className="step-card"><div className="step-label">Step 4</div><h4>Implementation Support</h4><p className="text-[13px] text-[#64748b] !mb-0">Support compliant campaign rollout, evidence records and periodic review.</p></div></div>
            </div>

            <h2 id="fees">Fees and Scope</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Scope</th><th>Position</th><th>Note</th></tr></thead>
                    <tbody>
                        <tr><td>Marketing compliance review</td><td>Quoted case-by-case</td><td>Depends on channels and product count</td></tr>
                        <tr><td>Growth strategy documentation</td><td>Professional fee based</td><td>Includes positioning and compliance controls</td></tr>
                        <tr><td>Ongoing campaign review</td><td>Retainer-based</td><td>Suitable for active digital lenders</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Timeline</h2>
            <p>A focused marketing compliance review may take 1 to 2 weeks. A full NBFC growth strategy with partner communication controls, content review and policy recommendations may take 3 to 5 weeks depending on product depth and stakeholder inputs.</p>

            <h2 id="compliance">Compliance Risks</h2>
            <ul>
                <li>Misleading claims such as guaranteed approval or no underwriting</li>
                <li>Incomplete disclosure of charges, penalties or repayment obligations</li>
                <li>Uncontrolled DSA, LSP or call-centre communication</li>
                <li>Weak grievance escalation and complaint tracking</li>
                <li>Marketing content inconsistent with loan documentation</li>
            </ul>

            <div className="disclaimer-box">
                <strong>Disclaimer:</strong> This page is for general information only. Marketing practices must be reviewed against the latest RBI directions, customer protection requirements and business facts before implementation.
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
