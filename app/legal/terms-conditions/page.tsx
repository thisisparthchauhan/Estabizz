import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Terms and Conditions | Estabizz Fintech Private Limited",
    description: "Terms and Conditions for using the Estabizz Fintech website, service information, consultation links, intellectual property and legal limitations.",
    keywords: "Estabizz terms and conditions, Estabizz website terms, Estabizz legal terms",
    alternates: { canonical: "/legal/terms-conditions" }
};

export default function Page() {
    return <PageClient />;
}
