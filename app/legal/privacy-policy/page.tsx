import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Privacy Policy | Estabizz Fintech Private Limited",
    description: "Privacy Policy of Estabizz Fintech Private Limited explaining website data collection, use, storage, disclosure, user choices and official contact details.",
    keywords: "Estabizz Privacy Policy, Estabizz Fintech data policy, privacy policy India",
    alternates: { canonical: "/legal/privacy-policy" }
};

export default function Page() {
    return <PageClient />;
}
