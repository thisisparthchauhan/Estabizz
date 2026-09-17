import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import {
  listJobsForAdmin,
  createJob,
  ensureAdminIdentityRef,
} from "@/lib/jobs/jobManagement/repository";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";
import type { JobStatus, RemotePolicy, JobEmploymentType } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const jobs = await listJobsForAdmin();
    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("[admin/jobs GET]", err);
    return NextResponse.json({ error: "Failed to load jobs." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const body = await req.json();

    const {
      title,
      slug,
      department,
      location_text,
      description,
      status,
      is_public,
      employment_type,
      remote_policy,
      min_years_experience,
      max_years_experience,
      salary_min,
      salary_max,
      salary_currency,
      salary_disclosed,
      closes_at,
      structured_requirements,
      internal_notes,
    } = body;

    if (!title?.trim()) return NextResponse.json({ error: "Title is required." }, { status: 400 });
    if (!slug?.trim()) return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    if (!description?.trim()) return NextResponse.json({ error: "Description is required." }, { status: 400 });

    const created_by_ref_id = await ensureAdminIdentityRef(
      auth.admin.email,
      auth.admin.email
    );

    const job = await createJob({
      title: title.trim(),
      slug: slug.trim(),
      department: department?.trim() || undefined,
      location_text: location_text?.trim() || undefined,
      description: description.trim(),
      status: (status as JobStatus) ?? "draft",
      is_public: Boolean(is_public),
      employment_type: employment_type as JobEmploymentType | undefined,
      remote_policy: remote_policy as RemotePolicy | undefined,
      min_years_experience: min_years_experience ? Number(min_years_experience) : undefined,
      max_years_experience: max_years_experience ? Number(max_years_experience) : undefined,
      salary_min: salary_min ? Number(salary_min) : undefined,
      salary_max: salary_max ? Number(salary_max) : undefined,
      salary_currency: salary_currency?.trim() || undefined,
      salary_disclosed: Boolean(salary_disclosed),
      closes_at: closes_at || undefined,
      structured_requirements,
      internal_notes: internal_notes?.trim() || undefined,
      created_by_ref_id,
    });

    await recordJobsAuditEvent({
      entityType: "job",
      entityId: job.id,
      action: "job.created",
      actorType: "admin_user",
      actorRefId: created_by_ref_id ?? undefined,
      metadata: { title: job.title, slug: job.slug, status: job.status },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (err: unknown) {
    console.error("[admin/jobs POST]", err);
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint") && msg.includes("slug")) {
      return NextResponse.json({ error: "A job with this slug already exists." }, { status: 409 });
    }
    if (msg.includes("Unique constraint") && msg.includes("job_code")) {
      return NextResponse.json({ error: "Job code collision — please retry." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
  }
}
