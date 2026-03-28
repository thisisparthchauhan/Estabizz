import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "PSP License IFSCA: Payment Service Provider Authorisation in GIFT IFSC — Eligibility, Capital & Compliance",
    description: "Complete guide to PSP License IFSCA — Payment Service Provider authorisation under IFSCA (Payment Services) Regulations 2024. Eligibility, capital requirements, safeguarding norms, escrow, fees, AML compliance and registration process in GIFT IFSC.",
    keywords: "PSP License IFSCA, Payment Service Provider, GIFT IFSC, IFSCA Payment Services, E-Money, Cross-Border Remittance, Escrow, Merchant Acquisition, PSP Registration",
    alternates: { canonical: "/ifsca/psp-license" }
};

export default function Page() {
    return <PageClient />;
}
