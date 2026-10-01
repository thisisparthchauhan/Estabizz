import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/defamation-notice';

export const metadata: Metadata = {
    title: "Defamation Notice: Takedown, Apology and Compensation",
    description: "Defamation Notice support in India — pre-litigation notice for false allegations, social media posts, fake reviews and damaging videos, demanding takedown, apology, retraction, evidence preservation and compensation, with IT Rules 2021 platform grievance escalation and reply drafting where a notice is received.",
    keywords: "Defamation Notice, legal notice for defamation, takedown notice India, fake Google review removal, social media defamation notice, apology and retraction demand, IT Rules 2021 grievance officer, reply to defamation notice, cease and desist, online content removal",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Defamation Notice — Takedown, Apology and Compensation",
        description: "What a notice should demand, what it should avoid, how the platform route runs alongside it, and how to reply if one arrives for you.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
