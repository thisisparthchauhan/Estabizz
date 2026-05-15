import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Regulatory Update Email Template for RBI, SEBI, IRDAI & IFSCA Circulars",
    description: "Use Estabizz's structured regulatory update email template for circular interpretation, impact analysis, action checklist, implementation timeline and risk rating.",
    alternates: { canonical: "/resources/regulatory-update-email-template" }
};

const sections = [
    "EMAIL SUBJECT OPTIONS",
    "TITLE",
    "SUBTITLE",
    "INTRODUCTION",
    "REGULATORY REFERENCE TABLE",
    "WHAT HAS CHANGED",
    "KEY CHANGES TABLE",
    "WHO IS AFFECTED",
    "ACTION CHECKLIST",
    "IMPLEMENTATION TIMELINE",
    "COMMON COMPLIANCE RISKS",
    "RISK OF NON-COMPLIANCE",
    "REGULATORY RISK RATING",
    "BOARD LEVEL NOTE",
    "HOW ESTABIZZ CAN SUPPORT",
    "PROFESSIONAL CLOSING"
];

export default function RegulatoryEmailTemplatePage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-20">
            <section className="border-b border-blue-100 px-6 py-16" style={{ background: "linear-gradient(135deg,#f0f9ff,#e0f2fe,#eff6ff)" }}>
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-6 flex gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link><span>&gt;</span><Link href="/resources" className="hover:text-[#0096D6]">Resources</Link><span>&gt;</span><span className="text-[#0096D6]">Email Template</span>
                    </nav>
                    <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0096D6]">Circular Interpretation Template</span>
                    <h1 className="mb-5 max-w-4xl text-[40px] font-black leading-tight text-[#0a1628] md:text-[52px]">Regulatory Update Email Template for Compliance Teams</h1>
                    <p className="max-w-3xl text-[17px] leading-8 text-gray-600">
                        Use this structured format to convert any RBI, SEBI, IRDAI, IFSCA or allied regulatory circular into a professional compliance update email with impact analysis, affected entities, implementation checklist and risk rating.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-14">
                <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:p-10">
                    <h2 className="mb-6 text-[28px] font-black text-[#0a1628]">Template Preview</h2>

                    <div className="space-y-6 text-[14px] leading-7 text-[#475569]">
                        <Block title="EMAIL SUBJECT OPTIONS">
                            <ol className="list-decimal space-y-2 pl-5">
                                <li>Regulatory Update: [Regulator] Circular on [Topic] – Action Required</li>
                                <li>[Regulator] Compliance Update for [Affected Entities] – Impact and Timeline</li>
                                <li>Important Circular Review: [Topic] – Compliance Checklist Enclosed</li>
                            </ol>
                        </Block>
                        <Block title="TITLE">Clear and sharp regulatory headline.</Block>
                        <Block title="SUBTITLE">One-line compliance impact summary.</Block>
                        <Block title="Dear Sir / Madam,">Use a professional opening suitable for clients, boards and compliance teams.</Block>
                        <Block title="INTRODUCTION">Short explanation of the regulatory development and why it matters.</Block>
                        <Block title="REGULATORY REFERENCE TABLE">Particulars | Details: Regulator, Circular / Notification No., Date, Regulation / Master Direction and Effective From.</Block>
                        <Block title="WHAT HAS CHANGED">Practical interpretation in 3–5 paragraphs. Do not copy circular text; explain the compliance effect.</Block>
                        <Block title="KEY CHANGES TABLE">Area | Earlier Position | Revised Position | Compliance Impact.</Block>
                        <Block title="WHO IS AFFECTED">List intermediary categories clearly, such as NBFCs, AIFs, PMS entities, RTAs, insurance brokers or IFSCA entities.</Block>
                        <Block title="ACTION CHECKLIST">Action Item | Responsibility | Timeline.</Block>
                        <Block title="IMPLEMENTATION TIMELINE">Timeline | Required Step for Day 1, Day 7, Day 15, Day 30 and ongoing monitoring.</Block>
                        <Block title="COMMON COMPLIANCE RISKS">Highlight practical mistakes such as no board note, no SOP update or no evidence file.</Block>
                        <Block title="RISK OF NON-COMPLIANCE">Explain possible penalty, inspection observation, regulatory query, reputational risk or delayed renewal / approval.</Block>
                        <Block title="REGULATORY RISK RATING">Low / Moderate / High with reasoning.</Block>
                        <Block title="BOARD LEVEL NOTE">Mention if the matter should be placed before the Board / Compliance Committee.</Block>
                        <Block title="HOW ESTABIZZ CAN SUPPORT">Policy update, SOP revision, documentation, reporting and audit preparedness.</Block>
                        <Block title="PROFESSIONAL CLOSING">Warm advisory sign-off with contact details and clear next steps.</Block>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl bg-[#0a1628] p-8 text-white">
                    <h2 className="mb-3 text-[28px] font-black">Need Estabizz to prepare a regulatory update email for your team?</h2>
                    <p className="mb-6 text-blue-100">Our team can convert circulars into client-ready impact notes, board notes and implementation checklists.</p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/contact" className="rounded-xl bg-[#0096D6] px-6 py-3 text-sm font-bold">Request Email Draft</Link>
                        <Link href="/contact" className="rounded-xl bg-white/10 px-6 py-3 text-sm font-bold">Speak to Compliance Expert</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
    return <section className="rounded-2xl border border-blue-100 bg-[#fbfdff] p-5"><h3 className="mb-2 text-[13px] font-black uppercase tracking-[0.14em] text-[#0096D6]">{title}</h3><div>{children}</div></section>;
}
