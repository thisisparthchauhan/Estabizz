"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function NBFCFinancialModelingClient() {
    const tags = [
        { emoji: "🏦", label: "RBI Regulated" },
        { emoji: "📊", label: "Financial Modeling" },
        { emoji: "📋", label: "NBFC Compliance" },
        { emoji: "💹", label: "Projections & Analysis" },
    ];

    const breadcrumb = [
        { label: "Home", href: "/" },
        { label: "RBI Services", href: "/rbi" },
        { label: "NBFC Financial Modeling" },
    ];

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-financial-modeling", title: "What is NBFC Financial Modeling?" },
        { id: "why-financial-model-matters", title: "Why a Financial Model Matters for NBFC" },
        { id: "components", title: "Key Components of NBFC Financial Model" },
        { id: "rbi-requirements", title: "RBI Requirements & Regulatory Framework" },
        { id: "projection-methodology", title: "Projection Methodology" },
        { id: "capital-adequacy", title: "Capital Adequacy & CRAR Modeling" },
        { id: "asset-quality", title: "Asset Quality & NPA Projections" },
        { id: "revenue-model", title: "Revenue & Cost Modeling" },
        { id: "stress-testing", title: "Stress Testing & Sensitivity Analysis" },
        { id: "process", title: "Our Financial Modeling Process" },
        { id: "documents-required", title: "Documents Required" },
        { id: "timeline", title: "Timeline & Deliverables" },
        { id: "faq", title: "Frequently Asked Questions" },
    ];

    const quickFacts = [
        { label: "Projection Period", value: "5 Years" },
        { label: "Min Net Owned Fund", value: "₹2 Crore" },
        { label: "CRAR Requirement", value: "15%" },
        { label: "Delivery Time", value: "7–10 Working Days" },
        { label: "Format", value: "Excel + PDF Report" },
        { label: "RBI Compliance", value: "Fully Compliant" },
    ];

    const relatedArticles = [
        {
            href: "/rbi/nbfc-aa-license-guide",
            category: "RBI Services",
            title: "NBFC Account Aggregator License Guide",
            description: "Complete guide to obtaining an Account Aggregator license under the RBI framework including eligibility and process.",
        },
        {
            href: "/services/nbfc-business-plan",
            category: "RBI Services",
            title: "NBFC Business Plan Preparation",
            description: "Professional NBFC business plan drafting for RBI registration and fundraising purposes.",
        },
        {
            href: "/rbi",
            category: "RBI Services",
            title: "All RBI Regulatory Services",
            description: "Explore all RBI regulatory services including NBFC registration, takeover, and compliance support.",
        },
    ];

    return (
        <ServicePageLayout
            tags={tags}
            breadcrumb={breadcrumb}
            title="NBFC Financial Modeling: Complete Guide to RBI-Compliant Financial Projections"
            readTime="14 min read"
            focusKeyword="NBFC Financial Modeling"
            sections={sections}
            ctaTitle="Need a Professional NBFC Financial Model?"
            ctaDescription="Our experts prepare RBI-compliant financial models with 5-year projections, CRAR analysis, and stress testing."
            quickFacts={quickFacts}
            relatedArticles={relatedArticles}
            finalCtaTitle="Get a RBI-Compliant NBFC Financial Model Today"
            finalCtaDescription="Estabizz Fintech prepares comprehensive NBFC financial models that meet RBI's rigorous standards. Expert consultation, fast delivery, end-to-end support."
        >
            <h2 id="introduction">Introduction to NBFC Financial Modeling</h2>
            <p>
                Non-Banking Financial Companies (NBFCs) operate under the strict regulatory oversight of the Reserve Bank of India (RBI). One of the most critical requirements for NBFC registration, fundraising, and ongoing compliance is the preparation of a robust <strong>financial model</strong>. An NBFC financial model is not just a set of numbers — it is a dynamic, forward-looking analytical framework that demonstrates the viability, sustainability, and regulatory compliance of the proposed or existing lending business.
            </p>
            <p>
                Whether you are applying for a fresh NBFC Certificate of Registration (CoR), seeking private equity investment, or preparing for an RBI supervisory review, a well-structured financial model forms the backbone of your entire business case.
            </p>
            <div className="info-box">
                <strong>📌 Key Insight:</strong> RBI requires NBFC applicants to demonstrate financial viability through projections covering at least 5 years, with specific attention to Capital to Risk-Weighted Assets Ratio (CRAR), Net Owned Fund (NOF), and asset quality benchmarks.
            </div>

            <h2 id="what-is-financial-modeling">What is NBFC Financial Modeling?</h2>
            <p>
                NBFC financial modeling is the process of building a detailed, integrated financial forecast that captures the expected financial performance of an NBFC over a defined projection period — typically five years. It translates the business strategy, lending portfolio assumptions, funding mix, operational costs, and regulatory requirements into quantified financial statements.
            </p>
            <p>A comprehensive NBFC financial model typically includes:</p>
            <ul>
                <li>Projected Income Statements (Profit & Loss)</li>
                <li>Projected Balance Sheets</li>
                <li>Projected Cash Flow Statements</li>
                <li>Capital Adequacy and CRAR projections</li>
                <li>Loan book growth and portfolio composition</li>
                <li>Net Interest Margin (NIM) and spread analysis</li>
                <li>Provisioning and NPA projections</li>
                <li>Funding and liability structure modeling</li>
                <li>Key performance indicators (KPIs) and financial ratios</li>
                <li>Sensitivity analysis and stress testing scenarios</li>
            </ul>

            <h2 id="why-financial-model-matters">Why a Financial Model Matters for NBFC Registration</h2>
            <p>
                The importance of a financial model for NBFCs extends well beyond regulatory compliance. It serves multiple critical purposes across the NBFC lifecycle:
            </p>
            <div className="numbered-card">
                <div className="num-badge">1</div>
                <div>
                    <h4>RBI Registration Requirement</h4>
                    <p className="!mb-0">RBI mandates financial projections as part of the Certificate of Registration application. Without a credible financial model, the application lacks the quantitative foundation RBI evaluators require.</p>
                </div>
            </div>
            <div className="numbered-card">
                <div className="num-badge">2</div>
                <div>
                    <h4>Investor & Fundraising Readiness</h4>
                    <p className="!mb-0">PE funds, VC investors, and strategic partners rely on NBFC financial models to evaluate investment potential, assess risk-adjusted returns, and benchmark performance against sector peers.</p>
                </div>
            </div>
            <div className="numbered-card">
                <div className="num-badge">3</div>
                <div>
                    <h4>Internal Strategic Planning</h4>
                    <p className="!mb-0">Management uses the financial model as a roadmap for capital allocation, branch expansion, product diversification, and hiring decisions.</p>
                </div>
            </div>
            <div className="numbered-card">
                <div className="num-badge">4</div>
                <div>
                    <h4>Bank Credit Facilities</h4>
                    <p className="!mb-0">Banks and financial institutions evaluate NBFC borrowers using financial projections to determine credit limits, pricing, and covenants under lending arrangements.</p>
                </div>
            </div>
            <div className="numbered-card">
                <div className="num-badge">5</div>
                <div>
                    <h4>RBI Supervisory Reviews</h4>
                    <p className="!mb-0">During on-site and off-site inspections, RBI examiners review financial models to assess forward-looking risk management practices and capital planning.</p>
                </div>
            </div>

            <h2 id="components">Key Components of an NBFC Financial Model</h2>
            <h3>1. Loan Book Modeling</h3>
            <p>The loan book is the core revenue-generating asset of any NBFC. The financial model must project:</p>
            <ul>
                <li>Opening and closing loan book balance by product segment</li>
                <li>Disbursement volumes and ticket size assumptions</li>
                <li>Repayment schedules and prepayment rates</li>
                <li>Geographic and demographic segmentation</li>
                <li>Interest yield by product and borrower category</li>
            </ul>
            <h3>2. Income Statement Projections</h3>
            <p>The projected P&amp;L should capture:</p>
            <ul>
                <li>Net Interest Income (NII) = Interest earned minus interest expended</li>
                <li>Non-interest income: processing fees, foreclosure charges, insurance commissions</li>
                <li>Operating expenses: salaries, technology, branch costs, regulatory compliance costs</li>
                <li>Provisions for NPAs as per RBI's Income Recognition and Asset Classification (IRAC) norms</li>
                <li>Profit Before Tax (PBT) and Profit After Tax (PAT)</li>
            </ul>
            <h3>3. Balance Sheet Projections</h3>
            <p>Balance sheet modeling ensures that the NBFC maintains adequate capitalization:</p>
            <ul>
                <li>Asset side: Loan book, liquid investments, fixed assets, other assets</li>
                <li>Liability side: Borrowings (bank loans, NCDs, ECBs), deposits (where applicable), other liabilities</li>
                <li>Equity: Paid-up capital, reserves, retained earnings</li>
                <li>Net Owned Fund (NOF) computation as per RBI definition</li>
            </ul>

            <h2 id="rbi-requirements">RBI Requirements and Regulatory Framework</h2>
            <p>
                The RBI's regulatory framework for NBFCs — encompassing the Master Directions on Non-Banking Financial Companies, the Scale-Based Regulation (SBR) framework, and circulars on IRAC norms — establishes specific financial benchmarks that the financial model must address.
            </p>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Regulatory Metric</th>
                        <th>Requirement</th>
                        <th>Applicable Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Minimum Net Owned Fund (NOF)</td>
                        <td>₹2 Crore (Base Layer NBFCs)</td>
                        <td>All new NBFCs</td>
                    </tr>
                    <tr>
                        <td>Capital to Risk-Weighted Assets Ratio (CRAR)</td>
                        <td>Minimum 15%</td>
                        <td>NBFC-ND-SI &amp; NBFC-D</td>
                    </tr>
                    <tr>
                        <td>Tier I Capital Ratio</td>
                        <td>Minimum 10%</td>
                        <td>NBFC-ND-SI</td>
                    </tr>
                    <tr>
                        <td>Leverage Ratio</td>
                        <td>Maximum 7x (Base Layer)</td>
                        <td>NBFC-ND Base Layer</td>
                    </tr>
                    <tr>
                        <td>Liquidity Coverage Ratio (LCR)</td>
                        <td>Phased implementation</td>
                        <td>Systemically Important NBFCs</td>
                    </tr>
                    <tr>
                        <td>Provisioning (Standard Assets)</td>
                        <td>0.25% – 1%</td>
                        <td>All NBFCs</td>
                    </tr>
                    <tr>
                        <td>NPA Classification</td>
                        <td>90 DPD (Days Past Due)</td>
                        <td>All NBFCs</td>
                    </tr>
                </tbody>
            </table>
            <div className="warning-box">
                <strong>⚠️ Regulatory Note:</strong> Under the Scale-Based Regulation (SBR) framework effective from October 2022, NBFCs are classified into Base Layer (BL), Middle Layer (ML), Upper Layer (UL), and Top Layer (TL). Each layer has different capital and leverage requirements that must be accurately reflected in the financial model.
            </div>

            <h2 id="projection-methodology">Projection Methodology</h2>
            <p>
                A rigorous NBFC financial projection follows a structured bottom-up and top-down methodology:
            </p>
            <div className="step-timeline">
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 1</div>
                        <h4>Business Model Analysis</h4>
                        <p>Understand the target segment, product offerings, geography, and competitive positioning to establish realistic growth assumptions.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 2</div>
                        <h4>Loan Book Build-Up</h4>
                        <p>Model disbursement pipeline, ticket sizes, tenors, yields, and repayments to project the outstanding loan book quarter-by-quarter.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 3</div>
                        <h4>Revenue &amp; Expense Modeling</h4>
                        <p>Derive NII from the loan book, layer in fee income, and build out operating expenses based on staffing and infrastructure plans.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 4</div>
                        <h4>Capital &amp; Funding Structure</h4>
                        <p>Plan equity infusions, debt raising milestones, and ensure CRAR compliance throughout the projection period.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 5</div>
                        <h4>NPA &amp; Provisioning</h4>
                        <p>Apply sector-benchmarked credit cost assumptions and model NPA build-up, write-offs, and provisioning as per IRAC norms.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 6</div>
                        <h4>Integrated Statements &amp; Ratios</h4>
                        <p>Compile integrated P&amp;L, Balance Sheet, Cash Flow statements, and compute regulatory ratios including CRAR, NOF, and leverage.</p>
                    </div>
                </div>
            </div>

            <h2 id="capital-adequacy">Capital Adequacy and CRAR Modeling</h2>
            <p>
                Capital adequacy is perhaps the most scrutinized aspect of NBFC financial models by RBI. The CRAR projection must demonstrate that the NBFC maintains the minimum required ratio throughout the projection period, even under adverse scenarios.
            </p>
            <p>CRAR computation involves:</p>
            <ul>
                <li><strong>Tier I Capital:</strong> Paid-up equity, free reserves, retained earnings minus intangible assets and accumulated losses</li>
                <li><strong>Tier II Capital:</strong> General provisions, revaluation reserves (subject to discounts), subordinated debt</li>
                <li><strong>Risk-Weighted Assets (RWA):</strong> On-balance sheet exposures and off-balance sheet exposures weighted by prescribed risk weights</li>
            </ul>
            <div className="success-box">
                <strong>✅ Best Practice:</strong> The financial model should demonstrate CRAR exceeding the minimum threshold by at least 200–300 basis points to account for unexpected credit losses and regulatory buffer requirements under the Internal Capital Adequacy Assessment Process (ICAAP).
            </div>

            <h2 id="asset-quality">Asset Quality and NPA Projections</h2>
            <p>
                Asset quality projections are critical both for the credibility of the financial model and for demonstrating proactive risk management to RBI.
            </p>
            <h3>IRAC Classification Buckets</h3>
            <ul>
                <li><strong>Standard Assets:</strong> Performing loans where no default or irregularity exists</li>
                <li><strong>Sub-Standard Assets:</strong> NPAs for a period not exceeding 12 months</li>
                <li><strong>Doubtful Assets:</strong> NPA for more than 12 months</li>
                <li><strong>Loss Assets:</strong> Where loss has been identified but not written off</li>
            </ul>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Asset Category</th>
                        <th>Minimum Provision</th>
                        <th>DPD Threshold</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Standard Assets (Commercial)</td>
                        <td>0.40%</td>
                        <td>0–89 days</td>
                    </tr>
                    <tr>
                        <td>Standard Assets (Housing)</td>
                        <td>0.25%</td>
                        <td>0–89 days</td>
                    </tr>
                    <tr>
                        <td>Sub-Standard Assets</td>
                        <td>10%</td>
                        <td>90–449 days</td>
                    </tr>
                    <tr>
                        <td>Doubtful Assets – D1</td>
                        <td>20–25%</td>
                        <td>450–539 days</td>
                    </tr>
                    <tr>
                        <td>Doubtful Assets – D2</td>
                        <td>30–40%</td>
                        <td>540–719 days</td>
                    </tr>
                    <tr>
                        <td>Doubtful Assets – D3</td>
                        <td>100%</td>
                        <td>&gt;719 days</td>
                    </tr>
                    <tr>
                        <td>Loss Assets</td>
                        <td>100%</td>
                        <td>Identified loss</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="revenue-model">Revenue and Cost Modeling</h2>
            <p>
                The revenue model for an NBFC must capture all income streams while correctly categorizing costs to arrive at the true operating efficiency of the business.
            </p>
            <h3>Revenue Streams</h3>
            <ul>
                <li>Interest income on loans and advances</li>
                <li>Processing fees and documentation charges</li>
                <li>Prepayment and foreclosure charges</li>
                <li>Insurance distribution income</li>
                <li>Advisory and co-lending income</li>
                <li>Interest on surplus funds and liquid investments</li>
            </ul>
            <h3>Cost Structure</h3>
            <ul>
                <li>Interest expense on borrowings (cost of funds)</li>
                <li>Employee costs: salaries, benefits, ESOP expense</li>
                <li>Credit bureau and underwriting expenses</li>
                <li>Technology infrastructure and software costs</li>
                <li>Collections and recovery expenses</li>
                <li>Compliance and regulatory costs</li>
                <li>Marketing and customer acquisition costs</li>
                <li>Depreciation on fixed assets</li>
            </ul>

            <h2 id="stress-testing">Stress Testing and Sensitivity Analysis</h2>
            <p>
                RBI increasingly expects NBFCs, particularly systemically important ones, to conduct and document stress tests as part of their ICAAP and risk management frameworks. The financial model should incorporate:
            </p>
            <div className="numbered-card">
                <div className="num-badge">1</div>
                <div>
                    <h4>Credit Stress Scenarios</h4>
                    <p className="!mb-0">Model 1.5x and 2x the base-case NPA assumptions to assess the impact on provisioning, PAT, and CRAR. Ensure CRAR remains above the minimum threshold in all stress scenarios.</p>
                </div>
            </div>
            <div className="numbered-card">
                <div className="num-badge">2</div>
                <div>
                    <h4>Interest Rate Sensitivity</h4>
                    <p className="!mb-0">Analyze the impact of 100bps and 200bps upward/downward movements in interest rates on NIM, cost of funds, and profitability.</p>
                </div>
            </div>
            <div className="numbered-card">
                <div className="num-badge">3</div>
                <div>
                    <h4>Liquidity Stress Testing</h4>
                    <p className="!mb-0">Simulate sudden withdrawal of credit lines, maturity mismatches, and fund-raising challenges to assess short-term liquidity adequacy.</p>
                </div>
            </div>
            <div className="numbered-card">
                <div className="num-badge">4</div>
                <div>
                    <h4>Growth Scenario Analysis</h4>
                    <p className="!mb-0">Model optimistic, base, and conservative growth scenarios to present a range of outcomes and demonstrate business viability across market conditions.</p>
                </div>
            </div>

            <h2 id="process">Our NBFC Financial Modeling Process at Estabizz</h2>
            <div className="step-timeline">
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Day 1–2</div>
                        <h4>Information Collection</h4>
                        <p>We conduct a detailed intake call to understand your business model, target segment, product portfolio, geography, and funding plans. We share a structured data request checklist.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Day 3–5</div>
                        <h4>Model Architecture &amp; Assumptions</h4>
                        <p>Our financial modeling team builds the model architecture, establishes assumption tables calibrated to RBI requirements and industry benchmarks, and circulates an assumptions paper for your review.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Day 6–8</div>
                        <h4>Model Build &amp; Review</h4>
                        <p>Full model build incorporating your approved assumptions. Internal review by our compliance and NBFC specialist team to ensure regulatory alignment.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Day 9–10</div>
                        <h4>Delivery &amp; Presentation</h4>
                        <p>Delivery of final Excel model with scenario toggles, PDF management summary report, and a presentation deck. Post-delivery clarification calls included.</p>
                    </div>
                </div>
            </div>

            <h2 id="documents-required">Documents Required</h2>
            <p>To prepare an accurate NBFC financial model, we typically require the following inputs from the client:</p>
            <ul>
                <li>Business plan document or pitch deck</li>
                <li>Details of proposed product portfolio (loan products, ticket sizes, tenors, yield expectations)</li>
                <li>Target customer segment profile</li>
                <li>Planned geographic footprint and branch expansion schedule</li>
                <li>Existing or proposed organizational structure and hiring plan</li>
                <li>Details of proposed equity capital and funding sources</li>
                <li>Historical financials (for existing NBFCs seeking re-registration or restructuring)</li>
                <li>Technology infrastructure details (for digital NBFCs)</li>
                <li>Draft Memorandum of Association (MoA) and Articles of Association (AoA)</li>
            </ul>

            <h2 id="timeline">Timeline and Deliverables</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Deliverable</th>
                        <th>Format</th>
                        <th>Timeline</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Financial Model (5-Year Projections)</td>
                        <td>Excel (.xlsx)</td>
                        <td>7–10 Working Days</td>
                    </tr>
                    <tr>
                        <td>Management Summary Report</td>
                        <td>PDF Report</td>
                        <td>Included</td>
                    </tr>
                    <tr>
                        <td>Assumptions Documentation</td>
                        <td>Excel/PDF</td>
                        <td>Included</td>
                    </tr>
                    <tr>
                        <td>Investor/RBI Presentation Deck</td>
                        <td>PowerPoint</td>
                        <td>Add-on (3 additional days)</td>
                    </tr>
                    <tr>
                        <td>Post-Delivery Query Support</td>
                        <td>Email/Call</td>
                        <td>30 Days</td>
                    </tr>
                    <tr>
                        <td>Model Revisions (2 rounds)</td>
                        <td>Excel</td>
                        <td>Included</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="faq">Frequently Asked Questions</h2>
            <details className="faq-accordion border border-[rgba(0,150,220,0.12)] rounded-xl mb-3 overflow-hidden">
                <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-[#0a1628] bg-white hover:bg-blue-50/50">
                    Is a financial model mandatory for NBFC registration with RBI?
                </summary>
                <div className="p-5 bg-white border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                    Yes. RBI requires applicants to submit a detailed business plan that includes financial projections demonstrating the viability of the proposed NBFC. While RBI does not prescribe a specific format, the projections must cover at least 5 years and demonstrate compliance with NOF, CRAR, and leverage requirements.
                </div>
            </details>
            <details className="faq-accordion border border-[rgba(0,150,220,0.12)] rounded-xl mb-3 overflow-hidden">
                <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-[#0a1628] bg-white hover:bg-blue-50/50">
                    What is the minimum Net Owned Fund required for NBFC registration?
                </summary>
                <div className="p-5 bg-white border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                    The minimum Net Owned Fund (NOF) requirement for new NBFC-ND (Non-Deposit Taking) applicants is ₹2 Crore as per current RBI guidelines. For specific categories like NBFC-MFI, NBFC-Factors, and others, higher NOF requirements may apply.
                </div>
            </details>
            <details className="faq-accordion border border-[rgba(0,150,220,0.12)] rounded-xl mb-3 overflow-hidden">
                <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-[#0a1628] bg-white hover:bg-blue-50/50">
                    Can we update the financial model after RBI submission?
                </summary>
                <div className="p-5 bg-white border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                    Yes. The financial model can be updated as your business plan evolves. We include two revision rounds in our standard engagement. For ongoing annual updates and supervisory submissions, we offer a retainer-based financial modeling service.
                </div>
            </details>
            <details className="faq-accordion border border-[rgba(0,150,220,0.12)] rounded-xl mb-3 overflow-hidden">
                <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-[#0a1628] bg-white hover:bg-blue-50/50">
                    Do you also prepare NBFC financial models for fundraising purposes?
                </summary>
                <div className="p-5 bg-white border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                    Absolutely. We prepare investor-grade NBFC financial models that include IRR/ROE analysis, waterfall modeling for equity investors, debt capacity analysis, and scenario-based projections suitable for presentations to PE funds, family offices, and DFIs.
                </div>
            </details>
            <details className="faq-accordion border border-[rgba(0,150,220,0.12)] rounded-xl mb-3 overflow-hidden">
                <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-[#0a1628] bg-white hover:bg-blue-50/50">
                    What is the difference between NBFC-ND and NBFC-D financial models?
                </summary>
                <div className="p-5 bg-white border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                    NBFC-D (Deposit-Taking) financial models are significantly more complex. They must incorporate deposit mobilization projections, Statutory Liquid Ratio (SLR) requirements, Cash Reserve Ratio equivalent provisions, and detailed depositor protection analysis. NBFC-ND models focus primarily on borrowings, CRAR, and the loan book. RBI has placed a near-moratorium on new NBFC-D registrations, making NBFC-ND the standard for new entrants.
                </div>
            </details>
        </ServicePageLayout>
    );
}
