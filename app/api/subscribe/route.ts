/**
 * POST /api/subscribe — newsletter signup.
 *
 * Mirrors the protections on /api/leads, because this is the same thing: an
 * unauthenticated public endpoint that writes to the database.
 * - Rate-limit config gate  → 503 when the production store is missing
 * - IP rate limit           → before the body is read
 * - Body size cap           → actual bytes, not a header
 * - Honeypot ("website")    → silent success drop
 * - Email rate limit        → stops one address being hammered
 *
 * Re-subscribing is idempotent: the unique index on `email` means a repeat
 * signup reactivates the existing row instead of creating a duplicate, and the
 * caller cannot tell the difference. That matters — a differing response would
 * turn this endpoint into an "is this address on your list?" oracle.
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import SubscriberModel from '@/lib/models/Subscriber';
import {
  getClientIp,
  hashIdentifier,
  isRateLimitConfigured,
  limitRequest,
  rateLimitResponse,
} from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 4_096;

const cap = (v: unknown, n: number) =>
  typeof v === 'string' ? v.trim().slice(0, n) : '';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );

const VALID_SOURCES = new Set(['footer', 'blog', 'resources']);

const noStore = { 'Cache-Control': 'no-store' };

/**
 * Sends a "new subscriber" notification via Resend.
 * No-op until RESEND_API_KEY is set. Best-effort: never throws into the request flow.
 */
async function notifyNewSubscriber(email: string, source: string, pageUrl: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const to   = process.env.LEAD_NOTIFY_EMAIL || 'info@estabizz.com';
  const from = process.env.LEAD_FROM_EMAIL   || 'Estabizz Leads <onboarding@resend.dev>';

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">
    <h2 style="color:#120b45;margin:0 0 12px">New newsletter subscriber</h2>
    <table style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px">
      <tr><td style="padding:6px 14px;font-weight:700;color:#0a1628">Email</td><td style="padding:6px 14px;color:#334155">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:700;color:#0a1628">Signed up on</td><td style="padding:6px 14px;color:#334155">${escapeHtml(pageUrl || '—')}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:700;color:#0a1628">Source</td><td style="padding:6px 14px;color:#334155">${escapeHtml(source)}</td></tr>
    </table>
    <p style="color:#94a3b8;font-size:12px;margin-top:14px">The full list is at /admin/subscribers.</p>
  </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New subscriber: ${email}`,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export async function POST(req: NextRequest) {
  if (!isRateLimitConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'This service is temporarily unavailable.' },
      { status: 503, headers: noStore }
    );
  }

  const ip = getClientIp(req);
  if (ip === 'unknown' && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { ok: false, error: 'This service is temporarily unavailable.' },
      { status: 503, headers: noStore }
    );
  }

  const ipResult = await limitRequest(
    { namespace: 'subscribe-ip', identifier: ip, limit: 10, windowSeconds: 3600 },
    'fail-open'
  );
  if (ipResult.configMissing) {
    return NextResponse.json(
      { ok: false, error: 'This service is temporarily unavailable.' },
      { status: 503, headers: noStore }
    );
  }
  if (!ipResult.allowed) {
    return rateLimitResponse(ipResult, 'Too many requests. Please try again later.');
  }

  const bodyBuffer = await req.arrayBuffer();
  if (bodyBuffer.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: 'Request body too large.' },
      { status: 413, headers: noStore }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(new TextDecoder().decode(bodyBuffer));
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400, headers: noStore });
  }

  // Honeypot — a bot filling the hidden field gets a success it cannot act on.
  if (cap(body.website, 200)) {
    return NextResponse.json({ ok: true }, { headers: noStore });
  }

  const email = cap(body.email, 160).toLowerCase();
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400, headers: noStore }
    );
  }

  const rawSource = cap(body.source, 40);
  const source = VALID_SOURCES.has(rawSource) ? rawSource : 'footer';

  // pageUrl: path only. A query string can carry personal data and has no
  // analytical value here.
  let pageUrl = '';
  const rawPageUrl = cap(body.pageUrl, 400);
  if (rawPageUrl) {
    try {
      pageUrl = new URL(rawPageUrl).pathname.slice(0, 200);
    } catch {
      pageUrl = '';
    }
  }

  // Per-address limit, hashed so the store never holds a raw email.
  const emailResult = await limitRequest(
    { namespace: 'subscribe-email', identifier: hashIdentifier(email), limit: 5, windowSeconds: 3600 },
    'fail-open'
  );
  if (!emailResult.allowed) {
    return rateLimitResponse(emailResult, 'Too many requests. Please try again later.');
  }

  try {
    await connectDB();
    await SubscriberModel.findOneAndUpdate(
      { email },
      {
        $set: { status: 'active', unsubscribedAt: null },
        $setOnInsert: { email, source, pageUrl },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not save your subscription. Please try again.' },
      { status: 500, headers: noStore }
    );
  }

  // Notification must never fail the subscription that already succeeded.
  try {
    await notifyNewSubscriber(email, source, pageUrl);
  } catch {
    /* swallowed by design */
  }

  return NextResponse.json({ ok: true }, { headers: noStore });
}
