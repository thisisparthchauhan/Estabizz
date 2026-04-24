import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "FEMA Services – Foreign Exchange Compliance & Registration | Estabizz Fintech",
    description: "Complete FEMA regulatory services in India – FEMA registration, compliance under FEMA, foreign exchange management and cross-border transaction guidance. Expert advisory by Estabizz Fintech.",
    keywords: "FEMA Services India, FEMA Registration, Foreign Exchange Compliance, FEMA Compliance",
    alternates: { canonical: "/fema" }
};

const services = [
    { href: "/fema/fema-registration", title: "FEMA Registration", desc: "Complete guide to FEMA registration for foreign exchange dealers and authorised persons in India.", tag: "FEMA", emoji: "💱" },
    { href: "/fema/compliance-under-fema", title: "Compliance Under FEMA", desc: "Comprehensive compliance framework under the Foreign Exchange Management Act for businesses and individuals.", tag: "FEMA", emoji: "📋" },
];

export default function Page() {
    return (
        <>
        <div className="bg-[#f8faff] min-h-screen pt-16">
            <section className="relative py-16 px-6 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center space-x-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">FEMA Services</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">💱 Foreign Exchange Management Act</span>
                    <h1 className="text-[40px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">FEMA Services in India</h1>
                    <p className="text-[17px] text-gray-600 max-w-2xl mb-8">Expert FEMA regulatory services – registration, compliance management and foreign exchange advisory for businesses, NRIs and foreign investors operating in India.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Book Free Consultation →</Link>
                        <Link href="/contact" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Talk to Expert</Link>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-[28px] font-black text-[#0a1628] mb-3">FEMA Regulatory Services</h2>
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
                    <h2 className="text-[28px] font-bold text-white mb-4">Need Expert FEMA Compliance Guidance?</h2>
                    <p className="text-blue-100 mb-8">Our team specialises in FEMA compliance, foreign exchange regulations, cross-border transactions and RBI reporting requirements.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Get Started Free →</Link>
                        <a href="tel:+919876543210" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Talk to Expert</a>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}
