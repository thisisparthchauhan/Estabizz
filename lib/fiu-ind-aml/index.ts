export interface ServicePage {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  features: string[];
  process: { step: string; detail: string }[];
  documents: string[];
  faqs: { q: string; a: string }[];
}

export const FIU_IND_SERVICES: ServicePage[] = [
  {
    slug: "fiu-ind-registration",
    title: "FIU-IND Registration",
    tagline: "Register your entity with India's Financial Intelligence Unit under PMLA",
    category: "Registration",
    seoTitle: "FIU-IND Registration Services | PMLA Compliance — Estabizz Fintech",
    metaDescription:
      "Expert FIU-IND registration support for NBFCs, payment aggregators, wallets and fintech entities under PMLA. End-to-end documentation, portal filing and RBI/FIU liaison.",
    description:
      "Entities regulated under the Prevention of Money Laundering Act (PMLA) — including NBFCs, payment system operators, insurance companies and capital market intermediaries — are required to register with the Financial Intelligence Unit – India (FIU-IND). Estabizz provides end-to-end support for the registration process, from eligibility determination and documentation to portal filing and post-registration compliance set-up.",
    features: [
      "Eligibility assessment under PMLA Schedule and applicable RBI/SEBI/IRDAI guidelines",
      "Preparation of entity profile, KYC/AML policy and Board resolution",
      "FIU-IND portal registration and Principal Officer designation",
      "Nomination of Designated Director as required under PMLA",
      "Post-registration set-up: reporting obligations, STR/CTR formats",
      "Ongoing advisory on FIU-IND circulars and updates",
    ],
    process: [
      { step: "Eligibility Review", detail: "We assess whether your entity is a 'reporting entity' under PMLA and which regulator (RBI/SEBI/IRDAI/IFSCA) oversees you." },
      { step: "Document Preparation", detail: "We compile the entity profile, draft the KYC/AML policy and prepare Director/Principal Officer appointment letters." },
      { step: "FIU-IND Portal Filing", detail: "We complete the online registration at fiu.gov.in, including upload of required documents and officer details." },
      { step: "Confirmation & Set-up", detail: "Once registered, we help configure your STR/CTR reporting templates and internal AML escalation matrix." },
    ],
    documents: [
      "Certificate of Incorporation / Registration",
      "PAN card of entity",
      "Board resolution authorising FIU-IND registration",
      "KYC/AML Policy document",
      "Details of Principal Officer (name, designation, contact)",
      "Details of Designated Director",
      "Regulatory licence (RBI, SEBI, IRDAI, or relevant authority)",
    ],
    faqs: [
      {
        q: "Which entities must register with FIU-IND?",
        a: "All 'reporting entities' under PMLA — banks, NBFCs, payment system operators, prepaid instrument issuers, insurance companies, capital market intermediaries, casinos, and real estate agents — must register.",
      },
      {
        q: "Is there a fee for FIU-IND registration?",
        a: "No, FIU-IND registration itself is free. Professional fees apply for our advisory and documentation support.",
      },
      {
        q: "How long does the process take?",
        a: "Typically 7–15 working days from receipt of complete documents, depending on entity type and document readiness.",
      },
      {
        q: "What happens after registration?",
        a: "Registered entities must file Suspicious Transaction Reports (STR) and Cash Transaction Reports (CTR) on the FIU-IND portal, maintain records per PMLA rules, and conduct annual AML audits.",
      },
    ],
  },
  {
    slug: "pmla-compliance-advisory",
    title: "PMLA Compliance Advisory",
    tagline: "Build a robust AML/CFT compliance framework aligned with PMLA requirements",
    category: "Compliance",
    seoTitle: "PMLA Compliance Advisory Services | AML Framework — Estabizz Fintech",
    metaDescription:
      "PMLA compliance advisory for NBFCs, fintechs, payment companies and capital market intermediaries — KYC policies, CDD procedures, STR/CTR reporting and Board governance.",
    description:
      "Compliance under the Prevention of Money Laundering Act (PMLA) goes beyond registration — it requires a living framework of policies, procedures, systems and governance. Estabizz helps regulated entities design, implement and maintain an effective AML/CFT compliance programme that satisfies PMLA obligations, regulator expectations and FATF standards.",
    features: [
      "Comprehensive AML/CFT compliance programme design",
      "Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) framework",
      "Suspicious Transaction Report (STR) and Cash Transaction Report (CTR) procedures",
      "Board-level AML governance structure and compliance committee charter",
      "Transaction monitoring rules and red-flag indicator library",
      "Annual AML audit and gap assessment",
    ],
    process: [
      { step: "Gap Assessment", detail: "Review your existing policies and procedures against PMLA Rules, RBI/SEBI master directions and FATF 40 Recommendations." },
      { step: "Framework Design", detail: "Draft or revise KYC/AML policy, CDD SOP, STR escalation matrix and record-keeping procedures." },
      { step: "Implementation Support", detail: "Train your compliance and operations teams; configure reporting workflows and transaction monitoring thresholds." },
      { step: "Ongoing Advisory", detail: "Quarterly policy reviews, regulatory update briefings and pre-inspection readiness reviews." },
    ],
    documents: [
      "Existing KYC/AML policy (if any)",
      "Regulatory licence and registration details",
      "Organisation chart with compliance function",
      "Sample customer onboarding forms and CDD records",
      "Previous AML audit report (if any)",
    ],
    faqs: [
      {
        q: "What is the difference between KYC and AML compliance?",
        a: "KYC (Know Your Customer) is the customer identification and verification process. AML (Anti-Money Laundering) is the broader framework that includes KYC plus transaction monitoring, suspicious activity reporting and record-keeping.",
      },
      {
        q: "How often should the AML policy be reviewed?",
        a: "At minimum annually, and whenever there is a material change in business model, regulatory guidance, or a new FATF/FIU-IND circular.",
      },
      {
        q: "What are STR and CTR filing deadlines?",
        a: "STRs must be filed within 7 days of determining a transaction is suspicious. CTRs (cash transactions ≥ ₹10 lakh or equivalent) must be filed by the 15th of the following month.",
      },
    ],
  },
  {
    slug: "aml-policy-drafting",
    title: "AML Policy Drafting",
    tagline: "Regulatory-grade AML/CFT policy documents tailored to your business model",
    category: "Policy",
    seoTitle: "AML Policy Drafting Services | KYC/CFT Documents — Estabizz Fintech",
    metaDescription:
      "Professional AML policy drafting for NBFCs, fintechs, insurance and capital market entities — KYC/AML policy, CFT procedures, CDD SOP and Board-approved compliance documents.",
    description:
      "A well-drafted AML policy is the cornerstone of PMLA compliance. Estabizz drafts, reviews and updates AML/CFT policy documents that are regulator-ready, operationally practical and calibrated to your specific business model — whether you are an NBFC, payment aggregator, insurance entity, stockbroker or fintech platform.",
    features: [
      "Board-approved KYC/AML Policy compliant with PMLA Rules 2005",
      "Customer Acceptance Policy (CAP) and Risk Categorisation framework",
      "Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) SOP",
      "Combating Financing of Terrorism (CFT) procedures",
      "STR/CTR escalation and filing procedure",
      "Record Retention Policy (5-year PMLA requirement)",
      "Politically Exposed Persons (PEP) and adverse media screening procedures",
    ],
    process: [
      { step: "Business Model Review", detail: "Understand your products, customer segments, geographies and distribution channels to calibrate the policy." },
      { step: "Regulatory Mapping", detail: "Map applicable PMLA Rules, sector-specific master directions (RBI/SEBI/IRDAI) and FATF guidance." },
      { step: "Draft & Review", detail: "Prepare first draft, share with your compliance/legal team, incorporate feedback and produce a final Board-ready version." },
      { step: "Board Adoption Support", detail: "Prepare Board note and resolution language; update policy schedule with version control." },
    ],
    documents: [
      "Business model overview (products, geographies, customer types)",
      "Existing AML policy (if being revised)",
      "Organisational chart — compliance and senior management",
      "Regulator-specific licence/registration details",
    ],
    faqs: [
      {
        q: "Is a separate CFT policy required or can it be part of the AML policy?",
        a: "Both approaches are acceptable. A combined AML/CFT policy is common and acceptable to regulators; some large entities maintain a separate CFT annex.",
      },
      {
        q: "Does the Board need to formally approve the AML policy?",
        a: "Yes. Under PMLA Rules and most sector-specific directions, the AML/KYC policy must be approved and periodically reviewed by the Board.",
      },
      {
        q: "Can the same policy apply to multiple regulated entities in a group?",
        a: "A group-level policy can set minimum standards, but each regulated entity typically needs its own adopted version reflecting its specific licence and customer base.",
      },
    ],
  },
  {
    slug: "aml-risk-assessment",
    title: "AML Risk Assessment",
    tagline: "Systematic institutional AML risk assessment aligned with FATF methodology",
    category: "Risk",
    seoTitle: "AML Risk Assessment Services | FATF-Aligned — Estabizz Fintech",
    metaDescription:
      "Institutional AML/CFT risk assessments for regulated financial entities — customer risk profiling, product/service risk, geographic risk, and transaction monitoring framework design.",
    description:
      "A risk-based approach to AML/CFT begins with a thorough institutional risk assessment. Estabizz conducts structured AML risk assessments using FATF methodology and RBI/SEBI guidance, identifying your entity's inherent risks, evaluating existing controls, and producing a residual risk rating with a prioritised remediation roadmap.",
    features: [
      "Inherent risk assessment: customers, products, geographies, delivery channels",
      "Control effectiveness assessment against PMLA and sector directions",
      "Residual risk rating and heat-map",
      "Transaction monitoring threshold calibration",
      "High-risk customer segment identification and EDD trigger mapping",
      "Remediation roadmap with risk-prioritised action plan",
      "AML risk assessment report suitable for Board and regulator review",
    ],
    process: [
      { step: "Data Collection", detail: "Gather information on customer base, transaction volumes, geographies, products and existing controls." },
      { step: "Inherent Risk Scoring", detail: "Score each risk dimension (customer, product, geography, channel) using a structured risk matrix." },
      { step: "Control Assessment", detail: "Evaluate the effectiveness of existing KYC, transaction monitoring, screening and reporting controls." },
      { step: "Residual Risk & Report", detail: "Calculate residual risk ratings, produce the heat-map and draft the Board-level risk assessment report." },
    ],
    documents: [
      "Customer base segmentation data (categories, volumes, geographies)",
      "Product and service catalogue",
      "Existing KYC/AML policy and CDD procedures",
      "Transaction volume statistics (anonymised)",
      "Previous audit or regulatory inspection reports (if any)",
    ],
    faqs: [
      {
        q: "How frequently should an AML risk assessment be conducted?",
        a: "Annually as a minimum, and whenever there is a material change — new product launch, entry into a new geography, significant change in customer mix, or a regulatory inspection finding.",
      },
      {
        q: "Is an AML risk assessment the same as an AML audit?",
        a: "No. A risk assessment identifies and rates AML/CFT risks. An AML audit tests whether existing controls are operating effectively. Both are required; the risk assessment informs the audit scope.",
      },
      {
        q: "What is the output of the risk assessment?",
        a: "A written risk assessment report with an inherent risk matrix, control rating, residual risk heat-map and a time-bound action plan — suitable for Board approval and regulator review.",
      },
    ],
  },
  {
    slug: "ckyc-registration-reporting",
    title: "CKYC Registration & Reporting",
    tagline: "Central KYC Registry enrolment, data submission and ongoing reporting support",
    category: "KYC",
    seoTitle: "CKYC Registration & Reporting Services | Central KYC — Estabizz Fintech",
    metaDescription:
      "CKYC Registry (CKYCR) enrolment, KYC record upload, data updates and compliance reporting for regulated financial entities including NBFCs, banks and capital market intermediaries.",
    description:
      "The Central KYC Registry (CKYCR), managed by CERSAI, is a centralised repository for KYC records of financial sector customers. Regulated entities — banks, NBFCs, insurance companies, mutual funds, stockbrokers — are required to upload customer KYC data to CKYCR and update records whenever changes occur. Estabizz assists with CKYCR registration, technical integration, data submission and ongoing reporting obligations.",
    features: [
      "CKYCR entity registration and credential set-up",
      "KYC template mapping and data formatting as per CERSAI specifications",
      "Bulk upload of existing customer KYC records",
      "Ongoing KYC record update and synchronisation procedures",
      "Individual and non-individual KYC record handling",
      "KYC Identifier (KIN) management and customer communication",
      "Compliance gap assessment and remediation for CKYC obligations",
    ],
    process: [
      { step: "CKYCR Registration", detail: "Register your entity on the CERSAI CKYCR portal and obtain API/upload credentials." },
      { step: "Data Mapping", detail: "Map your existing KYC data fields to CERSAI's prescribed XML/CSV format for individuals and non-individuals." },
      { step: "Initial Upload", detail: "Conduct bulk upload of existing customer KYC records; resolve validation errors and obtain KIN assignments." },
      { step: "Ongoing Procedures", detail: "Establish internal procedures for real-time/periodic KYC updates, KIN retrieval for new accounts and periodic reconciliation." },
    ],
    documents: [
      "Entity's SEBI/RBI/IRDAI registration details",
      "Authorised signatory details for CKYCR registration",
      "Sample customer KYC data file (anonymised for assessment)",
      "Existing KYC policy and data retention framework",
    ],
    faqs: [
      {
        q: "Is CKYC registration mandatory?",
        a: "Yes, for all financial institutions regulated by RBI, SEBI, IRDAI, NPS Trust and PFRDA. Customers who complete KYC with one regulated entity can use their KIN for KYC compliance at another.",
      },
      {
        q: "What is a KIN (KYC Identification Number)?",
        a: "A 14-digit unique identifier assigned by CKYCR to each customer's KYC record. It enables KYC portability across regulated entities.",
      },
      {
        q: "What happens if we don't upload KYC data to CKYCR?",
        a: "Non-compliance can attract regulatory action from your respective sector regulator and is flagged during AML inspections. Regulators have issued specific directions requiring timely CKYCR uploads.",
      },
      {
        q: "How often must KYC records be updated on CKYCR?",
        a: "Updates must be pushed within 10 days of a change in customer KYC data (address, contact details, identity documents) as per CERSAI guidelines.",
      },
    ],
  },
];

export function getFiuIndService(slug: string): ServicePage | undefined {
  return FIU_IND_SERVICES.find((s) => s.slug === slug);
}

export function getAllFiuIndSlugs(): string[] {
  return FIU_IND_SERVICES.map((s) => s.slug);
}
