import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/property-registration';

export const metadata: Metadata = {
    title: "Property Registration: Deed, Stamp Duty and TDS",
    description: "Registering a sale, gift, lease, release or partition deed — compulsory registration under Section 17, the four-month presentation window, why a registered deed operates from execution under Section 47, TDS on property now under Section 393 of the Income-tax Act, 2025 with Form 141, mutation, and the pending Registration Bill.",
    keywords: "Property registration India, Registration Act 1908 section 17, section 23 four months, section 47 date of execution, section 49 non-registration, stamp duty circle rate, TDS on property section 393 Form 141, 194-IA replaced, Sub-Registrar process, mutation after registration, Registration Bill 2025",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Property Registration — Deed, Stamp Duty and TDS",
        description: "What must be registered, by when, at what duty, and the TDS step that moved to Form 141 under the Income-tax Act, 2025.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
