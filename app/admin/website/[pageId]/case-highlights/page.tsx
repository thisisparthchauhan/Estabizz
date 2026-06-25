import type { Metadata } from "next";
import CaseHighlightsEditor from "./CaseHighlightsEditor";

export const metadata: Metadata = {
  title: "Edit Case Highlights — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function CaseHighlightsEditorPage() {
  return <CaseHighlightsEditor />;
}
