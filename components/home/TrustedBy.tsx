"use client";
import React, { useEffect, useRef, useState } from "react";

const companies = [
    "Tata Capital", "Bajaj Finance", "PhonePe", "Razorpay", "CRED",
    "Paytm", "Zerodha", "Groww", "PolicyBazaar", "HDFC Securities",
    "Angel One", "Upstox", "Lendingkart", "ZestMoney", "Rupeek",
    "NoBroker", "Ola Financial", "Pine Labs", "BharatPe", "Jupiter",
];

const regulatorBadges = [
    { label: "RBI Compliant", icon: "🏛️" },
    { label: "SEBI Registered", icon: "📊" },
    { label: "IRDAI Licensed", icon: "🛡️" },
    { label: "IFSCA Authorized", icon: "🌐" },
    { label: "ISO 27001", icon: "🔒" },
];

const midpoint = Math.ceil(companies.length / 2);
const row1 = companies.slice(0, midpoint);
const row2 = companies.slice(midpoint);

export default function TrustedBy() {
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
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const renderCard = (name: string, index: number) => (
        <div
            key={`${name}-${index}`}
            className="flex-shrink-0 bg-white border border-gray-200 rounded-lg px-6 py-3 mx-2 shadow-sm hover:shadow-md hover:border-[#0096D6] transition-all duration-300 hover:-translate-y-0.5 cursor-default flex items-center justify-center min-w-[140px]"
        >
            <span className="font-bold text-[#0a1628] text-sm whitespace-nowrap">{name}</span>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className={`py-16 md:py-24 bg-[#f8faff] overflow-hidden relative transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
            {/* Header */}
            <div className="max-w-[1240px] mx-auto px-6 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1628] mb-3">
                    Trusted by Leading Businesses
                </h2>
                <p className="text-[15px] text-[#64748b] font-medium max-w-[520px] mx-auto">
                    From startups to enterprises, we serve clients across regulatory domains
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full max-w-[1400px] mx-auto">
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[140px] bg-gradient-to-r from-[#f8faff] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-[80px] md:w-[140px] bg-gradient-to-l from-[#f8faff] to-transparent z-10 pointer-events-none"></div>

                {/* Row 1 - Scroll Left */}
                <div className="flex w-fit animate-marquee-left mb-4 whitespace-nowrap">
                    {[...row1, ...row1, ...row1, ...row1].map((c, i) => renderCard(c, i))}
                </div>

                {/* Row 2 - Scroll Right */}
                <div className="flex w-fit animate-marquee-right whitespace-nowrap">
                    {[...row2, ...row2, ...row2, ...row2].map((c, i) => renderCard(c, i))}
                </div>
            </div>

            {/* Regulator Trust Badges */}
            <div className="max-w-[1240px] mx-auto px-6 mt-12 flex flex-wrap justify-center gap-3">
                {regulatorBadges.map((badge) => (
                    <div
                        key={badge.label}
                        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm text-[12px] font-semibold text-[#334155]"
                    >
                        <span className="text-[14px]">{badge.icon}</span>
                        {badge.label}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
      `}} />
        </section>
    );
}
