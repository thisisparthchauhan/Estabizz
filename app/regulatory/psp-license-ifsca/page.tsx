import type { Metadata } from 'next';
import RegulatoryArticleClient from './RegulatoryArticleClient';

export const metadata: Metadata = {
    title: "PSP License – IFSCA: Complete Authorisation Guide with Critical Compliance Insights",
    description: "PSP License – IFSCA explained in detail. Understand eligibility, capital requirements, safeguarding norms, authorisation process, fees, compliance, and regulatory obligations under IFSCA (Payment Services) Regulations, 2024.",
    keywords: "PSP License IFSCA",
    alternates: {
        canonical: "/regulatory/psp-license-ifsca"
    }
};

export default function Page() {
    return <RegulatoryArticleClient />;
}
