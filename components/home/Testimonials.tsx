"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * Testimonials section.
 *
 * Per brand and regulatory guidelines, we do NOT publish fabricated client
 * testimonials. Many of our regulatory engagements are confidential and
 * cannot be publicly disclosed. We therefore display a confidentiality-led
 * placeholder until verified, attributable client feedback is available.
 */

const placeholderCards: { title: string; body: string }[] = [
    {
        title: "Confidentiality First",
        body: "Our work is built around confidentiality. Many regulatory engagements cannot be publicly disclosed, but our approach remains consistent — structured execution, transparent communication and compliance-first delivery.",
    },
    {
        title: "Client Feedback Coming Soon",
        body: "Verified client testimonials will be published progressively, with explicit consent. Where engagements involve regulator-facing applications, references are typically shared privately on request.",
    },
    {
        title: "Talk to Our Team",
        body: "If you would like to evaluate our approach, our advisory team is happy to share representative engagement summaries and reference scenarios under a structured discussion, subject to confidentiality.",
    },
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
                    <p className="text-[15px] md:text-[16px] text-[#475569] font-medium leading-relaxed">
                        Our work is built around confidentiality. Many regulatory engagements cannot be publicly
                        disclosed, but our approach remains consistent — structured execution, transparent
                        communication and compliance-first delivery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {placeholderCards.map((card, index) => (
                        <div
                            key={card.title}
                            className="bg-white/80 backdrop-blur-[16px] border border-[rgba(0,150,220,0.12)] rounded-[20px] p-7 flex flex-col group hover:bg-white/95 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,100,200,0.10)] transition-all duration-500 ease-out"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                                transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${0.15 + index * 0.1}s`,
                            }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0096D6] text-[15px]">
                                    💬
                                </div>
                                <h3 className="text-[15px] font-bold text-[#0a1628] leading-tight">
                                    {card.title}
                                </h3>
                            </div>
                            <p className="text-[14px] text-[#475569] leading-[1.75] font-medium">
                                {card.body}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-[12px] text-[#64748b] mt-10 max-w-2xl mx-auto leading-relaxed">
                    Estabizz does not publish fabricated client testimonials. Verified, attributable feedback will be
                    added progressively with explicit client consent.
                </p>
            </div>
        </section>
    );
}
