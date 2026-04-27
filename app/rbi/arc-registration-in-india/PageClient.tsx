'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function ARCRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'ARC Registration in India',
      content: `ARC Registration in India is governed by the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002 (SARFAESI Act) and regulated through the Master Direction – Reserve Bank of India (Asset Reconstruction Companies) Directions, 2024, updated up to April 23, 2025.

Asset Reconstruction Companies (ARCs) play a structured role in India's financial system by acquiring stressed financial assets from banks and financial institutions and attempting resolution through legally recognised recovery mechanisms. ARC Registration in India is therefore not merely a licensing formality; it is a prudential entry gate into a tightly regulated resolution ecosystem.

This guide explains ARC Registration in India in a practical, compliance-oriented manner aligned with the RBI Master Direction.`
    },
    {
      id: 'legal-framework',
      title: 'Legal Framework Governing ARC Registration in India',
      content: `ARC Registration in India is required under:
• Section 3 of the SARFAESI Act, 2002
• Master Direction – RBI (Asset Reconstruction Companies) Directions, 2024
• Directions issued under Sections 3, 9, 10, 12 and 12A of the Act

No entity can commence the business of securitisation or asset reconstruction without obtaining a Certificate of Registration (CoR) from the Reserve Bank of India.`
    },
    {
      id: 'what-is-arc',
      title: 'What is an Asset Reconstruction Company?',
      content: `An Asset Reconstruction Company is a specialised financial entity that:
• Acquires non-performing or stressed financial assets from banks and financial institutions
• Issues Security Receipts (SRs) to Qualified Buyers
• Implements structured recovery strategies such as restructuring, settlement, enforcement, debt-to-equity conversion or management change
• Operates securitisation schemes through trusts

ARC Registration in India authorises the company to undertake both securitisation and asset reconstruction activities.`
    },
    {
      id: 'who-needs',
      title: 'Who Requires ARC Registration in India?',
      content: `• Company acquiring NPAs from banks — Yes — Mandatory under Section 3
• Entity issuing Security Receipts — Yes — SRs recognised as securities
• ARC acting as Resolution Applicant under IBC — Yes — Subject to additional conditions
• Bank restructuring own portfolio — No — Governed by banking law`
    },
    {
      id: 'capital-nof',
      title: 'Minimum Capital Requirement – Net Owned Fund (NOF)',
      content: `As per paragraph 7 of the Master Direction:

An ARC must maintain a minimum Net Owned Fund (NOF) of ₹300 crore on an ongoing basis.

For ARCs existing as on October 11, 2022, a glide path was prescribed:
• October 11, 2022 — ₹100 crore
• March 31, 2024 — ₹200 crore
• March 31, 2026 — ₹300 crore

Failure to comply may invite supervisory action, including prohibition on incremental business.`
    },
    {
      id: 'nof-computation',
      title: 'Net Owned Fund – Computation Method',
      content: `Owned Fund includes:
• Paid-up equity capital
• Compulsorily convertible preference capital
• Free reserves (excluding revaluation reserve)
• Credit balance in Profit and Loss Account

Less:
• Accumulated losses
• Intangible assets
• Short provisions
• Excess group exposures beyond prescribed threshold

Net Owned Fund Structure:
Paid-up Equity + Convertible Preference Capital + Free Reserves − Intangible Assets − Group Exposures beyond threshold = Net Owned Fund (Minimum ₹300 Crore)`
    },
    {
      id: 'capital-adequacy',
      title: 'Capital Adequacy Requirement',
      content: `ARC Registration in India requires maintenance of a minimum Capital Adequacy Ratio of 15% of total risk-weighted assets.

Risk Weights:
• Cash and Bank Deposits — 0%
• Government Securities — 0%
• Other Assets — 100%
• Contingent Liabilities — 50%

Capital for this purpose is defined as Net Owned Fund.`
    },
    {
      id: 'permissible-activities',
      title: 'Permissible Activities after ARC Registration in India',
      content: `An ARC may undertake:
• Acquisition of financial assets
• Securitisation through issuance of Security Receipts
• Change or takeover of management
• Rescheduling of debts
• Settlement of dues
• Conversion of debt into equity
• Acting as Resolution Applicant under IBC (subject to ₹1,000 crore NOF and governance conditions)`
    },
    {
      id: 'restrictions',
      title: 'Key Restrictions Applicable to ARCs',
      content: `ARC Registration in India comes with regulatory limitations:
• ARCs cannot accept public deposits
• Investment in land/building is restricted, except for limited own-use and enforcement acquisitions
• Bilateral acquisition from sponsor banks is restricted
• SRs are privately placed and transferable only to Qualified Buyers`
    },
    {
      id: 'process',
      title: 'Step-by-Step ARC Registration Process',
      content: `Incorporation of Company
        ↓
Capital Infusion (₹300 Crore NOF)
        ↓
Preparation of Business Plan and Policies
        ↓
Online Application Filing with RBI
        ↓
Submission to Department of Regulation
        ↓
Regulatory Scrutiny and Clarifications
        ↓
Grant of Certificate of Registration

Application must be submitted to the Chief General Manager-in-Charge, Department of Regulation, RBI, Central Office, Mumbai.`
    },
    {
      id: 'documents',
      title: 'Documents Required for ARC Registration in India',
      content: `• MOA authorising securitisation and reconstruction — Mandatory
• Capital Proof (₹300 crore) — Mandatory
• Detailed Business Plan — Mandatory
• Board-Approved Asset Acquisition Policy — Mandatory
• Fair Practices Code — Mandatory
• Sponsor Declaration (Form I) — Mandatory
• Director Fit & Proper Declaration (Annex II & III) — Mandatory
• Board Resolution — Mandatory`
    },
    {
      id: 'governance',
      title: 'Governance Structure Requirements',
      content: `ARC Registration in India demands strong governance architecture.

• Independent Chairperson — Required
• Audit Committee — Mandatory
• Nomination & Remuneration Committee — Mandatory
• Independent Advisory Committee (IAC) — Required for settlement and takeover cases
• Age Limit for MD/CEO — 70 years
• Maximum Continuous Tenure — 15 years`
    },
    {
      id: 'realisation-framework',
      title: 'Asset Realisation Framework',
      content: `Planning Period: Maximum 6 months
Realisation Period: 5 years
Extended Period: Maximum 8 years from acquisition

Asset Realisation Timeline:
Acquisition Date → Planning Period (6 Months) → Realisation (Up to 5 Years) → Board Approved Extension (Max 8 Years Total)`
    },
    {
      id: 'security-receipts',
      title: 'Security Receipts Framework',
      content: `Key provisions applicable after ARC Registration in India:
• ARC must invest minimum 15% of transferor investment or 2.5% of total SRs issued, whichever is higher
• Mandatory recovery rating within six months
• NAV declaration half-yearly
• Rating on recovery risk basis

NAV Calculation: Recovery Rating % × Face Value of SR = NAV`
    },
    {
      id: 'provisioning',
      title: 'Provisioning Norms',
      content: `• Sub-Standard — 10%
• Doubtful — 50% plus unsecured portion
• Loss — 100% write-off`
    },
    {
      id: 'post-registration',
      title: 'Post-Registration Compliance Obligations',
      content: `• CIC Reporting — Fortnightly
• NAV Disclosure — Half-yearly
• Audited Balance Sheet Submission — Within one month of AGM
• SARFAESI Possession Disclosure — Monthly website update
• Capital Adequacy Monitoring — Ongoing`
    },
    {
      id: 'inspection',
      title: 'Inspection and Supervisory Powers',
      content: `RBI may:
• Conduct inspections
• Seek clarifications
• Call for additional information
• Impose supervisory restrictions

Non-compliance attracts penal consequences under the Act.`
    },
    {
      id: 'common-challenges',
      title: 'Common Structuring Challenges in ARC Registration in India',
      content: `• Improper NOF computation
• Weak acquisition policy drafting
• Governance gaps
• Inadequate sponsor due diligence documentation
• Insufficient capital adequacy modelling

ARC Registration in India is evaluated holistically — not only on capital strength but also on governance credibility.

"In regulated sectors, credibility is built before capital is deployed. Regulatory approval follows institutional maturity." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'timeline',
      title: 'Timeline for ARC Registration in India',
      content: `• Preparation & Documentation — 4 to 6 weeks
• RBI Scrutiny — 3 to 6 months
• Clarifications — Case-specific
• Grant of CoR — Subject to satisfaction

Upon grant of Certificate of Registration, the ARC must commence business within six months, extendable to twelve months.`
    },
    {
      id: 'business-plan-framework',
      title: 'Business Plan & Financial Projection Framework',
      content: `ARC Registration in India is not granted merely on fulfilment of the ₹300 crore Net Owned Fund requirement. The Reserve Bank of India evaluates whether the applicant has a credible, sustainable and risk-aware business model. A well-structured business plan is therefore central to ARC Registration in India.`
    },
    {
      id: 'business-model',
      title: 'Business Model Architecture for ARC Registration in India',
      content: `An ARC's business model typically revolves around:
• Acquisition of stressed assets from banks and financial institutions
• Structuring securitisation schemes through trusts
• Issuance of Security Receipts (SRs) to Qualified Buyers
• Recovery through restructuring, settlement, enforcement or management change
• Distribution of realisations to SR holders

ARC Business Model Flow:
Bank NPA Portfolio → Due Diligence & Valuation → Acquisition by ARC → SR Issuance to Qualified Buyers → Recovery / Resolution Strategy → Realisation & Distribution

For ARC Registration in India, RBI assesses whether this cycle is supported by adequate capital, governance and operational infrastructure.`
    },
    {
      id: 'business-plan-components',
      title: 'Mandatory Components of the Business Plan',
      content: `A structured business plan for ARC Registration in India should cover the following:

Promoter Background and Strategic Intent:
• Profile of sponsors
• Financial strength
• Past experience in financial services or stressed asset resolution
• Rationale for entering asset reconstruction business

RBI places significant emphasis on "fit and proper" assessment of sponsors and directors.`
    },
    {
      id: 'market-opportunity',
      title: 'Market Opportunity Assessment',
      content: `The business plan should clearly define:
• Target asset classes (corporate, MSME, retail secured, infrastructure)
• Geographic focus
• Sectoral exposure strategy
• Competitive positioning

ARC Registration in India is strengthened when the applicant demonstrates focused strategy rather than generic asset acquisition intent.`
    },
    {
      id: 'acquisition-strategy',
      title: 'Acquisition Strategy',
      content: `As required under the Master Direction, the ARC must frame a Board-approved acquisition policy within 90 days of grant of CoR.

The business plan should outline:
• Valuation methodology
• Discount modelling
• Risk categorisation
• Due diligence framework
• Internal approval process`
    },
    {
      id: 'resolution-strategy',
      title: 'Resolution and Recovery Strategy',
      content: `The business plan must describe:
• Settlement framework
• Restructuring models
• Legal enforcement approach
• IBC participation strategy
• Debt-to-equity conversion parameters

Realisation timelines must align with regulatory caps (planning period and maximum 8-year outer limit).`
    },
    {
      id: 'projection-model',
      title: 'Three-Year Financial Projection Model',
      content: `RBI expects financial projections to demonstrate viability and capital adequacy sustainability.

Assumptions Framework:
• Assets Under Management (AUM): Year 1 ₹1,500 Cr | Year 2 ₹3,000 Cr | Year 3 ₹5,000 Cr
• Average Acquisition Discount: Year 1 60% | Year 2 55% | Year 3 50%
• Average Recovery Rate: Year 1 35% | Year 2 40% | Year 3 45%
• Operating Cost Ratio: Year 1 8% | Year 2 7% | Year 3 6%

These numbers are illustrative. Actual projections must be realistic and conservative.

Revenue typically includes:
• Management fees on SR schemes
• Upside sharing upon recovery
• Resolution-linked income`
    },
    {
      id: 'capital-adequacy-monitoring',
      title: 'Capital Adequacy Monitoring Projection',
      content: `ARC Registration in India requires maintenance of minimum 15% Capital Adequacy Ratio.

CAR Computation:
Net Owned Fund (₹300 Cr+) ÷ Risk Weighted Assets = CAR (Must be ≥ 15%)

The business plan must show:
• Year-wise CAR computation
• Impact of asset growth on capital
• Contingency capital infusion plan`
    },
    {
      id: 'cash-flow',
      title: 'Cash Flow Planning',
      content: `Cash flow planning must consider:
• Capital locked in minimum SR holding (15% of transferor investment or 2.5% of total SRs, whichever higher)
• Operational expenditure
• Legal costs
• Technology investment
• Rating fees

A prudent ARC demonstrates liquidity management discipline.`
    },
    {
      id: 'organisational-structure',
      title: 'Organisational Structure Plan',
      content: `ARC Registration in India requires defined governance architecture.

Proposed Organogram:
Board of Directors → Audit Committee → Nomination & Remuneration Committee → Independent Advisory Committee → CEO / MD → Risk | Legal | Operations | Finance | Recovery Teams

Independent Advisory Committee involvement is mandatory in specified settlement and management takeover cases.`
    },
    {
      id: 'technology',
      title: 'Technology and Infrastructure Plan',
      content: `RBI expects adequate systems to support:
• Asset tracking
• SR accounting
• NAV computation
• Regulatory reporting
• SARFAESI disclosures

Monthly website disclosure of enforcement actions is mandated.`
    },
    {
      id: 'risk-management',
      title: 'Risk Management Framework',
      content: `The business plan must articulate:
• Credit risk management
• Operational risk controls
• Legal risk mitigation
• Valuation controls
• Conflict of interest safeguards

ARC Registration in India is strengthened when risk oversight is institutionalised rather than promoter-driven.`
    },
    {
      id: 'compliance-architecture',
      title: 'Compliance Architecture After ARC Registration in India',
      content: `The financial projection must account for recurring compliance obligations.

• CIC Reporting — Fortnightly
• NAV Disclosure — Half-yearly
• Audited Financial Submission — Within one month of AGM
• Capital Adequacy Monitoring — Continuous
• Board Fit & Proper Review — Annual`
    },
    {
      id: 'sensitivity',
      title: 'Sensitivity Analysis',
      content: `A robust ARC business plan includes:
• Scenario of delayed recovery
• Lower-than-expected resolution values
• Increased litigation timeline
• Capital erosion impact

RBI evaluates resilience under stress.`
    },
    {
      id: 'rbi-queries',
      title: 'Common RBI Query Areas During ARC Registration',
      content: `• Source and layering of capital
• Sponsor background verification
• Experience of management team
• Justification for projected recovery rates
• Governance independence
• Conflict of interest safeguards

A professionally prepared application anticipates these areas.`
    },
    {
      id: 'capital-planning',
      title: 'Strategic Capital Planning for ARC Registration in India',
      content: `Given the ₹300 crore minimum Net Owned Fund requirement, promoters should consider:
• Staggered capital infusion plan
• Future rights issue strategy
• Institutional investor participation
• Internal accrual reinvestment

Capital planning must align with asset growth.`
    },
    {
      id: 'implementation-timeline',
      title: 'Implementation Timeline Model',
      content: `ARC Business Launch Timeline:
• Month 1–2: Incorporation & Capital Structuring
• Month 3–4: Policy Drafting & Application Filing
• Month 5–8: RBI Review & Clarifications
• Month 9: Grant of CoR
• Month 10–12: Operational Launch

Actual timelines depend on regulatory satisfaction.`
    },
    {
      id: 'strategic-advisory',
      title: 'Strategic Advisory Note',
      content: `ARC Registration in India is not a passive investment vehicle licence. It is a governance-intensive regulatory approval requiring capital strength, disciplined management and credible recovery expertise.

"Financial restructuring is as much about integrity of process as it is about recovery of value. Regulatory confidence is earned through structure, not speed." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'final-observations',
      title: 'Final Observations',
      content: `ARC Registration in India represents entry into India's formal stressed asset resolution framework under direct RBI supervision. A carefully structured business plan, realistic financial projections, disciplined capital adequacy modelling and robust governance architecture significantly improve the probability of approval.

ARC Registration in India is among the most capital-intensive and compliance-driven financial licenses under RBI supervision. With a minimum ₹300 crore Net Owned Fund requirement, strict capital adequacy norms, strong governance mandates, structured securitisation rules, and close supervisory monitoring, this registration demands institutional seriousness.

When properly structured, ARC Registration in India enables participation in India's stressed asset resolution framework and positions the entity as a disciplined participant in financial system recovery.`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is ARC Registration in India?", a: "ARC Registration in India is the regulatory approval granted by the Reserve Bank of India under the SARFAESI Act, 2002 to a company that intends to carry on the business of securitisation and asset reconstruction." },
        { q: "Who regulates Asset Reconstruction Companies in India?", a: "Asset Reconstruction Companies (ARCs) are regulated by the Reserve Bank of India under the SARFAESI Act and the RBI Master Direction applicable to ARCs." },
        { q: "Is ARC Registration in India mandatory before acquiring NPAs from banks?", a: "Yes. No company can commence the business of asset reconstruction or securitisation without obtaining a Certificate of Registration from RBI." },
        { q: "What activities are allowed after obtaining ARC Registration in India?", a: "An ARC can acquire financial assets, issue Security Receipts to Qualified Buyers, undertake restructuring, change management, enforce security interest, and implement recovery strategies as permitted under the Act." },
        { q: "Can a normal NBFC acquire stressed assets without ARC Registration?", a: "No. Acquisition of financial assets for asset reconstruction purposes requires registration under the SARFAESI framework." },
        { q: "What is the main purpose of ARC Registration in India?", a: "The purpose is to create a structured and regulated mechanism for resolution of stressed financial assets in the banking system." },
        { q: "Can an ARC act as a Resolution Applicant under IBC?", a: "Yes, subject to meeting additional capital and policy conditions prescribed under the RBI Master Direction." },
        { q: "Is ARC Registration required for securitisation activities?", a: "Yes, if the entity intends to carry on securitisation as defined under the SARFAESI Act." },
        { q: "What certificate is issued after ARC Registration?", a: "RBI issues a Certificate of Registration (CoR) permitting the company to carry on asset reconstruction and securitisation business." },
        { q: "Can an ARC accept public deposits?", a: "No. ARCs are expressly prohibited from accepting public deposits." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for ARC Registration in India?", a: "Only a company incorporated under the Companies Act can apply for ARC Registration." },
        { q: "Can an LLP apply for ARC Registration?", a: "No. The law requires the applicant to be a company." },
        { q: "Can an individual apply for ARC Registration?", a: "No. Only a company structure is permitted." },
        { q: "What is the minimum Net Owned Fund required for ARC Registration in India?", a: "The minimum Net Owned Fund required is ₹300 crore on an ongoing basis." },
        { q: "Is the ₹300 crore capital required at the time of application?", a: "Yes, the applicant must demonstrate compliance with the minimum Net Owned Fund requirement." },
        { q: "Can existing ARCs operate with lower capital?", a: "Existing ARCs were given a phased timeline to reach ₹300 crore, but they must now comply with the prescribed threshold." },
        { q: "Is foreign investment allowed in ARCs?", a: "Foreign investment is subject to applicable foreign exchange laws and RBI regulations." },
        { q: "Are sponsors required to meet fit and proper criteria?", a: "Yes. Sponsors and directors must satisfy the fit and proper requirements prescribed by RBI." },
        { q: "Is prior experience in banking mandatory for promoters?", a: "The regulations focus on fit and proper criteria rather than mandating specific prior experience." },
        { q: "Can a bank sponsor an ARC?", a: "Yes, subject to compliance with applicable regulatory conditions." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which law is ARC Registration governed?", a: "ARC Registration is governed by the SARFAESI Act, 2002." },
        { q: "What is the RBI Master Direction for ARCs?", a: "The Master Direction consolidates regulatory instructions applicable to ARCs, including capital adequacy, governance and operational norms." },
        { q: "Is compliance with RBI Directions mandatory after registration?", a: "Yes, ARCs must continuously comply with the Master Direction and related circulars." },
        { q: "What is a Security Receipt under ARC regulations?", a: "A Security Receipt represents the undivided right, title or interest of a Qualified Buyer in the financial asset acquired by the ARC." },
        { q: "Can ARCs issue Security Receipts to the public?", a: "No. Security Receipts can be issued only to Qualified Buyers." },
        { q: "What is the minimum investment requirement by an ARC in its own SRs?", a: "An ARC must invest a minimum prescribed percentage of the Security Receipts issued in each scheme." },
        { q: "What is Capital Adequacy Ratio requirement for ARCs?", a: "ARCs must maintain a minimum capital adequacy ratio of 15% of risk-weighted assets." },
        { q: "How is capital defined for capital adequacy purposes?", a: "Capital is defined as Net Owned Fund as prescribed in the Directions." },
        { q: "Are ARCs subject to inspection by RBI?", a: "Yes, RBI has the authority to inspect ARCs and call for information." },
        { q: "Can RBI cancel ARC Registration?", a: "Yes, RBI may cancel registration if the ARC fails to comply with regulatory conditions." }
      ]
    },
    {
      category: 'Registration / Application Process',
      faqs: [
        { q: "Where is the ARC application submitted?", a: "The application is submitted to the Department of Regulation, Reserve Bank of India." },
        { q: "Is the application filed online or physically?", a: "The process involves submission in the prescribed format as directed by RBI." },
        { q: "Is Board approval required before filing?", a: "Yes, the Board must approve the application and business plan." },
        { q: "Is a detailed business plan required for ARC Registration?", a: "Yes, RBI requires submission of a comprehensive business plan." },
        { q: "What does RBI examine during ARC Registration review?", a: "RBI examines capital adequacy, governance framework, sponsor background, and operational readiness." },
        { q: "Can RBI ask for additional clarifications?", a: "Yes, RBI may seek further information or clarifications before granting registration." },
        { q: "Is there a prescribed timeline for approval?", a: "Approval timelines depend on regulatory scrutiny and completeness of application." },
        { q: "Can business commence before CoR is issued?", a: "No. Business can commence only after issuance of Certificate of Registration." },
        { q: "Must business commence within a specific time after approval?", a: "Yes, ARCs must commence business within the period specified by RBI." },
        { q: "Is modification of MOA required before applying?", a: "Yes, the Memorandum must authorise securitisation and asset reconstruction activities." }
      ]
    },
    {
      category: 'Capital, Net Worth & Infrastructure',
      faqs: [
        { q: "How is Net Owned Fund calculated for ARC Registration?", a: "It includes paid-up equity capital and free reserves, minus accumulated losses, intangible assets and prescribed deductions." },
        { q: "Are revaluation reserves counted in NOF?", a: "Revaluation reserves are generally excluded from computation." },
        { q: "Must capital be in cash form?", a: "Capital must be properly paid-up and compliant with regulatory definition." },
        { q: "Is capital adequacy monitored continuously?", a: "Yes, ARCs must maintain the prescribed ratio at all times." },
        { q: "Can capital be reduced after registration?", a: "Capital must not fall below the minimum threshold." },
        { q: "Is separate infrastructure required for ARC operations?", a: "Yes, adequate office infrastructure and systems must be maintained." },
        { q: "Are technology systems mandatory?", a: "Systems must support asset tracking, reporting and compliance." },
        { q: "Is staff with recovery expertise required?", a: "The ARC must have competent management and operational teams." },
        { q: "Can ARCs invest in immovable property?", a: "Only limited investment for own use is permitted." },
        { q: "Can ARCs borrow funds?", a: "Borrowing is permitted subject to regulatory conditions." }
      ]
    },
    {
      category: 'Documentation & Declarations',
      faqs: [
        { q: "What documents are required for ARC Registration in India?", a: "Key documents include incorporation documents, capital proof, business plan, board resolutions, and fit and proper declarations of directors and sponsors." },
        { q: "Is a Fair Practices Code mandatory for ARCs?", a: "Yes, ARCs are required to frame and adopt a Fair Practices Code approved by the Board." },
        { q: "Is an Asset Acquisition Policy required?", a: "Yes, a Board-approved Asset Acquisition Policy must be framed within the prescribed period." },
        { q: "Are directors required to submit declarations?", a: "Yes, directors must submit fit and proper declarations in the prescribed format." },
        { q: "Is disclosure of sponsor background mandatory?", a: "Yes, full disclosure of sponsor background and shareholding structure is required." },
        { q: "Are audited financial statements required with the application?", a: "Yes, audited financials must be submitted where applicable." },
        { q: "Is a three-year financial projection necessary?", a: "Yes, RBI expects a credible financial projection as part of the business plan." },
        { q: "Are conflict of interest policies required?", a: "Yes, governance policies must address conflict of interest situations." },
        { q: "Is an organisational chart required in the application?", a: "Yes, the proposed organisational structure should be disclosed." },
        { q: "Must the company submit a declaration regarding non-acceptance of public deposits?", a: "Yes, compliance with prohibition on public deposits must be ensured." }
      ]
    },
    {
      category: 'Timelines & Fees',
      faqs: [
        { q: "How long does it take to obtain ARC Registration in India?", a: "The timeline varies depending on completeness of application and regulatory review." },
        { q: "Is there an application fee for ARC Registration?", a: "Application fees, if prescribed, must be paid as per RBI instructions." },
        { q: "Does RBI conduct background verification during review?", a: "Yes, RBI may conduct due diligence on promoters and directors." },
        { q: "Can the application be rejected?", a: "Yes, if regulatory conditions are not satisfied." },
        { q: "Is there a validity period for ARC Registration?", a: "The Certificate of Registration remains valid unless cancelled." },
        { q: "Is renewal of ARC Registration required periodically?", a: "There is no periodic renewal, but continuous compliance is mandatory." },
        { q: "Can an ARC surrender its registration?", a: "Yes, subject to regulatory approval and settlement of obligations." },
        { q: "Are annual fees payable after registration?", a: "Fees and charges must be complied with as prescribed by RBI." },
        { q: "Is commencement certificate required separately?", a: "The Certificate of Registration itself authorises commencement." },
        { q: "Does RBI issue provisional approval before final CoR?", a: "RBI may communicate in-principle approval subject to fulfilment of conditions." }
      ]
    },
    {
      category: 'Post-Registration Compliance',
      faqs: [
        { q: "What reports must ARCs file with RBI?", a: "ARCs must submit regulatory returns, including capital adequacy and financial statements." },
        { q: "Is NAV declaration mandatory for Security Receipts?", a: "Yes, NAV must be declared periodically as prescribed." },
        { q: "Is external rating required for SR schemes?", a: "Yes, recovery rating requirements apply to SR schemes." },
        { q: "Are ARCs required to disclose enforcement actions on website?", a: "Yes, periodic disclosure of possession under SARFAESI is required." },
        { q: "Must ARCs maintain books of accounts as per specific standards?", a: "Yes, accounting must comply with applicable regulatory and accounting standards." },
        { q: "Is statutory audit mandatory?", a: "Yes, ARCs must undergo statutory audit." },
        { q: "Is internal audit required?", a: "Yes, internal control mechanisms must be in place." },
        { q: "Must ARCs report to Credit Information Companies?", a: "Yes, reporting obligations to CICs apply." },
        { q: "Is capital adequacy reporting required?", a: "Yes, ongoing monitoring and reporting is mandatory." },
        { q: "Are governance committees mandatory?", a: "Yes, Audit Committee and Nomination & Remuneration Committee must be constituted." }
      ]
    },
    {
      category: 'Operational Restrictions & Permissions',
      faqs: [
        { q: "Can ARCs directly lend money?", a: "ARCs cannot undertake general lending like banks or NBFCs." },
        { q: "Can ARCs take over management of borrower companies?", a: "Yes, subject to compliance with legal provisions." },
        { q: "Can ARCs convert debt into equity?", a: "Yes, conversion is permitted as part of restructuring." },
        { q: "Can ARCs act as agents for recovery?", a: "They can undertake recovery in accordance with the Act." },
        { q: "Are ARCs allowed to acquire assets from related parties?", a: "Acquisitions must comply with regulatory safeguards." },
        { q: "Can ARCs issue bonds to raise capital?", a: "Capital raising must comply with applicable corporate and regulatory norms." },
        { q: "Are ARCs allowed to invest surplus funds?", a: "Investment of surplus funds must comply with permitted categories." },
        { q: "Can ARCs acquire retail loans?", a: "Yes, if such assets qualify as financial assets under the Act." },
        { q: "Can ARCs participate in consortium resolution?", a: "Yes, subject to regulatory compliance." },
        { q: "Can ARCs operate multiple securitisation schemes?", a: "Yes, each scheme must comply with regulatory norms." }
      ]
    },
    {
      category: 'Penalties, Cancellation & Regulatory Action',
      faqs: [
        { q: "What happens if an ARC fails to maintain ₹300 crore NOF?", a: "RBI may impose restrictions or take supervisory action." },
        { q: "Can RBI suspend ARC operations?", a: "Yes, RBI has powers to issue directions and restrict operations." },
        { q: "What are the grounds for cancellation of ARC Registration?", a: "Non-compliance, misrepresentation, or failure to meet regulatory conditions may lead to cancellation." },
        { q: "Are penalties prescribed for violation of SARFAESI provisions?", a: "Yes, violations may attract penalties under the Act." },
        { q: "Can directors be held responsible for non-compliance?", a: "Yes, accountability of management applies under law." },
        { q: "Can an ARC continue business after cancellation?", a: "No, business must cease upon cancellation." },
        { q: "Is RBI inspection binding on the ARC?", a: "Yes, ARCs must cooperate with inspection." },
        { q: "Can RBI impose monetary penalties?", a: "Yes, RBI may impose penalties as per statutory powers." },
        { q: "What if an ARC fails to comply with capital adequacy norms?", a: "RBI may restrict further business or impose corrective measures." },
        { q: "Can regulatory action affect existing SR holders?", a: "Regulatory measures may impact operations, but investor interests are governed by scheme structure." }
      ]
    },
    {
      category: 'Practical & Scenario-Based Questions',
      faqs: [
        { q: "Can a company apply for ARC Registration without prior stressed asset experience?", a: "Yes, provided it satisfies capital and governance requirements." },
        { q: "Is prior RBI approval required before change in management?", a: "Material changes in management must comply with regulatory reporting requirements." },
        { q: "Can an ARC expand into new asset categories after registration?", a: "Expansion must remain within permitted activities." },
        { q: "Can an ARC merge with another ARC?", a: "Such restructuring requires regulatory approval." },
        { q: "Is ARC Registration in India suitable for small capital promoters?", a: "The minimum ₹300 crore requirement makes it capital-intensive." },
        { q: "Can ARCs operate nationwide?", a: "Yes, ARCs can acquire assets across India." },
        { q: "Does ARC Registration allow participation in government bad bank structures?", a: "Participation is subject to eligibility and regulatory norms." },
        { q: "Can ARCs appoint recovery agents?", a: "Yes, subject to compliance with legal standards and fair practices." },
        { q: "Is there any restriction on number of directors?", a: "Board composition must comply with Companies Act and RBI governance norms." },
        { q: "What is the most common reason for delay in ARC Registration?", a: "Incomplete documentation and insufficient clarity in business plan are frequent causes of delay." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={['RBI', 'ARC', 'SARFAESI Act 2002', 'Master Direction 2024', 'Asset Reconstruction', 'Securitisation']}
      breadcrumb={['Home', 'RBI Services', 'ARC Registration']}
      title="ARC Registration in India"
      readTime="22 min read"
      focusKeyword="ARC Registration in India"
      sections={sections}
      ctaTitle="Ready to Launch Your Asset Reconstruction Company?"
      ctaDescription="Get expert guidance on ₹300 Crore Net Owned Fund structuring, RBI Master Direction compliance, governance architecture, business plan drafting, and Certificate of Registration."
      quickFacts={[
        { label: 'Regulator', value: 'Reserve Bank of India (RBI)' },
        { label: 'Governing Law', value: 'SARFAESI Act, 2002' },
        { label: 'Master Direction', value: 'RBI ARC Directions, 2024' },
        { label: 'Eligible Entity', value: 'Company (Companies Act)' },
        { label: 'Minimum NOF', value: '₹300 Crore' },
        { label: 'Capital Adequacy Ratio', value: '15% of RWA' },
        { label: 'IBC Resolution Applicant NOF', value: '₹1,000 Crore' },
        { label: 'Minimum SR Investment', value: '15% of transferor / 2.5% of SRs' },
        { label: 'Realisation Period', value: 'Up to 8 years from acquisition' },
        { label: 'Approval Timeline', value: '3–6 months' },
        { label: 'Business Commencement', value: 'Within 6 months (extendable to 12)' },
        { label: 'Public Deposits', value: 'Prohibited' }
      ]}
      relatedArticles={[
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license' },
        { title: 'NBFC Business Plan', href: '/rbi/nbfc-business-plan' },
        { title: 'NBFC Takeover', href: '/rbi/nbfc-takeover' },
        { title: 'NBFC Legal Support Services', href: '/rbi/nbfc-legal-support' }
      ]}
      finalCtaTitle="Need Expert Support for ARC Registration?"
      finalCtaDescription="Our compliance specialists provide end-to-end support for RBI registration, ₹300 Crore NOF planning, governance architecture, Asset Acquisition Policy drafting, Fair Practices Code, and ongoing SARFAESI compliance."
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
        <h2>Frequently Asked Questions (110+ FAQs)</h2>
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
