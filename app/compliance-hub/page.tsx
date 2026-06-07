import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Estabizz Compliance Hub | Regulatory Dashboard & Licence Tracking",
    description: "Estabizz Compliance Hub helps clients organise licence tracking, document vaults, compliance calendars, policy libraries and regulatory update workflows.",
    alternates: { canonical: "/compliance-hub" },
};

const features = [
    ["Compliance Dashboard", "Monitor licences, filings, deadlines, assignments and regulatory status in one structured view."],
    ["Document Vault", "Maintain organised access to policies, certificates, regulatory filings and compliance evidence."],
    ["Licence Tracker", "Track application stages, query status, responsible persons and post-approval action points."],
    ["Compliance Calendar", "Plan recurring RBI, SEBI, IRDAI, IFSCA, ROC, Income Tax and other compliance deadlines."],
    ["Policy Library", "Organise AML, KYC, grievance, risk, audit and governance documents where enabled."],
    ["Regulatory Alerts", "Convert circulars and updates into practical implementation notes for internal teams."],
];

export default function ComplianceHubPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-24">
            <section className="relative overflow-hidden bg-[#06101f] px-6 py-16 text-white">
                <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:58px_58px]" />
                <div className="relative z-10 mx-auto max-w-7xl py-10">
                    <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-white/50">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#8edcff]">Compliance Hub</span>
                    </nav>
                    <span className="mb-5 inline-flex rounded-full border border-[#8edcff]/20 bg-[#0096D6]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#8edcff]">
                        One Portal. Complete Regulatory Control.
                    </span>
                    <h1 className="max-w-4xl text-[40px] font-black leading-tight tracking-tight md:text-[58px]">
                        Estabizz Compliance Hub
                    </h1>
                    <p className="mt-5 max-w-3xl text-[18px] font-medium leading-relaxed text-white/70">
                        The Estabizz Compliance Hub is designed to help clients organise regulatory documents, application status, compliance calendars, policy frameworks and implementation evidence in a structured digital environment.
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">
                        Portal features may be enabled based on client onboarding, engagement scope and applicable compliance requirements.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/login" className="rounded-2xl bg-white px-7 py-4 text-center text-sm font-black text-[#0077B6]">Client Login</Link>
                        <Link href="/get-started" className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-center text-sm font-black text-white">Request Access</Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map(([title, text]) => (
                        <div key={title} className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-sm">
                            <h2 className="text-[20px] font-black text-[#0a1628]">{title}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
