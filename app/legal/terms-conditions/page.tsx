import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "( Optimised ) Terms and Conditions for Website: 10 Powerful Legal Clauses Every Business Must Know 🔗 Permalink (",
    description: "Complete guide and compliance information.",
    keywords: "Terms and Conditions for Website",
    alternates: { canonical: "/legal/terms-conditions" }
};

export default function Page() {
    return <PageClient />;
}
