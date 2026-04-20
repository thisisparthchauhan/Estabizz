"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-amfi", title: "What is AMFI Registration" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs AMFI Registration" },
        { id: "eligibility", title: "Eligibility Criteria" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Registration Process" },
        { id: "kyd", title: "KYD — Know Your Distributor" },
        { id: "euin", title: "EUIN Compliance" },
        { id: "fees", title: "Fees Structure" },
        { id: "timeline", title: "Timeline" },
        { id: "individual-vs-corporate", title: "Individual vs Corporate ARN" },
        { id: "amfi-vs-ria", title: "AMFI Distributor vs SEBI RIA" },
        { id: "compliance", title: "Post-Registration Compliance" },
        { id: "commission-disclosure", title: "Commission & Disclosure Norms" },
        { id: "suspension-grounds", title: "Grounds for Suspension / Cancellation" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is AMFI Registration in India?",
            a: "AMFI Registration is a mandatory licence to distribute mutual fund products in India. It provides an ARN (AMFI Registration Number) — a unique ID issued by AMFI. Without a valid ARN, distribution of mutual fund schemes is not permitted."
        },
        {
            q: "What is an ARN number?",
            a: "ARN stands for AMFI Registration Number. It is a unique identification number issued to mutual fund distributors, allowing them to legally distribute mutual fund schemes and earn commissions."
        },
        {
            q: "Is AMFI Registration mandatory?",
            a: "Yes, it is compulsory. No individual or entity can distribute mutual funds or earn commissions from mutual fund schemes without a valid ARN. This is a SEBI regulatory requirement."
        },
        {
            q: "What is NISM Series V-A certification?",
            a: "NISM Series V-A (Mutual Fund Distributors Certification) is a mandatory exam conducted by the National Institute of Securities Markets. Passing this exam is required before applying for ARN."
        },
        {
            q: "What is EUIN in AMFI Registration?",
            a: "EUIN (Employee Unique Identification Number) is an employee-level identification number. It tracks which specific employee provided the investment advice. It is mandatory when advice is given by an employee and when interaction with the client involves a recommendation."
        },
        {
            q: "What is KYD in AMFI Registration?",
            a: "KYD means Know Your Distributor. It is a mandatory biometric verification process conducted through CAMS / KFintech (formerly Karvy) before ARN issuance. It includes fingerprint verification and in-person verification. Incomplete KYD is one of the most common reasons for ARN rejection."
        },
        {
            q: "What is the validity of AMFI Registration (ARN)?",
            a: "ARN is valid for 3 years from the date of issue. Renewal is mandatory before expiry. Failure to renew on time leads to ARN lapse and distribution activity cannot continue until renewed."
        },
        {
            q: "Can a company apply for AMFI Registration?",
            a: "Yes, companies and LLPs can apply for a Corporate ARN. Key personnel involved in distribution must hold valid NISM Series V-A certification. All sales staff must have individual EUINs."
        },
        {
            q: "What is the minimum qualification for AMFI Registration?",
            a: "Minimum 10th pass. Higher education is not mandatory. However, NISM Series V-A certification is mandatory regardless of educational qualification."
        },
        {
            q: "Can one person hold multiple ARNs?",
            a: "No. Only one ARN per individual or entity is permitted. Holding multiple ARNs is not allowed."
        },
        {
            q: "Is experience required for AMFI Registration?",
            a: "No prior experience is required for individual applicants. NISM Series V-A certification is sufficient. There is no minimum work experience requirement."
        },
        {
            q: "Is GST registration required for mutual fund distributors?",
            a: "Yes, if commission income exceeds the GST threshold limit (₹20 lakhs for most states). GST is applicable on commission earnings from distribution."
        },
        {
            q: "What are the fees for AMFI Registration?",
            a: "Individual ARN fee is approximately ₹3,000 – ₹5,000. Renewal fee is ₹2,000 – ₹3,000. Corporate ARN fee is higher depending on entity structure."
        },
        {
            q: "When is EUIN not required?",
            a: "EUIN is not required for pure execution-only transactions (investor-directed, no advice given) and direct plan investments without advisory interaction. However, AMFI strictly monitors misuse of execution-only declarations."
        },
        {
            q: "What is the difference between AMFI Distributor and SEBI RIA?",
            a: "An AMFI Distributor earns commissions from AMCs (commission-based model), regulated by AMFI + SEBI. A SEBI Registered Investment Adviser earns fees directly from clients (fee-based model), regulated strictly by SEBI with no commission allowed. Conflict of interest is possible for distributors but strictly restricted for RIAs."
        },
        {
            q: "What are the grounds for ARN suspension or cancellation?",
            a: "AMFI may suspend or cancel ARN for: mis-selling of mutual fund schemes, forged documents or misrepresentation, non-renewal of ARN, violation of AMFI Code of Conduct, and investor complaints with merit. Repeated violations may lead to permanent debarment."
        },
        {
            q: "What must be disclosed by mutual fund distributors?",
            a: "Distributors must clearly disclose upfront commission and trail commission received from AMCs. They must avoid misleading return projections and product bias based on commission. SEBI's intent is to shift from commission-driven selling to client-centric advisory."
        },
        {
            q: "Can NRIs apply for AMFI Registration?",
            a: "Yes, NRIs can apply subject to KYC and regulatory conditions. Additional documentation may be required for non-resident applicants."
        },
        {
            q: "Can CA or CS professionals get AMFI exemption from NISM certification?",
            a: "No exemption is available. NISM Series V-A certification is mandatory for all applicants regardless of professional qualifications such as CA, CS, or MBA."
        },
        {
            q: "How much time does AMFI Registration take?",
            a: "NISM certification takes 1–2 weeks. ARN processing by AMFI takes 7–10 working days after document submission. Total time is approximately 2–3 weeks."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "📊", label: "AMFI" },
                { emoji: "🏦", label: "Mutual Fund Distribution" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "SEBI Services", href: "/sebi" },
                { label: "AMFI Registration", href: "/sebi/amfi-registration" },
            ]}
            title="AMFI Registration in India – Complete 2026 Guide with Fees, Process & Key Compliance Insights"
            readTime="16 min read"
            focusKeyword="AMFI Registration"
            sections={sections}
            ctaTitle="AMFI ARN Registration"
            ctaDescription="Our compliance experts provide end-to-end guidance for AMFI Registration — NISM certification planning, KYD verification, ARN application, and post-registration compliance."
            quickFacts={[
                { label: "Issued By", value: "AMFI" },
                { label: "Regulated By", value: "SEBI" },
                { label: "Certification", value: "NISM Series V-A" },
                { label: "ARN Validity", value: "3 Years" },
                { label: "Min Qualification", value: "10th Pass" },
                { label: "Individual ARN Fee", value: "₹3,000–5,000" },
                { label: "ARN Processing", value: "7–10 Working Days" },
                { label: "Total Timeline", value: "2–3 Weeks" },
            ]}
            relatedArticles={[
                { title: "Mutual Fund Registration", href: "/sebi/mutual-fund-registration", category: "SEBI", description: "SEBI registration for mutual fund asset management companies." },
                { title: "Credit Rating Agency", href: "/sebi/credit-rating-agency", category: "SEBI", description: "SEBI CRA registration guide for credit rating entities." },
                { title: "Alternative Asset Portfolio Valuation", href: "/sebi/alternative-asset-portfolio-valuation", category: "SEBI", description: "Valuation framework for AIFs and alternative assets." },
                { title: "NBFC Account Aggregator License", href: "/rbi/nbfc-account-aggregator-license", category: "RBI", description: "Account Aggregator license under RBI regulations." },
            ]}
            finalCtaTitle="Ready to Get Your AMFI ARN Registration?"
            finalCtaDescription="We guide you through every step — from NISM certification and KYD to ARN issuance and compliance setup."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    <strong>AMFI Registration</strong> is a mandatory compliance requirement for individuals and entities intending to distribute mutual fund products in India. It acts as a regulatory gatekeeper ensuring only qualified and certified intermediaries can sell mutual fund schemes to investors.
                </p>
                <p>
                    The AMFI Registration Number (ARN) is issued by the <strong>Association of Mutual Funds in India (AMFI)</strong> under the regulatory oversight of SEBI. No distributor — whether individual, partnership, company, or fintech platform — can earn commissions or distribute mutual fund schemes without a valid ARN.
                </p>
                <div className="info-box">
                    <strong>📌 Key Requirement:</strong> NISM Series V-A (Mutual Fund Distributors Certification) must be cleared before applying for ARN. This exam is conducted by the National Institute of Securities Markets (NISM), an institution set up by SEBI.
                </div>
            </section>

            {/* What is AMFI Registration */}
            <section id="what-is-amfi">
                <h2>What is AMFI Registration</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>In simple terms</strong></td>
                            <td>AMFI Registration is an authorisation granted to individuals and entities to legally distribute mutual fund products in India.</td>
                        </tr>
                        <tr>
                            <td><strong>From a compliance perspective</strong></td>
                            <td>Ensures only trained and certified professionals engage in mutual fund distribution, protecting investor interests and maintaining market discipline.</td>
                        </tr>
                        <tr>
                            <td><strong>What you receive</strong></td>
                            <td>ARN (AMFI Registration Number) — a unique ID to distribute mutual fund schemes and earn commissions from Asset Management Companies (AMCs).</td>
                        </tr>
                        <tr>
                            <td><strong>Legal consequence of non-compliance</strong></td>
                            <td>Distributing mutual funds without ARN is a regulatory violation. SEBI and AMFI can take enforcement action.</td>
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
                            <td>Primary Regulator</td>
                            <td>Securities and Exchange Board of India (SEBI)</td>
                        </tr>
                        <tr>
                            <td>ARN Issuing Body</td>
                            <td>Association of Mutual Funds in India (AMFI)</td>
                        </tr>
                        <tr>
                            <td>Certification Authority</td>
                            <td>National Institute of Securities Markets (NISM) — NISM Series V-A: Mutual Fund Distributors Certification</td>
                        </tr>
                        <tr>
                            <td>KYD Verification</td>
                            <td>CAMS / KFintech (formerly Karvy) — biometric verification</td>
                        </tr>
                        <tr>
                            <td>Governing Guidelines</td>
                            <td>SEBI (Mutual Funds) Regulations, 1996; AMFI Code of Conduct; SEBI circulars on distributor compliance</td>
                        </tr>
                        <tr>
                            <td>Commission Disclosure</td>
                            <td>SEBI guidelines on disclosure of commissions; AMFI circulars on transparency norms</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Who Needs */}
            <section id="who-needs">
                <h2>Who Needs AMFI Registration</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Individual Financial Advisors</strong></td>
                            <td>Freelance advisors and agents distributing mutual fund schemes to retail clients</td>
                        </tr>
                        <tr>
                            <td><strong>Wealth Managers</strong></td>
                            <td>Professionals managing client portfolios who include mutual fund products</td>
                        </tr>
                        <tr>
                            <td><strong>Insurance Agents</strong></td>
                            <td>Agents diversifying into mutual fund distribution alongside insurance products</td>
                        </tr>
                        <tr>
                            <td><strong>NBFCs</strong></td>
                            <td>Non-Banking Financial Companies distributing mutual funds as part of their product suite</td>
                        </tr>
                        <tr>
                            <td><strong>Banks & Financial Institutions</strong></td>
                            <td>Banks offering third-party mutual fund products to customers</td>
                        </tr>
                        <tr>
                            <td><strong>Fintech Platforms</strong></td>
                            <td>Digital investment platforms — must ensure ARN compliance for all onboarded distributors</td>
                        </tr>
                        <tr>
                            <td><strong>Companies & LLPs</strong></td>
                            <td>Corporate entities engaged in mutual fund distribution as part of their business model</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Note:</strong> Even digital platforms offering mutual fund distribution must ensure all their onboarded distributor partners hold valid ARNs. Platform-level compliance does not substitute individual distributor ARN requirements.
                </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
                <h2>Eligibility Criteria</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Minimum Age</strong></td>
                            <td>18 years (minors cannot apply)</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Qualification</strong></td>
                            <td>10th pass (higher education not mandatory)</td>
                        </tr>
                        <tr>
                            <td><strong>Certification</strong></td>
                            <td>NISM Series V-A: Mutual Fund Distributors Certification — mandatory for all applicants (no exemption for CA/CS/MBA)</td>
                        </tr>
                        <tr>
                            <td><strong>KYC Compliance</strong></td>
                            <td>CKYC / KRA-compliant KYC — mandatory</td>
                        </tr>
                        <tr>
                            <td><strong>PAN Card</strong></td>
                            <td>Mandatory — for compliance and tax purposes</td>
                        </tr>
                        <tr>
                            <td><strong>KYD Completion</strong></td>
                            <td>Know Your Distributor biometric verification — mandatory before ARN issuance</td>
                        </tr>
                        <tr>
                            <td><strong>Prior Experience</strong></td>
                            <td>Not required — certification is sufficient</td>
                        </tr>
                        <tr>
                            <td><strong>Multiple ARNs</strong></td>
                            <td>Only one ARN per individual or entity — multiple ARNs not permitted</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Documents */}
            <section id="documents">
                <h2>Documents Required</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PAN Card</td>
                            <td>Mandatory for all applicants — compliance and tax identification</td>
                        </tr>
                        <tr>
                            <td>Aadhaar Card</td>
                            <td>Identity proof and address verification</td>
                        </tr>
                        <tr>
                            <td>NISM Series V-A Certificate</td>
                            <td>Valid certification — must be current and not expired</td>
                        </tr>
                        <tr>
                            <td>Passport-size Photograph</td>
                            <td>Recent photograph for ARN card</td>
                        </tr>
                        <tr>
                            <td>Bank Account Details</td>
                            <td>For commission payout from AMCs</td>
                        </tr>
                        <tr>
                            <td>KYC Acknowledgement</td>
                            <td>CKYC / KRA-compliant KYC completion proof</td>
                        </tr>
                        <tr>
                            <td>KYD Completion Certificate</td>
                            <td>Biometric verification completion from CAMS / KFintech</td>
                        </tr>
                        <tr>
                            <td>Qualification Proof</td>
                            <td>10th pass certificate or higher educational qualification</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Process */}
            <section id="process">
                <h2>Step-by-Step AMFI Registration Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Clear NISM Series V-A Certification</h4>
                            <p>Register and appear for the NISM Series V-A exam. Passing score is mandatory before applying for ARN. No exemption available for any professional qualification.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Complete KYC through KRA</h4>
                            <p>Complete KYC verification through a SEBI-registered KYC Registration Agency (KRA). Must be CKYC-compliant. Ensure PAN and Aadhaar are linked.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Complete KYD (Know Your Distributor)</h4>
                            <p>Visit a CAMS / KFintech service centre for biometric (fingerprint) verification and in-person verification. For corporate applicants, directors/partners involved in distribution must complete KYD individually.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Apply for ARN through AMFI Portal</h4>
                            <p>Submit the online application at the AMFI portal along with all required documents — NISM certificate, PAN, Aadhaar, photo, KYC acknowledgement, and bank details.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Pay ARN Fee</h4>
                            <p>Pay the applicable ARN fee — ₹3,000–₹5,000 for individuals, higher for corporate applicants. Fee is payable online at the time of application.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Receive ARN and EUIN</h4>
                            <p>AMFI processes the application in 7–10 working days. Upon approval, the ARN card is issued. For entities with employees, individual EUINs are issued for each sales personnel.</p>
                        </div>
                    </div>
                </div>
                <div className="warning-box">
                    <strong>⚠️ Common Mistake:</strong> Most ARN rejections occur due to incomplete KYD verification, expired NISM certificate, or KYC mismatch. Ensure all three are in order before submitting the application.
                </div>
            </section>

            {/* KYD */}
            <section id="kyd">
                <h2>KYD — Know Your Distributor (Often Overlooked but Critical)</h2>
                <p>KYD is a mandatory biometric verification process conducted <em>before</em> ARN issuance. It is one of the most frequently overlooked steps — and the most common reason for ARN rejection.</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>KYD Aspect</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Conducted By</strong></td>
                            <td>CAMS / KFintech (formerly Karvy)</td>
                        </tr>
                        <tr>
                            <td><strong>Verification Method</strong></td>
                            <td>Fingerprint biometric + In-person verification (IPV)</td>
                        </tr>
                        <tr>
                            <td><strong>Mandatory For</strong></td>
                            <td>All individual applicants; Directors / Partners of corporate applicants involved in distribution</td>
                        </tr>
                        <tr>
                            <td><strong>Consequence of Incomplete KYD</strong></td>
                            <td>ARN application will be rejected — most common rejection reason</td>
                        </tr>
                        <tr>
                            <td><strong>Renewal</strong></td>
                            <td>KYD must be re-completed at the time of ARN renewal</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* EUIN */}
            <section id="euin">
                <h2>EUIN Compliance — Employee-Level Regulation</h2>
                <p>
                    EUIN (Employee Unique Identification Number) ensures accountability at the individual salesperson level. It tracks which specific employee provided advice to an investor.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>EUIN Aspect</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>When EUIN is Mandatory</strong></td>
                            <td>When advice is given by an employee to a client; when interaction involves a product recommendation</td>
                        </tr>
                        <tr>
                            <td><strong>When EUIN is Not Required</strong></td>
                            <td>Pure execution-only transactions (investor-directed, no advice); direct plan investments without advisory interaction</td>
                        </tr>
                        <tr>
                            <td><strong>AMFI Monitoring</strong></td>
                            <td>AMFI strictly monitors misuse of &quot;execution-only&quot; declarations to evade EUIN requirement</td>
                        </tr>
                        <tr>
                            <td><strong>Corporate Applicants</strong></td>
                            <td>EUINs are mandatory for all sales staff in corporate ARN entities</td>
                        </tr>
                        <tr>
                            <td><strong>EUIN for Leaving Employees</strong></td>
                            <td>EUIN must be deactivated when an employee leaves the organization; the same EUIN cannot be transferred</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Fees */}
            <section id="fees">
                <h2>Fees Structure</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Fee (Approx.)</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Individual ARN</strong></td>
                            <td>₹3,000 – ₹5,000</td>
                            <td>One-time fee at issuance</td>
                        </tr>
                        <tr>
                            <td><strong>ARN Renewal</strong></td>
                            <td>₹2,000 – ₹3,000</td>
                            <td>Every 3 years; KYD re-completion also required</td>
                        </tr>
                        <tr>
                            <td><strong>Corporate ARN</strong></td>
                            <td>Higher — based on structure</td>
                            <td>Depends on entity type and number of personnel</td>
                        </tr>
                        <tr>
                            <td><strong>NISM Series V-A Exam</strong></td>
                            <td>As prescribed by NISM</td>
                            <td>Separate from ARN fee; payable to NISM</td>
                        </tr>
                        <tr>
                            <td><strong>GST on Commission</strong></td>
                            <td>18% GST applicable</td>
                            <td>If annual income from distribution exceeds GST threshold</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Timeline */}
            <section id="timeline">
                <h2>Timeline</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Estimated Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NISM Series V-A Certification</td>
                            <td>1–2 weeks (study + exam)</td>
                        </tr>
                        <tr>
                            <td>KYC Completion</td>
                            <td>1–3 working days</td>
                        </tr>
                        <tr>
                            <td>KYD Biometric Verification</td>
                            <td>1–2 working days (walk-in at CAMS / KFintech)</td>
                        </tr>
                        <tr>
                            <td>ARN Application Processing by AMFI</td>
                            <td>7–10 working days</td>
                        </tr>
                        <tr>
                            <td><strong>Total Estimated Timeline</strong></td>
                            <td><strong>2–3 weeks</strong> (from starting NISM to ARN receipt)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Individual vs Corporate */}
            <section id="individual-vs-corporate">
                <h2>Individual ARN vs Corporate ARN</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th>Individual ARN</th>
                            <th>Corporate ARN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Applicability</strong></td>
                            <td>Individuals (sole proprietors, freelancers, agents)</td>
                            <td>Companies, LLPs, Partnership Firms</td>
                        </tr>
                        <tr>
                            <td><strong>NISM Certification</strong></td>
                            <td>Required by applicant</td>
                            <td>Required for key personnel involved in distribution</td>
                        </tr>
                        <tr>
                            <td><strong>EUIN</strong></td>
                            <td>Required if any employees provide advice</td>
                            <td>Mandatory for all sales staff</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance Burden</strong></td>
                            <td>Moderate</td>
                            <td>High — covers all employees and governance</td>
                        </tr>
                        <tr>
                            <td><strong>Operational Scope</strong></td>
                            <td>Limited — single advisor model</td>
                            <td>Scalable — team-based distribution business</td>
                        </tr>
                        <tr>
                            <td><strong>Suitable For</strong></td>
                            <td>Freelance advisors, insurance agents expanding into MFs</td>
                            <td>Fintech platforms, wealth management firms, NBFCs</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* AMFI vs RIA */}
            <section id="amfi-vs-ria">
                <h2>AMFI Distributor vs SEBI Registered Investment Adviser (RIA)</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th>AMFI Distributor (ARN Holder)</th>
                            <th>SEBI Registered Investment Adviser (RIA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Role</strong></td>
                            <td>Mutual fund product distributor</td>
                            <td>Investment adviser — provides investment advice</td>
                        </tr>
                        <tr>
                            <td><strong>Revenue Model</strong></td>
                            <td>Commission-based (trail + upfront from AMC)</td>
                            <td>Fee-based (advisory fees from clients)</td>
                        </tr>
                        <tr>
                            <td><strong>Regulation</strong></td>
                            <td>AMFI + SEBI guidelines</td>
                            <td>SEBI (Investment Advisers) Regulations, 2013</td>
                        </tr>
                        <tr>
                            <td><strong>Conflict of Interest</strong></td>
                            <td>Possible — commission incentive can bias recommendations</td>
                            <td>Strictly restricted — cannot earn commissions</td>
                        </tr>
                        <tr>
                            <td><strong>Net Worth Requirement</strong></td>
                            <td>None for individuals</td>
                            <td>₹50 lakh for corporate RIAs</td>
                        </tr>
                        <tr>
                            <td><strong>Strategic Trend</strong></td>
                            <td>Commission-based model under increasing regulatory scrutiny</td>
                            <td>Growing preference for credibility and investor trust</td>
                        </tr>
                    </tbody>
                </table>
                <blockquote className="expert-quote">
                    <p>&ldquo;Mutual fund distribution is not just a commission business — it is a trust business. Advisors who prioritise investor outcomes over product commissions build sustainable practices that survive every regulatory cycle.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
            </section>

            {/* Post-Registration Compliance */}
            <section id="compliance">
                <h2>Post-Registration Compliance</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>ARN Renewal</strong></td>
                            <td>Renew ARN every 3 years before expiry. Lapsed ARN means no distribution activity permitted.</td>
                        </tr>
                        <tr>
                            <td><strong>NISM Certification Renewal</strong></td>
                            <td>Maintain valid and current NISM Series V-A certification — renewal / CPE (Continuing Professional Education) required</td>
                        </tr>
                        <tr>
                            <td><strong>AMFI Code of Conduct</strong></td>
                            <td>Strictly follow AMFI&apos;s Code of Conduct — investor-first approach, no mis-selling</td>
                        </tr>
                        <tr>
                            <td><strong>EUIN Maintenance</strong></td>
                            <td>Ensure all employees providing advice have active EUINs; deactivate on exit</td>
                        </tr>
                        <tr>
                            <td><strong>Commission Disclosure</strong></td>
                            <td>Disclose upfront and trail commissions to investors as per SEBI guidelines</td>
                        </tr>
                        <tr>
                            <td><strong>Transaction Records</strong></td>
                            <td>Maintain records of all transactions, investor communications, and advice documentation</td>
                        </tr>
                        <tr>
                            <td><strong>KYC Updates</strong></td>
                            <td>Keep own KYC details updated with KRA at all times</td>
                        </tr>
                        <tr>
                            <td><strong>GST Returns</strong></td>
                            <td>File GST returns on commission income (if applicable)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Commission & Disclosure */}
            <section id="commission-disclosure">
                <h2>Commission & Disclosure Norms</h2>
                <p>SEBI&apos;s intent is to shift from commission-driven selling to client-centric advisory. Distributors must:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Disclose Upfront Commission</strong></td>
                            <td>Must be clearly disclosed to investor before transaction</td>
                        </tr>
                        <tr>
                            <td><strong>Disclose Trail Commission</strong></td>
                            <td>Annual trail commission earned on AUM must be disclosed</td>
                        </tr>
                        <tr>
                            <td><strong>Avoid Misleading Projections</strong></td>
                            <td>Cannot promise or project unrealistic returns to investors</td>
                        </tr>
                        <tr>
                            <td><strong>No Product Bias</strong></td>
                            <td>Cannot recommend products solely based on commission rates — investor suitability must be primary criterion</td>
                        </tr>
                        <tr>
                            <td><strong>Risk Profiling</strong></td>
                            <td>Must profile investor risk appetite before recommending schemes</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Grounds for Suspension */}
            <section id="suspension-grounds">
                <h2>Grounds for ARN Suspension / Cancellation</h2>
                <div className="warning-box">
                    <strong>⚠️ Enforcement:</strong> AMFI may suspend or cancel ARN for regulatory violations. Repeated violations may lead to permanent debarment from mutual fund distribution.
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Ground</th>
                            <th>Consequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mis-selling of mutual fund schemes</td>
                            <td>ARN suspension; investor compensation may be required</td>
                        </tr>
                        <tr>
                            <td>Forged documents or misrepresentation</td>
                            <td>Immediate cancellation; possible SEBI enforcement</td>
                        </tr>
                        <tr>
                            <td>Non-renewal of ARN</td>
                            <td>ARN lapse — distribution must stop immediately</td>
                        </tr>
                        <tr>
                            <td>Violation of AMFI Code of Conduct</td>
                            <td>Warning, suspension, or cancellation</td>
                        </tr>
                        <tr>
                            <td>Investor complaints with merit</td>
                            <td>Investigation; potential suspension pending outcome</td>
                        </tr>
                        <tr>
                            <td>Non-disclosure of commissions</td>
                            <td>Penalty and regulatory action</td>
                        </tr>
                        <tr>
                            <td>Repeated / serious violations</td>
                            <td>Permanent debarment from mutual fund distribution</td>
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
