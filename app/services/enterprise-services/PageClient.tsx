"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-are-enterprise-services", title: "What Are Enterprise Services" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs Enterprise Services" },
        { id: "types-of-services", title: "Types of Enterprise Services" },
        { id: "business-setup-structuring", title: "Business Setup & Structuring" },
        { id: "regulatory-licensing-services", title: "Regulatory Licensing Services" },
        { id: "foreign-company-entry", title: "Foreign Company Entry" },
        { id: "taxation-compliance", title: "Taxation & Financial Compliance" },
        { id: "corporate-governance", title: "Corporate Governance & Secretarial" },
        { id: "professional-vs-diy", title: "Professional vs DIY" },
        { id: "fees", title: "Fees & Cost Structure" },
        { id: "timeline", title: "Timeline" },
        { id: "common-mistakes", title: "Common Mistakes to Avoid" },
        { id: "post-setup-compliance", title: "Post-Setup Compliance" },
        { id: "faqs", title: "Frequently Asked Questions" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What are enterprise services in the Indian regulatory context?",
            a: "Enterprise services refer to a comprehensive suite of professional services that help businesses navigate incorporation, regulatory licensing, taxation, corporate governance, legal documentation, and ongoing compliance in India. These services are tailored for startups, NBFCs, fintechs, foreign companies, and regulated entities operating under frameworks like the Companies Act 2013, RBI guidelines, SEBI regulations, and IRDAI norms.",
        },
        {
            q: "Who needs enterprise services?",
            a: "Any entity planning to set up, scale, or operate a regulated business in India needs enterprise services. This includes startup founders, NBFC and fintech operators, insurance intermediaries, foreign companies entering India, MSMEs seeking formalisation, listed entities with ongoing compliance obligations, and capital market participants under SEBI.",
        },
        {
            q: "Are enterprise services mandatory or optional?",
            a: "For businesses operating in regulated sectors — such as banking, insurance, securities, or payment systems — professional enterprise services are effectively mandatory. Regulatory filings, license applications, and governance disclosures have strict timelines and accuracy requirements that are difficult to meet without expert support.",
        },
        {
            q: "How can a foreign company enter India, and what compliance is involved?",
            a: "A foreign company can enter India through Wholly Owned Subsidiaries (WOS), Joint Ventures (JV), Liaison Offices, Branch Offices, or Project Offices. Each route requires FEMA and RBI compliance, including reporting via FC-GPR for foreign direct investment and FLA Return for annual foreign liabilities disclosures.",
        },
        {
            q: "What enterprise services are specific to NBFCs and fintechs?",
            a: "NBFCs and fintechs require RBI licensing (NBFC registration or Payment Aggregator approval), fair practices code adoption, KYC &amp; AML compliance, mandatory audits, board-level governance, and ongoing regulatory reporting. Enterprise service providers assist with end-to-end license applications, documentation, and post-license compliance.",
        },
        {
            q: "What SEBI licenses fall under enterprise services?",
            a: "SEBI-regulated licenses covered under enterprise services include Registered Investment Adviser (RIA), Portfolio Management Services (PMS), Alternative Investment Fund (AIF), Stock Broker registration, Depository Participant (DP), and Research Analyst registration. Each requires distinct documentation, net worth, and infrastructure criteria.",
        },
        {
            q: "What IRDAI registrations are supported?",
            a: "Enterprise services cover IRDAI Insurance Broker registration and Corporate Agent registration. These require specific infrastructure, manpower qualifications, statutory deposits, and ongoing compliance with IRDAI circulars and annual returns.",
        },
        {
            q: "Does IFSCA come under enterprise services?",
            a: "Yes. IFSCA (International Financial Services Centres Authority) at GIFT City has its own licensing framework for entities like Fintech Entities, Finance Companies, Aircraft Lessors, PSP License holders, ITFS Platforms, TechFin entities, and BATF service providers. Enterprise services include end-to-end IFSCA application support and post-approval compliance.",
        },
        {
            q: "How long does the enterprise services process take?",
            a: "The overall timeline varies by service: incorporation takes 7&ndash;10 days, documentation preparation takes 10&ndash;15 days, and regulatory license approvals can take 30&ndash;120 days depending on the regulator and complexity. The total end-to-end timeline is typically 1 to 4 months.",
        },
        {
            q: "What does it cost to engage enterprise service professionals?",
            a: "Costs vary by scope. Government fees are license-type specific. Professional fees are scope-based, covering documentation, filing, and advisory. Recurring compliance costs depend on the volume of filings and regulatory reporting obligations. Estabizz provides transparent, scope-specific fee structures.",
        },
        {
            q: "What are the most common mistakes businesses make in enterprise compliance?",
            a: "The most common mistakes include choosing the wrong legal structure, submitting inadequate documentation, ignoring sector-specific regulatory requirements, failing to maintain ongoing filing obligations, underestimating capital requirements, and not engaging professional advisory early enough.",
        },
        {
            q: "What are the risks of managing enterprise compliance without professional help?",
            a: "DIY compliance carries significant risks including license rejections, regulatory penalties, business shutdowns, director disqualification, and regulatory blacklisting. Regulatory frameworks like the Companies Act, RBI Master Directions, SEBI regulations, and IRDAI guidelines are highly technical and frequently updated.",
        },
        {
            q: "Are enterprise services relevant for startups?",
            a: "Yes. Startups benefit from enterprise services particularly for choosing the right legal structure, setting up ESOP plans, drafting Shareholders&apos; Agreements, obtaining sector-specific licenses, and building investor-ready governance frameworks from day one.",
        },
        {
            q: "What ongoing compliance is required after business setup?",
            a: "Post-setup obligations include annual ROC filings (MGT-7, AOC-4, PAS-3), regulatory reporting to RBI, SEBI, or IRDAI, GST returns, income tax filings, statutory audits, board meeting records, and periodic governance disclosures. Failing any of these can result in penalties or license suspension.",
        },
        {
            q: "Why do license applications get rejected?",
            a: "Common reasons for license rejection include incomplete documentation, failure to meet net worth or capital requirements, inadequate infrastructure, promoters with poor fit &amp; proper credentials, a weak or vague business plan, and non-compliance with prior regulatory obligations.",
        },
        {
            q: "What are the director requirements for regulated entities?",
            a: "Directors of regulated entities must pass the fit &amp; proper criteria set by the respective regulator (RBI, SEBI, IRDAI). This involves no criminal record, no prior regulatory action, relevant professional experience, and in some cases mandatory certification (e.g., NISM for SEBI-registered entities).",
        },
        {
            q: "Why is a business plan important in enterprise services?",
            a: "A comprehensive business plan is mandatory for most regulated license applications. It demonstrates to regulators the viability of the business model, financial projections, risk management framework, customer acquisition strategy, and compliance readiness. A poorly drafted business plan is a leading cause of application delays or rejections.",
        },
        {
            q: "What FEMA compliance is required for foreign companies operating in India?",
            a: "Foreign companies must comply with FEMA regulations for all cross-border transactions. This includes reporting FDI inflows via FC-GPR within 30 days of allotment, filing the annual FLA Return, maintaining FEMA-compliant documentation for inward remittances, and ensuring ECB (External Commercial Borrowing) compliance where applicable.",
        },
        {
            q: "What are the post-registration obligations for a regulated entity?",
            a: "Post-registration obligations include submitting periodic reports to the regulator (monthly, quarterly, or annual depending on the license), maintaining minimum net worth, conducting statutory audits, holding board meetings, filing returns with ROC, renewing certifications, and disclosing material changes to the regulator.",
        },
        {
            q: "When should a business engage a professional enterprise service provider?",
            a: "Businesses should engage a professional enterprise service provider at the pre-incorporation stage itself. Early professional guidance ensures the correct legal structure is chosen, capital requirements are planned, regulatory thresholds are understood, and the business is investor-ready and compliance-compliant from inception.",
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏢", label: "Enterprise Services" },
                { emoji: "🇮🇳", label: "Business Setup India" },
                { emoji: "📜", label: "Regulatory Licensing" },
                { emoji: "🏦", label: "RBI / SEBI / IRDAI" },
                { emoji: "📋", label: "Company Incorporation" },
                { emoji: "✅", label: "Corporate Compliance" },
                { emoji: "🌐", label: "Foreign Company Entry" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Enterprise Services" },
            ]}
            title="Enterprise Services in India — Complete Business Setup &amp; Regulatory Compliance Guide"
            readTime="18 min read"
            focusKeyword="enterprise services India"
            sections={sections}
            ctaTitle="Set Up Your Business the Right Way"
            ctaDescription="From incorporation to regulatory licensing and ongoing compliance, Estabizz provides end-to-end enterprise services for startups, NBFCs, fintechs, foreign companies, and regulated entities in India."
            quickFacts={[
                { label: "Regulatory Bodies", value: "RBI / SEBI / IRDAI / IFSCA" },
                { label: "Incorporation", value: "7–10 days" },
                { label: "License Approval", value: "30–120 days" },
                { label: "Total Timeline", value: "1–4 months" },
                { label: "Capital Requirement", value: "License-specific" },
                { label: "Compliance Officer", value: "Required for regulated" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                {
                    title: "FEMA Compliance",
                    href: "/fema/compliance-under-fema",
                    category: "FEMA",
                    description: "Complete guide to Foreign Exchange Management Act compliance obligations.",
                },
                {
                    title: "Legal Due Diligence",
                    href: "/services/legal-due-diligence",
                    category: "Services",
                    description: "Comprehensive legal due diligence for M&A, investments, and corporate transactions.",
                },
                {
                    title: "Legal Process Outsourcing",
                    href: "/services/legal-process-outsourcing",
                    category: "Services",
                    description: "Outsource legal drafting, research, and compliance functions to qualified professionals.",
                },
                {
                    title: "Data Storage Policy",
                    href: "/services/data-storage-policy",
                    category: "Services",
                    description: "Regulatory data localisation and storage obligations for fintech companies.",
                },
            ]}
            finalCtaTitle="Build a Compliant, Investor-Ready Business"
            finalCtaDescription="Whether you are a startup, an NBFC, a foreign company, or a regulated entity — Estabizz enterprise services provide the expertise, documentation, and regulatory guidance you need to operate with confidence in India."
        >
            <section id="introduction">
                <h2>Introduction to Enterprise Services in India</h2>
                <p>
                    India&apos;s regulatory landscape is one of the most layered in the world. Businesses operating across financial services, technology, insurance, capital markets, and international trade must navigate a complex web of laws, licenses, and compliance obligations. Enterprise services bridge the gap between business intent and regulatory reality — providing structured, expert-driven support for every stage of a company&apos;s lifecycle.
                </p>
                <p>
                    From choosing the right legal structure at incorporation to maintaining ongoing regulatory filings, enterprise services ensure that businesses stay compliant, investor-ready, and operationally sound. For regulated entities in particular — NBFCs, fintechs, insurance intermediaries, SEBI-registered entities, and IFSCA participants — professional enterprise services are not optional; they are foundational.
                </p>
                <div className="info-box">
                    <strong>Key Regulatory Frameworks:</strong> Companies Act 2013, Reserve Bank of India (RBI) Master Directions, Securities &amp; Exchange Board of India (SEBI) Regulations, Insurance Regulatory &amp; Development Authority of India (IRDAI) Guidelines, International Financial Services Centres Authority (IFSCA) Regulations, GST Laws, and Income Tax Act.
                </div>
            </section>

            <section id="what-are-enterprise-services">
                <h2>What Are Enterprise Services</h2>
                <p>
                    Enterprise services in India refer to a comprehensive portfolio of professional, legal, regulatory, and compliance services that support businesses at every stage — from pre-incorporation planning to post-registration governance. These services are delivered by qualified professionals including Company Secretaries, Chartered Accountants, legal experts, and regulatory specialists.
                </p>
                <p>
                    Unlike generic business consulting, enterprise services are rooted in statutory obligations and regulatory frameworks. They encompass:
                </p>
                <ul>
                    <li>Business setup and legal structure selection (Company, LLP, Partnership, Section 8)</li>
                    <li>Regulatory license applications with RBI, SEBI, IRDAI, and IFSCA</li>
                    <li>Taxation structuring — GST, Income Tax, TDS, Transfer Pricing</li>
                    <li>Corporate governance, secretarial services, and ROC compliance</li>
                    <li>Legal documentation — agreements, SHA, due diligence, investment docs</li>
                    <li>FEMA compliance for cross-border transactions and foreign entities</li>
                    <li>Ongoing advisory, internal audits, and risk management frameworks</li>
                </ul>
                <blockquote className="expert-quote">
                    <p>&ldquo;Enterprise compliance is not a burden — it is the foundation on which scalable, investor-ready businesses are built. Every licensing decision, every governance structure, and every regulatory filing shapes the long-term credibility of your business.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
            </section>

            <section id="regulatory-framework">
                <h2>Regulatory Framework Governing Enterprise Services</h2>
                <p>
                    Enterprise services in India operate within a multi-regulator environment. Understanding which regulatory body governs your business activity is the first step to structuring compliant operations.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Regulator</th>
                            <th>Governed Entities</th>
                            <th>Key Legislation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ministry of Corporate Affairs (MCA)</td>
                            <td>All companies and LLPs</td>
                            <td>Companies Act 2013, LLP Act 2008</td>
                        </tr>
                        <tr>
                            <td>Reserve Bank of India (RBI)</td>
                            <td>NBFCs, Payment Aggregators, Banks, Foreign Exchange</td>
                            <td>RBI Act 1934, FEMA 1999, Payment &amp; Settlement Systems Act</td>
                        </tr>
                        <tr>
                            <td>SEBI</td>
                            <td>Investment Advisers, PMS, AIF, Brokers, Depositories</td>
                            <td>SEBI Act 1992, SEBI (RIA) Regulations, SEBI (AIF) Regulations</td>
                        </tr>
                        <tr>
                            <td>IRDAI</td>
                            <td>Insurance Brokers, Corporate Agents, TPAs</td>
                            <td>Insurance Act 1938, IRDAI (Insurance Brokers) Regulations</td>
                        </tr>
                        <tr>
                            <td>IFSCA</td>
                            <td>GIFT City entities — Fintechs, Finance Companies, Aircraft Lessors</td>
                            <td>IFSCA Act 2019, IFSCA (FinTech Incentive Scheme) Regulations</td>
                        </tr>
                        <tr>
                            <td>CBDT / GST Council</td>
                            <td>All business entities</td>
                            <td>Income Tax Act 1961, CGST Act 2017</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    For businesses operating across multiple sectors — such as a fintech providing both payment services and investment advisory — compliance obligations span multiple regulators simultaneously, making professional enterprise services indispensable.
                </p>
            </section>

            <section id="who-needs">
                <h2>Who Needs Enterprise Services</h2>
                <p>
                    Enterprise services cater to a broad spectrum of businesses in India. The following entities benefit most significantly from structured enterprise support:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Business Type</th>
                            <th>Key Enterprise Service Needs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Startups &amp; Founders</td>
                            <td>Legal structure selection, ESOP structuring, SHA drafting, early-stage compliance setup</td>
                        </tr>
                        <tr>
                            <td>NBFCs &amp; Fintechs</td>
                            <td>RBI license applications, KYC/AML compliance, Fair Practices Code, ongoing regulatory reporting</td>
                        </tr>
                        <tr>
                            <td>Insurance Intermediaries</td>
                            <td>IRDAI broker/corporate agent registration, infrastructure compliance, annual renewals</td>
                        </tr>
                        <tr>
                            <td>Foreign Companies</td>
                            <td>India entry route structuring, FEMA/RBI compliance, FC-GPR filings, FLA Return</td>
                        </tr>
                        <tr>
                            <td>MSMEs</td>
                            <td>Formalisation, GST registration, ROC filings, sector-specific licensing</td>
                        </tr>
                        <tr>
                            <td>Listed Entities</td>
                            <td>SEBI LODR compliance, board governance, secretarial audit, investor disclosures</td>
                        </tr>
                        <tr>
                            <td>Capital Market Participants</td>
                            <td>SEBI registrations (RIA, PMS, AIF, Broker), net worth maintenance, compliance officer appointment</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Eligibility Framework for Regulated Entities:</strong> Legal Structure (Company / LLP / Partnership as applicable), Capital Requirement (license-specific minimum net worth), Directors &amp; Promoters (fit &amp; proper criteria), Business Plan (mandatory for most regulated licenses), Infrastructure (registered office, IT systems, compliance infrastructure).
                </div>
            </section>

            <section id="types-of-services">
                <h2>Types of Enterprise Services</h2>
                <p>
                    Enterprise services in India can be broadly categorised into six core service verticals, each addressing a distinct dimension of business setup and regulatory compliance.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Service Category</th>
                            <th>Key Deliverables</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Business Setup &amp; Structuring</td>
                            <td>Pvt Ltd, LLP, OPC, Section 8 Company, foreign subsidiary &amp; branch office incorporation</td>
                        </tr>
                        <tr>
                            <td>Regulatory Licensing</td>
                            <td>RBI (NBFC, PA), SEBI (RIA, PMS, AIF, Broker), IRDAI (Broker, Corporate Agent), IFSCA licenses</td>
                        </tr>
                        <tr>
                            <td>Taxation &amp; Financial Compliance</td>
                            <td>GST registration &amp; returns, Income Tax filing, TDS compliance, Transfer Pricing</td>
                        </tr>
                        <tr>
                            <td>Corporate Governance &amp; Secretarial</td>
                            <td>Board meetings, ROC filings (MGT-7, AOC-4, PAS-3), ESOP structuring</td>
                        </tr>
                        <tr>
                            <td>Legal &amp; Contractual</td>
                            <td>Agreement drafting, Shareholders&apos; Agreement (SHA), investment documentation, due diligence</td>
                        </tr>
                        <tr>
                            <td>Advisory &amp; Risk Management</td>
                            <td>Regulatory advisory, compliance audits, FEMA compliance, internal governance frameworks</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="business-setup-structuring">
                <h2>Business Setup &amp; Structuring</h2>
                <p>
                    Choosing the right legal structure is the single most consequential decision at the pre-incorporation stage. Each structure carries different implications for liability, taxation, governance, fundraising, and regulatory eligibility.
                </p>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Structure Selection</strong>
                        <p>Evaluate between Private Limited Company, Limited Liability Partnership (LLP), One Person Company (OPC), Section 8 Company (non-profit), partnership firm, or a foreign subsidiary/branch structure based on business model, investor requirements, and regulatory eligibility.</p>
                    </li>
                    <li>
                        <strong>Step 2: Name Reservation &amp; DIN/DSC</strong>
                        <p>Reserve the business name via MCA SPICe+ portal. Obtain Director Identification Number (DIN) and Digital Signature Certificate (DSC) for all proposed directors or designated partners.</p>
                    </li>
                    <li>
                        <strong>Step 3: Incorporation Filing</strong>
                        <p>File SPICe+ form with MCA, including Memorandum of Association (MoA), Articles of Association (AoA), declarations, and identity/address proof. For LLPs, file Form FiLLiP. For foreign subsidiaries, file FC-1 within 30 days of establishment.</p>
                    </li>
                    <li>
                        <strong>Step 4: Post-Incorporation Setup</strong>
                        <p>Obtain PAN, TAN, GST registration, professional tax registration (state-specific), open bank accounts, and establish statutory registers, minute books, and share certificates.</p>
                    </li>
                    <li>
                        <strong>Step 5: Sector-Specific Pre-Licensing</strong>
                        <p>For regulated businesses, ensure the legal structure meets regulator-specific eligibility (e.g., NBFCs must be companies; SEBI RIAs can be individuals, partnership firms, LLPs, or companies with specific qualifications).</p>
                    </li>
                </ol>
                <div className="info-box">
                    <strong>Foreign Subsidiary vs. Branch Office:</strong> A Wholly Owned Subsidiary (WOS) is the most popular entry route for foreign companies as it provides limited liability and full operational flexibility. A Branch Office is restricted to activities permitted by RBI and involves more stringent ongoing compliance including annual activity certificates.
                </div>
            </section>

            <section id="regulatory-licensing-services">
                <h2>Regulatory Licensing Services</h2>
                <p>
                    For businesses in regulated sectors, obtaining the appropriate license from RBI, SEBI, IRDAI, or IFSCA is a pre-condition for operations. Regulatory licensing is one of the most documentation-intensive and technically demanding aspects of enterprise services.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Regulator</th>
                            <th>License Type</th>
                            <th>Key Eligibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RBI</td>
                            <td>NBFC Registration</td>
                            <td>Min. Rs. 10 Crore NOF, Company structure, fit &amp; proper directors</td>
                        </tr>
                        <tr>
                            <td>RBI</td>
                            <td>Payment Aggregator (PA)</td>
                            <td>Min. Rs. 25 Crore NOF (existing), Rs. 15 Crore (new applicants)</td>
                        </tr>
                        <tr>
                            <td>SEBI</td>
                            <td>Registered Investment Adviser (RIA)</td>
                            <td>NISM Series X-A/X-B certification, min. net worth</td>
                        </tr>
                        <tr>
                            <td>SEBI</td>
                            <td>Portfolio Management Services (PMS)</td>
                            <td>Min. Rs. 5 Crore net worth, SEBI-registered custodian arrangement</td>
                        </tr>
                        <tr>
                            <td>SEBI</td>
                            <td>Alternative Investment Fund (AIF)</td>
                            <td>Cat I/II/III fund, min. Rs. 20 Crore corpus, fit &amp; proper manager</td>
                        </tr>
                        <tr>
                            <td>IRDAI</td>
                            <td>Insurance Broker</td>
                            <td>Min. Rs. 75 Lakh capital (direct broker), qualified PQP</td>
                        </tr>
                        <tr>
                            <td>IRDAI</td>
                            <td>Corporate Agent</td>
                            <td>Specified person certification, principal officer qualification</td>
                        </tr>
                        <tr>
                            <td>IFSCA</td>
                            <td>Fintech Entity / Finance Company</td>
                            <td>GIFT City presence, IFSCA framework-specific requirements</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Regulatory Risks if Licensing is Ignored:</strong> Operating without a mandatory license can result in license rejection and debarment, heavy financial penalties, forced business shutdown, director disqualification by the regulator, and regulatory blacklisting — preventing future license applications across regulators.
                </div>
            </section>

            <section id="foreign-company-entry">
                <h2>Foreign Company Entry into India</h2>
                <p>
                    Foreign companies seeking to establish a presence in India must navigate FEMA 1999, RBI regulations, and the Companies Act 2013. The choice of entry structure significantly impacts liability, taxation, operational scope, and repatriation of profits.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Entry Route</th>
                            <th>Structure</th>
                            <th>Key Features</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wholly Owned Subsidiary (WOS)</td>
                            <td>Indian Private Limited Company (100% foreign holding)</td>
                            <td>Full operational flexibility, limited liability, preferred for most sectors</td>
                        </tr>
                        <tr>
                            <td>Joint Venture (JV)</td>
                            <td>Indian company with shared Indian-foreign ownership</td>
                            <td>Leverages local partner&apos;s market knowledge; common in regulated sectors</td>
                        </tr>
                        <tr>
                            <td>Liaison Office</td>
                            <td>Representative presence</td>
                            <td>No commercial activity permitted; requires RBI approval; annual returns mandatory</td>
                        </tr>
                        <tr>
                            <td>Branch Office</td>
                            <td>Extension of foreign parent</td>
                            <td>Limited permitted activities per RBI; no separate legal entity; Annual Activity Certificate (AAC) required</td>
                        </tr>
                        <tr>
                            <td>Project Office</td>
                            <td>Temporary presence for specific projects</td>
                            <td>Restricted to project scope; wind-up obligations post-project completion</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>FEMA Compliance for Foreign Companies:</strong> All FDI inflows must be reported via FC-GPR within 30 days of share allotment. Companies with foreign investment must file the FLA (Foreign Liabilities &amp; Assets) Return annually by July 15. ECBs (External Commercial Borrowings) require separate RBI reporting via Form ECB and ECB-2.
                </div>
            </section>

            <section id="taxation-compliance">
                <h2>Taxation &amp; Financial Compliance</h2>
                <p>
                    Indian businesses must comply with a multi-tier taxation framework. Enterprise services provide structured support for tax registration, return filing, and strategic tax planning across all applicable taxes.
                </p>
                <ul>
                    <li><strong>GST Registration &amp; Returns:</strong> Mandatory for businesses with turnover above threshold limits (Rs. 40 Lakh for goods, Rs. 20 Lakh for services). Monthly/quarterly return filing (GSTR-1, GSTR-3B), annual return (GSTR-9), and reconciliation statements.</li>
                    <li><strong>Income Tax:</strong> Annual ITR filing, advance tax payments, maintaining books of accounts as prescribed under Section 44AA, and tax audit under Section 44AB where applicable.</li>
                    <li><strong>TDS Compliance:</strong> Deduction of tax at source on salaries, professional fees, rent, interest, and contractor payments. Monthly TDS challan deposits and quarterly TDS returns (Form 24Q, 26Q).</li>
                    <li><strong>Transfer Pricing:</strong> For entities with international transactions or specified domestic transactions, maintaining transfer pricing documentation and filing Form 3CEB certified by a Chartered Accountant.</li>
                </ul>
                <div className="info-box">
                    <strong>For Regulated Entities:</strong> NBFCs, insurance companies, and capital market entities have additional financial compliance obligations including preparation of accounts as per regulator-prescribed formats, maintenance of statutory reserves, and submission of audited financials to the regulator within prescribed timelines.
                </div>
            </section>

            <section id="corporate-governance">
                <h2>Corporate Governance &amp; Secretarial Services</h2>
                <p>
                    Corporate governance is the backbone of a credible, investor-ready organisation. Secretarial services ensure that all statutory governance requirements under the Companies Act 2013 and applicable regulations are met accurately and on time.
                </p>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Board Meeting Compliance</strong>
                        <p>Conduct minimum statutory board meetings (4 per year for companies, with not more than 120 days between two meetings). Prepare and maintain agenda, notices, minutes, and attendance records as per Secretarial Standards SS-1.</p>
                    </li>
                    <li>
                        <strong>Step 2: Annual General Meeting (AGM)</strong>
                        <p>Hold AGM within 6 months of financial year end (September 30 for most companies). Approve financial statements, appoint/reappoint auditors, declare dividends, and pass necessary resolutions.</p>
                    </li>
                    <li>
                        <strong>Step 3: ROC Annual Filings</strong>
                        <p>File MGT-7 (Annual Return) within 60 days of AGM, AOC-4 (Financial Statements) within 30 days of AGM, and PAS-3 (Return of Allotment) within 30 days of share allotment. Late filings attract significant additional fees.</p>
                    </li>
                    <li>
                        <strong>Step 4: ESOP Structuring &amp; Administration</strong>
                        <p>Design ESOP plans compliant with Companies Act (Schedule VI), obtain board and shareholder approvals, file Form PAS-3 on each grant/exercise, and maintain statutory ESOP register.</p>
                    </li>
                    <li>
                        <strong>Step 5: Statutory Registers &amp; Records</strong>
                        <p>Maintain all statutory registers including Register of Members, Register of Directors, Register of Charges, Register of Contracts, and Register of Investments as required by the Companies Act.</p>
                    </li>
                </ol>
            </section>

            <section id="professional-vs-diy">
                <h2>Professional vs DIY — Why Expert Guidance Matters</h2>
                <p>
                    Many businesses attempt to manage enterprise compliance internally or use generic online tools. The comparison below illustrates why professional enterprise services deliver significantly better outcomes across all critical dimensions.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Professional Enterprise Services</th>
                            <th>DIY Approach</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Compliance Accuracy</td>
                            <td>High — expert-reviewed documentation and filings</td>
                            <td>Risky — frequent errors, missed requirements</td>
                        </tr>
                        <tr>
                            <td>Approval Timeline</td>
                            <td>Faster — pre-vetted applications with fewer deficiency queries</td>
                            <td>Delayed — regulators return incomplete applications repeatedly</td>
                        </tr>
                        <tr>
                            <td>Regulatory Knowledge</td>
                            <td>Expert — current with latest circulars, amendments, and regulator expectations</td>
                            <td>Limited — difficult to track frequent regulatory updates</td>
                        </tr>
                        <tr>
                            <td>Risk Management</td>
                            <td>Structured — proactive identification of compliance gaps</td>
                            <td>Ad hoc — issues discovered only after regulatory action</td>
                        </tr>
                        <tr>
                            <td>Documentation Quality</td>
                            <td>Complete — comprehensive, regulator-standard documentation</td>
                            <td>Gaps — missing annexures, incorrect formats, inadequate disclosures</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>The Real Cost of DIY Compliance Failure:</strong> A rejected license application, a regulatory show-cause notice, or a delayed ROC filing can cost multiples more in penalties, legal fees, and business disruption than the professional fee to get it right the first time.
                </div>
            </section>

            <section id="fees">
                <h2>Fees &amp; Cost Structure</h2>
                <p>
                    Enterprise service fees in India vary significantly based on service type, regulatory complexity, and scope. The following framework provides a broad guide to cost components.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Cost Component</th>
                            <th>Nature</th>
                            <th>Typical Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Government &amp; Regulatory Fees</td>
                            <td>One-time (per application or filing)</td>
                            <td>License-type specific — prescribed by regulator</td>
                        </tr>
                        <tr>
                            <td>Professional Service Fees</td>
                            <td>Engagement-based (scope-driven)</td>
                            <td>Varies by complexity, documentation volume, and service type</td>
                        </tr>
                        <tr>
                            <td>Recurring Compliance Cost</td>
                            <td>Annual or periodic</td>
                            <td>Depends on number of filings, regulatory reports, and audit requirements</td>
                        </tr>
                        <tr>
                            <td>Infrastructure Costs</td>
                            <td>One-time / recurring</td>
                            <td>Registered office, IT systems, compliance infrastructure as per regulator norms</td>
                        </tr>
                        <tr>
                            <td>Capital Requirements</td>
                            <td>Statutory minimum net worth</td>
                            <td>Varies: Rs. 10 Cr (NBFC), Rs. 5 Cr (PMS), Rs. 75 Lakh (Insurance Broker)</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Cost Transparency at Estabizz:</strong> We provide scope-specific fee estimates upfront with no hidden charges. Our retainer-based compliance packages for regulated entities ensure predictable annual compliance costs, allowing businesses to plan their regulatory spend with confidence.
                </div>
            </section>

            <section id="timeline">
                <h2>Enterprise Services Timeline</h2>
                <p>
                    The timeline for enterprise services varies depending on the type of activity — incorporation, documentation, and regulatory licensing each follow different processing timelines.
                </p>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Incorporation (7–10 Business Days)</strong>
                        <p>Company/LLP incorporation via MCA SPICe+ portal. Includes name reservation, DIN/DSC procurement, MoA/AoA drafting, and issuance of Certificate of Incorporation. OPCs and Section 8 companies may take slightly longer.</p>
                    </li>
                    <li>
                        <strong>Step 2: Documentation &amp; Pre-Application Preparation (10–15 Business Days)</strong>
                        <p>Compilation of business plan, KYC documents for directors/promoters, net worth certificates, infrastructure documentation, fit &amp; proper declarations, and regulatory application forms. Quality of documentation directly impacts approval timelines.</p>
                    </li>
                    <li>
                        <strong>Step 3: License Application &amp; Regulatory Review (30–120 Days)</strong>
                        <p>Submission to RBI, SEBI, IRDAI, or IFSCA. Regulators may raise deficiency letters or seek clarifications. Responding promptly and accurately to regulator queries is critical to avoiding extended timelines. SEBI RIA approvals typically take 30–45 days; RBI NBFC applications can take 3–4 months.</p>
                    </li>
                    <li>
                        <strong>Step 4: Post-Approval Setup (5–10 Business Days)</strong>
                        <p>Commencement of business filing (Form 20A for companies), appointment of Compliance Officer, establishment of regulatory reporting systems, and initiation of first compliance cycle.</p>
                    </li>
                </ol>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Timeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Incorporation (Company/LLP)</td>
                            <td>7–10 business days</td>
                        </tr>
                        <tr>
                            <td>Documentation &amp; Preparation</td>
                            <td>10–15 business days</td>
                        </tr>
                        <tr>
                            <td>Regulatory License Approval</td>
                            <td>30–120 days (regulator-dependent)</td>
                        </tr>
                        <tr>
                            <td>Total End-to-End</td>
                            <td>1–4 months</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="common-mistakes">
                <h2>Common Mistakes to Avoid</h2>
                <p>
                    Navigating enterprise compliance without expert guidance leads to predictable, costly errors. Understanding these pitfalls helps businesses avoid regulatory setbacks and unnecessary delays.
                </p>
                <div className="warning-box">
                    <strong>Top 6 Enterprise Compliance Mistakes:</strong>
                    <ol>
                        <li><strong>Wrong Business Structure:</strong> Choosing an LLP when the target regulatory license requires a company, or incorporating as a public company prematurely — both create structural barriers to licensing and fundraising.</li>
                        <li><strong>Inadequate Documentation:</strong> Submitting incomplete applications, missing annexures, or incorrectly formatted documents is the leading cause of deficiency letters and application delays.</li>
                        <li><strong>Ignoring Sector-Specific Regulations:</strong> Treating all regulatory frameworks as similar — failing to understand the specific requirements of RBI, SEBI, IRDAI, or IFSCA for each license type.</li>
                        <li><strong>Non-Compliance with Ongoing Filings:</strong> Missing ROC filing deadlines (MGT-7, AOC-4), regulatory returns (RBI, SEBI), or GST/TDS due dates results in compounding penalties and regulatory alerts.</li>
                        <li><strong>Underestimating Capital Requirements:</strong> Not planning for minimum net worth requirements at incorporation, leading to the need for emergency capital infusion before license applications.</li>
                        <li><strong>Lack of Professional Advisory:</strong> Relying on general-purpose CA/CS services instead of specialists with sector-specific regulatory expertise, particularly for RBI, SEBI, and IRDAI licensing.</li>
                    </ol>
                </div>
            </section>

            <section id="post-setup-compliance">
                <h2>Post-Setup Compliance Obligations</h2>
                <p>
                    Obtaining incorporation or a regulatory license is only the beginning. Maintaining compliance on an ongoing basis is equally — if not more — important for long-term business sustainability and regulatory good standing.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Area</th>
                            <th>Frequency</th>
                            <th>Key Obligations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Annual ROC Filings</td>
                            <td>Annual</td>
                            <td>MGT-7 (Annual Return), AOC-4 (Financial Statements), DIR-3 KYC for directors</td>
                        </tr>
                        <tr>
                            <td>Regulatory Reporting</td>
                            <td>Monthly / Quarterly / Annual</td>
                            <td>RBI returns (NBS-1, ALM), SEBI compliance reports, IRDAI annual returns</td>
                        </tr>
                        <tr>
                            <td>GST &amp; Income Tax</td>
                            <td>Monthly / Quarterly / Annual</td>
                            <td>GSTR-1, GSTR-3B, GSTR-9, ITR, advance tax, tax audit</td>
                        </tr>
                        <tr>
                            <td>Statutory Audit &amp; Financial Disclosures</td>
                            <td>Annual</td>
                            <td>Audited financial statements, CARO reporting, regulator-prescribed formats</td>
                        </tr>
                        <tr>
                            <td>Board Meetings &amp; Governance</td>
                            <td>Quarterly</td>
                            <td>Minimum 4 board meetings, maintaining minutes &amp; statutory registers, AGM</td>
                        </tr>
                        <tr>
                            <td>FEMA Annual Compliance</td>
                            <td>Annual</td>
                            <td>FLA Return (July 15), Branch Office Annual Activity Certificate (AAC)</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Compliance Calendar Management:</strong> Regulated entities benefit enormously from a structured compliance calendar managed by enterprise service professionals. Missing even a single regulatory deadline can trigger penalty notices, regulator correspondence, and in serious cases, license suspension.
                </div>
            </section>

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
