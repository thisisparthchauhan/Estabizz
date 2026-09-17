import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { getRecruitmentDashboard } from "@/lib/jobs/recruitmentOps/dashboardRepository";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const data = await getRecruitmentDashboard();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[admin/dashboard GET]", err);
    return NextResponse.json({ error: "Failed to load dashboard." }, { status: 500 });
  }
}
