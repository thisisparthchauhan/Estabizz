# Estabizz Jobs — AI-Proposed Profile Review Foundation

Status: Foundation complete, pending candidate review UI.

This phase creates the safe bridge from validated structured resume extraction to candidate-reviewable profile proposals. It does not use real CV data, does not call OpenAI, does not deploy, and does not change the Prisma schema.

## 1. Existing Model Audit

The current V1 Prisma schema already provides the required persistence surface:

- `Candidate` is the canonical master profile root.
- `CandidateContact`, `CandidateEmployment`, `CandidateEducation`, `CandidateCertification`, `CandidateSkill`, and `CandidateDomainExperience` are canonical profile-detail tables.
- `ResumeVersion` links each proposal set to the uploaded resume version.
- `AIProcessingRun` stores provider/model/run metadata and token timing fields.
- `AIExtraction` stores field-level AI proposals with candidate/recruiter verification, applied status, confidence, provenance payload, supersession links, and immutable creation time.
- `AuditEvent` records proposal lifecycle events.

No duplicate candidate/profile concept was added.

No schema change was made. `AIExtraction.extracted_value` now carries a versioned review envelope for each proposed fact. This is the smallest safe path because the frozen schema already anticipated field-level AI extractions and human verification.

## 2. Lifecycle

```text
Validated structured extraction
  -> flatten into field-level AIExtraction proposals
  -> candidate views proposed profile data
  -> candidate edits, confirms, or rejects
  -> safe canonical fields are applied to Candidate/CandidateContact
  -> proposal and audit history are preserved
```

AI output is always proposed data. It never silently updates the candidate master profile during persistence.

## 3. Proposal Envelope

Each `AIExtraction.extracted_value` stores a versioned envelope:

- `fieldPath`
- `category`
- `originalValue`
- `currentValue`
- `confidence`
- `provenance`
- `reviewStatus`
- `provider`
- `model`
- `modelVersion`
- `extractionTimestamp`
- `candidateId`
- `resumeVersionId`
- `aiProcessingRunId`

Allowed review statuses:

- `ai_proposed`
- `candidate_confirmed`
- `candidate_edited`
- `candidate_rejected`
- `superseded`

The envelope does not store raw resume text, full OpenAI requests, full provider responses, prompts, API keys, private storage credentials, or signed document URLs.

## 4. Structured Mapping

The mapper accepts the existing validated structured extraction contract and persists only returned facts:

- identity: candidate name
- contact: email, mobile, location
- professional: current designation, current employer, total experience
- employment history
- education
- skills, tools, technologies
- RBI, SEBI, IRDAI, IFSCA, NBFC, Banking, Insurance, Fintech, Capital Markets, Compliance, Risk, Audit, Legal/CS, and related domains
- certifications
- languages
- notice period and compensation only if explicitly returned

Unsupported or absent values remain absent and are not persisted.

## 5. Idempotency And Versioning

Persistence is idempotent for:

```text
candidateId + resumeVersionId + aiProcessingRunId + fieldPath
```

Reprocessing the same `ResumeVersion` and `AIProcessingRun` updates the same proposal record instead of creating duplicates.

A new `ResumeVersion` or `AIProcessingRun` may create a new proposal set. Open older `ai_proposed` records for the same candidate and field are marked `superseded`, while confirmed/rejected historical records remain intact.

This preserves:

- what AI proposed
- which resume generated it
- which model generated it
- when it was generated
- what the candidate edited
- what the candidate confirmed or rejected

## 6. Candidate Review Behavior

The server-side service contracts support future UI actions:

- list candidate proposals
- confirm one proposal
- edit one proposal
- reject one proposal
- confirm a logical section later

Every candidate-scoped operation requires both `candidateId` and `actorCandidateId`. If they differ, the service rejects access. Candidate A cannot view or act on Candidate B proposals.

## 7. Confirmation And Canonical Profile Rules

When a candidate confirms a safely mappable scalar value:

```text
AI proposal -> candidate confirmation -> Candidate/CandidateContact update -> audit event
```

When a candidate edits and confirms:

```text
AI proposal -> candidate edit -> original preserved -> edited value applied -> audit event
```

The current foundation safely applies:

- candidate name to `Candidate.first_name` / `Candidate.last_name`
- location to `Candidate.current_city` / `Candidate.current_state`
- current designation to `Candidate.current_title`
- current employer to `Candidate.current_employer`
- total experience to `Candidate.years_of_experience`
- proposed email/mobile to `CandidateContact`

It does not change account-login email or mobile. Authentication identity changes require a separate verified account-change workflow.

## 8. Canonical Application Limits

Some existing canonical tables require additional normalized data before safe insertion:

- `CandidateEmployment.start_date` is required, but resume extraction may not always provide it.
- `CandidateSkill` requires a resolved `Skill` taxonomy row.
- `CandidateDomainExperience` requires a resolved `Domain` taxonomy row.
- education and certification records may need candidate completion before canonicalization.

For these areas, the system persists and reviews proposals now, but may defer canonical insertion until the candidate review UI or recruiter workflow collects the required missing details. The service does not invent dates, taxonomy IDs, or normalized values.

## 9. Contact Data Safety

Resume-extracted email/mobile are proposed contact data only.

Confirming a proposed email/mobile may add a candidate contact record, but it does not change:

- login email
- authentication identity
- verified account mobile
- MongoDB user identity

## 10. Confidence

Confidence is stored for review prioritization.

Low confidence does not automatically reject a candidate or a proposal. It may later be used to highlight fields needing review.

## 11. Audit

The foundation writes safe audit events for:

- AI proposal created
- AI proposal updated
- proposal superseded
- candidate confirmed proposal
- candidate edited proposal
- candidate rejected proposal

Audit values include field paths, review status, proposal values, confidence, resume version ID, and AI processing run ID. They do not include raw CV text or provider request/response bodies.

## 12. Privacy

Disallowed persistence remains unchanged:

- raw CV text
- full extracted resume text
- OpenAI prompts
- full provider responses
- signed URLs
- API keys
- private storage credentials
- QStash tokens

The synthetic test uses only deterministic fictional data and never opens `Jobs CV/`.

## 13. Future Candidate UI Flow

Future UI should show proposals grouped by:

- identity/contact
- current role
- employment history
- education
- skills/domains
- certifications/languages
- preferences

Recommended actions:

- confirm field
- edit and confirm
- reject
- save progress
- confirm section

The UI should clearly show that AI proposals are reviewable suggestions, not final profile data.

## 14. Validation

Synthetic deterministic tests cover:

- proposal persistence
- duplicate/idempotent processing
- proposal linkage to `ResumeVersion`
- confirmed profile not silently overwritten by later AI output
- candidate accepts a proposal
- candidate edits a proposal
- candidate rejects a proposal
- proposal history preserved
- cross-candidate authorization rejection
- raw resume/provider request/provider response not persisted
- low confidence does not auto-reject

No real candidate CV was used.
