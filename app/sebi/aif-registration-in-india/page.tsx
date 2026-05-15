import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'AIF Registration in India – Complete & Powerful 2026 SEBI Compliance Guide',
    description: 'AIF Registration in India explained under SEBI AIF Regulations, 2012. Learn categories, corpus, sponsor contribution, PPM, Form A, fees, process, documents, compliance, AI-only schemes, LVF and SEBI approval requirements.',
    keywords: 'AIF Registration in India, SEBI AIF Registration, Alternative Investment Fund Registration, Category I AIF, Category II AIF, Category III AIF, Angel Fund Registration, Venture Capital Fund Registration, Private Equity Fund Registration, Hedge Fund Registration, AIF PPM Filing',
    alternates: { canonical: '/sebi/aif-registration-in-india' },
    openGraph: {
        title: 'AIF Registration in India – Complete & Powerful 2026 SEBI Compliance Guide',
        description: 'Premium SEBI AIF registration guide covering categories, PPM, Form A, corpus, sponsor contribution, fees, compliance calendar, AI-only schemes and LVF.',
        url: '/sebi/aif-registration-in-india',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is AIF Registration in India?', acceptedAnswer: { '@type': 'Answer', text: 'AIF Registration in India refers to obtaining approval from SEBI to operate a privately pooled investment vehicle under the SEBI AIF Regulations.' } },
        { '@type': 'Question', name: 'Is AIF Registration mandatory before raising funds?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Any entity intending to pool capital from investors under the AIF framework must obtain SEBI registration before fundraising.' } },
        { '@type': 'Question', name: 'What are the categories of AIF?', acceptedAnswer: { '@type': 'Answer', text: 'SEBI classifies AIFs into Category I, Category II and Category III.' } },
        { '@type': 'Question', name: 'Can an individual apply directly?', acceptedAnswer: { '@type': 'Answer', text: 'No. An individual cannot directly apply. The AIF must be structured as a legal entity.' } },
        { '@type': 'Question', name: 'Is PPM required?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A draft Private Placement Memorandum must be submitted.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AIF Registration in India',
    serviceType: 'SEBI Alternative Investment Fund Registration Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for SEBI AIF Registration covering Category I, Category II, Category III AIFs, fund structuring, sponsor contribution planning, PPM drafting, Form A filing, SEBI query response and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'SEBI Services', item: 'https://estabizz-site.vercel.app/sebi' },
        { '@type': 'ListItem', position: 3, name: 'AIF Registration in India', item: 'https://estabizz-site.vercel.app/sebi/aif-registration-in-india' }
    ]
};

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <PageClient />
        </>
    );
}
