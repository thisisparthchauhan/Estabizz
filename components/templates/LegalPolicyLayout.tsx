import type { ReactNode } from "react";
import Link from "next/link";

type LegalSection = {
    id: string;
    title: string;
    content: ReactNode;
};

type LegalPolicyLayoutProps = {
    title: string;
    description: string;
    lastUpdated?: string;
    sections: LegalSection[];
};

const companyDetails = {
    name: "Estabizz Fintech Private Limited",
    address: "15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421",
    cin: "U74999GJ2021PTC123384",
    phone: "+91 98256 00907",
    email: "info@estabizz.com",
};

const legalLinks = [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Use", href: "/legal/terms-conditions" },
    { label: "Refund & Cancellation", href: "/legal/refund-policy" },
    { label: "Disclaimer", href: "/legal/disclaimer" },
    { label: "Cookie Policy", href: "/legal/cookie-policy" },
];

export default function LegalPolicyLayout({
    title,
    description,
    lastUpdated = "June 2026",
    sections,
}: LegalPolicyLayoutProps) {
    return (
        <main className="bg-[#f7fbff] text-[#0a1628]">
            <section className="relative overflow-hidden border-b border-[#d8e8f6] bg-white">
                <div className="absolute inset-0 pointer-events-none opacity-70">
                    <div className="absolute left-[-12%] top-[-18%] h-[360px] w-[360px] rounded-full bg-[#0096D6]/12 blur-[100px]" />
                    <div className="absolute right-[-12%] bottom-[-18%] h-[360px] w-[360px] rounded-full bg-[#d9a938]/12 blur-[100px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,119,182,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,119,182,0.06)_1px,transparent_1px)] bg-[length:56px_56px]" />
                </div>

                <div className="relative mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-18">
                    <div className="mb-5 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#62718a]">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link>
                        <span>/</span>
                        <span>Legal</span>
                    </div>

                    <div className="max-w-[920px]">
                        <div className="mb-5 inline-flex rounded-full border border-[#0096D6]/20 bg-[#0096D6]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#0077B6]">
                            Website Legal Document
                        </div>
                        <h1 className="text-[clamp(34px,5vw,64px)] font-black leading-[1.04] tracking-tight text-[#071426]">
                            {title}
                        </h1>
                        <p className="mt-5 max-w-[820px] text-[17px] font-medium leading-relaxed text-[#43516a] md:text-[19px]">
                            {description}
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-[#d8e8f6] bg-white/90 p-5 shadow-[0_18px_50px_rgba(7,20,38,0.06)]">
                            <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#8b98ad]">Company</div>
                            <div className="mt-2 text-[15px] font-black">{companyDetails.name}</div>
                            <div className="mt-1 text-[13px] font-semibold text-[#62718a]">CIN: {companyDetails.cin}</div>
                        </div>
                        <div className="rounded-2xl border border-[#d8e8f6] bg-white/90 p-5 shadow-[0_18px_50px_rgba(7,20,38,0.06)]">
                            <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#8b98ad]">Registered Office</div>
                            <div className="mt-2 text-[13px] font-semibold leading-relaxed text-[#43516a]">{companyDetails.address}</div>
                        </div>
                        <div className="rounded-2xl border border-[#d8e8f6] bg-white/90 p-5 shadow-[0_18px_50px_rgba(7,20,38,0.06)]">
                            <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#8b98ad]">Last Updated</div>
                            <div className="mt-2 text-[15px] font-black">{lastUpdated}</div>
                            <a href={`mailto:${companyDetails.email}`} className="mt-1 block text-[13px] font-bold text-[#0096D6]">{companyDetails.email}</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-[1280px] gap-7 px-5 py-10 md:px-8 lg:grid-cols-[300px_1fr]">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <div className="rounded-3xl border border-[#d8e8f6] bg-white p-5 shadow-[0_20px_60px_rgba(7,20,38,0.06)]">
                        <h2 className="text-[12px] font-black uppercase tracking-[0.18em] text-[#8b98ad]">Policy sections</h2>
                        <nav className="mt-4 space-y-1">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block rounded-xl px-3 py-2.5 text-[13px] font-semibold leading-snug text-[#62718a] transition-colors hover:bg-[#edf7ff] hover:text-[#0077B6]"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-5 rounded-3xl border border-[#d9a938]/30 bg-[#fff8e7] p-5">
                        <h2 className="text-[13px] font-black text-[#071426]">Grievance / Contact</h2>
                        <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#62718a]">
                            For website, privacy, billing or legal-page related queries, contact Estabizz at:
                        </p>
                        <a href={`mailto:${companyDetails.email}`} className="mt-3 block text-[14px] font-black text-[#0077B6]">{companyDetails.email}</a>
                        <a href="tel:+919825600907" className="mt-1 block text-[13px] font-bold text-[#43516a]">{companyDetails.phone}</a>
                    </div>
                </aside>

                <article className="rounded-[28px] border border-[#d8e8f6] bg-white p-6 shadow-[0_20px_70px_rgba(7,20,38,0.07)] md:p-9">
                    <div className="space-y-10">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-28">
                                <h2 className="border-b border-[#e6eef7] pb-3 text-[24px] font-black leading-tight text-[#071426] md:text-[30px]">
                                    {section.title}
                                </h2>
                                <div className="legal-copy mt-5 space-y-4 text-[15px] font-medium leading-relaxed text-[#43516a]
                                    [&_a]:font-bold [&_a]:text-[#0096D6]
                                    [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
                                    [&_p]:leading-relaxed
                                    [&_strong]:font-black [&_strong]:text-[#071426]
                                    [&_table]:w-full [&_table]:min-w-[680px] [&_table]:border-collapse
                                    [&_td]:border [&_td]:border-[#d8e8f6] [&_td]:p-3 [&_td]:align-top
                                    [&_th]:border [&_th]:border-[#d8e8f6] [&_th]:bg-[#f1f8ff] [&_th]:p-3 [&_th]:text-left
                                    [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                                    {section.content}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mt-12 rounded-3xl border border-[#d8e8f6] bg-[#f7fbff] p-6">
                        <h2 className="text-[18px] font-black">Other Legal Pages</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-full border border-[#cde3f5] bg-white px-4 py-2 text-[12px] font-bold text-[#0077B6] transition-colors hover:border-[#0096D6] hover:bg-[#edf7ff]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
}
