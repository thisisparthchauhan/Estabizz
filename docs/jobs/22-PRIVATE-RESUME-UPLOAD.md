# Estabizz Jobs — Private Resume Upload Integration V1

Status: Foundation implemented locally; not deployed.

## Scope

This phase connects authenticated candidate resume upload to the existing Jobs identity, private document storage and `ResumeVersion` architecture. It does not call OpenAI, publish `RESUME_PARSE` to QStash, perform AI extraction, use `Jobs CV/`, deploy, or touch production.

## Candidate Authorization

Resume upload is candidate-scoped server-side:

1. Existing website `auth_token` is verified.
2. MongoDB `User` is loaded by the JWT user id.
3. Jobs `IdentityReference` is resolved or created.
4. Jobs `Candidate` is resolved or created.
5. Upload intent and confirmation use only the server-resolved `candidateId` and `actorRefId`.

The browser never supplies an authoritative `candidateId`, `identityReferenceId` or `userId`.

## Upload Intent Flow

`POST /api/jobs/resume/upload-intent` accepts only file metadata:

- filename
- MIME type
- byte size

The server validates the file and creates a short-lived private presigned upload URL through the existing document-storage abstraction. The response includes a signed upload reference. The upload reference binds the candidate, actor, object key, expected type, expected size and expiry.

## Presigned Private Upload

The browser uploads directly to the private Backblaze/S3-compatible bucket using the presigned URL and required headers. Large CV bytes do not pass through a general public Next.js upload endpoint. The bucket remains private and no permanent public URL is created.

## Object Key Design

Object keys are generated server-side under the candidate-scoped temporary private prefix:

`tmp/candidates/{candidate_uuid}/{opaque_upload_uuid}.{pdf|docx}`

The object key does not include candidate name, email, mobile number or original filename. Confirmation rejects keys outside the authenticated candidate prefix. V1 stores this verified private object key in `ResumeVersion.file_storage_key`. A future storage-copy/promotion operation may move verified objects to the final `candidates/{candidate_uuid}/resumes/...` prefix without changing candidate authorization.

## File Validation

Resume upload V1 supports:

- PDF
- DOCX

DOC is not advertised or accepted for resume upload V1, even though the lower-level document-storage foundation can support generic DOC documents later.

Validation occurs server-side and checks:

- allowed MIME type
- matching filename extension
- configured storage file-size limit
- non-empty file metadata
- uploaded object exists during confirmation
- uploaded object content type matches intent
- uploaded object size matches intent
- zero-byte object rejection

Client-side checks are only for faster feedback.

## Upload Confirmation

`POST /api/jobs/resume/confirm` accepts only the signed upload reference. It re-resolves the authenticated candidate, verifies the signed reference, checks candidate ownership, reads private object metadata from storage, and only then creates resume records.

The browser declaration that an upload succeeded is not trusted by itself.

## ResumeVersion Creation

After storage verification, the server creates a `ResumeVersion` with:

- candidate id
- version number
- private storage key
- safe filename
- MIME type
- file size
- uploader identity reference
- parse status `pending`

No presigned URL, raw CV text, public URL, storage credential or service secret is stored.

## Current Resume Versioning

Each verified upload creates the next version number for the candidate. Previous `ResumeVersion` rows are preserved. A successful new upload marks older current rows as non-current and updates `Candidate.current_resume_version_id` to the new resume.

Failed or incomplete uploads do not change the existing current resume.

## Retries And Idempotency

The confirmation path is retry-safe:

- the signed upload reference identifies one object
- confirmation first checks for an existing resume with the same private object key
- duplicate confirmation returns the existing `ResumeVersion`
- the database transaction uses an advisory lock on the object key before creating the new version

The schema-level current-resume partial unique index continues to enforce one current resume per candidate.

## Dashboard And Profile UX

`/jobs/account/profile` now includes a working Resume panel with:

- current resume status
- safe filename
- file type
- file size
- uploaded date
- upload/replace action
- upload progress
- verification state
- safe errors

`/jobs/account` treats pending uploaded resumes as "Resume Uploaded" until the next approved QStash/FastAPI/AI processing phase starts.

## Rate Limiting

Both mutation endpoints use the existing shared Upstash-backed rate-limit helper:

- `jobs-resume-upload-intent`
- `jobs-resume-upload-confirm`

The policy is fail-closed for uncontrolled upload-intent generation and confirmation attempts.

## Malware Scan Boundary

Malware scanning is not implemented in this phase. The UI and docs must not claim files are virus scanned, malware checked or safe. Uploaded resumes are stored and verified only.

Before production AI processing, the next pipeline must add or integrate malware scanning and define the gate for `safe_to_process`.

## Privacy

The implementation does not use `Jobs CV/`, does not persist raw resume text, does not create public resume URLs and does not expose storage credentials. Candidate A cannot confirm Candidate B uploads because the signed reference and object prefix are bound to the server-resolved candidate.

## Step 4 Handoff

The next approved phase can connect:

`ResumeVersion pending → QStash RESUME_PARSE → FastAPI text extraction → OpenAI structured extraction → AI profile proposals`

That handoff must continue to use server-resolved candidate identity and must not process real CVs without explicit approval.
