# Estabizz Jobs — Candidate Profile Review UI V1

Status: Foundation implemented locally for review. No production deployment. No real CV data used.

## Route

Primary candidate-facing route:

- `/jobs/account/profile`

This route is intentionally narrow. It does not create Candidate Registration, Resume Upload, Employer Portal, job matching, or production AI behavior.

## Trust Boundary

The browser never sends or controls `candidateId`.

The server resolves the candidate from the authenticated site session and then maps the logged-in email to the Jobs candidate contact record. If the visitor is not logged in, the page redirects to `/login` and the API returns `401`.

The API only accepts review actions by `proposalId`. Candidate ownership is checked server-side before any action is applied.

## Page States

The UI supports these states:

- No resume uploaded: shows `Upload your resume to create your profile faster.` with `Upload Resume` and manual-completion actions.
- Resume uploaded / processing: shows `We're preparing your profile.` until parsing/extraction is ready.
- AI proposals ready: shows `Review your profile` with reviewable suggestions.
- Partially reviewed: shows progress and remaining suggestions.
- Profile confirmed: shows confirmed profile details and allows later edits.
- Parsing failed / OCR required: shows upload-another-CV, manual-completion, and retry recovery options without technical error details.

## Review Sections

The profile review page renders only sections backed by available proposal data:

1. Personal Details
2. Professional Summary
3. Employment History
4. Education
5. Skills
6. Regulatory & Financial Expertise
7. Certifications
8. Languages
9. Additional Career Information

The UI includes all V1 section definitions, but empty sections are hidden to avoid clutter.

## Proposal Statuses

Candidate-facing labels are intentionally simple:

- `AI Suggested`
- `Needs Review`
- `Confirmed`
- `Edited`
- `Rejected`

Raw confidence percentages are not displayed to candidates. Low-confidence proposals may show `Please check this`, but confidence is never shown as a score and never auto-rejects a candidate.

## Accept, Edit, Reject

For each AI-proposed field, candidates can:

- Accept the suggestion.
- Edit the suggestion and confirm the corrected value.
- Reject the suggestion.

Edited fields preserve the original AI proposal inside the existing proposal envelope. Rejected fields remain in history and are not applied to the canonical profile.

## Section and Profile Confirmation

Candidates can confirm:

- One field
- A logical section
- The whole profile

Section and full-profile confirmation only operate on the authenticated candidate's own open suggestions. They reuse the existing `profileReview` service and do not duplicate persistence logic.

## Contact and Login Separation

Resume-extracted email and mobile values are profile suggestions only.

Confirming or editing profile contact data can update candidate profile/contact records where permitted, but it must not change authentication identity, login email, password, or account credentials.

## Confirmed Data Protection

Candidate-confirmed data takes priority over new AI suggestions.

If a newer resume proposes a conflicting value, the UI shows that value as a new suggestion. The confirmed profile is not silently overwritten.

## Data Exposure Rules

The browser state excludes:

- Raw CV text
- Full provider request/response bodies
- AI service secrets
- OpenAI API keys
- Storage credentials
- Signed CV URLs
- Internal `AIProcessingRun` IDs
- Internal `ResumeVersion` IDs

The browser receives only display-safe field labels, proposal IDs, candidate-facing values, review status labels, and progress counts.

## Taxonomy and Date Handling Deferral

Employment, skills, and domain proposals are reviewable in V1, but final taxonomy synchronization and date normalization remain deferred.

The UI allows review/edit/confirm without inventing missing taxonomy mappings or destructive canonical updates.

## Mobile Behavior

The page uses a single-column layout on mobile, compact action buttons, visible progress, and accessible labels for editable fields. On desktop, sections expand into wider cards suitable for professional review.

## Future Onboarding Integration

The `Upload Resume`, manual profile completion, and retry actions are intentionally present as UI states but do not yet implement Candidate Registration or Resume Upload.

Next phases can connect:

- Candidate Registration
- Private CV upload
- Resume parsing queue trigger
- Candidate profile completion wizard
- Taxonomy/date canonical synchronization

## Validation

Synthetic UI tests are covered by:

- `scripts/jobsProfileReviewUiTest.mjs`

The tests use synthetic Aarav Mehta-style profile data and verify:

- No-resume state
- Processing state
- Recovery state
- AI proposal review state
- Accept flow
- Edit flow
- Reject flow
- Section confirmation
- Full profile confirmation
- Candidate-confirmed overwrite protection
- Conflicting newer proposal handling
- Cross-candidate authorization
- Login identity separation from profile email/mobile
- No raw resume text returned to browser state
- No full provider response returned to browser state

