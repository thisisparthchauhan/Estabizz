"use client";
import React, { useEffect, useRef, useState } from "react";

const pillars = [
    {
        title: "Regulatory Expertise",
        body: "Qualified CAs, CSs and legal professionals with hands-on experience across RBI, SEBI, IRDAI, IFSCA and MCA frameworks. We understand the regulator's language — not just the form."
    },
    {
        title: "Regulator-Ready Documentation",
        body: "Approvals move faster when documentation is precise. Every application is structured, reviewed, and submitted with regulatory discipline."
    },
    {
        title: "Complete Ownership",
        body: "From preparation to approval and ongoing compliance — we remain accountable at every stage. No handovers. No ambiguity."
    },
    {
        title: "Transparent Commitments",
        body: "Clear fee structure. Defined timelines. Structured communication. Because compliance should never begin with uncertainty."
    }
];

export default function WhyChooseUs() {
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
        <section ref={sectionRef} className="py-[80px] relative bg-transparent overflow-hidden">

            <div className="max-w-[1240px] mx-auto px-6 lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                {/* Left Side Content */}
                <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] tracking-tight mb-4">
                        Built on Trust. Driven by Accountability
                    </h2>
                    <div className="text-[18px] md:text-[20px] font-bold text-[#0096D6] italic mb-8">
                        Because compliance is not a product — it is a responsibility.
                    </div>

                    <div className="space-y-5">
                        <p className="text-[15px] md:text-[16px] text-[#475569] leading-[1.8] font-medium">
                            We do not believe in transactional advisory. We believe in standing beside our clients during every regulatory milestone, every approval process, and every compliance cycle. Whether you are facing operational bottlenecks, regulatory queries, or new license requirements — we provide practical, end-to-end solutions designed around your business reality.
                        </p>
                        <p className="text-[15px] md:text-[16px] text-[#475569] leading-[1.8] font-medium">
                            Strategic compliance requires more than documentation — it requires ownership. We partner with businesses to direct regulatory frameworks with clarity and discipline. From registration to long-term compliance management, we design structured, regulator-ready solutions that protect your enterprise and strengthen its foundation.
                        </p>
                        <p className="text-[18px] font-semibold text-[#0096D6] italic pt-2">
                            We do not just guide.<br />
                            Your challenges become our commitment.<br />
                            We execute. We safeguard. We support.
                        </p>
                    </div>
                </div>

                {/* Right Side Cards (2x2 Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:pl-10">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className={`bg-white/80 backdrop-blur-[12px] p-6 text-left relative group hover:shadow-[0_10px_30px_rgba(0,150,220,0.1)] hover:-translate-y-1 transition-all duration-300 ease-out`}
                            style={{
                                borderTop: '3px solid transparent',
                                borderImage: 'linear-gradient(90deg, #0096D6, #10b981) 1',
                                borderLeft: 'none', borderRight: 'none', borderBottom: 'none', // As 'border-image' behaves wildly without explicit sides sometimes, or standard box modeling.
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.15}s`
              }}
            >

                    <div className="w-[40px] h-[40px] rounded-full bg-blue-50 flex items-center justify-center text-[18px] text-[#0096D6] mb-5 border border-blue-100 group-hover:scale-110 group-hover:bg-[#0096D6] group-hover:text-white transition-all duration-300">
                        🔹
                    </div>

                    <h3 className="text-[16px] font-bold text-[#0a1628] mb-3 leading-snug">{pillar.title}</h3>
                    <p className="text-[13px] text-[#64748b] leading-[1.75] font-medium">
                        {pillar.body}
                    </p>
                </div>
          ))}
            </div>

        </div>
    </section >
  );
}
