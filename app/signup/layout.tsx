import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account – Estabizz Compliance Portal",
    description: "Create your secure Estabizz Compliance Hub account to track regulatory licences, upload documents and receive compliance alerts.",
    alternates: { canonical: "/signup" },
    robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
