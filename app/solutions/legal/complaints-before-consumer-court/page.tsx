import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/complaints-before-consumer-court';

export const metadata: Metadata = {
    title: "Complaints Before Consumer Court: Forum, Limitation and Reliefs",
    description: "Complaints Before Consumer Court under the Consumer Protection Act, 2019 — pecuniary and territorial jurisdiction, limitation under Section 69, reliefs, e-Jagriti filing, evidence and complaint drafting for product, service, e-commerce, insurance, builder and medical disputes.",
    keywords: "Complaints Before Consumer Court, Consumer Protection Act 2019, District Commission 50 lakh, State Commission 2 crore, National Commission, Section 34 47 58, Section 69 limitation, e-Jagriti filing, deficiency in service, unfair trade practice, product liability",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Complaints Before Consumer Court — Forum, Limitation and Reliefs",
        description: "Which Commission hears your case, how limitation runs, what reliefs can be claimed, and what a complaint has to plead to survive.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
