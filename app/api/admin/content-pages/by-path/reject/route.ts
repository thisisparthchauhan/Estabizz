import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { rejectPendingPublicContentPageChanges } from '@/lib/publicContent/repository';

const SAMPLE_FULL_PATH = '/rbi/nbfc-registration-in-india';

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
  if (fullPath !== SAMPLE_FULL_PATH) {
    return NextResponse.json({ error: 'Rejection is available for the sample page only.' }, { status: 400 });
  }

  const comment = typeof bodyObj.comment === 'string' ? bodyObj.comment.trim() : '';
  if (!comment) {
    return NextResponse.json({ error: 'A reviewer comment is required to reject changes.' }, { status: 400 });
  }

  try {
    await rejectPendingPublicContentPageChanges(SAMPLE_FULL_PATH, comment);
    return NextResponse.json({ ok: true, message: 'Pending changes rejected.' });
  } catch (err) {
    console.error('[content-pages/by-path/reject] POST error:', err);
    const message = err instanceof Error ? err.message : 'Unable to reject changes.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
