"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-itfs", title: "What is an ITFS Platform" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "permissible-activities", title: "Permissible Activities" },
        { id: "participants", title: "ITFS Participants" },
        { id: "eligibility", title: "Eligibility & Setup Requirements" },
        { id: "capital-requirements", title: "Capital Requirements" },
        { id: "technical-infrastructure", title: "Technical Infrastructure" },
        { id: "financier-criteria", title: "Financier Onboarding Criteria" },
        { id: "operational-principles", title: "Principles of Operations" },
        { id: "risk-management", title: "Risk Management & Outsourcing" },
        { id: "currency-settlement", title: "Currency & Settlement" },
        { id: "secondary-market", title: "Secondary Market Transactions" },
        { id: "tax-benefits", title: "Tax Benefits at GIFT IFSC" },
        { id: "current-status", title: "Current Status" },
        { id: "advantages", title: "Key Advantages" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is an ITFS Platform in GIFT IFSC?",
            a: "An International Trade Finance Services (ITFS) Platform is an electronic platform registered with IFSCA that facilitates trade finance transactions — including factoring, reverse factoring, bill discounting under LC, supply chain financing, pre-shipment credit and forfaiting — connecting exporters, importers, financiers and other participants."
        },
        {
            q: "Who can set up an ITFS Platform?",
            a: "An entity must be set up as a newly incorporated company under the Companies Act, 2013 in GIFT IFSC. The parent entity must have at least 3 years of experience in operating trading infrastructure in financial markets or operating a FinTech platform."
        },
        {
            q: "What is the minimum capital requirement for an ITFS operator?",
            a: "The ITFS operator must maintain a minimum owned fund of USD 0.2 million (USD 200,000) at all times."
        },
        {
            q: "What activities can an ITFS Platform facilitate?",
            a: "Permissible activities include: Factoring, Reverse Factoring, Bill Discounting under Letter of Credit, Supply Chain Financing, Pre-shipment Credit, Forfaiting, and any other activity permitted by IFSCA. Secondary market transactions for these products are also allowed."
        },
        {
            q: "Who can participate on an ITFS Platform?",
            a: "Participants include Exporters, Importers, Financiers, Insurance/Credit Guarantee Institutions, Payment Service Providers (PSPs), and any other entity permitted by IFSCA."
        },
        {
            q: "What are the criteria for financiers on an ITFS?",
            a: "Financiers must have: (1) AUM or gross loans/advances of minimum USD 5 million, (2) at least USD 5 million of capital, (3) proven credit/debt recovery capability, (4) be an incorporated entity carrying out factoring business from a FATF-compliant jurisdiction."
        },
        {
            q: "Does the ITFS operator assume credit risk?",
            a: "No. The ITFS operator shall not assume any credit risk on transactions carried out on its platform. It acts purely as a facilitator."
        },
        {
            q: "What currency are ITFS operations conducted in?",
            a: "The ITFS operator maintains books of accounts in USD. Transactions on the platform may be settled in any specified foreign currency. An SNRR account may be opened for INR expenses."
        },
        {
            q: "How many ITFS Platforms are currently registered?",
            a: "As of the latest IFSCA data, 4 ITFS Platforms have been authorized by IFSCA to operate in GIFT IFSC."
        },
        {
            q: "Can an ITFS operator provide clearing and settlement services?",
            a: "An ITFS operator intending to provide clearing and/or settlement of funds must seek separate authorization from IFSCA as a payment system operator under the IFSCA (Payment and Settlement Systems) Regulations, 2024."
        },
        {
            q: "What compliance requirements apply to ITFS operators?",
            a: "ITFS operators must comply with IFSCA (AML, CFT and KYC) Guidelines 2022, enable transparent bidding, establish a Complaint Handling and Grievance Redressal mechanism, and put in place a comprehensive risk management framework."
        },
        {
            q: "When were the latest ITFS guidelines issued?",
            a: "The latest guidelines on 'Setting up and operation of ITFS platform' were issued by IFSCA on December 23, 2024, replacing the earlier 2021 framework."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏛️", label: "IFSCA" },
                { emoji: "🌐", label: "ITFS Platform" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IFSCA Services", href: "/ifsca" },
                { label: "ITFS Platform", href: "/ifsca/itfs-platform" },
            ]}
            title="IFSCA ITFS Platform: International Trade Finance Services in GIFT IFSC"
            readTime="16 min read"
            focusKeyword="IFSCA ITFS Platform"
            sections={sections}
            ctaTitle="ITFS Registration"
            ctaDescription="Expert guidance for IFSCA ITFS Platform registration and compliance in GIFT IFSC."
            quickFacts={[
                { label: "Regulator", value: "IFSCA" },
                { label: "Location", value: "GIFT City, Gujarat" },
                { label: "Guidelines", value: "Dec 23, 2024" },
                { label: "Entity Type", value: "Company (CA 2013)" },
                { label: "Min Owned Fund", value: "USD 0.2 Million" },
                { label: "Currency", value: "USD (books)" },
                { label: "Platforms Active", value: "4" },
            ]}
            relatedArticles={[
                { title: "Finance Company GIFT IFSC", href: "/ifsca/finance-company", category: "IFSCA", description: "Finance Company and Finance Unit registration in GIFT IFSC." },
                { title: "IFSCA Factoring License", href: "/regulatory/ifsca-factoring-license-gift-city", category: "IFSCA", description: "Factor registration under IFSCA Regulations 2024." },
                { title: "FinTech Entity & Incentives", href: "/ifsca/fintech-entity", category: "IFSCA", description: "FinTech Entity authorization and incentive grants in GIFT IFSC." },
                { title: "BATF Services IFSC", href: "/ifsca/batf-services", category: "IFSCA", description: "BATF Service Provider registration in GIFT IFSC." },
            ]}
            finalCtaTitle="Ready to Set Up an ITFS Platform in GIFT IFSC?"
            finalCtaDescription="Get expert assistance with your IFSCA ITFS Platform registration. Our team handles the complete process from application to compliance."
        >
            {/* Section 1: Introduction */}
            <section>
                <h2 id="introduction">Introduction</h2>
                <p>
                    The International Financial Services Centres Authority (IFSCA) has established a regulatory framework for <strong>International Trade Finance Services (ITFS) Platforms</strong> in GIFT IFSC through its guidelines on &quot;Setting up and operation of ITFS platform&quot; issued on <strong>December 23, 2024</strong>. These guidelines supersede the earlier 2021 framework and provide a comprehensive regulatory structure for electronic platforms facilitating cross-border trade finance transactions.
                </p>
                <p>
                    ITFS Platforms serve as electronic marketplaces connecting exporters, importers, financiers and other trade participants, enabling efficient trade finance solutions including factoring, forfaiting, supply chain financing and bill discounting — all within GIFT IFSC&apos;s competitive regulatory and tax environment.
                </p>
                <p>
                    <strong>📌 Key Reference:</strong> IFSCA Guidelines on Setting up and operation of International Trade Finance Services Platform, dated December 23, 2024, issued under the IFSCA Act, 2019.
                </p>
            </section>

            {/* Section 2: What is ITFS */}
            <section>
                <h2 id="what-is-itfs">What is an ITFS Platform</h2>
                <p>
                    An ITFS Platform is an <strong>electronic trading platform</strong> registered with IFSCA that acts as a facilitator for international trade finance transactions. Unlike traditional banking channels, an ITFS Platform:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Role</strong></td>
                            <td>Acts as a facilitator — does NOT assume credit risk on transactions</td>
                        </tr>
                        <tr>
                            <td><strong>Platform Type</strong></td>
                            <td>Electronic platform enabling transparent bidding between participants</td>
                        </tr>
                        <tr>
                            <td><strong>Participants</strong></td>
                            <td>Exporters, Importers, Financiers, Insurance/Credit Guarantee Institutions, PSPs</td>
                        </tr>
                        <tr>
                            <td><strong>Products</strong></td>
                            <td>Factoring, Reverse Factoring, Bill Discounting (LC), Supply Chain Finance, Pre-shipment Credit, Forfaiting</td>
                        </tr>
                        <tr>
                            <td><strong>Secondary Market</strong></td>
                            <td>Can undertake secondary market transactions for all permissible products</td>
                        </tr>
                        <tr>
                            <td><strong>Legal Position</strong></td>
                            <td>Legal proceedings by financiers/participants are outside the purview of the ITFS operator</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 3: Regulatory Framework */}
            <section>
                <h2 id="regulatory-framework">Regulatory Framework</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Primary Legislation</strong></td>
                            <td>IFSCA Act, 2019</td>
                        </tr>
                        <tr>
                            <td><strong>Governing Guidelines</strong></td>
                            <td>IFSCA Guidelines on Setting up and operation of ITFS Platform, dated December 23, 2024</td>
                        </tr>
                        <tr>
                            <td><strong>Previous Framework</strong></td>
                            <td>Framework for setting up International Trade Financing Services Platform (ITFS) 2021 — now superseded</td>
                        </tr>
                        <tr>
                            <td><strong>AML/KYC Compliance</strong></td>
                            <td>IFSCA (AML, CFT and KYC) Guidelines, 2022</td>
                        </tr>
                        <tr>
                            <td><strong>Payment Systems</strong></td>
                            <td>IFSCA (Payment and Settlement Systems) Regulations, 2024 — for clearing/settlement authorization</td>
                        </tr>
                        <tr>
                            <td><strong>Unified Regulator</strong></td>
                            <td>IFSCA exercises powers of RBI, SEBI, IRDAI and PFRDA for IFSC activities</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 4: Permissible Activities */}
            <section>
                <h2 id="permissible-activities">Permissible Activities</h2>
                <p>
                    An ITFS operator acts as a <strong>facilitator</strong> for the following trade finance transactions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    {[
                        { icon: "📄", title: "Factoring", desc: "Purchase of receivables (invoices) from exporters at a discount, providing immediate working capital" },
                        { icon: "🔄", title: "Reverse Factoring", desc: "Buyer-initiated financing where the importer's creditworthiness enables better financing terms for suppliers" },
                        { icon: "📜", title: "Bill Discounting under LC", desc: "Discounting of bills of exchange drawn under Letters of Credit issued by banks" },
                        { icon: "🔗", title: "Supply Chain Financing", desc: "Financing solutions across the supply chain, from raw material procurement to final delivery" },
                        { icon: "🚢", title: "Pre-shipment Credit", desc: "Financing provided to exporters before shipment of goods to meet production and packing requirements" },
                        { icon: "💱", title: "Forfaiting", desc: "Purchase of trade receivables on a without-recourse basis, typically for medium-to-long term trade" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                            <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        <strong>Additional:</strong> The ITFS operator may also undertake any other activity as permitted by IFSCA, with prior permission from the Authority.
                    </p>
                </div>
            </section>

            {/* Section 5: Participants */}
            <section>
                <h2 id="participants">ITFS Participants</h2>
                <p>The following entities can participate on an ITFS Platform:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Participant Type</th>
                            <th>Role on ITFS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Exporters</strong></td>
                            <td>Upload trade receivables/invoices for financing; receive early payment against goods/services exported</td>
                        </tr>
                        <tr>
                            <td><strong>Importers</strong></td>
                            <td>Confirm payables; participate in reverse factoring arrangements for supply chain optimization</td>
                        </tr>
                        <tr>
                            <td><strong>Financiers</strong></td>
                            <td>Bid on and finance trade receivables; must meet strict onboarding criteria (AUM, capital, recovery capability)</td>
                        </tr>
                        <tr>
                            <td><strong>Insurance / Credit Guarantee Institutions</strong></td>
                            <td>Provide credit insurance or guarantees to mitigate risk for financiers and participants</td>
                        </tr>
                        <tr>
                            <td><strong>Payment Service Providers (PSPs)</strong></td>
                            <td>Facilitate payment processing and settlement of trade finance transactions</td>
                        </tr>
                        <tr>
                            <td><strong>Other Entities</strong></td>
                            <td>Any other entity permitted by IFSCA to participate on the platform</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 6: Eligibility */}
            <section>
                <h2 id="eligibility">Eligibility & Setup Requirements</h2>
                <h3>Applicability</h3>
                <p>The ITFS guidelines apply to:</p>
                <ul>
                    <li>ITFS operators already registered with IFSCA prior to December 23, 2024</li>
                    <li>Entities seeking new registration as an ITFS operator in IFSC</li>
                    <li>All participants in an ITFS</li>
                </ul>

                <h3>Entity Structure</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Mode of Business</strong></td>
                            <td>Must be set up as a <strong>newly incorporated company</strong> under the Companies Act, 2013 in GIFT IFSC</td>
                        </tr>
                        <tr>
                            <td><strong>Parent Experience</strong></td>
                            <td>Parent entity must have at least <strong>3 years of experience</strong> in operating trading infrastructure in financial markets or operating a FinTech platform</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Owned Fund</strong></td>
                            <td><strong>USD 0.2 million</strong> (USD 200,000) to be maintained at all times</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 7: Capital Requirements */}
            <section>
                <h2 id="capital-requirements">Capital Requirements</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Minimum Owned Fund</strong></td>
                            <td>USD 0.2 million (must be maintained at all times)</td>
                        </tr>
                        <tr>
                            <td><strong>Currency</strong></td>
                            <td>Books of accounts maintained in USD</td>
                        </tr>
                        <tr>
                            <td><strong>Parent Entity</strong></td>
                            <td>Minimum 3 years experience in trading infrastructure or FinTech platform operations</td>
                        </tr>
                    </tbody>
                </table>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        <strong>Note:</strong> The ITFS operator does not assume credit risk on platform transactions. The capital requirement is for operational and regulatory compliance purposes, not for absorbing credit losses.
                    </p>
                </div>
            </section>

            {/* Section 8: Technical Infrastructure */}
            <section>
                <h2 id="technical-infrastructure">Technical Infrastructure</h2>
                <p>An entity desirous of setting up an ITFS must have sound technological infrastructure including:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    {[
                        { icon: "💻", title: "Electronic Platform", desc: "Fully electronic platform accessible to all participants for transparent bidding and transaction execution" },
                        { icon: "📊", title: "Management Information System", desc: "Comprehensive MIS for real-time data analytics, reporting and decision support" },
                        { icon: "🔍", title: "Online Surveillance", desc: "Capability to monitor positions, prices and volumes in real time to support operations and ensure market integrity" },
                    ].map((item, i) => (
                        <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className="font-bold text-gray-900 text-sm mb-2">{item.title}</div>
                            <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 9: Financier Criteria */}
            <section>
                <h2 id="financier-criteria">Financier Onboarding Criteria</h2>
                <p>The ITFS operator must ensure that financiers onboarded as participants meet the following criteria:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Criterion</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>AUM / Lending Track Record</strong></td>
                            <td>Assets Under Management (AUM) or gross loans and advances of minimum <strong>USD 5 million</strong> in current or previous financial year</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Capital</strong></td>
                            <td>At least <strong>USD 5 million</strong> of capital</td>
                        </tr>
                        <tr>
                            <td><strong>Recovery Capability</strong></td>
                            <td>Proven capability for credit/debt recovery and credible management team with credit and collection experience</td>
                        </tr>
                        <tr>
                            <td><strong>Entity Type</strong></td>
                            <td>Must be an <strong>incorporated entity</strong> carrying out the business of factoring</td>
                        </tr>
                        <tr>
                            <td><strong>Jurisdiction</strong></td>
                            <td>The entity and its shareholders must be from a <strong>FATF-compliant jurisdiction</strong></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 10: Operational Principles */}
            <section>
                <h2 id="operational-principles">Principles of Operations</h2>
                <p>ITFS operators must adhere to the following operational principles:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Principle</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>AML/KYC Compliance</strong></td>
                            <td>Must comply with applicable provisions of IFSCA (AML, CFT and KYC) Guidelines, 2022</td>
                        </tr>
                        <tr>
                            <td><strong>Transparent Bidding</strong></td>
                            <td>Enable transparent bidding on the platform for all trade finance products</td>
                        </tr>
                        <tr>
                            <td><strong>No Credit Risk</strong></td>
                            <td>Shall NOT assume any credit risk on transactions carried out on the platform</td>
                        </tr>
                        <tr>
                            <td><strong>Legal Proceedings</strong></td>
                            <td>Legal proceedings by financiers/participants are outside the ITFS operator&apos;s purview</td>
                        </tr>
                        <tr>
                            <td><strong>Platform Connectivity</strong></td>
                            <td>May connect with other electronic platforms/market infrastructure with prior IFSCA approval</td>
                        </tr>
                        <tr>
                            <td><strong>Grievance Redressal</strong></td>
                            <td>Must establish a Complaint Handling and Grievance Redressal mechanism</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 11: Risk Management */}
            <section>
                <h2 id="risk-management">Risk Management & Outsourcing</h2>
                <h3>Risk Management Framework</h3>
                <p>
                    An ITFS operator must put in place a <strong>comprehensive risk management framework</strong> covering all aspects of its operations, including but not limited to:
                </p>
                <ul>
                    <li>Operational risk controls and business continuity planning</li>
                    <li>Technology risk management and cybersecurity measures</li>
                    <li>Participant default management procedures</li>
                    <li>Real-time surveillance and monitoring systems</li>
                    <li>Compliance risk management aligned with IFSCA guidelines</li>
                </ul>

                <h3>Outsourcing</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        The ITFS operator may tie up with <strong>technology providers, system integrators and other entities</strong> for onboarding participants. However, the regulatory responsibility remains with the ITFS operator.
                    </p>
                </div>
            </section>

            {/* Section 12: Currency & Settlement */}
            <section>
                <h2 id="currency-settlement">Currency & Settlement</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Books of Accounts</strong></td>
                            <td>Maintained in <strong>USD</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Transaction Settlement</strong></td>
                            <td>May be settled in <strong>any specified foreign currency</strong> (USD, EUR, GBP, JPY, CAD, AUD, CHF, HKD, SGD, AED, RUB)</td>
                        </tr>
                        <tr>
                            <td><strong>INR Account</strong></td>
                            <td>May open SNRR account under FEMA (Deposit) Regulations, 2016 for administrative expenses in INR</td>
                        </tr>
                        <tr>
                            <td><strong>Clearing & Settlement</strong></td>
                            <td>ITFS operator intending to provide clearing/settlement of funds must seek <strong>separate authorization</strong> as a Payment System Operator under IFSCA (Payment and Settlement Systems) Regulations, 2024</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 13: Secondary Market */}
            <section>
                <h2 id="secondary-market">Secondary Market Transactions</h2>
                <p>
                    The ITFS operator is permitted to undertake <strong>secondary market transactions</strong> for all permissible trade finance products. This means:
                </p>
                <ul>
                    <li>Financiers who have purchased trade receivables can sell them to other financiers on the platform</li>
                    <li>Enables liquidity and portfolio management for trade finance participants</li>
                    <li>All secondary market trades are subject to the same compliance and transparency requirements</li>
                    <li>Transparent bidding mechanism applies to secondary market transactions as well</li>
                </ul>
            </section>

            {/* Section 14: Tax Benefits */}
            <section>
                <h2 id="tax-benefits">Tax Benefits at GIFT IFSC</h2>
                <p>ITFS operators and participants benefit from GIFT IFSC&apos;s competitive tax regime:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Tax Benefit</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Income Tax Holiday</strong></td>
                            <td>100% tax exemption on business income for 10 out of 15 years (Section 80LA)</td>
                        </tr>
                        <tr>
                            <td><strong>MAT</strong></td>
                            <td>Minimum Alternate Tax at 9% (MAT not applicable for companies opting for concessional rate under Sec. 115BA)</td>
                        </tr>
                        <tr>
                            <td><strong>No CTT/STT/GST</strong></td>
                            <td>No Commodity Transaction Tax, Securities Transaction Tax, GST or Stamp Duty</td>
                        </tr>
                        <tr>
                            <td><strong>Withholding Tax</strong></td>
                            <td>Reduced rate of 9% on interest paid on debt instruments</td>
                        </tr>
                        <tr>
                            <td><strong>Competitive Fund Tax</strong></td>
                            <td>Competitive tax regime for funds operating from GIFT IFSC</td>
                        </tr>
                        <tr>
                            <td><strong>Gujarat IT/ITeS Policy</strong></td>
                            <td>Additional incentives under Gujarat IT/ITeS Policy (2022-27)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 15: Current Status */}
            <section>
                <h2 id="current-status">Current Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    {[
                        { label: "ITFS Platforms Authorized", value: "4", sub: "By IFSCA" },
                        { label: "Total IFSCA Entities", value: "725+", sub: "As of Nov 2024" },
                        { label: "Banking Asset Size", value: "$71 Bn", sub: "Nov 2024" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 text-center">
                            <div className="text-2xl font-black text-[#0096D6]">{stat.value}</div>
                            <div className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{stat.sub}</div>
                        </div>
                    ))}
                </div>
                <p>
                    GIFT IFSC has seen rapid growth with monthly turnover on international stock exchanges reaching <strong>$87 billion</strong> (Nov 2024), cumulative banking transactions of <strong>$1,048 billion</strong>, and <strong>184 aviation assets</strong> leased from IFSC. The ITFS segment is positioned to grow significantly as India&apos;s exports target <strong>$8 trillion by 2047</strong> under the Viksit Bharat vision.
                </p>
            </section>

            {/* Section 16: Key Advantages */}
            <section>
                <h2 id="advantages">Key Advantages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    {[
                        { icon: "🌐", title: "Global Market Access", desc: "Connect exporters and importers globally through a regulated electronic platform in GIFT IFSC" },
                        { icon: "💰", title: "Competitive Tax Regime", desc: "100% tax holiday for 10/15 years, no GST/STT/CTT, reduced withholding tax rates" },
                        { icon: "💵", title: "Full Currency Freedom", desc: "Transactions in 11 specified foreign currencies; no capital controls; IFSC treated as deemed foreign territory" },
                        { icon: "📊", title: "Multiple Products", desc: "Factoring, reverse factoring, forfaiting, supply chain finance, pre-shipment credit, bill discounting under LC" },
                        { icon: "🔄", title: "Secondary Market", desc: "Ability to trade receivables in secondary market, providing liquidity to trade finance participants" },
                        { icon: "🏢", title: "Hinterland Advantage", desc: "Access to India's large and growing economy — 5th largest globally, on track to become 3rd by FY28" },
                        { icon: "👥", title: "Talent Pool", desc: "Access to India's skilled workforce with expertise in technology, finance and trade operations" },
                        { icon: "📋", title: "Unified Regulation", desc: "Single-window IFSCA regulation with globally benchmarked standards and sovereign support" },
                    ].map((adv, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">{adv.icon}</div>
                            <div className="font-bold text-gray-900 text-sm mb-1">{adv.title}</div>
                            <div className="text-xs text-gray-600 leading-relaxed">{adv.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 17: FAQs */}
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
