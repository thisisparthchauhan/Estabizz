/**
 * GET /api/admin/content
 * Lists every known content block (defaults + any live DB overrides) for the
 * admin content index.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { listContentBlocks } from '@/lib/content/repository';

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, 'manage_content');
    if (!auth.ok) return auth.response;

    const blocks = await listContentBlocks();
    return NextResponse.json({ blocks });
  } catch (err) {
    console.error('[admin/content GET] Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
