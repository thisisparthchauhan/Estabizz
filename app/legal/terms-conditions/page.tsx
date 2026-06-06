import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Terms of Use | Estabizz Fintech Private Limited",
    description: "Terms of Use for the Estabizz Fintech website covering website access, service enquiries, payments, no approval guarantee, intellectual property, liability and jurisdiction.",
    alternates: { canonical: "/legal/terms-conditions" }
};

export default function Page() {
    return <PageClient />;
}
