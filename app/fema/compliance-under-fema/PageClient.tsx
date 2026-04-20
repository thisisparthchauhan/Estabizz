"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-fema-compliance", title: "What Is FEMA Compliance" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs FEMA Compliance" },
        { id: "key-transaction-categories", title: "Key Transaction Categories" },
        { id: "fema-forms-filings", title: "FEMA Forms & Filings" },
        { id: "compliance-process", title: "Compliance Process" },
        { id: "compliance-checklist", title: "Compliance Checklist" },
        { id: "fees", title: "Fees & Charges" },
        { id: "timeline", title: "Timeline Summary" },
        { id: "common-mistakes", title: "Common Mistakes" },
        { id: "consequences", title: "Consequences of Non-Compliance" },
        { id: "fema-vs-fera", title: "FEMA vs FERA" },
        { id: "post-compliance", title: "Post-Compliance Requirements" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "Is FEMA applicable to all companies in India?",
            a: "FEMA applies to any person resident in India who undertakes a foreign exchange transaction. If a company has no foreign investment, no foreign borrowings, and no cross-border transactions, FEMA compliance obligations do not arise. Once any foreign element is introduced, FEMA obligations begin."
        },
        {
            q: "What is the difference between Automatic Route and Approval Route under FDI?",
            a: "Under the Automatic Route, a foreign investor can invest in an Indian company without prior approval from RBI or the Government. The Indian company only needs to comply with post-investment reporting (ARF, FC-GPR). Under the Approval Route, prior government approval is required before the investment is received. Once approved, the same reporting obligations apply."
        },
        {
            q: "What happens if I miss the ARF or FC-GPR deadline?",
            a: "Missing the ARF (30 days from remittance) or FC-GPR (30 days from allotment) deadline attracts a Late Submission Fee (LSF). The LSF is calculated as a percentage of the outstanding amount based on the delay period. For delays up to 3 years, LSF can be self-reported and paid through the AD Bank — no formal compounding needed. Beyond 3 years, a compounding application to RBI is required."
        },
        {
            q: "Is there any penalty for not filing the FLA Return?",
            a: "Yes. Non-filing of the FLA Return triggers a compounding proceeding by RBI. Companies that have outstanding FDI or ODI as of 31st March each year are mandatorily required to file the FLA Return by 15th July. There is no LSF option for FLA — it goes directly to compounding if not filed."
        },
        {
            q: "Can a startup receive angel funding from NRI friends or family without FEMA compliance?",
            a: "No. Any investment received from an NRI or foreign national into an Indian startup is an FDI transaction under FEMA — regardless of the amount or the relationship between investor and founder. ARF, FC-GPR, and FLA Return are mandatory even for small amounts received from an NRI."
        },
        {
            q: "What is the FLA Return and who must file it?",
            a: "The Foreign Liabilities & Assets (FLA) Return is an annual RBI survey that collects data on outstanding foreign investment in Indian companies and overseas investment by Indian companies. It is mandatory for all Indian companies/LLPs that have received FDI or made ODI and have such investment outstanding as of 31st March. Filing deadline is 15th July every year on RBI's FLAIR portal."
        },
        {
            q: "Can FEMA violations be regularised after the fact?",
            a: "Yes. RBI's Compounding mechanism allows past FEMA violations to be voluntarily regularised by paying a compounding fee. The process involves filing a compounding application with RBI, disclosing the violation, and paying the determined fee. Once compounded, the violation is settled and cannot be reopened."
        },
        {
            q: "What is an External Commercial Borrowing (ECB) and what are its FEMA obligations?",
            a: "An ECB is a loan raised by an Indian entity from a foreign lender. ECB compliance under FEMA requires: (1) Loan Registration before first drawdown via Form ECB on FIRMS, (2) Compliance with minimum average maturity, eligible end-use, and all-in-cost ceilings, (3) Monthly ECB-2 return within 7 working days of month end, and (4) Reporting any changes within 7 days."
        },
        {
            q: "Is there a minimum investment amount below which FEMA does not apply?",
            a: "No. FEMA has no de minimis threshold. The obligation to comply with FEMA reporting arises from the nature of the transaction, not the amount. Even USD 100 of FDI requires ARF and FC-GPR filing. However, the Late Submission Fee is calculated as a percentage of the outstanding amount, so small amounts have proportionally smaller fees if delayed."
        },
        {
            q: "What documents are needed for FC-GPR filing?",
            a: "FC-GPR filing requires: (1) Copy of FIRC / bank credit advice for the remittance, (2) KYC of foreign investor from AD Bank, (3) FMV valuation certificate from SEBI-registered Merchant Banker or CA, (4) Board resolution for share allotment, (5) Certificate from CS/director on compliance with sectoral caps and pricing guidelines, (6) CA Certificate for FDI calculation, (7) MOA & AOA if first FDI, and (8) Foreign investor's entity documents."
        },
        {
            q: "What is compounding under FEMA and how does it work?",
            a: "Compounding is RBI's voluntary regularisation mechanism for FEMA violations. The process: (1) Identify the violation and compute the amount, (2) File compounding application with Compounding Authority at RBI, (3) Submit all relevant documents and disclose the full facts, (4) RBI issues a show-cause notice and holds a hearing, (5) RBI passes a compounding order with a fee, (6) Pay the fee — violation is settled. Compounding is one-time; the same violation cannot be compounded again."
        },
        {
            q: "Do remittances for import payments require FEMA compliance?",
            a: "Import payments are current account transactions — generally freely permitted. However, if advance remittance exceeds USD 2,00,000, a bank guarantee from the foreign supplier may be required. Additionally, if imports are not realised within 6 months (180 days), the period must be extended or action taken. GR/SDF forms for export declarations are handled by the AD Bank."
        },
        {
            q: "Can an Indian company accept convertible notes from foreign investors?",
            a: "Yes. FEMA permits Convertible Notes (CNs) issued by DPIIT-recognised Indian startups to foreign investors for amounts of INR 25 lakh or more. CNs must convert into equity or be repaid within 5 years. CN issuance requires specific reporting on FIRMS within 30 days. The same FLA Return obligation applies once CNs are converted to equity."
        },
        {
            q: "What is the role of the Authorised Dealer (AD) Bank in FEMA compliance?",
            a: "The AD Bank (Authorised Dealer Category I — typically commercial banks) acts as the intermediary between the company and RBI for all FEMA filings. The company cannot file directly on FIRMS in most cases — filings are submitted by the AD Bank on the company's behalf. The AD Bank also issues the FIRC and provides the KYC of the foreign investor, both required for FIRMS filings."
        },
        {
            q: "Is ODI (Overseas Direct Investment) allowed for all Indian companies?",
            a: "ODI is permitted for Indian companies under the ODI Rules 2022 within prescribed financial commitment limits (generally 400% of net worth under automatic route). ODI is not permitted in countries identified as high-risk by FATF. All ODI must be reported on FIRMS, and an Annual Performance Report (APR) must be filed for each overseas investment every year by 31st December."
        },
        {
            q: "What is the Liberalised Remittance Scheme (LRS) and who can use it?",
            a: "LRS allows resident individuals (not companies) to remit up to USD 2,50,000 per financial year for any permissible current or capital account transaction — including overseas investment, education, travel, and maintenance of dependents. LRS remittances are subject to 20% TCS above certain thresholds — a key compliance point for individuals."
        },
        {
            q: "How does FEMA apply to ESOP grants to foreign employees?",
            a: "When an Indian company grants ESOPs to employees of its foreign subsidiary or to foreign nationals, it constitutes a reportable FEMA transaction. The company must report the ESOP issuance to non-residents within 30 days on FIRMS and ensure pricing is at FMV. Exercise price can be below FMV only if the scheme complies with specific FEMA circular provisions."
        },
        {
            q: "Can FEMA violations lead to criminal prosecution?",
            a: "Pure FEMA violations are civil in nature — they lead to monetary penalties, not criminal prosecution. However, if FEMA violations are linked to money laundering, hawala transactions, or predicate offences under PMLA, the Enforcement Directorate (ED) can initiate criminal proceedings under PMLA — a separate and much more serious proceeding. FEMA itself does not contemplate criminal prosecution for routine compliance failures."
        },
        {
            q: "Are there FEMA restrictions on NRI investment in India?",
            a: "NRIs can invest in India through multiple routes: NRE/NRO accounts for direct investment, FDI route for equity investment in companies, and NRI-specific portfolios on stock exchanges. NRI investments on non-repatriation basis (NRO funds) are generally treated as domestic investment, not FDI. NRI investments on repatriation basis (NRE funds) are treated as FDI and require full FEMA reporting."
        },
        {
            q: "When should I engage a professional for FEMA compliance?",
            a: "Engage a FEMA professional (CS or CA with FEMA specialisation) when: (1) You are receiving your first foreign investment, (2) You have missed a deadline and are unsure of LSF vs. compounding route, (3) You are considering an ODI or outward remittance above small amounts, (4) You have received a notice from RBI, or (5) You are undertaking a secondary share transfer (FC-TRS) which has complex pricing and documentation requirements. Proactive engagement is far cheaper than post-facto regularisation."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🌐", label: "FEMA" },
                { emoji: "🏦", label: "RBI" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "FEMA Services", href: "/fema" },
                { label: "Compliance Under FEMA", href: "/fema/compliance-under-fema" },
            ]}
            title="Compliance Under FEMA: Complete Guide to FDI, ODI & ECB Reporting Obligations in India"
            readTime="18 min read"
            focusKeyword="Compliance Under FEMA"
            sections={sections}
            ctaTitle="FEMA Compliance Support"
            ctaDescription="Our FEMA specialists handle the complete lifecycle of foreign exchange compliance — from ARF and FC-GPR filings to FLA Returns, compounding applications, and ongoing ECB reporting — ensuring zero regulatory gaps."
            quickFacts={[
                { label: "Governing Law", value: "FEMA 1999" },
                { label: "Regulator", value: "RBI" },
                { label: "Nature", value: "Civil (not criminal)" },
                { label: "Key Forms", value: "ARF, FC-GPR, FC-TRS, FLA" },
                { label: "ARF Deadline", value: "30 days from receipt" },
                { label: "FC-GPR Deadline", value: "30 days from allotment" },
                { label: "FLA Return", value: "15th July annually" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "AIF Compliance Test Report", href: "/sebi/aif-compliance-test-report", category: "SEBI", description: "Annual compliance certification for Alternative Investment Funds." },
                { title: "Alternative Asset Portfolio Valuation", href: "/sebi/alternative-asset-portfolio-valuation", category: "SEBI", description: "Valuation framework for AIFs and alternative assets under SEBI." },
                { title: "AMFI Registration & Distribution", href: "/sebi/amfi-registration", category: "SEBI", description: "ARN registration and mutual fund distribution compliance guide." },
                { title: "Credit Rating Agency Registration", href: "/sebi/credit-rating-agency", category: "SEBI", description: "SEBI registration and compliance for Credit Rating Agencies." },
            ]}
            finalCtaTitle="Need Expert Support for FEMA Compliance?"
            finalCtaDescription="Our team manages the full FEMA compliance cycle — ARF, FC-GPR, FC-TRS, FLA Return, ECB reporting, and compounding applications — so you stay compliant at every stage of your foreign investment journey."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    The <strong>Foreign Exchange Management Act, 1999 (FEMA)</strong> governs all foreign exchange transactions in India. Administered by the <strong>Reserve Bank of India (RBI)</strong>, FEMA regulates capital account transactions, current account transactions, and the movement of foreign currency across India&apos;s borders.
                </p>
                <p>
                    Unlike its predecessor FERA (Foreign Exchange Regulation Act, 1973), FEMA is a <strong>civil law</strong> — violations attract monetary penalties rather than criminal prosecution (except in cases of money laundering). This shift made India more investment-friendly while maintaining robust compliance obligations.
                </p>
                <div className="info-box">
                    <strong>Key Principle:</strong> Under FEMA, all current account transactions are generally permissible unless explicitly prohibited, whereas capital account transactions are permissible only if specifically allowed by RBI regulations or general permission.
                </div>
                <p>
                    Compliance under FEMA is not a one-time event — it is an ongoing obligation that triggers with every foreign exchange inflow, outflow, investment, or borrowing involving cross-border elements. Startups, corporates, NRIs, and exporters must track their FEMA obligations continuously.
                </p>
            </section>

            {/* What Is FEMA Compliance */}
            <section id="what-is-fema-compliance">
                <h2>What Is FEMA Compliance</h2>
                <p>
                    FEMA Compliance refers to the set of <strong>reporting, filing, and documentation obligations</strong> that Indian residents (including companies, LLPs, and individuals) must fulfil when engaging in transactions involving foreign exchange or foreign investment.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Dimension</th>
                            <th>Description</th>
                            <th>Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Transactional Compliance</strong></td>
                            <td>Structuring transactions within permitted limits and routes</td>
                            <td>FDI under automatic route; correct pricing; sectoral cap checks</td>
                        </tr>
                        <tr>
                            <td><strong>Reporting Compliance</strong></td>
                            <td>Filing prescribed forms within stipulated deadlines</td>
                            <td>ARF within 30 days; FC-GPR within 30 days; FC-TRS within 60 days</td>
                        </tr>
                        <tr>
                            <td><strong>Ongoing Annual Compliance</strong></td>
                            <td>Submitting annual reports on outstanding foreign liabilities and assets</td>
                            <td>FLA Return by 15th July; ECB-2 monthly returns; ODI APR annually</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Who is a &ldquo;Person Resident in India&rdquo; under FEMA?</strong> A person who has been residing in India for more than 182 days in the preceding financial year, or a company/entity incorporated in India, is considered &ldquo;resident in India&rdquo; for FEMA purposes — regardless of citizenship or nationality.
                </div>
            </section>

            {/* Regulatory Framework */}
            <section id="regulatory-framework">
                <h2>Regulatory Framework</h2>
                <p>
                    FEMA compliance is governed by a multi-layered regulatory architecture with the principal legislation supported by specific rules, regulations, and master directions:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Regulation / Rule</th>
                            <th>Subject Matter</th>
                            <th>Key Provision</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FEMA 1999 (Act)</td>
                            <td>Parent Legislation</td>
                            <td>Defines transactions, roles, penalties, and powers of RBI</td>
                        </tr>
                        <tr>
                            <td>NDI Rules 2019 (Non-Debt Instruments)</td>
                            <td>FDI / Foreign Equity Investment</td>
                            <td>Sectors, caps, conditions for FDI; replaces FEMA 20/2017</td>
                        </tr>
                        <tr>
                            <td>ODI Rules 2022 (Overseas Direct Investment)</td>
                            <td>Indian Outward Investment</td>
                            <td>Framework for Indian entities investing abroad</td>
                        </tr>
                        <tr>
                            <td>FEMA (Debt Instruments) Regulations 2019</td>
                            <td>FPI / Debt Securities</td>
                            <td>FPI investment in debt instruments</td>
                        </tr>
                        <tr>
                            <td>ECB Guidelines (Master Direction)</td>
                            <td>External Commercial Borrowings</td>
                            <td>Eligible borrowers, lenders, limits, end-use, reporting</td>
                        </tr>
                        <tr>
                            <td>FEMA (Current Account Transactions) Rules 2000</td>
                            <td>Current Account</td>
                            <td>Remittances, trade payments, travel</td>
                        </tr>
                        <tr>
                            <td>LRS — Liberalised Remittance Scheme</td>
                            <td>Resident Individuals</td>
                            <td>USD 2,50,000 per year for individuals</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    The <strong>Authorised Dealer (AD) Bank</strong> plays a critical role — most FEMA filings are submitted through the AD Bank (the company&apos;s banker), which then reports to RBI&apos;s <strong>FIRMS portal</strong> (Foreign Investment Reporting &amp; Management System).
                </p>
            </section>

            {/* Who Needs FEMA Compliance */}
            <section id="who-needs">
                <h2>Who Needs FEMA Compliance</h2>
                <p>
                    FEMA compliance obligations arise for any person resident in India who is involved in foreign exchange transactions:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Entity / Person</th>
                            <th>Transaction Type</th>
                            <th>Compliance Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Indian Company (Private / Public)</td>
                            <td>Receives FDI / Foreign Investment</td>
                            <td>ARF, FC-GPR, FLA Return, FC-TRS (on transfer)</td>
                        </tr>
                        <tr>
                            <td>Indian LLP</td>
                            <td>Receives FDI from NRI / Foreign National</td>
                            <td>LLP-I (inflow), LLP-II (profit repatriation)</td>
                        </tr>
                        <tr>
                            <td>Indian Company / LLP</td>
                            <td>Invests Overseas (ODI)</td>
                            <td>ODI Filing, APR (Annual Performance Report)</td>
                        </tr>
                        <tr>
                            <td>Indian Borrower</td>
                            <td>Raises External Commercial Borrowing</td>
                            <td>Loan Registration, ECB-2 monthly return</td>
                        </tr>
                        <tr>
                            <td>Exporter / Importer</td>
                            <td>Trade transactions in forex</td>
                            <td>GR/SDF forms, advance remittance declarations</td>
                        </tr>
                        <tr>
                            <td>NRI / PIO</td>
                            <td>Investments in India (NRE/NRO accounts, property)</td>
                            <td>Applicable FEMA regulations on repatriation, investment</td>
                        </tr>
                        <tr>
                            <td>Startups with Foreign Funding</td>
                            <td>Angel / VC / PE from foreign investors</td>
                            <td>ARF, FC-GPR, FLA Return mandatory from first year</td>
                        </tr>
                        <tr>
                            <td>Foreign Company&apos;s Indian Branch / Liaison Office</td>
                            <td>Cross-border remittances, expenses</td>
                            <td>Annual Activity Certificate (AAC), RBI filings</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Important:</strong> FEMA compliance applies to the <em>Indian entity</em> receiving foreign investment — not the foreign investor. The obligation to file ARF, FC-GPR, and FLA Return rests entirely on the Indian investee company.
                </div>
            </section>

            {/* Key Transaction Categories */}
            <section id="key-transaction-categories">
                <h2>Key Transaction Categories</h2>
                <p>
                    FEMA divides all foreign exchange transactions into two broad categories, each with distinct compliance requirements:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Default Treatment</th>
                            <th>Examples</th>
                            <th>Compliance Trigger</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Current Account Transactions</strong></td>
                            <td>Generally freely permissible unless specifically restricted</td>
                            <td>Trade payments, service payments, travel, education remittances, dividends to foreign investors</td>
                            <td>Procedural documentation; AD Bank certifications</td>
                        </tr>
                        <tr>
                            <td><strong>Capital Account Transactions</strong></td>
                            <td>Permissible only if specifically allowed by RBI/FEMA rules</td>
                            <td>FDI in India, ODI by Indians, ECB, FPI, immovable property abroad</td>
                            <td>Full reporting (ARF, FC-GPR, FC-TRS, FLA, ECB-2); prior approval where required</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    The most common compliance obligations arise from <strong>FDI (inward)</strong>, <strong>ODI (outward)</strong>, and <strong>ECB (borrowings)</strong>. Each has a distinct set of filing requirements, timelines, and ongoing reporting obligations.
                </p>
            </section>

            {/* FEMA Forms & Filings */}
            <section id="fema-forms-filings">
                <h2>FEMA Forms &amp; Filings</h2>
                <p>
                    Every category of foreign exchange transaction has one or more prescribed reporting forms to be filed with RBI (through the AD Bank or FIRMS portal):
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Form / Return</th>
                            <th>Transaction Type</th>
                            <th>Filed By</th>
                            <th>Deadline</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>ARF</strong> (Advance Remittance Form)</td>
                            <td>Receipt of FDI remittance (before share allotment)</td>
                            <td>Indian Company via AD Bank</td>
                            <td>Within 30 days of receiving funds</td>
                            <td>FIRMS Portal / AD Bank</td>
                        </tr>
                        <tr>
                            <td><strong>FC-GPR</strong> (Foreign Currency — Gross Provisional Return)</td>
                            <td>Issue of shares to foreign investor</td>
                            <td>Indian Company via AD Bank</td>
                            <td>Within 30 days of share allotment</td>
                            <td>FIRMS Portal</td>
                        </tr>
                        <tr>
                            <td><strong>FC-TRS</strong> (Transfer of Shares)</td>
                            <td>Transfer of shares between resident and non-resident</td>
                            <td>Resident transferor/transferee via AD Bank</td>
                            <td>Within 60 days of receipt/payment of consideration</td>
                            <td>FIRMS Portal</td>
                        </tr>
                        <tr>
                            <td><strong>FLA Return</strong> (Foreign Liabilities &amp; Assets)</td>
                            <td>Annual survey of outstanding FDI/ODI</td>
                            <td>Indian Company with FDI/ODI outstanding</td>
                            <td>By 15th July every year</td>
                            <td>RBI FLAIR Portal</td>
                        </tr>
                        <tr>
                            <td><strong>ODI Form / APR</strong></td>
                            <td>Overseas direct investment by Indian entity</td>
                            <td>Indian Investor Company via AD Bank</td>
                            <td>APR annually by 31 December; ODI on investment</td>
                            <td>FIRMS Portal</td>
                        </tr>
                        <tr>
                            <td><strong>ECB-2 Return</strong></td>
                            <td>External Commercial Borrowing outstanding</td>
                            <td>ECB Borrower via AD Bank</td>
                            <td>Monthly (within 7 working days of month end)</td>
                            <td>FIRMS / AD Bank</td>
                        </tr>
                        <tr>
                            <td><strong>LLP-I</strong></td>
                            <td>Receipt of FDI by LLP</td>
                            <td>Indian LLP via AD Bank</td>
                            <td>Within 30 days of receiving funds</td>
                            <td>FIRMS Portal</td>
                        </tr>
                        <tr>
                            <td><strong>LLP-II</strong></td>
                            <td>Disinvestment / profit repatriation from LLP</td>
                            <td>Indian LLP via AD Bank</td>
                            <td>Within 60 days of disinvestment/repatriation</td>
                            <td>FIRMS Portal</td>
                        </tr>
                        <tr>
                            <td><strong>Form ECB</strong> (Loan Registration)</td>
                            <td>Raising new ECB (loan from foreign lender)</td>
                            <td>Borrower via AD Bank</td>
                            <td>Before first drawdown</td>
                            <td>FIRMS Portal</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>FIRMS Portal:</strong> RBI&apos;s unified digital platform handles all FDI-related reporting (ARF, FC-GPR, FC-TRS, FLA). Authorized Dealers (banks) submit on behalf of the company using the company&apos;s registered credentials.
                </div>
            </section>

            {/* Compliance Process */}
            <section id="compliance-process">
                <h2>Compliance Process</h2>
                <p>
                    The standard FEMA compliance process for a company receiving FDI follows six sequential steps:
                </p>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Transaction Structuring &amp; Route Determination</strong>
                        <p>Identify whether the proposed investment/transaction is under the <strong>Automatic Route</strong> (no prior RBI/Government approval needed) or the <strong>Approval Route</strong> (requires government approval). Verify sectoral caps, prohibited sectors, and entry conditions under NDI Rules 2019.</p>
                    </li>
                    <li>
                        <strong>Step 2: Receive Foreign Remittance &amp; Obtain FIRC</strong>
                        <p>Once the foreign investor remits funds, obtain the <strong>inward remittance certificate (FIRC)</strong> and <strong>KYC of the foreign investor</strong> from the AD Bank — these are mandatory attachments for FIRMS filing. FIRC issuance typically takes 3-7 working days.</p>
                    </li>
                    <li>
                        <strong>Step 3: File ARF (Advance Remittance Form)</strong>
                        <p>Report the receipt of foreign funds to RBI via the AD Bank using the ARF on FIRMS portal. This must be done <strong>within 30 days</strong> of receipt of remittance and before allotment of shares. Attach FIRC, KYC, and declaration of compliance.</p>
                    </li>
                    <li>
                        <strong>Step 4: Board Resolution &amp; Share Allotment</strong>
                        <p>Hold Board meeting to allot shares to the foreign investor at a price not less than the Fair Market Value (FMV) determined by a SEBI-registered Merchant Banker or CA as per DCF/NAV method. Shares must be allotted <strong>within 60 days</strong> of receiving funds.</p>
                    </li>
                    <li>
                        <strong>Step 5: File FC-GPR (Foreign Currency Gross Provisional Return)</strong>
                        <p>After allotment, file FC-GPR on FIRMS portal through AD Bank, attaching the allotment letter, FMV certificate, MOA/AOA, and CA Certificate. Deadline: <strong>within 30 days of allotment</strong>. Failure attracts Late Submission Fee (LSF).</p>
                    </li>
                    <li>
                        <strong>Step 6: Annual FLA Return Filing</strong>
                        <p>File the <strong>FLA Return</strong> on RBI&apos;s FLAIR portal every year by <strong>15th July</strong>, disclosing outstanding FDI liabilities and ODI assets as of 31st March. This is mandatory every year until the foreign investment is fully repatriated.</p>
                    </li>
                </ol>
                <div className="warning-box">
                    <strong>Critical:</strong> Share allotment cannot be delayed beyond 60 days from the date of receipt of foreign funds. If allotment is delayed, the funds must be refunded to the foreign investor through normal banking channels — this is non-negotiable under FEMA.
                </div>
            </section>

            {/* Compliance Checklist */}
            <section id="compliance-checklist">
                <h2>Compliance Checklist</h2>
                <p>
                    Use this checklist to track ongoing FEMA compliance status across different transaction types:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Item</th>
                            <th>Trigger Event</th>
                            <th>Deadline</th>
                            <th>Form / Action</th>
                            <th>Penalty for Delay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ARF Filing</td>
                            <td>Receipt of FDI remittance</td>
                            <td>30 days from receipt</td>
                            <td>ARF on FIRMS</td>
                            <td>LSF applicable</td>
                        </tr>
                        <tr>
                            <td>Share Allotment</td>
                            <td>After ARF filing</td>
                            <td>60 days from remittance</td>
                            <td>Board Resolution + ROC filings</td>
                            <td>Refund of funds mandatory</td>
                        </tr>
                        <tr>
                            <td>FC-GPR Filing</td>
                            <td>After share allotment</td>
                            <td>30 days from allotment</td>
                            <td>FC-GPR on FIRMS</td>
                            <td>LSF applicable</td>
                        </tr>
                        <tr>
                            <td>FC-TRS Filing</td>
                            <td>Transfer of shares between resident &amp; NR</td>
                            <td>60 days from consideration</td>
                            <td>FC-TRS on FIRMS</td>
                            <td>LSF applicable</td>
                        </tr>
                        <tr>
                            <td>FLA Return</td>
                            <td>Annual (if FDI/ODI outstanding)</td>
                            <td>15th July every year</td>
                            <td>RBI FLAIR portal</td>
                            <td>Compounding proceeding</td>
                        </tr>
                        <tr>
                            <td>ODI Filing &amp; APR</td>
                            <td>On making overseas investment</td>
                            <td>ODI: before investment; APR: 31 Dec annually</td>
                            <td>FIRMS Portal via AD Bank</td>
                            <td>LSF + compounding</td>
                        </tr>
                        <tr>
                            <td>ECB-2 Return</td>
                            <td>Monthly (if ECB outstanding)</td>
                            <td>Within 7 working days of month end</td>
                            <td>FIRMS via AD Bank</td>
                            <td>LSF applicable</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Fees & Charges */}
            <section id="fees">
                <h2>Fees &amp; Charges</h2>
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
                            <td>Government Filing Fee (ARF / FC-GPR / FC-TRS)</td>
                            <td><strong>NIL</strong></td>
                            <td>No statutory fee for FEMA filings with RBI/FIRMS</td>
                        </tr>
                        <tr>
                            <td>FLA Return Filing Fee</td>
                            <td><strong>NIL</strong></td>
                            <td>Free filing on RBI FLAIR portal</td>
                        </tr>
                        <tr>
                            <td>Late Submission Fee (LSF) — ARF / FC-GPR</td>
                            <td>0.05% – 0.15% per year on outstanding amount</td>
                            <td>Slabs based on delay period; capped at 300% of principal</td>
                        </tr>
                        <tr>
                            <td>Late Submission Fee (LSF) — ECB-2</td>
                            <td>INR 5,000 – INR 50,000 per return</td>
                            <td>As per RBI Master Directions on ECB</td>
                        </tr>
                        <tr>
                            <td>Compounding Fee (Voluntary Regularisation)</td>
                            <td>Variable — based on violation amount and duration</td>
                            <td>Filed with RBI Compounding Authority; one-time settlement</td>
                        </tr>
                        <tr>
                            <td>FEMA Penalty (Adjudication)</td>
                            <td>Up to 3 times the amount of contravention</td>
                            <td>Can continue at INR 5,000/day for continuing violations</td>
                        </tr>
                        <tr>
                            <td>Professional / CS Fees</td>
                            <td>INR 25,000 – INR 2,00,000</td>
                            <td>Depends on complexity, number of filings, compounding needs</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Late Submission Fee (LSF):</strong> RBI introduced LSF as an alternative to compounding for minor procedural delays. LSF can be paid to regularise late filings without going through the formal compounding process — significantly faster and cheaper for smaller violations.
                </div>
            </section>

            {/* Timeline Summary */}
            <section id="timeline">
                <h2>Timeline Summary</h2>
                <p>
                    Key FEMA deadlines to track from the date of a foreign investment transaction:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Milestone</th>
                            <th>Deadline</th>
                            <th>Consequence of Breach</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FIRC &amp; KYC Documents from AD Bank</td>
                            <td>Within 1–2 weeks of remittance</td>
                            <td>Delays ARF filing; cascading LSF risk</td>
                        </tr>
                        <tr>
                            <td>ARF Filing on FIRMS</td>
                            <td>Within 30 days of remittance</td>
                            <td>LSF on outstanding amount</td>
                        </tr>
                        <tr>
                            <td>FMV Valuation Certificate (FDI)</td>
                            <td>Before Board Meeting for allotment</td>
                            <td>Invalid allotment; FEMA violation</td>
                        </tr>
                        <tr>
                            <td>Share Allotment</td>
                            <td>Within 60 days of remittance</td>
                            <td>Refund mandatory; FEMA violation</td>
                        </tr>
                        <tr>
                            <td>FC-GPR Filing</td>
                            <td>Within 30 days of allotment</td>
                            <td>LSF on outstanding amount</td>
                        </tr>
                        <tr>
                            <td>FC-TRS Filing (share transfer)</td>
                            <td>Within 60 days of consideration receipt/payment</td>
                            <td>LSF on transaction value</td>
                        </tr>
                        <tr>
                            <td>FLA Return (annual)</td>
                            <td>15th July (for period ending 31st March)</td>
                            <td>Compounding; notice from RBI</td>
                        </tr>
                        <tr>
                            <td>ECB-2 Monthly Return</td>
                            <td>Within 7 working days of month end</td>
                            <td>LSF per delayed return</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Common Mistakes */}
            <section id="common-mistakes">
                <h2>Common Mistakes</h2>
                <p>
                    These are the most frequently encountered FEMA compliance errors:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Common Misconception / Mistake</th>
                            <th>Correct Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>&ldquo;FDI is under automatic route so no compliance needed&rdquo;</td>
                            <td>Automatic route only means no <em>prior</em> approval. Post-investment reporting (ARF, FC-GPR, FLA Return) is still mandatory. Automatic route ≠ no compliance.</td>
                        </tr>
                        <tr>
                            <td>&ldquo;The amount is small so FEMA doesn&apos;t apply&rdquo;</td>
                            <td>FEMA has no de minimis threshold. Even USD 100 of foreign investment triggers full reporting requirements. Amount is irrelevant to the obligation to file.</td>
                        </tr>
                        <tr>
                            <td>Allotting shares first, filing ARF later</td>
                            <td>ARF must be filed <em>before</em> share allotment. The correct sequence is: Receive funds → File ARF → Allot shares → File FC-GPR.</td>
                        </tr>
                        <tr>
                            <td>Issuing shares at face value / below FMV</td>
                            <td>For FDI, shares must be issued at or above FMV as per DCF/NAV method. Issuance below FMV is a FEMA violation — the difference is treated as a deemed remittance without compliance.</td>
                        </tr>
                        <tr>
                            <td>&ldquo;No new FDI this year, so no FLA Return needed&rdquo;</td>
                            <td>FLA Return is required every year as long as FDI or ODI is <em>outstanding</em>. If foreign shares are still held, the FLA Return must be filed annually regardless of whether new investment was received.</td>
                        </tr>
                        <tr>
                            <td>Ignoring downstream investment notifications</td>
                            <td>If a company with FDI makes downstream investments in other Indian companies, additional FEMA compliance is triggered for foreign-owned Indian companies investing in subsidiaries.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Consequences of Non-Compliance */}
            <section id="consequences">
                <h2>Consequences of Non-Compliance</h2>
                <p>
                    FEMA enforcement operates on an escalating scale — from administrative fees for minor delays to formal penalties and prosecution for deliberate violations:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Violation Type</th>
                            <th>Consequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Level 1</strong></td>
                            <td>Minor procedural delay (ARF, FC-GPR late)</td>
                            <td>Late Submission Fee (LSF) — self-certification, paid via AD Bank</td>
                        </tr>
                        <tr>
                            <td><strong>Level 2</strong></td>
                            <td>Significant delay or non-filing</td>
                            <td>Compounding with RBI — file application, pay compounding fee, receive order</td>
                        </tr>
                        <tr>
                            <td><strong>Level 3</strong></td>
                            <td>Substantial contravention (wrong route, excess investment, etc.)</td>
                            <td>Penalty up to <strong>3 times</strong> the amount involved under FEMA Section 13</td>
                        </tr>
                        <tr>
                            <td><strong>Level 4</strong></td>
                            <td>Continuing violation</td>
                            <td>Additional penalty of INR 5,000 per day for each day of violation</td>
                        </tr>
                        <tr>
                            <td><strong>Level 5</strong></td>
                            <td>Money laundering / wilful non-compliance</td>
                            <td>PMLA proceedings + Enforcement Directorate (ED) investigation</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Enforcement Directorate (ED):</strong> FEMA violations (civil) are adjudicated by RBI/FEMA Adjudicating Authority. However, if the violation is connected to money laundering, the ED under PMLA takes over — which is a criminal proceeding. This is the key distinction from the &ldquo;FEMA is civil, not criminal&rdquo; principle.
                </div>
            </section>

            {/* FEMA vs FERA */}
            <section id="fema-vs-fera">
                <h2>FEMA vs FERA</h2>
                <p>
                    Understanding the shift from FERA to FEMA helps appreciate why compliance is structured the way it is today:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>FERA 1973 (Repealed)</th>
                            <th>FEMA 1999 (Current)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nature of Law</td>
                            <td>Criminal</td>
                            <td>Civil</td>
                        </tr>
                        <tr>
                            <td>Burden of Proof</td>
                            <td>On accused (reverse burden)</td>
                            <td>On enforcement authority</td>
                        </tr>
                        <tr>
                            <td>Approach to FX Transactions</td>
                            <td>Prohibitory — all restricted unless allowed</td>
                            <td>Facilitative — current account free, capital account regulated</td>
                        </tr>
                        <tr>
                            <td>Arrest / Custody</td>
                            <td>Yes — arrest without warrant possible</td>
                            <td>No — arrest only under PMLA by ED</td>
                        </tr>
                        <tr>
                            <td>Penalty</td>
                            <td>Imprisonment up to 7 years</td>
                            <td>Monetary penalty up to 3x contravention amount</td>
                        </tr>
                        <tr>
                            <td>Capital Controls</td>
                            <td>Strict — foreign exchange treated as scarce resource</td>
                            <td>Liberal — free movement permitted within rules</td>
                        </tr>
                        <tr>
                            <td>Investment Climate</td>
                            <td>Restrictive, deterred foreign investment</td>
                            <td>Open, investment-friendly, aligned with liberalisation</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Post-Compliance Requirements */}
            <section id="post-compliance">
                <h2>Post-Compliance Requirements</h2>
                <p>
                    FEMA compliance is not limited to initial filings — the following ongoing obligations must be tracked throughout the life of the foreign investment:
                </p>
                <ul>
                    <li><strong>Annual FLA Return:</strong> File every year by 15th July as long as FDI or ODI is outstanding. Non-filing triggers compounding proceedings.</li>
                    <li><strong>FC-TRS on Share Transfers:</strong> Any subsequent transfer of shares between a resident and non-resident must be reported within 60 days.</li>
                    <li><strong>Valuation for Exit:</strong> When a foreign investor sells back shares to a resident, the price must not be less than FMV (floor price for non-resident seller). Incorrect exit pricing is a violation.</li>
                    <li><strong>Downstream Investment Notifications:</strong> If the Indian investee company makes further investments in other Indian companies, those downstream investments must comply with FEMA rules.</li>
                    <li><strong>Dividend/Royalty Repatriation Compliance:</strong> Repatriation of dividends, royalties, or technical fees to foreign investors must be through AD Bank with prescribed tax clearances.</li>
                    <li><strong>FC-GPR on Bonus/Rights Issues:</strong> If new shares are issued to the foreign investor via rights or bonus, a fresh FC-GPR must be filed.</li>
                    <li><strong>ECB Monitoring:</strong> For active ECBs, monthly ECB-2 returns and compliance with end-use restrictions, parking norms, and reporting of drawdowns must be maintained throughout the loan period.</li>
                </ul>
                <blockquote className="expert-quote">
                    <p>&ldquo;FEMA compliance is invisible when done correctly and catastrophic when ignored. The most expensive FEMA violations we see are not wilful breaches — they are missed deadlines by founders who assumed that automatic route meant no compliance.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, FEMA &amp; Cross-Border Transactions Specialist</footer>
                </blockquote>
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
