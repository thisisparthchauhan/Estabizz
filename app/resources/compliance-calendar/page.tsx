import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Compliance Calendar – Regulatory Filing Timelines | Estabizz",
    description: "An indicative compliance calendar for regulated entities — recurring RBI, SEBI, IRDAI, IFSCA, MCA/ROC and tax filing responsibilities, frequencies and timelines.",
    alternates: { canonical: "/resources/compliance-calendar" }
};

type Row = { filing: string; frequency: string; timing: string; applies: string };
type Calendar = { regulator: string; icon: string; rows: Row[] };

const calendars: Calendar[] = [
    {
        regulator: "RBI — NBFCs & Fintech",
        icon: "🏛️",
        rows: [
            { filing: "DNBS returns (supervisory returns)", frequency: "Monthly / Quarterly", timing: "As per the applicable return schedule", applies: "Registered NBFCs" },
            { filing: "Key financial parameters / annual return", frequency: "Annual", timing: "After financial year end", applies: "NBFCs (layer-based)" },
            { filing: "Statutory Auditor Certificate (SAC)", frequency: "Annual", timing: "After financial year end", applies: "All NBFCs" },
            { filing: "Fraud / FMR reporting", frequency: "On occurrence", timing: "Within prescribed reporting window", applies: "Applicable entities" },
        ],
    },
    {
        regulator: "SEBI — Market Intermediaries",
        icon: "📈",
        rows: [
            { filing: "Half-yearly / annual compliance reports", frequency: "Half-yearly / Annual", timing: "As per intermediary regulations", applies: "AIF, PMS, RIA, RA, Brokers" },
            { filing: "Net worth / capital adequacy confirmation", frequency: "Periodic", timing: "As prescribed", applies: "Applicable intermediaries" },
            { filing: "Investor grievance / SCORES status", frequency: "Ongoing / Monthly", timing: "Within grievance timelines", applies: "Registered intermediaries" },
            { filing: "KYC, AML & cyber-resilience filings", frequency: "Periodic", timing: "As per circulars in force", applies: "Applicable intermediaries" },
        ],
    },
    {
        regulator: "IRDAI — Insurance Intermediaries",
        icon: "🛡️",
        rows: [
            { filing: "Annual compliance / renewal filings", frequency: "Annual", timing: "Before licence renewal date", applies: "Brokers, IMFs, Corporate Agents" },
            { filing: "Periodic business & regulatory returns", frequency: "Quarterly / Annual", timing: "As per IRDAI schedule", applies: "Registered intermediaries" },
            { filing: "Professional indemnity / net worth proof", frequency: "Annual", timing: "On renewal", applies: "Insurance brokers" },
        ],
    },
    {
        regulator: "IFSCA — GIFT City Entities",
        icon: "🌐",
        rows: [
            { filing: "Periodic regulatory returns", frequency: "Periodic", timing: "As per IFSCA framework", applies: "IFSC-registered entities" },
            { filing: "AML / KYC & governance confirmations", frequency: "Periodic", timing: "As prescribed", applies: "Applicable entities" },
            { filing: "Audited financials / annual filings", frequency: "Annual", timing: "After financial year end", applies: "IFSC entities" },
        ],
    },
    {
        regulator: "MCA / ROC — Companies & LLPs",
        icon: "🏢",
        rows: [
            { filing: "AOC-4 (financial statements)", frequency: "Annual", timing: "Within 30 days of AGM", applies: "Companies" },
            { filing: "MGT-7 / 7A (annual return)", frequency: "Annual", timing: "Within 60 days of AGM", applies: "Companies" },
            { filing: "DIR-3 KYC", frequency: "Annual", timing: "By 30 September", applies: "Every DIN holder" },
            { filing: "LLP Form 11 (annual return)", frequency: "Annual", timing: "By 30 May", applies: "LLPs" },
            { filing: "LLP Form 8 (statement of accounts)", frequency: "Annual", timing: "By 30 October", applies: "LLPs" },
        ],
    },
    {
        regulator: "Income Tax & GST",
        icon: "🧾",
        rows: [
            { filing: "GSTR-1 / GSTR-3B", frequency: "Monthly / Quarterly", timing: "As per the GST return schedule", applies: "GST-registered businesses" },
            { filing: "TDS returns (24Q / 26Q)", frequency: "Quarterly", timing: "By the prescribed quarterly date", applies: "Deductors" },
            { filing: "Income Tax Return", frequency: "Annual", timing: "By the applicable due date", applies: "All assessees" },
            { filing: "Tax Audit (3CA/3CB-3CD)", frequency: "Annual", timing: "By the applicable due date", applies: "Entities under audit" },
        ],
    },
];

export default function ComplianceCalendarPage() {
    return (
        <main className="min-h-screen bg-white pt-[64px]">
            {/* Hero */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link><span className="opacity-40">/</span><Link href="/resources" className="hover:text-[#374151] transition-colors">Resources</Link><span className="opacity-40">/</span><span className="text-[#374151]">Compliance Calendar</span>
                    </nav>
                    <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">Filing Timelines</span>
                    <h1 className="mb-5 max-w-4xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">Regulatory <span className="text-[#1677f2]">Compliance Calendar</span></h1>
                    <p className="max-w-3xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        A consolidated, indicative view of the recurring filings and returns regulated entities are expected to manage across RBI, SEBI, IRDAI, IFSCA, MCA/ROC and tax frameworks — so nothing slips through the cracks.
                    </p>
                </div>
            </header>

            {/* Calendars */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {calendars.map((cal) => (
                        <div key={cal.regulator} className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                            <div className="flex items-center gap-3 border-b border-blue-100 bg-[#f8fbff] px-5 py-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5fbff] text-xl">{cal.icon}</span>
                                <h2 className="text-[16px] font-black tracking-[-0.01em] text-[#120b45]">{cal.regulator}</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[520px] text-left text-[13px]">
                                    <thead>
                                        <tr className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8]">
                                            <th className="px-5 py-3">Filing / Return</th>
                                            <th className="px-5 py-3">Frequency</th>
                                            <th className="px-5 py-3">Indicative Timing</th>
                                            <th className="px-5 py-3">Applies To</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cal.rows.map((r) => (
                                            <tr key={r.filing} className="border-t border-gray-100 align-top">
                                                <td className="px-5 py-3 font-bold text-[#0a1628]">{r.filing}</td>
                                                <td className="px-5 py-3 text-[#475569]">{r.frequency}</td>
                                                <td className="px-5 py-3 text-[#475569]">{r.timing}</td>
                                                <td className="px-5 py-3 text-[#64748b]">{r.applies}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-8 rounded-2xl border border-amber-200 border-l-4 border-l-[#f59e0b] bg-[#fffbf0] p-5">
                    <p className="text-[13px] leading-relaxed text-[#78350f]">
                        <strong>Important:</strong> This calendar is indicative and for general guidance only. Exact due dates, frequencies and applicability vary by entity type, registration category, turnover, financial-year end and the regulations in force at the time. Always verify the latest official schedule from the relevant regulator before acting. Estabizz can prepare an entity-specific compliance calendar mapped to your registrations.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-6 mb-16 overflow-hidden rounded-2xl border border-[#1677f2]/25 bg-gradient-to-br from-[#0a1628] to-[#0c2040] px-6 py-14 text-center sm:px-10">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#4f9dfb]">Estabizz Fintech Private Limited</p>
                    <h2 className="mb-4 text-[26px] font-black text-white sm:text-[30px]">Want a compliance calendar built for your entity?</h2>
                    <p className="mb-8 text-[14.5px] leading-[1.7] text-white/60">We map your exact registrations, returns and due dates into a single tracked calendar — with reminders and filing support so deadlines are never missed.</p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/contact" className="rounded-xl bg-[#1677f2] px-8 py-3.5 text-[14px] font-black text-white hover:bg-[#3b8ef5] transition-colors">Build My Compliance Calendar →</Link>
                        <a href="https://wa.me/919825600907" className="rounded-xl border border-white/20 px-8 py-3.5 text-[14px] font-bold text-white/85 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white">WhatsApp Estabizz Team</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
