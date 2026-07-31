"use client";

import Link from "next/link";

const policySections = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction",
    content: [
      "Terms and Conditions form the legal foundation governing the relationship between a service provider and the users of its website, services and professional engagement channels.",
      "They help define user rights, business responsibilities, service boundaries, acceptable use and limitations that apply when a person accesses or uses Estabizz Fintech Private Limited's website or services.",
    ],
  },
  {
    id: "what-are-terms-and-conditions",
    number: "2",
    title: "What Are Terms and Conditions",
    content: [
      "Terms and Conditions are a legally binding agreement defining how users can access and use a website. They outline rights, responsibilities and limitations of liability.",
      "Terms govern usage, while a Privacy Policy governs data handling. Both serve different compliance purposes and should be read together.",
    ],
  },
  {
    id: "importance",
    number: "3",
    title: "Why Terms and Conditions Are Important",
    content: [
      "They protect the business from disputes and misuse.",
      "They define legal boundaries for users.",
      "They clarify advisory scope and help avoid liability claims.",
      "They improve transparency before a user relies on website information or requests professional support.",
    ],
  },
  {
    id: "applicability",
    number: "4",
    title: "Applicability",
    content: [
      "Any business operating a website or app, including fintech businesses, NBFCs, consultants, SaaS companies, service providers, marketplaces, blogs and professional advisory firms, should maintain clear Terms and Conditions.",
      "Even free websites and platforms should use terms to limit liability and control user behaviour.",
      "Mobile apps may require separate or tailored terms based on app usage and platform policies.",
    ],
  },
  {
    id: "acceptance",
    number: "5",
    title: "Acceptance of Terms",
    content: [
      "Terms and Conditions should be documented and accepted digitally or in writing.",
      "A click-wrap agreement is a system where users must click an acceptance action before using services, making the terms easier to evidence.",
      "A browse-wrap agreement assumes user acceptance by browsing the site, but it is generally weaker from an evidence perspective.",
    ],
  },
  {
    id: "customisation",
    number: "6",
    title: "Customisation",
    content: [
      "Templates can be used as a base, but they should be customised for the actual business, website, services, risks and user journey.",
      "Business owners and legal advisors should approve the final Terms and Conditions before publication.",
    ],
  },
  {
    id: "service-boundaries",
    number: "7",
    title: "Service Boundaries",
    content: [
      "Terms should define user rights, restrict misuse and limit legal liability.",
      "For consultants and regulated-sector service providers, terms should clarify the advisory scope, user responsibilities, payment expectations and dependency on regulators or third parties where relevant.",
      "Insurance brokers, marketplaces and specialised financial-service platforms may require additional clauses based on their operating model.",
    ],
  },
  {
    id: "updates",
    number: "8",
    title: "Updates to Terms",
    content: [
      "Terms and Conditions may be reviewed and updated as the business, website, services or applicable legal requirements change.",
      "Users should review the latest published version before relying on website information or requesting services.",
    ],
  },
  {
    id: "related-policies",
    number: "9",
    title: "Related Policies",
    content: [
      "These Terms and Conditions should be read together with the Privacy Policy and Refund Policy published by Estabizz Fintech Private Limited.",
      "Where a signed proposal, engagement letter or written service document contains specific terms, those specific terms may apply to the relevant assignment.",
    ],
  },
];

const faqs = [
  { q: "What are Terms and Conditions for a website?", a: "Terms and Conditions are a legally binding agreement defining how users can access and use a website. They outline rights, responsibilities, and limitations of liability." },
  { q: "Why are Terms and Conditions important?", a: "They protect the business from disputes and misuse. They also define legal boundaries for users." },
  { q: "What is the difference between Terms and Conditions and Privacy Policy?", a: "Terms govern usage, while Privacy Policy governs data handling. Both serve different compliance purposes." },
  { q: "Can a small business operate without Terms and Conditions?", a: "Yes, but it is risky. Lack of terms increases exposure to disputes and legal liability." },
  { q: "Who drafts Terms and Conditions?", a: "Typically, legal professionals or compliance experts draft them to ensure regulatory alignment." },
  { q: "Do free websites need Terms and Conditions?", a: "Yes, even free platforms need them to limit liability and control user behaviour." },
  { q: "What is a click-wrap agreement?", a: "It is a system where users must click an acceptance action before using services, making it legally enforceable." },
  { q: "Can Terms and Conditions be verbal?", a: "No, they should be documented and accepted digitally or in writing." },
  { q: "What is browse-wrap agreement?", a: "It assumes user acceptance by browsing the site, but it is weak legally." },
  { q: "Can I use a template for Terms and Conditions?", a: "Templates can be used as a base but must be customised for your business." },
  { q: "Do Terms and Conditions apply to mobile apps?", a: "Yes, they are required for both websites and mobile applications." },
  { q: "Who must have Terms and Conditions?", a: "Any business operating a website or app, including fintech, NBFCs, and service providers." },
  { q: "Do startups need Terms and Conditions?", a: "Yes, especially for investor confidence and legal protection." },
  { q: "Do consultants need Terms and Conditions?", a: "Yes, to clarify advisory scope and avoid liability claims." },
  { q: "Do SaaS companies need Terms?", a: "Yes, to define service usage and subscription policies." },
  { q: "Can NGOs require Terms and Conditions?", a: "Yes, especially for online donations and engagement." },
  { q: "Do marketplaces need different Terms?", a: "Yes, including third-party liability clauses." },
  { q: "Is Terms required for blogs?", a: "Recommended, especially for disclaimers and content usage." },
  { q: "Do mobile apps require separate Terms?", a: "Yes, tailored for app usage and platform policies." },
  { q: "Is there any registration required for Terms and Conditions?", a: "No formal registration is required. It must be drafted and published." },
  { q: "How do I create Terms and Conditions?", a: "Define services, risks, and obligations, then draft legally compliant clauses." },
  { q: "Who should approve Terms and Conditions?", a: "Business owners and legal advisors should approve them." },
];

export default function PageClient() {
  return (
    <main className="min-h-screen bg-white pt-[64px] text-[#0a1628]">
      <section className="border-b border-[#dbe7f3] bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.14),transparent_36%),linear-gradient(180deg,#ffffff_0%,#f5fbff_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#64748b]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1677f2]">Home</Link>
            <span className="text-[#94a3b8]">/</span>
            <span className="text-[#64748b]">Legal</span>
            <span className="text-[#94a3b8]">/</span>
            <span className="text-[#0a1628]">Terms & Conditions</span>
          </nav>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#1677f2]">
              Legal & Transparency
            </p>
            <h1 className="text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[46px]">
              Terms & Conditions
            </h1>
            <p className="mt-5 text-[15px] leading-7 text-[#475569] sm:text-[17px]">
              These Terms & Conditions explain the expected use of Estabizz Fintech
              Private Limited's website, service information and professional engagement channels.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Effective Date", "April - 2026"],
              ["Last Updated", "April - 2026"],
              ["Company", "Estabizz Fintech Private Limited"],
              ["Governing Law", "India"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-[#dbe7f3] bg-white/90 px-4 py-3 shadow-[0_8px_24px_rgba(0,80,140,0.06)]">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1677f2]">{label}</p>
                <p className="mt-1 text-[13px] font-bold leading-5 text-[#0a1628]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-lg border border-[#dbe7f3] bg-[#f8fbff] p-4">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#1677f2]">Contents</p>
            <nav className="max-h-[70vh] space-y-1 overflow-y-auto pr-1" aria-label="Terms and conditions contents">
              {policySections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-md px-3 py-2 text-[12.5px] font-semibold leading-5 text-[#475569] transition-colors hover:bg-white hover:text-[#1677f2]"
                >
                  {section.number}. {section.title}
                </a>
              ))}
              <a
                href="#frequently-asked-questions"
                className="block rounded-md px-3 py-2 text-[12.5px] font-semibold leading-5 text-[#475569] transition-colors hover:bg-white hover:text-[#1677f2]"
              >
                10. Frequently Asked Questions
              </a>
            </nav>
          </div>
        </aside>

        <article className="min-w-0 rounded-lg border border-[#e2edf8] bg-white p-6 shadow-[0_12px_36px_rgba(0,80,140,0.06)] sm:p-8 lg:p-10">
          <div className="mb-8 rounded-lg border-l-4 border-[#1677f2] bg-[#f5fbff] px-5 py-4">
            <p className="text-[13.5px] leading-6 text-[#334155]">
              This page uses the Terms & Conditions information currently available for
              Estabizz Fintech Private Limited. It should be read together with the Privacy
              Policy, Refund Policy and any written proposal or engagement letter.
            </p>
          </div>

          <div className="space-y-10">
            {policySections.map(section => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="mb-4 flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1677f2] text-[12px] font-black text-white">
                    {section.number}
                  </span>
                  <h2 className="text-[23px] font-black leading-tight tracking-[-0.02em] text-[#120b45]">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-4 pl-0 text-[14.5px] leading-7 text-[#475569] sm:pl-10">
                  {section.content.map((line, index) => (
                    <p
                      key={`${section.id}-${index}`}
                      className={line.length < 95 && index > 0 ? "flex gap-3" : undefined}
                    >
                      {line.length < 95 && index > 0 ? (
                        <>
                          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1677f2]" />
                          <span>{line}</span>
                        </>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section id="frequently-asked-questions" className="scroll-mt-24">
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1677f2] text-[12px] font-black text-white">
                  10
                </span>
                <h2 className="text-[23px] font-black leading-tight tracking-[-0.02em] text-[#120b45]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3 pl-0 sm:pl-10">
                {faqs.map((item, index) => (
                  <details key={index} className="rounded-lg border border-[#e2edf8] bg-white">
                    <summary className="cursor-pointer px-5 py-4 text-[14px] font-bold leading-6 text-[#0a1628] transition-colors hover:bg-[#f5fbff]">
                      {item.q}
                    </summary>
                    <p className="border-t border-[#e2edf8] px-5 py-4 text-[14px] leading-7 text-[#475569]">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}
