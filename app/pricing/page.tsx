import Link from "next/link";

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
        <main className="bg-[#f8faff] min-h-screen pt-24">
            <section
                className="relative overflow-hidden border-b border-blue-100 px-6 py-16"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}
            >
                <div className="max-w-7xl mx-auto">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center gap-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Engagement Models</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">
                        Advisory Fees Are Scope-Based
                    </span>
                    <h1 className="text-[40px] md:text-[52px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">
                        Transparent Engagement Models
                    </h1>
                    <p className="text-[17px] md:text-[19px] text-gray-600 leading-relaxed max-w-3xl">
                        Regulatory, licensing and compliance assignments vary by regulator, entity type, documentation depth and post-approval responsibilities. Estabizz works through clear scope definition before fee finalisation.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {engagementModels.map((model) => (
                        <div key={model.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-[#0096D6]/10 text-[#0096D6] flex items-center justify-center font-black mb-5">✓</div>
                            <h2 className="text-[19px] font-black text-[#0a1628] mb-3">{model.title}</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">{model.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 bg-white border border-blue-100 rounded-2xl p-8">
                    <h2 className="text-[22px] font-black text-[#0a1628] mb-3">Professional Fee Disclaimer</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Professional fees may vary depending on the regulator, entity structure, capital requirement, business model, documentation scope, regulatory queries and ongoing compliance responsibility.
                    </p>
                    <Link
                        href="/get-started"
                        className="mt-6 inline-flex px-7 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Request a Custom Quote
                    </Link>
                </div>
            </section>
        </main>
    );
}
