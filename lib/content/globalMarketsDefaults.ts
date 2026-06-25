// Global Market Desk section — default content (single source of truth).
export interface GlobalFeature { title: string; text: string }
export interface GlobalRegion { title: string; description: string; markets: string[]; accent: string }

export interface GlobalMarketsContent {
  label: string;
  headingMain: string;
  headingHighlight: string;
  description: string;
  features: GlobalFeature[];
  primaryBtnText: string;
  primaryBtnLink: string;
  whatsappText: string;
  whatsappLink: string;
  regions: GlobalRegion[];
}

export const GLOBAL_MARKETS_DEFAULTS: GlobalMarketsContent = {
  label: "Global Market Desk",
  headingMain: "India-built compliance intelligence for",
  headingHighlight: "global expansion.",
  description:
    "Estabizz is expanding its advisory lens from India to global markets. We help founders, CFOs and regulated businesses evaluate market entry, licensing routes, documentation expectations and compliance readiness with a structured, regulator-respectful approach.",
  features: [
    { title: "Regulatory mapping", text: "Country-wise applicability review" },
    { title: "Entity planning", text: "Structure, ownership and governance notes" },
    { title: "Launch readiness", text: "Policies, filings and evidence packs" },
  ],
  primaryBtnText: "Plan Global Expansion",
  primaryBtnLink: "/contact",
  whatsappText: "WhatsApp Estabizz Team",
  whatsappLink: "https://wa.me/919825600907",
  regions: [
    { title: "India & GIFT City", description: "RBI, SEBI, IRDAI, IFSCA, FIU-IND and corporate compliance support from India outward.", markets: ["India", "GIFT IFSC", "South Asia"], accent: "#1677f2" },
    { title: "GCC & Middle East", description: "Market-entry, fintech structuring and documentation support for UAE, Saudi Arabia, Qatar and allied markets.", markets: ["UAE", "Saudi Arabia", "Qatar", "Oman"], accent: "#1677f2" },
    { title: "UK, Europe & Global Funds", description: "Cross-border compliance planning for fund, fintech, payments and corporate structures.", markets: ["UK", "EU", "Luxembourg", "Ireland"], accent: "#10b981" },
    { title: "APAC & North America", description: "Regulatory research, partner coordination and founder-ready documentation for expansion planning.", markets: ["Singapore", "Australia", "USA", "Canada"], accent: "#7C3AED" },
  ],
};
