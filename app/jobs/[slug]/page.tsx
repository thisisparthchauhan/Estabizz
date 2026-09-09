import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublicJobBySlug } from "@/lib/jobs/jobManagement/repository";
import { requireCandidateAccountSessionForPage } from "@/lib/jobs/candidateIdentity/access";
import { findApplicationByJobAndCandidate } from "@/lib/jobs/applicationManagement/repository";
import type { JobEmploymentType, RemotePolicy } from "@prisma/client";

type Props = { params: Promise<{ slug: string }> };

const EMPLOYMENT_LABELS: Record<JobEmploymentType, string> = {
  permanent:  "Permanent",
  contract:   "Contract",
  consulting: "Consulting",
  fixed_term: "Fixed Term",
};

const REMOTE_LABELS: Record<RemotePolicy, string> = {
  on_site: "On-site",
  hybrid:  "Hybrid",
  remote:  "Remote",
};

function expLabel(min: number | null, max: number | null): string {
  if (!min && !max) return "";
  if (min && max) return `${min}–${max} years`;
  if (min) return `${min}+ years`;
  return `Up to ${max} years`;
}

function fmt(d?: Date | null): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} — Careers at Estabizz`,
    description: job.description.slice(0, 160),
  };
}

export const dynamic = "force-dynamic";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-[13px] font-black uppercase tracking-widest text-[#1677f2]">{title}</h2>
      <div className="text-[14.5px] leading-7 text-[#334155] whitespace-pre-line">{children}</div>
    </div>
  );
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);
  if (!job) notFound();

  const session = await requireCandidateAccountSessionForPage();
  const existingApplication =
    session
      ? await findApplicationByJobAndCandidate(job.id, session.candidateId)
      : null;

  const sr = job.structured_requirements ?? {};
  const skills = sr.skills_list ?? [];
  const exp = expLabel(job.min_years_experience, job.max_years_experience);

  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      {/* Header */}
      <div className="bg-[#0a1628] px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/jobs"
            className="mb-5 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#94a3b8] hover:text-white transition-colors"
          >
            ← Back to all jobs
          </Link>

          {job.department && (
            <div className="mb-3 inline-block rounded-full bg-[#1677f2]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#60a5fa]">
              {job.department}
            </div>
          )}

          <h1 className="text-[32px] font-black leading-tight tracking-tight text-white sm:text-[40px]">
            {job.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#94a3b8]">
            {job.location_text && <span>📍 {job.location_text}</span>}
            {job.remote_policy && <span>{REMOTE_LABELS[job.remote_policy]}</span>}
            {job.employment_type && <span>{EMPLOYMENT_LABELS[job.employment_type]}</span>}
            {exp && <span>🕐 {exp} experience</span>}
            {job.closes_at && (
              <span className="text-[#fb923c]">Deadline: {fmt(job.closes_at)}</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {existingApplication ? (
              <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-400/30 px-7 py-3.5 text-[15px] font-black text-emerald-300">
                ✓ Already Applied — {existingApplication.stageName}
              </span>
            ) : (
              <Link
                href={`/jobs/${slug}/apply`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white hover:bg-[#1260d4] transition-colors shadow-lg shadow-[#1677f2]/30"
              >
                Apply Now →
              </Link>
            )}
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-[15px] font-black text-white hover:bg-white/10 transition-colors"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-8 lg:col-span-2">
            {job.description && (
              <Section title="About This Role">{job.description}</Section>
            )}
            {sr.responsibilities && (
              <Section title="Responsibilities">{sr.responsibilities}</Section>
            )}
            {sr.requirements_text && (
              <Section title="Requirements">{sr.requirements_text}</Section>
            )}
            {sr.qualification && (
              <Section title="Qualification">{sr.qualification}</Section>
            )}
            {skills.length > 0 && (
              <div>
                <h2 className="mb-3 text-[13px] font-black uppercase tracking-widest text-[#1677f2]">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#dbe7f3] bg-white px-3 py-1 text-[12.5px] font-bold text-[#334155]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Job meta card */}
            <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
              <h3 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Position Details</h3>
              <dl className="space-y-3 text-[13px]">
                {job.department && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Department</dt>
                    <dd className="text-[#64748b]">{job.department}</dd>
                  </div>
                )}
                {job.location_text && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Location</dt>
                    <dd className="text-[#64748b]">{job.location_text}</dd>
                  </div>
                )}
                {job.remote_policy && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Workplace</dt>
                    <dd className="text-[#64748b]">{REMOTE_LABELS[job.remote_policy]}</dd>
                  </div>
                )}
                {job.employment_type && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Employment</dt>
                    <dd className="text-[#64748b]">{EMPLOYMENT_LABELS[job.employment_type]}</dd>
                  </div>
                )}
                {exp && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Experience</dt>
                    <dd className="text-[#64748b]">{exp}</dd>
                  </div>
                )}
                {job.salary_disclosed && job.salary_min && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Salary</dt>
                    <dd className="text-[#64748b]">
                      {job.salary_min}
                      {job.salary_max && `–${job.salary_max}`}
                      {job.salary_currency && ` ${job.salary_currency}`} LPA
                    </dd>
                  </div>
                )}
                {sr.regulatory_domain && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Regulatory Domain</dt>
                    <dd className="text-[#64748b]">{sr.regulatory_domain}</dd>
                  </div>
                )}
                {job.closes_at && (
                  <div>
                    <dt className="font-bold text-[#0a1628]">Application Deadline</dt>
                    <dd className="font-bold text-[#fb923c]">{fmt(job.closes_at)}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Apply CTA */}
            <div className="rounded-2xl border border-[#1677f2]/30 bg-[#eaf2ff] p-5 text-center">
              {existingApplication ? (
                <>
                  <p className="text-[14px] font-black text-emerald-700">✓ Application Submitted</p>
                  <p className="mt-1 text-[12px] text-[#64748b]">
                    Status: <span className="font-bold text-[#1677f2]">{existingApplication.stageName}</span>
                  </p>
                  <Link
                    href="/jobs/account/applications"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-5 py-3 text-[14px] font-black text-white hover:bg-[#1260d4] transition-colors"
                  >
                    View My Applications
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-[14px] font-black text-[#0a1628]">Ready to apply?</p>
                  <p className="mt-1 text-[12px] text-[#64748b]">
                    Submit your application in minutes.
                  </p>
                  <Link
                    href={`/jobs/${slug}/apply`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-5 py-3 text-[14px] font-black text-white hover:bg-[#1260d4] transition-colors"
                  >
                    Apply Now →
                  </Link>
                </>
              )}
              <Link
                href="/jobs"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#dbe7f3] bg-white px-5 py-2.5 text-[13px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
