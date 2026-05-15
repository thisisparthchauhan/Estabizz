import Link from "next/link";

type TableRow = Record<string, string>;

export function ResourceCardGrid({
    cards,
}: {
    cards: { title: string; description: string; href: string; button?: string }[];
}) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
                <Link
                    key={card.href}
                    href={card.href}
                    className="group rounded-2xl border border-blue-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0096D6]/40 hover:shadow-[0_18px_45px_rgba(0,100,200,0.12)]"
                >
                    <h2 className="mb-3 text-[20px] font-black text-[#0a1628] group-hover:text-[#0096D6]">{card.title}</h2>
                    <p className="mb-6 text-[14px] leading-7 text-[#64748b]">{card.description}</p>
                    <span className="text-[14px] font-bold text-[#0096D6]">{card.button || "Open Resource"} →</span>
                </Link>
            ))}
        </div>
    );
}

export function QuickAnswerBox({
    title,
    answers,
}: {
    title: string;
    answers: { question: string; answer: string }[];
}) {
    return (
        <section className="rounded-3xl border border-blue-100 bg-[#f7fbff] p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-[26px] font-black text-[#0a1628]">{title}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {answers.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-blue-100 bg-white p-5">
                        <h3 className="mb-2 text-[15px] font-black text-[#0a1628]">{item.question}</h3>
                        <p className="text-[13.5px] leading-6 text-[#64748b]">{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function FrameworkTable({
    title,
    columns,
    rows,
}: {
    title?: string;
    columns: string[];
    rows: TableRow[];
}) {
    return (
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            {title && <h3 className="mb-4 text-[18px] font-black text-[#0a1628]">{title}</h3>}
            <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full border-collapse text-left text-[13.5px]">
                    <thead>
                        <tr className="bg-[#0a1628] text-white">
                            {columns.map((column) => (
                                <th key={column} className="px-4 py-3 font-bold">{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className="border-b border-blue-50 last:border-b-0">
                                {columns.map((column) => (
                                    <td key={column} className="px-4 py-3 leading-6 text-[#475569]">{row[column] || ""}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export const RegulatoryFrameworkTable = FrameworkTable;
export const EligibilityTable = FrameworkTable;
export const DocumentChecklist = FrameworkTable;
export const FeesTable = FrameworkTable;
export const ComplianceCalendar = FrameworkTable;

export function ProcessTimeline({
    steps,
}: {
    steps: { title: string; subtitle?: string; description: string }[];
}) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {steps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0a1628] text-sm font-black text-white">{index + 1}</div>
                    <h3 className="text-[18px] font-black text-[#0a1628]">{step.title}</h3>
                    {step.subtitle && <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.12em] text-[#0096D6]">{step.subtitle}</p>}
                    <p className="mt-3 text-[14px] leading-7 text-[#64748b]">{step.description}</p>
                </div>
            ))}
        </div>
    );
}

export function ExpertQuote({ quote, expert }: { quote: string; expert?: string }) {
    return (
        <blockquote className="rounded-3xl border border-[#d7b56d]/40 bg-[#fffaf0] p-7 shadow-sm">
            <p className="text-[20px] font-black leading-8 text-[#0a1628]">“{quote}”</p>
            <footer className="mt-5 text-[14px] font-bold text-[#8a6a1f]">{expert || "CS Devyani Khambhati - Compliance Expert"}</footer>
        </blockquote>
    );
}

export function FinalCTA({
    title,
    text,
    primary,
    secondary,
}: {
    title: string;
    text: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
}) {
    return (
        <section className="rounded-3xl bg-[#0a1628] p-8 text-white shadow-[0_24px_70px_rgba(10,22,40,0.22)] md:p-10">
            <h2 className="mb-4 text-[30px] font-black leading-tight md:text-[40px]">{title}</h2>
            <p className="mb-7 max-w-3xl text-[16px] leading-8 text-blue-100">{text}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={primary.href} className="rounded-xl bg-[#0096D6] px-6 py-3 text-center text-sm font-black text-white">{primary.label}</Link>
                {secondary && <Link href={secondary.href} className="rounded-xl border border-white/25 px-6 py-3 text-center text-sm font-black text-white">{secondary.label}</Link>}
                <Link href="https://wa.me/919825600907" className="rounded-xl border border-white/25 px-6 py-3 text-center text-sm font-black text-white">WhatsApp Estabizz Team</Link>
            </div>
        </section>
    );
}

export function ProposalCommercialsTable() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FrameworkTable
                title="Professional Fees"
                columns={["Particular", "Amount", "GST", "Total"]}
                rows={[
                    { Particular: "Professional advisory and documentation support", Amount: "To be quoted", GST: "As applicable", Total: "To be confirmed" },
                    { Particular: "Post-registration compliance retainer", Amount: "Optional", GST: "As applicable", Total: "Separate quote" },
                ]}
            />
            <FrameworkTable
                title="Payment Tranches"
                columns={["Stage", "Amount", "Trigger"]}
                rows={[
                    { Stage: "Stage 1", Amount: "Initial tranche", Trigger: "On engagement confirmation" },
                    { Stage: "Stage 2", Amount: "Documentation tranche", Trigger: "Before application preparation and policy drafting" },
                    { Stage: "Stage 3", Amount: "Filing / support tranche", Trigger: "Before filing or regulatory query support" },
                ]}
            />
        </div>
    );
}
