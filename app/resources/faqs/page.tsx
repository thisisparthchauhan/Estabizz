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
        <main className="min-h-screen bg-[#f8faff] pt-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <section className="border-b border-blue-100 px-6 py-16" style={{ background: "linear-gradient(135deg,#f0f9ff,#e0f2fe,#eff6ff)" }}>
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-6 flex gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link><span>&gt;</span><Link href="/resources" className="hover:text-[#0096D6]">Resources</Link><span>&gt;</span><span className="text-[#0096D6]">FAQs</span>
                    </nav>
                    <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0096D6]">SEO + GEO + AEO FAQ Engine</span>
                    <h1 className="mb-5 max-w-4xl text-[40px] font-black leading-tight text-[#0a1628] md:text-[52px]">Compliance FAQ Hub for Licence and Registration Pages</h1>
                    <p className="max-w-3xl text-[17px] leading-8 text-gray-600">
                        A structured FAQ system for RBI, SEBI, IRDAI, IFSCA and government licence pages, built for human readers, search engines and AI answer systems.
                    </p>
                </div>
            </section>

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
