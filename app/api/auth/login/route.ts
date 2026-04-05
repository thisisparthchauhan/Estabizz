import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmailOrMobile } from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
    try {
        const { identifier, password } = await req.json();

        if (!identifier || !password) {
            return NextResponse.json(
                { error: 'Email/mobile and password are required.' },
                { status: 400 }
            );
        }

        const user = await findUserByEmailOrMobile(identifier.toLowerCase().trim());

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials.' },
                { status: 401 }
            );
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return NextResponse.json(
                { error: 'Invalid credentials.' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            JWT_SECRET || 'estabizz-secret-key',
            { expiresIn: '7d' }
        );

        const response = NextResponse.json({
            message: 'Login successful.',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });

        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return response;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
