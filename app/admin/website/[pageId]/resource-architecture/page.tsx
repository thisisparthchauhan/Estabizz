import type { Metadata } from "next";
import ResourceArchitectureEditor from "./ResourceArchitectureEditor";

export const metadata: Metadata = {
  title: "Edit Resource Architecture — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function ResourceArchitectureEditorPage() {
  return <ResourceArchitectureEditor />;
}
