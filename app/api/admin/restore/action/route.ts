import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/lib/admin/requirePermission';
import { restoreContentVersion } from '@/lib/content/restore';

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, 'view_admin');
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const versionId = typeof body.versionId === 'string' ? body.versionId.trim() : '';
    if (!versionId) {
      return NextResponse.json({ error: 'Please choose a version to restore.' }, { status: 400 });
    }

    const result = await restoreContentVersion(auth.admin, versionId);
    revalidatePath(result.pagePath || '/', 'layout');
    return NextResponse.json(result);
  } catch (err) {
    console.error('[restore/action] Error:', err);
    const message = err instanceof Error ? err.message : 'Unable to restore this version.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
