import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Financial Modelling: Insights for Smart & Compliant Growth",
    description: "Complete guide and compliance information.",
    keywords: "NBFC Financial Modelling",
    alternates: { canonical: "/rbi/nbfc-financial-modeling" }
};

export default function Page() {
    return <PageClient />;
}
