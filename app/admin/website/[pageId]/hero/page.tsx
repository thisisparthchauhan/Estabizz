import type { Metadata } from "next";
import HeroEditor from "./HeroEditor";

export const metadata: Metadata = {
  title: "Edit Hero — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function HeroEditorPage() {
  return <HeroEditor />;
}
