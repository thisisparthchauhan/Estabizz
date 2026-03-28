import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA Finance Company Registration in GIFT IFSC: Regulations, Activities & Compliance Guide",
    description: "Complete guide to IFSCA Finance Company & Finance Unit registration — FC Regulations 2021, core & non-core activities, GRCTC, factoring, capital requirements, fees and compliance in GIFT IFSC.",
    keywords: "IFSCA Finance Company, Finance Unit GIFT IFSC, FC Regulations 2021, GRCTC, Factoring IFSC, Finance Company Registration",
    alternates: { canonical: "/ifsca/finance-company" }
};

export default function Page() {
    return <PageClient />;
}
