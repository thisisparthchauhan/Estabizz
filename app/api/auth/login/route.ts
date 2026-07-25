import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import {
    limitRequest,
    isRateLimitConfigured,
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
        // ── Production rate-limit config gate ──────────────────────────────────
        // In production the in-memory fallback is not safe across serverless
        // replicas. Return 503 immediately if Upstash is not configured.
        // Fail-open applies only to runtime Upstash failures on a configured
        // store — not to missing configuration.
        if (!isRateLimitConfigured()) {
            return NextResponse.json(
                { error: 'This service is temporarily unavailable.' },
                { status: 503, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        // ── Body size enforcement (actual bytes) ───────────────────────────────
        // Read the raw body so byteLength is authoritative. Content-Length is
        // untrusted: it can be missing or deliberately set to a false small value.
        const bodyBuffer = await req.arrayBuffer();
        if (bodyBuffer.byteLength > MAX_BODY_BYTES) {
            return NextResponse.json(
                { error: 'Request body too large.' },
                { status: 413 }
            );
        }

        let body;
        try {
            body = JSON.parse(new TextDecoder().decode(bodyBuffer));
        } catch {
            return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
        }

        const { identifier, password } = body;

        if (!identifier || !password) {
            return NextResponse.json(
                { error: 'Email/mobile and password are required.' },
                { status: 400 }
            );
        }

        // ── Rate limiting ──────────────────────────────────────────────────────
        // Body must be read first so the identifier can be hashed for bucket 2.
        // Fail-open applies only to runtime Upstash failures when the store is
        // properly configured. Missing production config is gated above by
        // isRateLimitConfigured() and never reaches here.
        //
        // Bucket 1 — per-IP:         5 attempts per 15 minutes.
        // Bucket 2 — per-identifier: 10 attempts per 30 minutes (hashed, not raw).
        // Both buckets run in parallel; all attempts counted (not only failures)
        // to prevent timing attacks that distinguish hit from miss.
        //
        // Unknown IP in production would share one bucket across all clients —
        // a brute-force window and DoS vector. Return 503 to prevent that risk.
        const ip = getClientIp(req);
        if (ip === 'unknown' && process.env.NODE_ENV === 'production') {
            return NextResponse.json(
                { error: 'This service is temporarily unavailable.' },
                { status: 503, headers: { 'Cache-Control': 'no-store' } }
            );
        }

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
