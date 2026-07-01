import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { listRestoreVersions } from '@/lib/content/restore';
import type { RestoreFilters } from '@/lib/content/restoreTypes';

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, 'view_admin');
    if (!auth.ok) return auth.response;

    const params = req.nextUrl.searchParams;
    const filters: RestoreFilters = {
      page: Number(params.get('page') ?? 1),
      limit: Number(params.get('limit') ?? 25),
      type: params.get('type') ?? 'all',
      changedBy: params.get('changedBy') ?? '',
      search: params.get('search') ?? '',
      from: params.get('from') ?? '',
      to: params.get('to') ?? '',
      versionId: params.get('versionId') ?? '',
    };

    const result = await listRestoreVersions(auth.admin, filters);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[restore] Error:', err);
    return NextResponse.json({ error: 'Unable to load previous versions.' }, { status: 500 });
  }
}
