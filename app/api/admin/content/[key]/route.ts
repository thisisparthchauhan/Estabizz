/**
 * GET /api/admin/content/[key]
 * Returns a single content block (current values merged over defaults) for the
 * editor form.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { getContentForEdit } from '@/lib/content/repository';

type Params = { params: Promise<{ key: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, 'manage_content');
    if (!auth.ok) return auth.response;

    const { key } = await params;
    const block = await getContentForEdit(decodeURIComponent(key));

    if (!block) {
      return NextResponse.json({ error: 'Unknown content block.' }, { status: 404 });
    }

    return NextResponse.json({ block });
  } catch (err) {
    console.error('[admin/content/[key] GET] Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
