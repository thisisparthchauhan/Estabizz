import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Insurance Broker Registration in India – Complete & Powerful IRDAI Licensing Guide",
    description: "Insurance Broker Registration in India explained in detail as per IRDAI (Insurance Brokers) Regulations, 2018. Know eligibility, capital requirement, fees, process, compliance and penalties.",
    keywords: "Insurance Broker Registration in India, IRDAI Insurance Brokers Regulations 2018, Direct Broker Licence, Reinsurance Broker, Composite Broker",
    alternates: { canonical: "/irdai/insurance-broker-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
