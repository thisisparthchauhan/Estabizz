import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/appeal-before-high-court';

export const metadata: Metadata = {
    title: "Appeal Before High Court: Legal Support for Challenging Criminal Judgments",
    description: "Appeal Before High Court services for criminal conviction appeals, acquittal appeals, sentence suspension, bail pending appeal and legal drafting under BNS, BNSS and BSA.",
    keywords: "Appeal Before High Court, High Court criminal appeal, BNSS Chapter XXXI appeals, BNSS Section 415, suspension of sentence, bail pending appeal, acquittal appeal, victim appeal BNSS, grounds of appeal drafting",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Appeal Before High Court — Criminal Appeal Support under BNS, BNSS and BSA",
        description: "Maintainability, limitation, grounds of appeal, suspension of sentence, bail pending appeal and counsel coordination for High Court criminal appeals.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
