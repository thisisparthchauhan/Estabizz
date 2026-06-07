import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Estabizz Fintech Private Limited | Regulatory Advisory & Compliance",
    description: "Learn about Estabizz Fintech Private Limited, a regulatory advisory and compliance support organisation for RBI, SEBI, IRDAI, IFSCA, FIU-IND, MCA and government licensing matters.",
    alternates: { canonical: "/about" },
};

const expertise = [
    "RBI licensing and NBFC compliance",
    "SEBI intermediary registrations",
    "IRDAI insurance intermediary licensing",
    "IFSCA and GIFT City structuring",
    "FIU-IND, AML and PMLA compliance",
    "MCA, ROC and corporate governance",
];

const principles = [
    {
        title: "Regulator-Ready Preparation",
        text: "Applications, policies and supporting documents are structured with regulatory scrutiny, eligibility and practical query response in mind.",
    },
    {
        title: "Legally Safe Advisory",
        text: "We do not promise approvals or fixed regulatory timelines. Our role is to reduce documentation gaps and improve compliance readiness.",
    },
    {
        title: "Execution Ownership",
        text: "Our team supports clients from applicability review and documentation to filing coordination, clarification support and post-registration compliance planning.",
    },
    {
        title: "Long-Term Compliance View",
        text: "Licensing is only the beginning. We help businesses prepare for returns, audits, policy updates, inspections and governance requirements.",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-24">
            <section className="relative overflow-hidden border-b border-blue-100 px-6 py-16">
                <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(#0096D6_1px,transparent_1px),linear-gradient(90deg,#0096D6_1px,transparent_1px)] bg-[length:44px_44px]" />
                <div className="relative z-10 mx-auto max-w-7xl">
                    <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="transition-colors hover:text-[#0096D6]">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">About Estabizz</span>
                    </nav>
                    <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0096D6]">
                        India&apos;s #1 Fintech Compliance Platform
                    </span>
                    <h1 className="max-w-4xl text-[40px] font-black leading-tight tracking-tight text-[#0a1628] md:text-[58px]">
                        About Estabizz Fintech Private Limited
                    </h1>
                    <p className="mt-5 max-w-3xl text-[18px] font-medium leading-relaxed text-gray-600">
                        Estabizz Fintech Private Limited is a regulatory advisory and compliance support organisation helping founders, CFOs, financial intermediaries and growth-stage businesses navigate licensing, documentation, filings and post-registration compliance.
                    </p>
                    <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-gray-600">
                        We work across RBI, SEBI, IRDAI, IFSCA, FIU-IND, MCA and allied government frameworks with a practical, compliance-led approach. We Secure Your License. You Secure Your Future.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/get-started" className="rounded-2xl bg-[#0096D6] px-7 py-4 text-center text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1">
                            Start a Structured Assessment
                        </Link>
                        <Link href="/contact" className="rounded-2xl border border-blue-200 bg-white px-7 py-4 text-center text-sm font-black text-[#0077B6] transition-colors hover:bg-blue-50">
                            Contact Estabizz
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-[28px] border border-blue-100 bg-white p-8 shadow-sm">
                        <h2 className="text-[30px] font-black leading-tight text-[#0a1628]">What Estabizz Supports</h2>
                        <p className="mt-4 text-sm leading-relaxed text-gray-600">
                            Our services are advisory and documentation-based in nature, aimed at regulatory preparedness and structured compliance. Final approval is always subject to regulator review and applicable eligibility.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {expertise.map((item) => (
                            <div key={item} className="rounded-2xl border border-blue-100 bg-white p-5 text-sm font-bold text-[#0a1628] shadow-sm">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-center text-[34px] font-black text-[#0a1628]">How We Work</h2>
                    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {principles.map((item) => (
                            <div key={item.title} className="rounded-[24px] border border-blue-100 bg-[#f8faff] p-6 shadow-sm">
                                <h3 className="text-[18px] font-black text-[#0a1628]">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="rounded-[30px] bg-[#06101f] p-8 text-white md:p-10">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-[#8edcff]">Registered Office</div>
                    <p className="mt-4 max-w-4xl text-[20px] font-bold leading-relaxed">
                        15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421
                    </p>
                    <div className="mt-5 grid gap-3 text-sm text-white/70 md:grid-cols-3">
                        <span>CIN: U74999GJ2021PTC123384</span>
                        <a href="tel:+919825600907" className="hover:text-white">Phone: +91 98256 00907</a>
                        <a href="mailto:info@estabizz.com" className="hover:text-white">Email: info@estabizz.com</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
