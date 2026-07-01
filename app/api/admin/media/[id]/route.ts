import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requirePermission } from '@/lib/admin/requirePermission';
import MediaAsset from '@/lib/models/MediaAsset';

// ── PATCH /api/admin/media/[id] — edit title, alt text, caption, tags ─────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'manage_media');
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    const body = await req.json() as Record<string, unknown>;
    const updates: Record<string, unknown> = {};

    if (body.title   !== undefined) updates.title   = String(body.title).trim();
    if (body.altText !== undefined) updates.altText = String(body.altText).trim();
    if (body.caption !== undefined) updates.caption = String(body.caption).trim();
    if (body.tags    !== undefined) {
      updates.tags = Array.isArray(body.tags) ? (body.tags as unknown[]).map(String) : [];
    }

    await connectDB();

    const updated = await MediaAsset.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, asset: updated });
  } catch (err) {
    console.error('[admin/media/:id] PATCH error:', err);
    return NextResponse.json({ error: 'Unable to update media details.' }, { status: 500 });
  }
}

// ── DELETE /api/admin/media/[id] — soft remove (status → removed) ─────────

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'delete_content');
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    await connectDB();

    const updated = await MediaAsset.findByIdAndUpdate(
      id,
      { $set: { status: 'removed' } },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/media/:id] DELETE error:', err);
    return NextResponse.json({ error: 'Unable to remove file.' }, { status: 500 });
  }
}
