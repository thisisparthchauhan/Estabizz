"use client";

import React, { useEffect, useState } from "react";
import { HERO_DEFAULTS, type HeroContent } from "@/lib/content/heroDefaults";

export default function HeroSection({ content }: { content?: Partial<HeroContent> }) {
    const c: HeroContent = { ...HERO_DEFAULTS, ...content };
    const rotatingServices = c.rotatingWords?.length ? c.rotatingWords : HERO_DEFAULTS.rotatingWords;
    const trustStats = c.trustStats?.length ? c.trustStats : HERO_DEFAULTS.trustStats;
    const servicePills = c.servicePills?.length ? c.servicePills : HERO_DEFAULTS.servicePills;

    const [activeWord, setActiveWord] = useState(0);

    useEffect(() => {
        setActiveWord(0);
        const timer = window.setInterval(() => {
            setActiveWord((index) => (index + 1) % rotatingServices.length);
        }, 1900);
        return () => window.clearInterval(timer);
    }, [rotatingServices.length]);

    return (
        <section className="relative isolate overflow-hidden bg-white px-6 pb-20 pt-32 md:pt-36">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(0,150,214,0.16),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(217,169,56,0.12),transparent_30%)]" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-[48%] bg-gradient-to-b from-transparent to-[#eaf6ff]" />
            <div className="absolute bottom-0 left-0 -z-10 h-[220px] w-[220px] rounded-full bg-[#d8ecff] blur-3xl" />
            <div className="absolute bottom-12 right-0 -z-10 h-[280px] w-[280px] rounded-full bg-[#bfe2ff] blur-3xl" />

            <div className="mx-auto max-w-[1180px] text-center">
                <div className="mb-8 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-5 py-2 text-[12px] font-black uppercase tracking-[0.24em] text-[#0077B6] shadow-sm">
                    {c.welcomeLabel}
                </div>

                <h1 className="mx-auto max-w-[1050px] text-[clamp(42px,7vw,86px)] font-black leading-[1.02] tracking-[-0.045em] text-[#120b45]">
                    {c.headingPrefix}
                    <span className="relative mt-2 block min-h-[1.08em] text-[#1677f2]">
                        <span key={rotatingServices[activeWord]} className="inline-block animate-[heroWord_0.55s_ease]">
                            {rotatingServices[activeWord]}
                        </span>
                        <span className="ml-1 inline-block h-[0.92em] w-[4px] translate-y-[6px] rounded-full bg-[#1677f2] animate-[blinkCaret_1s_steps(1)_infinite]" />
                    </span>
                </h1>

                <p className="mx-auto mt-7 max-w-[840px] text-[18px] font-medium leading-[1.85] text-[#64748b]">
                    {c.subheading}
                </p>

                <div className="mx-auto mt-8 flex max-w-[780px] flex-wrap items-center justify-center gap-2">
                    {["🇮🇳", "🇦🇪", "🇸🇬", "🇬🇧", "🇺🇸", "🇨🇦"].map((flag) => (
                        <span key={flag} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white text-[20px] shadow-[0_12px_30px_rgba(0,90,150,0.12)]">
                            {flag}
                        </span>
                    ))}
                    <span className="ml-2 rounded-full bg-white px-4 py-2 text-[14px] font-black text-[#0a2b58] shadow-[0_12px_30px_rgba(0,90,150,0.10)]">
                        {c.supportLine}
                    </span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a href={c.primaryBtnLink} className="rounded-xl bg-[#1677f2] px-9 py-4 text-[16px] font-black text-white shadow-[0_18px_45px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-1 hover:bg-[#0866d9]">
                        {c.primaryBtnText}
                    </a>
                    <a href={c.secondaryBtnLink} className="rounded-xl border border-blue-100 bg-white px-9 py-4 text-[16px] font-black text-[#0a2b58] shadow-[0_14px_35px_rgba(0,70,130,0.08)] transition-all hover:-translate-y-1 hover:border-[#1677f2] hover:text-[#1677f2]">
                        {c.secondaryBtnText}
                    </a>
                </div>

                <div className="mx-auto mt-10 grid max-w-[980px] grid-cols-2 gap-3 md:grid-cols-4">
                    {trustStats.map((stat) => (
                        <div key={stat} className="rounded-2xl border border-blue-100 bg-white/78 px-4 py-4 text-[13px] font-black text-[#0a1628] shadow-[0_16px_38px_rgba(0,80,140,0.08)] backdrop-blur-xl">
                            {stat}
                        </div>
                    ))}
                </div>

                <div className="relative mx-auto mt-12 max-w-[980px] overflow-hidden rounded-[28px] border border-blue-100 bg-white/70 px-5 py-4 shadow-[0_18px_60px_rgba(0,80,140,0.08)] backdrop-blur-xl">
                    <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
                    <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
                    <div className="flex w-max animate-[heroTicker_26s_linear_infinite] gap-3">
                        {[...servicePills, ...servicePills].map((service, index) => (
                            <span key={`${service}-${index}`} className="rounded-full border border-blue-100 bg-[#f8fbff] px-4 py-2 text-[12px] font-black text-[#0077B6]">
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes heroWord {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes blinkCaret {
                    0%, 45% { opacity: 1; }
                    46%, 100% { opacity: 0; }
                }
                @keyframes heroTicker {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
