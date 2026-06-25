import type { Metadata } from "next";
import GlobalMarketsEditor from "./GlobalMarketsEditor";

export const metadata: Metadata = {
  title: "Edit Global Market Desk — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function GlobalMarketsEditorPage() {
  return <GlobalMarketsEditor />;
}
