"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  slug: string;
  jobTitle: string;
}

export default function ApplyJobClient({ slug, jobTitle }: Props) {
  const router = useRouter();
  const [coverNote, setCoverNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/jobs/${slug}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverNote: coverNote.trim() }),
      });

      if (res.status === 409) {
        router.push("/jobs/account/applications");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Submission failed. Please try again.");
        return;
      }

      router.push(`/jobs/${slug}/apply/success`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
        <h2 className="mb-1 text-[14px] font-black text-[#0a1628]">Cover Note</h2>
        <p className="mb-4 text-[12.5px] text-[#94a3b8]">
          Optional — briefly introduce yourself and why you&apos;re interested in this role.
        </p>
        <textarea
          className="w-full rounded-xl border border-[#dbe7f3] px-4 py-3 text-[14px] text-[#334155] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20 resize-y min-h-[120px]"
          placeholder={`I'm excited about the ${jobTitle} role because…`}
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          maxLength={3000}
          disabled={submitting}
        />
        {coverNote.length > 0 && (
          <p className="mt-1 text-right text-[11px] text-[#94a3b8]">
            {coverNote.length}/3000
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-bold text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-xl bg-[#1677f2] px-6 py-3.5 text-[15px] font-black text-white hover:bg-[#1260d4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#1677f2]/20"
        >
          {submitting ? "Submitting…" : "Submit Application →"}
        </button>
        <Link
          href={`/jobs/${slug}`}
          className="rounded-xl border border-[#dbe7f3] bg-white px-6 py-3.5 text-[15px] font-bold text-[#334155] hover:border-[#1677f2]/40 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <p className="text-center text-[11.5px] text-[#94a3b8]">
        By submitting, you confirm that all information is accurate.
        Your profile details will be shared with the hiring team.
      </p>
    </form>
  );
}
