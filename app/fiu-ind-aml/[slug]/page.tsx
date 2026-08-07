import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getFiuIndService, getAllFiuIndSlugs } from "@/lib/fiu-ind-aml";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = "https://www.estabizz.com";

export async function generateStaticParams() {
  return getAllFiuIndSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = getFiuIndService(slug);
  if (!svc) return { title: "Not Found", robots: { index: false, follow: false } };
  return {
    title: svc.seoTitle,
    description: svc.metaDescription,
    alternates: { canonical: `/fiu-ind-aml/${svc.slug}` },
    openGraph: {
      title: svc.seoTitle,
      description: svc.metaDescription,
      type: "website",
      url: `/fiu-ind-aml/${svc.slug}`,
      siteName: "Estabizz Fintech",
    },
    robots: { index: true, follow: true },
  };
}

export default async function FiuIndServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = getFiuIndService(slug);
  if (!svc) return notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Estabizz Fintech Private Limited",
      url: SITE_URL,
      telephone: "+91 98256 00907",
    },
    areaServed: "IN",
    url: `${SITE_URL}/fiu-ind-aml/${svc.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FIU-IND & AML", item: `${SITE_URL}/fiu-ind-aml` },
      { "@type": "ListItem", position: 3, name: svc.title, item: `${SITE_URL}/fiu-ind-aml/${svc.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-white pt-[64px]">
        {/* Hero */}
        <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
            <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <Link href="/fiu-ind-aml" className="hover:text-[#374151] transition-colors">FIU-IND & AML</Link>
              <span className="opacity-40">/</span>
              <span className="text-[#374151]">{svc.title}</span>
            </nav>
            <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
              {svc.category}
            </div>
            <h1 className="mt-4 text-[32px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">
              {svc.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569]">
              {svc.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white transition-all hover:bg-[#0866d9] hover:-translate-y-0.5 shadow-[0_12px_28px_rgba(22,119,242,0.28)]"
              >
                Get Started
              </Link>
              <Link
                href="/fiu-ind-aml"
                className="inline-flex items-center gap-2 rounded-xl border border-[#dbe7f3] bg-white px-6 py-3 text-[14px] font-black text-[#334155] transition-all hover:border-[#1677f2]/40 hover:text-[#1677f2]"
              >
                ← All FIU-IND & AML Services
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-14">
          {/* Overview */}
          <section>
            <h2 className="text-[22px] font-black text-[#0a1628] mb-4">Overview</h2>
            <p className="text-[15.5px] leading-[1.8] text-[#475569]">{svc.description}</p>
          </section>

          {/* What we offer */}
          <section>
            <h2 className="text-[22px] font-black text-[#0a1628] mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {svc.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-blue-50 bg-[#f8fbff] px-5 py-4">
                  <span className="mt-0.5 text-[#1677f2] text-[18px] leading-none shrink-0">✓</span>
                  <span className="text-[14px] leading-[1.6] text-[#334155]">{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-[22px] font-black text-[#0a1628] mb-6">How It Works</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {svc.process.map((p, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_4px_18px_rgba(0,80,140,0.05)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1677f2] text-[13px] font-black text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-black text-[#0a1628]">{p.step}</h3>
                    <p className="mt-1 text-[13.5px] leading-[1.65] text-[#64748b]">{p.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section>
            <h2 className="text-[22px] font-black text-[#0a1628] mb-5">Documents Required</h2>
            <ul className="space-y-2">
              {svc.documents.map((d, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-[#475569]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1677f2] shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-[22px] font-black text-[#0a1628] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {svc.faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-blue-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,80,140,0.04)] open:shadow-[0_4px_20px_rgba(0,80,140,0.08)]">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <span className="text-[15px] font-black text-[#0a1628]">{faq.q}</span>
                    <span className="shrink-0 text-[#1677f2] text-[20px] leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#64748b]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-[#1677f2] to-[#0096D6] p-8 text-center">
            <h2 className="text-[22px] font-black text-white mb-2">{svc.title} — Start Today</h2>
            <p className="text-[14px] text-blue-100 mb-6 max-w-lg mx-auto">{svc.tagline}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-[14px] font-black text-[#1677f2] hover:bg-blue-50 transition-colors"
            >
              Book a Free Consultation →
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
