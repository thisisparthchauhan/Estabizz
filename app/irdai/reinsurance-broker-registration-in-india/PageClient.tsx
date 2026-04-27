'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function ReinsuranceBrokerRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Reinsurance Broker Registration in India',
      content: `Reinsurance Broker Registration in India is governed by the IRDAI (Insurance Brokers) Regulations, 2018, which lay down the framework for entities that wish to act as intermediaries between insurers and reinsurers. If your objective is to participate in large risk placements, treaty structuring, facultative arrangements, or international reinsurance transactions, then Reinsurance Broker Registration in India becomes a mandatory regulatory requirement.

Unlike direct brokers who deal with retail policyholders, reinsurance brokers operate at a sophisticated level — advising insurance companies on risk transfer strategies, pricing, capacity sourcing, and reinsurance programme structuring. Therefore, the regulatory expectations are correspondingly higher.`
    },
    {
      id: 'legal-background',
      title: 'Legal Background & Regulatory Authority',
      content: `Reinsurance Broker Registration in India is regulated by:
• Insurance Act, 1938
• IRDAI Act, 1999
• IRDAI (Insurance Brokers) Regulations, 2018
• Applicable circulars and clarifications issued from time to time

The authority empowered to grant, suspend, or cancel registration is the Insurance Regulatory and Development Authority of India (IRDAI).`
    },
    {
      id: 'what-is',
      title: 'What is a Reinsurance Broker?',
      content: `A reinsurance broker is an intermediary who:
• Arranges reinsurance for insurers
• Advises on reinsurance programme design
• Assists in claims recovery from reinsurers
• Negotiates treaty and facultative placements
• Facilitates international reinsurance placements

In simple terms, Reinsurance Broker Registration in India allows an entity to professionally structure and place reinsurance business in domestic and international markets.`
    },
    {
      id: 'who-needs',
      title: 'Who Requires Reinsurance Broker Registration in India?',
      content: `Entities that:
• Intend to place treaty reinsurance for insurers
• Arrange facultative reinsurance for large risks
• Advise insurers on catastrophe protection
• Act as intermediaries between Indian insurers and foreign reinsurers
• Structure risk mitigation portfolios for insurance companies`
    },
    {
      id: 'who-cannot',
      title: 'Who Cannot Apply?',
      content: `An applicant may not qualify for Reinsurance Broker Registration in India if:

• Non-company structure: Only companies registered under Companies Act can apply
• Insurer or reinsurer entity: Direct insurers cannot simultaneously act as brokers
• Non-compliant promoters: Promoters failing "fit & proper" criteria
• Insufficient capital: Failure to meet minimum capital requirement`
    },
    {
      id: 'categories',
      title: 'Categories under IRDAI (Insurance Brokers) Regulations, 2018',
      content: `The IRDAI Regulations recognise three broker categories:

• Direct Broker — Retail & corporate policyholders
• Reinsurance Broker — Insurer-level reinsurance placement
• Composite Broker — Both direct and reinsurance

This guide focuses exclusively on Reinsurance Broker Registration in India.`
    },
    {
      id: 'capital',
      title: 'Capital Requirement for Reinsurance Broker Registration in India',
      content: `As prescribed under the Regulations and relevant Schedule:

• Minimum Capital: ₹4 Crore
• Form of Capital: Equity share capital
• Net Worth: At all times not less than capital requirement

The capital must remain unencumbered and maintained throughout the registration period.`
    },
    {
      id: 'net-worth',
      title: 'Net Worth Calculation Method',
      content: `Net worth typically includes:
• Paid-up equity capital
• Free reserves

Excludes:
• Intangible assets
• Deferred expenses
• Revaluation reserves

Failure to maintain minimum net worth may trigger regulatory action.`
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Requirements',
      content: `For Reinsurance Broker Registration in India, IRDAI expects:
• Dedicated office premises
• Adequate IT systems
• Secure data storage
• Professional indemnity insurance cover
• Qualified manpower`
    },
    {
      id: 'fit-and-proper',
      title: 'Key Management & Fit and Proper Criteria',
      content: `The Principal Officer must:
• Meet educational qualification norms
• Undergo required training
• Pass prescribed examination
• Demonstrate reinsurance market expertise

Promoters and directors must satisfy:
• Financial integrity
• Clean regulatory track record
• No convictions involving moral turpitude
• Sound business reputation`
    },
    {
      id: 'business-plan',
      title: 'Business Plan Requirement (Mandatory)',
      content: `Reinsurance Broker Registration in India requires submission of:
• 3-year financial projections
• Business volume estimation
• Revenue forecast
• Expense structure
• Break-even analysis
• Reinsurance market positioning strategy

A realistic and structured business plan significantly strengthens approval probability.`
    },
    {
      id: 'documents',
      title: 'Documents Required (As per Application Form)',
      content: `• Certificate of Incorporation — Legal existence
• MOA & AOA — Object clause verification
• Shareholding pattern — Ownership clarity
• Net worth certificate — Capital compliance
• Principal Officer details — Qualification validation
• Business plan — Operational viability
• Professional indemnity proposal — Risk mitigation
• Board resolution — Authorization`
    },
    {
      id: 'process',
      title: 'Step-by-Step Registration Process',
      content: `Step 1 → Incorporate Company
Step 2 → Capital infusion of ₹4 Crore
Step 3 → Appointment of Principal Officer
Step 4 → Training & Certification
Step 5 → Preparation of 3-year business plan
Step 6 → Filing application with IRDAI
Step 7 → Clarifications & scrutiny
Step 8 → In-principle approval
Step 9 → Compliance fulfilment
Step 10 → Grant of Certificate of Registration`
    },
    {
      id: 'timeline',
      title: 'Timeline for Approval',
      content: `• Preparation: 1–2 months
• IRDAI scrutiny: 3–6 months
• Final approval: Subject to compliance`
    },
    {
      id: 'fees',
      title: 'Government Fees (As per Schedule)',
      content: `• Application Fee: As prescribed in Schedule
• Registration Fee: As prescribed for Reinsurance Broker
• Renewal Fee: Periodic as per regulation

(Exact amounts must be confirmed from the latest applicable Schedule at the time of filing.)`
    },
    {
      id: 'certificate',
      title: 'Certificate Issued',
      content: `Upon approval, IRDAI grants:
• Certificate of Registration
• Validity for specified period (subject to renewal)
• Authorisation to act as Reinsurance Broker`
    },
    {
      id: 'post-registration-compliance',
      title: 'Post-Registration Compliance',
      content: `• Net worth maintenance — Continuous
• Annual return filing — As prescribed
• Books of account — Proper maintenance
• Audit — Periodic audit
• Professional indemnity — Mandatory coverage
• Reporting to IRDAI — As required`
    },
    {
      id: 'inspection',
      title: 'Inspection Powers of IRDAI',
      content: `IRDAI may:
• Call for information
• Conduct inspections
• Review records
• Examine financial statements
• Investigate compliance breaches`
    },
    {
      id: 'suspension',
      title: 'Suspension or Cancellation Triggers',
      content: `• Misrepresentation — Cancellation
• Net worth erosion — Suspension
• Violation of regulations — Penalty / cancellation
• Failure to comply with reporting — Regulatory action`
    },
    {
      id: 'penalties',
      title: 'Penalties for Non-Compliance',
      content: `Non-compliance under Reinsurance Broker Registration in India may lead to:
• Monetary penalty
• Suspension of license
• Cancellation of registration
• Disqualification of management`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes Applicants Make',
      content: `• Underestimating capital structuring
• Weak 3-year business plan
• Improper drafting of object clause
• Non-compliant promoter background
• Incomplete documentation`
    },
    {
      id: 'professional-structuring',
      title: 'Why Professional Structuring Improves Approval Probability',
      content: `Reinsurance Broker Registration in India involves regulatory scrutiny at multiple levels — financial, governance, and operational.

A professionally structured application:
• Aligns object clause properly
• Pre-validates net worth
• Strengthens promoter profile presentation
• Drafts practical 3-year projection
• Anticipates regulator queries

"Regulatory approval is not secured by capital alone. It is earned through governance discipline, clarity of intent, and demonstrable compliance culture." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'detailed-fee-structure',
      title: 'Detailed Fee Structure for Reinsurance Broker Registration in India',
      content: `Under the applicable Schedule of the IRDAI (Insurance Brokers) Regulations, 2018, the fee structure for Reinsurance Broker Registration in India is categorised into application fees, registration fees, and renewal fees.

1️⃣ Application Fee
• Application filing fee: ₹25,000 (Non-refundable)
This fee is payable at the time of submission of the application for Reinsurance Broker Registration in India.

2️⃣ Registration Fee (Upon Approval)
• Reinsurance Broker: ₹3,00,000
This fee becomes payable once IRDAI grants approval for Reinsurance Broker Registration in India.

3️⃣ Renewal Fee
• Reinsurance Broker: ₹3,00,000
Renewal is required before expiry of the certificate. Delay may attract additional regulatory consequences.`
    },
    {
      id: 'pi-insurance',
      title: 'Professional Indemnity Insurance Requirement',
      content: `Professional indemnity insurance is mandatory for entities holding Reinsurance Broker Registration in India.

The coverage must:
• Protect against errors and omissions
• Cover claims arising from professional negligence
• Be maintained throughout the registration period

Minimum Limit Requirement for Reinsurance Brokers:
• Minimum Limit: Not less than ₹50 Crore (subject to regulatory prescription)
• Uninsured Excess: As permitted under regulation

The policy must:
• Cover all directors and employees
• Be issued by a registered insurer
• Remain active without lapse`
    },
    {
      id: 'renewal-process',
      title: 'Renewal Process for Reinsurance Broker Registration in India',
      content: `Reinsurance Broker Registration in India is not perpetual. Renewal must be sought before expiry.

Renewal Timeline Flow:
90 Days Before Expiry → Submit renewal application → Pay renewal fee → Submit compliance declarations → IRDAI scrutiny → Renewal approval

Failure to apply within time may:
• Lead to suspension
• Interrupt business operations
• Trigger regulatory action`
    },
    {
      id: 'compliance-calendar',
      title: 'Post-Registration Compliance Calendar',
      content: `After securing Reinsurance Broker Registration in India, compliance obligations become continuous and structured.

• Maintenance of Net Worth — Continuous — ₹4 Crore minimum
• Professional Indemnity Policy — Continuous — No lapse permitted
• Books of Accounts — Ongoing — Maintain prescribed records
• Auditor Certification — Annual — Financial audit
• Regulatory Returns — Periodic — As prescribed by IRDAI
• Board Governance — Ongoing — Meeting & policy oversight
• Fit & Proper Declarations — Periodic — Promoter & Director review

Strong internal compliance tracking significantly reduces regulatory exposure.`
    },
    {
      id: 'reporting-records',
      title: 'Reporting & Record Maintenance',
      content: `Entities with Reinsurance Broker Registration in India must:
• Maintain placement records
• Document reinsurance treaty arrangements
• Keep claim handling records
• Preserve communication with insurers and reinsurers
• Retain data for prescribed duration

Regulators may request records at any time.`
    },
    {
      id: 'regulatory-oversight',
      title: 'Inspection & Regulatory Oversight',
      content: `IRDAI possesses statutory powers to:
• Conduct on-site inspection
• Seek books and documents
• Call for explanations
• Review financial health
• Evaluate governance systems

Non-cooperation during inspection may escalate enforcement risk.`
    },
    {
      id: 'risk-areas',
      title: 'Risk Areas Leading to Suspension or Cancellation',
      content: `• Net worth erosion — Suspension
• Failure to maintain PI cover — Regulatory action
• Misrepresentation in application — Cancellation
• Improper placement practices — Investigation
• Governance failure — Penal action

Reinsurance Broker Registration in India demands governance discipline at all levels.`
    },
    {
      id: 'comparison',
      title: 'Comparison: Reinsurance Broker vs Composite Broker',
      content: `• Capital Requirement: Reinsurance Broker ₹4 Crore | Composite Broker ₹5 Crore
• Scope: Reinsurance only | Direct + Reinsurance
• Market Focus: Insurer level | Retail + Insurer
• Operational Complexity: High | Very High
• Compliance Load: Structured | Expanded

Entities choosing between categories must assess long-term strategy before filing for Reinsurance Broker Registration in India.`
    },
    {
      id: 'capital-planning',
      title: 'Capital Planning Strategy – Practical Insight',
      content: `While the regulation prescribes ₹4 Crore minimum capital, practical structuring often considers:
• Working capital buffer
• Operational expenses (first 24 months)
• Talent acquisition cost
• PI premium cost
• Regulatory filing cost

Poor capital planning is a common reason for operational stress post-registration.`
    },
    {
      id: 'governance',
      title: 'Governance Architecture Required',
      content: `For sustainable Reinsurance Broker Registration in India, the entity should implement:
• Risk management framework
• Compliance officer oversight
• Internal audit structure
• Documented SOPs for placement
• Conflict of interest policy
• Data protection controls

Regulatory approval is only the beginning; governance sustains the license.

"In the reinsurance ecosystem, credibility travels faster than capital. A broker's true strength lies in its governance architecture and professional integrity." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'strategic-structuring',
      title: 'Why Reinsurance Broker Registration in India Requires Strategic Structuring',
      content: `Unlike many other financial licenses, Reinsurance Broker Registration in India involves:
• Capital scrutiny
• Governance validation
• Market credibility assessment
• Technical competency verification
• Long-term sustainability review

Regulators evaluate not only compliance but also operational maturity.

A well-structured application typically includes:
• Clean promoter background
• Properly drafted object clause
• Strong Principal Officer profile
• Realistic financial projection
• Risk management framework
• Internal compliance roadmap`
    },
    {
      id: 'object-clause',
      title: 'Drafting the Object Clause for Reinsurance Broker Registration in India',
      content: `One of the most frequently overlooked areas in Reinsurance Broker Registration in India is improper drafting of the Memorandum of Association (MOA). IRDAI closely examines whether the company's main object clearly reflects reinsurance broking activities.

Core Object Clause – Structuring Guidance:
• Clearly state that the company will act as a reinsurance broker
• Limit activities strictly to those permitted under IRDAI regulations
• Avoid unrelated financial business unless separately permitted
• Not include insurance underwriting activities
• Not include lending or investment advisory functions

Common Drafting Mistakes:
• Vague wording — Lack of clarity of business intent
• Mixing multiple financial services — Risk of regulatory overlap
• Inclusion of unrelated fintech activities — Governance dilution
• Absence of broking reference — Direct rejection risk

Proper drafting strengthens approval probability during Reinsurance Broker Registration in India.`
    },
    {
      id: 'principal-officer-roadmap',
      title: 'Principal Officer Qualification Roadmap',
      content: `The Principal Officer plays a critical regulatory role under Reinsurance Broker Registration in India.

Key Regulatory Expectations — The Principal Officer must:
• Meet prescribed educational standards
• Complete mandatory training hours
• Pass the required examination
• Demonstrate experience in insurance or reinsurance markets
• Be dedicated to broking operations

Compliance Journey: Education → Training → Examination → Appointment → Regulatory Intimation

If the Principal Officer lacks adequate background, IRDAI may raise scrutiny queries.`
    },
    {
      id: 'promoter-structure',
      title: 'Promoter & Shareholding Structure Analysis',
      content: `IRDAI evaluates promoter integrity under "fit and proper" criteria.

Evaluation Parameters:
• Financial soundness — Stable financial background
• Criminal history — No convictions involving moral turpitude
• Regulatory history — No prior license cancellation
• Shareholding transparency — Clear ownership disclosure

Structuring Advice:
• Avoid layered opaque shareholding
• Ensure beneficial ownership clarity
• Maintain proper board governance documentation

A transparent promoter structure supports smoother Reinsurance Broker Registration in India.`
    },
    {
      id: 'projection-model',
      title: 'Three-Year Financial Projection Model – Detailed Framework',
      content: `IRDAI expects a structured financial forecast during Reinsurance Broker Registration in India.

Projection Must Include:
1. Revenue Forecast
2. Expense Planning
3. Profitability Timeline
4. Capital Utilisation
5. Break-even Analysis

Year 1 – Establishment Phase:
• Limited placement income
• Higher infrastructure costs
• Talent acquisition expenses
• PI premium cost
• Compliance expenses

Year 2 – Expansion Phase:
• Increased treaty placements
• International market participation
• Stabilised fixed costs
• Controlled operational margins

Year 3 – Stabilisation Phase:
• Consistent brokerage income
• Predictable renewal commissions
• Strengthened net profit margins

Weak projections without realistic assumptions often trigger IRDAI clarification.`
    },
    {
      id: 'irdai-scrutiny',
      title: 'IRDAI Scrutiny – What Happens Behind the Scenes',
      content: `Reinsurance Broker Registration in India involves layered scrutiny.

Stage 1 – Technical Scrutiny:
• Document completeness
• Capital verification
• Net worth validation
• Object clause review

Stage 2 – Governance Assessment:
• Promoter credibility
• Principal Officer credentials
• Compliance framework

Stage 3 – Clarification Stage — IRDAI may raise queries such as:
• Clarification on capital source
• Business model sustainability
• Market tie-ups
• Risk management policy
• IT security controls

Prompt and well-drafted responses significantly improve approval chances.`
    },
    {
      id: 'governance-architecture',
      title: 'Internal Governance Architecture – Model Framework',
      content: `A sustainable Reinsurance Broker Registration in India requires a defined governance system.

Recommended Internal Committees:
• Risk Management — Placement risk oversight
• Compliance Oversight — Regulatory monitoring
• Audit Committee — Financial integrity
• Board Review — Strategic direction

Documentation of internal policies demonstrates seriousness of compliance.`
    },
    {
      id: 'risk-policy',
      title: 'Risk Management Policy Requirements',
      content: `The risk policy should address:
• Conflict of interest management
• Data confidentiality
• Reinsurance counterparty evaluation
• Claim handling process
• Business continuity planning

IRDAI expects structured documentation, not informal operational practices.`
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Record Retention Framework',
      content: `Reinsurance transactions involve confidential insurer data.

Best practice structure:
• Secure data storage
• Access control hierarchy
• Cyber risk mitigation
• Defined retention policy
• Audit trail maintenance

Failure in data governance may attract regulatory action.`
    },
    {
      id: 'pi-structuring',
      title: 'Professional Indemnity Structuring – Practical Insight',
      content: `Although regulation prescribes minimum coverage, practical structuring requires:
• Coverage matching business volume
• International placement extension
• Claims-made vs occurrence analysis
• Retroactive coverage clause review

Underinsurance may expose the entity to severe financial risk.`
    },
    {
      id: 'common-queries',
      title: 'Common Regulatory Queries Raised by IRDAI',
      content: `• Capital Source — Whether funds are genuine and unencumbered
• Business Model — Sustainability of projected revenue
• Promoter Background — Litigation or regulatory action
• Market Strategy — Reinsurance tie-ups
• Governance — Board oversight clarity

Preparing documentation anticipating these queries improves Reinsurance Broker Registration in India success rate.`
    },
    {
      id: 'renewal-strategy',
      title: 'Renewal Strategy – Long-Term License Sustainability',
      content: `Do not treat renewal as a formality.

Maintain:
• Continuous net worth buffer
• No PI coverage gaps
• Proper books of accounts
• Timely return filing
• Clean inspection track record

License sustainability is more important than initial approval.

"Regulatory licensing is not a transaction; it is an ongoing commitment to discipline, transparency, and responsible market conduct." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'strategic-advisory',
      title: 'Strategic Advisory for Serious Applicants',
      content: `Reinsurance Broker Registration in India is best approached with:
• Structured capital planning
• Strong compliance culture
• Qualified technical leadership
• Transparent promoter background
• Professionally drafted documentation
• Realistic business projections

When approached methodically, the registration process becomes predictable rather than uncertain.`
    },
    {
      id: 'continuous-compliance',
      title: 'Annual Compliance Calendar – Continuous / Ongoing Compliance',
      content: `1. Minimum Capital — Maintain ₹4 Crore minimum capital at all times — Finance Head — Net worth must not fall below threshold
2. Net Worth — Maintain prescribed net worth continuously — CFO / Compliance Officer — Monitor quarterly
3. Professional Indemnity Policy — Maintain active PI insurance cover — Compliance Officer — No coverage lapse permitted
4. Fit & Proper Criteria — Directors & Promoters must remain fit & proper — Board — Immediate disclosure of adverse events
5. Books of Accounts — Maintain prescribed books & records — Accounts Department — As per regulatory standards
6. Record Retention — Preserve placement & claims records — Operations — As per prescribed retention period
7. Change Reporting — Report material changes to IRDAI — Compliance Officer — Shareholding, principal officer, address etc.`
    },
    {
      id: 'quarterly-compliance',
      title: 'Quarterly Compliance Review (Internal Governance)',
      content: `• Q1 (Apr–Jun) — Net worth review & compliance status — CFO — Board Reporting Required
• Q2 (Jul–Sep) — PI coverage review — Compliance Officer — Board Reporting Required
• Q3 (Oct–Dec) — Governance & risk review — Board — Board Reporting Required
• Q4 (Jan–Mar) — Year-end regulatory compliance review — Compliance Officer — Board Reporting Required

Quarterly review helps ensure uninterrupted validity of Reinsurance Broker Registration in India.`
    },
    {
      id: 'annual-compliance',
      title: 'Annual Compliance Requirements',
      content: `1. Statutory Audit — Annually — Statutory Auditor
2. Submission of Audited Financial Statements — As prescribed by IRDAI — Compliance Officer
3. Annual Regulatory Returns — As per IRDAI schedule — Compliance Team
4. Net Worth Certificate — Annual certification — Chartered Accountant
5. Board Review of Compliance — At least once annually — Board of Directors
6. Renewal of PI Policy — Before expiry — Compliance Officer
7. Principal Officer Status Review — Annual — Board`
    },
    {
      id: 'event-based',
      title: 'Event-Based Compliance (Trigger-Based Reporting)',
      content: `• Change in shareholding — Prompt reporting — Notify IRDAI
• Change in Principal Officer — Prior approval / intimation — Update records
• Change in Registered Office — Intimation required — File necessary documentation
• Net worth erosion — Immediate — Inform regulator
• Any disciplinary action — Immediate — Regulatory disclosure
• Merger / restructuring — Prior approval — Seek IRDAI consent

Event-based compliance is crucial for maintaining the validity of Reinsurance Broker Registration in India.`
    },
    {
      id: 'renewal-timeline',
      title: 'Renewal Compliance Timeline',
      content: `• 90 days before expiry — Prepare renewal documentation
• Before expiry date — Submit renewal application
• Along with renewal — Pay prescribed renewal fee
• Post submission — Respond to IRDAI queries

Failure to renew timely may lead to suspension of Reinsurance Broker Registration in India.`
    },
    {
      id: 'internal-monitoring',
      title: 'Internal Monitoring Recommendation',
      content: `To effectively manage compliance under Reinsurance Broker Registration in India, it is advisable to:
• Maintain a digital compliance tracker (Excel / ERP based)
• Assign compliance ownership clearly
• Conduct quarterly board-level compliance review
• Maintain documentary evidence of all filings
• Keep PI policy renewal reminders automated

"Compliance is not an annual activity; it is a daily discipline that safeguards regulatory credibility." — CS Devyani Khambhati – Compliance Expert`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is Composite Insurance Broker Registration in India?", a: "Composite Insurance Broker Registration in India is a licence granted by IRDAI that allows a company to carry on life insurance broking, general insurance broking, and reinsurance broking activities under one approval." },
        { q: "Who grants Composite Insurance Broker Registration in India?", a: "The registration is granted by the Insurance Regulatory and Development Authority of India (IRDAI), which regulates insurance intermediaries in India." },
        { q: "What activities can a Composite Insurance Broker undertake?", a: "A composite broker can solicit and arrange life insurance policies, general insurance policies, and reinsurance placements, along with risk advisory and claims assistance services." },
        { q: "Is Composite Insurance Broker Registration mandatory to act as a broker?", a: "Yes. No entity can act as an insurance broker in India without valid registration from IRDAI." },
        { q: "What is the difference between Direct Broker and Composite Broker?", a: "A direct broker operates either in life or general insurance, whereas a composite broker is authorised to operate across life, general, and reinsurance segments." },
        { q: "Is reinsurance activity allowed under Composite Insurance Broker Registration?", a: "Yes. Composite brokers are permitted to carry out reinsurance broking in addition to direct broking." },
        { q: "Can an unregistered entity solicit insurance business?", a: "No. Soliciting or arranging insurance business without registration is prohibited." },
        { q: "Is the registration valid permanently?", a: "No. Registration is valid for a prescribed period and must be renewed before expiry." },
        { q: "Can a company hold more than one category of broker registration?", a: "No. A company is registered under one specific category. Composite category covers all segments." },
        { q: "Is the registration transferable to another entity?", a: "No. Registration is entity-specific and cannot be transferred." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for Composite Insurance Broker Registration in India?", a: "Only a company incorporated under the Companies Act can apply." },
        { q: "Can an LLP apply for Composite Insurance Broker Registration?", a: "No. Only a company structure is permitted." },
        { q: "Can an individual apply for Composite Broker licence?", a: "No. Individuals cannot apply." },
        { q: "Can a foreign-owned company apply?", a: "Yes, subject to compliance with applicable FDI norms and IRDAI approval requirements." },
        { q: "Is there any restriction on promoters?", a: "Promoters must satisfy fit and proper criteria regarding integrity, financial soundness, and reputation." },
        { q: "Can an existing Direct Broker upgrade to Composite category?", a: "Yes, subject to meeting enhanced capital and compliance requirements and obtaining approval." },
        { q: "Is insurance experience mandatory for promoters?", a: "The Principal Officer must meet qualification and training requirements, and management must demonstrate competence." },
        { q: "Can a company engaged in other financial activities apply?", a: "Yes, provided insurance broking is a main object and there is no conflict of interest." },
        { q: "Is a minimum number of directors required?", a: "The company must comply with Companies Act requirements and IRDAI governance expectations." },
        { q: "Are disqualified directors allowed?", a: "No. Persons disqualified under law cannot hold key positions." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which law is Composite Insurance Broker Registration governed?", a: "It is governed by the Insurance Act, IRDAI Act, and IRDAI (Insurance Brokers) Regulations, 2018." },
        { q: "Does IRDAI issue circulars applicable to brokers?", a: "Yes. Brokers must comply with all circulars and guidelines issued from time to time." },
        { q: "Are brokers bound by a Code of Conduct?", a: "Yes. Brokers must follow conduct requirements prescribed by IRDAI." },
        { q: "Can IRDAI inspect a composite broker?", a: "Yes. IRDAI has inspection and supervisory powers." },
        { q: "Is maintenance of books mandatory?", a: "Yes. Brokers must maintain prescribed books and records." },
        { q: "Is there a regulatory reporting requirement?", a: "Yes. Periodic filings are required." },
        { q: "Is professional indemnity insurance mandatory?", a: "Yes. It must be maintained continuously." },
        { q: "Is capital maintenance monitored by IRDAI?", a: "Yes. Net worth must be maintained at all times." },
        { q: "Can IRDAI impose conditions while granting licence?", a: "Yes. Registration may be granted with conditions." },
        { q: "Can IRDAI suspend registration?", a: "Yes, for regulatory breaches." }
      ]
    },
    {
      category: 'Registration / Application Process',
      faqs: [
        { q: "How do I apply for Composite Insurance Broker Registration in India?", a: "Application must be filed in the prescribed form along with required documents and fee." },
        { q: "Is application filed online?", a: "Yes, through the regulatory portal as prescribed." },
        { q: "What is the first step before applying?", a: "Incorporate a company with appropriate object clause and infuse required capital." },
        { q: "Is Principal Officer appointment required before filing?", a: "Yes. The Principal Officer must meet qualification and training norms before approval." },
        { q: "Does IRDAI conduct scrutiny of application?", a: "Yes. The Authority reviews documents and may seek clarifications." },
        { q: "Can IRDAI reject an incomplete application?", a: "Yes. Incomplete or deficient applications may not be processed." },
        { q: "Is personal hearing possible during review?", a: "Yes, if required by IRDAI." },
        { q: "What happens after in-principle approval?", a: "Registration fee must be paid before certificate issuance." },
        { q: "Is physical verification conducted?", a: "IRDAI may verify infrastructure and compliance readiness." },
        { q: "When is registration certificate issued?", a: "After satisfaction of all conditions and payment of fees." }
      ]
    },
    {
      category: 'Capital, Net Worth & Infrastructure',
      faqs: [
        { q: "What is the minimum capital required for Composite Insurance Broker Registration?", a: "₹5 Crore paid-up equity capital." },
        { q: "Must capital be fully paid-up?", a: "Yes." },
        { q: "Is net worth equal to minimum capital?", a: "Yes. Net worth must not fall below ₹5 Crore." },
        { q: "Is there a deposit requirement?", a: "Yes. A specified percentage of capital must be kept as deposit with a scheduled bank." },
        { q: "Can capital be reduced after registration?", a: "Not below regulatory minimum." },
        { q: "Is professional indemnity cover required?", a: "Yes, minimum ₹5 Crore." },
        { q: "Is office space mandatory?", a: "Yes. Adequate infrastructure must be available." },
        { q: "Is IT system required?", a: "Yes. Proper systems for record maintenance are expected." },
        { q: "Is grievance redressal mechanism compulsory?", a: "Yes." },
        { q: "Is separate client account required?", a: "Yes, where client money is handled." }
      ]
    },
    {
      category: 'Documentation & Declarations',
      faqs: [
        { q: "What documents are required for Composite Insurance Broker Registration?", a: "Corporate documents, capital certificates, net worth certificate, Principal Officer qualification proof, declarations, and business plan." },
        { q: "Is a 3-year business plan mandatory?", a: "Yes. Projections must be submitted." },
        { q: "Is a CA certificate required?", a: "Yes, for capital and net worth confirmation." },
        { q: "Is director KYC required?", a: "Yes." },
        { q: "Is a fit and proper declaration required?", a: "Yes, from directors and key persons." },
        { q: "Is board resolution required?", a: "Yes." },
        { q: "Is office proof required?", a: "Yes." },
        { q: "Is bank certificate required for deposit?", a: "Yes." },
        { q: "Is auditor appointment mandatory before application?", a: "Yes, as part of corporate compliance." },
        { q: "Is shareholding pattern disclosure required?", a: "Yes." }
      ]
    },
    {
      category: 'Timelines & Fees',
      faqs: [
        { q: "How long does it take to get Composite Insurance Broker Registration?", a: "Processing time depends on documentation and regulatory review." },
        { q: "Is application fee refundable?", a: "No." },
        { q: "Is registration fee separate from application fee?", a: "Yes." },
        { q: "Is renewal fee payable?", a: "Yes, before expiry." },
        { q: "What happens if renewal fee is delayed?", a: "Registration may lapse or attract regulatory action." },
        { q: "Is late filing penalised?", a: "Yes, regulatory action may follow." },
        { q: "Is there a validity period for registration?", a: "Yes, as prescribed by regulations." },
        { q: "Can application be withdrawn?", a: "Yes, but fees are non-refundable." },
        { q: "Is fee structure prescribed in schedule?", a: "Yes." },
        { q: "Can fee amount change?", a: "Yes, if regulations are amended." }
      ]
    },
    {
      category: 'Post-Registration Compliance',
      faqs: [
        { q: "Is annual return filing mandatory?", a: "Yes." },
        { q: "Is net worth certification required annually?", a: "Yes." },
        { q: "Must PI insurance be renewed continuously?", a: "Yes." },
        { q: "Is internal audit required?", a: "Regulatory and financial audits are required." },
        { q: "Is board oversight required?", a: "Yes, governance is expected." },
        { q: "Is complaint register mandatory?", a: "Yes." },
        { q: "Is commission reporting required?", a: "Yes." },
        { q: "Must client funds be segregated?", a: "Yes." },
        { q: "Are regulatory inspections routine?", a: "They may occur as per supervisory mechanism." },
        { q: "Can IRDAI call for information anytime?", a: "Yes." }
      ]
    },
    {
      category: 'Operational Restrictions & Permissions',
      faqs: [
        { q: "Can composite broker represent multiple insurers?", a: "Yes." },
        { q: "Can broker underwrite risk?", a: "No, brokers cannot act as insurers." },
        { q: "Can broker give risk management advice?", a: "Yes." },
        { q: "Can broker collect premium?", a: "Yes, subject to client money handling rules." },
        { q: "Is rebating allowed?", a: "No." },
        { q: "Can broker outsource core functions?", a: "Only within regulatory limits." },
        { q: "Is advertising regulated?", a: "Yes, must comply with IRDAI norms." },
        { q: "Can broker appoint sub-brokers?", a: "Only as permitted by regulation." },
        { q: "Is data confidentiality mandatory?", a: "Yes." },
        { q: "Can broker operate across India?", a: "Yes, subject to compliance." }
      ]
    },
    {
      category: 'Penalties, Cancellation & Regulatory Action',
      faqs: [
        { q: "What happens if capital falls below minimum?", a: "Regulatory action including suspension may follow." },
        { q: "Can licence be cancelled for misrepresentation?", a: "Yes." },
        { q: "Is failure to maintain PI insurance a violation?", a: "Yes." },
        { q: "Can repeated non-compliance lead to cancellation?", a: "Yes." },
        { q: "Can monetary penalty be imposed?", a: "Yes." },
        { q: "Is there opportunity of hearing before cancellation?", a: "Yes, as per regulatory procedure." },
        { q: "Can broker voluntarily surrender licence?", a: "Yes, with approval." },
        { q: "What happens to pending policies on cancellation?", a: "Regulatory directions must be followed." },
        { q: "Can suspended broker continue operations?", a: "No." },
        { q: "Can cancelled broker reapply?", a: "Only subject to regulatory permission and satisfaction of conditions." }
      ]
    },
    {
      category: 'Practical & Scenario-Based Questions',
      faqs: [
        { q: "Can a startup with ₹5 Crore capital apply for Composite Insurance Broker Registration?", a: "Yes, if all eligibility and compliance conditions are met." },
        { q: "Is experience mandatory for directors?", a: "They must satisfy fit and proper and competence expectations." },
        { q: "Can net worth fluctuate temporarily?", a: "It must not fall below minimum at any time." },
        { q: "Can IRDAI seek additional documents during review?", a: "Yes." },
        { q: "Is renewal automatic if compliant?", a: "Renewal is subject to regulatory satisfaction." },
        { q: "Can a composite broker downgrade category?", a: "Only with regulatory approval." },
        { q: "Is reporting required if Principal Officer changes?", a: "Yes." },
        { q: "Is merger of broker entities permitted?", a: "Subject to regulatory approval." },
        { q: "Can capital be infused in phases?", a: "Minimum required capital must be in place before approval." },
        { q: "Is regulatory compliance a one-time requirement?", a: "No. It is continuous throughout the life of registration." }
      ]
    },
    {
      category: 'Advanced Scenario-Based & Compliance Interpretation (Reinsurance-Specific)',
      faqs: [
        { q: "What happens if the net worth of a reinsurance broker falls below ₹4 crore after registration?", a: "If the net worth falls below the prescribed minimum, the broker must take immediate steps to restore it. IRDAI may seek explanation and may initiate regulatory action if the deficiency is not rectified promptly." },
        { q: "Is prior approval required before increasing share capital?", a: "Increase in share capital may not require prior approval in all cases, but any change that affects ownership, control, or shareholding pattern must be reported and may require regulatory approval." },
        { q: "Is prior approval required for change in control of a reinsurance broker?", a: "Yes. Any change in control or significant shareholding requires prior approval from IRDAI." },
        { q: "Can a reinsurance broker accept deposits from insurers?", a: "No. A broker cannot accept deposits or act as a financial intermediary beyond permitted broking activities." },
        { q: "Can brokerage income be shared with unregistered entities?", a: "No. Sharing brokerage with unregistered persons is not permitted." },
        { q: "Can a reinsurance broker open branch offices without IRDAI approval?", a: "Opening additional offices must comply with regulatory requirements and may require intimation or approval depending on the circumstances." },
        { q: "What if the Principal Officer resigns suddenly?", a: "The company must appoint a qualified replacement and inform IRDAI within the prescribed timeline. Operations should not continue without a compliant Principal Officer." },
        { q: "Can a reinsurance broker outsource core placement functions?", a: "Core broking functions cannot be outsourced in a manner that dilutes responsibility. Outsourcing must comply with regulatory norms." },
        { q: "Is it mandatory to maintain separate bank accounts for client funds?", a: "Funds handling must comply with regulatory directions, ensuring transparency and segregation where applicable." },
        { q: "What if the professional indemnity policy coverage is insufficient compared to business volume?", a: "The broker must ensure that coverage meets regulatory minimum and is adequate relative to risk exposure." },
        { q: "Can IRDAI impose additional conditions during renewal?", a: "Yes. IRDAI may impose conditions if compliance concerns arise." },
        { q: "Is board-level oversight mandatory for compliance monitoring?", a: "Yes. The board is responsible for ensuring regulatory compliance." },
        { q: "Can a reinsurance broker undertake risk advisory unrelated to reinsurance?", a: "Activities must remain within the scope permitted under the broking regulations." },
        { q: "What happens if regulatory returns are filed late?", a: "Delayed filing may attract regulatory scrutiny and possible action." },
        { q: "Can commission rates be negotiated freely with reinsurers?", a: "Commission arrangements must comply with applicable regulatory norms." },
        { q: "Is disclosure of conflicts of interest mandatory?", a: "Yes. Conflicts must be managed and disclosed appropriately." },
        { q: "What if a director becomes disqualified under Companies Act provisions?", a: "The company must ensure compliance and notify IRDAI if such event affects governance standards." },
        { q: "Can a reinsurance broker engage in underwriting activities?", a: "No. Underwriting is not permitted for brokers." },
        { q: "Can one entity hold both reinsurance broker and corporate agent licenses?", a: "Each category requires separate regulatory approval and compliance with respective regulations." },
        { q: "Is a compliance manual mandatory?", a: "While regulations prescribe compliance obligations, maintaining documented policies strengthens compliance governance." }
      ]
    },
    {
      category: 'Advanced Compliance, Renewal & Operations',
      faqs: [
        { q: "What if there is a delay in renewal application submission?", a: "The broker may face suspension or lapse of registration if renewal is not applied for within prescribed timelines." },
        { q: "Can reinsurance brokers operate through digital platforms?", a: "Yes, provided regulatory compliance, data protection, and operational norms are met." },
        { q: "Is cyber security compliance required?", a: "Yes. Adequate safeguards must be in place to protect confidential insurer data." },
        { q: "Can IRDAI conduct surprise inspections?", a: "Yes. The Authority may conduct inspections as deemed necessary." },
        { q: "What if a reinsurance broker is involved in misrepresentation during placement?", a: "Such conduct may lead to severe regulatory action including cancellation." },
        { q: "Is it mandatory to report litigation against the company?", a: "Material litigation affecting operations must be disclosed." },
        { q: "Can reinsurance brokers enter into revenue-sharing agreements?", a: "Any revenue arrangement must comply with regulatory framework." },
        { q: "What if the PI policy expires before renewal?", a: "There must be no lapse. Continuous coverage is mandatory." },
        { q: "Can IRDAI impose monetary penalties?", a: "Yes. Penalties may be imposed under applicable provisions." },
        { q: "Is internal audit advisable even if not expressly mandated?", a: "A structured review mechanism supports compliance and governance." },
        { q: "Can a reinsurance broker assist in claim settlement negotiations?", a: "Yes, assisting insurers in claim processes is permitted within scope." },
        { q: "Is a whistleblower mechanism required?", a: "Strong governance practice includes grievance and reporting systems." },
        { q: "Can the company change its object clause after registration?", a: "Changes impacting scope require regulatory compliance and possible approval." },
        { q: "What if foreign shareholding exceeds permitted limit?", a: "Foreign investment must comply with sectoral guidelines; breach may trigger regulatory action." },
        { q: "Is reinsurance broking permitted across life and general segments?", a: "Yes, subject to regulatory scope of registration." },
        { q: "Can brokerage be paid in foreign currency?", a: "Payments must comply with applicable foreign exchange regulations." },
        { q: "What if a reinsurer defaults on claim payment?", a: "The broker may assist insurer but is not liable beyond permitted role." },
        { q: "Is data retention period prescribed?", a: "Records must be maintained for the period specified in regulations." },
        { q: "Can a broker voluntarily surrender registration?", a: "Yes, subject to regulatory procedure." },
        { q: "What happens if the broker becomes insolvent?", a: "IRDAI may initiate cancellation or other regulatory action." }
      ]
    },
    {
      category: 'Governance, Capital & Director-Level',
      faqs: [
        { q: "Is approval required before appointing additional directors?", a: "Changes affecting control or governance must be intimated or approved." },
        { q: "Can reinsurance brokers advertise internationally?", a: "Advertisements must comply with applicable regulatory standards." },
        { q: "Is annual certification by auditor mandatory?", a: "Audited financial statements must be submitted as prescribed." },
        { q: "Can the company reduce capital after registration?", a: "Capital must not fall below prescribed minimum." },
        { q: "What if promoter background changes due to investigation?", a: "Fit and proper status must be maintained; IRDAI may review eligibility." },
        { q: "Can the Principal Officer delegate regulatory responsibilities?", a: "Ultimate responsibility remains with designated individuals." },
        { q: "Is a grievance redressal mechanism required?", a: "Yes, structured grievance handling strengthens compliance." },
        { q: "What if reinsurance placements are made without proper documentation?", a: "Improper documentation may attract regulatory concern." },
        { q: "Can IRDAI restrict business operations temporarily?", a: "Yes, if serious compliance issues arise." },
        { q: "Does regulatory non-compliance affect renewal prospects?", a: "Yes. Compliance history is relevant for renewal evaluation." },
        { q: "Is board meeting documentation reviewed during inspection?", a: "Yes, governance records may be examined." },
        { q: "Can a reinsurance broker operate while renewal application is under review?", a: "If applied within time, operations generally continue pending decision." },
        { q: "Is AML compliance applicable to reinsurance brokers?", a: "Applicable AML and reporting norms must be followed." },
        { q: "Can related party transactions impact regulatory approval?", a: "Yes, transparency and governance are important." },
        { q: "What if there is delay in responding to IRDAI queries?", a: "Delay may impact processing or trigger regulatory concern." },
        { q: "Can reinsurance brokers maintain overseas offices?", a: "Subject to regulatory compliance and applicable laws." },
        { q: "Is business continuity planning required?", a: "Maintaining operational continuity safeguards compliance." },
        { q: "What if capital infusion source is not clearly documented?", a: "IRDAI may seek clarification on fund source." },
        { q: "Can a broker accept contingent commissions?", a: "Compensation structures must comply with regulations." },
        { q: "Is compliance training required for employees?", a: "Personnel must meet qualification and training requirements where prescribed." }
      ]
    },
    {
      category: 'Suspension, Reporting, Audit & Mergers',
      faqs: [
        { q: "Can IRDAI suspend registration temporarily?", a: "Yes, in cases of serious violation." },
        { q: "Can promoters transfer shares freely after registration?", a: "Transfer affecting ownership/control requires regulatory compliance." },
        { q: "Is separate reporting required for life and general reinsurance?", a: "Reporting must align with prescribed formats." },
        { q: "Can a reinsurance broker merge with another broker?", a: "Such restructuring requires regulatory approval." },
        { q: "What if audited statements show financial weakness?", a: "IRDAI may seek clarification." },
        { q: "Can a reinsurance broker change its name without approval?", a: "Regulatory intimation and compliance are required." },
        { q: "Is it mandatory to maintain physical records?", a: "Electronic records are permitted if integrity is ensured." },
        { q: "Can IRDAI conduct thematic inspections?", a: "Yes." },
        { q: "Can directors be removed for regulatory non-compliance?", a: "IRDAI may direct corrective measures where necessary." },
        { q: "What if professional indemnity insurer refuses renewal?", a: "The broker must secure alternate compliant coverage." },
        { q: "Can reinsurance brokers charge advisory fees separately?", a: "Only if permitted under regulatory framework." },
        { q: "Is approval required for change in Principal Officer qualification status?", a: "Material changes must be reported." },
        { q: "Can a reinsurance broker act as risk consultant without placement?", a: "Activities must remain within permitted scope." },
        { q: "What if regulatory guidelines are amended?", a: "The broker must comply with updated provisions." },
        { q: "Can IRDAI impose compliance conditions post-inspection?", a: "Yes." },
        { q: "Is disclosure of adverse audit remarks required?", a: "Material compliance concerns must be addressed." },
        { q: "Can the company voluntarily reduce operations?", a: "Yes, but registration obligations remain until surrendered." },
        { q: "Can multiple Principal Officers be appointed?", a: "Regulations require designated Principal Officer; structure must comply." },
        { q: "Is there a cooling-off period after cancellation?", a: "Future eligibility depends on regulatory assessment." },
        { q: "Can the Authority direct corrective governance measures?", a: "Yes, IRDAI may require rectification." }
      ]
    },
    {
      category: 'Final Compliance, Appeals & Continuous Vigilance',
      faqs: [
        { q: "Can failure to maintain compliance affect directors personally?", a: "Directors bear governance responsibility." },
        { q: "Is submission of false information punishable?", a: "Yes, it may lead to cancellation and penalties." },
        { q: "Can reinsurance brokers handle foreign exchange settlements directly?", a: "Such transactions must comply with applicable laws." },
        { q: "Is it mandatory to maintain segregation of duties internally?", a: "Governance principles require structured operational controls." },
        { q: "Can registration be transferred to another company?", a: "No. Registration is entity-specific." },
        { q: "Can a suspended broker continue operations?", a: "No." },
        { q: "Is compliance certification required at renewal?", a: "Yes, as prescribed." },
        { q: "Can IRDAI require additional capital infusion?", a: "If net worth falls below threshold, restoration is required." },
        { q: "Is public disclosure of registration required?", a: "Registration details are publicly available." },
        { q: "Can a broker appeal against regulatory action?", a: "Appeal mechanisms exist under applicable law." },
        { q: "What if operational errors cause insurer loss?", a: "Professional indemnity coverage provides protection within policy terms." },
        { q: "Can IRDAI restrict new business intake?", a: "Yes, in serious cases." },
        { q: "Is there mandatory reporting of fraud?", a: "Fraud-related matters must be handled as per regulatory expectations." },
        { q: "Can compliance officer be outsourced?", a: "Responsibility cannot be diluted; compliance framework must remain robust." },
        { q: "Can failure to respond to inspection findings escalate action?", a: "Yes." },
        { q: "Can reinsurance brokers participate in global risk pools?", a: "Subject to regulatory and legal compliance." },
        { q: "Is digital signature mandatory for filings?", a: "Filings must comply with prescribed format and authentication." },
        { q: "Can business be temporarily suspended voluntarily?", a: "Yes, but regulatory obligations continue." },
        { q: "Does regulatory compliance extend to subsidiaries?", a: "If subsidiaries affect broking activity, disclosure and compliance apply." },
        { q: "Is continuous regulatory vigilance required even after years of operation?", a: "Yes. Reinsurance Broker Registration in India requires ongoing compliance throughout its validity." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🛡️', label: 'IRDAI' },
        { emoji: '🔄', label: 'Reinsurance Broker' },
        { emoji: '✅', label: 'Registration' },
        { emoji: '📜', label: 'IRDAI Regulations 2018' },
        { emoji: '📑', label: 'Treaty Reinsurance' },
        { emoji: '📋', label: 'Facultative' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IRDAI Services', href: '/irdai' },
        { label: 'Reinsurance Broker Registration' }
      ]}
      title="Reinsurance Broker Registration in India"
      readTime="22 min read"
      focusKeyword="Reinsurance Broker Registration in India"
      sections={sections}
      ctaTitle="Ready to Launch Your Reinsurance Broker Company?"
      ctaDescription="Get expert guidance on ₹4 Crore capital structuring, IRDAI licensing, Principal Officer onboarding, PI insurance, and 3-year business plan drafting."
      quickFacts={[
        { label: 'Regulator', value: 'IRDAI' },
        { label: 'Governing Regulations', value: 'IRDAI (Insurance Brokers) Regulations, 2018' },
        { label: 'Eligible Entity', value: 'Company (Companies Act)' },
        { label: 'Minimum Capital', value: '₹4 Crore (Equity)' },
        { label: 'Net Worth', value: '₹4 Crore at all times' },
        { label: 'Application Fee', value: '₹25,000 (Non-refundable)' },
        { label: 'Registration Fee', value: '₹3,00,000' },
        { label: 'Renewal Fee', value: '₹3,00,000' },
        { label: 'PI Insurance', value: '₹50 Crore minimum' },
        { label: 'Approval Timeline', value: '3–6 months' },
        { label: 'Renewal Filing', value: '90 days before expiry' },
        { label: 'Scope', value: 'Reinsurance placement only' }
      ]}
      relatedArticles={[
        { title: 'IRDA Insurance Broker License', href: '/irdai/irda-insurance-broker-license', category: 'IRDAI', description: 'IRDA Insurance Broker License — complete regulatory guide.' },
        { title: 'Composite Insurance Broker Registration', href: '/irdai/composite-insurance-broker-registration-in-india', category: 'IRDAI', description: 'Composite Insurance Broker Registration — complete regulatory guide.' },
        { title: 'Insurance Broker Registration', href: '/irdai/insurance-broker-registration-in-india', category: 'IRDAI', description: 'Insurance Broker Registration — complete regulatory guide.' },
        { title: 'Corporate Agent Registration', href: '/irdai/corporate-agent-registration-in-india', category: 'IRDAI', description: 'Corporate Agent Registration — complete regulatory guide.' }
      ]}
      finalCtaTitle="Need Expert Support for Reinsurance Broker Registration?"
      finalCtaDescription="Our compliance specialists provide end-to-end support for IRDAI registration, ₹4 Crore capital planning, Principal Officer credentialing, PI insurance structuring, and ongoing reinsurance compliance."
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
        <h2>Frequently Asked Questions (200+ FAQs)</h2>
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
