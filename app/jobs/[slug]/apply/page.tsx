import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { requireCandidateAccountSessionForPage } from "@/lib/jobs/candidateIdentity/access";
import { buildLoginHref } from "@/lib/jobs/candidateIdentity/redirects";
import { getPublicJobBySlug } from "@/lib/jobs/jobManagement/repository";
import { findApplicationByJobAndCandidate } from "@/lib/jobs/applicationManagement/repository";
import ApplyJobClient from "./ApplyJobClient";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `Apply — ${job.title} — Estabizz Careers`,
    robots: { index: false, follow: false },
  };
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;

  const session = await requireCandidateAccountSessionForPage();
  if (!session) {
    redirect(buildLoginHref(`/jobs/${slug}/apply`));
  }

  const job = await getPublicJobBySlug(slug);
  if (!job) notFound();

  const existing = await findApplicationByJobAndCandidate(job.id, session.candidateId);

  if (existing) {
    return (
      <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            ✓
          </div>
          <h1 className="text-[28px] font-black text-[#0a1628]">Already Applied</h1>
          <p className="mt-3 text-[15px] text-[#64748b]">
            You applied for <strong>{job.title}</strong> on{" "}
            {new Date(existing.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            . Current status:{" "}
            <span className="font-bold text-[#1677f2]">{existing.stageName}</span>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/jobs/account/applications"
              className="rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white hover:bg-[#1260d4] transition-colors"
            >
              View My Applications
            </Link>
            <Link
              href="/jobs"
              className="rounded-xl border border-[#dbe7f3] bg-white px-6 py-3 text-[14px] font-bold text-[#334155] hover:border-[#1677f2]/40 transition-colors"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      {/* Header */}
      <div className="bg-[#0a1628] px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <Link
            href={`/jobs/${slug}`}
            className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#94a3b8] hover:text-white transition-colors"
          >
            ← Back to job
          </Link>
          {job.department && (
            <div className="mb-2 inline-block rounded-full bg-[#1677f2]/20 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#60a5fa]">
              {job.department}
            </div>
          )}
          <h1 className="text-[26px] font-black leading-tight text-white sm:text-[32px]">
            Apply — {job.title}
          </h1>
          {job.location_text && (
            <p className="mt-2 text-[13px] text-[#94a3b8]">📍 {job.location_text}</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* Candidate summary */}
        <div className="mb-6 rounded-2xl border border-[#dbe7f3] bg-white p-5">
          <h2 className="mb-1 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
            Applying as
          </h2>
          <p className="text-[16px] font-black text-[#0a1628]">{session.displayName}</p>
          <p className="text-[13px] text-[#64748b]">{session.email}</p>
          <Link
            href="/jobs/account/profile"
            className="mt-2 inline-block text-[12px] font-bold text-[#1677f2] hover:underline"
          >
            Edit profile →
          </Link>
        </div>

        <ApplyJobClient slug={slug} jobTitle={job.title} />
      </div>
    </div>
  );
}
