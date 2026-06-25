import type { Metadata } from "next";
import ProcessEditor from "./ProcessEditor";

export const metadata: Metadata = {
  title: "Edit Execution Process — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function ProcessEditorPage() {
  return <ProcessEditor />;
}
