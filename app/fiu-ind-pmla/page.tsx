import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "FIU-IND & PMLA Compliance Services | Estabizz Fintech",
    description: "FIU-IND registration, AML policy drafting, PMLA compliance, reporting entity support, risk assessment and compliance documentation services by Estabizz Fintech.",
    alternates: { canonical: "/fiu-ind-pmla" },
};

const services = [
    "FIU-IND applicability review",
    "Reporting entity registration support",
    "AML and KYC policy drafting",
    "PMLA risk assessment framework",
    "Suspicious transaction reporting readiness",
    "CKYC and customer due diligence process notes",
    "Board-approved compliance documentation",
    "Periodic compliance calendar support",
];

const documents = [
    ["Entity documents", "Incorporation certificate, constitutional documents, PAN and registered office details."],
    ["Promoter and KMP details", "KYC, role mapping and fit-and-proper style declarations where applicable."],
    ["AML policy", "Risk-based AML, KYC, CDD, EDD and transaction monitoring framework."],
    ["Principal officer details", "Appointment and responsibility mapping for PMLA compliance."],
    ["Business model note", "Products, customer segments, transaction flow and reporting exposure."],
    ["Compliance records", "Registers, internal escalation matrix, audit trail and training records."],
];

export default function FiuIndPmlaPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-24">
            <section className="border-b border-blue-100 px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">FIU-IND & PMLA</span>
                    </nav>
                    <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0096D6]">
                        Financial Intelligence & AML Frameworks
                    </span>
                    <h1 className="max-w-4xl text-[40px] font-black leading-tight tracking-tight text-[#0a1628] md:text-[56px]">
                        FIU-IND & PMLA Compliance Services
                    </h1>
                    <p className="mt-5 max-w-3xl text-[18px] font-medium leading-relaxed text-gray-600">
                        Estabizz supports regulated and reporting entities with FIU-IND registration readiness, AML policy drafting, PMLA compliance documentation, customer due diligence frameworks and reporting process design.
                    </p>
                    <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-gray-600">
                        Applicability, registration and reporting obligations must be evaluated based on business model, products, transaction flow and latest regulatory requirements.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/get-started" className="rounded-2xl bg-[#0096D6] px-7 py-4 text-center text-sm font-black text-white shadow-lg">Check FIU Applicability</Link>
                        <a href="https://wa.me/919825600907" className="rounded-2xl border border-blue-200 bg-white px-7 py-4 text-center text-sm font-black text-[#0077B6]">WhatsApp Estabizz Team</a>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((item) => (
                        <div key={item} className="rounded-2xl border border-blue-100 bg-white p-5 text-sm font-bold text-[#0a1628] shadow-sm">
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-[32px] font-black text-[#0a1628]">Core Documentation Areas</h2>
                    <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100">
                        <table className="w-full min-w-[760px] border-collapse bg-white text-left text-sm">
                            <thead className="bg-[#06101f] text-white">
                                <tr>
                                    <th className="p-4">Document Area</th>
                                    <th className="p-4">Practical Requirement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(([area, note]) => (
                                    <tr key={area} className="border-t border-blue-50">
                                        <td className="p-4 font-black text-[#0a1628]">{area}</td>
                                        <td className="p-4 leading-relaxed text-gray-600">{note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-gray-600">
                        This page is for general informational purposes only. FIU-IND and PMLA obligations may change from time to time and should be verified before implementation.
                    </p>
                </div>
            </section>
        </main>
    );
}
