import type { Metadata } from "next";
import TrustedByEditor from "./TrustedByEditor";

export const metadata: Metadata = {
  title: "Edit Trusted By — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function TrustedByEditorPage() {
  return <TrustedByEditor />;
}
