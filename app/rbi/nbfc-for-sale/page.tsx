import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC for Sale in India: Ultimate Guide to Buy NBFC Safely & Legally",
    description: "Complete guide and compliance information.",
    keywords: "NBFC for Sale in India",
    alternates: { canonical: "/rbi/nbfc-for-sale" }
};

export default function Page() {
    return <PageClient />;
}
