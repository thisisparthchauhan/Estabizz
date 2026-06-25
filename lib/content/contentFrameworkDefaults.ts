// Content, Compliance & Trust section — default content (single source of truth).
export interface TrustCard {
  number: string;
  icon: string;     // optional emoji; if empty, the number badge is shown
  title: string;
  text: string;
  buttonText: string; // optional per-card button
  buttonLink: string;
  visible: boolean;
}

export interface ContentFrameworkContent {
  label: string;
  heading: string;
  description: string;
  cards: TrustCard[];
  buttonText: string;   // section-level button
  buttonLink: string;
}

export const CONTENT_FRAMEWORK_DEFAULTS: ContentFrameworkContent = {
  label: "Content, Compliance and Trust",
  heading: "Build Content, Compliance and Trust with Estabizz",
  description:
    "Our website is designed not only to explain licences, but to help founders, CFOs and compliance teams understand regulatory obligations, approval risks, documentation expectations and post-registration compliance in one place.",
  cards: [
    { number: "1", icon: "", title: "Regulatory Service Pages", text: "Every licence page is structured with eligibility, documents, process, fees, timeline, compliance, risks and FAQs.", buttonText: "", buttonLink: "", visible: true },
    { number: "2", icon: "", title: "AI-Ready Compliance FAQs", text: "Our FAQs are written to answer real founder and client questions in clear, direct and practical language.", buttonText: "", buttonLink: "", visible: true },
    { number: "3", icon: "", title: "Client-Ready Proposal System", text: "Our browser-style proposal framework helps present regulatory scope, timelines, commercials and support clearly to clients.", buttonText: "", buttonLink: "", visible: true },
  ],
  buttonText: "Explore Resources",
  buttonLink: "/resources",
};
