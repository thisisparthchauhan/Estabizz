/**
 * getSiteUrl — returns the canonical production origin.
 *
 * Reads NEXT_PUBLIC_SITE_URL first so staging / preview environments can
 * override the URL without a code change. Falls back to the production domain
 * already documented in AGENTS.md and used throughout the project.
 *
 * Always returns a URL with no trailing slash.
 * Never returns a localhost URL unless explicitly set via the env var.
 */
export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  return env || 'https://www.estabizz.com';
}
