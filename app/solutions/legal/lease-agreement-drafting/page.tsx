import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/lease-agreement-drafting';

export const metadata: Metadata = {
    title: "Lease Agreement Drafting: Registration, Notice and Clauses",
    description: "Lease agreement drafting in India — Transfer of Property Act Sections 105 to 117, when a lease must be registered under Section 107 and Registration Act Section 17, the Section 106 notice periods of fifteen days and six months, lock-in and security deposit, rent control and the Model Tenancy Act, and the clauses that decide disputes.",
    keywords: "Lease Agreement Drafting, rent agreement, Transfer of Property Act Section 106 notice, Section 107 registered lease, Registration Act Section 17 lease, eleven month agreement, lock-in period, security deposit clause, commercial lease, Model Tenancy Act 2021, leave and licence",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Lease Agreement Drafting — Registration, Notice and Clauses",
        description: "Why the eleven-month agreement exists, what the statutory notice periods actually are, and the clauses that decide every lease dispute.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
