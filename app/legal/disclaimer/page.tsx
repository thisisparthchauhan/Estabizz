import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
    title: "Disclaimer | Estabizz Fintech Private Limited",
    description: "Website disclaimer for Estabizz Fintech Private Limited covering informational content, independent advisory status, no regulatory approval guarantee and limitation of liability.",
    alternates: { canonical: "/legal/disclaimer" },
};

export default function Page() {
    return <PageClient />;
}
