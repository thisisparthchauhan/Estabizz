import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/domestic-violence-legal-services';

export const metadata: Metadata = {
    title: "Domestic Violence: Protection, Residence and Relief",
    description: "Domestic Violence legal support in India — protection orders, residence rights in a shared household, monetary relief, custody and compensation under the PWDVA, 2005, interim and ex parte orders, breach of a protection order under Section 31, criminal cruelty under BNS Section 85, evidence and defence support.",
    keywords: "Domestic Violence, PWDVA 2005, protection order Section 18, residence order Section 19, monetary relief Section 20, shared household, Section 31 breach of protection order, BNS Section 85 cruelty, Protection Officer, interim ex parte order, domestic violence defence",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Domestic Violence — Protection, Residence and Relief",
        description: "The reliefs available under the PWDVA, how quickly they can be obtained, what happens when an order is breached, and how the criminal route differs.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
