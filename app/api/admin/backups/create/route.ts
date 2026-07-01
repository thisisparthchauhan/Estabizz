import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { createBackup } from '@/lib/content/backup';

// ── POST /api/admin/backups/create ────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'manage_backups');
  if (!auth.ok) return auth.response;

  try {
    const record = await createBackup(auth.admin.email, auth.admin.role);
    return NextResponse.json({ success: true, record });
  } catch (err) {
    console.error('[backups/create] POST error:', err);
    const msg = err instanceof Error ? err.message : '';
    return NextResponse.json({ error: msg || 'Unable to create backup.' }, { status: 500 });
  }
}
