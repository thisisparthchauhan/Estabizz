import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/judicial-separation';

export const metadata: Metadata = {
    title: "Judicial Separation: Section 10 Decree and What Follows",
    description: "Judicial Separation in India — Hindu Marriage Act Section 10 and Special Marriage Act Section 23, the grounds, what the decree changes and what it does not, maintenance and custody, rescission on reconciliation, and how a year without cohabitation becomes a ground for divorce under Section 13(1A)(i).",
    keywords: "Judicial Separation, Hindu Marriage Act Section 10, Special Marriage Act Section 23, judicial separation vs divorce, Section 13(1A)(i) divorce after judicial separation, rescission of decree, maintenance Section 24 25, separation agreement, Family Court petition",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Judicial Separation — Section 10 Decree and What Follows",
        description: "A decree that ends the duty to cohabit without ending the marriage — and, after a year, becomes a ground for divorce for either spouse.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
