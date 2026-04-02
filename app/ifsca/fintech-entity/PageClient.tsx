"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "fintech-vs-techfin", title: "FinTech vs TechFin" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "authorization", title: "Authorization (Direct Entry)" },
        { id: "sandbox-overview", title: "Sandbox Overview" },
        { id: "regulatory-sandbox", title: "FinTech Regulatory Sandbox" },
        { id: "innovation-sandbox", title: "FinTech Innovation Sandbox" },
        { id: "iors", title: "Inter-Operable Regulatory Sandbox" },
        { id: "accelerator", title: "Accelerator Framework" },
        { id: "permissible-activities", title: "Permissible Activities" },
        { id: "incentive-scheme", title: "FinTech Incentive Scheme" },
        { id: "grant-details", title: "Grant Categories & Amounts" },
        { id: "grant-conditions", title: "Grant Conditions & Disbursement" },
        { id: "fees-structure", title: "Fee Structure" },
        { id: "office-setup", title: "Office Setup & Currency" },
        { id: "compliance", title: "Compliance & Reporting" },
        { id: "tax-benefits", title: "Tax Benefits at GIFT IFSC" },
        { id: "current-status", title: "Current Status" },
        { id: "advantages", title: "Key Advantages" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is the IFSCA FinTech Entity (FE) Framework?",
            a: "The FE Framework (Circular dated April 27, 2022) is IFSCA's regulatory framework for authorizing domestic and foreign entities as 'FinTech Entities' to carry out FinTech or TechFin activities in GIFT IFSC. It offers two pathways: direct Authorization for mature firms and Limited Use Authorization via Sandbox for early-stage entities."
        },
        {
            q: "What is the difference between FinTech and TechFin?",
            a: "FinTechs provide financial technology solutions resulting in new business models, applications, processes or products in financial services regulated by IFSCA. TechFins provide advanced/emerging technology solutions that aid and assist activities related to financial products, services and institutions."
        },
        {
            q: "Who is eligible to apply under the FE Framework?",
            a: "Indian applicants: DPIIT-registered startups, companies/LLPs, branches in IFSC, or entities in the ecosystem regulated by RBI/SEBI/IRDAI/PFRDA. Foreign applicants: entities from FATF-compliant jurisdictions (not on the FATF blacklist)."
        },
        {
            q: "What are the mandatory requirements for direct Authorization?",
            a: "The applicant must: (1) use technology in its core product/service, business model, or methodology, (2) have a deployable solution/working product, and (3) have a revenue earning track record in at least one of the last three financial years."
        },
        {
            q: "Is it mandatory to set up an office in GIFT IFSC?",
            a: "For Sandbox (Limited Use Authorization): No office requirement unless a bank account is needed in IFSC. For Authorization: The entity must establish an office in GIFT IFSC and commence operations within 120 days from authorization."
        },
        {
            q: "What types of grants are available under the FinTech Incentive Scheme?",
            a: "Six grant types: FinTech Start-up Grant (up to INR 15 Lakhs), Proof of Concept Grant (up to INR 50 Lakhs), Sandbox Grant (up to INR 30 Lakhs), Green FinTech Grant (up to INR 75 Lakhs), Accelerator Grant (up to INR 10 Lakhs per cohort), and Listing Support Grant (up to INR 15 Lakhs)."
        },
        {
            q: "What is the application fee for FinTech grants?",
            a: "The application fee for all types of grants (including Accelerator Grant) is USD 100 for both Indian and foreign applicants."
        },
        {
            q: "What is the maximum duration of sandbox testing?",
            a: "The maximum duration is 12 months, which may be extended by an additional 6 months upon request of the FinTech Entity."
        },
        {
            q: "Can a FinTech Entity serve domestic Indian customers from GIFT IFSC?",
            a: "No. GIFT IFSC caters to customers outside the jurisdiction of the domestic economy. Entities must focus on global outreach. However, foreign FinTechs can explore India markets through the IoRS framework with IFSCA as principal regulator."
        },
        {
            q: "What currencies can FinTech Entities transact in?",
            a: "FinTech Entities must transact in freely convertible foreign currencies only (USD, EUR, GBP, JPY, CAD, AUD, CHF, HKD, SGD, AED, RUB). Administrative expenses may be paid in INR through an SNRR account."
        },
        {
            q: "What happens after successful exit from the Sandbox?",
            a: "Upon successful exit, the FE who desires to carry on business as FinTech under existing or modified regulatory dispensation shall be Authorized as 'FinTech Entity' and must incorporate an entity or establish a branch/subsidiary in IFSC."
        },
        {
            q: "What are the eligibility criteria for Accelerators?",
            a: "Indian or foreign accelerators from FATF-compliant jurisdictions must meet at least 2 of: operated at least one cohort, raised cumulative INR 5 Crore+ for supported entities, signed MoUs with international partners, recognized as TBI by DST, incubated 100+ startups, incubated 10+ FinTech startups, or assisted by Central/State Government."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏛️", label: "IFSCA" },
                { emoji: "🚀", label: "FinTech Entity" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IFSCA Services", href: "/ifsca" },
                { label: "FinTech Entity", href: "/ifsca/fintech-entity" },
            ]}
            title="IFSCA FinTech Entity Framework & Incentive Scheme: Authorization, Sandbox & Grants in GIFT IFSC"
            readTime="22 min read"
            focusKeyword="IFSCA FinTech Entity"
            sections={sections}
            ctaTitle="FinTech Authorization"
            ctaDescription="Expert guidance for IFSCA FinTech Entity authorization, sandbox entry and incentive grant applications in GIFT IFSC."
            quickFacts={[
                { label: "Regulator", value: "IFSCA" },
                { label: "Location", value: "GIFT City, Gujarat" },
                { label: "Framework", value: "FE Framework 2022" },
                { label: "Incentive Scheme", value: "FIS 2022" },
                { label: "Max Grant", value: "INR 75 Lakhs" },
                { label: "Sandbox Duration", value: "12 + 6 months" },
                { label: "Grant App Fee", value: "USD 100" },
            ]}
            relatedArticles={[
                { title: "Finance Company GIFT IFSC", href: "/ifsca/finance-company", category: "IFSCA", description: "Finance Company and Finance Unit registration in GIFT IFSC." },
                { title: "BATF Services IFSC", href: "/ifsca/batf-services", category: "IFSCA", description: "BATF Service Provider registration in GIFT IFSC." },
                { title: "Aircraft Leasing IFSC", href: "/ifsca/aircraft-leasing", category: "IFSCA", description: "Aircraft leasing registration and compliance in GIFT IFSC." },
                { title: "PSP License IFSCA", href: "/regulatory/psp-license-ifsca", category: "IFSCA", description: "Payment System Provider license at GIFT IFSC." },
            ]}
            finalCtaTitle="Ready to Apply for IFSCA FinTech Authorization?"
            finalCtaDescription="Get expert assistance with your FinTech Entity authorization, sandbox application and incentive grant. Our team handles the complete process end-to-end."
        >
            {/* Section 1: Introduction */}
            <section>
                <h2 id="introduction">Introduction</h2>
                <p>
                    The International Financial Services Centres Authority (IFSCA) has established a comprehensive ecosystem for FinTech entities through its <strong>Framework for FinTech Entity in the IFSCs</strong> (Circular F.No. 521/IFSCA/FinTech/FE Framework/2022-23, dated April 27, 2022) and the <strong>IFSCA (FinTech Incentive) Scheme, 2022</strong> (Notification No. IFSCA/2021-22/GN/022, dated February 2, 2022).
                </p>
                <p>
                    Together, these frameworks position GIFT IFSC as a world-class FinTech hub by providing regulatory authorization pathways, sandbox testing environments, accelerator programs, and financial incentive grants of up to INR 75 Lakhs for eligible FinTech and TechFin entities from India and abroad.
                </p>
                <p>
                    <strong>📌 Key References:</strong> FE Framework — IFSCA Circular dated April 27, 2022 issued under the IFSCA Act, 2019. FinTech Incentive Scheme — Gazette Notification No. IFSCA/2021-22/GN/022, dated February 2, 2022, published in the Official Gazette on February 4, 2022.
                </p>
            </section>

            {/* Section 2: FinTech vs TechFin */}
            <section>
                <h2 id="fintech-vs-techfin">FinTech vs TechFin</h2>
                <p>
                    The FE Framework distinguishes between two categories of technology-driven entities that can seek authorization from IFSCA:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>FinTech</th>
                            <th>TechFin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Definition</strong></td>
                            <td>Financial technology solutions resulting in new business models, applications, processes or products in financial services regulated by IFSCA</td>
                            <td>Advanced/emerging technology solutions that aid and assist activities relating to financial products, services and financial institutions</td>
                        </tr>
                        <tr>
                            <td><strong>Focus</strong></td>
                            <td>Core financial services innovation</td>
                            <td>Technology enablement for financial sector</td>
                        </tr>
                        <tr>
                            <td><strong>Examples</strong></td>
                            <td>Digital lending, robo-advisory, InsurTech, RegTech, blockchain-based settlement, DeFi solutions</td>
                            <td>AI/ML for risk analytics, cloud infrastructure for banks, cybersecurity for financial institutions, data analytics platforms</td>
                        </tr>
                        <tr>
                            <td><strong>Authorization</strong></td>
                            <td>Same FE Framework applies</td>
                            <td>Same FE Framework applies</td>
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
                            <td><strong>FE Framework</strong></td>
                            <td>Circular F.No. 521/IFSCA/FinTech/FE Framework/2022-23, dated April 27, 2022</td>
                        </tr>
                        <tr>
                            <td><strong>FinTech Incentive Scheme</strong></td>
                            <td>IFSCA (FinTech Incentive) Scheme, 2022 — Notification No. IFSCA/2021-22/GN/022, dated February 2, 2022</td>
                        </tr>
                        <tr>
                            <td><strong>Fee Circular</strong></td>
                            <td>Fee Structure Circular dated April 8, 2025 — prescribes fees for FE authorization and grants</td>
                        </tr>
                        <tr>
                            <td><strong>Unified Regulator</strong></td>
                            <td>IFSCA exercises powers of RBI, SEBI, IRDAI and PFRDA for IFSC activities</td>
                        </tr>
                        <tr>
                            <td><strong>Application Portal</strong></td>
                            <td>SWIT Portal (online) / fe-sandbox@ifsca.gov.in (email)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 4: Authorization (Direct Entry) */}
            <section>
                <h2 id="authorization">Authorization (Direct Entry)</h2>
                <p>
                    Mature FinTech and TechFin firms with a working product and revenue track record can apply for <strong>direct Authorization</strong> without entering the Sandbox. This pathway enables immediate market access in GIFT IFSC.
                </p>

                <h3>Eligibility for Applicant</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant Type</th>
                            <th>Eligibility Criteria</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Indian Applicant</strong></td>
                            <td>
                                ◆ DPIIT-registered startup related to FinTech; or<br />
                                ◆ Company under Companies Act 2013 or LLP under LLP Act 2008; or<br />
                                ◆ Branch of Indian company/LLP in IFSC; or<br />
                                ◆ Entity in ecosystem regulated by RBI/SEBI/IRDAI/PFRDA
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Foreign Applicant</strong></td>
                            <td>Entity from FATF-compliant jurisdictions (not on FATF &quot;High-Risk&quot; blacklist)</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Mandatory Requirements</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        <strong>1.</strong> Use technology in core product/service, business model, distribution model or methodology<br />
                        <strong>2.</strong> Have a deployable solution / working product<br />
                        <strong>3.</strong> Revenue earning track record in at least 1 of the last 3 financial years
                    </p>
                </div>

                <h3>Post-Authorization Setup</h3>
                <p>Upon Authorization, the applicant must establish presence in GIFT IFSC within <strong>120 days</strong> by:</p>
                <ul>
                    <li>Newly incorporating a company/LLP in IFSC; or</li>
                    <li>Setting up a subsidiary of an Indian or foreign entity in IFSC; or</li>
                    <li>Establishing a branch of an Indian or foreign entity in IFSC</li>
                </ul>
            </section>

            {/* Section 5: Sandbox Overview */}
            <section>
                <h2 id="sandbox-overview">Sandbox Overview</h2>
                <p>
                    The FE Framework provides <strong>Limited Use Authorization</strong> for entities to test FinTech ideas through various sandbox environments. Unlike direct Authorization, sandbox entry does <strong>not</strong> require:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        <strong>No requirement to:</strong><br />
                        ◆ Set up office at GIFT IFSC (unless bank account is needed)<br />
                        ◆ Have a deployable solution / working product<br />
                        ◆ Have revenue earning track record
                    </p>
                </div>

                <h3>Four Types of Sandbox</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Sandbox Type</th>
                            <th>Description</th>
                            <th>Key Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>IFSCA FinTech Regulatory Sandbox (FRS)</strong></td>
                            <td>Test FinTech ideas in a live environment with real customers/investors</td>
                            <td>Live testing, regulatory exemptions possible</td>
                        </tr>
                        <tr>
                            <td><strong>IFSCA FinTech Innovation Sandbox (FIS)</strong></td>
                            <td>Develop and test ideas in isolation from live market using simulated data</td>
                            <td>No live customers, safe testing environment</td>
                        </tr>
                        <tr>
                            <td><strong>Inter-Operable Regulatory Sandbox (IoRS)</strong></td>
                            <td>For hybrid products spanning multiple regulators (RBI, SEBI, IRDAI, PFRDA, IFSCA)</td>
                            <td>Foreign FinTechs seeking India entry via IFSCA as principal regulator</td>
                        </tr>
                        <tr>
                            <td><strong>Overseas Regulatory Referral</strong></td>
                            <td>Co-operation mechanism between IFSCA and overseas regulators under MoU/FinTech Bridges</td>
                            <td>Cross-border regulatory facilitation</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 6: Regulatory Sandbox */}
            <section>
                <h2 id="regulatory-sandbox">FinTech Regulatory Sandbox (FRS)</h2>
                <p>
                    The FRS allows applicants to test their FinTech solutions in a <strong>live environment</strong> with real customers and investors under a Limited Use Authorization.
                </p>

                <h3>Eligibility Criteria for Proposed Solution</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Genuineness of Innovation</strong></td>
                            <td>Must add significant value to existing financial service offerings regulated by IFSCA</td>
                        </tr>
                        <tr>
                            <td><strong>Genuine Need to Test</strong></td>
                            <td>Must demonstrate need for live testing; solution cannot be developed without regulatory relaxation</td>
                        </tr>
                        <tr>
                            <td><strong>Limited Prior Testing</strong></td>
                            <td>Limited offline testing should have been carried out before sandbox application</td>
                        </tr>
                        <tr>
                            <td><strong>Direct Benefits</strong></td>
                            <td>Must offer identifiable benefits to customers/investors or the financial sector at large</td>
                        </tr>
                        <tr>
                            <td><strong>No Systemic Risk</strong></td>
                            <td>Proper risk management strategy with safeguards to mitigate potential risks</td>
                        </tr>
                        <tr>
                            <td><strong>Testing Readiness</strong></td>
                            <td>Well-developed testing plans with clear objectives, parameters and success criteria</td>
                        </tr>
                        <tr>
                            <td><strong>Post-Testing Deployment</strong></td>
                            <td>Must demonstrate intention and ability to deploy on broader scale with exit/transition strategy</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Sandbox Timeline</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Duration</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Screening</strong></td>
                            <td>30 working days</td>
                            <td>IFSCA informs applicant of suitability from complete application submission</td>
                        </tr>
                        <tr>
                            <td><strong>Deficiency Rectification</strong></td>
                            <td>30 days</td>
                            <td>Time to rectify deficiencies if application is incomplete</td>
                        </tr>
                        <tr>
                            <td><strong>Testing Period</strong></td>
                            <td>Max 12 months</td>
                            <td>May be extended by 6 months on FE request</td>
                        </tr>
                        <tr>
                            <td><strong>Final Report</strong></td>
                            <td>30 days post-testing</td>
                            <td>Submit key outcomes, incident reports, learnings</td>
                        </tr>
                        <tr>
                            <td><strong>Record Retention</strong></td>
                            <td>5 years</td>
                            <td>From date of completion/exit from sandbox</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Regulatory Exemptions</h3>
                <p>
                    IFSCA may grant exemptions from certain regulatory requirements during sandbox testing. However, <strong>no exemptions</strong> will be granted from:
                </p>
                <ul>
                    <li>Customer/investor protection requirements</li>
                    <li>Know-Your-Customer (KYC) requirements</li>
                    <li>Anti-Money Laundering (AML) rules</li>
                </ul>
            </section>

            {/* Section 7: Innovation Sandbox */}
            <section>
                <h2 id="innovation-sandbox">FinTech Innovation Sandbox (FIS)</h2>
                <p>
                    The Innovation Sandbox provides a <strong>testing environment isolated from the live market</strong>. FinTech firms can test solutions using market-related data made available by regulated entities in IFSC, without exposure to real customers.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        <strong>Key Differences from FRS:</strong><br />
                        ◆ No live customers/investors involved<br />
                        ◆ No regulatory exemptions needed (no live regulatory compliance)<br />
                        ◆ No direct user obligations<br />
                        ◆ Successful exit qualifies for entry to Regulatory Sandbox
                    </p>
                </div>
                <p>
                    The eligibility, application and screening process from the Regulatory Sandbox applies <em>mutatis mutandis</em> except for clauses dealing with regulatory exemptions and user obligations.
                </p>
            </section>

            {/* Section 8: IoRS */}
            <section>
                <h2 id="iors">Inter-Operable Regulatory Sandbox (IoRS)</h2>
                <p>
                    The IoRS is a collaborative sandbox for <strong>innovative hybrid financial products/services</strong> that fall within the regulatory ambit of more than one domestic financial sector regulator. Under this framework:
                </p>
                <ul>
                    <li><strong>Foreign FinTechs</strong> seeking access to the domestic Indian market are considered for IoRS with IFSCA as the <strong>Principal Regulator</strong></li>
                    <li>IoRS combines the sandbox frameworks of RBI, SEBI, IRDAI, PFRDA and IFSCA</li>
                    <li>Enables testing of cross-regulatory products (e.g., InsurTech products involving both IRDAI and SEBI compliance)</li>
                </ul>
            </section>

            {/* Section 9: Accelerator Framework */}
            <section>
                <h2 id="accelerator">Accelerator Framework</h2>
                <p>
                    An Accelerator under the FE Framework is an entity focused on supporting startups/growth-driven entities by conducting cohorts that identify eligible FinTechs and TechFins for IFSCA Sandbox or Authorization.
                </p>

                <h3>Accelerator Eligibility</h3>
                <p>In addition to the standard FE eligibility (Indian entity or FATF-compliant foreign entity), an Accelerator must meet <strong>at least 2</strong> of the following criteria:</p>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Criterion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Operated at least one cohort (physical, virtual or hybrid)</td></tr>
                        <tr><td>2</td><td>Experience raising funds — minimum cumulative INR 5 Crore for supported entities</td></tr>
                        <tr><td>3</td><td>Signed MoUs with international industry or academic partners</td></tr>
                        <tr><td>4</td><td>Recognized TBI by DST, or received grants from DST/MeitY/BIRAC/NITI Aayog or similar institutions</td></tr>
                        <tr><td>5</td><td>Incubated a minimum of 100 startups in any jurisdiction</td></tr>
                        <tr><td>6</td><td>Incubated a minimum of 10 FinTech startups in any jurisdiction</td></tr>
                        <tr><td>7</td><td>Assisted by Central/State Government or department/agency in India or FATF-compliant jurisdiction</td></tr>
                    </tbody>
                </table>

                <h3>Cohort Requirements</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Frequency</strong></td><td>Minimum 1 cohort per year</td></tr>
                        <tr><td><strong>Minimum Size</strong></td><td>10 FinTechs/TechFins per cohort</td></tr>
                        <tr><td><strong>Minimum Duration</strong></td><td>1 month</td></tr>
                        <tr><td><strong>Maximum Duration</strong></td><td>12 months</td></tr>
                        <tr><td><strong>Compliance</strong></td><td>Cohort participants must be from FATF-compliant jurisdictions with proper KYC/AML</td></tr>
                    </tbody>
                </table>

                <h3>Accelerator Grants</h3>
                <p>Accelerators authorized by IFSCA are eligible for:</p>
                <ul>
                    <li><strong>1 grant per year</strong> per focus area — for accelerators NOT based in IFSC</li>
                    <li><strong>3 grants per year</strong> per focus area — for accelerators based in IFSC</li>
                    <li>Grant amount: up to <strong>INR 10 Lakhs per cohort</strong></li>
                </ul>
            </section>

            {/* Section 10: Permissible Activities */}
            <section>
                <h2 id="permissible-activities">Permissible Activities</h2>
                <p>
                    The FE Framework provides an illustrative (non-exhaustive) list of permissible FinTech and TechFin activities:
                </p>

                <h3>FinTech Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                    {[
                        "Digital Lending / Alternative Credit",
                        "Robo-Advisory / Wealth Management",
                        "InsurTech Solutions",
                        "RegTech / Compliance Automation",
                        "Blockchain / DLT-based Settlement",
                        "Digital Payments & Remittances",
                        "Crowdfunding / P2P Platforms",
                        "DeFi / Decentralized Finance",
                        "Neo-Banking Solutions",
                        "Trade Finance Technology",
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
                            <span className="text-blue-600 font-bold text-sm">◆</span>
                            <span className="text-sm text-gray-700">{item}</span>
                        </div>
                    ))}
                </div>

                <h3>TechFin Activities (Allied Areas)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                    {[
                        "AI/ML for Risk Analytics",
                        "Cloud Infrastructure for Financial Services",
                        "Cybersecurity for Financial Institutions",
                        "Data Analytics & Big Data Platforms",
                        "KYC/AML Technology Solutions",
                        "API Banking & Open Finance",
                        "Quantum Computing for Finance",
                        "IoT for Insurance & Supply Chain Finance",
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                            <span className="text-green-600 font-bold text-sm">◆</span>
                            <span className="text-sm text-gray-700">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 11: Incentive Scheme */}
            <section>
                <h2 id="incentive-scheme">FinTech Incentive Scheme</h2>
                <p>
                    The <strong>IFSCA (FinTech Incentive) Scheme, 2022</strong> provides financial support in the form of specific grants to promote the establishment of a world-class FinTech hub at GIFT IFSC. The scheme was notified via Gazette Notification dated February 4, 2022.
                </p>

                <h3>Who is Eligible for Grants?</h3>
                <p>Grants are available to eligible FinTech Entities (FEs) who:</p>
                <ul>
                    <li>Are part of IFSCA&apos;s Regulatory or Innovation Sandbox</li>
                    <li>Are referred to IFSCA under a FinTech bridge arrangement with a counterpart regulator</li>
                    <li>Have participated or are participating in IFSCA-supported Accelerators/Cohorts/Special Programs</li>
                    <li>Are referred to IFSCA by entities having MoU or collaboration with it</li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        <strong>Exclusion:</strong> Entities that have received any grant from Central or State Government schemes for the same project scope and activities are <strong>not eligible</strong> to apply under this Scheme. However, prior participation in IFSCA FinTech events is not treated as a grant.
                    </p>
                </div>
            </section>

            {/* Section 12: Grant Details */}
            <section>
                <h2 id="grant-details">Grant Categories & Amounts</h2>
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Grant Category</th>
                            <th>Description</th>
                            <th>Max Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1</strong></td>
                            <td><strong>FinTech Start-up Grant</strong></td>
                            <td>For developing a product/service and go-to-market initiatives for a startup with a novel FinTech idea. Covers product development, manpower, IT costs.</td>
                            <td><strong>INR 15 Lakhs</strong></td>
                        </tr>
                        <tr>
                            <td><strong>2</strong></td>
                            <td><strong>Proof of Concept (PoC) Grant</strong></td>
                            <td>For conducting a PoC by an early or mature FE in domestic or overseas markets. Covers manpower and operational costs.</td>
                            <td><strong>INR 50 Lakhs</strong></td>
                        </tr>
                        <tr>
                            <td><strong>3</strong></td>
                            <td><strong>Sandbox Grant</strong></td>
                            <td>For FEs selected under IFSCA Sandbox (Limited Use Authorization) to experiment with innovative products/services. Covers development and testing costs.</td>
                            <td><strong>INR 30 Lakhs</strong></td>
                        </tr>
                        <tr>
                            <td><strong>4</strong></td>
                            <td><strong>Green FinTech Grant</strong></td>
                            <td>For developing solutions facilitating sustainable finance and ESG investments. Highest grant amount reflecting IFSCA&apos;s commitment to green finance.</td>
                            <td><strong>INR 75 Lakhs</strong></td>
                        </tr>
                        <tr>
                            <td><strong>5</strong></td>
                            <td><strong>Accelerator Grant</strong></td>
                            <td>For supporting accelerators/cohorts at GIFT IFSC — capacity building, mentors, investors, PoCs, tie-ups.</td>
                            <td><strong>INR 10 Lakhs/cohort</strong></td>
                        </tr>
                        <tr>
                            <td><strong>6</strong></td>
                            <td><strong>Listing Support Grant</strong></td>
                            <td>For domestic FEs aspiring to list on IFSCA-recognized stock exchanges. Covers road shows, international travel, listing requirements.</td>
                            <td><strong>INR 15 Lakhs</strong></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 13: Grant Conditions */}
            <section>
                <h2 id="grant-conditions">Grant Conditions & Disbursement</h2>

                <h3>Conditions for Grant Sanction</h3>
                <ul>
                    <li>The FE or its project team must <strong>operate from IFSC</strong> during the sandbox or accelerator period</li>
                    <li>On successful completion, the FE must <strong>incorporate an entity in IFSC</strong></li>
                    <li>The FE must not implement a successful solution using the grant <strong>outside of the IFSCA regulatory framework</strong></li>
                    <li>If the FE fails to meet conditions, it must <strong>return the grant with simple interest at 8% per annum</strong></li>
                </ul>

                <h3>Disbursement Mechanism</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
                    <p className="text-sm text-gray-700 mb-0">
                        ◆ Grant disbursement is <strong>linked to milestones</strong> set for the FE<br />
                        ◆ The Evaluation Committee determines milestones during sanction<br />
                        ◆ Advance payments under the scheme are considered <strong>only under exceptional circumstances</strong><br />
                        ◆ Application fee for all grant types: <strong>USD 100</strong> (Indian and foreign applicants)
                    </p>
                </div>

                <h3>Application Process for Grants</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Grant Type</th>
                            <th>Submission</th>
                            <th>Email</th>
                            <th>Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>All grants (except Accelerator)</td>
                            <td>Application Form</td>
                            <td>fe-incentive@ifsca.gov.in</td>
                            <td>USD 100</td>
                        </tr>
                        <tr>
                            <td>Accelerator Grant</td>
                            <td>Accelerator Form</td>
                            <td>fe-incentive@ifsca.gov.in</td>
                            <td>USD 100</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 14: Fee Structure */}
            <section>
                <h2 id="fees-structure">Fee Structure</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Application Type</th>
                            <th>Email for Queries</th>
                            <th>Application Portal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Limited Use Authorization (Sandbox)</strong></td>
                            <td>fe-sandbox@ifsca.gov.in</td>
                            <td>SWIT Portal</td>
                        </tr>
                        <tr>
                            <td><strong>Authorization (Direct Entry)</strong></td>
                            <td>fe-sandbox@ifsca.gov.in</td>
                            <td>SWIT Portal</td>
                        </tr>
                        <tr>
                            <td><strong>Grant Applications</strong></td>
                            <td>fe-incentive@ifsca.gov.in</td>
                            <td>Application Form via email</td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-sm text-gray-500 mt-2">
                    * Fee details as per IFSCA Circular &quot;Fee structure for entities undertaking or intending to undertake permissible activities in IFSC or seeking guidance under the Informal Guidance Scheme&quot; dated April 8, 2025.
                </p>
            </section>

            {/* Section 15: Office Setup & Currency */}
            <section>
                <h2 id="office-setup">Office Setup & Currency</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Limited Use Authorization (Sandbox)</th>
                            <th>Authorization (Direct Entry)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Office Requirement</strong></td>
                            <td>Not required during sandbox period (unless bank account is needed in IFSC)</td>
                            <td>Must establish office in GIFT IFSC within 120 days of authorization</td>
                        </tr>
                        <tr>
                            <td><strong>Entity Structure</strong></td>
                            <td>Not required during sandbox</td>
                            <td>New company/LLP, subsidiary, or branch in IFSC</td>
                        </tr>
                        <tr>
                            <td><strong>Transaction Currency</strong></td>
                            <td>Freely convertible foreign currency</td>
                            <td>Freely convertible foreign currency only</td>
                        </tr>
                        <tr>
                            <td><strong>Administrative Expenses</strong></td>
                            <td>May use INR via SNRR account</td>
                            <td>May defray in INR via SNRR account</td>
                        </tr>
                        <tr>
                            <td><strong>Books of Accounts</strong></td>
                            <td>In declared foreign currency</td>
                            <td>In freely convertible foreign currency (not INR)</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Specified Foreign Currencies</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
                    {["USD", "EUR", "JPY", "GBP", "CAD", "AUD", "CHF", "HKD", "SGD", "AED", "RUB"].map((c, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-center text-sm font-semibold text-gray-700 border border-gray-200">
                            {c}
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 16: Compliance & Reporting */}
            <section>
                <h2 id="compliance">Compliance & Reporting</h2>
                <h3>Authorized FinTech Entities must:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Timeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Audited annual financial statements (certified copy)</td>
                            <td>Within 30 days of finalization</td>
                        </tr>
                        <tr>
                            <td>Details of regulatory action (if any)</td>
                            <td>Within 15 days of receipt of notice</td>
                        </tr>
                        <tr>
                            <td>Financial information to IFSCA</td>
                            <td>In US Dollar, unless otherwise specified</td>
                        </tr>
                        <tr>
                            <td>Appoint authorized representative</td>
                            <td>At all times — for representing FE before IFSCA</td>
                        </tr>
                        <tr>
                            <td>Security Assessment Report (VAPT Certificate)</td>
                            <td>From CERT-In empanelled auditor (Indian) or equivalent (foreign)</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Sandbox Entities (During Testing)</h3>
                <ul>
                    <li>Submit KPIs, milestones and statistical information as required</li>
                    <li>Report fraud/operational incidents and actions taken</li>
                    <li>Submit final report within 30 days of testing period expiry</li>
                    <li>Maintain test records for 5 years post-completion</li>
                    <li>Get prior approval from IFSCA for any material changes to solution</li>
                    <li>Disclose risks to users and obtain their acknowledgement</li>
                </ul>
            </section>

            {/* Section 17: Tax Benefits */}
            <section>
                <h2 id="tax-benefits">Tax Benefits at GIFT IFSC</h2>
                <p>FinTech Entities operating from GIFT IFSC enjoy significant tax advantages:</p>
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
                            <td>100% tax exemption on profits for any 10 consecutive years out of 15 years (Section 80LA)</td>
                        </tr>
                        <tr>
                            <td><strong>Capital Gains</strong></td>
                            <td>Exemption from capital gains tax on certain transactions</td>
                        </tr>
                        <tr>
                            <td><strong>GST</strong></td>
                            <td>Zero-rated supply for services provided from IFSC to outside India</td>
                        </tr>
                        <tr>
                            <td><strong>Dividend Withholding</strong></td>
                            <td>Beneficial rate of 10% under Section 115A read with Section 80LA for non-residents</td>
                        </tr>
                        <tr>
                            <td><strong>FOREX Controls</strong></td>
                            <td>IFSC treated as &quot;deemed foreign territory&quot; — domestic capital controls not applicable</td>
                        </tr>
                        <tr>
                            <td><strong>STT/CTT</strong></td>
                            <td>No Securities Transaction Tax or Commodities Transaction Tax</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Section 18: Current Status */}
            <section>
                <h2 id="current-status">Current Status</h2>
                <p>
                    As of December 31, 2025 (IFSCA Bulletin Q3 FY 2025-26):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    {[
                        { label: "Total IFSCA Registrations", value: "1,100+", sub: "As of Dec 2025" },
                        { label: "Sandbox Entities", value: "7", sub: "Currently active" },
                        { label: "Cumulative Sandbox Exits", value: "43", sub: "Successfully exited" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 text-center">
                            <div className="text-2xl font-black text-[#0096D6]">{stat.value}</div>
                            <div className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{stat.sub}</div>
                        </div>
                    ))}
                </div>
                <p>
                    Growth in registrations/authorizations accelerated during FY 2025-26, increasing from 1,034 in September 2025 to 1,100 in December 2025, reflecting continued expansion of the GIFT IFSC ecosystem. IFSCA has been actively participating in global FinTech events including the Global FinTech Festival 2025 and Singapore FinTech Festival 2025.
                </p>
            </section>

            {/* Section 19: Key Advantages */}
            <section>
                <h2 id="advantages">Key Advantages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    {[
                        { icon: "🌐", title: "Global Market Access", desc: "Launch pad for domestic FinTechs to go global; landing pad for foreign FinTechs to explore India" },
                        { icon: "💰", title: "Financial Grants", desc: "Up to INR 75 Lakhs in grants across 6 categories — startup, PoC, sandbox, green, accelerator, listing" },
                        { icon: "🧪", title: "Multiple Sandbox Options", desc: "4 sandbox types — Regulatory, Innovation, IoRS and Overseas Referral — for different stages of development" },
                        { icon: "📋", title: "Unified Regulator", desc: "IFSCA as single-window regulator with powers of RBI, SEBI, IRDAI and PFRDA — simplified compliance" },
                        { icon: "🏢", title: "Flexible Setup", desc: "No office requirement during sandbox; company, LLP, subsidiary or branch options for authorization" },
                        { icon: "💵", title: "Full Currency Freedom", desc: "Transactions in 11 specified foreign currencies; IFSC treated as deemed foreign territory" },
                        { icon: "📊", title: "Tax Benefits", desc: "100% tax holiday for 10/15 years, zero GST, no STT/CTT, beneficial withholding rates" },
                        { icon: "🤝", title: "Ecosystem Support", desc: "Accelerator programs, cohorts, FinTech bridges with overseas regulators, IFSCA-supported events" },
                    ].map((adv, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">{adv.icon}</div>
                            <div className="font-bold text-gray-900 text-sm mb-1">{adv.title}</div>
                            <div className="text-xs text-gray-600 leading-relaxed">{adv.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 20: FAQs */}
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
