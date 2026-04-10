import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: "About Us – Estabizz Fintech | India's Trusted Regulatory Advisory Firm",
    description: "Learn about Estabizz Fintech – a leading regulatory compliance advisory firm serving 500+ businesses across RBI, SEBI, IRDAI, IFSCA, and FEMA domains since 2014.",
    keywords: "Estabizz, About Estabizz, Regulatory Advisory, Compliance Firm India",
    alternates: { canonical: "/about" }
};

export default function Page() {
    return <AboutClient />;
}
