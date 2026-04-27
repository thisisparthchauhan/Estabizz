import Link from "next/link";

export default function BlogsPage() {
    return (
        <main className="bg-[#f8faff] min-h-screen pt-24">
            <section
                className="relative overflow-hidden border-b border-blue-100 px-6 py-16"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}
            >
                <div className="max-w-7xl mx-auto">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center gap-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Knowledge Hub</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">
                        Regulatory Insights
                    </span>
                    <h1 className="text-[40px] md:text-[52px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">
                        Estabizz Knowledge Hub
                    </h1>
                    <p className="text-[17px] md:text-[19px] text-gray-600 leading-relaxed max-w-3xl">
                        Practical insights on RBI, SEBI, IRDAI, IFSCA, FEMA and fintech compliance will be published here.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm text-center">
                    <h2 className="text-[24px] font-black text-[#0a1628] mb-3">Insights are being curated</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Our team is preparing regulator-focused articles, compliance explainers and licensing guides. For urgent advisory needs, connect directly with Estabizz.
                    </p>
                    <Link
                        href="/get-started"
                        className="mt-7 inline-flex px-7 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Start a Consultation
                    </Link>
                </div>
            </section>
        </main>
    );
}
