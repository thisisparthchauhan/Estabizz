/**
 * lib/globalMarkets/countries.ts
 *
 * Global Markets V2 — three-tier market model.
 * Tier:      active | developing | planned
 * PageDepth: full   | standard   | compact
 *
 * India is the only active market. All other markets are developing or planned.
 * Priority markets (developing tier) carry richer content architecture.
 * Content governance: sourceNotes and contentReviewedAt fields mark verification status.
 *
 * NOTE: Country-specific regulatory and legal content must be verified by
 * qualified local professionals before being published as factual.
 */

import type {
  GlobalMarketConfig,
  GlobalSupportArea,
  GlobalProcessStep,
  GlobalMarketFaq,
} from "./types";

// Re-export types for consumers
export type { GlobalMarketConfig, GlobalSupportArea, GlobalProcessStep, GlobalMarketFaq };
export type { GlobalMarketTier, GlobalPageDepth } from "./types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function countryToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function flagEmoji(iso2: string): string {
  return [...iso2.toUpperCase()].map(c =>
    String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)
  ).join("");
}

// ─── Default content blocks ───────────────────────────────────────────────────

const DEFAULT_SUPPORT_AREAS: GlobalSupportArea[] = [
  { icon: "Route",          label: "Market-entry feasibility and regulatory mapping" },
  { icon: "Building2",      label: "Entity setup and ownership structure coordination" },
  { icon: "ClipboardCheck", label: "Regulatory licensing and registration advisory" },
  { icon: "Globe2",         label: "Cross-border financial product and payment structuring" },
  { icon: "ShieldCheck",    label: "AML, KYC and governance framework support" },
  { icon: "FileText",       label: "Regulatory documentation and submission planning" },
  { icon: "Handshake",      label: "Bilateral compliance advisory (India to market)" },
  { icon: "Network",        label: "Local professional network identification" },
];

const DEFAULT_AUDIENCES: string[] = [
  "Indian businesses planning cross-border expansion",
  "Foreign companies entering India",
  "Fintech and financial-services businesses",
  "Payment service providers",
  "Fund managers and investment advisers",
  "Corporate legal and compliance teams",
];

const DEFAULT_PROCESS_STEPS: GlobalProcessStep[] = [
  {
    number: 1,
    title: "Requirement review",
    description:
      "We assess the proposed activity, ownership structure, target customer, transaction flow and intended timeline.",
  },
  {
    number: 2,
    title: "Regulatory pathway mapping",
    description:
      "We identify the likely entity, licensing, registration, compliance and professional-coordination workstreams.",
  },
  {
    number: 3,
    title: "Local professional coordination",
    description:
      "Where required, we coordinate with independent local legal, tax, accounting or regulatory professionals.",
  },
  {
    number: 4,
    title: "Execution planning",
    description:
      "We prepare a structured next-step plan, indicative documentation list and proposed engagement scope.",
  },
];

const DEFAULT_DELIVERABLES: string[] = [
  "Market-entry assessment note",
  "Entity and ownership structure options",
  "Regulatory applicability matrix",
  "Documentation checklist",
  "Licensing and registration roadmap",
  "Professional coordination plan",
  "Implementation-phase outline",
  "Ongoing compliance framework",
  "India-entry pathway for inbound businesses",
];

function defaultFaqs(countryName: string): GlobalMarketFaq[] {
  return [
    {
      question: `Can Estabizz help assess entry into ${countryName}?`,
      answer: `Estabizz can help evaluate the likely market-entry structures, regulatory pathways and professional-coordination requirements for ${countryName}. Assessments are managed through our India-based Global Market Desk.`,
    },
    {
      question: `Does Estabizz currently have an office in ${countryName}?`,
      answer: `Estabizz does not currently operate a permanent local office, locally incorporated entity or directly authorised presence in ${countryName}. Enquiries are handled from our India base and, where required, coordinated with independent local professionals.`,
    },
    {
      question: "Will local professionals be required?",
      answer: `Depending on the proposed activity and jurisdiction, independent local legal, tax, accounting or regulatory professionals may be required. Estabizz can help identify and coordinate with appropriate local advisers.`,
    },
    {
      question: "What information is needed for an initial assessment?",
      answer: `A brief overview of the proposed activity, intended ownership structure, target customer type, transaction flow and timeline is typically sufficient to begin an initial scoping discussion.`,
    },
    {
      question: `Can Estabizz support businesses from ${countryName} entering India?`,
      answer: `Yes. Estabizz supports businesses from international markets seeking to establish or expand operations in India, including entity setup, RBI, SEBI, IRDAI, IFSCA and FIU-IND applicability assessment, and ongoing India compliance.`,
    },
    {
      question: "Does Estabizz guarantee regulatory approval?",
      answer: `No. Estabizz provides advisory and coordination support — we do not guarantee regulatory approval, timeline or outcome. Regulatory decisions rest with the relevant authorities.`,
    },
    {
      question: "What services may be available?",
      answer: `Advisory outputs may include market-entry assessment notes, regulatory applicability matrices, documentation checklists, professional coordination and implementation planning. Scope varies by country and engagement.`,
    },
    {
      question: "How does the Global Market Desk work?",
      answer: `The Global Market Desk is Estabizz's India-based team for coordinating international market-entry enquiries. We review submitted enquiries, identify the appropriate next step, and coordinate with local professionals where needed.`,
    },
  ];
}

const DEFAULT_CORRIDOR = {
  indiaToMarket: [
    "Entry-structure assessment",
    "Regulatory-pathway mapping",
    "Documentation planning",
    "Local professional coordination",
    "Compliance-readiness planning",
  ],
  marketToIndia: [
    "Indian entity setup advisory",
    "RBI applicability assessment",
    "SEBI applicability assessment",
    "IRDAI applicability assessment",
    "IFSCA / GIFT City applicability",
    "FIU-IND and AML registration advisory",
    "Ongoing India compliance support",
  ],
};

// ─── Priority market enrichment ───────────────────────────────────────────────
// These markets have richer content architecture (standard or full pageDepth).
// All content is general advisory language and does not constitute legal advice.
// Regulatory details must be verified with qualified local professionals.

interface RawCountry {
  name: string;
  iso2: string;
  callingCode: string;
  region: string;
  subregion?: string;
  tier: "active" | "developing" | "planned";
  pageDepth?: "full" | "standard" | "compact";
  overview?: string;
  businessEnvironment?: string;
  regulatoryOverview?: string;
  crossBorderOverview?: string;
  audiences?: string[];
  sourceNotes?: string[];
}

const RAW_COUNTRIES: RawCountry[] = [
  // ── India & South Asia ────────────────────────────────────────────────────
  {
    name: "India",
    iso2: "IN",
    callingCode: "+91",
    region: "India & South Asia",
    tier: "active",
    pageDepth: "full",
    overview:
      "India is Estabizz's primary operating market. The regulatory landscape spans RBI, SEBI, IRDAI, IFSCA, FIU-IND and MCA across banking, payments, securities, insurance, fund management and fintech sectors.",
  },
  {
    name: "Bangladesh",
    iso2: "BD",
    callingCode: "+880",
    region: "India & South Asia",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Bangladesh is a key South Asian corridor market for Indian businesses, with growing fintech, payments and trade-finance activity. The India–Bangladesh economic relationship continues to develop across technology, financial services and cross-border trade.",
    businessEnvironment:
      "Entry structures in Bangladesh may vary depending on the sector, ownership model and whether the activity involves regulated financial services, technology or general commerce.",
    regulatoryOverview:
      "Financial services in Bangladesh are regulated by Bangladesh Bank (central bank), the Bangladesh Securities and Exchange Commission (BSEC) and the Insurance Development and Regulatory Authority (IDRA), among others. Specific licensing requirements depend on the proposed activity.",
    crossBorderOverview:
      "Businesses may need to assess capital flows, remittance regulations, taxation, trade finance requirements and foreign ownership limitations applicable to their sector.",
    audiences: [
      "Indian businesses with Bangladesh trade or commercial relationships",
      "Fintech and payments companies assessing South Asian expansion",
      "Bangladesh businesses seeking India-linked regulatory support",
      "Cross-border trade finance and remittance service providers",
    ],
    sourceNotes: [
      "Regulatory information is general and subject to verification based on proposed activity.",
    ],
  },
  {
    name: "Sri Lanka",
    iso2: "LK",
    callingCode: "+94",
    region: "India & South Asia",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Sri Lanka presents cross-border opportunities for Indian businesses across financial services, trade and technology sectors. The Colombo Port City and related regulatory frameworks have introduced new financial services structures.",
    businessEnvironment:
      "Business entry structures in Sri Lanka depend on the sector, ownership model and whether the activity involves regulated or non-regulated financial services.",
    regulatoryOverview:
      "Financial services in Sri Lanka are overseen by the Central Bank of Sri Lanka (CBSL) and the Securities and Exchange Commission (SEC Sri Lanka). The Colombo Port City Economic Commission provides a separate regulatory framework for Port City-based financial services.",
    crossBorderOverview:
      "Cross-border considerations include exchange control regulations, taxation, repatriation of funds and foreign ownership rules applicable to the proposed sector.",
    sourceNotes: [
      "Regulatory information is general and subject to verification based on proposed activity.",
    ],
  },
  {
    name: "Nepal",
    iso2: "NP",
    callingCode: "+977",
    region: "India & South Asia",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Nepal is closely connected to India through trade, remittance flows and financial services links. Assessment of entry structures for Indian businesses operating in or through Nepal involves several regulatory layers.",
    businessEnvironment:
      "Business structures in Nepal differ for foreign-owned versus joint-venture entities, with sector-specific foreign ownership restrictions applying to certain financial services.",
    sourceNotes: [
      "Regulatory information is general and subject to verification based on proposed activity.",
    ],
  },
  {
    name: "Bhutan",    iso2: "BT", callingCode: "+975", region: "India & South Asia", tier: "planned", pageDepth: "compact" },
  { name: "Maldives",  iso2: "MV", callingCode: "+960", region: "India & South Asia", tier: "planned", pageDepth: "compact" },
  { name: "Pakistan",  iso2: "PK", callingCode: "+92",  region: "India & South Asia", tier: "planned", pageDepth: "compact" },
  { name: "Afghanistan", iso2: "AF", callingCode: "+93", region: "India & South Asia", tier: "planned", pageDepth: "compact" },

  // ── GCC & Middle East ────────────────────────────────────────────────────
  {
    name: "United Arab Emirates",
    iso2: "AE",
    callingCode: "+971",
    region: "GCC & Middle East",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "The UAE is one of the most significant international market-entry destinations for Indian businesses, with a large Indian diaspora, multiple free zones and an active regulatory environment for financial services, fintech and payments.",
    businessEnvironment:
      "Business structures in the UAE may include mainland entities (licenced by the relevant emirate's Department of Economic Development), free zone entities (subject to each free zone authority's rules) or offshore structures. Sector-specific licensing applies to financial services activities.",
    regulatoryOverview:
      "Financial services in the UAE are regulated by the UAE Central Bank (CBUAE), the Securities and Commodities Authority (SCA), the Dubai Financial Services Authority (DFSA) within the DIFC, and the Financial Services Regulatory Authority (FSRA) within ADGM. Each regime has distinct licensing requirements.",
    crossBorderOverview:
      "Cross-border considerations include UAE corporate tax (effective June 2023), VAT, foreign ownership rules (relaxed in many sectors on the mainland), and free zone restrictions on mainland operations.",
    audiences: [
      "Indian businesses planning UAE market entry or free zone structures",
      "Fintech and payments companies evaluating DIFC or ADGM licensing",
      "UAE-based businesses seeking India entry or RBI licensing",
      "Fund managers and investment advisers assessing UAE-India corridors",
      "Insurance intermediaries evaluating UAE regulatory requirements",
    ],
    sourceNotes: [
      "UAE regulatory frameworks change frequently. All information requires verification with qualified UAE-licensed professionals.",
    ],
  },
  {
    name: "Saudi Arabia",
    iso2: "SA",
    callingCode: "+966",
    region: "GCC & Middle East",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Saudi Arabia represents a major market for Indian businesses across financial services, technology, payments and trade. Vision 2030 has driven significant regulatory reform and new financial services licensing frameworks.",
    businessEnvironment:
      "Foreign businesses typically operate in Saudi Arabia through a locally incorporated entity or a representative office, depending on the activity. Sector-specific licensing applies to financial services.",
    regulatoryOverview:
      "Financial services in Saudi Arabia are primarily regulated by the Saudi Central Bank (SAMA) and the Capital Market Authority (CMA). The fintech sector is addressed through regulatory sandboxes and specific fintech licensing frameworks.",
    crossBorderOverview:
      "Considerations include Saudi foreign investment rules, Saudisation (Nitaqat) employment requirements, VAT, and sector-specific restrictions on foreign ownership in regulated activities.",
    sourceNotes: [
      "Saudi regulatory frameworks are evolving under Vision 2030. All information requires verification with qualified Saudi-licensed professionals.",
    ],
  },
  {
    name: "Singapore",
    iso2: "SG",
    callingCode: "+65",
    region: "Asia Pacific",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Singapore is a leading international financial centre and a common destination for Indian fintech, fund management and financial services businesses seeking a regulated international hub.",
    businessEnvironment:
      "Singapore offers a transparent business environment with well-defined company structures. Regulated financial services activities require licensing from the Monetary Authority of Singapore (MAS).",
    regulatoryOverview:
      "The Monetary Authority of Singapore (MAS) regulates banking, capital markets, payments, insurance and financial advisory services. Key licensing frameworks include the Payment Services Act, the Securities and Futures Act and the Financial Advisers Act.",
    crossBorderOverview:
      "Cross-border considerations include withholding tax treaties, capital gains treatment, substance requirements, and MAS fit-and-proper requirements for controllers and directors.",
    audiences: [
      "Indian fintech businesses evaluating Singapore licensing",
      "Fund managers assessing Singapore as a management hub",
      "Payment service providers seeking MAS authorisation",
      "Singapore-based businesses entering India through RBI or SEBI frameworks",
    ],
    sourceNotes: [
      "Singapore regulatory information is general. All licensing requirements must be verified with MAS-registered professionals.",
    ],
  },
  {
    name: "United Kingdom",
    iso2: "GB",
    callingCode: "+44",
    region: "Europe & UK",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "The United Kingdom is a significant market for Indian financial services, fintech and professional services businesses. The FCA-regulated environment offers clear licensing pathways for a range of financial activities.",
    businessEnvironment:
      "Businesses in the UK may operate through a UK-incorporated company, a branch of a foreign entity, or via FCA-authorised structures depending on the activity.",
    regulatoryOverview:
      "The Financial Conduct Authority (FCA) regulates most consumer-facing financial services, including payments, investment services, insurance distribution and consumer credit. The Prudential Regulation Authority (PRA) oversees banks and insurers.",
    crossBorderOverview:
      "Post-Brexit, UK financial services no longer benefit from EU passporting. Cross-border considerations include FCA authorisation, substance requirements, tax treaties between India and the UK, and employment law.",
    sourceNotes: [
      "UK regulatory information is general and subject to change. All requirements must be verified with FCA-authorised professionals.",
    ],
  },
  {
    name: "United States",
    iso2: "US",
    callingCode: "+1",
    region: "North America",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "The United States is one of the largest financial services markets globally. Regulatory requirements vary significantly by state and by the type of financial activity conducted.",
    businessEnvironment:
      "Business structures in the US include corporations (C-Corp, S-Corp), LLCs, limited partnerships and branches. Regulated financial services require federal and state-level licensing depending on the activity.",
    regulatoryOverview:
      "Federal financial regulators include the SEC, CFTC, OCC, FDIC, Federal Reserve and FinCEN. State-level money transmission licensing (MTL) applies to payments and remittance businesses. Insurance is primarily state-regulated.",
    crossBorderOverview:
      "Cross-border considerations include US tax obligations (including FATCA), state money transmission licensing, anti-money laundering obligations under the Bank Secrecy Act, and OFAC sanctions screening.",
    sourceNotes: [
      "US regulatory requirements are highly complex and vary by state and activity. All information must be verified with US-licensed legal and compliance professionals.",
    ],
  },
  {
    name: "Canada",
    iso2: "CA",
    callingCode: "+1",
    region: "North America",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Canada has a growing fintech sector and is a market of increasing interest for Indian financial services businesses. Provincial and federal regulatory frameworks apply depending on the activity.",
    businessEnvironment:
      "Business entities in Canada may be federally or provincially incorporated. Financial services regulation involves both federal bodies (OSFI, FINTRAC, Bank of Canada) and provincial securities regulators.",
    sourceNotes: [
      "Canadian regulatory requirements vary by province and activity. All information must be verified with Canadian-licensed professionals.",
    ],
  },
  {
    name: "Australia",
    iso2: "AU",
    callingCode: "+61",
    region: "Asia Pacific",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Australia is a regulated financial services market of interest to Indian fintech, payments and investment services businesses. ASIC regulates most consumer-facing financial services.",
    businessEnvironment:
      "Foreign businesses in Australia may operate through a local company, a foreign company branch, or a managed investment scheme, depending on the activity.",
    regulatoryOverview:
      "The Australian Securities and Investments Commission (ASIC) oversees financial services and markets. The Australian Prudential Regulation Authority (APRA) regulates banks, insurers and superannuation. The Reserve Bank of Australia (RBA) oversees payments systems.",
    sourceNotes: [
      "Australian regulatory information is general. All licensing and compliance requirements must be verified with ASIC-licensed professionals.",
    ],
  },
  {
    name: "Hong Kong",
    iso2: "HK",
    callingCode: "+852",
    region: "Asia Pacific",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Hong Kong is a major international financial centre with well-established regulatory frameworks for banking, securities, asset management, insurance and fintech. It is a common gateway for businesses looking to access Asian markets.",
    businessEnvironment:
      "Hong Kong offers a common law legal system, low corporate tax, no capital gains tax, and a transparent regulatory environment. Regulated financial activities require licensing from the SFC, HKMA or IA.",
    regulatoryOverview:
      "The Securities and Futures Commission (SFC) regulates capital markets and investment products. The Hong Kong Monetary Authority (HKMA) oversees banking and stored value facilities. The Insurance Authority (IA) regulates insurance.",
    sourceNotes: [
      "Hong Kong regulatory information is general and subject to change. All requirements must be verified with SFC or HKMA-registered professionals.",
    ],
  },
  {
    name: "Qatar",
    iso2: "QA",
    callingCode: "+974",
    region: "GCC & Middle East",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Qatar, including the Qatar Financial Centre (QFC), is an established financial hub in the Gulf region. Indian businesses in financial services, technology and trade have increasing presence in Qatar.",
    regulatoryOverview:
      "Financial services outside the QFC are regulated by the Qatar Central Bank (QCB) and the Qatar Financial Markets Authority (QFMA). Within the QFC, the Qatar Financial Centre Regulatory Authority (QFCRA) provides a distinct regulatory regime.",
    sourceNotes: [
      "Qatar regulatory information is general. All requirements must be verified with QFCRA or QCB-licensed professionals.",
    ],
  },
  {
    name: "Bahrain",
    iso2: "BH",
    callingCode: "+973",
    region: "GCC & Middle East",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Bahrain has a long-established financial services sector and is home to the Central Bank of Bahrain (CBB), which operates a comprehensive regulatory framework including fintech sandbox provisions.",
    regulatoryOverview:
      "The Central Bank of Bahrain (CBB) regulates banking, capital markets, insurance and fintech. Bahrain has been an early mover on open banking and Islamic finance regulation in the GCC.",
    sourceNotes: [
      "Bahrain regulatory information is general. All requirements must be verified with CBB-licensed professionals.",
    ],
  },
  {
    name: "Oman",
    iso2: "OM",
    callingCode: "+968",
    region: "GCC & Middle East",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Oman has a significant Indian business community and growing fintech and trade-finance activity. The Central Bank of Oman and the Capital Market Authority regulate key financial services sectors.",
    sourceNotes: [
      "Oman regulatory information is general. All requirements must be verified with locally licensed professionals.",
    ],
  },
  {
    name: "Mauritius",
    iso2: "MU",
    callingCode: "+230",
    region: "Africa & Indian Ocean",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Mauritius is a significant financial centre for Indian businesses, particularly for inbound India investment structures. The India-Mauritius tax treaty and SEBI foreign portfolio investor frameworks make Mauritius a commonly assessed jurisdiction for fund and investment structures.",
    regulatoryOverview:
      "The Financial Services Commission (FSC) Mauritius regulates non-banking financial services, including investment management, global business, insurance and securities. The Bank of Mauritius supervises banking.",
    crossBorderOverview:
      "Mauritius-India cross-border considerations include the revised India-Mauritius DTAA (effective 2017), SEBI FPI registration, substance requirements under BEPS, and anti-abuse provisions in Indian tax law.",
    audiences: [
      "Fund managers assessing Mauritius as a management or holding jurisdiction",
      "Indian businesses evaluating outbound investment structures",
      "SEBI-registered foreign portfolio investors using Mauritius vehicles",
      "International businesses seeking India-entry through Mauritius",
    ],
    sourceNotes: [
      "Mauritius regulatory and tax information is general and subject to change. All structures must be verified with Mauritius-licensed and Indian tax professionals.",
    ],
  },
  {
    name: "Kenya",
    iso2: "KE",
    callingCode: "+254",
    region: "Africa & Indian Ocean",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Kenya is East Africa's largest economy and a major fintech hub, home to M-Pesa and a growing ecosystem of digital financial services. Indian businesses in technology, payments and trade are increasingly active in Kenya.",
    regulatoryOverview:
      "The Central Bank of Kenya (CBK) regulates banking and payment services. The Capital Markets Authority (CMA Kenya) oversees securities. The Insurance Regulatory Authority (IRA) regulates insurance. Fintech licensing has developed through CBK sandbox frameworks.",
    sourceNotes: [
      "Kenya regulatory information is general. All requirements must be verified with locally licensed professionals.",
    ],
  },
  {
    name: "South Africa",
    iso2: "ZA",
    callingCode: "+27",
    region: "Africa & Indian Ocean",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "South Africa is the most developed financial market on the African continent, with a sophisticated regulatory regime overseen by the South African Reserve Bank (SARB), the Financial Sector Conduct Authority (FSCA) and the Prudential Authority (PA).",
    regulatoryOverview:
      "Financial services in South Africa are regulated under the twin-peaks model. The FSCA handles market conduct regulation; the PA handles prudential regulation. The Financial Intelligence Centre (FIC) oversees AML and KYC compliance.",
    sourceNotes: [
      "South Africa regulatory information is general. All requirements must be verified with FSCA-registered professionals.",
    ],
  },
  {
    name: "Malaysia",
    iso2: "MY",
    callingCode: "+60",
    region: "Asia Pacific",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Malaysia is a growing fintech and Islamic finance hub in Southeast Asia. Bank Negara Malaysia (BNM) operates progressive digital banking and payment licensing frameworks.",
    regulatoryOverview:
      "Bank Negara Malaysia (BNM) regulates banking, insurance and payments. The Securities Commission Malaysia (SC) oversees capital markets and digital assets. Malaysia's Islamic finance regulatory framework is globally recognised.",
    sourceNotes: [
      "Malaysia regulatory information is general. All requirements must be verified with BNM or SC-registered professionals.",
    ],
  },
  {
    name: "Indonesia",
    iso2: "ID",
    callingCode: "+62",
    region: "Asia Pacific",
    tier: "developing",
    pageDepth: "standard",
    overview:
      "Indonesia is Southeast Asia's largest economy and has one of the most active fintech markets globally. The OJK (Otoritas Jasa Keuangan) regulates financial services across banking, securities, insurance and fintech.",
    regulatoryOverview:
      "The Financial Services Authority (OJK) regulates most financial services in Indonesia. Bank Indonesia (BI) regulates payment systems and monetary policy. Foreign ownership limits apply to many regulated financial services.",
    sourceNotes: [
      "Indonesia regulatory information is general. All requirements must be verified with OJK-registered professionals.",
    ],
  },

  // ── Europe & UK ──────────────────────────────────────────────────────────
  {
    name: "Ireland",         iso2: "IE", callingCode: "+353", region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Germany",         iso2: "DE", callingCode: "+49",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "France",          iso2: "FR", callingCode: "+33",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Netherlands",     iso2: "NL", callingCode: "+31",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Luxembourg",      iso2: "LU", callingCode: "+352", region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Switzerland",     iso2: "CH", callingCode: "+41",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Italy",           iso2: "IT", callingCode: "+39",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Spain",           iso2: "ES", callingCode: "+34",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Portugal",        iso2: "PT", callingCode: "+351", region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Sweden",          iso2: "SE", callingCode: "+46",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Norway",          iso2: "NO", callingCode: "+47",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Denmark",         iso2: "DK", callingCode: "+45",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Finland",         iso2: "FI", callingCode: "+358", region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Austria",         iso2: "AT", callingCode: "+43",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Belgium",         iso2: "BE", callingCode: "+32",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Poland",          iso2: "PL", callingCode: "+48",  region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Czech Republic",  iso2: "CZ", callingCode: "+420", region: "Europe & UK",           tier: "developing", pageDepth: "compact" },
  { name: "Estonia",         iso2: "EE", callingCode: "+372", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Lithuania",       iso2: "LT", callingCode: "+370", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Latvia",          iso2: "LV", callingCode: "+371", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Greece",          iso2: "GR", callingCode: "+30",  region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Cyprus",          iso2: "CY", callingCode: "+357", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Malta",           iso2: "MT", callingCode: "+356", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Romania",         iso2: "RO", callingCode: "+40",  region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Bulgaria",        iso2: "BG", callingCode: "+359", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Croatia",         iso2: "HR", callingCode: "+385", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Slovenia",        iso2: "SI", callingCode: "+386", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Slovakia",        iso2: "SK", callingCode: "+421", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Hungary",         iso2: "HU", callingCode: "+36",  region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Iceland",         iso2: "IS", callingCode: "+354", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Liechtenstein",   iso2: "LI", callingCode: "+423", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Monaco",          iso2: "MC", callingCode: "+377", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "Andorra",         iso2: "AD", callingCode: "+376", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },
  { name: "San Marino",      iso2: "SM", callingCode: "+378", region: "Europe & UK",           tier: "planned",    pageDepth: "compact" },

  // ── GCC & Middle East (remaining) ────────────────────────────────────────
  { name: "Kuwait",   iso2: "KW", callingCode: "+965", region: "GCC & Middle East", tier: "developing", pageDepth: "compact" },
  { name: "Israel",   iso2: "IL", callingCode: "+972", region: "GCC & Middle East", tier: "planned",    pageDepth: "compact" },
  { name: "Jordan",   iso2: "JO", callingCode: "+962", region: "GCC & Middle East", tier: "planned",    pageDepth: "compact" },
  { name: "Turkey",   iso2: "TR", callingCode: "+90",  region: "GCC & Middle East", tier: "developing", pageDepth: "compact" },
  { name: "Lebanon",  iso2: "LB", callingCode: "+961", region: "GCC & Middle East", tier: "planned",    pageDepth: "compact" },
  { name: "Iraq",     iso2: "IQ", callingCode: "+964", region: "GCC & Middle East", tier: "planned",    pageDepth: "compact" },
  { name: "Egypt",    iso2: "EG", callingCode: "+20",  region: "GCC & Middle East", tier: "developing", pageDepth: "compact" },

  // ── Asia Pacific (remaining) ──────────────────────────────────────────────
  { name: "New Zealand",  iso2: "NZ", callingCode: "+64",  region: "Asia Pacific", tier: "developing", pageDepth: "compact" },
  { name: "Thailand",     iso2: "TH", callingCode: "+66",  region: "Asia Pacific", tier: "developing", pageDepth: "compact" },
  { name: "Vietnam",      iso2: "VN", callingCode: "+84",  region: "Asia Pacific", tier: "developing", pageDepth: "compact" },
  { name: "Philippines",  iso2: "PH", callingCode: "+63",  region: "Asia Pacific", tier: "developing", pageDepth: "compact" },
  { name: "Japan",        iso2: "JP", callingCode: "+81",  region: "Asia Pacific", tier: "developing", pageDepth: "compact" },
  { name: "South Korea",  iso2: "KR", callingCode: "+82",  region: "Asia Pacific", tier: "developing", pageDepth: "compact" },
  { name: "China",        iso2: "CN", callingCode: "+86",  region: "Asia Pacific", tier: "planned",    pageDepth: "compact" },
  { name: "Taiwan",       iso2: "TW", callingCode: "+886", region: "Asia Pacific", tier: "developing", pageDepth: "compact" },
  { name: "Cambodia",     iso2: "KH", callingCode: "+855", region: "Asia Pacific", tier: "planned",    pageDepth: "compact" },
  { name: "Laos",         iso2: "LA", callingCode: "+856", region: "Asia Pacific", tier: "planned",    pageDepth: "compact" },
  { name: "Myanmar",      iso2: "MM", callingCode: "+95",  region: "Asia Pacific", tier: "planned",    pageDepth: "compact" },
  { name: "Brunei",       iso2: "BN", callingCode: "+673", region: "Asia Pacific", tier: "planned",    pageDepth: "compact" },
  { name: "Mongolia",     iso2: "MN", callingCode: "+976", region: "Asia Pacific", tier: "planned",    pageDepth: "compact" },

  // ── North America (remaining) ─────────────────────────────────────────────
  { name: "Mexico",              iso2: "MX", callingCode: "+52",    region: "North America", tier: "developing", pageDepth: "compact" },
  { name: "Bahamas",             iso2: "BS", callingCode: "+1-242", region: "North America", tier: "planned",    pageDepth: "compact" },
  { name: "Barbados",            iso2: "BB", callingCode: "+1-246", region: "North America", tier: "planned",    pageDepth: "compact" },
  { name: "Jamaica",             iso2: "JM", callingCode: "+1-876", region: "North America", tier: "planned",    pageDepth: "compact" },
  { name: "Trinidad and Tobago", iso2: "TT", callingCode: "+1-868", region: "North America", tier: "planned",    pageDepth: "compact" },
  { name: "Dominican Republic",  iso2: "DO", callingCode: "+1-809", region: "North America", tier: "planned",    pageDepth: "compact" },

  // ── Africa & Indian Ocean (remaining) ─────────────────────────────────────
  { name: "Nigeria",      iso2: "NG", callingCode: "+234", region: "Africa & Indian Ocean", tier: "developing", pageDepth: "compact" },
  { name: "Ghana",        iso2: "GH", callingCode: "+233", region: "Africa & Indian Ocean", tier: "developing", pageDepth: "compact" },
  { name: "Rwanda",       iso2: "RW", callingCode: "+250", region: "Africa & Indian Ocean", tier: "developing", pageDepth: "compact" },
  { name: "Morocco",      iso2: "MA", callingCode: "+212", region: "Africa & Indian Ocean", tier: "developing", pageDepth: "compact" },
  { name: "Tanzania",     iso2: "TZ", callingCode: "+255", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Uganda",       iso2: "UG", callingCode: "+256", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Seychelles",   iso2: "SC", callingCode: "+248", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Ethiopia",     iso2: "ET", callingCode: "+251", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Zambia",       iso2: "ZM", callingCode: "+260", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Botswana",     iso2: "BW", callingCode: "+267", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Namibia",      iso2: "NA", callingCode: "+264", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Senegal",      iso2: "SN", callingCode: "+221", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Ivory Coast",  iso2: "CI", callingCode: "+225", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Tunisia",      iso2: "TN", callingCode: "+216", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Algeria",      iso2: "DZ", callingCode: "+213", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },
  { name: "Madagascar",   iso2: "MG", callingCode: "+261", region: "Africa & Indian Ocean", tier: "planned",    pageDepth: "compact" },

  // ── LATAM ────────────────────────────────────────────────────────────────
  { name: "Brazil",          iso2: "BR", callingCode: "+55",  region: "LATAM", tier: "developing", pageDepth: "compact" },
  { name: "Argentina",       iso2: "AR", callingCode: "+54",  region: "LATAM", tier: "developing", pageDepth: "compact" },
  { name: "Chile",           iso2: "CL", callingCode: "+56",  region: "LATAM", tier: "developing", pageDepth: "compact" },
  { name: "Colombia",        iso2: "CO", callingCode: "+57",  region: "LATAM", tier: "developing", pageDepth: "compact" },
  { name: "Peru",            iso2: "PE", callingCode: "+51",  region: "LATAM", tier: "developing", pageDepth: "compact" },
  { name: "Uruguay",         iso2: "UY", callingCode: "+598", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Panama",          iso2: "PA", callingCode: "+507", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Costa Rica",      iso2: "CR", callingCode: "+506", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Ecuador",         iso2: "EC", callingCode: "+593", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Paraguay",        iso2: "PY", callingCode: "+595", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Bolivia",         iso2: "BO", callingCode: "+591", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Guatemala",       iso2: "GT", callingCode: "+502", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "El Salvador",     iso2: "SV", callingCode: "+503", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Honduras",        iso2: "HN", callingCode: "+504", region: "LATAM", tier: "planned",    pageDepth: "compact" },
  { name: "Nicaragua",       iso2: "NI", callingCode: "+505", region: "LATAM", tier: "planned",    pageDepth: "compact" },
];

// ─── Status label mapping ─────────────────────────────────────────────────────

function marketStatusLabel(tier: RawCountry["tier"]): string {
  switch (tier) {
    case "active":     return "Active Market Support";
    case "developing": return "Market Coverage Under Development";
    case "planned":    return "Market Entry Desk Planned";
  }
}

function marketStatusDescription(name: string, tier: RawCountry["tier"]): string {
  switch (tier) {
    case "active":
      return `India is Estabizz's primary operating market across RBI, SEBI, IRDAI, IFSCA, FIU-IND and MCA regulated sectors.`;
    case "developing":
      return `Estabizz is currently developing its advisory and professional-coordination capabilities for ${name}. Enquiries are managed through our India-based Global Market Desk and, where required, coordinated with independent local professionals.`;
    case "planned":
      return `Estabizz is evaluating future support capabilities for ${name}. This page is intended for market-interest registration and does not represent an existing local operation.`;
  }
}

function seoTitle(name: string, tier: RawCountry["tier"]): string {
  if (tier === "planned") {
    return `${name} Market Entry Interest | Estabizz Global Market Desk`;
  }
  return `Estabizz in ${name} | Market Entry & Regulatory Advisory`;
}

function seoDescription(name: string, tier: RawCountry["tier"]): string {
  if (tier === "planned") {
    return `Register your interest in ${name} market entry with Estabizz's Global Market Desk. Advisory and coordination capabilities are being evaluated for this market.`;
  }
  return `Explore Estabizz's market-entry advisory and regulatory pathway coordination capabilities for ${name}. Enquiries are managed through our India-based Global Market Desk.`;
}

// ─── Build full country configs ───────────────────────────────────────────────

function buildCountries(): GlobalMarketConfig[] {
  // First pass: collect slugs per region for related-markets logic
  const seenSlugs1 = new Set<string>();
  const regionSlugMap = new Map<string, string[]>();

  for (const c of RAW_COUNTRIES) {
    const slug = countryToSlug(c.name);
    if (seenSlugs1.has(slug)) continue;
    seenSlugs1.add(slug);
    const arr = regionSlugMap.get(c.region) ?? [];
    arr.push(slug);
    regionSlugMap.set(c.region, arr);
  }

  const seen = new Set<string>();
  const result: GlobalMarketConfig[] = [];

  for (const c of RAW_COUNTRIES) {
    const slug = countryToSlug(c.name);
    if (seen.has(slug)) continue;
    seen.add(slug);

    const tier      = c.tier;
    const pageDepth = c.pageDepth ?? (tier === "developing" ? "standard" : "compact");

    // Related slugs: same region, excluding self and India, max 5
    const regionSlugs = (regionSlugMap.get(c.region) ?? [])
      .filter(s => s !== slug && s !== "india")
      .slice(0, 5);

    // indexable / sitemap: only active markets
    const indexable       = tier === "active";
    const includeInSitemap = tier === "active";

    result.push({
      name:     c.name,
      slug,
      iso2:     c.iso2,
      callingCode: c.callingCode,
      region:   c.region,
      subregion: c.subregion,

      tier,
      pageDepth,

      indexable,
      includeInSitemap,

      marketStatusLabel:       marketStatusLabel(tier),
      marketStatusDescription: marketStatusDescription(c.name, tier),

      overview:              c.overview,
      businessEnvironment:   c.businessEnvironment,
      regulatoryOverview:    c.regulatoryOverview,
      crossBorderOverview:   c.crossBorderOverview,
      localCoordinationOverview:
        `Local legal, tax, accounting or regulatory professionals may be required for ${c.name} depending on the proposed activity. Estabizz can help identify and coordinate with appropriate local advisers.`,

      supportAreas:   DEFAULT_SUPPORT_AREAS,
      audiences:      c.audiences ?? DEFAULT_AUDIENCES,
      deliverables:   DEFAULT_DELIVERABLES,
      processSteps:   DEFAULT_PROCESS_STEPS,
      corridor:       DEFAULT_CORRIDOR,
      faqs:           defaultFaqs(c.name),

      relatedSlugs: regionSlugs,

      seoTitle:       seoTitle(c.name, tier),
      seoDescription: seoDescription(c.name, tier),

      sourceNotes: c.sourceNotes,
    });
  }

  return result;
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const GLOBAL_COUNTRIES = buildCountries();
export const COUNTRY_BY_SLUG  = new Map(GLOBAL_COUNTRIES.map(c => [c.slug, c]));

export function getAllCountrySlugs(): string[] {
  return GLOBAL_COUNTRIES.map(c => c.slug);
}

export function getSitemapCountries(): GlobalMarketConfig[] {
  return GLOBAL_COUNTRIES.filter(c => c.includeInSitemap);
}

export function getIndexableCountries(): GlobalMarketConfig[] {
  return GLOBAL_COUNTRIES.filter(c => c.indexable);
}
