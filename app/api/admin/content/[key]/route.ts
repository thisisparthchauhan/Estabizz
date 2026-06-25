/**
 * GET /api/admin/content/[key]
 * Returns a single content block (current values merged over defaults) for the
 * editor form.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { getContentForEdit } from '@/lib/content/repository';
import type { AdminPermission } from '@/lib/admin/types';

type Params = { params: Promise<{ key: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { key } = await params;
    const decodedKey = decodeURIComponent(key);
    const permission: AdminPermission = decodedKey.startsWith('seo.') ? 'manage_seo' : 'manage_content';
    const auth = await requirePermission(req, permission);
    if (!auth.ok) return auth.response;

    const block = await getContentForEdit(decodedKey);

    if (!block) {
      return NextResponse.json({ error: 'Unknown content block.' }, { status: 404 });
    }

    return NextResponse.json({ block });
  } catch (err) {
    console.error('[admin/content/[key] GET] Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
