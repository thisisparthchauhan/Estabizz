/**
 * lib/security/rateLimit.ts — Server-only rate-limit utility.
 *
 * Do NOT import into client components.
 *
 * Production:  Upstash Redis sliding-window limiter.
 *              Requires UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 *
 * Development: In-memory fallback on global.__rl_store.
 *              NOT production-safe — per-instance, resets on cold starts,
 *              cannot coordinate across Vercel serverless instances.
 *
 * Fail policy (configured per call-site):
 *   'fail-open'   — allow the request when the Upstash store is unreachable;
 *                   log the error server-side. Used for login so that a
 *                   temporary store outage never locks out all users.
 *   'fail-closed' — block the request when the store is unreachable.
 *                   Used for AI endpoints; uncontrolled spend is the
 *                   greater risk compared to temporary unavailability.
 */

import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { createHash } from 'crypto';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: number;      // Unix seconds
  retryAfter: number;   // seconds to wait before retrying (0 if allowed)
  storeError?: boolean; // true when Upstash was unavailable (policy applied)
}

export interface LimitOptions {
  namespace: string;
  identifier: string;
  limit: number;
  windowSeconds: number;
}

// ─── IP extraction ────────────────────────────────────────────────────────────

/**
 * Returns the first valid IP from x-forwarded-for, then x-real-ip.
 * Falls back to 'unknown' (shared bucket) when neither header is present.
 * On Vercel, x-forwarded-for is populated and trusted.
 */
export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0].trim();
    if (first) return first;
  }
  const xri = req.headers.get('x-real-ip');
  if (xri) return xri.trim();
  return 'unknown';
}

// ─── Identifier hashing ───────────────────────────────────────────────────────

/**
 * SHA-256 of the lowercased/trimmed identifier; truncated to 32 hex chars.
 * Prevents raw email addresses from being stored in the rate-limit datastore.
 */
export function hashIdentifier(raw: string): string {
  return createHash('sha256')
    .update(raw.toLowerCase().trim())
    .digest('hex')
    .slice(0, 32);
}

// ─── Upstash (production) ────────────────────────────────────────────────────

// Module-level singletons — cached across warm invocations.
let upstashRedis: Redis | null = null;
const upstashCache = new Map<string, Ratelimit>();

function getUpstashInstance(
  namespace: string,
  limit: number,
  windowSeconds: number
): Ratelimit {
  const cacheKey = `${namespace}:${limit}:${windowSeconds}`;
  if (!upstashCache.has(cacheKey)) {
    if (!upstashRedis) {
      upstashRedis = Redis.fromEnv();
    }
    upstashCache.set(
      cacheKey,
      new Ratelimit({
        redis: upstashRedis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
        prefix: `rl:${namespace}`,
      })
    );
  }
  return upstashCache.get(cacheKey)!;
}

async function limitWithUpstash(
  opts: LimitOptions
): Promise<RateLimitResult | null> {
  try {
    const rl = getUpstashInstance(opts.namespace, opts.limit, opts.windowSeconds);
    const { success, remaining, limit, reset } = await rl.limit(opts.identifier);
    const now = Date.now();
    const resetAt = Math.ceil(reset / 1_000);
    return {
      allowed: success,
      remaining: Math.max(0, remaining),
      limit,
      resetAt,
      retryAfter: success ? 0 : Math.max(0, Math.ceil((reset - now) / 1_000)),
    };
  } catch (err) {
    // Log without exposing internals. The caller decides fail-open vs fail-closed.
    console.error(
      '[rateLimit] Upstash error:',
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}

// ─── In-memory fallback (DEV ONLY — NOT production-safe) ─────────────────────

declare global {
  // eslint-disable-next-line no-var
  var __rl_store: Map<string, { count: number; resetAt: number }> | undefined;
}

function getMemStore(): Map<string, { count: number; resetAt: number }> {
  if (!global.__rl_store) global.__rl_store = new Map();
  return global.__rl_store;
}

function pruneMemStore(
  store: Map<string, { count: number; resetAt: number }>
): void {
  const now = Date.now();
  for (const [k, v] of store) {
    if (v.resetAt <= now) store.delete(k);
  }
  // Cap at 1000 entries — evict earliest-expiring first.
  if (store.size > 1_000) {
    const sorted = [...store.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
    for (const [k] of sorted.slice(0, store.size - 800)) store.delete(k);
  }
}

async function limitWithMemory(opts: LimitOptions): Promise<RateLimitResult> {
  const store = getMemStore();
  pruneMemStore(store);
  const key = `${opts.namespace}:${opts.identifier}`;
  const now = Date.now();
  let entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + opts.windowSeconds * 1_000 };
  }
  entry.count += 1;
  store.set(key, entry);
  const allowed = entry.count <= opts.limit;
  const remaining = Math.max(0, opts.limit - entry.count);
  const resetAt = Math.ceil(entry.resetAt / 1_000);
  return {
    allowed,
    remaining,
    limit: opts.limit,
    resetAt,
    retryAfter: allowed ? 0 : Math.max(0, Math.ceil((entry.resetAt - now) / 1_000)),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

function hasUpstash(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

/**
 * Rate-limit a request by namespace + identifier within a sliding window.
 *
 * @param opts    - namespace, identifier, limit and windowSeconds
 * @param policy  - 'fail-open' (default) or 'fail-closed'
 */
export async function limitRequest(
  opts: LimitOptions,
  policy: 'fail-open' | 'fail-closed' = 'fail-open'
): Promise<RateLimitResult> {
  if (hasUpstash()) {
    const result = await limitWithUpstash(opts);
    if (result === null) {
      // Store was unreachable — apply policy.
      const now = Date.now();
      if (policy === 'fail-closed') {
        return {
          allowed: false,
          remaining: 0,
          limit: opts.limit,
          resetAt: Math.ceil(now / 1_000) + 60,
          retryAfter: 60,
          storeError: true,
        };
      }
      // fail-open: allow but mark storeError so caller can log.
      return {
        allowed: true,
        remaining: 0,
        limit: opts.limit,
        resetAt: Math.ceil(now / 1_000) + opts.windowSeconds,
        retryAfter: 0,
        storeError: true,
      };
    }
    return result;
  }

  // DEV-ONLY in-memory fallback.
  return limitWithMemory(opts);
}

// ─── Response helpers ─────────────────────────────────────────────────────────

/** Build a 429 Too Many Requests JSON response with standard rate-limit headers. */
export function rateLimitResponse(
  result: RateLimitResult,
  message = 'Too many requests. Please try again later.'
): NextResponse {
  return NextResponse.json(
    { error: message },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(result.resetAt),
        'Cache-Control': 'no-store',
      },
    }
  );
}

/** Rate-limit headers to attach to an allowed response (informational). */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetAt),
  };
}
