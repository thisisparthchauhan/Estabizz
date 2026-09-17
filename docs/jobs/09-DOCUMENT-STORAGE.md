# Estabizz Jobs - Document Storage Foundation

Status: Phase 1A Part 5 Backblaze staging adapter connected and smoke tested.

This document defines the private candidate document storage boundary for Estabizz Jobs. It does not start candidate registration, resume parsing, FastAPI, email, QStash, or production storage.

## 1. Architecture

Candidate CVs, resumes, identity documents, certificates, offer letters, reference letters, and related private files must use private S3-compatible object storage only.

The existing unsigned Cloudinary path is prohibited for candidate CVs and documents. Cloudinary remains only for public marketing media such as blog images and organization logos.

Application code must depend on the internal `PrivateDocumentStorage` interface in `lib/jobs/documentStorage`, not on a storage vendor SDK directly.

The staging implementation uses Backblaze B2 through its S3-compatible API. The adapter is `S3CompatibleDocumentStorage` in `lib/jobs/documentStorage/s3CompatibleAdapter.ts`.

PostgreSQL stores only private object keys and file metadata already present in the frozen schema:

- `ResumeVersion.file_storage_key`
- `ResumeVersion.file_name_original`
- `ResumeVersion.file_type`
- `ResumeVersion.file_size_bytes`
- `CandidateDocument.file_storage_key`
- `CandidateDocument.file_name_original`
- `CandidateDocument.file_type`
- `CandidateDocument.file_size_bytes`

No public permanent URL is stored in PostgreSQL.

## 2. Upload Authorization Flow

The upload flow is controlled by Next.js server APIs in a later phase.

1. Authenticated caller requests an upload slot.
2. API verifies candidate ownership or staff capability before creating an upload target.
3. API validates filename, MIME type, and configured file-size limit.
4. API creates a temporary private object key under `tmp/`.
5. API returns a short-lived presigned upload URL.
6. Browser uploads directly to private object storage.
7. API finalization verifies object metadata, SHA-256 hash, size, MIME type, and malware scan status.
8. Only after validation does the API create or update `ResumeVersion` or `CandidateDocument`.
9. API writes `AuditEvent` rows for the request and completion.

Unauthenticated users cannot obtain upload or download URLs.

## 3. Presigned Upload Flow

Presigned uploads are short lived and limited to candidate documents.

- Default upload TTL: 10 minutes
- Default max upload size: 10 MB, configurable
- Allowed MIME types only:
  - `application/pdf`
  - `application/msword`
  - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Object path starts in the temporary upload namespace.
- Upload request includes expected content type, content length, and object metadata.
- Finalization is required before a file becomes a resume version or candidate document.

The Next.js API never proxies file bytes.

## 4. Authorized Download Flow

Downloads and previews use short-lived presigned URLs generated only after authorization.

1. Authenticated caller requests access to an existing document.
2. API verifies candidate ownership or staff `candidates.view` capability.
3. API verifies the referenced row is not soft deleted.
4. API writes an audit event for view or download intent.
5. API returns a presigned URL with a short TTL.

Default download TTL: 5 minutes.

Public pages must never embed candidate document URLs.

## 5. File Policy

Supported file types:

| Type | MIME type | Extension |
|---|---|---|
| PDF | `application/pdf` | `.pdf` |
| DOC | `application/msword` | `.doc` |
| DOCX | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | `.docx` |

File-size limits are environment-configured:

- `JOBS_DOCUMENT_MAX_UPLOAD_MB`
- `JOBS_DOCUMENT_MAX_UPLOAD_BYTES`

If both are present, byte-level configuration wins.

## 6. Filename Normalization

Original filenames may be displayed in admin/candidate UI after normalization, but object keys must not depend on user-provided filenames.

Normalization rules:

1. Strip path separators.
2. Strip control characters.
3. Trim whitespace.
4. Preserve only safe filename characters.
5. Collapse whitespace to hyphens.
6. Force the extension to match the validated MIME type.
7. Limit safe display filename length.
8. Use `document.<ext>` if the supplied name is empty or unsafe.

## 7. SHA-256 Hashing Strategy

SHA-256 is part of the finalization gate.

- Client may provide a claimed SHA-256 hash for early mismatch detection.
- Server-side finalization remains authoritative.
- The finalized private object key includes the verified SHA-256 hash.
- Object metadata stores the verified SHA-256 hash.
- `AuditEvent.context` records the verified hash and storage object key.

No new PostgreSQL hash column is added in this phase because the frozen V1 schema has already been migrated.

## 8. Private Object-Key Structure

Temporary uploads:

```text
tmp/candidates/{candidateId}/{uploadId}.{ext}
```

Final resume versions:

```text
candidates/{candidateId}/resumes/{resumeVersionId}/{sha256}.{ext}
```

Final candidate documents:

```text
candidates/{candidateId}/documents/{candidateDocumentId}/{sha256}.{ext}
```

Object keys do not include candidate names, email addresses, phone numbers, or original filenames.

## 9. Malware Scanning Integration Point

Malware scanning is required before a temporary upload is finalized.

The integration point is defined by the provider-neutral `MalwareScanner` interface. A later implementation may use an object-storage event, queue worker, or scanning service, but business logic must only finalize files with a clean scan result unless an owner-approved exception is documented.

Scan statuses:

- `pending`
- `clean`
- `infected`
- `failed`
- `skipped`

AI resume parsing must not start unless the scan is clean and candidate consent permits AI processing.

## 10. ResumeVersion and CandidateDocument Linkage

Resume uploads create a `ResumeVersion` row after finalization. If marked current, the update to `ResumeVersion.is_current` and `Candidate.current_resume_version_id` must happen in one database transaction.

Other private files create a `CandidateDocument` row after finalization.

Both tables store the private object key, normalized original filename, MIME type, file size, uploader reference, and soft-delete timestamp.

## 11. Temporary Upload Lifecycle

Temporary uploads are not durable business records.

- Temporary keys expire by policy.
- Orphaned temporary objects are cleaned by a later scheduled job.
- Temporary objects are not exposed through public APIs.
- Temporary objects are promoted only after metadata, hash, MIME type, size, authorization, and malware scan checks pass.
- Failed or infected uploads are deleted or quarantined according to provider policy.

## 12. Audit Events

Document workflows write append-only `AuditEvent` rows.

Approved actions:

- `document_upload_requested`
- `document_upload_completed`
- `document_upload_failed`
- `document_view_presigned`
- `document_download_presigned`
- `document_deleted`
- `document_scan_completed`
- `document_scan_failed`

Audit context may include object key, MIME type, file size, SHA-256 hash, scan status, and storage provider reference. Audit events never store presigned URLs.

## 13. Environment Separation

Staging and production must use separate buckets and separate credentials.

Required environment variables:

```text
JOBS_OBJECT_STORAGE_PROVIDER=s3-compatible
JOBS_OBJECT_STORAGE_ENDPOINT=
JOBS_OBJECT_STORAGE_BUCKET=
JOBS_OBJECT_STORAGE_REGION=
JOBS_OBJECT_STORAGE_ACCESS_KEY_ID=
JOBS_OBJECT_STORAGE_SECRET_ACCESS_KEY=
JOBS_OBJECT_STORAGE_FORCE_PATH_STYLE=false
JOBS_DOCUMENT_MAX_UPLOAD_MB=10
JOBS_DOCUMENT_PRESIGNED_UPLOAD_TTL_SECONDS=600
JOBS_DOCUMENT_PRESIGNED_DOWNLOAD_TTL_SECONDS=300
JOBS_DOCUMENT_TEMP_TTL_MINUTES=60
JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED=true
```

Configuration validation must reject non-production environments pointing at production-named buckets and production environments pointing at development or staging buckets.

For Backblaze B2 staging:

- `JOBS_OBJECT_STORAGE_PROVIDER` must be `s3-compatible`.
- `JOBS_OBJECT_STORAGE_ENDPOINT` must be the Backblaze S3-compatible endpoint URL.
- `JOBS_OBJECT_STORAGE_BUCKET` must be the private staging bucket name only, not a URL.
- `JOBS_OBJECT_STORAGE_REGION` must match the Backblaze region.
- `JOBS_OBJECT_STORAGE_FORCE_PATH_STYLE=true` is supported and currently used for staging.
- Access key and secret key are loaded only from environment variables and are never returned to client code.

## 14. Retention and Deletion

Candidate privacy deletion follows the frozen architecture:

1. Candidate is soft deleted.
2. PII fields are nullified where required.
3. Candidate contacts are deleted.
4. Private storage objects referenced by `ResumeVersion.file_storage_key` and `CandidateDocument.file_storage_key` are deleted or quarantined according to legal policy.
5. Original filenames are nullified where legally required in a future schema-compatible implementation path.
6. `AuditEvent` records remain append-only.

Soft-deleted rows must not generate presigned download URLs.

## 15. Backblaze B2 Staging Implementation

Backblaze B2 is connected for staging through the S3-compatible adapter.

Installed packages:

- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner`

Adapter capabilities:

- Validate configured bucket with `HeadBucket`
- Create presigned PUT upload URLs
- Create presigned GET download URLs
- Read object metadata with `HeadObject`
- Delete private objects with `DeleteObject`

The adapter signs metadata headers required by Backblaze B2 and never logs credentials or signed URLs.

Cloudflare R2 and AWS S3 remain compatible future options because business logic depends on the provider-neutral interface.

## 16. Manual Setup Required

Before connecting staging:

1. Create a private staging bucket.
2. Disable public bucket access.
3. Create least-privilege access credentials for the staging bucket only.
4. Configure CORS for the app origin and direct browser uploads.
5. Configure lifecycle cleanup for `tmp/` objects.
6. Decide malware scanning provider and quarantine policy.
7. Add staging environment variables outside Git.
8. Verify the bucket name clearly identifies staging.

Production bucket setup is deferred.

## 17. Smoke-Test Procedure

Staging smoke test script:

```text
scripts/jobsStorageSmokeTest.ts
```

The smoke test uses a harmless temporary `storage-smoke-test.pdf` payload. It is not a real candidate CV or candidate document.

The script verifies:

1. Environment is not production.
2. Bucket name clearly contains `staging`.
3. Staging bucket connection succeeds.
4. Presigned upload succeeds.
5. Metadata/head succeeds.
6. Presigned download succeeds.
7. Downloaded content matches uploaded content.
8. Object deletion succeeds.
9. Object no longer exists after deletion.

Smoke-test output must not include credentials or signed URLs.

## 18. Current Readiness

The internal interface, file policy, key policy, configuration validation, S3-compatible adapter, and Backblaze B2 staging smoke test are ready.

The private storage foundation is ready for later candidate-upload API work, but Candidate Portal and resume parsing remain deferred.
