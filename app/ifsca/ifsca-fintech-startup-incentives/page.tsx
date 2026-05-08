import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'IFSCA FinTech and Startup Incentives – Complete Powerful Guide for GIFT IFSC FinTech Entity Authorization',
    description: 'IFSCA FinTech and Startup Incentives guide covering FinTech Entity Authorization, Limited Use Authorization, Sandbox, TechFin, startup grants, PoC Grant, Green FinTech Grant, Accelerator Grant and GIFT IFSC setup.',
    keywords: 'IFSCA FinTech and Startup Incentives, IFSCA FinTech Entity, FinTech Entity Framework, IFSCA Limited Use Authorization, IFSCA FinTech Sandbox, IFSCA Startup Incentives, FinTech Startup Grant, Proof of Concept Grant, Green FinTech Grant, Accelerator Grant',
    alternates: { canonical: '/ifsca/ifsca-fintech-startup-incentives' },
    openGraph: {
        title: 'IFSCA FinTech and Startup Incentives – Complete Powerful Guide for GIFT IFSC FinTech Entity Authorization',
        description: 'Guide to IFSCA FinTech Entity Authorization, sandbox routes, TechFin, startup grants, PoC Grant, Green FinTech Grant and GIFT IFSC setup.',
        url: '/ifsca/ifsca-fintech-startup-incentives',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What are IFSCA FinTech and Startup Incentives?', acceptedAnswer: { '@type': 'Answer', text: 'IFSCA FinTech and Startup Incentives include the FinTech Entity Framework for Authorization or Limited Use Authorization and the FinTech Incentive Scheme providing specific grants to eligible FinTech entities.' } },
        { '@type': 'Question', name: 'What is Authorization under IFSCA FinTech Framework?', acceptedAnswer: { '@type': 'Answer', text: 'Authorization is the direct entry route for mature FinTech or TechFin entities having a deployable solution and revenue earning track record in at least one of the last three financial years.' } },
        { '@type': 'Question', name: 'What is Limited Use Authorization?', acceptedAnswer: { '@type': 'Answer', text: 'Limited Use Authorization allows an entity to test its FinTech solution under the IFSCA sandbox framework with limited scope and conditions.' } },
        { '@type': 'Question', name: 'Is grant approval automatic?', acceptedAnswer: { '@type': 'Answer', text: 'No. Grant approval is subject to eligibility, evaluation, milestone conditions and IFSCA approval.' } },
        { '@type': 'Question', name: 'What is the maximum Green FinTech Grant?', acceptedAnswer: { '@type': 'Answer', text: 'Green FinTech Grant may provide support of up to Rs. 75 lakh, subject to eligibility, milestone achievement and IFSCA approval.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IFSCA FinTech and Startup Incentives',
    serviceType: 'GIFT IFSC FinTech Entity Authorization, Sandbox and Grant Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for IFSCA FinTech Entity Authorization, Limited Use Authorization, sandbox application, TechFin activity mapping, startup grants, PoC Grant, Green FinTech Grant, Accelerator Grant and GIFT IFSC setup.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'IFSCA Services', item: 'https://estabizz-site.vercel.app/ifsca' },
        { '@type': 'ListItem', position: 3, name: 'IFSCA FinTech and Startup Incentives', item: 'https://estabizz-site.vercel.app/ifsca/ifsca-fintech-startup-incentives' }
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
