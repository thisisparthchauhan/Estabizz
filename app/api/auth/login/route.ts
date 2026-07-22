import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import {
    limitRequest,
    getClientIp,
    rateLimitResponse,
    hashIdentifier,
} from '@/lib/security/rateLimit';

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined.');
    }
    return secret;
}

// Maximum body size accepted (identifier + password, with overhead).
const MAX_BODY_BYTES = 8_192;

export async function POST(req: NextRequest) {
    try {
        // ── Body size guard ────────────────────────────────────────────────────
        const contentLength = req.headers.get('content-length');
        if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
            return NextResponse.json(
                { error: 'Request body too large.' },
                { status: 413 }
            );
        }

        const body = await req.json();
        const { identifier, password } = body;

        if (!identifier || !password) {
            return NextResponse.json(
                { error: 'Email/mobile and password are required.' },
                { status: 400 }
            );
        }

        // ── Rate limiting ──────────────────────────────────────────────────────
        // Applied before DB queries to reject cheap-to-check requests early.
        // Policy: fail-open — a temporary Upstash outage allows requests through
        // rather than locking out all users. Store errors are logged server-side.
        //
        // Two buckets are checked in parallel:
        //   1. Per-IP:         5 attempts per 15 minutes.
        //   2. Per-identifier: 10 attempts per 30 minutes (hashed, not raw).
        //
        // All attempts are counted (not just failures). This avoids timing attacks
        // that would otherwise distinguish success from failure.

        const ip = getClientIp(req);
        const idHash = hashIdentifier(String(identifier));

        const [ipResult, idResult] = await Promise.all([
            limitRequest(
                { namespace: 'auth-login-ip', identifier: ip, limit: 5, windowSeconds: 900 },
                'fail-open'
            ),
            limitRequest(
                { namespace: 'auth-login-id', identifier: idHash, limit: 10, windowSeconds: 1800 },
                'fail-open'
            ),
        ]);

        if (!ipResult.allowed) {
            return rateLimitResponse(ipResult, 'Too many login attempts. Please try again later.');
        }
        if (!idResult.allowed) {
            return rateLimitResponse(idResult, 'Too many login attempts. Please try again later.');
        }

        // ── Authentication ─────────────────────────────────────────────────────
        await connectDB();

        // Find by email or mobile — unchanged behaviour.
        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase().trim() },
                { mobile: identifier.trim() },
            ],
        });

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
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            getJwtSecret(),
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
            maxAge: 60 * 60 * 24 * 7, // 7 days
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
