import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/faulty-product-notice';

export const metadata: Metadata = {
    title: "Faulty Product Notice: Refund, Replacement and Liability",
    description: "Faulty Product Notice support in India — legal notice for defective goods, warranty denial and unsafe products, product liability under Consumer Protection Act Sections 82 to 87, e-commerce platform escalation, the two-year limitation under Section 69, and preparing a consumer complaint that succeeds.",
    keywords: "Faulty Product Notice, defective product legal notice, refund replacement demand, product liability Section 84, Consumer Protection Act 2019, warranty denial, e-commerce consumer complaint, Consumer Protection E-Commerce Rules 2020, two year limitation Section 69, CCPA recall",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Faulty Product Notice — Refund, Replacement and Liability",
        description: "What to demand and from whom, why product liability does not require proving negligence, and the two-year clock that runs while you chase the service centre.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
