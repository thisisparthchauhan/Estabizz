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

const escapeHtml = (v: string) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

type LeadPayload = {
  name: string; email: string; phone: string; company: string;
  service: string; message: string; source: string;
};

/**
 * Sends a "new lead" notification email via Resend.
 * No-op until RESEND_API_KEY is set in the environment, so leads keep
 * saving normally before email is configured. Best-effort: never throws
 * back into the request flow (caller catches).
 */
async function notifyNewLead(lead: LeadPayload): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // email disabled until a key is configured

  const to = process.env.LEAD_NOTIFY_EMAIL || 'info@estabizz.com';
  const from = process.env.LEAD_FROM_EMAIL || 'Estabizz Leads <onboarding@resend.dev>';

  const rows = (
    [
      ['Name', lead.name],
      ['Email', lead.email],
      ['Phone', lead.phone || '—'],
      ['Company', lead.company || '—'],
      ['Service', lead.service || '—'],
      ['Source', lead.source],
      ['Message', lead.message || '—'],
    ] as [string, string][]
  )
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px;font-weight:700;color:#0a1628;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 14px;color:#334155">${escapeHtml(v)}</td></tr>`
    )
    .join('');

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">
    <h2 style="color:#120b45;margin:0 0 12px">New enquiry from the Estabizz website</h2>
    <table style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px">${rows}</table>
    <p style="color:#94a3b8;font-size:12px;margin-top:14px">Reply directly to this email to respond to ${escapeHtml(lead.name)}.</p>
  </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New lead: ${lead.name} — ${lead.service || lead.source}`,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

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

  const lead: LeadPayload = { name, email, phone, company, service, message, source };

  try {
    await connectDB();
    await LeadModel.create(lead);
  } catch (err) {
    console.error('[leads] failed to save lead:', err);
    return NextResponse.json(
      { ok: false, error: 'We could not save your enquiry. Please call +91 98256 00907 or email info@estabizz.com.' },
      { status: 500 }
    );
  }

  // Best-effort email alert — never blocks/fails the visitor's submission.
  try {
    await notifyNewLead(lead);
  } catch (err) {
    console.error('[leads] email notification failed:', err);
  }

  return NextResponse.json({ ok: true });
}
