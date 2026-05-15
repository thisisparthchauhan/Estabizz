import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC SRO Registration – A Powerful & Transformative Governance Framework for the NBFC Sector",
    description: "NBFC SRO Registration explained in detail under RBI guidelines. Understand eligibility, capital requirements, application process, regulatory framework, governance obligations, compliance structure and benefits of becoming a Self-Regulatory Organisation for NBFCs.",
    keywords: "NBFC SRO Registration, Self-Regulatory Organisation NBFC, RBI SRO Framework, NBFC Industry Body, NBFC Governance, ₹2 Crore Net Worth SRO",
    alternates: { canonical: "/rbi/nbfc-sro-registration" },
    openGraph: {
        title: "NBFC SRO Registration – A Powerful & Transformative Governance Framework for the NBFC Sector",
        description: "NBFC SRO Registration explained under RBI guidelines with eligibility, ₹2 crore net worth, governance, application process and compliance obligations.",
        url: "/rbi/nbfc-sro-registration",
        type: "article"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "What is NBFC SRO Registration?", acceptedAnswer: { "@type": "Answer", text: "NBFC SRO Registration refers to recognition granted by the Reserve Bank of India to a Self-Regulatory Organisation representing Non-Banking Financial Companies." } },
        { "@type": "Question", name: "Is NBFC SRO Registration mandatory for all NBFCs?", acceptedAnswer: { "@type": "Answer", text: "No. NBFC SRO Registration is not mandatory for individual NBFCs. It applies to industry bodies or associations seeking recognition as a Self-Regulatory Organisation." } },
        { "@type": "Question", name: "What is the minimum net worth for NBFC SRO Registration?", acceptedAnswer: { "@type": "Answer", text: "The minimum net worth prescribed in the source framework is ₹2 crore, which must be maintained continuously." } },
        { "@type": "Question", name: "Does an NBFC SRO replace RBI supervision?", acceptedAnswer: { "@type": "Answer", text: "No. RBI remains the primary regulator. An SRO complements RBI supervision but does not replace RBI regulatory authority." } },
        { "@type": "Question", name: "Can RBI withdraw NBFC SRO recognition?", acceptedAnswer: { "@type": "Answer", text: "Yes. RBI may withdraw recognition if the SRO fails to comply with prescribed conditions." } }
    ]
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "NBFC SRO Registration",
    serviceType: "RBI Self-Regulatory Organisation Registration Advisory for NBFC Sector Bodies",
    provider: {
        "@type": "Organization",
        name: "Estabizz Fintech Private Limited",
        url: "https://estabizz-site.vercel.app/"
    },
    areaServed: "India",
    description: "Professional support for industry bodies and associations seeking RBI recognition as Self-Regulatory Organisations for NBFCs, including eligibility review, ₹2 crore net worth readiness, governance structuring, business plan, policy documentation and post-recognition compliance."
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
        { "@type": "ListItem", position: 2, name: "RBI Services", item: "https://estabizz-site.vercel.app/rbi" },
        { "@type": "ListItem", position: 3, name: "NBFC SRO Registration", item: "https://estabizz-site.vercel.app/rbi/nbfc-sro-registration" }
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
