import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { deleteUpdate, RegulatoryValidationError } from '@/lib/regulatory/repository';
import { revalidatePath } from 'next/cache';

// ── POST /api/admin/regulatory-updates/[id]/delete — soft-delete to Recycle Bin ─

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'delete_content');
  if (!auth.ok) return auth.response;

  const { id } = await params;
  try {
    const record = await deleteUpdate(id, auth.admin.email, auth.admin.role);
    // It may have been live — refresh the public pages so it disappears.
    revalidatePath('/resources/regulatory-updates');
    if (record.slug) revalidatePath(`/resources/regulatory-updates/${record.slug}`);
    return NextResponse.json({ success: true, item: record });
  } catch (err) {
    if (err instanceof RegulatoryValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/regulatory-updates/:id/delete] error:', err);
    return NextResponse.json({ error: 'Unable to move the update to the Recycle Bin.' }, { status: 500 });
  }
}
