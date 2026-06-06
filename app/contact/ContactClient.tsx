"use client";

import Link from "next/link";
import LeadEnquiryForm from "@/components/forms/LeadEnquiryForm";

export default function ContactClient() {
    return (
        <div className="bg-[#f8faff] min-h-screen pt-24">
            <section
                className="relative py-16 px-6 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />
                <div className="max-w-7xl mx-auto relative z-10">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center space-x-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Contact Us</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">Free Consultation</span>
                    <h1 className="text-[40px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">Get Expert Regulatory Guidance</h1>
                    <p className="text-[17px] text-gray-600 max-w-2xl">
                        Book a structured consultation with Estabizz for RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND and global market-entry licensing, compliance and documentation support.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <LeadEnquiryForm
                                source="contact"
                                title="Send Us a Message"
                                description="Fill in your details and we will review your requirement with the right regulatory context."
                                enableRecommendations
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[16px] font-bold text-[#0a1628] mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <ContactRow label="Phone" value="+91 98256 00907" href="tel:+919825600907" icon="phone" />
                                <ContactRow label="Email" value="info@estabizz.com" href="mailto:info@estabizz.com" icon="email" />
                                <div className="flex items-start gap-3">
                                    <IconBox icon="location" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Registered Office</p>
                                        <p className="text-sm font-semibold text-[#0a1628] leading-relaxed">
                                            15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] rounded-2xl p-6 text-white">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-[16px] font-bold mb-2">Structured Response</h3>
                            <p className="text-blue-100 text-sm">
                                Your enquiry is saved for team review. For urgent matters, call or WhatsApp us directly.
                            </p>
                            <div className="mt-4 space-y-2">
                                {["Free initial consultation", "Regulator-wise review", "Clear next-step guidance"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[14px] font-bold text-[#0a1628] mb-4 uppercase tracking-wider">Your Expert</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white font-bold text-lg">CS</div>
                                <div>
                                    <p className="font-bold text-[#0a1628] text-sm">CS Devyani Khambhati</p>
                                    <p className="text-xs text-gray-500">Regulatory Compliance Expert</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Specialist support for RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND and allied regulatory frameworks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ContactRow({ label, value, href, icon }: { label: string; value: string; href: string; icon: "phone" | "email" }) {
    return (
        <div className="flex items-start gap-3">
            <IconBox icon={icon} />
            <div>
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                <a href={href} className="text-sm font-semibold text-[#0a1628] hover:text-[#0096D6]">{value}</a>
            </div>
        </div>
    );
}

function IconBox({ icon }: { icon: "phone" | "email" | "location" }) {
    return (
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            {icon === "phone" && (
                <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            )}
            {icon === "email" && (
                <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )}
            {icon === "location" && (
                <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )}
        </div>
    );
}
