import type { Metadata } from "next";
import Link from "next/link";

// "Hire Talent" — Phase 7A.
//
// V1 is managed recruitment, not self-service job posting: employers do not
// post their own jobs or manage candidates directly (that stays inside the
// admin ATS). This page is intentionally an INFORMATIONAL landing plus a
// single enquiry CTA -- not a client dashboard, which does not exist -- that
// routes into the existing /contact form via the "Recruitment & Talent
// Acquisition" service option added there. No new CRM or backend.
const CONTACT_HREF = `/contact?service=${encodeURIComponent("Hire Talent / Submit a Hiring Requirement")}`;

export const metadata: Metadata = {
  title: "Hire Talent — Estabizz Managed Recruitment",
  description:
    "Submit a hiring requirement to the Estabizz recruitment team. We source, screen and manage candidates through to placement.",
  robots: { index: true, follow: true },
};

export default function HireTalentPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      {/* Header */}
      <div className="bg-[#0a1628] px-6 py-14 text-center">
        <div className="mb-3 inline-block rounded-full bg-[#1677f2]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#60a5fa]">
          For Employers
        </div>
        <h1 className="mt-3 text-[32px] font-black leading-tight tracking-tight text-white sm:text-[40px]">
          Hire Talent Through Estabizz
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#94a3b8]">
          Managed recruitment for regulated financial services, fintech and technology roles.
          Tell us what you need — our recruitment team handles sourcing, screening and coordination.
        </p>
        <div className="mt-7">
          <Link
            href={CONTACT_HREF}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white hover:bg-[#1260d4] transition-colors shadow-lg shadow-[#1677f2]/30"
          >
            Submit a Hiring Requirement →
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-[13px] font-black uppercase tracking-widest text-[#1677f2]">
          How it works
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Step n="1" title="Share your requirement" body="Tell us the role, seniority, skills and location you're hiring for." />
          <Step n="2" title="We create the vacancy" body="The Estabizz recruitment team defines and manages the role internally." />
          <Step n="3" title="Candidates are sourced" body="We match candidates from our talent network and screen applicants." />
          <Step n="4" title="Interview & placement" body="You interview shortlisted candidates; we coordinate through to offer." />
        </div>

        <div className="mt-10 rounded-2xl border border-[#dbe7f3] bg-white p-8 text-center">
          <p className="text-[15px] font-bold text-[#0a1628]">Ready to start?</p>
          <p className="mt-2 text-[13px] text-[#64748b]">
            Submit your requirement and a member of our recruitment team will get in touch.
          </p>
          <Link
            href={CONTACT_HREF}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-6 py-3 text-[14px] font-black text-white hover:bg-[#1677f2] transition-colors"
          >
            Submit a Hiring Requirement
          </Link>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf2ff] text-[13px] font-black text-[#1677f2]">
        {n}
      </div>
      <h3 className="mt-3 text-[14px] font-black text-[#0a1628]">{title}</h3>
      <p className="mt-2 text-[13px] leading-6 text-[#64748b]">{body}</p>
    </div>
  );
}
