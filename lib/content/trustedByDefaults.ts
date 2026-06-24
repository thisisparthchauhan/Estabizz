// Trusted By / Client Logos section — default content (single source of truth).
export interface TrustedByContent {
  heading: string;
  disclaimer: string;
  companies: string[];
}

export const TRUSTED_BY_DEFAULTS: TrustedByContent = {
  heading: "Trusted by India's Fastest Growing Businesses",
  disclaimer:
    "Names are displayed for representative trust-building purposes only where permitted. This does not imply endorsement unless expressly authorised.",
  companies: [
    "Ezywise", "Thip", "InsureHub", "Cosmopayz", "Branch International", "Efficient Group",
    "GE Shipping", "Jainam Group", "Opus Capital", "Kshetrapal", "MAKS", "Market Wick",
    "Finergy Finance", "Fintara", "Devvrat Group", "Vayoonandan", "VSPA", "Western Fintrade",
    "SVCM", "Evermore", "LN Fintech", "Digitap", "Cashfree", "Razorpay", "Digio",
    "Nutra Trade", "Unique Solar", "CareBharat", "Ombeema", "CARE", "GROW",
  ],
};
