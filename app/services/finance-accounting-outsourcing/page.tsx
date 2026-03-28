import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Finance and Accounting Outsourcing Services: Key Benefits Every Business Must Know",
    description: "Complete guide and compliance information.",
    keywords: "Finance and Accounting Outsourcing Services",
    alternates: { canonical: "/services/finance-accounting-outsourcing" }
};

export default function Page() {
    return <PageClient />;
}
