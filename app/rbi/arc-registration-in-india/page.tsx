import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "ARC Registration in India – Complete & Authoritative RBI Compliance Framework 2025",
    description: "ARC Registration in India explained under RBI Master Direction 2024. Detailed guide covering ₹300 crore NOF, capital adequacy, governance norms, securitisation rules, registration process, compliance and penalties.",
    keywords: "ARC Registration in India, Asset Reconstruction Company, SARFAESI Act 2002, RBI Master Direction 2024, Net Owned Fund 300 crore, Security Receipts, Securitisation",
    alternates: { canonical: "/rbi/arc-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
