"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuCategory { label: string; icon: string; items: string[]; }
interface MegaMenu { categories: MenuCategory[]; viewAll: string; viewAllLabel: string; }

const linkMap: Record<string, string> = {
    // IFSCA (existing)
    "Finance Company GIFT IFSC": "/ifsca/finance-company-in-gift-ifsc",
    "IFSCA Finance Company Registration": "/ifsca/finance-company-in-gift-ifsc",
    "IFSCA Finance Unit Registration": "/ifsca/finance-company-in-gift-ifsc",
    "Finance Company in GIFT IFSC": "/ifsca/finance-company-in-gift-ifsc",
    "GIFT IFSC Finance Company": "/ifsca/finance-company-in-gift-ifsc",
    "Finance Unit in IFSC": "/ifsca/finance-company-in-gift-ifsc",
    "GRCTC": "/ifsca/finance-company-in-gift-ifsc",
    "Global Regional Corporate Treasury Centre": "/ifsca/finance-company-in-gift-ifsc",
    "IFSCA Factoring License": "/regulatory/ifsca-factoring-license-gift-city",
    "PSP License IFSCA": "/ifsca/psp-license-ifsca",
    "PSP License – IFSCA": "/ifsca/psp-license-ifsca",
    "Payment Service Provider IFSCA": "/ifsca/psp-license-ifsca",
    "IFSCA Payment Services Regulations 2024": "/ifsca/psp-license-ifsca",
    "PSP Authorisation in IFSC": "/ifsca/psp-license-ifsca",
    "Payment Service Provider Authorisation in IFSC": "/ifsca/psp-license-ifsca",
    "IFSCA PSP Registration": "/ifsca/psp-license-ifsca",
    "PSP License GIFT City": "/ifsca/psp-license-ifsca",
    "Payment Services in IFSC": "/ifsca/psp-license-ifsca",
    "E-Money Issuance IFSC": "/ifsca/psp-license-ifsca",
    "Account Issuance Service IFSC": "/ifsca/psp-license-ifsca",
    "Cross-Border Money Transfer IFSC": "/ifsca/psp-license-ifsca",
    "Merchant Acquisition Service IFSC": "/ifsca/psp-license-ifsca",
    "Escrow Service IFSC": "/ifsca/psp-license-ifsca",
    "Significant PSP": "/ifsca/psp-license-ifsca",
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
    "Stock Broker License": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Licence": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Registration in India": "/sebi/stock-broker-registration-in-india",
    "SEBI Stock Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Licence India": "/sebi/stock-broker-registration-in-india",
    "Trading Member Registration": "/sebi/stock-broker-registration-in-india",
    "NSE Broker Registration": "/sebi/stock-broker-registration-in-india",
    "BSE Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Membership": "/sebi/stock-broker-registration-in-india",
    "SEBI Stock Brokers Regulations": "/sebi/stock-broker-registration-in-india",
    "Discount Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Full-Service Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Trading and Clearing Member": "/sebi/stock-broker-registration-in-india",
    "Self-Clearing Member": "/sebi/stock-broker-registration-in-india",
    "Professional Clearing Member": "/sebi/stock-broker-registration-in-india",
    "Margin Funding Stock Broker": "/sebi/stock-broker-registration-in-india",
    "Algorithmic Trading Broker Approval": "/sebi/stock-broker-registration-in-india",
    "Merchant Banker": "/sebi",
    "Portfolio Manager": "/sebi/pms-registration-in-india",
    "PMS Registration in India": "/sebi/pms-registration-in-india",
    "SEBI PMS Registration": "/sebi/pms-registration-in-india",
    "Portfolio Manager Registration": "/sebi/pms-registration-in-india",
    "Portfolio Management Services Registration": "/sebi/pms-registration-in-india",
    "SEBI Portfolio Manager License": "/sebi/pms-registration-in-india",
    "PMS License India": "/sebi/pms-registration-in-india",
    "Discretionary PMS Registration": "/sebi/pms-registration-in-india",
    "Non-Discretionary PMS Registration": "/sebi/pms-registration-in-india",
    "Advisory Portfolio Manager": "/sebi/pms-registration-in-india",
    "SEBI Portfolio Managers Regulations 2020": "/sebi/pms-registration-in-india",
    "Investment Adviser": "/sebi/ria-registration-in-india",
    "RIA Registration in India": "/sebi/ria-registration-in-india",
    "SEBI RIA Registration": "/sebi/ria-registration-in-india",
    "Investment Adviser Registration": "/sebi/ria-registration-in-india",
    "Registered Investment Adviser": "/sebi/ria-registration-in-india",
    "SEBI Investment Adviser License": "/sebi/ria-registration-in-india",
    "SEBI Investment Adviser Regulations 2013": "/sebi/ria-registration-in-india",
    "Financial Planner SEBI Registration": "/sebi/ria-registration-in-india",
    "Investment Advisory License": "/sebi/ria-registration-in-india",
    "Paid Investment Advice SEBI Registration": "/sebi/ria-registration-in-india",
    "Stock Advisory SEBI Registration": "/sebi/ria-registration-in-india",
    "Mutual Fund Advisory SEBI Registration": "/sebi/ria-registration-in-india",
    "Research Analyst": "/sebi/research-analyst-registration-in-india",
    "Research Analyst Registration in India": "/sebi/research-analyst-registration-in-india",
    "SEBI Research Analyst Registration": "/sebi/research-analyst-registration-in-india",
    "Research Analyst License": "/sebi/research-analyst-registration-in-india",
    "Research Analyst Licence India": "/sebi/research-analyst-registration-in-india",
    "SEBI RA Registration": "/sebi/research-analyst-registration-in-india",
    "SEBI Research Analyst Regulations 2014": "/sebi/research-analyst-registration-in-india",
    "Stock Research Analyst Registration": "/sebi/research-analyst-registration-in-india",
    "Equity Research Analyst Registration": "/sebi/research-analyst-registration-in-india",
    "Research Entity Registration": "/sebi/research-analyst-registration-in-india",
    "Investment Research Platform Registration": "/sebi/research-analyst-registration-in-india",
    "YouTube Stock Recommendation SEBI Registration": "/sebi/research-analyst-registration-in-india",
    "Telegram Stock Tips SEBI Registration": "/sebi/research-analyst-registration-in-india",
    "AIF Registration": "/sebi/aif-registration-in-india",
    "AIF Registration in India": "/sebi/aif-registration-in-india",
    "SEBI AIF Registration": "/sebi/aif-registration-in-india",
    "Alternative Investment Fund Registration": "/sebi/aif-registration-in-india",
    "Alternative Investment Fund License": "/sebi/aif-registration-in-india",
    "Category I AIF": "/sebi/aif-registration-in-india",
    "Category II AIF": "/sebi/aif-registration-in-india",
    "Category III AIF": "/sebi/aif-registration-in-india",
    "Angel Fund Registration": "/sebi/aif-registration-in-india",
    "Venture Capital Fund Registration": "/sebi/aif-registration-in-india",
    "Private Equity Fund Registration": "/sebi/aif-registration-in-india",
    "Hedge Fund Registration": "/sebi/aif-registration-in-india",
    "AIF PPM Filing": "/sebi/aif-registration-in-india",
    "SEBI Alternative Investment Fund": "/sebi/aif-registration-in-india",
    "Fund Management Entity": "/sebi/reit-registration",
    // IRDAI
    "Insurance Broker": "/irdai/insurance-broker-registration-in-india",
    "Corporate Agent": "/irdai/corporate-agent-registration-in-india",
    "Web Aggregator": "/irdai/insurance-marketing-firm-license",
    "Insurance Surveyor": "/irdai/insurance-repository-registration",
    "TPA License": "/irdai/isnp-registration",
    "TPA Licence": "/irdai/isnp-registration",
    "Micro Insurance": "/irdai/ifsca-insurance-intermediary",
    // Fintech
    "Prepaid Instrument License": "/rbi/ppi-registration-in-india",
    "Prepaid Instrument Licence": "/rbi/ppi-registration-in-india",
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
    "BATF Services IFSC": "/ifsca/batf-services-registration-in-gift-ifsc",
    "BATF Services Registration": "/ifsca/batf-services-registration-in-gift-ifsc",
    "IFSCA BATF Services Registration": "/ifsca/batf-services-registration-in-gift-ifsc",
    "Book-keeping Accounting Taxation Financial Crime Compliance": "/ifsca/batf-services-registration-in-gift-ifsc",
    "IFSCA FinTech": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Entity": "/ifsca/ifsca-fintech-startup-incentives",
    "FinTech Entity IFSC": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Authorization": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA Limited Use Authorization": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Sandbox": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA Startup Incentives": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Incentive Scheme": "/ifsca/ifsca-fintech-startup-incentives",
    "FinTech Startup Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "Proof of Concept Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "Green FinTech Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "Accelerator Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "TechFin IFSC": "/ifsca/techfin",
    "ITFS Registration": "/ifsca/itfs-registration-in-gift-ifsc",
    "IFSCA ITFS": "/ifsca/itfs-registration-in-gift-ifsc",
    "IFSCA ITFS Registration": "/ifsca/itfs-registration-in-gift-ifsc",
    "ITFS Platform IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "ITFS Platform in IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "ITFS Operator Registration": "/ifsca/itfs-registration-in-gift-ifsc",
    "International Trade Finance Services Platform": "/ifsca/itfs-registration-in-gift-ifsc",
    "Trade Finance Platform GIFT IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "Supply Chain Finance IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "Factoring Platform IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "Forfaiting Platform IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "IFSCA BATF Services": "/ifsca/batf-services-registration-in-gift-ifsc",
    // Enterprise / Solutions
    "FEMA Compliance": "/fema/compliance-under-fema",
    "Transfer Pricing": "/services/transfer-pricing",
    "ESG Compliance": "/services/esg-consulting",
    // Startup
    "GST Registration": "/services/gst-appeal-services",
    "Trademark Search": "/services/trademark-search",
    "Tax & Audit": "/services/finance-accounting-outsourcing",
    "Document Vault": "/login",
    "Policy Library": "/login",
    // Other regulators
    "PFRDA Registration": "/services/enterprise-services",
    "NHB Registration": "/services/enterprise-services",
    "CERSAI Registration": "/services/enterprise-services",
    "DGFT IE Code": "/fema/fema-registration",
    "FIU-IND Registration": "/services/enterprise-services",
    "PMLA Compliance Advisory": "/services/legal-due-diligence",
    "AML Policy Drafting": "/services/enterprise-services",
    "AML Risk Assessment": "/services/legal-due-diligence",
    "CKYC Registration & Reporting": "/services/enterprise-services",
    "MCA / ROC Compliance": "/services/enterprise-services",
    "Company Incorporation": "/services/enterprise-services",
    "Annual ROC Compliance": "/services/enterprise-services",
    "Corporate Governance": "/services/enterprise-services",
    "Post-Registration Compliance": "/services",
    "Sectoral Licences": "/services",
    "FSSAI Licence": "/services/enterprise-services",
    "APEDA Registration": "/services/enterprise-services",
    "AYUSH Licence": "/services/enterprise-services",
    "Factory Licence": "/services/enterprise-services",
    "Drug Licence": "/services/enterprise-services",
    "BIS Certification": "/services/enterprise-services",
    "Compliance Calendar": "/resources/compliance-calendar",
    "Regulatory Updates": "/resources/regulatory-updates",
    "Circular Tracker": "/resources/circular-explainers",
    "Circular Explainers": "/resources/circular-explainers",
    "Regulatory Email Templates": "/resources/regulatory-update-email-template",
    "Content Rebuild Command": "/resources/content-rebuild-command",
    "Service Page Content Framework": "/resources/service-page-content-framework",
    "Proposal Templates": "/proposal-template",
    "Proposal Template": "/proposal-template",
    "FAQ Engine": "/resources/faqs",
    "Compliance FAQs": "/resources/faqs",
    "Guides & Insights": "/resources",
    "Case Highlights": "/",
    "FAQs": "/services",
    "Blogs": "/blogs",
    "Regulatory Insights": "/blogs",
    // Hidden pages — now accessible
    "Mutual Fund Registration": "/sebi/mutual-fund-registration",
    "Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "Social Stock Exchange License": "/sebi/social-stock-exchange-license-india",
    "Social Stock Exchange License in India": "/sebi/social-stock-exchange-license-india",
    "SEBI Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "SSE Registration": "/sebi/social-stock-exchange-license-india",
    "NPO Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "FPE Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "Zero Coupon Zero Principal Instruments": "/sebi/social-stock-exchange-license-india",
    "ZCZP Instruments": "/sebi/social-stock-exchange-license-india",
    "Underwriter Registration": "/sebi/underwriter-registration",
};

const staticSearchLinks = [
    { label: "Home", href: "/", group: "Site" },
    { label: "All Services", href: "/services", group: "Site" },
    { label: "Regulatory Services", href: "/regulatory", group: "Site" },
    { label: "Resources", href: "/resources", group: "Site" },
    { label: "Regulatory Updates", href: "/resources/regulatory-updates", group: "Resources" },
    { label: "Regulatory Insights", href: "/blogs", group: "Resources" },
    { label: "Compliance FAQs", href: "/resources/faqs", group: "Resources" },
    { label: "Regulatory Email Template", href: "/resources/regulatory-update-email-template", group: "Resources" },
    { label: "Content Rebuild Command", href: "/resources/content-rebuild-command", group: "Resources" },
    { label: "Service Page Content Framework", href: "/resources/service-page-content-framework", group: "Resources" },
    { label: "Proposal Templates", href: "/proposal-template", group: "Resources" },
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
            { label: "RBI Regulatory Services", icon: "🏦", items: ["NBFC Registration", "NBFC Account Aggregator", "Payment Aggregator", "Prepaid Instrument", "Asset Reconstruction Company", "NBFC Compliance", "NBFC Business Plan", "AD Category II"] },
            { label: "SEBI Regulatory Services", icon: "📈", items: ["Stock Broker Licence", "Investment Adviser", "Research Analyst", "Portfolio Manager", "AIF Registration", "Social Stock Exchange", "Mutual Fund Registration", "Underwriter Registration"] },
            { label: "IRDAI Regulatory Services", icon: "🛡️", items: ["Insurance Broker", "Corporate Agent", "Web Aggregator", "Insurance Surveyor", "TPA Licence", "Micro Insurance"] },
            { label: "IFSCA & GIFT City Services", icon: "🌐", items: ["Finance Company GIFT IFSC", "PSP License IFSCA", "ITFS Platform IFSC", "BATF Services IFSC", "IFSCA Aircraft Leasing", "IFSCA Factoring License", "FinTech Entity IFSC"] },
            { label: "FIU / AML / PMLA Services", icon: "🔍", items: ["FIU-IND Registration", "PMLA Compliance Advisory", "AML Policy Drafting", "AML Risk Assessment", "CKYC Registration & Reporting"] },
            { label: "Company Formation & Corporate Governance", icon: "🏛️", items: ["Company Incorporation", "MCA / ROC Compliance", "Annual ROC Compliance", "Corporate Governance", "GST Registration", "Transfer Pricing"] },
            { label: "Sectoral & Operational Licences", icon: "⚙️", items: ["FSSAI Licence", "APEDA Registration", "AYUSH Licence", "Factory Licence", "Drug Licence", "BIS Certification"] },
            { label: "Ongoing Regulatory Compliance", icon: "📋", items: ["Post-Registration Compliance", "RBI Compliance", "SEBI Compliance", "IRDAI Compliance", "IFSCA Compliance", "Compliance Calendar"] },
        ],
        viewAll: "/services", viewAllLabel: "View All Services →"
    },
    Regulatory: {
        categories: [
            { label: "RBI", icon: "🏦", items: ["NBFC Registration", "Payment Aggregator", "Prepaid Instrument", "NBFC Account Aggregator", "Asset Reconstruction Company", "AD Category II"] },
            { label: "SEBI", icon: "📈", items: ["Stock Broker Licence", "AIF Registration", "Portfolio Manager", "Investment Adviser", "Research Analyst", "Social Stock Exchange"] },
            { label: "IRDAI", icon: "🛡️", items: ["Insurance Broker", "Corporate Agent", "Web Aggregator", "Insurance Surveyor", "TPA Licence", "Micro Insurance"] },
            { label: "IFSCA", icon: "🌐", items: ["Finance Company GIFT IFSC", "PSP License IFSCA", "ITFS Platform IFSC", "BATF Services IFSC", "IFSCA Aircraft Leasing", "FinTech Entity IFSC"] },
            { label: "FIU-IND", icon: "🔍", items: ["FIU-IND Registration", "PMLA Compliance Advisory", "AML Policy Drafting", "CKYC Registration & Reporting"] },
            { label: "MCA / ROC", icon: "🏛️", items: ["Company Incorporation", "MCA / ROC Compliance", "Annual ROC Compliance", "Corporate Governance"] },
            { label: "Government Licences", icon: "⚖️", items: ["FSSAI Licence", "APEDA Registration", "AYUSH Licence", "Factory Licence", "Drug Licence", "BIS Certification"] },
        ],
        viewAll: "/regulatory", viewAllLabel: "View All Regulatory →"
    },
    Solutions: {
        categories: [
            { label: "Startups & New Businesses", icon: "🚀", items: ["Company Incorporation", "GST Registration", "Trademark Search", "FSSAI Licence"] },
            { label: "NBFCs & Lending Businesses", icon: "🏦", items: ["NBFC Registration", "NBFC Compliance", "NBFC Account Aggregator", "Digital Lending Compliance", "NBFC Business Plan"] },
            { label: "Fintech Platforms", icon: "💳", items: ["Payment Aggregator", "Prepaid Instrument Licence", "PSP License IFSCA", "UPI Third Party App", "FIU-IND Registration"] },
            { label: "Insurance Intermediaries", icon: "🛡️", items: ["Insurance Broker", "Corporate Agent", "Web Aggregator", "Insurance Surveyor", "TPA Licence"] },
            { label: "Capital Market Intermediaries", icon: "📈", items: ["Stock Broker Licence", "AIF Registration", "Portfolio Manager", "Investment Adviser", "Research Analyst"] },
            { label: "SMEs & Growing Enterprises", icon: "🏗️", items: ["Annual ROC Compliance", "Tax & Audit", "Transfer Pricing", "Sectoral Licences", "Corporate Governance"] },
            { label: "Foreign / GIFT City Entities", icon: "🌐", items: ["Finance Company GIFT IFSC", "PSP License IFSCA", "ITFS Platform IFSC", "IFSCA Aircraft Leasing", "BATF Services IFSC"] },
            { label: "Compliance Teams & CFOs", icon: "📋", items: ["Compliance Calendar", "Document Vault", "Policy Library", "Post-Registration Compliance"] },
        ],
        viewAll: "/services", viewAllLabel: "Explore All Solutions →"
    },
    Resources: {
        categories: [
            { label: "Regulatory Updates", icon: "📰", items: ["Regulatory Updates", "Circular Tracker", "Compliance Calendar"] },
            { label: "Content Framework", icon: "📐", items: ["Service Page Content Framework", "Content Rebuild Command", "Proposal Templates"] },
            { label: "Regulatory Insights", icon: "✍️", items: ["Regulatory Insights", "Guides & Insights"] },
            { label: "Guides & Insights", icon: "📖", items: ["RBI Services", "SEBI Services", "IRDAI Services", "IFSCA Services"] },
            { label: "FAQs", icon: "❓", items: ["FAQ Engine", "FAQs", "Compliance FAQs", "Contact Estabizz"] },
            { label: "Case Highlights", icon: "📁", items: ["Case Highlights"] },
            { label: "Compliance Calendar", icon: "📅", items: ["Compliance Calendar", "Post-Registration Compliance"] },
            { label: "Circular Tracker", icon: "🔔", items: ["Circular Tracker", "Blogs"] },
        ],
        viewAll: "/resources", viewAllLabel: "View All Resources →"
    },
};

const globalMarketRegions = [
    {
        region: "India & South Asia",
        countries: ["India", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan", "Maldives", "Pakistan", "Afghanistan"],
    },
    {
        region: "GCC & Middle East",
        countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait", "Israel", "Jordan", "Turkey", "Lebanon", "Iraq", "Egypt"],
    },
    {
        region: "Asia Pacific",
        countries: ["Singapore", "Hong Kong", "Australia", "New Zealand", "Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines", "Japan", "South Korea", "China", "Taiwan", "Cambodia", "Laos", "Myanmar", "Brunei", "Mongolia"],
    },
    {
        region: "Europe & UK",
        countries: ["United Kingdom", "Ireland", "Germany", "France", "Netherlands", "Luxembourg", "Switzerland", "Italy", "Spain", "Portugal", "Sweden", "Norway", "Denmark", "Finland", "Austria", "Belgium", "Poland", "Czech Republic", "Estonia", "Lithuania", "Latvia", "Greece", "Cyprus", "Malta", "Romania", "Bulgaria", "Croatia", "Slovenia", "Slovakia", "Hungary", "Iceland", "Liechtenstein", "Monaco", "Andorra", "San Marino"],
    },
    {
        region: "North America",
        countries: ["United States", "Canada", "Mexico", "Bahamas", "Barbados", "Jamaica", "Trinidad and Tobago", "Dominican Republic"],
    },
    {
        region: "Africa & Indian Ocean",
        countries: ["Mauritius", "South Africa", "Kenya", "Nigeria", "Ghana", "Rwanda", "Egypt", "Morocco", "Tanzania", "Uganda", "Seychelles", "Ethiopia", "Zambia", "Botswana", "Namibia", "Senegal", "Ivory Coast", "Tunisia", "Algeria", "Madagascar"],
    },
    {
        region: "LATAM",
        countries: ["Brazil", "Argentina", "Chile", "Colombia", "Peru", "Uruguay", "Panama", "Costa Rica", "Ecuador", "Paraguay", "Bolivia", "Guatemala", "El Salvador", "Honduras", "Nicaragua"],
    },
];

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
    const [countryOpen, setCountryOpen] = useState(false);
    const desktopCountryRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
    const compactCountryRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;

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
            const target = event.target as Node;
            const insideDesktopCountry = desktopCountryRef.current?.contains(target);
            const insideCompactCountry = compactCountryRef.current?.contains(target);
            if (!insideDesktopCountry && !insideCompactCountry) {
                setCountryOpen(false);
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
        setCountryOpen(false);
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

    const CountrySelector = ({ compact = false, selectorRef }: { compact?: boolean; selectorRef: React.MutableRefObject<HTMLDivElement | null> }) => (
        <div ref={(node) => { selectorRef.current = node; }} className="relative">
            <button
                type="button"
                onClick={() => {
                    setActiveMenu(null);
                    setSearchOpen(false);
                    setCountryOpen((open) => !open);
                }}
                className={`${compact ? "h-10 px-3" : "h-10 px-4"} inline-flex items-center gap-2 rounded-xl border border-[#dbe7f3] bg-white text-[13px] font-black text-[#0a1628] shadow-sm transition-all hover:border-[#0096D6]/40 hover:text-[#0096D6]`}
                aria-expanded={countryOpen}
                aria-label="Open country and global market selector"
            >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8f7ff] text-[11px]">IN</span>
                <span className={compact ? "hidden sm:inline" : ""}>Country: India</span>
                <svg className={`h-3.5 w-3.5 transition-transform ${countryOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {countryOpen && (
                <div className={`${compact ? "right-[-54px] sm:right-0" : "right-0"} absolute top-[48px] w-[min(92vw,720px)] overflow-hidden rounded-[26px] border border-[#dbe7f3] bg-white shadow-[0_30px_90px_rgba(0,60,110,0.18)]`}>
                    <div className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-[#071426] via-[#0a2947] to-[#006da8] p-5 text-white">
                        <div className="absolute right-[-40px] top-[-60px] h-40 w-40 rounded-full bg-[#d9a938]/25 blur-3xl" />
                        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8edcff]">Global Market Desk</div>
                                <div className="mt-1 text-[22px] font-black tracking-tight">India base. Global expansion support.</div>
                                <p className="mt-2 max-w-[480px] text-[13px] font-medium leading-relaxed text-white/78">
                                    Select a market to discuss entity setup, licensing, fintech compliance, tax readiness and regulator-facing documentation.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                onClick={() => setCountryOpen(false)}
                                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2 text-[12px] font-black text-[#0077B6] transition-transform hover:-translate-y-0.5"
                            >
                                Plan Expansion
                            </Link>
                        </div>
                    </div>
                    <div className="max-h-[470px] overflow-y-auto p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            {globalMarketRegions.map((group) => (
                                <div key={group.region} className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-4">
                                    <h3 className="text-[12px] font-black uppercase tracking-[0.16em] text-[#0096D6]">{group.region}</h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {group.countries.map((country) => (
                                            <Link
                                                key={country}
                                                href="/contact"
                                                onClick={() => setCountryOpen(false)}
                                                className="rounded-full border border-white bg-white px-3 py-1.5 text-[11.5px] font-bold text-[#334155] shadow-sm transition-all hover:border-[#0096D6]/40 hover:text-[#0096D6]"
                                            >
                                                {country}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] font-semibold leading-relaxed text-[#7a5200]">
                            Country-specific regulatory requirements may change from time to time. Estabizz reviews applicability, eligibility and documentation before any filing or market-entry action.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            <nav className={`fixed top-0 w-full z-[1000] border-b border-[#dbe7f3] bg-white transition-all duration-300 ${scrolled ? "shadow-[0_14px_42px_rgba(15,23,42,0.10)]" : "shadow-[0_6px_22px_rgba(15,23,42,0.06)]"}`} style={{ height: "64px" }}>
                <div className="max-w-[1480px] mx-auto px-5 2xl:px-6 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex flex-col group shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0096D6] via-[#0077B6] to-[#0a1628] text-white flex items-center justify-center font-bold text-lg shadow-[0_10px_24px_rgba(0,150,214,0.25)]">E</div>
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
                    </div>

                    {/* Right */}
                    <div className="hidden xl:flex items-center gap-2 2xl:gap-3">
                        <div className="hidden min-[1420px]:block">
                            <SearchBox />
                        </div>
                        <Link href="/login" className="text-[13.5px] font-semibold text-[#334155] hover:text-[#0096D6] transition-colors px-3 py-2">
                            Login
                        </Link>
                        <CountrySelector selectorRef={desktopCountryRef} />
                        <Link href="/get-started" className="premium-border-sweep text-[13.5px] font-bold bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white rounded-xl px-5 py-2.5 hover:from-[#0077B6] hover:to-[#005f8f] transition-all shadow-[0_12px_26px_rgba(0,150,214,0.22)]">
                            Get Started
                        </Link>
                        <Link href="/contact" className="bg-[#0a1628] text-white font-bold text-[13.5px] rounded-xl px-5 py-2.5 hover:bg-[#1a2638] transition-colors shadow-[0_12px_26px_rgba(10,22,40,0.18)]">
                            Book Consultation
                        </Link>
                    </div>

                    <div className="xl:hidden flex items-center gap-2">
                        <CountrySelector compact selectorRef={compactCountryRef} />
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Open navigation menu">
                            <span className={`block w-6 h-0.5 bg-[#0a1628] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-[#0a1628] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-[#0a1628] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mega Menu Dropdown */}
            {activeMenu && currentMenu && (
                <div onMouseEnter={keepOpen} onMouseLeave={closeMenu}
                    className="fixed left-0 top-[64px] z-[999] w-full border-b border-[#dbe7f3] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] animate-[fadeIn_0.15s_ease]">
                    <div className="mx-auto flex max-w-[1480px] bg-white">
                        {/* Left Categories */}
                        <div className="w-[240px] shrink-0 border-r border-blue-100 py-4 bg-[#f8fbff]">
                            {currentMenu.categories.map((cat, i) => (
                                <button key={i} onMouseEnter={() => setActiveCategory(i)}
                                    className={`w-full flex items-center gap-3 px-5 py-3 text-left text-[14px] transition-colors ${activeCategory === i ? "text-[#0096D6] font-bold bg-blue-50/50 border-l-[3px] border-[#0096D6] pl-[17px]" : "text-[#334155] hover:text-[#0096D6] hover:bg-gray-50 border-l-[3px] border-transparent pl-[17px]"}`}>
                                    <span className="text-[16px]">{cat.icon}</span> {cat.label}
                                </button>
                            ))}
                        </div>
                        {/* Right Content */}
                        <div className="flex-1 bg-white p-6">
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
                            <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-[15px] font-bold text-[#0a1628] py-2">Login</Link>
                            <details className="rounded-xl border border-blue-100 bg-[#f8fbff] px-4 py-2">
                                <summary className="cursor-pointer py-2 text-[15px] font-bold text-[#0a1628]">Country / Global Markets</summary>
                                <div className="mt-3 space-y-3 pb-2">
                                    {globalMarketRegions.map((group) => (
                                        <div key={group.region}>
                                            <h4 className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0096D6]">{group.region}</h4>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {group.countries.map((country) => (
                                                    <Link
                                                        key={country}
                                                        href="/contact"
                                                        onClick={() => setMobileOpen(false)}
                                                        className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[11.5px] font-bold text-[#334155]"
                                                    >
                                                        {country}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </div>
                        <Link href="/get-started" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-[#0a1628] text-white font-bold text-[14px] rounded-lg py-3 mt-4">Get Started</Link>
                    </div>
                </div>
            )}

            <style jsx global>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </>
    );
}
