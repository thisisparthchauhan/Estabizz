import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "LendTech Services India: Compliance Guide for Digital Lending Success",
    description: "Complete guide and compliance information.",
    keywords: "LendTech Services India",
    alternates: { canonical: "/rbi/lendtech-services" }
};

export default function Page() {
    return <PageClient />;
}
