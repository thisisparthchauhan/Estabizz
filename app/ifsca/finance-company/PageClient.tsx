"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-fc", title: "Finance Company vs Finance Unit" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-should-apply", title: "Who Should Apply" },
        { id: "setting-up", title: "Setting Up a Finance Company" },
        { id: "registration-timeline", title: "Registration Timeline" },
        { id: "core-activities", title: "Permitted Core Activities" },
        { id: "non-core-activities", title: "Permitted Non-Core Activities" },
        { id: "grctc", title: "Global/Regional Corporate Treasury Centres" },
        { id: "factoring", title: "Factoring & Forfaiting" },
        { id: "capital-requirements", title: "Capital & Owned Fund Requirements" },
        { id: "prudential-norms", title: "Prudential Regulatory Requirements" },
        { id: "corporate-governance", title: "Corporate Governance" },
        { id: "currency-operations", title: "Currency of Operations" },
        { id: "fees-structure", title: "Fee Structure" },
        { id: "gift-ifsc-advantages", title: "GIFT IFSC Advantages" },
        { id: "business-highlights", title: "Business Highlights" },
        { id: "enforcement", title: "Enforcement & Default" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is an IFSCA Finance Company?",
            a: "A Finance Company is a financial institution separately incorporated in GIFT IFSC to deal in one or more permissible activities (core and non-core) under IFSCA (Finance Company) Regulations, 2021. It does not accept public deposits and is not registered as a Banking Unit."
        },
        {
            q: "What is the difference between a Finance Company and a Finance Unit?",
            a: "A Finance Company is a separately incorporated entity (subsidiary, JV, or new company). A Finance Unit is a branch of an incorporated entity from its home jurisdiction. Finance Units undertaking core activities require the parent to be regulated by a financial sector regulator and must obtain a No-Objection Certificate."
        },
        {
            q: "What is the minimum capital for a Finance Company?",
            a: "For core activities: USD 3 million minimum owned fund. For non-core activities only: USD 0.2 million. For GRCTC: USD 0.2 million. The higher of the minimum capital prescribed for each activity applies."
        },
        {
            q: "Can a Finance Company deal with Indian residents?",
            a: "Yes, a Finance Company or Finance Unit may undertake transactions with both residents and non-residents. However, any dealings with Indian residents are subject to FEMA provisions."
        },
        {
            q: "What is a Global/Regional Corporate Treasury Centre (GRCTC)?",
            a: "A GRCTC is a Finance Company or Finance Unit registered to undertake treasury activities for its Group Entities — including borrowing, lending, derivatives, forex, factoring, liquidity management, re-invoicing, and advisory services. Minimum owned fund is USD 0.2 million."
        },
        {
            q: "What are the fees for Finance Company registration?",
            a: "Application Fee: USD 1,000 per activity. Registration Fee: USD 12,500 per activity. Annual Recurring Fee: USD 12,500 per activity. For Aircraft Lessors, higher fees apply (Application: USD 10,000, Authorisation: USD 15,000, Annual: USD 15,000)."
        },
        {
            q: "Can a Finance Company undertake factoring business?",
            a: "Yes, factoring and forfaiting are permitted core activities. The entity must also obtain registration under IFSCA (Registration of Factors and Registration of Assignment of Receivables) Regulations, 2024, and must be registered as a Finance Company first."
        },
        {
            q: "What prudential norms apply to Finance Companies?",
            a: "Capital Adequacy Ratio: Minimum 8% of regulatory capital to risk-weighted assets. Exposure Ceiling: Max 25% to single counterparty. Liquidity Coverage Ratio: Maintained on standalone basis. GRCTC entities are exempted from prudential norms but require Board-approved prudential policy."
        },
        {
            q: "In what currency must a Finance Company operate?",
            a: "Operations must be in freely convertible foreign currency. INR accounts are permitted for administrative/statutory expenses. Balance sheets must be maintained in USD. INR-denominated transactions may be permitted subject to settlement in foreign currency."
        },
        {
            q: "What is the GRCTC registration fee?",
            a: "GRCTC fees: Application Fee: USD 1,000 (one time), Registration Fee: USD 12,500 (one time), Recurring Fee: USD 25,000 per annum. A GRCTC registered for factoring does not pay separate factoring fees."
        },
        {
            q: "What legal forms can a Finance Company take?",
            a: "A Finance Company can be set up as a subsidiary, joint venture, or newly incorporated company under the Companies Act, 2013. For non-core activities only, it may also be incorporated as an LLP or Trust. A Finance Unit is set up as a branch."
        },
        {
            q: "How many Finance Companies are operating in GIFT IFSC?",
            a: "As of November 2024, there are 6 Finance Companies, 3 Global Treasury Centres, 32 Aircraft Leasing entities, and 21 Ship Leasing entities registered and operating in GIFT IFSC."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏛️", label: "IFSCA" },
                { emoji: "🏦", label: "Finance Company" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IFSCA Services", href: "/ifsca" },
                { label: "Finance Company", href: "/ifsca/finance-company" },
            ]}
            title="IFSCA Finance Company Registration in GIFT IFSC: Regulations, Activities & Compliance Guide"
            readTime="22 min read"
            focusKeyword="IFSCA Finance Company"
            sections={sections}
            ctaTitle="Finance Company Registration"
            ctaDescription="Our IFSCA regulatory experts provide end-to-end support for Finance Company and Finance Unit registration in GIFT IFSC."
            quickFacts={[
                { label: "Regulator", value: "IFSCA" },
                { label: "Location", value: "GIFT IFSC, Gujarat" },
                { label: "Regulation", value: "FC Regulations 2021" },
                { label: "Entity Type", value: "Company / Branch" },
                { label: "Core Capital", value: "USD 3 million" },
                { label: "Non-Core Capital", value: "USD 0.2 million" },
                { label: "Registration Fee", value: "USD 12,500/activity" },
                { label: "Capital Ratio", value: "Min 8%" },
            ]}
            relatedArticles={[
                { title: "Aircraft Leasing IFSC", href: "/ifsca/aircraft-leasing-registration-in-ifsc", category: "IFSCA", description: "Aircraft operating and financial lease registration in GIFT IFSC." },
                { title: "BATF Services", href: "/ifsca/batf-services", category: "IFSCA", description: "Book-keeping, Accounting, Taxation & Financial Crime Compliance in GIFT IFSC." },
                { title: "NBFC Registration", href: "/regulatory/nbfc-registration", category: "RBI", description: "NBFC registration and compliance under RBI regulations." },
                { title: "Enterprise Services", href: "/services/enterprise-services", category: "Services", description: "Comprehensive enterprise and financial services solutions." },
            ]}
            finalCtaTitle="Ready to Set Up a Finance Company in GIFT IFSC?"
            finalCtaDescription="Get expert guidance on IFSCA Finance Company registration — from application through SWIT to ongoing regulatory compliance."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    The International Financial Services Centres Authority (IFSCA) has established a comprehensive regulatory framework for Finance Companies and Finance Units through the <strong>IFSCA (Finance Company) Regulations, 2021</strong> (as amended up to July 1, 2022). These regulations govern the registration, permissible activities, prudential requirements, and operations of financial institutions in GIFT IFSC.
                </p>
                <p>
                    Finance Companies in GIFT IFSC serve as a versatile vehicle for conducting a wide range of financial services — from lending, investments, and derivatives to aircraft/ship leasing, factoring, and global treasury operations — all under a unified regulatory framework with attractive tax benefits and full currency convertibility.
                </p>
                <div className="info-box">
                    <strong>📌 Key Regulation:</strong> IFSCA (Finance Company) Regulations, 2021, Notification No. IFSCA/2020-21/GN/REG010, dated March 25, 2021, published in the Gazette of India on March 31, 2021. Amended by Notification No. IFSCA/2022-23/GN/REG026, dated July 1, 2022.
                </div>
            </section>

            {/* Finance Company vs Finance Unit */}
            <section id="what-is-fc">
                <h2>Finance Company vs Finance Unit</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Finance Company (FC)</th>
                            <th>Finance Unit (FU)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Structure</strong></td>
                            <td>Separately incorporated entity — subsidiary, JV, or newly incorporated company under Companies Act, 2013</td>
                            <td>Branch of an incorporated entity from home jurisdiction</td>
                        </tr>
                        <tr>
                            <td><strong>Public Deposits</strong></td>
                            <td>Cannot accept public deposits from residents or non-residents</td>
                            <td>Cannot accept public deposits from residents or non-residents</td>
                        </tr>
                        <tr>
                            <td><strong>Core Activities</strong></td>
                            <td>Permitted with USD 3M minimum owned fund</td>
                            <td>Permitted only if parent is a regulated financial entity with NOC from home regulator</td>
                        </tr>
                        <tr>
                            <td><strong>Non-Core Only</strong></td>
                            <td>Can also be set up as LLP or Trust</td>
                            <td>Parent need not be a regulated financial entity</td>
                        </tr>
                        <tr>
                            <td><strong>GRCTC</strong></td>
                            <td>Permitted with USD 0.2M owned fund</td>
                            <td>Permitted — GRCTC conditions override core activity requirements for branch setup</td>
                        </tr>
                        <tr>
                            <td><strong>Balance Sheet</strong></td>
                            <td>Maintained in USD</td>
                            <td>Maintained in USD; accounts kept distinct from parent</td>
                        </tr>
                        <tr>
                            <td><strong>NOC Requirement</strong></td>
                            <td>Required if parent carries out regulated financial activity in home jurisdiction</td>
                            <td>Required from home regulator for core activities (wherever applicable)</td>
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
                            <td>Primary Legislation</td>
                            <td>IFSCA Act, 2019</td>
                        </tr>
                        <tr>
                            <td>Governing Regulations</td>
                            <td>IFSCA (Finance Company) Regulations, 2021 (amended July 2022)</td>
                        </tr>
                        <tr>
                            <td>GRCTC Framework</td>
                            <td>Framework for FC/FU undertaking GRCTC Activities — Circular dated April 4, 2025 (superseding June 25, 2021 framework)</td>
                        </tr>
                        <tr>
                            <td>Factoring Regulations</td>
                            <td>IFSCA (Registration of Factors and Registration of Assignment of Receivables) Regulations, 2024 (amended Feb 2025)</td>
                        </tr>
                        <tr>
                            <td>Fee Circular</td>
                            <td>IFSCA-DTFA/1/2026 dated March 2, 2026 — Fee Structure for FY 2026-27</td>
                        </tr>
                        <tr>
                            <td>Corporate Governance</td>
                            <td>Guidelines on Corporate Governance and Disclosure Requirements — Circular dated August 9, 2021 (amended April 4, 2025)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Setting Up */}
            {/* Who Should Apply */}
            <section id="who-should-apply">
                <h2>Who Should Apply for a Finance Company in GIFT IFSC</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Global Financial Institutions</strong></td><td>Foreign financial institutions seeking to establish treasury or financing operations in India</td></tr>
                        <tr><td><strong>NBFC Groups</strong></td><td>Indian NBFC promoters looking to access international capital markets</td></tr>
                        <tr><td><strong>Leasing Companies</strong></td><td>Entities involved in aircraft leasing, ship leasing or equipment leasing</td></tr>
                        <tr><td><strong>Corporate Treasury Centres</strong></td><td>Multinational corporations managing global treasury operations and centralising financial management</td></tr>
                        <tr><td><strong>Investment & Financing Platforms</strong></td><td>Groups engaged in structured financing, credit funds or securitisation transactions</td></tr>
                        <tr><td><strong>Holding Companies</strong></td><td>Entities managing investments and capital allocations within their group entities</td></tr>
                        <tr><td><strong>Trade Finance Institutions</strong></td><td>Entities providing factoring, forfaiting and receivable financing for global trade</td></tr>
                    </tbody>
                </table>
            </section>

            {/* Setting Up */}
            <section id="setting-up">
                <h2>Setting Up a Finance Company / Finance Unit</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Apply through SWIT</h4>
                            <p>Submit application through the Single Window IT System (SWIT) at swit.ifsca.gov.in in the form and manner specified by IFSCA.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Provisional Registration</h4>
                            <p>Based on complete information, IFSCA may grant provisional registration subject to specified conditions including capital, NOC, and fit & proper requirements.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Certificate of Registration</h4>
                            <p>Upon fulfilment of all conditions and payment of registration fee, IFSCA grants the Certificate of Registration. Valid unless cancelled or surrendered.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Commence Operations</h4>
                            <p>Commence business operations. Ensure valid Letter of Approval (LoA) under the SEZ Act, 2005 is maintained. GRCTC entities must commence within 6 months.</p>
                        </div>
                    </div>
                </div>

                <h3>Key Registration Conditions</h3>
                <ul>
                    <li>Applicant and promoters must be from a <strong>FATF-compliant jurisdiction</strong></li>
                    <li>Must comply with international AML/CFT standards</li>
                    <li>If parent conducts regulated financial activity, <strong>No-Objection Certificate</strong> from home regulator is required</li>
                    <li>Deficiencies must be rectified within <strong>30 days</strong> of communication, failing which application may be refused</li>
                    <li>No refusal without giving applicant opportunity for written submissions</li>
                </ul>
            </section>

            {/* Registration Timeline */}
            <section id="registration-timeline">
                <h2>Registration Timeline</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Estimated Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Business Structuring & Entity Setup</td><td>2 - 3 weeks</td></tr>
                        <tr><td>Application Preparation & Documentation</td><td>1 - 2 weeks</td></tr>
                        <tr><td>IFSCA Regulatory Review</td><td>4 - 8 weeks</td></tr>
                        <tr><td><strong>Total Estimated Timeline</strong></td><td><strong>6 - 10 weeks</strong></td></tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Note:</strong> Once registration is granted, the entity must commence operations within 6 months. GRCTC entities may request an extension of up to 3 additional months with Board resolution.
                </div>
            </section>

            {/* Core Activities */}
            <section id="core-activities">
                <h2>Permitted Core Activities</h2>
                <p>Under Regulation 5(1)(ii), a Finance Company/Unit may undertake:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>(a) Lending</strong></td>
                            <td>Loans, commitments and guarantees, credit enhancement, securitisation, financial lease, sale and purchase of portfolios</td>
                        </tr>
                        <tr>
                            <td><strong>(b) Factoring & Forfaiting</strong></td>
                            <td>Factoring and forfaiting of receivables (also requires registration under Factor Regulations 2024)</td>
                        </tr>
                        <tr>
                            <td><strong>(c) Investments</strong></td>
                            <td>Subscribing, acquiring, holding, or transferring securities or other permitted instruments</td>
                        </tr>
                        <tr>
                            <td><strong>(d) Derivatives</strong></td>
                            <td>Buying or selling derivatives (OTC and exchange-traded)</td>
                        </tr>
                        <tr>
                            <td><strong>(e) GRCTC</strong></td>
                            <td>Global/Regional Corporate Treasury Centres — treasury activities for Group Entities</td>
                        </tr>
                        <tr>
                            <td><strong>(f) Others</strong></td>
                            <td>Any other core activity as may be permitted by the Authority</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Note:</strong> A Finance Company/Unit shall not undertake or fund any speculative transaction. Non-core-only entities may undertake derivatives only for hedging underlying exposures.
                </div>
            </section>

            {/* Non-Core Activities */}
            <section id="non-core-activities">
                <h2>Permitted Non-Core Activities</h2>
                <p>Subject to specific registration requirements under respective frameworks:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>(a)</td><td>Merchant Banking</td></tr>
                        <tr><td>(b)</td><td>Authorised Person</td></tr>
                        <tr><td>(c)</td><td>Registrar and Share Transfer Agent</td></tr>
                        <tr><td>(d)</td><td>Trusteeship Services</td></tr>
                        <tr><td>(e)</td><td>Investment Advisory Services</td></tr>
                        <tr><td>(f)</td><td>Portfolio Management Services</td></tr>
                        <tr><td>(g)</td><td>Operating Lease — Aircraft, Ship, Equipment</td></tr>
                        <tr><td>(h)</td><td>International Trade Financing Services Platform (ITFS)</td></tr>
                        <tr><td>(i)</td><td>Distribution of Financial Products (Mutual Funds, Insurance)</td></tr>
                        <tr><td>(j)</td><td>Trading/Clearing/Professional Clearing Member on IFSC Exchanges</td></tr>
                        <tr><td>(k)</td><td>Asset Management Support Services</td></tr>
                        <tr><td>(l)</td><td>Facilitators of Permissible Activities</td></tr>
                        <tr><td>(m)</td><td>Activities without Customer Interface (Holding Company)</td></tr>
                        <tr><td>(n)</td><td>Any other activity classified as non-core by the Authority</td></tr>
                    </tbody>
                </table>
                <p>Each non-core activity must be carried out through a <strong>Separately Identifiable Department (SID)</strong> with firewalls to prevent conflict of interest. Board-approved grievance redressal and customer compensation policy is required.</p>
            </section>

            {/* GRCTC */}
            <section id="grctc">
                <h2>Global/Regional Corporate Treasury Centres (GRCTC)</h2>
                <p>
                    The GRCTC Framework (Circular dated April 4, 2025) enables Finance Companies/Units to undertake comprehensive treasury activities for their Group Entities from GIFT IFSC.
                </p>

                <h3>GRCTC Permissible Activities</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Activity</th>
                            <th>Scope</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Raising Capital</td><td>Issuance of equity shares</td></tr>
                        <tr><td>2</td><td>Borrowing</td><td>Including inter-company deposits</td></tr>
                        <tr><td>3</td><td>Credit Arrangements</td><td>Lending, credit guarantees, performance bonds</td></tr>
                        <tr><td>4</td><td>Investing</td><td>Financial instruments in IFSC and outside IFSC</td></tr>
                        <tr><td>5</td><td>Derivatives</td><td>OTC and exchange-traded, hedging and position-taking</td></tr>
                        <tr><td>6</td><td>Forex</td><td>Foreign exchange transactions in specified currencies</td></tr>
                        <tr><td>7</td><td>Factoring & Forfaiting</td><td>Requires Factor registration under 2024 Regulations</td></tr>
                        <tr><td>8</td><td>Re-invoicing Centre</td><td>Financing purchase/sale of goods for service recipients</td></tr>
                        <tr><td>9</td><td>Liquidity Management</td><td>Pooling, cash concentration, netting, vendor payments, surplus fund investment</td></tr>
                        <tr><td>10</td><td>Financial Counterparty Relations</td><td>Bank relations, credit ratings, valuation, covenant tests, compliance reporting</td></tr>
                        <tr><td>11</td><td>Insurance & Pension Management</td><td>Negotiating, managing pension/insurance structures for service recipients</td></tr>
                        <tr><td>12</td><td>Financial Advisory</td><td>Financial risk management, cash flow forecasting, tax planning, hedging strategies</td></tr>
                        <tr><td>13</td><td>Capital Markets Advisory</td><td>Capital structure optimisation, funding diversification, portfolio management</td></tr>
                        <tr><td>14</td><td>Holding Company</td><td>Acquiring equity/preference shares of group entities</td></tr>
                    </tbody>
                </table>

                <h3>GRCTC Key Requirements</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Legal Form</strong></td><td>Company or branch of a company incorporated in India or outside India</td></tr>
                        <tr><td><strong>Minimum Owned Fund</strong></td><td>USD 0.2 million (may be maintained at parent level for Finance Units)</td></tr>
                        <tr><td><strong>Minimum Personnel</strong></td><td>At least 5 qualified personnel based in IFSC, including Head of Treasury and Compliance Officer</td></tr>
                        <tr><td><strong>Service Recipients</strong></td><td>Group Entities and Group Entities of Parent (resident and non-resident)</td></tr>
                        <tr><td><strong>Commencement</strong></td><td>Within 6 months of registration (extendable by up to 3 months)</td></tr>
                        <tr><td><strong>Prudential Norms</strong></td><td>Exempted — but Board-approved prudential policy and fit & proper criteria required</td></tr>
                        <tr><td><strong>Corporate Governance</strong></td><td>Exempted from detailed guidelines — Board-approved governance, risk management, and activity policies required</td></tr>
                    </tbody>
                </table>
            </section>

            {/* Factoring */}
            <section id="factoring">
                <h2>Factoring & Forfaiting Registration</h2>
                <p>
                    The IFSCA (Registration of Factors and Registration of Assignment of Receivables) Regulations, 2024, govern factoring business in GIFT IFSC. Key requirements:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Pre-requisite</strong></td><td>Must first obtain Certificate of Registration as a Finance Company under FC Regulations, 2021</td></tr>
                        <tr><td><strong>Relevant Persons</strong></td><td>Must possess adequate experience in factoring business</td></tr>
                        <tr><td><strong>Infrastructure</strong></td><td>Adequate office space, equipment, communication facilities, and manpower</td></tr>
                        <tr><td><strong>Fit & Proper</strong></td><td>Factor and Relevant Persons must satisfy fit and proper requirements</td></tr>
                        <tr><td><strong>Commencement</strong></td><td>Must commence factoring business within 6 months of registration</td></tr>
                        <tr><td><strong>Business Conduct</strong></td><td>May undertake factoring directly with assignor or through an ITFS platform</td></tr>
                        <tr><td><strong>TReDS Filing</strong></td><td>Trade receivables financed through TReDS must be filed with Central Registry within 10 days</td></tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 GRCTC Advantage:</strong> A Finance Company/Unit registered for GRCTC activities that also registers for factoring does not pay separate registration and recurring fees for the factoring activity.
                </div>
            </section>

            {/* Capital Requirements */}
            <section id="capital-requirements">
                <h2>Capital & Owned Fund Requirements</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Minimum Owned Fund (USD)</th>
                            <th>Exemptions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Non-core activities only</strong> (without core)</td>
                            <td>USD 0.2 million (or higher as required under respective framework)</td>
                            <td>Exempted from Regulation 4 (Prudential Norms) and Regulation 8 (Reporting); subject to Board-approved prudential policy and Fit & Proper</td>
                        </tr>
                        <tr>
                            <td><strong>Core activities</strong> (with or without non-core, except GRCTC)</td>
                            <td>USD 3 million (or higher as specified)</td>
                            <td>None — full prudential compliance required</td>
                        </tr>
                        <tr>
                            <td><strong>GRCTC activities</strong></td>
                            <td>USD 0.2 million (or as per GRCTC framework)</td>
                            <td>Exempted from Regulation 4 (Prudential Norms); Board-approved prudential policy and Fit & Proper required</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Owned Fund Definition:</strong> Paid-up capital + free reserves + share premium + capital reserves (from asset sale surplus), minus accumulated losses, intangible assets, and deferred revenue expenditure.
                </div>
            </section>

            {/* Prudential Norms */}
            <section id="prudential-norms">
                <h2>Prudential Regulatory Requirements (Chapter III)</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Norm</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Capital Adequacy Ratio (CAR)</strong></td>
                            <td>Minimum 8% of regulatory capital to risk-weighted assets</td>
                        </tr>
                        <tr>
                            <td><strong>Liquidity Coverage Ratio (LCR)</strong></td>
                            <td>Maintained on standalone basis at all times. Finance Units may maintain at parent level with IFSCA approval.</td>
                        </tr>
                        <tr>
                            <td><strong>Exposure Ceiling (EC)</strong></td>
                            <td>Maximum 25% of eligible capital base to a single counterparty or group of connected counterparties (without IFSCA approval)</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>⚠️ Exemptions:</strong> Entities undertaking only non-core activities or GRCTC activities are exempted from prudential norms, but must maintain Board-approved prudential policy and meet Fit & Proper criteria.
                </div>
            </section>

            {/* Corporate Governance */}
            <section id="corporate-governance">
                <h2>Corporate Governance & Disclosure</h2>
                <p>Corporate governance requirements under the Guidelines (Circular dated August 9, 2021, amended April 4, 2025):</p>
                <ul>
                    <li><strong>Generic Guidelines (Part I):</strong> Applicable to all Finance Companies except GRCTC entities</li>
                    <li><strong>Detailed Guidelines (Part II):</strong> Applicable to Finance Companies undertaking core activities (except GRCTC)</li>
                    <li><strong>GRCTC entities:</strong> Must have Board-approved corporate governance policy, risk management policy, and activity policies with clear delegation, limits, oversight and controls</li>
                    <li>Any merger, acquisition, takeover or change in management resulting in 20%+ change in share capital requires <strong>prior IFSCA approval</strong></li>
                </ul>
            </section>

            {/* Currency */}
            <section id="currency-operations">
                <h2>Currency of Operations</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Operations Currency</strong></td><td>Freely convertible foreign currency (15 currencies permitted)</td></tr>
                        <tr><td><strong>INR Account</strong></td><td>Permitted for administrative and statutory expenses</td></tr>
                        <tr><td><strong>Balance Sheet</strong></td><td>Must be maintained in USD only</td></tr>
                        <tr><td><strong>INR Transactions</strong></td><td>May be permitted if settled in freely convertible foreign currency</td></tr>
                        <tr><td><strong>GRCTC: SNRR Account</strong></td><td>May open Special Non-Resident Rupee account with authorised dealer in India for business transactions outside IFSC</td></tr>
                        <tr><td><strong>GRCTC: Outside IFSC</strong></td><td>May transact in currencies other than Specified Foreign Currencies</td></tr>
                    </tbody>
                </table>
            </section>

            {/* Fee Structure */}
            <section id="fees-structure">
                <h2>Fee Structure (FY 2026-27)</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Entity/Activity</th>
                            <th>Application Fee</th>
                            <th>Registration Fee</th>
                            <th>Annual Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Aircraft Lessors</strong></td>
                            <td>USD 10,000</td>
                            <td>USD 15,000 (Authorisation)</td>
                            <td>USD 15,000</td>
                        </tr>
                        <tr>
                            <td><strong>Without Customer Interface (Holding Co.)</strong></td>
                            <td>USD 1,000</td>
                            <td>USD 12,500</td>
                            <td>USD 12,500</td>
                        </tr>
                        <tr>
                            <td><strong>Core Activities (per activity)</strong></td>
                            <td>USD 1,000</td>
                            <td>USD 12,500</td>
                            <td>USD 12,500</td>
                        </tr>
                        <tr>
                            <td><strong>GRCTC</strong></td>
                            <td>USD 1,000</td>
                            <td>USD 12,500</td>
                            <td>USD 25,000</td>
                        </tr>
                        <tr>
                            <td><strong>Change in Management/Control</strong></td>
                            <td colSpan={3}>Processing fee = 20% of Registration Fee</td>
                        </tr>
                        <tr>
                            <td><strong>Aircraft/Ship Lease Resource Utilisation</strong></td>
                            <td colSpan={3}>One-time fee of USD 2,500</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <strong>Payment:</strong> Fees payable in USD to IFSCA&apos;s designated bank account (ICICI Bank). Indian applicants may pay application and registration fees in equivalent INR (at FBIL USD-INR rate) to IFSCA Fund 2 (SBI account). Late payment attracts 0.75% simple interest per month.
                </p>
            </section>

            {/* GIFT IFSC Advantages */}
            <section id="gift-ifsc-advantages">
                <h2>GIFT IFSC Advantages</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Tax Holiday</h4>
                            <p>Tax Holiday on business income for 10 out of 15 years. Minimum Alternate Tax at 9%. No CTT/STT/GST/Stamp Duty.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Unified Regulator</h4>
                            <p>Single unified regulator (IFSCA) for all financial services — simplified compliance, globally benchmarked regulations.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Full Currency Convertibility</h4>
                            <p>No capital controls. Full convertibility with 15 foreign currencies. Offshore non-resident status under FEMA.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Competitive Cost</h4>
                            <p>Access to India&apos;s large skilled talent pool with beneficial cost of operations. Hinterland advantage of the Indian economy.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Gujarat State Incentives</h4>
                            <p>Incentives under Gujarat IT/ITeS Policy (2022-27). Reduced withholding tax of 9% on interest paid on debt instruments.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Highlights */}
            <section id="business-highlights">
                <h2>GIFT IFSC Business Highlights</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Value (as of Nov 2024)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>IFSCA Registered Entities</td><td>725+</td></tr>
                        <tr><td>Fund Management Entities</td><td>137</td></tr>
                        <tr><td>Finance Companies</td><td>6</td></tr>
                        <tr><td>Global Treasury Centres</td><td>3</td></tr>
                        <tr><td>Aircraft Leasing Entities</td><td>32</td></tr>
                        <tr><td>Ship Leasing Entities</td><td>21</td></tr>
                        <tr><td>Aviation Assets Leased</td><td>184</td></tr>
                        <tr><td>Total Banking Asset Size</td><td>USD 71 Billion</td></tr>
                        <tr><td>Cumulative Banking Transactions</td><td>USD 1,048 Billion</td></tr>
                        <tr><td>Cumulative Debt Listing on IFSC Exchanges</td><td>USD 63+ Billion</td></tr>
                        <tr><td>Monthly Turnover on IFSC Stock Exchanges</td><td>USD 87 Billion</td></tr>
                        <tr><td>AIF Targeted Corpus</td><td>USD 45+ Billion</td></tr>
                    </tbody>
                </table>
            </section>

            {/* Enforcement */}
            <section id="enforcement">
                <h2>Enforcement & Default (Regulation 11)</h2>
                <div className="warning-box">
                    <strong>⚠️ Action in Case of Default:</strong> If a Finance Company or Finance Unit fails to fulfil any registration conditions, IFSCA may take any action deemed fit — including <strong>suspension, withdrawal, or cancellation of registration</strong> — after giving the entity an opportunity to make submissions.
                </div>
                <ul>
                    <li>IFSCA may relax strict enforcement for development of financial markets (reasons must be recorded in writing)</li>
                    <li>Late fee payment attracts <strong>0.75% simple interest per month</strong></li>
                    <li>Late submission of reports attracts <strong>USD 100 per month</strong> per instance of delay</li>
                    <li>KYC/AML requirements as specified for Banking Units in IFSCs apply to all Finance Companies and Finance Units</li>
                </ul>
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
