import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login – Estabizz Compliance Portal | Estabizz Fintech",
    description: "Log in to the Estabizz Compliance Hub to track licences, manage documents and monitor regulatory compliance across RBI, SEBI, IRDAI and IFSCA frameworks.",
    alternates: { canonical: "/login" },
    robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
