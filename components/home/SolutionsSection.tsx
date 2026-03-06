"use client";
import React, { useEffect, useRef, useState } from "react";

const solutions = [
    {
        num: "01",
        icon: "🚀",
        title: "For Startups & New Businesses",
        subtitle: "Build Right. From Day One.",
        body: "Incorporate your company, obtain GST registration, open banking channels, and establish a fully compliant foundation. We ensure your business begins its journey legally strong and future-ready.",
        tags: ["Private Limited", "LLP", "OPC", "Section 8"]
    },
    {
        num: "02",
        icon: "🏦",
        title: "For NBFCs & Lending Businesses",
        subtitle: "Regulated Lending. Managed with Precision.",
        body: "Secure your NBFC licence, get your post-registration done, implement RBI-compliant frameworks, and manage returns, audits, and regulatory reporting seamlessly. We safeguard your lending operations with structured compliance oversight.",
        tags: ["RBI Licensing", "NBFC Compliance", "DNBS Reporting", "Regulatory Audits"]
    },
    {
        num: "03",
        icon: "💳",
        title: "For Fintech Platforms",
        subtitle: "Compliance Architecture for Digital Finance.",
        body: "From payment aggregator, PSP Registration or FME registrations, we design and manage your complete regulatory ecosystem. Operate with confidence in a fully governed fintech environment.",
        tags: ["PA Licence", "PSP Registration", "FME Approval", "IFSCA Support"]
    },
    {
        num: "04",
        icon: "📊",
        title: "For SMEs & Growing Enterprises",
        subtitle: "Structured Compliance. Sustainable Growth.",
        body: "Comprehensive audit, taxation, ROC filings, and secretarial compliance—delivered with discipline and accountability. We streamline governance so you can scale without uncertainty.",
        tags: ["Audit", "ROC Filings", "Tax Advisory", "Compliance Management"]
    }
];

export default function SolutionsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-6">

                {/* Header Content */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-[14px] font-bold text-[#0096D6] uppercase tracking-widest mb-4">
                        Powering Seamless Compliance Across Every Stage of Business.
                    </div>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-6 tracking-tight">
                        Solutions Designed Around Your Business Stage.
                    </h2>
                    <p className="text-[16px] text-[#475569] leading-relaxed font-medium">
                        Whether you're a startup, insurance broker, NBFC, stockbroker, payment solution provider, or enterprise—we have the right compliance solution for you.
                    </p>
                </div>

                {/* 4 Solution Cards */}
                <div className="flex flex-col gap-6">
                    {solutions.map((sol, index) => {
                        const isFeatured = index === 1; // 2nd card (NBFCs)

                        return (
                            <div
                                key={sol.num}
                                className={`group relative backdrop-blur-[16px] rounded-[20px] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start overflow-hidden hover:bg-[rgba(255,255,255,0.9)] hover:-translate-y-[6px] transition-all duration-500 ease-out z-10 ${isFeatured ? 'bg-white/90 border-2 border-[#0096D6] shadow-[0_20px_60px_rgba(0,150,220,0.18)]' : 'bg-white/75 border border-[rgba(0,150,220,0.1)] hover:border-[rgba(0,150,220,0.4)] hover:shadow-[0_20px_40px_rgba(0,100,200,0.14)]'}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                                    transitionDelay: `${index * 0.10}s`
                                }}
                            >

                                {/* Dynamic left border gradient hack (handled by before pseudo-element) */}
                                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-gradient-to-b from-[#0096D6] to-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Watermark Number */}
                                <div className="absolute top-6 right-8 text-[64px] lg:text-[100px] font-black text-[rgba(0,150,220,0.04)] group-hover:text-[rgba(0,150,220,0.08)] leading-none select-none transition-colors duration-500 pointer-events-none">
                                    {sol.num}
                                </div>

                                {/* Left Column (Icon + Number Mobile) */}
                                <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start w-full md:w-auto shrink-0 z-10 gap-4">
                                    <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-[linear-gradient(135deg,rgba(0,150,220,0.1),rgba(0,150,220,0.06))] border border-[rgba(0,150,220,0.15)] rounded-[20px] flex items-center justify-center text-[32px] md:text-[40px] shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        {sol.icon}
                                    </div>
                                    <div className="md:hidden text-[40px] font-black text-[rgba(0,150,220,0.08)] leading-none select-none">
                                        {sol.num}
                                    </div>
                                </div>

                                {/* Right Column (Content) */}
                                <div className="flex-1 z-10">
                                    <h3 className="text-[20px] md:text-[24px] font-bold text-[#0a1628] mb-1">{sol.title}</h3>
                                    <h4 className="text-[14px] md:text-[15px] font-bold text-[#0096D6] mb-4">{sol.subtitle}</h4>
                                    <p className="text-[14px] md:text-[15px] text-[#475569] leading-[1.8] mb-6 max-w-3xl">
                                        {sol.body}
                                    </p>

                                    {/* Tags Array */}
                                    <div className="flex flex-wrap items-center gap-2 mb-6">
                                        {sol.tags.map(tag => (
                                            <span key={tag} className="bg-blue-50 text-[#0096D6] border border-blue-100/50 px-3 py-1.5 rounded-full text-[12px] font-bold tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a href="#" className="inline-flex items-center gap-2 text-[#0096D6] font-bold text-[14.5px] group/link">
                                        Explore Solution <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">→</span>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
