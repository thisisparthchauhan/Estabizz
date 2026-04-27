'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function PaymentAggregatorPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Payment Aggregator License in India',
      content: `Payment Aggregator License in India is a mandatory regulatory authorisation required for entities that facilitate aggregation of payments from customers to merchants and subsequently settle those funds. The regulatory framework has now been comprehensively consolidated under the RBI Master Direction on Regulation of Payment Aggregators, 2025.

If your business collects funds on behalf of merchants — whether online, physical POS, or cross-border — this license is not optional. It is legally compulsory.

Issued by: Reserve Bank of India — Department of Payment and Settlement Systems
Reference No.: RBI/DPSS/2025-26/141 | CO.DPSS.POLC.No.S-633/02-14-008/2025-26
Effective Date: September 15, 2025 — Effective Immediately`
    },
    {
      id: 'what-is-pa',
      title: 'What is a Payment Aggregator?',
      content: `A Payment Aggregator (PA) is an entity that facilitates aggregation of payments made by customers to merchants through one or more payment channels — through the merchant's physical or virtual interface — for the purchase of goods, services, or investment products, and subsequently settles the collected funds to such merchants.

The RBI has consolidated all earlier guidelines into a single comprehensive Master Direction titled 'Reserve Bank of India (Regulation of Payment Aggregators) Directions, 2025', issued on September 15, 2025, under the authority of Section 18 read with Section 10(2) of the Payment and Settlement Systems Act, 2007 and Section 10(4) and Section 11(1) of the Foreign Exchange Management Act (FEMA), 1999.`
    },
    {
      id: 'legal-foundation',
      title: 'Legal Foundation',
      content: `The Payment Aggregator License in India is issued under:
• Section 18 read with Section 10(2) of the Payment and Settlement Systems Act, 2007
• Section 10(4) and Section 11(1) of FEMA, 1999

The Master Direction clearly states that all bank and non-bank entities undertaking PA business fall within its scope.`
    },
    {
      id: 'three-categories',
      title: 'Three Categories of Payment Aggregators',
      content: `Payment Aggregators are classified into three categories:

• PA – Online (PA-O) — Facilitates transactions where the acceptance device and payment instrument are NOT in close physical proximity (e-commerce, digital payments, online checkout flows)
• PA – Physical (PA-P) — Facilitates transactions where BOTH the acceptance device and payment instrument are physically present in close proximity (POS terminal-based card, UPI, or QR-based payments)
• PA – Cross Border (PA-CB) — Facilitates aggregation of cross-border payments for current account transactions not prohibited under FEMA, for onboarded merchants, through e-commerce mode

Sub-classification under PA-CB:
• PA-CB facilitating inward transactions (foreign inflow)
• PA-CB facilitating outward transactions (foreign remittance)

This categorisation is central to determining compliance obligations under the Payment Aggregator License in India.`
    },
    {
      id: 'pa-vs-pg',
      title: 'What a Payment Aggregator is NOT',
      content: `A Payment Gateway (PG) is not a PA. A PG only provides technology infrastructure to route and facilitate payment processing — without handling funds. PGs are not regulated under this Master Direction but are encouraged to adopt the baseline technology recommendations.

An entity authorised as AD Category-II facilitating FEMA current account transactions other than purchase or sale of goods or services does not fall within PA-CB scope.

A card transaction where foreign exchange settlement is facilitated by a card network and the aggregator receives payment in local currency is not PA-CB activity.

A PA must NOT carry out marketplace business — aggregating funds only for merchants with whom it has a direct contractual relationship.

Reference: Para 4(i), 4(j), 10(a), 10(b) — RBI PA Master Direction, September 15, 2025`
    },
    {
      id: 'pa-vs-pg-comparison',
      title: 'Payment Aggregator vs Payment Gateway',
      content: `One of the most common misconceptions in fintech is confusing a Payment Aggregator with a Payment Gateway.

• Handles Funds: PA — Yes | PG — No
• Requires RBI Authorisation: PA — Yes | PG — No (Encouraged compliance)
• Escrow Account: PA — Mandatory | PG — Not applicable
• Capital Requirement: PA — ₹15 Cr → ₹25 Cr | PG — Not prescribed
• FIU Registration: PA — Mandatory | PG — Not required
• Settlement Responsibility: PA — Yes | PG — No

If your business touches merchant funds, you require Payment Aggregator License in India.`
    },
    {
      id: 'who-needs',
      title: 'Who Requires Payment Aggregator License in India?',
      content: `You require Payment Aggregator License in India if:
• You onboard merchants
• You collect funds before settlement
• You maintain escrow / collection accounts
• You process domestic or cross-border merchant payments

Banks do not require separate authorisation. However, non-bank entities must apply through RBI's online portal.

Most Relevant Applicants:
• Fintech Companies Building Payment Products — Technology-first companies handling collection and settlement of funds on behalf of merchants
• E-Commerce Enablement Platforms — Platforms enabling merchants to accept payments across UPI, cards, net banking, wallets, BNPL
• Physical Point-of-Sale Aggregators (PA-P) — Entities deploying card terminals (PoS), QR codes, soundbox devices. Must obtain CoA for PA-P by December 31, 2025
• Cross-Border Payment Service Providers (PA-CB) — Entities facilitating payment aggregation for cross-border e-commerce (inward or outward)
• Existing PA-O/PA-CB Expanding to PA-P — Must intimate RBI at least 30 days prior to commencing new business
• Banks — Do not require separate authorisation`
    },
    {
      id: 'eligibility',
      title: 'Eligibility Criteria',
      content: `The Master Direction prescribes clear structural requirements:

1. Entity Type — Must be a company incorporated in India under the Companies Act, 2013. Sole proprietorships, partnerships, LLPs, and trusts are not eligible (Para 5(c))
2. Memorandum of Association (MoA) — Must specifically cover the proposed activity of operating as a Payment Aggregator. MoA objects must be verified and amended if needed before application (Para 5(c))
3. Minimum Net-Worth at Application — ₹15 Crore at the time of submitting application for authorisation (Para 6(a))
4. Minimum Net-Worth — Ongoing — ₹25 Crore by the end of the third financial year from grant of authorisation. Must be maintained on an ongoing basis thereafter (Para 6(a), 6(b))
5. Fit and Proper — Promoters and Directors — All promoters and directors must satisfy Fit and Proper criteria: financial integrity, good reputation, honesty, no conviction for moral turpitude or economic offence, not adjudged insolvent, no debarment order by any regulator, not of unsound mind, financially sound (Para 7(a), 7(b))
6. NOC from Financial Sector Regulator — An entity already regulated by RBI, SEBI, IRDAI, PFRDA, NHB must obtain NOC and apply within 45 days of obtaining the NOC (Para 5(b))
7. Application Form Completeness — Application must be in prescribed form with all documents. Incomplete applications will be returned without processing (Para 5(e))
8. PA-P Specific — Existing Entities — Entities carrying on only PA-P business without CoA must apply by December 31, 2025. Failure requires winding up by February 28, 2026 (Para 5(d)(iii))
9. FDI Compliance — Must comply with Consolidated FDI Policy and FEMA regulations (Para 6(d))
10. Net-Worth Certificate from Statutory Auditor — Must submit certificate in Annexure 2.1 format from statutory auditor at time of application (Para 6(e))`
    },
    {
      id: 'capital',
      title: 'Capital Requirement – Net Worth',
      content: `• At Application — ₹15 Crore minimum (certified by statutory auditor in Annexure 2.1 format)
• By End of 3rd Financial Year — ₹25 Crore minimum (achieved and maintained on an ongoing basis)
• Ongoing (post 3rd FY) — ₹25 Crore minimum (certified annually by statutory auditor by September 30 each year)

Net worth must be maintained continuously — erosion can attract regulatory action.`
    },
    {
      id: 'net-worth-computation',
      title: 'Net Worth Computation Method',
      content: `For the purposes of this Master Direction, net-worth computation is guided by RBI circular DPSS.CO.AD.No.1344/02.27.005/2014-15 dated January 16, 2015 on 'Computation of Net-worth', as amended.

Components Included (+):
• Paid-up equity share capital
• Free reserves as per last audited accounts
• Compulsorily Convertible Preference Shares (CCPS) — non-cumulative or cumulative, provided shareholder agreement prohibits withdrawal

Components Deducted (-):
• Accumulated losses / deficit
• Deferred Tax Assets (DTA) if included in any component (must be deducted)

Excluded:
• Non-compulsorily convertible preference shares
• Redeemable preference shares
• Revaluation reserves

Key Point: Many applicants overstate net-worth by including non-qualifying instruments. A pre-application net-worth audit ensures the computation satisfies RBI's specific requirements before the certificate is obtained from the statutory auditor.`
    },
    {
      id: 'why-pa',
      title: 'Why Obtain PA Authorisation?',
      content: `• Legal Mandate — Operating without CoA is illegal. Any non-bank entity facilitating aggregation of payments and settling funds to merchants requires CoA. RBI can impose penalties, cancel operations, and initiate prosecution against unauthorised PAs and their directors.
• Merchant Trust and Onboarding — Regulated PA status is a prerequisite for onboarding institutional merchants, large e-commerce platforms, and government-related payment flows.
• Bank Partnership and Escrow Account Access — Only authorised PAs are entitled to maintain a designated escrow account with a Scheduled Commercial Bank.
• Regulatory Protection for Merchant Funds — Under Section 23A of the PSS Act, 2007, escrow accounts of authorised PAs are deemed 'designated payment systems'.
• Cross-Border Business Enablement (PA-CB) — PA-CB authorisation unlocks ability to maintain InCA/OCA with AD-I banks and handle up to ₹25 lakh per transaction in foreign exchange flows.
• Investor and Institutional Credibility — Valid RBI CoA is a mark of regulatory fitness; PE/VC investors look for CoA status as prerequisite for investment.`
    },
    {
      id: 'governance-fit-proper',
      title: 'Governance & Fit and Proper Criteria',
      content: `Promoters and directors must:
• Have financial integrity
• Maintain good reputation
• Not be convicted for economic offences
• Not be adjudged insolvent
• Not be debarred by regulators
• Not be of unsound mind
• Be financially sound

RBI retains final discretion on fit and proper status.`
    },
    {
      id: 'documents-company',
      title: 'Documents Required – Company & Incorporation',
      content: `1. Certificate of Incorporation (CoI) — MCA / Registrar of Companies — Proof of company's legal existence under Companies Act, 2013
2. Memorandum of Association (MoA) with all amendments — Including EGM-approved amendments if PA objects added post-incorporation. MoA must cover PA business as a permitted object (Para 5(c))
3. Articles of Association (AoA) — Including all amendments
4. PAN of the Company — Income Tax Department
5. Board Resolution authorising PA application and designating authorised signatory — Company letterhead, signed by all directors`
    },
    {
      id: 'documents-financial',
      title: 'Documents Required – Net Worth & Financial',
      content: `1. Net-Worth Certificate from Statutory Auditor (Annexure 2.1 Format) — Mandatory certificate certifying compliance with ₹15 Crore minimum net-worth (Para 6(e))
2. Audited Financial Statements (last 2-3 years if available) — Signed by Statutory Auditor
3. Provisional Balance Sheet as of recent date — Mandatory for newly incorporated entities without audited accounts (Para 6(e))
4. Bank Statements evidencing capitalisation — Certified bank statement
5. Shareholder Agreements (if CCPS issued) — To verify CCPS shareholder agreements prohibit withdrawal of preference share capital`
    },
    {
      id: 'documents-director',
      title: 'Documents Required – Director & Promoter (Annexure 2.5)',
      content: `Every promoter and director must submit a declaration in Annexure 2.5 format prescribed in the Master Direction, confirming compliance with Fit and Proper criteria specified in Para 7(a). RBI may additionally verify fit and proper status by obtaining inputs from other regulators and government departments.

1. Fit and Proper Declaration by Each Director and Promoter (Annexure 2.5 Format)
2. KYC Documents of Each Director — PAN, Aadhaar, Photograph, Address Proof
3. Director Identification Number (DIN) Certificate
4. Declaration — No conviction for moral turpitude / economic offence (Para 7(a)(ii)(a))
5. Declaration — Not adjudged insolvent (Para 7(a)(ii)(b))
6. Declaration — No debarment order by any regulatory authority (Para 7(a)(ii)(c))
7. Declaration — Not found to be of unsound mind by a court (Para 7(a)(ii)(d))
8. Declaration — Financially sound (Para 7(a)(ii)(e))
9. Non-Periodic Report — Changes in Board of Directors (Annexure 2.5) — ongoing obligation post-CoA`
    },
    {
      id: 'documents-business',
      title: 'Documents Required – Business & Operational',
      content: `1. Business Plan — PA Business Model, Revenue Projections, Merchant Acquisition Strategy
2. Board-Approved Information Security Policy — Mandatory per Para 9(b), covering all elements of Annexure 1
3. Dispute Resolution / Grievance Redressal Policy — Mandatory per Para 8(a) — TAT for failed transactions, refund processing, chargeback handling, escalation matrix
4. Merchant Onboarding Policy and KYC/AML Framework — Mandatory per Chapter IV — CDD process, CKYCR retrieval, background checks, CPV procedure
5. Escrow Account Agreement with Scheduled Commercial Bank — Required within 2 months of CoA, with exclusive clause on permissible debits and credits per Table 1
6. Technology Infrastructure Description — PCI-DSS Compliance Status, Cyber Security Framework
7. NOC from Financial Sector Regulator (if applicable) — Para 5(b), application within 45 days of NOC`
    },
    {
      id: 'process',
      title: 'Step-by-Step Authorisation Process',
      content: `Step 1: Pre-Application Structuring and Eligibility Assessment
Determine PA category required. Net-worth computation review. MoA object clause review. Director Fit and Proper assessment. NOC process if regulated by another financial sector regulator.

Step 2: Net-Worth Certification by Statutory Auditor
Statutory auditor must certify net-worth in Annexure 2.1 format. For newly incorporated entities, submit Annexure 2.1 certificate plus provisional balance sheet. Certificate must confirm ₹15 Crore minimum, exclude DTAs, and include only qualifying CCPS.

Step 3: Policy and Document Preparation
Board-Approved Information Security Policy (covering all 18 points of Annexure 1). Dispute Management and Grievance Redressal Policy (TAT aligned to RBI circular DPSS.CO.PD No.629/02.01.014/2019-20). Merchant KYC/CDD Policy. Business Plan with 3-year projections. Fit and Proper declarations from all directors in Annexure 2.5 format.

Step 4: Online Application Submission on RBI Portal
Complete online form with entity details, PA category, director information, capital details, business description. Upload supporting documents in prescribed format. Annexure 2.1 net-worth certificate. Annexure 2.5 declarations. MoA/AoA reflecting PA business. NOC if applicable.

Step 5: RBI Review, Queries, and Fit and Proper Verification
RBI's Department of Payment and Settlement Systems (DPSS) reviews. Verification of Fit and Proper criteria — RBI may obtain inputs from other regulators. Query issuance. RBI's decision on Fit and Proper status is final.

Step 6: Grant of Certificate of Authorisation (CoA)
Open escrow account with SCB within 2 months of CoA. Register with FIU-IND for AML compliance. Implement PCI-DSS compliance. Onboard merchants per CDD requirements from January 1, 2026 onwards. Submit list of merchants to escrow account bank.`
    },
    {
      id: 'timeline',
      title: 'Expected Authorisation Timeline',
      content: `• Stage 1: Pre-application assessment — 2 to 4 weeks
• Stage 2: Document preparation — 3 to 5 weeks
• Stage 3: Online portal submission — 1 week
• Stage 4: RBI primary review and acknowledgement — 4 to 8 weeks
• Stage 5: Query resolution and RBI correspondence — 4 to 12 weeks
• Stage 6: CoA issuance and post-authorisation setup — 2 to 4 weeks

Total (well-prepared application): 3 to 6 months from filing to CoA receipt
Total (incomplete or query-heavy application): 9 to 18 months or more`
    },
    {
      id: 'fees',
      title: 'Application and Authorisation Fees',
      content: `The Master Direction (RBI PA Directions, 2025) does not specify a fixed application fee in its main body. Application and processing fees, if any, are prescribed by RBI separately and are subject to revision.

Action Required: Confirm the current fee structure from the RBI DPSS online portal before submitting the authorisation application. Do not rely on historical fee amounts.`
    },
    {
      id: 'escrow-framework',
      title: 'Escrow Account Framework – Core Compliance Requirement',
      content: `Escrow Types:
• Domestic Escrow — Applicable to PA-O / PA-P
• Inward Collection Account (InCA) — Applicable to PA-CB inward
• Outward Collection Account (OCA) — Applicable to PA-CB outward

Key Conditions:
• Must be opened with Scheduled Commercial Bank within 2 months of CoA
• No co-mingling of funds
• Day-end balance ≥ merchant payable
• No interest (except core portion domestic escrow)
• Separate account per currency (for cross-border)
• Exclusive clause restricting use to permissible debits and credits per Table 1
• PA must submit list of all onboarded merchants to escrow bank, updated before each settlement
• Escrow account cannot be operated for Cash-on-Delivery transactions
• InCA and OCA must be kept strictly separate from domestic escrow`
    },
    {
      id: 'core-portion',
      title: 'Core Portion Computation',
      content: `Core Portion (Simplified):
• Step 1: Identify lowest daily balance fortnight-wise
• Step 2: Compute average of 26 fortnights
• Step 3: That average = Core Portion eligible for interest

• Eligible for interest only for entities in business for 26 fortnights with audited accounts
• No loan permitted against core portion
• No lien permitted against core portion
• Core portion computed separately for each escrow account`
    },
    {
      id: 'pa-cb-rules',
      title: 'Cross-Border (PA-CB) Special Rules',
      content: `For Payment Aggregator License in India under PA-CB:
• No netting of inward/outward flows
• Maximum per transaction ₹25 lakh
• Only Authorised Dealer banks for forex
• Mandatory FEMA compliance
• Separate InCA and OCA accounts required
• No co-mingling of inward and outward funds
• PA-CB cannot purchase or sell foreign currency from/to any entity other than an Authorised Dealer (AD)
• PA-CB must provide documents for closure of EDPMS/IDPMS entries
• Settlement in non-INR currencies permitted only for merchants (Indian exporters) directly onboarded by PA-CB facilitating inward transactions`
    },
    {
      id: 'kyc-merchant',
      title: 'KYC & Merchant Due Diligence',
      content: `• CKYCR retrieval at onboarding — Mandatory wherever available, with merchant consent (Para 13(a))
• CDD for Merchants Below ₹40 Lakh Turnover — If CKYCR unavailable: PAN/Form 60 with PAN verification, CPV of merchant, certified OVD copy of proprietor/PoA holder (Para 13(b))
• Background and Antecedent Check — Beyond KYC documents (Para 13(c))
• Merchant Category Code (MCC) and Merchant ID/Terminal ID — Allotment to all merchants (Para 13(e))
• Marketplace Seller Validation — PA must ensure marketplace does not accept payments for sellers not onboarded (Para 13(f))
• Funds Credited Only to Merchant's Account — Validation mechanisms required (Para 13(g))
• Ongoing Transaction Monitoring — Continuous (Para 13(h))
• FIU-IND Registration — Mandatory for non-bank PAs (Para 13(i))
• PAN verification — Required
• Existing Merchant KYC Compliance — Merchants onboarded till December 31, 2025 must comply within one year. From January 1, 2026, all new merchants must be onboarded per new CDD requirements (Para 13(j))`
    },
    {
      id: 'tech-overview',
      title: 'Technology Requirements – Annexure 1 (18 Mandatory Points)',
      content: `The Payment Aggregator License in India is no longer merely a financial approval — it is a technology-intensive authorisation. Annexure 1 of the Master Direction prescribes 18 mandatory baseline technology controls. Each must be implemented, documented, and covered in the Board-approved Information Security Policy:

1. Information Security Governance — Comprehensive security risk assessment annually, Board presentations
2. Data Security Standards — PCI-DSS, PCI-SSF, latest encryption (AES-256, TLS 1.2+)
3. Security Incident Reporting — Monthly cyber security incident reports with RCA
4. Merchant Onboarding Security Assessment — PCI-DSS verification at onboarding
5. Cyber Security Audit and Reports — Quarterly internal, annual external (CERT-In), bi-annual VAPT, PCI-DSS AOC/ROC
6. Information Security Policy — Board-approved, reviewed annually
7. IT Governance Framework — Board involvement, IT Steering Committee, Enterprise Information Model, Cyber Crisis Management Plan
8. Enterprise Data Dictionary — Formal data catalogue with field-level definitions
9. Risk Assessment — Asset-Level — Threat-vulnerability pairing, risk treatment plan
10. Access to Application — Least Privilege — RBAC, PAM, quarterly access reviews
11. Competency of Staff — IT security skills matrix, annual training, certifications (CISA/CISSP/CEH)
12. Vendor Risk Management — 'Right to audit' clause in all SLAs, BCP-DR with RTO/RPO
13. IT Maturity Assessment — Against COBIT/CMMI/ISO 27001
14. Cryptographic Requirements — AES-256, RSA-2048+, SHA-256+ (MD5/SHA-1/DES prohibited)
15. Forensic Readiness — SIEM deployed, log retention, 24x7 monitoring
16. Data Sovereignty — All payment data stored on India-based servers
17. Data Security in Outsourcing — 'Right to audit' clause for all vendors
18. Payment Application Security — PCI-SSF SSDLC, SAST/DAST, PCI-DSS merchant compliance review`
    },
    {
      id: 'tech-additional',
      title: 'Additional Mandatory Technology Rules (Para 10)',
      content: `• No ATM PIN for Card-Not-Present Transactions — Hard prohibition (Para 10(e), Annexure 1 Para 2.2)
• No Storage of Card Credentials at Merchant End — Customer card credentials must not be stored at merchant level. PA responsible for ensuring merchant compliance (Annexure 1 Para 2.1)
• Refunds to Original Payment Method — All refunds to original method of payment, unless payer specifically instructs alternate mode belonging to same payer (Para 10(f), Annexure 1 Para 2.4)
• Payment System Data Storage — All payment data stored in India per RBI's Storage of Payment System Data circular (April 6, 2018)`
    },
    {
      id: 'tech-reporting',
      title: 'Technology Compliance Reporting Schedule',
      content: `• IS Audit Report and Cyber Security Audit Report — Annual — CERT-In empanelled auditor — Submitted to Regional Office of DPSS, RBI
• Monthly Cyber Security Incident Report — Monthly — With root cause analysis and preventive actions
• Quarterly Internal Cyber Security Audit Report — Quarterly — To IT Committee
• Bi-annual VAPT Reports — Every 6 months — To IT Committee
• PCI-DSS AOC and ROC Compliance Report — Annual — Available for RBI inspection`
    },
    {
      id: 'reporting',
      title: 'Mandatory Regulatory Reporting (Annexure 2)',
      content: `• Net-Worth Certificate (Annexure 2.1) — Annual — By September 30 each year — Confirms ₹25 Crore net-worth maintained
• IS Audit Report and Cyber Security Audit Report — Annual — As prescribed by RBI — Submitted to Regional Office of DPSS — CERT-In empanelled auditor
• Auditor's Certificate on Escrow Balance (PA-O and PA-P, Annexure 2.2) — Quarterly — By 15th of month following quarter end
• Auditor's Certificate on InCA/OCA Balance (PA-CB, Annexure 2.3) — Quarterly — By 15th of month following quarter end
• Bankers' Certificate on Escrow Account Debits and Credits (PA-O/PA-P) — Quarterly (Internally Audited) — By 15th of month following quarter end
• Bankers' Certificate on InCA/OCA Debits and Credits (PA-CB) — Quarterly (Internally Audited) — By 15th of month following quarter end
• Statistics of Transactions Handled (Annexure 2.4) — Monthly — By 7th of following month
• Declaration on Change in Board of Directors (Annexure 2.5) — Non-periodic — Immediately on occurrence

Non-submission invites supervisory action.`
    },
    {
      id: 'governance-ongoing',
      title: 'Governance and Operational Compliance – Ongoing',
      content: `• Professionally Managed Entity — PA must remain professionally managed. Any change in management quality is subject to Fit and Proper review (Para 7(a))
• Prior Approval — Takeover / Change of Control — Any takeover, acquisition of control, or change in management requires prior RBI approval per RBI circular CO.DPSS.POLC.No.S-590/02-14-006/2022-23 dated July 4, 2022 (Para 7(c))
• Dispute Management Framework — Active dispute resolution mechanism, TAT-based failed transaction resolution, chargeback handling, reason code assignment (Para 8(a))
• Merchant Policy Disclosure on Website — Comprehensive merchant policies, privacy policy, terms and conditions disclosed at all times (Para 8(c))
• Grievance Officer — Officer details and escalation matrix prominently displayed on PA's website (Para 8(d))
• Aggregation Only for Contracted Merchants — No fund aggregation for uncontracted third parties (Para 10(a))
• No Marketplace Business — Structural separation required (Para 10(b))
• MDR Compliance and Charge Disclosure — Charges beyond price of goods/services distinctly displayed before transaction (Para 10(c))
• No Transaction Amount Limits by PA — Responsibility lies with issuing bank/entity (Para 10(d))
• Refund to Original Payment Method — Unless payer specifically instructs otherwise (Para 10(f))
• Intimation for New PA Category — At least 30 days before commencing business in additional PA category (Para 5(d)(i)(b))`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes That Lead to Rejection or Delay',
      content: `8.1 Net-Worth Computed Incorrectly — Including redeemable preference shares; including DTA without deducting; counting CCPS that are not truly locked in; certificate not in Annexure 2.1 format; provisional balance sheet not submitted alongside auditor certificate.

8.2 MoA Objects Not Covering PA Business — MoA drafted for technology services not mentioning payment aggregation; EGM-approved amendment not completed; reliance on broad 'any other business' catch-all clause (which RBI does not accept).

8.3 Fit and Proper Declarations Incomplete or Missing — Director recently added whose declaration is not included; generic declaration instead of Annexure 2.5; non-disclosure of past regulatory proceedings.

8.4 No Board-Approved Information Security Policy — Para 9(b) requires Board-approved IS Policy before CoA covering all 18 Annexure 1 requirements.

8.5 Dispute Management Policy Missing or Inadequate — Para 8 requires Board-approved framework with TAT timelines, chargeback procedures, escalation matrix.

8.6 PA-CB Applicants Missing FEMA Compliance — No description of InCA/OCA separation; no plan for EDPMS/IDPMS closure; no process for ensuring outward transactions use only authorised payment instruments.

8.7 Escrow Account Plan Not Described — No identified SCB; no draft escrow agreement with exclusive clause; no clarity on merchant list management.

8.8 Technology Infrastructure Not Evidenced — No PCI-DSS compliance status; no cyber security audit framework or VAPT schedule; no data storage architecture description; no Cyber Crisis Management Plan.

8.9 Application Filed After Regulatory Deadline (PA-P) — Entities carrying on only PA-P business without CoA must apply by December 31, 2025. Missing this deadline leaves no legal pathway to continue operations.`
    },
    {
      id: 'suspension',
      title: 'Suspension or Cancellation Triggers',
      content: `• Capital shortfall — Show cause
• Escrow violation — Severe penalty
• AML breach — FIU reporting
• Data breach — RBI supervisory action
• False disclosures — Authorisation cancellation`
    },
    {
      id: 'penalties',
      title: 'Penalties & Supervisory Risks',
      content: `Though the Master Direction itself focuses on compliance, enforcement can include:
• Monetary penalty under PSS Act
• Suspension of operations
• Escrow freeze
• Revocation of authorisation
• Reporting to FIU-IND

RBI supervision is increasingly technology-enabled and data-intensive.`
    },
    {
      id: 'compliance-calendar',
      title: 'Ongoing Compliance Calendar',
      content: `• Monthly: Transaction statistics submission — By 7th of next month — Compliance/MIS Team
• Quarterly: Escrow balance certificate (Auditor) — 15th of following month — Finance
• Quarterly: Banker certificate (Escrow / InCA / OCA) — 15th of following month — Banking Operations
• Annual: Net Worth Certificate (Audited) — By September 30 — Statutory Auditor
• Annual: IS Audit & Cyber Security Audit — As prescribed by RBI — IT & External Auditor
• Event-Based: Change in Board / Director Declaration — Immediate — Company Secretary

Maintaining Payment Aggregator License in India requires board-level monitoring.`
    },
    {
      id: 'strategic-advisory',
      title: 'Strategic Advisory Note',
      content: `Payment Aggregator License in India is no longer a simple fintech registration. It is infrastructure licensing. The 2025 Master Direction reflects RBI's intent to bring payment intermediaries under structured prudential oversight.

"In financial infrastructure businesses, regulatory approval is not merely permission to operate; it is a declaration of systemic trust. That trust must be earned through governance discipline." — CS Devyani Khambhati – Compliance Expert

"The stability of digital commerce rests not on innovation alone, but on disciplined financial architecture that regulators can trust." — CS Devyani Khambhati – Compliance Expert

"In digital finance, capital protects solvency, but technology protects trust. A Payment Aggregator without cyber discipline is a systemic vulnerability." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'final-observations',
      title: 'Final Observations',
      content: `The regulatory intent is clear:
• Protect merchants
• Safeguard customer funds
• Strengthen cyber security
• Ensure forex discipline
• Enforce capital adequacy

Payment Aggregator License in India is therefore both a compliance obligation and a market credibility asset.

Payment Aggregator License in India under the 2025 Master Direction is a comprehensive regulatory framework. It integrates capital adequacy, escrow discipline, cyber security, cross-border compliance, and reporting accountability into one cohesive structure.

For fintech founders, early compliance structuring is not an expense — it is a strategic investment.`
    }
  ];

  const faqGroups = [
    {
      category: 'Basic Regulatory FAQs',
      faqs: [
        { q: "What is a Payment Aggregator License in India?", a: "Payment Aggregator License in India is RBI authorisation required for entities that aggregate customer payments and settle funds to merchants." },
        { q: "Who regulates Payment Aggregator License in India?", a: "The Reserve Bank of India regulates Payment Aggregator License in India under the Payment and Settlement Systems Act, 2007." },
        { q: "Is Payment Aggregator License in India mandatory?", a: "Yes. If a non-bank entity handles merchant funds before settlement, it must obtain Payment Aggregator License in India." },
        { q: "Do banks require Payment Aggregator License in India?", a: "No. Banks are exempt but must comply with relevant regulatory provisions." },
        { q: "Can an LLP apply for Payment Aggregator License in India?", a: "No. Only a company incorporated under the Companies Act, 2013 can apply." },
        { q: "What is the minimum capital requirement for Payment Aggregator License in India?", a: "₹15 crore at application stage and ₹25 crore within three financial years." },
        { q: "Is capital maintenance ongoing?", a: "Yes. Net worth must be maintained continuously." },
        { q: "Can preference shares be counted toward net worth?", a: "Compulsorily convertible preference shares are included, subject to conditions." },
        { q: "Are Deferred Tax Assets included in net worth?", a: "No. They must be deducted while calculating net worth." },
        { q: "Is FDI allowed in Payment Aggregator License in India?", a: "Yes, subject to compliance with Consolidated FDI Policy and FEMA regulations." }
      ]
    },
    {
      category: 'Escrow & Settlement',
      faqs: [
        { q: "Is escrow mandatory under Payment Aggregator License in India?", a: "Yes. Non-bank PAs must maintain escrow accounts with Scheduled Commercial Banks." },
        { q: "Can escrow funds be used for operational expenses?", a: "No. Escrow funds are restricted strictly for merchant settlement." },
        { q: "Can escrow earn interest?", a: "Only the 'core portion' of domestic escrow may earn interest under prescribed conditions." },
        { q: "What is the core portion in escrow?", a: "It is the average of lowest fortnightly balances across 26 fortnights." },
        { q: "Can a loan be taken against escrow funds?", a: "No. Explicitly prohibited." },
        { q: "Is co-mingling allowed in PA-CB accounts?", a: "Absolutely not. Inward and outward funds must remain separate." },
        { q: "What is the maximum cross-border transaction limit?", a: "₹25 lakh per transaction." },
        { q: "Can escrow be maintained in multiple banks?", a: "One additional escrow account may be maintained under prescribed conditions." },
        { q: "What is the timeline to open escrow after authorisation?", a: "Within two months from date of authorisation." },
        { q: "Is Cash-on-Delivery permitted through escrow?", a: "No. Escrow accounts cannot be used for COD transactions." }
      ]
    },
    {
      category: 'Merchant Onboarding & KYC',
      faqs: [
        { q: "Is merchant KYC mandatory?", a: "Yes. Merchant CDD must comply with RBI KYC Directions." },
        { q: "Is CKYCR retrieval mandatory?", a: "Yes, wherever available." },
        { q: "Is Contact Point Verification required?", a: "Yes, especially for small merchants." },
        { q: "Must PA register with FIU-IND?", a: "Yes, non-bank PAs must register and comply with AML reporting." },
        { q: "Can agents assist in KYC?", a: "Yes, but ultimate responsibility remains with the PA." },
        { q: "Is PAN mandatory for merchant onboarding?", a: "Yes." },
        { q: "Can marketplace merchants be onboarded without due diligence?", a: "No. Marketplace onboarding must follow full compliance." },
        { q: "Must transaction monitoring continue post onboarding?", a: "Yes. Continuous monitoring is mandatory." }
      ]
    },
    {
      category: 'Governance & Management',
      faqs: [
        { q: "What is 'Fit and Proper' criteria?", a: "Promoters must not have criminal, insolvency, or regulatory disqualification." },
        { q: "Can RBI reject application despite capital compliance?", a: "Yes. Governance and integrity assessment is discretionary." },
        { q: "Is change in control allowed?", a: "Only with prior RBI approval." },
        { q: "Is board-level IT governance required?", a: "Yes." },
        { q: "Is IT Steering Committee mandatory?", a: "Yes, under governance framework." },
        { q: "Are cyber audits mandatory?", a: "Yes, annually by CERT-In empanelled auditor." },
        { q: "Is quarterly VAPT required?", a: "Bi-annual VAPT is prescribed." }
      ]
    },
    {
      category: 'Operational FAQs',
      faqs: [
        { q: "Can a PA conduct marketplace business?", a: "No. PA business must be separate." },
        { q: "Can ATM PIN be used for card-not-present transactions?", a: "No. Explicitly prohibited." },
        { q: "Can PA limit transaction amount?", a: "No. Transaction limit responsibility lies with issuing bank." },
        { q: "Are refunds required to original payment method?", a: "Yes, unless payer specifically instructs otherwise." },
        { q: "Is MDR regulated?", a: "Yes. Existing MDR instructions must be followed." }
      ]
    },
    {
      category: 'Reporting & Supervision',
      faqs: [
        { q: "What reports must be filed monthly?", a: "Transaction statistics in Annexure 2.4 format by 7th of following month." },
        { q: "What reports are filed quarterly?", a: "Escrow certificate (Annexure 2.2/2.3) and banker certificate by 15th of month following quarter end." },
        { q: "What reports are filed annually?", a: "Net worth certificate (Annexure 2.1) by September 30 and IS Audit report." },
        { q: "What happens if reports are delayed?", a: "RBI may initiate supervisory action." },
        { q: "Can RBI inspect at any time?", a: "Yes." }
      ]
    },
    {
      category: 'Advanced & Strategic',
      faqs: [
        { q: "How long does approval take?", a: "Typically 6–12 months. Well-prepared applications: 3–6 months. Query-heavy: 9–18 months or more." },
        { q: "Can a startup apply immediately after incorporation?", a: "Yes, provided ₹15 crore net worth is demonstrated with provisional balance sheet." },
        { q: "Is in-principle approval granted?", a: "Yes, followed by compliance validation." },
        { q: "Is Payment Aggregator License in India transferable?", a: "No. It is entity-specific." },
        { q: "Can PA operate without authorisation?", a: "No. Unauthorised operation is a violation." }
      ]
    },
    {
      category: 'Brain-Storming & Strategic',
      faqs: [
        { q: "Can a SaaS company with embedded payments avoid PA license?", a: "Only if it does not handle funds." },
        { q: "Can escrow design affect valuation?", a: "Yes. Institutional investors scrutinise compliance architecture." },
        { q: "Can RBI cancel license for cyber breach?", a: "Yes, depending on severity." },
        { q: "Is profitability mandatory for approval?", a: "Not immediately, but sustainability is expected." },
        { q: "Can PA-CB operate without AD bank tie-up?", a: "No." },
        { q: "Does RBI evaluate business model viability?", a: "Yes, indirectly via scrutiny." },
        { q: "Is capital infusion timeline strictly monitored?", a: "Yes." },
        { q: "Can delayed settlement attract penalties?", a: "Yes, especially if unfair to merchants." },
        { q: "Does RBI consider systemic risk?", a: "Absolutely. Payment infrastructure is systemic." },
        { q: "Can escrow misreporting lead to criminal consequences?", a: "Potentially, under PSS Act." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🏦', label: 'RBI' },
        { emoji: '💸', label: 'Payment Aggregator' },
        { emoji: '📜', label: 'PA Master Direction 2025' },
        { emoji: '⚖️', label: 'PSS Act 2007' },
        { emoji: '🌐', label: 'PA-O' },
        { emoji: '🏪', label: 'PA-P' },
        { emoji: '🌍', label: 'PA-CB' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'RBI Services', href: '/rbi' },
        { label: 'Payment Aggregator License' }
      ]}
      title="Payment Aggregator License in India"
      readTime="28 min read"
      focusKeyword="Payment Aggregator License in India"
      sections={sections}
      ctaTitle="Ready to Launch Your Payment Aggregator?"
      ctaDescription="Get expert guidance on ₹15 Cr net worth structuring, Annexure 1 (18-point) technology compliance, escrow account architecture, FIU-IND registration, and end-to-end RBI Certificate of Authorisation."
      quickFacts={[
        { label: 'Regulator', value: 'Reserve Bank of India (DPSS)' },
        { label: 'Master Direction', value: 'RBI PA Directions, 2025 (Sept 15, 2025)' },
        { label: 'Legal Authority', value: 'PSS Act 2007 + FEMA 1999' },
        { label: 'Eligible Entity', value: 'Company (Companies Act 2013)' },
        { label: 'Net Worth at Application', value: '₹15 Crore' },
        { label: 'Net Worth by 3rd FY', value: '₹25 Crore (ongoing)' },
        { label: 'Categories', value: 'PA-O, PA-P, PA-CB' },
        { label: 'PA-CB Transaction Limit', value: '₹25 Lakh per transaction' },
        { label: 'Escrow Opening', value: 'Within 2 months of CoA' },
        { label: 'Approval Timeline', value: '3–6 months (well-prepared)' },
        { label: 'PA-P Application Deadline', value: 'December 31, 2025' },
        { label: 'Tech Compliance', value: 'Annexure 1 — 18 mandatory points' }
      ]}
      relatedArticles={[
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india', category: 'RBI', description: 'NBFC Registration in India — complete regulatory guide.' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'NBFC Account Aggregator License — complete regulatory guide.' },
        { title: 'NBFC SRO Registration', href: '/rbi/nbfc-sro-registration', category: 'RBI', description: 'NBFC SRO Registration — complete regulatory guide.' },
        { title: 'ARC Registration in India', href: '/rbi/arc-registration-in-india', category: 'RBI', description: 'ARC Registration in India — complete regulatory guide.' },
        { title: 'LendTech Services', href: '/rbi/lendtech-services', category: 'RBI', description: 'LendTech Services — complete regulatory guide.' },
        { title: 'Full-Fledged Money Changers License', href: '/rbi/full-fledged-money-changers', category: 'RBI', description: 'Full-Fledged Money Changers License — complete regulatory guide.' }
      ]}
      finalCtaTitle="Need Expert Support for Payment Aggregator Authorisation?"
      finalCtaDescription="Our compliance specialists provide end-to-end PA authorisation support — pre-application net-worth audit, MoA review, Annexure 1 (18-point) tech gap assessment, all Board-approved policies, statutory auditor co-ordination, online portal submission, query handling, escrow account setup, FIU-IND registration, and ongoing compliance reporting."
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
        <h2>Frequently Asked Questions (60+ FAQs)</h2>
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
