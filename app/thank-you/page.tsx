import Link from "next/link";

export const metadata = {
    title: "Thank You | Estabizz Fintech Private Limited",
    description: "Thank you for contacting Estabizz Fintech Private Limited. Our team will review your enquiry and connect with you shortly.",
    alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-24">
            <section
                className="relative overflow-hidden border-b border-blue-100 px-6 py-20"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-[38px] font-black leading-tight text-[#0a1628] md:text-[52px]">
                        Thank you for contacting Estabizz
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-[17px] font-medium leading-relaxed text-[#475569]">
                        Thank you. Your enquiry has been received by Estabizz Team. Our team will review your requirement and connect with you shortly.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link href="/" className="rounded-xl bg-[#0a1628] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1a2638]">
                            Back to Home
                        </Link>
                        <a href="https://wa.me/919825600907" className="rounded-xl bg-[#10b981] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#059669]">
                            WhatsApp Estabizz Team
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
