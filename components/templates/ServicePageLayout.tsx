"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export interface TocSection { id: string; title: string; }
export interface QuickFact { label: string; value: string; }
export interface RelatedArticle { href: string; category: string; title: string; description: string; }
export interface BreadcrumbItem { label: string; href?: string; }
export interface Tag { emoji: string; label: string; }

interface ServicePageLayoutProps {
    tags: Tag[];
    breadcrumb: BreadcrumbItem[];
    title: string;
    readTime?: string;
    focusKeyword: string;
    sections: TocSection[];
    ctaTitle: string;
    ctaDescription: string;
    quickFacts: QuickFact[];
    relatedArticles: RelatedArticle[];
    finalCtaTitle: string;
    finalCtaDescription: string;
    children: React.ReactNode;
}

const PHONE = "+919876543210";
const WHATSAPP = "919876543210";

export default function ServicePageLayout({
    tags, breadcrumb, title, readTime = "12 min read", focusKeyword,
    sections, ctaTitle, ctaDescription, quickFacts,
    relatedArticles, finalCtaTitle, finalCtaDescription, children
}: ServicePageLayoutProps) {
    const [activeSection, setActiveSection] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollProgress(totalScroll / windowHeight);
            setShowSticky(totalScroll > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                        entry.target.classList.add("visible");
                    }
                });
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
        );
        document.querySelectorAll("h2, h3").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    };

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(title);
        if (platform === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
        else if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
        else if (platform === "copy") { navigator.clipboard.writeText(window.location.href); }
    };

    return (
        <div className="bg-[#f8faff] min-h-screen font-sans text-gray-800">

            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981] z-50 transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
            />

            {/* ── STICKY WHATSAPP + CALL BUTTONS ───────────────────────────── */}
            <div className={`fixed bottom-6 left-4 z-[199] flex flex-col gap-3 transition-all duration-300 ${showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                {/* WhatsApp */}
                <a
                    href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%20need%20help%20with%20${encodeURIComponent(focusKeyword)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-0 hover:gap-3 overflow-hidden bg-[#25D366] text-white rounded-full h-12 w-12 hover:w-auto hover:px-4 transition-all duration-300 shadow-lg shadow-green-400/30 hover:shadow-green-400/50"
                    title="Chat on WhatsApp"
                >
                    <svg className="w-6 h-6 shrink-0 mx-auto group-hover:mx-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="whitespace-nowrap text-sm font-bold hidden group-hover:block">WhatsApp Us</span>
                </a>

                {/* Call */}
                <a
                    href={`tel:${PHONE}`}
                    className="group flex items-center gap-0 hover:gap-3 overflow-hidden bg-gradient-to-br from-[#0096D6] to-[#0077B6] text-white rounded-full h-12 w-12 hover:w-auto hover:px-4 transition-all duration-300 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50"
                    title="Call Us"
                >
                    <svg className="w-5 h-5 shrink-0 mx-auto group-hover:mx-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span className="whitespace-nowrap text-sm font-bold hidden group-hover:block">Speak with Expert</span>
                </a>
            </div>

            {/* ── HERO HEADER ──────────────────────────────────────────────── */}
            <section
                className="relative pt-24 pb-16 px-6 lg:px-8 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <nav className="text-sm font-medium text-gray-500 mb-8 flex items-center space-x-2 flex-wrap">
                        {breadcrumb.map((item, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span>&gt;</span>}
                                {item.href ? (
                                    <Link href={item.href} className="hover:text-[#0096D6] transition-colors">{item.label}</Link>
                                ) : (
                                    <span className="text-[#0096D6]">{item.label}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">
                                {tag.emoji} {tag.label}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-[36px] font-black text-[#0a1628] leading-[1.2] mb-6 tracking-[-0.02em] max-w-4xl">
                        {title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500 font-medium mb-8">
                        <div className="flex items-center gap-1.5"><span>📅</span> 2026</div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1.5"><span>⏱️</span> {readTime}</div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1.5"><span>👁️</span> Regulatory Guide</div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1.5"><span>✅</span> Expert Reviewed</div>
                    </div>

                    {/* ── HERO CTA (above the fold) ── */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold text-[14px] rounded-xl shadow-lg shadow-blue-300/30 hover:shadow-blue-400/40 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            Book Free Consultation
                        </Link>
                        <a
                            href={`tel:${PHONE}`}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border-2 border-[#0096D6] text-[#0077B6] font-bold text-[14px] rounded-xl hover:bg-blue-50 transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            Speak with an Expert
                        </a>
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%20need%20help%20with%20${encodeURIComponent(focusKeyword)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-[14px] rounded-xl transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            WhatsApp
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="inline-block px-4 py-2 border border-blue-200 bg-white/60 backdrop-blur-sm rounded-full text-sm text-[#0a1628] font-semibold shadow-sm">
                            Focus: <span className="text-[#0096D6]">{focusKeyword}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
                            <span>Expert available now · <strong className="text-gray-700">Response within 2 hours</strong></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN LAYOUT ──────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col xl:flex-row gap-10 items-start">

                {/* Left TOC Sidebar */}
                <aside className="hidden xl:block w-[220px] shrink-0 sticky top-[80px] bg-white border border-[rgba(0,150,220,0.1)] rounded-[16px] p-5 shadow-[0_4px_20px_rgba(0,100,200,0.03)] z-10">
                    <h4 className="text-[12px] font-bold text-[#94a3b8] tracking-[0.1em] uppercase mb-4">Contents</h4>
                    <nav className="flex flex-col space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => scrollToSection(e, section.id)}
                                className={`text-[13px] block py-2 pl-3 rounded-r-lg border-l-[3px] transition-all duration-200 ${activeSection === section.id
                                    ? "border-l-[#0096D6] bg-[rgba(0,150,220,0.06)] text-[#0096D6] font-bold"
                                    : "border-l-transparent text-[#64748b] hover:text-[#0096D6] hover:bg-blue-50/50"}`}
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                    {/* Sidebar mini-CTA */}
                    <div className="mt-5 pt-5 border-t border-gray-100">
                        <Link href="/contact" className="block w-full text-center bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold text-[12px] py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                            📞 Book Consultation
                        </Link>
                    </div>
                </aside>

                {/* Mobile TOC */}
                <div className="xl:hidden w-full bg-white border border-[rgba(0,150,220,0.1)] rounded-[16px] p-5 mb-8 shadow-sm">
                    <details className="group">
                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-[#0096D6]">
                            <span>Contents</span>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
                            </span>
                        </summary>
                        <nav className="flex flex-col space-y-2 mt-4 max-h-[300px] overflow-y-auto">
                            {sections.map((section) => (
                                <a key={section.id} href={`#${section.id}`} onClick={(e) => scrollToSection(e, section.id)}
                                    className="text-[14px] text-gray-600 hover:text-[#0096D6] border-b border-gray-50 pb-2">
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </details>
                </div>

                {/* Main Content */}
                <main className="flex-1 w-full max-w-[760px] bg-white border border-[rgba(0,150,220,0.08)] rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(0,100,200,0.04)] article-content relative overflow-x-auto">
                    <style dangerouslySetInnerHTML={{
                        __html: `
              .article-content h2{font-size:24px;font-weight:800;color:#0a1628;padding:24px 0 8px;margin-top:48px;position:relative;scroll-margin-top:80px;padding-left:16px;transition:all 0.7s ease;opacity:0;transform:translateY(24px)}
              .article-content h2.visible{opacity:1;transform:translateY(0)}
              .article-content h2::before{content:'';position:absolute;left:0;top:28px;bottom:12px;width:4px;background:linear-gradient(180deg,#0096D6,#10b981);border-radius:2px}
              .article-content h2:first-of-type{margin-top:0}
              .article-content h3{font-size:18px;font-weight:700;color:#0077B6;padding:16px 0 4px;scroll-margin-top:80px}
              .article-content h4{font-size:15px;font-weight:700;color:#0a1628;margin-bottom:8px}
              .article-content p{font-size:15px;line-height:1.85;color:#374151;margin-bottom:16px}
              .article-content ul{padding-left:8px;margin-bottom:24px}
              .article-content li{display:flex;align-items:flex-start;margin-bottom:8px;font-size:15px;color:#374151;line-height:1.85}
              .article-content li::before{content:'◆';color:#0096D6;font-size:10px;margin-right:12px;margin-top:6px;flex-shrink:0}
              .numbered-card{background:white;border:1px solid rgba(0,150,220,0.1);border-radius:12px;padding:16px 20px;transition:all 0.3s;margin-bottom:12px;display:flex;align-items:flex-start;gap:16px}
              .numbered-card:hover{transform:translateY(-2px);box-shadow:0 4px 15px rgba(0,100,200,0.08);border-color:rgba(0,150,220,0.3)}
              .num-badge{width:32px;height:32px;flex-shrink:0;border-radius:50%;background:linear-gradient(135deg,#0096D6,#10b981);color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px}
              .faq-accordion summary::-webkit-details-marker{display:none}
              .info-box{background:rgba(0,150,220,0.04);border:1px solid rgba(0,150,220,0.15);border-left:4px solid #0096D6;border-radius:12px;padding:20px 24px;margin:24px 0}
              .warning-box{background:rgba(245,158,11,0.06);border:1px solid #fcd34d;border-left:4px solid #F59E0B;border-radius:12px;padding:20px 24px;margin:24px 0}
              .success-box{background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.2);border-left:4px solid #10b981;border-radius:12px;padding:20px 24px;margin:24px 0}
              .data-table{width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden;border:1px solid rgba(0,150,220,0.15);margin:24px 0}
              .data-table thead tr{background:linear-gradient(90deg,#0077B6,#0096D6);color:white}
              .data-table thead th{padding:14px 16px;font-size:13px;font-weight:700;text-align:left}
              .data-table tbody tr:nth-child(odd){background:white}
              .data-table tbody tr:nth-child(even){background:#fafbff}
              .data-table tbody td{padding:12px 16px;font-size:13px;color:#374151;border-bottom:1px solid rgba(0,150,220,0.08)}
              .step-timeline{position:relative;padding-left:24px;border-left:2px dashed #bfdbfe;margin:32px 0}
              .step-item{position:relative;margin-bottom:32px}
              .step-dot{position:absolute;left:-33px;top:16px;width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#0096D6,#0077B6);box-shadow:0 0 0 4px white}
              .step-card{background:white;border-left:3px solid #0096D6;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 12px 12px 0;padding:16px 20px;transition:box-shadow 0.3s}
              .step-card:hover{box-shadow:0 4px 15px rgba(0,100,200,0.08)}
              .step-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#0096D6;margin-bottom:4px}
              .badge-yes{background:#dcfce7;color:#16a34a;padding:2px 10px;border-radius:999px;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:4px}
              .badge-no{background:#fee2e2;color:#dc2626;padding:2px 10px;border-radius:999px;font-weight:700;font-size:12px}
              .badge-optional{background:#fef3c7;color:#d97706;padding:2px 10px;border-radius:999px;font-weight:700;font-size:12px}
            `}} />
                    {children}

                    {/* ── MID-CONTENT CTA (inside article, after content) ── */}
                    <div className="mt-12 rounded-2xl overflow-hidden border border-blue-100 shadow-md">
                        <div className="bg-gradient-to-r from-[#0077B6] to-[#0096D6] px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
                            <div>
                                <p className="text-white/70 text-[12px] font-bold uppercase tracking-wider mb-1">Expert Assistance</p>
                                <h3 className="text-white font-bold text-[18px] leading-tight">Not sure where to start?</h3>
                                <p className="text-white/80 text-[13px] mt-1">Our compliance experts handle everything — eligibility to approval.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-[#0077B6] font-bold text-[13px] rounded-xl hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap">
                                    📅 Book Consultation
                                </Link>
                                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-[13px] rounded-xl border border-white/30 transition-colors whitespace-nowrap">
                                    📞 Call Now
                                </a>
                            </div>
                        </div>
                        <div className="bg-white px-8 py-3 flex flex-wrap items-center gap-6 text-[12px] text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Free Initial Consultation</span>
                            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> 98% Approval Rate</span>
                            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> 1000+ Businesses Served</span>
                            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> End-to-End Support</span>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-6 sticky top-[80px]">

                    {/* CTA Card */}
                    <div className="rounded-[16px] p-[24px] shadow-lg text-white" style={{ background: "linear-gradient(135deg, #0077B6, #0096D6)" }}>
                        <h3 className="font-bold text-[18px] mb-2 leading-tight">{ctaTitle}</h3>
                        <p className="text-white/80 text-[13px] mb-5 leading-relaxed">{ctaDescription}</p>
                        <Link href="/contact" className="block w-full bg-white text-[#0077B6] font-bold text-[14px] py-3 rounded-xl hover:bg-blue-50 hover:shadow-lg transition duration-300 text-center">
                            📅 Book Free Consultation
                        </Link>
                        <a href={`tel:${PHONE}`} className="block w-full mt-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-[13px] py-2.5 rounded-xl text-center transition-colors border border-white/20">
                            📞 Speak with Expert
                        </a>
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%20need%20help%20with%20${encodeURIComponent(focusKeyword)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full mt-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-[13px] py-2.5 rounded-xl text-center transition-colors"
                        >
                            💬 WhatsApp Us
                        </a>
                        <div className="text-center text-white/70 text-[12px] mt-4 font-medium tracking-wide">
                            ⚡ Response within 2 hours
                        </div>
                    </div>

                    {/* Expert Card */}
                    <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 text-[#0077B6] flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm ring-2 ring-blue-50 shrink-0">
                                DK
                            </div>
                            <div>
                                <h4 className="font-bold text-[15px] text-[#0a1628] leading-tight">CS Devyani Khambhati</h4>
                                <div className="text-[12px] text-[#0096D6] font-medium">Compliance Expert</div>
                            </div>
                        </div>
                        <div className="text-[13px] text-gray-600 leading-relaxed">
                            Specialist in fintech regulatory compliance, government licenses and RBI, SEBI, IRDAI frameworks.
                        </div>
                        <a href="mailto:contact@estabizz.com" className="mt-4 block text-center w-full py-2 bg-blue-50 text-[#0077B6] font-semibold text-[13px] rounded-lg hover:bg-[#0096D6] hover:text-white transition-colors">
                            Ask a Question
                        </a>
                    </div>

                    {/* Quick Facts */}
                    {quickFacts.length > 0 && (
                        <div className="bg-white border border-[rgba(0,150,220,0.15)] rounded-[16px] p-5 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981]" />
                            <h4 className="font-bold text-[#0a1628] flex items-center gap-2 mb-4">
                                <span className="text-[#0096D6]">⚡</span> Quick Facts
                            </h4>
                            <div className="space-y-3">
                                {quickFacts.map((fact, i) => (
                                    <div key={i} className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                        <span className="text-gray-500">{fact.label}</span>
                                        <span className="font-semibold text-[#0a1628] text-right max-w-[120px]">{fact.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share */}
                    <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm text-center">
                        <h4 className="font-bold text-[13px] text-gray-500 uppercase tracking-wider mb-3">Share Guide</h4>
                        <div className="flex justify-center gap-2">
                            <button onClick={() => handleShare("linkedin")} className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </button>
                            <button onClick={() => handleShare("twitter")} className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on X">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </button>
                            <button onClick={() => handleShare("copy")} className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Copy Link">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            </button>
                        </div>
                    </div>

                </aside>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="border-t border-gray-200 bg-white py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-[#0a1628] mb-8 text-center">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((article, i) => (
                                <Link key={i} href={article.href} className="block group">
                                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                                        <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-2">{article.category}</div>
                                        <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2">{article.title}</h3>
                                        <p className="text-[13px] text-gray-500 line-clamp-2">{article.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FINAL CTA ────────────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] py-16 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 text-[12px] font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
                        Experts Available Now
                    </div>
                    <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-4">{finalCtaTitle}</h2>
                    <p className="text-[16px] text-blue-100 mb-8 max-w-2xl mx-auto">{finalCtaDescription}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold rounded-xl shadow-lg transition-all">
                            📅 Book Free Consultation
                        </Link>
                        <a href={`tel:${PHONE}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20">
                            📞 Speak with Expert
                        </a>
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%20need%20compliance%20guidance`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl transition-all"
                        >
                            💬 WhatsApp
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-[13px] text-blue-300">
                        <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Free Initial Consultation</span>
                        <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> 98% Approval Rate</span>
                        <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> 1000+ Businesses Served</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
