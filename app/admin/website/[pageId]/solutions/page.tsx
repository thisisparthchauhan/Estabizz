import type { Metadata } from "next";
import SolutionsEditor from "./SolutionsEditor";

export const metadata: Metadata = {
  title: "Edit Business Stage Solutions — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function SolutionsEditorPage() {
  return <SolutionsEditor />;
}
