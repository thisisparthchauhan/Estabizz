# Estabizz Jobs — Phase 5: Secure Resume Upload, Processing and AI Parsing

Date: 2026-09-10
Branch: `staging` (uncommitted at time of writing)
Scope: Backblaze CORS, file-security gate, queue idempotency, status endpoint, AI timeout chain, Render deployment configuration.

STAGING ONLY. No production change. No database migration. No real candidate CV was used at any point.

---

## 1. Backblaze staging CORS

Applied to `estabizz-jobs-staging-private` only. Bucket type left `allPrivate`; lifecycle rules untouched.

**Before** — two rules, both download-only. No `s3_put`, so every browser upload failed preflight.

**After** — the two existing rules preserved byte-for-byte, plus one addition:

```json
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
```

`allowedHeaders: ["*"]` is required because the presigned PUT sends `Content-Type` plus five signed `x-amz-meta-*` headers. The origin list stays exact — no wildcard, no ephemeral deployment URLs.

Verified live: PUT preflight allowed from both approved origins, `403` from an unrelated origin, and GET still allowed only from the staging origin (localhost gained upload, not download).

---

## 2. File-security gate — `lib/jobs/fileSecurity`

**This is structural validation, not malware scanning.** No antivirus engine exists in this system. Nothing in code, status vocabulary, docs or UI claims a file was scanned, and a test asserts that no candidate-facing message makes a safety claim.

| Check | Rule |
|---|---|
| PDF signature | `%PDF-` within the first 1024 bytes (matches pypdf's tolerance) |
| DOCX signature | `PK\x03\x04` at offset 0 |
| DOCX structure | ZIP central directory must contain `[Content_Types].xml` **and** a `word/document.xml` part — a plain ZIP, an XLSX or a PPTX is rejected |
| Blocked formats | MZ, ELF, Mach-O, `#!`, RAR, 7z, gzip, bzip2, xz, Java class, RTF, OLE2 (legacy `.doc`), HTML, `<script`, `<?php` |
| MIME/extension | must agree; PDF and DOCX only |
| Size | positive, non-zero, within the configured limit |
| Content-length | stored object length must equal the signed intent |

Entry points run at **two** points, deliberately:

- **Confirm time** (ranged reads) — rejects before a `ResumeVersion` row exists. Reads the header and the ZIP trailer only, so a 10 MB document is not pulled into the function. A rejected object is best-effort deleted from the temporary prefix.
- **Worker time** (whole buffer) — validates the exact bytes about to be sent to the AI service. This closes the window in which a still-valid presigned PUT could replace a validated object with different bytes of the same declared type and length.

The ZIP reader parses entry **names** only and never decompresses, so it cannot be used to trigger a zip bomb. ZIP64 is rejected rather than mis-parsed.

### Honest scan status

`MalwareScanStatus` gained `not_scanned`, which is now what uploads are stamped with (previously `pending`, which implied a scan was in flight). `checkResumeProcessingGate` treats it explicitly:

- `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED=true` + `not_scanned` → **permanent block, not retryable**. Requiring a scan the system cannot perform correctly stops everything.
- `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED=false` → the operator has knowingly accepted processing unscanned files.

A real AV engine remains a separate proposal.

---

## 3. Idempotency and stale-processing recovery

**Deterministic identity.** `dispatchResumeParse` derives the correlation id from the resume version (`resume-parse-<uuid>`) instead of a fresh `randomUUID()` per call. Retried confirms now produce the same QStash `deduplicationId`.

**Atomic claim.** The worker no longer reads then writes. It issues one conditional `UPDATE`:

```
WHERE id = ? AND candidate_id = ? AND deleted_at IS NULL
  AND ( parse_status IN ('pending','failed')
        OR (parse_status = 'processing' AND updated_at < now() - 15 min) )
SET parse_status = 'processing'
```

Postgres serialises concurrent deliveries, so exactly one wins and the losers match zero rows and return a no-op. `completed` is absent from the predicate, so a duplicate delivery after success can never reprocess.

**Stale recovery.** `updated_at` is `@updatedAt`, so claiming stamps it — it doubles as the lease heartbeat with no new column. A resume still `processing` after 15 minutes (comfortably beyond the 300s function ceiling) is reclaimable, and the abandoned `AIProcessingRun` is closed as failed rather than left running forever.

---

## 4. Candidate status endpoint

`GET /api/jobs/resume/status` — candidate-scoped, polled by the profile page.

Statuses: `none`, `pending`, `processing`, `needs_review`, `completed`, `failed`, `ocr_required`.

The candidate id comes from the server-resolved session and is never accepted from the request, so there is no addressable way to ask about another candidate's resume. The payload carries status, counts and safe file metadata only — no storage key, presigned URL, queue identifier, AI service URL, provider error text or extracted resume content.

The profile page polls it with 2s → 15s backoff while processing is in flight and pulls the full review state once it finishes, so the page resolves on its own instead of requiring a manual reload.

Rate limiting is **fail-open** here (120 per 5 min), unlike the upload endpoints: a rate-limit store outage should not make a candidate's page look permanently stuck, and this is a cheap read of the caller's own row.

---

## 5. Timeout chain

Previously the Node caller's validation capped timeouts at 30s while the AI service was allowed 60s — the caller aborted work the service was still doing.

| Layer | Setting | Value |
|---|---|---|
| QStash delivery | `timeout` | unset — plan maximum (specifying it only shortens) |
| Vercel function | `maxDuration` on the callback route | 300s |
| Node → extract-text | `JOBS_AI_TEXT_EXTRACTION_TIMEOUT_MS` | 45 000 |
| FastAPI text extraction | `JOBS_AI_TEXT_EXTRACTION_TIMEOUT_SECONDS` | 30 |
| Node → structured | `JOBS_AI_STRUCTURED_EXTRACTION_TIMEOUT_MS` | 75 000 |
| FastAPI OpenAI client | `JOBS_AI_EXTRACTION_TIMEOUT_SECONDS` | 60 (unchanged) |
| Node → health | `JOBS_AI_HEALTH_TIMEOUT_MS` | 10 000 |
| Node validation ceiling | — | 120 000 (was 30 000) |

Every caller timeout now exceeds the corresponding service ceiling plus network overhead. The FastAPI extraction budget was **not** shortened; the caller was raised to accommodate it. Worst case for one delivery is 45 + 75 + storage/DB ≈ 130s, inside the 300s ceiling.

The service's single `extraction_timeout_seconds` was split: a cheap byte-parse and an LLM call no longer share one budget.

`maxDuration = 300` requires a Vercel plan permitting 300s functions.

---

## 6. Wire-contract fix (pre-existing bug)

`POST /internal/resumes/structured-extraction` had **never worked over HTTP**. The Next.js client sent snake_case JSON (`resume_version_id`, `extracted_text`, …) while `ResumeStructuredExtractionRequest` is camelCase with `extra="forbid"` — every call was a 422.

It was invisible because the service had never been deployed and the Python tests call the extractor function directly with camelCase objects, bypassing request validation.

The client now sends camelCase, and `test_structured_extraction_wire_contract_matches_the_nextjs_client` pins the exact key casing and asserts snake_case is rejected, so a future drift fails in CI rather than in production.

---

## 7. Upload reference is now encrypted

The upload reference travels through the browser between intent and confirm. It was signed base64url JSON, so any client could read the private storage object key out of it.

It is now AES-256-GCM authenticated encryption (`v2.<iv>.<ciphertext>.<tag>`), with the key derived from the configured secret via HKDF so a reference key cannot be used anywhere else. Tampering fails to decrypt rather than needing a separate signature check. References expire in ≤10 minutes, so there is no compatibility burden from the format change.

---

## 8. AI service hardening

- `/docs`, `/redoc` and `/openapi.json` are disabled unless `APP_ENV` is literally `development`. This is **fail-closed**: an unset or misspelled `APP_ENV` hides the schema rather than exposing it. Previously an unset `APP_ENV` defaulted to `development` and would have published the full internal API surface.
- Public `GET /health` now returns `{status, service}` only. It previously disclosed environment, AI provider, model-configured and database-configured state to any unauthenticated caller. That detail moved to the authenticated `/internal/health`.
- `DATABASE_URL` is deliberately absent from the Render configuration: the service reads it only to report a boolean and never opens a connection.

---

## 9. Render deployment (`render.yaml`)

| Setting | Value | Basis |
|---|---|---|
| ASGI app | `app.main:app` | verified in `services/jobs-ai/app/main.py` |
| Dependencies | `requirements.txt` (pinned) | verified |
| Health check | `GET /health` | unauthenticated, no config disclosed |
| Region | `singapore` | as directed |
| Plan | `free` | owner's decision for staging — see the cold-start note below |
| Python | `3.13.15` | floor is **3.11** — `app/api/resumes.py` catches the builtin `TimeoutError` from `asyncio.wait_for`, which only aliases `asyncio.TimeoutError` from 3.11, and `app/core/config.py` uses PEP 604 unions at runtime. **Verified**, not assumed: a clean 3.13.15 venv built from the pinned `requirements.txt` installs cleanly, imports `app.main`, and passes all 39 tests. Any 3.13.x satisfies the floor. |
| Start | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` | binds `0.0.0.0:$PORT` |

`AI_SERVICE_SECRET` and `OPENAI_API_KEY` are `sync: false` — set in the Render dashboard, never committed. `AI_SERVICE_SECRET` must be byte-identical to the value in Vercel Preview.

### Free plan — cold starts

A free Render instance spins down after inactivity and cold-starts on the next request, which can exceed the caller's 45s text-extraction timeout.

This degrades safely rather than losing work: an AI timeout is classified retryable, the callback route returns 503, QStash re-delivers, and the worker's atomic claim plus stale-processing reclaim make the retry safe. The second delivery lands on a warm instance.

**Expected behaviour:** the first resume processed after an idle period takes one extra retry cycle. Move to `starter` if that latency becomes unacceptable.

### DATABASE_URL — not required

Confirmed by inspection, not assumption:

- `requirements.txt` contains no database driver
- nothing under `app/` imports psycopg, asyncpg, SQLAlchemy, SQLModel or Prisma
- the only read of the value is `bool(settings.database_url)`, a boolean on the authenticated `/internal/health` response

The service never opens a connection. `DATABASE_URL` is deliberately absent from `render.yaml` and must stay absent — giving a public AI worker Neon credentials it cannot use would be pure exposure. All database access stays in Next.js on Vercel. The one visible effect is that `/internal/health` reports `database_configured: false`, which is accurate.

---

## 10. Owner runbook (remaining manual steps)

1. **Vercel Preview environment** — could not be inspected from this machine; the stored Vercel CLI session is expired. Run:
   ```
   npx vercel login
   npx vercel link --yes
   npx vercel env ls preview
   ```
   Confirm present: `DATABASE_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, `VERCEL_AUTOMATION_BYPASS_SECRET`, all `JOBS_OBJECT_STORAGE_*`.
   `UPSTASH_REDIS_REST_*` are **required**: the upload endpoints are fail-closed and return 503 without them.
2. **Deploy Render** from `render.yaml` (Blueprint), set the two secrets, note the service URL.
3. **Add to Vercel Preview**: `JOBS_AI_SERVICE_URL=<render url>`, `AI_SERVICE_SECRET=<same secret>`, `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED=false`, and the three `JOBS_AI_*_TIMEOUT_MS` values.
4. **Confirm the Vercel plan allows `maxDuration = 300`**, or the callback route will fail to deploy.
5. **Decide on Vercel SSO deployment protection.** While it is on, browser testing of staging requires an SSO session, and QStash callbacks work only because the dispatcher sends `x-vercel-protection-bypass`.
