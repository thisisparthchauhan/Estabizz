import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Get Started – Book a Free Regulatory Consultation | Estabizz Fintech",
    description: "Start your regulatory journey with Estabizz. Expert support for RBI, SEBI, IRDAI, IFSCA, MCA and fintech licensing — share your requirement and our advisory team will map the next steps.",
    keywords: "Get Started Estabizz, Regulatory Consultation India, RBI SEBI IRDAI IFSCA Advisory, Fintech Licensing Support",
    alternates: { canonical: "/get-started" },
};

const trustIndicators = [
    "100+ Associate Professionals",
    "45+ Countries Served",
    "RBI, SEBI, IRDAI & IFSCA Advisory",
    "Ticket-Based Client Support",
];

const supportSteps = [
    "Requirement understanding",
    "Eligibility and document review",
    "Application drafting and filing",
    "Regulatory query handling",
    "Post-approval compliance support",
];

const services = [
    "RBI Licensing",
    "SEBI Registration",
    "IRDAI Advisory",
    "IFSCA / GIFT City",
    "MCA Compliance",
    "Fintech Licensing",
    "Ongoing Compliance",
    "Other Advisory",
];

export default function GetStartedPage() {
    return (
        <main className="min-h-screen bg-white pt-[64px]">
            {/* Hero — homepage-themed */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
                        <span className="opacity-40">/</span>
                        <span className="text-[#374151]">Get Started</span>
                    </nav>
                    <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
                        Structured Regulatory Advisory
                    </div>
                    <div className="max-w-3xl">
                        <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">
                            Start Your Regulatory Journey <span className="text-[#1677f2]">with Estabizz</span>
                        </h1>
                        <p className="mt-4 text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                            Expert support for RBI, SEBI, IRDAI, IFSCA, MCA, fintech licensing and compliance advisory.
                        </p>
                        <a
                            href="#enquiry"
                            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
                        >
                            Book Free Consultation →
                        </a>
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {trustIndicators.map((item) => (
                        <div key={item} className="rounded-xl border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5fbff] font-black text-[#1677f2]">✓</div>
                            <p className="text-sm font-bold leading-snug text-[#120b45]">{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="enquiry" className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-[24px] font-black text-[#0a1628] mb-2">Lead Enquiry</h2>
                        <p className="text-gray-500 text-sm mb-8">Share a few details and our advisory team will help map the next steps.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Full Name</span>
                                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                                <label className="block">
                                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Email Address</span>
                                    <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Mobile Number</span>
                                    <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                                <label className="block">
                                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Company Name</span>
                                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                            </div>
                            <label className="block">
                                <span className="block text-sm font-semibold text-[#0a1628] mb-2">Service Required</span>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all bg-white">
                                    <option value="">Select a service...</option>
                                    {services.map((service) => (
                                        <option key={service} value={service}>{service}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block">
                                <span className="block text-sm font-semibold text-[#0a1628] mb-2">Message</span>
                                <textarea rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all resize-none" />
                            </label>
                            <button
                                type="button"
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors"
                            >
                                Submit Enquiry
                            </button>
                        </form>
                    </div>

                    <aside className="bg-[#0a1628] rounded-2xl p-8 text-white h-fit">
                        <h2 className="text-[22px] font-black mb-6">How Estabizz Supports You</h2>
                        <div className="space-y-4">
                            {supportSteps.map((step, index) => (
                                <div key={step} className="flex gap-3">
                                    <span className="w-7 h-7 rounded-full bg-[#1677f2] flex items-center justify-center text-xs font-black shrink-0">{index + 1}</span>
                                    <p className="text-sm text-gray-200 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/contact" className="mt-8 inline-flex text-sm font-bold text-[#4f9dfb] hover:text-white transition-colors">
                            Prefer direct contact? Talk to an expert →
                        </Link>
                    </aside>
                </div>
            </section>
        </main>
    );
}
