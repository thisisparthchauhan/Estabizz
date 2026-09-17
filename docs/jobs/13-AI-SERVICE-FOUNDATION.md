# Estabizz Jobs - AI Service Foundation

Status: Phase 1A foundation only.

This document defines the initial Python FastAPI boundary for future Estabizz Jobs AI workflows. Resume parsing, LLM calls, OCR, embeddings, candidate matching, AI scoring, and production AI processing were not implemented in this phase.

## 1. Architecture

The FastAPI service lives separately from the primary Next.js web application:

```text
services/jobs-ai/
```

Next.js remains the primary web application and owner of Jobs business mutations. The AI service is prepared as an internal worker/service boundary for future AI-side processing.

Per the architecture freeze, FastAPI may later own only:

- `AIExtraction`
- `AIScore`
- `EntityEmbedding`

It must not mutate Candidate, Job, Application, or other core business state.

## 2. Folder Structure

```text
services/jobs-ai/
  app/
    main.py
    api/
      health.py
    core/
      config.py
      security.py
    services/
    models/
    schemas/
      health.py
  tests/
    test_health.py
  requirements.txt
  .env.example
  README.md
```

## 3. Current Endpoint

Implemented:

```text
GET /health
```

The response confirms service status, environment, AI provider setting, and whether model/database configuration is present. It does not connect to PostgreSQL or any AI provider.

## 4. Security Boundary

The AI service must not be exposed directly to candidates.

Future internal calls from Next.js to FastAPI should use:

```text
x-estabizz-service-secret: <AI_SERVICE_SECRET>
```

The foundation includes an authentication helper for protected future routes. `GET /health` is intentionally open for infrastructure health checks and does not expose secrets.

## 5. Next.js to FastAPI Communication

Next.js will later enqueue AI work through QStash and/or call internal FastAPI endpoints with the shared service secret. Next.js remains responsible for:

- user authentication
- Jobs authorization
- Candidate/Application/Job mutations
- document upload authorization
- deciding which AI jobs may be requested

FastAPI should return AI-side processing results only after verifying the service secret on protected endpoints.

## 6. Future QStash Integration

Future queue jobs may call FastAPI for:

- `RESUME_PARSE`
- `AI_EXTRACTION`
- `GENERATE_EMBEDDING`
- `CANDIDATE_MATCH`

Worker callbacks must preserve staging/production isolation and must not process production data from staging queues.

## 7. Future Resume Parsing Pipeline

The planned pipeline is:

1. Next.js authorizes candidate document upload.
2. Private storage receives the file by presigned URL.
3. Next.js creates the `ResumeVersion` / `CandidateDocument` record.
4. Next.js enqueues a staging-safe parse job.
5. FastAPI fetches the private document using a short-lived authorized mechanism.
6. FastAPI writes only AI-owned outputs allowed by the frozen architecture.
7. Human review remains required before AI-inferred data changes business state.

## 8. Environment Variables

```text
APP_ENV=development
AI_SERVICE_SECRET=
DATABASE_URL=
JOBS_AI_PROVIDER=disabled
JOBS_AI_MODEL=
```

Do not commit real secrets or production credentials.

`DATABASE_URL` is configuration-only in this phase. The service does not connect to PostgreSQL yet.

`JOBS_AI_PROVIDER` and `JOBS_AI_MODEL` are placeholders for future provider selection. No AI provider is connected in this phase.

## 9. Local Development Commands

```bash
cd services/jobs-ai
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8010
pytest
```

Health check:

```bash
curl http://127.0.0.1:8010/health
```

## 10. Current Readiness

The AI service foundation is ready for local/staging wiring review. It is not ready for production AI workloads because provider integration, parser implementation, worker routes, database writes, observability, and deployment configuration are intentionally deferred.
