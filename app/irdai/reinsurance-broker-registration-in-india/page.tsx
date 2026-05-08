import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Reinsurance Broker Registration in India – Complete Strategic & Regulatory Guide",
    description: "Reinsurance Broker Registration in India explained under IRDAI Insurance Brokers Regulations, 2018. Learn eligibility, ₹4 crore capital, process, documents, fees, PI insurance, compliance, inspection powers and penalties.",
    keywords: "Reinsurance Broker Registration in India, IRDAI Reinsurance Broker Registration, Reinsurance Broker License, IRDAI Insurance Brokers Regulations 2018, Treaty Reinsurance Broker, Facultative Reinsurance Broker, Catastrophe Protection Advisory, ₹4 Crore Capital Reinsurance Broker, Principal Officer IRDAI, Professional Indemnity Reinsurance Broker, Reinsurance Intermediary Registration",
    alternates: { canonical: "/irdai/reinsurance-broker-registration-in-india" },
    openGraph: {
        title: "Reinsurance Broker Registration in India – IRDAI Regulatory Guide by Estabizz",
        description: "Complete IRDAI Reinsurance Broker Registration guide — treaty and facultative reinsurance, ₹4 Crore capital, Principal Officer, business plan, PI insurance, compliance calendar, fees and 50+ FAQs.",
        url: "/irdai/reinsurance-broker-registration-in-india",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
