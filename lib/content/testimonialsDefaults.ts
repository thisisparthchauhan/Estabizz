// Testimonials — default content (single source of truth).
//
// Public display rule: only testimonials with consent === "consent_received"
// AND visible === true are shown publicly. If none qualify, the section either
// shows a "coming soon" placeholder grid or hides itself, per emptyBehavior.

export type ConsentStatus = "consent_received" | "internal_only" | "do_not_publish";

export interface Testimonial {
  name: string;
  designation: string;
  company: string;
  feedback: string;
  category: string;
  rating: number;        // 0 = not provided
  consent: ConsentStatus;
  visible: boolean;
}

export interface TestimonialsContent {
  heading: string;
  intro: string;
  footnote: string;
  /** When no publishable testimonial exists: show placeholders or hide section */
  emptyBehavior: "coming_soon" | "hidden";
  /** Placeholder category labels shown in "coming soon" mode */
  placeholders: string[];
  testimonials: Testimonial[];
}

export const TESTIMONIALS_DEFAULTS: TestimonialsContent = {
  heading: "What Our Clients Say",
  intro:
    "Our work is built around confidentiality. Many regulatory engagements cannot be publicly disclosed, but our approach remains consistent — structured execution, transparent communication and compliance-first delivery.",
  footnote:
    "Estabizz does not publish fabricated client testimonials. Verified, attributable feedback will be added progressively with explicit client consent.",
  emptyBehavior: "coming_soon",
  placeholders: [
    "Regulatory licensing support",
    "Ongoing compliance management",
    "Capital market advisory",
    "Insurance intermediary licensing",
    "GIFT City structuring",
    "AML and reporting frameworks",
  ],
  // No verified, consented testimonials yet — section shows "coming soon".
  testimonials: [],
};
