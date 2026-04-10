'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const stats = [
    { value: '500+', label: 'Licenses Delivered' },
    { value: '1000+', label: 'Businesses Served' },
    { value: '10+', label: 'Years Experience' },
    { value: '98%', label: 'Success Rate' },
];

const services = [
    {
        title: 'RBI Licensing',
        description: 'NBFC, Payment Aggregator, AD Category',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
            </svg>
        ),
    },
    {
        title: 'SEBI Registration',
        description: 'Stock Broker, Portfolio Manager, AIF',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
    },
    {
        title: 'IRDAI Compliance',
        description: 'Insurance Broker, Corporate Agent',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
    },
    {
        title: 'IFSCA Advisory',
        description: 'Finance Company, PSP, FinTech Entity',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 9.75c0 .746-.092 1.472-.264 2.165m-15.472 0A8.962 8.962 0 005 9.75c0-.746.092-1.472.264-2.168" />
            </svg>
        ),
    },
    {
        title: 'FEMA & Cross-Border',
        description: 'ODI, FDI, ECB Compliance',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
        ),
    },
    {
        title: 'Business Advisory',
        description: 'GST, Legal, ESG, Transfer Pricing',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        ),
    },
];

const values = [
    {
        title: 'Compliance First',
        description: 'Every recommendation is grounded in regulatory requirements.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
        ),
    },
    {
        title: 'Client Success',
        description: 'Your approval is our measure of success.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
        ),
    },
    {
        title: 'Transparency',
        description: 'Clear communication, no hidden costs, honest timelines.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        title: 'Expertise',
        description: 'Team of CAs, CS professionals, lawyers, and ex-regulatory advisors.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
        ),
    },
];

const whyChooseUs = [
    'End-to-end support from application to approval',
    'Dedicated relationship manager for every client',
    'Regular updates and proactive compliance alerts',
    'Deep domain expertise across 5+ regulators',
    'Transparent pricing with no hidden charges',
    'Post-approval compliance and annual filing support',
];

export default function AboutClient() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2d4a] text-white py-20 md:py-28">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            About Estabizz Fintech
                        </h1>
                        <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                            India&apos;s trusted partner for regulatory compliance, licensing, and advisory since 2014.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16 md:py-24 bg-[#f8faff]">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-6">
                                    Our Story
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                                    Founded in 2014, Estabizz Fintech Pvt. Ltd. has grown from a single-desk advisory
                                    into one of India&apos;s most trusted regulatory compliance firms. We specialize in
                                    helping businesses navigate the complex landscape of Indian financial regulations
                                    — from RBI and SEBI to IRDAI, IFSCA, and FEMA. Our team of compliance
                                    professionals, chartered accountants, company secretaries, and legal experts work
                                    together to deliver end-to-end solutions for startups, NBFCs, fintechs, and
                                    enterprises.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-white rounded-xl shadow-md p-6 text-center border border-blue-50 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="text-3xl md:text-4xl font-bold text-[#0096D6] mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-500 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Do Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-4">
                                What We Do
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Comprehensive regulatory and compliance services across every major Indian financial regulator.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div
                                    key={service.title}
                                    className="bg-[#f8faff] rounded-xl p-6 border border-blue-50 hover:border-[#0096D6]/30 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-14 h-14 bg-[#0096D6]/10 rounded-lg flex items-center justify-center text-[#0096D6] mb-4 group-hover:bg-[#0096D6] group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#0a1628] mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="py-16 md:py-24 bg-[#f8faff]">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-4">
                                Our Values
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                The principles that guide every engagement and every recommendation we make.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="bg-white rounded-xl p-6 shadow-md border border-blue-50 text-center hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-14 h-14 bg-[#0096D6]/10 rounded-full flex items-center justify-center text-[#0096D6] mx-auto mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#0a1628] mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Clients Choose Us Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-4">
                                Why Clients Choose Us
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {whyChooseUs.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-4 bg-[#f8faff] rounded-lg p-5 border border-blue-50"
                                >
                                    <div className="flex-shrink-0 w-6 h-6 bg-[#0096D6] rounded-full flex items-center justify-center mt-0.5">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[#0a1628] font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA Section */}
                <section className="py-16 md:py-24 bg-gradient-to-r from-[#0096D6] to-[#0078ab]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Start?
                        </h2>
                        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                            Let our experts help you navigate regulatory compliance with confidence. Get in touch today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center bg-white text-[#0096D6] font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg shadow-lg"
                            >
                                Book Free Consultation
                            </a>
                            <a
                                href="tel:+919825600907"
                                className="inline-flex items-center justify-center border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg"
                            >
                                Call Us: +91-9825600907
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
