import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Terms and Conditions for Website: Essential Legal Clauses Every Business Must Know",
    description: "Complete guide and compliance information.",
    keywords: "Terms and Conditions for Website",
    alternates: { canonical: "/legal/terms-conditions" }
};

export default function Page() {
    return <PageClient />;
}
