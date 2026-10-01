import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/gift-deed-registration';

export const metadata: Metadata = {
    title: "Gift Deed Registration: Transfer of Property Act and Stamp Duty",
    description: "Gift Deed Registration in India — Transfer of Property Act Sections 122 to 129, the registered instrument and two-witness requirement under Section 123, acceptance during the donor's lifetime, why a gift revocable at will is void, stamp duty and concessional family rates, Section 56(2)(x) tax, mutation and Senior Citizens Act risk.",
    keywords: "Gift Deed Registration, Transfer of Property Act Section 123, Section 122 acceptance donor lifetime, Section 126 revocation void, gift deed stamp duty family, Registration Act Section 17, Section 56(2)(x) gift from relative, mutation after gift deed, Senior Citizens Act Section 23, NRI gift deed",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Gift Deed Registration — Transfer of Property Act and Stamp Duty",
        description: "What makes a gift of immovable property valid, the revocation clause that voids the whole gift, and the tax and mutation steps most people skip.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
