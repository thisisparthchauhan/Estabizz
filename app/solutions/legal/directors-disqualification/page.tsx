import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/directors-disqualification';

export const metadata: Metadata = {
    title: "Directors Disqualification: Section 164, DIN and DIR-10",
    description: "Directors Disqualification support in India — Section 164(2) disqualification for three years of non-filing, the Section 167(1)(a) proviso and which directorships actually vacate, DIN versus disqualification, DIR-8, DIR-9 and DIR-10 before the Regional Director, struck-off company revival under Section 252 and board regularisation.",
    keywords: "Directors Disqualification, Section 164(2) Companies Act, Section 167 vacation of office, DIR-10 Regional Director, DIR-8 DIR-9, DIN deactivation vs disqualification, DIR-3 KYC, struck off company revival Section 252, NCLT restoration, AOC-4 MGT-7 default, board regularisation",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Directors Disqualification — Section 164, DIN and DIR-10",
        description: "Diagnose the actual cause before filing anything: Section 164(2), the Section 167 proviso, DIN status, strike-off and the remedies that genuinely exist.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
