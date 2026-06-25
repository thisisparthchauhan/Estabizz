import type { Metadata } from "next";
import WhyEstabizzEditor from "./WhyEstabizzEditor";

export const metadata: Metadata = {
  title: "Edit Why Estabizz — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function WhyEstabizzEditorPage() {
  return <WhyEstabizzEditor />;
}
