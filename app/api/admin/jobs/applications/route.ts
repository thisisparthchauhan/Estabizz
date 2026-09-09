import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { listApplicationsForAdmin } from "@/lib/jobs/applicationManagement/repository";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const applications = await listApplicationsForAdmin();
    return NextResponse.json({ applications });
  } catch (err) {
    console.error("[admin/applications GET]", err);
    return NextResponse.json({ error: "Failed to load applications." }, { status: 500 });
  }
}
