import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }
        return NextResponse.json({
            user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
            },
        });
    } catch {
        return NextResponse.json({ user: null });
    }
}
