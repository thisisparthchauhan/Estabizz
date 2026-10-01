import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/divorce-marriage-consulting';

export const metadata: Metadata = {
    title: "Divorce and Marriage Consulting: Choosing the Right Route",
    description: "Divorce and marriage consulting in India — identifying which personal law governs your marriage, choosing between mutual consent divorce, contested divorce, judicial separation, annulment and nullity, the Section 13B two-motion process and cooling-off waiver, maintenance, custody, settlement drafting and marriage registration.",
    keywords: "Divorce and marriage consulting, mutual consent divorce Section 13B, cooling off period waiver Amardeep Singh, judicial separation vs divorce, annulment void voidable marriage, marriage registration India, maintenance BNSS Section 144, child custody, family law advisory, settlement deed",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Divorce and Marriage Consulting — Choosing the Right Route",
        description: "Which law governs your marriage, which remedy fits your situation, and what each route actually costs in time — decided before anything is filed.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
