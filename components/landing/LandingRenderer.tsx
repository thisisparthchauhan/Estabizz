import Link from "next/link";
import type { Block, LandingPage } from "@/lib/landing/types";

// ─── Block renderers ──────────────────────────────────────────────────────────

function Paragraph({ text }: { text: string }) {
  return <p className="text-[15.5px] leading-[1.85] text-[#475569]">{text}</p>;
}

function Subheading({ text }: { text: string }) {
  return <h3 className="pt-1 text-[17px] font-black text-[#0a1628] sm:text-[19px]">{text}</h3>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-[1.7] text-[#475569]">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1677f2]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 rounded-xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-[14px] leading-[1.6] text-[#334155]">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#1677f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Numbered({ items }: { items: { lead?: string; text: string }[] }) {
  return (
    <ol className="space-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1677f2] text-[13px] font-black text-white shadow-[0_6px_16px_rgba(22,119,242,0.3)]">
            {i + 1}
          </span>
          <p className="pt-1 text-[15px] leading-[1.75] text-[#475569]">
            {it.lead && <span className="font-bold text-[#0a1628]">{it.lead} </span>}
            {it.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-blue-100 shadow-[0_4px_18px_rgba(0,80,140,0.06)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#0a1628]">
            {head.map((h, i) => (
              <th key={i} className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.06em] text-white">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={`border-b border-blue-50 ${ri % 2 ? "bg-[#f8fbff]" : "bg-white"}`}>
              {r.map((c, ci) => (
                <td key={ci} className={`px-4 py-3 text-[13.5px] leading-[1.65] text-[#334155] align-top ${ci === 0 ? "font-bold text-[#0a1628]" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ tone = "blue", label, text }: { tone?: "blue" | "navy" | "amber"; label?: string; text: string }) {
  if (tone === "navy") {
    return (
      <div className="rounded-2xl border border-[#1677f2]/30 bg-gradient-to-br from-[#0a1628] to-[#0c2040] p-5 sm:p-6">
        {label && <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#4f9dfb]">{label}</p>}
        <p className="text-[14.5px] leading-[1.75] text-white/80">{text}</p>
      </div>
    );
  }
  if (tone === "amber") {
    return (
      <div className="rounded-2xl border border-amber-200 border-l-4 border-l-[#f59e0b] bg-[#fffbf0] p-5 sm:p-6">
        {label && <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#92400e]">{label}</p>}
        <p className="text-[14.5px] leading-[1.75] text-[#78350f]">{text}</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-blue-100 border-l-4 border-l-[#1677f2] bg-[#f0f7ff] p-5 sm:p-6">
      {label && <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#0866d9]">{label}</p>}
      <p className="text-[14.5px] leading-[1.75] text-[#0c4a6e]">{text}</p>
    </div>
  );
}

function Quote({ text, author }: { text: string; author?: string }) {
  return (
    <figure className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-6 sm:p-8">
      <svg className="mb-3 h-7 w-7 text-[#1677f2]/40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
      </svg>
      <blockquote className="text-[16px] font-semibold italic leading-[1.7] text-[#0a1628]">{text}</blockquote>
      {author && <figcaption className="mt-3 text-[13px] font-bold text-[#1677f2]">— {author}</figcaption>}
    </figure>
  );
}

function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="group overflow-hidden rounded-xl border border-blue-100 bg-white">
          <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 text-[14.5px] font-bold text-[#0a1628] transition-colors hover:text-[#1677f2] [list-style:none] [&::-webkit-details-marker]:hidden">
            <span className="flex-1 leading-snug">{f.q}</span>
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#1677f2] transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="border-t border-blue-50 px-5 py-4 text-[14px] leading-[1.75] text-[#475569]">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

function Contact({ phone, web, email, text }: { phone: string; web?: string; email?: string; text?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1677f2]/30 bg-gradient-to-br from-[#0a1628] to-[#0c2040] p-6 sm:p-8">
      {text && <p className="mb-5 text-[14.5px] leading-[1.75] text-white/75">{text}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-5 py-3 text-[14px] font-black text-white hover:bg-[#3b8ef5] transition-colors">
          📞 Estabizz Team: {phone}
        </a>
        {web && <span className="text-[13.5px] font-semibold text-white/60">🌐 {web}</span>}
        {email && <span className="text-[13.5px] font-semibold text-white/60">📩 {email}</span>}
      </div>
    </div>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":          return <Paragraph text={block.text} />;
    case "subheading": return <Subheading text={block.text} />;
    case "bullets":  return <Bullets items={block.items} />;
    case "checks":   return <Checks items={block.items} />;
    case "numbered": return <Numbered items={block.items} />;
    case "table":    return <Table head={block.head} rows={block.rows} />;
    case "callout":  return <Callout tone={block.tone} label={block.label} text={block.text} />;
    case "quote":    return <Quote text={block.text} author={block.author} />;
    case "faqs":     return <Faqs items={block.items} />;
    case "contact":  return <Contact phone={block.phone} web={block.web} email={block.email} text={block.text} />;
  }
}

// ─── Main renderer ────────────────────────────────────────────────────────────

export function LandingRenderer({ page }: { page: LandingPage }) {
  const primary = page.primaryCta ?? { label: "Speak with Estabizz Expert", href: "/contact" };
  const secondary = page.secondaryCta ?? { label: "WhatsApp Estabizz Team", href: "https://wa.me/919825600907" };

  return (
    <main className="min-h-screen bg-white pt-[64px]">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />

        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16">
          {/* Breadcrumb */}
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link href="/19-5" className="hover:text-[#374151] transition-colors">Corporate Services</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#374151]">{page.title}</span>
          </nav>

          <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
            {page.category}
          </div>

          <h1 className="mt-4 text-[32px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
            {page.tagline}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={primary.href} className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">
              {primary.label} →
            </Link>
            <a href={secondary.href} target={secondary.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-white px-7 py-3.5 text-[15px] font-black text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]">
              {secondary.label}
            </a>
          </div>

          {page.urgency && (
            <div className="mt-6 rounded-xl border border-amber-200 border-l-4 border-l-[#f59e0b] bg-[#fffbf0] px-4 py-3 text-[13px] font-semibold leading-[1.6] text-[#78350f]">
              ⚠ {page.urgency}
            </div>
          )}
        </div>
      </header>

      {/* ── Body sections ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-12">
          {page.sections.map((section, si) => (
            <section key={si} className="scroll-mt-20">
              {section.heading && (
                <div className="mb-5">
                  <h2 className="text-[22px] font-black tracking-[-0.02em] text-[#120b45] sm:text-[26px]">
                    {section.heading}
                  </h2>
                  <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                </div>
              )}
              <div className="space-y-5">
                {section.blocks.map((block, bi) => (
                  <RenderBlock key={bi} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-[#1677f2]/25 bg-gradient-to-br from-[#0a1628] to-[#0c2040] px-7 py-10 text-center sm:px-10">
          <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#4f9dfb]">Estabizz Fintech Private Limited</p>
          <h2 className="mb-3 text-[24px] font-black leading-tight text-white sm:text-[30px]">
            Speak with an Estabizz expert before you proceed
          </h2>
          <p className="mx-auto mb-7 max-w-xl text-[14.5px] leading-[1.7] text-white/60">
            A short discussion today helps you structure the process correctly, avoid rejections and complete your filing with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="rounded-xl bg-[#1677f2] px-7 py-3 text-[14px] font-black text-white hover:bg-[#3b8ef5] transition-colors">
              {primary.label} →
            </Link>
            <a href={secondary.href} target={secondary.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-xl border border-white/20 px-7 py-3 text-[14px] font-bold text-white/85 hover:border-white/40 hover:text-white transition-colors">
              {secondary.label}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
