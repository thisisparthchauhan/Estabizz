"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { EstabizzSelect } from "@/components/ui/EstabizzSelect";
import type { JobDetail, StructuredRequirements } from "@/lib/jobs/jobManagement/repository";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "draft",     label: "Draft" },
  { value: "open",      label: "Open (Active)" },
  { value: "on_hold",   label: "On Hold" },
  { value: "closed",    label: "Closed" },
  { value: "filled",    label: "Filled" },
  { value: "cancelled", label: "Cancelled" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "",           label: "— Not specified —" },
  { value: "permanent",  label: "Permanent" },
  { value: "contract",   label: "Contract" },
  { value: "consulting", label: "Consulting" },
  { value: "fixed_term", label: "Fixed Term" },
];

const REMOTE_POLICY_OPTIONS = [
  { value: "",        label: "— Not specified —" },
  { value: "on_site", label: "On-site" },
  { value: "hybrid",  label: "Hybrid" },
  { value: "remote",  label: "Remote" },
];

const DEPARTMENT_SUGGESTIONS = [
  "Regulatory Advisory",
  "Compliance",
  "Legal",
  "Finance & Accounts",
  "Operations",
  "Technology",
  "Business Development",
  "Research & Analysis",
  "Human Resources",
  "Marketing",
  "Executive",
];

// ─── Slug helper ──────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  slug: string;
  slugManual: boolean;
  department: string;
  location_text: string;
  description: string;
  responsibilities: string;
  requirements_text: string;
  qualification: string;
  skills_list: string;
  regulatory_domain: string;
  status: string;
  is_public: boolean;
  employment_type: string;
  remote_policy: string;
  min_years_experience: string;
  max_years_experience: string;
  salary_min: string;
  salary_max: string;
  salary_currency: string;
  salary_disclosed: boolean;
  closes_at: string;
  internal_notes: string;
}

function initForm(job: JobDetail | null): FormState {
  const sr = (job?.structured_requirements ?? {}) as StructuredRequirements;
  return {
    title: job?.title ?? "",
    slug: job?.slug ?? "",
    slugManual: !!job,
    department: job?.department ?? "",
    location_text: job?.location_text ?? "",
    description: job?.description ?? "",
    responsibilities: sr.responsibilities ?? "",
    requirements_text: sr.requirements_text ?? "",
    qualification: sr.qualification ?? "",
    skills_list: (sr.skills_list ?? []).join(", "),
    regulatory_domain: sr.regulatory_domain ?? "",
    status: job?.status ?? "draft",
    is_public: job?.is_public ?? false,
    employment_type: job?.employment_type ?? "",
    remote_policy: job?.remote_policy ?? "",
    min_years_experience: job?.min_years_experience?.toString() ?? "",
    max_years_experience: job?.max_years_experience?.toString() ?? "",
    salary_min: job?.salary_min ?? "",
    salary_max: job?.salary_max ?? "",
    salary_currency: job?.salary_currency ?? "INR",
    salary_disclosed: job?.salary_disclosed ?? false,
    closes_at: job?.closes_at ? new Date(job.closes_at).toISOString().substring(0, 10) : "",
    internal_notes: job?.internal_notes ?? "",
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  job: JobDetail | null;
}

export default function JobEditorClient({ job }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => initForm(job));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const set = useCallback((field: keyof FormState, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slugManual) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }, []);

  function buildPayload() {
    const skillsArray = form.skills_list
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const structured_requirements: StructuredRequirements = {
      responsibilities: form.responsibilities.trim() || undefined,
      requirements_text: form.requirements_text.trim() || undefined,
      qualification: form.qualification.trim() || undefined,
      skills_list: skillsArray.length ? skillsArray : undefined,
      regulatory_domain: form.regulatory_domain.trim() || undefined,
    };

    return {
      title: form.title.trim(),
      slug: form.slug.trim(),
      department: form.department.trim() || undefined,
      location_text: form.location_text.trim() || undefined,
      description: form.description.trim(),
      status: form.status,
      is_public: form.is_public,
      employment_type: form.employment_type || undefined,
      remote_policy: form.remote_policy || undefined,
      min_years_experience: form.min_years_experience ? Number(form.min_years_experience) : undefined,
      max_years_experience: form.max_years_experience ? Number(form.max_years_experience) : undefined,
      salary_min: form.salary_min ? Number(form.salary_min) : undefined,
      salary_max: form.salary_max ? Number(form.salary_max) : undefined,
      salary_currency: form.salary_currency.trim() || undefined,
      salary_disclosed: form.salary_disclosed,
      closes_at: form.closes_at || undefined,
      structured_requirements,
      internal_notes: form.internal_notes.trim() || undefined,
    };
  }

  async function save(targetStatus?: string) {
    setError(null);
    setSaving(true);
    try {
      const payload = buildPayload();
      if (targetStatus) payload.status = targetStatus;

      const url = job ? `/api/admin/jobs/${job.id}` : "/api/admin/jobs";
      const method = job ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to save job.");
        setSaving(false);
        return;
      }

      setToast(job ? "Job updated." : "Job created.");
      setTimeout(() => setToast(null), 3000);

      if (!job) {
        router.push(`/admin/jobs/${data.job.id}/edit`);
      } else {
        router.refresh();
      }
    } catch {
      setError("Network error — please retry.");
    } finally {
      setSaving(false);
    }
  }

  // ─── Field helpers ──────────────────────────────────────────────────────────

  function inputCls(extra = "") {
    return `w-full rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20 ${extra}`;
  }

  function labelCls() {
    return "block text-[12px] font-bold uppercase tracking-widest text-[#64748b] mb-1.5";
  }

  function textareaCls() {
    return "w-full rounded-xl border border-[#dbe7f3] bg-white px-4 py-3 text-[13.5px] text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20 resize-none";
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
            {job ? "Edit Job" : "New Job"}
          </div>
          <h1 className="text-[28px] font-black leading-tight tracking-tight text-[#0a1628]">
            {job ? job.title : "Create Job Posting"}
          </h1>
          {job && (
            <p className="mt-1 text-[12px] text-[#94a3b8]">Code: {job.job_code}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/jobs")}
            className="rounded-xl border border-[#dbe7f3] px-4 py-2 text-[13px] font-bold text-[#64748b] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-bold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {toast}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-bold text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* ── Core Info ── */}
        <section className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
          <h2 className="mb-5 text-[14px] font-black uppercase tracking-widest text-[#0a1628]">Core Info</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className={labelCls()}>Job Title *</label>
              <input
                className={inputCls()}
                placeholder="e.g. Senior Compliance Officer"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>

            {/* Slug */}
            <div className="sm:col-span-2">
              <label className={labelCls()}>Slug *</label>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#94a3b8] whitespace-nowrap">/jobs/</span>
                <input
                  className={inputCls("flex-1")}
                  placeholder="senior-compliance-officer"
                  value={form.slug}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, slug: e.target.value, slugManual: true }));
                  }}
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className={labelCls()}>Department / Category</label>
              <input
                list="dept-list"
                className={inputCls()}
                placeholder="e.g. Compliance"
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
              />
              <datalist id="dept-list">
                {DEPARTMENT_SUGGESTIONS.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>

            {/* Location */}
            <div>
              <label className={labelCls()}>Location</label>
              <input
                className={inputCls()}
                placeholder="e.g. Gandhinagar, Gujarat"
                value={form.location_text}
                onChange={(e) => set("location_text", e.target.value)}
              />
            </div>

            {/* Regulatory Domain */}
            <div className="sm:col-span-2">
              <label className={labelCls()}>Regulatory Domain (optional)</label>
              <input
                className={inputCls()}
                placeholder="e.g. RBI NBFC, SEBI Broking, IRDAI Insurance"
                value={form.regulatory_domain}
                onChange={(e) => set("regulatory_domain", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ── Employment Details ── */}
        <section className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
          <h2 className="mb-5 text-[14px] font-black uppercase tracking-widest text-[#0a1628]">Employment Details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls()}>Employment Type</label>
              <EstabizzSelect
                variant="admin"
                options={EMPLOYMENT_TYPE_OPTIONS}
                value={form.employment_type}
                onValueChange={(v) => set("employment_type", v)}
              />
            </div>
            <div>
              <label className={labelCls()}>Workplace Type</label>
              <EstabizzSelect
                variant="admin"
                options={REMOTE_POLICY_OPTIONS}
                value={form.remote_policy}
                onValueChange={(v) => set("remote_policy", v)}
              />
            </div>
            <div>
              <label className={labelCls()}>Min Experience (years)</label>
              <input
                type="number"
                min="0"
                max="50"
                className={inputCls()}
                placeholder="0"
                value={form.min_years_experience}
                onChange={(e) => set("min_years_experience", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls()}>Max Experience (years)</label>
              <input
                type="number"
                min="0"
                max="50"
                className={inputCls()}
                placeholder="—"
                value={form.max_years_experience}
                onChange={(e) => set("max_years_experience", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls()}>Application Deadline</label>
              <input
                type="date"
                className={inputCls()}
                value={form.closes_at}
                onChange={(e) => set("closes_at", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ── Salary (optional) ── */}
        <section className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
          <h2 className="mb-5 text-[14px] font-black uppercase tracking-widest text-[#0a1628]">Salary (Optional)</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelCls()}>Min (LPA)</label>
              <input
                type="number"
                min="0"
                className={inputCls()}
                placeholder="—"
                value={form.salary_min}
                onChange={(e) => set("salary_min", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls()}>Max (LPA)</label>
              <input
                type="number"
                min="0"
                className={inputCls()}
                placeholder="—"
                value={form.salary_max}
                onChange={(e) => set("salary_max", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls()}>Currency</label>
              <input
                className={inputCls()}
                placeholder="INR"
                value={form.salary_currency}
                onChange={(e) => set("salary_currency", e.target.value)}
                maxLength={3}
              />
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.salary_disclosed}
              onChange={(e) => set("salary_disclosed", e.target.checked)}
              className="h-4 w-4 rounded border-[#dbe7f3] text-[#1677f2]"
            />
            <span className="text-[13px] text-[#334155]">Show salary publicly</span>
          </label>
        </section>

        {/* ── Description ── */}
        <section className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
          <h2 className="mb-5 text-[14px] font-black uppercase tracking-widest text-[#0a1628]">Job Description *</h2>
          <textarea
            rows={6}
            className={textareaCls()}
            placeholder="Overview of the role and what the candidate will do..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </section>

        {/* ── Structured Content ── */}
        <section className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
          <h2 className="mb-5 text-[14px] font-black uppercase tracking-widest text-[#0a1628]">Structured Content</h2>
          <div className="space-y-5">
            <div>
              <label className={labelCls()}>Responsibilities</label>
              <textarea
                rows={5}
                className={textareaCls()}
                placeholder="• Advise clients on RBI NBFC regulations&#10;• Prepare compliance reports&#10;• ..."
                value={form.responsibilities}
                onChange={(e) => set("responsibilities", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls()}>Requirements</label>
              <textarea
                rows={5}
                className={textareaCls()}
                placeholder="• LLB or CS from recognised institution&#10;• 3+ years in regulatory compliance&#10;• ..."
                value={form.requirements_text}
                onChange={(e) => set("requirements_text", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls()}>Qualification</label>
              <textarea
                rows={3}
                className={textareaCls()}
                placeholder="e.g. LLB / CS / MBA in Finance preferred"
                value={form.qualification}
                onChange={(e) => set("qualification", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls()}>Skills (comma-separated)</label>
              <input
                className={inputCls()}
                placeholder="RBI Regulations, NBFC Compliance, Company Law, MS Excel"
                value={form.skills_list}
                onChange={(e) => set("skills_list", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ── Publishing ── */}
        <section className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
          <h2 className="mb-5 text-[14px] font-black uppercase tracking-widest text-[#0a1628]">Publishing</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls()}>Status</label>
              <EstabizzSelect
                variant="admin"
                options={STATUS_OPTIONS}
                value={form.status}
                onValueChange={(v) => set("status", v)}
              />
            </div>
            <div className="flex items-center pt-7">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.is_public}
                  onChange={(e) => set("is_public", e.target.checked)}
                  className="h-4 w-4 rounded border-[#dbe7f3] text-[#1677f2]"
                />
                <span className="text-[13px] font-bold text-[#334155]">Show on public jobs page</span>
              </label>
            </div>
          </div>
        </section>

        {/* ── Internal Notes ── */}
        <section className="rounded-2xl border border-[#dbe7f3] bg-white p-6">
          <h2 className="mb-5 text-[14px] font-black uppercase tracking-widest text-[#0a1628]">Internal Notes</h2>
          <textarea
            rows={3}
            className={textareaCls()}
            placeholder="Internal notes (not shown publicly)..."
            value={form.internal_notes}
            onChange={(e) => set("internal_notes", e.target.value)}
          />
        </section>

        {/* ── Actions ── */}
        <div className="flex flex-wrap items-center gap-3 pb-16">
          <button
            type="button"
            disabled={saving}
            onClick={() => save("draft")}
            className="rounded-xl border border-[#dbe7f3] bg-white px-6 py-3 text-[13.5px] font-black text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save()}
            className="rounded-xl bg-[#0a1628] px-6 py-3 text-[13.5px] font-black text-white hover:bg-[#1677f2] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {form.status !== "open" && (
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setForm((p) => ({ ...p, status: "open", is_public: true }));
                save("open");
              }}
              className="rounded-xl bg-emerald-600 px-6 py-3 text-[13.5px] font-black text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              Publish Job
            </button>
          )}
          {form.status === "open" && (
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setForm((p) => ({ ...p, status: "closed", is_public: false }));
                save("closed");
              }}
              className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-[13.5px] font-black text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              Close Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
