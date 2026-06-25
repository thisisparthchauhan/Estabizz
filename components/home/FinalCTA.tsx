"use client";
import React, { useEffect, useRef, useState } from "react";
import { FINAL_CTA_DEFAULTS, type FinalCtaContent } from "@/lib/content/finalCtaDefaults";

export default function FinalCTA({ content }: { content?: Partial<FinalCtaContent> }) {
    const c: FinalCtaContent = { ...FINAL_CTA_DEFAULTS, ...content };
    const phoneHref = `tel:${c.phone.replace(/[^\d+]/g, "")}`;
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
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-14 overflow-hidden" style={{ background: "radial-gradient(circle at 50% 0%, rgba(22,119,242,0.32) 0%, #0a1628 46%, #0c2040 100%)" }}>

            {/* Animated Particle overlay (pure CSS dot matrix drifting) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden mix-blend-screen">
                <div className="w-[200%] h-[200%] absolute top-0 left-0 animate-[drift_60s_linear_infinite]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">

                <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <h2 className="text-[28px] md:text-[38px] font-black text-white leading-[1.12] tracking-tight mb-3">
                        {c.heading}
                    </h2>

                    <p className="text-[14.5px] md:text-[16px] text-[#94a3b8] leading-relaxed font-medium mb-7 max-w-2xl mx-auto">
                        {c.paragraph}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                        <a href={c.primaryBtnLink} className="relative overflow-hidden group w-full sm:w-auto bg-[#1677f2] text-white font-bold text-[15px] rounded-xl px-8 py-3.5 shadow-[0_14px_35px_rgba(22,119,242,0.32)] hover:-translate-y-0.5 hover:bg-[#0866d9] transition-all duration-300 text-center">
                            <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 skew-x-[-20deg] group-hover:animate-[shine_1s_ease-out] z-0" />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {c.primaryBtnText} <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                            </span>
                        </a>

                        <a href={phoneHref} className="w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white font-bold text-[15px] rounded-xl px-6 py-3.5 hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                            <span className="text-[17px]">📞</span> {c.phone}
                        </a>
                        <a href={c.whatsappLink} className="w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-[15px] rounded-xl px-6 py-3.5 hover:bg-white/20 hover:border-white/40 transition-all duration-300">
                            {c.whatsappText}
                        </a>
                    </div>

                    <div className="mt-7 text-[13.5px] text-white/65 font-semibold italic text-center">
                        {c.closingLine}
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{ __html: `
            @keyframes drift {
                0% { transform: translate(0, 0); }
                100% { transform: translate(-50px, -50px); }
            }
            @keyframes shine {
                0% { left: -100%; }
                100% { left: 200%; }
            }
            `}}/>
        </section>
    );
}
