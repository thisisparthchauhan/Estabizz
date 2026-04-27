'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function InsuranceBrokerRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Insurance Broker Registration in India',
      content: `Insurance Broker Registration in India is a regulated licensing framework governed by the Insurance Regulatory and Development Authority of India (IRDAI) under the IRDAI (Insurance Brokers) Regulations, 2018. Any entity intending to act as an intermediary between insurance companies and policyholders, and to solicit or procure insurance business on behalf of clients, must obtain prior registration from IRDAI.

This is not merely a procedural approval. It is a structured regulatory entry into the Indian insurance distribution ecosystem, where capital adequacy, governance standards, professional qualifications, and compliance discipline are strictly evaluated.`
    },
    {
      id: 'legal-background',
      title: 'Legal Background of Insurance Broker Registration in India',
      content: `Insurance Broker Registration in India derives its authority from:
• The Insurance Act, 1938
• The IRDA Act, 1999
• IRDAI (Insurance Brokers) Regulations, 2018
• Schedules attached to the Regulations (capital & fee requirements)
• Circulars and clarifications issued from time to time

IRDAI acts as the licensing authority, supervisory body, and inspection authority for insurance brokers.`
    },
    {
      id: 'what-is',
      title: 'What is Insurance Broker Registration in India?',
      content: `Insurance Broker Registration in India is the formal approval granted by IRDAI to an eligible applicant to act as an insurance broker in a permitted category. Broadly, the regulations recognise direct brokers, reinsurance brokers, and composite brokers. A direct broker assists clients in arranging life, general, or health insurance. A reinsurance broker works in the reinsurance segment between insurers and reinsurers. A composite broker is permitted to undertake both direct and reinsurance broking activities, subject to meeting the higher regulatory threshold.

In practical terms, this registration allows the broker to represent the client's insurance requirements, place business with insurers, assist in policy servicing, and support claim-related coordination within the permitted regulatory framework.`
    },
    {
      id: 'categories',
      title: 'Categories Under Insurance Broker Registration in India',
      content: `The IRDAI Regulations classify brokers into three broad categories:

• Direct Broker (Life): Broker permitted to handle life insurance business
• Direct Broker (General): Broker permitted to handle general insurance business
• Direct Broker (Life & General): Broker permitted to handle both life and general insurance business
• Reinsurance Broker: Broker permitted to arrange reinsurance business
• Composite Broker: Broker permitted to undertake both direct insurance broking and reinsurance broking

For practical understanding, Direct Broker is often used as a broad commercial term, but while filing the application, the category must be selected exactly in the manner prescribed by IRDAI.`
    },
    {
      id: 'who-needs',
      title: 'Who Needs Insurance Broker Registration in India?',
      content: `Insurance Broker Registration in India is mandatory if:
• You want to earn brokerage by arranging insurance policies
• You intend to provide independent risk advisory services
• You plan to service corporate insurance accounts
• You want to negotiate insurance structures on behalf of clients

Without registration, acting as a broker is legally prohibited.`
    },
    {
      id: 'who-cannot',
      title: 'Who Cannot Apply for Insurance Broker Registration in India?',
      content: `IRDAI restricts registration if:
• Applicant does not meet minimum capital requirement
• Promoters are not "fit and proper"
• Directors have regulatory violations history
• Infrastructure requirements are inadequate
• Net worth is not maintained as prescribed

The regulator evaluates governance culture, not just documentation.`
    },
    {
      id: 'eligibility',
      title: 'Eligibility Criteria for Insurance Broker Registration in India',
      content: `1. Constitution of Entity
The applicant should be a legally recognised entity eligible under the IRDAI framework. In practice, applications are commonly made through a company incorporated under the Companies Act, 2013 or an LLP formed under the LLP Act, subject to the conditions prescribed under the regulations. The regulations also recognise certain other eligible forms such as a co-operative society or any other person as may be recognised by the Authority. Since the eligibility is regulatory in nature, the applicant's legal structure, ownership pattern, business objects, and fit and proper status should be examined carefully before filing.

• Individuals acting in personal capacity cannot obtain insurance broker registration merely as natural persons.
• Partnership firms and individuals cannot apply.

2. Principal Officer Qualification
The Principal Officer must:
• Complete prescribed training hours
• Pass IRDAI-approved examination
• Possess relevant insurance / financial experience

3. Fit and Proper Criteria
Promoters, directors, and key management must satisfy:
• Integrity standards
• No economic offence conviction
• No disqualification under financial laws
• Sound financial background

IRDAI evaluates credibility deeply.`
    },
    {
      id: 'capital',
      title: 'Capital Requirement for Insurance Broker Registration in India',
      content: `The capital requirement is extracted from the Schedule to the Regulations:

• Direct Broker: ₹75 Lakhs
• Reinsurance Broker: ₹4 Crores
• Composite Broker: ₹5 Crores

The capital must be:
• In equity share capital (for company)
• Fully paid-up
• Maintained at all times

Net Worth Requirement:
Net worth requirement is category-based. For a Direct Broker, the net worth should not fall below ₹50 lakh. For a Reinsurance Broker and Composite Broker, the net worth should not fall below 50% of the minimum capital applicable to that category. This is an ongoing compliance requirement, not a one-time condition at the time of grant of licence. If the net worth falls below the prescribed threshold, the broker is expected to restore it immediately and report compliance.

Failure to maintain net worth can trigger regulatory action.

Statutory Deposit:
Apart from minimum capital and net worth, every insurance broker is also required to maintain a statutory deposit before commencement of business. In the case of a Direct Broker, the deposit requirement is ₹10 lakh. In the case of a Reinsurance Broker or Composite Broker, the deposit should be equal to 10% of the minimum capital applicable to that category, and the same is required to be kept with a scheduled bank in the prescribed manner. This deposit cannot be freely released without prior regulatory permission and should remain unencumbered.`
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Requirement',
      content: `For Insurance Broker Registration in India, the applicant must demonstrate:
• Adequate office premises
• IT systems for record maintenance
• Data protection mechanisms
• Trained staff
• Grievance redressal framework

IRDAI assesses operational readiness before granting approval.`
    },
    {
      id: 'business-plan',
      title: 'Business Plan Requirement',
      content: `A structured business plan must be submitted including:
• 3-year financial projections
• Revenue estimation
• Brokerage income projection
• Expense structure
• Employee strength plan
• Market penetration strategy

The business plan should demonstrate sustainability and compliance capacity.`
    },
    {
      id: 'documents',
      title: 'Documents Required for Insurance Broker Registration in India',
      content: `As per application requirements:

• MOA & AOA: Authorisation of broking activity
• Board Resolution: Approval to apply
• Shareholding Pattern: Promoter disclosure
• Net Worth Certificate: Capital verification
• Principal Officer Qualification Proof: Compliance eligibility
• Infrastructure Declaration: Operational readiness
• Business Plan: Regulatory assessment
• Fit & Proper Declaration: Governance screening

IRDAI may seek additional clarifications during review.`
    },
    {
      id: 'process',
      title: 'Step-by-Step Process of Insurance Broker Registration in India',
      content: `Application → Document Scrutiny → Clarification Stage → In-Principle Approval → Compliance Submission → Final Registration Certificate

Stage 1: Online Application Filing
Submission through IRDAI portal with prescribed form.

Stage 2: Document Review
IRDAI examines capital, qualifications, governance structure.

Stage 3: Clarification Round
Queries may be raised. Timely response is critical.

Stage 4: In-Principle Approval
Conditional approval granted.

Stage 5: Final Compliance Submission
Submission of training, systems, and operational confirmations.

Stage 6: Certificate of Registration
Formal registration number issued.`
    },
    {
      id: 'fees',
      title: 'Government Fees for Insurance Broker Registration in India',
      content: `Extracted from Schedule:

Direct Broker:
• Application Processing Fee: ₹25,000
• Fresh Registration Fee: ₹50,000
• Renewal Fee: ₹1,00,000

Reinsurance Broker:
• Application Processing Fee: ₹50,000
• Fresh Registration Fee: ₹1,50,000
• Renewal Fee: ₹3,00,000

Composite Broker:
• Application Processing Fee: ₹75,000
• Fresh Registration Fee: ₹2,50,000
• Renewal Fee: ₹5,00,000

Applicants should also factor in training costs, professional expenses, documentation expenses, infrastructure setup, and professional indemnity insurance separately, as these are not part of the statutory IRDAI fee itself.`
    },
    {
      id: 'timeline',
      title: 'Timeline for Insurance Broker Registration in India',
      content: `Indicative practical timeline only, subject to completeness of application, clarification rounds, and IRDAI scrutiny:

From a regulatory standpoint, the Authority may seek clarifications after review of the application, and the applicant is generally expected to respond within the prescribed period. Therefore, actual approval timing depends significantly on the quality of documentation and responsiveness of the applicant.

Timelines vary depending on documentation quality.`
    },
    {
      id: 'principal-officer',
      title: 'Principal Officer and Broker Qualified Person Requirement',
      content: `The regulatory review does not stop at promoter profile alone. IRDAI also examines whether the applicant has the required human infrastructure. The Principal Officer must possess the prescribed educational qualification, complete the required training hours, and pass the recognised examination.

In addition, the applicant is generally expected to have at least two Broker Qualified Persons in employment. Where the applicant proposes to undertake both life and general insurance business, the staffing profile should reflect relevant capability in both segments.

This requirement is important because broking is treated as a professional advisory activity, not merely a marketing function.`
    },
    {
      id: 'certificate',
      title: 'Certificate Issued After Approval',
      content: `Upon successful Insurance Broker Registration in India:
• IRDAI Registration Certificate
• Unique Broker Registration Number
• Permission to solicit insurance business`
    },
    {
      id: 'post-registration',
      title: 'Post-Registration Compliance Obligations',
      content: `Insurance Broker Registration in India carries continuous obligations:

• Net Worth Maintenance: Maintain minimum threshold
• Professional Indemnity Insurance: Mandatory coverage
• Annual Returns: Regulatory filings
• Audit: Periodic reporting
• Code of Conduct: Strict adherence
• Grievance Redressal: Mandatory mechanism`
    },
    {
      id: 'inspection',
      title: 'Inspection Powers of IRDAI',
      content: `IRDAI may:
• Conduct on-site inspection
• Seek records
• Examine financial statements
• Investigate complaints

Non-cooperation may lead to suspension.`
    },
    {
      id: 'suspension',
      title: 'Suspension or Cancellation Triggers',
      content: `Registration may be suspended if:
• Net worth falls below threshold
• Mis-selling is established
• Brokerage limits violated
• False disclosures made
• Regulatory directions ignored`
    },
    {
      id: 'penalties',
      title: 'Penalties for Non-Compliance',
      content: `Penalties may include:
• Monetary penalties
• Suspension
• Cancellation
• Debarment of Principal Officer
• Blacklisting from future registration

Compliance discipline is central to survival.`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes in Insurance Broker Registration in India',
      content: `• Underestimating capital planning
• Weak business plan projections
• Non-qualified Principal Officer
• Inadequate documentation
• Delayed clarification responses`
    },
    {
      id: 'why-professional',
      title: 'Why Professional Structuring Improves Approval Probability',
      content: `Insurance Broker Registration in India is documentation-heavy but assessment-driven. Regulators assess seriousness of promoters, governance maturity, and financial preparedness.

"A licence is not merely regulatory permission; it is a reflection of governance culture. Regulators do not approve paperwork — they approve institutions." – CS Devyani Khambhati, Compliance Expert`
    },
    {
      id: 'brokerage-structure',
      title: 'Brokerage Structure under Insurance Broker Registration in India',
      content: `Insurance Broker Registration in India does not provide unlimited freedom to charge commissions. Brokerage limits are regulated under the IRDAI framework to ensure consumer protection and fair market practices.

The broker can earn remuneration only within prescribed ceilings, depending on:
• Type of insurance product
• Policy tenure
• Category of broker
• Business segment (life / general / health / reinsurance)

The intention behind capping brokerage is to prevent aggressive mis-selling and unhealthy competition.

Remuneration Governance Principles:
Under Insurance Broker Registration in India, remuneration must:
• Be within IRDAI prescribed limits
• Be disclosed transparently
• Not result in conflict of interest
• Not compromise advisory integrity

Hidden compensation structures or side arrangements are strictly prohibited.`
    },
    {
      id: 'pi-insurance',
      title: 'Professional Indemnity Insurance Requirement',
      content: `A critical compliance requirement under Insurance Broker Registration in India is maintaining Professional Indemnity (PI) Insurance.

This policy protects:
• Clients
• The broker
• The regulatory ecosystem

PI Insurance must:
• Be maintained at all times
• Cover errors, omissions, negligence
• Be renewed annually
• Not lapse under any circumstances

Failure to maintain valid PI cover may lead to suspension.`
    },
    {
      id: 'renewal',
      title: 'Renewal of Insurance Broker Registration in India',
      content: `Insurance Broker Registration in India is perpetual now. It requires timely renewal.

Renewal Requirements:
• Pay Annual fees of Rs 50,000 + GST every year.

Renewal Fee Structure (Indicative as per Schedule):
• Direct Broker: ₹50,000 + GST 18%`
    },
    {
      id: 'broker-vs-agent',
      title: 'Broker vs Insurance Agent – Regulatory Comparison',
      content: `Many promoters confuse Insurance Broker Registration in India with agency licensing. The distinction is fundamental.

Insurance Broker:
• Representation: Represents client
• Capital Requirement: High
• Corporate Structure: Company / LLP
• Advisory Role: Independent
• Regulatory Oversight: Extensive

Insurance Agent:
• Representation: Represents insurer
• Capital Requirement: Minimal
• Corporate Structure: Individual / Corporate agent
• Advisory Role: Limited
• Regulatory Oversight: Moderate`
    },
    {
      id: 'risk-governance',
      title: 'Risk Governance Framework under Insurance Broker Registration in India',
      content: `Insurance Broker Registration in India requires structured internal governance.

Mandatory Controls:
• Compliance Officer appointment
• Principal Officer oversight
• Grievance redressal officer
• Data protection system
• Record retention mechanism

Strong internal controls reduce inspection risk.`
    },
    {
      id: 'compliance-calendar',
      title: 'Compliance Calendar – Insurance Broker Registration in India',
      content: `Insurance Broker Registration in India carries structured and continuous compliance responsibilities under the IRDAI (Insurance Brokers) Regulations, 2018. A disciplined compliance calendar ensures that the broker remains inspection-ready and avoids regulatory exposure.

At All Times:
• Maintain Minimum Capital & Net Worth
• Maintain Professional Indemnity Insurance
• Ensure Fit & Proper Status of Directors & KMP

Continuous:
• Maintain Books of Accounts & Records
• Adherence to Code of Conduct
• Grievance Redressal Mechanism

Monthly Compliance:
• Brokerage Reconciliation: Match insurer commission statements with internal records
• Net Worth Monitoring: Review erosion risk
• PI Policy Status Check: Confirm validity & coverage adequacy
• Complaint Review: Evaluate unresolved complaints

Quarterly Compliance:
• Internal Compliance Review: Check regulatory adherence
• Financial Health Review: Revenue vs expense tracking
• Governance Review: Board oversight meeting

Half-Yearly Compliance:
• Net Worth Certification: Ensure minimum threshold maintained
• Internal Risk Review: Identify operational vulnerabilities
• Business Plan Deviation Review: Compare projections vs actuals

Annual Compliance:
• Annual Returns Filing: Submission to IRDAI
• Statutory Audit: Financial audit
• Professional Indemnity Renewal: Policy renewal
• Renewal Application (Before Expiry): Registration renewal
• Fit & Proper Confirmation: Directors & KMP affirmation

Event-Based Compliance:
• Change in Director: Intimation to IRDAI
• Change in Shareholding: Regulatory disclosure - Immediate
• Change in Principal Officer: Approval / notification - Prior or immediate
• Net Worth Drop: Capital restoration - Without delay
• Branch Opening: Regulatory intimation
• Inspection Notice: Provide documents within specified timeline`
    },
    {
      id: 'inspection-enforcement',
      title: 'Inspection & Enforcement Matrix',
      content: `IRDAI has wide supervisory authority under Insurance Broker Registration in India.

Inspection May Be Triggered By:
• Customer complaints
• Net worth erosion
• Delayed filings
• Media reports
• Random supervisory cycle

Regulatory Actions May Include:
Non-compliance under the insurance broking framework can result in serious regulatory consequences. Depending on the nature and gravity of the default, IRDAI may issue directions, impose monetary penalties, suspend registration, or cancel the certificate of registration. Common triggers include furnishing false information, non-maintenance of capital or net worth, failure to comply with regulatory directions, non-filing of required returns, misconduct, non-cooperation during inspection, grievance handling failures, prohibited inducement practices, and breach of registration conditions. In severe cases, the impact extends beyond the entity and may also affect the regulatory standing of key persons associated with the applicant.`
    },
    {
      id: 'suspension-impact',
      title: 'Suspension & Cancellation – Deep Regulatory Impact',
      content: `If Insurance Broker Registration in India is suspended:
• Broking activity must cease immediately
• No new business can be sourced
• Reputation damage is significant

If cancelled:
• Fresh application may be restricted
• Principal Officer may face debarment
• Promoters may face scrutiny in future registrations

Compliance discipline protects long-term viability.`
    },
    {
      id: 'operational',
      title: 'Operational Control Framework',
      content: `Client Onboarding → Policy Placement → Disclosure → Commission Recording → Reporting

Insurance Broker Registration in India requires:
• KYC compliance
• Transparent documentation
• Clear client communication
• Accurate policy record maintenance
• Disclosure of remuneration`
    },
    {
      id: 'governance-depth',
      title: 'Why Governance Depth Matters in Insurance Broker Registration in India',
      content: `Regulators assess maturity of promoters beyond capital.
• Do you understand risk?
• Do you have trained manpower?
• Is your business sustainable?
• Can you withstand inspection scrutiny?

Insurance Broker Registration in India is a privilege extended to institutions that demonstrate responsibility.`
    },
    {
      id: 'strategic-advice',
      title: 'Strategic Advice Before Applying',
      content: `Before filing for Insurance Broker Registration in India:
• Structure capital correctly
• Appoint qualified Principal Officer early
• Prepare realistic 3-year projections
• Draft compliance manual
• Secure professional indemnity cover readiness

Half-prepared applications often face delays.

Insurance Broker Registration in India opens access to one of the fastest growing financial distribution sectors in India. However, it operates under disciplined supervision. It is not a quick-entry business. It requires capital strength, governance integrity, operational systems, and regulatory commitment.`
    },
    {
      id: 'responsibility-matrix',
      title: 'Internal Compliance Responsibility Matrix',
      content: `• Board of Directors: Strategic oversight
• Principal Officer: Regulatory compliance supervision
• Compliance Officer: Day-to-day regulatory reporting
• CFO / Accounts Head: Capital & net worth monitoring
• Grievance Officer: Complaint management

Important Advisory:
Insurance Broker Registration in India is compliance-driven, not transaction-driven. Missing even a single periodic obligation can escalate into inspection, suspension, or monetary penalty.

A structured compliance calendar should ideally be maintained in:
• Excel tracker
• Compliance management software
• Board review dashboard
• Quarterly compliance certificate format`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is Insurance Broker Registration in India?", a: "Insurance Broker Registration in India is a licence granted by IRDAI to an eligible company or LLP to act as an intermediary between insurers and clients for soliciting, negotiating, and servicing insurance business." },
        { q: "Is Insurance Broker Registration in India mandatory to earn brokerage?", a: "Yes. No entity can act as an insurance broker or earn brokerage without valid registration from IRDAI." },
        { q: "Which authority regulates insurance brokers in India?", a: "Insurance brokers are regulated by the Insurance Regulatory and Development Authority of India (IRDAI)." },
        { q: "What activities can a licensed insurance broker perform?", a: "A registered broker can solicit insurance, advise clients on suitable products, negotiate terms with insurers, and assist in claims settlement." },
        { q: "What is the difference between an insurance broker and an insurance agent?", a: "An insurance broker represents the client, whereas an insurance agent represents a specific insurer." },
        { q: "Can a broker deal with multiple insurance companies?", a: "Yes. Brokers are permitted to work with multiple insurers." },
        { q: "Are there different types of insurance brokers?", a: "Yes. Direct brokers, reinsurance brokers, and composite brokers." },
        { q: "What is a direct insurance broker?", a: "A direct broker solicits life, general, or health insurance for clients." },
        { q: "What is a reinsurance broker?", a: "A reinsurance broker arranges reinsurance business between insurers." },
        { q: "What is a composite broker?", a: "A composite broker combines both direct and reinsurance broking activities." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for Insurance Broker Registration in India?", a: "Only companies registered under the Companies Act or LLPs registered under LLP Act can apply." },
        { q: "Can individuals apply for insurance broker licence?", a: "No. Individuals cannot apply for broker registration." },
        { q: "Can a partnership firm apply?", a: "No. Only company or LLP structure is permitted." },
        { q: "Is prior experience required for promoters?", a: "Promoters must satisfy fit and proper criteria and demonstrate credibility." },
        { q: "Is there any minimum educational qualification for promoters?", a: "The regulations focus on integrity and financial soundness rather than specific academic qualifications for promoters." },
        { q: "Who is a Principal Officer?", a: "The Principal Officer is the key responsible person overseeing broking operations." },
        { q: "Is Principal Officer qualification mandatory?", a: "Yes. The Principal Officer must complete prescribed training and pass examination." },
        { q: "Can a director act as Principal Officer?", a: "Yes, provided qualification requirements are met." },
        { q: "Is there any age limit to apply?", a: "The regulations do not prescribe a specific age but require legal eligibility." },
        { q: "Can a foreign shareholder invest in an insurance broking company?", a: "Foreign investment is permitted subject to applicable FDI guidelines and regulatory norms." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which law is broker registration governed?", a: "It is governed by the Insurance Act, IRDA Act, and IRDAI (Insurance Brokers) Regulations, 2018." },
        { q: "Is the registration permanent?", a: "Registration is valid subject to renewal and compliance." },
        { q: "Can IRDAI refuse registration?", a: "Yes, if eligibility, capital, or governance requirements are not met." },
        { q: "Does IRDAI conduct background checks?", a: "Yes, through fit and proper assessment." },
        { q: "Is there a Code of Conduct for brokers?", a: "Yes. Brokers must comply with prescribed ethical standards." }
      ]
    },
    {
      category: 'Registration / Application Process',
      faqs: [
        { q: "How to apply for Insurance Broker Registration in India?", a: "Application must be filed with IRDAI in prescribed format with supporting documents." },
        { q: "Is the application online?", a: "Applications are filed through IRDAI's designated mechanism." },
        { q: "What happens after submission?", a: "IRDAI scrutinises documents and may seek clarifications." },
        { q: "Is in-principle approval granted?", a: "Yes, subject to compliance of additional conditions." },
        { q: "When is final certificate issued?", a: "After all conditions are fulfilled and fees paid." },
        { q: "Can IRDAI reject incomplete applications?", a: "Yes." },
        { q: "Can an applicant reapply after rejection?", a: "Yes, subject to addressing deficiencies." }
      ]
    },
    {
      category: 'Capital, Net Worth & Infrastructure',
      faqs: [
        { q: "What is the minimum capital for direct broker?", a: "₹75 lakh." },
        { q: "What is the capital requirement for reinsurance broker?", a: "₹4 crore." },
        { q: "What is capital requirement for composite broker?", a: "₹5 crore." },
        { q: "Must capital be fully paid?", a: "Yes, it must be fully paid-up." },
        { q: "Is capital required to be maintained continuously?", a: "Yes." },
        { q: "What is minimum net worth requirement?", a: "Net worth must not fall below 50% of prescribed capital." },
        { q: "What happens if net worth falls below threshold?", a: "IRDAI may initiate action including suspension." },
        { q: "Is office infrastructure mandatory?", a: "Yes, adequate infrastructure must be demonstrated." },
        { q: "Is IT system required?", a: "Yes, proper record keeping systems are required." },
        { q: "Is professional indemnity insurance mandatory?", a: "Yes, at all times." }
      ]
    },
    {
      category: 'Documentation & Declarations',
      faqs: [
        { q: "What documents are required for broker registration?", a: "MOA, AOA, net worth certificate, business plan, fit and proper declarations, training certificates, and other prescribed documents." },
        { q: "Is a business plan mandatory?", a: "Yes." },
        { q: "What should business plan include?", a: "Financial projections, staffing plan, revenue model, and operational strategy." },
        { q: "Is board resolution required?", a: "Yes." },
        { q: "Is declaration of shareholding required?", a: "Yes." },
        { q: "Is Principal Officer training certificate required?", a: "Yes." }
      ]
    },
    {
      category: 'Timelines & Fees',
      faqs: [
        { q: "What is application fee for direct broker?", a: "₹50,000." },
        { q: "What is application fee for reinsurance broker?", a: "₹1,50,000." },
        { q: "What is application fee for composite broker?", a: "₹2,50,000." },
        { q: "How long does it take to get broker licence?", a: "Typically several months depending on scrutiny." },
        { q: "Is renewal fee applicable?", a: "Yes." }
      ]
    },
    {
      category: 'Post-Registration Compliance',
      faqs: [
        { q: "Is annual return filing mandatory?", a: "Yes." },
        { q: "Is statutory audit required?", a: "Yes." },
        { q: "Is net worth certificate required annually?", a: "Yes." },
        { q: "Is grievance redressal mechanism mandatory?", a: "Yes." },
        { q: "Can IRDAI inspect broker offices?", a: "Yes." },
        { q: "Must books of accounts be maintained?", a: "Yes." },
        { q: "Is brokerage disclosure mandatory?", a: "Yes." }
      ]
    },
    {
      category: 'Operational Restrictions & Permissions',
      faqs: [
        { q: "Can broker share commission?", a: "Only as permitted under regulations." },
        { q: "Can broker undertake other financial activities?", a: "Only if permitted and not conflicting." },
        { q: "Can broker act as insurer?", a: "No." },
        { q: "Can broker guarantee claim settlement?", a: "No." },
        { q: "Is mis-selling prohibited?", a: "Yes." }
      ]
    },
    {
      category: 'Penalties, Cancellation & Regulatory Action',
      faqs: [
        { q: "Can IRDAI suspend registration?", a: "Yes." },
        { q: "What are grounds for cancellation?", a: "Misrepresentation, capital shortfall, misconduct." },
        { q: "Can monetary penalties be imposed?", a: "Yes." },
        { q: "Can Principal Officer be debarred?", a: "Yes." },
        { q: "Can broker appeal regulatory action?", a: "Yes, as per legal remedies available." }
      ]
    },
    {
      category: 'Practical & Scenario-Based Questions',
      faqs: [
        { q: "Can an existing company convert into broker company?", a: "Yes, subject to compliance." },
        { q: "Is change in director required to be reported?", a: "Yes." },
        { q: "Is change in shareholding reportable?", a: "Yes." },
        { q: "Can broker open branch office?", a: "Yes, subject to compliance." },
        { q: "Can registration lapse?", a: "Yes, if not renewed." },
        { q: "Is prior approval needed for Principal Officer change?", a: "Yes." },
        { q: "Can broker surrender licence voluntarily?", a: "Yes." },
        { q: "Is compliance manual required?", a: "Yes." },
        { q: "Can broker operate pan-India?", a: "Yes." },
        { q: "Can broker solicit online?", a: "Yes, subject to compliance." },
        { q: "Is capital infusion allowed after registration?", a: "Yes, subject to compliance." },
        { q: "Can broker reduce capital?", a: "Only if regulatory conditions are satisfied." },
        { q: "Is appointment of compliance officer mandatory?", a: "Yes." },
        { q: "Can broker be inspected without notice?", a: "Yes." },
        { q: "Is reporting of complaints mandatory?", a: "Yes." }
      ]
    },
    {
      category: 'Advanced Operations & Compliance',
      faqs: [
        { q: "Can broker handle corporate clients?", a: "Yes." },
        { q: "Is renewal automatic?", a: "No." },
        { q: "Can broker represent foreign insurer?", a: "Subject to regulations." },
        { q: "Can broker operate without PI insurance?", a: "No." },
        { q: "Is maintenance of separate bank account required?", a: "As per regulatory requirements." },
        { q: "Can IRDAI call for additional information?", a: "Yes." },
        { q: "Can broker hold client premium?", a: "Only as permitted under regulations." },
        { q: "Is training required for employees?", a: "Yes." },
        { q: "Can broker advertise freely?", a: "Only in compliance with regulations." },
        { q: "Is registration transferable?", a: "No." },
        { q: "Can broker change category?", a: "Subject to fresh approval." },
        { q: "Is there penalty for delayed renewal?", a: "Yes." },
        { q: "Can broker be blacklisted?", a: "Yes, for serious violations." },
        { q: "Is capital locked-in?", a: "Capital must be maintained." },
        { q: "Can broker merge with another broker?", a: "Subject to regulatory approval." },
        { q: "Is IRDAI approval required before starting operations?", a: "Yes." },
        { q: "Can broker appoint sub-brokers?", a: "Subject to regulatory norms." },
        { q: "Is compliance reporting periodic?", a: "Yes." },
        { q: "Can registration be restored after suspension?", a: "Subject to regulator's satisfaction." },
        { q: "Is Insurance Broker Registration in India suitable for startups?", a: "Only if capital and compliance capacity are strong." }
      ]
    },
    {
      category: 'Net Worth & Financial Calculations',
      faqs: [
        { q: "How is net worth calculated for Insurance Broker Registration in India?", a: "Net worth is calculated based on paid-up capital and free reserves minus accumulated losses and intangible assets, as reflected in audited financial statements and certified by a Chartered Accountant." },
        { q: "Does share premium form part of net worth for broker eligibility?", a: "Yes, share premium is considered part of free reserves, provided it is not earmarked for specific liabilities." },
        { q: "Are revaluation reserves counted towards net worth?", a: "No. Revaluation reserves are not treated as free reserves for net worth calculation." },
        { q: "Can unsecured loans from promoters be counted as capital?", a: "No. Capital must be paid-up equity capital; unsecured loans do not substitute statutory capital." },
        { q: "Is there a minimum deposit requirement with a scheduled bank?", a: "Yes. A prescribed percentage of minimum capital must be maintained as a fixed deposit with a scheduled bank, as required under regulations." },
        { q: "Can the statutory deposit be withdrawn after registration?", a: "No. The deposit must be maintained as long as the registration remains valid." },
        { q: "Is professional indemnity insurance coverage linked to capital?", a: "Yes. The minimum limit of indemnity is linked to capital and category of broker as prescribed." },
        { q: "Can deductible under PI policy exceed regulatory limits?", a: "No. Deductible limits must remain within the maximum permissible percentage prescribed." }
      ]
    },
    {
      category: 'Operations Advanced',
      faqs: [
        { q: "Is outsourcing of core broking functions allowed?", a: "Core solicitation and advisory functions must remain under direct supervision; outsourcing is subject to regulatory conditions." },
        { q: "Can a broker engage in risk management consultancy beyond insurance placement?", a: "Yes, provided it is connected with insurance advisory and does not conflict with regulatory restrictions." },
        { q: "Are brokers required to maintain client-wise records of policies placed?", a: "Yes. Proper records must be maintained for inspection and audit purposes." },
        { q: "Is segregation of client funds mandatory?", a: "If handling client funds is permitted, proper segregation and accounting controls must be maintained." },
        { q: "Can brokers receive premium in their own name?", a: "Only as permitted under regulations and subject to strict accounting compliance." },
        { q: "Is maintenance of a compliance manual mandatory?", a: "Yes. Internal compliance procedures must be documented and implemented." },
        { q: "Are brokers required to appoint a designated compliance officer?", a: "Yes. A responsible officer must oversee regulatory adherence." },
        { q: "Is appointment of internal auditor mandatory?", a: "Regulations require audit compliance; internal control systems must support this." },
        { q: "Can a broker operate multiple branches without intimation?", a: "No. Branch operations must comply with regulatory disclosure norms." },
        { q: "Is change in shareholding beyond a threshold reportable?", a: "Yes. Any significant change affecting control must be reported." },
        { q: "Can a broker change its category from direct to composite?", a: "Only with fresh approval and enhanced capital compliance." },
        { q: "Is there a cap on brokerage earnings?", a: "Yes. Remuneration must remain within regulatory limits." },
        { q: "Must brokerage disclosure be made to clients?", a: "Yes. Transparency in remuneration is required." },
        { q: "Are brokers allowed to provide rebates to clients?", a: "Rebates are prohibited unless specifically permitted under insurance law." },
        { q: "Can brokers enter into referral arrangements?", a: "Only if compliant with regulatory framework and not amounting to commission sharing violations." }
      ]
    },
    {
      category: 'Training, Data & Cyber',
      faqs: [
        { q: "Are training hours mandatory for authorised employees?", a: "Yes. Specified employees must meet qualification and training requirements." },
        { q: "Is continuing professional education required?", a: "Yes, as prescribed for Principal Officer and specified persons." },
        { q: "Are brokers required to maintain data protection safeguards?", a: "Yes. Proper systems must protect client information." },
        { q: "Is cyber security framework expected from brokers?", a: "Yes. Adequate IT security measures must be maintained." },
        { q: "Can brokers issue insurance policies?", a: "No. Only insurers issue policies." },
        { q: "Are brokers permitted to underwrite risks?", a: "No. Underwriting authority lies with insurers." },
        { q: "Can brokers participate in claim negotiation?", a: "Yes, to assist clients within permitted advisory scope." },
        { q: "Is prior approval required for change in Principal Officer?", a: "Yes. Regulatory approval or intimation is required." },
        { q: "Must brokers disclose conflicts of interest?", a: "Yes. Conflict disclosure is mandatory." },
        { q: "Can brokers engage in investment advisory simultaneously?", a: "Only if separately licensed and ensuring no conflict of interest." },
        { q: "Are brokers required to maintain solvency margin?", a: "No separate solvency margin like insurers, but capital adequacy must be maintained." },
        { q: "Is appointment of statutory auditor mandatory?", a: "Yes." },
        { q: "Can brokers accept foreign reinsurance placements?", a: "Only subject to applicable reinsurance regulations." },
        { q: "Is annual compliance certification required?", a: "Yes, as part of periodic reporting obligations." },
        { q: "Can IRDAI conduct surprise inspections?", a: "Yes." }
      ]
    },
    {
      category: 'Grievance, Records & Misc',
      faqs: [
        { q: "Must brokers maintain grievance register?", a: "Yes." },
        { q: "Is complaint resolution timeline regulated?", a: "Yes, brokers must follow grievance redressal timelines." },
        { q: "Can a broker surrender licence voluntarily?", a: "Yes, subject to regulatory process." },
        { q: "Is transfer of licence permitted?", a: "No." },
        { q: "Can a broker merge with another broker?", a: "Only with prior regulatory approval." },
        { q: "Are brokers required to maintain separate records for life and general business?", a: "Yes, where applicable." },
        { q: "Is advertisement regulated?", a: "Yes. Advertising must comply with insurance regulatory norms." },
        { q: "Can broker engage telemarketing?", a: "Yes, subject to compliance with solicitation guidelines." },
        { q: "Are digital platforms allowed for solicitation?", a: "Yes, provided regulatory norms are followed." },
        { q: "Must brokers maintain board oversight on compliance?", a: "Yes. Governance accountability is expected." },
        { q: "Is there a minimum employee requirement?", a: "Regulations require adequate manpower; staffing must support operations." },
        { q: "Can net worth erosion trigger immediate suspension?", a: "Yes, if not rectified promptly." }
      ]
    },
    {
      category: 'Renewal-Specific FAQs',
      faqs: [
        { q: "When should renewal application be filed?", a: "Before expiry of existing registration." },
        { q: "Is renewal automatic upon fee payment?", a: "No. Compliance review is conducted." },
        { q: "What documents are required for renewal?", a: "Updated net worth certificate, PI insurance copy, compliance declarations, and prescribed form." },
        { q: "Is fresh business plan required at renewal?", a: "Updated financial and operational details may be required." },
        { q: "What happens if renewal application is delayed?", a: "Registration may lapse, and operations must cease." },
        { q: "Can business continue during renewal review?", a: "Only if application is filed within time and permitted by regulator." },
        { q: "Is renewal fee same as application fee?", a: "Renewal fee is prescribed separately in Schedule." },
        { q: "Is fresh fit and proper declaration required?", a: "Yes." },
        { q: "Must PI policy remain valid during renewal?", a: "Yes." },
        { q: "Is inspection conducted before renewal?", a: "IRDAI may review compliance history." },
        { q: "Can renewal be refused?", a: "Yes, if non-compliance is identified." },
        { q: "What if net worth has reduced at time of renewal?", a: "Capital must be restored before approval." },
        { q: "Is pending complaint relevant during renewal?", a: "Yes." },
        { q: "Are outstanding penalties reviewed during renewal?", a: "Yes." },
        { q: "Is compliance track record evaluated?", a: "Yes." },
        { q: "Must statutory audit be completed before renewal?", a: "Yes." },
        { q: "Is board resolution required for renewal?", a: "Generally required as internal approval." },
        { q: "Can category change be requested during renewal?", a: "Yes, subject to eligibility." },
        { q: "Is renewal period same as initial registration period?", a: "Yes, as prescribed." },
        { q: "Can renewal be granted conditionally?", a: "Yes." },
        { q: "Is capital re-verification conducted?", a: "Yes." },
        { q: "Is updated shareholding pattern required?", a: "Yes." },
        { q: "Is training compliance reviewed at renewal?", a: "Yes." },
        { q: "Can renewal be sought after expiry?", a: "Only subject to regulatory discretion." },
        { q: "Must grievance records be submitted during renewal?", a: "May be reviewed." },
        { q: "Are branch details required at renewal?", a: "Yes." },
        { q: "Is compliance officer declaration required?", a: "Yes." },
        { q: "Can renewal application be rejected due to minor delay?", a: "Regulator may take view based on circumstances." },
        { q: "Is surrender an alternative to renewal?", a: "Yes, if business is discontinued." },
        { q: "Does renewal require physical inspection?", a: "Not mandatory but possible." },
        { q: "Are changes in directors reviewed during renewal?", a: "Yes." },
        { q: "Is updated CA certificate mandatory?", a: "Yes." },
        { q: "Can renewal be denied due to governance concerns?", a: "Yes." },
        { q: "Is updated PI coverage amount verified?", a: "Yes." },
        { q: "Must compliance manual be updated at renewal?", a: "Yes." },
        { q: "Are brokerage practices reviewed?", a: "Yes." },
        { q: "Is digital compliance reviewed?", a: "Yes." },
        { q: "Are pending regulatory queries examined?", a: "Yes." },
        { q: "Is reporting delay history considered?", a: "Yes." },
        { q: "Can conditional renewal limit operations?", a: "Yes." },
        { q: "Is renewal timeline fixed?", a: "Subject to regulatory processing." },
        { q: "Can renewal be appealed if refused?", a: "Yes, through legal remedies." },
        { q: "Is renewal fee refundable if rejected?", a: "Generally not." },
        { q: "Can partial renewal be granted?", a: "Category-based approval applies." },
        { q: "Is updated organisational structure required?", a: "Yes." },
        { q: "Must bank deposit confirmation be submitted?", a: "Yes." },
        { q: "Is updated board composition filed?", a: "Yes." },
        { q: "Are compliance certificates required from Principal Officer?", a: "Yes." },
        { q: "Is there grace period after expiry?", a: "Only if permitted under regulations." },
        { q: "Can operations resume after renewal approval?", a: "Yes, upon formal confirmation." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🛡️', label: 'IRDAI' },
        { emoji: '🤝', label: 'Insurance Broker' },
        { emoji: '✅', label: 'Registration' },
        { emoji: '📜', label: 'IRDAI Regulations 2018' },
        { emoji: '👤', label: 'Direct Broker' },
        { emoji: '📜', label: 'Composite Broker' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IRDAI Services', href: '/irdai' },
        { label: 'Insurance Broker Registration' }
      ]}
      title="Insurance Broker Registration in India"
      readTime="20 min read"
      focusKeyword="Insurance Broker Registration in India"
      sections={sections}
      ctaTitle="Ready to Start Your Insurance Broker Journey?"
      ctaDescription="Get expert guidance on capital structuring, IRDAI licensing, Principal Officer onboarding, and compliance setup for your broker company."
      quickFacts={[
        { label: 'Regulator', value: 'IRDAI' },
        { label: 'Governing Regulations', value: 'IRDAI (Insurance Brokers) Regulations, 2018' },
        { label: 'Direct Broker Capital', value: '₹75 Lakhs' },
        { label: 'Reinsurance Broker Capital', value: '₹4 Crores' },
        { label: 'Composite Broker Capital', value: '₹5 Crores' },
        { label: 'Direct Broker Net Worth', value: '₹50 Lakhs' },
        { label: 'Direct Broker Statutory Deposit', value: '₹10 Lakhs' },
        { label: 'Direct Broker Application Fee', value: '₹25,000' },
        { label: 'Direct Broker Registration Fee', value: '₹50,000' },
        { label: 'Annual Renewal Fee', value: '₹50,000 + GST' },
        { label: 'Eligible Entities', value: 'Company / LLP / Co-operative Society' },
        { label: 'PI Insurance', value: 'Mandatory at all times' }
      ]}
      relatedArticles={[
        { title: 'IRDA Insurance Broker License', href: '/irdai/irda-insurance-broker-license', category: 'IRDAI', description: 'IRDA Insurance Broker License — complete regulatory guide.' },
        { title: 'Composite Insurance Broker Registration', href: '/irdai/composite-insurance-broker-registration-in-india', category: 'IRDAI', description: 'Composite Insurance Broker Registration — complete regulatory guide.' },
        { title: 'Corporate Agent Registration', href: '/irdai/corporate-agent-registration-in-india', category: 'IRDAI', description: 'Corporate Agent Registration — complete regulatory guide.' },
        { title: 'Insurance Marketing Firm License', href: '/irdai/insurance-marketing-firm-license', category: 'IRDAI', description: 'Insurance Marketing Firm License — complete regulatory guide.' }
      ]}
      finalCtaTitle="Need Expert Support for Insurance Broker Registration?"
      finalCtaDescription="Our compliance specialists provide end-to-end support for IRDAI registration, capital structuring, Principal Officer onboarding, and ongoing compliance."
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
