import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Reinsurance Broker Registration in India – Complete Strategic & Regulatory Guide",
    description: "Reinsurance Broker Registration in India – detailed eligibility, capital requirement, IRDAI fees, step-by-step process, compliance obligations, inspection powers and penalties under IRDAI Insurance Brokers Regulations, 2018.",
    keywords: "Reinsurance Broker Registration in India, IRDAI Reinsurance Broker, Treaty Reinsurance, Facultative Reinsurance, IRDAI Insurance Brokers Regulations 2018",
    alternates: { canonical: "/irdai/reinsurance-broker-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
