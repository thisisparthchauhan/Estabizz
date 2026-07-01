import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { submitForReview, RegulatoryValidationError } from '@/lib/regulatory/repository';

// ── POST /api/admin/regulatory-updates/[id]/submit — send for review ──────────

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'manage_content');
  if (!auth.ok) return auth.response;

  const { id } = await params;
  try {
    const record = await submitForReview(id, auth.admin.email, auth.admin.role);
    return NextResponse.json({ success: true, item: record });
  } catch (err) {
    if (err instanceof RegulatoryValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/regulatory-updates/:id/submit] error:', err);
    return NextResponse.json({ error: 'Unable to submit for review.' }, { status: 500 });
  }
}
