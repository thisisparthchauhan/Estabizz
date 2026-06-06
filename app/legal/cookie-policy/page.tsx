import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
    title: "Cookie Policy | Estabizz Fintech Private Limited",
    description: "Cookie Policy for Estabizz Fintech Private Limited explaining essential cookies, analytics, website performance tools and user choices.",
    alternates: { canonical: "/legal/cookie-policy" },
};

export default function Page() {
    return <PageClient />;
}
