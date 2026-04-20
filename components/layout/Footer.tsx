"use client";
import React from "react";
import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string }[]> = {
    "Regulatory Expertise": [
        { label: "RBI Licensing & Compliance", href: "/rbi" },
        { label: "SEBI Registrations", href: "/sebi" },
        { label: "IRDAI Licensing", href: "/irdai" },
        { label: "IFSCA & GIFT City", href: "/ifsca" },
        { label: "FIU & AML Frameworks", href: "/fema" },
        { label: "NBFC Compliance", href: "/rbi/nbfc-account-aggregator-license" },
        { label: "AIF & PMS Compliance", href: "/sebi/aif-compliance-test-report" },
    ],
    "Corporate & Sectoral": [
        { label: "Company Incorporation", href: "/services/enterprise-services" },
        { label: "Annual ROC Compliance", href: "/services/enterprise-services" },
        { label: "Tax & Audit", href: "/services/enterprise-services" },
        { label: "Sectoral Licenses (FSSAI, Drug, Factory, BIS)", href: "/services" },
        { label: "IPR & Trademark", href: "/services" },
    ],
    "Compliance Portal": [
        { label: "Estabizz Compliance Hub", href: "/contact" },
        { label: "Regulatory Dashboard", href: "/contact" },
        { label: "License Tracker", href: "/contact" },
        { label: "Document Vault", href: "/contact" },
        { label: "Policy Library", href: "/contact" },
        { label: "Compliance Calendar", href: "/contact" },
    ],
    "Knowledge & Resources": [
        { label: "Regulatory Updates", href: "/#" },
        { label: "Case Highlights", href: "/#" },
        { label: "FAQs", href: "/#" },
        { label: "Guides & Insights", href: "/#" },
    ],
    "Legal & Transparency": [
        { label: "Privacy Policy", href: "/legal/privacy-policy" },
        { label: "Terms & Conditions", href: "/legal/terms-conditions" },
        { label: "Refund Policy", href: "/legal/refund-policy" },
        { label: "Disclaimer", href: "/legal/privacy-policy" },
        { label: "Cookie Policy", href: "/legal/privacy-policy" },
    ],
    "Company & Network": [
        { label: "Associate Professional Partner", href: "/contact" },
        { label: "Careers", href: "/contact" },
        { label: "Team Estabizz", href: "/contact" },
        { label: "Pricing", href: "/contact" },
        { label: "Estabizz Compliance Network", href: "/contact" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#0a1628] text-white">
            <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

                    {/* Company Info - 3 cols */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0096D6] to-[#00B4E0] text-white flex items-center justify-center font-bold text-lg">E</div>
                            <span className="font-extrabold text-white text-xl tracking-tight">Estabizz Fintech</span>
                        </div>
                        <p className="text-[13px] text-[#0096D6] font-bold italic mb-4">We Comply. We Simplify.</p>
                        <p className="text-[12px] text-gray-400 leading-relaxed mb-5 max-w-[300px]">
                            Estabizz Fintech Private Limited — Structured regulatory advisory and compliance infrastructure partner supporting businesses across RBI, SEBI, IRDAI, IFSCA and allied frameworks.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3 text-[13px] text-gray-300">
                                <span className="w-7 h-7 rounded-full bg-[rgba(0,150,220,0.15)] flex items-center justify-center text-[12px] shrink-0 mt-0.5">📍</span>
                                <span>Ahmedabad, Gujarat, India</span>
                            </div>
                            <a href="tel:+919825600907" className="flex items-center gap-3 text-[13px] text-gray-300 hover:text-[#0096D6] transition-colors">
                                <span className="w-7 h-7 rounded-full bg-[rgba(0,150,220,0.15)] flex items-center justify-center text-[12px]">📞</span>
                                +91 98256 00907 | +91 98256 12234
                            </a>
                            <a href="mailto:info@estabizz.com" className="flex items-center gap-3 text-[13px] text-gray-300 hover:text-[#0096D6] transition-colors">
                                <span className="w-7 h-7 rounded-full bg-[rgba(0,150,220,0.15)] flex items-center justify-center text-[12px]">✉️</span>
                                info@estabizz.com
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: "📷", label: "Instagram", href: "https://instagram.com/estabizz" },
                                { icon: "in", label: "LinkedIn", href: "https://linkedin.com/company/estabizz" },
                                { icon: "f", label: "Facebook", href: "https://facebook.com/estabizz" },
                            ].map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                                    className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[13px] text-gray-400 hover:bg-[#0096D6] hover:text-white hover:border-[#0096D6] transition-all">
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        <div className="mt-4 text-[10px] text-gray-500">
                            CIN: U74999GJ2021PTC123384
                        </div>
                    </div>

                    {/* Link Columns - spread across remaining 9 cols */}
                    <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.08em] mb-4">{title}</h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href} className="text-[12px] text-gray-400 hover:text-[#10b981] transition-colors leading-relaxed">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Regulator Badges */}
                <div className="flex flex-wrap gap-2 mb-8 py-5 border-t border-b border-[rgba(255,255,255,0.08)]">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-3 py-1.5">Regulators:</span>
                    {["RBI", "SEBI", "IRDAI", "IFSCA", "MCA", "FIU"].map((b) => (
                        <span key={b} className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full text-[11px] text-gray-400 font-medium">{b}</span>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="mb-6 p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg">
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                        <strong className="text-gray-400">Disclaimer:</strong> Estabizz Fintech Private Limited operates as an independent regulatory advisory and compliance support organisation. We neither represent nor act for any statutory or regulatory authority. The issuance of any license, registration, or approval is solely within the jurisdiction and discretion of the concerned regulator and contingent upon satisfaction of prescribed eligibility and compliance conditions. The company does not commit to guaranteed approvals or defined timelines. Our services are advisory and documentation-based in nature, aimed at facilitating regulatory preparedness and structured compliance.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-gray-500">
                    <p>&copy; 2014–2025 Estabizz Fintech Pvt. Ltd. All rights reserved. This is a structured compliance institution.</p>
                    <div className="flex flex-wrap gap-5">
                        <Link href="/legal/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                        <Link href="/legal/terms-conditions" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                        <Link href="/legal/refund-policy" className="hover:text-gray-300 transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
