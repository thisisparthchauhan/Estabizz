# Estabizz Jobs - Background Job / Queue Foundation

Status: Phase 1A Part 7 foundation only.

This document defines the provider-neutral background job boundary for Estabizz Jobs. Candidate Portal, ATS UI, resume parsing, FastAPI, Prisma schema changes, migrations, and MongoDB changes were not started.

## 1. Architecture

Jobs background queue code lives under:

```text
lib/jobs/queue/
```

Business logic must depend on the internal `JobQueue` interface, not directly on QStash.

Current files:

- `types.ts` - job names, envelope, dispatch results, service interface
- `config.ts` - environment parsing and validation
- `policy.ts` - environment and payload safety policy
- `qstashAdapter.ts` - QStash provider implementation
- `index.ts` - module exports

The minimal smoke-test callback route is:

```text
app/api/jobs/queue/smoke-test/route.ts
```

It accepts only `QUEUE_SMOKE_TEST` jobs, verifies the QStash signature, and does not touch Candidate, Job, Application, PostgreSQL, MongoDB, storage, email, or AI systems.

## 2. Provider

Preferred V1 provider: Upstash QStash.

Installed package:

```text
@upstash/qstash
```

The adapter uses:

- `Client.publishJSON` for dispatch
- `Receiver.verify` for callback signature verification
- QStash deduplication IDs for idempotency
- QStash retry settings and retry delay expression
- QStash flow control for concurrency protection
- QStash DLQ retry API as the provider retry hook

## 3. Job Types

Typed job names prepared for future workflows:

- `RESUME_PARSE`
- `AI_EXTRACTION`
- `GENERATE_EMBEDDING`
- `CANDIDATE_MATCH`
- `SEND_EMAIL`
- `PROFILE_COMPLETENESS_RECALCULATE`
- `INTERVIEW_REMINDER`
- `JOB_ALERT`
- `QUEUE_SMOKE_TEST`

No business workflow handlers were implemented in this phase.

## 4. Job Envelope

Every queued job uses the `JobsQueueEnvelope` shape:

```text
jobType
jobId
entityId
idempotencyKey
attempt
requestedBy
createdAt
scheduledAt
payload
correlationId
environment
```

The envelope is versionable through additive payload fields in later phases.

## 5. Idempotency Strategy

Every job must include an `idempotencyKey`.

The QStash adapter sends this key as the QStash `deduplicationId`, which prevents duplicate delivery for the provider retention window.

Recommended idempotency format:

```text
{jobType}-{entityId}-{correlationId}
```

Business workers added later must also enforce idempotency at the application layer for side effects such as email delivery, AI result writes, or status updates.

## 6. Retry and Backoff Strategy

Default retry count:

```text
JOBS_QUEUE_DEFAULT_RETRIES=3
```

Default retry delay expression:

```text
1000 * pow(2, retried)
```

Critical jobs such as email and embedding should alert on failure in a later observability phase. Non-critical refresh jobs may degrade safely.

## 7. Delayed and Scheduled Jobs

The queue interface supports:

- `delaySeconds`
- `scheduledAt`

QStash receives delayed jobs with `delay` and scheduled one-off jobs with `notBefore`.

Recurring schedules are documented for future use but not created in this phase.

## 8. Worker Endpoint Security

Worker endpoints must not trust arbitrary HTTP calls.

Required callback security:

1. Read the raw request body.
2. Read `upstash-signature`.
3. Verify with `Receiver.verify`.
4. Optionally pass the request URL and `upstash-region`.
5. Reject missing or invalid signatures.
6. Only then parse the body and dispatch to a typed worker.

`QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` are required for verification and are never committed.

## 9. Environment Isolation

Staging and production must use separate QStash tokens and signing keys.

Staging jobs must never:

- process production candidate data
- send production email
- access production CV storage
- write production PostgreSQL data
- write Jobs data to production MongoDB

Configuration validation rejects production environments pointing at local/staging callback URLs and non-production environments pointing at production-named callback URLs.

## 10. Payload Limits

Default max payload size:

```text
JOBS_QUEUE_MAX_PAYLOAD_BYTES=65536
```

Queue payloads should contain identifiers and minimal context only. Large data, CV bytes, extracted text, and private document URLs must not be placed directly in queue payloads.

## 11. Failure Handling and Dead Letter Strategy

QStash manages delivery retries and dead-letter entries.

The internal interface includes:

- `retry(messageId)`
- `deadLetter(messageId, reason)`

In this foundation phase, `deadLetter` records a provider-neutral failure object only. Persistent failure recording belongs to a later worker/observability phase and must not modify the frozen Prisma schema in this phase.

## 12. Observability

Every envelope includes:

- `jobId`
- `correlationId`
- `idempotencyKey`
- `jobType`
- `requestedBy`

QStash messages are labeled with environment and job type. Headers include job type and correlation ID.

Do not log secrets, QStash tokens, signing keys, private storage keys, signed URLs, or candidate PII.

## 13. Environment Variables

Required:

```text
JOBS_QUEUE_PROVIDER=qstash
JOBS_QUEUE_BASE_URL=
JOBS_QUEUE_DEFAULT_RETRIES=3
JOBS_QUEUE_RETRY_DELAY_EXPRESSION=1000 * pow(2, retried)
JOBS_QUEUE_MAX_PAYLOAD_BYTES=65536
JOBS_QUEUE_SMOKE_TEST_ENABLED=false
QSTASH_TOKEN=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
```

Do not store real QStash secrets in Git.

## 14. Smoke-Test Procedure

Smoke-test script:

```text
scripts/jobsQueueSmokeTest.ts
```

Smoke-test callback:

```text
app/api/jobs/queue/smoke-test/route.ts
```

The real smoke test must not run until staging QStash credentials and a public staging callback URL are configured.

Safety requirements:

1. `APP_ENV` must be non-production.
2. `JOBS_QUEUE_SMOKE_TEST_ENABLED=true` must be set deliberately.
3. QStash token and signing keys must be configured locally or in staging.
4. Callback route verifies QStash signature before parsing the job.
5. The only accepted job type is `QUEUE_SMOKE_TEST`.
6. No Candidate, Job, Application, MongoDB, PostgreSQL, storage, email, or AI data is touched.

## 15. Current Readiness

The queue abstraction, QStash adapter, signature verification path, queue envelope, idempotency policy, retry/backoff support, and smoke-test foundation are ready.

Manual Upstash/QStash staging setup is still required before a real queue smoke test can be run.
