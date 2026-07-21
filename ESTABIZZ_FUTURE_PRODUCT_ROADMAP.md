# Estabizz — Future Product Roadmap

> Last verified: 2026-07-22 · Commit: f182723

---

## Vision

Estabizz evolves from a compliance services website into a **full-stack regulatory technology platform** serving:
- Clients: self-service portal, application tracking, compliance calendar
- Estabizz team: CRM, workflow automation, AI-assisted drafting
- Public: intelligent regulatory knowledge, SEO-ranked content, lead capture

---

## Platform Architecture (Future State)

```
┌─────────────────────────────────────────────────────────┐
│                     Public Website                       │
│   Service pages · Blogs · Regulatory updates · Search   │
├─────────────────────────────────────────────────────────┤
│                      Admin OS                            │
│   Content CMS · Blog CMS · Media · Users · Backups      │
├──────────────────┬──────────────────┬───────────────────┤
│   Client Portal  │  Regulatory      │  AI Compliance    │
│   /client/*      │  Knowledge Engine│  Assistant        │
├──────────────────┴──────────────────┴───────────────────┤
│              CRM & Workflow Automation                   │
│         n8n · Zoho · WATI/WhatsApp · Calendar           │
├─────────────────────────────────────────────────────────┤
│             Management Dashboard                         │
│     Analytics · Revenue · Pipeline · Deadlines          │
└─────────────────────────────────────────────────────────┘
```

---

## A. Client Portal

**Business value**: Reduce WhatsApp/email-based status updates. Give clients self-service access to their application progress and documents.

### Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Client dashboard | `/client` | Status overview, pending actions |
| Applications | `/client/applications` | Track registration applications by regulator |
| Documents | `/client/documents` | Upload required documents, view checklist status |
| Queries | `/client/queries` | Submit and track queries with team |
| Compliance calendar | `/client/compliance-calendar` | Upcoming filings and deadlines |
| Invoices | `/client/invoices` | View and download invoices |
| Messages | `/client/messages` | Secure messaging with Estabizz team |

### Technical Requirements

| Item | Approach |
|------|---------|
| Auth | Separate JWT flow for clients (`/api/client/auth/*`) |
| DB models | `Client`, `Application`, `Document`, `Query`, `Invoice`, `Message` |
| File storage | Cloudinary (documents) or S3-compatible |
| Notifications | Email (Resend) + WhatsApp (WATI) |
| Security | Client data isolation — never expose one client's data to another |
| Complexity | Large |
| Phase | Priority 2 |

---

## B. Regulatory Knowledge Engine

**Business value**: SEO-ranked regulatory reference database. Clients and prospects search for circulars, regulations, and amendments. Positions Estabizz as an authority.

### Features

| Feature | Description |
|---------|-------------|
| Circular repository | Full-text indexed RBI/SEBI/IRDAI/IFSCA/MCA/FEMA circulars |
| Regulation repository | Key regulations with version history |
| Applicability tags | Tag circulars by entity type, regulator, topic |
| Compliance action extraction | AI-extracted action items from circulars |
| Deadline extraction | Dates and deadlines surfaced from circular text |
| Source citations | Link to official gazette/regulator website |
| Semantic search | Vector search over circular content |
| Regulator comparison | Side-by-side framework comparison |
| Amendment comparison | Show what changed between versions |

### Technical Requirements

| Item | Approach |
|------|---------|
| DB | MongoDB (structured fields) + MongoDB Atlas Vector Search (embeddings) |
| AI | Anthropic Claude API for extraction, summarization, embedding |
| PDF processing | Python FastAPI service for PDF text extraction |
| Search | MongoDB Atlas Search or Elasticsearch |
| Complexity | Large |
| Phase | Priority 3 |

---

## C. AI Compliance Assistant

**Business value**: 10x team productivity on drafting, summarization, and checklist generation. Content quality improvement.

### Controlled Features

| Feature | Control |
|---------|---------|
| Regulatory query analysis | Draft only; requires human approval |
| Response-letter drafts | Draft only; requires human approval |
| Undertaking drafts | Draft only; requires human approval |
| Document checklist extraction | From uploaded documents; human review |
| Circular summaries | Draft; requires human approval before publication |
| Missing-document detection | Suggestions only |
| Blog drafts | Draft only; edit + publish via normal workflow |
| SEO draft generation | Admin approves before saving |
| FAQ generation | Draft only |

### Required Controls
- All AI output is marked `draft` — never auto-published
- Source citation required for regulatory claims
- Approval workflow before any client-facing use
- Prompt + output audit trail (`ai_audits` collection)
- PII redaction before sending to AI provider
- Client-data isolation (never mix client data across prompts)
- Confidence/status flags on every AI-generated section
- Model-provider abstraction (not hard-coded to one provider)

### Technical Requirements

| Item | Approach |
|------|---------|
| Provider | Anthropic Claude API (already SDK installed) |
| Gateway | Model router abstraction for future multi-provider |
| Audit | `AIAudit` MongoDB model (prompt, model, tokens, output, status) |
| Complexity | Large |
| Phase | Priority 3 |

---

## D. Python Document Service

**Recommendation**: Add a separate Python FastAPI microservice for document-heavy workloads.

**Use for**:
- PDF extraction and parsing (circulars, legal documents)
- OCR for scanned regulatory documents
- Word document extraction (supplement or replace Mammoth.js for complex .docx)
- Excel processing and financial calculations
- Large regulatory comparison reports
- Document classification

**Do NOT use for**:
- Rewriting or replacing Next.js
- Standard API routes
- Auth or session handling

**Integration**: Call from Next.js API routes via HTTP. Deploy on Cloud Run or Vercel serverless Python functions.

**Complexity**: Medium. **Phase**: Priority 3.

---

## E. CRM and Workflow Automation

**Business value**: Lead → client conversion pipeline. Automated follow-ups. No more manual WhatsApp messages.

### Tools

| Tool | Role |
|------|------|
| n8n (self-hosted or cloud) | Workflow automation hub |
| Zoho CRM | Client relationship management |
| WATI | WhatsApp Business API |
| Resend | Transactional email (already in env vars) |
| Microsoft 365 / Gmail | Calendar, email |

### Key Flows

```
Website lead (POST /api/leads)
  → n8n webhook
  → Create lead in Zoho CRM
  → Send WhatsApp acknowledgement via WATI
  → Assign to team member
  → Calendar invite for consultation call
  → Follow-up after 48h if no response

Regulatory circular published
  → Admin publishes in Regulatory Updates desk
  → n8n trigger
  → AI summary drafted
  → Human approves summary
  → Send to subscribed clients via email + WhatsApp

Client document upload
  → Upload in Client Portal
  → n8n trigger
  → Python service classifies document
  → Update document checklist status
  → Notify assigned Estabizz team member
```

**Phase**: Priority 1 (CRM integration) and Priority 2 (full automation).

---

## F. Management Dashboard

**Business value**: Real-time visibility for Estabizz leadership on pipeline, workload, and revenue.

### Dashboard Panels

| Panel | Data source |
|-------|------------|
| Active clients | Client Portal DB |
| Applications by regulator | Application model |
| Query ageing (SLA) | Query model |
| Employee workload | Assignment model |
| Pending documents | Document checklist model |
| Lead pipeline | Leads + Zoho CRM |
| Conversion rates | Leads → Applications |
| Revenue / outstanding | Invoice model / accounting integration |
| Compliance deadlines (next 30 days) | Compliance calendar model |
| Content performance | Blog + page analytics |
| Website analytics | Google Analytics API |

**Phase**: Priority 2–3 depending on data availability.

---

## G. Advanced Public Website Features

### Recommended additions (in priority order)

| Feature | Business value | Complexity | Phase |
|---------|---------------|-----------|-------|
| Website search (full-text) | High | Small–Medium | P1 |
| Service eligibility wizard | High | Medium | P1 |
| Live consultation booking | High | Medium | P1 |
| WhatsApp chat integration | High | Small | P1 |
| Registration cost calculator | Medium | Medium | P1 |
| Downloadable compliance checklists | Medium | Small | P1 |
| Regulatory alerts (email subscribe) | Medium | Medium | P2 |
| Verified client testimonials | Medium | Small | P0 |
| Interactive registration timelines | Medium | Medium | P2 |
| Semantic search | High | Large | P3 |
| Document-readiness assessment | High | Large | P2 |
| Regulator/topic filters on resources | Medium | Small | P1 |
| Lead scoring | Medium | Medium | P2 |
| Personalised service recommendations | High | Large | P3 |
| Multilingual content | Low | Large | P3 |

---

## Technology Recommendations

| Technology | Recommendation | Reason |
|-----------|---------------|--------|
| Next.js | Keep | App Router is mature and well-suited; no reason to change |
| React | Keep | Industry standard; TipTap depends on it |
| TypeScript | Keep | Strong typing essential as platform scales |
| Tailwind CSS | Keep | Productive and consistent; standalone CLI is stable |
| MongoDB | Keep | Flexible schema suits content and regulatory data |
| Mongoose | Keep | Strong TypeScript support |
| PostgreSQL | Add later (Phase 2–3) | For relational data: CRM, invoices, assignments, financial records |
| Redis | Add (Phase 1) | Rate limiting, session cache, background job queuing |
| Vercel | Keep | Auto-deploy from GitHub; zero-config for Next.js |
| Cloudinary | Keep | Well-integrated; move to signed uploads for higher security |
| S3-compatible | Add (Phase 2) | Client document vault; separate from public media |
| Anthropic Claude | Add now | Already SDK installed; enable for AI assistant features |
| Python FastAPI | Add (Phase 3) | PDF/OCR/document processing microservice |
| n8n | Add (Phase 1) | Low-code workflow automation; self-hostable |
| Resend | Add (Phase 1) | Transactional email; already in env vars |
| WATI | Add (Phase 1) | WhatsApp Business API |
| Elasticsearch/OpenSearch | Add (Phase 3) | Only when MongoDB Atlas Search proves insufficient |
| MongoDB Atlas Vector Search | Add (Phase 3) | Semantic search for regulatory knowledge engine |
| BullMQ | Consider (Phase 2) | Background job queue for long-running AI tasks; Redis required |
| Docker | Do not use now | Vercel serverless handles scaling; Docker adds complexity without benefit at this stage |
| Error monitoring (Sentry) | Add now | No cost for small projects; essential for production |
| Analytics | Add now | Google Analytics (already partially configured) or Posthog |
| Automated testing | Add (Phase 1) | Playwright for E2E on critical paths; Vitest for unit |
| Feature flags | Add (Phase 2) | For controlled AI feature rollout |
