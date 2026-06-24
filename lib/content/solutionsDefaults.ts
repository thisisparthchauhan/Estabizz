// Business Stage Solutions section — default content (single source of truth).
export interface SolutionCard {
  num: string;
  icon: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
  href: string;
}

export interface SolutionsContent {
  label: string;
  heading: string;
  description: string;
  cards: SolutionCard[];
}

export const SOLUTIONS_DEFAULTS: SolutionsContent = {
  label: "Business Stage Solutions",
  heading: "Compliance support designed around where your business is going.",
  description:
    "Whether you are starting, scaling or entering a regulated financial market, Estabizz structures the licensing and compliance path with practical clarity.",
  cards: [
    { num: "01", icon: "🚀", title: "Startups & New Businesses", subtitle: "Build Right. From Day One.", body: "Incorporation, GST, banking readiness and early compliance foundations before scale.", tags: ["Private Limited", "LLP", "OPC", "Section 8"], href: "/services" },
    { num: "02", icon: "🏦", title: "NBFCs & Lending Businesses", subtitle: "Regulated Lending. Managed with Precision.", body: "NBFC licence, RBI policy stack, returns, audits, governance and post-registration compliance.", tags: ["RBI Licensing", "NBFC Compliance", "DNBS Reporting"], href: "/rbi" },
    { num: "03", icon: "💳", title: "Fintech Platforms", subtitle: "Compliance Architecture for Digital Finance.", body: "Payment Aggregator, PPI, PSP, Account Aggregator and IFSCA route evaluation.", tags: ["PA Licence", "PPI", "PSP", "IFSCA"], href: "/ifsca" },
    { num: "04", icon: "📊", title: "SMEs & Growing Enterprises", subtitle: "Structured Compliance. Sustainable Growth.", body: "ROC, tax, audit, secretarial, governance and sectoral licence support.", tags: ["Audit", "ROC", "Tax", "Governance"], href: "/services/enterprise-services" },
    { num: "05", icon: "📈", title: "Capital Market Businesses", subtitle: "SEBI Registration. Regulator-Ready Execution.", body: "AIF, PMS, RIA, Research Analyst, Stock Broker, Merchant Banker and RTA support.", tags: ["AIF", "PMS", "RIA", "Stock Broker"], href: "/sebi" },
    { num: "06", icon: "🛡️", title: "Insurance & Risk Entities", subtitle: "IRDAI Licensing. Built on Governance.", body: "Insurance broker, corporate agent, IMF, ISNP and reinsurance intermediary support.", tags: ["Broker", "Corporate Agent", "IMF", "ISNP"], href: "/irdai" },
  ],
};
