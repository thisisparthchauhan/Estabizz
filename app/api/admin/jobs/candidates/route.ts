import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { listCandidatesForAdmin } from "@/lib/jobs/candidateManagement/repository";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const candidates = await listCandidatesForAdmin();
    return NextResponse.json({ candidates });
  } catch (err) {
    console.error("[admin/candidates GET]", err);
    return NextResponse.json({ error: "Failed to load candidates." }, { status: 500 });
  }
}
