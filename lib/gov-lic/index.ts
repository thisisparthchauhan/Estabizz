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

export const GOV_LIC_SERVICES: ServicePage[] = [
  {
    slug: "fssai-licence",
    title: "FSSAI Licence",
    tagline: "Food Safety and Standards Authority of India registration and licensing",
    category: "Food Safety",
    seoTitle: "FSSAI Licence Registration Services | Basic, State & Central — Estabizz",
    metaDescription:
      "End-to-end FSSAI registration and licensing for food manufacturers, traders, restaurants and importers — Basic, State and Central licence as applicable. Fast turnaround.",
    description:
      "The Food Safety and Standards Authority of India (FSSAI) mandates that every food business operator (FBO) — manufacturer, trader, restaurant, caterer, importer, or e-commerce food seller — obtain the appropriate FSSAI registration or licence before commencing operations. Estabizz handles FSSAI applications from eligibility determination through to licence receipt, covering Basic Registration, State Licence and Central Licence.",
    features: [
      "Eligibility assessment: Basic Registration vs State Licence vs Central Licence",
      "Form A / Form B application preparation and filing on FoSCoS portal",
      "Affidavit and self-declaration drafting",
      "FSSAI inspector liaison and premise inspection support",
      "Food Safety Management System (FSMS) plan assistance",
      "Licence renewal and modification services",
      "Import-specific FSSAI authorisation support",
    ],
    process: [
      { step: "Eligibility Check", detail: "We determine whether you need Basic Registration (turnover < ₹12 lakh), State Licence (₹12 lakh–₹20 crore), or Central Licence (>₹20 crore or multi-state/import)." },
      { step: "Document Preparation", detail: "Compile identity proof, address proof, premises layout, list of food products, and draft the Food Safety Management System plan." },
      { step: "Portal Filing", detail: "Submit application on FoSCoS (Food Safety Compliance System) and pay the prescribed fee." },
      { step: "Inspection & Issuance", detail: "Coordinate with the FSSAI inspector for premise inspection; follow up for licence/registration certificate issuance." },
    ],
    documents: [
      "Photo ID and address proof of proprietor/directors",
      "Proof of premises ownership or rent agreement",
      "List of food products to be manufactured/handled",
      "Blueprint/layout of food premises",
      "List of equipment/machinery (for manufacturers)",
      "Partnership deed / MoA / CoI (as applicable)",
      "NOC from local municipal authority",
    ],
    faqs: [
      { q: "Is FSSAI registration mandatory for home-based food businesses?", a: "Yes. Even home-based food businesses and cloud kitchens must obtain at least Basic FSSAI Registration." },
      { q: "How long is an FSSAI licence valid?", a: "FSSAI licences are issued for 1 to 5 years at the applicant's choice (longer validity reduces renewal burden). Renewal must be applied for 30 days before expiry." },
      { q: "Can I sell food online without FSSAI?", a: "No. E-commerce food sellers (including food sold through Swiggy, Zomato, Amazon) must have a valid FSSAI licence or registration." },
    ],
  },
  {
    slug: "apeda-registration",
    title: "APEDA Registration",
    tagline: "Agricultural & Processed Food Products Export Development Authority registration for exporters",
    category: "Exports",
    seoTitle: "APEDA Registration for Food Exporters | Estabizz Fintech",
    metaDescription:
      "APEDA registration for exporters of scheduled agricultural and processed food products — end-to-end application, documentation and APEDA portal filing support.",
    description:
      "Exporters of scheduled agricultural and processed food products — including fresh fruits and vegetables, meat and meat products, dairy products, floriculture and poultry — must register with the Agricultural & Processed Food Products Export Development Authority (APEDA) under the APEDA Act, 1985. Estabizz provides complete APEDA registration assistance including documentation, portal filing and post-registration export guidance.",
    features: [
      "APEDA portal registration and RCMC (Registration-cum-Membership Certificate) filing",
      "Exporter profile set-up: product categories and HS codes",
      "Liaison with APEDA regional offices",
      "Export certification advisory (Phytosanitary, Organic, Halal)",
      "IEC (Import Export Code) support if not already held",
      "APEDA financial assistance scheme guidance",
      "Certificate renewal and category addition",
    ],
    process: [
      { step: "IEC Verification", detail: "Confirm your entity holds a valid Import Export Code (IEC) from DGFT — prerequisite for APEDA registration." },
      { step: "Document Compilation", detail: "Prepare bank certificate, cancelled cheque, product list, MoA/partnership deed and authorised signatory details." },
      { step: "Portal Filing", detail: "Submit the APEDA registration application online with prescribed fee and upload supporting documents." },
      { step: "RCMC Issuance", detail: "APEDA verifies the application and issues the Registration-cum-Membership Certificate (RCMC), typically within 7–10 working days." },
    ],
    documents: [
      "Import Export Code (IEC) certificate",
      "Bank certificate / cancelled cheque",
      "Certificate of Incorporation / Partnership deed",
      "PAN card of entity",
      "List of scheduled products to be exported",
      "Authorised signatory identity and address proof",
    ],
    faqs: [
      { q: "Which products require APEDA registration?", a: "All products listed in the APEDA Schedule — including fresh/processed fruits and vegetables, meat, poultry, dairy, cereals, confectionery, floriculture, and related items." },
      { q: "How long is the RCMC valid?", a: "The APEDA RCMC is typically valid for 5 years and must be renewed before expiry." },
      { q: "Is APEDA registration required for domestic sales too?", a: "No. APEDA registration applies only to export of scheduled commodities. Domestic trading does not require it." },
    ],
  },
  {
    slug: "ayush-licence",
    title: "AYUSH Licence",
    tagline: "Licensing for Ayurvedic, Unani, Siddha and Homeopathic products under the Drugs & Cosmetics Act",
    category: "AYUSH",
    seoTitle: "AYUSH Licence for Manufacturers & Marketers | Estabizz Fintech",
    metaDescription:
      "AYUSH drug licence and regulatory compliance for manufacturers and marketers of Ayurvedic, Unani, Siddha and Homeopathic products. State licensing board liaison and inspection support.",
    description:
      "Manufacturers and marketers of Ayurvedic, Siddha, Unani and Homeopathic (ASUH) drugs require a valid licence from the State Licensing Authority (SLA) under the Drugs & Cosmetics Act, 1940. The Ministry of AYUSH also mandates GMP (Good Manufacturing Practice) compliance under Schedule T. Estabizz provides end-to-end assistance for AYUSH drug licences — from site readiness to State Licensing Board applications and GMP certification.",
    features: [
      "Manufacturing licence (Form 25D) and loan licence applications",
      "Schedule T GMP compliance assessment and gap remediation",
      "State Licensing Authority liaison and inspection readiness",
      "Product approval and labelling compliance advisory",
      "AYUSH Premium Mark and AYUSH certification scheme guidance",
      "New drug approval and import permit support",
      "Licence amendment, renewal and additional product endorsement",
    ],
    process: [
      { step: "Site Assessment", detail: "Evaluate manufacturing premises, equipment and quality systems against Schedule T GMP requirements." },
      { step: "Application Preparation", detail: "Prepare Form 24D/25D, technical dossier, GMP compliance statement and product list." },
      { step: "State Board Filing", detail: "Submit application to the State Licensing Authority; coordinate pre-inspection documentation." },
      { step: "Inspection & Licence", detail: "Support during the SLA inspection; follow up for licence issuance and endorsement of approved products." },
    ],
    documents: [
      "Proof of premises (ownership/rent agreement)",
      "Manufacturing site layout and area calculations",
      "List of machinery and equipment",
      "Qualified Person / Technical Supervisor qualification proof",
      "GMP compliance statement",
      "Product list with formulae references (classical/proprietary)",
      "Certificate of Incorporation / partnership deed",
    ],
    faqs: [
      { q: "Is a separate AYUSH licence required for each product?", a: "No. The licence covers categories of products (e.g., tablets, liquids, external preparations). Individual products are endorsed on the licence." },
      { q: "What is Schedule T?", a: "Schedule T under the Drugs & Cosmetics Act prescribes GMP requirements for AYUSH manufacturing premises — covering plant layout, equipment, quality control and personnel standards." },
      { q: "Can an AYUSH manufacturer also sell under their own brand?", a: "Yes, but a separate loan licence or marketing arrangement may be needed if manufacturing and marketing are done by different entities." },
    ],
  },
  {
    slug: "factory-licence",
    title: "Factory Licence",
    tagline: "Factory Act licensing, plan approvals and compliance management across Indian states",
    category: "Labour",
    seoTitle: "Factory Licence Registration | Factories Act Compliance — Estabizz Fintech",
    metaDescription:
      "Factory licence applications, plan approvals and renewals under the Factories Act, 1948. CLRA and BOCW compliance included. Estabizz handles all Indian states.",
    description:
      "Any premises employing 10 or more workers with power, or 20 or more without power, in a manufacturing process requires a factory licence under the Factories Act, 1948. Estabizz manages the end-to-end factory registration process — including site plan approval, Inspector of Factories liaison, licence application and annual renewal — across all Indian states and union territories.",
    features: [
      "Preliminary factory site plan approval from Chief Inspector of Factories",
      "Factory registration application (Form 2) filing",
      "Annual licence renewal and mid-year worker count amendments",
      "Factories Act compliance checklist and audit support",
      "Contract Labour (Regulation & Abolition) Act (CLRA) registration",
      "Building & Other Construction Workers (BOCW) cess registration",
      "Liaison with State Inspector of Factories for inspection readiness",
    ],
    process: [
      { step: "Site Plan Approval", detail: "Submit building plans and machinery layout to the Chief Inspector of Factories for approval before construction or commencement." },
      { step: "Registration Application", detail: "File Form 2 with the Inspector of Factories, paying prescribed fees based on worker count and HP of machinery." },
      { step: "Inspection", detail: "Facilitate the Inspector's premises inspection; address any observations or safety directives." },
      { step: "Licence & Renewal", detail: "Obtain the factory licence (Form 4); set up an annual renewal calendar and manage subsequent amendments." },
    ],
    documents: [
      "Site plan and building layout (approved by architect)",
      "List of machinery with horse-power details",
      "Maximum number of workers employed in a day",
      "Proof of premises (ownership/lease)",
      "Certificate of Incorporation / partnership deed",
      "PAN of entity and occupier",
      "NOC from pollution control board (if applicable)",
    ],
    faqs: [
      { q: "What is the difference between the occupier and the manager under the Factories Act?", a: "The occupier is the person who has ultimate control over the factory (usually the owner/promoter). The manager is responsible for day-to-day operations. Both must be notified to the Inspector of Factories." },
      { q: "Is factory licence renewal automatic?", a: "No. The licence must be renewed annually by 31 December (or as per state rules) before commencement of the next calendar year." },
      { q: "Does a factory licence cover all states?", a: "No. Each state issues its own factory licence. If you have manufacturing units in multiple states, separate licences are required in each." },
    ],
  },
  {
    slug: "drug-licence",
    title: "Drug Licence",
    tagline: "Retail, wholesale and manufacturing drug licences under the Drugs & Cosmetics Act",
    category: "Pharma",
    seoTitle: "Drug Licence Registration | Retail, Wholesale & Manufacturing — Estabizz",
    metaDescription:
      "End-to-end drug licence support for retail pharmacies, wholesale distributors and manufacturers under the Drugs & Cosmetics Act. Schedule M GMP compliance and State Drug Authority liaison.",
    description:
      "The Drugs & Cosmetics Act, 1940 requires every entity involved in the manufacture, sale, stocking or distribution of drugs — including allopathic, veterinary, Ayurvedic and cosmetic drugs — to hold a valid drug licence from the State Drug Licensing Authority (SDLA). Estabizz provides complete drug licence assistance: from eligibility and premises set-up to application filing, inspection preparation and post-licence compliance.",
    features: [
      "Retail drug licence (Form 20 & 21) for pharmacies",
      "Wholesale drug licence (Form 20B & 21B) for distributors",
      "Manufacturing licence (Form 25 & 28) — Schedule M GMP compliance",
      "Loan licence and repacking licence applications",
      "Registered Pharmacist and Competent Person qualification advisory",
      "State Drug Authority inspection readiness support",
      "Licence renewal, amendment and additional product endorsement",
    ],
    process: [
      { step: "Category Determination", detail: "Identify the correct licence form: retail (20/21), wholesale (20B/21B), or manufacturing (25/28/28-B)." },
      { step: "Premises & Personnel Check", detail: "Verify premises dimensions, refrigeration, storage requirements, and qualified personnel (Registered Pharmacist for retail)." },
      { step: "Application Filing", detail: "Submit application to the State Drug Licensing Authority with prescribed fees and supporting documents." },
      { step: "Inspection & Licence", detail: "Coordinate with the Drug Inspector for premises inspection; respond to queries and obtain the licence." },
    ],
    documents: [
      "Premises proof (ownership/rent agreement) with area measurement",
      "Registered Pharmacist / Qualified Person certificate and registration",
      "Constitution documents (CoI, PAN, GST)",
      "List of drugs/products to be sold or manufactured",
      "Refrigeration and cold chain infrastructure details (Schedule H/X drugs)",
      "Site layout plan with storage area demarcation",
      "Pollution NOC (for manufacturing licence)",
    ],
    faqs: [
      { q: "Is a Registered Pharmacist mandatory for a retail drug store?", a: "Yes. A retail drug licence requires a qualified Registered Pharmacist to be in charge of the premises during working hours." },
      { q: "What is Schedule H and Schedule X?", a: "Schedule H drugs are prescription-only medications. Schedule X covers habit-forming drugs requiring additional licence conditions and record-keeping." },
      { q: "Can one entity hold both retail and wholesale drug licences?", a: "Yes, provided separate premises or clearly demarcated areas are maintained as per State Drug Authority rules." },
    ],
  },
  {
    slug: "bis-certification",
    title: "BIS Certification",
    tagline: "Bureau of Indian Standards product certification — ISI Mark, CRS and Hallmarking",
    category: "Standards",
    seoTitle: "BIS Certification | ISI Mark, CRS & Hallmarking — Estabizz Fintech",
    metaDescription:
      "BIS product certification for ISI Mark (IS products), Compulsory Registration Scheme (CRS) for electronics, and BIS Hallmarking for gold jewellery. Complete filing and lab testing coordination.",
    description:
      "The Bureau of Indian Standards (BIS) administers several product certification schemes — the ISI Mark for products covered by Indian Standards, the Compulsory Registration Scheme (CRS) for electronic and IT goods, and the BIS Hallmarking scheme for gold and silver jewellery. Many product categories require mandatory BIS certification before they can be sold in India. Estabizz provides end-to-end BIS certification support — from IS standard identification and testing coordination to grant of licence.",
    features: [
      "ISI Mark licence under BIS Product Certification Scheme",
      "Compulsory Registration Scheme (CRS) filing for electronics and IT products",
      "BIS Hallmarking centre registration for jewellers",
      "IS standard identification and product conformity assessment",
      "Coordination with BIS-approved/NABL-accredited testing laboratories",
      "Factory inspection preparation and BIS auditor liaison",
      "Foreign Manufacturer Certification Scheme (FMCS) for importers",
    ],
    process: [
      { step: "Standard Identification", detail: "Identify the applicable Indian Standard (IS) and determine mandatory vs. voluntary certification requirement." },
      { step: "Application & Lab Testing", detail: "File BIS application (online portal) and arrange product sample testing at a BIS-approved or NABL-accredited lab." },
      { step: "Factory Inspection", detail: "BIS conducts a factory/premises inspection; we prepare documentation and support the audit." },
      { step: "Grant of Licence", detail: "BIS grants the licence/certificate; we assist with marking requirements and surveillance audit preparedness." },
    ],
    documents: [
      "Certificate of Incorporation / business registration",
      "Manufacturing site details and process flow chart",
      "Test reports from approved/NABL laboratory",
      "Quality Management System documentation",
      "List of products with model numbers and specifications",
      "Authorised signatory details",
    ],
    faqs: [
      { q: "Which electronics require mandatory BIS CRS certification?", a: "Over 60 product categories including mobile phones, laptops, tablets, power banks, LED lights, adapters, CCTV cameras, and smart meters require mandatory CRS registration before import or sale in India." },
      { q: "Can a trader apply for BIS certification or only manufacturers?", a: "For ISI Mark, only manufacturers apply. For CRS, both manufacturers and importers (as Responsible Parties) can register. For Hallmarking, retail jewellers must register with BIS." },
      { q: "How long does BIS certification take?", a: "Typically 3–6 months for ISI Mark (including factory inspection and testing). CRS registration is faster — typically 4–8 weeks after successful test reports are submitted." },
    ],
  },
  {
    slug: "pfrda-registration",
    title: "PFRDA Registration",
    tagline: "Registration and compliance for pension sector intermediaries regulated by PFRDA",
    category: "Pension",
    seoTitle: "PFRDA Registration | NPS Intermediary Compliance — Estabizz Fintech",
    metaDescription:
      "PFRDA registration and ongoing compliance for Points of Presence (PoP), pension fund managers, aggregators and other NPS intermediaries regulated by the Pension Fund Regulatory & Development Authority.",
    description:
      "The Pension Fund Regulatory & Development Authority (PFRDA) regulates intermediaries operating within the National Pension System (NPS) ecosystem — including Points of Presence (PoP), pension fund managers, central record-keeping agencies and aggregators. Estabizz provides registration assistance, compliance framework design and ongoing regulatory support for entities seeking to participate in the NPS architecture.",
    features: [
      "Point of Presence (PoP) registration with PFRDA",
      "Pension fund manager licence advisory",
      "NPS aggregator registration for unorganised sector",
      "PFRDA regulatory compliance framework design",
      "Subscriber onboarding and KYC process advisory",
      "Quarterly/annual regulatory reporting support",
      "PFRDA inspection readiness and audit assistance",
    ],
    process: [
      { step: "Eligibility Assessment", detail: "Determine the appropriate intermediary category (PoP, PoP-SP, aggregator) based on your entity type, net worth and operational capabilities." },
      { step: "Application Preparation", detail: "Compile application form, net worth certificate, infrastructure details, IT system description and compliance framework documents." },
      { step: "PFRDA Filing", detail: "Submit application with prescribed registration fee to PFRDA; respond to queries during the review process." },
      { step: "Registration & Compliance Set-up", detail: "On grant of registration, set up NPS subscriber onboarding, KYC, contribution remittance and reporting workflows." },
    ],
    documents: [
      "Certificate of Incorporation and MoA/AoA",
      "Net worth certificate from Chartered Accountant",
      "Audited financial statements (last 3 years)",
      "Board resolution for PFRDA registration",
      "Details of IT infrastructure and cyber security policy",
      "KYC/AML policy document",
      "Details of key managerial personnel",
    ],
    faqs: [
      { q: "What is a Point of Presence (PoP) under NPS?", a: "A PoP is an entity authorised by PFRDA to act as a collection point for NPS subscribers — handling account opening, KYC verification and contribution processing. Banks, NBFCs, insurance companies and post offices are common PoPs." },
      { q: "What is the minimum net worth required for PoP registration?", a: "The minimum net worth requirement varies by applicant category. For banks it aligns with RBI norms; for non-bank entities PFRDA prescribes specific net worth criteria in its registration guidelines." },
      { q: "Is annual renewal required for PFRDA registration?", a: "PFRDA intermediary registrations are generally valid for 3–5 years subject to renewal. Intermediaries must maintain continuous compliance with PFRDA Regulations and Circulars." },
    ],
  },
];

export function getGovLicService(slug: string): ServicePage | undefined {
  return GOV_LIC_SERVICES.find((s) => s.slug === slug);
}

export function getAllGovLicSlugs(): string[] {
  return GOV_LIC_SERVICES.map((s) => s.slug);
}
