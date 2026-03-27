import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Collective Investment Scheme in India – Complete Powerful & Critical SEBI Compliance Guide",
    description: "Collective Investment Scheme in India explained with SEBI regulations, eligibility, process, compliance, and risks. Complete professional guide.",
    keywords: "Collective Investment Scheme in India",
    alternates: { canonical: "/sebi/collective-investment-schemes" }
};

export default function Page() {
    return <PageClient />;
}
