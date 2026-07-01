import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { listChangeHistory } from '@/lib/content/changeHistory';
import type { ChangeHistoryFilters } from '@/lib/content/changeHistoryTypes';

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, 'view_admin');
    if (!auth.ok) return auth.response;

    const params = req.nextUrl.searchParams;
    const filters: ChangeHistoryFilters = {
      page: Number(params.get('page') ?? 1),
      limit: Number(params.get('limit') ?? 25),
      status: params.get('status') ?? 'all',
      type: params.get('type') ?? 'all',
      changedBy: params.get('changedBy') ?? '',
      search: params.get('search') ?? '',
      from: params.get('from') ?? '',
      to: params.get('to') ?? '',
    };

    const result = await listChangeHistory(auth.admin, filters);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[change-history] Error:', err);
    return NextResponse.json({ error: 'Unable to load change history.' }, { status: 500 });
  }
}
