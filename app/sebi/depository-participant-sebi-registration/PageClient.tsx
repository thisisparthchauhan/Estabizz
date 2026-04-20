"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-dp", title: "What is a Depository Participant" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs DP Registration" },
        { id: "eligibility", title: "Eligibility Criteria" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Registration Process" },
        { id: "sebi-evaluation", title: "SEBI & Depository Evaluation" },
        { id: "business-model", title: "Business Model of a DP" },
        { id: "operational-flow", title: "Operational Flow" },
        { id: "comparison", title: "DP vs Depository vs Stock Broker" },
        { id: "fees", title: "Fees Structure" },
        { id: "timeline", title: "Timeline" },
        { id: "hidden-risks", title: "Hidden Compliance Risks" },
        { id: "post-registration", title: "Post-Registration Compliance" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is a Depository Participant (DP) in India?",
            a: "A Depository Participant is an intermediary registered with SEBI that enables investors to hold and transact securities in demat form through depositories like NSDL or CDSL. DPs are agents of the depository — they interface directly with retail and institutional investors."
        },
        {
            q: "Is SEBI registration mandatory to become a Depository Participant?",
            a: "Yes, it is mandatory. No entity can act as a DP without obtaining registration from SEBI under SEBI (Depositories and Participants) Regulations, 2018. In addition to SEBI registration, an agreement with NSDL or CDSL (or both) is required."
        },
        {
            q: "Which entities are eligible to apply for DP registration?",
            a: "Eligible entities include: (1) Scheduled Commercial Banks, (2) Stock Brokers registered with SEBI, (3) NBFCs meeting capital requirements, (4) Custodians of securities, and (5) Financial Institutions. Individuals and partnership firms are generally not eligible."
        },
        {
            q: "What is the difference between a Depository and a Depository Participant?",
            a: "A Depository (NSDL or CDSL) is the central electronic repository that holds securities. It does not deal directly with retail investors. A Depository Participant is the intermediary — an agent of the depository — that opens and maintains demat accounts for investors and processes transactions on their behalf."
        },
        {
            q: "Which depositories operate in India?",
            a: "India has two main depositories: NSDL (National Securities Depository Limited) and CDSL (Central Depository Services Limited). Both are regulated by SEBI. A DP can be registered with one or both depositories — most large banks and brokers are registered with both."
        },
        {
            q: "Is prior in-principle approval from NSDL/CDSL required before applying to SEBI?",
            a: "Yes. The process is sequential — the entity must first obtain in-principle approval from the depository (NSDL or CDSL), which includes a due diligence and infrastructure inspection. Only after depository approval is the SEBI application filed. Depository in-principle approvals typically have a validity period within which SEBI application must be made."
        },
        {
            q: "What is the total timeline for DP registration?",
            a: "The total timeline is typically 2–4 months: Application preparation takes 2–4 weeks, depository review takes 3–6 weeks, and SEBI approval takes 4–8 weeks. Delays occur when documentation is incomplete, IT systems are not ready, or when SEBI seeks clarifications."
        },
        {
            q: "What are the net worth requirements for DP registration?",
            a: "SEBI prescribes minimum net worth criteria for DPs, which varies by the category of entity (bank, broker, NBFC, etc.). Net worth must be maintained continuously — not just at the time of application. Declining below the threshold post-registration is a compliance violation and can lead to suspension."
        },
        {
            q: "What IT infrastructure is required for DP registration?",
            a: "DPs must have: (1) Direct connectivity with NSDL/CDSL systems (DPM software), (2) Secure and encrypted servers, (3) Disaster recovery and backup systems, (4) Role-based access controls, (5) System audit compliance, and (6) Cybersecurity protocols. Infrastructure is inspected by the depository before granting in-principle approval."
        },
        {
            q: "What is a system audit and is it mandatory for DPs?",
            a: "A system audit is a periodic examination of the DP's IT infrastructure, data security measures, and operational systems — conducted by a CERT-In empanelled auditor or as specified by SEBI/depository. It is mandatory for all DPs. Failure of the system audit leads to delayed activation and may require re-implementation of systems."
        },
        {
            q: "What services does a DP provide to investors?",
            a: "Key services include: (1) Opening demat accounts (Beneficial Owner accounts), (2) Dematerialisation and rematerialisation of securities, (3) Transfer of securities (delivery and receipt), (4) Pledge and hypothecation services, (5) Transmission of securities, (6) Freeze/unfreeze of accounts, (7) Periodic account statements, and (8) Value-added services like portfolio tracking."
        },
        {
            q: "Can a stock broker also operate as a Depository Participant?",
            a: "Yes. Most stock brokers obtain separate DP registration to provide a combined trading-plus-demat service to their clients. However, DP registration is separate from stock broker registration — it requires its own application, fees, and compliance structure. The combined broker-DP model is the most common in India."
        },
        {
            q: "Is appointment of a Compliance Officer mandatory?",
            a: "Yes. A dedicated Compliance Officer must be appointed before registration. The Compliance Officer is responsible for ensuring adherence to all SEBI regulations, depository norms, KYC/AML requirements, and reporting obligations. They are also the point of contact for SEBI and depository inspections."
        },
        {
            q: "What are the post-registration compliance obligations for a DP?",
            a: "Key obligations include: (1) Maintaining minimum net worth continuously, (2) Periodic reporting to SEBI and the depository, (3) Internal audit and system audit (periodic), (4) KYC and AML compliance under PMLA, (5) Investor grievance redressal through SCORES, (6) Issuance of periodic account statements to clients, (7) Cybersecurity compliance, and (8) Submission of periodic returns."
        },
        {
            q: "Can DP registration be transferred to another entity?",
            a: "No. DP registration is entity-specific and non-transferable. In the event of a merger, acquisition, or restructuring, a fresh registration or SEBI approval for change in status is required. The registration is linked to the specific entity's PAN, incorporation documents, and depository agreement."
        },
        {
            q: "What happens if a DP violates SEBI regulations?",
            a: "Consequences escalate based on severity: (1) Warning letter for minor violations, (2) Monetary penalties, (3) Suspension of operations, (4) Cancellation of DP registration. In cases involving fraud or misuse of investor assets, directors may be personally held liable under SEBI Act and IPC provisions."
        },
        {
            q: "Are DPs required to comply with PMLA and KYC norms?",
            a: "Yes. DPs are designated as 'reporting entities' under PMLA and must comply with full KYC norms — PAN verification, address proof, biometric KYC for new accounts. DPs must file Suspicious Transaction Reports (STRs) and Cash Transaction Reports (CTRs) to FIU-IND when thresholds are triggered. Non-compliance with PMLA is a separate and serious regulatory risk."
        },
        {
            q: "Can DPs outsource their operations?",
            a: "Limited outsourcing is allowed for non-core activities. However, core functions such as account maintenance, transaction processing, compliance, and investor communication must be retained by the DP. Any outsourcing arrangement must be reported to the depository and must not compromise regulatory responsibility — the DP remains accountable regardless of outsourcing."
        },
        {
            q: "What is a Beneficial Owner (BO) account?",
            a: "A Beneficial Owner (BO) account — commonly called a demat account — is the account opened by an investor with a DP to hold securities electronically. The BO ID is a unique 16-digit identifier comprising the DP's DPID (8 digits) + client account number (8 digits). This BO ID is used for all securities transactions."
        },
        {
            q: "What are the main revenue streams for a Depository Participant?",
            a: "DPs earn through: (1) Account opening charges (one-time), (2) Annual Maintenance Charges (AMC) paid by demat account holders, (3) Transaction charges per debit instruction, (4) Pledge charges, (5) Value-added services like SMS alerts, consolidated statements, and API services. The recurring nature of AMC and transaction fees makes DP business a stable, scalable revenue model."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "📊", label: "SEBI" },
                { emoji: "🏦", label: "Capital Markets" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "SEBI Services", href: "/sebi" },
                { label: "Depository Participant Registration", href: "/sebi/depository-participant-sebi-registration" },
            ]}
            title="Depository Participant SEBI Registration in India: Complete Guide with Eligibility, Process & Compliance"
            readTime="16 min read"
            focusKeyword="Depository Participant SEBI Registration"
            sections={sections}
            ctaTitle="DP Registration Support"
            ctaDescription="Our SEBI compliance experts assist financial institutions, NBFCs, and stock brokers through the complete Depository Participant registration process — from depository in-principle approval to SEBI registration and operational launch."
            quickFacts={[
                { label: "Regulator", value: "SEBI + Depository" },
                { label: "Governing Law", value: "Depositories Act, 1996" },
                { label: "Key Regulation", value: "SEBI DP Regs 2018" },
                { label: "Depositories", value: "NSDL / CDSL" },
                { label: "Eligible Entities", value: "Banks, Brokers, NBFCs" },
                { label: "Approval Timeline", value: "2–4 Months" },
                { label: "Compliance Officer", value: "Mandatory" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "AMFI Registration & Distribution", href: "/sebi/amfi-registration", category: "SEBI", description: "ARN registration and mutual fund distribution compliance guide." },
                { title: "Credit Rating Agency Registration", href: "/sebi/credit-rating-agency", category: "SEBI", description: "SEBI registration and compliance for Credit Rating Agencies." },
                { title: "Collective Investment Schemes", href: "/sebi/collective-investment-schemes", category: "SEBI", description: "SEBI CIS registration and compliance guide." },
                { title: "FEMA Compliance", href: "/fema/compliance-under-fema", category: "FEMA", description: "FEMA compliance guide for FDI, ODI, and cross-border transactions." },
            ]}
            finalCtaTitle="Ready to Apply for Depository Participant Registration?"
            finalCtaDescription="From in-principle approval with NSDL/CDSL to SEBI registration — our team handles the complete process with precision, ensuring infrastructure readiness, documentation accuracy, and ongoing compliance."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    <strong>Depository Participant (DP) registration with SEBI</strong> is a critical regulatory requirement for entities intending to act as an intermediary between investors and India&apos;s depositories — NSDL and CDSL. In today&apos;s digital securities ecosystem, where dematerialisation is mandatory for virtually all transactions, becoming a DP is not merely a business opportunity but a highly regulated responsibility.
                </p>
                <p>
                    The Indian securities market has over <strong>15 crore demat accounts</strong> (as of 2024) — and every single one of them is maintained by a registered Depository Participant. DPs are the operational backbone of India&apos;s capital market infrastructure, handling the safekeeping, transfer, and reporting of all dematerialised securities.
                </p>
                <div className="info-box">
                    <strong>Regulatory Basis:</strong> SEBI (Depositories and Participants) Regulations, 2018 read with the Depositories Act, 1996 govern DP registration. No entity can provide depository services to investors without a valid SEBI certificate of registration as a DP.
                </div>
                <p>
                    DP registration involves not just documentation — it is a technology + compliance + operational integration project. SEBI and the depositories conduct detailed inspections of IT systems, governance structures, and compliance frameworks before granting approval.
                </p>
            </section>

            {/* What is a Depository Participant */}
            <section id="what-is-dp">
                <h2>What is a Depository Participant</h2>
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
                            <td>A DP is the agent of a depository that enables investors to hold and transact securities in electronic (demat) form</td>
                        </tr>
                        <tr>
                            <td><strong>From a compliance perspective</strong></td>
                            <td>A regulated intermediary under SEBI&apos;s Depositories and Participants Regulations — with ongoing KYC, reporting, and audit obligations</td>
                        </tr>
                        <tr>
                            <td><strong>Legally</strong></td>
                            <td>Acts as the link between the investor and the depository, facilitating dematerialisation, rematerialisation, and transfer of securities</td>
                        </tr>
                        <tr>
                            <td><strong>Client interface</strong></td>
                            <td>DPs maintain Beneficial Owner (BO) accounts for each investor — the 16-digit BO ID uniquely identifies the investor&apos;s demat account</td>
                        </tr>
                        <tr>
                            <td><strong>Regulated by</strong></td>
                            <td>SEBI (primary regulator) + the relevant Depository (NSDL/CDSL) which sets operational standards and conducts inspections</td>
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
                            <th>Law / Regulation</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Depositories Act, 1996</strong></td>
                            <td>Parent legislation; establishes legal framework for electronic holding of securities; defines depositories and participants</td>
                        </tr>
                        <tr>
                            <td><strong>SEBI (Depositories and Participants) Regulations, 2018</strong></td>
                            <td>Core regulatory framework; eligibility norms, registration process, conduct rules, penalties</td>
                        </tr>
                        <tr>
                            <td><strong>SEBI Act, 1992</strong></td>
                            <td>SEBI&apos;s overarching powers for enforcement, registration, and investor protection</td>
                        </tr>
                        <tr>
                            <td><strong>NSDL Bye-Laws and Operating Instructions</strong></td>
                            <td>Operational standards, system requirements, and compliance obligations for NSDL-affiliated DPs</td>
                        </tr>
                        <tr>
                            <td><strong>CDSL Bye-Laws and Operating Instructions</strong></td>
                            <td>Operational standards, system requirements, and compliance obligations for CDSL-affiliated DPs</td>
                        </tr>
                        <tr>
                            <td><strong>PMLA 2002 &amp; KYC Guidelines</strong></td>
                            <td>AML compliance, KYC procedures, STR/CTR filing obligations for DPs as reporting entities</td>
                        </tr>
                        <tr>
                            <td><strong>SEBI Circulars (periodic)</strong></td>
                            <td>Ongoing regulatory updates on system audits, cybersecurity, investor grievance, and account operations</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Who Needs */}
            <section id="who-needs">
                <h2>Who Needs DP Registration</h2>
                <p>
                    Any entity that wishes to provide demat account services to investors or transact securities on behalf of clients through NSDL or CDSL must obtain DP registration. Eligible applicants include:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Entity Type</th>
                            <th>Typical Use Case</th>
                            <th>Common Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Scheduled Commercial Banks</strong></td>
                            <td>Offering demat services to existing banking customers</td>
                            <td>Bank + DP combined; dominant player segment</td>
                        </tr>
                        <tr>
                            <td><strong>Stock Brokers (SEBI registered)</strong></td>
                            <td>Providing trading + demat in a single platform</td>
                            <td>Broker + DP — most common model among online platforms</td>
                        </tr>
                        <tr>
                            <td><strong>NBFCs (eligible category)</strong></td>
                            <td>Capital market service expansion</td>
                            <td>Standalone DP or combined with other services</td>
                        </tr>
                        <tr>
                            <td><strong>Custodians</strong></td>
                            <td>Institutional custody of securities</td>
                            <td>Custodian + DP for FIIs and institutional investors</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Institutions</strong></td>
                            <td>Infrastructure lending, capital market exposure</td>
                            <td>DP as ancillary service to core business</td>
                        </tr>
                        <tr>
                            <td><strong>Fintech Platforms</strong></td>
                            <td>Building investment apps for retail investors</td>
                            <td>DP registration or tie-up with existing DP</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Practical Note:</strong> Most consumer-facing investment apps (like Zerodha, Groww, Upstox) are registered as both SEBI stock brokers and Depository Participants — allowing them to offer a fully integrated trading and demat experience under one roof.
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
                            <th>Practical Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Legal Structure</strong></td>
                            <td>Company, Bank, or Financial Institution</td>
                            <td>Partnership firms and individuals are not eligible</td>
                        </tr>
                        <tr>
                            <td><strong>Net Worth</strong></td>
                            <td>As prescribed by SEBI and the Depository (category-specific)</td>
                            <td>Must be maintained continuously post-registration; declining below threshold triggers compliance action</td>
                        </tr>
                        <tr>
                            <td><strong>IT Infrastructure</strong></td>
                            <td>DPM software connectivity, secure servers, DR systems</td>
                            <td>Inspected by depository before in-principle approval; inadequate systems are the #1 cause of delays</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance Setup</strong></td>
                            <td>Dedicated Compliance Officer + internal policies (KYC, AML, grievance)</td>
                            <td>Compliance officer must be appointed before application; cannot be a shared role</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Experience</strong></td>
                            <td>Relevant experience in financial services preferred</td>
                            <td>Directors must pass &apos;fit and proper&apos; criteria under SEBI norms</td>
                        </tr>
                        <tr>
                            <td><strong>Depository Agreement</strong></td>
                            <td>In-principle approval from NSDL/CDSL required before SEBI application</td>
                            <td>Agreement with the depository sets operational and compliance standards</td>
                        </tr>
                        <tr>
                            <td><strong>Professional Indemnity Insurance</strong></td>
                            <td>Required as per SEBI norms</td>
                            <td>Covers operational and data-related liabilities</td>
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
                            <td>Certificate of Incorporation + MCA filings</td>
                            <td>Legal existence and corporate structure verification</td>
                        </tr>
                        <tr>
                            <td>MOA &amp; AOA</td>
                            <td>Object clause verification — depository services must be within objects</td>
                        </tr>
                        <tr>
                            <td>Audited Financial Statements (latest 3 years)</td>
                            <td>Net worth assessment and financial health</td>
                        </tr>
                        <tr>
                            <td>Net Worth Certificate from CA</td>
                            <td>Certification of minimum net worth compliance</td>
                        </tr>
                        <tr>
                            <td>Board Resolution</td>
                            <td>Authorisation for DP registration application and designated signatory</td>
                        </tr>
                        <tr>
                            <td>Business Plan</td>
                            <td>Operational clarity, target market, revenue model, compliance roadmap</td>
                        </tr>
                        <tr>
                            <td>IT Infrastructure Details + System Audit Report</td>
                            <td>Technical readiness, connectivity, cybersecurity compliance</td>
                        </tr>
                        <tr>
                            <td>Compliance Officer Details + KYC of Directors</td>
                            <td>Fit and proper assessment, regulatory accountability</td>
                        </tr>
                        <tr>
                            <td>Internal Policies (KYC, AML, Grievance Redressal)</td>
                            <td>Demonstrates operational compliance framework</td>
                        </tr>
                        <tr>
                            <td>Draft DP-Client Agreement</td>
                            <td>Standard format to be reviewed by depository</td>
                        </tr>
                        <tr>
                            <td>PAN, GST Registration, and statutory documents</td>
                            <td>Standard regulatory and tax compliance</td>
                        </tr>
                        <tr>
                            <td>Manpower details (qualified staff)</td>
                            <td>Demonstrates operational capability</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Process */}
            <section id="process">
                <h2>Registration Process</h2>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Prepare Infrastructure &amp; Documentation</strong>
                        <p>Set up IT systems with DPM software connectivity to NSDL/CDSL, deploy DR/backup systems, appoint Compliance Officer, draft internal policies (KYC, AML, grievance), and compile all required documents. Infrastructure readiness is assessed before any formal application is accepted.</p>
                    </li>
                    <li>
                        <strong>Step 2: Apply to Depository (NSDL/CDSL) for In-Principle Approval</strong>
                        <p>Submit application to the chosen depository with all documents. The depository conducts a detailed due diligence — reviewing governance structure, net worth, IT systems, and compliance framework. A physical inspection of the office and IT infrastructure may be conducted. In-principle approval typically takes <strong>3–6 weeks</strong>.</p>
                    </li>
                    <li>
                        <strong>Step 3: Execute Depository Agreement</strong>
                        <p>Upon in-principle approval, execute the Participant Agreement with the depository. This agreement defines the operational standards, reporting obligations, fees payable to the depository, and the DP&apos;s responsibilities toward investors and the depository. Agreement must be executed within the validity period of in-principle approval.</p>
                    </li>
                    <li>
                        <strong>Step 4: Submit Application to SEBI</strong>
                        <p>File the SEBI registration application in the prescribed form through SEBI&apos;s online system, along with the depository in-principle approval letter, agreement, and all supporting documents. Pay the prescribed SEBI registration fee. SEBI may seek clarifications or conduct an inspection before granting approval.</p>
                    </li>
                    <li>
                        <strong>Step 5: Obtain SEBI Certificate of Registration &amp; Commence Operations</strong>
                        <p>Upon SEBI approval, a Certificate of Registration is issued. Commence operations within the prescribed timeline. Activate the DPM system, onboard the first clients, and ensure all ongoing compliance structures (audit schedule, reporting calendar, grievance mechanism) are operational from day one.</p>
                    </li>
                </ol>
                <div className="warning-box">
                    <strong>Critical:</strong> The depository in-principle approval has a defined validity period. If SEBI application is not filed within that period, the process must restart from Step 2. Ensure all documentation is complete before approaching the depository to avoid cascading delays.
                </div>
            </section>

            {/* SEBI Evaluation */}
            <section id="sebi-evaluation">
                <h2>SEBI &amp; Depository Evaluation Criteria</h2>
                <p>
                    Both SEBI and the depositories conduct multi-dimensional assessments before granting registration:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Evaluating Authority</th>
                            <th>What They Assess</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>SEBI</strong></td>
                            <td>Governance structure; internal controls; risk management systems; investor grievance mechanism; cybersecurity preparedness; directors&apos; &apos;fit and proper&apos; status</td>
                        </tr>
                        <tr>
                            <td><strong>NSDL / CDSL</strong></td>
                            <td>System compatibility with DPM software; operational readiness; trained manpower; business continuity plan; data security infrastructure; inter-depository connectivity</td>
                        </tr>
                    </tbody>
                </table>
                <blockquote className="expert-quote">
                    <p>&ldquo;Becoming a Depository Participant is not merely a registration process — it is a commitment to maintaining the integrity of India&apos;s securities market infrastructure. Regulators expect not just compliance on paper, but robust systems, accountability, and investor protection at every stage.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
            </section>

            {/* Business Model */}
            <section id="business-model">
                <h2>Business Model of a Depository Participant</h2>
                <p>
                    Understanding the DP business model is essential both for evaluating the strategic opportunity and for presenting a credible business plan during registration:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Revenue Source</th>
                            <th>Description</th>
                            <th>Nature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Account Opening Charges</td>
                            <td>One-time onboarding fee charged to clients</td>
                            <td>One-time</td>
                        </tr>
                        <tr>
                            <td>Annual Maintenance Charges (AMC)</td>
                            <td>Annual fee for maintaining the demat account</td>
                            <td>Recurring — predictable base revenue</td>
                        </tr>
                        <tr>
                            <td>Transaction Charges</td>
                            <td>Charged per debit instruction (securities sold/transferred)</td>
                            <td>Variable — scales with activity</td>
                        </tr>
                        <tr>
                            <td>Pledge / Hypothecation Charges</td>
                            <td>Fees for pledging securities against loans or margin</td>
                            <td>Transaction-based</td>
                        </tr>
                        <tr>
                            <td>Value-Added Services</td>
                            <td>SMS alerts, consolidated statements, API services</td>
                            <td>Ancillary revenue</td>
                        </tr>
                    </tbody>
                </table>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Cost Component</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Depository Charges</td>
                            <td>Fees payable to NSDL/CDSL per account and transaction</td>
                        </tr>
                        <tr>
                            <td>Technology Cost</td>
                            <td>DPM software, server infrastructure, cybersecurity systems</td>
                        </tr>
                        <tr>
                            <td>Compliance Cost</td>
                            <td>System audit, internal audit, regulatory reporting</td>
                        </tr>
                        <tr>
                            <td>Manpower Cost</td>
                            <td>Operations staff, compliance officer, technical team</td>
                        </tr>
                        <tr>
                            <td>SEBI &amp; Depository Registration Fees</td>
                            <td>One-time and annual regulatory fees</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Operational Flow */}
            <section id="operational-flow">
                <h2>Operational Flow of a Depository Participant</h2>
                <p>
                    Once registered, the day-to-day operational flow of a DP follows a structured cycle:
                </p>
                <ol className="step-timeline">
                    <li>
                        <strong>Client Onboarding (KYC + Account Opening)</strong>
                        <p>Investor submits KYC documents (PAN, Aadhaar, address proof). DP verifies and uploads to KRA (KYC Registration Agency). Demat account (BO account) is created and BO ID assigned.</p>
                    </li>
                    <li>
                        <strong>Linking with Trading Account</strong>
                        <p>If the DP is also a stock broker, the demat account is linked to the trading account for seamless settlement. Inter-DP clients can also link their demat account with any registered stock broker separately.</p>
                    </li>
                    <li>
                        <strong>Processing Transactions</strong>
                        <p>Investor submits Delivery Instruction Slips (DIS) or digital instructions for transfer, pledge, or dematerialisation. DP processes through DPM system. Transactions settle through NSDL/CDSL&apos;s electronic infrastructure.</p>
                    </li>
                    <li>
                        <strong>Periodic Statements &amp; Alerts</strong>
                        <p>DPs issue periodic consolidated account statements to investors. SMS and email alerts for transactions are mandatory. Clients can view holdings and transaction history online.</p>
                    </li>
                    <li>
                        <strong>Reporting to Depository &amp; SEBI</strong>
                        <p>DPs submit periodic returns, compliance reports, and audit findings to the depository and SEBI as per prescribed schedules. Investor grievances are tracked and resolved through SCORES.</p>
                    </li>
                </ol>
            </section>

            {/* Comparison */}
            <section id="comparison">
                <h2>DP vs Depository vs Stock Broker vs RTA</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Depository (NSDL/CDSL)</th>
                            <th>Depository Participant</th>
                            <th>Stock Broker</th>
                            <th>RTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Function</td>
                            <td>Central repository for securities</td>
                            <td>Agent — holds and transacts securities for investors</td>
                            <td>Executes buy/sell trades on exchange</td>
                            <td>Maintains issuer shareholder records</td>
                        </tr>
                        <tr>
                            <td>Client Interaction</td>
                            <td>No direct retail dealing</td>
                            <td>Direct client interface (demat accounts)</td>
                            <td>Direct client interface (trading accounts)</td>
                            <td>Limited — issuer-side</td>
                        </tr>
                        <tr>
                            <td>SEBI Registration</td>
                            <td>Yes (as Depository)</td>
                            <td>Yes (as DP)</td>
                            <td>Yes (as Stock Broker)</td>
                            <td>Yes (as RTA)</td>
                        </tr>
                        <tr>
                            <td>Revenue</td>
                            <td>Depository fees from DPs</td>
                            <td>AMC + transaction charges</td>
                            <td>Brokerage</td>
                            <td>Issuer fees</td>
                        </tr>
                        <tr>
                            <td>Can be combined?</td>
                            <td>No</td>
                            <td>Yes — with stock broker</td>
                            <td>Yes — with DP</td>
                            <td>Limited</td>
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
                            <th>Fee Component</th>
                            <th>Amount / Range</th>
                            <th>Nature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SEBI Registration Fee</td>
                            <td>As prescribed by SEBI (category-specific)</td>
                            <td>One-time, non-refundable</td>
                        </tr>
                        <tr>
                            <td>Depository Admission Fee (NSDL)</td>
                            <td>As per NSDL fee schedule</td>
                            <td>One-time</td>
                        </tr>
                        <tr>
                            <td>Depository Admission Fee (CDSL)</td>
                            <td>As per CDSL fee schedule</td>
                            <td>One-time</td>
                        </tr>
                        <tr>
                            <td>Annual Depository Fee</td>
                            <td>Applicable — varies by account volume</td>
                            <td>Recurring annually</td>
                        </tr>
                        <tr>
                            <td>IT System Setup &amp; DPM Integration</td>
                            <td>Significant one-time investment</td>
                            <td>Infrastructure cost</td>
                        </tr>
                        <tr>
                            <td>System Audit Fee</td>
                            <td>CERT-In empanelled auditor rates</td>
                            <td>Periodic (mandatory)</td>
                        </tr>
                        <tr>
                            <td>Professional / Advisory Fee</td>
                            <td>Variable based on scope</td>
                            <td>One-time for registration support</td>
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
                            <th>Stage</th>
                            <th>Estimated Duration</th>
                            <th>Key Dependencies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Application Preparation &amp; Infrastructure Setup</td>
                            <td>2–4 weeks</td>
                            <td>IT systems readiness, document compilation</td>
                        </tr>
                        <tr>
                            <td>Depository (NSDL/CDSL) Review &amp; Inspection</td>
                            <td>3–6 weeks</td>
                            <td>Infrastructure inspection outcome; due diligence</td>
                        </tr>
                        <tr>
                            <td>SEBI Application &amp; Review</td>
                            <td>4–8 weeks</td>
                            <td>SEBI scrutiny; response to queries</td>
                        </tr>
                        <tr>
                            <td><strong>Total Estimated Timeline</strong></td>
                            <td><strong>2–4 months</strong></td>
                            <td>Faster with complete documentation and ready infrastructure</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Hidden Compliance Risks */}
            <section id="hidden-risks">
                <h2>Hidden Compliance Risks</h2>
                <p>
                    Many applicants underestimate these areas — they are the most common causes of delayed registration and post-registration violations:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Risk Area</th>
                            <th>Issue</th>
                            <th>Consequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>System Audit Failure</strong></td>
                            <td>IT infrastructure not meeting SEBI/depository cybersecurity standards</td>
                            <td>Delayed activation; may require complete re-implementation</td>
                        </tr>
                        <tr>
                            <td><strong>Improper KYC Handling</strong></td>
                            <td>Incomplete KYC, missing biometrics, improper AML monitoring</td>
                            <td>PMLA non-compliance; heavy penalties from FIU-IND</td>
                        </tr>
                        <tr>
                            <td><strong>Investor Grievance Delay</strong></td>
                            <td>SCORES complaints not addressed within prescribed timelines</td>
                            <td>Direct SEBI scrutiny; escalation to regulatory action</td>
                        </tr>
                        <tr>
                            <td><strong>Net Worth Fluctuation</strong></td>
                            <td>Net worth falls below minimum threshold post-registration</td>
                            <td>Continuous eligibility requirement violated; risk of suspension</td>
                        </tr>
                        <tr>
                            <td><strong>Inadequate Documentation</strong></td>
                            <td>Missing audit trails, incomplete transaction records</td>
                            <td>Audit failure; regulatory notices</td>
                        </tr>
                        <tr>
                            <td><strong>Delayed Regulatory Reporting</strong></td>
                            <td>Late submission of periodic returns to SEBI/depository</td>
                            <td>Monetary penalties; escalating regulatory attention</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Post-Registration Compliance */}
            <section id="post-registration">
                <h2>Post-Registration Compliance</h2>
                <p>
                    DP registration is the beginning, not the end, of regulatory obligations:
                </p>
                <ul>
                    <li><strong>Minimum Net Worth:</strong> Maintain continuously as per SEBI and depository requirements. Annual CA certification required.</li>
                    <li><strong>Periodic Reporting to SEBI &amp; Depository:</strong> Submit prescribed returns — daily, monthly, quarterly, and annual — as per the compliance calendar.</li>
                    <li><strong>Internal Audit:</strong> Periodic internal audit of DP operations, KYC records, transaction processing, and investor data handling.</li>
                    <li><strong>System Audit:</strong> Mandatory periodic system audit by CERT-In empanelled auditor covering IT security, data encryption, and access controls.</li>
                    <li><strong>KYC Compliance (PMLA):</strong> Ongoing KYC updation, biometric verification, AML monitoring, and STR/CTR filing as required.</li>
                    <li><strong>Investor Grievance Redressal:</strong> Mandatory participation in SCORES; resolution within prescribed timelines; quarterly reporting on grievance status.</li>
                    <li><strong>Periodic Account Statements:</strong> Issue mandatory consolidated account statements to all clients as per SEBI regulations.</li>
                    <li><strong>SEBI &amp; Depository Inspections:</strong> Cooperate with scheduled and surprise inspections; maintain all records in prescribed format.</li>
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
