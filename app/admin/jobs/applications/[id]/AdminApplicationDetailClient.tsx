"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ApplicationAdminDetail } from "@/lib/jobs/applicationManagement/repository";
import NotesPanel from "../../_components/NotesPanel";
import TasksPanel from "../../_components/TasksPanel";
import InterviewPanel from "../../_components/InterviewPanel";

interface NoteRow { id: string; content: string; isPinned: boolean; visibility: string; authorRefId: string; authorName: string; createdAt: Date; updatedAt: Date; }
interface TaskRow { id: string; taskType: string; title: string; description: string | null; entityType: string | null; entityId: string | null; assignedToRefId: string; assignedToName: string; createdByRefId: string; dueAt: Date | null; status: string; priority: string; completedAt: Date | null; createdAt: Date; updatedAt: Date; }
interface InterviewRow { id: string; applicationId: string; jobTitle: string; candidateName: string; interviewType: string; roundNumber: number; status: string; scheduledAt: Date | null; durationMinutes: number | null; locationOrLink: string | null; format: string | null; notes: string | null; createdAt: Date; }

function fmt(d: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(d));
}

const SOURCE_LABELS: Record<string, string> = {
  candidate_portal: "Candidate Portal",
  recruiter_assigned: "Recruiter Assigned",
  referral: "Referral",
  imported: "Imported",
};

interface Props {
  application: ApplicationAdminDetail;
  notes: NoteRow[];
  tasks: TaskRow[];
  interviews: InterviewRow[];
}

export default function AdminApplicationDetailClient({ application, notes, tasks, interviews }: Props) {
  const router = useRouter();
  const [selectedStageId, setSelectedStageId] = useState(application.currentStageId);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const stageChanged = selectedStageId !== application.currentStageId;

  async function handleStageUpdate() {
    if (!stageChanged) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/admin/jobs/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId: selectedStageId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSaveError(data.error ?? "Failed to update stage.");
        return;
      }
      setSaveSuccess(true);
      router.refresh();
    } catch {
      setSaveError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/admin/jobs/applications"
        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#64748b] hover:text-[#1677f2] transition-colors"
      >
        ← All Applications
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-[24px] font-black text-[#0a1628]">{application.candidateName}</h1>
        <p className="mt-1 text-[13px] text-[#64748b]">
          Applied for{" "}
          <Link
            href={`/jobs/${application.jobSlug}`}
            target="_blank"
            className="font-bold text-[#1677f2] hover:underline"
          >
            {application.jobTitle}
          </Link>{" "}
          on {fmt(application.createdAt)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-5 lg:col-span-2">
          {/* Candidate info */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
              Candidate
            </h2>
            <dl className="space-y-2 text-[13.5px]">
              <div className="flex justify-between">
                <dt className="font-bold text-[#0a1628]">Name</dt>
                <dd className="text-[#64748b]">{application.candidateName}</dd>
              </div>
              {application.candidateEmail && (
                <div className="flex justify-between">
                  <dt className="font-bold text-[#0a1628]">Email</dt>
                  <dd className="text-[#64748b]">{application.candidateEmail}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="font-bold text-[#0a1628]">Source</dt>
                <dd className="text-[#64748b]">{SOURCE_LABELS[application.source] ?? application.source}</dd>
              </div>
            </dl>
          </div>

          {/* Cover note */}
          {application.coverNote && (
            <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
              <h2 className="mb-3 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
                Cover Note
              </h2>
              <p className="text-[13.5px] leading-7 text-[#334155] whitespace-pre-line">
                {application.coverNote}
              </p>
            </div>
          )}

          {/* Stage history */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
              Stage History
            </h2>
            {application.stageHistory.length === 0 ? (
              <p className="text-[13px] text-[#94a3b8]">No history recorded.</p>
            ) : (
              <ol className="space-y-3">
                {application.stageHistory.map((h) => (
                  <li key={h.id} className="flex gap-3 text-[13px]">
                    <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#1677f2] mt-1.5" />
                    <div>
                      <p className="font-bold text-[#0a1628]">
                        {h.previousStageName ? `${h.previousStageName} → ` : "Initial: "}
                        {h.newStageName}
                      </p>
                      <p className="text-[#64748b]">
                        {fmt(h.changedAt)} · {h.changedByName}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Interviews */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <InterviewPanel applicationId={application.id} initialInterviews={interviews} />
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <NotesPanel entityType="application" entityId={application.id} initialNotes={notes} />
          </div>

          {/* Tasks */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <TasksPanel entityType="application" entityId={application.id} initialTasks={tasks} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Current stage + update */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
              Stage
            </h2>
            <div className="mb-3">
              <span
                className="inline-block rounded-full px-3 py-1 text-[12px] font-bold text-white"
                style={{ backgroundColor: application.stageColour ?? "#64748b" }}
              >
                {application.currentStageName}
              </span>
            </div>
            <label className="mb-1 block text-[12px] font-bold text-[#0a1628]">
              Move to
            </label>
            <select
              className="w-full rounded-xl border border-[#dbe7f3] px-3 py-2.5 text-[13.5px] text-[#334155] focus:border-[#1677f2] focus:outline-none"
              value={selectedStageId}
              onChange={(e) => {
                setSelectedStageId(e.target.value);
                setSaveSuccess(false);
                setSaveError(null);
              }}
              disabled={saving}
            >
              {application.allStages.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            {saveError && (
              <p className="mt-2 text-[12px] font-bold text-red-600">{saveError}</p>
            )}
            {saveSuccess && (
              <p className="mt-2 text-[12px] font-bold text-emerald-600">Stage updated.</p>
            )}

            <button
              type="button"
              disabled={!stageChanged || saving}
              onClick={handleStageUpdate}
              className="mt-3 w-full rounded-xl bg-[#1677f2] py-2.5 text-[13.5px] font-black text-white hover:bg-[#1260d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Saving…" : "Update Stage"}
            </button>
          </div>

          {/* Job info */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <h2 className="mb-3 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
              Job
            </h2>
            <Link
              href={`/jobs/${application.jobSlug}`}
              target="_blank"
              className="font-bold text-[#1677f2] hover:underline text-[13.5px]"
            >
              {application.jobTitle} ↗
            </Link>
            <p className="mt-2 text-[12px] text-[#94a3b8]">Last updated {fmt(application.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
