import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "RTA Registration in India – Complete 2026 SEBI Master Circular Compliance Guide",
    description: "RTA Registration in India explained under SEBI RTA Regulations 2025 and Master Circular February 2026. Learn eligibility, ₹50 lakh net worth, Form A, documents, fees, investor portal, grievance resolution, cyber compliance, inspection and penalties.",
    keywords: "RTA Registration in India, SEBI RTA Registration, Registrar to an Issue, Share Transfer Agent, SEBI RTA Regulations 2025, SEBI Master Circular RTA 2026, Form A SEBI RTA, ₹50 Lakh Net Worth RTA, SEBI Cyber Security RTA, Investor Service Portal, SCORES Compliance, RTA License India",
    alternates: { canonical: "/sebi/rta-registration-in-india" },
    openGraph: {
        title: "RTA Registration in India – SEBI Master Circular 2026 Compliance Guide",
        description: "Complete SEBI RTA Registration guide under RTA Regulations 2025 and Master Circular dated 06 February 2026 — body corporate eligibility, ₹50 lakh net worth, Form A filing, investor service portal, cyber security, grievance resolution and 40+ FAQs by Estabizz.",
        url: "/sebi/rta-registration-in-india",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
