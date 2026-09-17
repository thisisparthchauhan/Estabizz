import "server-only";

// ─────────────────────────────────────────────────────────────────────────────
// Estabizz Jobs — public launch flags.
//
// Two INDEPENDENT gates, not one "is Jobs ready" boolean, because they answer
// different questions and become true at different times:
//
//   isJobsDatabaseConfigured()      -- "is there a Postgres database to read
//                                       public job listings from at all?"
//   areCandidateApplicationsEnabled() -- "is it safe to let a real candidate
//                                       submit PII (resume, application) yet?"
//
// A production Jobs database can exist (job listings work) long before the
// candidate-data infrastructure it would take to accept resumes safely does
// (production private object storage, a hosted malware scanner, production
// Redis for rate limiting). Collapsing these into one flag would force an
// all-or-nothing launch; keeping them separate is what lets public job
// discovery go live today while candidate PII collection stays gated until
// its own dependencies are actually ready -- flipping
// JOBS_CANDIDATE_APPLICATIONS_ENABLED=true later requires no redeploy of this
// logic, only the environment variable and the infrastructure behind it.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Whether DATABASE_URL is set at all -- not whether it currently connects.
 *
 * Deliberately narrow: this only distinguishes "nobody has configured a Jobs
 * database yet" (today's state) from "a database is configured." It must NOT
 * swallow a genuine connection failure once DATABASE_URL is set -- that should
 * surface as a real error so an actual production outage gets noticed, not
 * silently read as "still launching." Callers check this BEFORE calling
 * getJobsPrismaClient() (which throws if DATABASE_URL is absent) precisely so
 * that a real Prisma/connection error, once the database exists, is never
 * caught by this function and is free to propagate as an actual error.
 */
export function isJobsDatabaseConfigured(): boolean {
  return !!process.env.DATABASE_URL?.trim();
}

/**
 * Whether candidates may submit applications, resumes or any other PII.
 *
 * Defaults OFF. Requires the explicit literal "true" -- absent, empty, or any
 * other value stays disabled, matching this codebase's existing fail-safe
 * pattern (e.g. resolveRequired() in lib/jobs/malwareScanning/config.ts, which
 * the same way refuses to let a stray value weaken a safety gate). There is no
 * environment-specific override: this is not "required in production, opt-out
 * elsewhere" like the malware gate -- it is "off everywhere until a human sets
 * it," because turning it on is a one-time launch decision, not a per-request
 * policy.
 *
 * Set JOBS_CANDIDATE_APPLICATIONS_ENABLED=true only once production private
 * object storage, a hosted malware scanner and production Redis all exist --
 * see docs/jobs/FINAL-LAUNCH-READINESS.md.
 */
export function areCandidateApplicationsEnabled(): boolean {
  return process.env.JOBS_CANDIDATE_APPLICATIONS_ENABLED === "true";
}

/**
 * The standard JSON body + status for every candidate-PII API route while
 * areCandidateApplicationsEnabled() is false. One shared shape so a client
 * only has to handle one "not open yet" response, not a different message
 * per endpoint. 503 (Service Unavailable), not 404 or 403: the route exists
 * and the request wasn't malformed or forbidden -- the feature behind it is
 * deliberately not turned on yet, which is exactly what 503 communicates to
 * a well-behaved client.
 */
export const CANDIDATE_APPLICATIONS_DISABLED_RESPONSE = {
  status: 503 as const,
  body: {
    error: "candidate_applications_not_enabled",
    message: "Candidate applications are not open yet. Please check back soon.",
  },
};
