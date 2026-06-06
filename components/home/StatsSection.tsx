"use client";
import React, { useEffect, useRef, useState } from "react";

const StatCard = ({ icon, value, label, isVisible, delay }: { icon: string; value: string; label: string; isVisible: boolean; delay: number }) => {
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
        {value}
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
        <StatCard icon="🏆" value="500+" label="Licences & Regulatory Assignments" isVisible={isVisible} delay={0.1} />
        <StatCard icon="🏢" value="1000+" label="Businesses Served" isVisible={isVisible} delay={0.2} />
        <StatCard icon="🤝" value="100+" label="Associate Professionals" isVisible={isVisible} delay={0.3} />
        <StatCard icon="🌐" value="45+" label="Countries Supported" isVisible={isVisible} delay={0.4} />
      </div>
    </section>
  );
}
