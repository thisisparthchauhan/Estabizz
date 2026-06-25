// Why Estabizz section — default content (single source of truth).
export interface WhyPillar { title: string; body: string }

export interface WhyEstabizzContent {
  label: string;
  heading: string;
  quote: string;
  description: string;
  highlightBox: string;
  pillars: WhyPillar[];
}

export const WHY_ESTABIZZ_DEFAULTS: WhyEstabizzContent = {
  label: "Why Estabizz",
  heading: "Built on trust. Driven by accountability.",
  quote: "Compliance is not a product. It is a responsibility.",
  description:
    "We stand beside clients during regulatory milestones, application preparation, query response and compliance cycles. The work is practical, structured and regulator-respectful.",
  highlightBox: "We do not just guide. We execute. We safeguard. We support.",
  pillars: [
    { title: "Regulatory Expertise", body: "Qualified CAs, CSs, lawyers and regulatory professionals with hands-on experience across RBI, SEBI, IRDAI, IFSCA and MCA frameworks." },
    { title: "Regulator-Ready Documentation", body: "Business plans, declarations, policy frameworks and supporting records are prepared with regulatory discipline." },
    { title: "Complete Ownership", body: "From preparation to approval and ongoing compliance, we keep the engagement structured and accountable." },
    { title: "Transparent Commitments", body: "Defined scope, realistic timelines, clear fees and practical communication from start to finish." },
  ],
};
