"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export interface TocSection { id: string; title: string; }
export interface QuickFact { label: string; value: string; }
export interface RelatedArticle { href: string; category: string; title: string; description: string; }
export interface BreadcrumbItem { label: string; href?: string; }
export interface Tag { emoji: string; label: string; }

interface ServicePageLayoutProps {
    // Hero
    tags: Tag[];
    breadcrumb: BreadcrumbItem[];
    title: string;
    heroDescription?: React.ReactNode;
    heroActions?: React.ReactNode;
    trustLine?: string;
    readTime?: string;
    displayYear?: string;
    focusKeyword: string;
    // TOC
    sections: TocSection[];
    // Right sidebar
    ctaTitle: string;
    ctaDescription: string;
    quickFacts: QuickFact[];
    // Related
    relatedArticles: RelatedArticle[];
    // Final CTA
    finalCtaTitle: string;
    finalCtaDescription: string;
    finalCtaActions?: React.ReactNode;
    // Content
    children: React.ReactNode;
}

export default function ServicePageLayout({
    tags, breadcrumb, title, heroDescription, heroActions, trustLine, readTime = "12 min read", displayYear = "2026", focusKeyword,
    sections, ctaTitle, ctaDescription, quickFacts,
    relatedArticles, finalCtaTitle, finalCtaDescription, finalCtaActions, children
}: ServicePageLayoutProps) {
    const [activeSection, setActiveSection] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollProgress(totalScroll / windowHeight);
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

    const insightCards = quickFacts.slice(0, 4);

    return (
        <div className="min-h-screen bg-[#f6f9ff] dark:bg-[#06101f] font-sans text-gray-800 dark:text-[#f7f9fc]">
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#1677f2] to-[#0866d9] z-[120] transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
            />

            {/* Hero Header */}
            <section
                className="relative pt-24 pb-10 px-6 lg:px-8 border-b border-blue-100 dark:border-[#223550] overflow-hidden bg-white dark:bg-[#0d1a2d]"
            >
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 pointer-events-none h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="absolute -left-24 top-16 h-[360px] w-[360px] rounded-full bg-[#1677f2]/10 blur-[100px] pointer-events-none" />
                <div className="absolute -right-24 bottom-8 h-[360px] w-[360px] rounded-full bg-[#1677f2]/12 blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <nav className="text-sm font-semibold text-gray-500 dark:text-[#a9b6c9] mb-8 flex items-center space-x-2 flex-wrap">
                        {breadcrumb.map((item, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span>&gt;</span>}
                                {item.href ? (
                                    <Link href={item.href} className="hover:text-[#1677f2] transition-colors">{item.label}</Link>
                                ) : (
                                    <span className="text-[#1677f2]">{item.label}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
                        <div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mb-7">
                                {tags.map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/80 dark:bg-[#0a1628]/80 text-[#1677f2] border border-blue-100 dark:border-[#223550] rounded-full text-xs font-bold shadow-sm backdrop-blur-sm">
                                        {tag.emoji} {tag.label}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-[30px] md:text-[44px] font-black text-[#120b45] dark:text-[#f7f9fc] leading-[1.08] mb-5 tracking-[-0.03em] max-w-4xl">
                                {title}
                            </h1>

                            {heroDescription && (
                                <div className="max-w-4xl text-[17px] leading-[1.85] text-[#475569] dark:text-[#a9b6c9] mb-7">
                                    {heroDescription}
                                </div>
                            )}

                            {heroActions && (
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-7">
                                    {heroActions}
                                </div>
                            )}

                            {trustLine && (
                                <div className="max-w-4xl text-[14px] font-semibold text-[#0a1628] dark:text-[#f7f9fc] bg-white/78 dark:bg-[#12223a]/80 border border-blue-100 dark:border-[#223550] rounded-2xl px-5 py-4 mb-7 shadow-[0_14px_34px_rgba(0,100,200,0.08)] backdrop-blur-md">
                                    {trustLine}
                                </div>
                            )}

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-[13.5px] text-[#64748b] dark:text-[#a9b6c9] font-semibold mb-6">
                                <div className="flex items-center gap-1.5"><span>📅</span> {displayYear}</div>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1.5"><span>⏱️</span> {readTime}</div>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1.5"><span>👁️</span> Regulatory Guide</div>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1.5"><span>✅</span> Expert Reviewed</div>
                            </div>

                            <div className="inline-block px-5 py-3 border border-blue-200 dark:border-[#223550] bg-white/76 dark:bg-[#0d1a2d]/80 backdrop-blur-sm rounded-full text-sm text-[#0a1628] dark:text-[#f7f9fc] font-bold shadow-sm">
                                Focus: <span className="text-[#1677f2]">{focusKeyword}</span>
                            </div>
                        </div>

                        <div className="hidden lg:block lg:sticky lg:top-[88px]">
                            <div className="relative overflow-hidden rounded-[26px] border border-blue-100 dark:border-[#223550] bg-white dark:bg-[#0d1a2d] p-6 shadow-[0_22px_60px_rgba(0,80,140,0.10)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.35)]">
                                <div className="absolute right-[-80px] top-[-80px] h-44 w-44 rounded-full bg-[#dff2ff] blur-3xl" />
                                <div className="relative">
                                    <div className="mb-5 flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-[10.5px] font-black uppercase tracking-[0.22em] text-[#1677f2]">Licence Snapshot</div>
                                            <div className="mt-1.5 text-[20px] font-black leading-tight text-[#120b45] dark:text-[#f7f9fc]">{ctaTitle}</div>
                                        </div>
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0a1628] text-base font-black text-white shadow-lg">E</div>
                                    </div>

                                    <p className="mb-5 text-[13.5px] font-medium leading-6 text-[#64748b] dark:text-[#a9b6c9]">{ctaDescription}</p>

                                    <div className="mb-5 grid grid-cols-2 gap-2.5">
                                        {quickFacts.slice(0, 4).map((fact, i) => (
                                            <div key={`${fact.label}-${i}`} className="rounded-xl border border-blue-100 dark:border-[#223550] bg-[#f8fbff] dark:bg-[#12223a] p-3.5">
                                                <div className="text-[9.5px] font-black uppercase tracking-[0.14em] text-[#64748b] dark:text-[#a9b6c9]">{fact.label}</div>
                                                <div className="mt-1 text-[13.5px] font-black leading-snug text-[#0a1628] dark:text-[#f7f9fc]">{fact.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href="/contact" className="block w-full rounded-2xl bg-[#1677f2] px-5 py-3.5 text-center text-[14px] font-black text-white shadow-[0_16px_34px_rgba(22,119,242,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">
                                        Book Free Consultation
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {insightCards.length > 0 && (
                <section className="relative z-20 -mt-7 px-5 md:px-6 lg:hidden">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 rounded-[28px] border border-blue-100 dark:border-[#223550] bg-white/92 dark:bg-[#0d1a2d]/92 p-3 shadow-[0_24px_70px_rgba(0,100,200,0.10)] backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-4">
                        {insightCards.map((fact, i) => (
                            <div key={`${fact.label}-${i}`} className="rounded-[22px] border border-blue-50 dark:border-[#223550] bg-gradient-to-br from-[#f8fbff] to-white dark:from-[#12223a] dark:to-[#0d1a2d] p-5">
                                <div className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#64748b] dark:text-[#a9b6c9]">{fact.label}</div>
                                <div className="text-[18px] font-black leading-tight text-[#0a1628] dark:text-[#f7f9fc]">{fact.value}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Main Layout */}
            <div className="max-w-[1480px] mx-auto px-5 md:px-6 py-10 md:py-12 flex flex-col xl:flex-row gap-7 2xl:gap-10 items-start">

                {/* Left TOC Sidebar */}
                <aside className="hidden xl:block w-[286px] shrink-0 sticky top-[88px] bg-white/88 dark:bg-[#0d1a2d]/90 border border-[rgba(0,150,220,0.12)] dark:border-[#223550] rounded-[24px] p-5 shadow-[0_18px_46px_rgba(0,100,200,0.08)] backdrop-blur-xl z-10">
                    <h4 className="text-[12px] font-black text-[#94a3b8] dark:text-[#a9b6c9] tracking-[0.18em] uppercase mb-5">Contents</h4>
                    <nav className="flex flex-col gap-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => scrollToSection(e, section.id)}
                                className={`text-[13.5px] block py-3 pl-4 pr-3 rounded-xl border-l-[3px] leading-snug transition-all duration-200 ${activeSection === section.id
                                    ? "border-l-[#1677f2] bg-[rgba(0,150,220,0.08)] dark:bg-[#1677f2]/10 text-[#1677f2] font-black shadow-sm"
                                    : "border-l-transparent text-[#64748b] dark:text-[#a9b6c9] hover:text-[#1677f2] hover:bg-blue-50/70 dark:hover:bg-[#12223a]"}`}
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Mobile TOC */}
                <div className="xl:hidden w-full bg-white/90 dark:bg-[#0d1a2d]/90 border border-[rgba(0,150,220,0.12)] dark:border-[#223550] rounded-[22px] p-5 mb-4 shadow-[0_14px_34px_rgba(0,100,200,0.08)] backdrop-blur-xl">
                    <details className="group">
                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-[#1677f2]">
                            <span>Contents</span>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
                            </span>
                        </summary>
                        <nav className="flex flex-col gap-2 mt-4 max-h-[320px] overflow-y-auto">
                            {sections.map((section) => (
                                <a key={section.id} href={`#${section.id}`} onClick={(e) => scrollToSection(e, section.id)}
                                    className="text-[14px] text-gray-600 dark:text-[#a9b6c9] hover:text-[#1677f2] dark:hover:text-[#60a5fa] border-b border-gray-50 dark:border-[#223550] pb-2 leading-snug">
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </details>
                </div>

                {/* Main Content */}
                <main className="flex-1 w-full max-w-[860px] bg-white dark:bg-[#0d1a2d] border border-[rgba(0,150,220,0.10)] dark:border-[#223550] rounded-[28px] p-6 md:p-9 lg:p-12 shadow-[0_24px_70px_rgba(0,100,200,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)] article-content relative overflow-x-auto">
                    <style dangerouslySetInnerHTML={{
                        __html: `
              .article-content{font-feature-settings:"kern";letter-spacing:0}
              .article-content h2{font-size:30px;font-weight:900;color:#0a1628;padding:28px 0 10px;margin-top:54px;position:relative;scroll-margin-top:92px;padding-left:18px;transition:all 0.7s ease;opacity:0;transform:translateY(24px);line-height:1.2;letter-spacing:-0.015em}
              .article-content h2.visible{opacity:1;transform:translateY(0)}
              .article-content h2::before{content:'';position:absolute;left:0;top:32px;bottom:14px;width:5px;background:linear-gradient(180deg,#1677f2,#0866d9);border-radius:999px}
              .article-content h2:first-of-type{margin-top:0}
              .article-content h3{font-size:21px;font-weight:800;color:#0077B6;padding:18px 0 6px;scroll-margin-top:92px;line-height:1.35}
              .article-content h4{font-size:16px;font-weight:800;color:#0a1628;margin-bottom:10px}
              .article-content p{font-size:16.5px;line-height:1.95;color:#334155;margin-bottom:20px}
              .article-content ul,.article-content ol{padding-left:4px;margin-bottom:28px}
              .article-content ul{list-style:none}
              .article-content ol{list-style:none;counter-reset:li-counter}
              .article-content li{position:relative;padding-left:24px;margin-bottom:12px;font-size:15.5px;color:#334155;line-height:1.9;display:block}
              .article-content ul>li::before{content:'◆';color:#1677f2;font-size:10px;position:absolute;left:0;top:9px;line-height:1}
              .article-content ol>li::before{counter-increment:li-counter;content:counter(li-counter)'.';color:#1677f2;font-size:12px;font-weight:800;position:absolute;left:0;top:4px;line-height:1}
              .article-content li strong{color:#0a1628}
              .article-content li a{color:#1677f2;text-decoration:underline}
              .article-content p a,.article-content td a{color:#1677f2;text-decoration:underline}
              .article-content p strong{color:#0a1628}
              .article-content .clean-list{display:grid;gap:10px;margin:18px 0 28px}
              .article-content .clean-list li{background:linear-gradient(135deg,#f8fbff,#ffffff);border:1px solid rgba(0,150,220,0.12);border-radius:16px;padding:14px 16px 14px 38px;margin:0;box-shadow:0 6px 20px rgba(0,100,200,0.035)}
              .article-content .clean-list li::before{left:15px;top:20px}
              .article-content .numbered-list{display:grid;gap:10px;margin:18px 0 28px;counter-reset:li-counter}
              .article-content .numbered-list li{background:#fff;border:1px solid rgba(0,150,220,0.12);border-radius:16px;padding:15px 18px 15px 48px;margin:0;box-shadow:0 8px 24px rgba(0,100,200,0.045)}
              .article-content .numbered-list li::before{left:15px;top:14px;width:20px;height:20px;border-radius:999px;background:#e0f2fe;display:flex;align-items:center;justify-content:center}
              .article-content .field-label{font-weight:800;color:#0a1628}
              .article-content .process-card{background:linear-gradient(135deg,#ffffff,#f8fbff);border:1px solid rgba(0,150,220,0.14);border-left:5px solid #1677f2;border-radius:18px;padding:20px 22px;margin:20px 0;box-shadow:0 10px 28px rgba(0,100,200,0.06)}
              .article-content .process-card h3{padding:0;margin:0 0 8px 0;color:#0a1628;font-size:16px}
              .article-content .process-card p{margin:0;font-size:14px;line-height:1.75}
              .numbered-card{background:white;border:1px solid rgba(0,150,220,0.12);border-radius:18px;padding:18px 22px;transition:all 0.3s;margin-bottom:14px;display:flex;align-items:flex-start;gap:16px;box-shadow:0 8px 22px rgba(0,100,200,0.04)}
              .numbered-card:hover{transform:translateY(-3px);box-shadow:0 14px 34px rgba(0,100,200,0.10);border-color:rgba(0,150,220,0.32)}
              .num-badge{width:34px;height:34px;flex-shrink:0;border-radius:14px;background:linear-gradient(135deg,#1677f2,#0866d9);color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px}
              .faq-accordion{margin:28px 0}
              .faq-item{border:1px solid #e2e8f0;border-radius:16px;margin-bottom:12px;overflow:hidden;background:white;box-shadow:0 8px 22px rgba(0,100,200,0.035)}
              .faq-item summary{padding:18px 22px;cursor:pointer;font-weight:700;font-size:15.5px;color:#0a1628;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px}
              .faq-item summary::-webkit-details-marker{display:none}
              .faq-item summary::after{content:'▼';color:#1677f2;font-size:11px;flex-shrink:0;transition:transform 0.2s}
              .faq-item[open] summary::after{transform:rotate(180deg)}
              .faq-item summary:hover{background:#f0f9ff}
              .faq-item>div{padding:0 22px 18px 22px;font-size:15px;color:#374151;line-height:1.8;border-top:1px solid #f1f5f9}
              .faq-accordion summary::-webkit-details-marker{display:none}
              .expert-quote{background:linear-gradient(135deg,#f0f9ff,#eaf6ff);border-left:5px solid #1677f2;border-radius:0 18px 18px 0;padding:24px 28px;margin:36px 0;box-shadow:0 10px 26px rgba(0,100,200,0.05)}
              .expert-quote blockquote{font-size:16px;font-style:italic;color:#0a1628;line-height:1.75;margin:0 0 10px 0}
              .expert-quote cite{font-size:13px;color:#64748b;font-style:normal;font-weight:600}
              .info-box{background:rgba(0,150,220,0.05);border:1px solid rgba(0,150,220,0.16);border-left:5px solid #1677f2;border-radius:18px;padding:22px 26px;margin:28px 0}
              .warning-box{background:rgba(245,158,11,0.07);border:1px solid #fcd34d;border-left:5px solid #F59E0B;border-radius:18px;padding:22px 26px;margin:28px 0}
              .success-box{background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.22);border-left:5px solid #10b981;border-radius:18px;padding:22px 26px;margin:28px 0}
              .data-table{width:100%;border-collapse:collapse;border-radius:18px;overflow:hidden;border:1px solid rgba(0,150,220,0.15);margin:28px 0;box-shadow:0 10px 28px rgba(0,100,200,0.05)}
              .data-table thead tr{background:linear-gradient(90deg,#0866d9,#1677f2);color:white}
              .data-table thead th{padding:15px 17px;font-size:13px;font-weight:800;text-align:left}
              .data-table tbody tr:nth-child(odd){background:white}
              .data-table tbody tr:nth-child(even){background:#fafbff}
              .data-table tbody td{padding:14px 17px;font-size:13.5px;color:#374151;border-bottom:1px solid rgba(0,150,220,0.08);line-height:1.65}
              .step-timeline{position:relative;padding-left:26px;border-left:2px dashed #bfdbfe;margin:36px 0}
              .step-item{position:relative;margin-bottom:32px}
              .step-dot{position:absolute;left:-33px;top:16px;width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#1677f2,#0866d9);box-shadow:0 0 0 4px white}
              .step-card{background:white;border-left:4px solid #1677f2;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 18px 18px 0;padding:18px 22px;transition:box-shadow 0.3s}
              .step-card:hover{box-shadow:0 12px 28px rgba(0,100,200,0.09)}
              .step-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#1677f2;margin-bottom:4px}
              .badge-yes{background:#dcfce7;color:#16a34a;padding:2px 10px;border-radius:999px;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:4px}
              .badge-no{background:#fee2e2;color:#dc2626;padding:2px 10px;border-radius:999px;font-weight:700;font-size:12px}
              .badge-optional{background:#fef3c7;color:#d97706;padding:2px 10px;border-radius:999px;font-weight:700;font-size:12px}
              @media(max-width:768px){
                .article-content h2{font-size:25px;margin-top:42px}
                .article-content h3{font-size:19px}
                .article-content p{font-size:15.5px;line-height:1.85}
                .article-content li{font-size:15px}
              }
              /* ── Dark mode overrides ───────────────────────────── */
              .dark .article-content h2{color:#f7f9fc}
              .dark .article-content h3{color:#60a5fa}
              .dark .article-content h4{color:#f7f9fc}
              .dark .article-content p{color:#a9b6c9}
              .dark .article-content li{color:#a9b6c9}
              .dark .article-content li strong{color:#f7f9fc}
              .dark .article-content p strong{color:#f7f9fc}
              .dark .article-content .clean-list li{background:linear-gradient(135deg,#12223a,#0d1a2d);border-color:rgba(34,53,80,0.8)}
              .dark .article-content .numbered-list li{background:#0d1a2d;border-color:rgba(34,53,80,0.8)}
              .dark .article-content .numbered-list li::before{background:#1e3050}
              .dark .article-content .field-label{color:#f7f9fc}
              .dark .article-content .process-card{background:linear-gradient(135deg,#12223a,#0d1a2d);border-color:rgba(34,53,80,0.8)}
              .dark .article-content .process-card h3{color:#f7f9fc}
              .dark .article-content .process-card p{color:#a9b6c9}
              .dark .numbered-card{background:#0d1a2d;border-color:rgba(34,53,80,0.8)}
              .dark .faq-item{background:#0d1a2d;border-color:#223550}
              .dark .faq-item summary{color:#f7f9fc}
              .dark .faq-item summary:hover{background:#12223a}
              .dark .faq-item>div{color:#a9b6c9;border-top-color:#223550}
              .dark .expert-quote{background:linear-gradient(135deg,#0d1a2d,#12223a)}
              .dark .expert-quote blockquote{color:#f7f9fc}
              .dark .expert-quote cite{color:#a9b6c9}
              .dark .info-box{background:rgba(22,119,242,0.08);border-color:rgba(34,53,80,0.8)}
              .dark .warning-box{background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.3)}
              .dark .success-box{background:rgba(16,185,129,0.08);border-color:rgba(16,185,129,0.3)}
              .dark .data-table{border-color:#223550}
              .dark .data-table tbody tr:nth-child(odd){background:#0d1a2d}
              .dark .data-table tbody tr:nth-child(even){background:#12223a}
              .dark .data-table tbody td{color:#a9b6c9;border-bottom-color:#223550}
              .dark .step-timeline{border-left-color:#223550}
              .dark .step-dot{box-shadow:0 0 0 4px #06101f}
              .dark .step-card{background:#0d1a2d;border-color:#223550;border-left-color:#1677f2}
              .dark .badge-yes{background:rgba(22,163,74,0.15);color:#4ade80}
              .dark .badge-no{background:rgba(220,38,38,0.15);color:#f87171}
              .dark .badge-optional{background:rgba(217,119,6,0.15);color:#fbbf24}
            `}} />
                    {children}
                </main>

                {/* Right Sidebar */}
                <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-6 sticky top-[88px]">

                    {/* CTA Card */}
                    <div className="relative overflow-hidden rounded-[24px] p-[26px] shadow-[0_24px_60px_rgba(22,119,242,0.25)] text-white" style={{ background: "linear-gradient(135deg, #1677f2, #0866d9)" }}>
                        <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
                        <div className="relative">
                        <h3 className="font-black text-[21px] mb-3 leading-tight">{ctaTitle}</h3>
                        <p className="text-white/86 text-[14px] mb-6 leading-7">{ctaDescription}</p>
                        <Link href="/contact" className="block w-full bg-white text-[#1677f2] font-black text-[14px] py-3.5 rounded-2xl hover:bg-blue-50 hover:shadow-lg transition duration-300 text-center">
                            📞 Book Free Consultation
                        </Link>
                        <div className="text-center text-white/78 text-[12px] mt-4 font-bold tracking-wide">
                            ⚡ Response within 24 hours
                        </div>
                        </div>
                    </div>

                    {/* Expert Card */}
                    <div className="bg-white dark:bg-[#0d1a2d] border border-blue-100 dark:border-[#223550] rounded-[24px] p-5 shadow-[0_16px_42px_rgba(0,100,200,0.06)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.30)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 dark:from-[#1e3050] dark:to-[#12223a] text-[#0077B6] flex items-center justify-center font-bold text-xl border-2 border-white dark:border-[#223550] shadow-sm ring-2 ring-blue-50 dark:ring-[#223550] shrink-0">
                                DK
                            </div>
                            <div>
                                <h4 className="font-bold text-[15px] text-[#0a1628] dark:text-[#f7f9fc] leading-tight">CS Devyani Khambhati</h4>
                                <div className="text-[12px] text-[#1677f2] font-medium">Compliance Expert</div>
                            </div>
                        </div>
                        <div className="text-[13.5px] text-gray-600 dark:text-[#a9b6c9] leading-relaxed">
                            Specialist in fintech regulatory compliance, government licenses and RBI, SEBI, IRDAI frameworks.
                        </div>
                        <a href="mailto:support@estabizz.com" className="mt-4 block text-center w-full py-2.5 bg-blue-50 dark:bg-[#12223a] text-[#0077B6] dark:text-[#60a5fa] font-bold text-[13px] rounded-xl hover:bg-[#1677f2] hover:text-white transition-colors">
                            Ask a Question
                        </a>
                    </div>

                    {/* Quick Facts */}
                    {quickFacts.length > 0 && (
                        <div className="bg-white dark:bg-[#0d1a2d] border border-[rgba(0,150,220,0.15)] dark:border-[#223550] rounded-[24px] p-5 shadow-[0_16px_42px_rgba(0,100,200,0.06)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.30)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1677f2] to-[#10b981]" />
                            <h4 className="font-bold text-[#0a1628] dark:text-[#f7f9fc] flex items-center gap-2 mb-4">
                                <span className="text-[#1677f2]">⚡</span> Quick Facts
                            </h4>
                            <div className="space-y-3">
                                {quickFacts.map((fact, i) => (
                                    <div key={i} className="flex justify-between items-center gap-4 text-[13px] border-b border-gray-50 dark:border-[#223550] pb-3 last:border-0 last:pb-0">
                                        <span className="text-gray-500 dark:text-[#a9b6c9]">{fact.label}</span>
                                        <span className="font-semibold text-[#0a1628] dark:text-[#f7f9fc] text-right max-w-[120px]">{fact.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share */}
                    <div className="bg-white dark:bg-[#0d1a2d] border border-blue-100 dark:border-[#223550] rounded-[24px] p-5 shadow-[0_16px_42px_rgba(0,100,200,0.06)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.30)] text-center">
                        <h4 className="font-bold text-[13px] text-gray-500 dark:text-[#a9b6c9] uppercase tracking-wider mb-3">Share Guide</h4>
                        <div className="flex justify-center gap-2">
                            <button onClick={() => handleShare("linkedin")} className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#12223a] text-[#0077B6] dark:text-[#60a5fa] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </button>
                            <button onClick={() => handleShare("twitter")} className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#12223a] text-[#0077B6] dark:text-[#60a5fa] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on X">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </button>
                            <button onClick={() => handleShare("copy")} className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#12223a] text-[#0077B6] dark:text-[#60a5fa] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Copy Link">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            </button>
                        </div>
                    </div>

                </aside>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="border-t border-blue-100 dark:border-[#223550] bg-[#f8fbff] dark:bg-[#0a1628] py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-[#0a1628] dark:text-[#f7f9fc] mb-8 text-center">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((article, i) => (
                                <Link key={i} href={article.href} className="block group">
                                    <div className="bg-white dark:bg-[#0d1a2d] border border-blue-100 dark:border-[#223550] rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,100,200,0.10)] dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.40)] hover:border-blue-200 dark:hover:border-[#1677f2]/40 transition-all h-full">
                                        <div className="text-[12px] font-bold text-[#1677f2] uppercase tracking-wider mb-2">{article.category}</div>
                                        <h3 className="text-[16px] font-bold text-[#0a1628] dark:text-[#f7f9fc] group-hover:text-[#1677f2] transition-colors mb-2">{article.title}</h3>
                                        <p className="text-[13px] text-gray-500 dark:text-[#a9b6c9] line-clamp-2">{article.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0c2040] py-20 text-center px-6">
                <div className="absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-4">{finalCtaTitle}</h2>
                    <p className="text-[16px] text-blue-100 mb-8 max-w-2xl mx-auto">{finalCtaDescription}</p>
                    {finalCtaActions ? (
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                            {finalCtaActions}
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-[#1677f2] hover:bg-[#0866d9] text-white font-bold rounded-xl shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all">
                                Get Started Free →
                            </Link>
                            <a href="tel:9825600907" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20">
                                Talk to Expert
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
