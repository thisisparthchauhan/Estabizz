import type { Metadata } from "next";
import ContentFrameworkEditor from "./ContentFrameworkEditor";

export const metadata: Metadata = {
  title: "Edit Content, Compliance & Trust — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function ContentFrameworkEditorPage() {
  return <ContentFrameworkEditor />;
}
