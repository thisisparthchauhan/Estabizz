import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "ISNP Registration in India – Complete IRDAI Insurance E-Commerce Platform Guide",
    description: "ISNP Registration in India explained under IRDAI Insurance E-Commerce Guidelines. Learn eligibility, process, documents, platform certification, services permitted, compliance and digital insurance distribution requirements.",
    keywords: "ISNP Registration in India, IRDAI ISNP Registration, Insurance Self-Network Platform, IRDAI Insurance E-Commerce Guidelines 2017, ISNP Permission, Online Insurance Sales Platform, Insurance Digital Platform, IRDAI E-Commerce, Insurance Broker ISNP, Corporate Agent ISNP, Web Aggregator ISNP, eIA Facilitation, isnp-registration-in-india",
    alternates: { canonical: "/irdai/isnp-registration" },
    openGraph: {
        title: "ISNP Registration in India – IRDAI Insurance E-Commerce Platform Guide",
        description: "Complete IRDAI Insurance Self-Network Platform permission guide — eligibility, platform readiness, certification, eIA facilitation, KYC/AML, fees, compliance and 28 FAQs by Estabizz.",
        url: "/irdai/isnp-registration",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
