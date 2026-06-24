import type { Metadata } from "next";
import NavigationClient from "./NavigationClient";

export const metadata: Metadata = {
  title: "Navigation — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default function NavigationPage() {
  return <NavigationClient />;
}
