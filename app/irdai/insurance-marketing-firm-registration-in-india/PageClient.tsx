'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function InsuranceMarketingFirmRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Insurance Marketing Firm Registration in India',
      content: `Insurance Marketing Firm Registration in India is a structured regulatory approval granted by the Insurance Regulatory and Development Authority of India (IRDAI) under the Insurance Marketing Firm Regulations, 2015. It allows a firm to distribute specified insurance products and undertake permitted financial services in a regulated and controlled framework.

For promoters looking to enter the insurance distribution ecosystem without becoming a broker or corporate agent, this registration provides a balanced model — compliance-driven yet commercially scalable.

This guide explains Insurance Marketing Firm Registration in India from a regulatory, practical and structuring perspective.`
    },
    {
      id: 'legal-background',
      title: 'Legal Background & Regulatory Authority',
      content: `Insurance Marketing Firm Registration in India is governed by:
• Insurance Act, 1938
• IRDAI Act, 1999
• IRDAI (Registration of Insurance Marketing Firm) Regulations, 2015
• Amendments and circulars issued from time to time

The regulations prescribe:
• Eligibility conditions
• Capital and net worth norms
• Scope of activities
• Code of conduct
• Inspection powers
• Reporting obligations

The registration is mandatory before commencing operations.`
    },
    {
      id: 'what-is-imf',
      title: 'What is an Insurance Marketing Firm?',
      content: `An Insurance Marketing Firm (IMF) is a licensed intermediary permitted to:
• Distribute life, general and health insurance products (within limits prescribed)
• Market certain financial products allowed by the Authority
• Employ Insurance Sales Persons (ISPs)
• Operate in specified areas (district-based licensing structure)

It is not a broker. It does not represent all insurers. It operates within a defined regulatory perimeter.`
    },
    {
      id: 'who-needs',
      title: 'Who Needs Insurance Marketing Firm Registration in India?',
      content: `You require Insurance Marketing Firm Registration in India if:
• You want to distribute insurance products across categories
• You intend to appoint Insurance Sales Persons
• You plan structured district-based insurance marketing operations
• You want a scalable compliance-driven distribution model`
    },
    {
      id: 'who-cannot',
      title: 'Who Cannot Apply?',
      content: `The following are generally ineligible:
• Entities not incorporated as a Company or LLP
• Firms not meeting net worth requirement
• Promoters failing "Fit and Proper" criteria
• Entities previously penalised for financial misconduct
• Those lacking qualified Principal Officer`
    },
    {
      id: 'eligibility',
      title: 'Eligibility Criteria – Practical Interpretation',
      content: `Key Regulatory Requirements:

• Legal Form: Company or LLP (Private Limited preferred for scalability)
• Principal Officer: Mandatory qualification & training (should be compliance-focused)
• Fit & Proper: Integrity, no financial fraud history (background check critical)
• Net Worth: As prescribed in Regulations (must be maintained continuously)
• Infrastructure: Office space & systems (not merely paper setup)

Insurance Marketing Firm Registration in India is approval-based, not automatic.`
    },
    {
      id: 'capital',
      title: 'Capital & Net Worth Requirement',
      content: `As per the Regulations:

• Minimum Net Worth: ₹10 Lakhs (maintained at all times)
• Form: Paid-up capital in case of Company
• Maintenance: Continuous compliance required

Net worth generally includes:
• Paid-up capital
• Free reserves
• Excludes revaluation reserves

Insurance Marketing Firm Registration in India will not be granted unless capital conditions are demonstrably satisfied.`
    },
    {
      id: 'net-worth-calc',
      title: 'Net Worth Calculation – Practical Explanation',
      content: `Net Worth = Paid-Up Capital + Free Reserves – Accumulated Losses – Intangible Assets

The Authority may require:
• Chartered Accountant certification
• Latest audited financial statements
• Bank confirmation

Capital must not be encumbered.`
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Requirements',
      content: `Required Infrastructure:
• Registered Office: Physical operational base
• IT Systems: Data confidentiality
• Record Keeping: Audit traceability
• Trained Personnel: Consumer protection

Insurance Marketing Firm Registration in India is compliance-intensive even at application stage.`
    },
    {
      id: 'fit-and-proper',
      title: 'Key Managerial & Fit and Proper Criteria',
      content: `The Principal Officer must:
• Hold prescribed qualification
• Undergo mandatory training hours
• Pass examination (as specified)

Fit & Proper considerations include:
• Integrity
• No economic offences
• No regulatory blacklisting
• Sound financial record`
    },
    {
      id: 'business-plan',
      title: 'Business Plan Requirement',
      content: `A detailed business plan is required, typically covering:
• 3-year financial projection
• Revenue model
• Product strategy
• Operational geography
• ISP recruitment plan
• Risk management framework

3-Year Business Projection Flow:
Year 1 → Establishment & onboarding
Year 2 → Expansion within district
Year 3 → Operational stabilisation

Insurance Marketing Firm Registration in India depends heavily on quality of business plan documentation.`
    },
    {
      id: 'documents',
      title: 'Documents Required',
      content: `Required Documents:

• Certificate of Incorporation: Legal existence
• MOA/AOA or LLP Agreement: Object clause alignment
• Net Worth Certificate: Financial eligibility
• Principal Officer Qualification Proof: Compliance
• Fit & Proper Declaration: Governance
• Business Plan: Operational clarity
• Shareholding Pattern: Ownership transparency

Incomplete documentation leads to delays.`
    },
    {
      id: 'process',
      title: 'Step-by-Step Registration Process',
      content: `Application Filing → Document Scrutiny → Clarification Round → Interview (if required) → Approval → Certificate Issuance

Stage 1: Application submission
Stage 2: Regulatory scrutiny
Stage 3: Deficiency response
Stage 4: Approval communication

Insurance Marketing Firm Registration in India may take several months depending on scrutiny.`
    },
    {
      id: 'timeline',
      title: 'Timeline for Approval',
      content: `Indicative timeline:
• Documentation preparation: 3–4 weeks
• Filing & review: 6–12 weeks
• Clarification cycle: Variable`
    },
    {
      id: 'fees',
      title: 'Government Fees Structure',
      content: `Fee Structure:
• Application Fee: As prescribed
• Registration Fee: As prescribed
• Renewal Fee: Periodic

Fees are non-refundable in case of rejection.`
    },
    {
      id: 'certificate',
      title: 'Certificate & Scope After Approval',
      content: `Upon Insurance Marketing Firm Registration in India:
• Registration certificate issued
• District-level operational permission
• Ability to appoint ISPs
• Authorised to distribute permitted insurance categories`
    },
    {
      id: 'post-registration',
      title: 'Post-Registration Compliance',
      content: `Compliance Cycle:
Quarterly Reporting → Annual Renewal → Net Worth Monitoring → ISP Oversight → Audit → Record Maintenance

Compliance Requirements:
• Reporting: As per regulatory format
• Net Worth: Maintain ₹10 Lakhs
• Code of Conduct: Mandatory adherence
• Record Retention: Prescribed period
• Audit: Periodic`
    },
    {
      id: 'inspection',
      title: 'Inspection Powers of Regulator',
      content: `The Authority may:
• Call records
• Conduct inspection
• Seek information
• Suspend operations pending inquiry

Insurance Marketing Firm Registration in India comes with supervisory oversight.`
    },
    {
      id: 'suspension',
      title: 'Suspension / Cancellation Triggers',
      content: `Triggers and Regulatory Risk:
• Mis-selling: High
• False declarations: Severe
• Net worth erosion: Critical
• Non-reporting: Penal action
• Consumer complaints: Investigation`
    },
    {
      id: 'penalties',
      title: 'Penalties for Non-Compliance',
      content: `Penalties may include:
• Monetary fines
• Suspension
• Cancellation
• Debarment of Principal Officer

Regulatory discipline is strict in insurance distribution.`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes Applicants Make',
      content: `• Weak business plan
• Improper object clause
• Underestimated compliance costs
• Capital not properly structured
• Non-aligned shareholding

Insurance Marketing Firm Registration in India fails more often due to documentation weakness than eligibility gaps.`
    },
    {
      id: 'why-professional',
      title: 'Why Professional Structuring Improves Approval Probability',
      content: `• Proper capital structuring
• Correct drafting of business plan
• Regulatory-aligned documentation
• Anticipation of clarification queries
• Governance positioning

Insurance Marketing Firm Registration in India is not merely filing — it is regulatory positioning.

Expert Insight:
"Compliance is not a barrier to growth; it is the architecture that ensures growth does not collapse under regulatory scrutiny." — CS Devyani Khambhati, Compliance Expert

Final Advisory:
Insurance Marketing Firm Registration in India is a disciplined regulatory process designed to protect policyholders while enabling structured distribution.

Promoters should approach it with:
• Capital clarity
• Governance integrity
• Operational seriousness
• Long-term compliance mindset

A properly structured Insurance Marketing Firm Registration in India not only secures approval but builds regulatory credibility from day one.`
    },
    {
      id: 'isp-framework',
      title: 'Insurance Sales Person (ISP) Framework',
      content: `Insurance Marketing Firm Registration in India permits the appointment of Insurance Sales Persons (ISPs), who act as the frontline representatives of the firm.

Who is an ISP?
An ISP is an individual engaged by the Insurance Marketing Firm to solicit and procure insurance business, subject to regulatory training, examination, and code of conduct.

ISP Eligibility & Control Structure:
• Minimum Qualification: As prescribed (education proof must be verified)
• Mandatory Training: Prescribed hours (training completion certificate required)
• Examination: Pass required exam (through authorised body)
• Code of Conduct: Strict adherence (IMF responsible for monitoring)
• Exclusive Engagement: Cannot operate independently (must operate under registered IMF)

Insurance Marketing Firm Registration in India places supervisory responsibility on the IMF for actions of its ISPs.

ISP Supervision Model:
Principal Officer → Insurance Marketing Firm → Insurance Sales Persons → Policyholders

The Principal Officer is accountable for compliance failures of ISPs. Failure to monitor ISPs is one of the most common regulatory risks in Insurance Marketing Firm Registration in India.`
    },
    {
      id: 'district-structure',
      title: 'District-Based Operational Structure',
      content: `Insurance Marketing Firm Registration in India follows a district-based licensing framework.

Expansion Mechanism:
• Initial Approval: Specific district approval
• Expansion: Intimation / approval process
• Infrastructure Setup: Mandatory office presence
• Reporting: Updated operational data

This structure ensures controlled and supervised expansion.`
    },
    {
      id: 'renewal',
      title: 'Renewal & Continuity Requirements',
      content: `Insurance Marketing Firm Registration in India is subject to renewal.

Renewal Checklist:
• Renewal Application: Filed before expiry
• Fee Payment: As prescribed
• Net Worth Certificate: Updated CA certificate
• Compliance Confirmation: No pending violations
• ISP Details: Updated register

Delayed renewal may result in suspension of operations.`
    },
    {
      id: 'compliance-calendar',
      title: 'Post-Registration Compliance Calendar',
      content: `Annual Compliance Cycle:
Quarter 1 → Reporting
Quarter 2 → ISP Review
Quarter 3 → Internal Audit
Quarter 4 → Financial Certification

Compliance Tracking:
• Net Worth Monitoring: Continuous (CFO / Compliance)
• Regulatory Reporting: Periodic (Principal Officer)
• ISP Review: Quarterly (Operations Head)
• Financial Statements: Annual (Statutory Auditor)
• Renewal Filing: As per validity (Compliance Team)

Insurance Marketing Firm Registration in India requires internal compliance tracking systems to avoid regulatory notices.`
    },
    {
      id: 'risk-management',
      title: 'Risk Management Framework',
      content: `Insurance Marketing Firm Registration in India expects firms to build structured internal controls.

Core Risk Areas:
• Mis-selling Risk: Product suitability checks
• Documentation Risk: Standardised proposal review
• Capital Risk: Quarterly net worth review
• Regulatory Risk: Compliance officer oversight
• Reputation Risk: Complaint redressal mechanism

Compliance Risk Pyramid:
Base Layer → Documentation
Mid Layer → Supervision
Top Layer → Governance Culture`
    },
    {
      id: 'imf-vs-broker',
      title: 'Comparison – Insurance Marketing Firm vs Insurance Broker',
      content: `Insurance Marketing Firm:
• Capital Requirement: Lower
• Scope: Limited distribution
• District Restriction: Yes
• ISP Structure: Allowed
• Compliance Intensity: Moderate

Insurance Broker:
• Capital Requirement: Significantly higher
• Scope: Wider advisory & placement
• District Restriction: No district restriction
• ISP Structure: Different structure
• Compliance Intensity: High

Insurance Marketing Firm Registration in India is suitable for structured regional distribution rather than large-scale brokerage operations.`
    },
    {
      id: 'financial-projection',
      title: 'Financial Projection Framework (3-Year Model)',
      content: `A professionally drafted business plan strengthens Insurance Marketing Firm Registration in India approval probability.

Sample Financial Projection Model:
• Year 1 (Establishment Phase): High operating cost, moderate compliance cost, low net surplus
• Year 2 (Growth Phase): Stable operating cost, stable compliance cost, moderate net surplus
• Year 3 (Stabilisation): Controlled operating cost, structured compliance cost, higher net surplus

3-Year Revenue Growth Curve:
Year 1 → Setup
Year 2 → Scale
Year 3 → Profitability

Regulators assess viability, not just paperwork.`
    },
    {
      id: 'inspection-enforcement',
      title: 'Inspection & Enforcement Depth',
      content: `Insurance Marketing Firm Registration in India subjects the firm to supervisory oversight.

Regulatory authorities may:
• Conduct on-site inspection
• Review books of accounts
• Examine ISP records
• Review complaints
• Demand compliance clarification

Non-cooperation aggravates regulatory consequences.`
    },
    {
      id: 'consumer-protection',
      title: 'Consumer Protection Obligations',
      content: `Insurance Marketing Firm Registration in India emphasises policyholder interest.

Mandatory elements include:
• Transparent disclosures
• Proper proposal documentation
• Suitability assessment
• Complaint redressal system
• No rebate or unfair inducement

Policyholder protection is central to regulatory philosophy.`
    },
    {
      id: 'governance-model',
      title: 'Internal Governance Model – Recommended Structure',
      content: `Recommended Governance Structure:
Board / Partners → Principal Officer → Compliance Function → Operations & ISP Management → Finance & Net Worth Monitoring

Insurance Marketing Firm Registration in India is governance-driven, not sales-driven.`
    },
    {
      id: 'red-flags',
      title: 'Common Regulatory Red Flags',
      content: `• Rapid ISP expansion without supervision
• Weak grievance redressal
• Net worth erosion without reporting
• Improper product representation
• Failure to update changes in shareholding

Proactive disclosure reduces enforcement risk.`
    },
    {
      id: 'strategic-advice',
      title: 'Strategic Structuring Recommendations',
      content: `For promoters considering Insurance Marketing Firm Registration in India:
• Draft object clause aligned with regulations
• Structure shareholding clearly
• Appoint compliance-oriented Principal Officer
• Maintain excess capital buffer
• Create SOP manual before application

A well-structured file signals seriousness to the regulator.`
    },
    {
      id: 'closing',
      title: 'Closing Perspective',
      content: `Insurance Marketing Firm Registration in India is a disciplined regulatory gateway into the insurance distribution ecosystem.

It is best suited for:
• Regional insurance entrepreneurs
• Structured financial service firms
• Advisory-led distribution models
• Compliance-focused promoters

It is not ideal for casual or commission-only operators.`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is Insurance Marketing Firm Registration in India?", a: "Insurance Marketing Firm Registration in India is a license granted by the Insurance Regulatory and Development Authority of India (IRDAI) that permits a firm to distribute specified insurance products and undertake permitted financial service activities under a regulated framework." },
        { q: "Which authority grants Insurance Marketing Firm Registration in India?", a: "The registration is granted by the Insurance Regulatory and Development Authority of India (IRDAI), which regulates insurance intermediaries and ensures policyholder protection." },
        { q: "Is Insurance Marketing Firm Registration in India mandatory before starting operations?", a: "Yes. A firm cannot solicit or market insurance products unless it has obtained registration from IRDAI under the applicable regulations." },
        { q: "What is the objective behind regulating Insurance Marketing Firms?", a: "The objective is to ensure structured distribution of insurance products, protect policyholders, and maintain discipline and transparency in insurance marketing activities." },
        { q: "Is an Insurance Marketing Firm the same as an Insurance Broker?", a: "No. An Insurance Marketing Firm operates under a limited distribution framework and district-based structure, whereas a broker has a broader scope and higher capital requirements." },
        { q: "Can an existing financial services company apply for Insurance Marketing Firm Registration in India?", a: "Yes, provided it meets eligibility criteria prescribed under the regulations, including legal form, net worth, and fit and proper requirements." },
        { q: "What activities are permitted under Insurance Marketing Firm Registration in India?", a: "The firm can distribute life, general, and health insurance products as permitted and may also undertake certain other financial services allowed by IRDAI." },
        { q: "Is Insurance Marketing Firm Registration in India valid nationwide?", a: "The registration follows a district-based operational model. Expansion to additional districts requires compliance with prescribed procedures." },
        { q: "Can an Insurance Marketing Firm appoint employees to sell policies?", a: "Yes, it may appoint Insurance Sales Persons (ISPs) who meet qualification and training requirements prescribed by IRDAI." },
        { q: "Does Insurance Marketing Firm Registration in India allow online insurance sales?", a: "Online sales are permitted only if conducted within the regulatory framework and compliance requirements specified by IRDAI." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for Insurance Marketing Firm Registration in India?", a: "A company incorporated under the Companies Act or a Limited Liability Partnership (LLP) meeting prescribed eligibility conditions may apply." },
        { q: "Can an individual apply for Insurance Marketing Firm Registration in India?", a: "No. Individuals cannot apply directly. The applicant must be a company or LLP." },
        { q: "Can a partnership firm apply for Insurance Marketing Firm Registration in India?", a: "No. Only a company or LLP structure is eligible under the regulations." },
        { q: "Is prior experience in insurance mandatory for promoters?", a: "The regulations focus on fit and proper criteria and the qualification of the Principal Officer. Promoters must meet integrity and financial soundness requirements." },
        { q: "What is meant by 'fit and proper' criteria?", a: "It refers to integrity, financial soundness, absence of criminal convictions for financial offences, and regulatory compliance history." },
        { q: "Is there any minimum educational qualification required?", a: "The Principal Officer must meet the educational and training requirements prescribed under the regulations." },
        { q: "Can a director of another insurance intermediary become a promoter?", a: "This depends on compliance with conflict-of-interest provisions and fit and proper criteria under the regulations." },
        { q: "Can an NBFC apply for Insurance Marketing Firm Registration in India?", a: "Yes, provided it complies with both IRDAI regulations and applicable RBI directions." },
        { q: "Is foreign investment permitted in an Insurance Marketing Firm?", a: "Foreign investment must comply with applicable insurance sector and FDI regulations." },
        { q: "Can an LLP convert into a company after obtaining registration?", a: "Any structural change requires regulatory intimation and approval where prescribed." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which regulations is Insurance Marketing Firm Registration in India governed?", a: "It is governed by the IRDAI (Registration of Insurance Marketing Firm) Regulations, 2015 and subsequent amendments." },
        { q: "Is the Insurance Act, 1938 applicable to Insurance Marketing Firms?", a: "Yes. The Insurance Act, 1938 applies as part of the broader legal framework governing insurance intermediaries." },
        { q: "Are IRDAI circulars binding on Insurance Marketing Firms?", a: "Yes. Circulars and guidelines issued by IRDAI must be complied with." },
        { q: "Does IRDAI have inspection powers over Insurance Marketing Firms?", a: "Yes. IRDAI may conduct inspections, call for information, and examine records." },
        { q: "Is code of conduct compliance mandatory?", a: "Yes. The firm and its Insurance Sales Persons must adhere to the code of conduct prescribed by IRDAI." }
      ]
    },
    {
      category: 'Registration / Application Process',
      faqs: [
        { q: "How do I apply for Insurance Marketing Firm Registration in India?", a: "The application must be submitted to IRDAI in the prescribed format along with required documents and fees." },
        { q: "Is there a prescribed application form?", a: "Yes. The regulations specify the application form and required annexures." },
        { q: "What happens after submitting the application?", a: "IRDAI scrutinises the application, may seek clarifications, and grants approval if satisfied." },
        { q: "Is an interview conducted during the registration process?", a: "IRDAI may require interaction with the Principal Officer or promoters." },
        { q: "Can IRDAI reject the application?", a: "Yes. If eligibility or documentation requirements are not met, the Authority may reject the application." },
        { q: "Is there a resubmission process after rejection?", a: "A fresh application may be filed after addressing deficiencies." },
        { q: "Does IRDAI provide a deficiency memo?", a: "If documents or clarifications are insufficient, IRDAI may seek additional information." },
        { q: "Is physical presence required during the process?", a: "Interaction may be required depending on the Authority's review process." },
        { q: "How long does it take to get Insurance Marketing Firm Registration in India?", a: "The timeline depends on completeness of documentation and regulatory scrutiny." },
        { q: "When does the registration become effective?", a: "The registration becomes effective upon issuance of the certificate by IRDAI." }
      ]
    },
    {
      category: 'Capital, Net Worth & Infrastructure',
      faqs: [
        { q: "What is the minimum net worth required for Insurance Marketing Firm Registration in India?", a: "The regulations prescribe a minimum net worth of ₹10 lakh to be maintained at all times." },
        { q: "Does net worth need to be maintained continuously?", a: "Yes. Continuous maintenance of prescribed net worth is mandatory." },
        { q: "How is net worth calculated?", a: "Net worth is generally calculated based on paid-up capital and free reserves, excluding intangible assets and accumulated losses." },
        { q: "Is a Chartered Accountant certificate required for net worth?", a: "Yes. A certified net worth certificate is typically required during application and compliance." },
        { q: "Can borrowed funds be treated as capital?", a: "Capital must reflect genuine equity contribution and meet regulatory criteria." },
        { q: "Is office infrastructure mandatory?", a: "Yes. Adequate office infrastructure is required for operational and record-keeping purposes." },
        { q: "Are IT systems mandatory?", a: "Yes. Proper systems must be maintained for data security and compliance monitoring." }
      ]
    },
    {
      category: 'Documentation & Declarations',
      faqs: [
        { q: "What documents are required for Insurance Marketing Firm Registration in India?", a: "Documents include incorporation certificate, constitutional documents, net worth certificate, Principal Officer details, and business plan." },
        { q: "Is a business plan mandatory?", a: "Yes. A detailed business plan including financial projections is required." },
        { q: "Is a fit and proper declaration required?", a: "Yes. Promoters and key personnel must submit declarations confirming compliance." },
        { q: "Are KYC documents of directors required?", a: "Yes. Identity and background details are required." },
        { q: "Is a shareholding pattern disclosure required?", a: "Yes. Full disclosure of ownership structure must be provided." }
      ]
    },
    {
      category: 'Timelines & Fees',
      faqs: [
        { q: "What is the application fee for Insurance Marketing Firm Registration in India?", a: "Application fees are prescribed in the regulations and must be paid at the time of filing." },
        { q: "Is the application fee refundable?", a: "No. Fees are generally non-refundable even if registration is not granted." },
        { q: "Is there a registration fee payable after approval?", a: "Yes. A registration fee is payable upon grant of approval." },
        { q: "Is renewal fee required?", a: "Yes. Registration is subject to renewal upon payment of prescribed fees." },
        { q: "How often must registration be renewed?", a: "Renewal frequency is governed by the validity period specified in the regulations." }
      ]
    },
    {
      category: 'Post-Registration Compliance',
      faqs: [
        { q: "What compliance is required after obtaining Insurance Marketing Firm Registration in India?", a: "The firm must maintain net worth, file reports, monitor ISPs, and comply with code of conduct." },
        { q: "Is periodic reporting mandatory?", a: "Yes. Reporting requirements are prescribed by IRDAI." },
        { q: "Must financial statements be submitted?", a: "Yes. Audited financial statements may be required." },
        { q: "Is record maintenance compulsory?", a: "Yes. Records must be maintained for prescribed periods." },
        { q: "Can IRDAI conduct surprise inspections?", a: "Yes. The Authority has inspection and supervisory powers." }
      ]
    },
    {
      category: 'Operational Restrictions & Permissions',
      faqs: [
        { q: "Can an Insurance Marketing Firm represent multiple insurers?", a: "The number and type of insurers represented are subject to regulatory limits." },
        { q: "Can it provide advisory services?", a: "Activities must remain within the permitted scope defined under the regulations." },
        { q: "Can it operate in multiple districts?", a: "Expansion is allowed subject to compliance and procedural requirements." },
        { q: "Can it collect premiums directly?", a: "Collection must follow regulatory guidelines and insurer arrangements." },
        { q: "Can it outsource sales?", a: "Activities must comply with regulatory framework and accountability norms." }
      ]
    },
    {
      category: 'Penalties, Cancellation & Regulatory Action',
      faqs: [
        { q: "What are the penalties for operating without Insurance Marketing Firm Registration in India?", a: "Unauthorised insurance solicitation may attract regulatory penalties under the Insurance Act and IRDAI framework." },
        { q: "Can IRDAI suspend the registration?", a: "Yes. Suspension may occur for regulatory violations." },
        { q: "Can registration be cancelled permanently?", a: "Yes. Serious non-compliance may result in cancellation." },
        { q: "Is mis-selling punishable?", a: "Yes. Misrepresentation or unfair practices may lead to disciplinary action." },
        { q: "What happens if net worth falls below prescribed limit?", a: "The firm must restore net worth, failing which regulatory action may follow." }
      ]
    },
    {
      category: 'Practical & Scenario-Based Questions',
      faqs: [
        { q: "Can an Insurance Marketing Firm shift its registered office?", a: "Yes, but regulatory intimation and approval requirements must be followed." },
        { q: "Can directors change after registration?", a: "Changes in directors must be reported to IRDAI as required." },
        { q: "Can the firm voluntarily surrender its registration?", a: "Yes, subject to compliance with regulatory procedures." },
        { q: "Is there a cooling-off period after cancellation?", a: "Reapplication is subject to regulatory evaluation." },
        { q: "Can the Principal Officer be replaced?", a: "Yes, but replacement must meet qualification and regulatory approval conditions." },
        { q: "What happens if an ISP violates the code of conduct?", a: "The firm is responsible and must take corrective action." },
        { q: "Can an Insurance Marketing Firm convert into a broker?", a: "A separate licensing process under broker regulations would apply." },
        { q: "Is GST applicable on commission earned?", a: "Taxation matters are governed by applicable tax laws." },
        { q: "Can the firm advertise insurance products?", a: "Advertising must comply with IRDAI's advertisement and disclosure guidelines." },
        { q: "Is grievance redressal mechanism mandatory?", a: "Yes. A proper grievance redressal system must be maintained." },
        { q: "Can it engage in other financial services?", a: "Only those permitted under IRDAI regulations." },
        { q: "Does IRDAI publish the list of registered Insurance Marketing Firms?", a: "Yes. Registered entities are typically listed publicly." },
        { q: "Is digital record-keeping acceptable?", a: "Yes, if maintained securely and accessible for inspection." }
      ]
    },
    {
      category: 'Operational & Advanced Topics',
      faqs: [
        { q: "Can family members of promoters act as ISPs?", a: "Yes, subject to meeting eligibility and training criteria." },
        { q: "Is insurance exam mandatory for ISPs?", a: "Yes. Prescribed examination and training must be completed." },
        { q: "Can an IMF operate from home office?", a: "Infrastructure must meet regulatory expectations for operational control." },
        { q: "Is there a limit on number of ISPs?", a: "Operational capacity must align with supervision ability." },
        { q: "What happens if the firm fails to renew registration?", a: "Operations must cease until renewal is approved." },
        { q: "Can an IMF merge with another IMF?", a: "Such restructuring requires regulatory approval." },
        { q: "Can commission rates be negotiated freely?", a: "Commission structure must align with insurer agreements and regulatory norms." },
        { q: "Is professional indemnity insurance required?", a: "Insurance intermediary regulations may prescribe insurance cover requirements." },
        { q: "Can IRDAI demand additional documents after registration?", a: "Yes. The Authority can seek information at any time." },
        { q: "Does the firm need a compliance officer?", a: "While not separately mandated, compliance responsibility rests with the Principal Officer and management." },
        { q: "Can the firm appoint sub-agents?", a: "Only Insurance Sales Persons as permitted under regulations." },
        { q: "Is PAN and GST registration mandatory?", a: "Statutory registrations must comply with applicable tax laws." },
        { q: "What is the validity period of registration?", a: "Validity is governed by IRDAI regulations and subject to renewal." },
        { q: "Can an IMF engage in micro-insurance distribution?", a: "Permitted activities must align with IRDAI guidelines." },
        { q: "Is annual audit mandatory?", a: "Financial audit requirements apply as per applicable laws." },
        { q: "Can IRDAI impose monetary fines?", a: "Yes. Monetary penalties may be imposed for violations." },
        { q: "Is training of ISPs a one-time requirement?", a: "Continuing compliance with training norms is expected." },
        { q: "Can registration be transferred?", a: "Registration is entity-specific and not transferable." },
        { q: "Can the firm expand to another state?", a: "Expansion must follow district-based operational approval structure." },
        { q: "Is Insurance Marketing Firm Registration in India suitable for startups?", a: "It is suitable for startups that can meet capital, compliance, and governance requirements prescribed by IRDAI." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🛡️', label: 'IRDAI' },
        { emoji: '📣', label: 'Insurance Marketing Firm' },
        { emoji: '📣', label: 'IMF' },
        { emoji: '📜', label: 'IRDAI Regulations 2015' },
        { emoji: '📦', label: 'Insurance Distribution' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IRDAI Services', href: '/irdai' },
        { label: 'Insurance Marketing Firm Registration' }
      ]}
      title="Insurance Marketing Firm Registration in India"
      readTime="18 min read"
      focusKeyword="Insurance Marketing Firm Registration in India"
      sections={sections}
      ctaTitle="Ready to Start Your Insurance Marketing Firm?"
      ctaDescription="Get expert guidance on capital structuring, IRDAI licensing, Principal Officer onboarding, ISP appointment, and compliance setup."
      quickFacts={[
        { label: 'Regulator', value: 'IRDAI' },
        { label: 'Governing Regulations', value: 'IRDAI (Registration of IMF) Regulations, 2015' },
        { label: 'Eligible Entities', value: 'Company / LLP' },
        { label: 'Minimum Net Worth', value: '₹10 Lakhs' },
        { label: 'Operational Model', value: 'District-Based Licensing' },
        { label: 'Sales Force', value: 'Insurance Sales Persons (ISPs)' },
        { label: 'Application Fee', value: 'As prescribed by IRDAI' },
        { label: 'Registration Fee', value: 'As prescribed by IRDAI' },
        { label: 'Renewal', value: 'Periodic — before expiry' },
        { label: 'Documentation Timeline', value: '3–4 weeks' },
        { label: 'Filing & Review', value: '6–12 weeks' },
        { label: 'Lines Available', value: 'Life, General, Health' }
      ]}
      relatedArticles={[
        { title: 'IRDA Insurance Broker License', href: '/irdai/irda-insurance-broker-license', category: 'IRDAI', description: 'IRDA Insurance Broker License — complete regulatory guide.' },
        { title: 'Insurance Broker Registration', href: '/irdai/insurance-broker-registration-in-india', category: 'IRDAI', description: 'Insurance Broker Registration — complete regulatory guide.' },
        { title: 'Composite Insurance Broker Registration', href: '/irdai/composite-insurance-broker-registration-in-india', category: 'IRDAI', description: 'Composite Insurance Broker Registration — complete regulatory guide.' },
        { title: 'Corporate Agent Registration', href: '/irdai/corporate-agent-registration-in-india', category: 'IRDAI', description: 'Corporate Agent Registration — complete regulatory guide.' }
      ]}
      finalCtaTitle="Need Expert Support for Insurance Marketing Firm Registration?"
      finalCtaDescription="Our compliance specialists provide end-to-end support for IRDAI registration, capital structuring, Principal Officer onboarding, ISP framework, and ongoing compliance."
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
