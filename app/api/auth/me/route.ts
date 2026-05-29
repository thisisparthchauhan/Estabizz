import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ADMIN_EMAIL_ALLOWLIST } from '@/lib/admin/seedData';

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

        const isAdmin = ADMIN_EMAIL_ALLOWLIST.has(decoded.email.toLowerCase());

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
