import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { discoverExistingPublicContentPages } from '@/lib/publicContent/discovery.mjs';

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  try {
    const inventory = await discoverExistingPublicContentPages();
    return NextResponse.json(inventory);
  } catch (err) {
    console.error('[admin/content-pages/inventory] GET error:', err);
    return NextResponse.json({ error: 'Unable to load content pages inventory.' }, { status: 500 });
  }
}
