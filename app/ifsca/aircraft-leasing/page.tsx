import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA Aircraft Leasing License: Complete Guide to Registration in GIFT IFSC",
    description: "IFSCA Aircraft Leasing License in GIFT IFSC – complete framework for aircraft operating lease, financial lease, eligibility, capital requirements, fees, permissible activities and compliance guide.",
    keywords: "IFSCA Aircraft Leasing, Aircraft Lease GIFT IFSC, IFSCA Finance Company, Aircraft Operating Lease, Aircraft Financial Lease",
    alternates: { canonical: "/ifsca/aircraft-leasing" }
};

export default function Page() {
    return <PageClient />;
}
