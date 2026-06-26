import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/lib/admin/requirePermission';
import { approvePendingPublicContentPageChanges } from '@/lib/publicContent/repository';
import { isManagedPublicContentPath } from '@/lib/publicContent/managedPaths';

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'publish_content');
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const bodyObj = body as Record<string, unknown>;
  const fullPath = typeof bodyObj.fullPath === 'string' ? bodyObj.fullPath.trim() : '';
  if (!isManagedPublicContentPath(fullPath)) {
    return NextResponse.json({ error: 'Approval is available for managed content pages only.' }, { status: 400 });
  }

  const comment = typeof bodyObj.comment === 'string' ? bodyObj.comment.trim() : '';

  try {
    await approvePendingPublicContentPageChanges(fullPath, auth.admin.email, comment);
    revalidatePath(fullPath);
    return NextResponse.json({ ok: true, message: 'Pending changes approved and published.' });
  } catch (err) {
    console.error('[content-pages/by-path/approve] POST error:', err);
    const message = err instanceof Error ? err.message : 'Unable to approve changes.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
