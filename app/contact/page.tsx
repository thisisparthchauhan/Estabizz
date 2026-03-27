import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: "Contact Us – Book Free Consultation | Estabizz Fintech",
    description: "Contact Estabizz Fintech for expert regulatory compliance guidance. Book a free consultation for NBFC registration, SEBI services, IRDAI licensing, FEMA compliance and more.",
    keywords: "Contact Estabizz, Book Consultation, NBFC Registration Help, Regulatory Compliance India",
    alternates: { canonical: "/contact" }
};

export default function Page() {
    return <ContactClient />;
}
