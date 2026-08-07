import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Terms & Conditions | Estabizz Fintech Private Limited",
    description: "Terms and Conditions of Estabizz Fintech Private Limited covering website use, service information, user responsibilities and related policies.",
    keywords: "Estabizz terms and conditions, website terms, legal terms, service terms",
    alternates: { canonical: "/legal/terms-conditions" }
};

export default function Page() {
    return <PageClient />;
}
