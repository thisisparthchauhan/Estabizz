import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "GST Appeal Services India: Complete Guide to Avoid Costly Tax Errors",
    description: "Complete guide and compliance information.",
    keywords: "GST Appeal Services India",
    alternates: { canonical: "/services/gst-appeal-services" }
};

export default function Page() {
    return <PageClient />;
}
