# Estabizz Jobs — Product Scope

> **Document:** 01-PRODUCT-SCOPE.md  
> **Phase:** 0B — Product Scope  
> **Status:** Updated post-Codex review — superseded on conflicts by `05-ARCHITECTURE-FREEZE.md`  
> **Date:** 2026-08-08  
> **Preceding document:** `docs/jobs/00-CURRENT-SYSTEM-AUDIT.md`  
> **Freeze document:** `docs/jobs/05-ARCHITECTURE-FREEZE.md`

---

## 1. Product Vision

Estabizz Jobs is the proprietary recruitment platform powering Estabizz's talent business. It is not a generic job board. It is a full-cycle recruitment operating system: a structured candidate database, an internal ATS, a recruiter CRM, an AI-augmented matching engine, and the commercial tracking layer for Estabizz's placement fees — all integrated into the existing Estabizz web platform.

Version 1 is intensely focused on **regulated financial services, fintech, capital markets, and technology** sectors, primarily in India. The core data architecture is designed without India-only assumptions so that international expansion and cross-sector coverage can be introduced without a data migration.

Estabizz Jobs is not a marketplace where employers independently post jobs and directly engage candidates. Estabizz operates as the recruitment intermediary throughout.

---

## 2. Version 1 Objectives

| # | Objective | Description |
|---|---|---|
| O1 | Candidate Database | Build a structured, searchable master database of candidates sourced from registrations, recruiter outreach, and referrals |
| O2 | Job Management | Enable Estabizz recruiters to create, manage, and close job requirements linked to client mandates |
| O3 | Application Tracking | Track candidate applications through each stage of the recruitment pipeline |
| O4 | ATS | Provide Estabizz recruiters with a full applicant tracking system: pipeline, stage management, communication logs |
| O5 | Recruiter CRM | Manage client relationships, contacts, notes, tasks, and follow-up activity |
| O6 | AI Resume Parsing | Automatically extract and structure candidate profile data from uploaded CVs |
| O7 | AI Matching | Score and rank candidates against job requirements using semantic and structured matching |
| O8 | Estabizz Careers | Public-facing careers section for candidates to discover Estabizz as a recruiter and register |
| O9 | Commercial Tracking | Track placements, fees, invoice status, and commercial terms per client |
| O10 | Structured Audit | Log all significant actions across candidates, applications, jobs, and placements |

---

## 3. Version 1 Business Rule

**Employers do not self-serve in Version 1.**

```
Client/Employer requirement
  → Estabizz Recruitment Team receives mandate
  → Estabizz creates Job in the system
  → Candidates apply via portal OR Estabizz sources candidates
  → Estabizz screens and evaluates candidates
  → Estabizz submits shortlist to client
  → Estabizz coordinates interview scheduling
  → Client selects candidate
  → Offer → Acceptance → Joining
  → Placement recorded → Commercial tracking activated
```

The employer does not log into any system in Version 1. All client-facing communication goes through Estabizz recruiters. All data entry on the employer/client side is performed by Estabizz staff.

---

## 4. In-Scope — Version 1

### 4.1 Candidate Portal
- **V1** — Public registration at `/jobs/account` (route frozen — see Section 16)
- **V1** — Candidate profile creation (identity, contact, employment, education, skills)
- **V1** — Resume/CV upload (multiple versions retained; private storage only — never Cloudinary)
- **V1** — Job browsing at `/jobs` and `/jobs/[slug]` (route frozen)
- **V1** — Application submission at `/jobs/[slug]/apply` (route frozen)
- **V1** — Application status visibility at `/jobs/account/applications` (route frozen)
- **V1** — Profile editing at `/jobs/account/profile` (route frozen)
- **V1** — Saved jobs at `/jobs/account/saved` (route frozen)
- **V1** — Job alerts at `/jobs/account/alerts` (route frozen)
- **V1** — Consent management (data use, marketing, GDPR-equivalent)
- **V1** — Password-based authentication via existing `User` model
- **V1** — Duplicate candidate detection and merge workflow (recruiter-assisted)
- **V1** — Candidate privacy workflow: anonymization on deletion request, consent history

### 4.2 Estabizz Careers (Public-Facing)
- **V1** — Careers hub page at `/careers` or `/jobs`
- **V1** — Job listing page (published jobs only)
- **V1** — Individual job detail page
- **V1** — SEO-optimised job pages (structured data, sitemap inclusion)
- **V1** — "Register Your Interest" for candidates not applying to a specific job
- **V1** — Sector/industry filtering of jobs

### 4.3 Job Management (Internal, Recruiter-Facing)
- **V1** — Create, edit, publish, unpublish, close job requirements
- **V1** — Job linked to client organization and client contact
- **V1** — Job attributes: title, description, location(s), compensation range, sector, seniority, skills, regulatory domain experience
- **V1** — Job screening questions (freeform and structured)
- **V1** — Job assignment to recruiter(s)
- **V1** — Job status history (open → on hold → closed → filled)
- **V1** — Internal-only vs public-facing job toggle

### 4.4 Application Management and ATS
- **V1** — Application pipeline per job (stage-based)
- **V1** — Default pipeline stages: New → Screening → Shortlisted → Client Submitted → Interview Scheduled → Interview Completed → Offer Extended → Offer Accepted → Placed → Rejected → Withdrawn
- **V1** — Stage history (immutable log of every stage transition)
- **V1** — Bulk stage actions for recruiter efficiency
- **V1** — Candidate-to-job manual assignment by recruiter
- **V1** — Application snapshot (candidate profile captured at time of application)
- **V1** — Screening question answers captured at application time

### 4.5 Recruiter CRM
- **V1** — Client organization records
- **V1** — Client contact records (per organization)
- **V1** — Commercial terms per client relationship
- **V1** — Recruiter notes on candidates, applications, clients
- **V1** — Tasks and follow-ups with due dates, assignees
- **V1** — Communication log (email, call, meeting)
- **V1** — Candidate tagging (freeform and structured)
- **V1** — Candidate activity timeline

### 4.6 Interview Management
- **V1** — Schedule and record interview events
- **V1** — Interview participants (candidate + internal + client-side contacts)
- **V1** — Interview feedback from Estabizz team
- **V1** — Interview status tracking

### 4.7 Offer and Placement
- **V1** — Offer record (compensation, joining date, status)
- **V1** — Placement record (confirmed hire, joining date)
- **V1** — Commercial tracking (fee, invoice, payment status)
- **V1** — Placement credit attribution (which recruiter(s))

### 4.8 AI Capabilities (V1)
- **V1** — Resume/CV parsing: structured extraction from PDF/DOCX
- **V1** — Candidate profile enrichment from parsed resume data
- **V1** — AI extraction provenance: confidence score, model version, human verification status
- **V1** — Candidate-to-job semantic matching (pgvector)
- **V1** — Match scoring: structured score + AI-generated explanation
- **V1** — Candidate ranking per job
- **V1** — AI is advisory only: no automatic rejection based on AI score

### 4.9 Candidate Master Database
- **V1** — Structured candidate profiles (not just CV documents)
- **V1** — Employment history
- **V1** — Education history
- **V1** — Certifications and licenses
- **V1** — Skills (structured, from master taxonomy)
- **V1** — Regulatory domain experience (sector-specific classifications)
- **V1** — Compensation current and expected
- **V1** — Notice period and availability
- **V1** — Location and work authorization
- **V1** — Resume version history
- **V1** — Duplicate detection support (conceptual, recruiter-assisted deduplication)
- **V1** — Soft delete (candidates not permanently erased, marked inactive/archived)

### 4.10 Access Control
- **V1** — Jobs-specific RBAC built on capability/permission primitives (not role-first)
- **V1** — Permissions: see Section 8
- **V1** — Estabizz staff use existing `AdminUser` identity with Jobs capability extension
- **V1** — Candidates use existing public `User` identity with PostgreSQL Candidate extension

### 4.11 Audit Logging
- **V1** — Immutable audit trail for all significant Jobs actions
- **V1** — Actor, entity, action, timestamp, changed fields, previous/new values

---

## 5. Explicitly Out-of-Scope — Version 1

| Feature | Classification | Reason |
|---|---|---|
| Employer self-service portal | **Future** | V1 is Estabizz-mediated workflow only |
| Employer job posting | **Future** | Employers have no login in V1 |
| Employer candidate access | **Future** | All candidate data managed by Estabizz |
| Online assessment / test platform | **Future** | Third-party integration can be added later |
| Video interview integration | **Future** | Zoom/Teams links via notes; no native integration |
| Background check integration | **Future** | Manual process in V1 |
| Social / OAuth login for candidates | **Future** | Password-only in V1 via existing User model |
| Mobile native app | **Not planned** | Responsive web only |
| Staffing agency multi-tenancy | **Not planned** | Estabizz is the single tenant |
| Job board aggregation / scraping | **Not planned** | Sourcing is manual or candidate-initiated |
| Payroll / contractor management | **Not planned** | Out of business scope |
| CandidatePublicProfile / talent marketplace | **Future** | Candidates not visible to employers |
| Automated offer letters (DocuSign) | **Future** | Manual in V1 |
| Referral reward programme | **Future** | Can be added without schema changes |
| AI auto-rejection | **Not planned** | AI is advisory only, per architecture directive |

---

## 6. User Types

### 6.1 Candidate (Public)
A registered job-seeker. May self-register via the Estabizz Careers portal, or be added by an Estabizz recruiter from an external source. Not all candidates have a portal account in V1 (recruiter-sourced candidates may exist in the database without a portal login until they register).

| Attribute | Detail |
|---|---|
| Authentication | Existing `User` model (MongoDB) + PostgreSQL Candidate record |
| Access | Candidate portal only — `/jobs`, `/careers`, `/candidates/*` |
| Can do | View jobs, apply, manage own profile, view own applications |
| Cannot do | View other candidates, access admin, access recruiter ATS |

### 6.2 Estabizz Recruiter (Internal Staff)
An Estabizz team member managing the recruitment workflow. Uses existing `AdminUser` identity with Jobs-specific capabilities assigned.

| Attribute | Detail |
|---|---|
| Authentication | Existing `AdminUser` model (MongoDB) |
| Access | Jobs admin panel (`/admin/jobs/*`) |
| Capabilities | Depend on assigned Jobs permissions (see Section 8) |

### 6.3 Estabizz Super Recruiter / Jobs Admin
A senior Estabizz staff member or team lead with broader access including settings, commercial terms, and team management.

### 6.4 System / Background Process
Internal service account for queue workers, AI processing runs, and automated tasks. Tracked via `IdentityReference` with `identity_type: 'system'`.

### 6.5 Client Contact (Passive, V1)
A contact at a client organization. Exists as a data record (`ClientContact`) managed by Estabizz recruiters. Has no login in V1. Referenced in job requirements, interview scheduling, and commercial records.

---

## 7. User Journeys

### 7.1 Candidate Journey

```
Discovery
  → Finds Estabizz Careers via search / referral / social
  → Browses publicly listed jobs
  → Reads job detail (sector, role, location, compensation range)

Registration
  → Creates account (existing User model + Candidate profile)
  → Uploads resume/CV
  → AI parses resume → profile pre-populated
  → Candidate reviews and verifies AI-extracted data
  → Completes profile manually where needed
  → Grants data consent

Application
  → Selects job → answers screening questions → submits
  → Application snapshot captured
  → Receives confirmation (email — future feature in V1 if email provisioned)

Progress
  → Views application status on candidate dashboard
  → Receives notification when stage changes (email — requires email service)
  → Provides availability for interviews
  → Accepts / declines offer
```

### 7.2 Recruiter-Sourced Candidate Journey

```
Recruiter identifies candidate via LinkedIn, referral, database
  → Recruiter creates Candidate record manually (no portal account)
  → Recruiter uploads candidate's CV on their behalf
  → AI parses CV → profile draft created
  → Recruiter reviews and confirms profile data
  → Recruiter assigns candidate to relevant job
  → Candidate may later register via portal (linking portal identity to existing record)
```

### 7.3 Estabizz Recruiter Journey

```
Client Mandate Received
  → Recruiter creates client Organization (if new) or selects existing
  → Adds or selects ClientContact for mandate owner
  → Creates Job linked to Organization
  → Fills job requirements, skills, domain experience, screening questions
  → Sets compensation range, location, seniority
  → Saves job as internal draft (not public)

Sourcing
  → Searches candidate database (structured + AI semantic search)
  → Reviews AI-matched candidates with explanation scores
  → Manually reviews profiles, resumes, activity history
  → Assigns promising candidates to the job
  → Contacts candidates (logs communication)

Screening
  → Moves candidates through pipeline stages
  → Records screening notes
  → Rejects candidates with reason (never auto-rejected by AI)
  → Shortlists candidates for client

Client Submission
  → Moves shortlisted candidates to "Client Submitted" stage
  → Coordinates interview scheduling
  → Records interview feedback

Offer and Placement
  → Records offer details
  → Tracks offer acceptance / rejection
  → Records placement (joining date)
  → Records commercial details (fee, invoice)

Operations
  → Creates tasks and follow-ups
  → Logs communications
  → Manages team assignments on jobs
```

### 7.4 Client Relationship Journey

```
Commercial Setup
  → Estabizz recruiter creates Organization record
  → Records commercial terms (fee structure, payment terms)
  → Adds client contacts

Mandate
  → Client contact details captured in Job.client_contact
  → Job requirement documented by recruiter

Interview Coordination
  → Interview records include client-side participants (via name/email — no login)
  → Interview feedback from client can be recorded by recruiter

Post-Placement
  → Placement recorded
  → Fee calculated against commercial terms
  → Invoice tracking managed by recruiter/admin
```

---

## 8. Jobs RBAC — Capability Model

Permissions are the primary access-control primitive. Roles are named collections of permissions (templates). The application enforces permissions, not role names.

### 8.1 Permission Set with Resource Scope

Every Jobs permission carries a **scope** attribute: `OWN`, `TEAM`, or `ALL`. The scope constrains which records the permission applies to.

| Scope | Meaning |
|---|---|
| `OWN` | Only records created by or assigned to this staff member |
| `TEAM` | Records belonging to the staff member's team (deferred in V1 — treated as OWN until teams are introduced) |
| `ALL` | All records in the Jobs domain |

| Permission | Description |
|---|---|
| `jobs.view` | View job records |
| `jobs.create` | Create new job requirements |
| `jobs.edit` | Edit job details |
| `jobs.approve` | Approve job for publication |
| `jobs.publish` | Publish job to public careers page |
| `jobs.close` | Close / archive a job |
| `candidates.view` | View candidate profiles and history |
| `candidates.edit` | Edit candidate profile data |
| `candidates.contact` | Log communications with candidates |
| `candidates.assign` | Assign candidates to jobs |
| `candidates.export` | Export candidate data |
| `applications.view` | View applications |
| `applications.manage` | Create and manage applications |
| `applications.change_stage` | Move applications through pipeline stages |
| `interviews.manage` | Create, edit, and complete interview records |
| `offers.manage` | Create and manage offer records |
| `placements.manage` | Record and manage placements |
| `commercial.view` | View commercial terms, placement fees, invoice status |
| `commercial.manage` | Edit commercial terms and invoice records |
| `recruitment_notes.manage` | Create and manage recruiter notes |
| `recruitment_reports.view` | View recruitment and commercial reports |
| `jobs_settings.manage` | Manage jobs module settings (pipeline stages, tags, taxonomy) |

**Authorization is resolved from permission grants, not role names.** Application code checks `(permission_code, scope)` pairs, never a role string.

### 8.2 V1 Role Templates

Roles are named collections of default permission+scope pairs applied when a staff member is onboarded. They are not enforced at runtime — grants are.

| Role Template | Description |
|---|---|
| `jobs_super_admin` | All permissions at scope ALL |
| `recruitment_head` | All permissions at scope ALL; manages settings and commercial |
| `recruitment_manager` | Full pipeline + commercial view at scope ALL |
| `team_lead` | Full pipeline at scope TEAM; no commercial management |
| `recruiter` | candidates, jobs, applications, interviews, notes at scope OWN/TEAM |
| `sourcer` | candidates.view/edit/contact, jobs.view at scope OWN |
| `viewer` | jobs.view, candidates.view, applications.view at scope ALL, read-only |

> Roles are templates only. Each staff member's actual access is determined by their individual permission grants, which may widen or narrow the template defaults.

---

## 9. Frozen Route Structure

### 9.1 Public / Candidate Routes

| Route | Purpose |
|---|---|
| `/jobs` | Job listing (published, public jobs) |
| `/jobs/[slug]` | Job detail page |
| `/jobs/[slug]/apply` | Application form (auth required) |
| `/jobs/account` | Candidate account hub (auth required) |
| `/jobs/account/profile` | Candidate profile editor |
| `/jobs/account/applications` | Candidate's own application list |
| `/jobs/account/saved` | Saved/bookmarked jobs |
| `/jobs/account/alerts` | Job alert preferences |
| `/careers` | Estabizz Careers hub (same Job records, Estabizz filtered) |

### 9.2 Admin / ATS Routes

| Route | Purpose |
|---|---|
| `/admin/jobs` | Jobs dashboard |
| `/admin/jobs/vacancies` | Job management (list, create, edit) |
| `/admin/jobs/candidates` | Candidate database search and profiles |
| `/admin/jobs/applications` | All-applications pipeline view |
| `/admin/jobs/clients` | Client organizations and contacts |
| `/admin/jobs/interviews` | Interview management |
| `/admin/jobs/tasks` | Recruiter tasks and follow-ups |
| `/admin/jobs/placements` | Placements and commercial tracking |
| `/admin/jobs/reports` | Recruitment reports |
| `/admin/jobs/settings` | Pipeline stages, tags, team config |

**Route naming is frozen.** Changes require architecture change control (see `05-ARCHITECTURE-FREEZE.md` Section S).

---

## 10. Regulatory-Sector Differentiation

Version 1 is focused on regulated financial services. The candidate and job data models must natively support:

| Domain Classification | Examples |
|---|---|
| Banking & NBFCs | RBI regulations, NBFC compliance, banking operations |
| Capital Markets | SEBI registration, broking, fund management, research |
| Insurance | IRDAI licensing, underwriting, actuarial, distribution |
| Fintech | Payment systems, lending tech, wealthtech, insurtech |
| Asset Management | AIF, PMS, mutual funds, portfolio management |
| International Financial Services | IFSCA, GIFT City, IFSC units |
| AML / FIU / Compliance | FIU-IND reporting, AML, KYC, compliance advisory |
| Technology / Engineering | Supporting roles in financial services technology |

Candidate profiles capture **regulatory domain experience** as a structured field (not freeform text) so it can be used in AI matching and structured search.

Job requirements similarly specify required domain experience.

---

## 11. AI Capabilities

### 10.1 V1 AI Features

| Capability | Description | Human Override |
|---|---|---|
| Resume parsing | Extract structured data from PDF/DOCX CVs | All extractions flagged for human verification |
| Profile enrichment | Pre-populate candidate profile fields from parsed resume | Candidate and recruiter can correct any field |
| Candidate-to-job matching | Semantic similarity scoring using pgvector embeddings | Score is advisory; recruiter decides |
| Match explanation | Human-readable rationale for each match score | Recruiter sees explanation before acting |
| Candidate ranking | Ranked list of candidates per job | Recruiter can reorder or override |
| Search | Semantic + structured hybrid search across candidate database | — |

### 10.2 AI Principles

- AI is a decision-support tool. No automated rejection solely on AI score.
- All AI-extracted data retains provenance: value, confidence, model version, timestamp.
- Candidates may verify and correct AI-extracted fields in their profile.
- Recruiters may override AI-extracted fields; overrides are logged.
- AI explanations for match scores must be stored and visible to recruiters.
- Model version is recorded with every extraction and scoring run for reproducibility and audit.

### 10.3 Non-AI / Manual Fallback

If the AI service is unavailable:
- Resume parsing falls back to manual recruiter data entry
- Matching falls back to structured skill/domain/keyword search
- Candidate search falls back to structured PostgreSQL queries
- All platform functions remain operational without the AI service

---

## 12. Estabizz Careers Integration

The public Estabizz Careers section is the candidate-facing entry point.

| Aspect | Detail |
|---|---|
| URL | `/careers` or `/jobs` (decision deferred to URL design phase) |
| SEO | Job pages use `buildPageMetadata()` from existing `lib/seo/pageMetadata.ts`; job URLs included in `sitemap.ts` |
| Job listing | Only jobs with `status: published` and `is_public: true` are visible |
| Navbar | Jobs link already injected in `Navbar.tsx`; no Navbar code changes needed |
| Admin | Job publication is managed via `/admin/jobs/` |
| Design | Careers pages use existing Estabizz design system (Tailwind, brand colours, `ServicePageLayout`) |

---

## 13. Commercial and Placement Tracking

| Object | V1 Scope |
|---|---|
| CommercialTerms | Fee structure per client relationship (percentage of salary, fixed fee, retainer) |
| Placement | One placement record per placed candidate per job |
| PlacementFee | Calculated fee at time of placement |
| CommercialStatus | Invoice issued, paid, partially paid, disputed |
| Placement credit | Attribution to recruiter(s) who closed the placement |

Commercial tracking is internal only. Clients do not see placement or fee records in V1.

---

## 14. Success Criteria — Version 1

| Criteria | Measurement |
|---|---|
| Candidate database operational | Recruiters can create and search candidate profiles |
| AI parsing live | Resume upload → structured profile within 60 seconds |
| ATS functional | Applications moving through pipeline stages with history |
| Jobs published | At least one job live on Estabizz Careers with SEO |
| Client CRM operational | Organizations, contacts, commercial terms manageable |
| Placement tracking | End-to-end placement + fee records created |
| No regressions | Existing CMS, blogs, admin panel, public pages unaffected |
| Audit coverage | All significant Jobs actions logged with actor and timestamp |

---

## 15. Architecture Principles

1. **Domain separation** — Jobs transactional data in PostgreSQL; existing CMS remains in MongoDB. No cross-domain writes.
2. **Identity boundary** — MongoDB User identity and PostgreSQL Candidate identity are linked by reference, not foreign key. Jobs domain uses its own UUID as primary identifier. Jobs are never keyed by email address.
3. **Permission-first access control** — Permissions with resource scope (OWN/TEAM/ALL) are the enforcement primitive. Role names are templates, not hardcoded runtime checks.
4. **Single operator, no generic tenancy** — Estabizz is the single operator. Clients are represented as `Organization` records. No `tenant_id` on core Jobs entities in V1. Future employer access is introduced via Organization membership, not multi-tenancy.
5. **AI is advisory** — AI augments recruiter decisions; it does not replace them. All AI decisions are logged with provenance. AI may not autonomously change application stage.
6. **Immutable history** — Stage history, audit events, application snapshots, and AI extraction records are never updated or deleted.
7. **Employer-portal readiness** — `Organization`, `ClientContact`, and `Job` entities are designed so a future employer login layer can attach without schema redesign.
8. **Global-ready schema** — All location, currency, timezone, and phone fields are international. No India-only assumptions in core schema.
9. **Failure isolation** — AI service unavailability must not prevent recruiter workflow from operating.
10. **Queue-first for async work** — Resume parsing, AI scoring, and email notifications are background jobs via Upstash QStash. Queue access is abstracted behind an internal interface.
11. **No silent coupling** — Jobs admin panel is additive to the existing AdminShell. Existing CMS panels are not modified.
12. **Write ownership** — Next.js owns all business entity mutations. The FastAPI AI service owns AI processing tables and derived scores only. No AI service may update candidate or application core state directly.

---

## 16. Future Modules (Post-V1)

| Module | Classification |
|---|---|
| Employer self-service portal | **Future V2** |
| Employer job posting | **Future V2** |
| Employer candidate shortlist review | **Future V2** |
| Online candidate assessments | **Future** |
| Video interview integration | **Future** |
| Background check integration | **Future** |
| Referral reward programme | **Future** |
| Mobile app (candidate) | **Future** |
| International expansion (outside India) | **Future** — schema ready |
| Multi-sector expansion | **Future** — schema ready |
| Predictive hiring analytics | **Future** |
| Salary benchmarking | **Future** |
| Automated offer letters | **Future** |

---

*This document is the approved product scope baseline. Changes to in-scope V1 functionality must be reviewed against the architecture and ERD before implementation.*
