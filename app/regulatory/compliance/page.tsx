import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compliance Services | Estabizz Fintech',
  description: 'Explore AIF compliance reporting, FEMA compliance, finance and accounting outsourcing, GST appeals, legal process outsourcing and legal due diligence from Estabizz.',
  alternates: { canonical: '/regulatory/compliance' },
};

const services = [
  {
    title: 'Compliance Test Report for AIF',
    category: 'SEBI / AIF',
    description: 'Compliance reporting, fund documentation and governance considerations for alternative investment funds.',
    href: '/sebi/aif-compliance-test-report',
  },
  {
    title: 'Compliance Under FEMA',
    category: 'FEMA / RBI',
    description: 'Foreign exchange, cross-border transactions, investment reporting and ongoing FEMA compliance.',
    href: '/fema/compliance-under-fema',
  },
  {
    title: 'Finance and Accounting Outsourcing',
    category: 'Finance / Accounting',
    description: 'Bookkeeping, tax compliance, payroll, financial reporting and outsourced finance support.',
    href: '/services/finance-accounting-outsourcing',
  },
  {
    title: 'GST Appeal Services',
    category: 'GST / Tax Disputes',
    description: 'Appeal preparation, supporting documents, dispute strategy and representation under GST.',
    href: '/services/gst-appeal-services',
  },
  {
    title: 'Legal Process Outsourcing Services in India',
    category: 'Legal Operations',
    description: 'Outsourced legal drafting, research, document review and compliance support, with the contracts and confidentiality controls it requires.',
    href: '/services/legal-process-outsourcing',
  },
  {
    title: 'Legal Due Diligence Services in India',
    category: 'Transactions',
    description: 'Legal audit of a business before investment or acquisition — scope, documents, red flags, risk classification and reporting.',
    href: '/services/legal-due-diligence',
  },
];

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
          <Link href="/" className="hover:text-[#1677f2]">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/regulatory" className="hover:text-[#1677f2]">Regulatory</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#120b45]">Compliance</span>
        </nav>
        <header className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-[#120b45]">Compliance</h1>
          <p className="mt-4 text-lg leading-relaxed text-[#475569]">Regulatory reporting, financial operations, tax compliance and transaction support for your business.</p>
        </header>
        <section aria-label="Compliance services" className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="group flex h-full flex-col rounded-lg border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-colors hover:border-[#1677f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1677f2] sm:p-8">
              <p className="text-sm font-semibold text-[#0077B6]">{service.category}</p>
              <h2 className="mt-3 text-xl font-bold leading-snug text-[#120b45] group-hover:text-[#1677f2]">{service.title}</h2>
              <p className="mb-6 mt-3 text-base leading-relaxed text-[#475569]">{service.description}</p>
              <span className="mt-auto text-sm font-semibold text-[#1677f2]">Explore service <span aria-hidden="true">&rarr;</span></span>
            </Link>
          ))}
        </section>
        <section className="mt-12 flex flex-col gap-4 border-t border-blue-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-[#120b45]">Discuss your compliance requirements</h2>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1677f2] px-6 py-3 font-semibold text-white hover:bg-[#0866d9]">Contact Estabizz</Link>
        </section>
      </div>
    </main>
  );
}
