'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function CorporateAgentRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Corporate Agent Registration in India is the formal approval granted by the Insurance Regulatory and Development Authority of India (IRDAI) permitting a company, LLP, or other eligible entity to solicit and procure insurance business as an intermediary on behalf of insurers.

For many NBFCs, fintech companies, banks, microfinance institutions, and established corporates, Corporate Agent Registration in India offers a structured and compliant pathway to distribute insurance products while operating within the regulatory perimeter defined by IRDAI.

This guide explains the complete regulatory framework, capital requirements, documentation, process, and post-registration compliance in a clear and implementation-focused manner.`
    },
    {
      id: 'what-is-corporate-agent',
      title: 'What is Corporate Agent Registration?',
      content: `Corporate Agent Registration in India allows an entity to act as an intermediary between insurance companies and policyholders. Unlike brokers who represent customers independently, a Corporate Agent typically works with a limited number of insurers in specific lines of business.

The registration enables the entity to:
• Solicit insurance policies
• Procure insurance business
• Service insurance clients
• Earn commission as permitted under regulations

Corporate Agent Registration in India may be granted for:
• Life Insurance
• General Insurance
• Health Insurance
• A composite combination (subject to regulatory conditions)`
    },
    {
      id: 'legal-background',
      title: 'Legal Background & Regulatory Authority',
      content: `Corporate Agent Registration in India is governed by:
• The Insurance Act
• The IRDAI (Registration of Corporate Agents) Regulations, 2015 (as amended)
• Circulars and guidelines issued from time to time
• Code of conduct requirements prescribed for corporate agents

The regulator supervises licensing, compliance, inspections, renewals, and disciplinary action.`
    },
    {
      id: 'who-needs',
      title: 'Who Needs Corporate Agent Registration?',
      content: `An entity must obtain Corporate Agent Registration in India if it intends to:
• Distribute insurance products for commission
• Act as a referral-to-policy conversion channel
• Bundle insurance with lending or financial products
• Offer insurance under bancassurance or distribution arrangements

Common Applicants:
• NBFCs - Cross-sell insurance to borrowers
• Banks - Bancassurance distribution
• Fintech Companies - Embedded insurance models
• Microfinance Institutions - Credit-linked insurance
• Corporate Groups - Employee benefit solutions`
    },
    {
      id: 'eligibility-criteria',
      title: 'Eligibility Criteria',
      content: `An entity applying for Corporate Agent Registration must satisfy:

Corporate Structure:
• Must be a company, LLP, cooperative society, or other entity prescribed
• Not available for individuals (individuals apply under individual agent category)

Capital Requirements:
• Net worth: As prescribed under regulations
• Bank deposit: As specified by IRDAI

Financial Standing:
• Audited financial statements
• Clean track record (no fraud history)
• No ongoing regulatory action

Operational Readiness:
• Principal Officer appointment
• Compliance officer designation
• Training infrastructure
• Distinct business location`
    },
    {
      id: 'principal-officer',
      title: 'Principal Officer Requirement',
      content: `The Principal Officer is mandatory and must:
• Hold relevant insurance qualifications
• Meet experience standards
• Be responsible for regulatory compliance
• Oversee training and supervision
• Maintain client records and documentation

The Principal Officer serves as the regulatory interface with IRDAI and is accountable for all compliance obligations.`
    },
    {
      id: 'business-plan',
      title: 'Business Plan & Operational Model',
      content: `The business plan submitted to IRDAI must detail:

Distribution Strategy:
• Target customer segments
• Distribution channels (direct, bancassurance, fintech, etc.)
• Geographic focus areas
• Lines of business

Operational Framework:
• Staffing and training plan
• Technology infrastructure
• Compliance mechanisms
• Client service standards

Financial Projections:
• Revenue estimates
• Expense structure
• Break-even analysis
• Growth trajectory`
    },
    {
      id: 'documents-required',
      title: 'Documents Required for Registration',
      content: `Application Package must include:

Corporate Documents:
• Certificate of incorporation
• Memorandum and Articles of Association
• Board resolutions authorizing application
• List of directors and shareholders

Financial Documents:
• Audited financial statements (last 3 years)
• Bank deposit proof
• Net worth certificate
• Tax filing proof

Compliance Documents:
• Principal Officer appointment letter and qualifications
• Compliance officer appointment letter
• Training plan and infrastructure details
• Code of conduct acknowledgment
• Disclosure of any regulatory action

Other Documents:
• Business plan
• Office premises lease or ownership proof
• Insurance policy (PI insurance)
• Proposed insurance product list`
    },
    {
      id: 'registration-process',
      title: 'Registration Process & Timeline',
      content: `Step 1: Application Submission
• File complete application with all required documents
• Pay application fee to IRDAI
• Receive acknowledgment of receipt

Step 2: Initial Review (3-4 weeks)
• IRDAI screens application for completeness
• May request additional information
• Verify financial and operational readiness

Step 3: Detailed Assessment (4-6 weeks)
• Assess business model and compliance framework
• Evaluate management competence
• Review operational infrastructure

Step 4: Approval & Registration (2-4 weeks)
• Grant registration certificate
• Issue certificate validity period
• Activate regulatory account

Total Timeline: 4–8 months (typical)`
    },
    {
      id: 'capital-requirements',
      title: 'Capital & Financial Requirements',
      content: `Net Worth Requirement:
• Minimum net worth as prescribed under regulations
• Must be maintained on ongoing basis

Bank Deposit:
• 10% of minimum net worth (subject to regulatory limits)
• Deposited in scheduled bank as security
• Regulated under specific guidelines

Insurance Requirements:
• Professional Indemnity (PI) Insurance: ₹1 Crore (for corporate agents)
• Valid throughout registration period
• Renewal mandatory before expiry`
    },
    {
      id: 'fees-and-costs',
      title: 'Government Fees & Registration Cost',
      content: `Application Fee:
• ₹50,000 (non-refundable, payable at submission)

Registration Fee:
• ₹1,00,000 (payable upon approval)

Renewal Fee (every 3 years):
• ₹50,000 (renewal application)
• ₹1,00,000 (renewal registration)

Additional Costs:
• PI Insurance premium: ₹50,000 - ₹2,00,000 annually (varies by insurer)
• Bank deposit (non-interest bearing): 10% of net worth
• Training and infrastructure setup`
    },
    {
      id: 'registration-certificate',
      title: 'Registration Certificate & Validity',
      content: `The registration certificate contains:
• Registration number (unique identifier)
• Name of corporate agent
• Principal Officer name and qualification
• Approved lines of business (Life, General, Health)
• Validity period (typically 3 years)
• Conditions and restrictions

Validity:
• Initial validity: 3 years from date of registration
• Renewal required: Before expiry date
• Non-renewal leads to cancellation`
    },
    {
      id: 'commission-framework',
      title: 'Commission Framework & Earnings',
      content: `Commission Structure:
• Commissions payable by insurers to corporate agents
• Rates determined by IRDAI guidelines
• Life Insurance: Typically 5-40% of first year premium
• General Insurance: Typically 5-20% of premium
• Health Insurance: Typically 5-15% of premium

Commission Restrictions:
• Cannot exceed IRDAI-prescribed limits
• Subject to performance and compliance standards
• Clawback provisions for lapses and fraudulent policies

Earning Potential:
• Depends on distribution volume
• Incentive structures permitted
• Renewal commissions for life insurance`
    },
    {
      id: 'post-registration-compliance',
      title: 'Post-Registration Compliance Obligations',
      content: `Ongoing Requirements:
• Maintain minimum net worth
• Renew PI Insurance annually
• File annual returns and audited statements
• Conduct mandatory employee training
• Maintain client records (5-year retention)
• Compliance with code of conduct
• Regular internal audit

Regulatory Reporting:
• Annual returns to IRDAI
• Quarterly compliance certifications
• Client complaint reporting
• Policy records submission
• Financial statement filing`
    },
    {
      id: 'compliance-calendar',
      title: 'Compliance Calendar',
      content: `Annual Obligations:
• Audited financial statements: By end of financial year
• PI Insurance renewal: Before expiry (critical)
• Training records: Monthly/quarterly certification
• Annual returns: By prescribed deadline
• Code of conduct certification: Annual attestation

Quarterly Obligations:
• Compliance certificate submission
• Client record verification
• Policy servicing report
• Grievance redressal status

Monthly Obligations:
• Client complaint logging and resolution
• Internal audits
• Training and development records

Event-Based:
• Principal Officer change notification (within 7 days)
• Compliance officer change notification
• Address/office change notification
• Insurance policy changes notification
• Regulatory action disclosure

Ongoing:
• Maintenance of client records
• Client identity verification
• Anti-fraud measures
• Code of conduct adherence`
    },
    {
      id: 'inspection-powers',
      title: 'IRDAI Inspection & Oversight',
      content: `IRDAI has the authority to:
• Conduct on-site inspections
• Verify compliance with regulations
• Examine client records and policies
• Review financial statements and transactions
• Assess Principal Officer performance
• Inspect training facilities

Inspection Procedure:
• IRDAI issues inspection notice
• On-site inspection conducted
• Inspection report issued
• Compliance timeline provided if issues found
• Follow-up inspection conducted
• Corrective action verified

Scope of Inspection:
• Compliance with regulations
• Client grievance handling
• Training and supervision
• Financial management
• Code of conduct adherence`
    },
    {
      id: 'suspension-cancellation',
      title: 'Suspension & Cancellation',
      content: `Grounds for Suspension:
• Non-compliance with regulations
• Failure to maintain minimum net worth
• Lapsed PI Insurance
• Non-filing of annual returns
• Client grievances exceeding thresholds
• Unauthorized business activities
• Code of conduct violations

Suspension Process:
• IRDAI issues show-cause notice
• Opportunity to respond provided
• Suspension order issued
• 30-day rectification period
• Reactivation upon compliance

Grounds for Cancellation:
• Repeated violations after suspension
• Insolvency or financial distress
• Withdrawal request by entity
• Non-renewal of registration
• Fraud or dishonest conduct

Cancellation Consequences:
• Loss of registration
• Cannot solicit insurance
• Penalty imposition
• Public notice
• 5-year re-application bar (typically)`
    },
    {
      id: 'penalties',
      title: 'Penalties & Enforcement',
      content: `Financial Penalties:
• Non-compliance: ₹10,000 - ₹1,00,000
• Late filing: ₹5,000 - ₹50,000
• Record maintenance failures: ₹10,000 - ₹1,00,000
• Unauthorized activities: ₹25,000 - ₹5,00,000

Serious Violations:
• Major compliance breaches: ₹5,00,000 - ₹1 Crore
• Fraudulent conduct: Cancellation + penalty
• Client fund misappropriation: Severe penalty + prosecution

Enforcement Actions:
• Cease and desist orders
• Asset freeze directives
• Suspension of distribution rights
• Appointment of custodian
• Criminal prosecution (for serious breaches)`
    },
    {
      id: 'comparison-broker-vs-agent',
      title: 'Corporate Agent vs Insurance Broker',
      content: `Key Differences:

Representation:
• Corporate Agent: Represents limited insurers
• Broker: Represents clients (customer-centric)

Authorization:
• Corporate Agent: Works on behalf of specific insurers
• Broker: Independent intermediary

Business Model:
• Corporate Agent: Commission from insurers
• Broker: Commission + customer fee structure

Client Relationship:
• Corporate Agent: Insurer-focused
• Broker: Client-focused

Regulatory Framework:
• Corporate Agent: IRDAI (Registration of Corporate Agents) Regulations, 2015
• Broker: IRDAI (Insurance Brokers) Regulations, 2018

Capital Requirements:
• Corporate Agent: Lower net worth requirements
• Broker: Higher net worth (₹5 Crore for composite brokers)

Distribution Scope:
• Corporate Agent: Limited to assigned lines
• Broker: Full authority across all lines

Suitability:
• Corporate Agent: Bancassurance, fintech, NBFC insurance distribution
• Broker: Independent insurance advisory and placement`
    },
    {
      id: 'emerging-models',
      title: 'Emerging Models & Future Trends',
      content: `Bancassurance Evolution:
• Banks leveraging Corporate Agent registration
• Insurance embedded in lending products
• Cross-selling insurance products
• Revenue diversification for banks

Fintech & Digital Distribution:
• Fintech platforms using Corporate Agent model
• Digital customer onboarding
• Automated policy servicing
• AI-based customer profiling

Direct Insurance Distribution:
• Instech companies obtaining registration
• Direct-to-consumer models
• Elimination of intermediaries in select segments
• Technology-driven claims processing

Group Insurance & Employee Benefits:
• Corporate agents specializing in group covers
• Employee benefit administration
• Health and life insurance bundling
• Wellness program integration

Regulatory Evolution:
• IRDAI guidelines adapting to digital models
• Enhanced compliance frameworks
• Cybersecurity requirements
• Data protection standards`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes & Risk Areas',
      content: `Expert Insight - CS Devyani Khambhati (Insurance Compliance Specialist):
"The most common pitfall I observe is entities treating Corporate Agent registration as a simple compliance step rather than as a foundational compliance commitment. Applicants often underestimate ongoing compliance costs, infrastructure requirements, and regulatory oversight. The Principal Officer role is frequently understaffed or underskilled, leading to repeated regulatory findings. Additionally, inadequate client grievance handling and record-keeping lapses trigger IRDAI enforcement action. Success requires a long-term compliance culture, not a checkbox mentality."

Common Mistakes:

1. Underestimating Compliance Scope:
• Treating registration as one-time event
• Not investing in ongoing compliance infrastructure
• Minimal Principal Officer engagement
• Inadequate training records

2. Financial Management Errors:
• Not maintaining minimum net worth
• Lapsed PI Insurance
• Inadequate bank deposits
• Poor audit trail documentation

3. Client Record Management:
• Incomplete KYC documentation
• Poor grievance handling records
• Missing suitability assessments
• Inadequate policy servicing records

4. Operational Failures:
• Unauthorized activities beyond approved scope
• Unqualified principal officer
• Lack of training documentation
• Poor internal audit systems

5. Reporting Lapses:
• Late annual return filing
• Missing quarterly certifications
• Incomplete disclosure of regulatory changes
• Inadequate change notification to IRDAI

Risk Areas to Focus On:
• Client suitability and fit-for-purpose documentation
• Anti-fraud measures and policy verification
• Commission handling and receipt reconciliation
• Regulatory change monitoring and implementation
• Staff training and competency verification`
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions (100+ FAQs)',
      content: ``
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: 'What is Corporate Agent Registration in India?', a: 'Corporate Agent Registration in India is a regulatory approval granted by the Insurance Regulatory and Development Authority of India (IRDAI) that allows an entity to solicit and procure insurance business on behalf of insurers within specified categories.' },
        { q: 'Who regulates Corporate Agent Registration in India?', a: 'Corporate Agent Registration in India is regulated by the Insurance Regulatory and Development Authority of India (IRDAI) under the applicable regulations governing corporate agents.' },
        { q: 'Is Corporate Agent Registration mandatory to sell insurance products?', a: 'Yes. Any company or eligible entity intending to solicit and procure insurance business for commission must obtain Corporate Agent Registration in India before commencing such activity.' },
        { q: 'What types of insurance can a Corporate Agent distribute?', a: 'A Corporate Agent may distribute life insurance, general insurance, health insurance, or a composite combination, depending on the scope approved by IRDAI.' },
        { q: 'Can a Corporate Agent represent multiple insurers?', a: 'Yes, but only up to the limits prescribed under the regulations for each line of business.' },
        { q: 'What is the difference between a Corporate Agent and an Insurance Broker?', a: 'A Corporate Agent represents a limited number of insurers, whereas a broker typically represents the client and can place business with multiple insurers without the same restriction framework.' },
        { q: 'Is Corporate Agent Registration valid permanently?', a: 'No. It is granted for a specified validity period and must be renewed before expiry.' },
        { q: 'Can a fintech company apply for Corporate Agent Registration in India?', a: 'Yes, provided it satisfies the eligibility criteria prescribed under the regulations.' },
        { q: 'Can NBFCs apply for Corporate Agent Registration?', a: 'Yes. NBFCs may apply, subject to regulatory compliance and satisfaction of eligibility requirements.' },
        { q: 'Does Corporate Agent Registration allow underwriting of policies?', a: 'No. Corporate Agents only solicit and procure business. Underwriting authority rests with insurers.' }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: 'Who can apply for Corporate Agent Registration in India?', a: 'Companies, LLPs, cooperative societies, banks, NBFCs, and other eligible entities as permitted under the regulations may apply.' },
        { q: 'Can individuals apply for Corporate Agent Registration?', a: 'No. Individuals must apply under the individual agent category, not as Corporate Agents.' },
        { q: 'Is prior insurance experience mandatory for Corporate Agent Registration?', a: 'The entity must appoint a qualified Principal Officer and comply with certification requirements, but prior corporate experience in insurance is not mandatory.' },
        { q: 'What is the role of the Principal Officer?', a: 'The Principal Officer is responsible for regulatory compliance, training supervision, oversight of all operations, and serves as the regulatory interface with IRDAI.' },
        { q: 'Can a startup apply for Corporate Agent Registration?', a: 'Yes, provided it meets the net worth, capital, and operational readiness requirements.' },
        { q: 'What is the minimum net worth required for Corporate Agent Registration?', a: 'The minimum net worth is prescribed under IRDAI regulations and varies by entity type and lines of business.' },
        { q: 'Can a partnership firm apply for Corporate Agent Registration?', a: 'Partnership firms cannot directly apply. An LLP (Limited Liability Partnership) with the appropriate structure may apply.' },
        { q: 'Is there an age requirement for the entity to apply?', a: 'There is no specific age requirement, but the entity must be duly incorporated and registered.' },
        { q: 'Can a foreign entity apply for Corporate Agent Registration?', a: 'Foreign entities operating in India through a registered subsidiary or branch may apply, subject to additional regulatory requirements.' },
        { q: 'What disqualifies an entity from applying for Corporate Agent Registration?', a: 'Entities with pending regulatory action, fraud history, insolvency, or directors with regulatory sanctions are typically disqualified.' }
      ]
    },
    {
      category: 'Capital & Financial Requirements',
      faqs: [
        { q: 'What is the minimum capital requirement for Corporate Agent Registration?', a: 'The minimum net worth requirement is prescribed under IRDAI regulations and must be maintained throughout the registration period.' },
        { q: 'What is the bank deposit requirement?', a: 'A bank deposit of 10% of the minimum net worth must be maintained in a scheduled bank as security.' },
        { q: 'Can the bank deposit be withdrawn?', a: 'No. The bank deposit must remain in place as long as the registration is active. It can only be released upon cancellation or voluntary withdrawal.' },
        { q: 'What is Professional Indemnity Insurance?', a: 'Professional Indemnity Insurance is mandatory insurance protecting against claims of negligence or errors in service provision. For corporate agents, minimum coverage is typically ₹1 Crore.' },
        { q: 'What is the cost of PI Insurance annually?', a: 'PI Insurance premiums range from ₹50,000 to ₹2,00,000 annually, depending on the insurer and coverage scope.' },
        { q: 'Must the net worth be maintained continuously?', a: 'Yes. The net worth must be maintained throughout the registration period. Any shortfall must be rectified within the compliance timeline.' },
        { q: 'Can borrowed funds be counted towards net worth?', a: 'Generally, borrowed funds cannot be counted. Net worth must be from genuine capital and retained earnings.' },
        { q: 'What happens if the entity falls below minimum net worth?', a: 'IRDAI may issue a show-cause notice and require restoration. Non-compliance may lead to suspension or cancellation.' },
        { q: 'Is the bank deposit interest-bearing?', a: 'Typically, the bank deposit is non-interest-bearing security.' },
        { q: 'What is the initial capital investment required?', a: 'Apart from net worth, initial investments include PI Insurance premium (₹50,000-₹2,00,000), office setup, and technology infrastructure.' }
      ]
    },
    {
      category: 'Registration Process & Timeline',
      faqs: [
        { q: 'How long does Corporate Agent Registration take?', a: 'The typical timeline is 4–8 months from application submission to approval.' },
        { q: 'What is the first step in applying for Corporate Agent Registration?', a: 'The first step is preparing a complete application package with all required documents and submitting it to IRDAI with the application fee.' },
        { q: 'Can I start distributing insurance before registration approval?', a: 'No. Distribution can only commence after registration approval and certificate issuance.' },
        { q: 'What happens after IRDAI receives the application?', a: 'IRDAI conducts a preliminary review for completeness, then a detailed assessment of business model, compliance, and operational readiness.' },
        { q: 'Can I track the status of my application?', a: 'Yes. IRDAI provides a tracking number, and periodic updates can be requested through the assigned officer.' },
        { q: 'What if IRDAI seeks additional information?', a: 'IRDAI may issue an "information requisition" with a specific timeline for response. Prompt response is critical to avoid delays.' },
        { q: 'Can the application be rejected?', a: 'Yes. If the applicant does not meet eligibility criteria or cannot demonstrate operational readiness, the application may be rejected with reasons.' },
        { q: 'Is there an appeal process if rejected?', a: 'Yes. The applicant can request reconsideration or appeal to the IRDAI Ombudsman with supporting evidence.' },
        { q: 'What is the validity of the registration certificate?', a: 'Initial registration is valid for 3 years from the date of approval.' },
        { q: 'Can the registration validity be extended before expiry?', a: 'Yes. The renewal process should be initiated 3–4 months before expiry to avoid operational gaps.' }
      ]
    },
    {
      category: 'Compliance & Regulatory Obligations',
      faqs: [
        { q: 'What are the key compliance obligations after registration?', a: 'Key obligations include maintaining net worth, renewing PI Insurance, filing annual returns, maintaining client records, conducting training, and adhering to code of conduct.' },
        { q: 'How often must annual returns be filed?', a: 'Annual returns must be filed by the prescribed deadline (typically end of financial year) in the format specified by IRDAI.' },
        { q: 'What records must be maintained?', a: 'Records include client KYC documents, policy details, suitability assessments, grievance logs, training records, and financial statements.' },
        { q: 'How long must client records be retained?', a: 'Client records must be retained for a minimum of 5 years after policy termination.' },
        { q: 'What is the grievance redressal process?', a: 'Corporate agents must establish a robust grievance mechanism, maintain a grievance log, respond within prescribed timelines, and report statistics to IRDAI.' },
        { q: 'Can grievances be escalated to IRDAI?', a: 'Yes. If a corporate agent fails to redress a grievance, the client can escalate to IRDAI.' },
        { q: 'What training is required for staff?', a: 'Staff must receive mandatory training on products, compliance, customer service, code of conduct, and anti-fraud measures.' },
        { q: 'How is compliance monitored?', a: 'IRDAI monitors compliance through annual returns, quarterly certifications, on-site inspections, and grievance analysis.' },
        { q: 'What happens if compliance lapses are found?', a: 'IRDAI may issue show-cause notices, impose penalties, require corrective action, or initiate suspension/cancellation.' },
        { q: 'Are compliance costs significant?', a: 'Yes. Compliance costs include audit fees, training expenses, PI Insurance premiums, and IT infrastructure for record-keeping.' }
      ]
    },
    {
      category: 'Commission & Financial Matters',
      faqs: [
        { q: 'How is commission earned as a Corporate Agent?', a: 'Commissions are earned from insurers based on the volume and type of policies sold, as per rates prescribed by IRDAI.' },
        { q: 'What are typical commission rates?', a: 'Life Insurance: 5-40% of first-year premium; General Insurance: 5-20%; Health Insurance: 5-15% (subject to regulatory limits).' },
        { q: 'Can commission rates be negotiated with insurers?', a: 'Commission rates are within IRDAI-prescribed limits. Insurers may offer differential rates, but not exceeding the maximum.' },
        { q: 'Are renewal commissions paid?', a: 'Yes. For life insurance, renewal commissions are typically paid for up to 5-10 years.' },
        { q: 'What factors affect commission earnings?', a: 'Volume of policies sold, retention rate, product mix, client demographics, and compliance record all affect earnings.' },
        { q: 'How is commission reconciliation done?', a: 'Commission is reconciled based on monthly statements from insurers and internal policy records.' },
        { q: 'Can commissions be clawed back?', a: 'Yes. Commissions can be clawed back for policy lapses, fraudulent policies, or violations of regulations.' },
        { q: 'What is a commission clawback?', a: 'Clawback is the recovery of previously paid commission by the insurer due to policy lapse, fraud, or non-compliance.' },
        { q: 'Are there incentive structures available?', a: 'Yes. Insurers may offer performance incentives and bonuses beyond base commission rates.' },
        { q: 'How should commission income be recorded?', a: 'Commission income must be recorded as per accounting standards and tax regulations, with clear documentation.' }
      ]
    },
    {
      category: 'Inspection & Enforcement',
      faqs: [
        { q: 'Can IRDAI inspect a Corporate Agent\'s operations?', a: 'Yes. IRDAI has the authority to conduct on-site inspections to verify compliance.' },
        { q: 'How often are inspections conducted?', a: 'Inspections are conducted periodically, typically once in 2-3 years, or more frequently if risks are identified.' },
        { q: 'What is covered in an inspection?', a: 'Inspections cover compliance with regulations, client record maintenance, grievance handling, training, and financial management.' },
        { q: 'What happens after an inspection?', a: 'IRDAI issues an inspection report detailing findings and provides a timeline for corrective action.' },
        { q: 'Can inspection findings be appealed?', a: 'Yes. The corporate agent can submit a reply to inspection findings with supporting evidence.' },
        { q: 'What are consequences of serious compliance violations?', a: 'Serious violations can result in penalties, suspension, or cancellation of registration.' },
        { q: 'Is there a penalty schedule?', a: 'Yes. IRDAI has a defined penalty structure for various non-compliances.' },
        { q: 'Can penalties be appealed?', a: 'Yes. Penalties can be appealed through IRDAI\'s appellate process.' },
        { q: 'What is the process for suspension?', a: 'IRDAI issues a show-cause notice, allows response, and then issues a suspension order with a rectification period.' },
        { q: 'Can registration be cancelled?', a: 'Yes. Registration can be cancelled for serious violations, fraud, or non-compliance that cannot be rectified.' }
      ]
    },
    {
      category: 'Renewal & Continuation',
      faqs: [
        { q: 'How often must Corporate Agent Registration be renewed?', a: 'Registration must be renewed every 3 years before the expiry date.' },
        { q: 'When should renewal application be submitted?', a: 'Renewal application should be submitted 3–4 months before expiry to avoid operational gaps.' },
        { q: 'What documents are needed for renewal?', a: 'Updated audited financial statements, compliance certification, PI Insurance renewal proof, and an updated business plan.' },
        { q: 'What is the renewal fee?', a: 'Renewal application fee: ₹50,000; Renewal registration fee: ₹1,00,000.' },
        { q: 'Can renewal be denied?', a: 'Yes. If compliance issues exist or eligibility criteria are not met, renewal may be denied.' },
        { q: 'What happens if renewal is not filed on time?', a: 'Late renewal can lead to operational interruption, penalties, and possible cancellation.' },
        { q: 'Can the scope of registration be expanded during renewal?', a: 'Yes. The agent can apply to add new lines of business during renewal, subject to approval.' },
        { q: 'Can the Principal Officer be changed during renewal?', a: 'Yes. Changes to the Principal Officer can be made during renewal or separately with IRDAI approval.' },
        { q: 'Is there a grace period for late renewal?', a: 'IRDAI may provide a limited grace period, but continuation without renewal is not permitted.' },
        { q: 'What if registration lapses?', a: 'Lapsed registration cannot resume distribution. A new application must be filed.' }
      ]
    },
    {
      category: 'Business Operations',
      faqs: [
        { q: 'Can a Corporate Agent operate from multiple locations?', a: 'Yes. The agent can operate from multiple offices, but must maintain compliance at all locations and notify IRDAI.' },
        { q: 'Must the office be dedicated to Corporate Agent operations?', a: 'Yes. The office must be distinct and dedicated, with adequate infrastructure for client service and record-keeping.' },
        { q: 'Can the Corporate Agent subcontract business?', a: 'Subcontracting is not permitted under the regulations. The agent must directly manage all operations.' },
        { q: 'Can Corporate Agents work with multiple insurers simultaneously?', a: 'Yes, but within the limits prescribed for each line of business.' },
        { q: 'What is the policy-to-lapse ratio expectation?', a: 'While not mandated, high lapse ratios may trigger regulatory scrutiny and penalty clawback.' },
        { q: 'Can a Corporate Agent bundle insurance with other services?', a: 'Yes. Corporate agents often bundle insurance with lending, deposits, or other financial services.' },
        { q: 'Are there restrictions on discounting or bundling?', a: 'Bundling must comply with IRDAI guidelines and suitability norms. Deep discounting may be subject to restrictions.' },
        { q: 'Can a Corporate Agent directly solicit clients online?', a: 'Yes. Digital distribution is encouraged, but must comply with cybersecurity and client protection norms.' },
        { q: 'What are the data security requirements?', a: 'Corporate agents must implement robust cybersecurity measures to protect client data and maintain confidentiality.' },
        { q: 'Are there restrictions on commission sharing with clients?', a: 'IRDAI guidelines prescribe limits on commission sharing. Rules vary by type of client relationship.' }
      ]
    },
    {
      category: 'Fintech & Digital Models',
      faqs: [
        { q: 'Can fintech companies operate as Corporate Agents?', a: 'Yes. Fintech companies can apply for registration, subject to meeting all eligibility criteria.' },
        { q: 'What additional compliance applies to fintech Corporate Agents?', a: 'Fintech agents must comply with cybersecurity norms, data protection regulations, and digital KYC requirements.' },
        { q: 'Can insurance be sold through mobile apps?', a: 'Yes. Insurance can be distributed through mobile platforms, provided proper verification and record-keeping are maintained.' },
        { q: 'Are digital signatures acceptable for policy documents?', a: 'Yes. Digital signatures are acceptable, provided they comply with the Information Technology Act, 2000.' },
        { q: 'What is the process for digital KYC?', a: 'Digital KYC can be conducted through video verification and document verification, as per IRDAI guidelines.' },
        { q: 'Are there restrictions on automated recommendations?', a: 'AI-based recommendations must comply with suitability norms and transparency requirements.' },
        { q: 'How is data protection ensured in digital distribution?', a: 'Data protection is ensured through encryption, secure storage, access controls, and regular security audits.' },
        { q: 'Can blockchain technology be used for policy management?', a: 'Yes. Blockchain can be used for policy records, provided it meets IRDAI approval and security standards.' },
        { q: 'What are the cybersecurity compliance costs?', a: 'Cybersecurity infrastructure can cost ₹10-50 lakhs initially, with annual maintenance of ₹2-5 lakhs.' },
        { q: 'Are there specific privacy policy requirements?', a: 'Yes. Corporate agents must have a clear privacy policy complying with IRDAI and data protection regulations.' }
      ]
    },
    {
      category: 'Problem Resolution & Grievance',
      faqs: [
        { q: 'What is the grievance redressal process?', a: 'Grievances must be acknowledged within 5 days, investigated, and resolved within 30 days, with documentation maintained.' },
        { q: 'Where can clients lodge grievances?', a: 'Clients can lodge grievances through the Corporate Agent\'s office, email, phone, or through IRDAI directly.' },
        { q: 'What are common grievance types?', a: 'Common grievances include policy-related disputes, commission disputes, service delays, and sales practice issues.' },
        { q: 'How are grievances tracked and reported?', a: 'Corporate agents must maintain a grievance register and report statistics to IRDAI quarterly.' },
        { q: 'Can clients escalate to IRDAI if unresolved?', a: 'Yes. Unresolved grievances can be escalated to IRDAI or the IRDAI Ombudsman.' },
        { q: 'What is the IRDAI Ombudsman role?', a: 'The Ombudsman reviews unresolved grievances and provides independent dispute resolution.' },
        { q: 'Can clients seek compensation through the Ombudsman?', a: 'Yes. The Ombudsman can recommend compensation up to ₹20 lakhs for valid claims.' },
        { q: 'How long does ombudsman resolution take?', a: 'Ombudsman resolution typically takes 3-6 months.' },
        { q: 'Are there penalties for poor grievance handling?', a: 'Yes. Persistent poor grievance handling can lead to IRDAI penalties and enforcement action.' },
        { q: 'What records of grievances must be maintained?', a: 'Detailed records of grievance date, nature, resolution, and outcome must be maintained for 5 years.' }
      ]
    },
    {
      category: 'Advanced Topics',
      faqs: [
        { q: 'How is commission taxed?', a: 'Commission is taxed as business income under income tax law. The corporate agent must maintain clear documentation.' },
        { q: 'What accounting standards apply?', a: 'Corporate agents follow Indian Accounting Standards (Ind AS) and applicable GST norms.' },
        { q: 'Is GST applicable on commission?', a: 'Yes. GST at 18% is applicable on commission earned.' },
        { q: 'Can a Corporate Agent become an Insurance Broker?', a: 'A corporate agent can apply separately for Broker registration, but registrations are maintained independently.' },
        { q: 'What happens if a Corporate Agent declares insolvency?', a: 'Insolvency triggers automatic suspension and typically leads to cancellation.' },
        { q: 'Can a Corporate Agent be prosecuted for violations?', a: 'Serious violations like fraud can result in criminal prosecution under the Insurance Act.' },
        { q: 'Is professional liability insurance sufficient?', a: 'PI Insurance is mandatory but does not absolve criminal liability for fraudulent conduct.' },
        { q: 'What are anti-money laundering (AML) requirements?', a: 'Corporate agents must comply with AML norms, conduct KYC, and report suspicious transactions.' },
        { q: 'What is the Know Your Customer (KYC) requirement?', a: 'KYC requires verification of client identity and beneficial ownership, with documentation retained for 5 years.' },
        { q: 'Are there beneficial ownership disclosure norms?', a: 'Yes. Beneficial ownership of the corporate agent entity must be disclosed to IRDAI.' }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🛡️', label: 'IRDAI' },
        { emoji: '👔', label: 'Corporate Agent' },
        { emoji: '🔗', label: 'Insurance Intermediary' },
        { emoji: '📜', label: 'Distribution License' },
        { emoji: '✅', label: 'Regulatory Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IRDAI Services', href: '/irdai' },
        { label: 'Corporate Agent Registration' }
      ]}
      title="Corporate Agent Registration in India"
      readTime="22 min read"
      focusKeyword="Corporate Agent Registration in India"
      sections={sections}
      ctaTitle="Ready to Start Your Corporate Agent Journey?"
      ctaDescription="Get expert guidance on registration, compliance, and operational setup for your corporate agent business."
      quickFacts={[
        { label: 'Regulator', value: 'IRDAI' },
        { label: 'Governing Act', value: 'IRDAI (Registration of Corporate Agents) Regulations, 2015' },
        { label: 'Applicable To', value: 'Companies, LLPs, Banks, NBFCs, Fintech Platforms' },
        { label: 'Registration Validity', value: '3 Years' },
        { label: 'Application Fee', value: '₹50,000' },
        { label: 'Registration Fee', value: '₹1,00,000' },
        { label: 'Renewal Fee (per 3 years)', value: '₹50,000 + ₹1,00,000' },
        { label: 'PI Insurance Minimum', value: '₹1 Crore' },
        { label: 'Typical Timeline', value: '4–8 Months' },
        { label: 'Lines Available', value: 'Life, General, Health, Composite' }
      ]}
      relatedArticles={[
        { title: 'IRDA Insurance Broker License', href: '/irdai/irda-insurance-broker-license', category: 'IRDAI', description: 'IRDA Insurance Broker License — complete regulatory guide.' },
        { title: 'Composite Insurance Broker Registration', href: '/irdai/composite-insurance-broker-registration-in-india', category: 'IRDAI', description: 'Composite Insurance Broker Registration — complete regulatory guide.' },
        { title: 'Insurance Marketing Firm License', href: '/irdai/insurance-marketing-firm-license', category: 'IRDAI', description: 'Insurance Marketing Firm License — complete regulatory guide.' },
        { title: 'ISNP Registration', href: '/irdai/isnp-registration', category: 'IRDAI', description: 'ISNP Registration — complete regulatory guide.' }
      ]}
      finalCtaTitle="Need Expert Support for Corporate Agent Registration?"
      finalCtaDescription="Our compliance specialists provide end-to-end support for registration, operational setup, and ongoing compliance."
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
        <h2>Frequently Asked Questions (100+ FAQs)</h2>
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
