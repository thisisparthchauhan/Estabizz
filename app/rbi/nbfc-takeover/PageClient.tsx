"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "overview", title: "Overview of NBFC Takeover" },
        { id: "what-is-takeover", title: "What is a Takeover of NBFC?" },
        { id: "rbi-prior-approval", title: "RBI Prior Approval Requirement" },
        { id: "eligibility-acquirer", title: "Eligibility Criteria for Acquirer" },
        { id: "due-diligence", title: "Due Diligence for NBFC Acquisition" },
        { id: "approval-process", title: "RBI Approval Process for Takeover" },
        { id: "documents-required", title: "Documents Required for RBI Approval" },
        { id: "change-of-management", title: "Change of Management and Directors" },
        { id: "post-takeover-compliance", title: "Post-Takeover Compliance" },
        { id: "nbfc-for-sale", title: "Buying an Existing NBFC vs New Registration" },
        { id: "valuation", title: "Valuation of NBFC" },
        { id: "challenges", title: "Common Challenges in NBFC Takeover" },
        { id: "faq", title: "Frequently Asked Questions" },
    ];

    const quickFacts = [
        { label: "Prior Approval Required", value: "Yes (RBI)" },
        { label: "Approval Timeline", value: "60–90 Days" },
        { label: "Key Section", value: "Sec 45-IA RBI Act" },
        { label: "Acquisition Route", value: "Share Purchase/Asset Deal" },
        { label: "Min. Share Threshold", value: "26% triggers approval" },
        { label: "Fit & Proper Check", value: "Mandatory for all directors" },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏦", label: "RBI Regulated" },
                { emoji: "🤝", label: "NBFC Acquisition" },
                { emoji: "📋", label: "Prior Approval" },
                { emoji: "🇮🇳", label: "India" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "RBI Services", href: "/rbi" },
                { label: "NBFC Takeover" },
            ]}
            title="Takeover of NBFC in India – Complete Guide"
            readTime="13 min read"
            focusKeyword="NBFC Takeover in India"
            sections={sections}
            ctaTitle="Planning an NBFC Takeover?"
            ctaDescription="Get expert assistance for RBI prior approval, due diligence, and seamless NBFC acquisition with full regulatory compliance."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI Services", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for Account Aggregator framework." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services license guide under IFSCA framework." },
                { href: "/rbi/lendtech-services", category: "RBI Services", title: "LendTech Services", description: "RBI guidelines for lending technology companies." },
            ]}
            finalCtaTitle="Ready to Acquire an NBFC?"
            finalCtaDescription="Our regulatory experts guide you through every step of the NBFC takeover process — from due diligence to RBI approval and post-acquisition compliance."
        >
            <h2 id="overview">Overview of NBFC Takeover</h2>
            <p>The acquisition or takeover of a Non-Banking Financial Company (NBFC) in India is a complex regulatory transaction that requires prior approval from the Reserve Bank of India (RBI). Unlike a regular company acquisition, the takeover of an NBFC is subject to rigorous regulatory scrutiny due to the systemic importance of NBFCs in the Indian financial ecosystem.</p>
            <p>Acquiring an existing NBFC — rather than setting up a new one from scratch — offers several advantages including immediate commencement of operations, existing customer base, and an established compliance track record. However, the process requires careful due diligence, regulatory approvals, and post-acquisition integration.</p>
            <div className="info-box">
                <p className="!mb-0"><strong>Key Regulatory Reference:</strong> The takeover of an NBFC is governed by the Reserve Bank of India Act, 1934, particularly Section 45-IA, and the Guidelines on Change in Ownership and Control of NBFCs issued by the RBI. Any acquisition resulting in a change in ownership or management requires RBI's prior written approval.</p>
            </div>

            <h2 id="what-is-takeover">What is a Takeover of NBFC?</h2>
            <p>A takeover of an NBFC refers to the acquisition of a controlling stake or significant ownership interest in a Non-Banking Financial Company registered with the RBI. In regulatory terms, a "takeover" or "change of control" occurs when:</p>
            <ul>
                <li>An individual or group acquires 26% or more of the paid-up equity capital of an NBFC</li>
                <li>There is a change in the management of the NBFC involving change of more than 30% of the directors (excluding independent directors)</li>
                <li>An individual or group acquires a majority shareholding in the NBFC</li>
                <li>An NBFC undergoes merger, amalgamation, or demerger involving another entity</li>
            </ul>
            <p>The RBI's prior approval is mandatory for any of the above events. This ensures that the incoming management or ownership meets the "fit and proper" criteria prescribed by the RBI and that the acquisition does not pose risks to the stability of the NBFC or the broader financial system.</p>

            <h3>Modes of NBFC Takeover</h3>
            <ul>
                <li><strong>Share Purchase Agreement (SPA):</strong> Direct acquisition of equity shares from existing shareholders</li>
                <li><strong>Asset Purchase:</strong> Acquisition of the loan portfolio and/or other assets of the NBFC</li>
                <li><strong>Merger/Amalgamation:</strong> Merging the target NBFC with the acquirer entity under Companies Act / NCLT route</li>
                <li><strong>Subscription to Fresh Shares:</strong> Acquiring new shares issued by the NBFC resulting in change of control</li>
                <li><strong>Assignment of Control Rights:</strong> Acquiring majority board representation and management control</li>
            </ul>

            <h2 id="rbi-prior-approval">RBI Prior Approval Requirement</h2>
            <p>The RBI's prior approval is a mandatory prerequisite for any takeover or acquisition resulting in change of ownership or management control of an NBFC. This requirement is embedded in the RBI's Master Direction on Registration of NBFCs and the Guidelines on Change in Ownership.</p>

            <h3>When is RBI Prior Approval Required?</h3>
            <ul>
                <li>Acquisition of 26% or more of paid-up equity capital of an NBFC</li>
                <li>Change in management control — where more than 30% of directors (excluding independent directors) are changed</li>
                <li>Merger, amalgamation, or demerger of an NBFC with another company</li>
                <li>Transfer of shareholding from resident to non-resident (or vice versa)</li>
                <li>Acquisition of an NBFC by a foreign entity or person</li>
            </ul>

            <div className="warning-box">
                <p className="!mb-0"><strong>Important Warning:</strong> Any takeover or change of ownership/management of an NBFC without prior RBI approval is a violation of the RBI Act, 1934 and can result in cancellation of the Certificate of Registration, monetary penalties, and criminal prosecution of the persons responsible.</p>
            </div>

            <h2 id="eligibility-acquirer">Eligibility Criteria for Acquirer</h2>
            <p>The RBI scrutinises the acquirer's eligibility based on "fit and proper" criteria to ensure that the incoming ownership/management is capable of managing the NBFC in a sound and prudent manner. The key eligibility criteria for an acquirer include:</p>

            <h3>Financial Criteria</h3>
            <ul>
                <li>Adequate financial soundness and net worth to fund the acquisition</li>
                <li>No history of default on loans or dues to any bank, NBFC, or financial institution</li>
                <li>Demonstrated ability to maintain minimum NOF requirements post-acquisition</li>
                <li>No involvement in any entity whose CoR has been cancelled by the RBI</li>
            </ul>

            <h3>Integrity and Track Record</h3>
            <ul>
                <li>No criminal antecedents or conviction for offences involving moral turpitude</li>
                <li>No adverse regulatory actions by SEBI, IRDAI, PFRDA, or other regulators</li>
                <li>No adverse findings in any regulatory inspection or investigation</li>
                <li>Submission of declaration regarding fit and proper status</li>
            </ul>

            <h3>Governance Criteria (for Corporate Acquirers)</h3>
            <ul>
                <li>Good corporate governance track record</li>
                <li>Adequate expertise in the financial sector or relevant business</li>
                <li>Transparent shareholding structure without complex multi-layered structures</li>
                <li>No pending litigation that could materially affect the acquirer's financial position</li>
            </ul>

            <h2 id="due-diligence">Due Diligence for NBFC Acquisition</h2>
            <p>Comprehensive due diligence is essential before proceeding with an NBFC acquisition. The due diligence process covers legal, financial, regulatory, and operational aspects of the target NBFC.</p>

            <h3>Legal Due Diligence</h3>
            <ul>
                <li>Review of the NBFC's Certificate of Registration and its conditions</li>
                <li>Title and ownership verification of shares proposed to be acquired</li>
                <li>Review of MoA, AoA, and all shareholder/investor agreements</li>
                <li>Verification of compliance with RBI Act and applicable master directions</li>
                <li>Review of all loan documents, security documents, and recovery proceedings</li>
                <li>Identification of contingent liabilities and pending litigation</li>
                <li>Review of employment contracts, service agreements, and vendor contracts</li>
            </ul>

            <h3>Financial Due Diligence</h3>
            <ul>
                <li>Review of audited financial statements for the past 3–5 years</li>
                <li>Assessment of asset quality, NPA levels, and provisioning adequacy</li>
                <li>Verification of Net Owned Fund and capital adequacy</li>
                <li>Analysis of loan portfolio concentration and sectoral exposure</li>
                <li>Review of liquidity position and borrowing profile</li>
                <li>Assessment of off-balance sheet exposures and contingent liabilities</li>
            </ul>

            <h3>Regulatory Due Diligence</h3>
            <ul>
                <li>Review of all RBI inspection reports and responses</li>
                <li>Verification of compliance with all RBI master directions and circulars</li>
                <li>Review of statutory returns filed with the RBI</li>
                <li>Assessment of KYC/AML compliance status</li>
                <li>Verification of compliance with PMLA obligations</li>
                <li>Review of any pending regulatory actions, show cause notices, or penalties</li>
            </ul>

            <h2 id="approval-process">RBI Approval Process for Takeover</h2>
            <p>The process for obtaining RBI's prior approval for NBFC takeover involves multiple stages and requires careful preparation of the application and supporting documents.</p>

            <div className="step-timeline">
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 1</div>
                        <h4>Pre-Application Due Diligence</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Conduct comprehensive legal, financial, and regulatory due diligence on the target NBFC to identify any issues that may affect the approval.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 2</div>
                        <h4>Prepare Application and Documents</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Prepare a detailed application for RBI approval along with all supporting documents including financial details of the acquirer, proposed business plan, and fit and proper declarations.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 3</div>
                        <h4>Submit Application to RBI Regional Office</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Submit the application to the RBI's Regional Office having jurisdiction over the registered office of the target NBFC.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 4</div>
                        <h4>RBI Scrutiny and Query Response</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">The RBI scrutinises the application and may seek additional information or clarifications. Prompt and accurate responses are essential to avoid delays.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 5</div>
                        <h4>Grant of Prior Approval</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Upon satisfactory review, the RBI grants prior approval for the proposed takeover. The approval may come with conditions that must be complied with.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 6</div>
                        <h4>Completion of Acquisition</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Complete the share transfer/acquisition in accordance with the terms of the RBI approval, update the NBFC's register of members, and intimate the RBI of completion.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 7</div>
                        <h4>Post-Acquisition Reporting</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">File post-acquisition reports with the RBI, update statutory records, and comply with all conditions imposed in the approval letter.</p>
                    </div>
                </div>
            </div>

            <h2 id="documents-required">Documents Required for RBI Approval</h2>
            <p>The following documents are typically required for the RBI prior approval application for NBFC takeover:</p>

            <h3>Documents from the Acquirer</h3>
            <ul>
                <li>Application letter seeking prior approval with detailed justification</li>
                <li>Audited financial statements of the acquirer for the past 3 years</li>
                <li>Net worth certificate from a Chartered Accountant</li>
                <li>Fit and proper declaration by all proposed directors/shareholders</li>
                <li>Source of funds declaration and banking references</li>
                <li>Brief profile of the acquirer, promoters, and proposed management</li>
                <li>Proposed business plan for the NBFC post-acquisition</li>
                <li>Details of other entities/businesses associated with the acquirer</li>
            </ul>

            <h3>Documents from the Target NBFC</h3>
            <ul>
                <li>Certificate of Registration from the RBI</li>
                <li>Memorandum and Articles of Association</li>
                <li>Audited financial statements for the past 3 years</li>
                <li>Latest NBS returns filed with the RBI</li>
                <li>Board resolution approving the proposed change of ownership</li>
                <li>Shareholder agreement (if any) for the proposed acquisition</li>
                <li>Details of pending regulatory actions, litigation, and contingent liabilities</li>
                <li>Certificates of compliance with RBI guidelines</li>
            </ul>

            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>From Acquirer</th>
                            <th>From Target NBFC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Application Letter</td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                        </tr>
                        <tr>
                            <td>Audited Financial Statements (3 years)</td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                        </tr>
                        <tr>
                            <td>Fit and Proper Declaration</td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                        </tr>
                        <tr>
                            <td>Certificate of Registration</td>
                            <td><span className="badge-no">✗ No</span></td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                        </tr>
                        <tr>
                            <td>Business Plan</td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                            <td><span className="badge-no">✗ No</span></td>
                        </tr>
                        <tr>
                            <td>Board Resolution</td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                        </tr>
                        <tr>
                            <td>Source of Funds Declaration</td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                            <td><span className="badge-no">✗ No</span></td>
                        </tr>
                        <tr>
                            <td>RBI Returns (NBS)</td>
                            <td><span className="badge-no">✗ No</span></td>
                            <td><span className="badge-yes">✓ Yes</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="change-of-management">Change of Management and Directors</h2>
            <p>Apart from change of ownership, change of management in an NBFC also triggers the requirement for RBI's prior approval under certain circumstances. The RBI's guidelines distinguish between change of ownership and change of management.</p>

            <h3>When RBI Approval is Required for Change of Management</h3>
            <ul>
                <li>When 30% or more of the directors (excluding independent directors) are proposed to be changed in any 12-month period</li>
                <li>When the CEO/MD/Whole-Time Director of the NBFC is proposed to be changed and the NBFC falls under the Middle Layer or Upper Layer under SBR</li>
                <li>When the proposed new directors fail the "fit and proper" criteria</li>
            </ul>

            <h3>Fit and Proper Criteria for Directors</h3>
            <p>All directors of an NBFC — whether at the time of registration or subsequent appointment — must meet the "fit and proper" criteria prescribed by the RBI. Key requirements include:</p>
            <ul>
                <li>Integrity, honesty, and good reputation</li>
                <li>No criminal record involving moral turpitude</li>
                <li>Adequate qualifications and relevant experience</li>
                <li>No disqualification under Section 164 of the Companies Act, 2013</li>
                <li>No adverse findings in any regulatory investigation</li>
                <li>Financial soundness — no loan defaults</li>
                <li>No directorship in a company whose CoR has been cancelled by the RBI</li>
            </ul>

            <h2 id="post-takeover-compliance">Post-Takeover Compliance</h2>
            <p>Completing the acquisition is just the beginning. Post-takeover, the new management must ensure seamless compliance with all applicable RBI regulations. Key post-takeover compliance obligations include:</p>

            <ul>
                <li>Filing intimation with the RBI within 30 days of completion of takeover</li>
                <li>Updating the NBFC's register of members with new shareholding details</li>
                <li>Filing requisite forms with the Registrar of Companies (ROC) for change of directors</li>
                <li>Revising board-approved policies to align with the new management's approach</li>
                <li>Conducting a comprehensive compliance audit to identify and remediate gaps</li>
                <li>Implementing the business plan submitted to the RBI</li>
                <li>Maintaining continuity of RBI reporting obligations without interruption</li>
                <li>Ensuring continued compliance with capital adequacy requirements</li>
            </ul>

            <h2 id="nbfc-for-sale">Buying an Existing NBFC vs New Registration</h2>
            <p>Acquiring an existing NBFC offers several advantages over starting a new NBFC from scratch. However, it also carries inherited risks and compliance obligations. A careful cost-benefit analysis is essential before choosing either route.</p>

            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Buying Existing NBFC</th>
                            <th>New NBFC Registration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Time to Operations</td>
                            <td>Immediate (post-approval)</td>
                            <td>90–120 days minimum</td>
                        </tr>
                        <tr>
                            <td>Existing Portfolio</td>
                            <td>Yes (inherited)</td>
                            <td>No (fresh start)</td>
                        </tr>
                        <tr>
                            <td>Inherited Compliance Risks</td>
                            <td>Yes (from previous management)</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <td>Brand and Customer Base</td>
                            <td>Yes (established)</td>
                            <td>No (to be built)</td>
                        </tr>
                        <tr>
                            <td>Cost</td>
                            <td>Higher (acquisition premium)</td>
                            <td>Lower (registration + setup)</td>
                        </tr>
                        <tr>
                            <td>RBI Prior Approval</td>
                            <td>Required (for takeover)</td>
                            <td>Required (for new registration)</td>
                        </tr>
                        <tr>
                            <td>Due Diligence Required</td>
                            <td>Extensive</td>
                            <td>Minimal</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="valuation">Valuation of NBFC</h2>
            <p>Arriving at a fair valuation for the target NBFC is a critical step in the acquisition process. NBFC valuation is typically based on multiple methodologies including:</p>
            <ul>
                <li><strong>Net Asset Value (NAV) Method:</strong> Based on the adjusted book value of assets minus liabilities</li>
                <li><strong>Price-to-Book (P/B) Multiple:</strong> Comparing with listed NBFC peers and applying appropriate discount/premium</li>
                <li><strong>Discounted Cash Flow (DCF) Method:</strong> Based on projected earnings and cash flows discounted at appropriate rate</li>
                <li><strong>Comparable Transaction Multiple:</strong> Based on recent NBFC acquisition transactions in the market</li>
            </ul>
            <p>Key value drivers for NBFC valuation include asset quality (NPA levels), loan portfolio composition and yield, cost of funds, customer franchise, geographical reach, technology infrastructure, and management quality.</p>

            <h2 id="challenges">Common Challenges in NBFC Takeover</h2>
            <p>The NBFC takeover process presents several practical challenges that parties must be prepared to address:</p>
            <ul>
                <li><strong>Hidden Liabilities:</strong> Undisclosed NPAs, off-balance sheet exposures, and pending litigation that surface during due diligence or post-acquisition</li>
                <li><strong>RBI Scrutiny:</strong> The RBI may take a conservative approach to approving takeovers, especially where the acquirer lacks financial sector experience</li>
                <li><strong>Condition Precedents:</strong> RBI approval may come with conditions that are difficult to implement within the specified timeframes</li>
                <li><strong>Key Man Risk:</strong> Loss of key personnel post-acquisition affecting business continuity</li>
                <li><strong>Portfolio Quality:</strong> Deterioration in loan portfolio quality between signing and closing of the acquisition</li>
                <li><strong>Technology Integration:</strong> Challenges in integrating the acquired NBFC's systems with the acquirer's technology platform</li>
                <li><strong>Regulatory Non-Compliance:</strong> Discovery of historical non-compliance issues that require remediation or compounding</li>
            </ul>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-3 my-6">
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>Is RBI's prior approval mandatory for acquiring an NBFC?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Yes, RBI's prior written approval is mandatory for any acquisition of 26% or more of the paid-up equity capital of an NBFC, or any change in management involving more than 30% of the directors (excluding independent directors) in any 12-month period. Proceeding without prior approval is a violation of the RBI Act and can result in serious regulatory consequences.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>How long does it take to get RBI approval for NBFC takeover?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        The RBI typically takes 60 to 90 days to process and grant approval for an NBFC takeover, provided the application is complete and there are no major issues with the acquirer's eligibility or the target NBFC's compliance status. Applications with deficiencies or requiring additional clarifications may take longer.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>Can a foreign company acquire an Indian NBFC?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Yes, foreign companies can acquire Indian NBFCs subject to FDI policy norms (automatic route up to 100% in most NBFC categories), FEMA regulations, RBI prior approval for the takeover, and satisfaction of minimum capitalisation requirements. For foreign investment above 75%, the minimum capitalisation is USD 50 million. The acquirer must also comply with downstream investment norms.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What is the typical price range for buying a small NBFC in India?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        The price of acquiring a small NBFC in India varies significantly based on its net worth, loan portfolio quality, compliance track record, and business potential. Typically, shell NBFCs (with CoR but no significant business) trade at a premium to book value of ₹3–8 Crore depending on the category. NBFCs with established loan portfolios are valued based on book value multiples and portfolio yield.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What due diligence is most important for NBFC acquisition?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Regulatory due diligence is the most critical aspect of NBFC acquisition. This involves verifying the Certificate of Registration, reviewing all RBI inspection reports, checking compliance with master directions, and assessing any pending regulatory actions or show cause notices. Financial due diligence to assess asset quality and NPA levels is equally important as it directly impacts the value of the acquisition.
                    </div>
                </details>
            </div>
        </ServicePageLayout>
    );
}
