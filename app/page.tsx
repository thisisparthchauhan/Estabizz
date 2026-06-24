import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import GlobalMarketsSection from "@/components/home/GlobalMarketsSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import RegulatoryServices from "@/components/home/RegulatorySevices";
import ProcessSection from "@/components/home/ProcessSection";
import CaseStudies from "@/components/home/CaseStudies";
import CompliancePortal from "@/components/home/CompliancePortal";
import Testimonials from "@/components/home/Testimonials";
import ContentFrameworkSection from "@/components/home/ContentFrameworkSection";
import ResourcesSection from "@/components/home/ResourcesSection";
import FinalCTA from "@/components/home/FinalCTA";
import StatsSection from "@/components/home/StatsSection";
import FeaturedBlogs from "@/components/home/FeaturedBlogs";
import { getContent } from "@/lib/content/getContent";
import type { HeroContent } from "@/lib/content/heroDefaults";

export const metadata: Metadata = {
    title: "Estabizz Fintech Private Limited | India's Fintech Compliance Platform",
    description: "Premium regulatory advisory and compliance support for RBI, SEBI, IRDAI, IFSCA, FIU-IND, MCA and sectoral licences. Licensing, documentation, compliance portal and post-registration support.",
    keywords: "Estabizz Fintech, fintech compliance India, RBI licensing, SEBI registration, IRDAI licence, IFSCA GIFT City, FIU IND AML compliance, regulatory advisory India",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Estabizz Fintech | India's Fintech Compliance Platform",
        description: "We Secure Your Licence. You Secure Your Future. Regulatory advisory for RBI, SEBI, IRDAI, IFSCA and allied frameworks.",
        url: "https://estabizz-site.vercel.app/",
        type: "website"
    }
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estabizz Fintech Private Limited",
    url: "https://estabizz-site.vercel.app/",
    email: "info@estabizz.com",
    telephone: "+91 98256 00907",
    address: {
        "@type": "PostalAddress",
        streetAddress: "15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj",
        addressLocality: "Gandhinagar",
        addressRegion: "Gujarat",
        postalCode: "382421",
        addressCountry: "IN"
    },
    slogan: "We Comply. We Simplify.",
    sameAs: [
        "https://www.linkedin.com/company/estabizz-fintech/",
        "https://www.instagram.com/estabizzlegal/"
    ]
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Estabizz Fintech",
    url: "https://estabizz-site.vercel.app/",
    potentialAction: {
        "@type": "SearchAction",
        target: "https://estabizz-site.vercel.app/?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

export default async function Home() {
    const heroContent = (await getContent("homepage.hero")) as Partial<HeroContent>;
    return (
        <div className="bg-transparent min-h-screen font-sans text-gray-800">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

            <main>
                <HeroSection content={heroContent} />
                <StatsSection />
                <TrustedBy />
                <GlobalMarketsSection />
                <SolutionsSection />
                <WhyChooseUs />
                <RegulatoryServices />
                <ProcessSection />
                <CaseStudies />
                <CompliancePortal />
                <Testimonials />
                <FeaturedBlogs />
                <ContentFrameworkSection />
                <ResourcesSection />
                <FinalCTA />
            </main>
        </div>
    );
}
