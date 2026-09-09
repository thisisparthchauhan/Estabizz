"use client";

import { useState } from "react";

interface InterviewRow {
  id: string;
  applicationId: string;
  jobTitle: string;
  candidateName: string;
  interviewType: string;
  roundNumber: number;
  status: string;
  scheduledAt: Date | null;
  durationMinutes: number | null;
  locationOrLink: string | null;
  format: string | null;
  notes: string | null;
  createdAt: Date;
}

function fmt(d: Date | string | null) {
  if (!d) return "TBD";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(d));
}

const TYPE_LABELS: Record<string, string> = {
  phone_screen: "Phone Screen",
  video_call: "Video Call",
  in_person: "In-Person",
  panel: "Panel",
  technical: "Technical",
  hr: "HR",
  final: "Final",
};

const STATUS_COLOURS: Record<string, string> = {
  scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  no_show: "bg-orange-50 text-orange-700 border-orange-200",
};

interface Props {
  applicationId: string;
  initialInterviews: InterviewRow[];
}

export default function InterviewPanel({ applicationId, initialInterviews }: Props) {
  const [interviews, setInterviews] = useState<InterviewRow[]>(initialInterviews);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [iType, setIType] = useState("phone_screen");
  const [iDate, setIDate] = useState("");
  const [iTime, setITime] = useState("");
  const [iDuration, setIDuration] = useState("30");
  const [iLink, setILink] = useState("");
  const [iNotes, setINotes] = useState("");
  const [iRound, setIRound] = useState("1");

  async function handleAdd() {
    setSaving(true);
    setError(null);
    try {
      const scheduledAt = iDate
        ? new Date(`${iDate}T${iTime || "09:00"}:00`).toISOString()
        : undefined;

      const res = await fetch("/api/admin/jobs/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          interviewType: iType,
          roundNumber: Number(iRound),
          scheduledAt,
          durationMinutes: iDuration ? Number(iDuration) : undefined,
          locationOrLink: iLink.trim() || undefined,
          notes: iNotes.trim() || undefined,
        }),
      });
      if (!res.ok) { setError("Failed to schedule interview."); return; }
      const data = await res.json();
      setInterviews([data.interview, ...interviews]);
      setAdding(false);
      setIType("phone_screen"); setIDate(""); setITime(""); setIDuration("30");
      setILink(""); setINotes(""); setIRound("1");
    } catch { setError("Network error."); }
    finally { setSaving(false); }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/jobs/interviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setInterviews(interviews.map((i) => i.id === id ? data.interview : i));
      }
    } catch { /* ignore */ }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-black uppercase tracking-widest text-[#64748b]">Interviews</h2>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-lg bg-[#1677f2] px-3 py-1.5 text-[12px] font-bold text-white hover:bg-[#1260d4] transition-colors"
          >
            + Schedule
          </button>
        )}
      </div>

      {adding && (
        <div className="rounded-xl border border-[#dbe7f3] bg-[#f8fbff] p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-bold text-[#64748b]">Type</label>
              <select
                className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
                value={iType} onChange={(e) => setIType(e.target.value)} disabled={saving}
              >
                {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold text-[#64748b]">Round</label>
              <input type="number" min={1} max={10}
                className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
                value={iRound} onChange={(e) => setIRound(e.target.value)} disabled={saving}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold text-[#64748b]">Date</label>
              <input type="date"
                className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
                value={iDate} onChange={(e) => setIDate(e.target.value)} disabled={saving}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold text-[#64748b]">Time</label>
              <input type="time"
                className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
                value={iTime} onChange={(e) => setITime(e.target.value)} disabled={saving}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold text-[#64748b]">Duration (min)</label>
              <input type="number"
                className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
                value={iDuration} onChange={(e) => setIDuration(e.target.value)} disabled={saving}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold text-[#64748b]">Link / Location</label>
              <input
                className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
                placeholder="meet.google.com/… or office address"
                value={iLink} onChange={(e) => setILink(e.target.value)} disabled={saving}
              />
            </div>
          </div>
          <textarea
            className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none resize-none"
            placeholder="Notes (optional)…"
            rows={2}
            value={iNotes} onChange={(e) => setINotes(e.target.value)} disabled={saving}
          />
          {error && <p className="text-[12px] font-bold text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button type="button" onClick={handleAdd} disabled={saving}
              className="rounded-lg bg-[#1677f2] px-4 py-2 text-[12px] font-bold text-white disabled:opacity-50">
              {saving ? "Saving…" : "Schedule Interview"}
            </button>
            <button type="button" onClick={() => setAdding(false)}
              className="rounded-lg border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#64748b]">
              Cancel
            </button>
          </div>
        </div>
      )}

      {interviews.length === 0 && !adding ? (
        <p className="text-[13px] text-[#94a3b8]">No interviews scheduled.</p>
      ) : (
        <div className="space-y-3">
          {interviews.map((iv) => (
            <div key={iv.id} className="rounded-xl border border-[#dbe7f3] bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-[#0a1628]">
                    Round {iv.roundNumber} — {TYPE_LABELS[iv.interviewType] ?? iv.interviewType}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-[#64748b]">{fmt(iv.scheduledAt)}</p>
                  {iv.durationMinutes && (
                    <p className="text-[12px] text-[#94a3b8]">{iv.durationMinutes} min</p>
                  )}
                  {iv.locationOrLink && (
                    <p className="mt-1 text-[12px] text-[#64748b] break-all">{iv.locationOrLink}</p>
                  )}
                  {iv.notes && (
                    <p className="mt-1 text-[12.5px] text-[#334155]">{iv.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${STATUS_COLOURS[iv.status] ?? ""}`}
                  >
                    {iv.status}
                  </span>
                  <select
                    className="rounded-lg border border-[#dbe7f3] bg-white px-2 py-1 text-[11px] text-[#334155] focus:outline-none"
                    value={iv.status}
                    onChange={(e) => handleStatusChange(iv.id, e.target.value)}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
