// Regulatory Services section — default content (single source of truth).
export interface ServiceTag { name: string; href: string }
export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  href: string;
  forText: string;
  desc: string;
  tags: ServiceTag[];
}

export interface RegulatoryServicesContent {
  headingMain: string;
  headingHighlight: string;
  description: string;
  services: ServiceCard[];
}

export const REGULATORY_SERVICES_DEFAULTS: RegulatoryServicesContent = {
  headingMain: "Regulatory Services Built for",
  headingHighlight: "Serious Businesses",
  description:
    "From licensing to ongoing compliance, Estabizz supports regulated businesses across India's most important financial and corporate frameworks.",
  services: [
    { id: "rbi", icon: "🏦", title: "RBI Regulatory Services", href: "/rbi", forText: "Financial Institutions & Digital Lending Platforms", desc: "End-to-end RBI licensing and compliance management including capital structuring, policy drafting, application filing, regulatory liaison, inspection preparedness and post-approval reporting.", tags: [
      { name: "NBFC Registration", href: "/rbi/nbfc-registration-in-india" },
      { name: "NBFC-MFI Registration", href: "/rbi" },
      { name: "NBFC-ICC Registration", href: "/rbi" },
      { name: "Payment Aggregator Licence", href: "/rbi/payment-aggregator-license-in-india" },
      { name: "PPI / Prepaid Wallet", href: "/rbi/ppi-registration-in-india" },
      { name: "Account Aggregator", href: "/rbi/nbfc-account-aggregator-license" },
      { name: "ARC Registration", href: "/rbi/arc-registration-in-india" },
      { name: "RBI Returns", href: "/rbi/rbi-services" },
    ] },
    { id: "sebi", icon: "📈", title: "SEBI Regulatory Services", href: "/sebi", forText: "Capital Market & Investment Entities", desc: "Structured SEBI registration and governance support covering documentation, eligibility assessment, net worth compliance, application filing, regulatory query response and long-term compliance monitoring.", tags: [
      { name: "Stock Broker", href: "/sebi/stock-broker-registration-in-india" },
      { name: "RIA", href: "/sebi/ria-registration-in-india" },
      { name: "PMS", href: "/sebi/pms-registration-in-india" },
      { name: "AIF", href: "/sebi/aif-registration-in-india" },
      { name: "Research Analyst", href: "/sebi/research-analyst-registration-in-india" },
      { name: "Merchant Banker", href: "/sebi" },
      { name: "RTA", href: "/sebi" },
      { name: "Social Stock Exchange", href: "/sebi/social-stock-exchange-license-india" },
    ] },
    { id: "irdai", icon: "🛡️", title: "IRDAI Regulatory Services", href: "/irdai", forText: "Insurance & Risk Management Entities", desc: "Complete IRDAI licensing lifecycle support from feasibility assessment and capital planning to regulatory approval support and continuous compliance management.", tags: [
      { name: "Insurance Company", href: "/irdai" },
      { name: "Insurance Broker", href: "/irdai/insurance-broker-registration-in-india" },
      { name: "Composite Broker", href: "/irdai/composite-insurance-broker-registration-in-india" },
      { name: "Corporate Agent", href: "/irdai/corporate-agent-registration-in-india" },
      { name: "IMF", href: "/irdai/insurance-marketing-firm-registration-in-india" },
      { name: "ISNP", href: "/irdai/isnp-registration" },
      { name: "Reinsurance Broker", href: "/irdai/reinsurance-broker-registration-in-india" },
    ] },
    { id: "ifsca", icon: "🌐", title: "IFSCA & GIFT City Services", href: "/ifsca", forText: "Global Financial Services & IFSC Entities", desc: "Regulatory structuring and operational compliance support for entities operating within India's International Financial Services Centre ecosystem.", tags: [
      { name: "Broker Dealer", href: "/ifsca" },
      { name: "Fund Management Entity", href: "/ifsca" },
      { name: "Global Banking Unit", href: "/ifsca" },
      { name: "Finance Company", href: "/ifsca/finance-company-in-gift-ifsc" },
      { name: "PSP Licence", href: "/ifsca/psp-license-ifsca" },
      { name: "ITFS Platform", href: "/ifsca/itfs-registration-in-gift-ifsc" },
      { name: "BATF", href: "/ifsca/batf-services-registration-in-gift-ifsc" },
      { name: "Insurance Office IFSC", href: "/irdai/ifsca-insurance-intermediary" },
    ] },
    { id: "fiu", icon: "🔍", title: "Financial Intelligence & Reporting Frameworks", href: "/services", forText: "AML, KYC & Reporting Teams", desc: "Design and implementation of financial intelligence, AML, KYC, reporting and risk-monitoring systems aligned with India's financial regulatory expectations.", tags: [
      { name: "FIU-IND", href: "/services/enterprise-services" },
      { name: "PMLA Compliance", href: "/services/legal-due-diligence" },
      { name: "AML Policy", href: "/services/enterprise-services" },
      { name: "AML Risk Assessment", href: "/services/legal-due-diligence" },
      { name: "CKYC", href: "/services/enterprise-services" },
      { name: "Credit Bureau Integration", href: "/services/enterprise-services" },
      { name: "NESL Reporting", href: "/services/enterprise-services" },
    ] },
    { id: "company", icon: "🏛️", title: "Company Formation & Governance", href: "/services", forText: "Founders, Boards & Corporate Teams", desc: "From incorporation to structured governance — building legally compliant enterprises with strong financial and operational discipline.", tags: [
      { name: "Private Limited", href: "/services/enterprise-services" },
      { name: "LLP", href: "/services/enterprise-services" },
      { name: "OPC", href: "/services/enterprise-services" },
      { name: "Section 8", href: "/services/enterprise-services" },
      { name: "Society", href: "/services/enterprise-services" },
      { name: "Annual Compliance", href: "/services/enterprise-services" },
      { name: "Audit", href: "/services/finance-accounting-outsourcing" },
      { name: "ROC Filings", href: "/services/enterprise-services" },
    ] },
    { id: "sectoral", icon: "⚙️", title: "Sectoral & Operational Licences", href: "/services", forText: "Manufacturing, Food, Healthcare & Export Businesses", desc: "Industry-specific regulatory approvals enabling businesses to operate legally across manufacturing, healthcare, food, exports, and certification.", tags: [
      { name: "FSSAI", href: "/services/enterprise-services" },
      { name: "APEDA", href: "/services/enterprise-services" },
      { name: "AYUSH", href: "/services/enterprise-services" },
      { name: "Factory Licence", href: "/services/enterprise-services" },
      { name: "Drug Licence", href: "/services/enterprise-services" },
      { name: "RNI", href: "/services/enterprise-services" },
      { name: "BIS", href: "/services/enterprise-services" },
      { name: "Trademark", href: "/services/trademark-search" },
    ] },
    { id: "specialised", icon: "📋", title: "Specialised Compliance Support", href: "/services", forText: "Regulated Financial Entities", desc: "Ongoing regulatory monitoring, returns filing, audit coordination, policy drafting, and inspection readiness for market participants.", tags: [
      { name: "NBFC Compliance", href: "/rbi/nbfc-legal-support" },
      { name: "AIF Compliance", href: "/sebi/aif-compliance-test-report" },
      { name: "FME Compliance", href: "/ifsca" },
      { name: "Stock Broker Compliance", href: "/sebi/stock-broker-registration-in-india" },
      { name: "Payment Aggregator Compliance", href: "/rbi/payment-aggregator-license-in-india" },
      { name: "RTA Compliance", href: "/sebi" },
      { name: "RIA & RA Compliance", href: "/sebi" },
    ] },
  ],
};
