import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/lib/admin/requirePermission';
import { moveSamplePublicContentPageToRecycleBin } from '@/lib/publicContent/repository';

const SAMPLE_FULL_PATH = '/rbi/nbfc-registration-in-india';

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'delete_content');
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
    return NextResponse.json({ error: 'Move to Recycle Bin is available for the sample page only.' }, { status: 400 });
  }

  try {
    const { name } = await moveSamplePublicContentPageToRecycleBin(auth.admin.email);
    revalidatePath(SAMPLE_FULL_PATH);
    return NextResponse.json({ ok: true, name, message: 'Page moved to Recycle Bin. The public page is now unavailable.' });
  } catch (err) {
    console.error('[content-pages/by-path/delete] POST error:', err);
    const message = err instanceof Error ? err.message : 'Unable to move page to Recycle Bin.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
