# Estabizz Jobs - Resume Parsing Pipeline Foundation

Status: V1 foundation only.

This phase creates the secure workflow and document-text extraction layer for future resume parsing. It does not connect OpenAI, Gemini, Claude, embeddings, OCR, candidate-job matching, auto-rejection, or production AI.

## 1. Request Flow

```text
Candidate/admin upload flow
  -> ResumeVersion row
  -> QStash RESUME_PARSE job
  -> Next.js protected queue worker
  -> private object storage metadata/download
  -> FastAPI internal text extraction
  -> ResumeVersion parse_status + AIProcessingRun update
  -> future structured parsing stage
```

Next.js owns business state and queue-worker orchestration. FastAPI extracts document text only.

## 2. Queue Contract

The job type is:

```text
RESUME_PARSE
```

The payload is intentionally identifier-only:

```json
{
  "resumeVersionId": "uuid",
  "candidateId": "uuid"
}
```

The queue envelope still carries `jobId`, `idempotencyKey`, `correlationId`, `attempt`, `requestedBy`, and `environment`.

The QStash payload must not include:

- resume file bytes
- signed Backblaze URLs
- candidate email
- candidate mobile
- extracted resume text
- unnecessary PII

## 3. Queue Worker

Worker route:

```text
POST /api/jobs/queue/resume-parse
```

The worker:

1. Reads the raw body.
2. Verifies the QStash signature.
3. Parses and validates the `RESUME_PARSE` envelope.
4. Enforces idempotency through existing `ResumeVersion.parse_status`.
5. Resolves `ResumeVersion` from PostgreSQL.
6. Resolves the private storage object through the existing document-storage abstraction.
7. Downloads the private object server-side only through a short-lived signed URL.
8. Calls FastAPI using the internal service-secret client.
9. Updates `AIProcessingRun` and `ResumeVersion` only.
10. Does not update Application history or stage history.

## 4. Private Storage Boundary

The resume remains in the private Backblaze/S3-compatible bucket.

The signed storage URL is generated and consumed server-side only. It is not placed in the QStash payload, response body, logs, database rows, or browser-visible code.

The worker validates:

- object exists
- object belongs to the candidate path
- MIME type is allowed by the storage layer
- file size does not exceed configured limits

## 5. FastAPI Boundary

FastAPI endpoint:

```text
POST /internal/resumes/extract-text
```

It requires:

```text
x-estabizz-service-secret: <AI_SERVICE_SECRET>
```

The endpoint accepts multipart form data over the internal server-to-server connection. This avoids exposing private resume URLs to FastAPI logs or to public clients.

## 6. Document Extraction

Supported V1 formats:

- PDF
- DOCX

Implemented extraction methods:

- PDF: `pypdf`
- DOCX: `python-docx`

Not implemented:

- OCR
- scanned image extraction
- DOC binary extraction
- LLM structured parsing

If a PDF contains no embedded text, FastAPI returns `ocr_required` and `requiresOcr=true`.

## 7. Extraction Result Contract

FastAPI returns:

```text
status
text
pageCount
detectedMimeType
characterCount
extractionMethod
warnings
requiresOcr
```

The worker does not store the full extracted text in PostgreSQL in this foundation phase because the frozen schema does not contain a dedicated raw-text field. Structured, reviewed AI outputs will be added later through the AI-owned tables.

## 8. Retry and Idempotency

Idempotency:

- `ResumeVersion.parse_status=completed` returns a safe no-op.
- `ResumeVersion.parse_status=processing` with an active run returns a safe no-op.
- failed resumes may be retried by creating a new `AIProcessingRun`.

Retryable failures return a non-2xx worker response for QStash retry behavior.

Permanent failures are recorded and acknowledged so QStash does not retry indefinitely.

Permanent examples:

- unsupported type
- corrupt document
- encrypted/password-protected PDF
- OCR required
- empty document
- too large

Retryable examples:

- private storage temporary download failure
- FastAPI temporary failure
- extraction timeout

## 9. Processing States

Existing Prisma fields are used. No schema change was required.

Foundation mapping:

| Conceptual state | Current storage |
|---|---|
| uploaded / queued | `ResumeVersion.parse_status=pending` |
| processing | `ResumeVersion.parse_status=processing` + `AIProcessingRun.status=running` |
| text extracted / parsing pending | `ResumeVersion.parse_status=completed` + `AIProcessingRun.status=completed` |
| failed | `ResumeVersion.parse_status=failed` + `AIProcessingRun.status=failed` |

Future richer states can be considered in a reviewed migration if the product needs to distinguish raw text extraction from structured parsing.

## 10. Security Controls

- QStash signature verification is required.
- FastAPI internal service secret is required.
- `AI_SERVICE_SECRET` remains server-side only.
- QStash payload contains identifiers only.
- No candidate email/mobile is queued.
- Private storage signed URLs are not logged or queued.
- Extracted resume text is not logged.
- Errors are sanitized before persistence/response.
- Production is not touched.

## 11. Tests

FastAPI tests use synthetic files only and cover:

- public health endpoint
- protected internal health endpoint
- valid PDF text extraction
- valid DOCX text extraction
- missing/invalid internal secret
- unsupported type
- empty document
- corrupt document
- scanned/image-only PDF behavior

Next.js validation is covered by the typed `RESUME_PARSE` contract, queue worker signature-verification path, idempotent status handling, safe AI client errors, and TypeScript validation.

## 12. Future LLM Structured Parsing

The next AI stage may read extracted text and produce structured candidate facts. That later stage must:

- use AI-owned tables only
- keep AI advisory
- avoid automatic rejection
- record model provider/name/version
- require human review before changing candidate business state

No AI provider is connected in this foundation phase.
