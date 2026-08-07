import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Privacy Policy | Estabizz Fintech Private Limited",
    description: "Privacy Policy of Estabizz Fintech Private Limited covering collection, use, sharing, retention and protection of personal information.",
    keywords: "Estabizz privacy policy, personal information, data protection, privacy rights",
    alternates: { canonical: "/legal/privacy-policy" }
};

export default function Page() {
    return <PageClient />;
}
