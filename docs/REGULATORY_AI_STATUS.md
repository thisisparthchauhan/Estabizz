# Estabizz Anshika — Development Status

## Product Identity

**Chatbot name:** Estabizz Anshika

**Initial role:** A source-grounded regulatory chatbot that answers questions relating to RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND and other approved government and regulatory sources.

**Future expansion:** After the chatbot is stable, Estabizz Anshika will become the conversational layer of the wider Estabizz Regulatory Intelligence Platform.

## Objective

Build Estabizz Anshika as a reliable regulatory assistant that answers from approved knowledge, displays citations, preserves effective-date context, and requires account credits after three free questions.

## Branch

`feat/regulatory-ai-foundation`

## Phase 1 — Estabizz Anshika Foundation

- [x] Create isolated development branch
- [x] Confirm chatbot name as Estabizz Anshika
- [x] Define product configuration and credit rules
- [x] Define shared chatbot domain types
- [ ] Confirm existing MongoDB connection helper and authentication conventions
- [ ] Add conversation, message, usage and knowledge-document models
- [ ] Add secure server-side AI provider adapter
- [ ] Add `/api/anshika/chat` route
- [ ] Add anonymous three-question usage enforcement
- [ ] Add Estabizz Anshika chat user interface
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

## Phase 4 — Estabizz Regulatory Intelligence Platform

This phase will begin after the Estabizz Anshika chatbot and its knowledge base are stable.

- [ ] Approved official source registry
- [ ] Scheduled source checks
- [ ] Duplicate and amendment detection
- [ ] Human review and approval workflow
- [ ] Regulatory-news feed
- [ ] Alerts for material amendments and deadlines
- [ ] Circular comparison
- [ ] Compliance-impact analysis
- [ ] Entity-specific compliance dashboards
- [ ] Regulatory calendar and action tracking
- [ ] Estabizz Anshika conversational access to intelligence modules

## Initial Product Decisions

1. The customer-facing chatbot will be branded as **Estabizz Anshika**.
2. Anonymous visitors receive three free completed answers.
3. Failed requests and system errors do not consume credits.
4. A logged-in paid question initially costs one credit.
5. Every substantive regulatory answer must include retrievable supporting sources.
6. Where no reliable source is available, Estabizz Anshika must clearly decline to provide a confirmed conclusion.
7. News content is secondary; official circulars, regulations, directions and notifications are primary.
8. Documents remain unavailable to the chatbot until approved through the CMS workflow.
9. All credit changes, content approvals and administrative overrides require audit records.
10. The Regulatory Intelligence Platform will be developed after the chatbot foundation, knowledge base and credit system are stable.

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
