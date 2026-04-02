"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "legal-background", title: "Legal Background" },
        { id: "payment-services", title: "Payment Service Activities" },
        { id: "who-needs", title: "Who Needs PSP License" },
        { id: "exemptions", title: "Exempted Entities" },
        { id: "legal-form", title: "Legal Form & Entity Requirements" },
        { id: "capital-requirements", title: "Capital Requirements" },
        { id: "significant-psp", title: "Significant PSP (SPSP)" },
        { id: "authorisation-process", title: "Authorisation Process" },
        { id: "fees", title: "Application Fees & Security Deposit" },
        { id: "safeguarding", title: "Safeguarding of Customer Funds" },
        { id: "escrow-lifecycle", title: "Escrow & Safeguarding Lifecycle" },
        { id: "governance", title: "Governance & Risk Management" },
        { id: "aml-compliance", title: "AML, Compliance & Reporting" },
        { id: "grievance", title: "Grievance Redressal & Dispute Resolution" },
        { id: "third-party-risk", title: "Third-Party Risk Management" },
        { id: "compliance-calendar", title: "Ongoing Compliance Calendar" },
        { id: "document-checklist", title: "Document Checklist" },
        { id: "business-plan", title: "Business Plan Requirements" },
        { id: "revocation", title: "Revocation & Surrender" },
        { id: "comparison", title: "PSP License IFSCA vs RBI Payment Aggregator" },
        { id: "strategic-advice", title: "Strategic Structuring Advice" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is PSP License IFSCA?",
            a: "PSP License IFSCA is the authorisation granted by IFSCA to a company incorporated in IFSC to provide specified payment services under the Payment Services Regulations, 2024."
        },
        {
            q: "Is PSP License IFSCA mandatory for cross-border remittance?",
            a: "Yes. Any entity providing cross-border money transfer in or from IFSC must obtain PSP License IFSCA unless exempt."
        },
        {
            q: "Can an LLP apply for PSP License IFSCA?",
            a: "No. Only a company incorporated under the Companies Act with registered office in IFSC is eligible."
        },
        {
            q: "Is the authorisation perpetual?",
            a: "Yes. The authorisation remains valid unless revoked or surrendered."
        },
        {
            q: "What is the difference between PSP and PSO?",
            a: "PSP operates at front-end (wallet, remittance, merchant services), while PSO operates payment systems (clearing/settlement backend)."
        },
        {
            q: "What is minimum capital for Regular PSP?",
            a: "USD 100,000 at commencement. Must increase to USD 200,000 by the end of the third financial year."
        },
        {
            q: "What if PSP becomes Significant PSP?",
            a: "Net worth must reach USD 250,000 within 90 days of designation and USD 500,000 by third year."
        },
        {
            q: "Is escrow mandatory for PSP License IFSCA?",
            a: "Yes, for specified payment services under Schedule VI. Funds must be deposited by next business day after receipt."
        },
        {
            q: "Can PSP use escrow funds for working capital?",
            a: "No. Customer funds must be safeguarded and segregated at all times. No lending of customer funds is permitted."
        },
        {
            q: "Can wallet hold INR or cryptocurrency?",
            a: "No. E-wallets issued by a PSP cannot hold Indian Rupees or virtual digital assets such as cryptocurrencies."
        },
        {
            q: "Can PSP lend money or extend credit?",
            a: "No. Lending exposes credit risk and is prohibited. Buy-now-pay-later facility is also not permitted."
        },
        {
            q: "How long does PSP License IFSCA approval take?",
            a: "The Authority targets processing within 6 months. Operations must commence within 6 months from Certificate of Authorisation, with a one-time extension up to 3 months possible."
        },
        {
            q: "Can a foreign parent apply for PSP License IFSCA?",
            a: "Yes. A foreign parent company may apply to set up a subsidiary in IFSC for obtaining authorisation."
        },
        {
            q: "Is AML compliance mandatory from day one?",
            a: "Yes. PSPs are treated as regulated entities and must comply with IFSCA AML/CFT & KYC Guidelines and PMLA provisions."
        },
        {
            q: "How long must transaction records be preserved?",
            a: "Minimum 10 years as per regulatory requirements."
        },
        {
            q: "Can PSP operate outside IFSC?",
            a: "A PSP must have its place of business and registered office in IFSC. Any activity outside IFSC requires prior approval of the Authority."
        },
        {
            q: "Is security deposit compulsory?",
            a: "It is discretionary. IFSCA may require security deposit based on business model complexity, cross-border exposure, and transaction volumes."
        },
        {
            q: "Can PSP provide payment gateway only?",
            a: "Pure technical services without possession of funds are excluded from the payment services definition."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "\u{1F3DB}\uFE0F", label: "IFSCA" },
                { emoji: "\u{1F4B3}", label: "Payment Services" },
                { emoji: "\u2705", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IFSCA Services", href: "/ifsca" },
                { label: "PSP License", href: "/ifsca/psp-license" },
            ]}
            title="PSP License IFSCA: Payment Service Provider Authorisation in GIFT IFSC"
            readTime="22 min read"
            focusKeyword="PSP License IFSCA"
            sections={sections}
            ctaTitle="PSP License IFSCA"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for PSP License IFSCA authorisation — from application to ongoing compliance in GIFT IFSC."
            quickFacts={[
                { label: "Regulator", value: "IFSCA" },
                { label: "Location", value: "GIFT IFSC, Gujarat" },
                { label: "Regulation Year", value: "2024" },
                { label: "Entity Type", value: "Company (Registered in IFSC)" },
                { label: "Min. Capital (Regular)", value: "USD 100,000" },
                { label: "Min. Capital (SPSP)", value: "USD 250,000" },
                { label: "Currency", value: "Specified Foreign Currency" },
                { label: "Approval Timeline", value: "~6 months" },
            ]}
            relatedArticles={[
                { title: "Finance Company GIFT IFSC", href: "/ifsca/finance-company", category: "IFSCA", description: "Finance Company and Finance Unit registration in GIFT IFSC." },
                { title: "FinTech Entity IFSC", href: "/ifsca/fintech-entity", category: "IFSCA", description: "FinTech Entity authorisation, sandbox and incentive grants in GIFT IFSC." },
                { title: "ITFS Platform IFSC", href: "/ifsca/itfs-platform", category: "IFSCA", description: "International Trade Finance Services Platform registration in GIFT IFSC." },
                { title: "IFSCA Factoring License", href: "/ifsca/factoring-license", category: "IFSCA", description: "Factoring license registration in GIFT City under IFSCA Regulations." },
            ]}
            finalCtaTitle="Ready to Apply for PSP License in GIFT IFSC?"
            finalCtaDescription="Get expert assistance with your IFSCA PSP License authorisation. Our team handles the complete process from pre-consultation to ongoing compliance."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    PSP License IFSCA is the regulatory authorisation granted by the International Financial Services Centres Authority (IFSCA) to a company intending to provide payment services in or from an IFSC such as GIFT City. With the introduction of the <strong>IFSCA (Payment Services) Regulations, 2024</strong> and the <strong>IFSCA (Payment and Settlement Systems) Regulations, 2024</strong>, the regulatory framework for payment businesses in IFSC has been clearly separated between:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Payment Service Providers (PSPs)</strong></td>
                            <td>Front-end service providers offering wallets, remittance, merchant aggregation, escrow services</td>
                        </tr>
                        <tr>
                            <td><strong>Payment System Operators (PSOs)</strong></td>
                            <td>Back-end infrastructure operators managing clearing and settlement systems</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Important:</strong> If you intend to offer wallet services, cross-border remittance, merchant aggregation, or escrow services in IFSC, obtaining a PSP License IFSCA is mandatory.
                </div>
            </section>

            {/* Legal Background */}
            <section id="legal-background">
                <h2>Legal Background</h2>
                <p>The PSP License IFSCA is governed primarily under:</p>
                <ul>
                    <li><strong>IFSCA (Payment Services) Regulations, 2024</strong></li>
                    <li><strong>IFSCA (Payment and Settlement Systems) Regulations, 2024</strong></li>
                    <li><strong>IFSCA AML/CFT & KYC Guidelines, 2022</strong></li>
                    <li><strong>FEMA provisions</strong> (where applicable)</li>
                </ul>
                <p>The regulatory objectives are to ensure:</p>
                <ul>
                    <li>Financial stability</li>
                    <li>Customer fund safeguarding</li>
                    <li>Cross-border compliance</li>
                    <li>Robust risk governance</li>
                </ul>
            </section>

            {/* Payment Service Activities */}
            <section id="payment-services">
                <h2>Payment Service Activities (Schedule I, Part A)</h2>
                <p>The following activities require a PSP License IFSCA:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Payment Service Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><strong>Account Issuance Service</strong> (including e-money account)</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><strong>E-Money Issuance Service</strong></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><strong>Escrow Service</strong></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><strong>Cross-Border Money Transfer Service</strong></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><strong>Merchant Acquisition Service</strong></td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Important Clarifications:</strong>
                    <ul>
                        <li>Payment Gateway (technical support only) is <strong>excluded</strong></li>
                        <li>Banks and IBUs are <strong>exempt</strong></li>
                        <li>Cryptocurrency storage is <strong>not permitted</strong></li>
                        <li>E-wallet <strong>cannot hold INR</strong></li>
                    </ul>
                </div>
            </section>

            {/* Who Needs PSP License */}
            <section id="who-needs">
                <h2>Who Needs PSP License IFSCA?</h2>
                <p>A PSP License IFSCA is required if:</p>
                <ul>
                    <li>You provide payment services &quot;in or from&quot; IFSC</li>
                    <li>You have a place of business in IFSC</li>
                    <li>You operate wallets, cross-border remittance, escrow or merchant aggregation</li>
                </ul>
            </section>

            {/* Exempted Entities */}
            <section id="exemptions">
                <h2>Exempted Entities</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Exempt Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>IFSC Banking Units (IBUs)</td></tr>
                        <tr><td>IFSC Banking Companies (IBCs)</td></tr>
                        <tr><td>Credit Card Issuers licensed in IFSC</td></tr>
                        <tr><td>Others as specified by IFSCA</td></tr>
                    </tbody>
                </table>
            </section>

            {/* Legal Form */}
            <section id="legal-form">
                <h2>Legal Form & Entity Requirements</h2>
                <p>To obtain a PSP License IFSCA, the applicant must:</p>
                <ul>
                    <li>Be incorporated as a <strong>Company</strong></li>
                    <li>Have its <strong>Registered Office in IFSC</strong></li>
                    <li>Maintain a <strong>physical place of business in IFSC</strong></li>
                </ul>
                <div className="info-box">
                    <strong>Note:</strong> An LLP cannot apply for PSP License IFSCA. The parent company may apply before incorporating the IFSC entity, but the company must be incorporated in IFSC before final authorisation.
                </div>
            </section>

            {/* Capital Requirements */}
            <section id="capital-requirements">
                <h2>Capital Requirements (Schedule V)</h2>
                <h3>Regular PSP</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Net Worth Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>At Commencement</td>
                            <td><strong>USD 100,000</strong></td>
                        </tr>
                        <tr>
                            <td>By 3rd Financial Year</td>
                            <td><strong>USD 200,000</strong></td>
                        </tr>
                    </tbody>
                </table>

                <h3>Net Worth Components</h3>
                <ul>
                    <li>Paid-up Equity</li>
                    <li>Compulsorily Convertible Preference Shares (CCPS)</li>
                    <li>Free Reserves</li>
                    <li>Share Premium</li>
                    <li>Capital Reserves (<em>excluding revaluation reserves</em>)</li>
                </ul>
            </section>

            {/* Significant PSP */}
            <section id="significant-psp">
                <h2>Significant PSP (SPSP) Designation</h2>
                <p>If transaction volumes exceed specified thresholds, IFSCA designates the PSP as a Significant PSP:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Threshold</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Single service monthly average</td>
                            <td><strong>USD 2 million</strong></td>
                        </tr>
                        <tr>
                            <td>Two or more services monthly average</td>
                            <td><strong>USD 4 million</strong></td>
                        </tr>
                        <tr>
                            <td>E-money stored daily average</td>
                            <td><strong>USD 3 million</strong></td>
                        </tr>
                    </tbody>
                </table>

                <h3>SPSP Capital Requirements</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Net Worth Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Within 90 days of designation</td>
                            <td><strong>USD 250,000</strong></td>
                        </tr>
                        <tr>
                            <td>By 3rd Financial Year</td>
                            <td><strong>USD 500,000</strong></td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Note:</strong> IFSCA designates SPSP status — you cannot apply for it separately. Designation is automatic upon threshold crossing.
                </div>
            </section>

            {/* Authorisation Process */}
            <section id="authorisation-process">
                <h2>Authorisation Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Pre-Consultation with IFSCA</h4>
                            <p>Engage with IFSCA to understand requirements and align business model with regulatory expectations.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Application Submission</h4>
                            <p>Submit application in prescribed format with non-refundable application fee and all required documentation.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Scrutiny & Clarifications</h4>
                            <p>IFSCA reviews the application and may seek clarifications or additional information.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>In-Principle Approval</h4>
                            <p>Preliminary approval issued when Authority is satisfied prima facie, subject to conditions being fulfilled.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>IFSC Company Formation</h4>
                            <p>Incorporate company in IFSC with registered office and physical place of business.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Capital Infusion & Compliance</h4>
                            <p>Infuse required capital, establish escrow arrangements, and set up compliance infrastructure.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">7</div>
                        <div className="step-card">
                            <h4>Certificate of Authorisation</h4>
                            <p>Final authorisation granted after full compliance with all conditions. Remains valid unless revoked or surrendered.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">8</div>
                        <div className="step-card">
                            <h4>Commencement of Operations</h4>
                            <p>Must commence operations within 6 months from Certificate. One-time extension of up to 3 months possible.</p>
                        </div>
                    </div>
                </div>
                <div className="info-box">
                    <strong>Timeline:</strong> IFSCA targets processing applications within approximately 6 months. Rejected applicants may reapply after 6 months from refusal or withdrawal.
                </div>
            </section>

            {/* Fees */}
            <section id="fees">
                <h2>Application Fees & Security Deposit</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Component</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Application Fee</strong></td>
                            <td>Non-refundable, as specified by Authority</td>
                        </tr>
                        <tr>
                            <td><strong>Security Deposit</strong></td>
                            <td>Discretionary — may be required based on business model complexity, cross-border exposure, and transaction volumes</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Key Insight:</strong> Security deposit is not insurance. It may be used only for outstanding customer claims in specific situations as determined by the Authority.
                </div>
            </section>

            {/* Safeguarding */}
            <section id="safeguarding">
                <h2>Safeguarding of Customer Funds (Schedule VI)</h2>
                <p>Mandatory safeguarding mechanisms include:</p>
                <ul>
                    <li>Undertaking from safeguarding institution</li>
                    <li>Bank Guarantee</li>
                    <li>Trust Account</li>
                    <li>Escrow Account with IBU</li>
                </ul>
                <div className="warning-box">
                    <strong>Key Restrictions:</strong>
                    <ul>
                        <li>No lending of customer funds</li>
                        <li>No interest on e-wallet balances</li>
                        <li>No cash withdrawal from wallet</li>
                        <li>Escrow balance must match outstanding e-money</li>
                        <li>E-money cannot be issued at premium or discount</li>
                    </ul>
                </div>
            </section>

            {/* Escrow Lifecycle */}
            <section id="escrow-lifecycle">
                <h2>Escrow & Safeguarding Lifecycle</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Customer Funds Received</h4>
                            <p>PSP receives payment from customers for specified payment services.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Funds Segregated</h4>
                            <p>Customer funds are immediately segregated from PSP operating funds.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Escrow Deposit</h4>
                            <p>Funds deposited into escrow account by next business day after receipt.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Daily Reconciliation</h4>
                            <p>Mandatory daily reconciliation to ensure escrow balance matches outstanding obligations.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Merchant Settlement / Refund</h4>
                            <p>Settlement to merchants or refund to customers processed from escrow.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Escrow Balance Alignment</h4>
                            <p>Escrow balance must never fall below outstanding e-money. Separate escrow per payment service required.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Governance */}
            <section id="governance">
                <h2>Governance & Risk Management Framework</h2>
                <p>PSP License IFSCA requires:</p>
                <ul>
                    <li>Documented Governance Framework approved by the Board</li>
                    <li>Board-approved Risk Policy</li>
                    <li>Operational Risk Controls</li>
                    <li>Third-party service risk assessment</li>
                    <li>Exit strategy for outsourced providers</li>
                </ul>
                <p>Directors, key managerial personnel, and controlling persons must meet <strong>Fit and Proper requirements under Schedule II</strong>, including:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>No Economic Offences</strong></td>
                            <td>Declaration of no conviction for economic offences</td>
                        </tr>
                        <tr>
                            <td><strong>Insolvency Declaration</strong></td>
                            <td>Confirmation of no insolvency proceedings</td>
                        </tr>
                        <tr>
                            <td><strong>Regulatory Action Disclosure</strong></td>
                            <td>Disclosure of any past regulatory actions</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Soundness</strong></td>
                            <td>Demonstration of adequate financial resources</td>
                        </tr>
                        <tr>
                            <td><strong>Wilful Defaulter</strong></td>
                            <td>Confirmation of not being a wilful defaulter</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* AML Compliance */}
            <section id="aml-compliance">
                <h2>AML, Compliance & Reporting (Regulation 24)</h2>
                <ul>
                    <li>Mandatory <strong>AML/CFT compliance</strong> under IFSCA Guidelines</li>
                    <li><strong>KYC</strong> as per IFSCA AML/CFT & KYC Guidelines, 2022</li>
                    <li><strong>10-year</strong> transaction record retention</li>
                    <li><strong>Quarterly</strong> net worth statement submission</li>
                    <li><strong>Annual</strong> audited financial submission (within 3 months of finalisation)</li>
                </ul>
            </section>

            {/* Grievance */}
            <section id="grievance">
                <h2>Grievance Redressal & Dispute Resolution</h2>
                <ul>
                    <li><strong>30-day</strong> resolution requirement for all complaints</li>
                    <li>Online conciliation/arbitration mechanism</li>
                    <li>Dedicated grievance channels</li>
                    <li>Mandatory disclosure requirements under <strong>Schedule VII</strong></li>
                    <li>Disclosure statement must be provided to customers</li>
                </ul>
            </section>

            {/* Third-Party Risk */}
            <section id="third-party-risk">
                <h2>Third-Party Risk Management</h2>
                <p>IFSCA places strong emphasis on vendor governance. PSP must:</p>
                <ul>
                    <li>Identify critical third-party services</li>
                    <li>Conduct due diligence on vendors</li>
                    <li>Include regulatory inspection rights in agreements</li>
                    <li>Create exit strategy for each vendor</li>
                    <li>Monitor financial strength of vendors</li>
                    <li>Maintain third-party relationship register</li>
                </ul>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Risk Area</th>
                            <th>Regulatory Expectation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>ICT Risk</strong></td>
                            <td>Cyber resilience and security controls</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Risk</strong></td>
                            <td>Vendor solvency monitoring</td>
                        </tr>
                        <tr>
                            <td><strong>Data Risk</strong></td>
                            <td>Encryption & access control</td>
                        </tr>
                        <tr>
                            <td><strong>Subcontracting</strong></td>
                            <td>Nth-party oversight</td>
                        </tr>
                        <tr>
                            <td><strong>Business Continuity</strong></td>
                            <td>Exit plan readiness</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Compliance Calendar */}
            <section id="compliance-calendar">
                <h2>Ongoing Compliance Calendar</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Frequency</th>
                            <th>Compliance Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Daily</strong></td>
                            <td>Escrow reconciliation</td>
                        </tr>
                        <tr>
                            <td><strong>Ongoing</strong></td>
                            <td>AML monitoring</td>
                        </tr>
                        <tr>
                            <td><strong>Quarterly</strong></td>
                            <td>Net worth review and statement</td>
                        </tr>
                        <tr>
                            <td><strong>Annual</strong></td>
                            <td>Audited financial submission (within 3 months)</td>
                        </tr>
                        <tr>
                            <td><strong>Event-based</strong></td>
                            <td>Change in ownership reporting</td>
                        </tr>
                        <tr>
                            <td><strong>Event-based</strong></td>
                            <td>Prior approval for merger/restructuring</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Document Checklist */}
            <section id="document-checklist">
                <h2>Document Checklist</h2>

                <h3>A. Promoter & Shareholding Documents</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Certificate of Incorporation (Parent/Applicant)</td>
                            <td>Legal existence</td>
                        </tr>
                        <tr>
                            <td>Memorandum & Articles of Association</td>
                            <td>Object clause alignment</td>
                        </tr>
                        <tr>
                            <td>Shareholding pattern</td>
                            <td>Ownership transparency</td>
                        </tr>
                        <tr>
                            <td>Group structure chart</td>
                            <td>Control & related party clarity</td>
                        </tr>
                        <tr>
                            <td>Board resolution approving PSP application</td>
                            <td>Governance confirmation</td>
                        </tr>
                    </tbody>
                </table>

                <h3>B. Fit & Proper Documentation (Schedule II)</h3>
                <ul>
                    <li>Declaration of no conviction for economic offences</li>
                    <li>Insolvency declaration</li>
                    <li>Regulatory action disclosure</li>
                    <li>Financial soundness declaration</li>
                    <li>Wilful defaulter confirmation</li>
                </ul>
                <div className="info-box">
                    <strong>Note:</strong> Each director, KMP, and controlling shareholder must undergo fit and proper evaluation.
                </div>

                <h3>C. Technology & Operational Documents</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>IT Architecture Note</td>
                            <td>System design, hosting model</td>
                        </tr>
                        <tr>
                            <td>Cybersecurity Policy</td>
                            <td>Access controls & encryption</td>
                        </tr>
                        <tr>
                            <td>Data Protection Framework</td>
                            <td>Compliance with data privacy</td>
                        </tr>
                        <tr>
                            <td>Business Continuity Plan</td>
                            <td>Disaster recovery strategy</td>
                        </tr>
                        <tr>
                            <td>Third-Party Risk Policy</td>
                            <td>Vendor assessment structure</td>
                        </tr>
                    </tbody>
                </table>

                <h3>D. Safeguarding & Escrow Documents (Schedule VI)</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nodal Bank Confirmation</td>
                            <td>Written concurrence from IBU/IBC</td>
                        </tr>
                        <tr>
                            <td>Escrow Account Agreement</td>
                            <td>Regulatory clause inclusion</td>
                        </tr>
                        <tr>
                            <td>Safeguarding Mechanism</td>
                            <td>Undertaking / Guarantee / Trust</td>
                        </tr>
                        <tr>
                            <td>Daily Reconciliation Process</td>
                            <td>Operational control documentation</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Business Plan */}
            <section id="business-plan">
                <h2>Business Plan Requirements</h2>
                <p>While regulations do not prescribe a fixed template, the Authority expects:</p>
                <ul>
                    <li><strong>3-year revenue projection</strong></li>
                    <li><strong>Transaction volume forecast</strong></li>
                    <li><strong>Risk mitigation plan</strong></li>
                    <li><strong>Capital adequacy projection</strong></li>
                    <li><strong>Safeguarding structure</strong></li>
                    <li><strong>Technology architecture</strong></li>
                    <li><strong>Break-even analysis</strong></li>
                    <li><strong>Cost structure</strong></li>
                </ul>

                <h3>Illustrative Capital Forecasting</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Projected Volume</th>
                            <th>Net Worth Buffer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Year 1</td>
                            <td>$5M</td>
                            <td>$150K</td>
                        </tr>
                        <tr>
                            <td>Year 2</td>
                            <td>$20M</td>
                            <td>$220K</td>
                        </tr>
                        <tr>
                            <td>Year 3</td>
                            <td>$60M</td>
                            <td>$500K (if SPSP)</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Tip:</strong> A forward-looking capital buffer beyond minimum requirements improves regulatory comfort and accelerates approval.
                </div>
            </section>

            {/* Revocation & Surrender */}
            <section id="revocation">
                <h2>Revocation & Surrender</h2>
                <h3>IFSCA May Revoke PSP License If:</h3>
                <ul>
                    <li>Regulatory non-compliance</li>
                    <li>Customer interest compromised</li>
                    <li>AML violations</li>
                    <li>Governance failure</li>
                    <li>Net worth erosion</li>
                    <li>Misleading disclosure</li>
                </ul>

                <h3>Surrender Requirements</h3>
                <ul>
                    <li>Board resolution</li>
                    <li>CA certificate</li>
                    <li>No-liability confirmation</li>
                    <li>Public notice (if operational)</li>
                </ul>

                <div className="warning-box">
                    <strong>Regulatory Inspection Powers:</strong> IFSCA may conduct audits, inspect PSP and third-party vendors, call for documents, issue directions, and initiate enforcement action. Failure to comply may result in penalty, revocation, security deposit appropriation, or restrictions on operations.
                </div>
            </section>

            {/* Comparison */}
            <section id="comparison">
                <h2>PSP License IFSCA vs RBI Payment Aggregator</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>PSP License IFSCA</th>
                            <th>RBI Payment Aggregator</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Jurisdiction</strong></td>
                            <td>IFSC (GIFT City)</td>
                            <td>Domestic India</td>
                        </tr>
                        <tr>
                            <td><strong>Currency</strong></td>
                            <td>Specified Foreign Currency only</td>
                            <td>INR</td>
                        </tr>
                        <tr>
                            <td><strong>Wallet INR Holding</strong></td>
                            <td>Not permitted</td>
                            <td>Permitted</td>
                        </tr>
                        <tr>
                            <td><strong>Cash Withdrawal</strong></td>
                            <td>Prohibited</td>
                            <td>Limited cases</td>
                        </tr>
                        <tr>
                            <td><strong>Net Worth</strong></td>
                            <td>USD-based</td>
                            <td>INR-based</td>
                        </tr>
                        <tr>
                            <td><strong>Cross-Border Flexibility</strong></td>
                            <td>High</td>
                            <td>Regulated separately</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Strategic Advice */}
            <section id="strategic-advice">
                <h2>Strategic Structuring Advice</h2>
                <p>When applying for a PSP License IFSCA, promoters should:</p>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Design Escrow Model Early</h4>
                            <p>Structure the safeguarding mechanism and identify nodal bank before application submission.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Align Business Model to Schedule I</h4>
                            <p>Ensure proposed activities strictly fall within the five permitted payment service categories.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Avoid Hybrid Lending + PSP Models</h4>
                            <p>Lending is strictly prohibited. Do not design a business model that combines credit extension with payment services.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Prepare Stress-Tested Capital Plan</h4>
                            <p>Capital projections should account for SPSP thresholds and maintain buffers beyond minimum requirements.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Document AML & KYC Framework</h4>
                            <p>Comprehensive AML/CFT compliance documentation from inception reduces clarification cycles.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Prepare Exit & Contingency Plan</h4>
                            <p>Include business continuity, vendor exit strategies, and regulatory surrender procedures in the application.</p>
                        </div>
                    </div>
                </div>

                <h3>Common Mistakes to Avoid</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Mistake</th>
                            <th>Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Weak business model</td>
                            <td>In-principle delay</td>
                        </tr>
                        <tr>
                            <td>Inadequate capital planning</td>
                            <td>Net worth non-compliance</td>
                        </tr>
                        <tr>
                            <td>No nodal bank confirmation</td>
                            <td>Application hold</td>
                        </tr>
                        <tr>
                            <td>Poor AML framework</td>
                            <td>Rejection</td>
                        </tr>
                        <tr>
                            <td>Improper escrow design</td>
                            <td>Compliance breach</td>
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
