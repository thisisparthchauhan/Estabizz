# Estabizz Jobs — Phase 0 Architecture Freeze

> **Document:** 05-ARCHITECTURE-FREEZE.md  
> **Phase:** 0E — Architecture Freeze  
> **Status:** FROZEN  
> **Date:** 2026-08-08  
> **Codex Verdict:** APPROVE WITH CHANGES (resolved)  
> **Preceding documents:** `00–04` in `docs/jobs/`  
> **Authority:** This document supersedes conflicting statements in `01-PRODUCT-SCOPE.md`, `02-SYSTEM-ARCHITECTURE.md`, and `03-DATABASE-ERD.md` on any point where they differ.

---

## A. Freeze Status

| Item | Status |
|---|---|
| Product Scope | FROZEN |
| System Architecture | FROZEN |
| Database ERD (logical) | FROZEN |
| Route Structure | FROZEN |
| RBAC Model | FROZEN |
| Application State Machine | FROZEN |
| Identity Boundary | FROZEN |
| AI Data Architecture | FROZEN |
| Queue Architecture | FROZEN |
| Document Storage Architecture | FROZEN |
| Commercial Tracking | FROZEN |
| Privacy & Data Lifecycle | FROZEN |
| Codex blockers resolved | YES — all 5 |
| Prisma schema authorised | YES — after this document |
| Implementation authorised | YES — Phase 1 |

**No further architectural decisions may be made without a formal change against this document (see Section S).**

---

## B. Controlling Decisions

These 23 decisions are the authoritative resolution of the Codex "APPROVE WITH CHANGES" findings. Each decision is final for V1.

| # | Decision | Resolution |
|---|---|---|
| 1 | **No tenant_id in V1** | V1 is single operator (Estabizz). No `tenant_id` column on Jobs entities. Clients are `Organization` records. |
| 2 | **RBAC: single authority** | `StaffJobsCapability.grants JSONB` is the sole source of truth for Jobs authorization. `AdminUser.permissions[]` (MongoDB) governs CMS only — it is never consulted for Jobs access decisions. |
| 3 | **RBAC: JSONB grants with scope** | `grants` is `[{permission_code: string, scope: "OWN"\|"TEAM"\|"ALL"}]`. Flat `TEXT[]` is not used. `TEAM` scope is reserved but treated as `ALL` in V1 (RecruitmentTeam deferred). |
| 4 | **IdentityReference composite uniqueness** | `UNIQUE (external_collection, external_id)` — composite, not single-column. Prevents cross-collection collision. |
| 5 | **JobRequirement → Job JSONB** | `JobRequirement` table eliminated. `Job.structured_requirements JSONB` replaces it: `[{type, label, value, is_required}]`. GIN-indexed. |
| 6 | **ApplicationStageTransition added** | New config table defining allowed stage transitions, required permissions, preconditions. Every stage change validated against this table. AI may not trigger transitions. |
| 7 | **ApplicationAssignment → Application field** | `ApplicationAssignment` eliminated. `Application.assigned_recruiter_ref_id UUID FK → IdentityReference` replaces it. |
| 8 | **CandidatePreference → Candidate columns** | `CandidatePreference` table eliminated. Its columns merged into `Candidate` directly. |
| 9 | **ClientRelationship → Organization fields** | `ClientRelationship` table eliminated. Its fields merged into `Organization`. V1 assumes one active relationship type per client. |
| 10 | **CommercialTerms FK → Organization** | `CommercialTerms.organization_id` replaces `CommercialTerms.client_relationship_id`. |
| 11 | **AIMatchExplanation → AIScore JSONB** | `AIMatchExplanation` table eliminated. `AIScore.explanation_payload JSONB` holds `{summary, strengths[], gaps[], raw_explanation}`. |
| 12 | **InterviewFeedback → Interview columns** | `InterviewFeedback` table eliminated. Feedback columns (`feedback_*`) merged into `Interview`. |
| 13 | **PlacementFee + CommercialStatus → Placement** | Both tables eliminated. All fee and invoice fields merged into `Placement`. V1 commercial tracking is complete on a single row. |
| 14 | **EntityEmbedding as separate table** | No inline `VECTOR` column on `Candidate` or `Job`. `EntityEmbedding` table holds all embeddings with `entity_type`, `entity_id`, `model_name`, `model_version`, configurable `dimension`. HNSW index. |
| 15 | **RecruitmentTeam + TeamMembership deferred** | Both entities deferred to V2. `Candidate.assigned_team_id` is a reserved nullable UUID with no FK in V1. |
| 16 | **CandidateConsent → append-only** | No `UNIQUE (candidate_id, consent_type)` constraint. Each grant/withdrawal event is a new row. Current state derived from latest row per consent type. |
| 17 | **Write ownership: Next.js vs FastAPI** | Next.js owns all business entity mutations. FastAPI owns only: `AIExtraction`, `AIScore`, `EntityEmbedding`. FastAPI may not update Candidate or Application core state. |
| 18 | **Queue: Upstash QStash** | Selected provider for V1. Accessed exclusively through an internal abstraction interface (`dispatch`, `retry`, `deadLetter`) — no QStash SDK calls in business logic. |
| 19 | **Document storage: private S3/R2 only** | All CVs and documents in a private object storage bucket. Presigned URLs with short TTL. Cloudinary is prohibited for candidate documents. Never Cloudinary unsigned upload. |
| 20 | **AI is advisory only** | No automatic rejection based on AI score. AI may not trigger stage transitions. All AI decisions are logged with model version, confidence, and human verification status. |
| 21 | **Frozen public routes** | `/jobs`, `/jobs/[slug]`, `/careers`, `/candidates/register`, `/candidates/dashboard`, `/candidates/profile`, `/candidates/profile/resume`, `/candidates/applications`, `/candidates/applications/[id]` |
| 22 | **Frozen admin routes** | `/admin/jobs` and its subroutes as defined in `02-SYSTEM-ARCHITECTURE.md` Section 6.2. All gated by Jobs capability. |
| 23 | **Staging isolation** | Staging PostgreSQL is fully isolated from production. Staging may read from production MongoDB for CMS content only. Jobs integration tests must not run against production MongoDB. |

---

## C. V1 Physical ERD — Final Entity Set

**45 V1 physical tables** (post-merge, post-defer, post-add):

```
Identity (2)
  IdentityReference, StaffJobsCapability

Candidate Core (3)
  Candidate (incl. preference cols), CandidateContact, CandidateConsent

Candidate Profile (7)
  CandidateEmployment, CandidateEducation, CandidateCertification
  Skill, CandidateSkill, Domain, CandidateDomainExperience

Resume & Documents (2)
  ResumeVersion, CandidateDocument

Tags & Activity (3)
  Tag, CandidateTag, CandidateActivity

Organization & Client (3)
  Organization (incl. relationship fields), ClientContact, CommercialTerms

Jobs (7)
  Job (incl. structured_requirements JSONB)
  JobSkill, JobDomain, JobLocation, JobQuestion, JobAssignment, JobStatusHistory

Applications (7)
  ApplicationStage, ApplicationStageTransition
  Application (incl. assigned_recruiter_ref_id)
  ApplicationSnapshot, ApplicationAnswer, ApplicationStageHistory

Interview, Offer, Placement (4)
  Interview (incl. feedback cols), InterviewParticipant, Offer
  Placement (incl. fee + invoice cols)

Operational CRM (3)
  RecruitmentNote, Task, Communication

AI (4)
  AIProcessingRun, AIExtraction, AIScore (incl. explanation_payload)
  EntityEmbedding

Audit (1)
  AuditEvent
```

---

## D. Deferred Target Entities (V2+)

| Entity | Dependency | Notes |
|---|---|---|
| `RecruitmentTeam` | Team scope design | Enables `TEAM` scope in StaffJobsCapability.grants |
| `TeamMembership` | RecruitmentTeam | Join table for team membership |
| Employer portal login | Org auth design | Organization.employer_user_id (future FK) |
| OrganizationMembership | Employer portal | Connects employer users to organizations |
| Multi-ClientRelationship | V2 CRM | Multiple relationship records per Organization |
| PlacementCreditAllocation | Complex credit split | Replaces two-field credit split if needed |

---

## E. Identity Boundary

### E.1 Core Rule

No PostgreSQL foreign key points to MongoDB. All MongoDB identities enter the Jobs domain via `IdentityReference` only.

```
MongoDB User._id (ObjectId)
  → IdentityReference.external_id (VARCHAR(24), no FK)
  → IdentityReference.id (UUID, stable Jobs PK)
    → Candidate.identity_ref_id
    → StaffJobsCapability.identity_ref_id
    → All actor_ref_id / created_by_ref_id / assigned_*_ref_id fields
```

### E.2 IdentityReference Uniqueness

`UNIQUE (external_collection, external_id)` — composite. A MongoDB ObjectId that exists in both `users` and `admin_users` will produce two separate `IdentityReference` rows (one per collection).

### E.3 Identity Types

| identity_type | Source collection | Consumer |
|---|---|---|
| `candidate_user` | `users` | Candidate portal sessions |
| `admin_user` | `admin_users` | Recruiter ATS, StaffJobsCapability |
| `system` | None | Background jobs, AI service |

### E.4 Cache Staleness

`display_name_cache` and `email_cache` are refreshed lazily. They are never used for authentication or authorization decisions — only for display convenience.

---

## F. Jobs RBAC Model

### F.1 Core Principle

Permissions with scope are the enforcement primitive. Role templates are informational shortcuts for provisioning — they are never checked at runtime.

### F.2 Permission Structure

```jsonc
// StaffJobsCapability.grants (JSONB array)
[
  {"permission_code": "candidates.view",   "scope": "ALL"},
  {"permission_code": "candidates.edit",   "scope": "OWN"},
  {"permission_code": "jobs.view",         "scope": "ALL"},
  {"permission_code": "applications.change_stage", "scope": "OWN"}
]
```

### F.3 Scope Semantics

| Scope | V1 Effect |
|---|---|
| `OWN` | Query filtered to records where `assigned_recruiter_ref_id = caller_ref_id` |
| `TEAM` | Reserved — treated as `ALL` in V1 (no RecruitmentTeam in V1) |
| `ALL` | No additional filter — full access to matching records |

### F.4 Permission Codes (V1)

| Code | Description |
|---|---|
| `candidates.view` | Search and view candidate profiles |
| `candidates.create` | Add new candidates manually |
| `candidates.edit` | Edit candidate profile fields |
| `candidates.delete` | Soft-delete candidates |
| `candidates.merge` | Confirm duplicate merges |
| `jobs.view` | View jobs and client organizations |
| `jobs.create` | Create new jobs |
| `jobs.edit` | Edit job details |
| `jobs.publish` | Toggle job public visibility |
| `applications.view` | View applications |
| `applications.change_stage` | Move applications through pipeline stages |
| `applications.reject` | Mark applications as rejected |
| `placements.manage` | Create and edit placement records |
| `placements.commercial` | Edit fee, invoice, and payment fields |
| `reports.view` | View recruitment analytics |
| `jobs.super_admin` | Manage pipeline config, staff capabilities |

### F.5 Role Templates (V1)

| Template | Typical grants |
|---|---|
| `jobs_super_admin` | All permissions at `ALL` scope |
| `recruitment_head` | All permissions at `ALL` scope, minus `jobs.super_admin` |
| `recruitment_manager` | All permissions at `TEAM` scope (treated as `ALL` in V1) |
| `team_lead` | `candidates.*` + `jobs.view` + `applications.*` at `TEAM` scope |
| `recruiter` | `candidates.*` + `jobs.view` + `applications.*` at `OWN` scope |
| `sourcer` | `candidates.view` + `candidates.create` + `candidates.edit` at `OWN` |
| `viewer` | `candidates.view` + `jobs.view` + `applications.view` at `ALL` scope (read-only) |

---

## G. Application State Machine

### G.1 Default Stage Sequence

```
New → Screening → Shortlisted → Client Submitted →
Interview Scheduled → Interview Completed →
Offer Extended → Offer Accepted → Placed
                                  ↓
                              [terminal: positive]

Any stage → Rejected   [terminal: negative]
Any stage → Withdrawn  [terminal: negative]
```

### G.2 Transition Rules (ApplicationStageTransition)

Each directed edge is a row in `ApplicationStageTransition` with:
- `required_permission` — must be held by the actor
- `requires_reason` — written reason mandatory
- `requires_interview_record` — Interview row must exist before transition allowed
- `is_terminal` — no further transitions from `to_stage`

Initial application-stage assignment is performed when the `Application` is created by setting `Application.current_stage_id`. It is not represented as an `ApplicationStageTransition`; this table only represents movement from one existing stage to another, so `from_stage_id` is always required.

Key constraints:
- The `Placed` stage may only be reached from `Offer Accepted`
- `Interview Scheduled → Interview Completed` requires an `Interview` row (status = `completed`)
- `Client Submitted → Interview Scheduled` requires `requires_interview_record = true`
- AI systems may not trigger transitions — only authenticated admin users with `applications.change_stage`

### G.3 Immutability

`ApplicationStageHistory` is append-only. One row per transition. Never updated or deleted.

---

## H. Candidate Duplicate / Merge Model

### H.1 Detection Signals

1. Email match across `CandidateContact`
2. Phone match across `CandidateContact`
3. LinkedIn URL exact match
4. Name + current employer fuzzy match (`pg_trgm` similarity > 0.85)

### H.2 Resolution Process

1. `DuplicateCheckJob` runs on candidate creation (portal or manual entry)
2. Result written to `Candidate.dedup_status` (`suspected_duplicate`) and `Candidate.is_duplicate_of_id`
3. Recruiter reviews in ATS — confirms merge or dismisses
4. On confirmed merge:
   - Canonical record: kept, `dedup_status = 'unique'`
   - Duplicate record: `dedup_status = 'merged_into'`, `is_duplicate_of_id = canonical.id`, soft-deleted
   - Applications, notes, history on duplicate re-assigned to canonical record

### H.3 Portal Registration Dedup

When a recruiter-sourced candidate registers on the portal:
- Registration API: create/find MongoDB User → create IdentityReference
- Search PostgreSQL for Candidate matching registration email in `CandidateContact`
- If 1 match: "Link to existing profile?" prompt shown
- If multiple matches: route to recruiter for manual resolution
- If no match: new Candidate created with `identity_ref_id` set

---

## I. Privacy & Data Lifecycle

### I.1 Anonymization (Not Hard Delete)

Privacy deletion requests are handled by field-level nullification — not row deletion — to preserve referential integrity in audit and history tables.

Anonymization procedure:
1. Set `Candidate.deleted_at`, record reason
2. Null out PII columns: name, DOB, nationality, location, salary, contact fields
3. Delete `CandidateContact` rows
4. Delete `ResumeVersion.file_storage_key` (object storage deletion) and null out original filename
5. Insert `CandidateConsent` row with `event = 'withdrawn'` for all consent types
6. Write `AuditEvent` with action `privacy_anonymized`
7. Candidate row remains (as tombstone) to maintain FK integrity with Applications, AuditEvent, ApplicationSnapshot

### I.2 Retention Basis

`ApplicationSnapshot` rows are retained indefinitely — they are business records, not candidate PII records. The candidate's name in a snapshot may be anonymized by nullifying snapshot PII fields in the same anonymization procedure.

`AuditEvent` rows are never deleted. Retention period to be determined by legal/compliance team.

### I.3 Consent Model

`CandidateConsent` is append-only. Current consent state is the latest row per `consent_type`. Consent for `ai_processing` must be present before AI parsing or scoring is triggered on a candidate's data.

---

## J. AI Data Architecture

### J.1 Core Constraints

- AI is advisory — no automatic rejection or stage change based on AI score
- Every AI-produced value carries provenance: model provider, model name, model version, confidence score, timestamp
- Human verification status is tracked on `AIExtraction` but not gated — values can be applied before verification and corrected later
- The FastAPI AI service writes only to: `AIExtraction`, `AIScore`, `EntityEmbedding`. It reads from the rest of the Jobs domain.

### J.2 Embedding Architecture

```
EntityEmbedding table
  entity_type: 'candidate' | 'job'
  entity_id:   UUID
  embedding:   vector(N)  ← dimension set at provision time
  model_provider, model_name, model_version, dimension
  ai_processing_run_id FK
```

- No inline `VECTOR` column on `Candidate` or `Job`
- One row per (entity, model version) — re-embedding creates a new row
- HNSW index (preferred for V1 scale)
- Written exclusively by FastAPI

### J.3 Scoring Architecture

```
AIScore
  job_id, candidate_id, application_id (optional)
  overall_score, skill_match_score, domain_match_score,
  experience_match_score, semantic_similarity_score
  rank_in_job
  explanation_payload JSONB  ← {summary, strengths[], gaps[], raw_explanation}
  is_current (partial unique index: UNIQUE WHERE is_current = true)
```

- One current score per candidate–job pair
- Historical scores retained (is_current = false)
- Explanation is embedded in the score row — not a separate table

### J.4 AI Provenance

All AI-generated data must carry: `model_provider`, `model_name`, `model_version`, `confidence_score`, extraction timestamp, and `recruiter_verified` / `candidate_verified` status. Provenance is immutable — corrections create new rows with `superseded_by_id`.

---

## K. Search Architecture

### K.1 V1 Hybrid Search

Candidate search combines three layers:
1. **Structured filter** — PostgreSQL `WHERE` + `GIN` index on array fields + `pg_trgm` for fuzzy name search
2. **Semantic similarity** — pgvector cosine distance on `EntityEmbedding` (`<=>` operator, HNSW index)
3. **AI match score** — pre-computed, stored in `AIScore.overall_score`

Combined and ranked in the Next.js API layer. No separate search service in V1.

### K.2 No External Search Service in V1

Elasticsearch, OpenSearch, Typesense, and Algolia are explicitly out of scope for V1. PostgreSQL handles all search. External search service is a V2 consideration if PostgreSQL search proves insufficient at scale.

---

## L. Queue Architecture

### L.1 Selected Provider: Upstash QStash

Upstash QStash is selected for V1:
- HTTP-delivered — Vercel-native, no persistent connection required
- Serverless-compatible — no worker process management in V1
- Per-message retry with configurable backoff

### L.2 Abstraction Interface

QStash is never called directly from business logic. All queue operations go through an internal interface:

```typescript
interface JobQueue {
  dispatch(jobType: string, payload: object, options?: DispatchOptions): Promise<string>
  retry(messageId: string): Promise<void>
  deadLetter(messageId: string, reason: string): Promise<void>
}
```

This interface allows future migration to SQS, Cloudflare Queues, or BullMQ without changes to business logic.

### L.3 V1 Queue Job Types

| Job Type | Producer | Consumer | Description |
|---|---|---|---|
| `resume_parse` | Next.js API | FastAPI | Parse uploaded CV |
| `ai_match` | Next.js API | FastAPI | Score candidates against a job |
| `embed_entity` | Next.js API | FastAPI | Generate embedding for candidate/job |
| `email_notification` | Next.js API / FastAPI | Email worker | Send transactional email |
| `duplicate_check` | Next.js API | Next.js worker | Run dedup signals on new candidate |
| `search_index` | Next.js API | Next.js worker | Refresh structured search data |

### L.4 Failure Strategy

- Retry with exponential backoff (QStash configurable)
- Dead-letter queue after max retries
- `AIProcessingRun.status = 'failed'` + `error_detail` on AI job failure
- Critical jobs (email, embedding) alert on DLQ; non-critical (re-ranking) degrade silently

---

## M. Document Storage Architecture

### M.1 Storage Provider

Private object storage: AWS S3 or Cloudflare R2. Selection deferred to Phase 1 infrastructure provisioning.

**Cloudinary is explicitly prohibited for candidate documents.** Cloudinary is used only for public marketing images (blog images, organization logos).

### M.2 Security Properties

- Bucket is fully private — no public read ACL
- All access via presigned URLs with short TTL (upload: 10 min, download: 5 min)
- Next.js API never proxies file bytes — presigned URLs go directly to browser or FastAPI
- FastAPI reads files via short-lived presigned URLs generated by Next.js
- Candidate may only download their own documents (enforced at Next.js API layer)
- Recruiter file access gated by `candidates.view` permission

### M.3 File Types

| Use | Storage | Access |
|---|---|---|
| Candidate CVs / resumes | Private S3/R2 | Presigned URL |
| Candidate documents (ID, certificates) | Private S3/R2 | Presigned URL |
| Organization logos | Cloudinary | Public CDN URL |
| Blog images | Cloudinary | Public CDN URL |

---

## N. Commercial Tracking

### N.1 All Fields on Placement

Every placement's commercial record is contained in a single `Placement` row. No separate `PlacementFee` or `CommercialStatus` tables.

### N.2 V1 Commercial Fields on Placement

| Category | Fields |
|---|---|
| **Placement** | `joining_date`, `placed_title`, `placed_salary_amount/currency`, `status`, `guarantee_days`, `guarantee_end_date` |
| **Credit** | `placement_credit_ref_id`, `secondary_credit_ref_id`, `credit_split_pct` |
| **Fee** | `commercial_terms_id`, `fee_type`, `fee_percentage`, `calculated_fee_amount`, `gst_rate`, `gst_amount`, `invoice_amount`, `fee_currency`, `fee_calculation_basis`, `fee_approved_by_ref_id`, `fee_approved_at` |
| **Invoice & Payment** | `payment_status`, `invoice_number`, `invoice_sent_at`, `invoice_due_at`, `paid_amount`, `paid_at`, `dispute_reason` |

### N.3 CommercialTerms

`CommercialTerms` FK is `organization_id` (not `client_relationship_id` — that entity is eliminated). An organization may have multiple `CommercialTerms` rows over time (different effective dates). The active terms row is selected by `effective_from <= today AND (effective_to IS NULL OR effective_to >= today)`.

---

## O. Route Freeze

### O.1 Public Routes

| Route | Auth | Description |
|---|---|---|
| `/jobs` | None | Job listing / search |
| `/jobs/[slug]` | None | Job detail + apply CTA |
| `/careers` | None | Estabizz Careers hub |
| `/candidates/register` | Optional | Portal registration |
| `/candidates/dashboard` | Required | Candidate dashboard |
| `/candidates/profile` | Required | Profile editor |
| `/candidates/profile/resume` | Required | Resume upload + history |
| `/candidates/applications` | Required | Applications list |
| `/candidates/applications/[id]` | Required | Application detail + status |

### O.2 Admin Routes

| Route | Min Permission | Description |
|---|---|---|
| `/admin/jobs` | `jobs.view` | ATS dashboard |
| `/admin/jobs/jobs` | `jobs.view` | Job list |
| `/admin/jobs/jobs/new` | `jobs.create` | Create job |
| `/admin/jobs/jobs/[id]` | `jobs.view` | Job detail |
| `/admin/jobs/jobs/[id]/edit` | `jobs.edit` | Edit job |
| `/admin/jobs/jobs/[id]/applications` | `applications.view` | Job pipeline |
| `/admin/jobs/candidates` | `candidates.view` | Candidate search |
| `/admin/jobs/candidates/new` | `candidates.create` | Add candidate |
| `/admin/jobs/candidates/[id]` | `candidates.view` | Candidate profile |
| `/admin/jobs/candidates/[id]/edit` | `candidates.edit` | Edit candidate |
| `/admin/jobs/applications` | `applications.view` | All applications pipeline |
| `/admin/jobs/applications/[id]` | `applications.view` | Application detail |
| `/admin/jobs/clients` | `jobs.view` | Client organizations |
| `/admin/jobs/clients/[id]` | `jobs.view` | Client detail |
| `/admin/jobs/placements` | `placements.manage` | Placements list |
| `/admin/jobs/placements/[id]` | `placements.manage` | Placement detail |
| `/admin/jobs/reports` | `reports.view` | Analytics |
| `/admin/jobs/settings` | `jobs.super_admin` | Pipeline config |
| `/admin/jobs/settings/staff` | `jobs.super_admin` | Staff capabilities |

Additions require a change request against this document.

---

## P. CI / Deployment Gates

### P.1 Pre-Merge Gates (Not Yet Implemented — Required Before Phase 1)

| Gate | Requirement |
|---|---|
| Type check | `tsc --noEmit` passes |
| Lint | No lint errors in `app/`, `lib/`, `services/` |
| Unit tests | All passing (test suite not yet initialised) |
| Prisma schema | `prisma validate` passes |
| Environment check | Required env vars present in CI |

### P.2 Staging Deployment

- Staging branch auto-deploys to Vercel preview
- Staging uses isolated PostgreSQL instance
- Staging may read production MongoDB for CMS content (blogs, published pages)
- Staging must NOT write to production MongoDB
- Jobs integration tests must NOT run against production PostgreSQL or MongoDB

### P.3 Production Deployment

- Only from `main` branch via merge
- No direct pushes to `main`
- Prisma migrations must be reviewed before applying to production
- Database migration and application deploy are separate steps

---

## Q. Remaining Open Questions (Non-Blocking)

These do not block Phase 1 implementation. They are resolved during infrastructure provisioning.

| # | Question | Resolution Path |
|---|---|---|
| Q1 | Embedding model selection | Deferred to Phase 1. `EntityEmbedding.dimension` stores actual dimension — no schema migration on model change. |
| Q2 | pgvector index type (ivfflat vs hnsw) | Default to `hnsw` in V1. Revisit if candidate volume exceeds 50k at index build time. |
| Q3 | Object storage provider (S3 vs R2) | Deferred to Phase 1 infrastructure provisioning. |
| Q4 | AI service hosting (Railway vs Fly.io) | Deferred to Phase 1. Contract is provider-agnostic. |
| Q5 | Email service (Resend vs AWS SES) | Deferred to Phase 1. Interface is provider-agnostic. |
| Q6 | ApplicationSnapshot depth | Resolved at Prisma schema authoring time. JSONB blob is baseline; structured arrays are additive. |
| Q7 | Cascade delete rules | Resolved at Prisma schema authoring time. Default: restrict cascades; soft-delete children on parent soft-delete. |
| Q8 | PostgreSQL hosting provider | Deferred to Phase 1. Schema is provider-agnostic. |

---

## R. Implementation Entry Criteria

All of the following must be true before Phase 1 implementation begins:

- [x] `05-ARCHITECTURE-FREEZE.md` is signed off (this document)
- [x] All Codex blockers resolved (see Section B)
- [ ] PostgreSQL instance provisioned (staging)
- [ ] Object storage bucket provisioned (staging, private)
- [ ] Upstash QStash account and API key available
- [ ] Email service account provisioned (Resend or SES)
- [ ] FastAPI service repository structure created under `/services/ai-service/`
- [ ] Prisma initialised in Next.js project (`prisma init` — not done yet)
- [ ] Prisma schema authored against this ERD
- [ ] Initial Prisma migration generated and reviewed
- [ ] Staging deploy verified against isolated PostgreSQL

**Prisma must not be initialised until this freeze document is approved.**

---

## S. Architecture Change Control

### S.1 What Requires a Change Request

- Adding or removing a V1 physical table
- Adding, removing, or changing a column's type or constraint on a table that is already in use
- Changing a frozen route path
- Changing a permission code or scope definition
- Changing write ownership rules (FastAPI vs Next.js)
- Changing the queue provider (from QStash to another)
- Changing the document storage bucket policy
- Adding or removing a Codex-controlling decision

### S.2 Change Request Process

1. Author writes a change request as a section in this document (append only — never edit existing sections)
2. Change is reviewed by the architect (or designated reviewer)
3. On approval: update the relevant section(s) of `01`, `02`, `03` if needed, and append the change log entry here

### S.3 What Does NOT Require a Change Request

- Prisma schema implementation details (column ordering, naming style, middleware setup)
- Queue job payload field additions that are backward-compatible
- Index additions that don't change table structure
- Phase 1 infrastructure provider selection (S3 vs R2, Resend vs SES, etc.)
- API route handler implementation details

---

*This document is the authoritative architecture freeze for Estabizz Jobs Phase 0. Implementation of Phase 1 proceeds under the constraints defined above.*
