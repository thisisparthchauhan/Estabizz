import type { Metadata } from "next";
import TestimonialsEditor from "./TestimonialsEditor";

export const metadata: Metadata = {
  title: "Edit Testimonials — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function TestimonialsEditorPage() {
  return <TestimonialsEditor />;
}
