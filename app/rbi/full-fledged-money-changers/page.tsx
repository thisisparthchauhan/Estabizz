import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Full Fledged Money Changer License: Complete Guide to FFMC Registration in India",
    description: "Full Fledged Money Changer License in India – understand RBI approval process, eligibility, documents, compliance, fees, and step-by-step FFMC registration guide.",
    keywords: "Full Fledged Money Changer License",
    alternates: { canonical: "/rbi/full-fledged-money-changers" }
};

export default function Page() {
    return <PageClient />;
}
