import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/food-adulteration-legal-services';

export const metadata: Metadata = {
    title: "Food Adulteration: FSSAI Notices, Sample Disputes and Defence",
    description: "Food Adulteration legal support in India — FSS Act, 2006 compliance, unsafe and sub-standard food allegations, Food Safety Officer sampling and the referral laboratory right, improvement notices, licence suspension, prosecution defence, product recall, and the revised penalties following the Jan Vishwas Act, 2023.",
    keywords: "Food Adulteration, FSSAI notice reply, FSS Act 2006, unsafe food Section 59, sub-standard food Section 51, misbranded food Section 52, food sample referral laboratory, improvement notice Section 32, licence suspension, product recall Section 28, Jan Vishwas Act 2023 FSSAI penalties",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Food Adulteration — FSSAI Notices, Sample Disputes and Defence",
        description: "What the sample report actually means, the referral laboratory right that expires, and the penalties as revised from November 2023.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
