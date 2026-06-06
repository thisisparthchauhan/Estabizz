import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Privacy Policy | Estabizz Fintech Private Limited",
    description: "Privacy Policy for Estabizz Fintech Private Limited covering website data, lead forms, WhatsApp consent, communication records, cookies, data sharing, retention and grievance contact.",
    alternates: { canonical: "/legal/privacy-policy" }
};

export default function Page() {
    return <PageClient />;
}
