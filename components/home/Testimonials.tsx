"use client";
import React, { useEffect, useRef, useState } from "react";

const testimonials = [
    {
        name: "Rahul M.",
        role: "Founder, FinTech Startup",
        text: "Securing our NBFC license felt like an impossible maze until we partnered with Estabizz. Their team didn't just file papers; they structured our entire compliance framework. We got our approval 2 months ahead of schedule.",
        rating: 5,
        avatar: "RM"
    },
    {
        name: "Priya S.",
        role: "CFO, Investment Firm",
        text: "The level of clarity and accountability Estabizz brings is unmatched. They handled our SEBI AIF registration with absolute precision. Their ex-regulator insights saved us from multiple operational bottlenecks.",
        rating: 5,
        avatar: "PS"
    },
    {
        name: "Amit D.",
        role: "CEO, Insurance Aggregator",
        text: "IRDAI compliance is complex, but Estabizz made it seamless. From the initial net-worth structuring to the final platform approval, their end-to-end ownership gave us complete peace of mind. Highly recommended.",
        rating: 5,
        avatar: "AD"
    },
    {
        name: "Siddharth V.",
        role: "Director, Payment Gateway",
        text: "Applying for an RBI Payment Aggregator license is daunting. Estabizz guided us through the rigorous data localization and security audits seamlessly. Their portal is a game-changer for tracking progress.",
        rating: 5,
        avatar: "SV"
    },
    {
        name: "Neha K.",
        role: "Operations Head, GIFT City Fund",
        text: "Setting up our operations in IFSCA GIFT City required a deep understanding of international financial regulations. The team at Estabizz delivered flawlessly. We were operational in record time.",
        rating: 5,
        avatar: "NK"
    },
    {
        name: "Vikram R.",
        role: "Managing Director, Lending Platform",
        text: "We migrated our entire ongoing compliance management to Estabizz. The automated alerts, structured reporting, and dedicated advisory have completely removed our risk of non-compliance. A true partner.",
        rating: 5,
        avatar: "VR"
    }
];

export default function Testimonials() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);

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

    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-transparent border-t border-[rgba(0,150,220,0.1)]">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-4">
                        Client Testimonials
                    </h2>
                    <p className="text-[16px] text-[#475569] font-medium font-bold text-[#0096D6]">
                        Over 1000+ businesses trust us with their regulatory journey.
                    </p>
                </div>

                {/* Auto-scrolling Carousel */}
                <div
                    className="relative w-full overflow-hidden pb-10"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className={`flex gap-6 w-max items-stretch transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'} ${isHovered ? '[animation-play-state:paused]' : ''}`}
                        style={{
                            animation: 'scrollingCarousel 40s linear infinite',
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="w-[350px] sm:w-[400px] shrink-0 bg-white/70 backdrop-blur-[16px] border border-[rgba(0,150,220,0.1)] rounded-[20px] p-8 relative flex flex-col group hover:bg-white/95 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,100,200,0.12)] transition-all duration-500 ease-out"
                            >
                                {/* Quote Mark */}
                                <div className="absolute top-6 right-6 text-[60px] font-serif text-[rgba(0,150,220,0.1)] leading-none select-none pointer-events-none group-hover:text-[rgba(0,150,220,0.15)] transition-colors">
                                    "
                                </div>

                                {/* Star Rating */}
                                <div className="flex gap-1 mb-5">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-[#F59E0B] text-[16px]">★</span>
                                    ))}
                                </div>

                                {/* Testimonial Body */}
                                <p className="text-[14.5px] text-[#475569] leading-[1.8] font-medium mb-8 flex-grow">
                                    {testimonial.text}
                                </p>

                                {/* Author Avatar & Details */}
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-[45px] h-[45px] rounded-full bg-gradient-to-br from-[#0096D6] to-[#00B4E0] text-white flex items-center justify-center font-bold text-[14px] shadow-sm shrink-0">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-bold text-[#0a1628] leading-tight mb-0.5">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-[12px] font-semibold text-[#0096D6]">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Edge fade masks */}
                    <div className="absolute top-0 bottom-0 left-0 w-[80px] lg:w-[150px] bg-gradient-to-r from-[#f8faff] to-transparent pointer-events-none z-10"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-[80px] lg:w-[150px] bg-gradient-to-l from-[#f8faff] to-transparent pointer-events-none z-10"></div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scrollingCarousel {
                0 % { transform: translateX(0); }
                 100% {transform: translateX(-50%); }
               }
            `}}/>
        </section>
    );
}
