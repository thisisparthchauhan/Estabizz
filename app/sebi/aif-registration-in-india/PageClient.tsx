'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function AIFRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'AIF Registration in India',
      content: `AIF Registration in India is the regulatory approval granted by the Securities and Exchange Board of India (SEBI) to privately pooled investment vehicles operating under the SEBI (Alternative Investment Funds) Regulations, 2012, as amended up to November 19, 2025.

If you are planning to launch a venture capital fund, private equity fund, debt fund, hedge fund, infrastructure fund, angel fund or social impact fund — AIF Registration in India is mandatory before raising capital.

This guide explains the entire framework in a structured, SEBI-aligned manner.`
    },
    {
      id: 'overview',
      title: 'Overview of AIF Registration in India',
      content: `An Alternative Investment Fund is:
• A privately pooled investment vehicle
• Established in India as a Trust / Company / LLP / Body Corporate
• Collecting funds from Indian or foreign investors
• Investing as per a defined investment policy
• Not regulated under Mutual Fund or CIS Regulations`
    },
    {
      id: 'why-aif',
      title: 'Why AIF Registration in India?',
      content: `Without AIF Registration:
• You cannot pool capital legally
• You risk regulatory enforcement under SEBI Act
• You cannot market to institutional investors

With AIF Registration:
• Legal fund structuring
• Institutional investor confidence
• Tax pass-through eligibility (for Category I & II)
• Structured governance
• Global fundraising credibility`
    },
    {
      id: 'categories',
      title: 'Categories under AIF Registration in India',
      content: `• Category I — Venture/SME/Social/Infra — No leverage — Positive spillover impact
• Category II — PE / Debt — No leverage (except limited borrowing) — Commercial returns
• Category III — Hedge / Trading — Leverage allowed — Market strategy returns
• Specified AIF — Special structures — As notified — Regulatory purpose`
    },
    {
      id: 'category-1-examples',
      title: 'Category I AIF Examples (25+ Business Objects)',
      content: `• Venture Capital Fund
• Angel Fund
• SME Fund
• Social Impact Fund
• Infrastructure Fund
• Special Situation Fund
• Startup Technology Fund
• Deep Tech Innovation Fund
• Climate Infrastructure Fund
• Renewable Energy Fund
• Agri-Tech Venture Fund
• Healthcare Innovation Fund
• Defence Manufacturing Fund
• EV Mobility Fund
• Impact Investing Fund
• Education Innovation Fund
• Microfinance Impact Fund
• Rural Development Fund
• Affordable Housing Fund
• Fintech Startup Fund
• AI & Robotics Fund
• ESG Infrastructure Fund
• Digital Bharat Fund
• Women Entrepreneurship Fund
• Social Stock Exchange Impact Fund`
    },
    {
      id: 'category-2-examples',
      title: 'Category II AIF Examples',
      content: `• Private Equity Fund
• Growth Capital Fund
• Buyout Fund
• Distressed Debt Fund
• Credit Opportunities Fund
• Mezzanine Fund
• Structured Debt Fund
• Real Estate PE Fund
• NBFC Debt Fund
• Pre-IPO Fund
• PIPE Investment Fund
• Fund of Funds
• Corporate Credit Fund
• Secondary Market PE Fund
• Mid-Market Growth Fund
• Acquisition Fund
• Special Credit Fund
• Family Office Fund
• Strategic Investment Fund
• Infrastructure Debt Fund
• Real Estate Credit Fund
• Corporate Bond Fund (Unlisted Focus)
• Asset Reconstruction Investment Fund
• Supply Chain Finance Fund
• Emerging Companies Fund`
    },
    {
      id: 'category-3-examples',
      title: 'Category III AIF Examples',
      content: `• Hedge Fund
• Long-Short Equity Fund
• Arbitrage Fund
• Quant Strategy Fund
• High Frequency Trading Fund
• Derivatives Strategy Fund
• Commodity Derivatives Fund
• Macro Trading Fund
• Structured Products Fund
• Event Driven Fund
• Market Neutral Fund
• Volatility Fund
• Global Macro Fund
• Options Trading Fund
• Credit Default Swap Fund
• Multi-Strategy Fund
• Crypto-Linked Structured Strategy Fund (subject to regulatory clarity)
• Algorithmic Trading Fund
• Tactical Allocation Fund
• Risk Parity Fund
• Leveraged Equity Fund
• Short Bias Fund
• Systematic Trading Fund
• Hybrid Arbitrage Fund
• Alternative Beta Fund`
    },
    {
      id: 'capital',
      title: 'Capital & Investment Requirements (SEBI)',
      content: `Minimum Corpus Per Scheme:
• General Scheme — ₹20 Crore
• Social Impact Fund Scheme — ₹5 Crore

Minimum Investment Per Investor:
• General Investor — ₹1 Crore
• Manager/Employee — ₹25 Lakh
• Social Impact Fund (certain cases) — ₹2 Lakh
• Accredited Investors — Relaxations available

Sponsor/Manager Continuing Interest:
• Category I & II — 2.5% of corpus OR ₹5 Crore (lower)
• Category III — 5% of corpus OR ₹10 Crore (lower)`
    },
    {
      id: 'fees',
      title: 'Application Fees & Registration Fees',
      content: `(Extracted from Second Schedule structure under AIF Regulations)

• Category I — Application Fee ₹1,00,000 — Registration Fee ₹5,00,000
• Category II — Application Fee ₹1,00,000 — Registration Fee ₹10,00,000
• Category III — Application Fee ₹1,00,000 — Registration Fee ₹15,00,000

(Scheme filing fee payable before launch, except first scheme)`
    },
    {
      id: 'eligibility',
      title: 'Eligibility for AIF Registration in India',
      content: `• Legal Form — Trust / LLP / Company
• Private Placement — No public solicitation
• MOA/Trust Deed — Must permit AIF activity
• Fit & Proper — As per Intermediaries Regulations
• Investment Team — Certified personnel required
• Infrastructure — Adequate manpower & systems
• Investment Objective — Clearly defined`
    },
    {
      id: 'net-worth',
      title: 'Net Worth Requirements',
      content: `SEBI does not prescribe corpus-based net worth for AIF entity itself but:
• Manager must have adequate infrastructure
• Continuing interest must be maintained
• Financial capability must support operations

Practical structuring suggests:
• ₹5–10 crore net worth for Manager entity
• Adequate working capital for 24 months`
    },
    {
      id: 'scheme-types',
      title: 'What Type of Schemes Can Be Launched?',
      content: `• Category I — Close-ended (Min 3 years)
• Category II — Close-ended (Min 3 years)
• Category III — Open or Close-ended
• Accredited Investor Fund — Extended tenure allowed`
    },
    {
      id: 'scheme-design',
      title: 'Key Points While Designing an AIF Scheme',
      content: `Scheme Structuring Flow:
Investment Thesis → Target Investors → Category Selection → Risk Framework → Tenure Structure → Distribution Waterfall → Compliance Matrix

Critical Regulatory Design Areas:
• 25% concentration limit (Category I & II)
• 10% limit (Category III)
• No leverage except permitted
• Associate transactions need 75% investor approval
• Demat holding requirement
• Scheme filing 30 days prior to launch`
    },
    {
      id: 'ppm',
      title: 'Private Placement Memorandum (PPM)',
      content: `Mandatory Disclosures:
• Investment strategy
• Targeted investors
• Fees & expenses
• Risk factors
• Tenure
• Conflict management
• Winding up
• Key service providers
• Committee structure
• Disciplinary history

PPM Design Checklist:
• Investment Mandate — Clear & measurable
• Risk Section — Detailed and realistic
• Fee Disclosure — Transparent
• Conflict Policy — Robust
• Valuation Policy — Defined methodology
• Governance — Investment committee terms
• Exit Strategy — Clear`
    },
    {
      id: 'process',
      title: 'AIF Registration Process',
      content: `Structuring of Trust / LLP
        ↓
Drafting PPM
        ↓
Filing Form A with SEBI
        ↓
SEBI Clarifications
        ↓
In-Principle Approval
        ↓
Registration Fee Payment
        ↓
Certificate Grant`
    },
    {
      id: 'documents',
      title: 'Documents Required',
      content: `• Form A — Yes
• Trust Deed / LLP Agreement — Yes
• MOA/AOA — If Company
• PPM Draft — Yes
• KMP Details — Yes
• Net worth Certificate — Yes
• Infrastructure Details — Yes
• Fit & Proper Declarations — Yes
• Business Plan (3-year projection) — Strongly advised
• Sponsor Contribution Proof — Yes`
    },
    {
      id: 'kmp',
      title: 'AIF KMP Requirements',
      content: `• At least one certified professional
• Finance / CA / CFA / MBA qualification
• Valid certification
• Clean regulatory history
• Adequate experience`
    },
    {
      id: 'post-registration',
      title: 'Post Registration Activities',
      content: `After AIF Registration in India:
• Raise capital via private placement
• Launch schemes
• Invest as per category rules
• Appoint custodian
• File periodic returns
• Maintain books
• Conduct audit`
    },
    {
      id: 'rejection',
      title: 'When SEBI May Reject Application',
      content: `• Incomplete documents — Improper structuring
• Ambiguous strategy — Overly broad object clause
• Weak KMP — No certified personnel
• Conflict risk — Associate transactions
• Past regulatory issues — Sponsor history
• Public solicitation risk — Improper marketing`
    },
    {
      id: 'mandatory-registrations',
      title: 'Post-Registration Mandatory Registrations',
      content: `• PAN
• GST (if applicable)
• FIU-IND (if reporting entity)
• Demat connectivity
• Custodian appointment
• Auditor appointment`
    },
    {
      id: 'compliance-calendar',
      title: 'Compliance Calendar (Illustrative)',
      content: `• Quarterly Reporting to SEBI — Quarterly
• Annual Audit — Annual
• Investor Reporting — Quarterly
• Valuation — Periodic
• KYC Updates — Ongoing
• Leverage Reporting (Cat III) — Periodic`
    },
    {
      id: 'books',
      title: 'Books & Accounts',
      content: `• Separate bank accounts
• Corpus tracking
• Capital call records
• Investment register
• Valuation files
• Audit working papers
• Distribution waterfall tracking

"In fund management, compliance is not an obstacle to performance — it is the architecture that protects performance." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'advanced-ppm',
      title: 'Advanced PPM Structuring – Clause-by-Clause Guidance',
      content: `When preparing a Private Placement Memorandum for AIF Registration in India, SEBI expects not just disclosure — but structured governance clarity.

A. Fund Constitution Section:
• Legal structure (Trust/LLP/Company)
• Sponsor identity
• Manager details
• Trustee responsibilities
• Category of AIF
• Scheme type (open/close-ended)

B. Investment Strategy & Policy — must clearly define:
• Sector focus
• Instrument type (equity, CCPS, debt, derivatives)
• Geographic exposure
• Stage of investment
• Ticket size range
• Co-investment policy
• Exit mechanisms

Avoid vague wording like "invest across sectors". SEBI often raises queries where mandate is overly broad.

C. Risk Factors must include:
• Regulatory risk
• Liquidity risk
• Valuation risk
• Associate transaction risk
• Leverage risk (Category III)
• Taxation risk
• Manager dependency risk

D. Fee & Expense Disclosure:
• Management Fee — Basis & percentage
• Performance Fee / Carried Interest — Waterfall clarity
• Hurdle Rate — If applicable
• Setup Costs — Who bears
• Operational Expenses — Allocation method
• Associate Fees — Disclosure required

E. Governance & Conflict Framework — SEBI closely examines:
• Investment Committee constitution
• Voting rights
• Associate transaction approval (75% investor consent)
• Conflict disclosure mechanism
• Related party policy

F. Valuation Methodology — must define:
• Frequency of valuation
• Valuer qualification
• Fair value methodology
• Write-down policy
• Independent valuation requirement

G. Distribution Waterfall:
Return of Capital → Hurdle Return → Catch-Up (if any) → Carried Interest → Residual Distribution`
    },
    {
      id: 'co-investment',
      title: 'Co-Investment Scheme Framework (2025 Amendment)',
      content: `As per September 09, 2025 Circular:

Category I & II AIFs may offer co-investment through:
• PMS Route
• CIV Scheme Route

CIV Scheme Key Conditions:
• Separate Bank & Demat — Mandatory
• Ring-fencing — Required
• Investment Cap — 3x investor's proportion (with exceptions)
• No Leverage — Strictly prohibited
• Separate PPM Filing — Required
• Compliance Test Report inclusion — Mandatory

This has materially changed structuring strategy under AIF Registration in India.`
    },
    {
      id: 'ai-only-lvf',
      title: 'AI-Only Schemes & LVF Framework',
      content: `As per December 08, 2025 Circular:

AI-Only Scheme:
• Only Accredited Investors
• Name must include "AI only fund"
• AI status remains valid through scheme life
• Extension cap: 5 years total

Large Value Fund (LVF):
• For accredited investors
• Exempt from standard PPM template
• No annual PPM audit requirement

Migration requires:
• Positive consent of ALL investors
• Reporting to SEBI within 15 days`
    },
    {
      id: 'angel-fund',
      title: 'Angel Fund – Special Chapter',
      content: `Angel Funds fall under Category I but have special conditions:

• Min corpus — ₹10 Crore
• Min investment per angel — ₹25 Lakh
• Lock-in — Minimum 3 years
• Max number of investors per scheme — Limited
• Investment in startups — As defined

Angel Funds require very precise PPM drafting.`
    },
    {
      id: 'leverage',
      title: 'Leverage & Borrowing Matrix',
      content: `• Category I — No leverage — Except temporary borrowing
• Category II — No leverage — Except temporary borrowing
• Category III — Yes — Subject to disclosure & limits
• CIV Scheme — No — Prohibited

Leverage misuse is a major enforcement trigger.`
    },
    {
      id: 'inspection',
      title: 'Inspection Powers of SEBI',
      content: `Under SEBI Act & AIF Regulations, SEBI may:
• Inspect books
• Call for documents
• Conduct inquiry
• Issue directions
• Impose penalty
• Suspend or cancel registration`
    },
    {
      id: 'suspension',
      title: 'Grounds for Suspension / Cancellation',
      content: `• Misrepresentation in PPM — Serious violation
• Breach of concentration norms — Repeated violation
• Unauthorized leverage — Category I/II
• Non-filing of returns — Chronic default
• Investor complaint — Substantiated
• Fraudulent activity — Immediate action`
    },
    {
      id: 'sop',
      title: 'Internal SOP for AIF Registration in India',
      content: `Sponsor Evaluation
        ↓
Category Mapping
        ↓
Trust Structuring
        ↓
PPM Drafting
        ↓
Investment Committee Formation
        ↓
Manager Certification Check
        ↓
Compliance Framework Drafting
        ↓
Form A Filing
        ↓
SEBI Query Management
        ↓
Registration Grant`
    },
    {
      id: 'mandatory-appointments',
      title: 'Post Registration – Mandatory Registrations & Appointments',
      content: `• PAN — Yes
• TAN — Yes
• GST — If applicable
• Demat connectivity — Yes
• Custodian Appointment — Mandatory (based on size)
• Banker Appointment — Yes
• Auditor Appointment — Yes
• Valuer Appointment — Yes`
    },
    {
      id: 'compliance-detailed',
      title: 'Compliance Calendar – Detailed',
      content: `• Quarterly Report — Cat I & II: Yes | Cat III: Yes
• Annual Audit — Cat I & II: Yes | Cat III: Yes
• Valuation Report — Cat I & II: Periodic | Cat III: More frequent
• Leverage Report — Cat I & II: NA | Cat III: Required
• PPM Audit — Cat I & II: Yes | Cat III: Yes (except LVF exemption)
• Compliance Test Report — Cat I & II: Mandatory | Cat III: Mandatory`
    },
    {
      id: 'books-detail',
      title: 'Accounting & Books of Account',
      content: `AIF must maintain:
• Capital contribution register
• Investor ledger
• Investment register
• Expense allocation ledger
• Bank reconciliation
• Valuation working papers
• Distribution statements
• Associate transaction file

Books must be maintained scheme-wise.`
    },
    {
      id: 'cdmdf',
      title: 'CDMDF Clarification',
      content: `Corporate Debt Market Development Fund (CDMDF) is classified as Category I AIF.

This demonstrates SEBI's flexibility in creating special-purpose AIF structures.`
    },
    {
      id: 'business-plan',
      title: '3-Year Business Plan Framework',
      content: `While SEBI does not formally mandate submission of a 3-year financial projection in all cases, in practice, a well-prepared business plan significantly strengthens approval probability.

A. Executive Overview — Category of AIF, Target corpus, Sponsor profile, Investment focus, Target investor segment, Expected deployment timeline

B. Corpus Planning Model (illustrative ₹150 Cr commitments):
• Year 1 — 40% drawdown — ₹60 Cr invested
• Year 2 — 35% drawdown — ₹52.5 Cr invested
• Year 3 — 25% drawdown — ₹37.5 Cr invested

C. Revenue Model (Manager Level):
• Management Fee — % of committed or invested capital
• Performance Fee — % of profits above hurdle
• Setup Fee — One-time (if applicable)
• Advisory Income — If permitted

D. Expense Model:
• Team salary
• Office infrastructure
• Custodian fees
• Legal & compliance
• Audit & valuation
• Technology systems
• Insurance (D&O)

E. Breakeven Analysis demonstrates:
• At what corpus level manager becomes cash positive
• Sensitivity to delayed fundraising
• Stress test scenario (50% corpus)`
    },
    {
      id: 'scheme-engineering',
      title: 'Scheme Engineering – Tenure & Concentration',
      content: `Tenure Planning:
• Category I — 3 years minimum — Up to 2 years extension (75% investor approval)
• Category II — 3 years minimum — Same
• Category III — Flexible — As per PPM
• AI-only Scheme — Extension cap 5 years total

Concentration Limits:
• Category I & II — 25% of corpus single investee limit
• Category III — 10% of corpus single investee limit

These limits must be reflected in PPM and internal compliance dashboard.`
    },
    {
      id: 'capital-call',
      title: 'Capital Call Mechanics',
      content: `Capital Call Flow:
Investment Approval → Capital Call Notice (10–15 days) → Investor Remittance → Deployment → Default Action (if any)

PPM must clearly define:
• Notice period
• Default penalty
• Dilution mechanism
• Forfeiture clause`
    },
    {
      id: 'investor-onboarding',
      title: 'Investor Onboarding Compliance Framework',
      content: `For AIF Registration in India, onboarding must include:
• KYC verification
• Accredited Investor status (if applicable)
• AML screening
• Source of funds confirmation
• FATCA/CRS declaration
• Investor agreement execution

For AI-only schemes, investor status must be validated at onboarding stage.`
    },
    {
      id: 'taxation',
      title: 'Taxation Positioning (High-Level)',
      content: `• Category I — Pass-through (subject to conditions)
• Category II — Pass-through
• Category III — Taxed at fund level in many cases

GST applicability depends on management fee structure. Proper structuring during AIF Registration in India impacts long-term tax efficiency.`
    },
    {
      id: 'wind-up',
      title: 'Wind-Up & Liquidation Framework',
      content: `SEBI Regulations provide for:
• Expiry of tenure
• Investor consent for early winding
• SEBI direction
• 75% investor consent for extension
• Distribution of assets
• Final audit
• Intimation to SEBI

Improper winding up is a high-risk compliance area.`
    },
    {
      id: 'risk-map',
      title: 'Advanced Compliance Risk Map',
      content: `• Over-concentration — High severity — Mitigation: Automated tracking
• Associate transactions — High severity — Mitigation: Investor approval
• Leverage breach — Critical severity — Mitigation: Internal audit
• Delayed reporting — Medium severity — Mitigation: Compliance calendar
• Valuation dispute — High severity — Mitigation: Independent valuer
• KMP resignation — Medium severity — Mitigation: Succession plan`
    },
    {
      id: 'internal-control',
      title: 'Internal Control Architecture',
      content: `A professionally structured AIF Registration in India setup should include:
• Investment Committee Charter
• Conflict Register
• Compliance Officer Appointment
• Risk Register
• Insider Trading Policy
• Code of Conduct
• Whistleblower Policy
• Valuation Committee
• IT & Data Security Policy`
    },
    {
      id: 'query-management',
      title: 'SEBI Query Management Strategy',
      content: `During AIF Registration in India process, SEBI commonly seeks clarification on:
• Investment objective clarity
• Sponsor background
• Conflict framework
• Associate exposure
• Fee disclosure
• PPM inconsistencies
• KMP qualification

Response strategy:
• Point-wise reply
• Revised PPM with tracked changes
• Supporting documentary proof
• Legal justification
• Timely response (within prescribed window)

Delay in response is often treated negatively.`
    },
    {
      id: 'timeline',
      title: 'Practical Timeline for AIF Registration in India',
      content: `• Structuring — 3–4 weeks
• Filing Form A — Day 0
• SEBI Initial Review — 30–60 days
• Query Round — Variable
• In-principle Approval — Post clarification
• Fee Payment — Within specified period
• Registration Certificate — Post payment

Total realistic timeline: 3–6 months depending on complexity.`
    },
    {
      id: 'operational-readiness',
      title: 'Operational Readiness Checklist Before Launch',
      content: `• PPM finalized
• Bank account opened
• Demat account opened
• Custodian appointed
• Valuer appointed
• Auditor appointed
• Investor agreement executed
• Capital call system ready
• Compliance reporting template ready`
    },
    {
      id: 'post-registration-activities',
      title: 'What Activities Can Be Done Post AIF Registration?',
      content: `Once registration is granted:
• Raise capital privately
• Launch schemes
• Invest in permitted instruments
• Offer co-investment (if applicable)
• Convert to AI-only or LVF (subject to conditions)
• Create multiple schemes under umbrella registration`
    },
    {
      id: 'ppm-master-structure',
      title: 'AIF PPM Master Draft Structure (40-Clause Framework)',
      content: `When preparing PPM for AIF Registration in India, professional drafting must follow a structured compliance architecture.

SECTION A – CONSTITUTIONAL DISCLOSURES:
1. Definitions & Interpretation
2. Regulatory Background (SEBI AIF Regulations reference)
3. Legal Structure (Trust / LLP / Company)
4. Sponsor Details
5. Manager Details
6. Trustee Details
7. Category of AIF
8. Scheme Structure
9. Tenure & Extension

SECTION B – INVESTMENT FRAMEWORK:
10. Investment Objective
11. Investment Strategy
12. Target Sectors
13. Permissible Instruments
14. Investment Restrictions
15. Diversification & Concentration Norms
16. Leverage Policy (if Category III)
17. Co-Investment Policy (CIV/PMS route)
18. Associate Transaction Policy
19. Exit Strategy

SECTION C – GOVERNANCE & RISK:
20. Investment Committee Constitution
21. Voting Framework
22. Conflict of Interest Policy
23. Risk Management Policy
24. Valuation Policy
25. Custody & Asset Holding Mechanism
26. Borrowing Policy
27. Insurance Coverage

SECTION D – INVESTOR ECONOMICS:
28. Capital Commitment
29. Capital Call Process
30. Default Consequences
31. Management Fee
32. Carried Interest
33. Hurdle Rate
34. Distribution Waterfall
35. Expenses & Cost Allocation

SECTION E – OPERATIONAL & COMPLIANCE:
36. Reporting & Disclosure
37. Audit & Valuation Frequency
38. Winding Up Mechanism
39. SEBI Inspection & Powers
40. Investor Rights & Grievance Mechanism`
    },
    {
      id: 'ic-structure',
      title: 'Investment Committee Structuring Strategy',
      content: `SEBI expects credible governance.

Recommended IC Structure:
• Chairperson — Independent or Sponsor representative
• Investment Expert — Domain specialist
• Finance Expert — CA/CFA
• Compliance Representative — Internal control oversight
• Observer (optional) — Trustee nominee

Avoid concentration of power in one individual.`
    },
    {
      id: 'investor-default',
      title: 'Investor Default Framework',
      content: `PPM must clearly define:
• Notice period
• Interest penalty
• Suspension of rights
• Dilution of units
• Forfeiture clause
• Legal recovery

Ambiguity here is frequently questioned during AIF Registration in India.`
    },
    {
      id: 'associate-governance',
      title: 'Associate Transaction Governance',
      content: `Any transaction with:
• Sponsor
• Manager
• Group entity
• Related party

Requires:
• Disclosure
• 75% investor approval
• Documentation trail

SEBI treats conflict management as a serious compliance test.`
    },
    {
      id: 'valuation-governance',
      title: 'Valuation Governance Architecture',
      content: `Mandatory Components:
• Independent Valuer — As per regulations
• Frequency — Periodic
• Methodology — Clearly disclosed
• Write-down policy — Defined
• Audit oversight — Required

Valuation disputes are one of the most common investor complaints.`
    },
    {
      id: 'books-registers',
      title: 'Books of Account – Detailed Register List',
      content: `Under AIF Registration in India, books must be maintained scheme-wise.

Core Registers:
• Capital Commitment Register
• Capital Call Register
• Investor Ledger
• Investment Register
• Valuation Register
• Distribution Register
• Expense Allocation Register
• Associate Transaction Register
• Compliance Filing Register
• IC Resolution Register

Books must support SEBI inspection.`
    },
    {
      id: 'compliance-lifecycle',
      title: 'Compliance Lifecycle Model',
      content: `Post-Registration Compliance Cycle:
Capital Raise → Investment Deployment → Valuation → Reporting → Audit → Compliance Test Report → SEBI Filing → Cycle Repeats

Compliance Test Report must include circular compliance including AI-only/LVF provisions.`
    },
    {
      id: 'rejection-triggers',
      title: 'When SEBI Returns / Closes / Rejects Application',
      content: `Common Real-World Triggers:
• Vague Investment Strategy — Misleading solicitation risk
• Weak Sponsor Background — Investor protection concern
• Poorly Drafted PPM — Disclosure deficiency
• Inadequate Infrastructure — Operational risk
• Conflict Exposure — Governance failure
• Inconsistent Fee Structure — Investor exploitation risk
• Non-response to Queries — Procedural non-cooperation

AIF Registration in India requires disciplined, timely response.`
    },
    {
      id: 'enforcement-matrix',
      title: 'Enforcement Risk Matrix',
      content: `• Leverage breach — Severe action
• Associate misuse — Suspension risk
• Fraud / Misrepresentation — Cancellation
• Chronic non-reporting — Penalty
• Investor complaint upheld — Inquiry`
    },
    {
      id: 'compliance-manual',
      title: 'Internal Compliance Manual – Suggested Chapters',
      content: `• Regulatory Overview
• Category Compliance
• Investment Approval Process
• Conflict Policy
• Valuation Manual
• Capital Call SOP
• Reporting Framework
• SEBI Filing SOP
• Record Retention Policy
• AML & KYC Policy
• Data Security Policy
• Whistleblower Policy

A documented internal manual significantly reduces regulatory risk.`
    },
    {
      id: 'data-tech',
      title: 'Data & Technology Governance',
      content: `Modern AIF Registration in India requires:
• Secure data storage
• Access control
• Cyber policy
• Backup & recovery protocol
• Demat reconciliation process
• MIS reporting dashboard`
    },
    {
      id: 'final-checklist',
      title: 'Final Professional Structuring Advice',
      content: `Before filing for AIF Registration in India, ensure:
• Category selection aligns with strategy
• PPM is precise, not generic
• Sponsor net worth documented
• IC members credible
• Conflict matrix prepared
• Financial projection realistic
• Compliance officer designated
• Infrastructure documented

Regulatory scrutiny today is deeper than ever.

"A well-structured fund is not built on capital alone; it is built on discipline, disclosure, and integrity." — CS Devyani Khambhati – Compliance Expert

"True fund leadership lies not in how capital is deployed, but in how responsibility is structured before capital is raised." — CS Devyani Khambhati – Compliance Expert

"A disciplined fund structure is the silent assurance behind every successful investment story." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'closing',
      title: 'Closing Insight',
      content: `AIF Registration in India is a long-term regulatory commitment.

The fund's credibility is tested not at launch — but through every quarterly filing, valuation report, and investor communication.

AIF Registration in India is not just a licensing process — it is the creation of a regulated investment ecosystem. It is a strategic structuring exercise involving:
• Capital engineering
• Governance design
• Compliance architecture
• Investor psychology
• Regulatory interpretation`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is AIF Registration in India?", a: "AIF Registration in India refers to obtaining approval from the Securities and Exchange Board of India (SEBI) to operate a privately pooled investment vehicle under the SEBI (Alternative Investment Funds) Regulations, 2012. Without registration, pooling funds for investment is not permitted." },
        { q: "Is AIF Registration in India mandatory before raising funds?", a: "Yes. Any entity intending to pool capital from investors for investment under the AIF framework must first obtain registration from SEBI. Fundraising without registration may attract regulatory action." },
        { q: "Who regulates AIF Registration in India?", a: "AIF Registration in India is regulated by SEBI under the SEBI Act, 1992 and the SEBI (Alternative Investment Funds) Regulations, 2012, including amendments and circulars issued from time to time." },
        { q: "What is an Alternative Investment Fund under Indian law?", a: "An Alternative Investment Fund is a privately pooled investment vehicle established in India that collects funds from investors for investing according to a defined investment policy, and is not covered under mutual fund or collective investment scheme regulations." },
        { q: "Can an unregistered fund operate as an AIF in India?", a: "No. Operating as an AIF without registration is not permitted and may lead to regulatory proceedings under SEBI's enforcement powers." },
        { q: "What are the categories of AIF under SEBI regulations?", a: "SEBI classifies AIFs into Category I, Category II and Category III based on investment strategy, economic intent, and leverage permissions." },
        { q: "What is the difference between Category I, II and III AIF?", a: "Category I focuses on socially or economically desirable sectors. Category II includes private equity and debt funds. Category III allows leverage and complex trading strategies." },
        { q: "Can foreign investors invest in an AIF registered in India?", a: "Yes, subject to applicable FEMA regulations and SEBI AIF Regulations. Foreign investors can participate through private placement." },
        { q: "What is the minimum tenure for AIF schemes?", a: "Category I and II schemes must generally be close-ended with a minimum tenure of three years. Category III may be open or close-ended." },
        { q: "Can one AIF launch multiple schemes?", a: "Yes. Once registered, an AIF can launch multiple schemes under the same registration, subject to SEBI filing requirements." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for AIF Registration in India?", a: "A Trust, Company, LLP or body corporate established in India may apply, provided it meets eligibility and regulatory requirements." },
        { q: "Can an LLP apply for AIF Registration?", a: "Yes, LLPs are permitted structures under the AIF Regulations." },
        { q: "Can a private limited company apply for AIF Registration?", a: "Yes, provided its constitutional documents permit such activity." },
        { q: "Can an individual apply for AIF Registration?", a: "No. An individual cannot directly apply. The AIF must be structured as a legal entity." },
        { q: "Is prior experience mandatory for sponsor or manager?", a: "SEBI expects adequate professional experience and qualification of key management personnel to ensure proper management." },
        { q: "What is meant by 'fit and proper' criteria?", a: "The sponsor, manager and key personnel must meet integrity, reputation, competence and financial soundness standards prescribed under SEBI regulations." },
        { q: "Can a startup promoter apply for AIF Registration?", a: "Yes, provided regulatory requirements including infrastructure, governance and compliance capability are met." },
        { q: "Is net worth mandatory for the sponsor?", a: "The regulations require sponsor/manager to maintain continuing interest in the fund. Financial capability is assessed during registration." },
        { q: "Can an NBFC apply for AIF Registration?", a: "Yes, subject to compliance with both RBI and SEBI frameworks, where applicable." },
        { q: "Can an existing unregistered fund convert into a registered AIF?", a: "Only through proper application and compliance with SEBI Regulations. Unregistered pooling activity may attract scrutiny." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which law is AIF Registration governed?", a: "Under the SEBI Act, 1992 and the SEBI (Alternative Investment Funds) Regulations, 2012." },
        { q: "Are circulars issued by SEBI binding on AIFs?", a: "Yes. SEBI circulars issued under its regulatory powers are binding and must be complied with." },
        { q: "What is the role of the Master Circular for AIFs?", a: "The Master Circular consolidates operational guidelines, reporting standards, PPM filing requirements and compliance instructions." },
        { q: "What is an AI-only scheme in AIF?", a: "An AI-only scheme is restricted exclusively to Accredited Investors and must comply with naming and reporting conditions specified by SEBI." },
        { q: "Can existing AIF schemes convert into AI-only schemes?", a: "Yes, subject to investor consent and compliance with SEBI's specified conditions." },
        { q: "What is a Large Value Fund (LVF)?", a: "An LVF caters to accredited investors and is granted certain compliance relaxations under SEBI circulars." },
        { q: "Is co-investment allowed in AIF?", a: "Yes. Category I and II AIFs may offer co-investment through permitted routes subject to regulatory conditions." },
        { q: "What is the Compliance Test Report?", a: "It is a periodic report prepared by the manager and overseen by trustee/sponsor to confirm regulatory compliance." },
        { q: "Can SEBI inspect an AIF?", a: "Yes. SEBI has inspection, inquiry and enforcement powers under the Act and Regulations." },
        { q: "Are associate transactions permitted?", a: "Yes, but subject to disclosure and investor approval requirements." }
      ]
    },
    {
      category: 'Registration Process',
      faqs: [
        { q: "How do I apply for AIF Registration in India?", a: "By filing Form A with SEBI along with prescribed documents and application fee." },
        { q: "What is Form A in AIF Registration?", a: "Form A is the prescribed application form under the AIF Regulations." },
        { q: "Is PPM required at the time of application?", a: "Yes, a draft Private Placement Memorandum must be submitted." },
        { q: "How long does SEBI take to process AIF application?", a: "Processing time varies depending on completeness of documents and clarification rounds. Realistic timeline: 3–6 months." },
        { q: "Does SEBI ask for clarifications during application?", a: "Yes, SEBI may seek clarifications or additional information before granting approval." },
        { q: "Is in-principle approval issued?", a: "SEBI may issue communication seeking fee payment after satisfaction of compliance." },
        { q: "When is registration fee payable?", a: "After SEBI grants approval, before issuance of registration certificate." },
        { q: "Can application be withdrawn?", a: "Yes, subject to SEBI procedures." },
        { q: "What happens if application is incomplete?", a: "SEBI may return or reject the application." },
        { q: "Is there a validity period for approval?", a: "Registration remains valid unless suspended or cancelled." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '📊', label: 'SEBI' },
        { emoji: '💎', label: 'AIF' },
        { emoji: '💎', label: 'Alternative Investment Fund' },
        { emoji: '📜', label: 'AIF Regulations 2012' },
        { emoji: '1️⃣', label: 'Category I' },
        { emoji: '2️⃣', label: 'Category II' },
        { emoji: '3️⃣', label: 'Category III' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'SEBI Services', href: '/sebi' },
        { label: 'AIF Registration' }
      ]}
      title="AIF Registration in India"
      readTime="30 min read"
      focusKeyword="AIF Registration in India"
      sections={sections}
      ctaTitle="Ready to Launch Your Alternative Investment Fund?"
      ctaDescription="Get expert guidance on Category selection, Form A filing with SEBI, PPM drafting (40-clause framework), Trust/LLP structuring, sponsor continuing interest, and end-to-end SEBI registration."
      quickFacts={[
        { label: 'Regulator', value: 'SEBI' },
        { label: 'Governing Regulations', value: 'SEBI AIF Regulations, 2012 (Updated Nov 19, 2025)' },
        { label: 'Master Circular', value: 'May 07, 2024' },
        { label: 'Eligible Form', value: 'Trust / LLP / Company / Body Corporate' },
        { label: 'Min Corpus per Scheme', value: '₹20 Crore (₹5 Cr for Social Impact)' },
        { label: 'Min Investment per Investor', value: '₹1 Crore (₹25 Lakh employee)' },
        { label: 'Cat I Registration Fee', value: '₹5,00,000 (App ₹1L)' },
        { label: 'Cat II Registration Fee', value: '₹10,00,000 (App ₹1L)' },
        { label: 'Cat III Registration Fee', value: '₹15,00,000 (App ₹1L)' },
        { label: 'Sponsor Interest (Cat I/II)', value: '2.5% of corpus or ₹5 Cr (lower)' },
        { label: 'Sponsor Interest (Cat III)', value: '5% of corpus or ₹10 Cr (lower)' },
        { label: 'Approval Timeline', value: '3–6 months' }
      ]}
      relatedArticles={[
        { title: 'AIF Compliance Test Report', href: '/sebi/aif-compliance-test-report', category: 'SEBI', description: 'AIF Compliance Test Report — complete regulatory guide.' },
        { title: 'Alternative Asset Portfolio Valuation', href: '/sebi/alternative-asset-portfolio-valuation', category: 'SEBI', description: 'Alternative Asset Portfolio Valuation — complete regulatory guide.' },
        { title: 'Mutual Fund Registration', href: '/sebi/mutual-fund-registration', category: 'SEBI', description: 'Mutual Fund Registration — complete regulatory guide.' },
        { title: 'AMFI Registration', href: '/sebi/amfi-registration', category: 'SEBI', description: 'AMFI Registration — complete regulatory guide.' },
        { title: 'REIT Registration', href: '/sebi/reit-registration', category: 'SEBI', description: 'REIT Registration — complete regulatory guide.' },
        { title: 'Collective Investment Schemes', href: '/sebi/collective-investment-schemes', category: 'SEBI', description: 'Collective Investment Schemes — complete regulatory guide.' }
      ]}
      finalCtaTitle="Need Expert Support for AIF Registration?"
      finalCtaDescription="Our compliance specialists provide end-to-end AIF registration support — Trust/LLP structuring, PPM drafting (40-clause framework), Form A filing, SEBI query management, Investment Committee constitution, sponsor continuing interest planning, and ongoing post-registration compliance including PPM audit, Compliance Test Report, and category-specific reporting."
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
        <h2>Frequently Asked Questions (40 FAQs)</h2>
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
