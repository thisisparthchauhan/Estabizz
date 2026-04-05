import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDB } from './db';
import User, { IUser } from './models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'estabizz-secret-key';

interface JWTPayload {
    userId: string;
    email: string;
}

export async function getCurrentUser(): Promise<IUser | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;
        if (!token) return null;

        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        await connectDB();
        const user = await User.findById(decoded.userId).select('-password');
        return user;
    } catch {
        return null;
    }
}

export async function requireAuth(): Promise<IUser> {
    const user = await getCurrentUser();
    if (!user) throw new Error('Unauthorized');
    return user;
}

export async function requireAdmin(): Promise<IUser> {
    const user = await requireAuth();
    if (user.role !== 'admin') throw new Error('Forbidden');
    return user;
}
