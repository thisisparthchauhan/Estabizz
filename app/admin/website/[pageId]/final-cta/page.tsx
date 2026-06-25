import type { Metadata } from "next";
import FinalCtaEditor from "./FinalCtaEditor";

export const metadata: Metadata = {
  title: "Edit Final CTA — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function FinalCtaEditorPage() {
  return <FinalCtaEditor />;
}
