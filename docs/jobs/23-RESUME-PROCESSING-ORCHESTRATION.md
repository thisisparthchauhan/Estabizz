# Estabizz Jobs — Resume Processing Orchestration V1

Status: Implemented locally; not deployed.

## Scope

This phase connects the confirmed `ResumeVersion` to the full AI processing pipeline:

`ResumeVersion pending → RESUME_PARSE dispatch → QStash → worker → FastAPI text extraction → FastAPI structured extraction → AI profile proposals → Candidate Profile Review ready`

It does not deploy, touch production, make live paid OpenAI calls during automated testing, publish live QStash messages during testing, use `Jobs CV/`, or build job matching or employer portal features.

## Pipeline Stages

### Stage 1 — Dispatch (confirm route)

After `POST /api/jobs/resume/confirm` successfully creates a `ResumeVersion`:

1. `dispatchResumeParse` builds a `JobsQueueEnvelope<ResumeParseJobPayload>` with a deterministic idempotency key.
2. If QStash is configured, the envelope is published via `QStashJobsQueue.dispatch`.
3. If QStash is not configured (development), dispatch returns `blocked: true` and the confirm endpoint still returns HTTP 200 — the upload succeeded.
4. If dispatch fails with an error, the confirm endpoint returns HTTP 503 so the browser can retry (the confirm is idempotent via advisory lock on object key).

### Stage 2 — Security Gate (worker)

Before text extraction, the worker checks `PrivateObjectMetadata.malwareScanStatus` against `DocumentStorageConfig.malwareScanningRequired`:

| `malwareScanningRequired` | `malwareScanStatus` | Outcome |
|---|---|---|
| `false` | any (except `infected`) | Eligible |
| `false` | `infected` | Permanent block |
| `true` | `clean` or `skipped` | Eligible |
| `true` | `pending` | Retryable block (awaiting scan) |
| `true` | `infected` | Permanent block |
| `true` | `failed` | Permanent block |

V1 ships with `malwareScanningRequired=false` and actual scanning integrated in a later phase. The gate is wired and enforced regardless.

### Stage 3 — Text Extraction (worker)

The worker calls `POST /internal/resumes/extract-text` on the FastAPI service with the resume bytes. On success, `extractionMethod` and `pageCount` are passed forward to the structured extraction stage.

Permanent text extraction failures (`ocr_required`, `unsupported_type`, `empty_document`, `corrupt_document`, `encrypted_document`, `too_large`) do not retry. Non-permanent failures are retried by QStash.

### Stage 4 — Structured Extraction (worker)

On successful text extraction, the worker calls `POST /internal/resumes/structured-extraction` with the extracted text. The FastAPI service calls the configured AI provider (OpenAI, gpt-5.6-luna in V1) and returns a `ProposedResumeStructuredExtraction`.

Retryable structured extraction statuses: `provider_timeout`, `provider_rate_limited`, `provider_error`.
Permanent statuses: `provider_not_configured`, `invalid_provider_output`.

### Stage 5 — Proposal Persistence (worker)

On successful structured extraction, the worker calls `persistAiProfileProposals`. This function:

- Flattens the structured extraction into field-level `ProfileProposalEnvelope` objects.
- Skips fields with existing proposals that the candidate has already reviewed.
- Supersedes older open proposals from previous resume versions.
- Creates or updates proposals with `reviewStatus = "ai_proposed"`.
- Writes `CandidateActivity` audit events.

The persistence is idempotent by `(candidateId, resumeVersionId, aiProcessingRunId, fieldPath)`.

### Stage 6 — Completion

After proposal persistence, the worker atomically:

- Updates `AIProcessingRun.status = "completed"` with provider/model/token info from the structured extraction response.
- Sets `ResumeVersion.parse_status = "completed"` and `parse_completed_at`.

## Idempotency

- **Confirm route**: the advisory lock on object key in `confirmUploadedResume` ensures at-most-one `ResumeVersion` per object. Retries return the same `resumeVersionId`, which produces the same QStash `deduplicationId`.
- **QStash delivery**: the same `deduplicationId` within the dedup window prevents duplicate delivery.
- **Worker**: early-returns `already_completed` if `parse_status = "completed"`, and `already_processing` if `parse_status = "processing"` with an existing run.
- **Proposals**: idempotent by run+field+candidate, reviewed proposals are never overwritten.

## OCR Required UI State

When text extraction returns `ocr_required` (a scanned image PDF), the worker marks `ResumeVersion.parse_status = "failed"` with `AIProcessingRun.error_detail` containing "ocr_required". Both data access layers (`candidateAccount/data.ts` and `profileReview/candidateAccess.ts`) read the error detail and derive a synthetic `"ocr_required"` status. The UI surfaces "Scan Required" with a prompt to upload a text-based PDF or DOCX.

## AI Processing Run Lifecycle

One `AIProcessingRun` with `run_type = "resume_parse"` covers the entire parse cycle:

1. Created with `model_provider = "none"`, `model_name = "document-text-extraction"`, status = `running`.
2. On failure at any stage: `status = "failed"`, `error_detail` set.
3. On success: updated with the AI provider/model from the structured extraction response, `status = "completed"`, token counts from the AI provider response.

## Security

- No presigned URLs, CV text, or storage credentials are stored or logged.
- The signed upload reference binds the resume to the server-resolved candidate; the worker re-validates candidate ownership.
- AI proposals are never applied to the canonical profile without explicit candidate confirmation.
- Production QStash is not called during development or automated testing.

## Files

| File | Role |
|---|---|
| `lib/jobs/resumeParsing/dispatch.ts` | Build and publish RESUME_PARSE queue envelope |
| `lib/jobs/resumeParsing/processingGate.ts` | Security/malware eligibility check |
| `lib/jobs/resumeParsing/worker.ts` | Full pipeline: gate → text extraction → structured extraction → proposals → completion |
| `lib/jobs/ai/types.ts` | Added `JobsAiStructuredExtractionRequest` / `Response` |
| `lib/jobs/ai/fastApiClient.ts` | Added `extractStructuredResume` method |
| `app/api/jobs/resume/confirm/route.ts` | Dispatch RESUME_PARSE after successful confirm |
| `lib/jobs/candidateAccount/types.ts` | Added `"ocr_required"` to `ResumeDashboardState` |
| `lib/jobs/candidateAccount/service.ts` | OCR state label and routing |
| `lib/jobs/candidateAccount/data.ts` | Read `ai_processing_run.error_detail` for OCR detection |
| `lib/jobs/profileReview/candidateAccess.ts` | OCR detection and `"ocr_required"` in profile review status |
| `scripts/jobsResumeParseOrchestrationTest.mjs` | 27 synthetic assertions, zero live calls |
| `docs/jobs/23-RESUME-PROCESSING-ORCHESTRATION.md` | This document |

## What This Does NOT Do

- Does NOT deploy to staging or production.
- Does NOT make live paid OpenAI calls during automated testing.
- Does NOT publish live QStash messages during automated testing.
- Does NOT use `Jobs CV/` or real candidate CVs.
- Does NOT add malware scanning infrastructure (gate is wired, scanning is a future phase).
- Does NOT build job matching or employer portal features.
- Does NOT modify the Prisma schema (OCR state is derived from existing `AIProcessingRun.error_detail`).
