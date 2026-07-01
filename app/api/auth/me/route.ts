import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ADMIN_EMAIL_ALLOWLIST } from '@/lib/admin/seedData';

async function resolveIsAdmin(email: string): Promise<boolean> {
  // Fast path: static allowlist covers seed / legacy admin accounts.
  if (ADMIN_EMAIL_ALLOWLIST.has(email)) return true;

  // DB fallback: panel-created admin users active in admin_users collection.
  try {
    const { connectDB } = await import('@/lib/db');
    const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
    await connectDB();
    const doc = await AdminUserModel.findOne({ email, status: 'active' }).lean();
    return !!doc;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = jwt.verify(token, secret) as {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };

    const email = decoded.email.toLowerCase().trim();
    const isAdmin = await resolveIsAdmin(email);

    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        isAdmin,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
