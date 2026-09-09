import type { Metadata } from "next";
import JobEditorClient from "../_components/JobEditorClient";

export const metadata: Metadata = {
  title: "New Job — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function NewJobPage() {
  return <JobEditorClient job={null} />;
}
