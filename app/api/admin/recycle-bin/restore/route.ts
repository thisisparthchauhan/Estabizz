import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { restoreRecycleBinItem } from '@/lib/content/recycleBin';

// ── POST /api/admin/recycle-bin/restore ────────────────────────────────────

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'delete_content');
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json() as Record<string, unknown>;
    const id   = String(body.id   ?? '').trim();
    const type = String(body.type ?? '') as 'media' | 'content';

    if (!id)                                  return NextResponse.json({ error: 'Item ID is required.'              }, { status: 400 });
    if (type !== 'media' && type !== 'content') return NextResponse.json({ error: 'Item type must be media or content.' }, { status: 400 });

    const result = await restoreRecycleBinItem(auth.admin.email, id, type);
    return NextResponse.json({ success: true, name: result.name });
  } catch (err) {
    console.error('[recycle-bin/restore] POST error:', err);
    const msg = err instanceof Error ? err.message : '';
    return NextResponse.json({ error: msg || 'Unable to restore item.' }, { status: 400 });
  }
}
