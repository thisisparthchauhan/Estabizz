import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA TechFin Registration – Complete GIFT IFSC Authorization Guide for AI, RegTech, SupTech and Web 3.0 Firms",
    description: "IFSCA TechFin Registration guide covering TechFin authorization, Limited Use Authorization, sandbox entry, AI/ML, RegTech, SupTech, cybersecurity, blockchain, KYC/AML technology, grants and GIFT IFSC setup.",
    keywords: "IFSCA TechFin Registration, TechFin Authorization, TechFin GIFT IFSC, IFSCA FE Framework, Limited Use Authorization, IFSCA FinTech Sandbox, RegTech IFSCA, SupTech IFSCA, AI ML IFSCA, Blockchain IFSCA, Cybersecurity FinTech IFSCA, Web 3.0 IFSCA, IFSCA FinTech Incentive Scheme, ifsca-techfin-registration, techfin-registration-gift-ifsc",
    alternates: { canonical: "/ifsca/techfin" },
    openGraph: {
        title: "IFSCA TechFin Registration in GIFT IFSC – Authorization & Sandbox Guide",
        description: "Complete IFSCA TechFin Registration guide under the IFSCA FinTech Entity Framework. Direct Authorization, Limited Use Authorization, sandbox routes, grants up to INR 75 Lakhs and GIFT IFSC setup support by Estabizz.",
        url: "/ifsca/techfin",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
