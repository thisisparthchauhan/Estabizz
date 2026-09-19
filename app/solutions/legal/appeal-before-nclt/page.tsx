import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/appeal-before-nclt';

export const metadata: Metadata = {
    title: "Appeal Before NCLT: Company Law and Insolvency Tribunal Support",
    description: "Appeal Before NCLT support for company petitions, struck-off company restoration under Section 252, oppression and mismanagement, IBC applications, mergers and demergers, plus appeals from NCLT orders to NCLAT.",
    keywords: "Appeal Before NCLT, NCLT petition, NCLAT appeal Section 421, struck off company restoration Section 252, Form NCLT-9, oppression and mismanagement Sections 241 242, IBC Section 7 9 10, CIRP withdrawal Section 12A, merger demerger Sections 230-232",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Appeal Before NCLT — Company Law and IBC Tribunal Support",
        description: "Forum and route assessment, petition drafting, restoration, insolvency applications, schemes and appeals from NCLT to NCLAT.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
