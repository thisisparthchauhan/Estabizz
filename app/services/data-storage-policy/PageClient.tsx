"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is", title: "What is Data Storage Policy" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs Compliance" },
        { id: "data-classification", title: "Data Classification Framework" },
        { id: "data-localisation", title: "Data Localisation Requirements" },
        { id: "data-retention", title: "Data Retention Rules" },
        { id: "process", title: "Implementation Process" },
        { id: "cybersecurity-controls", title: "Cybersecurity Controls" },
        { id: "third-party-cloud", title: "Third-Party & Cloud Compliance" },
        { id: "compliance-checklist", title: "Compliance Checklist" },
        { id: "fees", title: "Fees & Costs" },
        { id: "timeline", title: "Timeline" },
        { id: "storage-vs-protection", title: "Storage Policy vs Protection Policy" },
        { id: "post-compliance", title: "Post-Compliance Requirements" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "Is Data Storage Policy mandatory in India?",
            a: "Yes, it is mandatory for regulated entities handling financial, personal, or sensitive data. RBI mandates data storage and localisation compliance for payment system operators. The IT Act 2000 imposes obligations on all entities handling sensitive personal data. DPDP Act governs personal data processing. SEBI, IRDAI, and CERT-In have additional sector-specific requirements."
        },
        {
            q: "Who regulates data storage in India?",
            a: "Multiple regulators govern data storage: RBI (payment data localisation and audit norms), MeitY/IT Act (general data protection and cybersecurity), SEBI (investor data protection), IRDAI (policyholder data security), and CERT-In (incident reporting, log retention for minimum 180 days). Non-compliance with any of these authorities carries independent penalties."
        },
        {
            q: "What is data localisation and who must comply?",
            a: "Data localisation means storing certain types of data on servers physically located within India. RBI mandates that all payment transaction data must be stored only in India (since 2018 circular). This applies to payment aggregators, payment gateways, system operators, and fintechs processing payment data. For other categories of data, localisation may be required depending on sector-specific regulations."
        },
        {
            q: "Can I use AWS or Azure for data storage and still comply with Indian regulations?",
            a: "Yes — using international cloud providers like AWS or Azure does not automatically violate compliance, provided India-based server regions are selected. AWS Mumbai, Azure West India, and Google Cloud Mumbai are commonly used for regulatory-compliant storage. What matters is server location, unrestricted regulator access, and data sovereignty — not the brand of cloud provider."
        },
        {
            q: "What is sensitive personal data under Indian law?",
            a: "Sensitive Personal Data (SPDI) under the IT (Amendment) Rules includes: passwords, financial data (bank account/card numbers), physical/physiological/mental health data, sexual orientation, medical records, and biometric data. SPDI requires enhanced protection — stricter access controls, encryption, and explicit consent for collection and processing."
        },
        {
            q: "How long must financial transaction data be retained?",
            a: "Financial transaction data retention periods vary by sector: RBI-regulated entities generally retain payment records for 5–10 years. KYC records must be maintained for 5 years post-relationship termination under PMLA. System logs must be retained for minimum 180 days under CERT-In directions. Audit logs must be retained as per the specific regulator's requirement. Deleting data before the retention period ends is itself a compliance violation."
        },
        {
            q: "What are the CERT-In directions on data storage?",
            a: "CERT-In's April 2022 directions require all service providers, intermediaries, data centres, and body corporates to: (1) Retain logs for 180 days, (2) Report cybersecurity incidents within 6 hours of detection, (3) Maintain accurate system clocks (NTP synchronisation), and (4) Preserve evidence during investigations. Non-compliance can lead to penalties under the IT Act and regulatory action."
        },
        {
            q: "What is a Data Protection Officer (DPO) and is it mandatory?",
            a: "A DPO is a designated individual responsible for overseeing an organisation's data governance framework — ensuring compliance with DPDP Act, handling data breach incidents, coordinating with regulators, and maintaining documentation. Under the DPDP Act, Significant Data Fiduciaries (as notified by the Government) are required to appoint a DPO. Even for non-SDF entities, having a designated DPO is considered best practice and is expected by regulators during audits."
        },
        {
            q: "What is the difference between Data Storage Policy and Data Protection Policy?",
            a: "Data Storage Policy governs where and how data is stored — infrastructure, retention periods, location, encryption, and access controls. Data Protection Policy governs how data is protected in terms of privacy — consent, data subject rights, processing purposes, and breach notification. Both are required: Data Storage Policy addresses regulatory infrastructure compliance (RBI, CERT-In, IT Act), while Data Protection Policy addresses privacy rights (DPDP Act)."
        },
        {
            q: "What are the penalties for data storage non-compliance in India?",
            a: "Penalties vary by regulator: Under IT Act Section 43A, compensation for failure to maintain reasonable security practices; under DPDP Act, penalties up to INR 250 crore for data breaches; RBI can impose monetary penalties on regulated entities and revoke licences; CERT-In violations under IT Act carry monetary penalties. In addition, operational restrictions, licence cancellation (for regulated entities like NBFCs and brokers), and reputational damage are significant consequences."
        },
        {
            q: "Is encryption mandatory for storing sensitive data?",
            a: "Yes. Encryption is mandatory for sensitive personal and financial data. Regulators expect AES-256 or equivalent industry-grade encryption for data at rest. Transport Layer Security (TLS 1.2 or higher) is required for data in transit. Data masking is expected for sensitive fields in non-production environments. Operating without encryption for sensitive data is a compliance violation and significantly increases regulatory and legal exposure during a data breach."
        },
        {
            q: "What is role-based access control (RBAC) and why is it required?",
            a: "RBAC is a security model where access to data and systems is granted based on a user's role — not as a default right. Regulators expect RBAC because it: (1) Limits exposure of sensitive data to only those who need it, (2) Creates audit trails showing who accessed what, (3) Prevents insider threats by restricting privileged access, (4) Enables principle of least privilege. RBAC implementation is typically reviewed during system audits and regulatory inspections."
        },
        {
            q: "How should a company handle a data breach under Indian regulations?",
            a: "Upon detecting a data breach: (1) Report to CERT-In within 6 hours under CERT-In directions, (2) Notify affected data principals under DPDP Act as required, (3) Activate the incident response plan — contain, assess, mitigate, (4) Document all actions taken, (5) Report to sector-specific regulator (RBI, SEBI, IRDAI) if a regulated entity, (6) Conduct post-incident analysis and remediation. Delayed reporting significantly increases penalties and regulatory scrutiny."
        },
        {
            q: "What due diligence is required for third-party vendors handling data?",
            a: "For third-party vendors (cloud providers, IT vendors, outsourced processors): (1) Execute a Data Processing Agreement (DPA) clearly defining data handling obligations, (2) Ensure vendor uses India-based servers where required, (3) Retain audit rights over vendor systems, (4) Include incident reporting and data breach liability clauses, (5) Conduct periodic vendor assessments, (6) Ensure vendor employees are bound by confidentiality obligations. Your organisation remains legally responsible for vendor-level lapses — regulatory accountability cannot be outsourced."
        },
        {
            q: "Is data storage compliance required from the beginning or only after scaling?",
            a: "Compliance is required from the beginning — when the first user data is collected. There is no size threshold or grace period under Indian regulations. Startups collecting user data (financial, personal, or sensitive) must implement compliant storage, access controls, and retention policies from day one. Regulators do not accept 'we are too early-stage' as a compliance defence."
        },
        {
            q: "What is over-retention and under-retention risk?",
            a: "Over-retention means storing data beyond the permitted/required period — this violates data minimisation principles under DPDP Act and exposes the company to liability if that data is breached. Under-retention means deleting data before the regulatory retention period expires — this violates RBI, PMLA, and CERT-In requirements and can lead to audit failure. Both risks require a defined retention schedule per data category."
        },
        {
            q: "Do fintech companies need to comply with RBI's data localisation norms?",
            a: "Yes. Any fintech that participates in payment transactions — including payment aggregators, payment gateways, prepaid instrument issuers, and NBFC-AA entities — must comply with RBI's 2018 circular mandating that all data related to payment systems must be stored exclusively in India. RBI conducts periodic audits of storage compliance and non-compliant entities face penalties and cancellation of authorisation."
        },
        {
            q: "What is a data flow diagram and why do regulators require it?",
            a: "A data flow diagram maps where data is collected, how it moves through systems, where it is processed and stored, who accesses it, and where backups reside. Regulators require it to assess: whether data exits India's borders, whether access is controlled, whether the flow creates compliance gaps. During inspections, regulators often ask 'can you demonstrate where your data resides at each stage?' — a clear data flow diagram answers that question immediately."
        },
        {
            q: "What is the typical cost of implementing Data Storage Policy compliance?",
            a: "Costs include: Policy drafting by compliance professionals (₹25,000–₹75,000), IT infrastructure setup for India-based storage (₹1 lakh onwards), system audit and security testing (₹50,000–₹2 lakh), and annual compliance maintenance (₹30,000–₹1 lakh). Cloud migration costs vary significantly based on existing architecture. Total first-year compliance investment for a mid-size fintech typically ranges from ₹3–10 lakh depending on system complexity."
        },
        {
            q: "How often must the Data Storage Policy be updated?",
            a: "The policy must be reviewed and updated: (1) At least annually as a governance baseline, (2) When regulatory changes occur (new RBI circular, DPDP Act notification, CERT-In directions), (3) After any significant IT infrastructure change (cloud migration, new vendor, system upgrade), (4) After any data breach or near-miss incident. A stale policy that doesn't reflect current regulatory requirements is treated as non-compliant during audits."
        },
        {
            q: "What should a robust Data Storage Policy document contain?",
            a: "A complete Data Storage Policy should include: (1) Policy objective and scope, (2) Data classification framework, (3) Storage guidelines per data type (location, encryption, format), (4) Access control mechanism (RBAC, MFA), (5) Data retention and deletion schedule per category, (6) Security controls (encryption, firewalls, IDS), (7) Incident response plan, (8) Vendor management requirements, (9) Audit and monitoring procedures, and (10) Board-level governance and DPO responsibilities. Generic templates are insufficient — regulators expect customised, operationally verified policies."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🔒", label: "Data Compliance" },
                { emoji: "🏛️", label: "RBI / IT Act" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Data Storage Policy", href: "/services/data-storage-policy" },
            ]}
            title="Data Storage Policy in India: Complete Legal Guide with RBI Rules, Compliance Steps & Penalties (2026)"
            readTime="17 min read"
            focusKeyword="Data Storage Policy in India"
            sections={sections}
            ctaTitle="Data Storage Policy Compliance"
            ctaDescription="Our compliance experts help fintechs, NBFCs, and digital platforms design and implement fully compliant Data Storage Policies — aligned with RBI, CERT-In, DPDP Act, and sector-specific regulatory requirements."
            quickFacts={[
                { label: "Key Regulators", value: "RBI, CERT-In, MeitY" },
                { label: "Primary Laws", value: "IT Act 2000, DPDP Act" },
                { label: "Payment Data", value: "Localisation Mandatory" },
                { label: "Log Retention", value: "Min 180 days (CERT-In)" },
                { label: "KYC Retention", value: "5 years post-relationship" },
                { label: "Full Compliance", value: "3–6 Weeks" },
                { label: "Expert Review", value: "✓ Verified" },
                { label: "Penalty Risk", value: "Up to ₹250 Crore" },
            ]}
            relatedArticles={[
                { title: "FEMA Compliance", href: "/fema/compliance-under-fema", category: "FEMA", description: "FEMA compliance for FDI, ODI, and cross-border transactions." },
                { title: "AIF Compliance Test Report", href: "/sebi/aif-compliance-test-report", category: "SEBI", description: "Annual compliance certification for Alternative Investment Funds." },
                { title: "Depository Participant Registration", href: "/sebi/depository-participant-sebi-registration", category: "SEBI", description: "SEBI DP registration guide for banks, brokers, and NBFCs." },
                { title: "AMFI Registration & Distribution", href: "/sebi/amfi-registration", category: "SEBI", description: "ARN registration and mutual fund distribution compliance." },
            ]}
            finalCtaTitle="Need a Compliant Data Storage Policy for Your Organisation?"
            finalCtaDescription="We design customised, audit-ready Data Storage Policies aligned with RBI, CERT-In, DPDP Act, and SEBI requirements — covering infrastructure, retention schedules, vendor management, and incident response."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    <strong>Data Storage Policy in India</strong> has become a critical compliance requirement for businesses handling financial, personal, or sensitive data. With increasing regulatory oversight from authorities such as RBI, SEBI, IRDAI, MeitY, and CERT-In, organisations are expected to maintain structured, secure, and locally compliant data storage systems.
                </p>
                <p>
                    In today&apos;s digital ecosystem, data is not just an asset — it is a <strong>regulatory responsibility</strong>. Whether you are a fintech startup, NBFC, insurance intermediary, or technology platform, adherence to data storage norms is essential to ensure operational continuity, regulatory trust, and protection from significant penalties.
                </p>
                <div className="info-box">
                    <strong>Key Regulatory Development:</strong> The Digital Personal Data Protection (DPDP) Act, 2023 alongside RBI&apos;s 2018 data localisation circular and CERT-In&apos;s 2022 directions have created a comprehensive multi-regulator framework for data storage compliance in India — making this a board-level governance priority, not just an IT function.
                </div>
                <p>
                    Data storage compliance is not a one-time implementation — it requires continuous monitoring, periodic audits, policy updates, and vendor management. Organisations that embed it into their governance framework from the beginning avoid costly remediation later.
                </p>
            </section>

            {/* What is */}
            <section id="what-is">
                <h2>What is Data Storage Policy</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Dimension</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>In simple terms</strong></td>
                            <td>A framework that defines how an organisation manages its data lifecycle — from collection and storage to access, retention, and deletion</td>
                        </tr>
                        <tr>
                            <td><strong>From a compliance perspective</strong></td>
                            <td>Ensures data is stored securely, accessible only to authorised personnel, retained for defined periods, and located as per regulatory requirements (localisation)</td>
                        </tr>
                        <tr>
                            <td><strong>Legally</strong></td>
                            <td>Forms part of broader data governance under IT Act 2000, RBI Data Localisation Guidelines, and the Digital Personal Data Protection Act</td>
                        </tr>
                        <tr>
                            <td><strong>For regulators</strong></td>
                            <td>Demonstrates that the organisation has implemented measurable, auditable controls over its data — not just a paper policy</td>
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
                            <th>Regulator / Law</th>
                            <th>Requirement</th>
                            <th>Applies To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>RBI (2018 Circular)</strong></td>
                            <td>Data localisation — all payment transaction data must be stored only in India; no mirror/backup abroad without RBI permission</td>
                            <td>Payment aggregators, payment gateways, PSPs, card networks</td>
                        </tr>
                        <tr>
                            <td><strong>IT Act, 2000 + SPDI Rules</strong></td>
                            <td>Reasonable security practices for sensitive personal data; liability for data breaches</td>
                            <td>All body corporates handling personal/sensitive data</td>
                        </tr>
                        <tr>
                            <td><strong>CERT-In Directions, 2022</strong></td>
                            <td>Retain logs for minimum 180 days; report incidents within 6 hours; NTP synchronisation; no VPN that anonymises logs</td>
                            <td>All service providers, intermediaries, data centres</td>
                        </tr>
                        <tr>
                            <td><strong>DPDP Act, 2023</strong></td>
                            <td>Governs personal data processing, consent, data principal rights, breach notification; DPO for Significant Data Fiduciaries</td>
                            <td>All entities processing personal data in India</td>
                        </tr>
                        <tr>
                            <td><strong>SEBI Regulations</strong></td>
                            <td>Investor data protection, secure handling of trading and account data, periodic system audits</td>
                            <td>Stock brokers, DPs, AMCs, RTAs</td>
                        </tr>
                        <tr>
                            <td><strong>IRDAI Regulations</strong></td>
                            <td>Policyholder data security, storage norms for insurance records</td>
                            <td>Insurance companies, brokers, intermediaries</td>
                        </tr>
                        <tr>
                            <td><strong>PMLA / RBI KYC Master Direction</strong></td>
                            <td>KYC records retention for 5 years post-relationship; AML monitoring data</td>
                            <td>Banks, NBFCs, DPs, investment advisors</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Who Needs */}
            <section id="who-needs">
                <h2>Who Needs Data Storage Policy Compliance</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Entity Type</th>
                            <th>Primary Data Handled</th>
                            <th>Key Regulatory Obligations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fintech Companies</td>
                            <td>Payment data, financial transactions, user KYC</td>
                            <td>RBI localisation, CERT-In logs, DPDP consent</td>
                        </tr>
                        <tr>
                            <td>NBFCs &amp; Banks</td>
                            <td>Loan data, KYC, financial transactions</td>
                            <td>RBI + PMLA + CERT-In; full stack compliance</td>
                        </tr>
                        <tr>
                            <td>Payment Aggregators / Gateways</td>
                            <td>Payment transaction data</td>
                            <td>RBI localisation — stricter than most sectors</td>
                        </tr>
                        <tr>
                            <td>Insurance Brokers / Companies</td>
                            <td>Policyholder data, health/financial records</td>
                            <td>IRDAI storage norms; DPDP sensitive data rules</td>
                        </tr>
                        <tr>
                            <td>Stock Brokers / Investment Advisors</td>
                            <td>Investor data, portfolio, trading records</td>
                            <td>SEBI regulations; system audit requirements</td>
                        </tr>
                        <tr>
                            <td>SaaS Platforms handling Indian user data</td>
                            <td>User PII, business data, logs</td>
                            <td>IT Act + DPDP + CERT-In directions</td>
                        </tr>
                        <tr>
                            <td>E-Commerce &amp; Digital Platforms</td>
                            <td>Customer data, payment details</td>
                            <td>IT Act + SPDI Rules + RBI (if payment involved)</td>
                        </tr>
                        <tr>
                            <td>Startups collecting personal data</td>
                            <td>User profiles, consent, usage data</td>
                            <td>DPDP Act from inception — no size threshold</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>No De Minimis Threshold:</strong> There is no &ldquo;too small&rdquo; exception under Indian data storage regulations. A startup with 100 users handling financial data faces the same regulatory obligations as an established NBFC. Compliance must begin from the first data point collected.
                </div>
            </section>

            {/* Data Classification */}
            <section id="data-classification">
                <h2>Data Classification Framework</h2>
                <p>
                    Proper data classification is the foundational step regulators expect before implementing any storage policy. Many audits are flagged because organisations fail to clearly define and segregate data categories.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Data Type</th>
                            <th>Examples</th>
                            <th>Regulatory Sensitivity</th>
                            <th>Required Protection Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Personal Data</strong></td>
                            <td>Name, contact details, ID proof, email</td>
                            <td>High</td>
                            <td>Access controls; consent-based processing; retention limits</td>
                        </tr>
                        <tr>
                            <td><strong>Sensitive Personal Data (SPDI)</strong></td>
                            <td>Financial data, passwords, biometrics, health records</td>
                            <td>Very High</td>
                            <td>Encryption mandatory; strict access controls; explicit consent</td>
                        </tr>
                        <tr>
                            <td><strong>Financial / Payment Data</strong></td>
                            <td>Bank account details, card numbers, transaction records</td>
                            <td>Critical</td>
                            <td>RBI localisation; AES-256 encryption; restricted access; long retention</td>
                        </tr>
                        <tr>
                            <td><strong>System Logs</strong></td>
                            <td>User activity logs, IP logs, access logs</td>
                            <td>Mandatory retention</td>
                            <td>Minimum 180 days (CERT-In); tamper-proof; audit trail</td>
                        </tr>
                        <tr>
                            <td><strong>KYC Data</strong></td>
                            <td>PAN, Aadhaar, address proof, video KYC</td>
                            <td>Very High</td>
                            <td>PMLA: 5 years post-relationship; encrypted storage; access log</td>
                        </tr>
                        <tr>
                            <td><strong>Internal Business Data</strong></td>
                            <td>Operational data, internal communications</td>
                            <td>Medium</td>
                            <td>Standard access controls; backup systems</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Data Localisation */}
            <section id="data-localisation">
                <h2>Data Localisation Requirements</h2>
                <p>
                    Data localisation is not merely about server location — regulators care about <strong>regulatory accessibility</strong> and <strong>data sovereignty</strong>.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Regulator</th>
                            <th>Localisation Requirement</th>
                            <th>Cross-Border Transfer Permitted?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>RBI</strong></td>
                            <td>All payment system data must be stored <em>only</em> in India; primary storage in India</td>
                            <td>No — for payment data; even backup/mirror abroad is prohibited without RBI permission</td>
                        </tr>
                        <tr>
                            <td><strong>DPDP Act</strong></td>
                            <td>Personal data of Indian residents; cross-border transfer only to notified countries/territories</td>
                            <td>Conditional — only to countries approved by Central Government</td>
                        </tr>
                        <tr>
                            <td><strong>IRDAI</strong></td>
                            <td>Policyholder data must be stored in India</td>
                            <td>Restricted</td>
                        </tr>
                        <tr>
                            <td><strong>SEBI</strong></td>
                            <td>Investor data and trading records must be accessible to SEBI at all times</td>
                            <td>With restrictions; unrestricted regulator access is paramount</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Common Misunderstanding:</strong> Using an international cloud provider (AWS, Azure, GCP) does not automatically violate localisation compliance — what matters is <em>which server region</em> is selected. AWS Mumbai, Azure West India, or Google Cloud Mumbai are all India-based and compliant. The violation occurs when India-region is not selected, or when data mirrors are stored internationally without approval.
                </div>
            </section>

            {/* Data Retention */}
            <section id="data-retention">
                <h2>Data Retention Rules</h2>
                <p>
                    Both deleting data too early (under-retention) and keeping it indefinitely (over-retention) carry regulatory risk. Retention periods vary by sector:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Data Type</th>
                            <th>Mandatory Retention Period</th>
                            <th>Governing Authority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Financial Transactions</td>
                            <td>5–10 years (varies by sector)</td>
                            <td>RBI, Companies Act, IT Act</td>
                        </tr>
                        <tr>
                            <td>KYC Records</td>
                            <td>5 years post-relationship termination</td>
                            <td>PMLA 2002, RBI KYC Master Direction</td>
                        </tr>
                        <tr>
                            <td>System / Access Logs</td>
                            <td>Minimum 180 days</td>
                            <td>CERT-In Directions, 2022</td>
                        </tr>
                        <tr>
                            <td>Audit Logs</td>
                            <td>As per specific regulator requirement</td>
                            <td>SEBI, RBI, IRDAI (sector-specific)</td>
                        </tr>
                        <tr>
                            <td>Customer Personal Data</td>
                            <td>Duration of consent / business relationship</td>
                            <td>DPDP Act — data minimisation principle</td>
                        </tr>
                        <tr>
                            <td>Insurance Records</td>
                            <td>Throughout policy + specified period post-expiry</td>
                            <td>IRDAI</td>
                        </tr>
                        <tr>
                            <td>Trading &amp; Demat Records</td>
                            <td>5 years minimum</td>
                            <td>SEBI Regulations</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Implementation Process */}
            <section id="process">
                <h2>Implementation Process</h2>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Identify &amp; Inventory All Data</strong>
                        <p>Map every type of data your organisation collects — user data, financial records, system logs, vendor data. Understand the source, purpose, and sensitivity of each category before designing any storage architecture.</p>
                    </li>
                    <li>
                        <strong>Step 2: Classify Data by Sensitivity &amp; Regulatory Category</strong>
                        <p>Apply the data classification framework — Personal, SPDI, Financial, System Logs, KYC. Each category carries different regulatory obligations, retention periods, and encryption requirements. Classification must be documented formally.</p>
                    </li>
                    <li>
                        <strong>Step 3: Design Compliant Storage Architecture</strong>
                        <p>Select India-based server infrastructure (where required under RBI/IRDAI localisation norms). Map data flow clearly — from collection point through processing, storage, backup, and eventual deletion. Ensure architecture diagram is documented and reviewable by regulators.</p>
                    </li>
                    <li>
                        <strong>Step 4: Implement Security Controls</strong>
                        <p>Deploy AES-256 encryption for data at rest; TLS 1.2+ for data in transit; RBAC for access management; MFA for privileged access; data masking for sensitive fields in non-production environments; intrusion detection systems; and log management with 180-day retention.</p>
                    </li>
                    <li>
                        <strong>Step 5: Draft &amp; Formalise Internal Data Storage Policy</strong>
                        <p>Document the policy covering: scope, data classification, storage guidelines, retention schedule, access controls, incident response, vendor management, and audit procedures. Have the policy reviewed by legal/compliance and approved at the Board level.</p>
                    </li>
                    <li>
                        <strong>Step 6: Conduct System Audit &amp; Security Testing</strong>
                        <p>Conduct an internal compliance audit and, where required by regulators, engage a CERT-In empanelled auditor for external system audit. Test incident response mechanisms, backup and recovery procedures, and access control effectiveness.</p>
                    </li>
                    <li>
                        <strong>Step 7: Establish Ongoing Compliance &amp; Monitoring</strong>
                        <p>Set up continuous monitoring — log review, access monitoring, vulnerability scanning. Create a compliance calendar for periodic audits, policy reviews, and regulatory reporting. Assign ownership to a DPO or compliance officer. Train all employees with data access on storage and security obligations.</p>
                    </li>
                </ol>
            </section>

            {/* Cybersecurity Controls */}
            <section id="cybersecurity-controls">
                <h2>Cybersecurity Controls Required</h2>
                <p>
                    Regulators now focus heavily on <strong>cyber resilience</strong> — not just storage location. A compliant data storage system must include:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Control</th>
                            <th>Description</th>
                            <th>Regulatory Expectation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Encryption (at rest &amp; in transit)</strong></td>
                            <td>AES-256 for stored data; TLS 1.2+ for transmission</td>
                            <td>Mandatory for SPDI and financial data</td>
                        </tr>
                        <tr>
                            <td><strong>Role-Based Access Control (RBAC)</strong></td>
                            <td>Data access restricted to roles that need it; approval hierarchy</td>
                            <td>Expected by all sector regulators</td>
                        </tr>
                        <tr>
                            <td><strong>Multi-Factor Authentication (MFA)</strong></td>
                            <td>Second factor required for privileged access to sensitive systems</td>
                            <td>Expected for critical systems; CERT-In aligned</td>
                        </tr>
                        <tr>
                            <td><strong>Data Masking</strong></td>
                            <td>Sensitive fields masked in non-production/testing environments</td>
                            <td>Prevents sensitive data exposure in dev/test workflows</td>
                        </tr>
                        <tr>
                            <td><strong>Regular Vulnerability Assessments</strong></td>
                            <td>Periodic VAPT (Vulnerability Assessment &amp; Penetration Testing)</td>
                            <td>Mandatory for RBI-regulated entities; best practice for all</td>
                        </tr>
                        <tr>
                            <td><strong>Intrusion Detection Systems (IDS)</strong></td>
                            <td>Real-time monitoring for unauthorised access or anomalous patterns</td>
                            <td>Required for critical infrastructure; CERT-In aligned</td>
                        </tr>
                        <tr>
                            <td><strong>Log Management &amp; Audit Trails</strong></td>
                            <td>All access events logged; 180-day retention; tamper-proof</td>
                            <td>Mandatory under CERT-In 2022 directions</td>
                        </tr>
                        <tr>
                            <td><strong>Incident Response Mechanism</strong></td>
                            <td>Documented plan for breach identification, containment, reporting</td>
                            <td>Required under CERT-In; mandatory reporting within 6 hours</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Third Party Cloud */}
            <section id="third-party-cloud">
                <h2>Third-Party &amp; Cloud Vendor Compliance</h2>
                <p>
                    Many organisations fail compliance due to <strong>vendor-level lapses</strong>, not internal system failures. When using cloud providers or third-party data processors, the following obligations apply:
                </p>
                <ul>
                    <li><strong>Data Processing Agreement (DPA):</strong> Execute a formal DPA defining the vendor&apos;s obligations — data handling, security measures, breach notification, and liability. Generic vendor terms are insufficient for regulatory compliance.</li>
                    <li><strong>India-Based Server Confirmation:</strong> Obtain written confirmation from the vendor of India-based server regions, especially for RBI-regulated payment data. AWS, Azure, and GCP all offer India regions — ensure they are explicitly selected.</li>
                    <li><strong>Audit Rights:</strong> Retain contractual rights to audit vendor systems or receive independent audit certifications (ISO 27001, SOC 2). Regulators expect you to be able to demonstrate vendor compliance during inspections.</li>
                    <li><strong>Incident Reporting Clauses:</strong> Ensure vendor must notify you within hours of any data breach or security incident — enabling timely CERT-In reporting by your organisation.</li>
                    <li><strong>Data Breach Liability:</strong> Clearly define liability allocation for data breaches arising from vendor-side failures. Note: your organisation remains the primary regulatory accountable party regardless of vendor liability.</li>
                    <li><strong>Sub-Processor Restrictions:</strong> Include clauses restricting the vendor from passing your data to sub-processors without your written approval — preventing uncontrolled data flows.</li>
                </ul>
                <div className="warning-box">
                    <strong>Regulatory Accountability:</strong> Your organisation is legally responsible for data handling outcomes even when a third-party vendor is at fault. &ldquo;Our vendor failed&rdquo; is not an accepted defence under Indian regulations — you are expected to conduct due diligence and maintain oversight of all data processors.
                </div>
            </section>

            {/* Compliance Checklist */}
            <section id="compliance-checklist">
                <h2>Compliance Checklist</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Area</th>
                            <th>Verification Required</th>
                            <th>Status to Confirm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data Classification</td>
                            <td>All data types classified by sensitivity and regulatory category</td>
                            <td>Documented and approved</td>
                        </tr>
                        <tr>
                            <td>India-Based Storage</td>
                            <td>Localisation compliance verified for payment/regulated data</td>
                            <td>Server location confirmed in writing</td>
                        </tr>
                        <tr>
                            <td>Encryption</td>
                            <td>AES-256 at rest; TLS 1.2+ in transit</td>
                            <td>Implemented and tested</td>
                        </tr>
                        <tr>
                            <td>Access Control</td>
                            <td>RBAC defined; MFA for privileged access</td>
                            <td>Deployed and verified</td>
                        </tr>
                        <tr>
                            <td>Audit Logs</td>
                            <td>Enabled across all systems; minimum 180-day retention</td>
                            <td>Logs accessible and tamper-proof</td>
                        </tr>
                        <tr>
                            <td>Retention Policy</td>
                            <td>Defined retention schedule per data category</td>
                            <td>Automated deletion/archival configured</td>
                        </tr>
                        <tr>
                            <td>Vendor Agreements</td>
                            <td>DPAs executed; audit rights; breach notification clauses</td>
                            <td>All vendors covered</td>
                        </tr>
                        <tr>
                            <td>Incident Response</td>
                            <td>Plan documented; CERT-In reporting mechanism ready</td>
                            <td>Tested and operational</td>
                        </tr>
                        <tr>
                            <td>Data Storage Policy Document</td>
                            <td>Comprehensive, customised, Board-approved</td>
                            <td>Current version in force</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Fees */}
            <section id="fees">
                <h2>Fees &amp; Costs</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Estimated Cost</th>
                            <th>Nature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Policy Drafting (legal/compliance)</td>
                            <td>₹25,000 – ₹75,000</td>
                            <td>One-time</td>
                        </tr>
                        <tr>
                            <td>IT Infrastructure Setup (India-based)</td>
                            <td>₹1 lakh onwards</td>
                            <td>One-time; varies by scale</td>
                        </tr>
                        <tr>
                            <td>System Audit &amp; Security Testing (VAPT)</td>
                            <td>₹50,000 – ₹2 lakh</td>
                            <td>Periodic (at least annual)</td>
                        </tr>
                        <tr>
                            <td>Annual Compliance Maintenance</td>
                            <td>₹30,000 – ₹1 lakh</td>
                            <td>Recurring annually</td>
                        </tr>
                        <tr>
                            <td>Government / Regulatory Filing Fee</td>
                            <td>Generally NIL</td>
                            <td>No direct fee for policy compliance (unlike registrations)</td>
                        </tr>
                        <tr>
                            <td>Cloud / Server Infrastructure</td>
                            <td>Variable (usage-based)</td>
                            <td>Ongoing operating cost</td>
                        </tr>
                        <tr>
                            <td>DPO Appointment (if required)</td>
                            <td>Variable</td>
                            <td>Internal hire or outsourced DPO service</td>
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
                            <th>Timeline</th>
                            <th>Dependencies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data Classification &amp; Inventory</td>
                            <td>3–5 days</td>
                            <td>Access to existing systems and data maps</td>
                        </tr>
                        <tr>
                            <td>Policy Drafting &amp; Board Approval</td>
                            <td>5–7 working days</td>
                            <td>Input from IT, legal, and management</td>
                        </tr>
                        <tr>
                            <td>IT Infrastructure Setup &amp; Cloud Migration</td>
                            <td>2–4 weeks</td>
                            <td>Scale of migration; vendor timelines</td>
                        </tr>
                        <tr>
                            <td>Security Controls Implementation</td>
                            <td>1–2 weeks</td>
                            <td>Encryption deployment; RBAC configuration</td>
                        </tr>
                        <tr>
                            <td>Audit &amp; Testing (internal + external)</td>
                            <td>1–2 weeks</td>
                            <td>Auditor availability; finding remediation</td>
                        </tr>
                        <tr>
                            <td><strong>Full Compliance Readiness</strong></td>
                            <td><strong>3–6 weeks total</strong></td>
                            <td>Faster if cloud-based and starting with new systems</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Storage vs Protection */}
            <section id="storage-vs-protection">
                <h2>Data Storage Policy vs Data Protection Policy</h2>
                <p>
                    These are distinct — but complementary — compliance requirements. Many organisations conflate them, leading to gaps in one or both:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Data Storage Policy</th>
                            <th>Data Protection Policy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Focus</td>
                            <td>Where and how data is stored, retained, and deleted</td>
                            <td>How personal data is processed, protected, and privacy rights upheld</td>
                        </tr>
                        <tr>
                            <td>Core Questions</td>
                            <td>Where is data stored? For how long? Who can access it?</td>
                            <td>What data is collected? With whose consent? What rights do data principals have?</td>
                        </tr>
                        <tr>
                            <td>Governing Law</td>
                            <td>RBI Guidelines, IT Act, CERT-In Directions</td>
                            <td>DPDP Act, SPDI Rules under IT Act</td>
                        </tr>
                        <tr>
                            <td>Primary Regulator</td>
                            <td>RBI, MeitY, CERT-In, SEBI, IRDAI</td>
                            <td>Data Protection Board (DPDP Act); MeitY</td>
                        </tr>
                        <tr>
                            <td>Objective</td>
                            <td>Infrastructure compliance, security, localisation</td>
                            <td>Privacy compliance, consent management, data subject rights</td>
                        </tr>
                        <tr>
                            <td>Are both required?</td>
                            <td colSpan={2}>Yes — both are mandatory. Data Storage Policy handles the infrastructure layer; Data Protection Policy handles the legal/privacy layer.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Post-Compliance */}
            <section id="post-compliance">
                <h2>Post-Compliance Requirements</h2>
                <p>
                    Data storage compliance is not a one-time implementation — it demands continuous governance:
                </p>
                <ul>
                    <li><strong>Maintain Data Access Logs:</strong> Minimum 180 days under CERT-In; longer for specific regulated data. Logs must be tamper-proof and retrievable on demand.</li>
                    <li><strong>Conduct Regular Security Audits:</strong> Internal audits periodically; external CERT-In empanelled audits for regulated entities. VAPT at least annually.</li>
                    <li><strong>Ensure Data Localisation Compliance:</strong> Verify that cloud regions are correctly configured; monitor for any inadvertent data transfers outside India.</li>
                    <li><strong>Report Incidents to CERT-In:</strong> Within 6 hours of detection. Delayed reporting significantly increases regulatory exposure.</li>
                    <li><strong>Update Policies Regularly:</strong> Review policy at least annually; update immediately when regulations change (new RBI circular, DPDP rules notification).</li>
                    <li><strong>Retain Data per Schedule:</strong> Implement automated retention management — neither early deletion nor indefinite storage. Each category follows its prescribed period.</li>
                    <li><strong>Monitor Vendor Compliance:</strong> Annual reviews of vendor DPAs; request compliance certifications; verify India-region configuration.</li>
                    <li><strong>Employee Training:</strong> Periodic training on data handling, access responsibilities, and breach reporting — human error is the leading cause of compliance failures.</li>
                </ul>
                <blockquote className="expert-quote">
                    <p>&ldquo;Data governance today is no longer optional — it is a regulatory cornerstone. Organisations that proactively align their storage practices with Indian compliance frameworks will not only avoid penalties but also build long-term institutional credibility with regulators, investors, and customers.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
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
