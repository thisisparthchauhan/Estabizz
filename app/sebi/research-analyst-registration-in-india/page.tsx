import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'Research Analyst Registration in India – Complete & Critical SEBI Compliance Guide',
    description: 'Research Analyst Registration in India under SEBI Regulations explained in detail. Learn eligibility, qualification, NISM certification, net worth, Form A, documents, process, fees, compliance, disclosures and penalties.',
    keywords: 'Research Analyst Registration in India, SEBI Research Analyst Registration, Research Analyst License, SEBI RA Registration, Stock Research Analyst Registration, Equity Research Analyst Registration, Research Entity Registration, YouTube Stock Recommendation SEBI Registration, Telegram Stock Tips SEBI Registration',
    alternates: { canonical: '/sebi/research-analyst-registration-in-india' },
    openGraph: {
        title: 'Research Analyst Registration in India – Complete & Critical SEBI Compliance Guide',
        description: 'SEBI Research Analyst Registration guide covering eligibility, qualification, NISM certification, net worth, Form A, fees, disclosures, conflicts and compliance.',
        url: '/sebi/research-analyst-registration-in-india',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is Research Analyst Registration in India?', acceptedAnswer: { '@type': 'Answer', text: 'Research Analyst Registration in India is SEBI registration required for persons or entities issuing securities research reports, investment recommendations or analysis relating to listed or proposed-to-be-listed securities.' } },
        { '@type': 'Question', name: 'Is Research Analyst Registration mandatory?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Any person acting as Research Analyst or holding itself out as Research Analyst must obtain SEBI registration unless specifically exempt.' } },
        { '@type': 'Question', name: 'Can an individual apply for Research Analyst Registration?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, an individual can apply if qualification, certification, net worth and fit and proper requirements are met.' } },
        { '@type': 'Question', name: 'Is NISM certification mandatory?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. NISM Research Analyst certification is mandatory.' } },
        { '@type': 'Question', name: 'Can Research Analyst manage client funds?', acceptedAnswer: { '@type': 'Answer', text: 'No. Client fund management requires separate PMS registration where applicable.' } },
        { '@type': 'Question', name: 'Can Research Analyst guarantee returns?', acceptedAnswer: { '@type': 'Answer', text: 'No. Guaranteeing returns is prohibited.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Research Analyst Registration in India',
    serviceType: 'SEBI Research Analyst Registration Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for SEBI Research Analyst Registration covering individual, company, LLP and research entity applications, NISM certification mapping, net worth documentation, Form A filing, research disclosure framework and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'SEBI Services', item: 'https://estabizz-site.vercel.app/sebi' },
        { '@type': 'ListItem', position: 3, name: 'Research Analyst Registration in India', item: 'https://estabizz-site.vercel.app/sebi/research-analyst-registration-in-india' }
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
