import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/court-proceedings';

export const metadata: Metadata = {
    title: "Court Proceedings: Forum, Filing, Evidence and Orders",
    description: "Court Proceedings support in India — choosing the correct forum, limitation, pleadings, interim relief, evidence under the Bharatiya Sakshya Adhiniyam, hearing preparation, order tracking, appeal routes and execution across civil, criminal, commercial, family, writ and tribunal matters.",
    keywords: "Court Proceedings, litigation support India, jurisdiction and forum, limitation, pleadings drafting, interim relief injunction stay, evidence Bharatiya Sakshya Adhiniyam, writ petition, tribunal proceedings, execution of decree, e-Courts tracking",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Court Proceedings — Forum, Filing, Evidence and Orders",
        description: "The process behind a court case: forum, limitation, pleadings, interim relief, evidence, hearings, orders, appeals and execution.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
