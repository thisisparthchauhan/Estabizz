// Resource Architecture section — default content (single source of truth).
// Homepage content for now; this batch keeps cards manually curated and does
// not connect them to blogs or regulatory update feeds.
export interface ResourceCard {
  title: string;
  text: string;
  href: string;
  button: string;
  visible: boolean;
}

export interface ResourcesContent {
  label: string;
  heading: string;
  description: string;
  cards: ResourceCard[];
}

export const RESOURCES_DEFAULTS: ResourcesContent = {
  label: "Resource Architecture",
  heading: "Navigate Regulatory Resources with Clarity",
  description:
    "Estabizz organizes practical compliance material into clear resource paths so founders, CFOs and regulated teams can move from understanding to action without searching across disconnected pages.",
  cards: [
    { title: "Compliance FAQs", text: "Detailed, search-friendly FAQs for licensing, registration, post-approval compliance and regulator queries.", href: "/resources/faqs", button: "Explore FAQs", visible: true },
  ],
};
