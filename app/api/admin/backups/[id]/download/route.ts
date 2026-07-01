import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { getBackupDownload } from '@/lib/content/backup';

// ── GET /api/admin/backups/[id]/download ──────────────────────────────────────

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'manage_backups');
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Backup ID is required.' }, { status: 400 });

    const result = await getBackupDownload(id);
    if (!result) return NextResponse.json({ error: 'Backup not found.' }, { status: 404 });

    return new Response(result.json, {
      headers: {
        'Content-Type':        'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${result.fileName}"`,
        'Cache-Control':       'no-store',
      },
    });
  } catch (err) {
    console.error('[backups/download] GET error:', err);
    return NextResponse.json({ error: 'Unable to download backup.' }, { status: 500 });
  }
}
