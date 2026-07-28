# Estabizz Regulatory AI — Development Status

## Objective

Build a source-grounded regulatory chatbot for RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND and other approved government sources. The assistant must answer from approved knowledge, display citations, preserve effective-date context, and require account credits after three free questions.

## Branch

`feat/regulatory-ai-foundation`

## Phase 1 — Foundation

- [x] Create isolated development branch
- [x] Define product configuration and credit rules
- [x] Define shared chatbot domain types
- [ ] Confirm existing MongoDB connection helper and authentication conventions
- [ ] Add conversation, message, usage and knowledge-document models
- [ ] Add secure server-side AI provider adapter
- [ ] Add `/api/regulatory-ai/chat` route
- [ ] Add anonymous three-question usage enforcement
- [ ] Add chat user interface
- [ ] Add admin configuration page

## Phase 2 — Regulatory Knowledge Base

- [ ] Upload PDF/DOCX/HTML content
- [ ] Extract and normalise text
- [ ] Store regulator, circular number, dates, applicability and source URL
- [ ] Chunk and index approved content
- [ ] Retrieve supporting passages before answering
- [ ] Display source citations and last-verified date
- [ ] Prevent unsupported answers
- [ ] Track superseded and future-effective circulars

## Phase 3 — Accounts, Credits and Payments

- [ ] Require login after three anonymous questions
- [ ] Credit ledger with immutable transactions
- [ ] Razorpay orders and webhook verification
- [ ] Credit packages and promotional credits
- [ ] Admin credit adjustment with audit trail
- [ ] Organisation/team plans

## Phase 4 — Regulatory Updates

- [ ] Approved official source registry
- [ ] Scheduled source checks
- [ ] Duplicate detection
- [ ] Human review and approval workflow
- [ ] Regulatory-news feed
- [ ] Alerts for material amendments and deadlines

## Initial Product Decisions

1. Anonymous visitors receive three free completed answers.
2. Failed requests and system errors do not consume credits.
3. A logged-in paid question initially costs one credit.
4. Every substantive regulatory answer must include retrievable supporting sources.
5. Where no reliable source is available, the chatbot must clearly decline to provide a confirmed conclusion.
6. News content is secondary; official circulars, regulations, directions and notifications are primary.
7. Documents remain unavailable to the chatbot until approved through the CMS workflow.
8. All credit changes, content approvals and administrative overrides require audit records.

## Information Required from Estabizz

These items are not required for foundation development, but will be required before production deployment:

- AI provider API key stored only in Vercel environment variables
- Razorpay test and production credentials
- Final credit-package pricing
- Approved disclaimer wording
- List of official regulatory sources to monitor first
- One initial set of approved circulars/PDFs for knowledge-base testing
- Confirmation whether login will use the current admin/user authentication, email OTP, Google login or mobile OTP

## Security Rules

- Never expose AI, database, payment or storage secrets in browser code.
- Validate and limit all user input server-side.
- Rate-limit by account and anonymous identifier.
- Treat retrieved documents as untrusted data, not as system instructions.
- Do not allow uploaded documents to override product policy or security instructions.
- Log source IDs and usage metadata, but avoid storing unnecessary personal data.
- Verify payment webhooks cryptographically before issuing credits.
