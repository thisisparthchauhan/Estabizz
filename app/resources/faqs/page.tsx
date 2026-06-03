import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import { complianceFaqs, faqCategories, faqSchemaFromItems, priorityFaqPages } from "@/lib/faqEngine";

export const metadata: Metadata = {
    title: "Compliance FAQs – RBI, SEBI, IRDAI, IFSCA Licence Questions | Estabizz",
    description: "Search-friendly compliance FAQs for licensing, eligibility, documents, fees, timelines, post-registration compliance and regulatory risks across Indian regulators.",
    alternates: { canonical: "/resources/faqs" }
};

export default function FaqHubPage() {
    const faqSchema = faqSchemaFromItems(complianceFaqs);

    return (
        <main className="min-h-screen bg-white pt-[64px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link><span className="opacity-40">/</span><Link href="/resources" className="hover:text-[#374151] transition-colors">Resources</Link><span className="opacity-40">/</span><span className="text-[#374151]">FAQs</span>
                    </nav>
                    <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">SEO + GEO + AEO FAQ Engine</span>
                    <h1 className="mb-5 max-w-4xl text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">Compliance FAQ Hub for <span className="text-[#1677f2]">Licence and Registration Pages</span></h1>
                    <p className="max-w-3xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        A structured FAQ system for RBI, SEBI, IRDAI, IFSCA and government licence pages, built for human readers, search engines and AI answer systems.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-[22px] font-black text-[#0a1628]">Mandatory FAQ Categories</h2>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{faqCategories.map((category) => <span key={category} className="rounded-xl bg-blue-50 px-3 py-2 text-[12px] font-bold text-[#0a1628]">{category}</span>)}</div>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-[22px] font-black text-[#0a1628]">Priority Pages</h2>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{priorityFaqPages.map((page) => <span key={page} className="rounded-xl bg-[#f8faff] px-3 py-2 text-[12px] font-bold text-[#475569]">{page}</span>)}</div>
                    </div>
                </div>

                <FAQAccordion faqs={complianceFaqs} />
            </section>
        </main>
    );
}
