import { NextResponse } from "next/server";
import { listPublicJobs } from "@/lib/jobs/jobManagement/repository";
import { isJobsDatabaseConfigured } from "@/lib/jobs/launchFlags";

export const dynamic = "force-dynamic";

export async function GET() {
  // Checked before the throwing call, not caught after -- see
  // lib/jobs/launchFlags.ts. An empty list with dbConfigured:false is honest
  // (no jobs exist to return, because there is no database to read from yet)
  // without pretending a genuine future connection failure is the same thing.
  if (!isJobsDatabaseConfigured()) {
    return NextResponse.json({ jobs: [], dbConfigured: false });
  }

  try {
    const jobs = await listPublicJobs();
    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("[api/jobs GET]", err);
    return NextResponse.json({ error: "Failed to load jobs." }, { status: 500 });
  }
}
