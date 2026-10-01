import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/mutual-divorce';

export const metadata: Metadata = {
    title: "Mutual Divorce: Section 13B, Two Motions and Waiver",
    description: "Mutual consent divorce in India — Hindu Marriage Act Section 13B and Special Marriage Act Section 28, the first and second motion, the six to eighteen month interval and when a court will waive it, settlement terms on alimony, custody and stridhan, withdrawal of consent, NRI appearance and post-decree steps.",
    keywords: "Mutual Divorce, Section 13B Hindu Marriage Act, Special Marriage Act Section 28, first motion second motion, cooling off period waiver Amardeep Singh, mutual consent divorce settlement, alimony, child custody, withdrawal of consent, NRI mutual divorce",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Mutual Divorce — Section 13B, Two Motions and Waiver",
        description: "The fastest and least damaging way out of a marriage, and the two things that derail it: unresolved terms and withdrawn consent.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
