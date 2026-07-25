import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import {
    limitRequest,
    isRateLimitConfigured,
    getClientIp,
    rateLimitResponse,
    hashIdentifier,
} from '@/lib/security/rateLimit';

// Maximum body size: names + email + mobile + password, with JSON overhead.
const MAX_BODY_BYTES = 8_192;

export async function POST(req: NextRequest) {
    try {
        // ── Production rate-limit config gate ──────────────────────────────────
        // In production the in-memory fallback is not safe across serverless
        // replicas. Return 503 immediately if Upstash is not configured.
        if (!isRateLimitConfigured()) {
            return NextResponse.json(
                { error: 'This service is temporarily unavailable.' },
                { status: 503, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        // ── Client IP ──────────────────────────────────────────────────────────
        // Unknown IP in production would share one bucket across all clients —
        // a brute-force window and DoS vector. Return 503 to prevent that risk.
        const ip = getClientIp(req);
        if (ip === 'unknown' && process.env.NODE_ENV === 'production') {
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
                { status: 413, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        let body: {
            firstName?: unknown;
            lastName?: unknown;
            email?: unknown;
            mobile?: unknown;
            password?: unknown;
        };
        try {
            body = JSON.parse(new TextDecoder().decode(bodyBuffer));
        } catch {
            return NextResponse.json(
                { error: 'Invalid JSON.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        const { firstName, lastName, email, mobile, password } = body;

        // ── Field validation (cheap, before Redis + bcrypt) ────────────────────
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { error: 'First name, last name, email and password are required.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        if (typeof password !== 'string' || password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        // ── Rate limiting ──────────────────────────────────────────────────────
        // Bucket 1 — per-IP:    5 signups per 15 minutes.
        // Bucket 2 — per-email: 3 signups per 60 minutes (hashed, not raw).
        // Both buckets run in parallel; all attempts counted (not only failures)
        // to prevent timing attacks that distinguish hit from miss.
        const emailHash = hashIdentifier(String(email));

        const [ipResult, emailResult] = await Promise.all([
            limitRequest(
                { namespace: 'auth-signup-ip', identifier: ip, limit: 5, windowSeconds: 900 },
                'fail-open'
            ),
            limitRequest(
                { namespace: 'auth-signup-email', identifier: emailHash, limit: 3, windowSeconds: 3600 },
                'fail-open'
            ),
        ]);

        if (ipResult.configMissing || emailResult.configMissing) {
            return NextResponse.json(
                { error: 'This service is temporarily unavailable.' },
                { status: 503, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        if (!ipResult.allowed) {
            return rateLimitResponse(ipResult, 'Too many signup attempts. Please try again later.');
        }
        if (!emailResult.allowed) {
            return rateLimitResponse(emailResult, 'Too many signup attempts. Please try again later.');
        }

        // ── Account creation ───────────────────────────────────────────────────
        await connectDB();

        const existing = await User.findOne({ email: String(email).toLowerCase() });
        if (existing) {
            return NextResponse.json(
                { error: 'An account with this email already exists.' },
                { status: 409, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        const hashed = await bcrypt.hash(String(password), 12);

        await User.create({
            firstName: String(firstName).trim(),
            lastName: String(lastName).trim(),
            email: String(email).toLowerCase().trim(),
            mobile: mobile ? String(mobile).trim() || undefined : undefined,
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
            { status: 500, headers: { 'Cache-Control': 'no-store' } }
        );
    }
}
