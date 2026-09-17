# Estabizz Jobs - Codex Architecture Review

Independent review of:

- `docs/jobs/00-CURRENT-SYSTEM-AUDIT.md`
- `docs/jobs/01-PRODUCT-SCOPE.md`
- `docs/jobs/02-SYSTEM-ARCHITECTURE.md`
- `docs/jobs/03-DATABASE-ERD.md`

This review is intentionally adversarial. It challenges the proposed Jobs architecture before Phase 0 freeze, infrastructure setup, Prisma schema creation, and Phase 1 coding.

## A. Executive Verdict

**Verdict: APPROVE WITH CHANGES**

The proposed direction is sound: Estabizz Jobs should be built as a serious internal recruitment operating system, backed by PostgreSQL/Prisma, private object storage, audit trails, managed admin workflows, and AI as an advisory layer rather than an autonomous decision maker.

However, the architecture should not be frozen yet. There are several structural decisions that must be simplified or made explicit before the Prisma schema is written:

- V1 tenancy is unclear and internally inconsistent.
- RBAC risks splitting permission truth between MongoDB and PostgreSQL.
- Identity bridging is over-engineered for V1 and under-specified for revocation.
- The application pipeline lacks explicit transition rules.
- Candidate privacy, deletion, anonymization, and document access controls need a stronger model.
- The ERD is larger than needed for the first build and should be reduced before implementation.

The recommendation is to proceed to Phase 0 Architecture Freeze only after the changes in this review are reconciled with the Claude architecture.

## B. Critical Findings

### Blocker 1 - Tenancy Is Not Ready To Freeze

The ERD states that all core business entities should include `tenant_id`, but the actual model list shows tenancy mainly on `Candidate` and `Job`. That creates a dangerous half-tenancy design.

For V1, Estabizz Jobs appears to be a single-operator internal platform, not a self-service multi-tenant SaaS product. Employer self-service is explicitly deferred. In that context, generic tenant fields add schema noise, access-control confusion, and future migration risk without providing real V1 value.

**Required decision before Prisma:**

Either:

- remove `tenant_id` from V1 and model clients through `Organization`, `ClientContact`, and future employer access tables, or
- make tenancy real from day one across every mutable business table, with a consistent tenant model and row-level access strategy.

**Codex recommendation:** remove generic V1 `tenant_id`. Add future employer access later through organization memberships and scoped permissions.

### Blocker 2 - RBAC Has Two Sources Of Truth

The current site already has MongoDB-backed admin users and a CMS permission model. The Jobs architecture introduces `StaffJobsCapability` in PostgreSQL with text-array permissions.

That risks this split:

- MongoDB decides whether a person is an admin.
- PostgreSQL decides what they can do in Jobs.
- Seed allowlist users can bypass normal DB records.
- Permission revocation may be stale or incomplete.

**Required decision before Prisma:**

Define one authoritative permission source for Jobs actions.

**Codex recommendation:**

For V1, keep authentication in the existing Mongo/JWT system, but define Jobs permissions as namespaced grants, not loose text arrays. If PostgreSQL must store Jobs-specific scopes, use a structured grant model:

- actor/admin reference
- resource
- action
- scope: `own`, `team`, `all`
- optional team or organization scope
- granted by
- revoked at
- audit fields

Roles should be templates. Runtime authorization should resolve grants, scopes, status, and revocation.

### Blocker 3 - Identity Bridge Is Too Broad And Not Strict Enough

`IdentityReference` tries to bridge MongoDB users/admins and PostgreSQL Jobs records. That is a reasonable idea, but the proposed uniqueness and lifecycle rules need correction.

Risks:

- `external_id` alone should not be globally unique across different external collections.
- system actors may not have Mongo ObjectIds.
- email should not be the permanent identity key.
- cached identity data must not become authorization truth.
- user/admin deactivation and email changes need explicit sync behavior.

**Required decision before Prisma:**

Either simplify the bridge for V1 or make it strict.

**Codex recommendation:**

Use direct Mongo ID references for known actor types where possible:

- `mongo_user_id`
- `mongo_admin_user_id`
- explicit `actor_type`

If an `IdentityReference` table is retained, uniqueness must be composite:

- `(external_collection, external_id)`

It must support system actors, cache invalidation, deactivation, and audit without becoming the source of authentication or authorization.

### Blocker 4 - Application Pipeline Needs Transition Rules

The ERD includes application stages and histories, but it does not yet define enforceable transition logic. A recruitment system cannot allow arbitrary status movement just because the target stage exists.

Missing controls include:

- allowed transitions
- terminal stage rules
- required reasons
- candidate-visible versus internal-only stages
- permissions per transition
- interview/offer dependencies
- email/notification triggers
- rollback or correction behavior

**Required decision before Prisma:**

Add an `ApplicationStageTransition` concept or equivalent service-level transition contract before schema freeze.

### Blocker 5 - Privacy And Deletion Rules Are Underdefined

The architecture correctly identifies sensitive candidate data, but it does not yet provide enough operational rules for:

- account deletion
- candidate anonymization
- resume/document retention
- consent history
- document access logging
- sensitive audit redaction
- salary and identity data visibility

The statement that hard deletion never occurs conflicts with privacy expectations. The better approach is: preserve business and audit integrity while anonymizing or deleting personal data according to retention rules.

**Required decision before Prisma:**

Define entity-level retention, anonymization, and deletion rules before modeling candidate documents and audit logs.

### High 1 - ERD Is Too Large For V1

The proposed 53-entity ERD is thoughtful but too large for the first implementation. It includes future team structures, reporting/commercial status detail, AI explanation tables, and fine-grained relationship tables that can be reduced without losing V1 capability.

The V1 schema should optimize for:

- candidate profile
- resumes/documents
- jobs
- applications
- application stages
- notes/tasks/communications
- interviews/offers/placements
- minimal commercial tracking
- AI run and score provenance
- audit

Everything else should be justified by an immediate workflow.

### High 2 - Sensitive Candidate Fields Should Not Be Default

Candidate fields such as date of birth, gender, nationality, and detailed compensation should not be part of the default candidate profile unless there is a clear legal, client, or operational requirement.

For V1:

- collect minimum necessary data
- keep salary/compensation restricted
- avoid default demographic fields
- add explicit consent and purpose if sensitive data is collected

### High 3 - AI Vector Design Is Premature

The ERD references vector embeddings, but the model, dimension, provider, index type, and re-embedding strategy are not frozen.

Do not hardcode a vector dimension such as 1536 into the primary Candidate or Job tables.

Use a separate embedding table with:

- entity type
- entity id
- source version id
- embedding model/provider/version
- dimension
- source text hash
- vector
- current flag
- created timestamp

### High 4 - Object Storage Needs A Complete Security Contract

Private object storage is the right direction, but the architecture should explicitly include:

- private buckets only
- presigned URL TTLs
- file size limits
- content-type sniffing
- malware scanning
- document access logs
- document replacement history
- deletion/anonymization rules

Candidate resumes are high-risk personal data. Treat access to them as auditable, not just downloadable.

### High 5 - Write Ownership Between Next.js And FastAPI Is Unclear

The architecture proposes Next.js and FastAPI both interacting with PostgreSQL. That is acceptable only if write ownership is explicit.

**Recommended ownership:**

- Next.js owns business mutations.
- AI worker/API owns AI processing tables and derived scores.
- Cross-service writes use idempotency keys and append-only run records.
- No service should update candidate/application core state based solely on an AI result.

### High 6 - Staging Must Not Share Production MongoDB For Jobs Testing

The audit notes that staging may share production MongoDB. That is risky once Jobs introduces admin permissions, candidate data, resumes, and possible AI processing.

Before Jobs coding:

- use separate staging MongoDB, or
- use a sanitized read-only clone, or
- block Jobs staging features from production identity/data access.

### Medium 1 - Existing Public User Password Selection Should Be Hardened

`AdminUser.passwordHash` uses `select: false`, but public `User.password` does not. Jobs should not launch candidate-auth work until that is corrected.

This is outside the architecture doc itself, but it affects Candidate Portal safety.

### Medium 2 - No CI Workflow Was Found

No `.github` workflow files were found in the local tree during this review. Before Jobs Phase 1, add quality gates for:

- TypeScript
- lint/build
- Prisma schema validation
- migrations in CI
- route/API tests for critical workflows

### Medium 3 - Audit And Activity Models Need Boundaries

The ERD has both `CandidateActivity` and `AuditEvent`. That can be valuable if they serve different audiences.

Recommended boundary:

- `AuditEvent`: compliance/security trail, redacted, append-only.
- candidate/application histories: workflow-specific facts.
- `CandidateActivity`: optional timeline view or materialized summary, not another source of truth.

### Low 1 - Naming Should Be Frozen Early

The route naming decision between `/jobs`, `/careers`, and any public job detail paths should be frozen before public SEO and sitemap work.

## C. Product Scope Review

The V1 scope is mostly coherent. It should remain an internal managed recruitment platform, not an employer SaaS portal.

### In Scope And Appropriate For V1

- public jobs/careers listing
- candidate application flow
- internal admin management
- job creation and publishing
- candidate profile and resume management
- application pipeline
- notes, tasks, communications
- interview and offer tracking
- placement and basic commercial tracking
- AI-assisted parsing and matching with human review

### Missing From V1 Scope

These are not optional polish items; they affect operational correctness:

- duplicate candidate detection and merge workflow
- candidate consent and privacy workflow
- candidate export/deletion/anonymization policy
- document access audit
- email verification for candidate accounts
- candidate source attribution
- recruiter task/SLA model
- communication preference management
- stage transition rules
- field-level restrictions for sensitive data

### Future Scope Leaking Into V1

These should be deferred or explicitly marked future unless the owner confirms otherwise:

- employer self-service
- full multi-tenant architecture
- broad reports and analytics
- complex team hierarchy
- AI reranking as a default ranking layer
- advanced commercial/accounting workflows
- standalone FastAPI deployment if basic AI jobs can initially be handled by a queue worker

## D. System Architecture Review

The broad architecture is compatible with the existing Estabizz site:

- current site remains Next.js
- existing MongoDB CMS/admin/auth remains intact
- Jobs uses PostgreSQL/Prisma for relational workflows
- object storage stores resumes and documents privately
- AI remains advisory

The main issue is not the technology choice. The issue is boundary clarity.

### Keep

- PostgreSQL for Jobs relational workflows
- Prisma for schema and migrations
- private object storage for resumes/documents
- existing Next.js app as the admin/public surface
- AI isolation as a worker/API boundary
- append-only AI processing records
- human approval for AI outputs

### Change Before Freeze

- remove or fully implement tenancy
- make RBAC source of truth explicit
- define queue provider and idempotency contract
- define AI write ownership
- define object storage security rules
- define staging isolation
- define stage transition engine

### Avoid

- letting FastAPI and Next.js both mutate core business records without ownership rules
- building a generic employer-tenant platform before employer self-service exists
- storing large AI raw payloads or resume text in normal audit logs
- treating embeddings as stable schema facts before model selection

## E. ERD Review

### Entity Classification

| Entity | Decision | Rationale |
| --- | --- | --- |
| IdentityReference | MERGE / SIMPLIFY | Useful concept, but too broad. Prefer direct Mongo actor references for V1 or fix composite uniqueness and lifecycle rules. |
| StaffJobsCapability | SPLIT | Replace text-array permissions with structured permission grants and scopes. |
| Candidate | KEEP WITH CHANGES | Core entity. Remove generic tenant fields and avoid default sensitive fields. |
| CandidateContact | KEEP | Needed for multiple emails/phones and verification. |
| CandidatePreference | MERGE | Merge into Candidate for V1 unless heavily queried. |
| CandidateConsent | SPLIT | Use append-only consent events or versioned grants, not a mutable single row. |
| CandidateEmployment | KEEP | Core profile data. |
| CandidateEducation | KEEP | Core profile data. |
| CandidateCertification | KEEP | Useful but can be simple. |
| Skill | KEEP | Needed taxonomy. |
| CandidateSkill | KEEP | Needed matching relation. |
| Domain | KEEP | Needed regulatory/domain taxonomy. |
| CandidateDomainExperience | KEEP | Useful for Estabizz-specific matching. |
| ResumeVersion | KEEP WITH CHANGES | Core. Must include private storage and AI provenance links. |
| CandidateDocument | KEEP WITH CHANGES | Core. Needs access logging, scanning, and retention rules. |
| Tag | KEEP | Useful internal organization. |
| CandidateTag | KEEP | Needed many-to-many join. |
| CandidateActivity | KEEP WITH CHANGES | Use as timeline/materialized view, not compliance source of truth. |
| Organization | KEEP | Core employer/client entity. |
| ClientRelationship | DEFER / MERGE | Merge into Organization for V1 unless multiple relationship terms are required. |
| ClientContact | KEEP | Needed for client coordination. |
| CommercialTerms | KEEP | Needed for placement economics, but keep minimal. |
| Job | KEEP WITH CHANGES | Core. Remove generic tenant/vector assumptions. |
| JobSkill | KEEP | Needed matching relation. |
| JobDomain | KEEP | Needed regulatory/domain matching. |
| JobLocation | KEEP | Useful for multiple locations/hybrid. |
| JobRequirement | MERGE | Consolidate into a simpler job criteria model for V1. |
| JobQuestion | KEEP | Needed for application-specific screening. |
| JobAssignment | KEEP | Needed for recruiter ownership. |
| JobStatusHistory | KEEP | Needed audit/workflow trail. |
| ApplicationStage | KEEP WITH CHANGES | Add category, visibility, reason, and transition semantics. |
| Application | KEEP | Core. |
| ApplicationSnapshot | KEEP WITH CHANGES | Needed to preserve candidate/job state at application time. Prefer scalar snapshot plus JSONB details. |
| ApplicationAnswer | KEEP | Needed for screening questions. |
| ApplicationStageHistory | KEEP | Essential workflow history. |
| ApplicationAssignment | MERGE / DEFER | Merge into Application unless multiple assignees are required in V1. |
| Interview | KEEP | Core workflow. |
| InterviewParticipant | KEEP | Useful for client/internal participants. |
| InterviewFeedback | MERGE | Merge into Interview for V1 unless multiple structured feedback records are required. |
| Offer | KEEP | Core later-stage workflow. |
| Placement | KEEP | Core completed outcome. |
| PlacementFee | MERGE | Merge with commercial/invoice tracking for V1. |
| CommercialStatus | MERGE | Merge into Placement commercial fields for V1. |
| RecruitmentNote | KEEP | Core internal workflow. |
| Task | KEEP | Useful for recruiter operations. |
| Communication | KEEP | Core timeline/audit support. |
| RecruitmentTeam | DEFER | Defer until team-based access is needed. |
| TeamMembership | DEFER | Defer with RecruitmentTeam. |
| AIProcessingRun | KEEP | Needed for AI provenance. |
| AIExtraction | KEEP WITH CHANGES | Keep append-only extraction data with confidence and review state. |
| AIScore | KEEP WITH CHANGES | Keep score history and current marker; do not overwrite. |
| AIMatchExplanation | MERGE | Merge into AIScore JSONB for V1. |
| AuditEvent | KEEP WITH CHANGES | Required, but redact sensitive values and avoid full PII payloads. |

### ERD Conclusions

The ERD is directionally strong but too ambitious for immediate Prisma implementation. Reduce V1 complexity by merging preference, requirement, feedback, and commercial-detail tables where the workflow does not yet demand separate records.

## F. Identity And Auth Review

The current system has one JWT cookie and existing Mongo-backed user/admin collections. That can support Jobs V1, but the architecture must explicitly define actor types:

- public user/candidate
- admin user
- system job
- AI worker/service

Do not key Jobs identity by email. Email can change, can be duplicated historically, and should be treated as contact data rather than identity.

### Recommended V1 Rules

- JWT identity remains in the existing auth system.
- Jobs records store stable actor references, not email-only references.
- email can be copied into audit display fields but not used as primary identity.
- deactivated admins must lose Jobs permissions immediately.
- system actors should have explicit stable ids.
- candidate account linking must require verified email or manual review when ambiguity exists.

## G. RBAC Review

The existing CMS permissions are not enough for Jobs. Jobs actions require resource scopes and field-level restrictions.

### Required Jobs Permission Domains

- candidates
- candidate documents
- jobs
- applications
- interviews
- offers
- placements
- commercial data
- AI review
- audit/history
- settings/taxonomy

### Required Scope Model

Simple permission strings are not enough. Jobs permissions should support:

- `own`
- `team`
- `all`
- organization/client-scoped access where needed
- field restrictions for salary, documents, and contact details

### Recommendation

Use structured permission grants. Keep roles as assignable templates, but calculate authorization from active grants and current admin status.

## H. Multi-Tenancy Review

V1 does not need full multi-tenancy.

The Jobs platform is currently an Estabizz-operated recruitment system. Employers/clients are business records, not tenants. Adding generic tenancy now would create complexity without delivering a V1 workflow.

### Recommendation

Do not include generic `tenant_id` in V1 tables.

Represent:

- Estabizz as the operating organization
- clients as `Organization`
- client representatives as `ClientContact`
- future employer portal users through `OrganizationMembership` or equivalent when that phase begins

If the owner insists on tenant readiness, then tenancy must be applied consistently to every mutable business entity and designed with row-level security from day one. A partial tenant model should be rejected.

## I. Candidate And Resume Data Review

The candidate model should be privacy-first.

### Keep

- candidate profile
- contact methods
- employment
- education
- certifications
- skills/domains
- resume versions
- supporting documents
- tags
- consent records

### Change

- avoid default collection of DOB, gender, nationality, and other demographic data
- restrict salary/current compensation fields
- treat resumes and documents as private auditable assets
- keep resume versions immutable
- link AI extraction to a specific resume version
- preserve the exact resume used for each application through `ApplicationSnapshot`

### Profile Completeness

Profile completeness should be a cached derived value, not an authoritative field. Recalculate synchronously for simple edits and asynchronously after resume parsing or bulk import.

### Duplicate Candidate Handling

Duplicate handling should be first-class in V1.

Signals:

- normalized email
- verified email
- E.164 phone
- LinkedIn canonical URL
- resume file hash
- name plus employer
- education plus experience

Auto-link only exact verified identity matches. Everything else should go to manual review.

Merge operations must be audited, preserve source data, and leave a pointer from the merged record to the canonical candidate.

## J. Application And ATS Workflow Review

The application workflow is the heart of the platform. It needs stronger state controls than the current ERD describes.

### Required Stage Model

`ApplicationStage` should include:

- stable code/slug
- display label
- category
- sequence
- terminal flag
- success/failure terminal marker
- candidate visibility
- required reason flag
- active/inactive

### Required Transition Model

Add `ApplicationStageTransition` or equivalent service-level configuration:

- from stage
- to stage
- required permission
- required reason
- optional dependencies such as interview or offer
- notification behavior

Stage changes must be transactional:

- update application current stage
- append stage history
- append audit event
- create optional task/communication
- never let AI move a stage without human action

## K. AI Architecture Review

AI should remain advisory. The proposed architecture mostly follows that principle.

### Keep

- AI extraction as reviewable data
- AI matching as advisory scores
- AI run provenance
- manual override
- confidence levels
- rescoring history

### Change

- store embeddings in a separate table
- do not hardcode embedding dimension
- keep model/provider/version on every run and score
- include source hashes for resume and job text
- keep AI output out of core candidate/application state until reviewed
- define idempotency keys for processing runs

### Normal Columns Versus JSONB

Use normal columns for:

- provider
- model
- model version
- run type
- status
- confidence
- score summary
- source hash
- current flag
- reviewed by
- reviewed at

Use JSONB for:

- extraction payload
- explanation details
- model metadata
- prompt metadata
- non-queryable provider details

Avoid storing full prompts or raw resume text unless a retention and access policy is defined.

## L. Privacy And Security Review

Jobs will handle higher-risk personal data than the current CMS.

### Required Controls

- private storage for all candidate files
- short-lived signed download URLs
- malware scanning or quarantine state
- file size and type validation
- document access audit
- field-level access for contact, salary, and documents
- consent history
- candidate export process
- anonymization process
- retention policy
- redacted audit logging
- separate staging data

### Soft Delete And Hard Delete

Use soft deletion for operational records:

- candidates
- jobs
- applications
- organizations
- documents
- resumes
- notes
- tasks

Never hard delete:

- audit events
- stage histories
- application snapshots
- AI processing runs
- AI score history

Use anonymization for candidate privacy deletion. True hard deletion should be limited to unattached temporary uploads, expired queue payloads, and unconfirmed draft accounts within retention windows.

## M. Queue And Background Processing Review

The architecture needs a queue decision before implementation.

### Workloads

- resume parsing
- OCR
- embeddings
- AI scoring
- bulk import
- candidate/job notifications
- email sending
- recommendation refresh
- future job alerts

### Queue Requirements

- idempotency keys
- retries with backoff
- dead-letter handling
- scheduled/delayed jobs
- concurrency controls
- payload size limits
- run observability
- per-candidate or per-application locking where needed

### Technology Recommendation

If the platform remains Vercel-first with a separate worker/API, **Upstash QStash** is the simplest V1 fit for HTTP-delivered jobs, retries, and delayed tasks.

If the infrastructure moves toward AWS for object storage and email, **SQS** is the more durable long-term queue.

Avoid BullMQ unless a long-running worker host and Redis command compatibility are explicitly chosen. Do not assume Upstash Redis is a drop-in replacement for all BullMQ workloads.

## N. Commercial And Business Model Review

Commercial tracking should exist in V1, but not as a full accounting system.

### Keep In V1

- commercial terms per job/client
- fee type
- fee percentage or fixed amount
- guarantee/replacement days
- placement amount
- invoice number
- invoice status
- due date
- paid amount/status

### Defer

- full ledger accounting
- payment reconciliation
- complex commission splits
- external accounting integration

If recruiter attribution affects internal credit or compensation, replace primary/secondary recruiter fields with a simple `PlacementCreditAllocation` table. If not, keep a single primary owner for V1.

## O. Open Questions To Resolve Before Phase 0 Freeze

1. **Embedding dimension and model:** Do not hardcode a dimension now. Select the provider/model during infrastructure setup and store dimensions in an embedding model config.
2. **pgvector index choice:** Start simple. Use HNSW only if the chosen Postgres provider supports it and data volume justifies it. Otherwise begin with normal SQL search plus later vector indexing.
3. **ApplicationSnapshot depth:** Store key scalar references plus JSONB snapshot data for candidate profile, resume metadata, answers, and job details at application time. Do not create many snapshot child tables in V1.
4. **Candidate email changes:** Never key identity by email. Use stable IDs. Email changes must update contact records and cached display fields through a controlled service flow with audit.
5. **Commercial tracking depth:** Track terms, invoice status, due date, amount, and paid status. Do not build full accounting in V1.
6. **Placement attribution:** Use one primary owner unless commission/credit allocation is required. If it is required, model allocation percentages explicitly.
7. **Cascade delete rules:** Use restrict/no cascade for business entities. Use soft delete plus service-level visibility rules. Cascade only safe join records where data loss has no business meaning.
8. **Postgres RLS:** Do not implement RLS for V1 if generic tenancy is removed. If tenant fields remain, RLS must be designed before schema freeze.

## Additional Direct Answers

### Should Profile Completeness Be Stored Or Computed?

Store it as a cached derived field for fast admin filtering, but compute it from profile data. It should be recalculated after edits and background parsing, not manually trusted.

### Which Entities Should Support Soft Deletion?

Soft delete candidates, jobs, applications, organizations, documents, resumes, notes, tasks, interviews, and offers. Preserve histories, audit events, snapshots, AI runs, and AI scores.

### Should There Be Generic Audit Plus Entity-Specific History?

Yes. Use generic audit for compliance/security. Use entity-specific histories for workflow facts such as application stages and job statuses. Avoid duplicating both as separate sources of truth.

### Should Search Use SQL, pgvector, Or External Search?

V1 should start with SQL filters plus PostgreSQL full-text/trigram search. pgvector can support semantic matching later. External search should be deferred until scale or product needs justify it.

### Should Commercial Tracking Be V1 Or Later?

Minimal commercial tracking should be V1 because placements and recruitment fees are core business outcomes. Full accounting should be later.

## Recommended Architecture Freeze Conditions

Before Phase 0 is frozen, reconcile these decisions:

1. remove or fully implement tenancy
2. choose one RBAC authority and scope model
3. simplify identity bridging
4. define application transition rules
5. finalize candidate privacy/deletion/anonymization policy
6. define document storage security rules
7. choose queue provider and idempotency contract
8. reduce ERD to V1 minimum
9. freeze public route naming
10. define CI/build gates

## Final Codex Position

The Claude architecture is strong as a comprehensive target architecture. Codex challenges it mainly on V1 discipline, permission authority, tenant realism, privacy operations, and schema size.

The final architecture should not discard the direction. It should narrow it.

Proceed to Phase 0 Architecture Freeze only after the Blocker items are resolved and the V1 ERD is reduced to the smallest version that can still run Estabizz's recruitment operations professionally.
