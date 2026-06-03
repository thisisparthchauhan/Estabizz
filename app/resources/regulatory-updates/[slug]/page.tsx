import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regulatoryUpdates } from "@/lib/regulatoryUpdates";

type Props = { params: Promise<{ slug: string }> };

function getUpdate(slug: string) {
    return regulatoryUpdates.find((update) => update.slug === slug);
}

export function generateStaticParams() {
    return regulatoryUpdates.map((update) => ({ slug: update.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const update = getUpdate(slug);
    if (!update) return {};

    return {
        title: `${update.title} – Compliance Impact & Action Checklist | Estabizz`,
        description: `${update.title} explained with affected entities, risk rating, implementation checklist, board note and compliance action points.`,
        alternates: { canonical: `/resources/regulatory-updates/${update.slug}` },
        openGraph: {
            title: update.title,
            description: update.summary,
            type: "article",
            url: `/resources/regulatory-updates/${update.slug}`
        }
    };
}

export default async function RegulatoryUpdateDetailPage({ params }: Props) {
    const { slug } = await params;
    const update = getUpdate(slug);
    if (!update) notFound();

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: update.title,
        description: update.summary,
        datePublished: update.date,
        dateModified: update.lastReviewed,
        author: { "@type": "Organization", name: "Estabizz Fintech Private Limited" },
        publisher: { "@type": "Organization", name: "Estabizz Fintech Private Limited" },
        mainEntityOfPage: `https://estabizz-site.vercel.app/resources/regulatory-updates/${update.slug}`
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Resources", item: "https://estabizz-site.vercel.app/resources" },
            { "@type": "ListItem", position: 3, name: "Regulatory Updates", item: "https://estabizz-site.vercel.app/resources/regulatory-updates" },
            { "@type": "ListItem", position: 4, name: update.title, item: `https://estabizz-site.vercel.app/resources/regulatory-updates/${update.slug}` }
        ]
    };

    return (
        <main className="min-h-screen bg-white pt-[64px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14">
                    <nav className="mb-5 flex flex-wrap items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link><span className="opacity-40">/</span><Link href="/resources" className="hover:text-[#374151] transition-colors">Resources</Link><span className="opacity-40">/</span><Link href="/resources/regulatory-updates" className="hover:text-[#374151] transition-colors">Regulatory Updates</Link>
                    </nav>
                    <div className="mb-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#f5fbff] px-3 py-1 text-xs font-black text-[#0077B6]">{update.regulator}</span>
                        <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-[#64748b]">{new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                        <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-[#64748b]">{update.circularNumber}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-black ${update.riskRating === "High" ? "bg-red-50 text-red-600" : update.riskRating === "Moderate" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{update.riskRating} Risk</span>
                    </div>
                    <h1 className="mb-4 max-w-4xl text-[34px] font-black leading-[1.1] tracking-[-0.03em] text-[#120b45] md:text-[48px]">{update.title}</h1>
                    <p className="mb-5 max-w-3xl text-[18px] leading-8 text-[#475569]">{update.subtitle}</p>
                    <p className="text-[13px] font-semibold text-[#64748b]">Affected entities: {update.affectedEntities.join(", ")} • Last reviewed: {new Date(update.lastReviewed).toLocaleDateString("en-IN")}</p>
                </div>
            </header>

            <article className="mx-auto max-w-5xl px-6 py-14">
                <Section title="Regulatory Reference Table">
                    <DataTable rows={[
                        ["Regulator", update.regulator],
                        ["Circular / Notification No.", update.circularNumber],
                        ["Date", new Date(update.date).toLocaleDateString("en-IN")],
                        ["Regulation / Master Direction", update.regulation],
                        ["Effective From", update.effectiveFrom],
                        ["Applicable Entities", update.affectedEntities.join(", ")],
                        ["Risk Rating", update.riskRating]
                    ]} />
                </Section>

                <Section title="What Has Changed">
                    <p>{update.summary}</p>
                    <p>The development should be read as a compliance action point rather than a passive circular. Regulated entities should identify applicability, assign internal responsibility and preserve evidence of implementation.</p>
                    <p>Where the circular affects customer protection, reporting, governance, risk management or inspection readiness, the compliance team should prepare a management note and review existing SOPs.</p>
                </Section>

                <Section title="Key Changes Table">
                    <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white">
                        <table className="min-w-[760px] w-full text-left text-sm">
                            <thead className="bg-[#0a1628] text-white"><tr>{["Area", "Earlier Position", "Revised Position", "Compliance Impact"].map((h) => <th key={h} className="p-4">{h}</th>)}</tr></thead>
                            <tbody>{update.changes.map((row) => <tr key={row.area} className="border-t border-gray-100"><td className="p-4 font-bold">{row.area}</td><td className="p-4">{row.earlier}</td><td className="p-4">{row.revised}</td><td className="p-4">{row.impact}</td></tr>)}</tbody>
                        </table>
                    </div>
                </Section>

                <Section title="Who Is Affected">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{update.affectedEntities.map((entity) => <div key={entity} className="rounded-xl border border-blue-100 bg-white p-4 font-semibold text-[#0a1628] shadow-sm">{entity}</div>)}</div>
                </Section>

                <Section title="Action Checklist">
                    <ActionTable rows={update.actionChecklist.map((item) => [item.action, item.responsibility, item.timeline])} />
                </Section>

                <Section title="Implementation Timeline">
                    <ActionTable rows={[["Day 1", "Review circular applicability and identify owner"], ["Day 7", "Prepare internal action note and assign responsibility"], ["Day 15", "Update policy, SOP or disclosure where required"], ["Day 30", "Confirm implementation evidence and reporting"], ["Ongoing", "Monitor compliance and maintain records"]]} headers={["Timeline", "Required Step", ""]} />
                </Section>

                <Section title="Common Compliance Risks">
                    <Checklist items={["Delay in interpreting applicability", "Not placing matter before Board / Compliance Committee", "Failure to update policy / SOP", "No evidence of implementation", "Missing regulatory timeline", "Inconsistent reporting", "Poor internal communication"]} />
                </Section>

                <Section title="Risk of Non-Compliance">
                    <p>Non-compliance may result in penalty, inspection observation, audit remark, regulatory query, suspension risk, reputational risk or delayed renewal / approval depending on the nature of the requirement.</p>
                </Section>

                <Section title="Regulatory Risk Rating">
                    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                        <h3 className="mb-2 text-xl font-black text-[#0a1628]">Risk Rating: {update.riskRating}</h3>
                        <p className="text-[#475569]">Reason: This update affects regulatory operations, reporting discipline or inspection readiness. The exact risk depends on the entity's business model, regulator exposure and implementation evidence.</p>
                    </div>
                </Section>

                <Section title="Board Level Note">
                    <p>This matter should be placed before the Board / Compliance Committee if it materially affects regulatory operations, customer protection, reporting, risk management or internal governance.</p>
                </Section>

                <Section title="How Estabizz Can Support">
                    <Checklist items={["Circular applicability review", "Policy update", "SOP revision", "Board note drafting", "Compliance checklist preparation", "Regulatory filing support", "Audit preparedness", "Inspection readiness", "Staff training note"]} />
                </Section>

                <div className="rounded-3xl bg-[#0a1628] p-8 text-white">
                    <h2 className="mb-3 text-[28px] font-black">Need Help Implementing This Regulatory Update?</h2>
                    <p className="mb-6 text-blue-100">Estabizz can help you understand applicability, prepare internal action notes, update policies and maintain compliance evidence.</p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/contact" className="rounded-xl bg-[#1677f2] px-6 py-3 text-sm font-bold">Speak to Compliance Expert</Link>
                        <Link href="/contact" className="rounded-xl bg-white/10 px-6 py-3 text-sm font-bold">Request Circular Impact Review</Link>
                        <a href="https://wa.me/919825600907" className="rounded-xl bg-[#10b981] px-6 py-3 text-sm font-bold">WhatsApp Estabizz Team</a>
                    </div>
                </div>

                <p className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 text-[12px] leading-6 text-[#64748b]">This update is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. Regulatory requirements may change from time to time. Businesses should verify the latest circular, regulation and regulator guidance before taking any action.</p>
            </article>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return <section className="mb-10"><h2 className="mb-4 text-[26px] font-black text-[#0a1628]">{title}</h2><div className="space-y-4 text-[15px] leading-8 text-[#475569]">{children}</div></section>;
}

function DataTable({ rows }: { rows: string[][] }) {
    return <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white"><table className="min-w-[680px] w-full text-left text-sm"><tbody>{rows.map(([a, b]) => <tr key={a} className="border-b border-gray-100 last:border-0"><th className="w-1/3 bg-blue-50 p-4 text-[#0a1628]">{a}</th><td className="p-4">{b}</td></tr>)}</tbody></table></div>;
}

function ActionTable({ rows, headers = ["Action Item", "Responsibility", "Suggested Timeline"] }: { rows: string[][]; headers?: string[] }) {
    return <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white"><table className="min-w-[720px] w-full text-left text-sm"><thead className="bg-[#0a1628] text-white"><tr>{headers.filter(Boolean).map((h) => <th key={h} className="p-4">{h}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-t border-gray-100">{row.filter(Boolean).map((cell) => <td key={cell} className="p-4">{cell}</td>)}</tr>)}</tbody></table></div>;
}

function Checklist({ items }: { items: string[] }) {
    return <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{items.map((item) => <div key={item} className="rounded-xl border border-blue-100 bg-white p-4 text-sm font-semibold text-[#0a1628] shadow-sm">{item}</div>)}</div>;
}
