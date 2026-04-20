"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-ctr", title: "What is Compliance Test Report for AIF" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs CTR" },
        { id: "eligibility", title: "Eligibility & Applicability" },
        { id: "compliance-areas", title: "Compliance Areas Covered" },
        { id: "ctr-structure", title: "Format & Structure of CTR" },
        { id: "stakeholders", title: "Role of Key Stakeholders" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Preparation Process" },
        { id: "fees", title: "Fees Structure" },
        { id: "timeline", title: "Timeline" },
        { id: "ctr-vs-audit", title: "CTR vs Audit Report" },
        { id: "compliance", title: "Post-Submission Compliance" },
        { id: "consequences", title: "Consequences of Non-Compliance" },
        { id: "common-mistakes", title: "Common Mistakes" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is Compliance Test Report for AIF?",
            a: "It is an annual certification confirming that an Alternative Investment Fund complies with SEBI AIF Regulations, 2012 and the fund's own Private Placement Memorandum (PPM) conditions — including investment limits, concentration norms, leverage conditions, and governance requirements."
        },
        {
            q: "Is Compliance Test Report mandatory for all AIFs?",
            a: "Yes, it is mandatory for all SEBI-registered AIFs — Category I (Venture Capital, SME Funds, etc.), Category II (Private Equity, Debt Funds), and Category III (Hedge Funds). There is no size-based exemption."
        },
        {
            q: "Who prepares and certifies the Compliance Test Report?",
            a: "A qualified Chartered Accountant (CA), Company Secretary (CS), or compliance professional prepares and certifies the CTR independently. The certification confirms that the fund's operations comply with applicable regulations."
        },
        {
            q: "How is CTR different from an Audit Report?",
            a: "An Audit Report focuses on financial accuracy — whether financial statements are correct. A CTR focuses on regulatory compliance — whether the fund is operating within SEBI norms, investment limits, and PPM conditions. Both are annual requirements but serve different purposes."
        },
        {
            q: "What does the CTR check?",
            a: "CTR examines: adherence to sectoral caps and concentration limits, single investee exposure, fund strategy alignment with PPM, leverage limits (for Category III), investor drawdown procedures, related party transactions, valuation practices, and timely regulatory filings."
        },
        {
            q: "Is CTR applicable to a newly registered AIF?",
            a: "Yes, once operations begin (even partially deployed funds), compliance applies and CTR must be prepared for each completed period."
        },
        {
            q: "Is CTR required if no investments have been made?",
            a: "Yes. Even if no investments have been made, compliance must still be confirmed for the period. Registration alone triggers the compliance obligation."
        },
        {
            q: "What are the consequences of non-compliance in CTR?",
            a: "Consequences range from regulatory warnings and monetary penalties to restrictions on new investments and increased SEBI inspections. In serious cases, registration may be suspended or cancelled."
        },
        {
            q: "How often must CTR be prepared?",
            a: "The Compliance Test Report is an annual requirement. SEBI may also require it more frequently based on specific circumstances or upon regulatory request."
        },
        {
            q: "What is the timeline for preparing a Compliance Test Report?",
            a: "Data compilation takes 7–10 days. Regulatory review and analysis take 10–15 days. Professional certification takes 5–7 days. Total time is approximately 20–30 days from start to submission."
        },
        {
            q: "What is the most common mistake in CTR preparation?",
            a: "Treating CTR as a routine formality. Common mistakes include: ignoring minor deviations (which accumulate regulatory risk), lack of documentation trail, incorrect interpretation of investment limits, and over-reliance on internal teams without independent professional validation."
        },
        {
            q: "Does Category III AIF have additional requirements in CTR?",
            a: "Yes. Category III AIFs face additional scrutiny on leverage and borrowing limits, trading activity compliance, and derivatives exposure. SEBI monitors leverage-related deviations very closely for Category III funds."
        },
        {
            q: "Can deviations in CTR be corrected after detection?",
            a: "Yes. The CTR includes a 'Deviation Reporting' section where the nature, impact, and corrective action for each deviation must be disclosed. SEBI expects full transparency — not suppression of deviations."
        },
        {
            q: "What is the strategic importance of the Compliance Test Report?",
            a: "Beyond mandatory compliance, CTR builds investor trust, strengthens fund governance, reduces regulatory risk during inspections, and enhances fund credibility with institutional investors and co-investors."
        },
        {
            q: "Who is responsible for ensuring CTR compliance in an AIF?",
            a: "The Fund Manager and Trustee jointly ensure CTR compliance. The Compliance Officer coordinates documentation. The Certifying Professional (CA/CS) provides independent certification. Sponsors are also accountable for governance oversight."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "📊", label: "SEBI" },
                { emoji: "🏦", label: "AIF Compliance" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "SEBI Services", href: "/sebi" },
                { label: "AIF Compliance Test Report", href: "/sebi/aif-compliance-test-report" },
            ]}
            title="Compliance Test Report for AIF: Complete Guide with Key Requirements, Process & Expert Insights"
            readTime="15 min read"
            focusKeyword="Compliance Test Report for AIF"
            sections={sections}
            ctaTitle="AIF Compliance Test Report"
            ctaDescription="Our SEBI compliance professionals provide expert preparation and certification of Compliance Test Reports for all AIF categories — with full regulatory interpretation and deviation management."
            quickFacts={[
                { label: "Regulator", value: "SEBI" },
                { label: "Applicable To", value: "All AIF Categories" },
                { label: "Frequency", value: "Annual" },
                { label: "Certified By", value: "CA / CS" },
                { label: "Filing Fee", value: "Generally Nil" },
                { label: "Prep Timeline", value: "20–30 Days" },
                { label: "Expert Review", value: "✓ Verified" },
                { label: "Regulation", value: "SEBI AIF Regs 2012" },
            ]}
            relatedArticles={[
                { title: "Alternative Asset Portfolio Valuation", href: "/sebi/alternative-asset-portfolio-valuation", category: "SEBI", description: "Valuation framework for AIFs and alternative assets." },
                { title: "Collective Investment Schemes", href: "/sebi/collective-investment-schemes", category: "SEBI", description: "SEBI CIS registration and compliance guide." },
                { title: "Mutual Fund Registration", href: "/sebi/mutual-fund-registration", category: "SEBI", description: "SEBI registration for mutual fund asset management companies." },
                { title: "FEMA Compliance", href: "/fema/compliance-under-fema", category: "FEMA", description: "FEMA compliance guide for FDI, ODI, and cross-border transactions." },
            ]}
            finalCtaTitle="Need Expert Support for Your AIF Compliance Test Report?"
            finalCtaDescription="Our team handles the complete CTR process — from data compilation to professional certification — ensuring zero regulatory gaps."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    <strong>Compliance Test Report (CTR) for AIF</strong> is a critical regulatory requirement under SEBI that ensures Alternative Investment Funds operate strictly within prescribed guidelines, investment limits, and governance standards. It is not merely an annual formality — it is a <strong>core governance checkpoint</strong> that directly reflects a fund&apos;s regulatory discipline and operational transparency.
                </p>
                <p>
                    For fund managers, trustees, and compliance officers, the CTR validates that the AIF is functioning within SEBI&apos;s regulatory boundaries and within the terms of its own Private Placement Memorandum (PPM). Deviations discovered during CTR preparation must be disclosed and corrected — not suppressed.
                </p>
                <div className="info-box">
                    <strong>📌 Regulatory Basis:</strong> SEBI (Alternative Investment Funds) Regulations, 2012 — mandatory periodic compliance confirmations ensure regulatory oversight of all Category I, II, and III AIFs.
                </div>
            </section>

            {/* What is CTR */}
            <section id="what-is-ctr">
                <h2>What is Compliance Test Report for AIF</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>In simple terms</strong></td>
                            <td>An annual compliance check confirming the AIF is functioning within its regulatory and PPM boundaries</td>
                        </tr>
                        <tr>
                            <td><strong>From a compliance perspective</strong></td>
                            <td>Validates adherence to investment norms, concentration limits, leverage conditions, and investor-related restrictions</td>
                        </tr>
                        <tr>
                            <td><strong>Legally</strong></td>
                            <td>Mandatory under SEBI AIF Regulations — required to be prepared, certified, and maintained for regulatory inspection</td>
                        </tr>
                        <tr>
                            <td><strong>Certified by</strong></td>
                            <td>Chartered Accountant (CA) or Company Secretary (CS) — independent professional certification</td>
                        </tr>
                        <tr>
                            <td><strong>Frequency</strong></td>
                            <td>Annual (minimum); may be required more frequently by SEBI</td>
                        </tr>
                    </tbody>
                </table>
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
                            <td>Primary Regulation</td>
                            <td>SEBI (Alternative Investment Funds) Regulations, 2012</td>
                        </tr>
                        <tr>
                            <td>Regulatory Authority</td>
                            <td>Securities and Exchange Board of India (SEBI)</td>
                        </tr>
                        <tr>
                            <td>Supporting Guidelines</td>
                            <td>SEBI circulars on AIF compliance reporting; SEBI master circular on AIFs</td>
                        </tr>
                        <tr>
                            <td>Fund-Level Document</td>
                            <td>Private Placement Memorandum (PPM) — CTR verifies compliance with fund-specific investment conditions stated in PPM</td>
                        </tr>
                        <tr>
                            <td>SEBI&apos;s Expectation</td>
                            <td>True and fair compliance reporting; full disclosure of deviations; no suppression of material facts; timely corrective actions</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Who Needs */}
            <section id="who-needs">
                <h2>Who Needs Compliance Test Report</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>AIF Category</th>
                            <th>Examples</th>
                            <th>CTR Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Category I AIF</strong></td>
                            <td>Venture Capital Funds, SME Funds, Social Venture Funds, Infrastructure Funds, Angel Funds</td>
                            <td>Yes — Mandatory</td>
                        </tr>
                        <tr>
                            <td><strong>Category II AIF</strong></td>
                            <td>Private Equity Funds, Debt Funds, Fund of Funds</td>
                            <td>Yes — Mandatory</td>
                        </tr>
                        <tr>
                            <td><strong>Category III AIF</strong></td>
                            <td>Hedge Funds, complex trading strategies, leveraged funds</td>
                            <td>Yes — Mandatory (with additional leverage monitoring)</td>
                        </tr>
                    </tbody>
                </table>
                <p>Also applicable to: Fund Managers, Trustees, Sponsors, Investment Committees, and Compliance Officers of any registered AIF.</p>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
                <h2>Eligibility & Applicability</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Requirement</th>
                            <th>Practical Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>SEBI Registration</strong></td>
                            <td>Must be a SEBI-registered AIF</td>
                            <td>Mandatory from the date of registration</td>
                        </tr>
                        <tr>
                            <td><strong>Operational Status</strong></td>
                            <td>Even partially deployed funds covered</td>
                            <td>No investment is not an exemption — registration alone triggers compliance obligation</td>
                        </tr>
                        <tr>
                            <td><strong>Fund Structure</strong></td>
                            <td>Applies to each scheme within an AIF</td>
                            <td>Compliance reviewed at scheme level; fund of funds structures included</td>
                        </tr>
                        <tr>
                            <td><strong>Co-Investment Structures</strong></td>
                            <td>Applicable if under AIF framework</td>
                            <td>Co-investment vehicles registered as AIFs must comply</td>
                        </tr>
                        <tr>
                            <td><strong>Closed-Ended Funds</strong></td>
                            <td>Yes — until fund lifecycle completed</td>
                            <td>Wind-down phase compliance still required</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Compliance Areas */}
            <section id="compliance-areas">
                <h2>Compliance Areas Covered in CTR</h2>
                <p>The CTR is a structured, regulation-aligned review. Key areas examined:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>What is Checked</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Investment Conditions</strong></td>
                            <td>Sectoral caps, investment concentration limits, single investee exposure limits</td>
                        </tr>
                        <tr>
                            <td><strong>Fund Strategy Alignment</strong></td>
                            <td>Whether investments match stated PPM objectives; any deviation from declared strategy</td>
                        </tr>
                        <tr>
                            <td><strong>Leverage &amp; Borrowing</strong></td>
                            <td>Applicable primarily for Category III AIFs — monitoring of leverage limits and borrowing norms</td>
                        </tr>
                        <tr>
                            <td><strong>Investor Contributions &amp; Drawdowns</strong></td>
                            <td>Proper capital call procedures; equal treatment of investors; drawdown timelines</td>
                        </tr>
                        <tr>
                            <td><strong>Related Party Transactions</strong></td>
                            <td>Disclosure and approval mechanisms; conflict of interest management</td>
                        </tr>
                        <tr>
                            <td><strong>Valuation Practices</strong></td>
                            <td>Independent valuation norms; consistency in valuation methodology</td>
                        </tr>
                        <tr>
                            <td><strong>Regulatory Filings</strong></td>
                            <td>Periodic reporting to SEBI; timely submission of disclosures; no outstanding regulatory defaults</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* CTR Structure */}
            <section id="ctr-structure">
                <h2>Format & Structure of Compliance Test Report</h2>
                <p>While SEBI does not prescribe a single rigid format, CTR generally follows a structured compliance checklist approach. Typical structure:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Basic Fund Details</strong></td>
                            <td>AIF name, category, SEBI registration number, scheme name, period of review</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance Checklist</strong></td>
                            <td>Regulation-wise and clause-by-clause verification against SEBI AIF Regulations and PPM</td>
                        </tr>
                        <tr>
                            <td><strong>Investment Review</strong></td>
                            <td>Each investee company reviewed against permitted exposure limits and PPM conditions</td>
                        </tr>
                        <tr>
                            <td><strong>Deviation Reporting</strong></td>
                            <td>Nature of deviation, its impact, and corrective action taken — full transparency required</td>
                        </tr>
                        <tr>
                            <td><strong>Professional Certification</strong></td>
                            <td>Signed by CA or CS with professional declaration of independent verification</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Stakeholders */}
            <section id="stakeholders">
                <h2>Role of Key Stakeholders in CTR</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stakeholder</th>
                            <th>Role in CTR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Fund Manager</strong></td>
                            <td>Ensures operational compliance throughout the year; provides required investment and transaction data for CTR preparation</td>
                        </tr>
                        <tr>
                            <td><strong>Trustee / Sponsor</strong></td>
                            <td>Oversees governance and fund operations; reviews CTR; ensures corrective action on deviations</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance Officer</strong></td>
                            <td>Tracks regulatory adherence on an ongoing basis; coordinates documentation for CTR preparation</td>
                        </tr>
                        <tr>
                            <td><strong>Certifying Professional (CA / CS)</strong></td>
                            <td>Independently verifies compliance against regulations and PPM; issues professional certification and declaration</td>
                        </tr>
                        <tr>
                            <td><strong>Investment Committee</strong></td>
                            <td>Ensures investment decisions align with PPM strategy and SEBI norms</td>
                        </tr>
                    </tbody>
                </table>
                <blockquote className="expert-quote">
                    <p>&ldquo;Compliance is not only about rules — it is about interpretation. SEBI focuses more on intent and transparency than technical compliance alone. Proper documentation often acts as the first line of defence during inspections.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
            </section>

            {/* Documents */}
            <section id="documents">
                <h2>Documents Required for CTR Preparation</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                            <th>Mandatory</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AIF Registration Certificate</td>
                            <td>Regulatory identification and registration confirmation</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Private Placement Memorandum (PPM)</td>
                            <td>Investment guidelines reference — CTR verifies compliance with PPM conditions</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Financial Statements</td>
                            <td>Verification of financial transactions, investee exposures, and returns</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Investment Schedule</td>
                            <td>Details of all investments — amounts, dates, sectors, investee companies</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Drawdown Notices &amp; Capital Account Statements</td>
                            <td>Verify equal treatment of investors and proper capital call procedures</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Valuation Reports</td>
                            <td>Independent valuation of investee companies for NAV computation</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Related Party Transaction Records</td>
                            <td>Disclosure and approval documentation for RPTs</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>SEBI Filing Acknowledgements</td>
                            <td>Proof of timely regulatory filings and disclosures</td>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Process */}
            <section id="process">
                <h2>Step-by-Step CTR Preparation Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Collect Financial and Investment Data</h4>
                            <p>Compile all investment records, financial statements, drawdown notices, valuation reports, and SEBI filing records for the relevant period.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Review Compliance Against SEBI Regulations & PPM</h4>
                            <p>Conduct a clause-by-clause review of SEBI AIF Regulations and PPM conditions. Check investment limits, concentration norms, leverage, and investor protections.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Identify Deviations (If Any)</h4>
                            <p>Document all deviations — no matter how minor. Assess nature, impact, and required corrective action. Transparency is mandatory; suppression of deviations is a serious violation.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Prepare Compliance Report</h4>
                            <p>Structure the CTR document — basic fund details, compliance checklist, investment review, deviation reporting section, and executive summary.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Certification by CA / CS</h4>
                            <p>Independent professional reviews the report and issues certification. The certifying professional declares that compliance has been verified independently against applicable regulations.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Submission to Trustee / SEBI</h4>
                            <p>Submit the certified CTR to the Trustee and retain for regulatory inspection. File with SEBI as required by applicable guidelines and circulars.</p>
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
                            <th>Particulars</th>
                            <th>Amount</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>SEBI Filing Fees</strong></td>
                            <td>Generally Nil</td>
                            <td>CTR is maintained and submitted — no SEBI filing fee in most cases</td>
                        </tr>
                        <tr>
                            <td><strong>Professional Certification Fee</strong></td>
                            <td>Variable — depends on scope and complexity</td>
                            <td>CA / CS fees vary based on fund size, number of investments, and complexity of deviations</td>
                        </tr>
                        <tr>
                            <td><strong>Internal Compliance Cost</strong></td>
                            <td>Variable</td>
                            <td>Data compilation, compliance officer time, and document management costs</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Timeline */}
            <section id="timeline">
                <h2>Timeline for CTR Preparation</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Estimated Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data Compilation</td>
                            <td>7–10 days</td>
                        </tr>
                        <tr>
                            <td>Regulatory Review &amp; Analysis</td>
                            <td>10–15 days</td>
                        </tr>
                        <tr>
                            <td>Deviation Identification &amp; Reporting</td>
                            <td>Included in review phase</td>
                        </tr>
                        <tr>
                            <td>Professional Certification</td>
                            <td>5–7 days</td>
                        </tr>
                        <tr>
                            <td><strong>Total Estimated Time</strong></td>
                            <td><strong>20–30 days</strong></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* CTR vs Audit */}
            <section id="ctr-vs-audit">
                <h2>Compliance Test Report vs Audit Report</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th>Audit Report</th>
                            <th>Compliance Test Report (CTR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Objective</strong></td>
                            <td>Financial accuracy of financial statements</td>
                            <td>Regulatory compliance with SEBI norms and PPM</td>
                        </tr>
                        <tr>
                            <td><strong>Prepared By</strong></td>
                            <td>Statutory Auditor</td>
                            <td>CA / CS / Compliance Professional</td>
                        </tr>
                        <tr>
                            <td><strong>Focus Area</strong></td>
                            <td>Accounts, statements, and financial accuracy</td>
                            <td>SEBI regulations, investment limits, fund governance</td>
                        </tr>
                        <tr>
                            <td><strong>Frequency</strong></td>
                            <td>Annual</td>
                            <td>Annual (minimum); can be more frequent</td>
                        </tr>
                        <tr>
                            <td><strong>Nature</strong></td>
                            <td>Financial</td>
                            <td>Regulatory</td>
                        </tr>
                        <tr>
                            <td><strong>Deviation Coverage</strong></td>
                            <td>Financial misstatements</td>
                            <td>Regulatory deviations, PPM violations, governance gaps</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Post-Submission Compliance */}
            <section id="compliance">
                <h2>Post-Submission Compliance</h2>
                <p>CTR submission is not the end — ongoing compliance is equally critical:</p>
                <ul>
                    <li>Maintain continuous compliance records throughout the year — not just during CTR preparation</li>
                    <li>Address deviations immediately upon detection — do not wait for annual CTR cycle</li>
                    <li>Ensure periodic disclosures to SEBI and investors as per applicable timelines</li>
                    <li>Align new investments with stated PPM objectives before deployment</li>
                    <li>Monitor regulatory changes in SEBI AIF norms and update internal policies accordingly</li>
                    <li>Maintain an updated investment compliance tracker updated after each investment decision</li>
                </ul>
            </section>

            {/* Consequences */}
            <section id="consequences">
                <h2>Consequences of Non-Compliance in CTR</h2>
                <div className="warning-box">
                    <strong>⚠️ SEBI Enforcement:</strong> Failure in compliance reporting may lead to a range of regulatory actions. Repeated or serious violations carry risk of fund shutdown and registration cancellation.
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Non-Compliance Type</th>
                            <th>Consequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Delayed CTR preparation or submission</td>
                            <td>Regulatory warnings; monetary penalties</td>
                        </tr>
                        <tr>
                            <td>Suppression of deviations in CTR</td>
                            <td>Serious enforcement action; increased inspections</td>
                        </tr>
                        <tr>
                            <td>Repeated minor non-compliances</td>
                            <td>SEBI scrutiny even without major violations</td>
                        </tr>
                        <tr>
                            <td>Investment limit breaches not corrected</td>
                            <td>Restrictions on new investments</td>
                        </tr>
                        <tr>
                            <td>Serious governance violations</td>
                            <td>Suspension of new investments; cancellation of AIF registration</td>
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
                            <th>Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Treating CTR as a routine formality</td>
                            <td>Missed deviations accumulate into serious regulatory risk</td>
                        </tr>
                        <tr>
                            <td>Ignoring minor deviations</td>
                            <td>Consistent minor deviations attract SEBI scrutiny</td>
                        </tr>
                        <tr>
                            <td>Lack of documentation trail</td>
                            <td>Inability to defend compliance during inspections</td>
                        </tr>
                        <tr>
                            <td>Incorrect interpretation of investment limits</td>
                            <td>Unintentional breaches that are disclosed too late</td>
                        </tr>
                        <tr>
                            <td>Over-reliance on internal teams without external validation</td>
                            <td>Conflicts of interest; missed blind spots</td>
                        </tr>
                        <tr>
                            <td>Preparing CTR at year-end without ongoing monitoring</td>
                            <td>Deviations accumulate — corrective action becomes difficult</td>
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
