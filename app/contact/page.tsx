"use client";
import React, { useState } from "react";
import Link from "next/link";

const services = [
    // RBI Services
    "NBFC Account Aggregator License",
    "NBFC Business Plan Preparation",
    "NBFC Financial Modeling",
    "Full-Fledged Money Changers (FFMC)",
    "LendTech Services",
    "NBFC For Sale",
    "NBFC Legal Support",
    "NBFC Takeover",
    "NBFC Marketing Strategy",
    "RBI Regulatory Services",
    // SEBI Services
    "AMFI Registration",
    "Alternative Asset Portfolio Valuation",
    "Collective Investment Schemes",
    "Credit Rating Agency",
    "Depository Participant",
    "AIF Compliance Test Report",
    "REIT Registration",
    "Mutual Fund Registration",
    "Underwriter Registration",
    "Social Stock Exchange License",
    // IRDAI Services
    "IRDA Insurance Broker License",
    "IRDAI Regulatory Sandbox",
    "Insurance Marketing Firm License",
    "Insurance Repository Registration",
    "ISNP Registration",
    "IFSCA Insurance Intermediary",
    // FEMA Services
    "FEMA Registration",
    "Compliance Under FEMA",
    // Other Services
    "Enterprise Services",
    "India Entry Strategy",
    "Finance & Accounting Outsourcing",
    "GST Appeal Services",
    "Legal Due Diligence",
    "Legal Process Outsourcing",
    "Data Storage Policy",
    "ESG Consulting",
    "Transfer Pricing",
    "Trademark Search",
    "Sustainable Finance",
    "Sustainable Supply Chain",
    "PAP License",
    "Other / General Inquiry",
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
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
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate async submission
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="bg-[#f8faff] min-h-screen font-sans">
            {/* Hero Section */}
            <section
                className="relative pt-24 pb-16 px-6 lg:px-8 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0a1628 0%, #0077B6 60%, #0096D6 100%)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <nav className="text-sm font-medium text-white/60 mb-8 flex items-center space-x-2 justify-center">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-white">Contact Us</span>
                    </nav>
                    <div className="flex justify-center gap-3 mb-6 flex-wrap">
                        <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">📞 Expert Consultation</span>
                        <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">⚡ 24-Hour Response</span>
                        <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">🔒 Confidential</span>
                    </div>
                    <h1 className="text-[40px] md:text-[52px] font-black text-white leading-[1.1] mb-4 tracking-[-0.02em]">
                        Get Expert Consultation
                    </h1>
                    <p className="text-[18px] text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Reach out to India&apos;s leading fintech regulatory experts. We respond within 24 hours and offer a free initial consultation for all RBI, SEBI, IRDAI, and FEMA services.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-blue-50 p-8 lg:p-10">
                            <h2 className="text-2xl font-black text-[#0a1628] mb-2">Send Us a Message</h2>
                            <p className="text-gray-500 text-sm mb-8">Fill in the form below and our regulatory experts will get back to you within 24 hours.</p>

                            {submitted ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0a1628] mb-3">Message Sent Successfully!</h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                        Thank you for reaching out. Our expert team will review your inquiry and respond within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" }); }}
                                        className="px-6 py-3 bg-[#0096D6] text-white font-semibold rounded-xl hover:bg-[#0077B6] transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2" htmlFor="name">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your full name"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0096D6]/30 focus:border-[#0096D6] text-gray-800 placeholder:text-gray-400 text-sm transition-all"
                                            />
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2" htmlFor="email">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0096D6]/30 focus:border-[#0096D6] text-gray-800 placeholder:text-gray-400 text-sm transition-all"
                                            />
                                        </div>
                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2" htmlFor="phone">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0096D6]/30 focus:border-[#0096D6] text-gray-800 placeholder:text-gray-400 text-sm transition-all"
                                            />
                                        </div>
                                        {/* Company */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2" htmlFor="company">
                                                Company / Organization
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Company name"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0096D6]/30 focus:border-[#0096D6] text-gray-800 placeholder:text-gray-400 text-sm transition-all"
                                            />
                                        </div>
                                    </div>
                                    {/* Service */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#0a1628] mb-2" htmlFor="service">
                                            Service Interested In <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            required
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0096D6]/30 focus:border-[#0096D6] text-gray-800 text-sm transition-all bg-white"
                                        >
                                            <option value="">Select a service...</option>
                                            <optgroup label="RBI Services">
                                                {services.slice(0, 10).map((s) => <option key={s} value={s}>{s}</option>)}
                                            </optgroup>
                                            <optgroup label="SEBI Services">
                                                {services.slice(10, 20).map((s) => <option key={s} value={s}>{s}</option>)}
                                            </optgroup>
                                            <optgroup label="IRDAI Services">
                                                {services.slice(20, 26).map((s) => <option key={s} value={s}>{s}</option>)}
                                            </optgroup>
                                            <optgroup label="FEMA Services">
                                                {services.slice(26, 28).map((s) => <option key={s} value={s}>{s}</option>)}
                                            </optgroup>
                                            <optgroup label="Other Services">
                                                {services.slice(28).map((s) => <option key={s} value={s}>{s}</option>)}
                                            </optgroup>
                                        </select>
                                    </div>
                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#0a1628] mb-2" htmlFor="message">
                                            Your Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Please describe your requirements, questions, or the service you need help with..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0096D6]/30 focus:border-[#0096D6] text-gray-800 placeholder:text-gray-400 text-sm transition-all resize-none"
                                        />
                                    </div>
                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold text-[16px] rounded-xl shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Send Message &amp; Request Free Consultation
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-xs text-gray-400">
                                        By submitting this form, you agree to our privacy policy. Your information is kept strictly confidential.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar: Contact Info */}
                    <div className="flex flex-col gap-6">

                        {/* Contact Details Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-blue-50 p-7 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981]" />
                            <h3 className="text-lg font-bold text-[#0a1628] mb-5">Contact Information</h3>
                            <div className="space-y-5">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#0096D6]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                                        <a href="mailto:contact@estabizzlegal.com" className="text-sm font-semibold text-[#0077B6] hover:text-[#0096D6] transition-colors break-all">
                                            contact@estabizzlegal.com
                                        </a>
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#0096D6]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                                        <a href="tel:+919999999999" className="text-sm font-semibold text-[#0077B6] hover:text-[#0096D6] transition-colors">
                                            +91 (Contact for Number)
                                        </a>
                                        <p className="text-xs text-gray-400 mt-1">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
                                    </div>
                                </div>
                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#0096D6]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Office</p>
                                        <p className="text-sm font-semibold text-[#0a1628]">India (Pan-India Services)</p>
                                        <p className="text-xs text-gray-400 mt-1">Serving clients across India and globally</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/919999999999?text=Hello%20Estabizz%2C%20I%20need%20expert%20consultation%20for%20fintech%20regulatory%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-[15px] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat on WhatsApp
                        </a>

                        {/* Expert Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-blue-50 p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 text-[#0077B6] flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm ring-2 ring-blue-50 shrink-0">
                                    DK
                                </div>
                                <div>
                                    <h4 className="font-bold text-[15px] text-[#0a1628]">CS Devyani Khambhati</h4>
                                    <p className="text-xs text-[#0096D6] font-semibold">Lead Compliance Expert</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                Specialist in fintech regulatory compliance with deep expertise across RBI, SEBI, IRDAI, and FEMA regulatory frameworks.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 bg-blue-50 text-[#0077B6] rounded-full text-xs font-semibold">NBFC</span>
                                <span className="px-2.5 py-1 bg-blue-50 text-[#0077B6] rounded-full text-xs font-semibold">RBI</span>
                                <span className="px-2.5 py-1 bg-blue-50 text-[#0077B6] rounded-full text-xs font-semibold">SEBI</span>
                                <span className="px-2.5 py-1 bg-blue-50 text-[#0077B6] rounded-full text-xs font-semibold">IRDAI</span>
                            </div>
                        </div>

                        {/* Response Time Card */}
                        <div className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-white">Our Commitment</h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                                    <span className="text-sm text-white/80">Response within 24 hours</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
                                    <span className="text-sm text-white/80">Free initial consultation</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                                    <span className="text-sm text-white/80">100% confidential handling</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
                                    <span className="text-sm text-white/80">Pan-India regulatory expertise</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid Section */}
            <section className="bg-white border-t border-gray-100 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-[#0a1628] mb-3">Our Service Areas</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Comprehensive regulatory compliance and licensing services across all major financial sector regulators in India.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: "🏦",
                                title: "RBI Services",
                                description: "NBFC registration, Account Aggregator license, financial modeling, and full-scope RBI compliance services.",
                                href: "/rbi",
                                color: "from-blue-500 to-blue-700",
                            },
                            {
                                icon: "📈",
                                title: "SEBI Services",
                                description: "AMFI registration, AIF compliance, REIT and mutual fund registration, and capital market regulatory services.",
                                href: "/sebi",
                                color: "from-indigo-500 to-indigo-700",
                            },
                            {
                                icon: "🛡️",
                                title: "IRDAI Services",
                                description: "Insurance broker license, ISNP registration, IRDAI regulatory sandbox, and insurance regulatory compliance.",
                                href: "/irdai",
                                color: "from-teal-500 to-teal-700",
                            },
                            {
                                icon: "🌐",
                                title: "FEMA Services",
                                description: "Foreign exchange management compliance, RBI FEMA approvals, and cross-border transaction structuring.",
                                href: "/fema",
                                color: "from-cyan-500 to-cyan-700",
                            },
                        ].map((item) => (
                            <Link key={item.title} href={item.href} className="group block">
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 h-full">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-[#0a1628] text-[16px] mb-2 group-hover:text-[#0096D6] transition-colors">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
