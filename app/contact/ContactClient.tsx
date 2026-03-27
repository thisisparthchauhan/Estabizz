"use client";

import Link from 'next/link';
import { useState } from 'react';

const services = [
    "NBFC Registration",
    "NBFC Account Aggregator License",
    "NBFC Business Plan",
    "Full-Fledged Money Changers License",
    "LendTech Services",
    "NBFC For Sale / Acquisition",
    "NBFC Legal Support",
    "NBFC Takeover",
    "NBFC Financial Modeling",
    "AMFI Registration",
    "AIF Compliance",
    "Credit Rating Agency Registration",
    "Depository Participant Registration",
    "REIT Registration",
    "Mutual Fund Registration",
    "Underwriter Registration",
    "Social Stock Exchange License",
    "IRDA Insurance Broker License",
    "IRDAI Regulatory Sandbox",
    "Insurance Marketing Firm License",
    "ISNP Registration",
    "IFSCA Insurance Intermediary",
    "FEMA Registration",
    "FEMA Compliance",
    "GST Appeal Services",
    "Legal Due Diligence",
    "Transfer Pricing",
    "Trademark Search",
    "ESG Consulting",
    "India Entry Strategy",
    "Other / Not Listed",
];

export default function ContactClient() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate form submission
        await new Promise(res => setTimeout(res, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="bg-[#f8faff] min-h-screen pt-24">
            {/* Hero */}
            <section className="relative py-16 px-6 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center space-x-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Contact Us</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">📞 Free Consultation</span>
                    <h1 className="text-[40px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">Get Expert Regulatory Guidance</h1>
                    <p className="text-[17px] text-gray-600 max-w-2xl">Book a free consultation with our regulatory compliance experts. We specialise in RBI, SEBI, IRDAI, FEMA and fintech regulatory frameworks in India.</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-[22px] font-black text-[#0a1628] mb-2">Send Us a Message</h2>
                            <p className="text-gray-500 text-sm mb-8">Fill in your details and we&apos;ll get back to you within 24 hours.</p>

                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a1628] mb-2">Thank You!</h3>
                                    <p className="text-gray-500">Your inquiry has been received. Our team will contact you within 24 hours.</p>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" }); }}
                                        className="mt-6 px-6 py-2.5 bg-[#0096D6] text-white font-semibold rounded-xl text-sm hover:bg-[#0077B6] transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2">Full Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your full name"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2">Email Address <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2">Phone Number <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2">Company / Organisation</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={form.company}
                                                onChange={handleChange}
                                                placeholder="Your company name"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#0a1628] mb-2">Service Required <span className="text-red-500">*</span></label>
                                        <select
                                            name="service"
                                            value={form.service}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all bg-white"
                                        >
                                            <option value="">Select a service...</option>
                                            {services.map((s, i) => (
                                                <option key={i} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#0a1628] mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Describe your requirements or questions..."
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-blue-50 transition-all resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : "Submit Inquiry →"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Contact Details */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[16px] font-bold text-[#0a1628] mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Phone</p>
                                        <a href="tel:+919876543210" className="text-sm font-semibold text-[#0a1628] hover:text-[#0096D6]">+91 98765 43210</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Email</p>
                                        <a href="mailto:info@estabizz.com" className="text-sm font-semibold text-[#0a1628] hover:text-[#0096D6]">info@estabizz.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Office</p>
                                        <p className="text-sm font-semibold text-[#0a1628]">Mumbai, Maharashtra, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] rounded-2xl p-6 text-white">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-[16px] font-bold mb-2">Quick Response Guaranteed</h3>
                            <p className="text-blue-100 text-sm">We respond to all inquiries within 24 hours. For urgent matters, call us directly.</p>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Free initial consultation
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    No commitment required
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Expert regulatory guidance
                                </div>
                            </div>
                        </div>

                        {/* Expert Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[14px] font-bold text-[#0a1628] mb-4 uppercase tracking-wider">Your Expert</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white font-bold text-lg">CS</div>
                                <div>
                                    <p className="font-bold text-[#0a1628] text-sm">CS Devyani Khambhati</p>
                                    <p className="text-xs text-gray-500">Regulatory Compliance Expert</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">10+ years of experience in RBI, SEBI, IRDAI and FEMA regulatory frameworks. Trusted by 500+ businesses across India.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] py-16 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[28px] font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-blue-100 mb-4">Join 500+ businesses that trust Estabizz Fintech for their regulatory compliance needs.</p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                        <span>✓ RBI Compliance</span>
                        <span>✓ SEBI Registration</span>
                        <span>✓ IRDAI Licensing</span>
                        <span>✓ FEMA Advisory</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
