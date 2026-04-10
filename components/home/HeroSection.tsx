"use client";
import React, { useEffect, useState } from "react";

// For stats counting up
const StatCount = ({ end, suffix = "", duration = 1800 }: { end: number, suffix?: string, duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

// Animated progress bar component
const ProgressBar = ({ label, targetProgress, color }: { label: string, targetProgress: number, color: string }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Slight delay before animating
        const timer = setTimeout(() => {
            setWidth(targetProgress);
        }, 400);
        return () => clearTimeout(timer);
    }, [targetProgress]);

    return (
        <div className="mb-4">
            <div className="flex justify-between text-[12px] font-bold text-[#334155] mb-1.5">
                <span>{label}</span>
                <span>{width}%</span>
            </div>
            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-[1200ms] ease-out min-w-[5px]"
                    style={{ width: `${width}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
};

export default function HeroSection() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return (
        <section className="relative min-h-[100vh] flex flex-col justify-center pt-28 pb-10 overflow-hidden px-6 bg-transparent scroll-mt-24">

            {/* Main Content (Grid to allow space for the dashboard card) */}
            <div className="relative z-10 max-w-[1240px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-grow pt-4">

                {/* Left Column - Text Content */}
                <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">

                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 border border-blue-200 shadow-sm mb-6 rounded-full w-fit animate-[fadeDown_0.5s_ease_forwards]">
                        <span className="text-[14px]">🏆</span>
                        <span className="text-[#0096D6] text-[13px] font-bold tracking-wide">Trusted by 500+ Licensed Businesses Across India</span>
                    </div>

                    {/* H1 Headline */}
                    <h1 className="text-[clamp(40px,5vw,60px)] font-black text-[#0a1628] leading-[1.15] tracking-tight mb-4 opacity-0 animate-[fadeUp_0.6s_ease_0.1s_forwards] w-full" dangerouslySetInnerHTML={{
                        __html: `
              Simplify Fintech Compliance, <br class="hidden md:block"/> <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#0096D6] to-[#10b981] italic pr-2">Accelerate</span> Your Growth
          `}} />

                    {/* Subtagline / Tagline combined logic */}
                    <div className="text-[#0077B6] font-bold text-[18px] md:text-[22px] italic mb-6 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]">
                        "We Comply. We Simplify."
                    </div>

                    {/* Description */}
                    <div className="max-w-[640px] w-full space-y-4 mb-8 opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
                        <p className="text-[15px] text-[#475569] font-medium leading-relaxed">
                            Expert regulatory guidance for IFSCA, RBI, SEBI, and IRDA licenses and other government licenses. We handle your compliance end-to-end so you can focus on building your business.
                        </p>
                        <p className="text-[15px] text-[#475569] font-medium leading-relaxed">
                            Regulatory approvals are not just documents—they are the foundation of your dream. We manage your IFSCA, RBI, SEBI, IRDAI and government licensing end-to-end, so you can build boldly and grow without fear.
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]">
                        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 border border-[rgba(0,150,220,0.15)] rounded-full shadow-sm text-[13px] text-[#334155] font-bold tracking-wide transition-all hover:-translate-y-1 hover:shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> {isMounted ? <StatCount end={500} suffix="+" /> : "500+"} Licenses Obtained
                        </div>
                        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 border border-[rgba(0,150,220,0.15)] rounded-full shadow-sm text-[13px] text-[#334155] font-bold tracking-wide transition-all hover:-translate-y-1 hover:shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#0096D6]"></span> {isMounted ? <StatCount end={1000} suffix="+" /> : "1000+"} Businesses Served
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 w-full sm:w-auto opacity-0 animate-[fadeUp_0.6s_ease_0.5s_forwards]">
                        <a href="/signup" className="get-started-btn relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold text-[15px] rounded-[14px] px-8 py-4 shadow-[0_8px_25px_rgba(0,150,220,0.3)] hover:shadow-[0_8px_30px_rgba(0,150,220,0.4)] hover:-translate-y-1 transition-all duration-300 group inline-flex items-center justify-center">
                            <span className="relative z-10 flex items-center justify-center gap-2">Get Started Free <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                        </a>

                        <button className="w-full sm:w-auto bg-white/90 backdrop-blur-md border-2 border-[#0096D6] text-[#0096D6] font-bold text-[15px] rounded-[14px] px-8 py-4 shadow-sm hover:bg-blue-50 transition-all duration-300">
                            Book a Free Consultation
                        </button>
                    </div>

                    {/* Trust Line */}
                    <div className="text-[12px] text-[#64748b] font-medium text-center lg:text-left opacity-0 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
                        No credit card required · Free consultation · Get queries solved in 24 hours
                    </div>

                </div>

                {/* Right Column - Compliance Dashboard Widget */}
                <div className="lg:col-span-12 xl:col-span-5 flex justify-center lg:justify-end opacity-0 animate-[fadeLeft_0.8s_ease_0.2s_forwards] w-full pt-6 lg:pt-0">

                    <div className="relative w-full max-w-[420px] bg-white/90 backdrop-blur-xl border border-[rgba(0,150,220,0.15)] rounded-2xl p-6 shadow-[0_32px_80px_rgba(0,100,200,0.15)]">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[18px] text-[#0096D6]">📊</div>
                                <div>
                                    <h3 className="font-bold text-[#0a1628] text-[15px] leading-tight">Regulatory Status</h3>
                                    <span className="text-[11px] text-gray-500 font-medium">Estabizz Network</span>
                                </div>
                            </div>

                            {/* Live Badge Component */}
                            <div className="flex items-center gap-1.5 bg-green-50 text-[#10b981] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-[pulseDot_2s_infinite]"></span>
                                Live
                            </div>
                        </div>

                        {/* Animated Progress Bars */}
                        <ProgressBar label="SEBI Licensing Applications" targetProgress={88} color="#0096D6" />
                        <ProgressBar label="RBI Compliance Filings" targetProgress={64} color="#0077B6" />
                        <ProgressBar label="IFSCA Active Frameworks" targetProgress={92} color="#10b981" />

                        {/* Micro Stats */}
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <div className="bg-[#f8faff] rounded-xl p-3 border border-blue-50/50">
                                <div className="text-[20px] font-black text-[#0096D6] mb-1">{isMounted ? <StatCount end={12} suffix="h" duration={1000} /> : "12h"}</div>
                                <div className="text-[11px] font-semibold text-gray-500">Query Resolution</div>
                            </div>
                            <div className="bg-[#f8faff] rounded-xl p-3 border border-blue-50/50">
                                <div className="text-[20px] font-black text-[#10b981] mb-1">{isMounted ? <StatCount end={98} suffix="%" duration={1500} /> : "98%"}</div>
                                <div className="text-[11px] font-semibold text-gray-500">Approval Rate</div>
                            </div>
                        </div>

                        {/* Floating decoration logic embedded */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#0096D6] to-[#10b981] rounded-full blur-[40px] opacity-20 pointer-events-none"></div>

                    </div>
                </div>

            </div>

            {/* Ticker Bar directly integrated at the bottom of Hero for seamless entry */}
            <div className="w-full mt-16 relative overflow-hidden bg-gradient-to-r from-[#0077B6] via-[#0096D6] to-[#00B4E0] py-3 opacity-0 animate-[fadeUp_0.6s_ease_0.7s_forwards]">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-gradient-to-r from-[#0077B6] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-[60px] bg-gradient-to-l from-[#00B4E0] to-transparent z-10"></div>

                <div className="flex whitespace-nowrap animate-marquee-ticker group">
                    {[1, 2, 3, 4, 5, 6].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-8 px-6 text-[13px] font-bold text-white tracking-wide mix-blend-overlay opacity-90">
                            <span className="flex items-center gap-1.5"><span className="text-[#10b981] bg-white rounded-full w-[14px] h-[14px] flex items-center justify-center leading-none text-[10px]">✓</span> NBFC Compliant</span>
                            <span className="flex items-center gap-1.5"><span className="text-[#10b981] bg-white rounded-full w-[14px] h-[14px] flex items-center justify-center leading-none text-[10px]">✓</span> SEBI AIF Process Complete</span>
                            <span className="flex items-center gap-1.5"><span className="text-[#10b981] bg-white rounded-full w-[14px] h-[14px] flex items-center justify-center leading-none text-[10px]">✓</span> IRDAI Broker License Granted</span>
                            <span className="flex items-center gap-1.5"><span className="text-[#10b981] bg-white rounded-full w-[14px] h-[14px] flex items-center justify-center leading-none text-[10px]">✓</span> IFSCA FME Active</span>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
          /* Keyframes */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeLeft {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulseDot {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.4); }
          }
          @keyframes marqueeTicker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee-ticker {
            animation: marqueeTicker 30s linear infinite;
          }
          
          /* Shimmer Button Effect CSS */
          .get-started-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
            transform: skewX(-20deg);
            animation: shimmerEffect 2.5s ease-in-out infinite;
            z-index: 5;
          }
          @keyframes shimmerEffect {
             0% { left: -100%; }
             100% { left: 200%; }
          }
      `}} />
        </section>
    );
}
