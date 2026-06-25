import type { Metadata } from "next";
import HomepageSeoEditor from "./HomepageSeoEditor";

export const metadata: Metadata = {
  title: "Edit Homepage SEO — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function HomepageSeoEditorPage() {
  return <HomepageSeoEditor />;
}
