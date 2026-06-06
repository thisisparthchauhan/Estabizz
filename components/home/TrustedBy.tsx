"use client";
import React, { useEffect, useRef, useState } from "react";

const companies = [
    "Ezywise", "Thip", "InsureHub", "Cosmopayz", "Branch International", "Efficient Group", "GE Shipping", "Jainam Group", "Opus Capital", "Kshetrapal", "MAKS", "Market Wick", "Finergy Finance", "Fintara", "Devvrat Group", "Vayoonandan", "VSPA", "Western Fintrade", "SVCM", "Evermore", "LN Fintech", "Digitap", "Cashfree", "Razorpay", "Digio", "Nutra Trade", "Unique Solar", "CareBharat", "Ombeema", "CARE", "GROW"
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

    const renderPill = (name: string, index: number) => (
        <div key={`${name}-${index}`} className="flex-shrink-0 premium-glass border border-[rgba(0,150,220,0.18)] rounded-full px-5 py-2 mx-3 shadow-sm hover:shadow-[0_14px_34px_rgba(0,150,220,0.16)] hover:bg-[#0096D6] hover:text-white transition-all duration-300 hover:-translate-y-1 cursor-default">
            <span className="text-[13px] font-bold text-[#334155] group-hover:text-white transition-colors">{name}</span>
        </div>
    );

    return (
        <section ref={sectionRef} className={`py-16 md:py-24 bg-[#f8faff] overflow-hidden relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,150,214,0.10),transparent_42%)]" />

            <div className="max-w-[1240px] mx-auto px-6 mb-12 text-center relative z-10">
                <h2 className="text-[16px] md:text-[18px] font-extrabold text-[#0a1628] uppercase tracking-widest text-[#94a3b8]">
                    Trusted by Businesses Across Financial Services, Insurance, Fintech and Global Markets
                </h2>
                <p className="mt-4 text-[12px] text-[#64748b] max-w-3xl mx-auto">
                    Client names are displayed only where permitted and do not imply endorsement unless expressly authorised.
                </p>
            </div>

            <div className="relative w-full max-w-[1400px] mx-auto">
                {/* Gradients masks for smooth fade left/right */}
                <div className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[120px] bg-gradient-to-r from-[#f8faff] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-[80px] md:w-[120px] bg-gradient-to-l from-[#f8faff] to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-fit animate-marquee-left whitespace-nowrap group">
                    {[...companies, ...companies].map((c, i) => renderPill(c, i))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 48s linear infinite;
        }
        /* Make hover text white via global selector inside pill */
        .hover\\:bg-\\[\\#0096D6\\]:hover span {
          color: white;
        }
      `}} />
        </section>
    );
}
