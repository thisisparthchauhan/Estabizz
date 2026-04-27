import Link from "next/link";

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
        <main className="bg-[#f8faff] min-h-screen pt-24">
            <section
                className="relative overflow-hidden border-b border-blue-100 px-6 py-16"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative z-10 max-w-7xl mx-auto">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center gap-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Get Started</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">
                        Structured Regulatory Advisory
                    </span>
                    <div className="max-w-3xl">
                        <h1 className="text-[40px] md:text-[52px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">
                            Start Your Regulatory Journey with Estabizz
                        </h1>
                        <p className="text-[17px] md:text-[19px] text-gray-600 leading-relaxed">
                            Expert support for RBI, SEBI, IRDAI, IFSCA, MCA, fintech licensing and compliance advisory.
                        </p>
                        <a
                            href="#enquiry"
                            className="mt-8 inline-flex px-7 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Book Free Consultation
                        </a>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {trustIndicators.map((item) => (
                        <div key={item} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                            <div className="w-9 h-9 rounded-lg bg-[#0096D6]/10 text-[#0096D6] flex items-center justify-center font-black mb-3">✓</div>
                            <p className="text-sm font-bold text-[#0a1628] leading-snug">{item}</p>
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
                                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                                <label className="block">
                                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Email Address</span>
                                    <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Mobile Number</span>
                                    <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                                <label className="block">
                                    <span className="block text-sm font-semibold text-[#0a1628] mb-2">Company Name</span>
                                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all" />
                                </label>
                            </div>
                            <label className="block">
                                <span className="block text-sm font-semibold text-[#0a1628] mb-2">Service Required</span>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all bg-white">
                                    <option value="">Select a service...</option>
                                    {services.map((service) => (
                                        <option key={service} value={service}>{service}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block">
                                <span className="block text-sm font-semibold text-[#0a1628] mb-2">Message</span>
                                <textarea rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all resize-none" />
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
                                    <span className="w-7 h-7 rounded-full bg-[#0096D6] flex items-center justify-center text-xs font-black shrink-0">{index + 1}</span>
                                    <p className="text-sm text-gray-200 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/contact" className="mt-8 inline-flex text-sm font-bold text-[#10b981] hover:text-white transition-colors">
                            Prefer direct contact? Talk to an expert →
                        </Link>
                    </aside>
                </div>
            </section>
        </main>
    );
}
