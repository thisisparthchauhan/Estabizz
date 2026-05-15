"use client";
import React, { useEffect, useRef, useState } from "react";

const placeholders = [
    "Regulatory licensing support",
    "Ongoing compliance management",
    "Capital market advisory",
    "Insurance intermediary licensing",
    "GIFT City structuring",
    "AML and reporting frameworks"
];

export default function Testimonials() {
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
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-transparent border-t border-[rgba(0,150,220,0.1)]">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-[16px] text-[#475569] font-medium leading-relaxed">
                        Our work is built around confidentiality. Many regulatory engagements cannot be publicly disclosed, but our approach remains consistent — structured execution, transparent communication and compliance-first delivery.
                    </p>
                </div>

                <div className="relative w-full pb-4">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
                    >
                        {placeholders.map((label, index) => (
                            <div
                                key={label}
                                className="bg-white/80 backdrop-blur-[16px] border border-[rgba(0,150,220,0.1)] rounded-[20px] p-8 relative flex flex-col group hover:bg-white/95 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,100,200,0.12)] transition-all duration-500 ease-out"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0096D6] font-black mb-5">
                                    {index + 1}
                                </div>
                                <h3 className="text-[16px] font-bold text-[#0a1628] mb-3">{label}</h3>
                                <p className="text-[14px] text-[#64748b] leading-7 font-medium">
                                    Client feedback coming soon.
                                </p>
                                <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0096D6]">
                                    Confidential engagement category
                                </div>
                                <h3 className="text-[15px] font-bold text-[#0a1628] leading-tight">
                                    {card.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-[12px] text-[#64748b] mt-10 max-w-2xl mx-auto leading-relaxed">
                    Estabizz does not publish fabricated client testimonials. Verified, attributable feedback will be
                    added progressively with explicit client consent.
                </p>
            </div>

        </section>
    );
}
