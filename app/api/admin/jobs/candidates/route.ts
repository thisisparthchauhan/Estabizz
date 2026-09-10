import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { listCandidatesForAdminPaginated } from "@/lib/jobs/candidateManagement/repository";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "25", 10) || 25));
    const search = searchParams.get("search") ?? "";
    const city = searchParams.get("city") ?? "";
    const expFilter = searchParams.get("expFilter") ?? "";

    const result = await listCandidatesForAdminPaginated({ page, pageSize, search, city, expFilter });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[admin/candidates GET]", err);
    return NextResponse.json({ error: "Failed to load candidates." }, { status: 500 });
  }
}
