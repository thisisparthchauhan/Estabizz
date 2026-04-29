import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA Aircraft Leasing Registration – Complete GIFT City Aircraft Lessor Setup Guide",
    description: "IFSCA Aircraft Leasing Registration explained under the Framework for Aircraft Lease in IFSC. Learn eligibility, USD 200,000 and USD 3 million capital requirements, operating lease, financial lease, registration process, compliance and GIFT City benefits.",
    keywords: "IFSCA Aircraft Leasing Registration, Aircraft Leasing in IFSC, Aircraft Lessor Registration, Aircraft Leasing GIFT City, Aircraft Operating Lease IFSC, Aircraft Financial Lease IFSC",
    alternates: { canonical: "/ifsca/aircraft-leasing-registration-in-ifsc" },
    openGraph: {
        title: "IFSCA Aircraft Leasing Registration – Complete GIFT City Aircraft Lessor Setup Guide",
        description: "IFSCA Aircraft Leasing Registration in GIFT IFSC with operating lease, financial lease, USD 200,000 and USD 3 million capital, SWITS process and compliance.",
        url: "/ifsca/aircraft-leasing-registration-in-ifsc",
        type: "article"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "What is IFSCA Aircraft Leasing Registration?", acceptedAnswer: { "@type": "Answer", text: "IFSCA Aircraft Leasing Registration refers to registration with IFSCA as a Finance Company or Finance Unit for undertaking aircraft leasing activities in IFSC under the Framework for Aircraft Lease." } },
        { "@type": "Question", name: "Who regulates aircraft leasing in GIFT IFSC?", acceptedAnswer: { "@type": "Answer", text: "Aircraft leasing in GIFT IFSC is regulated by the International Financial Services Centres Authority." } },
        { "@type": "Question", name: "What is the capital requirement for aircraft operating lease?", acceptedAnswer: { "@type": "Answer", text: "A minimum owned fund of USD 200,000 or equivalent in freely convertible foreign currency must be maintained at all times." } },
        { "@type": "Question", name: "What is the capital requirement for aircraft financial lease?", acceptedAnswer: { "@type": "Answer", text: "A minimum owned fund of USD 3 million or equivalent in freely convertible foreign currency must be maintained at all times." } },
        { "@type": "Question", name: "Can the lessor start business before registration?", acceptedAnswer: { "@type": "Answer", text: "No. The applicant cannot undertake permissible activities as a Lessor unless it has obtained a Certificate of Registration from IFSCA." } }
    ]
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IFSCA Aircraft Leasing Registration",
    serviceType: "GIFT IFSC Aircraft Lessor Registration Advisory",
    provider: {
        "@type": "Organization",
        name: "Estabizz Fintech Private Limited",
        url: "https://estabizz-site.vercel.app/"
    },
    areaServed: "India",
    description: "Professional support for setting up an aircraft leasing entity in GIFT IFSC, including operating lease, financial lease, hybrid lease, capital readiness, SWITS application, business plan, documentation and post-registration compliance."
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
        { "@type": "ListItem", position: 2, name: "IFSCA Services", item: "https://estabizz-site.vercel.app/ifsca" },
        { "@type": "ListItem", position: 3, name: "IFSCA Aircraft Leasing Registration", item: "https://estabizz-site.vercel.app/ifsca/aircraft-leasing-registration-in-ifsc" }
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
