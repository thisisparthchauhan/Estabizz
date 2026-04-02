import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "TechFin Authorization IFSCA: Technology Solutions for Financial Institutions in GIFT IFSC — FE Framework 2022",
    description: "Complete guide to TechFin authorization under IFSCA FinTech Entity (FE) Framework 2022. Eligibility, permissible activities (AI/ML, Blockchain, RegTech, AgriTech, Cyber Security), sandbox entry, fees and incentive grants for TechFin entities in GIFT IFSC.",
    keywords: "TechFin IFSCA, TechFin GIFT IFSC, IFSCA FE Framework TechFin, TechFin Authorization, RegTech IFSCA, AI ML FinTech IFSC, Blockchain IFSCA, TechFin Sandbox GIFT City",
    alternates: { canonical: "/ifsca/techfin" }
};

export default function Page() {
    return <PageClient />;
}
