import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/divorce-notice';

export const metadata: Metadata = {
    title: "Divorce Notice: Drafting, Reply and Settlement Strategy",
    description: "Divorce Notice support in India, also called a legal notice for divorce — drafting and replying to a matrimonial legal notice, what a notice should and should not say, settlement and mutual divorce proposals, maintenance under BNSS Section 144, stridhan, custody, NRI service and Family Court strategy under the Hindu Marriage Act and Special Marriage Act.",
    keywords: "Divorce Notice, legal notice for divorce, reply to divorce notice, matrimonial legal notice, Hindu Marriage Act Section 13B, mutual divorce settlement, stridhan recovery notice, maintenance BNSS Section 144, child custody proposal, NRI divorce notice, Family Court strategy",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Divorce Notice — Drafting, Reply and Settlement Strategy",
        description: "A notice does not end a marriage, but it sets the record every later proceeding is read against. What to put in it, what to leave out, and how to reply to one.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
