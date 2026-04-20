"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-batf", title: "What are BATF Services" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "definitions", title: "Key Definitions" },
        { id: "permitted-activities", title: "Permitted Activities" },
        { id: "eligibility", title: "Eligibility Conditions" },
        { id: "registration-process", title: "Registration Process" },
        { id: "fit-proper", title: "Fit and Proper Requirements" },
        { id: "safeguarding", title: "Safeguarding Conditions" },
        { id: "service-recipient", title: "Service Recipient Requirements" },
        { id: "key-personnel", title: "Key Managerial Personnel" },
        { id: "fees-structure", title: "Fees Structure" },
        { id: "office-currency", title: "Office Space & Currency" },
        { id: "reporting", title: "Reporting Requirements" },
        { id: "advantages", title: "Key Advantages" },
        { id: "current-status", title: "Current Status" },
        { id: "ancillary-transition", title: "Transition from Ancillary Framework" },
        { id: "enforcement", title: "Enforcement & Penalties" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What are BATF Services?",
            a: "BATF stands for Book-keeping, Accounting, Taxation and Financial Crime Compliance Services. These are professional services regulated by IFSCA under the 2024 Regulations for entities operating from GIFT IFSC."
        },
        {
            q: "Who can set up a BATF Service Provider in GIFT IFSC?",
            a: "An applicant must be set up in IFSC in the form of a Company or Limited Liability Partnership (LLP). The promoters must be from a jurisdiction not identified as 'High Risk' by the FATF."
        },
        {
            q: "What is the minimum capital requirement for BATF Service Providers?",
            a: "The IFSCA BATF Regulations 2024 do not specify a minimum capital requirement. However, the entity must demonstrate adequate resources and comply with fit and proper requirements."
        },
        {
            q: "What are the fees for BATF Service Provider registration?",
            a: "Application Fee: USD 5,000 per activity (for entities with less than 500 employees), USD 7,500 (500–1,000 employees), USD 10,000 (more than 1,000 employees). Processing Fee: USD 5,000 per activity. Registration Fee: USD 1,000 per activity. Annual modification fee: 20% of Registration Fee. Relaxation/waiver fee: USD 1,000 per application."
        },
        {
            q: "Can BATF Service Providers serve Indian residents?",
            a: "No. BATF Service Providers can only serve non-resident clients. The service recipient must not be from a Risk Jurisdiction identified by FATF."
        },
        {
            q: "What qualifications are needed for the Principal Officer?",
            a: "The Principal Officer must be a professionally qualified CA, CS, CMA, CPA, CFA or hold equivalent qualifications, or a post-graduate degree in finance, accountancy, business management, commerce, economics, taxation or law. Minimum 5 years of relevant experience is required."
        },
        {
            q: "What is the minimum office space requirement?",
            a: "The BATF Service Provider must ensure office space in IFSC with a minimum carpet area computed at 60 sq. ft. per employee."
        },
        {
            q: "Can existing Ancillary Service Providers continue providing BATF Services?",
            a: "Yes, existing Ancillary Service Providers must communicate willingness within 60 days and seek registration under the new regulations within 3 years. They receive a letter of continuation from IFSCA."
        },
        {
            q: "What currency must BATF operations be conducted in?",
            a: "All operations must be carried out in any Specified Foreign Currency. An INR account is permitted only for administrative and statutory expenses. Balance sheet must be maintained in Specified Foreign Currency."
        },
        {
            q: "Can BATF Service Providers transfer contracts from Group Entities in India?",
            a: "No. BATF Service Providers shall not offer services by way of transferring or receiving existing contracts or work arrangements from their Group Entities in India."
        },
        {
            q: "How many BATF entities are currently registered in GIFT IFSC?",
            a: "As of the latest data, 23 entities have been authorized as BATF Service Providers across permitted activities in GIFT IFSC."
        },
        {
            q: "What are the reporting requirements?",
            a: "BATF Service Providers must furnish operational information to IFSCA as specified, report financials in USD, and submit a compliance certificate from an independent CA/CS/CMA within 90 days of each financial year closure."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏛️", label: "IFSCA" },
                { emoji: "📊", label: "BATF Services" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IFSCA Services", href: "/ifsca" },
                { label: "BATF Services", href: "/ifsca/batf-services" },
            ]}
            title="IFSCA BATF Services: Book-keeping, Accounting, Taxation & Financial Crime Compliance in GIFT IFSC"
            readTime="18 min read"
            focusKeyword="IFSCA BATF Services"
            sections={sections}
            ctaTitle="BATF Services"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for IFSCA BATF Service Provider registration in GIFT IFSC."
            quickFacts={[
                { label: "Regulator", value: "IFSCA" },
                { label: "Location", value: "GIFT IFSC, Gujarat" },
                { label: "Regulation Year", value: "2024" },
                { label: "Entity Type", value: "Company or LLP" },
                { label: "Application Fee", value: "USD 5,000–10,000/activity" },
                { label: "Processing Fee", value: "USD 5,000/activity" },
                { label: "Registration Fee", value: "USD 1,000/activity" },
                { label: "Entities Registered", value: "23+" },
            ]}
            relatedArticles={[
                { title: "Aircraft Leasing IFSC", href: "/ifsca/aircraft-leasing", category: "IFSCA", description: "Aircraft operating and financial lease registration in GIFT IFSC." },
                { title: "IFSCA Insurance Intermediary", href: "/irdai/ifsca-insurance-intermediary", category: "IRDAI", description: "Insurance intermediary registration in GIFT IFSC." },
                { title: "Finance & Accounting Outsourcing", href: "/services/finance-accounting-outsourcing", category: "Services", description: "Finance and accounting outsourcing services for businesses." },
                { title: "ESG Consulting", href: "/services/esg-consulting", category: "Services", description: "ESG compliance and consulting guidance." },
            ]}
            finalCtaTitle="Ready to Register as BATF Service Provider in GIFT IFSC?"
            finalCtaDescription="Get expert assistance with your IFSCA BATF registration. Our team handles the complete process from application to compliance."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    The International Financial Services Centres Authority (IFSCA) has established a comprehensive regulatory framework for Book-keeping, Accounting, Taxation and Financial Crime Compliance (BATF) Services through the IFSCA (Book-keeping, Accounting, Taxation and Financial Crime Compliance Services) Regulations, 2024. These regulations were notified in the Official Gazette on June 6, 2024.
                </p>
                <p>
                    The Government of India, vide notification (CG-DL-E-19012024-251465) dated January 18, 2024, notified Book-keeping, Accounting, Taxation and Financial Crime Compliance as a financial service. These regulations aim to put in place the regulatory framework relating to development, registration and operations of BATF Services from International Financial Services Centres.
                </p>
                <div className="info-box">
                    <strong>📌 Regulation Reference:</strong> IFSCA/GN/2024/003 — International Financial Services Centres Authority (Book-keeping, Accounting, Taxation and Financial Crime Compliance Services) Regulations, 2024. Issued under Section 28, read with Section 12 of the IFSCA Act, 2019.
                </div>
            </section>

            {/* What are BATF Services */}
            <section id="what-is-batf">
                <h2>What are BATF Services</h2>
                <p>
                    BATF Services refer to four categories of professional financial services that can be provided from GIFT IFSC to non-resident clients worldwide. A BATF Service Provider is an entity registered under these regulations to undertake all or any of the following services:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Service Category</th>
                            <th>Scope</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>📒 Book-keeping Services</strong></td>
                            <td>Classifying and recording transactions including payroll ledgers in terms of money or any other unit of measurement in books of account or other related documents. <em>Note: Book-keeping Services do not include payroll and taxation services.</em></td>
                        </tr>
                        <tr>
                            <td><strong>📊 Accounting Services</strong></td>
                            <td>
                                <ul>
                                    <li>Reviewing annual and interim financial statements or other accounting information without any attestation or assurance thereof</li>
                                    <li>Compilation of financial statements from information provided by the client, without giving any attestation or assurances regarding the accuracy of the resulting statements</li>
                                    <li>Preparation of financial statements</li>
                                    <li>Compilation of income statements, balance sheets or other financial information</li>
                                    <li>Analysis of financial statements</li>
                                    <li>Other related accounting support services in relation to any of the above including valuation support services</li>
                                </ul>
                                <em>Note: Accounting Services under this clause do not include auditing services.</em>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>💰 Taxation Services</strong></td>
                            <td>
                                Providing advice and guidance concerning taxes as well as preparing and filing of tax returns of all kinds.
                                <ul>
                                    <li>Tax Consultation</li>
                                    <li>Tax Planning</li>
                                    <li>Preparing and filing of tax returns of all kinds</li>
                                    <li>Advice and guiding concerning taxes</li>
                                </ul>
                                <em>Explanation: Taxation Services include services in relation to all taxes, cesses, duties or levies.</em>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>🔍 Financial Crime Compliance Services</strong></td>
                            <td>Services rendered in relation to compliances of Anti-Money Laundering (AML) / Countering the Financing of Terrorism (CFT) measures and Financial Action Task Force (FATF) recommendations, and other related activities.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Regulatory Framework */}
            <section id="regulatory-framework">
                <h2>Regulatory Framework</h2>
                <div className="info-box">
                    <strong>📌 Objective (Regulation 2):</strong> These regulations aim to put in place the regulatory framework relating to development, registration and operations of Book-keeping, Accounting, Taxation and Financial Crime Compliance Services from International Financial Services Centres.
                </div>
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
                            <td>International Financial Services Centres Authority Act, 2019</td>
                        </tr>
                        <tr>
                            <td>Governing Regulations</td>
                            <td>IFSCA (Book-keeping, Accounting, Taxation and Financial Crime Compliance Services) Regulations, 2024</td>
                        </tr>
                        <tr>
                            <td>Notification Reference</td>
                            <td>IFSCA/GN/2024/003, published in Official Gazette on June 6, 2024</td>
                        </tr>
                        <tr>
                            <td>Government Notification</td>
                            <td>CG-DL-E-19012024-251465 dated January 18, 2024 — notifying BATF as a financial service</td>
                        </tr>
                        <tr>
                            <td>Previous Framework</td>
                            <td>Ancillary Services Framework (Circular F.No. 206/IFSCA/Anc.Aux/2020-21 dated February 10, 2021) — now subsumed</td>
                        </tr>
                        <tr>
                            <td>Chairperson</td>
                            <td>K. Rajaraman</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Definitions */}
            <section id="definitions">
                <h2>Key Definitions</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Term</th>
                            <th>Definition</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>BATF Service Provider</strong></td>
                            <td>The entity registered under these regulations to undertake all or any of the following: (i) book-keeping services; (ii) accounting services; (iii) taxation services; (iv) financial crime compliance services.</td>
                        </tr>
                        <tr>
                            <td><strong>Book-keeping Services</strong></td>
                            <td>Classifying and recording transactions including payroll ledgers in terms of money or any other unit of measurement in the books of account and other related documents. <em>Note: Does not include payroll and taxation services.</em></td>
                        </tr>
                        <tr>
                            <td><strong>Accounting Services</strong></td>
                            <td>Includes preparation, compilation, reviewing and analysis of financial statements and related accounting support services including valuation support. <em>Does not include auditing services.</em></td>
                        </tr>
                        <tr>
                            <td><strong>Taxation Services</strong></td>
                            <td>Providing advice and guidance concerning taxes as well as preparing and filing of tax returns of all kinds. Includes services in relation to all taxes, cesses, duties or levies.</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Crime Compliance Services</strong></td>
                            <td>Services rendered in relation to compliances of Anti-Money Laundering (AML) / Countering the Financing of Terrorism (CFT) measures and Financial Action Task Force (FATF) recommendations, and other related activities.</td>
                        </tr>
                        <tr>
                            <td><strong>Group Entities</strong></td>
                            <td>An arrangement involving two or more entities related through: (i) parent-subsidiary (Ind-AS 110/AS 21); (ii) joint venture (Ind-AS 28/AS 27); (iii) associate (Ind-AS 28/AS 23); (iv) common brand name; (v) investment in equity shares/capital contribution of 20% and above; or (vi) part of a network. <em>Explanation: &ldquo;Network&rdquo; refers to firms that have come together for mutual benefits by pooling resources, showcase their combined strength, uniform policies, technology and collaterals, and showcase themselves as one big unit, with one lead firm acting on behalf of member-firms.</em></td>
                        </tr>
                        <tr>
                            <td><strong>Specified Foreign Currency</strong></td>
                            <td>As specified in Schedule of the IFSCA (Banking) Regulations, 2020 or any other regulation issued by the Authority.</td>
                        </tr>
                        <tr>
                            <td><strong>Non-Resident</strong></td>
                            <td>Has the same meaning as assigned under clause (g) of sub-section (1) of Section 3 of the IFSCA Act, as read with FEMA, 1999 (42 of 1999), and shall also include units in International Financial Service Centre.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Permitted Activities */}
            <section id="permitted-activities">
                <h2>Permitted Activities</h2>
                <p>A registered BATF Service Provider may undertake all or any of the following activities:</p>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Book-keeping Services</h4>
                            <p>Classifying and recording transactions including payroll ledgers in terms of money or any other unit of measurement in books of account or other related documents.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Accounting Services</h4>
                            <p>Preparation, compilation, review and analysis of financial statements, and other related accounting support services including valuation support services. Does not include auditing services.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Taxation Services</h4>
                            <p>Tax consultation, tax planning, preparing and filing of tax returns of all kinds, and advice and guiding concerning taxes.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Financial Crime Compliance Services</h4>
                            <p>Services related to AML/CFT compliance measures and FATF recommendations, and other related activities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
                <h2>Eligibility Conditions</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Entity Structure</strong></td>
                            <td>Must be set up in IFSC in the form of a Company or Limited Liability Partnership (LLP)</td>
                        </tr>
                        <tr>
                            <td><strong>Promoter Jurisdiction</strong></td>
                            <td>Promoters must be from a jurisdiction not identified as &quot;High Risk&quot; by the Financial Action Task Force (FATF)</td>
                        </tr>
                        <tr>
                            <td><strong>Service Recipients</strong></td>
                            <td>BATF services can only be provided to non-resident clients not from Risk Jurisdictions</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Registration Process */}
            <section id="registration-process">
                <h2>Registration Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Submit Application</h4>
                            <p>Submit application to IFSCA in specified format along with non-refundable application fee — USD 5,000 per activity (for entities with &lt;500 employees), USD 7,500 (500–1,000 employees), or USD 10,000 (&gt;1,000 employees).</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>IFSCA Review</h4>
                            <p>Authority reviews the application. If deficiencies are found, applicant has 30 days to rectify them, failing which the application may be rejected.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Grant of Registration</h4>
                            <p>IFSCA may grant Certificate of Registration subject to specified conditions. Registration is valid unless cancelled or surrendered with Authority approval.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Ongoing Compliance</h4>
                            <p>BATF Service Provider must keep IFSCA informed of any material change in information or particulars previously furnished.</p>
                        </div>
                    </div>
                </div>
                <div className="warning-box">
                    <strong>⚠️ Important:</strong> No person, except an existing Ancillary Service Provider with letter of continuation, shall provide BATF Services in IFSC without obtaining a Certificate of Registration from IFSCA.
                </div>
            </section>

            {/* Fit and Proper */}
            <section id="fit-proper">
                <h2>Fit and Proper Requirements (Chapter III)</h2>
                <p>The BATF Service Provider shall ensure that the entity and its principal officer, directors/partners/designated partners, key managerial personnel and controlling shareholders are fit and proper persons at all times.</p>

                <h3>Positive Criteria — A Fit and Proper Person Must Have:</h3>
                <ul>
                    <li>Financial integrity</li>
                    <li>Good reputation and character</li>
                    <li>Honesty</li>
                </ul>

                <h3>Disqualifications — A Person is NOT Fit and Proper if:</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Disqualification</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>(i)</td>
                            <td>Convicted by a court for any offence involving moral turpitude or any economic offence</td>
                        </tr>
                        <tr>
                            <td>(ii)</td>
                            <td>A recovery proceeding has been initiated against the person by a statutory body or financial regulatory authority and is pending</td>
                        </tr>
                        <tr>
                            <td>(iii)</td>
                            <td>An order for winding up has been passed against the person for malfeasance</td>
                        </tr>
                        <tr>
                            <td>(iv)</td>
                            <td>Declared an undischarged insolvent</td>
                        </tr>
                        <tr>
                            <td>(v)</td>
                            <td>An order restraining, prohibiting or debarring the person from accessing, providing or dealing in financial products or financial services has been passed by any regulatory authority, and a period of three (3) years from the date of expiry of the order has not elapsed</td>
                        </tr>
                        <tr>
                            <td>(vi)</td>
                            <td>Any other order against the person has been passed by the Authority or any other regulatory authority, and a period of three (3) years from the date of the order has not elapsed</td>
                        </tr>
                        <tr>
                            <td>(vii)</td>
                            <td>Found to be of unsound mind by a court of competent jurisdiction and the finding is in force</td>
                        </tr>
                        <tr>
                            <td>(viii)</td>
                            <td>Financially not sound or has been categorised as a wilful defaulter</td>
                        </tr>
                        <tr>
                            <td>(ix)</td>
                            <td>Declared a fugitive economic offender</td>
                        </tr>
                        <tr>
                            <td>(x)</td>
                            <td>Any other disqualification as may be specified by the Authority</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Safeguarding Conditions */}
            <section id="safeguarding">
                <h2>Safeguarding Conditions (Chapter IV)</h2>
                <div className="warning-box">
                    <strong>⚠️ Critical Restriction:</strong> The BATF Service Provider shall NOT offer BATF Services by way of transferring or receiving of existing contracts or work arrangements from their Group Entities in India.
                </div>

                <h3>Part A — Splitting, Reconstruction & Reorganization (Regulation 8)</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Workforce Requirement</strong></td>
                            <td>Employees transferred/relocated from Group Entities in India shall not exceed 20% of total employees at the end of financial year. Compliance required for 10 consecutive financial years from date of registration.</td>
                        </tr>
                        <tr>
                            <td><strong>New Employee Definition</strong></td>
                            <td>An employee is treated as new if not employed in any Group Entity in India for 12 months immediately preceding date of employment with BATF Service Provider.</td>
                        </tr>
                        <tr>
                            <td><strong>Asset Requirement</strong></td>
                            <td>No transfer of assets from any Group Entities in India to the BATF Service Provider is permitted.</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Part B — Contracts & Work Arrangements (Regulation 9)</h3>
                <p>Contracts between a BATF Service Provider and service recipients shall be considered as transferred from Group Entities in India in the following scenarios:</p>
                <ul>
                    <li><strong>Transferring existing contracts:</strong> When an existing contract between Group Entities in India with a non-resident client is shifted or transferred to the BATF Service Provider during subsistence</li>
                    <li><strong>Termination & re-contracting:</strong> When an existing contract between Group Entities in India with a non-resident client is prematurely terminated and a new contract is signed between the BATF Service Provider with the same service recipient, directly or indirectly</li>
                    <li>Other scenarios as may be specified by the Authority</li>
                </ul>
            </section>

            {/* Service Recipient */}
            <section id="service-recipient">
                <h2>Service Recipient Requirements (Chapter V)</h2>
                <p>The BATF Service Provider shall ensure that:</p>
                <ul>
                    <li>The service recipient is a <strong>non-resident</strong></li>
                    <li>The service recipient is <strong>not from a Risk Jurisdiction</strong> identified by FATF</li>
                </ul>
                <div className="info-box">
                    <strong>📌 Note:</strong> BATF services can be provided to any non-resident client worldwide, except those from jurisdictions identified by FATF as High Risk Jurisdictions.
                </div>
            </section>

            {/* Key Managerial Personnel */}
            <section id="key-personnel">
                <h2>Key Managerial Personnel (Chapter VI)</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th>Principal Officer (PO)</th>
                            <th>Compliance Officer (CO)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Role</strong></td>
                            <td>Responsible for overall activities in IFSC</td>
                            <td>Responsible for reporting to Board of Directors/head of organization; compliance of policies, procedures, record maintenance, and regulation implementation</td>
                        </tr>
                        <tr>
                            <td><strong>Location</strong></td>
                            <td>Must be based out of IFSC</td>
                            <td>Must be based out of IFSC</td>
                        </tr>
                        <tr>
                            <td><strong>Qualifications</strong></td>
                            <td>CA, CS, CMA, CPA, CFA, or equivalent; or PG degree in finance, accountancy, business management, commerce, economics, taxation, or law. For Financial Crime Compliance: must also hold relevant qualification in financial crime compliance.</td>
                            <td>CA, CS, CMA, CPA, CFA, or equivalent; or PG degree in finance, accountancy, business management, commerce, economics, taxation, or law</td>
                        </tr>
                        <tr>
                            <td><strong>Min. Experience</strong></td>
                            <td>5 years in relevant field</td>
                            <td>3 years in relevant field</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Fees Structure */}
            <section id="fees-structure">
                <h2>Fees Structure</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Component</th>
                            <th>Amount</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Application Fee (&lt;500 employees)</strong></td>
                            <td>USD 5,000 per activity</td>
                            <td>One time (non-refundable)</td>
                        </tr>
                        <tr>
                            <td><strong>Application Fee (500–1,000 employees)</strong></td>
                            <td>USD 7,500 per activity</td>
                            <td>One time (non-refundable)</td>
                        </tr>
                        <tr>
                            <td><strong>Application Fee (&gt;1,000 employees)</strong></td>
                            <td>USD 10,000 per activity</td>
                            <td>One time (non-refundable)</td>
                        </tr>
                        <tr>
                            <td><strong>Processing Fee</strong></td>
                            <td>USD 5,000 per activity</td>
                            <td>One time</td>
                        </tr>
                        <tr>
                            <td><strong>Registration Fee</strong></td>
                            <td>USD 1,000 per activity</td>
                            <td>One time</td>
                        </tr>
                        <tr>
                            <td><strong>Annual Fee — Modification of Terms &amp; Conditions</strong></td>
                            <td>20% of Registration Fee</td>
                            <td>Per modification</td>
                        </tr>
                        <tr>
                            <td><strong>Annual Fee — Relaxation / Waiver</strong></td>
                            <td>USD 1,000</td>
                            <td>Per application (non-refundable)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Office Space & Currency */}
            <section id="office-currency">
                <h2>Office Space & Currency of Operations (Chapter VII)</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Minimum Office Space</strong></td>
                            <td>Minimum carpet area computed at 60 sq. ft. per employee</td>
                        </tr>
                        <tr>
                            <td><strong>Currency of Operations</strong></td>
                            <td>All operations in any Specified Foreign Currency</td>
                        </tr>
                        <tr>
                            <td><strong>INR Account</strong></td>
                            <td>Permitted only for administrative and statutory expenses and other purposes as may be permitted under applicable laws</td>
                        </tr>
                        <tr>
                            <td><strong>Balance Sheet</strong></td>
                            <td>Must be maintained in any Specified Foreign Currency</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Reporting Requirements */}
            <section id="reporting">
                <h2>Reporting Requirements</h2>
                <ul>
                    <li>Furnish information relating to operations to IFSCA in such manner, interval and form as may be specified</li>
                    <li>Any financial reporting to IFSCA shall be in <strong>US Dollar</strong>, unless otherwise specified</li>
                    <li>Submit a <strong>compliance certificate</strong> issued by an independent third-party practicing professional (CA, CS or CMA) certifying compliance with regulations including Regulation 8 and 9, within <strong>90 days</strong> from the closure of each Financial Year</li>
                </ul>
            </section>

            {/* Key Advantages */}
            <section id="advantages">
                <h2>Key Advantages for BATF Service Providers</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Tax Holiday</h4>
                            <p>Tax Holiday on business income for 10 out of 15 years in GIFT IFSC.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Gujarat State Incentives</h4>
                            <p>Capital support at the rate of 25% up to ₹50 Crore for projects with GFCI less than ₹250 Crore. Opex support of 15% up to ₹20 Crore.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Unified Regulator</h4>
                            <p>Single window regulatory framework under IFSCA — simplified compliance and faster approvals.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Access to Skilled Talent</h4>
                            <p>Large pool of qualified CAs, CS, CMAs and finance professionals in India with competitive cost advantage.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Global Market Access</h4>
                            <p>Serve non-resident clients worldwide from India&apos;s International Financial Services Centre with full currency convertibility.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Status */}
            <section id="current-status">
                <h2>Current Status</h2>
                <div className="info-box">
                    <strong>📌 As of latest data:</strong> 23 entities have been authorized as BATF Service Providers across permitted activities in GIFT IFSC.
                </div>
            </section>

            {/* Ancillary Transition */}
            <section id="ancillary-transition">
                <h2>Transition from Ancillary Services Framework (Second Schedule)</h2>
                <p>Existing Ancillary Service Providers providing BATF Services are subject to the following transition conditions:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Continuation Period</strong></td>
                            <td>May continue in existing legal form for 3 years from commencement of regulations</td>
                        </tr>
                        <tr>
                            <td><strong>Registration Deadline</strong></td>
                            <td>Must seek registration under new regulations within 3 years, failing which BATF Services cannot be undertaken</td>
                        </tr>
                        <tr>
                            <td><strong>Ring-fencing</strong></td>
                            <td>Must ring-fence BATF Service operations from other existing operations in IFSC</td>
                        </tr>
                        <tr>
                            <td><strong>Regulation 8 & 9 Compliance</strong></td>
                            <td>Required, except for existing contracts, manpower and assets deployed prior to commencement</td>
                        </tr>
                        <tr>
                            <td><strong>KMP & Office Space</strong></td>
                            <td>Must comply with Regulation 11 (KMP) and 12 (office space) within 6 months of commencement</td>
                        </tr>
                        <tr>
                            <td><strong>Communication</strong></td>
                            <td>Must communicate willingness to operate under new regulations within 60 days of commencement</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Enforcement */}
            <section id="enforcement">
                <h2>Enforcement & Penalties</h2>
                <div className="warning-box">
                    <strong>⚠️ Action in Case of Default (Regulation 18):</strong> A BATF Service Provider who contravenes any provisions of these regulations, guidelines, circulars or directions made thereunder, shall be liable for enforcement action under the Act, including but not limited to <strong>suspension or cancellation of registration</strong>. No enforcement action shall be taken without giving reasonable opportunity to the BATF Service Provider to make its submissions.
                </div>

                <h3>Power to Relax Strict Enforcement (Regulation 15)</h3>
                <p>The Authority, for reasons to be recorded in writing, may in the interest of development of financial market in IFSC, relax the strict enforcement of any requirements of these regulations. For seeking relaxation:</p>
                <ul>
                    <li>An application giving details and grounds for relaxation shall be filed with a non-refundable fee</li>
                    <li>IFSCA shall process such application within sixty (60) days of receipt, complete in all respects</li>
                    <li>Reasons for acceptance or refusal shall be recorded</li>
                </ul>

                <h3>Power to Specify Norms and Issue Clarifications (Regulation 16)</h3>
                <ul>
                    <li>For implementation of these regulations, the Authority may specify norms, procedures, processes, additional requirements by way of circulars, guidelines or directions</li>
                    <li>To remove difficulties in interpretation or application of provisions, the Authority may issue directions through guidance notes or circulars</li>
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
