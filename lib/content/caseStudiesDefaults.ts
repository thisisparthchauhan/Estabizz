// Regulatory Experience / Case Highlights — default content (single source of truth).
//
// COMPLIANCE NOTE: default wording must NOT guarantee any regulatory approval.
// Avoid: "guaranteed approval", "assured licence", "100% approval",
// "regulator-approved consultant", "RBI/SEBI/IRDAI licensed/approved consultant".
// Prefer: advisory support, application preparation support, documentation and
// compliance assistance, indicative engagement experience, and clear "subject to
// regulator review, eligibility, documentation and applicable law" framing.

export interface CaseHighlight {
  category: string;     // badge, e.g. "🏛️ RBI"
  title: string;
  description: string;
  support: string;      // indicative support provided
  outcome: string;      // outcome wording (non-guaranteeing)
  disclaimer: string;   // per-case disclaimer note (optional)
  visible: boolean;     // show/hide this card
}

export interface CaseStudiesContent {
  label: string;
  heading: string;
  subheading: string;
  intro: string;
  cases: CaseHighlight[];
  disclaimer: string;   // section-level disclaimer (admin controls final wording)
  closingLine: string;
}

export const CASE_STUDIES_DEFAULTS: CaseStudiesContent = {
  label: "Regulatory Experience",
  heading: "Regulatory Experience. Real Outcomes.",
  subheading: "Representative engagements, shared without confidential client details.",
  intro:
    "Behind every engagement is a journey of uncertainty, discipline and structured execution. These are indicative experiences shared without confidential client details.",
  cases: [
    {
      category: "🏛️ RBI",
      title: "NBFC Application — From Doubt to Discipline",
      description: "The founders were unsure whether their business model and capital structure aligned with RBI expectations. We provided documentation support, refined the business plan, strengthened policy frameworks and helped prepare responses to regulatory queries.",
      support: "Application preparation support, documentation and compliance assistance, and query-response coordination.",
      outcome: "Indicative engagement experience — the application progressed through structured preparation. Any approval is subject to regulator review.",
      disclaimer: "Indicative experience only. Approval subject to regulator review, eligibility, documentation and applicable law.",
      visible: true,
    },
    {
      category: "📊 SEBI",
      title: "SEBI Registration — Structuring a Capital Market Vision",
      description: "An emerging investment firm approached us with ambition but limited regulatory clarity. We supported net-worth compliance alignment, operational-framework design, drafting of required policies and preparation of the application for SEBI scrutiny.",
      support: "Eligibility assessment support, policy drafting assistance and application preparation support.",
      outcome: "A compliance system was prepared to be ready from day one. Registration is subject to regulator review.",
      disclaimer: "Indicative experience only. Subject to eligibility, documentation and applicable law.",
      visible: true,
    },
    {
      category: "🛡️ IRDAI",
      title: "IRDAI Licensing — Building from Foundation Up",
      description: "The promoters had strong insurance domain experience but required guidance on regulatory documentation and capital structuring. We supported them on principal-officer eligibility readiness, infrastructure readiness, documentation and regulatory submission preparation.",
      support: "Documentation and compliance assistance, eligibility readiness support and submission preparation.",
      outcome: "The engagement was built on governance readiness. Any licence is subject to regulator review and applicable law.",
      disclaimer: "Indicative experience only. Approval subject to regulator review.",
      visible: true,
    },
    {
      category: "🌐 IFSCA",
      title: "IFSCA Registration — Entering the IFSC Ecosystem",
      description: "Setting up within GIFT City requires structured planning and regulatory clarity. We supported the entity with office-planning guidance, application drafting, governance design and preparation of regulator-facing communication aligned with IFSCA expectations.",
      support: "Structuring guidance, application preparation support and governance design assistance.",
      outcome: "IFSC entry was structured professionally. Registration is subject to regulator review, eligibility and applicable law.",
      disclaimer: "Indicative experience only. Subject to eligibility, documentation and applicable law.",
      visible: true,
    },
  ],
  disclaimer:
    "These are indicative engagement experiences shared without confidential client details. Estabizz provides regulatory advisory, application preparation and documentation support. Outcomes depend on regulator review, eligibility, documentation and applicable law. Estabizz does not guarantee any registration, licence or approval and is not a regulator-approved or licensed consultant.",
  closingLine:
    "Regulatory outcomes are earned through structure, patience and accountability — subject to regulator review and applicable law.",
};
