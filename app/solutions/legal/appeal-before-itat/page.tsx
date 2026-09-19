import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/appeal-before-itat';

export const metadata: Metadata = {
    title: "Appeal Before ITAT: Tax Litigation Support for Income Tax Tribunal Appeals",
    description: "Appeal Before ITAT service in India — appealability, limitation, appeal form and e-filing with DSC, grounds of appeal, stay of demand, paper book, cross-objection, penalty appeals and Tribunal representation support.",
    keywords: "Appeal Before ITAT, Income Tax Appellate Tribunal appeal, Form 36 ITAT, Form 115 ITAT, Section 253, Section 254, stay of demand ITAT, cross objection Form 36A, ITAT paper book, ITAT e-filing DSC, Income-tax Act 2025",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Appeal Before ITAT — Income Tax Tribunal Appeal Support",
        description: "Appealability, limitation, the correct appeal form, stay of demand, paper book and hearing support for appeals before the Income Tax Appellate Tribunal.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
