// Execution Process section — default content (single source of truth).
export interface ProcessStep { num: string; title: string; badge: string; body: string }

export interface ProcessContent {
  label: string;
  heading: string;
  description: string;
  steps: ProcessStep[];
}

export const PROCESS_DEFAULTS: ProcessContent = {
  label: "Execution Process",
  heading: "A structured path to regulatory approval.",
  description:
    "Our process is simple to understand but disciplined in execution, so clients know what happens next at every stage.",
  steps: [
    { num: "01", title: "Strategic Regulatory Assessment", badge: "Clarity Before Commitment", body: "We evaluate the business model, capital readiness and regulatory exposure before any filing starts." },
    { num: "02", title: "Regulator-Ready Documentation", badge: "Precision in Preparation", body: "We structure business plans, policies, declarations, projections and supporting records." },
    { num: "03", title: "Regulatory Filing & Liaison", badge: "Disciplined Execution", body: "Applications are submitted with organised follow-ups, query management and supporting evidence." },
    { num: "04", title: "Approval & Ongoing Compliance", badge: "Beyond the Licence", body: "Post-approval compliance systems, calendars and governance controls are mapped for continuity." },
  ],
};
