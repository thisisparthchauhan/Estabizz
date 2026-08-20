# Estabizz Jobs - Transactional Email Foundation

Status: Phase 1A Part 6 foundation only.

This document defines the provider-neutral transactional email boundary for Estabizz Jobs. Candidate Portal, ATS UI, resume parsing, FastAPI, QStash, Prisma schema changes, and migrations were not started.

## 1. Architecture

Jobs transactional email code lives under:

```text
lib/jobs/email/
```

Business logic must depend on the internal `EmailService` interface, not directly on Resend.

Current files:

- `types.ts` - email event names, message/result types, service interface
- `config.ts` - environment parsing and validation
- `policy.ts` - staging and production delivery safety policy
- `templates.ts` - minimal reusable template foundation
- `resendAdapter.ts` - Resend provider implementation
- `index.ts` - module exports

## 2. Provider Abstraction

`EmailService` supports:

- recipient
- subject
- HTML body
- text body
- reply-to
- optional metadata
- provider message ID
- sent, blocked, or failed delivery result

The initial provider is Resend through `ResendJobsEmailService`.

## 3. Resend Adapter

The Resend adapter uses the official `resend` package.

The adapter:

- reads configuration only from environment variables
- applies the Jobs email safety policy before sending
- returns provider message ID when available
- never logs or returns the API key
- does not expose Resend directly to future Jobs business workflows

## 4. Environment Variables

Required for real delivery:

```text
JOBS_EMAIL_PROVIDER=resend
JOBS_EMAIL_FROM=
JOBS_EMAIL_REPLY_TO=
JOBS_EMAIL_STAGING_ALLOWLIST=
JOBS_EMAIL_STAGING_MODE=reject
JOBS_EMAIL_STAGING_REDIRECT_TO=
JOBS_EMAIL_PRODUCTION_DELIVERY_ENABLED=false
JOBS_EMAIL_SMOKE_TEST_TO=
RESEND_API_KEY=
```

No real API key or credential is stored in Git.

## 5. Staging Safety

Staging and development must never send to arbitrary candidate addresses.

Rules:

1. `APP_ENV=production` is required before production delivery can ever be considered.
2. Non-production delivery checks `JOBS_EMAIL_STAGING_ALLOWLIST`.
3. If recipient is allowlisted, the email may be sent.
4. If recipient is not allowlisted and `JOBS_EMAIL_STAGING_MODE=reject`, the send is blocked.
5. If recipient is not allowlisted and `JOBS_EMAIL_STAGING_MODE=redirect`, the send is redirected only to `JOBS_EMAIL_STAGING_REDIRECT_TO`, and that redirect recipient must also be in the allowlist.
6. Staging subjects are prefixed with `[Estabizz Jobs Staging]`.

This prevents accidental emails to real candidates during local or staging tests.

## 6. Production Safety

Production delivery remains deliberately disabled unless:

```text
APP_ENV=production
JOBS_EMAIL_PRODUCTION_DELIVERY_ENABLED=true
```

Production Resend credentials must be separate from staging credentials.

## 7. Future Email Events

Typed event names are prepared for future workflows:

- `CANDIDATE_EMAIL_VERIFICATION`
- `APPLICATION_RECEIVED`
- `APPLICATION_STATUS_UPDATED`
- `INTERVIEW_INVITATION`
- `INTERVIEW_REMINDER`
- `JOB_ALERT`
- `RECRUITER_NOTIFICATION`
- `STAGING_SMOKE_TEST`

No business workflows were implemented in this phase.

## 8. Template Foundation

Only one reusable test template exists in this phase:

```text
renderJobsEmailSmokeTestTemplate()
```

Future templates should remain reusable and should be called from authorized server-side workflows only.

## 9. Smoke-Test Procedure

Smoke-test script:

```text
scripts/jobsEmailSmokeTest.ts
```

Safety requirements:

1. `.env.local` must configure non-production `APP_ENV`.
2. `RESEND_API_KEY` must be configured locally.
3. `JOBS_EMAIL_SMOKE_TEST_TO` must be configured locally.
4. `JOBS_EMAIL_SMOKE_TEST_TO` must be in `JOBS_EMAIL_STAGING_ALLOWLIST`.
5. The script must not print the API key or secrets.
6. The script must not send to a real candidate.

Do not run the real smoke test until a staging Resend account and an Estabizz-controlled allowlisted recipient are configured.

## 10. Current Readiness

The provider-neutral email foundation and Resend adapter are ready.

Manual Resend staging setup is still required before real email smoke testing.
