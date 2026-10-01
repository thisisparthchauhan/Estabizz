import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/motor-accident-claims-tribunal';

export const metadata: Metadata = {
    title: "Motor Accident Claims Tribunal: MACT Compensation Claims",
    description: "MACT compensation claims in India — the fault claim under Section 166 and the fixed compensation route under Section 164 after the 2019 amendment, the six-month limitation in Section 166(3) and the Supreme Court interim protection, hit-and-run and golden hour, the Detailed Accident Report, compensation heads, award execution and appeal.",
    keywords: "Motor Accident Claims Tribunal, MACT claim, Section 166 compensation, Section 164 fixed compensation, Section 166(3) six month limitation, Bhagirathi Dash Supreme Court, Detailed Accident Report DAR, hit and run Section 161, golden hour Section 162, disability compensation, Pranay Sethi future prospects",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Motor Accident Claims Tribunal — MACT Compensation Claims",
        description: "Which claim route fits, what the six-month limitation means right now, and how compensation is actually computed.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
