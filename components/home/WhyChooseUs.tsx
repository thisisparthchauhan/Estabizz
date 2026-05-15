"use client";

import React, { useEffect, useRef, useState } from "react";

const pillars = [
    {
        title: "Regulatory Expertise",
        body: "Qualified CAs, CSs, lawyers and regulatory professionals with hands-on experience across RBI, SEBI, IRDAI, IFSCA and MCA frameworks."
    },
    {
        title: "Regulator-Ready Documentation",
        body: "Business plans, declarations, policy frameworks and supporting records are prepared with regulatory discipline."
    },
    {
        title: "Complete Ownership",
        body: "From preparation to approval and ongoing compliance, we keep the engagement structured and accountable."
    },
    {
        title: "Transparent Commitments",
        body: "Defined scope, realistic timelines, clear fees and practical communication from start to finish."
    }
];

export default function WhyChooseUs() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.14 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-[#f7fbff] px-6 py-24">
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_15%_20%,rgba(0,150,214,0.10),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(217,169,56,0.10),transparent_30%)]" />
            <div className="relative z-10 mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <div className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <div className="mb-4 text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]">
                        Why Estabizz
                    </div>
                    <h2 className="text-[clamp(34px,4vw,58px)] font-black leading-[1.06] tracking-[-0.04em] text-[#071426]">
                        Built on trust. Driven by accountability.
                    </h2>
                    <p className="mt-6 max-w-[560px] text-[18px] font-black italic leading-relaxed text-[#1677f2]">
                        Compliance is not a product. It is a responsibility.
                    </p>
                    <p className="mt-6 max-w-[620px] text-[16px] font-medium leading-[1.9] text-[#475569]">
                        We stand beside clients during regulatory milestones, application preparation, query response and compliance cycles. The work is practical, structured and regulator-respectful.
                    </p>
                    <div className="mt-8 rounded-[24px] border border-blue-100 bg-white p-6 text-[18px] font-black italic leading-relaxed text-[#071426] shadow-[0_18px_50px_rgba(0,80,140,0.07)]">
                        We do not just guide. We execute. We safeguard. We support.
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.title}
                            className="group rounded-[28px] border border-blue-100 bg-white p-7 shadow-[0_18px_50px_rgba(0,80,140,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-[#1677f2]/40"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(26px)",
                                transitionDelay: `${index * 90}ms`,
                            }}
                        >
                            <div className="mb-8 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#071426] px-4 py-3 text-[16px] font-black text-white">
                                {index + 1}
                            </div>
                            <h3 className="text-[20px] font-black leading-tight text-[#071426]">{pillar.title}</h3>
                            <p className="mt-4 text-[14.5px] font-medium leading-[1.8] text-[#64748b]">{pillar.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
