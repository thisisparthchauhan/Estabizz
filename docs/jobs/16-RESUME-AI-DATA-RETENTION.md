# Estabizz Jobs — Resume AI Data Retention Foundation

Status: Foundation complete, pending AI provider selection.

This document defines the data-handling boundary for resume AI processing before any LLM, OCR, embedding, or matching provider is connected.

## 1. Storage Boundary

The original CV remains the system of record for the uploaded document and is stored only in the private Backblaze/S3-compatible document storage layer.

The PostgreSQL Jobs database stores document identifiers and processing state, not public file URLs or file contents.

Allowed PostgreSQL document references:

- `ResumeVersion.file_storage_key`
- `ResumeVersion.file_name_original`
- `ResumeVersion.file_type`
- `ResumeVersion.file_size_bytes`
- `ResumeVersion.parse_status`
- `ResumeVersion.parse_completed_at`
- `ResumeVersion.ai_processing_run_id`

Not allowed in PostgreSQL:

- complete raw CV text
- permanent public CV URLs
- presigned download URLs
- private storage credentials
- service secrets

## 2. Transient Extracted Text

Raw extracted resume text is transient processing data only.

Retention rule:

```text
private CV -> short-lived server-side download -> FastAPI text extraction -> transient in-memory text -> discard
```

Raw extracted text must not be written to:

- PostgreSQL normal tables
- audit event payloads
- QStash payloads
- application logs
- error messages
- AI request/response archive fields
- build or smoke-test files

The current worker strips the FastAPI response down to safe extraction metadata before updating PostgreSQL.

## 3. Structured Data Persistence

Structured AI output may later be persisted as proposed profile facts, not as raw CV text.

Permitted future persistence:

- candidate name
- email
- mobile
- location
- current designation
- current employer
- total experience
- employment history
- education
- skills, tools, technologies
- regulatory and financial domains
- certifications
- languages
- notice period, only if explicitly present
- current or expected compensation, only if explicitly present

Each extracted field must be capable of carrying:

- value
- confidence
- provenance
- candidate review status

The `AIExtraction` table is the intended persistence surface for proposed field-level AI facts. Candidate master-profile tables are updated only after an approved application path applies the proposed fact.

## 4. Metadata Persistence

PostgreSQL may persist safe AI processing metadata:

- `AIProcessingRun.run_type`
- `AIProcessingRun.entity_type`
- `AIProcessingRun.entity_id`
- provider/model metadata, once a provider is approved
- processing status
- start/completion timestamps
- duration
- character/page counts where representable by existing fields
- extraction method where representable by existing model metadata
- OCR-required result through safe failure/warning paths
- sanitized warnings and errors

Current V1 foundation uses:

- `AIProcessingRun.output_tokens` as a safe character-count proxy for text extraction
- `AIProcessingRun.error_detail` for sanitized failure details only
- `ResumeVersion.parse_status` for lifecycle state

No schema change is required for this boundary.

## 5. Logging Restrictions

Do not log:

- raw extracted text
- uploaded file bytes
- presigned download URLs
- QStash tokens or signing keys
- `AI_SERVICE_SECRET`
- storage credentials
- complete future LLM prompts containing resume text
- complete future LLM responses containing resume text

Errors should be generic and sanitized. The resume parsing worker uses explicit redaction helpers for processing messages before they can be returned or stored.

## 6. QStash Privacy

`RESUME_PARSE` jobs must remain identifier-only.

Allowed payload fields:

```json
{
  "resumeVersionId": "uuid",
  "candidateId": "uuid"
}
```

Disallowed QStash payload data:

- candidate name
- email
- phone number
- original file bytes
- signed URLs
- raw extracted text
- future LLM prompts or responses

## 7. AI Provider Boundary

No OpenAI, Gemini, Claude, OCR, embedding, or candidate matching provider is connected in this phase.

Future AI provider code must treat full resume text as high-sensitivity transient input. It may send resume text only to an approved provider under an approved data-processing configuration, and it must not persist the full prompt or response if either contains raw resume text.

Future provider metadata may be stored in `AIProcessingRun`:

- provider
- model name
- model version
- duration
- token counts
- sanitized error detail

## 8. Candidate Review Model

AI extraction is proposed profile data.

Candidate-confirmed information must not be silently overwritten by AI.

Future flow:

```text
AI proposes field
  -> candidate reviews
  -> candidate edits/confirms/rejects
  -> approved value is applied to Candidate master profile
```

Recruiters may later review or verify proposed facts, but that must remain separate from candidate confirmation.

## 9. Provenance And Confidence

Future extracted fields must support:

- confidence score
- resume version ID
- AI processing run ID
- source kind
- page number when available
- section label when available
- extraction method

Provenance must not require storing raw source text. Short evidence snippets should be avoided unless a later security review explicitly approves a redacted snippet policy.

## 10. Structured Extraction Contract

The TypeScript foundation defines a future structured extraction contract under:

```text
lib/jobs/resumeParsing/structuredExtraction.ts
```

Covered areas:

- identity
- contact
- professional history
- education
- skills, tools, technologies
- RBI, SEBI, IRDAI, IFSCA, NBFC, Insurance, Banking, Fintech, Capital Markets, Compliance, Risk, Audit, Legal/CS domains
- certifications
- languages
- notice period, only if present
- compensation, only if present

The contract is provider-neutral and does not call an AI model.

## 11. Current Audit Result

Reviewed current resume parsing pipeline for accidental raw-text exposure.

Result:

- PostgreSQL persistence: safe; raw text is not stored.
- QStash payload: safe; identifiers only.
- Logs: safe; no raw text logging found.
- Errors: hardened with redaction helper.
- Audit events: no resume parse audit payload currently writes raw text.
- Signed URLs: generated and consumed server-side only; not stored.

## 12. Blockers Before Provider Selection

Before choosing an AI provider, approve:

- AI provider data-processing terms
- whether resume text may leave Estabizz-controlled infrastructure
- prompt/response retention settings with the provider
- whether any redacted evidence snippet policy is needed
- candidate consent requirements for AI processing
