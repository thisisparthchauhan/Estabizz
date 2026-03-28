import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Trademark Search India: Essential Tips to Avoid Costly Trademark Mistakes",
    description: "Complete guide and compliance information.",
    keywords: "Trademark Search India",
    alternates: { canonical: "/services/trademark-search" }
};

export default function Page() {
    return <PageClient />;
}
