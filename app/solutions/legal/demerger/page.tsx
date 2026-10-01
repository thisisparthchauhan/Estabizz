import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/demerger';

export const metadata: Metadata = {
    title: "Demerger: NCLT Scheme, Tax Neutrality and Approvals",
    description: "Demerger support in India — scheme of arrangement under Companies Act Sections 230 to 232, the two-motion NCLT process, tax neutrality under Section 2(19AA), valuation and share entitlement ratio, SEBI listed-entity process, the CCI deal value threshold, FEMA, stamp duty and post-demerger compliance.",
    keywords: "Demerger, scheme of arrangement, Companies Act Section 232, NCLT demerger, tax neutral demerger Section 2(19AA), Section 72A carry forward, share entitlement ratio, SEBI Regulation 37, CCI deal value threshold, FEMA NDI Rules, stamp duty on NCLT order, resulting company",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Demerger — NCLT Scheme, Tax Neutrality and Approvals",
        description: "Separating a business undertaking: structure choice, undertaking mapping, valuation, the NCLT route, tax conditions and the approvals that decide the timeline.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
