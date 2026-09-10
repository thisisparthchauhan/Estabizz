# Estabizz Jobs — Phase 5A Current-State Audit

Date: 2026-09-10
Branch: `staging` @ `8859121`
Scope: secure resume upload → B2 → processing queue → text extraction → AI parse → profile proposal → candidate review.

Nothing was committed, pushed, deployed or migrated. Production untouched. No real CV was opened, uploaded or processed.

---

## 0. Path corrections

The Phase 5 brief names three directories that do not exist. Real names:

| Brief | Actual |
|---|---|
| `lib/jobs/resumeProcessing/**` | `lib/jobs/resumeParsing/**` |
| `lib/jobs/candidateProfile/**` | `lib/jobs/profileReview/**` |
| `JOBS_AI_BASE_URL` | `JOBS_AI_SERVICE_URL` |

---

## 1. Existing upload architecture (as built)

```
candidate session (server-resolved candidateId + actorRefId — never client-supplied)
  → POST /api/jobs/resume/upload-intent      rate-limited, fail-closed
  → S3 presigned PUT, key = tmp/candidates/{candidateId}/{uuid}.{pdf|docx}
  → browser XHR PUT direct to private Backblaze B2 bucket
  → POST /api/jobs/resume/confirm            HMAC uploadRef + HeadObject verification
  → ResumeVersion (parse_status=pending) + Candidate.current_resume_version_id + CandidateActivity
  → dispatchResumeParse → QStash publishJSON
  → POST /api/jobs/queue/resume-parse        Upstash Receiver signature verification
  → processResumeParseJob
       → AIProcessingRun(running)
       → HeadObject + MIME + size + malware gate
       → presigned GET → bytes in memory
       → FastAPI POST /internal/resumes/extract-text      (pypdf / python-docx)
       → FastAPI POST /internal/resumes/structured-extraction (OpenAI strict json_schema)
       → persistAiProfileProposals → AIExtraction rows (reviewStatus = ai_proposed)
       → AIProcessingRun(completed) + ResumeVersion(completed)
  → /jobs/account/profile → section-by-section accept / edit / reject / confirm
  → approved fields only → Candidate + CandidateContact
```

---

## 2. A — Already complete and verified working

| Area | Evidence |
|---|---|
| Server-side upload validation | MIME allowlist (PDF/DOCX only, DOC excluded), extension↔MIME agreement, size limit, zero-byte rejection, filename normalisation |
| Upload token | HMAC-SHA256, `timingSafeEqual`, expiry, binds candidateId + actorRefId + objectKey + contentType + contentLength |
| Ownership | confirm re-resolves the session candidate and rejects any key outside `tmp/candidates/{sessionCandidateId}/` |
| Post-upload verification | `HeadObject` — object exists, key matches, content-type matches, content-length matches, within limit |
| Confirm idempotency | `pg_advisory_xact_lock(hashtext(objectKey))` + existing-row lookup inside one transaction |
| Versioning | version_number increment, `is_current` flip, `current_resume_version_id` update, CandidateActivity row |
| Storage abstraction | provider-neutral `PrivateDocumentStorage`; S3-compatible adapter; env-driven; staging/production bucket-name cross-checks |
| Bucket privacy | `estabizz-jobs-staging-private` is `allPrivate` (verified live) |
| Server-side B2 round trip | `scripts/jobsStorageSmokeTest.ts` run today: connection, upload, metadata, download, delete, cleanup — all PASS |
| QStash adapter | `Receiver.verify` with current+next signing keys, clock tolerance, dedup id, flow control (parallelism 1 per candidate), retries + backoff, body/header redaction, Vercel bypass header |
| Envelope contract | jobType, environment match, UUID checks on resumeVersionId + candidateId |
| Worker pipeline | full path implemented incl. AIProcessingRun lifecycle and permanent-vs-retryable classification |
| Text extraction | PDF via pypdf, DOCX via python-docx incl. tables; statuses `text_extracted / ocr_required / corrupt_document / encrypted_document / empty_document / unsupported_type / too_large / timeout`; never returns an empty success |
| AI parser | OpenAI provider, `strict: true` json_schema structured outputs, refusal + finish_reason handling, typed provider errors |
| AI safety prompt | ignores instructions embedded in resume text; forbids inferring age/religion/caste/ethnicity/politics/marital status/disability/orientation; forbids scoring; forbids tools/browsing/retrieval; null for unknown; `reviewStatus` pinned to `ai_proposed` at schema level |
| Human-review gate | AI never writes Candidate directly; proposals → accept/edit/reject → `applyCanonicalPatch` only on confirm |
| Cross-candidate authz | `assertCandidateScope` + `proposal.candidateId !== candidateId` on every proposal action |
| Raw-text retention | verified: worker discards `text`, `normalizeProvenance` drops `sourceEvidence`, nothing persists resume text |
| Log hygiene | `sanitizeResumeProcessingMessage` redacts emails, phone numbers, URLs, bearer/basic tokens, `X-Amz-*` query params, long base64 |
| Build gates | `npx tsc --noEmit` clean; `npm run build` clean; 4 node synthetic suites PASS; 35 pytest PASS |
| Model/provider | `gpt-5.6-luna` confirmed available on the configured OpenAI key — **no change proposed** |

---

## 3. C — Broken / blocking

### C1. Backblaze CORS blocks the browser PUT — confirmed live today
The bucket has exactly two CORS rules, both **download-only**:

```
downloadFromThisOneOrigin     ops: b2_download_file_by_id, b2_download_file_by_name
s3DownloadFromThisOneOrigin   ops: s3_head, s3_get
allowedHeaders: ["authorization", "range"]
allowedOrigins: ["https://estabizz-git-staging-thisisparthchauhans-projects.vercel.app"]
```

`s3_put` is absent. Live preflight test:

```
OPTIONS …/tmp/candidates/…/probe.pdf
  Origin: https://estabizz-git-staging-…vercel.app  → 403 "This CORS request is not allowed"
  Origin: http://localhost:3000                     → 403 "This CORS request is not allowed"
```

The entire browser upload path is dead in **every** environment. `allowedHeaders` also excludes `content-type` and the five signed `x-amz-meta-*` headers the presigned PUT sends.

### C2. Malware gate is a permanent deadlock
- `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED` defaults to **`true`** (`config.ts:48`) and is unset in `.env.local`.
- The presigned upload stamps signed metadata `x-amz-meta-malware-scan-status: pending`.
- Nothing anywhere ever changes that value — there is no scanner.
- `checkResumeProcessingGate` → `awaiting_scan`, `retryable: true` → every job fails, retries exhaust, `parse_status = failed`.
- Doc 23 claims "V1 ships with `malwareScanningRequired=false`". **The code default contradicts the doc.**

### C3. FastAPI AI service is not deployed and not configured
- `JOBS_AI_SERVICE_URL` — **MISSING**
- `AI_SERVICE_SECRET` — **MISSING**
- No `Dockerfile`, `render.yaml`, `fly.toml`, `Procfile`, `railway.*` or `docker-compose*` exists anywhere in the repo.

The worker fails at `extract-text` with "Jobs AI service is not configured", `retryable: true`.

### C4. Deployed staging is behind Vercel SSO deployment protection
Every request returns `401 Protected deployment` (`vercel_auth_enabled: true`). Browser candidate testing is impossible without an SSO session. QStash callbacks depend on `VERCEL_AUTOMATION_BYPASS_SECRET` being present in the **Vercel project env** — the code sends the header, but I cannot verify the Vercel-side value from here (no Vercel CLI, `.vercel/` holds only `repo.json`).

### C5. Duplicate queue delivery can create duplicate candidate data
`dispatchResumeParse` generates a fresh `randomUUID()` correlationId on every call, so the QStash `deduplicationId` differs on every confirm retry. Two near-simultaneous deliveries can both observe `parse_status = "pending"`, both create an `AIProcessingRun`, both call OpenAI (double spend), and both persist proposals — proposal idempotency is keyed on `aiProcessingRunId`, which differs. **The brief explicitly forbids this.**

### C6. Stuck `processing` is terminal
If a worker invocation dies mid-flight (Vercel function timeout), `parse_status` stays `processing` with a run id. Every retry hits the `already_processing` guard and returns `ok: true`. The resume never parses, never fails, and the UI shows "Processing" forever. No reaper, no lease, no expiry.

### C7. No status polling and no status endpoint
After a successful confirm the client hard-codes local state to `processing`. There is no `GET` resume-status route and no polling. The candidate must manually reload the page — indefinitely — to ever see proposals.

### C8. Real candidate CVs were unprotected in the repo — FIXED
`Estabizz Jobs CV/` held 5 real, named candidate CVs (~2.6 MB), untracked but **not gitignored** — the rule was `Jobs CV/` and the folder had been renamed. `git add -A` would have committed real people's resumes to a public GitHub repo.

Fixed in this session: `.gitignore` now covers `Estabizz Jobs CV/`, the Python venv/pycache, and the loose build/diff scratch files. Nothing was committed.

### C9. AI timeout ceiling is below the AI service's own timeout
`JOBS_AI_REQUEST_TIMEOUT_MS` defaults to 5000 ms and `validateJobsAiServiceConfig` **caps it at 30000 ms**, while `JOBS_AI_EXTRACTION_TIMEOUT_SECONDS=60` on the service side. The Next.js caller will abort a structured extraction the FastAPI service is still happily running. Slow extractions are guaranteed to fail on the caller side.

---

## 4. D — Missing

| # | Gap |
|---|---|
| D1 | **Malware scanning does not exist.** `MalwareScanner` in `documentStorage/types.ts` is an interface with **zero implementations**. |
| D2 | No magic-byte / file-signature validation anywhere. Content-Type is signed (so it can't be tampered with post-signature), but the **bytes are never inspected**. |
| D3 | No PDF `%PDF-` header check, no DOCX ZIP/OOXML structure check, no explicit reject-list for executable/script/archive payloads. |
| D4 | No resume audit events. `resume.uploaded` / `processing_started` / `processing_completed` / `processing_failed` are absent. Upload writes only `CandidateActivity`; `AuditEvent` is used only for the proposal lifecycle. |
| D5 | No promotion from `tmp/` to `candidates/{id}/resumes/…`. `temporaryUploadTtlMinutes` is **dead config** (referenced only in `config.ts`/`types.ts`). The B2 bucket has **zero lifecycle rules**. Resumes live permanently under a prefix named `tmp`. |
| D6 | `ocr_required` is not a `ParseStatus` enum value — it is derived by string-matching `error_detail.toLowerCase().includes("ocr_required")`. Fragile, but it works and it avoids a migration. |
| D7 | No admin resume view/download route. `createPresignedDownload` exists in the adapter but no route calls it under `manage_jobs`. |
| D8 | `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` missing locally. Both resume endpoints are **fail-closed** and return 503 in any `NODE_ENV=production` runtime without them. |
| D9 | FastAPI exposes `/docs` and an unauthenticated `GET /health` — both should be closed before it is publicly reachable. |

---

## 5. E — Deployed vs local-only

| Component | State |
|---|---|
| Next.js app | Deployed to Vercel staging, **SSO-protected (401 to everything)** |
| FastAPI `services/jobs-ai` | **Local only. Never deployed. No deployment artifact of any kind.** |
| B2 staging bucket | Live, private, server-side access verified working today |
| QStash | Credentials configured locally; `JOBS_QUEUE_BASE_URL` points at the staging Vercel URL; end-to-end delivery **never verified** |
| OpenAI | Key valid, `gpt-5.6-luna` available; **no live extraction call has ever been made** |
| Postgres | 4 migrations applied; schema has an uncommitted GIN-index drift-guard edit (declarative only, no DDL) |

---

## 6. Environment variables — configured / missing

Local `.env.local` (values never read out):

**Configured:** `APP_ENV=staging`, `DATABASE_URL`, `JWT_SECRET`, `JOBS_OBJECT_STORAGE_*` (provider/bucket/region/endpoint/keys/path-style), `JOBS_QUEUE_PROVIDER`, `JOBS_QUEUE_BASE_URL`, `JOBS_QUEUE_SMOKE_TEST_ENABLED`, `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, `VERCEL_AUTOMATION_BYPASS_SECRET`, `OPENAI_API_KEY`, `JOBS_AI_PROVIDER=openai`, `JOBS_AI_MODEL=gpt-5.6-luna`, `JOBS_AI_EXTRACTION_TIMEOUT_SECONDS=60`, `MONGODB_URI`, `RESEND_API_KEY`, `JOBS_EMAIL_*`

**Missing / blocking:**

| Var | Impact |
|---|---|
| `JOBS_AI_SERVICE_URL` | AI pipeline cannot run |
| `AI_SERVICE_SECRET` | AI pipeline cannot run |
| `UPSTASH_REDIS_REST_URL` | resume endpoints 503 in production runtimes |
| `UPSTASH_REDIS_REST_TOKEN` | resume endpoints 503 in production runtimes |
| `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED` | defaults `true` → permanent gate deadlock (C2) |

**Missing, non-blocking:** `JOBS_RESUME_UPLOAD_TOKEN_SECRET` (falls back to `JWT_SECRET` — works, but the upload token shares the session-JWT secret), `NEXT_PUBLIC_APP_ENV`, `JOBS_AI_REQUEST_TIMEOUT_MS`, `JOBS_DOCUMENT_MAX_UPLOAD_MB` (defaults 10 MB), `JOBS_DOCUMENT_PRESIGNED_*_TTL_SECONDS`.

Vercel staging env could not be read from this machine (no Vercel CLI). **Must be verified by the owner before any deployed test.**

---

## 7. Required Backblaze CORS rule

Not applied. Reported only, per the brief.

B2's web console cannot express this — it only offers coarse share presets. It needs the native B2 API or CLI. The existing storage key already carries `writeBuckets`, so **no new credentials are required**.

`b2_update_bucket` **replaces the whole `corsRules` array**, so both existing download rules must be resent:

```json
[
  {
    "corsRuleName": "downloadFromThisOneOrigin",
    "allowedOrigins": ["https://estabizz-git-staging-thisisparthchauhans-projects.vercel.app"],
    "allowedOperations": ["b2_download_file_by_id", "b2_download_file_by_name"],
    "allowedHeaders": ["authorization", "range"],
    "exposeHeaders": null,
    "maxAgeSeconds": 3600
  },
  {
    "corsRuleName": "s3DownloadFromThisOneOrigin",
    "allowedOrigins": ["https://estabizz-git-staging-thisisparthchauhans-projects.vercel.app"],
    "allowedOperations": ["s3_head", "s3_get"],
    "allowedHeaders": ["authorization", "range"],
    "exposeHeaders": null,
    "maxAgeSeconds": 3600
  },
  {
    "corsRuleName": "s3UploadFromApprovedOrigins",
    "allowedOrigins": [
      "https://estabizz-git-staging-thisisparthchauhans-projects.vercel.app",
      "http://localhost:3000"
    ],
    "allowedOperations": ["s3_put"],
    "allowedHeaders": ["*"],
    "exposeHeaders": ["etag"],
    "maxAgeSeconds": 3600
  }
]
```

`allowedHeaders: ["*"]` is required because the presigned PUT sends `Content-Type` plus five signed `x-amz-meta-*` headers. Narrowing it means enumerating all six exactly; any mismatch fails the preflight silently in the browser.

This is **staging-bucket only**. The production bucket must not be touched.

---

## 8. DB changes required: **NO**

Phase 5 fits the existing schema.

- `AuditEvent.action` is `VarChar(100)` free string → the six proposed event names need no migration.
- `ocr_required` stays derived from `AIProcessingRun.error_detail`.
- The file-security gate should run **at confirm time, before the ResumeVersion row is created**, so it needs no new column.

Deliberately deferred (each would need a migration, none is needed now): a real `ParseStatus.ocr_required` value; a `malware_scan_status` column on `ResumeVersion`; the partial unique index `UNIQUE (candidate_id) WHERE is_current = true` that doc 22 still lists as pending; a worker lease/heartbeat column for C6.

If any of these turns out to be required mid-implementation, work stops and the exact proposed change is reported first.

---

## 9. Recommended Phase 5 sequence

**Gate 0 — owner decisions (blocking, cannot be resolved from code)**
1. Apply the B2 CORS rule above to the staging bucket (owner applies, or approves me applying it with the existing key).
2. Decide the FastAPI staging host. Recommendation: **Render.com web service** — persistent process, no request-duration ceiling problem, straightforward Python deploy, free/starter tier adequate for staging. Alternatives: Fly.io, Railway. Vercel Python functions are a poor fit given the 30–60 s extraction window.
3. Confirm whether Vercel SSO protection stays on for staging. If it stays, QStash callbacks work only if `VERCEL_AUTOMATION_BYPASS_SECRET` is set in the Vercel env, and browser testing needs an SSO session.

**5B — File security gate (do this before anything touches real bytes)**
4. Implement a synchronous confirm-time gate: PDF/DOCX allowlist, size ceiling, object existence, **magic-byte validation** (`%PDF-` header for PDF; `PK\x03\x04` + `[Content_Types].xml` + `word/document.xml` for DOCX), reject archive/executable/script signatures. Fetch only the first few KB via a ranged GET, not the whole object.
5. Set `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED=false` explicitly and rewrite the gate so `skipped` is the honest recorded state. **Nothing in code, docs or UI may claim files are virus-scanned.** A real AV engine (ClamAV sidecar or a scanning API) is proposed separately, after Phase 5.

**5D/5C — Queue correctness**
6. Make the idempotency key deterministic: derive `correlationId` from `resumeVersionId` so retried confirms reuse one QStash `deduplicationId`.
7. Claim the job with a conditional write — `updateMany where { id, parse_status: { in: ["pending","failed"] } } → processing` — and treat a zero-row result as "already claimed". This closes the double-OpenAI-spend window.
8. Add a stale-`processing` reclaim (age-based, using `AIProcessingRun.started_at`) so C6 stops being terminal.

**5K/5F — AI service**
9. Add the deployment artifact for `services/jobs-ai`, deploy to staging, close `/docs` and the unauthenticated `/health` outside development, set `JOBS_AI_SERVICE_URL` + `AI_SERVICE_SECRET` in Vercel and locally.
10. Raise the `JOBS_AI_REQUEST_TIMEOUT_MS` ceiling above the service-side extraction timeout, or lower the service-side timeout beneath it. They must not disagree.
11. Run `scripts/jobsAiInternalHealthCheck.mjs` against the deployed service.

**5H/5E — Candidate UX**
12. Add `GET /api/jobs/resume/status` (candidate-scoped, safe fields only) and poll it from the client with backoff, so Uploading → Uploaded → Processing → Needs review / Failed / Scan required resolves without a manual reload.

**5J — Audit**
13. Emit `resume.uploaded`, `resume.processing_started`, `resume.processing_completed`, `resume.processing_failed` into `AuditEvent` alongside the existing proposal events. No resume contents in metadata. No schema change.

**5L — Testing (synthetic only)**
14. Generate 6 synthetic fixtures — valid PDF, valid DOCX, oversized, wrong-extension, invalid/corrupt PDF, image-only PDF — under the scratch directory, never in the repo.
15. Test the full matrix: happy path both formats; duplicate confirm; duplicate queue delivery; cross-candidate confirm/fetch/apply; expired token; tampered token; invalid MIME; invalid magic bytes; unauthenticated queue callback; private-object direct access denial; scanned PDF → `ocr_required`.
16. Re-run `npx tsc --noEmit`, `npm run build`, all four node suites, and pytest.
17. Live OpenAI call on the synthetic fixture — **only on explicit approval**, since it is a paid call.

**Deliberately out of scope for Phase 5:** real AV engine, OCR, `tmp/` → permanent-prefix promotion + lifecycle rules, admin resume download route, any Prisma migration.
