"use client";
import React, { useState, useEffect, useRef } from "react";
import { REGULATORY_SERVICES_DEFAULTS, type RegulatoryServicesContent } from "@/lib/content/regulatoryServicesDefaults";

export default function RegulatoryServices({ content }: { content?: Partial<RegulatoryServicesContent> }) {
    const c: RegulatoryServicesContent = { ...REGULATORY_SERVICES_DEFAULTS, ...content };
    const services = c.services?.length ? c.services : REGULATORY_SERVICES_DEFAULTS.services;
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
        <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_12%,rgba(0,150,214,0.12),transparent_40%),radial-gradient(circle_at_5%_95%,rgba(22,119,242,0.08),transparent_36%)]" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#120b45] leading-[1.15] tracking-[-0.03em] mb-4">
                        {c.headingMain} <span className="text-[#1677f2]">{c.headingHighlight}</span>
                    </h2>
                    <p className="text-[16px] text-[#475569] font-medium">
                        {c.description}
                    </p>
                </div>

                {/* Services Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <a
                            key={service.id}
                            href={service.href}
                            className="group/service flex flex-col h-full rounded-[24px] border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] hover:-translate-y-2 hover:border-[#1677f2]/40 hover:shadow-[0_24px_60px_rgba(0,80,140,0.12)] transition-all duration-500 ease-out no-underline"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                                transitionDelay: `${0.08 * index}s`
                            }}
                        >
                            <div className="w-[52px] h-[52px] rounded-[18px] bg-[#f5fbff] border border-blue-100 flex items-center justify-center text-[22px] mb-5 shrink-0 group-hover/service:scale-110 group-hover/service:rotate-3 transition-transform duration-500">
                                {service.icon}
                            </div>

                            <h3 className="text-[17px] font-bold text-[#120b45] mb-3 transition-colors group-hover/service:text-[#1677f2]">
                                {service.title}
                            </h3>
                            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0077B6] mb-3">
                                For: {service.forText}
                            </div>

                            <p className="text-[13px] text-[#64748b] leading-[1.7] mb-6 flex-grow">
                                {service.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {service.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = tag.href; }}
                                    className="px-3 py-1 bg-[#f5fbff] border border-blue-100 text-[#0077B6] rounded-full text-[11px] font-semibold whitespace-nowrap hover:bg-[#1677f2] hover:border-[#1677f2] hover:text-white transition-colors cursor-pointer"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section >
    );
}
