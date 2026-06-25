import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { purgeRecycleBinItem } from '@/lib/content/recycleBin';

const REQUIRED_CONFIRMATION = 'DELETE';
const VALID_TYPES = new Set(['media', 'content', 'regulatory']);

// ── POST /api/admin/recycle-bin/purge ─────────────────────────────────────

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'purge_content');
  if (!auth.ok) return auth.response;

  try {
    const body        = await req.json() as Record<string, unknown>;
    const id          = String(body.id          ?? '').trim();
    const type        = String(body.type        ?? '') as 'media' | 'content' | 'regulatory';
    const confirmText = String(body.confirmText ?? '').trim().toUpperCase();

    if (!id)                                    return NextResponse.json({ error: 'Item ID is required.'                        }, { status: 400 });
    if (!VALID_TYPES.has(type))                 return NextResponse.json({ error: 'Unsupported item type.'                      }, { status: 400 });
    if (confirmText !== REQUIRED_CONFIRMATION)  return NextResponse.json({ error: 'Type DELETE to confirm permanent deletion.'  }, { status: 400 });

    const result = await purgeRecycleBinItem(auth.admin.email, id, type, auth.admin.role);
    return NextResponse.json({ success: true, name: result.name });
  } catch (err) {
    console.error('[recycle-bin/purge] POST error:', err);
    const msg = err instanceof Error ? err.message : '';
    return NextResponse.json({ error: msg || 'Unable to permanently delete item.' }, { status: 400 });
  }
}
