import type { Metadata } from "next";
import RegulatoryServicesEditor from "./RegulatoryServicesEditor";

export const metadata: Metadata = {
  title: "Edit Regulatory Services — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function RegulatoryServicesEditorPage() {
  return <RegulatoryServicesEditor />;
}
