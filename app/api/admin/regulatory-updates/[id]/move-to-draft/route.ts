import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { moveToDraft, RegulatoryValidationError } from '@/lib/regulatory/repository';
import { revalidatePath } from 'next/cache';

// ── POST /api/admin/regulatory-updates/[id]/move-to-draft — unpublish to draft ─

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'publish_content');
  if (!auth.ok) return auth.response;

  const { id } = await params;
  try {
    const record = await moveToDraft(id, auth.admin.email, auth.admin.role);
    // Moving to draft removes it from the public site — refresh public pages.
    revalidatePath('/resources/regulatory-updates');
    if (record.slug) revalidatePath(`/resources/regulatory-updates/${record.slug}`);
    return NextResponse.json({ success: true, item: record });
  } catch (err) {
    if (err instanceof RegulatoryValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/regulatory-updates/:id/move-to-draft] error:', err);
    return NextResponse.json({ error: 'Unable to move the update to Draft.' }, { status: 500 });
  }
}
