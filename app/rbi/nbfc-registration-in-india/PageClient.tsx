'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function NBFCRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'NBFC Registration in India',
      content: `NBFC Registration in India is the formal approval granted by the Reserve Bank of India (RBI) to a company intending to carry on the business of a Non-Banking Financial Company under Section 45-IA of the RBI Act, 1934 and the Master Direction – Scale Based Regulation framework updated on July 17, 2025.

NBFC Registration in India is not a procedural formality. It is a regulatory recognition that the company possesses adequate capital, governance structure, operational capability, and financial discipline to conduct lending or investment activities under RBI supervision.

Any company planning to engage in structured lending, investment in securities, acquisition of financial assets, or digital credit operations must carefully evaluate whether NBFC Registration in India is legally required before commencing operations.`
    },
    {
      id: 'overview',
      title: 'Overview – What is NBFC Registration?',
      content: `NBFC registration is the process by which a company obtains a Certificate of Registration (CoR) from the Reserve Bank of India, authorising it to carry on the business of a non-banking financial institution. Under Section 45IA of the Reserve Bank of India Act, 1934, no company shall commence or carry on the business of a non-banking financial institution without obtaining such registration.

A Non-Banking Financial Company (NBFC) is a company registered under the Companies Act that is engaged in the business of loans and advances, acquisition of shares, stocks, bonds, debentures, or securities issued by the government or local authority, leasing, hire-purchase, insurance business, chit business — but does not include any institution whose principal business is agricultural activity, industrial activity, sale, purchase, or construction of immovable property.`
    },
    {
      id: 'principal-business',
      title: 'The Principal Business Criterion – The 50-50 Rule',
      content: `The most important eligibility determinant is the Principal Business Test, as laid down in RBI Press Release 1998-99/1269 dated April 08, 1999. A company is treated as an NBFC if both of the following conditions are simultaneously satisfied, as evidenced by its last audited balance sheet:

• Financial Assets Test — Financial assets must be more than 50% of total assets (netted off by intangible assets)
• Income from Financial Assets Test — Income from financial assets must be more than 50% of gross income

Both conditions must be met simultaneously. If both are met, the company is legally an NBFC and must register. Conducting NBFC business without registration is a criminal offence under the RBI Act.

This is commonly assessed through the "50-50 test" principle, applied in substance to determine principal business status.`
    },
    {
      id: 'legal-background',
      title: 'Legal Background and Regulatory Authority',
      content: `• Governing Law — Reserve Bank of India Act, 1934
• Key Provision — Section 45-IA
• Regulatory Authority — Reserve Bank of India
• Applicable Framework — RBI Master Direction – Non-Banking Financial Company (Scale Based Regulation) Directions, 2023 (Updated July 17, 2025)
• Supervisory Model — Layered Regulation – Base, Middle, Upper, Top

NBFC Registration in India is regulated entirely by RBI, and no state authority can grant or substitute this approval.`
    },
    {
      id: 'sbr-framework',
      title: 'RBI Scale-Based Regulatory (SBR) Framework',
      content: `The Reserve Bank of India introduced the Scale-Based Regulation (SBR) framework through the Master Direction dated October 19, 2023. Under SBR, all NBFCs are classified into four regulatory layers based on asset size, nature of activity, systemic importance, and other risk-based parameters:

• Base Layer (NBFC-BL) — Non-deposit-taking NBFCs in lower risk categories; NBFC-P2P, NBFC-AA, NOFHCs, NBFCs without public funds/customer interface always remain here. Below Rs. 100 Crore or per SBR criteria.
• Middle Layer (NBFC-ML) — All deposit-taking NBFCs regardless of size; non-deposit-taking NBFCs with assets of Rs. 1,000 Crore and above; certain specialised categories.
• Upper Layer (NBFC-UL) — Top 10 eligible NBFCs by asset size always placed here; others identified per RBI scoring methodology. Systemically significant; identified by RBI annually.
• Top Layer (NBFC-TL) — Reserved for NBFCs posing extreme systemic risk; currently vacant. Regulatory escalation from Upper Layer.

Most newly approved entities under NBFC Registration in India begin as Base Layer NBFCs unless RBI determines otherwise.`
    },
    {
      id: 'nbfc-icc-base',
      title: 'Why NBFC-ICC Base Layer is Most Relevant for New Applicants',
      content: `NBFC-ICC (Investment and Credit Company) in the Base Layer is the most common and accessible registration category for new entrants — fintech startups, lending platforms, promoter groups, and companies crossing the 50-50 threshold. It carries a lighter compliance burden than Middle or Upper Layer entities while providing full legal authority to lend, invest, and earn income from financial activities under RBI's regulatory umbrella.`
    },
    {
      id: 'who-needs',
      title: 'Who Requires NBFC Registration in India?',
      content: `NBFC Registration in India becomes mandatory when a company intends to:
• Provide secured or unsecured loans
• Offer business loans, personal loans or LAP
• Undertake investment business as principal activity
• Operate digital lending platforms under its own balance sheet
• Raise public or institutional borrowings for onward lending

If financial activity is central to the business model, NBFC Registration in India cannot be avoided.`
    },
    {
      id: 'who-cannot',
      title: 'Who Cannot Apply for NBFC Registration in India?',
      content: `• Private Limited Company — Eligible
• Public Limited Company — Eligible
• LLP — Not Eligible
• Partnership Firm — Not Eligible
• Individual — Not Eligible
• Nidhi Company — Separate regulatory framework

Only companies incorporated under the Companies Act can seek NBFC Registration in India.`
    },
    {
      id: 'eligibility',
      title: 'Eligibility Criteria for NBFC-BL Registration',
      content: `The following eligibility criteria must be met by a company seeking registration as an NBFC-ICC in the Base Layer:

1. Company Type — Must be a company registered under the Companies Act, 2013. Individual, partnership, LLP, trusts cannot register as NBFC.
2. Principal Business — 50-50 Rule — Financial assets > 50% of total assets AND income from financial assets > 50% of gross income.
3. Minimum Net Owned Fund — NBFC-ICC: Rs. 10 Crore (full compliance by March 31, 2027). Glide path: Rs. 5 Crore by March 31, 2025 and Rs. 10 Crore by March 31, 2027.
4. Minimum NOF — NBFC-P2P, NBFC-AA, No Customer Interface: Rs. 2 Crore.
5. Minimum NOF — NBFC-IFC / IDF-NBFC: Rs. 300 Crore.
6. Board Director — Financial Sector Experience — At least one director must have relevant experience of working in a bank or NBFC (Para 38).
7. Director — Fit and Proper Criteria — All directors must satisfy RBI's Fit and Proper criteria (Annex XXIII).
8. FATF Non-Compliant Jurisdiction Restriction — New investors from FATF non-compliant jurisdictions must hold less than 20% of voting power.
9. Leverage Ratio — Post Registration — Total outside liabilities must not exceed 7 times owned fund at any point.
10. Inter-Group Investment Deduction in NOF — Investments in subsidiaries, group companies, and other NBFCs exceeding 10% of (paid-up equity + free reserves) must be deducted from NOF.`
    },
    {
      id: 'capital-nof',
      title: 'Minimum Capital Requirement – Net Owned Fund (NOF)',
      content: `The minimum Net Owned Fund (NOF) requirement for various NBFC categories, as specified in Para 6 of the RBI SBR Master Direction 2023:

• NBFC-ICC (Investment and Credit Company) — Rs. 10 Crore (by March 31, 2027)
• NBFC-MFI (Micro Finance Institution) — Rs. 10 Crore (by March 31, 2027 with glide path)
• NBFC-Factor — Rs. 10 Crore (by March 31, 2027 with glide path)
• NBFC-P2P (Peer-to-Peer Lending Platform) — Rs. 2 Crore (Immediate)
• NBFC-AA (Account Aggregator) — Rs. 2 Crore (Immediate)
• NBFC without public funds and without customer interface — Rs. 2 Crore (Immediate)
• NBFC-IFC (Infrastructure Finance Company) — Rs. 300 Crore (Immediate)
• IDF-NBFC (Infrastructure Debt Fund) — Rs. 300 Crore (Immediate)

NBFC Registration in India will not be processed unless the minimum Net Owned Fund (NOF) is fully infused and certified.`
    },
    {
      id: 'nof-glide-path',
      title: 'Glide Path for Existing NBFCs',
      content: `For NBFC-ICC (current Rs. 2 Crore): Rs. 5 Crore by March 31, 2025 → Rs. 10 Crore by March 31, 2027
For NBFC-ICC (current Rs. 5 Crore): Rs. 7 Crore by March 31, 2025 → Rs. 10 Crore by March 31, 2027
For NBFC-MFI (Rs. 2 Crore in NE Region): Rs. 5 Crore by March 31, 2025 → Rs. 10 Crore by March 31, 2027
For NBFC-Factor (Rs. 5 Crore): Rs. 7 Crore by March 31, 2025 → Rs. 10 Crore by March 31, 2027

Note: NBFCs failing to achieve the prescribed NOF level within the stipulated period shall not be eligible to hold the Certificate of Registration (CoR) — Para 6.3, RBI SBR Master Direction 2023.

There shall be no distinction in the NOF requirement for NBFCs registered in the North East Region.`
    },
    {
      id: 'nof-computation',
      title: 'Net Owned Fund – Computation Method',
      content: `Net Owned Fund is the most critical financial threshold for NBFC registration. It is defined and computed as follows:

Add (+):
• Paid-up Equity Capital
• Free Reserves (as per last audited balance sheet)
• Share Premium

Deduct (-):
• Intangible Assets
• Accumulated Losses
• Investments in subsidiaries, companies in same group, and other NBFCs — to the extent exceeding 10% of (paid-up equity capital + free reserves)
• AIF-routed indirect investments in group entities — where NBFC holds 50%+ of AIF or is beneficial owner of trust form AIF with 50%+ funds
• Revaluation reserves
• Deferred revenue expenditure

NOF must be certified by the Statutory Chartered Accountant in the prescribed RBI format. Errors in NOF computation are the single most common cause of NBFC application rejection.`
    },
    {
      id: 'leverage-ratio',
      title: 'Leverage Ratio – Post-Registration Capital Adequacy',
      content: `In addition to the minimum NOF, NBFC-BL entities must maintain a leverage ratio (total outside liabilities divided by owned fund) not exceeding 7 at any point of time — as specified in Para 9.1 of the Master Direction. This is an ongoing compliance obligation, not a one-time registration condition.

Note: The leverage ratio restriction does not apply to NBFC-MFIs and NBFCs in Middle Layer and above.`
    },
    {
      id: 'why-nbfc',
      title: 'Why Obtain an NBFC Licence?',
      content: `Obtaining an NBFC Certificate of Registration is not merely a regulatory formality — it is a fundamental business enabler:

• Legal Mandate — Any company satisfying both limbs of the 50-50 Principal Business Test must register under Section 45IA. Failure makes the company an illegal unregistered NBFC.
• Authority to Lend and Earn Interest Income — Only a registered NBFC has legal authority to carry on lending, hire-purchase, leasing, and investment activities as its principal business.
• Access to Institutional Capital — NCDs through private placement, bank borrowings, ECB under FEMA, FDI under automatic route, NHB refinancing, asset securitisation.
• Regulatory Credibility and Business Partnerships — Prerequisite for bank co-lending partnerships, fintech arrangements, credit bureau membership, insurance distribution, debt securities listing.
• Investor and PE/VC Attractiveness — Private equity and venture capital investors strongly prefer regulated entities.
• Future-Proofing Business Expansion — Positions the entity for co-lending programmes, upgradation to NBFC-ML or NBFC-UL.`
    },
    {
      id: 'who-applies',
      title: 'Who Should Apply for NBFC-BL Registration',
      content: `• New Company Promoter Groups — Entrepreneurs incorporated specifically to carry on lending, investment, hire-purchase, or credit operations.
• Fintech Startups and Digital Lending Platforms — Digital-first lending platforms seeking regulated licence to originate loans directly.
• Existing Companies Crossing 50-50 Threshold — Companies that have organically crossed the principal business threshold; registration is a legal obligation.
• Microfinance Institutions (NBFC-MFI) — Entities providing microfinance credit subject to specific NBFC-MFI framework.
• Infrastructure Finance and Debt Fund Entities — NBFC-IFC or IDF-NBFC with Rs. 300 Crore NOF.
• Holding Companies and Group Structures (NOFHC) — Non-Operative Financial Holding Companies, always remain in Base Layer.`
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure and Governance Expectations',
      content: `RBI evaluates whether the applicant company is operationally prepared.

• Registered Office — Functional, verifiable location
• IT Systems — Loan management and reporting capability
• Board Composition — Experienced and credible directors
• Policy Framework — Lending policy, risk management policy
• Internal Controls — Audit and compliance structure

NBFC Registration in India requires substance, not just paperwork.`
    },
    {
      id: 'fit-proper',
      title: 'Fit and Proper Criteria',
      content: `Directors must satisfy integrity standards prescribed under the regulatory framework.

Key considerations include:
• No criminal convictions
• No wilful default status
• No adverse regulatory history
• Demonstrated financial integrity

RBI independently verifies background before granting NBFC Registration in India.`
    },
    {
      id: 'documents-company',
      title: 'Documents Required – Company & Incorporation',
      content: `1. Certificate of Incorporation (CoI) — MCA / ROC issued — Proof of company's legal existence
2. Memorandum of Association (MoA) — Including all amendments — Must include NBFC-permissible financial activity objects
3. Articles of Association (AoA) — Including all amendments — Corporate governance and share structure
4. PAN Card of the Company — Income Tax Department — Tax identification
5. Certificate of Commencement of Business (if applicable) — MCA21 — Required for public companies
6. Board Resolution authorising NBFC application — Company letterhead, signed by all directors`
    },
    {
      id: 'documents-financial',
      title: 'Documents Required – Financial',
      content: `1. Audited Financial Statements — Last 3 Years (if available) — Signed by Statutory Auditor
2. NOF Certificate from Statutory Chartered Accountant — RBI prescribed format (per Section 45-IA)
3. Source of Funds Declaration (for capital infused) — Signed by promoter(s) and certified by CA
4. Bank Statements evidencing capital infusion / NOF — Certified bank statement
5. Statutory Auditor Certificate — Principal Business Test — On CA letterhead with UDIN, certifying 50-50 rule`
    },
    {
      id: 'documents-director',
      title: 'Director and Promoter Documents (Annex XII)',
      content: `The Master Direction (Para 42.2.1 and Annex XII) prescribes a specific format for information about proposed promoters, directors, and shareholders.

Annex XII-1 — Individual Director/Promoter Information Form (RBI prescribed format):
• Full name, designation, nationality, age, business and residential address
• Email address and telephone number
• PAN under the Income Tax Act, 1961
• Director Identification Number (DIN)
• Passport number (for foreign directors)
• Educational and professional qualifications; professional achievements
• Line of business; other directorships held
• Names of regulators governing entities where directorships are held
• Details of any association with NBFCs prohibited from accepting deposits or prosecuted by RBI
• Details of any prosecution pending or convictions for violation of economic laws
• Details of defaults in credit facilities in last 5 years
• Details of disciplinary action by professional associations
• Disqualification under Section 164 of Companies Act, 2013
• Government or agency investigations
• Violations of Customs, Excise, Income Tax, FEMA laws
• NBFC experience (number of years)
• Equity shareholding details
• Companies/firms in which substantial interest is held
• Names of principal bankers
• Compliance with Section 165 directorship limits

Annex XII-2 — Corporate Promoter Information Form

Plus: KYC of each director, Declarations (no association with deposit-accepting body, not associated with rejected CoR entity, no criminal case including Section 138 NI Act), Bankers' Report on each director (Para 42.2.1(vi) — mandatory), Deed of Covenants for each director.`
    },
    {
      id: 'business-plan-docs',
      title: 'Business Plan and Policy Documents',
      content: `1. Business Plan (5-Year Financial Projections) — Revenue model, capital deployment, loan book growth, risk framework
2. Fair Practices Code (Board Approved) — Mandatory for NBFCs with customer interface — Para 45
3. AML / KYC Policy (Board Approved) — Aligned to RBI KYC Master Direction 2016
4. Interest Rate Policy (Board Approved) — Mandatory; Board must adopt interest rate model — Para 45.11
5. Risk Management Framework (Board Approved) — RMC charter and risk appetite statement — Para 39
6. Policy on Loans to Directors / Senior Officers / Relatives — Mandatory — Para 40

FATF and Investment-Related:
• FATF Non-Compliant Jurisdiction Declaration — Confirming no new investor holds 20%+ from FATF non-compliant jurisdiction (Para 8)
• FDI/Foreign Investment Disclosure (if applicable)`
    },
    {
      id: 'process',
      title: 'Step-by-Step Registration Process',
      content: `Step 1 – Pre-Application Structuring and Feasibility Check
Verify company incorporation status, MoA object clause alignment, Principal Business Test (50-50 rule), NOF computation, director profile (at least one with bank/NBFC experience), shareholder structure for FATF compliance.

Step 2 – Company Incorporation and MoA Alignment
Incorporate under Companies Act 2013 with MoA objects covering lending, investment, hire-purchase. Existing companies may need EGM-approved MoA amendment. Obtain CoI from MCA, establish PAN/TAN/registered office.

Step 3 – NOF Build-Up and Chartered Accountant Certification
Inject equity capital evidenced by bank statements and share allotment. Computation of NOF by Statutory CA in prescribed format under Section 45-IA. Certification that NOF meets minimum threshold (Rs. 10 Crore for NBFC-ICC).

Step 4 – Business Plan and Document Preparation
Prepare and quality-check all documents. Business Plan must cover: nature of business, target borrower profile, revenue model, interest income projections, operating costs, capital deployment strategy, risk management, 5-year projections, compliance framework.

Step 5 – Online Application on COSMOS Portal
File at https://cosmos.rbi.org.in. Register company on portal, fill online application form, upload supporting documents, pay applicable fees, generate application number.

Step 6 – Physical Submission to RBI Regional Office
Submit physical dossier to Regional Office of Department of Supervision in jurisdiction of registered office. Self-attested copies, same sequence as online, cover letter on company letterhead signed by authorised director.

Step 7 – RBI Scrutiny, Query Handling, and Site Inspection
Primary review (completeness, authenticity, eligibility). Detailed scrutiny of NOF, business plan, director backgrounds. Issuance of queries. For some applicants — inspection of registered office and management interview.

Step 8 – Grant of Certificate of Registration (CoR)
RBI issues CoR specifying NBFC category. Display CoR at registered office. Commence regulatory compliance before customer-facing activity. Register on RBI XBRL reporting portal. Notify RBI of any post-CoR changes within one month.`
    },
    {
      id: 'timeline',
      title: 'Expected Registration Timeline',
      content: `• Stage 1: Pre-application structuring, NOF audit, MoA review — 2 to 4 weeks
• Stage 2: Document preparation — business plan, policies, director declarations — 3 to 5 weeks
• Stage 3: COSMOS online filing and physical dossier submission — 1 week
• Stage 4: RBI primary acknowledgement and initial review — 4 to 8 weeks
• Stage 5: Query resolution and RBI correspondence — 4 to 12 weeks
• Stage 6: Final review and CoR issuance — 4 to 8 weeks

Total (well-prepared application): 4 to 8 months from filing to CoR receipt
Total (incomplete or query-heavy application): 12 to 18 months or more`
    },
    {
      id: 'application-fees',
      title: 'Application and Registration Fees',
      content: `The Master Direction (RBI SBR Directions 2023, Updated July 17, 2025) does not specify a fixed application fee for NBFC registration in its main body. Application and processing fees, if any, are governed by the RBI's separately notified fee schedule and are subject to revision.

Action Required: The applicable RBI fee at the time of application must be verified directly from the official RBI COSMOS portal (https://cosmos.rbi.org.in) or from the relevant Regional Office of the Department of Supervision at the time of filing. Do not rely on historical fee amounts as these are subject to change.`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes That Lead to Rejection or Delay',
      content: `8.1 Incorrect or Incomplete NOF Computation — Single most common reason for rejection. Including borrowings/preference share capital that does not qualify; failing to deduct group investments exceeding 10% of (paid-up equity + free reserves); missing AIF-routed indirect group investments; CA certificate in incorrect format.

8.2 Principal Business Test Not Clearly Demonstrated — CA certificate not explicitly stating percentages; mixed-activity businesses with borderline ratios; new companies without audited statements lacking clear CA opinion.

8.3 MOA Object Clause Mismatch — Generic objects not specifically mentioning lending, hire-purchase, investment, leasing; MoA drafted for trading/manufacturing company never amended; objects including activities prohibited for NBFCs.

8.4 Weak, Generic, or Unrealistic Business Plan — No specific target borrower profile; financial projections not grounded in realistic assumptions; absence of credit risk, liquidity risk, operational risk frameworks.

8.5 Director Without Requisite Financial Sector Experience — Para 38 mandates at least one director with bank/NBFC experience.

8.6 FATF Non-Compliant Jurisdiction Investor Exposure — Foreign investors from FATF non-compliant countries holding 20%+; convertible instruments triggering 20% threshold on conversion. Mandatory rejection under Para 8.

8.7 Annex XII Forms Incomplete or Missing — Generic bio-data instead of RBI's Annex XII format; missing fields on prosecutions/defaults/investigations; no bankers' report; no Deed of Covenants.

8.8 Physical Dossier Discrepancies with Online Filing — Document versions not matching; missing self-attestation; sequence mismatch; submission to wrong Regional Office.

8.9 No Pre-Built Policy Framework — Application without draft Fair Practices Code, AML/KYC Policy, Interest Rate Policy, Risk Management Framework attracts queries.

8.10 Inadequate Response to RBI Queries — Each query round multiplies delay by 4-8 weeks. Addressing only part of query; submitting documents without explanation; changing facts/figures without proper explanation.`
    },
    {
      id: 'sbr-layers',
      title: 'Layer-Wise Regulatory Framework Under SBR',
      content: `The SBR framework introduced by RBI has fundamentally changed how NBFC Registration in India operates. Regulation is now proportionate to size, risk and systemic importance.

• Base Layer (NBFC-BL) — Majority of NBFCs — Simplified prudential norms
• Middle Layer (NBFC-ML) — Larger and deposit-taking NBFCs — Enhanced governance & reporting
• Upper Layer (NBFC-UL) — Systemically significant NBFCs — Bank-like supervision
• Top Layer — Rare cases identified by RBI — Intensive supervisory regime

Most newly approved entities under NBFC Registration in India begin as Base Layer NBFCs unless RBI determines otherwise.`
    },
    {
      id: 'capital-adequacy',
      title: 'Capital Adequacy and Prudential Norms',
      content: `Core Prudential Requirements:
• Maintenance of Net Owned Fund at all times
• Capital to Risk Weighted Assets Ratio (CRAR) as prescribed
• Income Recognition and Asset Classification (IRAC) norms
• Provisioning requirements for NPAs
• Exposure norms to single and group borrowers

CRAR Structure:
CRAR = (Tier I Capital + Tier II Capital) ÷ Risk Weighted Assets

Where Tier I Capital includes core equity and disclosed reserves; Tier II Capital includes subordinated debt and eligible reserves; Risk Weighted Assets represent weighted exposure of loan portfolio.

Failure to maintain prescribed CRAR may attract supervisory restrictions.`
    },
    {
      id: 'asset-classification',
      title: 'Asset Classification and Provisioning Framework',
      content: `Once NBFC Registration in India is granted, the company must follow prudential asset classification standards.

• Standard Asset — Performing loan
• Sub-Standard Asset — Past due beyond specified period
• Doubtful Asset — Extended delinquency
• Loss Asset — Identified as non-recoverable

NPA Classification — 90 Days Overdue (effective March 31, 2026):
• SMA-0 — up to 30 days
• SMA-1 — 31-60 days
• SMA-2 — 61-90 days
• NPA — beyond 90 days

Provisioning – Standard Assets: NBFC-BL must provide for standard assets at 0.25% of outstanding balance.

Provisioning percentages escalate as the asset deteriorates. Higher delinquency → Higher provisioning. Failure to comply may invite supervisory action.`
    },
    {
      id: 'governance',
      title: 'Corporate Governance Requirements',
      content: `Governance is a central pillar of the RBI Master Direction.

• Board-approved lending policy
• Risk management framework
• Internal audit mechanism
• Audit Committee oversight
• Compliance function independence

Governance Oversight Flow:
Board of Directors → Risk Management Committee → Compliance & Audit Function → Regulatory Reporting to RBI

Board Director Experience: At least one director must have bank or NBFC working experience at all times (Para 38).
Risk Management Committee (RMC): Mandatory at Board level or executive level. Must evaluate all risks including liquidity risk and report to Board (Para 39).
Loans to Directors/Senior Officers/Relatives: Board-approved policy with threshold for Board-level reporting (Para 40).
Statutory Auditor Appointment: Per RBI guidelines dated April 27, 2021. NBFCs with assets below Rs. 1,000 Crore may continue extant procedure (Para 41).
Deed of Covenants: Executed with each director at the time of appointment (Annex XXIII).`
    },
    {
      id: 'change-control',
      title: 'Prior Approval and Change Reporting',
      content: `Prior Approval for Change in Control: Required for acquisition or transfer of 26%+ equity shareholding, or change in management resulting in change of 30%+ directors (excluding independent directors) — Para 42.1.

Public Notice Before Change in Control / Closure of Branch: 30 days public notice in national and local vernacular newspaper before any sale, transfer of ownership, or branch closure — Para 42.3, Para 43.

Change Reporting: Any change in registered office address, director names, principal officers, or auditors must be communicated to RBI Regional Office within one month — Para 44.

After NBFC Registration in India:
• Any substantial change in shareholding requires prior RBI approval
• Change in management control must be reported
• Transfer of more than prescribed thresholds triggers regulatory scrutiny

Corporate restructuring without regulatory approval can invalidate compliance status.`
    },
    {
      id: 'fair-practices',
      title: 'Fair Practices Code and Customer Protection',
      content: `After NBFC Registration in India, every NBFC with customer interface must adopt a Board-approved Fair Practices Code:

• Loan Applications — All communications in vernacular/borrower-understood language. Loan application form to include all information affecting borrower's interest. Acknowledgement system (Para 45.1).
• Loan Appraisal and Terms Communication — Communicate loan terms in writing including annualised rate of interest. Furnish copy of loan agreement (Para 45.2).
• Key Facts Statement (KFS) — Issue KFS to all borrowers in format prescribed by RBI circular dated April 15, 2024 (Annex XXVII) (Para 45.2.3).
• Penal Charges Policy — Board-approved. Penal charges not added to rate of interest. No capitalisation. Disclose in KFS and on website (Para 45.3).
• Changes in Terms — Prior notice before changing rates/charges. Effective only prospectively (Para 45.4).
• Property Document Release — Release within 30 days of full repayment. Delay attributable to NBFC attracts compensation of Rs. 5,000 per day (Para 45.5).
• Floating Rate EMI Loans — Communicate impact of benchmark changes. Provide option to switch to fixed rate. Quarterly statement with principal/interest/EMI/APR (Para 45.6).
• Grievance Redressal Mechanism — Board-laid down mechanism. Disputes heard at next higher level (Para 45.8).
• RBI Integrated Ombudsman Scheme 2021 — Compliance for covered NBFCs (Para 45.9).
• Recovery Practices — No undue harassment. No calls at odd hours. Trained staff (Para 45.7.3).
• Foreclosure Charges — No foreclosure charges on floating rate term loans to individuals for non-business purposes. Comply with RBI Pre-payment Charges Directions 2025 for loans sanctioned/renewed on or after January 1, 2026 (Para 45.7.4).
• Interest Rate Model — Board-adopted. Disclose annualised rate at sanction and on website (Para 45.11).`
    },
    {
      id: 'digital-lending',
      title: 'Digital Lending Considerations',
      content: `NBFCs engaged in digital lending must comply with RBI (Digital Lending) Directions, 2025 (effective May 08, 2025):

• Lending must remain on the NBFC's balance sheet
• Digital loan disbursement directly to borrower's bank account (no intermediary disbursement)
• Lending Service Provider (LSP) agreements and oversight obligations
• Data localisation, customer consent, and data privacy requirements
• Cooling-off period provisions for digital loan borrowers
• Key Facts Statement mandatory before digital loan disbursal
• Clear disclosure of digital partners
• Transparent KFS (Key Fact Statement)
• No unregulated outsourcing of core decision-making

Digital expansion without regulatory discipline can trigger supervisory scrutiny.`
    },
    {
      id: 'kyc-aml',
      title: 'KYC and AML Compliance',
      content: `Full compliance with RBI KYC Master Direction 2016 (as amended) is mandatory for all customer onboarding.

• Customer Due Diligence (CDD)
• Enhanced Due Diligence (EDD) for high-risk customers
• Ongoing Due Diligence
• Periodic KYC update
• Transaction monitoring and Suspicious Transaction Reporting (STR) to FIU-IND
• Record retention
• Compliance with Prevention of Money Laundering Act, 2002 (PMLA) obligations

AML non-compliance carries significant regulatory risk.`
    },
    {
      id: 'liquidity-risk',
      title: 'Liquidity Risk Management',
      content: `Liquidity management has become a central regulatory focus.

Post NBFC Registration in India, companies must:
• Monitor asset-liability maturity mismatch
• Maintain liquidity buffers
• Conduct stress testing
• Prepare contingency funding plans

Excess mismatch between Short-Term Liabilities vs Long-Term Loan Assets → Liquidity Risk → Regulatory Concern

Poor liquidity management has historically led to regulatory tightening.`
    },
    {
      id: 'consumer-credit',
      title: 'Consumer Credit and Concentration Risk Policy',
      content: `As per Para 32A of the Master Direction, NBFC-BL entities must maintain a Board-approved internal policy for consumer credit segments, including Board-approved limits on exposure to various sub-segments of consumer credit. This applies to NBFCs engaged in lending against shares and exposure to sensitive sectors.`
    },
    {
      id: 'dividend',
      title: 'Dividend Declaration Compliance',
      content: `NBFCs must satisfy prescribed minimum prudential requirements before declaring dividends. The Board must verify:
• Applicable capital ratio and leverage ratio maintained
• Net NPA ratio does not exceed applicable limit
• Complies with the dividend payout ratio prescribed by RBI
• No qualification in Auditor's Report that has a bearing on the dividend proposal`
    },
    {
      id: 'gold-lending',
      title: 'Gold Lending – Tier 1 Capital',
      content: `NBFCs primarily lending against gold (50%+ of financial assets) must maintain minimum Tier 1 capital of 12% of aggregate risk-weighted assets — Para 9.2.

Accounting Standards: Comply with applicable AS or Ind AS as required under Companies (Indian Accounting Standards) Rules, 2015 — Para 10.`
    },
    {
      id: 'reporting',
      title: 'Reporting Requirements',
      content: `NBFC Registration in India creates structured reporting obligations.

Periodic Regulatory Reporting:
• Financial returns
• Asset classification returns
• Capital adequacy returns
• Statutory auditor certificate
• Annual statutory filings
• XBRL regulatory return filings (NBS-7 and other applicable returns)
• Annual NOF Recertification

Timely submission is mandatory. Persistent delays may trigger inspection.`
    },
    {
      id: 'inspection',
      title: 'RBI Inspection and Supervisory Powers',
      content: `Under the Master Direction, RBI has authority to conduct:
• On-site inspection
• Off-site surveillance
• Thematic review
• Special audit directions

Supervisory Action Ladder:
Observation → Advisory → Direction → Restriction → Penalty → Cancellation

NBFC Registration in India does not shield the company from corrective action.`
    },
    {
      id: 'suspension-cancellation',
      title: 'Suspension and Cancellation Triggers',
      content: `• Failure to maintain NOF — Supervisory action
• Misreporting — Monetary penalty
• Governance failure — Operational restriction
• Persistent non-compliance — Cancellation

Grounds for Regulatory Action:
• Capital falls below prescribed threshold
• CRAR not maintained
• High NPA without provisioning
• Misreporting or concealment
• Governance lapses
• AML or KYC violations

Maintaining discipline after NBFC Registration in India is critical.`
    },
    {
      id: 'penalties',
      title: 'Penalties Under RBI Act',
      content: `Penalties may include:
• Monetary fines
• Restrictions on new business
• Prohibition on accepting public funds
• Cancellation of Certificate of Registration

Non-compliance risk increases significantly for systemically important NBFCs.`
    },
    {
      id: 'deposit-taking',
      title: 'Deposit-Taking vs Non-Deposit Taking NBFC',
      content: `Not all NBFCs are permitted to accept public deposits.

NBFC-ND (Non-Deposit Taking):
• Accept Public Deposits — No
• Regulatory Intensity — Moderate
• Prudential Monitoring — Applicable
• Liquidity Norms — Applicable

NBFC-D (Deposit-Taking):
• Accept Public Deposits — Yes (subject to RBI approval)
• Regulatory Intensity — Higher
• Prudential Monitoring — More stringent
• Liquidity Norms — Strict

Most newly granted NBFC Registration in India approvals are Non-Deposit Taking NBFCs.`
    },
    {
      id: 'outsourcing',
      title: 'Outsourcing Guidelines',
      content: `While NBFCs may outsource certain operational functions, core management responsibility cannot be outsourced.

After NBFC Registration in India:
• Loan sanctioning authority remains with NBFC
• Risk assessment accountability cannot be delegated
• Data protection obligations remain primary responsibility

Operational Support — Permissible
Core Risk Decision — Not Permissible`
    },
    {
      id: 'exposure-norms',
      title: 'Exposure Norms',
      content: `RBI prescribes limits on exposure to:
• Single borrower — Avoid dependency risk
• Group borrower — Prevent contagion risk
• Connected parties — Governance protection

This prevents concentration risk and excessive related-party lending.`
    },
    {
      id: 'merger',
      title: 'Merger, Amalgamation and Business Transfer',
      content: `NBFC Registration in India does not automatically permit mergers.

Key regulatory aspects:
• Prior RBI approval
• Scheme compliance with Companies Act
• Protection of depositors (if applicable)
• Post-merger capital adequacy maintenance

Strategic expansion must align with regulatory approvals.`
    },
    {
      id: 'nbfc-vs-fintech',
      title: 'NBFC vs Fintech Model – Regulatory Distinction',
      content: `• Lending: NBFC — On own balance sheet | Fintech — Partner NBFC model
• RBI Supervision: NBFC — Direct | Fintech — Indirect
• Capital Requirement: NBFC — Mandatory NOF | Fintech — Not applicable
• Prudential Norms: NBFC — Applicable | Fintech — Not applicable directly
• Regulatory Risk: NBFC — Structured | Fintech — Dependency risk

NBFC Registration in India provides institutional credibility but increases compliance obligations.`
    },
    {
      id: 'strategic-models',
      title: 'Common Strategic Structuring Models',
      content: `• Independent Lending NBFC
• NBFC with Digital Sourcing Model
• NBFC Funding Group Entities (within exposure norms)
• Hybrid Physical + Digital Lending

Each structure must align with regulatory prescriptions before seeking NBFC Registration in India.`
    },
    {
      id: 'strategic-considerations',
      title: 'Strategic Considerations Before Applying',
      content: `• Assess long-term capital sustainability
• Understand compliance cost
• Design proper governance framework
• Ensure directors meet Fit and Proper standards
• Prepare realistic business projections

NBFC Registration in India should be viewed as building a regulated financial institution, not merely starting a lending business.

"Compliance is not a burden on financial institutions; it is the foundation that sustains public trust and regulatory confidence." — CS Devyani Khambhati – Compliance Expert`
    },
    {
      id: 'final-strategic',
      title: 'Final Strategic Conclusion',
      content: `NBFC Registration in India is more than regulatory approval — it is entry into a prudentially supervised financial ecosystem.

It requires:
• Adequate and sustainable capital
• Structured governance architecture
• Continuous reporting discipline
• Transparent customer practices
• Risk-conscious lending strategy

When designed with regulatory foresight, NBFC Registration in India provides institutional credibility, funding access, and scalable growth within RBI's regulatory perimeter.

"A regulator does not grant approval to ambition alone; it grants approval to structured discipline, documented governance, and sustainable intent." — CS Devyani Khambhati – Compliance Expert`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is NBFC Registration in India?", a: "NBFC Registration in India is the Certificate of Registration granted by the Reserve Bank of India under Section 45-IA of the RBI Act, 1934, allowing a company to carry on the business of a Non-Banking Financial Company." },
        { q: "Who regulates NBFC Registration in India?", a: "NBFC Registration in India is regulated exclusively by the Reserve Bank of India (RBI)." },
        { q: "Is NBFC Registration in India mandatory for lending business?", a: "Yes. If lending or financial activity is the principal business of a company, NBFC Registration in India is mandatory before commencing operations." },
        { q: "What activities require NBFC Registration in India?", a: "Activities such as providing loans, advances, investment in securities, leasing, hire-purchase, and other financial asset-based businesses require NBFC Registration in India." },
        { q: "Can a company lend money without NBFC Registration in India?", a: "If lending becomes the principal business based on asset and income criteria, NBFC Registration in India is compulsory." },
        { q: "What is meant by principal business under NBFC norms?", a: "Principal business is determined by assessing whether financial assets and income from financial assets constitute a substantial portion of total assets and income." },
        { q: "Does NBFC Registration in India allow banking activities?", a: "No. NBFC Registration in India does not permit acceptance of demand deposits or issuance of cheques drawn on itself like banks." },
        { q: "What is the legal provision governing NBFC Registration in India?", a: "Section 45-IA of the RBI Act, 1934 governs NBFC Registration in India." },
        { q: "Is NBFC Registration in India required for digital lending platforms?", a: "If loans are provided from the company's own balance sheet, NBFC Registration in India is required." },
        { q: "Can NBFC Registration in India be obtained after starting lending operations?", a: "No. Registration must be obtained before commencing NBFC business." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for NBFC Registration in India?", a: "Only companies incorporated under the Companies Act are eligible." },
        { q: "Can an LLP apply for NBFC Registration in India?", a: "No. LLPs are not eligible under the RBI Act." },
        { q: "Can individuals apply for NBFC Registration in India?", a: "No. Only incorporated companies are permitted." },
        { q: "Is a Private Limited Company eligible for NBFC Registration in India?", a: "Yes, subject to meeting capital and regulatory conditions." },
        { q: "Is a Public Limited Company eligible?", a: "Yes, provided regulatory criteria are satisfied." },
        { q: "Can a Section 8 company apply?", a: "Section 8 companies typically cannot undertake profit-oriented lending business requiring NBFC Registration in India." },
        { q: "Is prior RBI approval required before incorporation?", a: "No. The company must first be incorporated and then apply." },
        { q: "Can an existing company change its object clause and apply?", a: "Yes, provided its Memorandum authorises financial activity." },
        { q: "Are directors required to meet specific criteria?", a: "Yes. Directors must satisfy the Fit and Proper criteria prescribed by RBI." },
        { q: "Can foreign shareholders invest in an NBFC?", a: "Foreign investment is permitted subject to applicable foreign exchange regulations." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which Act is NBFC Registration in India granted?", a: "Under the Reserve Bank of India Act, 1934." },
        { q: "What is the current regulatory framework for NBFCs?", a: "The Scale Based Regulation framework under the Master Direction dated July 17, 2025." },
        { q: "What is Scale Based Regulation?", a: "It is a layered regulatory system classifying NBFCs into Base, Middle, Upper and Top layers." },
        { q: "What is a Base Layer NBFC?", a: "Most newly registered NBFCs fall under the Base Layer category." },
        { q: "Can RBI classify an NBFC into a higher layer?", a: "Yes, based on size, risk and systemic importance." },
        { q: "Are prudential norms applicable after registration?", a: "Yes. Capital adequacy, provisioning and reporting norms apply." },
        { q: "Is capital adequacy mandatory?", a: "Yes. NBFCs must maintain prescribed capital ratios." },
        { q: "Are asset classification norms applicable?", a: "Yes. NBFCs must follow Income Recognition and Asset Classification norms." },
        { q: "Is KYC compliance mandatory?", a: "Yes. NBFCs must comply with RBI's KYC directions." },
        { q: "Is AML reporting required?", a: "Yes. NBFCs must report suspicious transactions as required." }
      ]
    },
    {
      category: 'Registration / Application Process',
      faqs: [
        { q: "How do I apply for NBFC Registration in India?", a: "Through the RBI COSMOS portal along with submission of supporting documents." },
        { q: "What is the first step before applying?", a: "Incorporating a company with financial activity in its object clause." },
        { q: "Is capital infusion required before applying?", a: "Yes. Minimum Net Owned Fund must be fully infused." },
        { q: "Is a CA certificate required?", a: "Yes. Net Owned Fund certification is required." },
        { q: "Does RBI conduct background verification?", a: "Yes. RBI verifies promoters and directors." },
        { q: "Is physical submission required after online filing?", a: "Yes, supporting documents are submitted to RBI." },
        { q: "Can RBI seek clarification during review?", a: "Yes. Queries and additional information may be requested." },
        { q: "How long does NBFC Registration in India take?", a: "It depends on documentation quality and regulatory review. A well-prepared application typically takes 4–8 months." },
        { q: "Is personal hearing granted?", a: "RBI may seek clarification meetings if required." },
        { q: "Can application be rejected?", a: "Yes, if regulatory conditions are not satisfied." }
      ]
    },
    {
      category: 'Capital, Net Worth & Infrastructure',
      faqs: [
        { q: "What is the minimum capital for NBFC Registration in India?", a: "₹10 Crore Net Owned Fund for Base Layer NBFC-ICC; ₹2 Crore for NBFC-P2P, NBFC-AA, and NBFCs without public funds/customer interface; ₹300 Crore for NBFC-IFC and IDF-NBFC." },
        { q: "What is Net Owned Fund?", a: "Paid-up equity capital plus free reserves minus accumulated losses, intangible assets, and certain inter-group investment deductions." },
        { q: "Is revaluation reserve counted in NOF?", a: "No." },
        { q: "Can preference shares be counted?", a: "Only if they qualify under regulatory conditions." },
        { q: "Must NOF be maintained after registration?", a: "Yes, at all times." },
        { q: "Is office infrastructure required?", a: "Yes. A functional office must exist." },
        { q: "Is IT system mandatory?", a: "Yes, adequate system for loan management and reporting is expected." },
        { q: "Is professional staff required?", a: "Yes, competent personnel must be appointed." },
        { q: "Is internal audit required?", a: "Yes, post-registration compliance requires oversight." },
        { q: "Can capital be reduced after registration?", a: "Only if it does not breach minimum NOF requirement." }
      ]
    },
    {
      category: 'Documentation & Declarations',
      faqs: [
        { q: "Is MOA required to include financial objects?", a: "Yes." },
        { q: "Is a Board Resolution mandatory?", a: "Yes, approving the application." },
        { q: "Are audited financial statements required?", a: "Yes." },
        { q: "Is bankers' report required?", a: "Yes, for each director and shareholder per Para 42.2.1(vi)." },
        { q: "Is business plan mandatory?", a: "Yes, with 5-year financial projections." },
        { q: "Are director KYC documents required?", a: "Yes." },
        { q: "Is Net Worth Certificate required?", a: "Yes, in RBI prescribed format certified by Statutory CA." },
        { q: "Are group company details required?", a: "Yes, if applicable." },
        { q: "Are litigation disclosures required?", a: "Yes, in Annex XII format." },
        { q: "Is declaration of non-acceptance of deposits required?", a: "Yes, if applicable." }
      ]
    },
    {
      category: 'Timelines & Fees',
      faqs: [
        { q: "Is there a heavy application fee for NBFC Registration in India?", a: "No significant fee structure is prescribed like SEBI registrations. Verify current fees on RBI COSMOS portal." },
        { q: "Is professional fee separate from RBI fee?", a: "Yes." },
        { q: "What affects approval timeline?", a: "Documentation quality and regulatory clarity." },
        { q: "Can application be tracked online?", a: "Yes, through RBI COSMOS portal." },
        { q: "Does RBI prescribe strict approval time?", a: "Approval is subject to regulatory satisfaction." }
      ]
    },
    {
      category: 'Post-Registration Compliance',
      faqs: [
        { q: "Are quarterly returns required?", a: "Yes, regulatory returns must be filed." },
        { q: "Is statutory audit mandatory?", a: "Yes." },
        { q: "Is Fair Practices Code required?", a: "Yes, mandatory for NBFCs with customer interface." },
        { q: "Is Board review required?", a: "Yes, governance oversight is expected." },
        { q: "Is liquidity monitoring required?", a: "Yes." },
        { q: "Are asset-liability statements required?", a: "Yes." },
        { q: "Is CRAR maintenance mandatory?", a: "Yes." },
        { q: "Is NPA reporting required?", a: "Yes, with 90-day NPA classification effective March 31, 2026." },
        { q: "Is AML compliance ongoing?", a: "Yes." },
        { q: "Is customer grievance redressal mandatory?", a: "Yes." }
      ]
    },
    {
      category: 'Operational Restrictions & Permissions',
      faqs: [
        { q: "Can NBFC accept demand deposits?", a: "No." },
        { q: "Can NBFC issue cheque book?", a: "No." },
        { q: "Can NBFC engage in agriculture activity?", a: "Primary activity must remain financial." },
        { q: "Can NBFC undertake multiple loan products?", a: "Yes, subject to prudential norms." },
        { q: "Can NBFC outsource loan sourcing?", a: "Yes, but core risk responsibility remains with NBFC." },
        { q: "Is RBI approval needed for change in shareholding?", a: "Yes, beyond prescribed limits (26%+ requires prior approval)." },
        { q: "Is prior approval required for change in control?", a: "Yes." },
        { q: "Can NBFC merge with another NBFC?", a: "Yes, subject to RBI approval." },
        { q: "Can NBFC operate nationwide?", a: "Yes, once registered." },
        { q: "Can NBFC open branches?", a: "Yes, subject to compliance." }
      ]
    },
    {
      category: 'Penalties, Cancellation & Regulatory Action',
      faqs: [
        { q: "Can RBI cancel NBFC Registration in India?", a: "Yes, for regulatory violations." },
        { q: "What are grounds for cancellation?", a: "Failure to maintain NOF, misreporting, governance lapses." },
        { q: "Can monetary penalty be imposed?", a: "Yes." },
        { q: "Can RBI restrict business expansion?", a: "Yes." },
        { q: "Can licence be suspended temporarily?", a: "Yes, depending on severity." }
      ]
    },
    {
      category: 'Practical & Scenario-Based Questions',
      faqs: [
        { q: "Can NBFC fund group companies?", a: "Yes, within exposure norms." },
        { q: "Can NBFC raise bank loans?", a: "Yes, subject to regulatory compliance." },
        { q: "Can NBFC lend without collateral?", a: "Yes, subject to internal risk policy." },
        { q: "Can NBFC issue debentures?", a: "Yes, subject to applicable regulations." },
        { q: "Is RBI approval required for director change?", a: "Intimation is required; approval may be needed depending on change in control." },
        { q: "Can NBFC surrender its licence voluntarily?", a: "Yes, subject to RBI approval." },
        { q: "What happens if capital falls below minimum?", a: "RBI may initiate supervisory action." },
        { q: "Is credit rating mandatory?", a: "Required in specific circumstances." },
        { q: "Can NBFC operate internationally?", a: "Subject to foreign exchange laws." },
        { q: "Is NBFC Registration in India transferable?", a: "No. It is entity-specific." },
        { q: "Can NBFC change its name after registration?", a: "Yes, with regulatory approval where required." },
        { q: "Is prior RBI approval required for substantial share transfer?", a: "Yes, beyond prescribed thresholds (26%+)." },
        { q: "Can NBFC provide microfinance loans?", a: "Yes, if compliant with applicable norms (NBFC-MFI framework)." },
        { q: "Is reporting to FIU mandatory?", a: "Yes." },
        { q: "Can NBFC conduct investment business only?", a: "Yes, if financial activity is principal business and registration is obtained." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={['RBI', 'NBFC', 'SBR Master Direction 2023', 'Section 45-IA', 'NBFC-ICC', 'Base Layer']}
      breadcrumb={['Home', 'RBI Services', 'NBFC Registration']}
      title="NBFC Registration in India"
      readTime="25 min read"
      focusKeyword="NBFC Registration in India"
      sections={sections}
      ctaTitle="Ready to Launch Your NBFC?"
      ctaDescription="Get expert guidance on ₹10 Crore NOF structuring, COSMOS portal filing, business plan drafting, Annex XII director documentation, and end-to-end RBI Certificate of Registration process."
      quickFacts={[
        { label: 'Regulator', value: 'Reserve Bank of India (RBI)' },
        { label: 'Governing Law', value: 'RBI Act, 1934 – Section 45-IA' },
        { label: 'Master Direction', value: 'SBR Directions 2023 (Updated July 17, 2025)' },
        { label: 'Eligible Entity', value: 'Company (Companies Act 2013)' },
        { label: 'NBFC-ICC NOF', value: '₹10 Crore (by March 31, 2027)' },
        { label: 'NBFC-P2P / AA NOF', value: '₹2 Crore' },
        { label: 'NBFC-IFC / IDF NOF', value: '₹300 Crore' },
        { label: 'Principal Business Test', value: '50-50 Rule' },
        { label: 'Leverage Ratio (BL)', value: 'Max 7x owned fund' },
        { label: 'NPA Classification', value: '90 days overdue (from Mar 31, 2026)' },
        { label: 'Approval Timeline', value: '4–8 months (well-prepared)' },
        { label: 'Application Portal', value: 'RBI COSMOS' }
      ]}
      relatedArticles={[
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license' },
        { title: 'NBFC Business Plan', href: '/rbi/nbfc-business-plan' },
        { title: 'NBFC Takeover', href: '/rbi/nbfc-takeover' },
        { title: 'NBFC Legal Support Services', href: '/rbi/nbfc-legal-support' },
        { title: 'NBFC Financial Modeling', href: '/rbi/nbfc-financial-modeling' },
        { title: 'ARC Registration in India', href: '/rbi/arc-registration-in-india' }
      ]}
      finalCtaTitle="Need Expert Support for NBFC Registration?"
      finalCtaDescription="Our compliance specialists provide end-to-end NBFC registration support — pre-filing audit, NOF computation, COSMOS portal filing, Annex XII documentation, business plan, all Board-approved policies, query handling, and ongoing post-registration compliance."
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
        <h2>Frequently Asked Questions (105+ FAQs)</h2>
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
