import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { listRecycleBinItems } from '@/lib/content/recycleBin';
import type { RecycleBinFilters } from '@/lib/content/recycleBinTypes';

// ── GET /api/admin/recycle-bin ─────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  const p = req.nextUrl.searchParams;
  const filters: RecycleBinFilters = {
    type:      p.get('type')      ?? 'all',
    search:    p.get('search')    ?? '',
    removedBy: p.get('removedBy') ?? '',
    from:      p.get('from')      ?? '',
    to:        p.get('to')        ?? '',
    page:      Number(p.get('page')  ?? 1),
    limit:     Number(p.get('limit') ?? 25),
  };

  try {
    const result = await listRecycleBinItems(filters);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[recycle-bin] GET error:', err);
    return NextResponse.json({ error: 'Unable to load Recycle Bin.' }, { status: 500 });
  }
}
