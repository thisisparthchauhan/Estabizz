"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-cis", title: "What is a Collective Investment Scheme" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs CIS Registration" },
        { id: "cis-structure", title: "Structure of a CIS" },
        { id: "types", title: "Types of CIS in India" },
        { id: "not-cis", title: "Schemes NOT Treated as CIS" },
        { id: "eligibility", title: "Eligibility Criteria" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Registration Process" },
        { id: "fees", title: "Fees Structure" },
        { id: "timeline", title: "Timeline" },
        { id: "cis-vs-aif-pms", title: "CIS vs AIF vs PMS" },
        { id: "compliance", title: "Post-Registration Compliance" },
        { id: "common-mistakes", title: "Common Mistakes" },
        { id: "enforcement", title: "Regulatory Risks & Enforcement" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is a Collective Investment Scheme (CIS) in India?",
            a: "A CIS is an investment structure where funds from multiple investors are pooled and managed collectively. Returns are generated through a common enterprise. It is regulated by SEBI under the SEBI Act, 1992 (Section 11AA) and SEBI (Collective Investment Schemes) Regulations, 1999."
        },
        {
            q: "Is CIS registration mandatory?",
            a: "Yes, registration is compulsory. No entity can operate a Collective Investment Scheme without prior SEBI registration. Operating an unregistered CIS is illegal and attracts enforcement action including shutdown orders and penalties."
        },
        {
            q: "What is the minimum net worth required for CIS registration?",
            a: "Minimum ₹5 Crore net worth is required. Gradual compliance is allowed — initial net worth of ₹3 Crore is permitted with the requirement to increase to ₹5 Crore over time."
        },
        {
            q: "Can an LLP apply for CIS registration?",
            a: "No. Only companies incorporated under the Companies Act are eligible for CIS registration. LLPs and partnerships are not permitted."
        },
        {
            q: "What are common examples of CIS activities?",
            a: "Common CIS models include: agro or plantation schemes, real estate pooling projects, livestock or forestry investments, infrastructure pooling ventures, and commodity-based investment pools."
        },
        {
            q: "How is CIS different from a mutual fund?",
            a: "CIS is project-based investment pooling (real estate, plantation, infrastructure) while mutual funds invest in securities markets. Mutual funds are governed by separate SEBI regulations and are much more widely used. CIS is a rare structure with much higher compliance complexity."
        },
        {
            q: "Can CIS guarantee returns to investors?",
            a: "No. Guaranteed returns are generally not permitted unless specifically structured and compliant. Over-promising returns is a common violation that leads to regulatory enforcement action."
        },
        {
            q: "What is a Collective Investment Management Company (CIMC)?",
            a: "The CIMC is the company registered with SEBI that manages the CIS operations — making investment decisions and overseeing scheme management. It is the central operating entity in a CIS structure."
        },
        {
            q: "Why is a trust structure mandatory for CIS?",
            a: "SEBI requires a trust mechanism to hold scheme assets separately from the management company. This ensures segregation and protection of investor assets. The trustee independently safeguards investor interests."
        },
        {
            q: "Can a startup apply for CIS registration?",
            a: "Yes, if the startup meets net worth and compliance requirements. However, for most early-stage fund pooling ventures, AIF (Alternative Investment Fund) is a more practical and widely-used regulatory structure."
        },
        {
            q: "What is the CIS offer document requirement?",
            a: "Before launching any scheme, the CIMC must file a detailed offer document with SEBI. The offer document must provide a 'true and fair view' to enable informed investor decisions. Minimum subscription conditions must be met, failing which funds must be refunded."
        },
        {
            q: "What are the grounds for SEBI enforcement action against CIS?",
            a: "SEBI may initiate enforcement action for: operating unregistered CIS, mis-selling or over-promising returns, non-compliance with reporting obligations, inadequate investor disclosures, and structural violations. Actions include shutdown orders, refund directions, monetary penalties, and director disqualification."
        },
        {
            q: "When does a fintech or startup model become a CIS?",
            a: "A business model may unintentionally become CIS if it: pools funds from multiple investors, promises returns (fixed or variable), manages investments centrally, and investors do not control investment decisions. This applies to tokenised assets, fractional real estate, managed portfolios, and certain startup investment platforms."
        },
        {
            q: "What is the difference between CIS and AIF?",
            a: "CIS is project-based pooling (plantation, real estate) with a trust + company structure and very high compliance complexity. AIF is a well-structured investment fund (PE, VC, hedge) with minimum investment of ₹1 Crore, governed by SEBI AIF Regulations 2012. AIF is widely used; CIS is rare and carries higher regulatory risk."
        },
        {
            q: "What is the difference between CIS and PMS?",
            a: "In CIS, funds are pooled and managed collectively — investors have no individual control. In PMS, each client has a separate portfolio account with minimum investment ₹50 Lakhs and the client retains ownership of individual securities. CIS involves pooling; PMS does not."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "📈", label: "SEBI" },
                { emoji: "🏛️", label: "Collective Investment Scheme" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "SEBI Services", href: "/sebi" },
                { label: "Collective Investment Schemes", href: "/sebi/collective-investment-schemes" },
            ]}
            title="Collective Investment Scheme in India – Complete Powerful & Critical SEBI Compliance Guide"
            readTime="20 min read"
            focusKeyword="Collective Investment Scheme in India"
            sections={sections}
            ctaTitle="CIS Registration & Structuring"
            ctaDescription="Our SEBI compliance experts help you understand CIS applicability, avoid unintentional CIS classification, and navigate the complete SEBI registration process."
            quickFacts={[
                { label: "Regulator", value: "SEBI" },
                { label: "Governing Law", value: "CIS Regulations, 1999" },
                { label: "Legal Section", value: "Section 11AA, SEBI Act" },
                { label: "Entity Type", value: "Company Only" },
                { label: "Min Net Worth", value: "₹5 Crore" },
                { label: "Structure", value: "Company + Trust" },
                { label: "SEBI Review", value: "3–6 months" },
                { label: "Risk Category", value: "Very High" },
            ]}
            relatedArticles={[
                { title: "Alternative Asset Portfolio Valuation", href: "/sebi/alternative-asset-portfolio-valuation", category: "SEBI", description: "Valuation framework for AIFs and alternative assets." },
                { title: "AIF Compliance Test Report", href: "/sebi/aif-compliance-test-report", category: "SEBI", description: "Compliance test report requirements for Alternative Investment Funds." },
                { title: "Mutual Fund Registration", href: "/sebi/mutual-fund-registration", category: "SEBI", description: "SEBI registration for mutual fund asset management companies." },
                { title: "Credit Rating Agency", href: "/sebi/credit-rating-agency", category: "SEBI", description: "SEBI CRA registration guide." },
            ]}
            finalCtaTitle="Need Help with CIS Structuring or Registration?"
            finalCtaDescription="CIS is one of India's most compliance-intensive financial structures. Our experts ensure you stay protected — from correct classification to SEBI registration."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    <strong>Collective Investment Scheme (CIS) in India</strong> is a highly regulated investment structure where funds from multiple investors are pooled and managed professionally under the supervision of SEBI. It is one of the most sensitive regulatory areas because it directly involves public money, investor protection, and financial market integrity.
                </p>
                <p>
                    From a compliance perspective, any structure that pools investor funds — even unintentionally — can fall under CIS regulations. This makes it a critical area for startups, fintech platforms, and investment businesses to understand and navigate carefully.
                </p>
                <div className="warning-box">
                    <strong>⚠️ Critical Alert:</strong> Many modern businesses — fractional real estate platforms, tokenised asset platforms, managed portfolio services — unintentionally fall under the CIS definition. SEBI evaluates <strong>substance over form</strong>. What you call your product does not determine compliance — what it does does.
                </div>
            </section>

            {/* What is CIS */}
            <section id="what-is-cis">
                <h2>What is a Collective Investment Scheme in India</h2>
                <p>A scheme qualifies as a Collective Investment Scheme under Section 11AA of the SEBI Act if <strong>all four conditions</strong> are met:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Pooling of Funds</strong></td>
                            <td>Contributions from multiple investors are pooled into a common fund</td>
                        </tr>
                        <tr>
                            <td><strong>Investor Expectation of Returns</strong></td>
                            <td>Investors expect to receive income, profit, or property from the scheme</td>
                        </tr>
                        <tr>
                            <td><strong>Managed on Behalf</strong></td>
                            <td>The scheme is managed by a third party on behalf of investors</td>
                        </tr>
                        <tr>
                            <td><strong>No Day-to-Day Control</strong></td>
                            <td>Investors do not have direct day-to-day control over management of the scheme</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Key Legal Reference:</strong> Section 11AA of the Securities and Exchange Board of India Act, 1992 — defines what constitutes a CIS. SEBI (Collective Investment Schemes) Regulations, 1999 — govern registration, operations, and compliance.
                </div>
            </section>

            {/* Regulatory Framework */}
            <section id="regulatory-framework">
                <h2>Regulatory Framework</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Primary Legislation</td>
                            <td>Securities and Exchange Board of India Act, 1992 — Section 11AA</td>
                        </tr>
                        <tr>
                            <td>Governing Regulations</td>
                            <td>SEBI (Collective Investment Schemes) Regulations, 1999 (last amended August 18, 2023)</td>
                        </tr>
                        <tr>
                            <td>Regulatory Authority</td>
                            <td>Securities and Exchange Board of India (SEBI)</td>
                        </tr>
                        <tr>
                            <td>Regulatory Principle</td>
                            <td>No person can operate a CIS without obtaining a Certificate of Registration from SEBI. Substance over form — SEBI evaluates what the structure does, not what it is called.</td>
                        </tr>
                        <tr>
                            <td>High-Risk Category</td>
                            <td>SEBI treats CIS as a very high-risk regulatory category due to historical misuse (Ponzi schemes, land scams, plantation frauds)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Who Needs */}
            <section id="who-needs">
                <h2>Who Needs CIS Registration</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Entity Type</th>
                            <th>Why CIS Registration Applies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Real Estate Pooling Companies</strong></td>
                            <td>Companies pooling public funds for land/property investment with promised returns</td>
                        </tr>
                        <tr>
                            <td><strong>Plantation / Agro Scheme Operators</strong></td>
                            <td>Entities running plantation, forestry, or agro-investment schemes with investor participation</td>
                        </tr>
                        <tr>
                            <td><strong>Infrastructure Investment Pools</strong></td>
                            <td>Pools for infrastructure project investment where investors receive returns</td>
                        </tr>
                        <tr>
                            <td><strong>Fractional Ownership Platforms</strong></td>
                            <td>Platforms offering fractional ownership of real assets — if structured improperly, qualify as CIS</td>
                        </tr>
                        <tr>
                            <td><strong>Fintech / Crypto Pooling Models</strong></td>
                            <td>Digital investment models with passive investor participation and centralised management</td>
                        </tr>
                        <tr>
                            <td><strong>Unregistered Investment Pools</strong></td>
                            <td>Any entity pooling funds from multiple investors without AIF, MF, or NBFC registration may be classified as CIS</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* CIS Structure */}
            <section id="cis-structure">
                <h2>Structure of a Collective Investment Scheme</h2>
                <p>A CIS is not just a company — it is a mandatory <strong>multi-layer regulatory structure</strong>:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Collective Investment Management Company (CIMC)</strong></td>
                            <td>Company registered with SEBI → manages scheme operations and investment decisions</td>
                        </tr>
                        <tr>
                            <td><strong>Trust (Mandatory)</strong></td>
                            <td>Mandatory structure → holds scheme assets for investors; ensures segregation from management company assets</td>
                        </tr>
                        <tr>
                            <td><strong>Trustee</strong></td>
                            <td>Independently safeguards investor interests → monitors scheme operations → ensures regulatory compliance</td>
                        </tr>
                        <tr>
                            <td><strong>Investors (Unit Holders)</strong></td>
                            <td>Contribute funds → receive units in the scheme → entitled to proportional returns</td>
                        </tr>
                        <tr>
                            <td><strong>Fund Manager</strong></td>
                            <td>Makes investment decisions on behalf of the scheme</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Types */}
            <section id="types">
                <h2>Types of Collective Investment Schemes in India</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Real Estate Pooling Schemes</strong></td>
                            <td>Land banking, residential/commercial project pooling, fractional property ownership (if misstructured)</td>
                        </tr>
                        <tr>
                            <td><strong>Plantation / Agro Schemes</strong></td>
                            <td>Forestry investments, teak/bamboo plantation schemes, agri-commodity pooling</td>
                        </tr>
                        <tr>
                            <td><strong>Infrastructure Investment Pools</strong></td>
                            <td>Pooled investments in roads, ports, utilities with promised returns to investors</td>
                        </tr>
                        <tr>
                            <td><strong>Commodity-Based Schemes</strong></td>
                            <td>Gold pooling, precious metals investment schemes with centralised management</td>
                        </tr>
                        <tr>
                            <td><strong>Livestock / Animal Husbandry Schemes</strong></td>
                            <td>Cattle investment schemes, dairy pooling structures with investor returns</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* NOT CIS */}
            <section id="not-cis">
                <h2>Structures NOT Treated as Collective Investment Schemes</h2>
                <p>Not all pooled investment structures qualify as CIS. The following are explicitly excluded:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Structure</th>
                            <th>Why Excluded</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Mutual Funds</strong></td>
                            <td>Separately regulated under SEBI (Mutual Funds) Regulations, 1996</td>
                        </tr>
                        <tr>
                            <td><strong>Alternative Investment Funds (AIFs)</strong></td>
                            <td>Separately regulated under SEBI (AIF) Regulations, 2012</td>
                        </tr>
                        <tr>
                            <td><strong>Insurance Products</strong></td>
                            <td>Regulated by IRDAI under the Insurance Act</td>
                        </tr>
                        <tr>
                            <td><strong>NBFC Lending Structures</strong></td>
                            <td>Regulated by RBI under the RBI Act — loan structures are not CIS</td>
                        </tr>
                        <tr>
                            <td><strong>Chit Funds</strong></td>
                            <td>Separately regulated under Chit Funds Act, 1982</td>
                        </tr>
                        <tr>
                            <td><strong>NPS / Pension Schemes</strong></td>
                            <td>Regulated by PFRDA under the PFRDA Act</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>⚠️ Critical Warning:</strong> Even if a structure appears to fall under AIF, MF, or NBFC — if it is wrongly structured or unregistered, SEBI can reclassify it as a CIS. Always verify with a compliance expert before pooling investor funds.
                </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
                <h2>Eligibility Criteria</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Requirement</th>
                            <th>Practical Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Legal Structure</strong></td>
                            <td>Company under Companies Act</td>
                            <td>LLP / partnership / individual — not allowed</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Net Worth</strong></td>
                            <td>₹5 Crore (gradual compliance allowed)</td>
                            <td>Initial ₹3 Crore permitted — must increase to ₹5 Crore over time</td>
                        </tr>
                        <tr>
                            <td><strong>Object Clause</strong></td>
                            <td>CIS activity must be in MOA</td>
                            <td>Most commonly missed during company incorporation</td>
                        </tr>
                        <tr>
                            <td><strong>Infrastructure</strong></td>
                            <td>Adequate operational setup</td>
                            <td>SEBI checks real capability — not just on paper</td>
                        </tr>
                        <tr>
                            <td><strong>Fit &amp; Proper</strong></td>
                            <td>Promoters must satisfy SEBI criteria</td>
                            <td>Background verification is strict — no regulatory violations, defaults, or criminal proceedings</td>
                        </tr>
                        <tr>
                            <td><strong>Trust Structure</strong></td>
                            <td>Mandatory trust for scheme assets</td>
                            <td>Must be established before scheme launch — trustee must be SEBI-compliant</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Documents */}
            <section id="documents">
                <h2>Documents Required</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                            <th>Common Mistake</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Certificate of Incorporation</td>
                            <td>Legal entity proof</td>
                            <td>Object clause does not include CIS activities</td>
                        </tr>
                        <tr>
                            <td>Memorandum &amp; Articles of Association</td>
                            <td>CIS object clause validation</td>
                            <td>CIS object clause missing from MOA</td>
                        </tr>
                        <tr>
                            <td>CA-Certified Net Worth Certificate</td>
                            <td>Financial strength — ₹5 Crore minimum</td>
                            <td>Incorrect CA certification format</td>
                        </tr>
                        <tr>
                            <td>Business Plan</td>
                            <td>Scheme viability and investor return model</td>
                            <td>Generic copy-paste plans rejected by SEBI</td>
                        </tr>
                        <tr>
                            <td>Trust Deed</td>
                            <td>Mandatory trust structure documentation</td>
                            <td>Improper drafting — trustee not SEBI-compliant</td>
                        </tr>
                        <tr>
                            <td>Directors&apos; KYC &amp; Declarations</td>
                            <td>Fit and proper verification</td>
                            <td>Incomplete disclosures trigger SEBI queries</td>
                        </tr>
                        <tr>
                            <td>Audited Financial Statements</td>
                            <td>Net worth and financial stability</td>
                            <td>Unaudited or provisional financials not accepted</td>
                        </tr>
                        <tr>
                            <td>Draft Offer Document</td>
                            <td>Scheme-specific investor disclosure document</td>
                            <td>Must provide &quot;true and fair view&quot; — generic drafts rejected</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Process */}
            <section id="process">
                <h2>Step-by-Step CIS Registration Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Incorporate Company with CIS Object Clause</h4>
                            <p>Incorporate a company under Companies Act, 2013 with CIS activities explicitly mentioned in the MOA object clause. This is mandatory and frequently missed.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Achieve Minimum Net Worth</h4>
                            <p>Ensure net worth of at least ₹3 Crore at application (with commitment to increase to ₹5 Crore). Get CA-certified net worth certificate in correct format.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Form Mandatory Trust Structure</h4>
                            <p>Establish a trust to hold scheme assets separately. Trustee must be independent and capable of protecting investor interests. Trust deed must be properly drafted and SEBI-compliant.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Appoint Trustee and Management Team</h4>
                            <p>Appoint a SEBI-compliant trustee and experienced fund management team. Ensure all key personnel meet fit and proper criteria with clean regulatory history.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>File Application with SEBI</h4>
                            <p>Submit application in SEBI&apos;s prescribed format with business plan, net worth certificate, trust deed, directors&apos; declarations, and draft offer document.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Respond to SEBI Queries and Inspections</h4>
                            <p>SEBI will review the application and raise queries. Site inspections may be conducted. SEBI scrutinises substance of operations — not just documentation.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">7</div>
                        <div className="step-card">
                            <h4>Obtain Certificate of Registration</h4>
                            <p>Upon satisfaction, SEBI grants the Certificate of Registration. No CIS activity is permitted before this certificate is received.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fees */}
            <section id="fees">
                <h2>Fees Structure</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            <th>Amount</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Application Fee</strong></td>
                            <td>As prescribed by SEBI</td>
                            <td>Non-refundable; payable at time of application</td>
                        </tr>
                        <tr>
                            <td><strong>Registration Fee</strong></td>
                            <td>Depends on scheme size</td>
                            <td>Payable after SEBI approval</td>
                        </tr>
                        <tr>
                            <td><strong>Annual Compliance Cost</strong></td>
                            <td>Variable</td>
                            <td>Audit, reporting, trustee fees, and legal costs</td>
                        </tr>
                        <tr>
                            <td><strong>Trust Deed Drafting</strong></td>
                            <td>Variable</td>
                            <td>One-time legal cost for mandatory trust structure</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Timeline */}
            <section id="timeline">
                <h2>Timeline</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Estimated Duration</th>
                            <th>Key Risk of Delay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Company incorporation + Trust formation</td>
                            <td>3–4 weeks</td>
                            <td>Missing CIS object clause or improper trust deed</td>
                        </tr>
                        <tr>
                            <td>Documentation preparation</td>
                            <td>2–4 weeks</td>
                            <td>Generic plans or incomplete director disclosures</td>
                        </tr>
                        <tr>
                            <td>SEBI review and query resolution</td>
                            <td>3–6 months</td>
                            <td>Regulatory queries; substance vs. form scrutiny</td>
                        </tr>
                        <tr>
                            <td>Approval</td>
                            <td>Case-based</td>
                            <td>Promoter background checks may extend timeline</td>
                        </tr>
                        <tr>
                            <td><strong>Total Estimated Timeline</strong></td>
                            <td><strong>4–8 months</strong></td>
                            <td>Highly case-specific</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* CIS vs AIF vs PMS */}
            <section id="cis-vs-aif-pms">
                <h2>CIS vs Alternative Investment Fund (AIF) vs Portfolio Management Services (PMS)</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>CIS</th>
                            <th>AIF</th>
                            <th>PMS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Governing Law</strong></td>
                            <td>SEBI CIS Regulations, 1999</td>
                            <td>SEBI AIF Regulations, 2012</td>
                            <td>SEBI PMS Regulations, 2020</td>
                        </tr>
                        <tr>
                            <td><strong>Structure</strong></td>
                            <td>Company + Mandatory Trust</td>
                            <td>Trust / LLP / Company</td>
                            <td>Agreement-based (no pooling)</td>
                        </tr>
                        <tr>
                            <td><strong>Fund Pooling</strong></td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>No — individual accounts</td>
                        </tr>
                        <tr>
                            <td><strong>Investor Control</strong></td>
                            <td>No</td>
                            <td>Limited</td>
                            <td>Yes — client retains ownership</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Investment</strong></td>
                            <td>Not fixed</td>
                            <td>₹1 Crore</td>
                            <td>₹50 Lakhs</td>
                        </tr>
                        <tr>
                            <td><strong>Registration Complexity</strong></td>
                            <td>Very High</td>
                            <td>Moderate</td>
                            <td>Moderate</td>
                        </tr>
                        <tr>
                            <td><strong>Market Usage</strong></td>
                            <td>Very Rare</td>
                            <td>Very High</td>
                            <td>High</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Recommendation:</strong> For most new investment fund structures — choose AIF (widely used, flexible, SEBI-recognised). CIS is rare and carries much higher compliance complexity. PMS is suitable for HNI client portfolio management without pooling.
                </div>
                <blockquote className="expert-quote">
                    <p>&ldquo;Many founders unknowingly design structures that fall within the definition of a Collective Investment Scheme. The real risk is not rejection — it is post-facto regulatory action. Proper structuring at the beginning is the key to sustainable compliance.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
            </section>

            {/* Post-Registration Compliance */}
            <section id="compliance">
                <h2>Post-Registration Compliance</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Obligation</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Offer Document Filing</strong></td>
                            <td>File detailed offer document with SEBI before launching any scheme. Must provide &quot;true and fair view&quot;.</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Subscription</strong></td>
                            <td>Scheme must meet minimum subscription thresholds — failing which all funds must be refunded to investors</td>
                        </tr>
                        <tr>
                            <td><strong>Periodic Reporting to SEBI</strong></td>
                            <td>Financial reports, investor disclosures, and asset performance updates as per SEBI timelines</td>
                        </tr>
                        <tr>
                            <td><strong>Asset Valuation</strong></td>
                            <td>Periodic valuation of scheme assets by independent valuer</td>
                        </tr>
                        <tr>
                            <td><strong>Trustee Oversight</strong></td>
                            <td>Trustee must monitor operations, protect investors, and report non-compliance to SEBI</td>
                        </tr>
                        <tr>
                            <td><strong>Audit Requirements</strong></td>
                            <td>Regular statutory audits mandatory; SEBI can conduct inspections at any time</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Common Mistakes */}
            <section id="common-mistakes">
                <h2>Common Mistakes to Avoid</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Mistake</th>
                            <th>Consequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Launching pooling scheme without checking CIS applicability</td>
                            <td>Post-facto enforcement, shutdown order, refund obligation</td>
                        </tr>
                        <tr>
                            <td>Misclassifying scheme as AIF or PMS when it qualifies as CIS</td>
                            <td>SEBI reclassification and enforcement action</td>
                        </tr>
                        <tr>
                            <td>Omitting CIS object clause from MOA at incorporation</td>
                            <td>Application rejection — requires MOA amendment</td>
                        </tr>
                        <tr>
                            <td>Ignoring mandatory trust structure requirement</td>
                            <td>Application rejection; regulatory non-compliance</td>
                        </tr>
                        <tr>
                            <td>Over-promising returns to investors</td>
                            <td>Enforcement action, investor complaints, SEBI investigation</td>
                        </tr>
                        <tr>
                            <td>Treating CIS registration as a simple startup model</td>
                            <td>Underestimating compliance burden — operational failure post-registration</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Enforcement */}
            <section id="enforcement">
                <h2>Regulatory Risks & Enforcement</h2>
                <div className="warning-box">
                    <strong>⚠️ SEBI Enforcement:</strong> SEBI treats CIS as a very high-risk regulatory category due to historical misuse (Ponzi schemes, land scams). Any unregistered pooling activity is considered illegal, irrespective of intent.
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Enforcement Action</th>
                            <th>Applicability</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Immediate Shutdown Orders</td>
                            <td>For operating unregistered CIS</td>
                        </tr>
                        <tr>
                            <td>Refund Directions to Investors</td>
                            <td>Ordered return of all investor funds with interest</td>
                        </tr>
                        <tr>
                            <td>Monetary Penalties</td>
                            <td>Significant fines per violation under SEBI Act</td>
                        </tr>
                        <tr>
                            <td>Director Disqualification</td>
                            <td>Directors/promoters can be debarred from capital markets</td>
                        </tr>
                        <tr>
                            <td>Criminal Prosecution</td>
                            <td>In cases of fraud or deliberate investor harm</td>
                        </tr>
                        <tr>
                            <td>Public Disclosure</td>
                            <td>SEBI publicly discloses enforcement orders against CIS violators</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* FAQs */}
            <section id="faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-accordion">
                    {faqs.map((faq, i) => (
                        <details key={i} className="faq-item">
                            <summary>{faq.q}</summary>
                            <p>{faq.a}</p>
                        </details>
                    ))}
                </div>
            </section>
        </ServicePageLayout>
    );
}
