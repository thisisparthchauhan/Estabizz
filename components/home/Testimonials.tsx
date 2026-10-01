"use client";
import React, { useEffect, useRef, useState } from "react";
import { TESTIMONIALS_DEFAULTS, type TestimonialsContent } from "@/lib/content/testimonialsDefaults";

export default function Testimonials({ content }: { content?: Partial<TestimonialsContent> }) {
    const c: TestimonialsContent = { ...TESTIMONIALS_DEFAULTS, ...content };
    const placeholders = c.placeholders?.length ? c.placeholders : TESTIMONIALS_DEFAULTS.placeholders;
    // Only consented + visible testimonials may appear publicly.
    const published = (c.testimonials ?? []).filter((t) => t.consent === "consent_received" && t.visible);
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

    // When there are no publishable testimonials and admin chose to hide.
    if (published.length === 0 && c.emptyBehavior === "hidden") return null;

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-transparent border-t border-[rgba(0,150,220,0.1)]">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-4 dark:text-[#fafafa]">
                        {c.heading}
                    </h2>
                    <p className="text-[16px] text-[#475569] font-medium leading-relaxed dark:text-[#a1a1aa]">
                        {c.intro}
                    </p>
                </div>

                <div className="relative w-full pb-4">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
                    >
                        {published.length > 0 ? (
                            published.map((t, index) => (
                                <div
                                    key={index}
                                    className="bg-white/80 backdrop-blur-[16px] border border-[rgba(0,150,220,0.1)] rounded-[20px] p-8 relative flex flex-col group hover:bg-white/95 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,100,200,0.12)] transition-all duration-500 ease-out dark:bg-[#141417]"
                                >
                                    {t.rating > 0 && (
                                        <div className="mb-4 text-[14px] tracking-wide text-[#f5a623]">
                                            {"★".repeat(Math.min(5, Math.round(t.rating)))}<span className="text-[#dbe7f3]">{"★".repeat(Math.max(0, 5 - Math.round(t.rating)))}</span>
                                        </div>
                                    )}
                                    <p className="text-[14px] text-[#475569] leading-7 font-medium flex-grow dark:text-[#a1a1aa]">
                                        &ldquo;{t.feedback}&rdquo;
                                    </p>
                                    <div className="mt-6 border-t border-[#f0f4f8] pt-4 dark:border-[#27272b]">
                                        <div className="text-[14px] font-bold text-[#0a1628] dark:text-[#fafafa]">{t.name}</div>
                                        <div className="text-[12px] text-[#64748b] dark:text-[#a1a1aa]">
                                            {[t.designation, t.company].filter(Boolean).join(", ")}
                                        </div>
                                        {t.category && (
                                            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1677f2] dark:text-[#4f9dfb]">{t.category}</div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            placeholders.map((label, index) => (
                                <div
                                    key={label}
                                    className="bg-white/80 backdrop-blur-[16px] border border-[rgba(0,150,220,0.1)] rounded-[20px] p-8 relative flex flex-col group hover:bg-white/95 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,100,200,0.12)] transition-all duration-500 ease-out dark:bg-[#141417]"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677f2] font-black mb-5 dark:bg-[#1c1c20] dark:border-[#27272b] dark:text-[#4f9dfb]">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-[16px] font-bold text-[#0a1628] mb-3 dark:text-[#fafafa]">{label}</h3>
                                    <p className="text-[14px] text-[#64748b] leading-7 font-medium dark:text-[#a1a1aa]">
                                        Client feedback coming soon.
                                    </p>
                                    <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1677f2] dark:text-[#4f9dfb]">
                                        Confidential engagement category
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <p className="text-center text-[12px] text-[#64748b] mt-10 max-w-2xl mx-auto leading-relaxed dark:text-[#a1a1aa]">
                    {c.footnote}
                </p>
            </div>

        </section>
    );
}
