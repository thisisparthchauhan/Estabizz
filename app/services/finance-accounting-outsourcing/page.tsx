import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "( Optimised ) Finance and Accounting Outsourcing Services: 7 Powerful Benefits Every Business Must Know Permalink (",
    description: "Complete guide and compliance information.",
    keywords: "Finance and Accounting Outsourcing Services",
    alternates: { canonical: "/services/finance-accounting-outsourcing" }
};

export default function Page() {
    return <PageClient />;
}
