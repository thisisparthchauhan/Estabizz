import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Refund Policy for Professional Services: Rules You Must Know",
    description: "Complete guide and compliance information.",
    keywords: "Refund Policy for Professional Services",
    alternates: { canonical: "/legal/refund-policy" }
};

export default function Page() {
    return <PageClient />;
}
