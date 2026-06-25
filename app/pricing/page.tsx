import type { Metadata } from "next";
import { getContent } from '@/lib/content/getContent';
import { buildPageMetadata } from '@/lib/seo/pageMetadata';
import { SEO_PRICING_DEFAULTS, type SeoContent } from '@/lib/content/seoDefaults';
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getContent('seo.pricing') as Partial<SeoContent>;
    return buildPageMetadata(seo, SEO_PRICING_DEFAULTS, '/pricing');
}

const engagementModels = [
    {
        title: "Discovery Consultation",
        description: "Initial assessment of business model, regulator touchpoints, eligibility and practical route options.",
    },
    {
        title: "License Application Support",
        description: "Structured support for application preparation, document mapping, drafting and filing coordination.",
    },
    {
        title: "Compliance Retainer",
        description: "Ongoing advisory support for periodic filings, compliance calendars, document review and regulatory hygiene.",
    },
    {
        title: "Documentation & Policy Drafting",
        description: "Preparation of policies, process notes, manuals, declarations, business plans and regulator-ready documents.",
    },
    {
        title: "Regulatory Query Support",
        description: "Assistance with regulator observations, clarification responses and follow-up documentation.",
    },
    {
        title: "Custom Quote Based on Scope",
        description: "A tailored engagement model based on entity structure, service depth, timelines and compliance responsibility.",
    },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-white pt-[64px]">
            {/* Hero — homepage-themed */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
                        <span className="opacity-40">/</span>
                        <span className="text-[#374151]">Engagement Models</span>
                    </nav>
                    <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
                        Advisory Fees Are Scope-Based
                    </div>
                    <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">
                        Transparent <span className="text-[#1677f2]">Engagement Models</span>
                    </h1>
                    <p className="mt-4 max-w-3xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        Regulatory, licensing and compliance assignments vary by regulator, entity type, documentation depth and post-approval responsibilities. Estabizz works through clear scope definition before fee finalisation.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {engagementModels.map((model) => (
                        <div key={model.title} className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5fbff] font-black text-[#1677f2]">✓</div>
                            <h2 className="mb-3 text-[19px] font-black text-[#120b45]">{model.title}</h2>
                            <p className="text-sm leading-relaxed text-[#64748b]">{model.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                    <h2 className="mb-3 text-[22px] font-black text-[#120b45]">Professional Fee Disclaimer</h2>
                    <p className="text-sm leading-relaxed text-[#64748b]">
                        Professional fees may vary depending on the regulator, entity structure, capital requirement, business model, documentation scope, regulatory queries and ongoing compliance responsibility.
                    </p>
                    <Link
                        href="/get-started"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
                    >
                        Request a Custom Quote →
                    </Link>
                </div>
            </section>
        </main>
    );
}
