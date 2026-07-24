/**
 * POST /api/leads
 *
 * Captures a contact / get-started / global-market-page enquiry and stores it
 * in MongoDB (`leads` collection). Returns { ok: true } on success.
 *
 * Security:
 * - Rate limiting: 5 per IP/hour + 3 per email/24h (Upstash in production)
 * - Body size: 16 KB hard limit (actual byteLength, not Content-Length header)
 * - Malformed JSON → 400
 * - Unknown IP in production → 503
 * - Honeypot ("website" field) → silent success drop
 * - Field allowlist + length caps (server-enforced)
 * - source is server-controlled; client value is validated against allowlist
 * - countrySlug is resolved server-side; client-supplied country name/region/tier
 *   are NOT trusted — values come from COUNTRY_BY_SLUG lookup
 * - No internal status, assignment, deletion or admin fields accepted from client
 * - Cache-Control: no-store on all error responses
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import LeadModel from '@/lib/models/Lead';
import {
  limitRequest,
  isRateLimitConfigured,
  getClientIp,
  rateLimitResponse,
  hashIdentifier,
} from '@/lib/security/rateLimit';
import { COUNTRY_BY_SLUG } from '@/lib/globalMarkets/countries';

export const dynamic = 'force-dynamic';

// Maximum body size: all lead fields plus JSON overhead.
const MAX_BODY_BYTES = 16_384;

const cap = (v: unknown, n: number) =>
  typeof v === 'string' ? v.trim().slice(0, n) : '';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const escapeHtml = (v: string) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

// Valid client-supplied source values. Actual stored source may differ (see below).
const VALID_SOURCES = new Set(['contact', 'get-started', 'global-market-page']);

// Allowlists for structured dropdown fields from the global market form.
// These must match the options in the lead form exactly.
const VALID_BUSINESS_ACTIVITIES = new Set([
  'Company formation',
  'Fintech or payments',
  'Lending or banking',
  'Insurance',
  'Securities or investment services',
  'Fund management',
  'Trading or import-export',
  'Technology or professional services',
  'Other',
  '',
]);

const VALID_EXPANSION_DIRECTIONS = new Set([
  'India to market',
  'Market to India',
  'Other cross-border route',
  '',
]);

const VALID_STAGES = new Set([
  'Exploring the market',
  'Business plan prepared',
  'Entity not incorporated',
  'Entity already incorporated',
  'Licence assessment required',
  'Existing operation requiring compliance support',
  '',
]);

const VALID_SUPPORT_REQUIRED = new Set([
  'Initial consultation',
  'Written feasibility assessment',
  'Full execution support',
  'Local professional introduction',
  'Ongoing compliance support',
  '',
]);

const VALID_TIMELINES = new Set([
  'Immediately',
  'Within 1–3 months',
  'Within 3–6 months',
  'Within 6–12 months',
  'Planning ahead',
  'Exploratory only',
  // Legacy values from old form
  'Within 1-3 months',
  'Within 3-6 months',
  '6–12 months',
  'Planning ahead (1–2 years)',
  'Exploratory – no set timeline',
  '',
]);

const VALID_CONTACT_METHODS = new Set([
  'Email',
  'Phone',
  'WhatsApp',
  'Video meeting',
  '',
]);

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  // Server-controlled
  source: string;
  selectedCountry: string;
  countrySlug: string;
  region: string;
  marketTier: string;
  // Extended global market form fields
  timeline: string;
  businessActivity: string;
  expansionDirection: string;
  currentStage: string;
  supportRequired: string;
  preferredContactMethod: string;
  pageUrl: string;
};

/**
 * Sends a "new lead" notification email via Resend.
 * No-op until RESEND_API_KEY is set. Best-effort: never throws into the request flow.
 */
async function notifyNewLead(lead: LeadPayload): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const to   = process.env.LEAD_NOTIFY_EMAIL  || 'support@estabizz.com';
  const from = process.env.LEAD_FROM_EMAIL    || 'Estabizz Leads <onboarding@resend.dev>';

  const rows = (
    [
      ['Name',                lead.name],
      ['Email',               lead.email],
      ['Phone',               lead.phone || '—'],
      ['Company',             lead.company || '—'],
      ['Service / Activity',  lead.service || lead.businessActivity || '—'],
      ['Source',              lead.source],
      ['Country',             lead.selectedCountry || '—'],
      ['Region',              lead.region || '—'],
      ['Market Tier',         lead.marketTier || '—'],
      ['Expansion Direction', lead.expansionDirection || '—'],
      ['Current Stage',       lead.currentStage || '—'],
      ['Support Required',    lead.supportRequired || '—'],
      ['Timeline',            lead.timeline || '—'],
      ['Preferred Contact',   lead.preferredContactMethod || '—'],
      ['Message',             lead.message || '—'],
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
      subject: `New lead: ${lead.name} — ${lead.service || lead.businessActivity || lead.source}`,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export async function POST(req: NextRequest) {
  // ── Production rate-limit config gate ──────────────────────────────────────
  if (!isRateLimitConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'This service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // ── Client IP ─────────────────────────────────────────────────────────────
  const ip = getClientIp(req);
  if (ip === 'unknown' && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { ok: false, error: 'This service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // ── IP rate limit (before body read) ─────────────────────────────────────
  const ipResult = await limitRequest(
    { namespace: 'leads-ip', identifier: ip, limit: 5, windowSeconds: 3600 },
    'fail-open'
  );

  if (ipResult.configMissing) {
    return NextResponse.json(
      { ok: false, error: 'This service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  if (!ipResult.allowed) {
    return rateLimitResponse(ipResult, 'Too many requests. Please try again later.');
  }

  // ── Body size enforcement (actual bytes) ──────────────────────────────────
  const bodyBuffer = await req.arrayBuffer();
  if (bodyBuffer.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: 'Request body too large.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(new TextDecoder().decode(bodyBuffer));
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // ── Honeypot ──────────────────────────────────────────────────────────────
  if (cap(body.website, 200)) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  // ── Field extraction with caps ────────────────────────────────────────────
  const name    = cap(body.name,    120);
  const email   = cap(body.email,   160).toLowerCase();
  const phone   = cap(body.phone,   40);
  const company = cap(body.company, 160);
  const service = cap(body.service, 160);
  const message = cap(body.message, 4000);

  // source: validate against allowlist; fall back to 'contact'
  const rawSource = cap(body.source, 40);
  const source = VALID_SOURCES.has(rawSource) ? rawSource : 'contact';

  // countrySlug: client-supplied slug — resolve server-side from COUNTRY_BY_SLUG.
  // NEVER trust client-supplied selectedCountry, region, or marketTier.
  const rawCountrySlug = cap(body.countrySlug, 100).toLowerCase();
  const countryConfig  = rawCountrySlug ? COUNTRY_BY_SLUG.get(rawCountrySlug) : undefined;

  // Server-resolved country fields (not client values)
  const selectedCountry = countryConfig?.name    ?? '';
  const countrySlug     = countryConfig?.slug    ?? '';
  const region          = countryConfig?.region  ?? '';
  const marketTier      = countryConfig?.tier    ?? '';

  // Structured dropdown fields — validate against allowlists
  const rawTimeline = cap(body.timeline, 80);
  const timeline    = VALID_TIMELINES.has(rawTimeline) ? rawTimeline : '';

  const rawBusinessActivity = cap(body.businessActivity, 160);
  const businessActivity    = VALID_BUSINESS_ACTIVITIES.has(rawBusinessActivity) ? rawBusinessActivity : '';

  // Expansion direction may be templated ("India to UAE") — normalise to canonical
  const rawExpansionDirection = cap(body.expansionDirection, 160);
  const expansionDirection = VALID_EXPANSION_DIRECTIONS.has(rawExpansionDirection) ? rawExpansionDirection : '';

  const rawCurrentStage = cap(body.currentStage, 160);
  const currentStage    = VALID_STAGES.has(rawCurrentStage) ? rawCurrentStage : '';

  const rawSupportRequired = cap(body.supportRequired, 160);
  const supportRequired    = VALID_SUPPORT_REQUIRED.has(rawSupportRequired) ? rawSupportRequired : '';

  const rawPreferredContact = cap(body.preferredContactMethod, 80);
  const preferredContactMethod = VALID_CONTACT_METHODS.has(rawPreferredContact) ? rawPreferredContact : '';

  // pageUrl: sanitised, stripped of query params for privacy
  const rawPageUrl = cap(body.pageUrl, 400);
  let pageUrl = '';
  try {
    const u = new URL(rawPageUrl);
    // Only allow same-origin paths
    if (u.hostname.endsWith('estabizz.com') || u.hostname === 'localhost') {
      pageUrl = u.pathname.slice(0, 200);
    }
  } catch {
    // ignore invalid URLs
  }

  // ── Validation ────────────────────────────────────────────────────────────
  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: 'Please enter your name.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // Global market form: countrySlug must resolve to a known country
  if (source === 'global-market-page' && rawCountrySlug && !countryConfig) {
    return NextResponse.json(
      { ok: false, error: 'Invalid market selection.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // ── Per-email rate limit ──────────────────────────────────────────────────
  const emailHash   = hashIdentifier(email);
  const emailResult = await limitRequest(
    { namespace: 'leads-email', identifier: emailHash, limit: 3, windowSeconds: 86400 },
    'fail-open'
  );

  if (emailResult.configMissing) {
    return NextResponse.json(
      { ok: false, error: 'This service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  if (!emailResult.allowed) {
    return rateLimitResponse(emailResult, 'Too many requests. Please try again later.');
  }

  const lead: LeadPayload = {
    name,
    email,
    phone,
    company,
    service,
    message,
    source,
    selectedCountry,
    countrySlug,
    region,
    marketTier,
    timeline,
    businessActivity,
    expansionDirection,
    currentStage,
    supportRequired,
    preferredContactMethod,
    pageUrl,
  };

  try {
    await connectDB();
    await LeadModel.create(lead);
  } catch (err) {
    console.error('[leads] failed to save lead:', err);
    return NextResponse.json(
      { ok: false, error: 'We could not save your enquiry. Please call +91 98256 00907 or email support@estabizz.com.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // Best-effort email alert — never blocks the visitor's submission.
  try {
    await notifyNewLead(lead);
  } catch (err) {
    console.error('[leads] email notification failed:', err);
  }

  return NextResponse.json({ ok: true });
}
