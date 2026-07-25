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
    },
    {
      id: 'operational-restrictions',
      title: 'Operational Restrictions for Reinsurance Brokers',
      content: `Reinsurance Broker Registration in India authorises a defined intermediary scope, but several practices remain regulated, restricted or prohibited under the IRDAI framework.

Permitted within scope:
• Treaty reinsurance placement for insurers
• Facultative reinsurance placement for large or specialised risks
• Catastrophe protection advisory
• Reinsurance programme design (proportional / non-proportional / layered)
• Domestic and international capacity sourcing
• Claims recovery support from reinsurers
• Reinsurance counterparty evaluation
• Risk mitigation portfolio structuring for insurers

Not permitted:
• Acting as insurer or reinsurer
• Underwriting risk or issuing the broker's own insurance policy
• Accepting deposits from insurers
• Sharing brokerage with unregistered persons
• Use of client funds for own expenses
• Mis-selling or misrepresentation
• Hidden / side commission arrangements
• Operating outside the scope of broker registration
• Conducting reinsurance activity without continuous PI cover
• Continuing operations after suspension or expiry of registration
• Transfer of registration to another entity (registration is entity-specific)

Crossing these regulatory boundaries — even unintentionally — may invite inspection observations, monetary penalties, suspension or cancellation.`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is Reinsurance Broker Registration in India?", a: "Reinsurance Broker Registration in India is a licence granted by IRDAI that allows an eligible company to act as an intermediary between insurers and reinsurers for reinsurance placement and advisory activities." },
        { q: "Who regulates Reinsurance Brokers in India?", a: "Reinsurance Brokers are regulated by the Insurance Regulatory and Development Authority of India." },
        { q: "Which regulations govern Reinsurance Broker Registration?", a: "It is governed by the Insurance Act, 1938, IRDAI Act, 1999 and IRDAI Insurance Brokers Regulations, 2018." },
        { q: "What does a Reinsurance Broker do?", a: "A reinsurance broker arranges treaty reinsurance, facultative reinsurance, catastrophe protection, reinsurance programme design and claims recovery support for insurers." },
        { q: "Is Reinsurance Broker different from Direct Broker?", a: "Yes. Direct brokers deal with policyholders, while reinsurance brokers work at insurer-reinsurer level for reinsurance placement." },
        { q: "Is Reinsurance Broker different from Composite Broker?", a: "Yes. A reinsurance broker focuses only on reinsurance broking, while a composite broker can undertake both direct insurance broking and reinsurance broking." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for Reinsurance Broker Registration in India?", a: "As per the source document, only a company incorporated under the Companies Act can apply." },
        { q: "Can an individual apply?", a: "No. Individuals cannot apply." },
        { q: "Can a partnership firm apply?", a: "No. Partnership firms are not eligible." },
        { q: "Can an LLP apply?", a: "The source document indicates company structure only. Verify the latest IRDAI position before filing." },
        { q: "Can an insurer act as a reinsurance broker?", a: "No. An insurer or reinsurer cannot simultaneously act as a broker." },
        { q: "Can a foreign-owned company apply?", a: "Yes, subject to compliance with applicable FDI norms and IRDAI approval requirements." }
      ]
    },
    {
      category: 'Capital & Net Worth',
      faqs: [
        { q: "What is the minimum capital required?", a: "The minimum capital requirement is ₹4 Crore." },
        { q: "What form should the capital take?", a: "The capital should be in the form of equity share capital." },
        { q: "Must capital be maintained continuously?", a: "Yes. Capital and net worth requirements must be maintained continuously." },
        { q: "What happens if net worth falls below ₹4 Crore?", a: "Immediate corrective action is required. IRDAI may seek explanation and take regulatory action if the deficiency is not rectified." },
        { q: "Can unsecured loans be counted as capital?", a: "No. Unsecured loans cannot substitute paid-up equity capital." },
        { q: "Can capital be infused in phases?", a: "Minimum required capital must be in place before approval." }
      ]
    },
    {
      category: 'PI Insurance & Principal Officer',
      faqs: [
        { q: "Is Professional Indemnity Insurance mandatory?", a: "Yes. Professional Indemnity Insurance must be maintained continuously." },
        { q: "Can operations continue if PI insurance lapses?", a: "No. PI insurance lapse is a serious compliance concern." },
        { q: "Is Principal Officer appointment mandatory?", a: "Yes. A qualified, trained and certified Principal Officer is required." },
        { q: "What if the Principal Officer resigns suddenly?", a: "The company must appoint a qualified replacement and inform IRDAI within the prescribed timeline. Operations should not continue without a compliant Principal Officer." },
        { q: "Is reinsurance market expertise expected from the Principal Officer?", a: "Yes. The Principal Officer should demonstrate adequate understanding of the reinsurance market in addition to qualification, training and examination requirements." }
      ]
    },
    {
      category: 'Documentation & Business Plan',
      faqs: [
        { q: "What should the business plan include?", a: "It should include 3-year financial projections, business volume estimation, revenue forecast, expense structure, break-even analysis and reinsurance market strategy." },
        { q: "What documents are required?", a: "Documents generally include incorporation documents, MOA, AOA, shareholding pattern, capital proof, net worth certificate, Principal Officer documents, business plan, PI insurance documents and board resolution." },
        { q: "How is the application filed?", a: "The application must be filed with IRDAI in the prescribed form with documents and fees." },
        { q: "Does IRDAI scrutinise the application?", a: "Yes. IRDAI reviews capital, promoter background, Principal Officer profile, business plan, infrastructure and compliance readiness." },
        { q: "Can IRDAI ask for clarification?", a: "Yes. IRDAI may seek clarifications and additional documents during review." },
        { q: "What is in-principle approval?", a: "It is a conditional approval granted by IRDAI subject to fulfilment of specified conditions before final registration." }
      ]
    },
    {
      category: 'Fees & Renewal',
      faqs: [
        { q: "What is the application fee?", a: "The uploaded source document states application fee of ₹25,000, subject to latest verification." },
        { q: "What is the registration fee?", a: "The uploaded source document states registration fee of ₹3,00,000, subject to latest verification." },
        { q: "What is the renewal fee?", a: "The uploaded source document states renewal fee of ₹3,00,000, subject to latest verification." },
        { q: "Is renewal automatic?", a: "No. Renewal is subject to timely filing, fee payment, compliance review and IRDAI satisfaction." },
        { q: "When should renewal application be filed?", a: "The source document suggests planning renewal around 90 days before expiry, subject to latest IRDAI requirements." },
        { q: "Can Reinsurance Broker Registration be transferred?", a: "No. Registration is entity-specific and cannot be transferred." }
      ]
    },
    {
      category: 'Operations, Compliance & Inspection',
      faqs: [
        { q: "Can a reinsurance broker open branch offices?", a: "Branch opening must comply with regulatory requirements and may require intimation or approval." },
        { q: "Can a reinsurance broker operate internationally?", a: "International placement activities must comply with IRDAI regulations, foreign exchange regulations and applicable laws." },
        { q: "Can a reinsurance broker accept deposits from insurers?", a: "No. A broker cannot accept deposits or act as a financial intermediary beyond permitted broking activities." },
        { q: "Can brokerage income be shared with unregistered entities?", a: "No. Brokerage sharing with unregistered persons is not permitted." },
        { q: "Can a reinsurance broker outsource core placement functions?", a: "Core broking functions cannot be outsourced in a manner that dilutes responsibility. Outsourcing must comply with regulatory norms." },
        { q: "Is client fund segregation required?", a: "Where client funds are handled, proper segregation and accounting controls must be maintained." },
        { q: "Is AML compliance applicable?", a: "Applicable AML and reporting norms must be followed." },
        { q: "Can IRDAI inspect a reinsurance broker?", a: "Yes. IRDAI may inspect records, books, placement files, governance and compliance systems." },
        { q: "Can IRDAI suspend or cancel registration?", a: "Yes. Serious or repeated non-compliance may lead to suspension, cancellation or other regulatory action." }
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
        <h2>Frequently Asked Questions on Reinsurance Broker Registration in India</h2>
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

      {/* ==================== HOW ESTABIZZ HELPS ==================== */}
      <section id="how-estabizz-helps" className="mt-16">
        <h2>How Estabizz Helps with Reinsurance Broker Registration in India</h2>
        <div className="step-timeline">
          <div className="step-item">
            <div className="step-dot">1</div>
            <div className="step-card">
              <h4>Eligibility &amp; Structuring Review</h4>
              <p>We review company structure, object clause, promoter profile, capital readiness and regulatory suitability.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">2</div>
            <div className="step-card">
              <h4>Capital &amp; Net Worth Documentation</h4>
              <p>We assist with ₹4 Crore capital readiness, net worth certificate, capital source documentation and financial records.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">3</div>
            <div className="step-card">
              <h4>Principal Officer Documentation</h4>
              <p>We assist in mapping qualification, training, examination, experience and appointment documentation.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">4</div>
            <div className="step-card">
              <h4>Reinsurance Business Plan</h4>
              <p>We prepare a 3-year financial projection, business volume estimation, revenue forecast, expense structure, break-even analysis and reinsurance market positioning strategy.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">5</div>
            <div className="step-card">
              <h4>IRDAI Application Support</h4>
              <p>We assist in application preparation, document compilation, filing support and IRDAI query response.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">6</div>
            <div className="step-card">
              <h4>Policy &amp; Governance Framework</h4>
              <p>We help draft the risk management policy, conflict of interest policy, data protection framework, record retention policy and compliance manual.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">7</div>
            <div className="step-card">
              <h4>PI Insurance &amp; Compliance Support</h4>
              <p>We support PI insurance planning, renewal tracking, compliance calendar and post-registration monitoring.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">8</div>
            <div className="step-card">
              <h4>Renewal &amp; Inspection Readiness</h4>
              <p>We support renewal documentation, annual compliance review, net worth monitoring, regulatory filings and inspection-ready records.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">9</div>
            <div className="step-card">
              <h4>Ticket-Based Execution</h4>
              <p>Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE ESTABIZZ ==================== */}
      <section id="why-choose-estabizz" className="mt-16">
        <h2>Why Choose Estabizz for Reinsurance Broker Registration in India?</h2>
        <div className="step-timeline">
          <div className="step-item">
            <div className="step-dot">1</div>
            <div className="step-card">
              <h4>IRDAI Regulatory Expertise</h4>
              <p>Our team works across IRDAI licensing and compliance matters and understands insurance intermediary approval requirements.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">2</div>
            <div className="step-card">
              <h4>Reinsurance Market Understanding</h4>
              <p>We understand treaty placement, facultative placement, catastrophe protection, reinsurance counterparty evaluation and claim recovery support.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">3</div>
            <div className="step-card">
              <h4>Compliance Depth, Not Just Documentation</h4>
              <p>We focus on capital, net worth, Principal Officer readiness, PI insurance, governance, data confidentiality and long-term compliance.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">4</div>
            <div className="step-card">
              <h4>Business Plan Strength</h4>
              <p>We prepare practical, regulator-facing reinsurance business plans and financial projections suitable for IRDAI scrutiny.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">5</div>
            <div className="step-card">
              <h4>Multi-Regulator Experience</h4>
              <p>Our experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">6</div>
            <div className="step-card">
              <h4>End-to-End Support</h4>
              <p>From company structuring to IRDAI application, query response, renewal and post-registration compliance, we provide organised professional handholding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== REVIEWER & DISCLAIMER ==================== */}
      <section id="reviewer" className="mt-16">
        <h2>Reviewer &amp; Legal Disclaimer</h2>
        <div className="info-box">
          <p><strong>Reviewed by:</strong> CS Devyani Khambhati</p>
          <p><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p>
          <p><strong>Expertise:</strong> IRDAI, RBI, SEBI, IFSCA, insurance intermediary licensing, reinsurance broker registration, insurance broker compliance, reinsurance advisory structuring, business plan documentation and post-registration regulatory support.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help insurance professionals, reinsurance placement firms, risk advisory groups, corporate broking houses and international reinsurance intermediaries understand the broad IRDAI framework for Reinsurance Broker Registration in India.</p>
        </div>
        <p>
          <strong>Legal Disclaimer:</strong> This content is for general informational purposes only and should not be
          treated as legal, regulatory, insurance, financial or investment advice. IRDAI requirements, application
          formats, fee structures, capital thresholds, net worth norms, PI insurance requirements, compliance
          expectations and approval processes may change from time to time. Applicants should verify the latest
          regulatory position and obtain professional advice before filing any application with IRDAI. Estabizz does
          not promise or guarantee IRDAI approval; outcomes are subject to IRDAI scrutiny and the fulfilment of
          prescribed conditions.
        </p>
        <p>
          For a structured consultation with our IRDAI compliance team, you may also reach Estabizz on WhatsApp at{" "}
          <a href="https://wa.me/919825600907" target="_blank" rel="noopener noreferrer">+91 98256 00907</a>.
        </p>
      </section>

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGroups.flatMap((g) =>
              g.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              }))
            ),
          }),
        }}
      />
      {/* Service JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Reinsurance Broker Registration in India",
            provider: {
              "@type": "Organization",
              name: "Estabizz Fintech Private Limited",
              url: "https://www.estabizz.com/",
            },
            areaServed: { "@type": "Country", name: "India" },
            description:
              "Professional regulatory consulting support for IRDAI Reinsurance Broker Registration covering treaty and facultative reinsurance — eligibility review, ₹4 Crore capital readiness, Principal Officer documentation, business plan, PI insurance, application filing and post-registration compliance.",
            url: "https://www.estabizz.com/irdai/reinsurance-broker-registration-in-india",
          }),
        }}
      />
      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.estabizz.com/" },
              { "@type": "ListItem", position: 2, name: "IRDAI Services", item: "https://www.estabizz.com/irdai" },
              { "@type": "ListItem", position: 3, name: "Reinsurance Broker Registration", item: "https://www.estabizz.com/irdai/reinsurance-broker-registration-in-india" },
            ],
          }),
        }}
      />
    </ServicePageLayout>
  );
}
