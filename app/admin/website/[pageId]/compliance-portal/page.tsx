import type { Metadata } from "next";
import CompliancePortalEditor from "./CompliancePortalEditor";

export const metadata: Metadata = {
  title: "Edit Compliance Portal — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function CompliancePortalEditorPage() {
  return <CompliancePortalEditor />;
}
