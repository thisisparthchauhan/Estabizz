"use client";
import React from "react";
import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string }[]> = {
    "Services": [
        { label: "RBI Services", href: "/rbi" },
        { label: "SEBI Services", href: "/sebi" },
        { label: "IRDAI Services", href: "/irdai" },
        { label: "IFSCA & GIFT City", href: "/ifsca" },
        { label: "FEMA Compliance", href: "/fema" },
        { label: "All Services", href: "/services" },
    ],
    "Popular Licenses": [
        { label: "NBFC Registration", href: "/rbi/nbfc-account-aggregator-license" },
        { label: "Aircraft Leasing IFSC", href: "/ifsca/aircraft-leasing" },
        { label: "Insurance Broker License", href: "/irdai/irda-insurance-broker-license" },
        { label: "AIF Registration", href: "/sebi/aif-compliance-test-report" },
        { label: "FEMA Registration", href: "/fema/fema-registration" },
        { label: "GST Appeal Services", href: "/services/gst-appeal-services" },
    ],
    "Company": [
        { label: "About Us", href: "/contact" },
        { label: "Contact Us", href: "/contact" },
        { label: "Enterprise Services", href: "/services/enterprise-services" },
        { label: "India Entry Strategy", href: "/services/india-entry-strategy" },
        { label: "ESG Consulting", href: "/services/esg-consulting" },
    ],
    "Legal": [
        { label: "Privacy Policy", href: "/legal/privacy-policy" },
        { label: "Terms & Conditions", href: "/legal/terms-conditions" },
        { label: "Refund Policy", href: "/legal/refund-policy" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#0a1628] text-white">
            <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0096D6] to-[#00B4E0] text-white flex items-center justify-center font-bold text-lg">E</div>
                            <span className="font-extrabold text-white text-xl tracking-tight">Estabizz Fintech</span>
                        </div>
                        <p className="text-[13px] text-gray-400 leading-relaxed mb-5 max-w-[280px]">
                            India&apos;s #1 Fintech Compliance Platform. We help businesses navigate complex regulatory requirements with expert guidance.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <a href="tel:+919825600907" className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-[#0096D6] transition-colors">
                                <span className="w-8 h-8 rounded-full bg-[rgba(0,150,220,0.15)] flex items-center justify-center text-[14px]">📞</span>
                                +91-9825600907
                            </a>
                            <a href="mailto:info@estabizz.com" className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-[#0096D6] transition-colors">
                                <span className="w-8 h-8 rounded-full bg-[rgba(0,150,220,0.15)] flex items-center justify-center text-[14px]">✉️</span>
                                info@estabizz.com
                            </a>
                            <div className="flex items-start gap-3 text-[14px] text-gray-300">
                                <span className="w-8 h-8 rounded-full bg-[rgba(0,150,220,0.15)] flex items-center justify-center text-[14px] shrink-0 mt-0.5">📍</span>
                                <span>15 Vedika Exotika Bunglows, PDPU Road, Nr Gift City, Gandhinagar, Gujarat – 382355</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: "in", label: "LinkedIn", href: "https://linkedin.com/company/estabizz" },
                                { icon: "𝕏", label: "Twitter", href: "https://twitter.com/estabizz" },
                                { icon: "f", label: "Facebook", href: "https://facebook.com/estabizz" },
                                { icon: "▶", label: "YouTube", href: "https://youtube.com/@estabizz" },
                                { icon: "📷", label: "Instagram", href: "https://instagram.com/estabizz" },
                            ].map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                                    className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[13px] text-gray-400 hover:bg-[#0096D6] hover:text-white hover:border-[#0096D6] transition-all">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-[12px] font-bold text-white uppercase tracking-[0.08em] mb-4">{title}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-[13px] text-gray-400 hover:text-[#10b981] transition-colors">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Regulator Badges */}
                <div className="flex flex-wrap gap-2 mb-8 py-5 border-t border-b border-[rgba(255,255,255,0.08)]">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-3 py-1.5">Trusted By:</span>
                    {["RBI Regulated", "SEBI Registered", "IFSCA Licensed", "IRDAI Approved", "ISO 27001", "DPIIT Recognised"].map((b) => (
                        <span key={b} className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full text-[11px] text-gray-400 font-medium">{b}</span>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-gray-500">
                    <p>© 2014–2025 Estabizz Fintech Pvt. Ltd. All rights reserved.</p>
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
