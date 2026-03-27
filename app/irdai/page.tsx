import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "IRDAI Services – Insurance Broker, ISNP & Regulatory Compliance | Estabizz Fintech",
    description: "Complete IRDAI regulatory services in India – insurance broker license, ISNP registration, insurance marketing firm, regulatory sandbox and more. Expert guidance by Estabizz Fintech.",
    keywords: "IRDAI Services India, Insurance Broker License, ISNP Registration, IRDAI Regulatory Sandbox",
    alternates: { canonical: "/irdai" }
};

const services = [
    { href: "/irdai/irda-insurance-broker-license", title: "IRDA Insurance Broker License", desc: "Complete guide to obtaining IRDAI insurance broker license with eligibility, process & compliance.", tag: "IRDAI", emoji: "🛡️" },
    { href: "/irdai/irdai-regulatory-sandbox", title: "IRDAI Regulatory Sandbox", desc: "Framework and process for participating in IRDAI's regulatory sandbox for insurance innovation.", tag: "IRDAI", emoji: "🧪" },
    { href: "/irdai/insurance-marketing-firm-license", title: "Insurance Marketing Firm License", desc: "IRDAI registration guide for insurance marketing firms with eligibility and compliance requirements.", tag: "IRDAI", emoji: "📋" },
    { href: "/irdai/insurance-repository-registration", title: "Insurance Repository Registration", desc: "IRDAI registration process for insurance repositories managing electronic insurance accounts.", tag: "IRDAI", emoji: "🗂️" },
    { href: "/irdai/isnp-registration", title: "ISNP Registration", desc: "Complete guide to Insurance Self-Network Platform registration under IRDAI regulations.", tag: "IRDAI", emoji: "🌐" },
    { href: "/irdai/ifsca-insurance-intermediary", title: "IFSCA Insurance Intermediary", desc: "IFSCA registration and compliance guide for insurance intermediaries operating in GIFT City.", tag: "IRDAI", emoji: "🏙️" },
];

export default function Page() {
    return (
        <div className="bg-[#f8faff] min-h-screen pt-24">
            <section className="relative py-16 px-6 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center space-x-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">IRDAI Services</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">🛡️ Insurance Regulatory and Development Authority of India</span>
                    <h1 className="text-[40px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">IRDAI Services in India</h1>
                    <p className="text-[17px] text-gray-600 max-w-2xl mb-8">Comprehensive IRDAI regulatory services – insurance broker licenses, ISNP registration, insurance marketing firms, regulatory sandbox participation and IFSCA intermediary compliance.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Book Free Consultation →</Link>
                        <Link href="/contact" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Talk to Expert</Link>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-[28px] font-black text-[#0a1628] mb-3">IRDAI Regulatory Services</h2>
                <p className="text-gray-500 mb-10">Select a service to access the complete regulatory guide with eligibility, process, fees, timeline and FAQs.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <Link key={i} href={s.href} className="group block">
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl">{s.emoji}</div>
                                    <span className="text-[11px] font-bold text-[#0096D6] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">{s.tag}</span>
                                </div>
                                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2 leading-snug">{s.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{s.desc}</p>
                                <div className="mt-4 text-[13px] text-[#0096D6] font-semibold group-hover:underline">Read Guide →</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] py-16 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[28px] font-bold text-white mb-4">Need Expert IRDAI Compliance Guidance?</h2>
                    <p className="text-blue-100 mb-8">Our team specialises in IRDAI registration, insurance broker licensing, ISNP compliance and insurance regulatory frameworks in India.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Get Started Free →</Link>
                        <a href="tel:+919876543210" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Talk to Expert</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
