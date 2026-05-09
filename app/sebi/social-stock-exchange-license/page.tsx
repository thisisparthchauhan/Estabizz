import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Social Stock Exchange License in India – Complete Powerful Guide for NGOs & Social Enterprises",
    description: "Social Stock Exchange License in India explained with SEBI eligibility, NPO and FPE criteria, ZCZP instruments, documents, process, timeline, compliance, impact reporting and fundraising benefits.",
    keywords: "Social Stock Exchange License in India, SEBI Social Stock Exchange, SSE NGO Listing, NPO SSE Registration, FPE Social Enterprise SSE, ZCZP Instrument, Zero Coupon Zero Principal, NSE Social Stock Exchange, BSE Social Stock Exchange, SEBI SSE Master Circular 2026, 67% Social Intent Test, 12A 80G NPO, Social Impact Reporting",
    alternates: { canonical: "/sebi/social-stock-exchange-license" },
    openGraph: {
        title: "Social Stock Exchange License in India – SEBI Guide for NGOs & Social Enterprises",
        description: "Complete SEBI Social Stock Exchange Master Circular (Jan 2026) and April 2026 update guide — NPO and FPE eligibility, ZCZP instruments, 67% social intent test, NSE/BSE SSE listing, impact reporting and 25 FAQs by Estabizz.",
        url: "/sebi/social-stock-exchange-license",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
