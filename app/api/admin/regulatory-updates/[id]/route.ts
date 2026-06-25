import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import {
  getUpdateForAdmin, updateUpdate, RegulatoryValidationError,
} from '@/lib/regulatory/repository';
import type { RegulatoryUpdateInput } from '@/lib/regulatory/types';

// ── GET /api/admin/regulatory-updates/[id] — single record ────────────────────

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  const { id } = await params;
  try {
    const item = await getUpdateForAdmin(id);
    if (!item) return NextResponse.json({ error: 'Update not found.' }, { status: 404 });
    return NextResponse.json({ item });
  } catch (err) {
    console.error('[admin/regulatory-updates/:id] GET error:', err);
    return NextResponse.json({ error: 'Unable to load the update.' }, { status: 500 });
  }
}

// ── PATCH /api/admin/regulatory-updates/[id] — edit fields ────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'manage_content');
  if (!auth.ok) return auth.response;

  const { id } = await params;
  try {
    const body = (await req.json()) as RegulatoryUpdateInput;
    const canPublish = auth.admin.permissions.includes('publish_content');
    const record = await updateUpdate(id, body, auth.admin.email, auth.admin.role, canPublish);
    return NextResponse.json({ success: true, item: record });
  } catch (err) {
    if (err instanceof RegulatoryValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/regulatory-updates/:id] PATCH error:', err);
    return NextResponse.json({ error: 'Unable to update the record.' }, { status: 500 });
  }
}
