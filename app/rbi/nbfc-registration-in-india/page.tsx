import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Registration in India – Complete and Authoritative RBI Approval Guide (2025)",
    description: "NBFC Registration in India explained as per RBI Master Direction dated July 17, 2025. Detailed eligibility, ₹10 Crore NOF, COSMOS portal process, documents, Scale Based Regulation, compliance and penalties guide.",
    keywords: "NBFC Registration in India, RBI NBFC License, Section 45-IA RBI Act, NBFC-ICC, Base Layer NBFC, Net Owned Fund 10 Crore, RBI COSMOS, Scale Based Regulation, NBFC Master Direction 2023",
    alternates: { canonical: "/rbi/nbfc-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
