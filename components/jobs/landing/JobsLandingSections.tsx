// ─────────────────────────────────────────────────────────────────────────────
// Presentational sections for the public /jobs landing page.
//
// All server components: none of this is interactive. The only client-side
// behaviour on the page is the job board itself (PublicJobsClient) and the
// FAQ panels, which use native <details> so they work before hydration and
// stay findable by the browser's find-in-page.
//
// TYPE, SPACING AND COLOUR ARE THE MAIN SITE'S, NOT THIS PAGE'S OWN:
//   container  mx-auto max-w-[1180px] px-6        (WhyChooseUs, SolutionsSection)
//   section    py-24, alternating #fff / #f7fbff
//   eyebrow    13px black uppercase tracking-[0.24em] #1677f2 — plain text,
//              never a pill; the pill badge was this page inventing a
//              component the rest of the site does not have
//   h2         clamp(30px,3.4vw,48px) black leading-[1.06] tracking-[-0.04em]
//   ink        #071426   lead #475569   muted #64748b
//   card       rounded-[28px] border-blue-100 shadow-[0_18px_50px_rgba(0,80,140,.07)]
//   buttons    the homepage FinalCTA pair, exactly
// Changing any of these here means the page drifts from the site again, so
// they are written out once as the SHELL/HEAD/CARD constants below rather
// than retyped per section.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";

import {
  CANDIDATE_STEPS,
  EMPLOYER_STEPS,
  JOBS_DISCLAIMER,
  JOBS_FAQS,
  LICENCE_GROUPS,
  OPENINGS_ANCHOR,
  TRUST_STATS,
  jobsQueryHref,
  type ProcessStep,
} from "@/lib/jobs/landing/content";

const HIRE_TALENT_HREF = "/jobs/hire-talent";
const JOIN_HREF = "/jobs/join";

const WRAP = "mx-auto w-full max-w-[1180px] px-6";
const EYEBROW = "text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]";
const H2 = "text-[clamp(30px,3.4vw,48px)] font-black leading-[1.06] tracking-[-0.04em] text-[#071426]";
const LEAD = "text-[16px] font-medium leading-[1.9] text-[#475569]";
const CARD =
  "rounded-[28px] border border-blue-100 bg-white p-7 shadow-[0_18px_50px_rgba(0,80,140,0.07)]";
const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0866d9]";
const BTN_SECONDARY =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-8 py-3.5 text-[15px] font-bold text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]";

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-[760px] text-center">
      <div className={EYEBROW}>{eyebrow}</div>
      <h2 className={`mt-4 ${H2}`}>{title}</h2>
      {lead && <p className={`mx-auto mt-6 ${LEAD}`}>{lead}</p>}
    </div>
  );
}

// ── Safety notice ────────────────────────────────────────────────────────────

/**
 * Anti-recruitment-fraud notice. At the very top on purpose: fake "placement
 * fee" scams trade on the names of firms exactly like this one, and a
 * candidate about to be defrauded should read this before anything else.
 */
export function JobsSafetyNotice() {
  return (
    <div className="border-b border-blue-100 bg-[#f0f6ff]">
      <p className={`${WRAP} py-3 text-center text-[13px] font-medium leading-relaxed text-[#475569]`}>
        <strong className="font-bold text-[#071426]">Estabizz never charges job seekers a fee</strong>{" "}
        at any stage. Please do not make payments to anyone claiming to represent us.{" "}
        <a
          href="mailto:hr@estabizz.com?subject=Report%20misuse%20of%20the%20Estabizz%20name"
          className="font-bold text-[#1677f2] underline-offset-4 hover:underline"
        >
          Report misuse
        </a>
      </p>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export function JobsHero({ openCount }: { openCount: number | null }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-8%,rgba(22,119,242,0.12),transparent_46%),radial-gradient(circle_at_88%_84%,rgba(217,169,56,0.08),transparent_32%)]" />
      <div className={`${WRAP} py-20 sm:py-24`}>
        <nav className="mb-6 flex items-center gap-2 text-[12px] font-medium text-[#94a3b8]" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-[#475569]">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[#475569]">Jobs</span>
        </nav>

        <div className={EYEBROW}>Specialised recruitment for regulated finance</div>

        <h1 className="mt-4 max-w-[900px] text-[clamp(34px,4.2vw,58px)] font-black leading-[1.06] tracking-[-0.04em] text-[#071426]">
          The right candidate, placed at the{" "}
          <span className="text-[#1677f2]">right organisation</span>
        </h1>

        <p className={`mt-6 max-w-[680px] ${LEAD}`}>
          Recruitment for RBI, SEBI, IRDAI and IFSCA intermediaries — from Directors and Key
          Managerial Personnel to dealing, credit, risk and compliance desks. Curated by the firm
          that helps these entities secure and retain their licences.
        </p>

        <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
          <a href={`#${OPENINGS_ANCHOR}`} className={BTN_PRIMARY}>
            Browse open roles
            {openCount !== null && openCount > 0 && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[13px] font-black">{openCount}</span>
            )}
          </a>
          <Link href={HIRE_TALENT_HREF} className={BTN_SECONDARY}>
            Hire talent →
          </Link>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[rgba(0,150,220,0.12)] bg-white/80 p-6 text-center shadow-[0_8px_32px_rgba(0,100,200,0.08)] backdrop-blur-[16px]"
            >
              <dd className="text-[32px] font-black leading-tight text-[#071426] md:text-[40px]">
                {stat.value}
              </dd>
              <dt className="mt-1 text-[14px] font-bold tracking-wide text-[#64748b]">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

// ── Licence-wise ─────────────────────────────────────────────────────────────

export function JobsByLicence() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className={WRAP}>
        <SectionHead
          eyebrow="Licence-wise talent"
          title="Roles across RBI, SEBI, IRDAI and IFSCA."
          lead="Browse by the licence the employer holds. Each entity searches the live board above — or step across to the licensing service itself."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {LICENCE_GROUPS.map((group) => (
            <article key={group.regulator} className={`flex flex-col ${CARD}`}>
              <div className="flex items-baseline gap-3">
                <span className="text-[13px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
                  {group.regulator}
                </span>
                <span className="text-[12.5px] font-medium text-[#94a3b8]">{group.authority}</span>
              </div>

              <h3 className="mt-2 text-[20px] font-black leading-tight text-[#071426]">
                {group.title}
              </h3>

              <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2">
                {group.entities.map((entity) => (
                  <li key={entity}>
                    <Link
                      href={jobsQueryHref(entity)}
                      className="inline-block rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1.5 text-[13px] font-semibold text-[#475569] transition-colors hover:border-[#1677f2]/40 hover:bg-white hover:text-[#1677f2]"
                    >
                      {entity}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-blue-100 pt-5">
                <a
                  href={`#${OPENINGS_ANCHOR}`}
                  className="text-[14px] font-bold text-[#1677f2] transition-opacity hover:opacity-70"
                >
                  Search open roles →
                </a>
                <Link
                  href={group.servicePath}
                  className="text-[14px] font-bold text-[#0a2b58] transition-colors hover:text-[#1677f2]"
                >
                  {group.serviceLabel} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ─────────────────────────────────────────────────────────────

function StepList({ heading, steps, cta }: { heading: string; steps: ProcessStep[]; cta: React.ReactNode }) {
  return (
    <div className={`flex flex-col ${CARD}`}>
      <h3 className="text-[20px] font-black leading-tight text-[#071426]">{heading}</h3>
      <ol className="mt-7 flex-1 space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-[#071426] text-[14px] font-black text-white">
              {i + 1}
            </span>
            <span className="pt-1.5">
              <span className="block text-[15.5px] font-black leading-tight text-[#071426]">
                {step.title}
              </span>
              <span className="mt-2 block text-[14.5px] font-medium leading-[1.8] text-[#64748b]">
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-8">{cta}</div>
    </div>
  );
}

export function JobsHowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbff] py-24">
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_15%_20%,rgba(0,150,214,0.10),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(217,169,56,0.10),transparent_30%)]" />
      <div className={`relative z-10 ${WRAP}`}>
        <SectionHead
          eyebrow="How it works"
          title="A clear path for both sides."
          lead="One desk that understands the regulation, the role and the candidate — whichever side of the table you are on."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <StepList
            heading="For employers"
            steps={EMPLOYER_STEPS}
            cta={
              <Link href={HIRE_TALENT_HREF} className={BTN_PRIMARY}>
                Submit a hiring requirement →
              </Link>
            }
          />
          <StepList
            heading="For job seekers"
            steps={CANDIDATE_STEPS}
            cta={
              <Link href={JOIN_HREF} className={BTN_SECONDARY}>
                Join the talent network →
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

export function JobsFaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24">
      <div className={WRAP}>
        <SectionHead eyebrow="FAQ" title="Questions, answered." />
        <div className="mx-auto mt-14 max-w-[820px] space-y-3">
          {JOBS_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-blue-100 bg-white px-6 py-5 shadow-[0_8px_32px_rgba(0,100,200,0.05)] transition-colors open:border-[#1677f2]/30 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15.5px] font-black leading-snug text-[#071426]">
                {faq.question}
                <span
                  className="shrink-0 text-[18px] font-normal text-[#1677f2] transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-[14.5px] font-medium leading-[1.8] text-[#64748b]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA + disclaimer ───────────────────────────────────────────────────

export function JobsFinalCta() {
  return (
    <>
      <section
        className="relative overflow-hidden py-20"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(22,119,242,0.32) 0%, #0a1628 46%, #0c2040 100%)",
        }}
      >
        <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
          <h2 className="text-[28px] font-black leading-[1.12] tracking-tight text-white md:text-[38px]">
            The right person, in the right organisation.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[14.5px] font-medium leading-relaxed text-[#94a3b8] md:text-[16px]">
            Regulated recruitment, delivered with regulatory discipline.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href={HIRE_TALENT_HREF}
              className="w-full rounded-xl bg-[#1677f2] px-8 py-3.5 text-center text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0866d9] sm:w-auto"
            >
              Hire talent →
            </Link>
            <Link
              href={JOIN_HREF}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-center text-[15px] font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:w-auto"
            >
              Join the talent network
            </Link>
            <a
              href="tel:+919825600907"
              className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/20 bg-transparent px-6 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              <span className="text-[17px]" aria-hidden="true">📞</span> +91 98256 00907
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <p className={`${WRAP} text-center text-[12.5px] font-medium leading-[1.9] text-[#94a3b8]`}>
          <strong className="font-bold text-[#64748b]">Disclaimer:</strong> {JOBS_DISCLAIMER}
        </p>
      </section>
    </>
  );
}
