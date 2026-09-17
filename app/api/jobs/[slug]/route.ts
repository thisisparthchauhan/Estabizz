import { NextResponse } from "next/server";
import { getPublicJobBySlug } from "@/lib/jobs/jobManagement/repository";
import { isJobsDatabaseConfigured } from "@/lib/jobs/launchFlags";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  if (!isJobsDatabaseConfigured()) {
    return NextResponse.json({ error: "Job listings are not available yet." }, { status: 503 });
  }
  try {
    const { slug } = await params;
    const job = await getPublicJobBySlug(slug);
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
    return NextResponse.json({ job });
  } catch (err) {
    console.error("[api/jobs/[slug] GET]", err);
    return NextResponse.json({ error: "Failed to load job." }, { status: 500 });
  }
}
