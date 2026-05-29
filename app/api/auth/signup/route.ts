import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { isAdminEmail } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, email, mobile, password } = await req.json();

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { error: 'First name, last name, email and password are required.' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters.' },
                { status: 400 }
            );
        }

        if (isAdminEmail(email)) {
            return NextResponse.json(
                { error: 'This email is reserved for Estabizz admin access. Please ask the site administrator to create this account securely.' },
                { status: 403 }
            );
        }

        await connectDB();

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return NextResponse.json(
                { error: 'An account with this email already exists.' },
                { status: 409 }
            );
        }

        const hashed = await bcrypt.hash(password, 12);

        await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            mobile: mobile?.trim() || undefined,
            password: hashed,
        });

        return NextResponse.json(
            { message: 'Account created successfully.' },
            { status: 201 }
        );
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
