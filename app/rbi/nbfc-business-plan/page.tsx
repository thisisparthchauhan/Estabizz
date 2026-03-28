import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Business Plan: Steps for Successful RBI Approval in India",
    description: "Complete guide and compliance information.",
    keywords: "NBFC Business Plan",
    alternates: { canonical: "/rbi/nbfc-business-plan" }
};

export default function Page() {
    return <PageClient />;
}
