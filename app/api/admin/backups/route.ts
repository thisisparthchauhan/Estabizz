import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { listBackups } from '@/lib/content/backup';

// ── GET /api/admin/backups ─────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  try {
    const p     = req.nextUrl.searchParams;
    const page  = Math.max(1, Number(p.get('page')  ?? 1));
    const limit = Math.min(50, Math.max(1, Number(p.get('limit') ?? 25)));
    const result = await listBackups(page, limit);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[backups] GET error:', err);
    return NextResponse.json({ error: 'Unable to load backup records.' }, { status: 500 });
  }
}
