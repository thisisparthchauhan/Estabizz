import { NextResponse } from 'next/server';
import { listPublishedUpdates } from '@/lib/regulatory/repository';
export const dynamic = 'force-dynamic';

// ── GET /api/regulatory-updates — PUBLIC. Published updates only. ─────────────
// Never exposes drafts, pending, rejected or archived items.

export async function GET() {
  try {
    const items = await listPublishedUpdates();
    return NextResponse.json({ items });
  } catch (err) {
    console.error('[public/regulatory-updates] GET error:', err);
    return NextResponse.json({ items: [] });
  }
}
