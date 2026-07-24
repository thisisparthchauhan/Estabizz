// Page-wise SEO content (single source of truth). Used to build real page
// metadata via lib/seo/pageMetadata.ts. Reusable for any page (not blog-only).

export interface SeoContent {
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  /** Display-only; public routes are defined by the Next.js file system. */
  slug: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  /** Used for Open Graph AND Twitter images (unless twitterImage is set). */
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaType: string;
  /** Comma-separated secondary keywords (optional, editorial use only). */
  secondaryKeywords?: string;
  /** Internal SEO notes for the admin team (not exposed publicly). */
  seoNotes?: string;
}

// ── Homepage ───────────────────────────────────────────────────────────────────

export const SEO_HOMEPAGE_DEFAULTS: SeoContent = {
  seoTitle: "Estabizz Fintech Private Limited | Regulatory Licensing & Compliance",
  metaDescription:
    "Estabizz supports businesses with RBI, SEBI, IRDAI, IFSCA, FIU, MCA and sectoral licensing, regulatory documentation and ongoing compliance in India and global markets.",
  focusKeyword: "fintech compliance India",
  slug: "/",
  canonicalUrl: "/",
  ogTitle: "Estabizz Fintech Private Limited | Regulatory Licensing & Compliance",
  ogDescription:
    "Estabizz supports businesses with RBI, SEBI, IRDAI, IFSCA, FIU, MCA and sectoral licensing, regulatory documentation and ongoing compliance in India and global markets.",
  ogImage: "",
  twitterTitle: "Estabizz Fintech Private Limited | Regulatory Licensing & Compliance",
  twitterDescription:
    "Estabizz supports businesses with RBI, SEBI, IRDAI, IFSCA, FIU, MCA and sectoral licensing, regulatory documentation and ongoing compliance in India and global markets.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "WebSite",
};

// ── Contact ────────────────────────────────────────────────────────────────────

export const SEO_CONTACT_DEFAULTS: SeoContent = {
  seoTitle: "Contact Us – Book Free Consultation | Estabizz Fintech",
  metaDescription:
    "Contact Estabizz Fintech for expert regulatory compliance guidance. Book a free consultation for NBFC registration, SEBI services, IRDAI licensing, FEMA compliance and more.",
  focusKeyword: "contact Estabizz fintech consultation",
  slug: "/contact",
  canonicalUrl: "/contact",
  ogTitle: "Contact Estabizz Fintech | Book Free Consultation",
  ogDescription:
    "Expert regulatory compliance guidance for RBI, SEBI, IRDAI and IFSCA. Book a free consultation today.",
  ogImage: "",
  twitterTitle: "Contact Estabizz Fintech",
  twitterDescription:
    "Expert regulatory compliance guidance — NBFC, SEBI, IRDAI, IFSCA and more. Book free consultation.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ContactPage",
};

// ── Blogs ──────────────────────────────────────────────────────────────────────

export const SEO_BLOGS_DEFAULTS: SeoContent = {
  seoTitle: "Regulatory Insights | RBI, SEBI, IRDAI, IFSCA & Fintech Blogs",
  metaDescription:
    "Expert regulatory insights, licensing guides and compliance updates on RBI, SEBI, IRDAI, IFSCA, NBFC, fintech, insurance and corporate compliance. Published by Estabizz Fintech.",
  focusKeyword: "regulatory insights fintech compliance blogs",
  slug: "/blogs",
  canonicalUrl: "/blogs",
  ogTitle: "Estabizz Regulatory Insights | RBI, SEBI, IRDAI, IFSCA Blogs",
  ogDescription:
    "Professional regulatory insights and compliance guides for founders, CFOs, fintechs and regulated businesses in India.",
  ogImage: "",
  twitterTitle: "Estabizz Regulatory Insights",
  twitterDescription:
    "Licensing guides, compliance explainers and regulatory updates for Indian and global fintech businesses.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "Blog",
};

// ── RBI ────────────────────────────────────────────────────────────────────────

export const SEO_RBI_DEFAULTS: SeoContent = {
  seoTitle: "RBI Services – NBFC Registration, Account Aggregator & Compliance | Estabizz Fintech",
  metaDescription:
    "Complete RBI regulatory services in India – NBFC registration, Account Aggregator license, LendTech compliance, NBFC business plans and more. Expert guidance by Estabizz Fintech.",
  focusKeyword: "RBI services NBFC registration India",
  slug: "/rbi",
  canonicalUrl: "/rbi",
  ogTitle: "RBI Services | NBFC Registration & Compliance — Estabizz",
  ogDescription:
    "Complete RBI regulatory advisory — NBFC, Account Aggregator, Payment Aggregator, PPI and more.",
  ogImage: "",
  twitterTitle: "RBI Services | Estabizz Fintech",
  twitterDescription: "NBFC registration, Account Aggregator license, Payment Aggregator and LendTech compliance advisory.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ProfessionalService",
};

// ── SEBI ───────────────────────────────────────────────────────────────────────

export const SEO_SEBI_DEFAULTS: SeoContent = {
  seoTitle: "SEBI Services – Registration, Compliance & Licensing Guide | Estabizz Fintech",
  metaDescription:
    "Complete SEBI regulatory services – AMFI registration, credit rating agency, depository participant, REIT, mutual fund, AIF compliance and more. Expert guidance.",
  focusKeyword: "SEBI services registration compliance India",
  slug: "/sebi",
  canonicalUrl: "/sebi",
  ogTitle: "SEBI Services | Registration & Compliance — Estabizz",
  ogDescription:
    "SEBI advisory — AIF, PMS, RIA, Stock Broker, Research Analyst and AMFI registration guidance.",
  ogImage: "",
  twitterTitle: "SEBI Services | Estabizz Fintech",
  twitterDescription: "AIF, PMS, RIA, Stock Broker registration and SEBI compliance advisory.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ProfessionalService",
};

// ── IRDAI ──────────────────────────────────────────────────────────────────────

export const SEO_IRDAI_DEFAULTS: SeoContent = {
  seoTitle: "IRDAI Services – Insurance Broker, ISNP & Regulatory Compliance | Estabizz Fintech",
  metaDescription:
    "Complete IRDAI regulatory services in India – insurance broker license, ISNP registration, insurance marketing firm, regulatory sandbox and more. Expert guidance by Estabizz Fintech.",
  focusKeyword: "IRDAI services insurance broker license India",
  slug: "/irdai",
  canonicalUrl: "/irdai",
  ogTitle: "IRDAI Services | Insurance Broker & Compliance — Estabizz",
  ogDescription:
    "IRDAI advisory — insurance broker, composite broker, corporate agent, ISNP, reinsurance broker and regulatory sandbox.",
  ogImage: "",
  twitterTitle: "IRDAI Services | Estabizz Fintech",
  twitterDescription: "Insurance broker license, ISNP registration and IRDAI regulatory compliance advisory.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ProfessionalService",
};

// ── IFSCA ──────────────────────────────────────────────────────────────────────

export const SEO_IFSCA_DEFAULTS: SeoContent = {
  seoTitle: "IFSCA Services – Finance Company, Aircraft Leasing, PSP License, FinTech | Estabizz Fintech",
  metaDescription:
    "Complete IFSCA regulatory services — Finance Company registration, Aircraft Leasing, PSP License, FinTech Entity, ITFS Platform, BATF Services and compliance guidance at GIFT IFSC.",
  focusKeyword: "IFSCA GIFT IFSC services registration",
  slug: "/ifsca",
  canonicalUrl: "/ifsca",
  ogTitle: "IFSCA Services | GIFT IFSC Registration — Estabizz",
  ogDescription:
    "IFSCA advisory — Finance Company, Aircraft Leasing, PSP License, FinTech Entity, ITFS and BATF registration at GIFT IFSC.",
  ogImage: "",
  twitterTitle: "IFSCA Services | Estabizz Fintech",
  twitterDescription: "Finance Company, Aircraft Leasing, PSP License and FinTech registration at GIFT IFSC.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ProfessionalService",
};

// ── FEMA ───────────────────────────────────────────────────────────────────────

export const SEO_FEMA_DEFAULTS: SeoContent = {
  seoTitle: "FEMA Services – Foreign Exchange Compliance & Registration | Estabizz Fintech",
  metaDescription:
    "Complete FEMA regulatory services in India – FEMA registration, compliance under FEMA, foreign exchange management and cross-border transaction guidance. Expert advisory by Estabizz Fintech.",
  focusKeyword: "FEMA services foreign exchange compliance India",
  slug: "/fema",
  canonicalUrl: "/fema",
  ogTitle: "FEMA Services | Foreign Exchange Compliance — Estabizz",
  ogDescription:
    "FEMA advisory — FEMA registration, compliance framework and cross-border transaction guidance.",
  ogImage: "",
  twitterTitle: "FEMA Services | Estabizz Fintech",
  twitterDescription: "FEMA registration, foreign exchange compliance and cross-border advisory.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ProfessionalService",
};

// ── Services ───────────────────────────────────────────────────────────────────

export const SEO_SERVICES_DEFAULTS: SeoContent = {
  seoTitle: "Business Services – GST, Legal, ESG, Transfer Pricing & More | Estabizz Fintech",
  metaDescription:
    "Comprehensive business services in India – enterprise consulting, GST appeal, legal due diligence, ESG consulting, transfer pricing, trademark search, sustainable finance and more.",
  focusKeyword: "business services legal compliance India",
  slug: "/services",
  canonicalUrl: "/services",
  ogTitle: "Business Services | GST, Legal, ESG & More — Estabizz",
  ogDescription:
    "Enterprise consulting, GST appeal, legal due diligence, ESG, transfer pricing and trademark services.",
  ogImage: "",
  twitterTitle: "Business Services | Estabizz Fintech",
  twitterDescription: "GST appeal, legal due diligence, ESG consulting and transfer pricing advisory.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ProfessionalService",
};

// ── Pricing ────────────────────────────────────────────────────────────────────

export const SEO_PRICING_DEFAULTS: SeoContent = {
  seoTitle: "Engagement Models & Pricing – Scope-Based Advisory Fees | Estabizz Fintech",
  metaDescription:
    "Transparent, scope-based engagement models for regulatory, licensing and compliance assignments across RBI, SEBI, IRDAI and IFSCA. Request a custom quote from Estabizz Fintech.",
  focusKeyword: "regulatory advisory pricing engagement models",
  slug: "/pricing",
  canonicalUrl: "/pricing",
  ogTitle: "Pricing & Engagement Models | Estabizz Fintech",
  ogDescription:
    "Scope-based advisory fees for regulatory, licensing and compliance assignments. Request a custom quote.",
  ogImage: "",
  twitterTitle: "Estabizz Pricing",
  twitterDescription: "Transparent scope-based advisory fees for RBI, SEBI, IRDAI and IFSCA engagements.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "ProfessionalService",
};

// ── Resources ──────────────────────────────────────────────────────────────────

export const SEO_RESOURCES_DEFAULTS: SeoContent = {
  seoTitle: "Regulatory Resources – FAQs, Compliance Calendar & Guides | Estabizz Fintech",
  metaDescription:
    "Free regulatory resources — compliance calendars, FAQ explainers, circular summaries and regulatory update guides for RBI, SEBI, IRDAI and IFSCA regulated businesses.",
  focusKeyword: "regulatory resources compliance calendar India",
  slug: "/resources",
  canonicalUrl: "/resources",
  ogTitle: "Regulatory Resources | Estabizz Fintech",
  ogDescription:
    "Compliance calendars, FAQ explainers and regulatory update guides for fintech and regulated businesses.",
  ogImage: "",
  twitterTitle: "Regulatory Resources | Estabizz",
  twitterDescription: "Free compliance resources — calendars, FAQs and regulatory guides.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "WebPage",
};

// ── Regulatory Updates listing ─────────────────────────────────────────────────

export const SEO_REGULATORY_UPDATES_DEFAULTS: SeoContent = {
  seoTitle: "Regulatory Updates – RBI, SEBI, IRDAI, IFSCA Notifications | Estabizz Fintech",
  metaDescription:
    "Latest regulatory updates, circulars and notifications from RBI, SEBI, IRDAI, IFSCA and MCA. Stay compliant with real-time regulatory change alerts from Estabizz Fintech.",
  focusKeyword: "regulatory updates India RBI SEBI IRDAI circulars",
  slug: "/resources/regulatory-updates",
  canonicalUrl: "/resources/regulatory-updates",
  ogTitle: "Regulatory Updates | RBI, SEBI, IRDAI, IFSCA — Estabizz",
  ogDescription:
    "Real-time regulatory updates and circulars from RBI, SEBI, IRDAI, IFSCA and MCA.",
  ogImage: "",
  twitterTitle: "Regulatory Updates | Estabizz",
  twitterDescription: "Latest RBI, SEBI, IRDAI and IFSCA regulatory updates and circulars.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "WebPage",
};

// ── Privacy Policy ─────────────────────────────────────────────────────────────

export const SEO_LEGAL_PRIVACY_DEFAULTS: SeoContent = {
  seoTitle: "Privacy Policy | Estabizz Fintech Private Limited",
  metaDescription:
    "Read the privacy policy of Estabizz Fintech Private Limited — how we collect, store and use your personal data in compliance with applicable Indian data protection law.",
  focusKeyword: "Estabizz privacy policy data protection",
  slug: "/legal/privacy-policy",
  canonicalUrl: "/legal/privacy-policy",
  ogTitle: "Privacy Policy | Estabizz Fintech",
  ogDescription: "Estabizz Fintech privacy policy — how we handle your personal data.",
  ogImage: "",
  twitterTitle: "Privacy Policy | Estabizz Fintech",
  twitterDescription: "How Estabizz Fintech collects, stores and uses your personal information.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "WebPage",
};

// ── Login ──────────────────────────────────────────────────────────────────────

export const SEO_LOGIN_DEFAULTS: SeoContent = {
  seoTitle: "Admin Login | Estabizz Fintech",
  metaDescription: "Secure admin login portal for Estabizz Fintech team members.",
  focusKeyword: "",
  slug: "/login",
  canonicalUrl: "/login",
  ogTitle: "Admin Login | Estabizz Fintech",
  ogDescription: "Secure admin login portal.",
  ogImage: "",
  twitterTitle: "Admin Login | Estabizz Fintech",
  twitterDescription: "Secure admin login portal.",
  robotsIndex: false,
  robotsFollow: false,
  schemaType: "WebPage",
};
