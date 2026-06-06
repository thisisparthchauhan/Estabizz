"use client";
import React from "react";
import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string }[]> = {
    "About": [
        { label: "About Estabizz", href: "/services" },
        { label: "Estabizz Blogs", href: "/blogs" },
        { label: "Submit a Blog", href: "/submit-blog" },
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
        { label: "Estabizz Blogs", href: "/blogs" },
        { label: "Circular Explainers", href: "/resources/circular-explainers" },
        { label: "Client Education Notes", href: "/blogs" },
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

const footerMarkets = [
    "India", "GIFT IFSC", "UAE", "Saudi Arabia", "Singapore", "United Kingdom", "United States", "Canada", "Australia", "Mauritius", "Luxembourg", "Hong Kong",
];

const footerMetrics = [
    { label: "Regulators Covered", value: "RBI, SEBI, IRDAI, IFSCA" },
    { label: "Support Model", value: "Licensing + Compliance" },
    { label: "Execution Layer", value: "Documentation + Query Support" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#06101f] text-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[-12%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[#0096D6]/18 blur-[130px]" />
                <div className="absolute bottom-[-18%] right-[-8%] h-[520px] w-[520px] rounded-full bg-[#d9a938]/16 blur-[140px]" />
                <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:58px_58px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-8 pt-14">
                <div className="mb-12 overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.07] shadow-[0_36px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
                    <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="p-7 md:p-9">
                            <div className="mb-5 inline-flex rounded-full border border-[#8edcff]/20 bg-[#0096D6]/12 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#8edcff]">
                                Estabizz Compliance Network
                            </div>
                            <h2 className="max-w-[720px] text-[clamp(30px,4vw,52px)] font-black leading-[1.06] tracking-tight">
                                Regulatory support built for serious finance and growth-stage businesses.
                            </h2>
                            <p className="mt-5 max-w-[720px] text-[15px] font-medium leading-relaxed text-white/66">
                                Estabizz Fintech Private Limited supports licensing, registration, documentation and post-approval compliance across RBI, SEBI, IRDAI, IFSCA, FIU-IND, MCA and allied frameworks.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-[14px] font-black text-[#0077B6] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,0.16)]">
                                    Book Consultation
                                </Link>
                                <a href="https://wa.me/919825600907" className="inline-flex items-center justify-center rounded-2xl border border-white/16 bg-white/10 px-6 py-4 text-[14px] font-black text-white transition-all hover:bg-white/15">
                                    WhatsApp Estabizz Team
                                </a>
                            </div>
                        </div>

                        <div className="border-t border-white/10 bg-[#08182c]/78 p-7 md:p-9 lg:border-l lg:border-t-0">
                            <div className="grid gap-3">
                                {footerMetrics.map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">{item.label}</div>
                                        <div className="mt-2 text-[16px] font-black text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 rounded-2xl border border-[#d9a938]/20 bg-[#d9a938]/10 p-4">
                                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffd97a]">Global markets</div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {footerMarkets.map((market) => (
                                        <Link key={market} href="/contact" className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/76 transition-colors hover:border-[#8edcff]/40 hover:text-[#8edcff]">
                                            {market}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-10 xl:grid-cols-[350px_1fr]">
                    <div>
                        <Link href="/" className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6] via-[#0077B6] to-[#0a1628] text-xl font-black text-white shadow-[0_18px_40px_rgba(0,150,214,0.25)]">E</div>
                            <div>
                                <div className="text-[24px] font-black tracking-tight">Estabizz Fintech</div>
                                <div className="text-[12px] font-bold text-[#8edcff]">We Comply. We Simplify.</div>
                            </div>
                        </Link>

                        <p className="max-w-[330px] text-[13px] font-medium leading-relaxed text-white/58">
                            Structured regulatory advisory and compliance infrastructure partner for Indian and global businesses.
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-[13px] font-semibold text-white/70">
                                15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421
                            </div>
                            <a href="tel:+919825600907" className="block rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-[13px] font-semibold text-white/70 transition-colors hover:text-[#8edcff]">
                                +91 98256 00907
                            </a>
                            <a href="mailto:info@estabizz.com" className="block rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-[13px] font-semibold text-white/70 transition-colors hover:text-[#8edcff]">
                                info@estabizz.com
                            </a>
                        </div>

                        <div className="mt-5 flex gap-3">
                            {[
                                { icon: "IG", label: "Instagram", href: "https://instagram.com/estabizz" },
                                { icon: "in", label: "LinkedIn", href: "https://linkedin.com/company/estabizz" },
                                { icon: "f", label: "Facebook", href: "https://facebook.com/estabizz" },
                            ].map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[12px] font-black text-white/60 transition-all hover:-translate-y-1 hover:border-[#0096D6] hover:bg-[#0096D6] hover:text-white">
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        <div className="mt-5 text-[11px] font-semibold text-white/38">
                            CIN: U74999GJ2021PTC123384
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                                <h4 className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-white">{title}</h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href} className="text-[12px] font-medium leading-relaxed text-white/48 transition-colors hover:text-[#8edcff]">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8 flex flex-wrap gap-2 border-y border-white/10 py-5">
                    <span className="mr-2 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white/36">Regulators:</span>
                    {["RBI", "SEBI", "IRDAI", "IFSCA", "MCA", "FIU-IND", "PMLA", "ROC"].map((b) => (
                        <span key={b} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[11px] font-bold text-white/50">{b}</span>
                    ))}
                </div>

                <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[11.5px] font-medium leading-relaxed text-white/42">
                        <strong className="text-white/62">Disclaimer:</strong> Estabizz Fintech Private Limited operates as an independent regulatory advisory and compliance support organisation. We neither represent nor act for any statutory or regulatory authority. The issuance of any licence, registration or approval is solely within the jurisdiction and discretion of the concerned regulator and is contingent upon satisfaction of prescribed eligibility and compliance conditions. The company does not commit to guaranteed approvals or defined timelines. Our services are advisory and documentation-based in nature, aimed at facilitating regulatory preparedness and structured compliance.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 text-[12px] font-medium text-white/38 md:flex-row">
                    <p>&copy; 2026 Estabizz Fintech Private Limited. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <Link href="/legal/privacy-policy" className="transition-colors hover:text-white/70">Privacy Policy</Link>
                        <Link href="/legal/terms-conditions" className="transition-colors hover:text-white/70">Terms of Service</Link>
                        <Link href="/legal/refund-policy" className="transition-colors hover:text-white/70">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
