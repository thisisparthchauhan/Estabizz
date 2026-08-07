import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FIU-IND Registration & AML Compliance Services | Estabizz Fintech",
  description:
    "Expert FIU-IND registration, PMLA compliance advisory, AML policy drafting, AML risk assessment and CKYC reporting services for regulated financial entities in India.",
  alternates: { canonical: "/fiu-ind-aml" },
  robots: { index: true, follow: true },
};

const services = [
  {
    title: "FIU-IND Registration",
    description:
      "End-to-end support for registration with India's Financial Intelligence Unit under the Prevention of Money Laundering Act (PMLA), including documentation, filing and regulatory liaison.",
    tag: "Registration",
  },
  {
    title: "PMLA Compliance Advisory",
    description:
      "Comprehensive PMLA compliance framework design — KYC/AML policies, customer due diligence procedures, STR/CTR reporting and Board-level compliance governance.",
    tag: "Compliance",
  },
  {
    title: "AML Policy Drafting",
    description:
      "Drafting and review of AML/CFT policies tailored to your business model — NBFCs, payment aggregators, insurance entities, fintechs and capital market intermediaries.",
    tag: "Policy",
  },
  {
    title: "AML Risk Assessment",
    description:
      "Institutional AML risk assessments covering customer risk profiling, product/service risk, geographic risk and transactional monitoring framework design.",
    tag: "Risk",
  },
  {
    title: "CKYC Registration & Reporting",
    description:
      "Assistance with Central KYC Registry (CKYC) enrolment, data submission, record updates and ongoing reporting obligations for regulated entities.",
    tag: "KYC",
  },
];

export default function FiuIndAmlPage() {
  return (
    <main className="min-h-screen bg-white pt-[64px]">
      {/* Hero */}
      <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#374151]">FIU-IND & AML Compliance</span>
          </nav>
          <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
            AML / CFT Regulatory Services
          </div>
          <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[46px]">
            FIU-IND & <span className="text-[#1677f2]">AML Compliance</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
            Structured anti-money laundering compliance and FIU-IND registration
            support for NBFCs, fintechs, payment entities and capital market intermediaries.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white transition-all hover:bg-[#0866d9] hover:-translate-y-0.5 shadow-[0_12px_28px_rgba(22,119,242,0.28)]"
            >
              Book a Consultation
            </Link>
            <Link
              href="/regulatory"
              className="inline-flex items-center gap-2 rounded-xl border border-[#dbe7f3] bg-white px-6 py-3 text-[14px] font-black text-[#334155] transition-all hover:border-[#1677f2]/40 hover:text-[#1677f2]"
            >
              All Regulatory Services
            </Link>
          </div>
        </div>
      </header>

      {/* Services grid */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="mb-8 text-[22px] font-black text-[#0a1628]">Our FIU-IND & AML Services</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)]"
            >
              <div>
                <span className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-3 py-1 text-[10.5px] font-black uppercase tracking-wider text-[#0077B6]">
                  {svc.tag}
                </span>
                <h3 className="mt-4 text-[17px] font-black leading-snug text-[#0a1628]">
                  {svc.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-[#64748b]">
                  {svc.description}
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-black text-[#1677f2] hover:text-[#0077B6] transition-colors"
              >
                Enquire now →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
