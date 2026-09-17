# Estabizz Jobs — Candidate Account & Dashboard Foundation V1

Status: Foundation implemented locally for review. No production deployment. No real CV data used.

## Candidate Portal Architecture

The Candidate Account area is the authenticated candidate workspace for Estabizz Jobs. It uses the existing Estabizz website authentication boundary and does not create duplicate login or candidate auth.

The server resolves candidate identity from the authenticated session and the Jobs candidate contact mapping. The browser never controls `candidateId`.

## Candidate Routes

Frozen V1 account routes:

- `/jobs/account`
- `/jobs/account/profile`
- `/jobs/account/applications`
- `/jobs/account/saved`
- `/jobs/account/alerts`

`/jobs/account` is the main candidate dashboard.

## Navigation

Candidate account navigation is visually separate from the public Jobs page navigation while remaining consistent with Estabizz blue styling.

Navigation items:

- Dashboard
- My Profile
- My Applications
- Saved Jobs
- Job Alerts

No employer, recruiter, admin or ATS navigation appears in the candidate account.

## Dashboard

The dashboard view model aggregates safe candidate-facing information:

- Candidate display name
- Profile completion
- Resume state
- Application summary
- Recent applications
- Saved jobs count
- Alert count
- Upcoming interviews
- Next recommended action

The dashboard does not send raw Prisma records to the browser.

## Profile Completeness

Profile completeness is a helper score for candidates only. It is not a recruitment score and must not be used for rejection or ranking.

V1 completeness considers:

- Name
- Contact information
- Current role
- Current employer
- Experience
- Location
- Employment history
- Education
- Skills
- Regulatory/domain expertise
- Resume

The service intentionally avoids counting niche or irrelevant fields as mandatory for every candidate.

## Resume State

Dashboard resume states:

- No Resume
- Resume Uploaded
- Processing
- Review Required
- Profile Ready
- Needs Attention

Resume upload remains associated with the profile/onboarding workflow. This phase does not create a duplicate resume-management module.

## Applications

`/jobs/account/applications` shows candidate-facing application status only:

- Total applications
- Under review
- Interview
- Selected / offered
- Rejected / closed
- Applied date
- Job title
- Organisation
- Safe next-step message

Internal recruiter notes, internal AI scores, rankings, and ATS comments are excluded from the server projection.

## Saved Jobs

`/jobs/account/saved` is a foundation page.

The frozen V1 physical schema does not currently include a saved-job table, so this page shows an empty state and documents the future interaction surface:

- saved jobs list
- open job
- remove saved job
- apply CTA

No fake saved jobs are generated.

## Job Alerts

`/jobs/account/alerts` is a foundation page with controls for:

- alert name
- keywords
- preferred location
- domain filters
- frequency

Alert persistence is not present in the frozen V1 schema, so saving remains disabled until a later persistence phase. AI alerts are not implemented.

## Interviews

Upcoming interviews are projected from existing `Interview` and `Application` architecture where scheduled candidate-facing data exists.

The dashboard may show:

- job title
- organisation
- date
- type/format
- safe status

It does not expose interview notes, internal feedback, ratings, strengths, concerns or recruiter comments.

## Authorization

All Candidate Account pages require authentication.

Candidate identity is resolved server-side. Candidate A cannot request Candidate B dashboard, profile proposals, applications, saved jobs or alerts by passing a candidate ID from the browser.

## Candidate-Facing vs Internal ATS Data

Candidate-facing data:

- job title
- organisation name where safe
- applied date
- candidate-facing status
- safe next step
- scheduled interview basics

Internal ATS data excluded:

- recruiter notes
- internal notes
- AI score
- ranking
- feedback ratings
- feedback concerns
- interview notes
- other candidates
- internal stage-change notes

## Future Job Recommendation Integration

The dashboard reserves a clean section for Recommended Jobs, but AI matching is not implemented in this phase.

Normal jobs must not be labelled as AI recommended. The section remains disabled/empty until matching is explicitly approved.

## Testing

Synthetic Candidate Account tests are covered by:

- `scripts/jobsCandidateAccountTest.mjs`

The tests use fictional candidate/application/interview data and verify:

- candidate dashboard view model
- navigation routes
- profile completeness
- resume states
- application summary
- recent applications
- saved jobs count
- alerts count
- upcoming interview safe projection
- internal recruiter notes not exposed
- internal AI score/ranking not exposed
- empty states
- next-action CTA

