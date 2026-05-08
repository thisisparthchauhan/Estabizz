import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Insurance Broker Registration in India – Complete & Powerful IRDAI Licensing Guide",
    description: "Insurance Broker Registration in India explained in detail as per IRDAI (Insurance Brokers) Regulations, 2018. Know eligibility, capital requirement, fees, process, compliance and penalties.",
    keywords: "Insurance Broker Registration in India, IRDAI Insurance Broker Registration, IRDAI Insurance Brokers Regulations 2018, Direct Broker Licence, Direct Insurance Broker, Reinsurance Broker, Composite Broker, Insurance Broking Licence India, Principal Officer IRDAI, Broker Qualified Persons, Professional Indemnity Insurance Broker, Statutory Deposit Insurance Broker",
    alternates: { canonical: "/irdai/insurance-broker-registration-in-india" },
    openGraph: {
        title: "Insurance Broker Registration in India – IRDAI Licensing Guide by Estabizz",
        description: "Complete IRDAI Insurance Broker Registration guide — Direct, Reinsurance and Composite Broker categories. Capital, net worth, statutory deposit, Principal Officer, business plan, fees, compliance calendar and 200+ FAQs.",
        url: "/irdai/insurance-broker-registration-in-india",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
