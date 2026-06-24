/**
 * POST /api/admin/content/save
 * Saves a content block.
 *
 * Workflow:
 *   • super_admin / admin  → publishes instantly (goes live).
 *   • editor / staff       → saved as pending_approval (awaits admin approval).
 *
 * Body: { key: string, fields: Record<string, unknown> }
 *
 * Side effects: writes a ContentVersion snapshot + a ContentAudit entry, and
 * revalidates affected public routes so changes appear without a redeploy.
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/lib/admin/requirePermission';
import { saveContent } from '@/lib/content/repository';

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, 'manage_content');
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const { key, fields } = body as { key?: string; fields?: Record<string, unknown> };

    if (!key?.trim()) {
      return NextResponse.json({ error: 'Content key is required.' }, { status: 400 });
    }
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      return NextResponse.json({ error: 'Fields must be an object.' }, { status: 400 });
    }

    const result = await saveContent({
      key,
      fields,
      actorEmail: auth.admin.email,
      actorRole: auth.admin.role,
    });

    // When it goes live, refresh the public pages that read this block.
    if (result.wentLive) {
      // Footer/navbar appear in the root layout → revalidate the whole tree.
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      success: true,
      status: result.status,
      wentLive: result.wentLive,
      message: result.wentLive
        ? 'Saved and published live.'
        : 'Saved and submitted for admin approval.',
    });
  } catch (err) {
    console.error('[admin/content/save] Error:', err);
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
