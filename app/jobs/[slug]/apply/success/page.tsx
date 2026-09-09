import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application Submitted — Estabizz Careers",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ slug: string }> };

export default async function ApplySuccessPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
          🎉
        </div>
        <h1 className="text-[30px] font-black text-[#0a1628]">Application Submitted!</h1>
        <p className="mt-4 text-[15px] leading-7 text-[#64748b]">
          Your application has been received. Our team will review it and be in touch.
          You can track the status from your applications dashboard.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/jobs/account/applications"
            className="rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white hover:bg-[#1260d4] transition-colors shadow-lg shadow-[#1677f2]/20"
          >
            View My Applications
          </Link>
          <Link
            href="/jobs"
            className="rounded-xl border border-[#dbe7f3] bg-white px-7 py-3.5 text-[15px] font-bold text-[#334155] hover:border-[#1677f2]/40 transition-colors"
          >
            Browse More Jobs
          </Link>
        </div>
        <p className="mt-6 text-[12px] text-[#94a3b8]">
          Applied for the wrong role?{" "}
          <Link href={`/jobs/${slug}`} className="font-bold text-[#1677f2] hover:underline">
            View job posting
          </Link>
        </p>
      </div>
    </div>
  );
}
