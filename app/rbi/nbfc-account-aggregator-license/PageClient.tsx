"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "what-is", title: "2. What is NBFC Account Aggregator License" },
        { id: "regulatory-framework", title: "3. Regulatory Framework" },
        { id: "who-needs", title: "4. Who Needs This License" },
        { id: "eligibility", title: "5. Eligibility Criteria" },
        { id: "documents", title: "6. Documents Required" },
        { id: "process", title: "7. Registration Process" },
        { id: "fees", title: "8. Fees Structure" },
        { id: "timeline", title: "9. Timeline" },
        { id: "compliance", title: "10. Compliance Requirements" },
        { id: "faq", title: "11. FAQs" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "RBI" },
        { label: "Entity Type", value: "NBFC-AA" },
        { label: "Min Net Worth", value: "Rs. 2 Crore" },
        { label: "Governing Law", value: "RBI Act, 1934" },
        { label: "Timeline", value: "6-9 months" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "🔗", label: "Account Aggregator" }, { emoji: "📋", label: "Complete Guide" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "NBFC Account Aggregator License" }]}
            title="NBFC Account Aggregator License: Complete RBI Registration Guide with Eligibility, Process & Compliance (2026)"
            readTime="15 min read"
            focusKeyword="NBFC Account Aggregator License"
            sections={sections}
            ctaTitle="Need NBFC Account Aggregator License?"
            ctaDescription="Expert RBI guidance for NBFC-AA registration, eligibility assessment, and compliance setup."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-business-plan", category: "RBI Services", title: "NBFC Business Plan", description: "Complete guide to NBFC business plan preparation for RBI approval." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide for GIFT City." },
                { href: "/rbi/lendtech-services", category: "RBI Services", title: "LendTech Services", description: "RBI guidelines for lending technology companies." }
            ]}
            finalCtaTitle="Ready to get your NBFC Account Aggregator License?"
            finalCtaDescription="Book a consultation to evaluate your eligibility, prepare documentation, and navigate the RBI registration process end-to-end."
        >
            <h2 id="introduction">Introduction</h2>
            <p>NBFC Account Aggregator License is a specialised registration granted by the Reserve Bank of India (RBI) to entities that provide financial data aggregation services on a consent-based framework. From a regulatory standpoint, the Account Aggregator (AA) ecosystem is one of the most transformative financial infrastructure initiatives in India, enabling seamless and secure sharing of financial data between regulated entities.</p>
            <p>In today&apos;s data-driven financial ecosystem, the NBFC Account Aggregator framework allows individuals and businesses to share their financial information — held across banks, insurance companies, pension funds, and tax platforms — in a structured, consent-based, and digitally verifiable manner. The framework is governed entirely by the Reserve Bank of India and is built on the Data Empowerment and Protection Architecture (DEPA) model.</p>
            <div className="info-box">
                <h4>Key Insight</h4>
                <p>An NBFC Account Aggregator does not access, store, or analyse customer data — it merely facilitates consent-based transfer of data from a Financial Information Provider (FIP) to a Financial Information User (FIU) in encrypted form.</p>
            </div>

            <h2 id="what-is">What is NBFC Account Aggregator License</h2>
            <p>In simple terms, an NBFC Account Aggregator (NBFC-AA) is a non-banking financial company that acts as a consent manager for financial data. It operates as a technology-neutral intermediary between Financial Information Providers (FIPs) and Financial Information Users (FIUs).</p>
            <p>From a compliance standpoint, the NBFC-AA does not undertake any financial activity itself — it is purely a data flow facilitator operating under strict RBI-mandated consent architecture. Legally speaking, it is governed under the Master Direction – Non-Banking Financial Company – Account Aggregator (Reserve Bank) Directions, 2016 (as amended).</p>
            <h3>Core Functions of an NBFC-AA</h3>
            <ul>
                <li>Obtaining, submitting, and managing customer consent for financial data sharing</li>
                <li>Facilitating encrypted data transfer from FIP to FIU on behalf of the customer</li>
                <li>Providing a consent artefact management system</li>
                <li>Ensuring data flows only in encrypted, standardised formats</li>
                <li>Maintaining complete audit trails of all consent and data exchange activities</li>
            </ul>
            <h3>What NBFC-AA Cannot Do</h3>
            <ul>
                <li>Store, read, or process the underlying financial data</li>
                <li>Use customer data for its own commercial purposes</li>
                <li>Share data without explicit and revocable customer consent</li>
                <li>Undertake lending, investment, or any other financial activity</li>
            </ul>

            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <p>Legally speaking, the NBFC Account Aggregator framework operates under a robust multi-regulator structure. The primary regulations include:</p>
            <ul>
                <li>Reserve Bank of India Act, 1934 (Section 45-IA)</li>
                <li>Master Direction – Non-Banking Financial Company – Account Aggregator (Reserve Bank) Directions, 2016</li>
                <li>RBI&apos;s Data Localisation and Technology Risk Management Guidelines</li>
                <li>Account Aggregator Framework (DEPA) — co-regulated by RBI, SEBI, IRDAI, and PFRDA</li>
                <li>Information Technology Act, 2000 and related data privacy norms</li>
            </ul>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Regulator</th>
                            <th>Role in AA Ecosystem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RBI</td>
                            <td>Primary regulator — licenses and supervises NBFC-AA</td>
                        </tr>
                        <tr>
                            <td>SEBI</td>
                            <td>Co-regulates FIPs and FIUs from the securities domain</td>
                        </tr>
                        <tr>
                            <td>IRDAI</td>
                            <td>Co-regulates insurance-related data flows within AA framework</td>
                        </tr>
                        <tr>
                            <td>PFRDA</td>
                            <td>Covers pension fund data in the AA ecosystem</td>
                        </tr>
                        <tr>
                            <td>MeitY</td>
                            <td>Oversees technology standards and data protection aspects</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>As per applicable regulatory provisions, the AA ecosystem is built on the principle of consent-first data sharing, where no data moves without the explicit, informed, and revocable consent of the customer.</p>

            <h2 id="who-needs">Who Needs This License</h2>
            <p>An NBFC Account Aggregator License becomes necessary for the following entities:</p>
            <ul>
                <li>Technology companies planning to build financial data aggregation platforms</li>
                <li>Fintech startups looking to facilitate data-driven lending or wealth management</li>
                <li>Banks and financial institutions setting up standalone AA subsidiaries</li>
                <li>Entities building credit underwriting solutions based on financial data</li>
                <li>Digital lending platforms requiring bank statement analysis via consent</li>
                <li>Personal finance management (PFM) application developers</li>
                <li>Open banking solution providers operating in India</li>
            </ul>
            <div className="warning-box">
                <h4>⚠️ Important Regulatory Note</h4>
                <p>Any entity aggregating or facilitating transfer of financial data between regulated financial entities in India — without an NBFC-AA license — may be in violation of RBI directions and could face regulatory action.</p>
            </div>

            <h2 id="eligibility">Eligibility Criteria</h2>
            <p>As per the Master Direction – NBFC-AA (RBI) Directions, 2016, the following eligibility conditions must be met to obtain an NBFC Account Aggregator License:</p>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Entity Type</td>
                            <td>Company registered under the Companies Act, 2013</td>
                        </tr>
                        <tr>
                            <td>Minimum Net Owned Fund (NOF)</td>
                            <td>Rs. 2 Crore at the time of application</td>
                        </tr>
                        <tr>
                            <td>Principal Business</td>
                            <td>Must be exclusively Account Aggregation — no other NBFC activities</td>
                        </tr>
                        <tr>
                            <td>Director Fit &amp; Proper</td>
                            <td>All directors must meet RBI&apos;s Fit &amp; Proper Criteria</td>
                        </tr>
                        <tr>
                            <td>Technology Capability</td>
                            <td>Must demonstrate robust consent management and data security infrastructure</td>
                        </tr>
                        <tr>
                            <td>Data Privacy Framework</td>
                            <td>Must have a documented data privacy and security policy</td>
                        </tr>
                        <tr>
                            <td>No FIP/FIU Activity</td>
                            <td>NBFC-AA cannot simultaneously act as a FIP or FIU</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>From a practical compliance perspective, RBI also evaluates the technical architecture, security infrastructure, and data handling protocols of the applicant entity before granting the Certificate of Registration (CoR).</p>

            <h2 id="documents">Documents Required</h2>
            <p>The following documents are required for obtaining the NBFC Account Aggregator License from RBI:</p>
            <h3>Entity &amp; Incorporation Documents</h3>
            <ul>
                <li>Certificate of Incorporation issued by ROC</li>
                <li>Memorandum of Association (MOA) with AA as the principal object</li>
                <li>Articles of Association (AOA)</li>
                <li>PAN of the company</li>
                <li>GST Registration (if applicable)</li>
            </ul>
            <h3>Financial Documents</h3>
            <ul>
                <li>Net Worth Certificate certified by a Chartered Accountant</li>
                <li>Audited Financial Statements (if applicable)</li>
                <li>Bank statements confirming availability of Net Owned Funds</li>
                <li>Source of funds declaration for capital infusion</li>
            </ul>
            <h3>Directors &amp; Promoters Documents</h3>
            <ul>
                <li>KYC documents (PAN, Aadhaar, Passport) of all directors and promoters</li>
                <li>Detailed profiles of all directors including experience and qualifications</li>
                <li>Declaration of Fit &amp; Proper status by each director</li>
                <li>CIBIL/credit report of promoters (if required)</li>
                <li>Board Resolution authorising NBFC-AA registration application</li>
            </ul>
            <h3>Business &amp; Technology Documents</h3>
            <ul>
                <li>Detailed Business Plan for Account Aggregator operations</li>
                <li>Technology Architecture document describing consent management framework</li>
                <li>Data Security and Privacy Policy</li>
                <li>IT Security and Cybersecurity Framework document</li>
                <li>Proposed operational workflows and consent journey flowchart</li>
                <li>API integration plan with FIPs and FIUs</li>
            </ul>
            <h3>Policy &amp; Compliance Documents</h3>
            <ul>
                <li>Customer Grievance Redressal Policy</li>
                <li>KYC/AML Compliance Policy</li>
                <li>Data Retention and Deletion Policy</li>
                <li>Internal Audit and Governance Framework</li>
            </ul>

            <h2 id="process">Registration Process</h2>
            <p>The NBFC Account Aggregator registration process involves multiple stages under RBI&apos;s evaluation framework. Below is a step-by-step overview:</p>
            <div className="step-timeline">
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 1</div>
                        <h4>Company Incorporation</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Incorporate a company under the Companies Act, 2013 with Account Aggregation as the principal object in the MOA. Ensure the company has no other NBFC activities.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 2</div>
                        <h4>Arrange Minimum Net Owned Funds</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Infuse a minimum of Rs. 2 Crore as Net Owned Fund from legitimate and traceable sources. Obtain Net Worth Certificate from a CA.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 3</div>
                        <h4>Prepare Business Plan &amp; Technology Framework</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Develop a comprehensive business plan, technology architecture document, data security framework, and all required policies for NBFC-AA operations.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 4</div>
                        <h4>Online Application on RBI COSMOS Portal</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">File the application for Certificate of Registration as an NBFC-AA on RBI&apos;s COSMOS portal with all supporting documents.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 5</div>
                        <h4>Physical Document Submission to RBI</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Submit physical copies of all application documents to the concerned RBI Regional Office, along with a covering letter and document checklist.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 6</div>
                        <h4>RBI Scrutiny &amp; Query Resolution</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">RBI reviews the application, conducts due diligence on promoters, and may raise clarification queries. Respond accurately and promptly to all queries.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 7</div>
                        <h4>In-Principle Approval</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Upon satisfactory review, RBI may grant In-Principle Approval for setting up NBFC-AA operations. The entity must then build and demonstrate its technology infrastructure.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 8</div>
                        <h4>Certificate of Registration (CoR)</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">After fulfilling all conditions of In-Principle Approval and demonstrating operational readiness, RBI issues the Certificate of Registration as NBFC-AA.</p>
                    </div>
                </div>
            </div>

            <h2 id="fees">Fees Structure</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Amount / Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RBI Application Fee</td>
                            <td>Nil — RBI does not charge an application fee</td>
                        </tr>
                        <tr>
                            <td>Minimum Net Owned Fund</td>
                            <td>Rs. 2 Crore (to be maintained as regulatory capital)</td>
                        </tr>
                        <tr>
                            <td>Professional Fees (Business Plan &amp; Documentation)</td>
                            <td>Based on scope and complexity of the application</td>
                        </tr>
                        <tr>
                            <td>Technology Infrastructure Setup</td>
                            <td>Variable — depends on consent management platform architecture</td>
                        </tr>
                        <tr>
                            <td>Legal &amp; Compliance Setup</td>
                            <td>Depends on policy drafting, legal structuring, and advisory support</td>
                        </tr>
                        <tr>
                            <td>Ongoing Annual Compliance</td>
                            <td>RBI returns, audits, and periodic compliance filings</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="timeline">Timeline</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Expected Timeframe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Company Incorporation</td>
                            <td>7–10 working days</td>
                        </tr>
                        <tr>
                            <td>Business Plan &amp; Document Preparation</td>
                            <td>15–30 days</td>
                        </tr>
                        <tr>
                            <td>RBI Application Filing</td>
                            <td>1–3 days</td>
                        </tr>
                        <tr>
                            <td>RBI Application Review &amp; Queries</td>
                            <td>2–4 months</td>
                        </tr>
                        <tr>
                            <td>In-Principle Approval</td>
                            <td>3–6 months from application</td>
                        </tr>
                        <tr>
                            <td>Technology Buildout &amp; Demonstration</td>
                            <td>3–6 months post In-Principle Approval</td>
                        </tr>
                        <tr>
                            <td>Final CoR Issuance</td>
                            <td>6–9 months (total timeline, subject to case specifics)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="info-box">
                <h4>Practical Note on Timeline</h4>
                <p>The timeline is heavily dependent on documentation quality, promoter background, and RBI workload. Strong applications with complete documentation and a credible technology framework can progress faster through the approval stages.</p>
            </div>

            <h2 id="compliance">Compliance Requirements</h2>
            <p>Post-registration, an NBFC-AA must adhere to extensive ongoing compliance requirements as mandated by RBI. From a compliance standpoint, these obligations are non-negotiable and require dedicated internal resources.</p>
            <h3>Ongoing RBI Filings &amp; Returns</h3>
            <ul>
                <li>Periodic returns filing on RBI&apos;s COSMOS/XBRL platform</li>
                <li>Annual audit report submission to RBI</li>
                <li>Quarterly compliance certificates by the Board</li>
                <li>Reporting of any material changes in promoters, directors, or business model</li>
            </ul>
            <h3>Technology &amp; Data Security Compliance</h3>
            <ul>
                <li>Maintaining ISO 27001 or equivalent information security certification</li>
                <li>Regular penetration testing and vulnerability assessments</li>
                <li>Compliance with RBI&apos;s IT Framework for NBFCs</li>
                <li>Data localisation requirements — all customer data must be stored in India</li>
                <li>Maintaining end-to-end encryption for all data transfers</li>
            </ul>
            <h3>Consent &amp; Customer Framework Compliance</h3>
            <ul>
                <li>Ensuring all data flows are strictly consent-based and auditable</li>
                <li>Maintaining consent artefact records for regulatory inspection</li>
                <li>Customer grievance redressal mechanism with defined TATs</li>
                <li>Enabling customers to view, pause, revoke, and manage their consents at any time</li>
            </ul>
            <h3>Governance &amp; Board Compliance</h3>
            <ul>
                <li>Board-level oversight of compliance, technology, and risk management</li>
                <li>Appointment of a dedicated Compliance Officer</li>
                <li>Internal audit function covering technology, consent management, and operations</li>
                <li>Annual review of all policies and frameworks</li>
            </ul>
            <div className="warning-box">
                <h4>⚠️ Compliance Risk Alert</h4>
                <p>Under applicable regulatory provisions, failure to maintain data security standards, consent framework integrity, or periodic RBI reporting obligations can lead to penalties, restrictions on operations, or cancellation of the NBFC-AA Certificate of Registration.</p>
            </div>

            <h2 id="faq">FAQs on NBFC Account Aggregator License</h2>
            <div className="space-y-3 my-6">
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>What is an NBFC Account Aggregator License?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">An NBFC Account Aggregator License is a Certificate of Registration (CoR) issued by the Reserve Bank of India to a company that wishes to operate as an Account Aggregator — a consent-based financial data sharing intermediary under the DEPA framework.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>What is the minimum capital requirement for NBFC-AA?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">As per RBI&apos;s Master Direction on NBFC-AA, the minimum Net Owned Fund (NOF) required is Rs. 2 Crore at the time of application. This must be maintained on an ongoing basis after registration.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>Can an NBFC-AA also operate as a lender or financial services provider?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">No. Under RBI&apos;s directions, an NBFC-AA can only undertake Account Aggregation as its principal business. It cannot simultaneously act as a lender, insurer, investment adviser, or any other financial service provider. It also cannot act as a Financial Information Provider (FIP) or Financial Information User (FIU).</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>Does an NBFC-AA store customer financial data?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">No. A fundamental principle of the Account Aggregator framework is that the NBFC-AA does not store, access, or read the customer&apos;s financial data. It only facilitates encrypted transfer of data from the Financial Information Provider to the Financial Information User based on customer consent.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>What is the difference between FIP, FIU, and AA in the ecosystem?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">A Financial Information Provider (FIP) holds customer financial data (e.g., banks, insurers, MF depositories). A Financial Information User (FIU) is an entity that requests customer data for a service (e.g., lenders for credit assessment). The Account Aggregator (AA) is the consent manager that enables the data flow between FIP and FIU with customer consent — without reading the data itself.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>How long does it take to get an NBFC-AA license?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">The total timeline from application to receiving the Certificate of Registration typically ranges from 6 to 9 months, subject to documentation quality, RBI scrutiny workload, and the applicant&apos;s responsiveness to queries. The process includes an In-Principle Approval stage followed by technology demonstration before the final CoR is issued.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>Is NBFC-AA regulated only by RBI?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">RBI is the primary regulator and licensor of NBFC-AAs. However, the broader Account Aggregator ecosystem is co-regulated, as SEBI, IRDAI, and PFRDA govern the respective FIPs and FIUs within their domains. The data privacy and IT security aspects are also influenced by MeitY guidelines.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>Can a fintech startup apply for an NBFC-AA license?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">Yes, fintech startups can apply for an NBFC-AA license provided they are incorporated as a company under the Companies Act 2013, have a minimum Net Owned Fund of Rs. 2 Crore, and can demonstrate a credible technology framework and governance structure to RBI&apos;s satisfaction.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>What is the Fit &amp; Proper criteria for NBFC-AA directors?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">RBI&apos;s Fit &amp; Proper criteria requires directors to have integrity, financial soundness, and relevant competence. Directors must not have criminal convictions, must be financially sound, and must declare compliance with the Fit &amp; Proper norms. RBI conducts background verification as part of the application process.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>What happens if an NBFC-AA violates data privacy or consent norms?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">Violation of data privacy norms, consent framework requirements, or RBI directions can lead to serious regulatory consequences including monetary penalties, operational restrictions, and in severe cases, cancellation of the Certificate of Registration. Compliance with data security and consent architecture is the cornerstone of NBFC-AA operations.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>Is there a fee for RBI NBFC-AA registration application?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">No, RBI does not charge an application fee for NBFC-AA registration. The primary cost is the regulatory capital requirement of Rs. 2 Crore (minimum NOF), along with professional fees for documentation, business plan preparation, and compliance setup.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>What is the DEPA framework and how is it related to NBFC-AA?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">DEPA (Data Empowerment and Protection Architecture) is India&apos;s policy framework for enabling individuals to control and share their personal data digitally. The Account Aggregator framework is the financial services implementation of DEPA, enabling consent-based financial data sharing. NBFC-AAs are the operational entities that implement and manage this framework in the financial sector.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>Can an existing NBFC convert into an NBFC-AA?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">Since an NBFC-AA must have Account Aggregation as its sole principal business, an existing NBFC that conducts lending or other financial activities cannot simply convert to NBFC-AA without ceasing those activities. A separate entity is typically recommended for NBFC-AA operations to maintain regulatory clarity.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>What technology standards must an NBFC-AA comply with?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">NBFC-AAs must comply with the technical standards prescribed by Sahamati (the AA ecosystem industry body) and RBI&apos;s IT framework for NBFCs. This includes end-to-end encryption, secure APIs, data localisation, consent artefact management, and regular security audits. ISO 27001 certification or equivalent is generally expected.</div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]"><span>How does customer consent work in the NBFC-AA framework?</span><span className="text-[#0096D6] shrink-0 ml-4">▼</span></summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">Customer consent in the NBFC-AA framework is granular, time-bound, purpose-specific, and fully revocable. A customer explicitly consents to share specific financial data (e.g., bank statements for 6 months) for a particular purpose (e.g., loan assessment) with a specific FIU. The consent artefact is cryptographically signed and maintained by the AA for audit purposes. The customer can view, pause, or revoke consent at any time.</div>
                </details>
            </div>
        </ServicePageLayout>
    );
}
