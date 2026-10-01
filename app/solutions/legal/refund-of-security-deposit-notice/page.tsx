import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/refund-of-security-deposit-notice';

export const metadata: Metadata = {
    title: "Refund of Security Deposit Notice: Recovering a Deposit",
    description: "Recovering a withheld security deposit — rental, commercial lease, employee and vendor or franchise deposits. Why forfeiture needs proof of loss under Section 74, what counts as normal wear and tear, Model Tenancy Act deposit caps where adopted, why a landlord dispute is usually not a consumer complaint, and how to draft the demand.",
    keywords: "Refund of security deposit notice, landlord not returning security deposit, security deposit legal notice, Section 74 Contract Act forfeiture, Kailash Nath Associates, normal wear and tear deduction, Model Tenancy Act deposit cap, commercial lease deposit refund, employee security deposit, tenant not a consumer",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Refund of Security Deposit Notice",
        description: "A deposit is held as security, not earned. Forfeiture requires proof of loss — and wear and tear is not damage.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
