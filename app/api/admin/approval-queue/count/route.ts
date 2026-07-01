import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { countPendingApprovalItems } from '@/lib/content/approvalQueue';

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, 'view_admin');
    if (!auth.ok) return auth.response;

    const count = await countPendingApprovalItems();
    return NextResponse.json({ count });
  } catch (err) {
    console.error('[approval-queue/count] Error:', err);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
