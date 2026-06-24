"use client";

import React, { useEffect, useRef, useState } from "react";
import { SOLUTIONS_DEFAULTS, type SolutionsContent } from "@/lib/content/solutionsDefaults";

export default function SolutionsSection({ content }: { content?: Partial<SolutionsContent> }) {
    const c: SolutionsContent = { ...SOLUTIONS_DEFAULTS, ...content };
    const solutions = c.cards?.length ? c.cards : SOLUTIONS_DEFAULTS.cards;
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
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1677f2]/25 to-transparent" />
            <div className="mx-auto max-w-[1180px]">
                <div className={`mx-auto mb-14 max-w-[860px] text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <div className="mb-4 text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]">
                        {c.label}
                    </div>
                    <h2 className="text-[clamp(34px,4.4vw,58px)] font-black leading-[1.08] tracking-[-0.035em] text-[#071426]">
                        {c.heading}
                    </h2>
                    <p className="mx-auto mt-5 max-w-[760px] text-[17px] font-medium leading-relaxed text-[#64748b]">
                        {c.description}
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {solutions.map((solution, index) => (
                        <a
                            key={solution.num}
                            href={solution.href}
                            className="group relative min-h-[330px] overflow-hidden rounded-[28px] border border-[#dbeafe] bg-white p-7 shadow-[0_18px_50px_rgba(0,80,140,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-[#1677f2]/45 hover:shadow-[0_28px_70px_rgba(0,100,180,0.13)]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(28px)",
                                transitionDelay: `${index * 70}ms`,
                            }}
                        >
                            <div className="absolute right-6 top-5 text-[64px] font-black leading-none text-[#eff6ff] transition-colors group-hover:text-[#dbeafe]">
                                {solution.num}
                            </div>
                            <div className="relative z-10">
                                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] text-[30px] shadow-sm transition-transform group-hover:scale-105">
                                    {solution.icon}
                                </div>
                                <h3 className="text-[22px] font-black leading-tight text-[#071426]">{solution.title}</h3>
                                <div className="mt-2 text-[14px] font-black text-[#1677f2]">{solution.subtitle}</div>
                                <p className="mt-5 text-[14.5px] font-medium leading-[1.8] text-[#64748b]">{solution.body}</p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {solution.tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1.5 text-[11px] font-black text-[#1677f2]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-7 inline-flex items-center gap-2 text-[14px] font-black text-[#1677f2]">
                                    Explore Solution <span className="transition-transform group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
