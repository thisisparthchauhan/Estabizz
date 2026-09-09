import { NextResponse } from "next/server";
import { listPublicJobs } from "@/lib/jobs/jobManagement/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jobs = await listPublicJobs();
    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("[api/jobs GET]", err);
    return NextResponse.json({ error: "Failed to load jobs." }, { status: 500 });
  }
}
