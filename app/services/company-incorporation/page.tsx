import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Company Incorporation Services in India | Estabizz Fintech",
    description: "Company incorporation services for Private Limited Company, LLP, OPC and Section 8 Company with name approval, MOA, AOA, PAN, TAN and post-incorporation compliance guidance.",
    alternates: { canonical: "/services/company-incorporation" },
};

const entityTypes = [
    ["Private Limited Company", "Suitable for startups, fintech platforms, service businesses and entities planning investment or scale."],
    ["LLP", "Suitable for professional services and businesses seeking partnership flexibility with limited liability."],
    ["OPC", "Suitable for single promoters who want a corporate structure with limited liability."],
    ["Section 8 Company", "Suitable for social, charitable, impact and non-profit objectives subject to Companies Act requirements."],
];

const checklist = [
    "Proposed company or LLP name",
    "Promoter and director KYC documents",
    "Registered office proof",
    "Business activity and object clause inputs",
    "Digital signature requirements",
    "MOA, AOA or LLP agreement inputs",
    "Shareholding or contribution structure",
    "Post-incorporation compliance plan",
];

export default function CompanyIncorporationPage() {
    return (
        <main className="min-h-screen bg-[#f8faff] pt-24">
            <section className="border-b border-blue-100 px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#0096D6]">Home</Link>
                        <span>&gt;</span>
                        <Link href="/services" className="hover:text-[#0096D6]">Services</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">Company Incorporation</span>
                    </nav>
                    <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0096D6]">
                        Corporate Setup & Governance
                    </span>
                    <h1 className="max-w-4xl text-[40px] font-black leading-tight tracking-tight text-[#0a1628] md:text-[56px]">
                        Company Incorporation Services in India
                    </h1>
                    <p className="mt-5 max-w-3xl text-[18px] font-medium leading-relaxed text-gray-600">
                        Estabizz assists founders, professionals and business groups with company incorporation, entity selection, name approval, drafting of constitutional documents and early compliance planning.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/get-started" className="rounded-2xl bg-[#0096D6] px-7 py-4 text-center text-sm font-black text-white shadow-lg">Start Incorporation</Link>
                        <Link href="/contact" className="rounded-2xl border border-blue-200 bg-white px-7 py-4 text-center text-sm font-black text-[#0077B6]">Speak to Advisor</Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <h2 className="text-[32px] font-black text-[#0a1628]">Entity Options</h2>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {entityTypes.map(([title, text]) => (
                        <div key={title} className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-sm">
                            <h3 className="text-[20px] font-black text-[#0a1628]">{title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-[32px] font-black text-[#0a1628]">Company Incorporation Checklist</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {checklist.map((item) => (
                            <div key={item} className="rounded-2xl border border-blue-100 bg-[#f8faff] p-5 text-sm font-bold leading-relaxed text-[#0a1628]">
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 rounded-[24px] border border-blue-100 bg-[#f8faff] p-6">
                        <h3 className="text-[22px] font-black text-[#0a1628]">Post-Incorporation Support</h3>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">
                            We also help with first board actions, statutory registers, accounting setup, GST evaluation, ROC compliance calendar and policy documentation where applicable. Requirements may vary based on entity type and business activity.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
