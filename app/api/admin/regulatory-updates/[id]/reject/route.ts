import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { rejectUpdate, RegulatoryValidationError } from '@/lib/regulatory/repository';

// ── POST /api/admin/regulatory-updates/[id]/reject — send back with comment ───

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'publish_content');
  if (!auth.ok) return auth.response;

  const { id } = await params;
  try {
    const body = (await req.json().catch(() => ({}))) as { comment?: string };
    const record = await rejectUpdate(id, auth.admin.email, auth.admin.role, body.comment ?? '');
    return NextResponse.json({ success: true, item: record });
  } catch (err) {
    if (err instanceof RegulatoryValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/regulatory-updates/:id/reject] error:', err);
    return NextResponse.json({ error: 'Unable to reject the update.' }, { status: 500 });
  }
}
