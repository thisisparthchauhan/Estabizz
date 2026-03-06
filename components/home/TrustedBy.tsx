"use client";
import React, { useEffect, useRef, useState } from "react";

const companies = [
    "Ezywise", "Thip", "Insurehub", "Cosmopayz", "Branch International", "Efficient Group", "GE Shipping", "Jainam Group", "Opus Capital", "KSHETRAPAL", "MAKS", "Market Wick", "Finergy Finance", "Fintara", "Devvrat Group", "Vayoonandan", "VSPA", "Western Fintrade", "SVCM", "Evermore", "LN Fintech", "Digitap", "Cashfree", "Rozarpay", "Digio", "Nutra trade", "Unique Solar", "Carebharat", "Ombeema", "CARE", "GROW"
];

export default function TrustedBy() {
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
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Split into two halves for two rows
    const midpoint = Math.ceil(companies.length / 2);
    const row1 = companies.slice(0, midpoint);
    const row2 = companies.slice(midpoint);

    // Helper to render pills
    const renderPill = (name: string, index: number) => (
        <div key={`${name}-${index}`} className="flex-shrink-0 bg-white border border-[rgba(0,150,220,0.2)] rounded-full px-5 py-2 mx-3 shadow-sm hover:shadow-md hover:bg-[#0096D6] hover:text-white transition-all duration-300 hover:-translate-y-1 cursor-default">
            <span className="text-[13px] font-bold text-[#334155] group-hover:text-white transition-colors">{name}</span>
        </div>
    );

    return (
        <section ref={sectionRef} className={`py-16 md:py-24 bg-[#f8faff] overflow-hidden relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            <div className="max-w-[1240px] mx-auto px-6 mb-12 text-center">
                <h2 className="text-[16px] md:text-[18px] font-extrabold text-[#0a1628] uppercase tracking-widest text-[#94a3b8]">
                    Trusted by India's Fastest Growing Business
                </h2>
            </div>

            <div className="relative w-full max-w-[1400px] mx-auto">
                {/* Gradients masks for smooth fade left/right */}
                <div className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[120px] bg-gradient-to-r from-[#f8faff] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-[80px] md:w-[120px] bg-gradient-to-l from-[#f8faff] to-transparent z-10 pointer-events-none"></div>

                {/* Row 1 - Scroll Left */}
                <div className="flex w-fit animate-marquee-left mb-6 whitespace-nowrap group">
                    {[...row1, ...row1, ...row1, ...row1].map((c, i) => renderPill(c, i))}
                </div>

                {/* Row 2 - Scroll Right */}
                <div className="flex w-fit animate-marquee-right whitespace-nowrap group">
                    {[...row2, ...row2, ...row2, ...row2].map((c, i) => renderPill(c, i))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 30s linear infinite;
        }
        .animate-marquee-right {
           animation: marqueeRight 30s linear infinite;
        }
        /* Make hover text white via global selector inside pill */
        .hover\\:bg-\\[\\#0096D6\\]:hover span {
          color: white;
        }
      `}} />
        </section>
    );
}
