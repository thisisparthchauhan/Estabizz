"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface MenuCategory { label: string; icon: string; items: string[]; }
interface MegaMenu { categories: MenuCategory[]; viewAll: string; viewAllLabel: string; }

const linkMap: Record<string, string> = {
    // IFSCA (existing)
    "Finance Company GIFT IFSC": "/ifsca/finance-company",
    "IFSCA Factoring License": "/regulatory/ifsca-factoring-license-gift-city",
    "PSP License IFSCA": "/ifsca/psp-license",
    // RBI / NBFC
    "NBFC Registration": "/rbi/nbfc-account-aggregator-license",
    "NBFC Account Aggregator": "/rbi/nbfc-account-aggregator-license",
    "Account Aggregator": "/rbi/nbfc-account-aggregator-license",
    "NBFC Business Plan": "/rbi/nbfc-business-plan",
    "NBFC Compliance": "/rbi/nbfc-legal-support",
    "NBFC-P2P License": "/rbi/nbfc-for-sale",
    "NBFC-MFI License": "/rbi/nbfc-takeover",
    "NBFC Annual Return Filing": "/rbi/nbfc-marketing-strategy",
    "Payment Aggregator": "/rbi/rbi-services",
    "AD Category II": "/rbi/full-fledged-money-changers",
    "Credit Information Company": "/rbi/lendtech-services",
    "NBFC License": "/rbi/nbfc-account-aggregator-license",
    "Prepaid Instrument": "/rbi/nbfc-financial-modeling",
    // SEBI
    "Stock Broker License": "/sebi/amfi-registration",
    "Merchant Banker": "/sebi/alternative-asset-portfolio-valuation",
    "Portfolio Manager": "/sebi/collective-investment-schemes",
    "Investment Adviser": "/sebi/credit-rating-agency",
    "Research Analyst": "/sebi/depository-participant-sebi-registration",
    "AIF Registration": "/sebi/aif-compliance-test-report",
    "Fund Management Entity": "/sebi/reit-registration",
    // IRDAI
    "Insurance Broker": "/irdai/irda-insurance-broker-license",
    "Corporate Agent": "/irdai/irdai-regulatory-sandbox",
    "Web Aggregator": "/irdai/insurance-marketing-firm-license",
    "Insurance Surveyor": "/irdai/insurance-repository-registration",
    "TPA License": "/irdai/isnp-registration",
    "Micro Insurance": "/irdai/ifsca-insurance-intermediary",
    // Fintech
    "Payment Aggregator License": "/rbi/rbi-services",
    "Prepaid Instrument License": "/rbi/nbfc-financial-modeling",
    "BBPS Agent Registration": "/rbi/lendtech-services",
    "UPI Third Party App": "/rbi/rbi-services",
    "Digital Lending Compliance": "/rbi/lendtech-services",
    // Compliance
    "RBI Compliance": "/rbi/rbi-services",
    "SEBI Compliance": "/sebi/aif-compliance-test-report",
    "IRDAI Compliance": "/irdai/irda-insurance-broker-license",
    "IFSCA Compliance": "/ifsca",
    "Aircraft Leasing IFSC": "/ifsca/aircraft-leasing",
    "IFSCA Aircraft Leasing": "/ifsca/aircraft-leasing",
    "BATF Services IFSC": "/ifsca/batf-services",
    "FinTech Entity IFSC": "/ifsca/fintech-entity",
    "TechFin IFSC": "/ifsca/techfin",
    "ITFS Platform IFSC": "/ifsca/itfs-platform",
    "IFSCA BATF Services": "/ifsca/batf-services",
    // Enterprise / Solutions
    "FEMA Compliance": "/fema/compliance-under-fema",
    "Transfer Pricing": "/services/transfer-pricing",
    "ESG Compliance": "/services/esg-consulting",
    // Startup
    "GST Registration": "/services/gst-appeal-services",
    // Other regulators
    "PFRDA Registration": "/services/enterprise-services",
    "NHB Registration": "/services/enterprise-services",
    "CERSAI Registration": "/services/enterprise-services",
    "DGFT IE Code": "/fema/fema-registration",
    // Hidden pages — now accessible
    "Mutual Fund Registration": "/sebi/mutual-fund-registration",
    "Social Stock Exchange": "/sebi/social-stock-exchange-license",
    "Underwriter Registration": "/sebi/underwriter-registration",
};

const menus: Record<string, MegaMenu> = {
    Services: {
        categories: [
            { label: "RBI Regulatory Services", icon: "🏦", items: ["NBFC Registration", "NBFC Account Aggregator", "Payment Aggregator", "Prepaid Instrument", "NBFC Business Plan", "NBFC Compliance", "NBFC-P2P License", "NBFC-MFI License", "NBFC Annual Return Filing", "AD Category II", "Credit Information Company"] },
            { label: "SEBI Regulatory Services", icon: "📈", items: ["Stock Broker License", "Merchant Banker", "Portfolio Manager", "Investment Adviser", "Research Analyst", "AIF Registration", "Mutual Fund Registration", "Social Stock Exchange", "Underwriter Registration"] },
            { label: "IRDAI Regulatory Services", icon: "🛡️", items: ["Insurance Broker", "Corporate Agent", "Web Aggregator", "Insurance Surveyor", "TPA License", "Micro Insurance"] },
            { label: "IFSCA & GIFT City", icon: "🌐", items: ["Finance Company GIFT IFSC", "IFSCA Factoring License", "PSP License IFSCA", "Fund Management Entity", "IFSCA Aircraft Leasing", "BATF Services IFSC"] },
            { label: "Financial Intelligence", icon: "🔍", items: ["FEMA Compliance", "DGFT IE Code", "Transfer Pricing", "GST Registration"] },
            { label: "Company Formation", icon: "🏛️", items: ["ESG Compliance", "PFRDA Registration"] },
        ],
        viewAll: "/services", viewAllLabel: "View All Services →"
    },
    Regulatory: {
        categories: [
            { label: "RBI Licenses", icon: "🏦", items: ["NBFC Registration", "NBFC Account Aggregator", "Payment Aggregator", "AD Category II", "Credit Information Company", "Prepaid Instrument", "NBFC Business Plan"] },
            { label: "SEBI Licenses", icon: "📈", items: ["Stock Broker License", "Merchant Banker", "Portfolio Manager", "Investment Adviser", "Research Analyst", "AIF Registration", "Mutual Fund Registration", "Social Stock Exchange", "Underwriter Registration"] },
            { label: "IFSCA Licenses", icon: "🌐", items: ["Finance Company GIFT IFSC", "IFSCA Factoring License", "PSP License IFSCA", "Fund Management Entity", "IFSCA Aircraft Leasing", "BATF Services IFSC", "FinTech Entity IFSC", "TechFin IFSC", "ITFS Platform IFSC"] },
            { label: "IRDAI Licenses", icon: "🛡️", items: ["Insurance Broker", "Corporate Agent", "Web Aggregator", "Insurance Surveyor", "TPA License", "Micro Insurance"] },
            { label: "FEMA & Other", icon: "⚖️", items: ["FEMA Compliance", "DGFT IE Code", "Transfer Pricing", "GST Registration", "PFRDA Registration"] },
        ],
        viewAll: "/regulatory", viewAllLabel: "View All Regulatory →"
    },
    Solutions: {
        categories: [
            { label: "For Startups & New Businesses", icon: "🚀", items: ["GST Registration", "ESG Compliance", "PFRDA Registration", "NBFC Registration"] },
            { label: "For NBFCs & Lending", icon: "🏦", items: ["NBFC Registration", "NBFC Compliance", "NBFC Account Aggregator", "NBFC Business Plan", "NBFC-P2P License", "NBFC-MFI License"] },
            { label: "For Fintech Platforms", icon: "💳", items: ["Payment Aggregator License", "PSP License IFSCA", "Prepaid Instrument License", "Digital Lending Compliance", "UPI Third Party App"] },
            { label: "For SMEs & Enterprises", icon: "🏗️", items: ["FEMA Compliance", "Transfer Pricing", "ESG Compliance", "Stock Broker License", "AIF Registration"] },
            { label: "Specialised Compliance", icon: "📋", items: ["RBI Compliance", "SEBI Compliance", "IRDAI Compliance", "IFSCA Compliance"] },
        ],
        viewAll: "/services", viewAllLabel: "Explore All Solutions →"
    },
    Resources: {
        categories: [
            { label: "Regulatory Updates", icon: "📰", items: ["Latest News", "Media Coverage", "Press Releases", "Company Announcements"] },
            { label: "Case Highlights", icon: "📁", items: [] },
            { label: "Guides & Insights", icon: "📖", items: [] },
            { label: "FAQs", icon: "❓", items: [] },
        ],
        viewAll: "/#", viewAllLabel: "View All Resources →"
    },
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    const openMenu = (menu: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(menu);
        setActiveCategory(0);
    };
    const closeMenu = () => {
        timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
    };
    const keepOpen = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

    const currentMenu = activeMenu ? menus[activeMenu] : null;

    return (
        <>
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-[rgba(255,255,255,0.95)] backdrop-blur-[20px] shadow-[0_2px_20px_rgba(0,100,200,0.06)] border-b border-[rgba(0,150,220,0.1)]" : "bg-white border-b border-gray-100"}`} style={{ height: "64px" }}>
                <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex flex-col group shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0096D6] to-[#00B4E0] text-white flex items-center justify-center font-bold text-lg shadow-sm">E</div>
                            <span className="font-extrabold text-[#0a1628] text-xl leading-none tracking-tight">Estabizz Fintech</span>
                        </div>
                        <span className="text-[10px] text-[#64748b] font-medium tracking-wide mt-0.5 pl-10">India&apos;s #1 Fintech Compliance Platform</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center gap-1">
                        {Object.keys(menus).map((item) => (
                            <div key={item} onMouseEnter={() => openMenu(item)} onMouseLeave={closeMenu}
                                className={`relative cursor-pointer flex items-center gap-1 text-[13.5px] font-semibold px-3 py-5 transition-colors ${activeMenu === item ? "text-[#0096D6]" : "text-[#334155] hover:text-[#0096D6]"}`}>
                                {item} <svg className={`w-3 h-3 transition-transform ${activeMenu === item ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        ))}
                        <Link href="/contact" className="text-[13.5px] font-semibold text-[#334155] hover:text-[#0096D6] px-3 py-5 transition-colors">Contact</Link>
                    </div>

                    {/* Right */}
                    <div className="hidden xl:flex items-center gap-3">
                        <Link href="/login" className="text-[13.5px] font-semibold text-[#334155] hover:text-[#0096D6] transition-colors px-3 py-2">
                            Login
                        </Link>
                        <Link href="/signup" className="text-[13.5px] font-bold bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white rounded-lg px-5 py-2.5 hover:from-[#0077B6] hover:to-[#005f8f] transition-all shadow-sm">
                            Get Started
                        </Link>
                        <Link href="/contact" className="bg-[#0a1628] text-white font-bold text-[13.5px] rounded-lg px-5 py-2.5 hover:bg-[#1a2638] transition-colors">
                            Book Consultation
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden flex flex-col gap-1.5 p-2">
                        <span className={`block w-6 h-0.5 bg-[#0a1628] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-[#0a1628] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-[#0a1628] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mega Menu Dropdown */}
            {activeMenu && currentMenu && (
                <div onMouseEnter={keepOpen} onMouseLeave={closeMenu}
                    className="fixed top-[64px] left-0 w-full bg-white border-b border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-[99] animate-[fadeIn_0.15s_ease]">
                    <div className="max-w-[1280px] mx-auto flex">
                        {/* Left Categories */}
                        <div className="w-[220px] border-r border-gray-100 py-4">
                            {currentMenu.categories.map((cat, i) => (
                                <button key={i} onMouseEnter={() => setActiveCategory(i)}
                                    className={`w-full flex items-center gap-3 px-5 py-3 text-left text-[14px] transition-colors ${activeCategory === i ? "text-[#0096D6] font-bold bg-blue-50/50 border-l-[3px] border-[#0096D6] pl-[17px]" : "text-[#334155] hover:text-[#0096D6] hover:bg-gray-50 border-l-[3px] border-transparent pl-[17px]"}`}>
                                    <span className="text-[16px]">{cat.icon}</span> {cat.label}
                                </button>
                            ))}
                        </div>
                        {/* Right Content */}
                        <div className="flex-1 p-6">
                            <h3 className="text-[18px] font-bold text-[#0a1628] mb-5">{currentMenu.categories[activeCategory]?.label}</h3>
                            {currentMenu.categories[activeCategory]?.items.length > 0 ? (
                                <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                                    {currentMenu.categories[activeCategory].items.map((item, j) => {
                                        const isLive = !!linkMap[item];
                                        return (
                                            <Link
                                                key={j}
                                                href={linkMap[item] || "#"}
                                                className={`flex items-center gap-2 text-[13.5px] transition-colors py-1 ${isLive ? 'text-[#0096D6] font-medium hover:text-[#0077B6]' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
                                            >
                                                <span className={`${isLive ? 'text-[#0096D6]' : 'text-[#cbd5e1]'} text-[8px]`}>›</span>
                                                {item}
                                                {isLive && (
                                                    <span className="ml-1 px-1.5 py-0.5 rounded-[4px] bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold tracking-wider uppercase">Live</span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-[14px] text-[#94a3b8]">Upcoming content...</p>
                            )}
                            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                                <Link href={currentMenu.viewAll} className="text-[14px] font-bold text-[#0096D6] hover:underline">{currentMenu.viewAllLabel}</Link>
                                <span className="text-[13px] text-[#94a3b8]">Need help? <Link href="/contact" className="text-[#0096D6] underline">Talk to an expert</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white z-[98] overflow-y-auto xl:hidden">
                    <div className="p-6 space-y-4">
                        {Object.entries(menus).map(([name, menu]) => (
                            <details key={name} className="border-b border-gray-100 pb-3">
                                <summary className="text-[15px] font-bold text-[#0a1628] cursor-pointer py-2">{name}</summary>
                                <div className="pl-4 mt-2 space-y-3">
                                    {menu.categories.map((cat, i) => (
                                        <div key={i}>
                                            <h4 className="text-[13px] font-bold text-[#0096D6] mb-1">{cat.icon} {cat.label}</h4>
                                            <div className="space-y-1 pl-2">
                                                {cat.items.slice(0, 4).map((item, j) => {
                                                    const isLive = !!linkMap[item];
                                                    return (
                                                        <Link key={j} href={linkMap[item] || "#"} className={`flex items-center gap-2 text-[13px] py-0.5 ${isLive ? 'text-[#0096D6] font-medium' : 'text-[#64748b] hover:text-[#0096D6]'}`}>
                                                            {item}
                                                            {isLive && (
                                                                <span className="px-1.5 py-0.5 rounded-[4px] bg-[#10b981]/10 text-[#10b981] text-[8px] font-bold tracking-wider uppercase">Live</span>
                                                            )}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        ))}
                        <Link href="/pricing" className="block text-[15px] font-bold text-[#0a1628] py-2">Pricing</Link>
                        <Link href="/login" className="block text-[15px] font-bold text-[#0a1628] py-2">Login</Link>
                        <Link href="/get-started" className="block w-full text-center bg-[#0a1628] text-white font-bold text-[14px] rounded-lg py-3 mt-4">Get Started</Link>
                    </div>
                </div>
            )}

            <style jsx global>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </>
    );
}
