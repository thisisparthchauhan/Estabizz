import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { resetAdminPasswordById } from '@/lib/admin/repository';

// ── POST /api/admin/users/[id]/reset-password ──────────────────────────────

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requirePermission(req, 'manage_users');
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    const body            = await req.json() as Record<string, unknown>;
    const password        = String(body.password        ?? '').trim();
    const confirmPassword = String(body.confirmPassword ?? '').trim();

    if (!password) {
      return NextResponse.json({ error: 'New password is required.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }

    await resetAdminPasswordById(id, password);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/users/:id/reset-password] POST error:', err);
    const msg = err instanceof Error ? err.message : '';
    return NextResponse.json(
      { error: msg || 'Unable to reset password.' },
      { status: 400 }
    );
  }
}
