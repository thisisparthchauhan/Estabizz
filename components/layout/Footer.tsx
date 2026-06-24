"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks: Record<string, { label: string; href: string }[]> = {
    "About": [
        { label: "About Estabizz", href: "/services" },
        { label: "Regulatory Insights", href: "/blogs" },
        { label: "Contact Us", href: "/contact" },
    ],
    "Regulatory Expertise": [
        { label: "RBI Licensing & Compliance", href: "/rbi" },
        { label: "SEBI Registrations", href: "/sebi" },
        { label: "IRDAI Licensing", href: "/irdai" },
        { label: "IFSCA & GIFT City", href: "/ifsca" },
        { label: "FIU & AML Frameworks", href: "/fema" },
        { label: "NBFC Compliance", href: "/rbi/nbfc-legal-support" },
        { label: "AIF & PMS Compliance", href: "/sebi/aif-compliance-test-report" },
    ],
    "Corporate & Sectoral Services": [
        { label: "Company Incorporation", href: "/services/enterprise-services" },
        { label: "Annual ROC Compliance", href: "/services/enterprise-services" },
        { label: "Tax & Audit", href: "/services/enterprise-services" },
        { label: "Sectoral Licences", href: "/services" },
        { label: "IPR & Trademark", href: "/services/trademark-search" },
    ],
    "Compliance Portal": [
        { label: "Estabizz Compliance Hub", href: "/login" },
        { label: "Regulatory Dashboard", href: "/login" },
        { label: "Licence Tracker", href: "/login" },
        { label: "Document Vault", href: "/login" },
        { label: "Policy Library", href: "/login" },
        { label: "Compliance Calendar", href: "/login" },
    ],
    "Knowledge & Resources": [
        { label: "Regulatory Updates", href: "/resources/regulatory-updates" },
        { label: "Content Framework", href: "/resources/service-page-content-framework" },
        { label: "Proposal Templates", href: "/proposal-template" },
        { label: "Case Highlights", href: "/" },
        { label: "FAQs", href: "/resources/faqs" },
        { label: "Guides & Insights", href: "/resources" },
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

const regulators: { label: string; href: string }[] = [
    { label: "RBI", href: "/rbi" },
    { label: "SEBI", href: "/sebi" },
    { label: "IRDAI", href: "/irdai" },
    { label: "IFSCA", href: "/ifsca" },
    { label: "MCA", href: "/services/enterprise-services" },
    { label: "FIU-IND", href: "/fema" },
    { label: "PMLA", href: "/services/legal-due-diligence" },
    { label: "ROC", href: "/services/enterprise-services" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#0a1628] text-white/70">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-10%] top-[-25%] h-[440px] w-[440px] rounded-full bg-[#1677f2]/15 blur-[140px]" />
                <div className="absolute bottom-[-15%] right-[-8%] h-[420px] w-[420px] rounded-full bg-[#1677f2]/12 blur-[150px]" />
            </div>
            <div className="relative h-[3px] w-full bg-gradient-to-r from-transparent via-[#1677f2] to-transparent" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-7 pt-12">
                <div className="grid grid-cols-1 gap-10 xl:grid-cols-[330px_1fr]">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="group mb-4 flex items-center gap-2.5">
                            <Image src="/estabizz-logo-light.png" alt="Estabizz" width={747} height={314} className="h-9 w-auto transition-transform group-hover:scale-[1.03]" />
                            <div className="leading-tight">
                                <div className="text-[19px] font-black tracking-tight text-white">Fintech</div>
                                <div className="text-[11px] font-bold text-[#4f9dfb]">We Comply. We Simplify.</div>
                            </div>
                        </Link>

                        <p className="max-w-[320px] text-[13px] leading-relaxed text-white/55">
                            Structured regulatory advisory and compliance infrastructure partner for Indian and global businesses.
                        </p>

                        <div className="mt-5 space-y-2.5">
                            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[12.5px] leading-relaxed text-white/65">
                                15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421
                            </div>
                            <a href="tel:+919825600907" className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[12.5px] font-semibold text-white/70 transition-colors hover:border-[#1677f2]/40 hover:text-[#4f9dfb]">
                                +91 98256 00907
                            </a>
                            <a href="mailto:info@estabizz.com" className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[12.5px] font-semibold text-white/70 transition-colors hover:border-[#1677f2]/40 hover:text-[#4f9dfb]">
                                info@estabizz.com
                            </a>
                        </div>

                        <div className="mt-4 flex gap-2.5">
                            {[
                                { icon: "IG", label: "Instagram", href: "https://www.instagram.com/estabizzlegal/" },
                                { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/company/estabizz-fintech/" },
                            ].map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-[12px] font-black text-white/65 transition-all hover:-translate-y-1 hover:border-[#1677f2] hover:bg-[#1677f2] hover:text-white">
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        <div className="mt-4 text-[11px] font-semibold text-white/35">
                            CIN: U74999GJ2021PTC123384
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h4 className="mb-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#4f9dfb]">{title}</h4>
                                <ul className="space-y-2">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href} className="inline-block text-[12.5px] font-medium leading-relaxed text-white/55 transition-all hover:pl-1 hover:text-white">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Regulators — clickable */}
                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
                    <span className="mr-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/40">Regulators:</span>
                    {regulators.map((r) => (
                        <Link key={r.label} href={r.href} className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-[11px] font-bold text-white/70 transition-all hover:-translate-y-0.5 hover:border-[#1677f2] hover:bg-[#1677f2] hover:text-white hover:shadow-[0_8px_20px_rgba(22,119,242,0.3)]">
                            {r.label}
                        </Link>
                    ))}
                </div>

                <p className="mt-6 text-[11px] leading-relaxed text-white/40">
                    <strong className="text-white/55">Disclaimer:</strong> Estabizz Fintech Private Limited operates as an independent regulatory advisory and compliance support organisation. We neither represent nor act for any statutory or regulatory authority. The issuance of any licence, registration or approval is solely within the jurisdiction and discretion of the concerned regulator and is contingent upon satisfaction of prescribed eligibility and compliance conditions. The company does not commit to guaranteed approvals or defined timelines. Our services are advisory and documentation-based in nature, aimed at facilitating regulatory preparedness and structured compliance.
                </p>

                <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[12px] font-medium text-white/40 md:flex-row">
                    <p>&copy; 2026 Estabizz Fintech Private Limited. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <Link href="/legal/privacy-policy" className="transition-colors hover:text-[#4f9dfb]">Privacy Policy</Link>
                        <Link href="/legal/terms-conditions" className="transition-colors hover:text-[#4f9dfb]">Terms of Service</Link>
                        <Link href="/legal/refund-policy" className="transition-colors hover:text-[#4f9dfb]">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
