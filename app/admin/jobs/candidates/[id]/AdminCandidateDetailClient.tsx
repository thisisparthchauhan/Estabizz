"use client";

import Link from "next/link";
import type { CandidateAdminDetail } from "@/lib/jobs/candidateManagement/repository";
import NotesPanel from "../../_components/NotesPanel";
import TasksPanel from "../../_components/TasksPanel";

interface NoteRow { id: string; content: string; isPinned: boolean; visibility: string; authorRefId: string; authorName: string; createdAt: Date; updatedAt: Date; }
interface TaskRow { id: string; taskType: string; title: string; description: string | null; entityType: string | null; entityId: string | null; assignedToRefId: string; assignedToName: string; createdByRefId: string; dueAt: Date | null; status: string; priority: string; completedAt: Date | null; createdAt: Date; updatedAt: Date; }

function fmt(d: Date | string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d));
}

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (!value && value !== 0) return null;
  return (
    <div>
      <dt className="text-[11px] font-black uppercase tracking-widest text-[#64748b]">{label}</dt>
      <dd className="mt-0.5 text-[13.5px] text-[#334155]">{value}</dd>
    </div>
  );
}

interface Props {
  candidate: CandidateAdminDetail;
  notes: NoteRow[];
  tasks: TaskRow[];
}

export default function AdminCandidateDetailClient({ candidate, notes, tasks }: Props) {
  const fullName = `${candidate.firstName} ${candidate.lastName}`;
  const email = candidate.contacts.find((c) => c.type === "email")?.value;
  const phone = candidate.contacts.find(
    (c) => c.type === "phone_mobile" || c.type === "phone_work",
  )?.value;

  return (
    <div className="space-y-6">
      <Link href="/admin/jobs/candidates"
        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#64748b] hover:text-[#1677f2] transition-colors">
        ← Candidates
      </Link>

      <div>
        <h1 className="text-[26px] font-black text-[#0a1628]">{fullName}</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">{candidate.candidateCode}</p>
        {candidate.currentTitle && (
          <p className="mt-1 text-[14px] text-[#334155]">
            {candidate.currentTitle}
            {candidate.currentEmployer ? ` @ ${candidate.currentEmployer}` : ""}
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: info + employment + education + skills */}
        <div className="space-y-5 lg:col-span-2">
          {/* Personal & Professional */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Profile</h2>
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <Field label="Email" value={email} />
              <Field label="Phone" value={phone} />
              <Field label="City" value={candidate.currentCity} />
              <Field label="State" value={candidate.currentState} />
              <Field label="Experience" value={candidate.yearsOfExperience != null ? `${candidate.yearsOfExperience} years` : null} />
              <Field label="Notice Period" value={candidate.noticePeriodDays != null ? `${candidate.noticePeriodDays} days` : null} />
              <Field label="Remote Preference" value={candidate.remotePreference} />
              <Field label="Open to Relocation" value={candidate.openToRelocation != null ? (candidate.openToRelocation ? "Yes" : "No") : null} />
              <Field label="Preferred Cities" value={candidate.prefCities.join(", ") || null} />
              <Field label="Profile Completion" value={`${candidate.profileCompletenessPct}%`} />
            </dl>
          </div>

          {/* Employment */}
          {candidate.employments.length > 0 && (
            <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
              <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Employment</h2>
              <div className="space-y-4">
                {candidate.employments.map((e) => (
                  <div key={e.id}>
                    <p className="font-bold text-[#0a1628]">{e.title}</p>
                    <p className="text-[13px] text-[#64748b]">{e.employerName}</p>
                    <p className="text-[12px] text-[#94a3b8]">
                      {fmt(e.startDate)} — {e.isCurrent ? "Present" : (e.endDate ? fmt(e.endDate) : "—")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {candidate.educations.length > 0 && (
            <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
              <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Education</h2>
              <div className="space-y-3">
                {candidate.educations.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-bold text-[#0a1628]">
                      {ed.degree}{ed.fieldOfStudy ? ` — ${ed.fieldOfStudy}` : ""}
                    </p>
                    <p className="text-[13px] text-[#64748b]">{ed.institutionName}</p>
                    {ed.endYear && <p className="text-[12px] text-[#94a3b8]">{ed.endYear}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {candidate.skills.length > 0 && (
            <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
              <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((s) => (
                  <span key={s.id}
                    className="rounded-full border border-[#dbe7f3] bg-[#f8fbff] px-3 py-1 text-[12.5px] font-bold text-[#334155]">
                    {s.skillName}
                    {s.proficiency ? ` · ${s.proficiency}` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <NotesPanel entityType="candidate" entityId={candidate.id} initialNotes={notes} />
          </div>

          {/* Tasks */}
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <TasksPanel entityType="candidate" entityId={candidate.id} initialTasks={tasks} />
          </div>
        </div>

        {/* Right sidebar: applications */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
              Applications ({candidate.applications.length})
            </h2>
            {candidate.applications.length === 0 ? (
              <p className="text-[13px] text-[#94a3b8]">No applications.</p>
            ) : (
              <div className="space-y-3">
                {candidate.applications.map((app) => (
                  <div key={app.id}>
                    <Link
                      href={`/admin/jobs/applications/${app.id}`}
                      className="font-bold text-[#1677f2] hover:underline text-[13.5px]"
                    >
                      {app.jobTitle}
                    </Link>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
                        style={{ backgroundColor: app.stageColour ?? "#64748b" }}
                      >
                        {app.stageName}
                      </span>
                      <span className="text-[11px] text-[#94a3b8]">{fmt(app.appliedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
            <h2 className="mb-2 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Dates</h2>
            <dl className="space-y-2 text-[13px]">
              <div><dt className="text-[#64748b]">Created</dt><dd className="font-bold">{fmt(candidate.createdAt)}</dd></div>
              <div><dt className="text-[#64748b]">Updated</dt><dd className="font-bold">{fmt(candidate.updatedAt)}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
