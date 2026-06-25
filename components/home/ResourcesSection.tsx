"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RESOURCES_DEFAULTS, type ResourcesContent } from "@/lib/content/resourcesDefaults";

export default function ResourcesSection({ content }: { content?: Partial<ResourcesContent> }) {
    const c: ResourcesContent = { ...RESOURCES_DEFAULTS, ...content };
    const resources = (c.cards?.length ? c.cards : RESOURCES_DEFAULTS.cards)
        .map((card, index) => ({ ...RESOURCES_DEFAULTS.cards[index % RESOURCES_DEFAULTS.cards.length], ...card }))
        .filter((card) => card.visible !== false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.12 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-24">
            <div className="mx-auto max-w-[1240px] px-6">
                <div className={`mx-auto mb-14 max-w-3xl text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="mb-4 text-[12px] font-black uppercase tracking-[0.18em] text-[#1677f2]">{c.label}</div>
                    <h2 className="mb-5 text-[32px] font-black leading-tight text-[#0a1628] md:text-[42px]">{c.heading}</h2>
                    <p className="text-[16px] font-medium leading-8 text-[#475569]">
                        {c.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {resources.map((resource, index) => (
                        <Link
                            key={`${resource.title}-${index}`}
                            href={resource.href}
                            className={`group rounded-2xl border border-blue-100 bg-[#fbfdff] p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_18px_45px_rgba(0,100,200,0.12)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <div className="mb-6 h-12 w-12 rounded-2xl bg-[#0a1628] text-white flex items-center justify-center font-black">{index + 1}</div>
                            <h3 className="mb-3 text-[19px] font-black text-[#0a1628]">{resource.title}</h3>
                            <p className="mb-7 text-[14px] leading-7 text-[#64748b]">{resource.text}</p>
                            <span className="text-[14px] font-bold text-[#1677f2] group-hover:underline">{resource.button} →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
