import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import {
  getJobForAdmin,
  updateJob,
  softDeleteJob,
} from "@/lib/jobs/jobManagement/repository";
import type { JobStatus, RemotePolicy, JobEmploymentType } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const job = await getJobForAdmin(id);
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

    return NextResponse.json({ job });
  } catch (err) {
    console.error("[admin/jobs/[id] GET]", err);
    return NextResponse.json({ error: "Failed to load job." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
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

    const job = await updateJob(id, {
      title: title.trim(),
      slug: slug.trim(),
      department: department?.trim() || undefined,
      location_text: location_text?.trim() || undefined,
      description: description.trim(),
      status: status as JobStatus,
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
    });

    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
    return NextResponse.json({ job });
  } catch (err: unknown) {
    console.error("[admin/jobs/[id] PUT]", err);
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint") && msg.includes("slug")) {
      return NextResponse.json({ error: "A job with this slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update job." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const removed = await softDeleteJob(id);
    if (!removed) return NextResponse.json({ error: "Job not found." }, { status: 404 });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[admin/jobs/[id] DELETE]", err);
    return NextResponse.json({ error: "Failed to delete job." }, { status: 500 });
  }
}
