import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insurance Services',
  description: 'Insurance marketing firm, insurance repository and TPA licensing guides, with links to the complete IRDAI services directory.',
  alternates: { canonical: '/regulatory/insurance' },
};

const guides = [
  { title: 'Insurance Marketing Firm Licence', href: '/regulatory/insurance/insurance-marketing-firm-license-in-india', description: 'Explore insurance marketing firm registration, documentation and ongoing compliance.' },
  { title: 'Insurance Repository Registration', href: '/regulatory/insurance/insurance-repository-registration-in-india', description: 'Registration and operating requirements for electronic insurance repositories.' },
  { title: 'TPA Licence', href: '/regulatory/insurance/tpa-license-india', description: 'Licensing, application preparation and compliance for third-party administrators.' },
  { title: 'ISNP Security Audit', href: '/regulatory/insurance/isnp-certification-in-india', description: 'The independent CERT-In empanelled security audit an Insurance Self-Network Platform needs before launch and annually after.' },
  { title: 'All IRDAI Services', href: '/irdai', description: 'Explore insurance broker, corporate agent, reinsurance and other insurance regulatory services.' },
];

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
          <Link href="/" className="hover:text-[#1677f2]">Home</Link><span aria-hidden="true">/</span>
          <Link href="/regulatory" className="hover:text-[#1677f2]">Regulatory</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#120b45]">Insurance</span>
        </nav>
        <header className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-[#120b45]">Insurance Services</h1>
          <p className="mt-4 text-lg leading-relaxed text-[#475569]">Licensing, registration and compliance support for insurance businesses.</p>
        </header>
        <section aria-label="Insurance services" className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="group flex h-full flex-col rounded-lg border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-colors hover:border-[#1677f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1677f2] sm:p-8">
              <h2 className="text-xl font-bold leading-snug text-[#120b45] group-hover:text-[#1677f2]">{guide.title}</h2>
              <p className="mb-6 mt-3 text-base leading-relaxed text-[#475569]">{guide.description}</p>
              <span className="mt-auto text-sm font-semibold text-[#1677f2]">Explore service <span aria-hidden="true">&rarr;</span></span>
            </Link>
          ))}
        </section>
        <div className="mt-12 border-t border-blue-100 pt-8">
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1677f2] px-6 py-3 font-semibold text-white hover:bg-[#0866d9]">Discuss your insurance requirements</Link>
        </div>
      </div>
    </main>
  );
}
