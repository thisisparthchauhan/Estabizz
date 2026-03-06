"use client";
import React, { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
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
        <section ref={sectionRef} className="relative py-24 overflow-hidden" style={{ background: "radial-gradient(circle at center, #0077B6 0%, #0a1628 100%)" }}>

            {/* Animated Particle overlay (pure CSS dot matrix drifting) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden mix-blend-screen">
                <div className="w-[200%] h-[200%] absolute top-0 left-0 animate-[drift_60s_linear_infinite]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">

                <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <h2 className="text-[36px] md:text-[48px] font-black text-white leading-[1.15] tracking-tight mb-6">
                        Ready to Secure Your License?
                    </h2>

                    <p className="text-[16px] md:text-[18px] text-[#94a3b8] leading-relaxed font-medium mb-10 max-w-2xl mx-auto">
                        Do not let regulatory hurdles delay your launch. Partner with India's leading compliance experts and get your business operational faster.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <button className="relative overflow-hidden group w-full sm:w-auto bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-[16px] rounded-[14px] px-10 py-5 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-300">
                            {/* Hover Shine Effect */}
                            <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 skew-x-[-20deg] group-hover:animate-[shine_1s_ease-out] z-0" />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Start Your Application Today <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                            </span>
                        </button>

                        <a href="tel:+919876543210" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/20 text-white font-bold text-[16px] rounded-[14px] px-8 py-[18px] hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                            <span className="text-[20px]">📞</span> Talk to an Expert
                        </a>
                    </div>

                    <div className="mt-8 text-[13px] text-[#94a3b8] font-medium flex items-center justify-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1.5"><span className="text-[#10b981]">✓</span> Free first consultation</span>
                        <span className="flex items-center gap-1.5"><span className="text-[#10b981]">✓</span> Guaranteed confidentiality</span>
                        <span className="flex items-center gap-1.5"><span className="text-[#10b981]">✓</span> Expert ex-regulator team</span>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{ __html: `
            @keyframes drift {
                0 % { transform: translate(0, 0); }
                   100% {transform: translate(-50px, -50px); }
                }
            @keyframes shine {
                0 % { left: -100 %; }
                   100% {left: 200%; }
                }
            `}}/>
        </section>
    );
}
