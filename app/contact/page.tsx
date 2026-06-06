import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: "Contact Us – Book Free Consultation | Estabizz Fintech",
    description: "Contact Estabizz Fintech Private Limited for RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND, fintech licensing, documentation and compliance advisory support.",
    keywords: "Contact Estabizz, Book Consultation, NBFC Registration Help, Regulatory Compliance India, SEBI Registration Support, IRDAI Licensing",
    alternates: { canonical: "/contact" }
};

export default function Page() {
    return <ContactClient />;
}
