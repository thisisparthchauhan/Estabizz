import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import {
  listUpdatesForAdmin, createUpdate, RegulatoryValidationError,
} from '@/lib/regulatory/repository';
import type { RegulatoryUpdateInput } from '@/lib/regulatory/types';

// ── GET /api/admin/regulatory-updates — list (with search & filters) ──────────

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  const p = req.nextUrl.searchParams;
  try {
    const items = await listUpdatesForAdmin({
      search:      p.get('search') ?? '',
      regulator:   p.get('regulator') ?? 'all',
      category:    p.get('category') ?? 'all',
      status:      p.get('status') ?? 'all',
      impactLevel: p.get('impactLevel') ?? 'all',
    });
    return NextResponse.json({ items });
  } catch (err) {
    console.error('[admin/regulatory-updates] GET error:', err);
    return NextResponse.json({ error: 'Unable to load regulatory updates.' }, { status: 500 });
  }
}

// ── POST /api/admin/regulatory-updates — create a draft ───────────────────────

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'manage_content');
  if (!auth.ok) return auth.response;

  try {
    const body = (await req.json()) as RegulatoryUpdateInput;
    const record = await createUpdate(body, auth.admin.email, auth.admin.role);
    return NextResponse.json({ success: true, item: record });
  } catch (err) {
    if (err instanceof RegulatoryValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/regulatory-updates] POST error:', err);
    return NextResponse.json({ error: 'Unable to create the update.' }, { status: 500 });
  }
}
