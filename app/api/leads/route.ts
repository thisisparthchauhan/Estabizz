/**
 * POST /api/leads
 *
 * Captures a contact / get-started enquiry and stores it in MongoDB
 * (`leads` collection). Returns { ok: true } on success.
 *
 * Validates name + email, enforces length caps, and uses a hidden
 * honeypot field ("website") to silently drop bot submissions.
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import LeadModel from '@/lib/models/Lead';

export const dynamic = 'force-dynamic';

const cap = (v: unknown, n: number) =>
  typeof v === 'string' ? v.trim().slice(0, n) : '';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field.
  if (cap(body.website, 200)) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  const name = cap(body.name, 120);
  const email = cap(body.email, 160).toLowerCase();
  const phone = cap(body.phone, 40);
  const company = cap(body.company, 160);
  const service = cap(body.service, 160);
  const message = cap(body.message, 4000);
  const source = ['contact', 'get-started'].includes(String(body.source))
    ? String(body.source)
    : 'contact';

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    await connectDB();
    await LeadModel.create({ name, email, phone, company, service, message, source });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[leads] failed to save lead:', err);
    return NextResponse.json(
      { ok: false, error: 'We could not save your enquiry. Please call +91 98256 00907 or email info@estabizz.com.' },
      { status: 500 }
    );
  }
}
