"use client";
import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import SolutionsSection from "@/components/home/SolutionsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import RegulatoryServices from "@/components/home/RegulatorySevices";
import ProcessSection from "@/components/home/ProcessSection";
import CaseStudies from "@/components/home/CaseStudies";
import CompliancePortal from "@/components/home/CompliancePortal";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import StatsSection from "@/components/home/StatsSection";
import FeaturedBlogs from "@/components/home/FeaturedBlogs";

export default function Home() {
    // const [scrollProgress, setScrollProgress] = useState(0); // Removed
    // const [showScrollTop, setShowScrollTop] = useState(false); // Removed

    // useEffect(() => { // Removed
    //     const handleScroll = () => {
    //         // Progress Bar
    //         const totalScroll = document.documentElement.scrollTop;
    //         const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    //         const scroll = `${totalScroll / windowHeight}`;
    //         setScrollProgress(Number(scroll));

    //         // Scroll to Top Button Visibility
    //         setShowScrollTop(totalScroll > 300);
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    // const scrollToTop = () => { // Removed
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // };

    return (
        <div className="bg-transparent min-h-screen font-sans text-gray-800">

            {/* Scroll Progress Bar */}
            {/* Removed */}


            <main>
                <HeroSection />
                <StatsSection />
                <TrustedBy />
                <SolutionsSection />
                <WhyChooseUs />
                <RegulatoryServices />
                <ProcessSection />
                <CaseStudies />
                <CompliancePortal />
                <Testimonials />
                <FeaturedBlogs />
                <FinalCTA />
            </main>


            {/* Scroll To Top Button */}
            {/* Removed */}

        </div>
    );
}
