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
import type { StatsContent } from "@/lib/content/statsDefaults";
import type { TrustedByContent } from "@/lib/content/trustedByDefaults";
import type { SolutionsContent } from "@/lib/content/solutionsDefaults";
import type { GlobalMarketsContent } from "@/lib/content/globalMarketsDefaults";
import type { WhyEstabizzContent } from "@/lib/content/whyEstabizzDefaults";
import type { FinalCtaContent } from "@/lib/content/finalCtaDefaults";
import type { RegulatoryServicesContent } from "@/lib/content/regulatoryServicesDefaults";
import type { ProcessContent } from "@/lib/content/processDefaults";
import type { CompliancePortalContent } from "@/lib/content/compliancePortalDefaults";
import type { CaseStudiesContent } from "@/lib/content/caseStudiesDefaults";
import type { TestimonialsContent } from "@/lib/content/testimonialsDefaults";
import type { ContentFrameworkContent } from "@/lib/content/contentFrameworkDefaults";
import type { ResourcesContent } from "@/lib/content/resourcesDefaults";
import { SEO_HOMEPAGE_DEFAULTS, type SeoContent } from "@/lib/content/seoDefaults";
import { buildPageMetadata } from "@/lib/seo/pageMetadata";

// Homepage SEO is managed from Admin → Website Editor → Homepage → SEO Settings.
// Built from CMS content with safe fallbacks; the homepage route always stays "/".
export async function generateMetadata(): Promise<Metadata> {
    const seo = (await getContent("seo.homepage")) as Partial<SeoContent>;
    return buildPageMetadata(seo, SEO_HOMEPAGE_DEFAULTS, "/");
}

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estabizz Fintech Private Limited",
    url: "https://www.estabizz.com/",
    logo: "https://www.estabizz.com/estabizz-logo.png",
    email: "support@estabizz.com",
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

// No SearchAction: the site does not expose a public search endpoint.
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Estabizz Fintech Private Limited",
    url: "https://www.estabizz.com/",
};


export default async function Home() {
    const [
        heroContent, statsContent, trustedByContent, solutionsContent,
        globalMarketsContent, whyChooseUsContent, finalCtaContent,
        regulatoryServicesContent, processContent, compliancePortalContent,
        caseStudiesContent, testimonialsContent, contentFrameworkContent, resourcesContent,
    ] = (await Promise.all([
        getContent("homepage.hero"),
        getContent("homepage.stats"),
        getContent("homepage.trustedBy"),
        getContent("homepage.solutions"),
        getContent("homepage.globalMarkets"),
        getContent("homepage.whyChooseUs"),
        getContent("homepage.finalCta"),
        getContent("homepage.regulatoryServices"),
        getContent("homepage.process"),
        getContent("homepage.compliancePortal"),
        getContent("homepage.caseStudies"),
        getContent("homepage.testimonials"),
        getContent("homepage.contentFramework"),
        getContent("homepage.resources"),
    ])) as [
        Partial<HeroContent>, Partial<StatsContent>, Partial<TrustedByContent>, Partial<SolutionsContent>,
        Partial<GlobalMarketsContent>, Partial<WhyEstabizzContent>, Partial<FinalCtaContent>,
        Partial<RegulatoryServicesContent>, Partial<ProcessContent>, Partial<CompliancePortalContent>,
        Partial<CaseStudiesContent>, Partial<TestimonialsContent>, Partial<ContentFrameworkContent>, Partial<ResourcesContent>,
    ];

    // Privacy: strip non-public items on the SERVER so confidential/internal
    // content is never serialized into the page sent to the browser.
    const safeTestimonials: Partial<TestimonialsContent> = {
        ...testimonialsContent,
        testimonials: (testimonialsContent.testimonials ?? []).filter(
            (t) => t.consent === "consent_received" && t.visible
        ),
    };
    const safeCaseStudies: Partial<CaseStudiesContent> = {
        ...caseStudiesContent,
        cases: (caseStudiesContent.cases ?? []).filter((cs) => cs.visible !== false),
    };
    return (
        <div className="bg-transparent min-h-screen font-sans text-gray-800">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

            <main>
                <HeroSection content={heroContent} />
                <StatsSection content={statsContent} />
                <TrustedBy content={trustedByContent} />
                <GlobalMarketsSection content={globalMarketsContent} />
                <SolutionsSection content={solutionsContent} />
                <WhyChooseUs content={whyChooseUsContent} />
                <RegulatoryServices content={regulatoryServicesContent} />
                <ProcessSection content={processContent} />
                <CaseStudies content={safeCaseStudies} />
                <CompliancePortal content={compliancePortalContent} />
                <Testimonials content={safeTestimonials} />
                <FeaturedBlogs />
                <ContentFrameworkSection content={contentFrameworkContent} />
                <ResourcesSection content={resourcesContent} />
                <FinalCTA content={finalCtaContent} />
            </main>
        </div>
    );
}
