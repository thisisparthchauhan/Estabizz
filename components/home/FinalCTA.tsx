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
                    <h2 className="text-[36px] md:text-[48px] font-black text-white leading-[1.15] tracking-tight mb-4">
                        Begin Your Licensing Process with Confidence
                    </h2>

                    <p className="text-[16px] md:text-[18px] text-[#94a3b8] leading-relaxed font-medium mb-10 max-w-2xl mx-auto">
                        Regulatory approvals demand preparation, clarity, and disciplined execution. We guide you through every stage — from assessment to approval and beyond.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <a href="/contact" className="relative overflow-hidden group w-full sm:w-auto bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-[16px] rounded-[14px] px-10 py-5 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-300 text-center">
                            <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 skew-x-[-20deg] group-hover:animate-[shine_1s_ease-out] z-0" />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Request a Structured Assessment <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                            </span>
                        </a>

                        <a href="tel:+919825600907" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/20 text-white font-bold text-[16px] rounded-[14px] px-8 py-[18px] hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                            <span className="text-[20px]">📞</span> +91 98256 00907
                        </a>
                    </div>

                    <div className="mt-10 text-[15px] text-white/70 font-semibold italic text-center">
                        Regulatory strength begins with the right advisory partner.
                    </div>

                    <div className="mt-6 text-[12px] text-[#94a3b8] font-medium text-center">
                        Trusted by regulated businesses across India and global financial centres.
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
