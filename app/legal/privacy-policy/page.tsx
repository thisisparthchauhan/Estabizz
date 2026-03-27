import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Privacy Policy for Businesses: 10 Powerful Legal Rules You Must Follow in India 🔗 Permalink (",
    description: "Complete guide and compliance information.",
    keywords: "Privacy Policy for Businesses",
    alternates: { canonical: "/legal/privacy-policy" }
};

export default function Page() {
    return <PageClient />;
}
