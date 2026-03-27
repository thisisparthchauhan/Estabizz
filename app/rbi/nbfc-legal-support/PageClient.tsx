"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "overview", title: "Overview of NBFC Legal Support" },
        { id: "what-is-nbfc-legal-support", title: "What is NBFC Legal Support?" },
        { id: "types-of-nbfc", title: "Types of NBFCs and Their Legal Requirements" },
        { id: "rbi-registration", title: "RBI Registration and Licensing Assistance" },
        { id: "compliance-framework", title: "NBFC Compliance Framework" },
        { id: "legal-documentation", title: "Legal Documentation for NBFCs" },
        { id: "regulatory-advisory", title: "Regulatory Advisory Services" },
        { id: "rbi-inspection", title: "RBI Inspection and Audit Support" },
        { id: "dispute-resolution", title: "Dispute Resolution and Legal Representation" },
        { id: "foreign-investment", title: "Foreign Investment in NBFCs" },
        { id: "penalty-proceedings", title: "Penalty Proceedings and Compounding" },
        { id: "why-legal-support", title: "Why NBFC Legal Support is Essential" },
        { id: "our-services", title: "Our NBFC Legal Support Services" },
        { id: "faq", title: "Frequently Asked Questions" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "Reserve Bank of India" },
        { label: "Min. Net Owned Fund", value: "₹2 Crore (Base Layer)" },
        { label: "Registration Timeline", value: "90–120 Days" },
        { label: "Applicable Act", value: "RBI Act, 1934" },
        { label: "Penalty for Non-Compliance", value: "Up to ₹5 Lakh/day" },
        { label: "Annual Return Filing", value: "Mandatory" },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏦", label: "RBI Regulated" },
                { emoji: "⚖️", label: "Legal Support" },
                { emoji: "📋", label: "NBFC Compliance" },
                { emoji: "🇮🇳", label: "India" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "RBI Services", href: "/rbi" },
                { label: "NBFC Legal Support" },
            ]}
            title="NBFC Legal Support Services in India"
            readTime="14 min read"
            focusKeyword="NBFC Legal Support"
            sections={sections}
            ctaTitle="Need NBFC Legal Help?"
            ctaDescription="Get expert legal support for NBFC registration, compliance, and regulatory advisory from our experienced team."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI Services", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for Account Aggregator framework." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services license guide under IFSCA framework." },
                { href: "/rbi/lendtech-services", category: "RBI Services", title: "LendTech Services", description: "RBI guidelines for lending technology companies." },
            ]}
            finalCtaTitle="Ready to Get Expert NBFC Legal Support?"
            finalCtaDescription="Our team of experienced NBFC lawyers and compliance experts are ready to assist you with all your regulatory needs. Book a free consultation today."
        >
            <h2 id="overview">Overview of NBFC Legal Support</h2>
            <p>Non-Banking Financial Companies (NBFCs) are financial institutions that provide banking services without holding a banking license. In India, NBFCs are regulated by the Reserve Bank of India (RBI) under the provisions of the Reserve Bank of India Act, 1934. Given the complex regulatory environment governing NBFCs in India, legal support services have become essential for entities operating in this sector.</p>
            <p>NBFC Legal Support encompasses a wide range of services including registration assistance, compliance management, regulatory advisory, legal documentation, RBI inspection support, and dispute resolution. With the RBI constantly updating its regulatory framework — including the Scale-Based Regulation (SBR) framework introduced in 2021 — NBFCs need expert legal guidance to navigate the evolving compliance landscape.</p>
            <div className="info-box">
                <p className="!mb-0"><strong>Important Update:</strong> The RBI's Scale-Based Regulation (SBR) for NBFCs, effective from October 1, 2022, classifies NBFCs into four layers — Base Layer (NBFC-BL), Middle Layer (NBFC-ML), Upper Layer (NBFC-UL), and Top Layer (NBFC-TL) — each with distinct regulatory requirements. Legal support is critical to ensure compliance with the applicable layer requirements.</p>
            </div>

            <h2 id="what-is-nbfc-legal-support">What is NBFC Legal Support?</h2>
            <p>NBFC Legal Support refers to comprehensive legal and regulatory assistance provided to Non-Banking Financial Companies at various stages of their lifecycle — from incorporation and registration to day-to-day compliance and dispute resolution. It covers the full spectrum of legal needs that an NBFC may encounter in dealing with the Reserve Bank of India and other regulatory authorities.</p>
            <p>The scope of NBFC legal support includes:</p>
            <ul>
                <li>Advising on the appropriate NBFC category and structure for a proposed business</li>
                <li>Preparing and filing applications for RBI registration/Certificate of Registration (CoR)</li>
                <li>Drafting legal documents including Memorandum of Association (MoA), Articles of Association (AoA), and internal policies</li>
                <li>Ongoing compliance monitoring and reporting</li>
                <li>Representation before the RBI in inspection, audit, and enforcement proceedings</li>
                <li>Advisory on foreign direct investment (FDI) in NBFCs</li>
                <li>Support in compounding of offences and penalty proceedings</li>
                <li>Merger, acquisition, and takeover-related legal advisory</li>
            </ul>

            <h2 id="types-of-nbfc">Types of NBFCs and Their Legal Requirements</h2>
            <p>The RBI categorises NBFCs based on their activities and the nature of their liabilities. Each category has specific legal requirements and compliance obligations. Understanding these distinctions is fundamental to obtaining appropriate legal support.</p>

            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>NBFC Type</th>
                            <th>Principal Activity</th>
                            <th>Min. NOF Required</th>
                            <th>Key Regulatory Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NBFC-Investment and Credit Company (NBFC-ICC)</td>
                            <td>Lending and investment</td>
                            <td>₹2 Crore</td>
                            <td>Prudential norms, FMR</td>
                        </tr>
                        <tr>
                            <td>NBFC-Microfinance Institution (NBFC-MFI)</td>
                            <td>Micro-lending to low-income groups</td>
                            <td>₹5 Crore (₹2 Cr NE states)</td>
                            <td>RBI MFI directions 2022</td>
                        </tr>
                        <tr>
                            <td>NBFC-Factor</td>
                            <td>Factoring of receivables</td>
                            <td>₹5 Crore</td>
                            <td>Factoring Regulation Act, 2011</td>
                        </tr>
                        <tr>
                            <td>NBFC-Infrastructure Finance Company (NBFC-IFC)</td>
                            <td>Infrastructure lending</td>
                            <td>₹300 Crore</td>
                            <td>75% assets in infrastructure</td>
                        </tr>
                        <tr>
                            <td>NBFC-Peer to Peer Lending (NBFC-P2P)</td>
                            <td>P2P lending platform</td>
                            <td>₹2 Crore</td>
                            <td>NBFC-P2P Directions, 2017</td>
                        </tr>
                        <tr>
                            <td>NBFC-Account Aggregator (NBFC-AA)</td>
                            <td>Financial data aggregation</td>
                            <td>₹2 Crore</td>
                            <td>NBFC-AA Master Directions</td>
                        </tr>
                        <tr>
                            <td>Housing Finance Company (HFC)</td>
                            <td>Home loans</td>
                            <td>₹20 Crore</td>
                            <td>NHB/RBI regulations</td>
                        </tr>
                        <tr>
                            <td>NBFC-Infrastructure Debt Fund (NBFC-IDF)</td>
                            <td>Infrastructure project financing</td>
                            <td>₹300 Crore</td>
                            <td>RBI IDF-NBFC guidelines</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="rbi-registration">RBI Registration and Licensing Assistance</h2>
            <p>Obtaining a Certificate of Registration (CoR) from the RBI is the first and most critical step for any company intending to operate as an NBFC. The registration process involves multiple stages and requires meticulous preparation of documents and compliance with eligibility criteria.</p>

            <h3>Eligibility Criteria for NBFC Registration</h3>
            <ul>
                <li>The applicant company must be incorporated under the Companies Act, 2013 (or Companies Act, 1956)</li>
                <li>The company must have a minimum Net Owned Fund (NOF) of ₹2 Crore (for most NBFC categories)</li>
                <li>At least one-third of the Board of Directors must have relevant finance/banking experience</li>
                <li>The company must not have been defaulting in payment of dues to any bank or financial institution</li>
                <li>The principal business of the company must be financial activity (more than 50% of total assets and income)</li>
                <li>The company's infrastructure, systems, and processes must be adequate for carrying on NBFC business</li>
            </ul>

            <h3>NBFC Registration Process</h3>
            <div className="step-timeline">
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 1</div>
                        <h4>Company Incorporation</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Incorporate a company under Companies Act, 2013 with appropriate MoA and AoA reflecting financial activities as the main object.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 2</div>
                        <h4>Capital Infusion</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Infuse the minimum required Net Owned Fund (NOF) as per the NBFC category. Funds must be reflected in the audited balance sheet.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 3</div>
                        <h4>Board Constitution and Policy Preparation</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Constitute a qualified Board of Directors and prepare mandatory policies including Fair Practices Code, KYC Policy, Credit Policy, IT Policy, etc.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 4</div>
                        <h4>Online Application on COSMOS Portal</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">File the application for Certificate of Registration (CoR) on the RBI's COSMOS portal with all required documents.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 5</div>
                        <h4>Submission to Regional Office</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Submit hard copies of the application along with all supporting documents to the concerned RBI Regional Office.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 6</div>
                        <h4>RBI Scrutiny and Grant of CoR</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">The RBI scrutinises the application, may call for additional information, and upon satisfaction grants the Certificate of Registration (CoR).</p>
                    </div>
                </div>
            </div>

            <h2 id="compliance-framework">NBFC Compliance Framework</h2>
            <p>Post-registration, NBFCs are subject to an extensive compliance framework under various RBI Master Directions and circulars. The compliance requirements vary based on the NBFC's layer classification under the Scale-Based Regulation (SBR) framework.</p>

            <h3>Key Compliance Areas for NBFCs</h3>
            <ul>
                <li><strong>Prudential Regulations:</strong> Capital adequacy, income recognition, asset classification, and provisioning norms</li>
                <li><strong>Fair Practices Code (FPC):</strong> Transparency in lending operations and customer grievance redressal</li>
                <li><strong>KYC/AML Compliance:</strong> Customer due diligence, suspicious transaction reporting, and maintenance of records</li>
                <li><strong>Statutory Returns:</strong> Filing of NBS-7, NBS-9, and other periodic returns to RBI</li>
                <li><strong>Corporate Governance:</strong> Board composition, audit committee, risk management committee requirements</li>
                <li><strong>IT Framework:</strong> Cyber security policy, IT governance, and data protection requirements</li>
                <li><strong>PMLA Compliance:</strong> Prevention of Money Laundering Act obligations and reporting to Financial Intelligence Unit (FIU)</li>
                <li><strong>Interest Rate Policy:</strong> Board-approved interest rate policy and disclosure norms</li>
            </ul>

            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Area</th>
                            <th>Frequency</th>
                            <th>Applicable To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NBS-7 Return (Prudential)</td>
                            <td>Quarterly</td>
                            <td>All deposit-taking NBFCs</td>
                        </tr>
                        <tr>
                            <td>NBS-9 Return</td>
                            <td>Quarterly</td>
                            <td>NBFC-ND-SI (Asset size ≥ ₹100 Cr)</td>
                        </tr>
                        <tr>
                            <td>Annual Return</td>
                            <td>Annual</td>
                            <td>All registered NBFCs</td>
                        </tr>
                        <tr>
                            <td>Statutory Audit</td>
                            <td>Annual</td>
                            <td>All registered NBFCs</td>
                        </tr>
                        <tr>
                            <td>CERSAI Registration</td>
                            <td>Per transaction</td>
                            <td>NBFCs with secured loans</td>
                        </tr>
                        <tr>
                            <td>CIBIL/Credit Bureau Reporting</td>
                            <td>Monthly</td>
                            <td>All lending NBFCs</td>
                        </tr>
                        <tr>
                            <td>FIU-IND Reporting (PMLA)</td>
                            <td>Monthly/As applicable</td>
                            <td>All registered NBFCs</td>
                        </tr>
                        <tr>
                            <td>Corporate Governance Report</td>
                            <td>Annual</td>
                            <td>NBFC-ML and NBFC-UL</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="legal-documentation">Legal Documentation for NBFCs</h2>
            <p>Proper legal documentation is the backbone of NBFC operations. Expert legal support ensures that all documents are drafted in compliance with RBI guidelines and applicable laws. The key documents required for NBFC operations include:</p>

            <h3>Foundational Documents</h3>
            <ul>
                <li>Memorandum of Association (MoA) with appropriate financial activity clauses</li>
                <li>Articles of Association (AoA) reflecting governance requirements</li>
                <li>Board-approved policies (Fair Practices Code, KYC Policy, Credit Policy, etc.)</li>
                <li>Fit and Proper criteria declarations for directors</li>
                <li>Net Owned Fund calculation certificate from Chartered Accountant</li>
            </ul>

            <h3>Operational Documents</h3>
            <ul>
                <li>Loan agreements, mortgage deeds, and security documents</li>
                <li>Assignment agreements for portfolio acquisition</li>
                <li>Co-lending agreements and business correspondence arrangements</li>
                <li>Collection agency agreements</li>
                <li>Technology service provider agreements</li>
                <li>Non-Disclosure Agreements (NDAs) with service providers</li>
            </ul>

            <h3>Regulatory Submissions</h3>
            <ul>
                <li>Applications for RBI Certificate of Registration (CoR)</li>
                <li>Responses to RBI inspection reports and clarifications</li>
                <li>Applications for prior approval (mergers, acquisitions, change of management)</li>
                <li>Applications for compounding of offences</li>
            </ul>

            <h2 id="regulatory-advisory">Regulatory Advisory Services</h2>
            <p>The regulatory landscape for NBFCs in India is dynamic, with the RBI frequently issuing new guidelines, master directions, and circulars. Regulatory advisory services help NBFCs interpret and implement these regulations correctly.</p>
            <p>Key regulatory advisory areas include:</p>
            <ul>
                <li><strong>Scale-Based Regulation (SBR) Advisory:</strong> Determining applicable layer classification and implementing corresponding regulatory requirements</li>
                <li><strong>Capital Adequacy Advisory:</strong> Guidance on maintaining required capital adequacy ratios and Tier I/Tier II capital composition</li>
                <li><strong>Connected Lending Compliance:</strong> Advice on transactions with connected parties and related party disclosure obligations</li>
                <li><strong>Digital Lending Guidelines:</strong> Compliance with RBI's Digital Lending Guidelines, 2022 for NBFCs engaged in digital lending</li>
                <li><strong>Outsourcing Framework:</strong> Compliance with RBI guidelines on outsourcing of financial services</li>
                <li><strong>Information Technology Framework:</strong> Implementation of RBI's IT framework for NBFCs including cyber security and data localisation</li>
                <li><strong>Recovery and Restructuring:</strong> Legal guidance on loan recovery, restructuring of stressed assets, and IBC proceedings</li>
            </ul>

            <div className="warning-box">
                <p className="!mb-0"><strong>Regulatory Alert:</strong> NBFCs classified in the Upper Layer (NBFC-UL) under SBR are required to comply with enhanced regulatory requirements including mandatory listing within 3 years, enhanced corporate governance, and large exposure framework. Non-compliance can attract severe penalties including cancellation of Certificate of Registration.</p>
            </div>

            <h2 id="rbi-inspection">RBI Inspection and Audit Support</h2>
            <p>The RBI conducts periodic inspections of NBFCs under Section 45N of the RBI Act, 1934. These inspections assess the overall functioning of the NBFC including its financial health, regulatory compliance, and governance practices. Legal support during RBI inspections is critical to ensure appropriate responses and prevent adverse findings.</p>

            <h3>Types of RBI Inspections</h3>
            <ul>
                <li><strong>Annual Financial Inspection (AFI):</strong> Comprehensive annual inspection of systemically important NBFCs</li>
                <li><strong>Risk-Based Supervision (RBS):</strong> Risk-focused examination based on the NBFC's risk profile</li>
                <li><strong>Targeted Inspection:</strong> Inspection focused on specific concerns or areas of risk</li>
                <li><strong>Thematic Inspection:</strong> Inspection on specific themes such as digital lending, KYC compliance, etc.</li>
                <li><strong>Follow-up Inspection:</strong> To review corrective action taken on earlier inspection findings</li>
            </ul>

            <h3>Legal Support During Inspections</h3>
            <ul>
                <li>Pre-inspection readiness assessment and gap analysis</li>
                <li>Assistance in preparation and organisation of documents</li>
                <li>Advisory on responses to RBI queries during inspection</li>
                <li>Review and response to Draft Inspection Report (DIR)</li>
                <li>Representation in post-inspection discussions</li>
                <li>Implementation of corrective action plans</li>
            </ul>

            <h2 id="dispute-resolution">Dispute Resolution and Legal Representation</h2>
            <p>NBFCs may face disputes with customers, co-lenders, service providers, or regulatory authorities. Expert legal representation is essential to protect the NBFC's interests and ensure compliance with legal obligations.</p>

            <h3>Areas of Dispute Resolution</h3>
            <ul>
                <li>Recovery proceedings before Debt Recovery Tribunals (DRT) and Debt Recovery Appellate Tribunals (DRAT)</li>
                <li>Enforcement action under SARFAESI Act, 2002</li>
                <li>Insolvency proceedings under the Insolvency and Bankruptcy Code (IBC), 2016</li>
                <li>Consumer complaints before Banking Ombudsman and consumer forums</li>
                <li>Arbitration proceedings arising from commercial disputes</li>
                <li>Regulatory enforcement proceedings before the RBI</li>
                <li>Appeals before the Appellate Authority under the RBI Act</li>
            </ul>

            <h2 id="foreign-investment">Foreign Investment in NBFCs</h2>
            <p>Foreign Direct Investment (FDI) in NBFCs is permitted under the automatic route subject to minimum capitalisation norms prescribed by the RBI. Legal support is essential for structuring foreign investment in NBFCs in compliance with the Foreign Exchange Management Act (FEMA), 1999 and RBI guidelines.</p>

            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Foreign Investment Level</th>
                            <th>Minimum Capitalisation</th>
                            <th>Route</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Up to 51%</td>
                            <td>USD 0.5 Million</td>
                            <td>Automatic</td>
                        </tr>
                        <tr>
                            <td>51% to 75%</td>
                            <td>USD 5 Million</td>
                            <td>Automatic</td>
                        </tr>
                        <tr>
                            <td>75% to 100%</td>
                            <td>USD 50 Million</td>
                            <td>Automatic (with conditions)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>Key legal considerations for foreign investment in NBFCs include compliance with FEMA regulations, reporting requirements to the RBI, compliance with pricing guidelines, and adherence to downstream investment norms.</p>

            <h2 id="penalty-proceedings">Penalty Proceedings and Compounding</h2>
            <p>The RBI has the power to impose penalties on NBFCs for violations of the RBI Act, 1934 and applicable master directions. The RBI (Compounding of Contraventions) Rules, 2024 provide for compounding of certain contraventions by payment of a specified amount.</p>

            <h3>Common Violations Leading to Penalties</h3>
            <ul>
                <li>Failure to maintain minimum Net Owned Fund (NOF)</li>
                <li>Non-submission or delayed submission of statutory returns</li>
                <li>Acceptance of deposits in violation of RBI guidelines</li>
                <li>Non-compliance with KYC/AML requirements</li>
                <li>Violation of interest rate and fee disclosure norms</li>
                <li>Non-maintenance of required capital adequacy ratio</li>
                <li>Failure to comply with Fair Practices Code</li>
                <li>Non-compliance with connected lending norms</li>
            </ul>

            <h3>Penalty Amounts</h3>
            <ul>
                <li>Under Section 58G of RBI Act: Penalty up to ₹5 lakh or twice the amount of default, whichever is higher</li>
                <li>Under Section 45MB: Penalty up to ₹5 lakh for each day of continuing default</li>
                <li>Compounding charges: Determined based on the nature and period of violation</li>
            </ul>

            <h2 id="why-legal-support">Why NBFC Legal Support is Essential</h2>
            <p>The regulatory environment for NBFCs in India is one of the most complex in the financial sector. NBFCs are subject to multiple layers of regulation including the RBI Act, Companies Act, FEMA, PMLA, IBC, and various sector-specific regulations. Without expert legal support, NBFCs risk:</p>

            <ul>
                <li>Rejection of registration applications due to procedural or technical deficiencies</li>
                <li>Imposition of monetary penalties for regulatory non-compliance</li>
                <li>Cancellation of Certificate of Registration by the RBI</li>
                <li>Reputational damage due to adverse inspection findings</li>
                <li>Legal exposure from inadequately drafted loan documents and agreements</li>
                <li>Operational disruption due to regulatory actions</li>
                <li>Personal liability for directors and key managerial personnel</li>
            </ul>

            <div className="success-box">
                <p className="!mb-0"><strong>Expert Advantage:</strong> NBFCs that engage experienced legal counsel from the inception stage demonstrate significantly better compliance track records and face fewer regulatory actions. Early legal advisory investment pays dividends through smooth operations and reduced regulatory risk throughout the NBFC's lifecycle.</p>
            </div>

            <h2 id="our-services">Our NBFC Legal Support Services</h2>
            <p>Our team of experienced NBFC lawyers, compliance professionals, and regulatory experts provides end-to-end legal support to NBFCs across all stages of their lifecycle. Our services include:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="numbered-card">
                    <div className="num-badge">1</div>
                    <div>
                        <h4 className="!mb-1">NBFC Registration Assistance</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Complete assistance with RBI registration including application preparation, document compilation, and COSMOS portal filing.</p>
                    </div>
                </div>
                <div className="numbered-card">
                    <div className="num-badge">2</div>
                    <div>
                        <h4 className="!mb-1">Compliance Management</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Ongoing compliance monitoring, return filing, and regulatory updates to keep your NBFC fully compliant with RBI requirements.</p>
                    </div>
                </div>
                <div className="numbered-card">
                    <div className="num-badge">3</div>
                    <div>
                        <h4 className="!mb-1">Legal Documentation</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Drafting and review of all legal documents including loan agreements, policies, and regulatory submissions.</p>
                    </div>
                </div>
                <div className="numbered-card">
                    <div className="num-badge">4</div>
                    <div>
                        <h4 className="!mb-1">RBI Inspection Support</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Pre-inspection readiness, assistance during inspections, and post-inspection response management.</p>
                    </div>
                </div>
                <div className="numbered-card">
                    <div className="num-badge">5</div>
                    <div>
                        <h4 className="!mb-1">Regulatory Advisory</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Expert advisory on new RBI guidelines, policy implementation, and regulatory strategy for your NBFC.</p>
                    </div>
                </div>
                <div className="numbered-card">
                    <div className="num-badge">6</div>
                    <div>
                        <h4 className="!mb-1">Dispute Resolution</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Legal representation in DRT, SARFAESI proceedings, IBC matters, and regulatory enforcement actions.</p>
                    </div>
                </div>
            </div>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-3 my-6">
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What is the minimum Net Owned Fund (NOF) required to register as an NBFC?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        The minimum Net Owned Fund (NOF) required to register as an NBFC is ₹2 Crore for most categories including NBFC-ICC, NBFC-P2P, and NBFC-AA. However, some categories have higher requirements — NBFC-MFI requires ₹5 Crore (₹2 Crore for North-East states), NBFC-Factor requires ₹5 Crore, NBFC-IFC requires ₹300 Crore, and Housing Finance Companies require ₹20 Crore.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>How long does it take to get RBI registration for an NBFC?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        The timeline for RBI registration of an NBFC typically ranges from 90 to 120 days from the date of submission of complete application with all required documents. However, this timeline can vary based on the completeness of the application, RBI's queries and responses, and the category of NBFC being registered.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>Can an NBFC accept public deposits?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Only specific NBFCs that have received specific authorisation from the RBI to accept public deposits (NBFC-D) can accept public deposits. Most NBFCs are non-deposit taking (NBFC-ND) and cannot accept public deposits. The RBI has been progressively tightening norms for deposit-taking NBFCs, and very few new NBFCs are being permitted to accept public deposits.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What happens if an NBFC fails to comply with RBI regulations?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Non-compliance with RBI regulations can result in monetary penalties, directions to cease certain activities, appointment of directors/administrators by the RBI, or cancellation of the Certificate of Registration. Penalties under Section 58G of the RBI Act can go up to ₹5 lakh, and continuing violations can attract penalties of up to ₹5 lakh per day under Section 45MB.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What is the Scale-Based Regulation (SBR) framework for NBFCs?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        The Scale-Based Regulation (SBR) framework, effective from October 1, 2022, classifies NBFCs into four layers based on their size, activity, and perceived risk: Base Layer (NBFC-BL), Middle Layer (NBFC-ML), Upper Layer (NBFC-UL), and Top Layer (NBFC-TL). Each layer has progressively stricter regulatory requirements. Currently, no NBFC has been placed in the Top Layer. NBFCs in the Upper Layer are subject to bank-like regulations.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>Is foreign investment allowed in NBFCs in India?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Yes, Foreign Direct Investment (FDI) is permitted in NBFCs under the automatic route, subject to minimum capitalisation norms. For foreign investment up to 51%, the minimum capitalisation is USD 0.5 million. For investment between 51-75%, it is USD 5 million, and for investment above 75%, it is USD 50 million. However, these norms do not apply to certain NBFC categories operating in regulated financial sectors.
                    </div>
                </details>
            </div>
        </ServicePageLayout>
    );
}
