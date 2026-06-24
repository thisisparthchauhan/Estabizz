import type { Metadata } from "next";
import StatsEditor from "./StatsEditor";

export const metadata: Metadata = {
  title: "Edit Statistics — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function StatsEditorPage() {
  return <StatsEditor />;
}
