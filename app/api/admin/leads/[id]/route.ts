/**
 * PATCH /api/admin/leads/[id] — update a lead's status (admin only).
 */
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { connectDB } from '@/lib/db';
import LeadModel from '@/lib/models/Lead';

export const dynamic = 'force-dynamic';

const STATUSES = ['new', 'contacted', 'closed'];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.response;

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const status = String(body.status || '');
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: 'Invalid status.' }, { status: 400 });
  }

  try {
    await connectDB();
    const updated = await LeadModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'Lead not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error('[leads] status update failed:', err);
    return NextResponse.json({ ok: false, error: 'Update failed.' }, { status: 500 });
  }
}
