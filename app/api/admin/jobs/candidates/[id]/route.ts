import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { getCandidateForAdmin } from "@/lib/jobs/candidateManagement/repository";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const candidate = await getCandidateForAdmin(id);
    if (!candidate) return NextResponse.json({ error: "Not found." }, { status: 404 });

    return NextResponse.json({ candidate });
  } catch (err) {
    console.error("[admin/candidates/[id] GET]", err);
    return NextResponse.json({ error: "Failed to load candidate." }, { status: 500 });
  }
}
