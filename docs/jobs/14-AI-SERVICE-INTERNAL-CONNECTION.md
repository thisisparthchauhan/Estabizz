# Estabizz Jobs - AI Service Internal Connection

Status: infrastructure foundation only.

This document defines the secure internal connection between the Next.js application and the Python FastAPI Jobs AI service. OpenAI, resume parsing, OCR, embeddings, candidate matching, production AI, and database writes were not implemented.

## 1. Trust Boundary

Next.js remains the primary web application and the owner of user sessions, Jobs authorization, and business state mutations.

FastAPI is an internal service boundary for future AI-side processing. It must not be exposed directly to candidates and must not accept candidate/admin JWTs as authorization for internal service work.

## 2. Request Flow

```text
Next.js server code
  -> GET /internal/health
  -> x-estabizz-service-secret: <AI_SERVICE_SECRET>
FastAPI
  -> constant-time secret comparison
  -> safe JSON response
```

The public FastAPI endpoint remains:

```text
GET /health
```

That endpoint is intentionally unauthenticated for infrastructure health checks and does not expose secrets.

## 3. Header Authentication

Protected internal endpoints use:

```text
x-estabizz-service-secret
```

The expected value is read only from:

```text
AI_SERVICE_SECRET
```

FastAPI rejects missing or invalid headers. Secret comparison uses constant-time comparison.

## 4. Secret Handling

Secrets must never be committed, printed, logged, or exposed to browser code.

Next.js uses only server-side environment variables:

```text
JOBS_AI_SERVICE_URL=
AI_SERVICE_SECRET=
JOBS_AI_REQUEST_TIMEOUT_MS=5000
```

Do not create `NEXT_PUBLIC_AI_SERVICE_SECRET`.

## 5. Next.js Client

The server-only client lives under:

```text
lib/jobs/ai/
```

It provides:

- configuration parsing
- validation
- timeout handling
- safe error responses
- FastAPI `/internal/health` check

The client does not connect to any AI provider and does not perform parsing, scoring, matching, or database writes.

## 6. Timeout and Error Behavior

The default timeout is 5000 ms.

Errors returned to callers are intentionally generic. They do not include the service secret, authorization headers, or raw provider details.

## 7. Local Development

Start FastAPI locally:

```bash
cd services/jobs-ai
APP_ENV=staging AI_SERVICE_SECRET=local-test-secret uvicorn app.main:app --host 127.0.0.1 --port 8010
```

Configure Next.js/local shell:

```bash
APP_ENV=staging
JOBS_AI_SERVICE_URL=http://127.0.0.1:8010
AI_SERVICE_SECRET=local-test-secret
```

Run the verification script:

```bash
node scripts/jobsAiInternalHealthCheck.mjs
```

The script confirms:

- valid secret returns 200
- invalid secret is rejected
- missing secret is rejected

## 8. Future Deployment Model

In staging and production, FastAPI should be deployed as a private/internal service where possible. If a public ingress is required by the hosting platform, all non-public endpoints must require the internal service secret and should be additionally protected by network or platform controls.

QStash may later call Next.js worker endpoints or internal service endpoints as part of AI job processing, but those worker paths must preserve environment isolation and must not process production data from staging.

## 9. Candidate Access

Candidates must never call the FastAPI AI service directly.

Candidate-facing flows should call Next.js routes. Next.js will authenticate the user, authorize the action, validate state, and then call FastAPI or enqueue a QStash job when appropriate.

## 10. Current Readiness

The internal service connection foundation is ready for local/staging verification. It is not a production AI deployment and does not implement any AI business workflow.
