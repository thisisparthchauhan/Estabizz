'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function PPIRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'PPI Registration in India',
      content: `PPI Registration in India is the regulatory authorisation granted by the Reserve Bank of India (RBI) to entities intending to issue and operate Prepaid Payment Instruments (PPIs) such as digital wallets, prepaid cards, gift instruments, and mass transit cards.

The framework governing PPI Registration in India is laid down under the Master Directions on Prepaid Payment Instruments, 2021, as updated up to December 27, 2024. These Directions are issued under Section 18 read with Section 10(2) of the Payment and Settlement Systems Act, 2007.

No entity is permitted to set up or operate a payment system involving PPIs without prior approval or authorisation from RBI.`
    },
    {
      id: 'legal-framework',
      title: 'Legal Framework Governing PPI Registration in India',
      content: `• Governing Legislation — Payment and Settlement Systems Act, 2007
• Regulatory Authority — RBI – Department of Payment and Settlement Systems (DPSS)
• Applicable Framework — Master Directions on Prepaid Payment Instruments, 2021 (Updated 2024)
• Nature of Authorisation — Mandatory prior approval before commencement

The Master Directions provide a consolidated regulatory structure covering eligibility, capital, issuance norms, escrow safeguards, interoperability, customer protection, and reporting.`
    },
    {
      id: 'what-are-ppis',
      title: 'What Are Prepaid Payment Instruments?',
      content: `Under the Master Directions, PPIs are instruments that facilitate:
• Purchase of goods and services
• Financial services
• Remittance facilities
• Stored value transactions

PPIs requiring RBI authorisation are classified into:

Small PPIs:
• KYC Level: Minimum details
• Outstanding Limit: ₹10,000
• Cash Withdrawal: Not permitted
• Funds Transfer: Not permitted

Full-KYC PPIs:
• KYC Level: Full KYC
• Outstanding Limit: ₹2,00,000
• Cash Withdrawal: Permitted (subject to limits)
• Funds Transfer: Permitted (subject to limits)

Closed system instruments are outside RBI's regulatory purview as they are not treated as payment systems.`
    },
    {
      id: 'who-needs',
      title: 'Who Requires PPI Registration in India?',
      content: `You require PPI Registration in India if your business model includes:
• Issuing digital wallets
• Launching prepaid cards
• Offering reloadable stored-value instruments
• Providing interoperable wallet services
• Enabling funds transfer through prepaid systems
• Operating gift PPIs or PPI-MTS

Banks and non-bank entities both require approval under the PSS Act.`
    },
    {
      id: 'eligibility-banks',
      title: 'Eligibility for Banks',
      content: `• Prior Approval — Required from RBI
• Regulatory Clearance — NOC from respective regulatory department
• Application Timeline — Within 30 days of obtaining clearance`
    },
    {
      id: 'eligibility-nonbank',
      title: 'Eligibility for Non-Bank Entities',
      content: `• Incorporation — Company registered under Companies Act
• MoA Coverage — Must include PPI issuance activity
• Initial Net Worth — Minimum ₹5 Crore
• Net Worth Within 3 Years — ₹15 Crore minimum
• FDI Compliance — As per Consolidated FDI Policy
• FATF Compliance — Must comply with RBI circulars on FATF jurisdictions

The Master Directions clearly prescribe the net worth structure and maintenance obligations.`
    },
    {
      id: 'net-worth',
      title: 'Net Worth Calculation',
      content: `Net worth must be computed as per RBI definition.

Included Components:
• Paid-up equity capital
• Compulsorily convertible preference shares
• Free reserves
• Share premium account
• Capital reserves (asset sale surplus)

Excluded Components:
• Revaluation reserves
• Accumulated losses
• Intangible assets
• Deferred revenue expenditure

Annual certification by a Chartered Accountant in prescribed format (Annex-2) is mandatory.`
    },
    {
      id: 'capital-timeline',
      title: 'Capital Requirement Timeline',
      content: `• At Application — ₹5 Crore positive net worth
• Within 3 Financial Years — ₹15 Crore
• Ongoing — Maintain ₹15 Crore at all times

Failure to maintain required net worth may result in regulatory restrictions.`
    },
    {
      id: 'process',
      title: 'Authorisation Process – Step-by-Step',
      content: `The process is structured and compliance-intensive.

• Step 1 — Submit Form A under PSS Regulations
• Step 2 — RBI Screening & Fit and Proper Verification
• Step 3 — In-Principle Approval (valid for 6 months)
• Step 4 — Submit System Audit Report (SAR)
• Step 5 — Submit Net Worth Certificate
• Step 6 — RBI Due Diligence
• Step 7 — Grant of Certificate of Authorisation (CoA)
• Step 8 — Commencement within 6 months

In-principle approval lapses automatically if SAR is not submitted within prescribed timeline.`
    },
    {
      id: 'escrow',
      title: 'Escrow Account Requirement (Critical Compliance)',
      content: `Non-bank PPI issuers must:
• Maintain escrow account with scheduled commercial bank
• Ensure daily balance covers outstanding PPI value and merchant payments
• Submit quarterly auditor certificate (Annex-5 format)
• Avoid co-mingling of funds

Permitted debits and credits to escrow are strictly regulated.`
    },
    {
      id: 'core-portion',
      title: 'Core Portion – Interest Earning Mechanism',
      content: `An exception permits earning interest on the "core portion" of escrow balances, subject to:
• Minimum one year operational history
• 26 fortnights of lowest balance calculation
• No loan or lien permitted

The computation method is defined in paragraph 12.4 of the Master Directions.`
    },
    {
      id: 'transaction-limits-small',
      title: 'Transaction Limits – Small PPIs',
      content: `• Monthly Load — ₹10,000
• Annual Load — ₹1,20,000
• Outstanding — ₹10,000
• Cash Withdrawal — Not allowed
• Funds Transfer — Not allowed`
    },
    {
      id: 'transaction-limits-fullkyc',
      title: 'Transaction Limits – Full-KYC PPIs',
      content: `• Outstanding — ₹2,00,000
• Pre-Registered Beneficiary Transfer — ₹2,00,000 per month
• Other Transfers — ₹10,000 per month
• Cash Withdrawal (Non-bank) — ₹2,000 per transaction; ₹10,000 monthly`
    },
    {
      id: 'interoperability',
      title: 'Interoperability Requirements',
      content: `For full-KYC PPIs:
• Wallet interoperability through UPI
• Card interoperability via authorised card networks
• Mandatory interoperability on acceptance infrastructure

Compliance with NPCI standards is mandatory.

For Card-Based PPIs:
• Must be affiliated with authorised card networks
• EMV Chip & PIN compliance mandatory
• Interoperability must be available both on issuing and acceptance side`
    },
    {
      id: 'kyc-aml',
      title: 'KYC and AML Compliance',
      content: `PPI Registration in India mandates:
• Compliance with RBI Master Direction on KYC
• Adherence to PMLA, 2002
• Filing Suspicious Transaction Reports (STRs)
• Maintenance of transaction logs for 10 years`
    },
    {
      id: 'security-fraud',
      title: 'Security and Fraud Risk Framework',
      content: `Mandatory safeguards include:
• Two Factor Authentication
• Risk-based transaction monitoring
• Velocity checks
• Cooling period for beneficiary addition
• SOC integration
• Cyber incident reporting to RBI and CERT-In`
    },
    {
      id: 'customer-liability',
      title: 'Customer Liability in Unauthorised Transactions',
      content: `• Issuer deficiency — Zero customer liability
• Report within 3 days — Zero customer liability
• Report within 4–7 days — Lesser of ₹10,000 or transaction value
• After 7 days — As per Board-approved policy

The burden of proof lies on the PPI issuer.`
    },
    {
      id: 'reporting',
      title: 'Reporting Requirements',
      content: `• Net Worth Certificate — Annual
• Escrow Auditor Certificate — Quarterly & Annual
• PPI Statistics — As prescribed
• Customer Grievance Report — Quarterly
• System Audit Report — Annual`
    },
    {
      id: 'validity-redemption',
      title: 'Validity and Redemption',
      content: `• Minimum validity: 1 year
• 45-day pre-expiry caution mandatory
• Non-bank issuers cannot transfer expired balance to P&L for 3 years
• Redemption must be credited to bank account`
    },
    {
      id: 'inspection-cooling',
      title: 'Inspection, Suspension and Cooling Period',
      content: `RBI may:
• Conduct inspection
• Impose additional conditions
• Withdraw authorisation
• Invoke one-year cooling period in specified cases`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes in PPI Registration in India',
      content: `• Incorrect net worth structuring
• Weak escrow monitoring systems
• Inadequate SAR documentation
• Poorly drafted Board policies
• Non-aligned technology infrastructure
• Underestimation of reporting burden`
    },
    {
      id: 'professional-structuring',
      title: 'Why Professional Structuring Improves Approval Probability',
      content: `PPI Registration in India is not merely a licensing exercise. It is a regulatory commitment to:
• Financial discipline
• Technological robustness
• Governance maturity
• Customer protection integrity

A well-structured business model, supported by compliant capital planning, audit readiness, escrow discipline, and cyber security framework significantly strengthens approval prospects.

"In a payment ecosystem built on digital trust, compliance is not a cost of doing business — it is the architecture of credibility." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'docs-corporate',
      title: 'Documentation Checklist – Corporate',
      content: `When applying under Form A (as prescribed under the PSS Regulations), RBI expects a comprehensive submission. In practice, incomplete applications are returned without processing.

• Certificate of Incorporation — Establish legal existence
• Memorandum & Articles of Association — Must cover PPI issuance activity
• Board Resolution approving application — Demonstrates governance approval
• Shareholding pattern — Ownership transparency
• Details of promoters — Fit and proper assessment
• FDI details (if applicable) — Compliance with FDI policy

The MoA must clearly authorise issuance and operation of Prepaid Payment Instruments. Generic fintech objects are not sufficient.`
    },
    {
      id: 'docs-financial',
      title: 'Documentation Checklist – Financial',
      content: `• Latest audited financial statements — Evidence of financial stability
• Net Worth Certificate (Annex-2 format) — Certified by Chartered Accountant
• Projected financial statements (3 years) — Sustainability assessment
• Capital infusion plan — Proof of future compliance with ₹15 crore requirement

For newly incorporated entities, provisional balance sheet and CA certificate are required.`
    },
    {
      id: 'docs-governance',
      title: 'Documentation Checklist – Governance & Management',
      content: `• Director Declaration (Annex-3 format) — Fit and proper compliance
• Director Identification Number (DIN) details — Statutory compliance
• Background and experience profile — Competency validation
• Criminal / regulatory proceedings disclosure — Integrity check

RBI performs independent due diligence before granting in-principle approval.`
    },
    {
      id: 'business-plan',
      title: 'Three-Year Business Plan Structure',
      content: `Although RBI does not prescribe a specific format, a serious applicant must submit a credible 3-year projection plan.

Business Model Overview should clearly explain:
• Target customer segment
• Revenue streams (MDR, interchange, service charges, float income)
• Merchant acquisition strategy
• Technology partnerships
• UPI and card network participation

Financial Projection:
• Year 1 — Conservative estimate, pilot launch, initial revenue, moderate escrow liability
• Year 2 — Growth stage, increased merchant base, scaled revenue, high escrow liability
• Year 3 — Stabilisation, mature volume, sustainable revenue, optimised escrow liability

The projection must demonstrate ability to:
• Maintain ₹15 crore net worth
• Sustain escrow balances
• Meet operational expenditure
• Invest in cybersecurity infrastructure`
    },
    {
      id: 'escrow-conditions',
      title: 'Mandatory Escrow Conditions',
      content: `As per paragraph 12 of the Master Directions:
• Escrow balance must not be lower than outstanding PPI liability at end of day
• Only permitted credits and debits allowed
• No co-mingling of funds
• Quarterly and annual auditor certification required (Annex-5 format)`
    },
    {
      id: 'escrow-credits',
      title: 'Permitted Escrow Credits',
      content: `• Customer loading amounts
• Refunds
• Settlement receipts from sponsor bank
• Transfers from RBI current account`
    },
    {
      id: 'escrow-debits',
      title: 'Permitted Escrow Debits',
      content: `• Merchant settlement
• Sponsor bank payments
• Government taxes
• Customer refunds
• Service charges at predetermined rates

Improper structuring of escrow is a frequent ground for regulatory objection.`
    },
    {
      id: 'sar-coverage',
      title: 'System Audit Report (SAR) – What It Covers',
      content: `The SAR must be submitted within 6 months of in-principle approval.

SAR Covers:
• IT infrastructure architecture
• Application security audit
• Cyber security controls
• Risk management framework
• Data localisation compliance
• Disaster Recovery (RTO / RPO readiness)
• SOC integration
• Vendor risk management

The audit must be conducted by a CERT-In empanelled auditor.`
    },
    {
      id: 'sar-deficiencies',
      title: 'Common SAR Deficiencies',
      content: `• Incomplete penetration testing
• Weak access control logs
• No documented incident response framework
• Absence of board-approved security policy
• Non-alignment with RBI outsourcing circular

A well-prepared SAR significantly improves final approval chances.`
    },
    {
      id: 'risk-management',
      title: 'Risk Management and Fraud Control Architecture',
      content: `RBI expects a robust, board-approved risk framework.

Minimum Security Controls:
• Two Factor Authentication
• Velocity monitoring
• Cooling period after beneficiary addition
• Real-time transaction alerts
• Centralised MIS
• Cyber incident reporting to RBI and CERT-In`
    },
    {
      id: 'customer-protection',
      title: 'Customer Protection Obligations',
      content: `• Grievance redressal within 30 days
• Dedicated nodal officer
• Quarterly grievance reporting (Annex-6 format)
• Transparent disclosure of fees

Failure in customer protection can attract supervisory intervention.`
    },
    {
      id: 'cooling-period',
      title: 'Regulatory Cooling Period',
      content: `A one-year cooling period applies if:
• CoA is revoked
• Authorisation is rejected
• Licence is surrendered
• Promoters attempt fresh application via new entity

This provision ensures regulatory discipline.`
    },
    {
      id: 'compliance-calendar',
      title: 'Post-Registration Compliance Calendar',
      content: `• Net Worth Certificate — Annual
• Escrow Auditor Certificate — Quarterly + Annual
• System Audit Report — Annual
• Grievance Report — Quarterly
• RBI Statistical Returns — As prescribed
• Board Policy Review — Annual minimum`
    },
    {
      id: 'strategic-considerations',
      title: 'Strategic Considerations Before Applying',
      content: `Before proceeding with PPI Registration in India, promoters should evaluate:
• Capital adequacy roadmap
• Technology ownership vs outsourcing model
• Sponsor bank alignment
• Interoperability strategy
• Regulatory reporting capability
• Escrow management discipline

This is not a light-touch authorisation. It is a regulated payment system licence.

"Regulatory approval in payments is not merely permission to transact — it is a declaration that your systems are worthy of public trust." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'final-advisory',
      title: 'Final Advisory',
      content: `PPI Registration in India is one of the most compliance-intensive fintech authorisations under RBI supervision. From capital maintenance to escrow discipline, from cyber security audits to customer liability frameworks, every layer demands structured planning.

A properly documented application supported by:
• Strong capital base
• Clean governance history
• Mature technology architecture
• Transparent business model
• Fully compliant escrow design

— greatly enhances approval prospects.

PPI Registration in India is a tightly regulated authorisation under RBI's Master Directions. It requires capital adequacy, escrow safeguarding, strict reporting discipline, and advanced risk management systems.

For fintech promoters, NBFC groups, payment aggregators, and digital platforms, understanding the regulatory depth behind PPI Registration in India is essential before submitting an application.`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is PPI Registration in India?", a: "PPI Registration in India is the authorisation granted by the Reserve Bank of India (RBI) to entities that wish to issue and operate Prepaid Payment Instruments such as digital wallets and prepaid cards under the Payment and Settlement Systems Act, 2007." },
        { q: "What is a Prepaid Payment Instrument (PPI)?", a: "A PPI is an instrument that stores monetary value and allows the holder to purchase goods or services, undertake financial transactions, or transfer funds against the stored balance." },
        { q: "Is RBI approval mandatory for issuing digital wallets in India?", a: "Yes. Any entity intending to issue PPIs that qualify as payment systems must obtain prior approval or authorisation from RBI." },
        { q: "Who regulates PPIs in India?", a: "PPIs are regulated by the Reserve Bank of India through its Department of Payment and Settlement Systems (DPSS)." },
        { q: "Are closed-loop gift cards regulated by RBI?", a: "Closed system instruments used only for purchases from the issuing entity are not treated as payment systems and do not require RBI authorisation." },
        { q: "What are the types of PPIs recognised by RBI?", a: "RBI recognises Small PPIs (minimum-detail PPIs) and Full-KYC PPIs. Specific categories such as Gift PPIs and PPIs for Mass Transit Systems are also permitted." },
        { q: "What is the difference between Small PPI and Full-KYC PPI?", a: "Small PPIs require minimum customer details and have restricted usage and lower limits. Full-KYC PPIs require complete KYC and permit higher balances, funds transfer, and cash withdrawal within prescribed limits." },
        { q: "Can PPIs be issued in physical and digital form?", a: "Yes. PPIs may be issued as cards, wallets, or other digital instruments. Paper vouchers are not permitted." },
        { q: "Can interest be paid on wallet balances?", a: "No. RBI does not permit payment of interest on PPI balances." },
        { q: "Is PPI Registration a one-time approval?", a: "Authorisation is granted on a perpetual basis, subject to continued compliance with RBI conditions." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for PPI Registration in India?", a: "Banks and non-bank companies incorporated in India may apply, subject to eligibility conditions." },
        { q: "Can an LLP apply for PPI Registration?", a: "No. Non-bank applicants must be companies incorporated under the Companies Act." },
        { q: "Can foreign companies apply directly for PPI Registration?", a: "No. The applicant must be an Indian incorporated company. FDI, if any, must comply with applicable policy." },
        { q: "Is prior regulatory clearance required before applying to RBI?", a: "If the applicant is regulated by another financial sector regulator, a No Objection Certificate from that regulator is required." },
        { q: "Is there a minimum net worth requirement for non-bank PPI issuers?", a: "Yes. A minimum positive net worth of ₹5 crore at the time of application is required." },
        { q: "What is the net worth requirement after authorisation?", a: "Non-bank PPI issuers must achieve and maintain ₹15 crore net worth within three financial years of final authorisation." },
        { q: "Can a startup fintech apply for PPI Registration?", a: "Yes, provided it meets the incorporation and net worth requirements prescribed by RBI." },
        { q: "Is PPI Registration required for companies offering payment aggregation only?", a: "If the entity issues PPIs, registration is required. Payment aggregators are regulated under a separate framework." },
        { q: "Can an NBFC automatically issue PPIs?", a: "No. Even if an entity is an NBFC, separate RBI authorisation under the PSS Act is required." },
        { q: "Is the Memorandum of Association required to include PPI activity?", a: "Yes. The MoA must specifically permit issuance and operation of PPIs." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which law is PPI Registration governed?", a: "It is governed by the Payment and Settlement Systems Act, 2007." },
        { q: "Which RBI document governs PPIs currently?", a: "The Master Directions on Prepaid Payment Instruments, 2021 (as updated)." },
        { q: "Does PMLA apply to PPI issuers?", a: "Yes. Provisions of the Prevention of Money Laundering Act, 2002 apply." },
        { q: "Are KYC norms applicable to PPI holders?", a: "Yes. KYC requirements apply based on the category of PPI issued." },
        { q: "Are PPI issuers required to file Suspicious Transaction Reports?", a: "Yes. STRs must be filed with FIU-IND." },
        { q: "How long must transaction records be maintained?", a: "Transaction logs must be maintained for at least ten years." },
        { q: "Does RBI conduct inspections of PPI issuers?", a: "Yes. RBI has powers to inspect and supervise authorised entities." },
        { q: "Are PPIs subject to interoperability requirements?", a: "Yes. Full-KYC PPIs must be interoperable through UPI or authorised card networks." },
        { q: "Are escrow arrangements mandatory for non-bank PPI issuers?", a: "Yes. Outstanding balances must be maintained in an escrow account with a scheduled commercial bank." },
        { q: "Can escrow funds be used freely by the company?", a: "No. Only specific debits and credits permitted under RBI Directions are allowed." }
      ]
    },
    {
      category: 'Registration / Application Process',
      faqs: [
        { q: "How do I apply for PPI Registration in India?", a: "Application must be made in Form A under the Payment and Settlement Systems Regulations." },
        { q: "Where is the application submitted?", a: "To the Department of Payment and Settlement Systems (DPSS), RBI." },
        { q: "What is in-principle approval?", a: "It is provisional approval granted by RBI, valid for six months, subject to compliance conditions." },
        { q: "What happens after in-principle approval?", a: "The applicant must submit a System Audit Report and net worth certificate within the validity period." },
        { q: "What is a System Audit Report (SAR)?", a: "It is an audit of the applicant's IT systems and security framework conducted by a qualified auditor." },
        { q: "Can in-principle approval lapse?", a: "Yes, if conditions are not fulfilled within prescribed timelines." },
        { q: "Is extension possible for SAR submission?", a: "A one-time extension may be requested with valid reasons." },
        { q: "When is final Certificate of Authorisation granted?", a: "After RBI is satisfied with compliance, audit, and due diligence." },
        { q: "Must operations begin within a certain period?", a: "Yes. Business must commence within six months of final authorisation." },
        { q: "What happens if business does not commence?", a: "The authorisation may lapse automatically." }
      ]
    },
    {
      category: 'Capital, Net Worth & Infrastructure',
      faqs: [
        { q: "What constitutes net worth for PPI Registration?", a: "Paid-up equity, compulsorily convertible preference shares, free reserves, share premium, and certain capital reserves, adjusted for specified deductions." },
        { q: "Are revaluation reserves included in net worth?", a: "No." },
        { q: "Is annual net worth certification required?", a: "Yes. A Chartered Accountant certificate must be submitted annually." },
        { q: "Is there a requirement to maintain escrow balance daily?", a: "Yes. Escrow balance must not fall below outstanding liability at end of day." },
        { q: "Can interest be earned on escrow funds?", a: "Interest may be earned only on the 'core portion' under specified conditions." },
        { q: "Can loans be taken against escrow funds?", a: "No." },
        { q: "Is a separate escrow account required for each product?", a: "The Master Directions allow one or more escrow accounts, subject to conditions." },
        { q: "Are disaster recovery systems required?", a: "Yes. PPI issuers must maintain appropriate disaster recovery capability." },
        { q: "Is SOC integration required?", a: "Yes. Centralised monitoring of security events is required." },
        { q: "Are cyber incidents reportable to RBI?", a: "Yes, immediately." }
      ]
    },
    {
      category: 'Documentation & Declarations',
      faqs: [
        { q: "Is a director declaration required?", a: "Yes. Directors must submit declaration and undertaking in prescribed format (Annex-3)." },
        { q: "Is a CA certificate required at application stage?", a: "Yes, to certify compliance with net worth requirement (Annex-2)." },
        { q: "Are audited financial statements required?", a: "Yes." },
        { q: "Must FDI details be disclosed?", a: "Yes." },
        { q: "Are details of promoters required?", a: "Yes, for fit and proper assessment." },
        { q: "Is Board approval mandatory before applying?", a: "Yes." },
        { q: "Are co-branding arrangements allowed?", a: "Yes, subject to compliance and approval conditions." },
        { q: "Is separate approval required for co-branded PPIs?", a: "Yes, for non-bank issuers." },
        { q: "Must brand name be disclosed to RBI?", a: "Yes." },
        { q: "Is outsourcing permitted?", a: "Yes, subject to RBI outsourcing guidelines." }
      ]
    },
    {
      category: 'Timelines & Fees',
      faqs: [
        { q: "How long does RBI take to grant approval?", a: "There is no fixed statutory timeline. It depends on completeness and compliance." },
        { q: "Is there an application fee?", a: "Yes, prescribed under the Regulations." },
        { q: "How long is in-principle approval valid?", a: "Six months." },
        { q: "Can RBI reject an application?", a: "Yes, if eligibility or compliance requirements are not met." },
        { q: "Is there a cooling period after rejection?", a: "Yes. A one-year cooling period may apply in specified situations." },
        { q: "Is renewal required periodically?", a: "Authorisation is perpetual but subject to compliance and regulatory oversight." },
        { q: "Can RBI withdraw authorisation?", a: "Yes, for non-compliance." },
        { q: "Are reporting timelines strictly enforced?", a: "Yes." },
        { q: "Are quarterly returns mandatory?", a: "Yes, including grievance and escrow reports." },
        { q: "Is late submission penalised?", a: "Regulatory action may follow." }
      ]
    },
    {
      category: 'Post-Registration Compliance',
      faqs: [
        { q: "Are annual system audits mandatory?", a: "Yes." },
        { q: "Is customer grievance reporting required?", a: "Yes, quarterly." },
        { q: "Must fees be transparently disclosed?", a: "Yes." },
        { q: "Are customer alerts mandatory?", a: "Yes, for transactions." },
        { q: "Is 2FA required for transactions?", a: "Yes, except certain specified categories." },
        { q: "Can Small PPIs be converted to Full-KYC PPIs?", a: "Yes, after completing KYC." },
        { q: "Must inactive PPIs be flagged?", a: "Yes, after one year of inactivity." },
        { q: "Is redemption permitted after expiry?", a: "Yes, subject to rules." },
        { q: "Can expired balances be transferred to P&L?", a: "Non-bank issuers cannot do so for at least three years." },
        { q: "Is interoperability mandatory for Full-KYC PPIs?", a: "Yes." }
      ]
    },
    {
      category: 'Operational Restrictions & Permissions',
      faqs: [
        { q: "Can Small PPIs allow cash withdrawal?", a: "No." },
        { q: "What is the maximum balance in Full-KYC PPI?", a: "₹2,00,000." },
        { q: "What is the maximum balance in Small PPI?", a: "₹10,000." },
        { q: "Are cross-border transactions allowed?", a: "Limited outward and inward use is permitted under specified conditions." },
        { q: "Can PPIs be used under LRS?", a: "No." },
        { q: "Are Gift PPIs reloadable?", a: "No." },
        { q: "Are PPI-MTS instruments subject to validity limits?", a: "They may have perpetual validity." },
        { q: "Can funds be transferred from Small PPIs?", a: "No." },
        { q: "Is pre-registration of beneficiaries required?", a: "Yes, for higher transfer limits." },
        { q: "Is cash loading permitted?", a: "Yes, subject to limits." }
      ]
    },
    {
      category: 'Penalties, Cancellation & Regulatory Action',
      faqs: [
        { q: "Can RBI revoke CoA for escrow violations?", a: "Yes." },
        { q: "What happens if net worth falls below requirement?", a: "Regulatory restrictions may be imposed." },
        { q: "Can directors be held responsible?", a: "Fit and proper standards apply." },
        { q: "Is customer liability framework mandatory?", a: "Yes." },
        { q: "Is customer compensation required in unauthorised transactions?", a: "Yes, as per prescribed liability framework." },
        { q: "Can RBI impose additional conditions post approval?", a: "Yes." },
        { q: "Is cooling period applicable after surrender?", a: "Yes." },
        { q: "Can RBI inspect without prior notice?", a: "RBI has inspection powers under the Act." },
        { q: "Is non-compliance reportable to Board?", a: "Yes." },
        { q: "Can operations continue during regulatory review?", a: "Subject to RBI's direction." }
      ]
    },
    {
      category: 'Practical & Scenario-Based Questions',
      faqs: [
        { q: "Can a company operate wallet services while application is pending?", a: "No." },
        { q: "Can escrow account be shifted to another bank?", a: "Yes, with prior intimation and safeguards." },
        { q: "Can merchant payments be co-mingled with other funds?", a: "No." },
        { q: "Are agents allowed to load wallets?", a: "Yes, subject to due diligence and board policy." },
        { q: "Is RBI approval needed for major product changes?", a: "Yes, major changes must be communicated." },
        { q: "Can PPIs be issued to foreign nationals visiting India?", a: "Yes, under specified conditions." },
        { q: "Are grievance timelines prescribed?", a: "Yes, complaints should be resolved preferably within 30 days." },
        { q: "Is compliance with card network rules mandatory?", a: "Yes, where cards are issued." },
        { q: "Can escrow shortfall be adjusted later?", a: "No. Shortfall must be immediately reported." },
        { q: "Does RBI require daily reconciliation?", a: "Yes, adequate monitoring is required." },
        { q: "Can promoters reapply through new company after rejection?", a: "Cooling period restrictions may apply." },
        { q: "Is Board-approved policy required for issuance categories?", a: "Yes." },
        { q: "Are merchant lists required to be submitted to bank?", a: "Yes, for escrow monitoring." },
        { q: "Can PPIs be used for peer-to-peer transfers?", a: "Only Full-KYC PPIs within prescribed limits." },
        { q: "Is reporting to CERT-In mandatory in cyber incidents?", a: "Yes." },
        { q: "Is pre-funding of overseas merchants allowed?", a: "No." },
        { q: "Can PPI issuer set its own internal transaction caps?", a: "Yes, within regulatory ceilings." },
        { q: "Are audit certificates required quarterly?", a: "Yes, for escrow balances." },
        { q: "Can RBI place restrictions without cancelling licence?", a: "Yes." },
        { q: "Is continuous compliance essential after registration?", a: "Yes. PPI Registration in India is an ongoing regulatory responsibility, not a one-time approval." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={['RBI', 'PPI', 'Master Directions 2021 (Updated 2024)', 'PSS Act 2007', 'Digital Wallet', 'Prepaid Card']}
      breadcrumb={['Home', 'RBI Services', 'PPI Registration']}
      title="PPI Registration in India"
      readTime="22 min read"
      focusKeyword="PPI Registration in India"
      sections={sections}
      ctaTitle="Ready to Launch Your Digital Wallet or Prepaid Card?"
      ctaDescription="Get expert guidance on ₹5 Cr → ₹15 Cr net worth structuring, Form A application filing, escrow architecture, System Audit Report (SAR), interoperability planning, and end-to-end RBI Certificate of Authorisation."
      quickFacts={[
        { label: 'Regulator', value: 'Reserve Bank of India (DPSS)' },
        { label: 'Master Direction', value: 'PPI Master Directions 2021 (Updated Dec 27, 2024)' },
        { label: 'Legal Authority', value: 'PSS Act, 2007' },
        { label: 'Eligible Entity', value: 'Company (Companies Act)' },
        { label: 'Net Worth at Application', value: '₹5 Crore' },
        { label: 'Net Worth Within 3 FY', value: '₹15 Crore (ongoing)' },
        { label: 'Small PPI Limit', value: '₹10,000 outstanding' },
        { label: 'Full-KYC PPI Limit', value: '₹2,00,000 outstanding' },
        { label: 'In-Principle Validity', value: '6 months' },
        { label: 'Commencement', value: 'Within 6 months of CoA' },
        { label: 'Cooling Period', value: '1 year (specified cases)' },
        { label: 'Application Form', value: 'Form A (PSS Regulations)' }
      ]}
      relatedArticles={[
        { title: 'Payment Aggregator License', href: '/rbi/payment-aggregator-license-in-india' },
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license' },
        { title: 'NBFC SRO Registration', href: '/rbi/nbfc-sro-registration' },
        { title: 'ARC Registration in India', href: '/rbi/arc-registration-in-india' },
        { title: 'LendTech Services', href: '/rbi/lendtech-services' }
      ]}
      finalCtaTitle="Need Expert Support for PPI Authorisation?"
      finalCtaDescription="Our compliance specialists provide end-to-end PPI authorisation support — Form A preparation, net-worth audit, MoA review, escrow agreement structuring, System Audit Report co-ordination with CERT-In auditors, interoperability planning, and ongoing reporting compliance under the PPI Master Directions."
    >
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-12">
          <h2>{section.title}</h2>
          <div className="prose max-w-none">
            {section.content.split('\n\n').map((paragraph, idx) => (
              paragraph.startsWith('•') ? (
                <ul key={idx} className="list-disc pl-6">
                  {paragraph.split('\n').filter(l => l.trim()).map((item, i) => (
                    <li key={i}>{item.replace('• ', '')}</li>
                  ))}
                </ul>
              ) : (
                <p key={idx}>{paragraph}</p>
              )
            ))}
          </div>
        </section>
      ))}

      <section id="faq" className="mt-16">
        <h2>Frequently Asked Questions (120 FAQs)</h2>
        {faqGroups.map((group, idx) => (
          <div key={idx} className="mb-8">
            <h3>{group.category}</h3>
            <div className="faq-accordion">
              {group.faqs.map((faq, i) => (
                <details key={i} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div>{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
    </ServicePageLayout>
  );
}
