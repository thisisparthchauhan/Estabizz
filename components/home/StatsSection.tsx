"use client";
import React, { useEffect, useRef, useState } from "react";

const useCountUp = (end: number, duration: number, isVisible: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let startTimestamp: number;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            // Calculate taking decimals into account
            const currentVal = easeProgress * end;

            // If end has decimals (like 98.6), preserve 1 decimal place, otherwise floor
            if (end % 1 !== 0) {
                setCount(Number(currentVal.toFixed(1)));
            } else {
                setCount(Math.floor(currentVal));
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration, isVisible]);

    return count;
};

const StatCard = ({ icon, endValue, suffix = "", label, hasCount = true, isVisible, delay }: any) => {
    const count = useCountUp(hasCount ? endValue : 0, 1800, isVisible);

    return (
        <div
            className={`bg-white/80 backdrop-blur-[16px] border border-[rgba(0,150,220,0.12)] rounded-2xl p-6 text-center shadow-[0_8px_32px_rgba(0,100,200,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,100,200,0.15)] transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${delay}s`
      }}
    >
      <div className="text-[24px] mb-4">{icon}</div>
      <div className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-tight mb-1">
        {hasCount ? count : endValue}{suffix}
      </div>
      <div className="text-[14px] font-bold text-[#64748b] tracking-wide">{label}</div>
    </div>
  );
};

export default function StatsSection() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative bg-transparent z-10 w-full max-w-[1240px] mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="🏆" endValue={500} suffix="+" label="Licenses Obtained" isVisible={isVisible} delay={0.1} />
        <StatCard icon="🏢" endValue={1000} suffix="+" label="Businesses Served" isVisible={isVisible} delay={0.2} />
        <StatCard icon="✅" endValue={98.6} suffix="%" label="Approval Rate" isVisible={isVisible} delay={0.3} />
        <StatCard icon="⚡" endValue="48hr" suffix="" label="Processing" hasCount={false} isVisible={isVisible} delay={0.4} />
      </div>
    </section>
  );
}
