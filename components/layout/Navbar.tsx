"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuCategory { label: string; icon: string; items: string[]; }
interface MegaMenu { categories: MenuCategory[]; viewAll: string; viewAllLabel: string; }

const linkMap: Record<string, string> = {
    // IFSCA (existing)
    "Finance Company GIFT IFSC": "/ifsca/finance-company",
    "IFSCA Factoring License": "/regulatory/ifsca-factoring-license-gift-city",
    "PSP License IFSCA": "/ifsca/psp-license",
    // RBI / NBFC
    "NBFC Registration": "/rbi/nbfc-registration-in-india",
    "NBFC Account Aggregator": "/rbi/nbfc-account-aggregator-license",
    "Account Aggregator": "/rbi/nbfc-account-aggregator-license",
    "ARC Registration": "/rbi/arc-registration-in-india",
    "Asset Reconstruction Company": "/rbi/arc-registration-in-india",
    "NBFC SRO Registration": "/rbi/nbfc-sro-registration",
    "SRO for NBFCs": "/rbi/nbfc-sro-registration",
    "NBFC Business Plan": "/rbi/nbfc-business-plan",
    "NBFC Compliance": "/rbi/nbfc-legal-support",
    "NBFC-P2P License": "/rbi/nbfc-for-sale",
    "NBFC-MFI License": "/rbi/nbfc-takeover",
    "NBFC Annual Return Filing": "/rbi/nbfc-marketing-strategy",
    "Payment Aggregator": "/rbi/payment-aggregator-license-in-india",
    "Payment Aggregator License": "/rbi/payment-aggregator-license-in-india",
    "AD Category II": "/rbi/full-fledged-money-changers",
    "Credit Information Company": "/rbi/lendtech-services",
    "NBFC License": "/rbi/nbfc-account-aggregator-license",
    "Prepaid Instrument": "/rbi/ppi-registration-in-india",
    "PPI Registration": "/rbi/ppi-registration-in-india",
    "Prepaid Payment Instrument": "/rbi/ppi-registration-in-india",
    // SEBI
    "Stock Broker License": "/sebi",
    "Merchant Banker": "/sebi",
    "Portfolio Manager": "/sebi",
    "Investment Adviser": "/sebi",
    "Research Analyst": "/sebi",
    "AIF Registration": "/sebi/aif-registration-in-india",
    "Fund Management Entity": "/sebi/reit-registration",
    // IRDAI
    "Insurance Broker": "/irdai/insurance-broker-registration-in-india",
    "Corporate Agent": "/irdai/corporate-agent-registration-in-india",
    "Web Aggregator": "/irdai/insurance-marketing-firm-license",
    "Insurance Surveyor": "/irdai/insurance-repository-registration",
    "TPA License": "/irdai/isnp-registration",
    "Micro Insurance": "/irdai/ifsca-insurance-intermediary",
    // Fintech
    "Prepaid Instrument License": "/rbi/ppi-registration-in-india",
    "BBPS Agent Registration": "/rbi/lendtech-services",
    "UPI Third Party App": "/rbi/rbi-services",
    "Digital Lending Compliance": "/rbi/lendtech-services",
    // Compliance
    "RBI Compliance": "/rbi/rbi-services",
    "SEBI Compliance": "/sebi/aif-compliance-test-report",
    "IRDAI Compliance": "/irdai/irda-insurance-broker-license",
    "IFSCA Compliance": "/ifsca",
    "Aircraft Leasing IFSC": "/ifsca/aircraft-leasing-registration-in-ifsc",
    "IFSCA Aircraft Leasing": "/ifsca/aircraft-leasing-registration-in-ifsc",
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

const staticSearchLinks = [
    { label: "Home", href: "/", group: "Site" },
    { label: "All Services", href: "/services", group: "Site" },
    { label: "Regulatory Services", href: "/regulatory", group: "Site" },
    { label: "RBI Services", href: "/rbi", group: "RBI" },
    { label: "SEBI Services", href: "/sebi", group: "SEBI" },
    { label: "IRDAI Services", href: "/irdai", group: "IRDAI" },
    { label: "IFSCA Services", href: "/ifsca", group: "IFSCA" },
    { label: "FEMA Services", href: "/fema", group: "FEMA" },
    { label: "Contact Estabizz", href: "/contact", group: "Site" },
    { label: "Book Consultation", href: "/contact", group: "Site" },
    { label: "Get Started", href: "/get-started", group: "Site" },
    { label: "Login", href: "/login", group: "Site" },
];

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
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, []);

    const searchItems = useMemo(() => {
        const groupedItems = new Map<string, { label: string; href: string; group: string; keywords: string }>();

        Object.entries(linkMap).forEach(([label, href]) => {
            const groups = Object.entries(menus)
                .flatMap(([menuName, menu]) =>
                    menu.categories
                        .filter((category) => category.items.includes(label))
                        .map((category) => `${menuName} ${category.label}`)
                );
            const key = `${label}-${href}`;

            groupedItems.set(key, {
                label,
                href,
                group: groups[0] || "Service",
                keywords: `${label} ${href} ${groups.join(" ")}`.toLowerCase(),
            });
        });

        staticSearchLinks.forEach((item) => {
            groupedItems.set(`${item.label}-${item.href}`, {
                ...item,
                keywords: `${item.label} ${item.href} ${item.group}`.toLowerCase(),
            });
        });

        return Array.from(groupedItems.values()).sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return searchItems.slice(0, 7);
        }

        return searchItems
            .filter((item) => item.keywords.includes(query))
            .sort((a, b) => {
                const aStarts = a.label.toLowerCase().startsWith(query) ? 0 : 1;
                const bStarts = b.label.toLowerCase().startsWith(query) ? 0 : 1;
                return aStarts - bStarts || a.label.localeCompare(b.label);
            })
            .slice(0, 8);
    }, [searchItems, searchQuery]);

    const closeSearch = () => {
        setSearchOpen(false);
        setSearchQuery("");
    };

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            closeSearch();
            return;
        }

        if (event.key === "Enter" && searchResults[0]) {
            event.preventDefault();
            const nextHref = searchResults[0].href;
            closeSearch();
            setMobileOpen(false);
            router.push(nextHref);
        }
    };

    const openMenu = (menu: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setSearchOpen(false);
        setActiveMenu(menu);
        setActiveCategory(0);
    };
    const closeMenu = () => {
        timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
    };
    const keepOpen = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

    const currentMenu = activeMenu ? menus[activeMenu] : null;
    const SearchBox = ({ mobile = false }: { mobile?: boolean }) => (
        <div ref={mobile ? undefined : searchRef} className={`relative ${mobile ? "w-full" : "w-[240px]"}`}>
            <label className="sr-only" htmlFor={mobile ? "mobile-page-search" : "desktop-page-search"}>Search pages</label>
            <div className="relative">
                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
                <input
                    id={mobile ? "mobile-page-search" : "desktop-page-search"}
                    type="search"
                    value={searchQuery}
                    onChange={(event) => {
                        setSearchQuery(event.target.value);
                        setSearchOpen(true);
                    }}
                    onFocus={() => {
                        setActiveMenu(null);
                        setSearchOpen(true);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search pages..."
                    className={`w-full rounded-lg border border-[#dbe7f3] bg-white pl-9 pr-3 text-[13.5px] font-medium text-[#0a1628] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#0096D6] focus:ring-4 focus:ring-[#0096D6]/10 ${mobile ? "h-11" : "h-10"}`}
                    aria-expanded={searchOpen}
                    aria-controls={mobile ? "mobile-page-search-results" : "desktop-page-search-results"}
                />
            </div>

            {searchOpen && (
                <div
                    id={mobile ? "mobile-page-search-results" : "desktop-page-search-results"}
                    className={`${mobile ? "mt-2 w-full" : "absolute right-0 top-[46px] w-[360px]"} overflow-hidden rounded-xl border border-[#dbe7f3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)]`}
                >
                    <div className="border-b border-gray-100 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b]">
                        {searchQuery.trim() ? "Search Results" : "Popular Pages"}
                    </div>
                    {searchResults.length > 0 ? (
                        <div className="max-h-[330px] overflow-y-auto py-1">
                            {searchResults.map((item) => (
                                <Link
                                    key={`${item.label}-${item.href}`}
                                    href={item.href}
                                    onClick={() => {
                                        closeSearch();
                                        setMobileOpen(false);
                                    }}
                                    className="flex items-start justify-between gap-4 px-4 py-3 transition-colors hover:bg-[#f5fbff]"
                                >
                                    <span>
                                        <span className="block text-[13.5px] font-bold text-[#0a1628]">{item.label}</span>
                                        <span className="mt-0.5 block text-[11.5px] font-medium text-[#64748b]">{item.group}</span>
                                    </span>
                                    <span className="mt-0.5 shrink-0 text-[12px] font-bold text-[#0096D6]">Open</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-5 text-[13px] font-medium text-[#64748b]">
                            No page found. Try RBI, IFSCA, NBFC, payment, insurance or SEBI.
                        </div>
                    )}
                </div>
            )}
        </div>
    );

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
                        <SearchBox />
                        <a href="https://www.estabizz.com/" target="_blank" rel="noopener noreferrer" className="hidden text-[13.5px] font-semibold text-[#64748b] hover:text-[#0096D6] transition-colors px-3 py-2 border-r border-gray-200 pr-4">
                            📚 Old Site
                        </a>
                        <Link href="/login" className="hidden text-[13.5px] font-semibold text-[#334155] hover:text-[#0096D6] transition-colors px-3 py-2">
                            Login
                        </Link>
                        <Link href="/get-started" className="text-[13.5px] font-bold bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white rounded-lg px-5 py-2.5 hover:from-[#0077B6] hover:to-[#005f8f] transition-all shadow-sm">
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
                        <div ref={searchRef}>
                            <SearchBox mobile />
                        </div>
                        {Object.entries(menus).map(([name, menu]) => (
                            <details key={name} className="rounded-xl border border-gray-100 bg-[#f8faff] px-4 py-2">
                                <summary className="text-[15px] font-bold text-[#0a1628] cursor-pointer py-2">{name}</summary>
                                <div className="mt-2 space-y-4 pb-2">
                                    {menu.categories.map((cat, i) => (
                                        <div key={i}>
                                            <h4 className="text-[12px] font-black text-[#0096D6] uppercase tracking-wide mb-2">{cat.icon} {cat.label}</h4>
                                            <div className="grid grid-cols-1 gap-1">
                                                {cat.items.slice(0, 4).map((item, j) => {
                                                    const isLive = !!linkMap[item];
                                                    return (
                                                        <Link
                                                            key={j}
                                                            href={linkMap[item] || "/get-started"}
                                                            onClick={() => setMobileOpen(false)}
                                                            className={`block rounded-lg px-3 py-2 text-[13px] ${isLive ? 'text-[#0a1628] bg-white border border-gray-100' : 'text-[#64748b] hover:text-[#0096D6]'}`}
                                                        >
                                                            {item}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        ))}
                        <div className="border-t border-gray-100 pt-4 mt-4">
                            <a href="https://www.estabizz.com/" target="_blank" rel="noopener noreferrer" className="block text-[15px] font-bold text-[#64748b] hover:text-[#0096D6] py-2">📚 Visit Old Site</a>
                            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block text-[15px] font-bold text-[#0a1628] py-2">Pricing</Link>
                            <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-[15px] font-bold text-[#0a1628] py-2">Login</Link>
                        </div>
                        <Link href="/get-started" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-[#0a1628] text-white font-bold text-[14px] rounded-lg py-3 mt-4">Get Started</Link>
                    </div>
                </div>
            )}

            <style jsx global>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </>
    );
}
