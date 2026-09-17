// ─────────────────────────────────────────────────────────────────────────────
// Renderer for a long-form /solutions/<category>/<slug> service page.
//
// ONE component for every such page: the content files are machine-generated
// from the team's Word documents and all share the same block vocabulary
// (paragraph, table) plus a hero and an FAQ list, so a new service page is a
// new content file and a registry entry -- no new layout, no new markup, and
// no opportunity for two pages of the same kind to drift apart visually.
//
// Design tokens are the main site's (homepage / WhatChooseUs / rbi page):
// max-w-[1180px], py-24 rhythm, plain-text eyebrows, clamp() headings, ink
// #071426, rounded-[28px] cards, blue-100 borders.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";

import type { ServiceBlock, ServicePageContent } from "@/lib/content/services/types";
import type { SolutionCategory } from "@/lib/content/services/registry";
import ServiceTableOfContents from "./ServiceTableOfContents";

const FAQ_ANCHOR = "faqs";
const CONTACT_HREF = "/contact";
const WHATSAPP_HREF = "https://wa.me/919825600907";

const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0866d9]";
const BTN_SECONDARY =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-8 py-3.5 text-[15px] font-bold text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]";

/** A table whose first column repeats a label ("Step 1", "Section 14") reads
 *  better with that column held narrow and emphasised. */
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="-mx-6 mt-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-2xl border border-blue-100 text-left">
        <thead>
          <tr className="bg-[#f7fbff]">
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-blue-100 px-5 py-3.5 text-[11.5px] font-black uppercase tracking-[0.12em] text-[#1677f2]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="align-top even:bg-[#fbfdff]">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border-b border-blue-100/70 px-5 py-3.5 text-[13.5px] leading-[1.7] ${
                    ci === 0 ? "font-bold text-[#071426]" : "font-medium text-[#64748b]"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }: { block: ServiceBlock }) {
  if (block.kind === "table") {
    return <Table headers={block.headers} rows={block.rows} />;
  }
  // "CTA Button: …" lines in the source are instructions for a button, not
  // prose. Rendered as an actual button rather than printed literally.
  const cta = block.text.match(/^CTA Button\s*:\s*(.+)$/i);
  if (cta) {
    const label = cta[1].trim();
    const isWhatsApp = /whatsapp/i.test(label);
    return (
      <p className="mt-6">
        <a
          href={isWhatsApp ? WHATSAPP_HREF : CONTACT_HREF}
          className={isWhatsApp ? BTN_SECONDARY : BTN_PRIMARY}
        >
          {label}
        </a>
      </p>
    );
  }
  return (
    <p className="mt-4 text-[15.5px] font-medium leading-[1.9] text-[#475569]">{block.text}</p>
  );
}

export default function ServicePageView({
  page,
  category,
}: {
  page: ServicePageContent;
  category: SolutionCategory;
}) {
  const { hero, sections, faqs } = page;

  return (
    <main className="min-h-screen bg-white pt-[64px]">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-8%,rgba(22,119,242,0.12),transparent_46%),radial-gradient(circle_at_88%_84%,rgba(217,169,56,0.08),transparent_32%)]" />
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 text-[12px] font-medium text-[#94a3b8]"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-[#475569]">Home</Link>
            <span className="opacity-40">/</span>
            <Link href="/solutions" className="transition-colors hover:text-[#475569]">Solutions</Link>
            <span className="opacity-40">/</span>
            <Link href={`/solutions/${category.slug}`} className="transition-colors hover:text-[#475569]">
              {category.label}
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-[#475569]">{page.seo.focusKeyword || page.slug}</span>
          </nav>

          {/* docTitle is the source document's own title line ("… Legal
              Services in India"). It is real copy, not a builder label, so it
              is rendered rather than dropped -- it reads as the service name
              above the longer hero headline. */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]">
              {category.icon} {category.label}
            </span>
            <span className="text-[13px] font-bold text-[#94a3b8]">{page.docTitle}</span>
          </div>

          <h1 className="mt-4 max-w-[900px] text-[clamp(30px,3.8vw,50px)] font-black leading-[1.08] tracking-[-0.035em] text-[#071426]">
            {hero.heading}
          </h1>

          {hero.paragraphs.map((text, i) => (
            <p
              key={i}
              className={`mt-5 max-w-[860px] font-medium leading-[1.9] text-[#475569] ${
                i === 0 ? "text-[17px]" : "text-[15.5px]"
              }`}
            >
              {text}
            </p>
          ))}

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Link href={CONTACT_HREF} className={BTN_PRIMARY}>
              {hero.primaryCta || "Speak with Expert"} →
            </Link>
            <a href={WHATSAPP_HREF} className={BTN_SECONDARY}>
              {hero.secondaryCta || "WhatsApp Us"}
            </a>
          </div>

          {hero.trustLine && (
            <p className="mt-7 flex items-start gap-2.5 text-[14px] font-bold leading-relaxed text-[#071426]">
              <span className="mt-[3px] text-[#1677f2]" aria-hidden="true">◆</span>
              {hero.trustLine}
            </p>
          )}
        </div>
      </header>

      {/* ── Body: sticky index + sections ──────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1180px] px-6 py-14 lg:py-20">
        <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-[88px]">
              <ServiceTableOfContents
                sections={sections.map((s) => ({ id: s.id, heading: s.heading }))}
                faqAnchor={FAQ_ANCHOR}
              />
            </div>
          </aside>

          {/* Mobile index: same links, collapsed by default so it never pushes
              the first section below the fold on a phone. */}
          <details className="mb-10 rounded-2xl border border-blue-100 bg-[#f7fbff] px-5 py-4 lg:hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-black text-[#071426]">
              On this page
              <span className="text-[12px] font-medium text-[#64748b]">
                {sections.length + 1} sections
              </span>
            </summary>
            <ol className="mt-4 space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block text-[13.5px] font-medium leading-snug text-[#475569]">
                    {s.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href={`#${FAQ_ANCHOR}`} className="block text-[13.5px] font-medium leading-snug text-[#475569]">
                  FAQs
                </a>
              </li>
            </ol>
          </details>

          <article className="min-w-0">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 pb-12">
                <h2 className="text-[clamp(22px,2.3vw,30px)] font-black leading-[1.15] tracking-[-0.025em] text-[#071426]">
                  {section.heading}
                </h2>
                <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}

            {faqs.length > 0 && (
              <section id={FAQ_ANCHOR} className="scroll-mt-24 pb-4">
                <h2 className="text-[clamp(22px,2.3vw,30px)] font-black leading-[1.15] tracking-[-0.025em] text-[#071426]">
                  What People Ask – FAQs
                </h2>
                <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                <div className="mt-6 space-y-3">
                  {faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-blue-100 bg-white px-6 py-5 shadow-[0_8px_32px_rgba(0,100,200,0.05)] transition-colors open:border-[#1677f2]/30 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-[15px] font-black leading-snug text-[#071426]">
                        <span>
                          <span className="mr-2 text-[#1677f2]">{i + 1}.</span>
                          {faq.question}
                        </span>
                        <span
                          className="mt-0.5 shrink-0 text-[18px] font-normal text-[#1677f2] transition-transform duration-300 group-open:rotate-45"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-[14.5px] font-medium leading-[1.85] text-[#64748b]">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>

      {/* ── Closing CTA ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(22,119,242,0.32) 0%, #0a1628 46%, #0c2040 100%)",
        }}
      >
        <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
          <h2 className="text-[28px] font-black leading-[1.12] tracking-tight text-white md:text-[38px]">
            Talk to an Estabizz {category.label} specialist.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[14.5px] font-medium leading-relaxed text-[#94a3b8] md:text-[16px]">
            {hero.trustLine || "We handle the filing, the follow-up and the paperwork end to end."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href={CONTACT_HREF}
              className="w-full rounded-xl bg-[#1677f2] px-8 py-3.5 text-center text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0866d9] sm:w-auto"
            >
              {hero.primaryCta || "Speak with Expert"} →
            </Link>
            <a
              href={WHATSAPP_HREF}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-center text-[15px] font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:w-auto"
            >
              {hero.secondaryCta || "WhatsApp Us"}
            </a>
            <a
              href="tel:+919825600907"
              className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/20 px-6 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              <span className="text-[17px]" aria-hidden="true">📞</span> +91 98256 00907
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export { FAQ_ANCHOR };
