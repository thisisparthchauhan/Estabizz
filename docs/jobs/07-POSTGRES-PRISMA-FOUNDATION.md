# Estabizz Jobs - Phase 1A Part 2 PostgreSQL + Prisma Foundation

> Phase: 1A - Engineering Foundation, Part 2  
> Status: implemented locally, pending schema review  
> Scope: Prisma package setup, PostgreSQL env boundary, and frozen V1 ERD translation  
> Architecture authority: `docs/jobs/05-ARCHITECTURE-FREEZE.md`

## 1. Boundary

This phase establishes only the database schema foundation.

No Candidate UI, ATS UI, AI resume parsing, FastAPI service, email, QStash integration, object storage, MongoDB CMS model changes, production database access, or database migration was started.

Migration 001 has intentionally not been created. The schema must be reviewed against the frozen ERD before any migration is generated or applied.

## 2. Packages Added

- `@prisma/client`
- `prisma`
- `dotenv`

Prisma version installed locally:

```bash
prisma         7.9.1
@prisma/client 7.9.1
```

The local install emitted the existing engine warning because the repository declares Node `22.x` and the local machine is running Node `25.9.0`.

## 3. Files Created Or Updated

- `prisma/schema.prisma` - V1 Jobs physical ERD represented as Prisma models.
- `prisma.config.ts` - Prisma 7 configuration for schema path, migration path, and `DATABASE_URL` loading.
- `.env.example` - Adds non-secret `DATABASE_URL` placeholder and staging/development safety notes.
- `package.json` / `package-lock.json` - Adds Prisma dependencies.
- `docs/jobs/07-POSTGRES-PRISMA-FOUNDATION.md` - This foundation note.

## 4. Environment Handling

Prisma reads PostgreSQL through:

```env
DATABASE_URL=
```

Rules:

- Do not commit real credentials.
- Use only local or staging PostgreSQL URLs during foundation review.
- Do not point `DATABASE_URL` at production until production database access is explicitly approved.
- Do not run migrations against production from local development.
- Keep future Jobs object storage, QStash, AI, and email variables separate from this database foundation.

## 5. Schema Translation

The Prisma schema includes 45 models matching the final enumerated V1 physical entity list:

IdentityReference, StaffJobsCapability, Candidate, CandidateContact, CandidateConsent, CandidateEmployment, CandidateEducation, CandidateCertification, Skill, CandidateSkill, Domain, CandidateDomainExperience, ResumeVersion, CandidateDocument, Tag, CandidateTag, CandidateActivity, Organization, ClientContact, CommercialTerms, Job, JobSkill, JobDomain, JobLocation, JobQuestion, JobAssignment, JobStatusHistory, ApplicationStage, ApplicationStageTransition, Application, ApplicationSnapshot, ApplicationAnswer, ApplicationStageHistory, Interview, InterviewParticipant, Offer, Placement, RecruitmentNote, Task, Communication, AIProcessingRun, AIExtraction, AIScore, EntityEmbedding, AuditEvent.

The schema follows the authoritative Phase 0 freeze:

- UUID primary keys for Jobs-domain tables.
- `IdentityReference` is the MongoDB identity boundary; no PostgreSQL FK points to MongoDB.
- `StaffJobsCapability.grants` is JSONB and remains the Jobs authorization source.
- Candidate preferences are merged into `Candidate`.
- Organization relationship fields are merged into `Organization`.
- `Job.structured_requirements` is JSONB.
- `Application.assigned_recruiter_ref_id` replaces `ApplicationAssignment`.
- `Interview` contains feedback columns.
- `Placement` contains fee and invoice fields.
- `AIScore.explanation_payload` replaces a separate AI match explanation table.
- `EntityEmbedding` is a separate table.
- `CandidateConsent` is append-only.
- `Candidate.assigned_team_id` is a reserved nullable UUID with no V1 FK.

## 6. Prisma Representation Notes

These are not application architecture changes, but they must be reviewed before Migration 001:

- Prisma cannot express PostgreSQL partial unique indexes directly in the schema. Migration 001 should manually add/review:
  - `UNIQUE (candidate_id) WHERE is_current = true` on `resume_versions`.
  - `UNIQUE (job_id, recruiter_ref_id) WHERE removed_at IS NULL` on `job_assignments`.
  - `UNIQUE (job_id, candidate_id) WHERE deleted_at IS NULL` on `applications`.
  - `UNIQUE (job_id, candidate_id) WHERE is_current = true` on `ai_scores`.
- `EntityEmbedding.embedding` uses `Unsupported("vector")`; embedding dimension is stored as a configurable `dimension` column and is not hard-coded.
- The HNSW index for `entity_embeddings.embedding` must be added manually during migration review.
- Prisma scalar-list fields are represented as non-null arrays with empty defaults where the ERD uses array-style columns.
- `Candidate.current_resume_version_id` and `Application.snapshot_id` keep the ERD FK columns without adding extra uniqueness. Prisma therefore represents inverse relation fields as lists where required by its validator.
- `ApplicationStageTransition.from_stage_id` remains NOT NULL. Initial application-stage assignment happens when the `Application` is created and is not represented as a transition row.

## 7. Validation

Commands run without connecting to a real database:

```bash
DATABASE_URL='postgresql://<user>:<password>@localhost:5432/estabizz_jobs?schema=public' npx prisma format
DATABASE_URL='postgresql://<user>:<password>@localhost:5432/estabizz_jobs?schema=public' npx prisma validate
```

Result:

- Prisma format completed.
- Prisma schema validation passed.
- No migration was generated.
- No database was modified.

## 8. Migration 001 Readiness

The Prisma schema is ready for owner/architecture review before Migration 001.

Migration 001 should not be created until the review explicitly confirms:

- the 45-model physical entity list is accepted despite the stale "38 tables" wording in the freeze document;
- partial unique indexes are approved for manual migration SQL;
- pgvector extension and HNSW index details are approved;
- the `ApplicationStageTransition.from_stage_id` NOT NULL design is retained.
