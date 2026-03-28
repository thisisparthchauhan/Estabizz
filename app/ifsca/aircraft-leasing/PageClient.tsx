"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is", title: "What is Aircraft Leasing in IFSC" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "applicability", title: "Applicability" },
        { id: "definitions", title: "Key Definitions" },
        { id: "eligibility", title: "Eligibility & Registration" },
        { id: "application-process", title: "Application for Registration" },
        { id: "operating-lease", title: "Part I: Aircraft Operating Lease" },
        { id: "financial-lease", title: "Part II: Aircraft Financial Lease" },
        { id: "capital-requirements", title: "Capital Requirements" },
        { id: "fees-structure", title: "Fees Structure" },
        { id: "general-conditions", title: "General Conditions" },
        { id: "compliance", title: "Compliance Requirements" },
        { id: "gift-ifsc", title: "Why GIFT IFSC for Aircraft Leasing" },
        { id: "tax-regime", title: "Tax Regime & Incentives" },
        { id: "business-highlights", title: "Business Highlights" },
        { id: "jurisdictional-comparison", title: "Jurisdictional Comparison" },
        { id: "setting-up", title: "Setting Up an Aircraft Leasing Entity" },
        { id: "transactions-restrictions", title: "Transactions with Residents of India" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is IFSCA Aircraft Leasing?",
            a: "Aircraft leasing under IFSCA refers to entities registered as Finance Companies or Finance Units in GIFT IFSC that provide aircraft, helicopters, engines, ground support equipment, or aviation training simulation devices under operating lease, financial lease, or a hybrid of both."
        },
        {
            q: "What forms of business entities can undertake aircraft leasing in IFSC?",
            a: "An applicant can set up operations in IFSC in the form of a Company, Limited Liability Partnership (LLP), Trust, or any other form as may be specified by IFSCA from time to time."
        },
        {
            q: "What is the minimum capital requirement for aircraft operating lease?",
            a: "A minimum owned fund of USD 200,000 or its equivalent in freely convertible foreign currency must be maintained at all times for operating lease activities."
        },
        {
            q: "What is the minimum capital requirement for aircraft financial lease?",
            a: "A minimum owned fund of USD 3,000,000 (USD 3 million) or its equivalent in freely convertible foreign currency must be maintained at all times for financial lease activities."
        },
        {
            q: "What are the fees for aircraft operating lease registration?",
            a: "Application Fee: USD 1,000 (one time), Registration Fee: USD 12,500 (one time), Annual Fee: USD 5,000 (recurring)."
        },
        {
            q: "What are the fees for aircraft financial lease registration?",
            a: "Application Fee: USD 1,000 (one time), Registration Fee: USD 12,500 (one time), Annual Fee: USD 12,500 (recurring)."
        },
        {
            q: "What currencies can aircraft lessors transact in?",
            a: "All transactions must be in freely convertible foreign currency only. However, the Lessor may defray administrative expenses in INR by maintaining a separate INR account."
        },
        {
            q: "Can aircraft lessors share office space in IFSC?",
            a: "Yes, IFSC aircraft lessors are permitted to share office space or manpower or both with another aircraft lessor being a group entity, as per Rule 21B of the SEZ Rules 2006."
        },
        {
            q: "What is the Cape Town Convention requirement?",
            a: "The Lessor shall comply with the Cape Town Convention and Protocol and all other applicable statutory obligations, regulatory requirements, standards, policies, directions and guidelines."
        },
        {
            q: "How many aviation assets have been leased from IFSC so far?",
            a: "As of November 2024, 184 aviation assets have been leased from IFSC, with 32 Aircraft Leasing & Financing entities registered with IFSCA."
        },
        {
            q: "What is GIFT IFSC?",
            a: "GIFT IFSC (Gujarat International Finance Tec-City International Financial Services Centre) is India's first and only International Financial Services Centre, located in Gandhinagar, Gujarat. It serves as a gateway for channelizing global capital and provides a competitive tax regime."
        },
        {
            q: "What tax benefits are available for aircraft leasing entities in GIFT IFSC?",
            a: "Tax Holiday on Business Income for 10 out of 15 years, Minimum Alternate Tax at 9%, no CTT/STT/GST/Stamp Duty, and reduced withholding tax of 9% on interest paid on debt instruments."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏛️", label: "IFSCA" },
                { emoji: "✈️", label: "Aircraft Leasing" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IFSCA Services", href: "/ifsca" },
                { label: "Aircraft Leasing", href: "/ifsca/aircraft-leasing" },
            ]}
            title="IFSCA Aircraft Leasing License: Complete Guide to Registration in GIFT IFSC"
            readTime="20 min read"
            focusKeyword="IFSCA Aircraft Leasing"
            sections={sections}
            ctaTitle="Aircraft Leasing"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for IFSCA Aircraft Leasing registration in GIFT IFSC."
            quickFacts={[
                { label: "Regulator", value: "IFSCA" },
                { label: "Location", value: "GIFT IFSC, Gujarat" },
                { label: "Min Capital (Operating)", value: "USD 200,000" },
                { label: "Min Capital (Financial)", value: "USD 3,000,000" },
                { label: "Application Fee", value: "USD 1,000" },
                { label: "Registration Fee", value: "USD 12,500" },
                { label: "Currency", value: "Freely Convertible Foreign Currency" },
                { label: "Entities Registered", value: "32+ (as of Nov 2024)" },
            ]}
            relatedArticles={[
                { title: "IFSCA Insurance Intermediary", href: "/irdai/ifsca-insurance-intermediary", category: "IRDAI", description: "Insurance intermediary registration and compliance in GIFT IFSC." },
                { title: "IFSCA Factoring Business", href: "/services/enterprise-services", category: "IFSCA", description: "Setting up factoring business operations in GIFT IFSC." },
                { title: "FEMA Registration", href: "/fema/fema-registration", category: "FEMA", description: "FEMA registration and compliance guide for businesses in India." },
                { title: "Finance Company Registration", href: "/services/enterprise-services", category: "Services", description: "Enterprise services and finance company registration guidance." },
            ]}
            finalCtaTitle="Ready to Set Up Aircraft Leasing in GIFT IFSC?"
            finalCtaDescription="Get expert assistance with your IFSCA Aircraft Leasing registration. Our team handles the complete process from application to compliance."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    Aircraft leasing has emerged as a significant financial services activity in India&apos;s International Financial Services Centre (IFSC) at GIFT City, Gandhinagar. The International Financial Services Centres Authority (IFSCA) has established a comprehensive regulatory framework to facilitate and regulate aircraft leasing operations, positioning GIFT IFSC as a globally competitive hub for aviation finance.
                </p>
                <p>
                    In exercise of the powers conferred by sub-clause (vi) of clause (d) of sub-section (1) of section 3 of the International Financial Services Centres Authority Act, 2019, the Government of India has notified aircraft lease — including operating and financial lease and any hybrid of operating and financial lease of aircraft or helicopter and engines of aircraft or helicopter or any other part thereof — as a &apos;financial product&apos;.
                </p>
                <div className="info-box">
                    <strong>📌 IFSCA Circular Reference:</strong> F. No. 172/IFSCA/Finance Company Regulations/2022-23/01, dated May 18, 2022 (Updated as on February 26, 2025)
                </div>
            </section>

            {/* What Is */}
            <section id="what-is">
                <h2>What is Aircraft Leasing in IFSC</h2>
                <p>
                    Aircraft leasing in IFSC refers to the business of providing aircraft, helicopters, engines, ground support equipment, and aviation training simulation devices under various lease arrangements through entities registered with IFSCA as Finance Companies or Finance Units.
                </p>
                <p>
                    The Government of India has notified the following as &apos;financial products&apos; under the IFSCA Act:
                </p>
                <ul>
                    <li><strong>Aircraft Lease:</strong> Operating and financial lease and any hybrid of operating and financial lease of aircraft or helicopter and engines of aircraft or helicopter or any other part thereof (Gazette Notification S.O. 3652(E) dated October 16, 2020)</li>
                    <li><strong>Operating Lease:</strong> Including any hybrid of operating and financial lease of specified products or equipment (Gazette Notification S.O.5199(E) dated December 14, 2021)</li>
                </ul>
                <p>
                    IFSCA has further specified that the following equipment qualifies as &apos;Aircraft Ground Support Equipment&apos;:
                </p>
                <ul>
                    <li>Any piece of mobile equipment, whether or not powered or self-propelled, purpose designed, built and used for ground handling, servicing or field maintenance of aircraft on the ramp area of an airport, including equipment specified by IATA</li>
                    <li>Equipment used for providing services necessary for ramp handling including activities as specified by Airports Authority of India</li>
                    <li>Aviation training simulation devices as may be permitted by the Authority</li>
                </ul>
            </section>

            {/* Regulatory Framework */}
            <section id="regulatory-framework">
                <h2>Regulatory Framework</h2>
                <p>
                    Aircraft leasing in IFSC is regulated under the following framework:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Regulation / Circular</th>
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
                            <td>IFSCA (Finance Company) Regulations, 2021</td>
                        </tr>
                        <tr>
                            <td>Framework Circular</td>
                            <td>F. No. 172/IFSCA/Finance Company Regulations/2022-23/01 dated May 18, 2022 (Updated February 26, 2025)</td>
                        </tr>
                        <tr>
                            <td>Amendment (April 2023)</td>
                            <td>Circular No. 172/IFSCA/Finance Company Regulations/2022-23/003 dated April 26, 2023</td>
                        </tr>
                        <tr>
                            <td>Fee Structure</td>
                            <td>Circular No. 865/IFSCA/Banking/Fee Revision/2022-23 dated May 17, 2023</td>
                        </tr>
                        <tr>
                            <td>Office Space Sharing</td>
                            <td>Circular No. 535/IFSCA/FC/ALF/2023-24/02 dated April 18, 2023</td>
                        </tr>
                        <tr>
                            <td>Transactions Restriction</td>
                            <td>Circular No. 172/IFSCA/Finance Company Regulations/2024-25/02 dated February 26, 2025</td>
                        </tr>
                        <tr>
                            <td>AML/CFT/KYC Guidelines</td>
                            <td>IFSCA (Anti Money Laundering, Counter-Terrorist Financing and Know Your Customer) Guidelines, 2022 dated October 28, 2022</td>
                        </tr>
                        <tr>
                            <td>Classification (Operating Lease)</td>
                            <td>Permitted non-core activity under sub-clause (g) of clause (iii) of sub-regulation (1) of regulation 5</td>
                        </tr>
                        <tr>
                            <td>Classification (Financial Lease)</td>
                            <td>Permitted core activity under sub-clause (a) of clause (ii) of sub-regulation (1) of regulation 5</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Applicability */}
            <section id="applicability">
                <h2>Applicability</h2>
                <p>
                    This framework shall apply to all applicants desirous of seeking registration for one or more of the permissible activities specified under the IFSCA Circular. The framework covers:
                </p>
                <ul>
                    <li>All Finance Companies registered in the International Financial Services Centres (IFSCs)</li>
                    <li>All Finance Units registered in the IFSCs</li>
                    <li>New applicants desirous of undertaking aircraft leasing activities in IFSC</li>
                </ul>
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
                            <td><strong>Aircraft Ground Support Equipment</strong></td>
                            <td>Any piece of mobile equipment purpose designed, built and used for ground handling, servicing or field maintenance of aircraft on the ramp area of an airport, including equipment specified by IATA; and equipment used for ramp handling services as specified by AAI.</td>
                        </tr>
                        <tr>
                            <td><strong>Aviation Training Simulation Devices</strong></td>
                            <td>Devices as may be permitted by the Authority for aviation training purposes.</td>
                        </tr>
                        <tr>
                            <td><strong>Lessor</strong></td>
                            <td>An entity registered with IFSCA as a Finance Company or a Finance Unit engaged in the business of providing aircraft or helicopter and engines of aircraft or helicopter or any other part thereof and/or aircraft ground support equipment and/or aviation training simulation device under an operating lease, financial lease and/or a hybrid of financial and operating lease; and any other related activity as may be specified by the Authority.</td>
                        </tr>
                        <tr>
                            <td><strong>Owned Fund</strong></td>
                            <td>Paid-up capital and free reserves (share premium account and capital reserves from surplus arising out of sale proceeds of asset), excluding reserves created by revaluation of asset, as reduced by accumulated loss balance, book value of intangible assets and deferred revenue expenditure.</td>
                        </tr>
                        <tr>
                            <td><strong>Group Entities</strong></td>
                            <td>Two or more entities related through: Subsidiary–parent (AS 21), Joint venture (AS 27), Associate (AS 23), Related party (AS 18), Common brand name, or investment in equity shares (20% and above).</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
                <h2>Eligibility & Registration Requirements</h2>
                <p>An applicant desirous of undertaking permissible activities in IFSCs as a Lessor shall meet the following eligibility criteria:</p>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Entity Structure</h4>
                            <p>The applicant shall set-up operations in IFSC in the form of a Company or a Limited Liability Partnership (LLP) or a Trust or in any other form as may be specified by the IFSCA from time to time.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Promoter Jurisdiction (Company)</h4>
                            <p>In case the applicant is a company, the &apos;promoter&apos; as defined in the Companies Act, 2013, shall be located in a Financial Action Task Force (FATF) compliant jurisdiction.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Promoter Jurisdiction (LLP/Trust)</h4>
                            <p>In case the applicant is an LLP or a Trust, the partners or the trustees, as the case may be, shall also comply with the FATF compliant jurisdiction requirement.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Wholly Owned Subsidiary Route</h4>
                            <p>An entity in IFSC, intending to undertake aircraft lease only through its wholly owned subsidiary(ies) set up in IFSC, shall also be deemed to be a Lessor under this framework and may apply for registration accordingly.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Finance Company Regulations</h4>
                            <p>Meet all eligibility criteria and other requirements as specified under the IFSCA (Finance Company) Regulations, 2021.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Process */}
            <section id="application-process">
                <h2>Application for Registration</h2>
                <p>The application process for aircraft leasing registration involves the following:</p>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Submit Application via SWITS</h4>
                            <p>An applicant shall submit an application to the IFSCA through the Single Window IT System (SWITS) at <strong>https://swit.ifsca.gov.in/</strong> along with the prescribed application fees.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Obtain Certificate of Registration</h4>
                            <p>An applicant shall not undertake permissible activities as a Lessor unless it has obtained a Certificate of Registration from the IFSCA under Finance Company Regulations.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Separate Registration for Financial Lease</h4>
                            <p>Any entity desirous of undertaking financial lease activities shall apply separately for registration. An entity already registered for operating lease is also eligible to apply.</p>
                        </div>
                    </div>
                </div>
                <div className="warning-box">
                    <strong>⚠️ Important:</strong> An applicant desirous of undertaking &apos;Asset Management Support Services&apos; for assets other than those specified in the aircraft leasing framework shall obtain a separate authorisation under the framework for enabling ancillary services at IFSC (Circular F.No. 206/IFSCA/Anc.Aux/2020-21 dated February 10, 2021).
                </div>
            </section>

            {/* Part I: Operating Lease */}
            <section id="operating-lease">
                <h2>Part I: Aircraft Operating Lease</h2>
                <p>A Lessor registered under Part I shall be permitted to undertake all or any of the following activities:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Permissible Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Operating lease for an aircraft lease arrangement</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Operating lease for an aircraft ground support equipment</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Operating lease for an aviation training simulation device</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Asset Management Support Services for assets owned or leased out by the entity or by any of its Group Entities set up in IFSCs in India</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Sale and lease back, purchase, novation, transfer, assignment, and such other similar transactions in relation to permitted activities (i) to (iii), subject to restrictions in clause O.2</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Any other related activity with the prior approval of IFSCA</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Classification:</strong> Operating lease for aircraft lease is classified as a &apos;permitted non-core activity&apos; under sub-clause (g) of clause (iii) of sub-regulation (1) of regulation 5 of the Finance Company Regulations.
                </div>
            </section>

            {/* Part II: Financial Lease */}
            <section id="financial-lease">
                <h2>Part II: Aircraft Financial Lease</h2>
                <p>A Lessor registered under Part II shall be permitted to undertake all or any of the following activities:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Permissible Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Financial lease or a hybrid of financial and operating lease for an aircraft lease arrangement</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Financial lease or any hybrid of financial and operating lease for an aircraft ground support equipment</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Financial lease or any hybrid of financial and operating lease for an aviation training simulation device</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Sale and lease back, purchase, novation, transfer, assignment, and such other similar transactions in relation to permitted activities (i) to (iii), subject to restrictions in clause O.2</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Permitted activities as stated under Part I (Operating Lease) of this framework</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Any other related activity with the prior approval of IFSCA</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Classification:</strong> Financial lease for aircraft lease is classified as a &apos;permitted core activity&apos; under sub-clause (a) of clause (ii) of sub-regulation (1) of regulation 5 of the Finance Company Regulations.
                </div>
            </section>

            {/* Capital Requirements */}
            <section id="capital-requirements">
                <h2>Capital Requirements</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Lease Type</th>
                            <th>Minimum Owned Fund</th>
                            <th>Currency</th>
                            <th>Additional Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Operating Lease</strong></td>
                            <td>USD 200,000</td>
                            <td>Freely convertible foreign currency</td>
                            <td>IFSCA may specify additional capital as a risk management measure based on nature and scale of business</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Lease / Hybrid</strong></td>
                            <td>USD 3,000,000</td>
                            <td>Freely convertible foreign currency</td>
                            <td>IFSCA may specify additional capital as a risk management measure based on nature and scale of business</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Note:</strong> The owned fund requirement is to be met before commencing business. A time period of 6 months is provided from the date of grant of provisional registration for infusing the funds.
                </div>
            </section>

            {/* Fees Structure */}
            <section id="fees-structure">
                <h2>Fees Structure</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Component</th>
                            <th>Operating Lease (Part I)</th>
                            <th>Financial Lease (Part II)</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Application Fee</strong></td>
                            <td>USD 1,000</td>
                            <td>USD 1,000</td>
                            <td>One time</td>
                        </tr>
                        <tr>
                            <td><strong>Registration Fee</strong></td>
                            <td>USD 12,500</td>
                            <td>USD 12,500</td>
                            <td>One time</td>
                        </tr>
                        <tr>
                            <td><strong>Annual Fee</strong></td>
                            <td>USD 5,000</td>
                            <td>USD 12,500</td>
                            <td>Recurring</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <em>As per IFSCA Circular No. 865/IFSCA/Banking/Fee Revision/2022-23 dated May 17, 2023, on &apos;Fee structure for the entities undertaking or intending to undertake permissible activities in IFSC&apos;.</em>
                </p>
            </section>

            {/* General Conditions */}
            <section id="general-conditions">
                <h2>General Conditions</h2>

                <h3>Currency for Conduct of Business</h3>
                <p>All transactions undertaken by a Lessor shall be in freely convertible foreign currency only. However, the Lessor may defray their administrative expenses in INR by maintaining a separate INR account.</p>

                <h3>Maintenance of Books of Accounts, Records and Documents</h3>
                <p>The Lessor shall maintain its books of accounts, records, and documents as required under applicable law. The books of accounts and other financial information shall be maintained in any such freely convertible currency.</p>

                <h3>Sharing of Office Space or Manpower</h3>
                <p>IFSC aircraft lessors are permitted to share office space or manpower or both with another aircraft lessor being a group entity, as per Rule 21B of the SEZ Rules 2006, governed by Circular No. 535/IFSCA/FC/ALF/2023-24/02 dated April 18, 2023.</p>

                <h3>Submission of Reports / Information</h3>
                <p>The Lessor shall furnish the following information to the IFSCA within 15 days from the finalisation of annual financial statements:</p>
                <ul>
                    <li>Audited Annual financial statements</li>
                    <li>Confirmation of compliance with applicable regulations, circulars, guidelines and directions issued by IFSCA</li>
                    <li>Confirmation of compliance with capital requirement and details thereof</li>
                    <li>Details of material regulatory action, if any, against the Promoters, Key Managerial Persons or persons controlling the Lessor</li>
                </ul>
                <p>All financial information shall be submitted expressed in USD, unless otherwise specified.</p>
            </section>

            {/* Compliance */}
            <section id="compliance">
                <h2>Compliance Requirements</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Area</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Cape Town Convention</strong></td>
                            <td>Comply with the Cape Town Convention and Protocol and all other applicable statutory obligations</td>
                        </tr>
                        <tr>
                            <td><strong>AML/CFT/KYC</strong></td>
                            <td>Comply with IFSCA (Anti Money Laundering, Counter-Terrorist Financing and Know Your Customer) Guidelines, 2022 dated October 28, 2022</td>
                        </tr>
                        <tr>
                            <td><strong>Resources</strong></td>
                            <td>Deploy resources commensurate with business operations</td>
                        </tr>
                        <tr>
                            <td><strong>Prudential Regulations</strong></td>
                            <td>Subject to Regulation 4 (applicable prudential regulations) of Finance Company Regulations</td>
                        </tr>
                        <tr>
                            <td><strong>Corporate Governance</strong></td>
                            <td>Subject to Regulation 8 (Corporate Governance and Disclosure requirements) of Finance Company Regulations</td>
                        </tr>
                        <tr>
                            <td><strong>KYC Requirements</strong></td>
                            <td>Subject to Regulation 7 (Know Your Customer and Anti-Money Laundering) of Finance Company Regulations</td>
                        </tr>
                        <tr>
                            <td><strong>Annual Reporting</strong></td>
                            <td>Submit audited financials and compliance confirmations within 15 days of finalisation</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>⚠️ Action in Case of Default:</strong> If a Lessor fails to fulfil the conditions subject to which the registration is granted, the IFSCA may take any action as it may deem fit, after giving an opportunity of making submissions.
                </div>
            </section>

            {/* Why GIFT IFSC */}
            <section id="gift-ifsc">
                <h2>Why GIFT IFSC for Aircraft Leasing</h2>
                <p>GIFT IFSC offers unique and distinct features that make it an attractive destination for aircraft leasing:</p>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Dedicated & Unified Financial Regulator</h4>
                            <p>IFSCA serves as a single-window regulator for all financial services in IFSC, simplifying the regulatory landscape.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Full Convertibility</h4>
                            <p>Full convertibility with 15 foreign currencies, with no capital controls for transactions within IFSC.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Attractive Tax Regime</h4>
                            <p>Tax Holiday on Business Income for 10 out of 15 years, MAT at 9%, no CTT/STT/GST/Stamp Duty.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Globally Benchmarked Regulations</h4>
                            <p>Regulations benchmarked against leading international financial centres with sovereign support including carve-outs.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Access to Indian Economy</h4>
                            <p>Hinterland advantage with access to the large Indian economy — the 5th largest globally, projected to become 3rd largest by FY28.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Cost & Talent Advantage</h4>
                            <p>Beneficial cost of operations and availability of a skilled talent pool, with 65% of India&apos;s population under 35 years of age.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tax Regime */}
            <section id="tax-regime">
                <h2>Tax Regime & Incentives</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Incentive</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Tax Holiday</strong></td>
                            <td>Tax Holiday on Business Income for 10 out of 15 years</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Alternate Tax (MAT)</strong></td>
                            <td>MAT at 9% (MAT provisions not applicable for companies opting for concessional tax rate under Sec. 115BA of Income Tax Act, 1961)</td>
                        </tr>
                        <tr>
                            <td><strong>Transaction Taxes</strong></td>
                            <td>No CTT (Commodity Transaction Tax), STT (Securities Transaction Tax), GST, or Stamp Duty</td>
                        </tr>
                        <tr>
                            <td><strong>Withholding Tax</strong></td>
                            <td>Reduced Withholding Tax of 9% on interest paid on Debt Instruments</td>
                        </tr>
                        <tr>
                            <td><strong>State Incentives</strong></td>
                            <td>Incentives under Gujarat IT/ITeS Policy (2022-27)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Business Highlights */}
            <section id="business-highlights">
                <h2>Business Highlights: GIFT IFSC</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Value (as of Nov 2024)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>IFSCA Registered Entities</td>
                            <td>725+</td>
                        </tr>
                        <tr>
                            <td>Monthly Turnover on IFSC Exchanges</td>
                            <td>USD 87 Billion</td>
                        </tr>
                        <tr>
                            <td>Total Banking Asset Size</td>
                            <td>USD 71 Billion</td>
                        </tr>
                        <tr>
                            <td>Fund Management Entities</td>
                            <td>137</td>
                        </tr>
                        <tr>
                            <td>Cumulative Debt Listing</td>
                            <td>USD 63+ Billion</td>
                        </tr>
                        <tr>
                            <td>Cumulative Banking Transactions</td>
                            <td>USD 1,048 Billion</td>
                        </tr>
                        <tr>
                            <td>AIF Targeted Corpus</td>
                            <td>USD 45+ Billion</td>
                        </tr>
                        <tr>
                            <td><strong>Aviation Assets Leased from IFSC</strong></td>
                            <td><strong>184</strong></td>
                        </tr>
                        <tr>
                            <td>Aircraft Leasing & Financing Entities</td>
                            <td>32</td>
                        </tr>
                        <tr>
                            <td>Ship Leasing & Financing Entities</td>
                            <td>21</td>
                        </tr>
                        <tr>
                            <td>Derivative Transactions by Banks</td>
                            <td>USD 40 Billion (monthly)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Jurisdictional Comparison */}
            <section id="jurisdictional-comparison">
                <h2>Jurisdictional Comparison</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Foreign Jurisdiction (Rest of World)</th>
                            <th>IFSC SEZ (India)</th>
                            <th>India DTA (Domestic)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Jurisdiction</strong></td>
                            <td>Offshore Non-Resident</td>
                            <td>Offshore Non-Resident</td>
                            <td>Onshore Resident</td>
                        </tr>
                        <tr>
                            <td><strong>Currency</strong></td>
                            <td>Respective International Currency</td>
                            <td>15 Currencies (INR Not Permitted)</td>
                            <td>INR denominated</td>
                        </tr>
                        <tr>
                            <td><strong>Tax</strong></td>
                            <td>Offshore</td>
                            <td>Tax Holiday (Tax Resident)</td>
                            <td>Taxes as applicable</td>
                        </tr>
                        <tr>
                            <td><strong>Law</strong></td>
                            <td>Resident&apos;s Jurisdiction</td>
                            <td>Indian Jurisdiction</td>
                            <td>Indian Jurisdiction</td>
                        </tr>
                        <tr>
                            <td><strong>FEMA</strong></td>
                            <td>Applicable</td>
                            <td>Full Convertibility</td>
                            <td>Applicable</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Setting Up */}
            <section id="setting-up">
                <h2>Setting Up an Aircraft Leasing Entity in IFSC</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Choose Entity Structure</h4>
                            <p>Decide on Company, LLP, Trust or other permitted form. Ensure promoter/partner/trustee is in FATF-compliant jurisdiction.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Determine Lease Type</h4>
                            <p>Decide whether to undertake Operating Lease (Part I), Financial Lease (Part II), or both. Capital requirements differ significantly.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Prepare Application</h4>
                            <p>Compile all required documents, business plan, and capital proof as per Finance Company Regulations.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Submit via SWITS Portal</h4>
                            <p>Submit application through IFSCA&apos;s Single Window IT System (SWITS) at https://swit.ifsca.gov.in/ with application fee of USD 1,000.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Obtain Provisional Registration</h4>
                            <p>IFSCA reviews the application and grants provisional registration. You have 6 months to infuse the required capital.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Infuse Capital & Get Final Registration</h4>
                            <p>Meet owned fund requirements (USD 200,000 for operating / USD 3M for financial lease) and obtain Certificate of Registration.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">7</div>
                        <div className="step-card">
                            <h4>Set Up Operations in GIFT City</h4>
                            <p>Establish office in GIFT IFSC SEZ. Option to share office space with group entity aircraft lessors under Rule 21B of SEZ Rules.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">8</div>
                        <div className="step-card">
                            <h4>Commence Business</h4>
                            <p>Begin aircraft leasing operations in compliance with all IFSCA regulations, Cape Town Convention, AML/KYC guidelines, and annual reporting requirements.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transactions Restrictions */}
            <section id="transactions-restrictions">
                <h2>Transactions with Persons Resident in India</h2>
                <div className="warning-box">
                    <strong>⚠️ Important Restriction (Updated February 26, 2025):</strong>
                    <p>No Lessor shall purchase, lease or otherwise acquire any asset(s) covered under this framework from person(s) resident in India, where post-acquisition, the asset will be operated or used solely by person(s) resident in India or to provide services to person(s) resident in India.</p>
                </div>
                <h3>Exceptions to the Restriction:</h3>
                <p>The above restrictions shall not apply where:</p>
                <ul>
                    <li>Acquiring by the Lessor is from such person(s) who is not a &apos;Group Entity&apos; of the Lessor; or</li>
                    <li>Acquiring by a Lessor is as a part of sale and leaseback arrangement of such assets which are being imported into India for the first time; or</li>
                    <li>Such asset(s) is acquired by the Lessor from a manufacturer of such asset(s) in India.</li>
                </ul>
                <p><em>As per Circular No. 172/IFSCA/Finance Company Regulations/2024-25/02 dated February 26, 2025.</em></p>
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
