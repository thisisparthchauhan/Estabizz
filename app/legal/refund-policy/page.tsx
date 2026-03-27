import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Refund Policy for Professional Services: Clear & Powerful Rules You Must Know Permalink (",
    description: "Complete guide and compliance information.",
    keywords: "Refund Policy for Professional Services",
    alternates: { canonical: "/legal/refund-policy" }
};

export default function Page() {
    return <PageClient />;
}
