// Final CTA section — default content (single source of truth).
export interface FinalCtaContent {
  heading: string;
  paragraph: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  phone: string;
  whatsappText: string;
  whatsappLink: string;
  closingLine: string;
}

export const FINAL_CTA_DEFAULTS: FinalCtaContent = {
  heading: "Begin Your Licensing Process with Confidence",
  paragraph:
    "Regulatory approvals demand preparation, clarity and disciplined execution. Estabizz guides you through every stage — from assessment to approval and beyond.",
  primaryBtnText: "Request a Structured Assessment",
  primaryBtnLink: "/contact",
  phone: "+91 98256 00907",
  whatsappText: "WhatsApp Estabizz",
  whatsappLink: "https://wa.me/919825600907",
  closingLine: "Regulatory strength begins with the right advisory partner.",
};
