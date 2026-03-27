import type { Metadata } from 'next';
import NBFCBusinessPlanClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Business Plan Preparation – RBI Registration & Investor Ready | Estabizz Fintech",
    description: "Professional NBFC business plan preparation for RBI Certificate of Registration and investor fundraising. Covers business model, credit policy, risk management, and 5-year financial projections.",
    keywords: "NBFC business plan, NBFC business plan RBI registration, NBFC business plan preparation India, NBFC registration business plan format, fintech NBFC business plan",
    alternates: {
        canonical: "/services/nbfc-business-plan",
    },
};

export default function Page() {
    return <NBFCBusinessPlanClient />;
}
