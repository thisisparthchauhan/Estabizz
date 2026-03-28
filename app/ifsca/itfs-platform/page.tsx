import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA ITFS Platform: International Trade Finance Services in GIFT IFSC — Registration, Activities & Guidelines",
    description: "Complete guide to IFSCA International Trade Finance Services (ITFS) Platform — registration, permissible activities (factoring, forfaiting, supply chain finance), participants, capital requirements, and compliance in GIFT IFSC.",
    keywords: "IFSCA ITFS, International Trade Finance Services, GIFT IFSC, Trade Finance Platform, Factoring, Forfaiting, Supply Chain Finance, ITFS Registration",
    alternates: { canonical: "/ifsca/itfs-platform" }
};

export default function Page() {
    return <PageClient />;
}
